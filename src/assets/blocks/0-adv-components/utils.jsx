/**
 * Generate option title suggestions
 *
 * @since 3.1.1
 * @param options Available options as objects with slug and title. e.g. [{slug: 'subscriber', title: 'Subscriber'}, {slug: 'new_customer', title: 'New Customer'}]
 *
 * @return {array}  Option slugs. e.g. ['subscriber','new_customer']
 */
export const getOptionSuggestions = function( options ) {
    return options.map( ( item ) => item.title );
}

/**
 * Match option slugs with its option titles
 * to display as field value (but NOT saved!).
 *
 * @since 3.1.1
 * @param slugs     Option slugs. e.g. ['subscriber','new_customer']
 * @param options   Available options as objects with slug and title. e.g. [{slug: 'subscriber', title: 'Subscriber'}, {slug: 'new_customer', title: 'New Customer'}]
 *
 * @return {array}  Option titles. e.g. ['Subscriber','New Customer']
 */
export const getOptionTitles = function( slugs, options ) {
    let field_value = [];

    if ( options !== null ) {
        field_value = slugs.map( ( option_slug ) => {
            let find_option = options.find( ( item ) => {
                return item.slug === option_slug;
            } );
            if ( find_option === undefined || ! find_option ) {
                return option_slug; // It should return false but creates empty selections
            }
            return find_option.title;
        } );
    }

    return field_value;
}

/**
 * Match option titles with its slugs, and save slugs
 *
 * @since 3.1.1
 * @param slugs     Option slugs. e.g. ['subscriber','new_customer']
 * @param options   Available options as objects with slug and title. e.g. [{slug: 'subscriber', title: 'Subscriber'}, {slug: 'new_customer', title: 'New Customer'}]
 *
 * @return {array}  Option slugs. e.g. ['subscriber','new_customer']
 */
export const getOptionSlugs = function( slugs, options ) {
    let slugs_array = [];

    slugs.map(
        ( option_title ) => {
            const matching_slug = options.find( ( item ) => {
                return item.title === option_title;
            } );
            if ( matching_slug !== undefined ) {
                slugs_array.push( matching_slug.slug );
            }
        }
    )

    return slugs_array;
}
