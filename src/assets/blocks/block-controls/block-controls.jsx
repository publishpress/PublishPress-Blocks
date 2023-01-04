import classnames from 'classnames';
import { AdvDateTimeControl, AdvDaysControl, AdvTimeControl } from "../0-adv-components/datetime.jsx";
import {
    getOptionSuggestions,
    getOptionTitles,
    getOptionSlugs
} from "../0-adv-components/utils.jsx";

(function ( wpI18n, wpHooks, wpBlocks, wpBlockEditor, wpComponents, wpCompose, wpElement ) {
    wpBlockEditor = wp.blockEditor || wp.editor;
    const { addFilter } = wpHooks;
    const { sprintf, __ } = wpI18n;
    const { hasBlockSupport } = wpBlocks;
    const { InspectorControls, BlockControls } = wpBlockEditor;
    const { DateTimePicker, ToggleControl, PanelBody, Notice, FormTokenField, SelectControl } = wpComponents;
    const { createHigherOrderComponent } = wpCompose;
    const { Component, Fragment } = wpElement;

    // do not show this feature if disabled.
    if( !parseInt(advgbBlocks.block_controls) ) return;

    // Blocks that are not supported
    let NON_SUPPORTED_BLOCKS = [
        'core/freeform',
        'core/legacy-widget',
        'core/widget-area',
        'core/column',
        'advgb/tab',
        'advgb/column'
    ];

    const getGlobalControls = function () {
        return typeof advgb_block_controls_vars.controls !== 'undefined'
                            && Object.keys(advgb_block_controls_vars.controls).length > 0
                                ? advgb_block_controls_vars.controls
                                : [];
    }

    /**
     * Check if a control is enabled
     *
     * @since 3.1.0
     * @param {string} control  The use case block control. e.g. 'schedule'
     *
     * @return {bool}
     */
    const isControlEnabled = function( control ) {
        return typeof control !== 'undefined' && control;
    }

    /**
     * Check if at least one control is enabled per block instance
     *
     * @since 3.1.1
     * @param {string} controlAttrs     Controls attributes. e.g. advgbBlockControls or props.attributes @TODO Figure out a way to NOT require controlAttrs as param due is the same always
     *
     * @return {bool}
     */
    const isAnyControlEnabledBlock = function( controlAttrs ) {
        const globalControls    = getGlobalControls();
        let counter             = 0;
        let blockControls       = []; // Controls enabled in block instance

        // Get enabled global controls (in Settings)
        Object.keys(globalControls).forEach( (item) => {
            if( isControlEnabled( advgb_block_controls_vars.controls[item] ) ) {
                blockControls.push(item);
            }
        } );

        // Get counter for enabled controls in block instance
        blockControls.forEach( (item) => {
            if( currentControlKey( controlAttrs, item, 'enabled' ) ) {
                counter++;
            }
        } );

        return counter > 0 ? true : false;
    }

    /**
     * Check if at least one control is enabled globally (in Settings)
     *
     * @since 3.1.0
     *
     * @return {bool}
     */
    const isAnyControlEnabledGlobal = function() {
        const globalControls    = getGlobalControls();
        let counter             = 0;

        Object.keys(globalControls).map( (item) => {
            if( isControlEnabled( advgb_block_controls_vars.controls[item] ) ) {
                counter++;
            }
        } );

        return counter > 0 ? true : false;
    }

    /**
     * Return single controls array attribute value
     *
     * @since 3.1.0
     * @param {string} controlAttrs     Controls attributes. e.g. advgbBlockControls or props.attributes @TODO Figure out a way to NOT require controlAttrs as param due is the same always
     * @param {string} control          The use case block control. e.g. 'schedule'
     * @param {string} key              The control key to check. e.g. 'enabled'
     *
     * @return {mixed}
     */
    const currentControlKey = function( controlAttrs, control, key ) {

        // Check if advgbBlockControls attribute exists
        const controlsAdded = typeof controlAttrs !== 'undefined' && controlAttrs.length
                                ? true
                                : false;
        // Check if control exists in advgbBlockControls array
        const controlExists = controlsAdded
                            && controlAttrs.some( (element) => element.control === control )
                                ? true
                                : false;

        if( controlExists ) {
            const itemIndex = controlAttrs.findIndex(element => element.control === control);

            // No control found (this check seems not necessary but is here to prevent an unlikely error)
            if( itemIndex < 0 ) {
                return false;
            }

            let newArray    = [...controlAttrs];
            const obj       = newArray[itemIndex];

            return obj[key];
        }

        return null;
    }

    // Add non supported blocks according to Block controls
    if( typeof advgb_block_controls_vars !== 'undefined'
        && typeof advgb_block_controls_vars.non_supported !== 'undefined'
        && advgb_block_controls_vars.non_supported.length > 0
    ) {
        // Merge dynamically disabled blocks
        NON_SUPPORTED_BLOCKS = [...NON_SUPPORTED_BLOCKS, ...advgb_block_controls_vars.non_supported];
        // Remove duplicated values
        NON_SUPPORTED_BLOCKS = [...new Set(NON_SUPPORTED_BLOCKS)];
    }

    // Register block controls to blocks attributes
    addFilter( 'blocks.registerBlockType', 'advgb/blockControls', function ( settings ) {
        if ( ! NON_SUPPORTED_BLOCKS.includes( settings.name ) && isAnyControlEnabledGlobal() ) {
            settings.attributes = Object.assign( settings.attributes, {
                advgbBlockControls: {
                    type: 'array',
                    items: {
                        type: 'object'
                    },
                    default: []
                }
            } );
        }

        return settings;
    } );

    const withEditControls = createHigherOrderComponent( ( BlockEdit ) => {

        return class BlockControlsEdit extends Component {

            constructor(props) {
              super(...props);

              this.state = {
                  taxModOptions: [], // Store modified taxonomy options to decide if selected tax is for "all terms" or "selected terms"
                  termOptions: [], // Store term options with slug (id) and title
                  searchTermWord: '', // Updated when searching terms
                  initArchive: true, // When true, trigger initArchiveControl()
                  updateTaxLabels: false // When true, update taxonomy option labels
              }

              this.isPost = this.isPost.bind(this);
            }

            /**
             * Get filtered term slugs based on selected taxonomies
             *
             * @since 3.1.1
             * @param {array} taxonomies Array of taxonomies slugs
             *
             * @return {array}
             */
            getTermSlugs( taxonomies ) {
                const allTaxonomies = this.getTaxonomies();
                let terms = [];

                taxonomies.forEach( ( tax ) => {
                    const allTaxonomies = this.getTaxonomies();
                    const itemIndex = allTaxonomies.findIndex( ( element ) => element.slug === tax );

                    allTaxonomies[itemIndex].terms.forEach( ( term ) => {
                        terms.push( term.slug );
                    } );
                } );

                return terms;
            }

            /**
             * Get taxonomies
             *
             * @since 3.1.1
             *
             * @return {array}
             */
            getTaxonomies() {
                return typeof advgb_block_controls_vars.taxonomies !== 'undefined'
                        && advgb_block_controls_vars.taxonomies.length > 0
                            ? advgb_block_controls_vars.taxonomies
                            : [];
            }

            /**
             * Get all the available user roles from the site
             *
             * @since 3.1.0
             *
             * @return {array}
             */
            getUserRoles() {
                return typeof advgb_block_controls_vars.user_roles !== 'undefined'
                        && advgb_block_controls_vars.user_roles.length > 0
                            ? advgb_block_controls_vars.user_roles
                            : [];
            }

            /**
             * Get filtered terms based on selected taxonomies
             *
             * @since 3.1.1
             * @param {array} taxonomies Taxonomies slugs
             *
             * @return {array}
             */
            getTerms( taxonomies ) {
                const allTaxonomies = this.getTaxonomies();
                let terms = [];

                taxonomies.forEach( ( tax ) => {
                    const allTaxonomies = this.getTaxonomies();
                    const itemIndex = allTaxonomies.findIndex( ( element ) => element.slug === tax );

                    allTaxonomies[itemIndex].terms.forEach( ( term ) => {
                        terms.push( {
                            slug: term.slug,
                            title: `${term.title} (${allTaxonomies[itemIndex].title})`
                        } );
                    } );
                } );

                return terms;
            }

            /**
             * Get pages
             *
             * @since 3.1.1
             *
             * @return {array}
             */
            getPages() {
                return typeof advgb_block_controls_vars.page !== 'undefined'
                        && advgb_block_controls_vars.page.length > 0
                            ? advgb_block_controls_vars.page
                            : [];
            }

            /**
             * Update advgbBlockControls attribute when a key value changes
             *
             * @since 2.14.0
             * @param {string} control  The use case block control. e.g. 'schedule'
             * @param {string} key      The control key to modify. e.g. 'enabled'
             * @param {string} value    The control key value (not required for boolean keys)
             *
             * @return {void}
             */
            changeControlKey( control, key, value = '' ) {
                const { attributes, setAttributes } = this.props;
                const { advgbBlockControls } = attributes;

                // Control objects to add  when enabled for the first time
                const scheduleControl = {
                    control: 'schedule',
                    enabled: true,
                    dateFrom: null,
                    dateTo: null,
                    recurring: false
                };
                const userRoleControl = {
                    control: 'user_role',
                    enabled: true,
                    roles: [],
                    approach: 'public'
                };
                const archiveControl = {
                    control: 'archive',
                    enabled: true,
                    taxonomies: [],
                    approach: 'exclude'
                };
                const pageControl = {
                    control: 'page',
                    enabled: true,
                    pages: [],
                    approach: 'exclude'
                };

                // Check if advgbBlockControls attribute exists
                const controlsAdded = typeof advgbBlockControls !== 'undefined' && advgbBlockControls.length
                                        ? true
                                        : false;
                // Check if control exists in advgbBlockControls array
                const controlExists = controlsAdded &&
                                    advgbBlockControls.some( (element) => element.control === control )
                                        ? true
                                        : false;

                if( controlExists ) {
                    const itemIndex = advgbBlockControls.findIndex(element => element.control === control);

                    // No control found (this check seems not necessary but is here to prevent an unlikely error)
                    if( itemIndex < 0 ) {
                        return false;
                    }

                    let newArray    = [...advgbBlockControls];
                    const obj       = newArray[itemIndex];

                    newArray[itemIndex] = typeof obj[key] === 'boolean'
                        ? { ...newArray[itemIndex], [key]: !obj[key] }
                        : { ...newArray[itemIndex], [key]: value }

                    setAttributes( {
                        advgbBlockControls: newArray
                    } );
                } else if( controlsAdded && ! controlExists ) {

                    // Add a new control object when other controls already exists
                    switch( control ) {
                        case 'schedule':
                            setAttributes( {
                                advgbBlockControls: [
                                    ...advgbBlockControls,
                                    scheduleControl
                                ]
                            } );
                        break;

                        case 'user_role':
                            setAttributes( {
                                advgbBlockControls: [
                                    ...advgbBlockControls,
                                    userRoleControl
                                ]
                            } );
                        break;

                        case 'archive':
                            setAttributes( {
                                advgbBlockControls: [
                                    ...advgbBlockControls,
                                    archiveControl
                                ]
                            } );
                        break;

                        case 'page':
                            setAttributes( {
                                advgbBlockControls: [
                                    ...advgbBlockControls,
                                    pageControl
                                ]
                            } );
                        break;
                    }
                } else {
                    // Add the first control object attribute
                    switch( control ) {
                        case 'schedule':
                            setAttributes( {
                                advgbBlockControls: [ scheduleControl ]
                            } );
                        break;

                        case 'user_role':
                            setAttributes( {
                                advgbBlockControls: [ userRoleControl ]
                            } );
                        break;

                        case 'archive':
                            setAttributes( {
                                advgbBlockControls: [ archiveControl ]
                            } );
                        break;

                        case 'page':
                            setAttributes( {
                                advgbBlockControls: [ pageControl ]
                            } );
                        break;
                    }
                }
            }

            /**
             * Update archive control in advgbBlockControls attribute when taxonomies value changes
             *
             * @since 3.1.2
             *
             * @param {string} topic 'taxonomies' or 'terms'
             * @param {string} slugs The taxonomy slugs or term ids to insert/modify. e.g. ['category','post_tag'] or [82,161,99] or ['all_<taxonomy_slug>']
             *
             * @return {void}
             */
            changeArchiveControl( topic, slugs ) {
                const { attributes, setAttributes } = this.props;
                const { advgbBlockControls } = attributes;

                let taxArray        = [];
                const controlIndex  = advgbBlockControls.findIndex(element => element.control === 'archive');

                // No control found (this check seems not necessary but is here to prevent an unlikely error)
                if( controlIndex < 0 ) {
                    return false;
                }

                let newArray = [...advgbBlockControls];

                if( topic === 'taxonomies' ) {

                    // Check each taxonomy and its terms
                    slugs.forEach( (item) => {

                        // Get terms from current taxonomy (item)
                        const taxIndex = newArray[controlIndex].taxonomies.findIndex(element => element.tax === item);

                        if( taxIndex === -1 ) {

                            // The last selected taxonomy
                            taxArray.push( {
                                tax: item,
                                terms: [],
                                all: true
                            } );

                        } else {

                            // Existing taxonomy
                            const terms     = newArray[controlIndex].taxonomies[taxIndex].terms.length
                                                ? newArray[controlIndex].taxonomies[taxIndex].terms
                                                : [];
                            const approach  = terms.length ? 'select' : 'all';

                            taxArray.push( {
                                tax: item,
                                terms: terms,
                                all: terms.length ? false : true
                            } );
                        }
                    } );

                    newArray[controlIndex] = { ...newArray[controlIndex], ['taxonomies']: taxArray }

                    setAttributes( {
                        advgbBlockControls: newArray
                    } );

                } else if( topic === 'terms' ) {

                    let terms           = {};
                    const taxonomies    = this.currentArchiveControl( 'taxonomies' );

                    // Check each term id (item). slug means the id
                    slugs.forEach( ( item ) => {

                        // Find the current term in termOptions state to use its tax later
                        const option = this.state.termOptions.find( el => el.slug === item);

                        if( terms[option.tax] === undefined ) {
                            terms[option.tax] = [];
                        }

                        // Get taxonomy from current term (item)
                        const taxIndex = newArray[controlIndex].taxonomies.findIndex( element => element.tax === option.tax);

                        /* Taxonomy for this term is selected? Is a bit reduntant but let's make sure
                         * Then include the term.
                         */
                        if( taxonomies.includes( option.tax ) ) {
                            terms[option.tax].push( item );
                        }

                    } );

                    // Update taxonomies with at least one term selected
                    Object.keys( terms ).forEach( (tax) => {

                        // Get taxonomy from current tax
                        const taxIndex = newArray[controlIndex].taxonomies.findIndex( element => element.tax === tax);

                        if( taxIndex >= 0 ) {
                            newArray[controlIndex].taxonomies[taxIndex] = {
                                tax: tax,
                                terms: terms[tax],
                                all: terms[tax].length ? false : true
                            };
                        }
                    } );

                    // Include taxonomies with no terms selected (empty terms[option.tax] array)
                    taxonomies.forEach( ( tax ) => {
                        if( ! Object.keys( terms ).includes( tax ) ) {

                            // Get taxonomy from current tax
                            const taxIndex = newArray[controlIndex].taxonomies.findIndex( element => element.tax === tax);

                            if( taxIndex >= 0 ) {
                                newArray[controlIndex].taxonomies[taxIndex] = {
                                    tax: tax,
                                    terms: [],
                                    all: true
                                };
                            }
                        }
                    } );

                    setAttributes( {
                        advgbBlockControls: newArray
                    } );

                } else {
                    // Nothing to do here
                }
            }

            /**
             * Return merged taxonomies or terms
             *
             * @since 3.1.2
             *
             * @param {string} topic 'taxonomies' or 'terms'
             *
             * @return {array} An single array with all the selected terms or taxonomies ['category','post_tag'] or [99,182,42]
             */
            currentArchiveControl( topic ) {
                const { attributes, setAttributes } = this.props;
                const { advgbBlockControls } = attributes;

                let result = [];

                /* Get all the taxonomy objects.
                 * e.g.
                 * [
                 *     { "tax": "post_tag", "terms": [220,221]},
                 *     { "tax": "category", "terms": []}
                 * ]
                 */
                const taxonomies    = currentControlKey( advgbBlockControls, 'archive', 'taxonomies' ).length
                                        ? currentControlKey( advgbBlockControls, 'archive', 'taxonomies' )
                                        : [];

                if( topic === 'taxonomies' ) {

                    taxonomies.forEach( (item) => {
                        result.push(item.tax);
                    } );

                } else if( topic === 'terms' ) {

                    taxonomies.forEach( (item) => {
                        item.terms.forEach( ( el ) => {
                            result.push( el ); // term id
                        } );
                    } );

                } else {
                    // Nothing to do here
                }

                return result;
            }

            /**
             * Execute when taxonomy selection changes
             *
             * @since 3.1.1
             *
             * @return {void}
             */
            taxonomiesChanged() {
                const { attributes } = this.props;
                const { advgbBlockControls } = attributes;

                const currentTerms  = !! currentControlKey( advgbBlockControls, 'archive', 'terms' )
                                        ? currentControlKey( advgbBlockControls, 'archive', 'terms' )
                                        : [];
                const taxonomies    = !! currentControlKey( advgbBlockControls, 'archive', 'taxonomies' )
                                        ? currentControlKey( advgbBlockControls, 'archive', 'taxonomies' )
                                        : [];

                if( currentTerms.length ) {

                   let result = [];
                   currentTerms.forEach( ( slug ) => {
                       const itemIndex = this.state.termOptions.findIndex( ( item ) => item.slug === slug );

                       /* Get only the terms that belongs to selected taxonomies
                        * and skip the ones that belongs to the deleted taxonomy
                        */
                       if( taxonomies.includes( this.state.termOptions[itemIndex].tax ) ) {
                          result.push( this.state.termOptions[itemIndex].slug );
                       }
                   } );

                   this.changeControlKey(
                       'archive',
                       'terms',
                       result
                   );
                }

                /* Remove term options from non-selected taxonomies.
                 * Case scenario: the terms from the last removed taxonomy.
                 */
                this.setState( {
                    termOptions: this.state.termOptions.filter( (item) => {
                        return this.currentArchiveControl( 'taxonomies' ).includes( item.tax );
                    } )
                } );

                // Update tax label options to "All <taxonomy> terms" or "Selected <taxonomy> terms"
                this.modifyTaxLabels();
            }

            /**
             * Get selected terms on first load
             *
             * @since 3.1.1
             *
             * @return {void}
             */
            initArchiveControl() {
                const { advgbBlockControls } = this.props.attributes;

                wp.apiFetch( {
                    path: wp.url.addQueryArgs(
                        'advgb/v1/terms',
                        {
                            taxonomies: this.currentArchiveControl( 'taxonomies' ),
                            ids: this.currentArchiveControl( 'terms' )
                        }
                    )
                } ).then( ( list ) => {

                    // Update tax label options to "All <taxonomy> terms" or "Selected <taxonomy> terms"
                    this.modifyTaxLabels();

                    this.setState( {
                        termOptions: list,
                        initArchive: false,
                        updateTaxLabels: false
                    } );
                } );


            }

            /**
             * Initial taxonomy labels to allow "All <taxonomy> terms" "Selected <taxonomy> terms" visual indicator
             *
             * @since 3.1.2
             *
             * @return {array}
             */
            iniTaxLabels() {

                let result = [];
                this.getTaxonomies().forEach( (item) => {
                    /* Item example
                     *  {
                     *      "slug": "category",
                     *      "title": "All Category terms",
                     *      "singular": "Category"
                     *  }
                     */
                    result.push( {
                        slug: item.slug,
                        title: sprintf(
                            __( 'All %s terms', 'advanced-gutenberg' ),
                            item.title
                        ),
                        singular: item.title

                    } );
                } );

                return result;
            }

            /**
             * Modify taxonomy labels. Very similar to iniTaxLabels()
             *
             * @since 3.1.2
             *
             * @return {array}
             */
            modifyTaxLabels() {
                const { advgbBlockControls } = this.props.attributes;

                /* Get all selected taxonomy objects.
                 * e.g.
                 * [
                 *     { "tax": "post_tag", "terms": [220,221]},
                 *     { "tax": "category", "terms": []}
                 * ]
                 */
                const taxonomies    = currentControlKey( advgbBlockControls, 'archive', 'taxonomies' ).length
                                        ? currentControlKey( advgbBlockControls, 'archive', 'taxonomies' )
                                        : [];

                // Copy whole state
                let options = [...this.state.taxModOptions];

                options.forEach( (item, index) => {
                    const tax = taxonomies.find( el => item.slug === el.tax );

                    // Copy option to modify
                    let option = { ...options[index] };
                    // Update title value
                    option.title = sprintf(
                        tax === undefined || ! tax.terms.length
                            ? __( 'All %s terms', 'advanced-gutenberg' )
                            : __( 'Selected %s terms', 'advanced-gutenberg' ),
                        option.singular
                    );
                    // Add option back to the state
                    options[index] = option;
                } );

                // Save
                this.setState( {
                    taxModOptions: options,
                    updateTaxLabels: false
                } );
            }

            /**
             * Search terms based on search
             *
             * @since 3.1.1
             *
             * @return {void}
             */
            searchTerms() {
                const { termOptions, searchTermWord } = this.state;
                const { advgbBlockControls } = this.props.attributes;

                wp.apiFetch( {
                    /*/ To get taxonomies
                    path: wp.url.addQueryArgs( 'wp/v2/taxonomies', { context: 'edit' } )*/

                    path: wp.url.addQueryArgs(
                        'advgb/v1/terms',
                        {
                            search: searchTermWord,
                            taxonomies: this.currentArchiveControl( 'taxonomies' )
                        }
                    )

                } ).then( ( list ) => {

                    /*/ To get taxonomies
                    Object.keys(list).forEach( (item) => {
                        options.push( {
                            label: list[item].name,
                            value: list[item].slug
                        } );
                    });*/

                    // Merge selected terms with results from fetch
                    let options = [ ...termOptions, ...list ];

                    // Remove duplicated values
                    options = Array.from( new Set( options.map( a => a.slug ) ) )
                        .map( slug => {
                            return options.find( a => a.slug === slug )
                        });

                    this.setState( {
                        termOptions: options
                    } );
                } );
            }

            /**
             * Check if we're in post edit screen
             *
             * @since 3.1.2
             *
             * @return {bool}
             */
            isPost() {
                return wp.data.select('core/editor') && wp.data.select('core/editor').getCurrentPostId();
            }

            componentDidMount() {
                this.setState( {
                    taxModOptions: this.iniTaxLabels()
                } );
            }

            componentDidUpdate(prevProps, prevState) {
                const { attributes, isSelected, name } = this.props;
                const { advgbBlockControls } = attributes;
                const { advgbBlockControls: prevBlockControls } = prevProps.attributes;
                const { searchTermWord, initArchive } = this.state;
                const { searchTermWord: prevTermWord } = prevState;

                // Get human readable selected terms on block selection the first time
                if( ! this.isPost()
                    && ! NON_SUPPORTED_BLOCKS.includes( name )
                    && isSelected
                    && initArchive
                    && isControlEnabled( advgb_block_controls_vars.controls.archive )
                    && currentControlKey( advgbBlockControls, 'archive', 'enabled' )
                    && this.currentArchiveControl( 'taxonomies' ).length
                    && this.currentArchiveControl( 'terms' ).length
                ) {
                    this.initArchiveControl();
                }

                // Search terms
                if( searchTermWord !== prevTermWord && searchTermWord.length > 2 ) {
                    this.searchTerms();
                }

                // Update available terms and remove terms which taxonomy has been removed
                if( ! this.isPost()
                    && isControlEnabled( advgb_block_controls_vars.controls.archive )
                    && currentControlKey( advgbBlockControls, 'archive', 'enabled' )
                    && (
                        currentControlKey( prevBlockControls, 'archive', 'taxonomies' ) !== currentControlKey( advgbBlockControls, 'archive', 'taxonomies' ) // This trigger works when taxo changes, but not terms
                        || this.state.updateTaxLabels // Trigger when terms changes
                    )
                ) {
                    this.taxonomiesChanged();
                }
            }

            render() {
                const { attributes, setAttributes } = this.props;
                const { advgbBlockControls } = attributes;

                return ( [
                        this.props.isSelected && ( ! NON_SUPPORTED_BLOCKS.includes( this.props.name ) )
                        && isAnyControlEnabledGlobal() &&
                        <InspectorControls key="advgb-bc-controls">
                            <PanelBody
                                title={ __( 'Block Controls', 'advanced-gutenberg' ) }
                                icon="visibility"
                                initialOpen={ false }
                                className={
                                    isAnyControlEnabledBlock( advgbBlockControls )
                                        ? 'advgb-feature-icon-active' : ''
                                }
                            >
                                { isControlEnabled( advgb_block_controls_vars.controls.schedule ) && (
                                <Fragment>
                                    <ToggleControl
                                        label={ __( 'Schedule', 'advanced-gutenberg' ) }
                                        help={ currentControlKey( advgbBlockControls, 'schedule', 'enabled' )
                                            ? __( 'Choose when to start showing and/or stop showing this block.', 'advanced-gutenberg' )
                                            : ''
                                        }
                                        checked={ currentControlKey( advgbBlockControls, 'schedule', 'enabled' ) }
                                        onChange={ () => this.changeControlKey( 'schedule', 'enabled' ) }
                                    />
                                    { currentControlKey( advgbBlockControls, 'schedule', 'enabled' ) && (
                                        <Fragment>
                                            <div style={ { marginBottom: 30 } }>
                                                <AdvDateTimeControl
                                                    buttonLabel={ __( 'Now', 'advanced-gutenberg' ) }
                                                    dateLabel={ __( 'Start showing', 'advanced-gutenberg' ) }
                                                    date={ currentControlKey( advgbBlockControls, 'schedule', 'dateFrom' ) }
                                                    onChangeDate={ ( newDate ) => this.changeControlKey( 'schedule', 'dateFrom', newDate ) }
                                                    onDateClear={ () => this.changeControlKey( 'schedule', 'dateFrom', null ) }
                                                    onInvalidDate={ false }
                                                />
                                                <AdvDateTimeControl
                                                    buttonLabel={ __( 'Never', 'advanced-gutenberg' ) }
                                                    dateLabel={ __( 'Stop showing', 'advanced-gutenberg' ) }
                                                    date={ !! currentControlKey( advgbBlockControls, 'schedule', 'dateTo' ) ? currentControlKey( advgbBlockControls, 'schedule', 'dateTo' ) : null }
                                                    onChangeDate={ ( newDate ) => this.changeControlKey( 'schedule', 'dateTo', newDate ) }
                                                    onDateClear={ () => this.changeControlKey( 'schedule', 'dateTo', null ) }
                                                    onInvalidDate={ ( date ) => {
                                                        // Disable all dates before dateFrom
                                                        if( currentControlKey( advgbBlockControls, 'schedule', 'dateFrom' ) ) {
                                                            let thisDate = new Date(date.getTime());
                                                            thisDate.setHours(0, 0, 0, 0);
                                                            let fromDate = new Date( currentControlKey( advgbBlockControls, 'schedule', 'dateFrom' ) );
                                                            fromDate.setHours(0, 0, 0, 0);
                                                            return thisDate.getTime() < fromDate.getTime();
                                                        }
                                                    } }
                                                />
                                                { ( currentControlKey( advgbBlockControls, 'schedule', 'dateFrom' ) > currentControlKey( advgbBlockControls, 'schedule', 'dateTo' ) ) &&
                                                    <Notice
                                                        className="advgb-notice-sidebar"
                                                        status="warning"
                                                        isDismissible={ false }
                                                    >
                                                        { __( '"Stop showing" date should be after "Start showing" date!', 'advanced-gutenberg' ) }
                                                    </Notice>
                                                }
                                                { currentControlKey( advgbBlockControls, 'schedule', 'dateFrom' ) && currentControlKey( advgbBlockControls, 'schedule', 'dateTo' ) &&
                                                    <ToggleControl
                                                        label={ __( 'Recurring', 'advanced-gutenberg' ) }
                                                        checked={ currentControlKey( advgbBlockControls, 'schedule', 'recurring' ) }
                                                        onChange={ () => this.changeControlKey( 'schedule', 'recurring' ) }
                                                        help={ __( 'If Recurring is enabled, this block will be displayed every year between the selected dates.', 'advanced-gutenberg' ) }
                                                    />
                                                }
                                                <AdvDaysControl
                                                    label={ __( 'On these days (optional)', 'advanced-gutenberg' ) }
                                                    days={
                                                        !! currentControlKey( advgbBlockControls, 'schedule', 'days' )
                                                            ? currentControlKey( advgbBlockControls, 'schedule', 'days' )
                                                            : []
                                                    }
                                                    onChangeDays={ ( value ) => this.changeControlKey( 'schedule', 'days', value ) }
                                                />
                                                <label style={ { marginBottom: 8, display: 'block' } }>
                                                    { __( 'Between these times (optional)', 'advanced-gutenberg' ) }
                                                </label>
                                                <AdvTimeControl
                                                    label={ __( 'From', 'advanced-gutenberg' ) }
                                                    currentTime={
                                                        !! currentControlKey( advgbBlockControls, 'schedule', 'timeFrom' )
                                                            ? currentControlKey( advgbBlockControls, 'schedule', 'timeFrom' )
                                                            : null
                                                    }
                                                    onChangeTime={
                                                        ( newTime ) => this.changeControlKey(
                                                            'schedule',
                                                            'timeFrom',
                                                            newTime
                                                        )
                                                    }
                                                    onTimeClear={ () => this.changeControlKey( 'schedule', 'timeFrom', null ) }
                                                />
                                                <AdvTimeControl
                                                    label={ __( 'To', 'advanced-gutenberg' ) }
                                                    currentTime={
                                                        currentControlKey( advgbBlockControls, 'schedule', 'timeTo' ) || null
                                                    }
                                                    onChangeTime={
                                                        ( newTime ) => this.changeControlKey(
                                                            'schedule',
                                                            'timeTo',
                                                            newTime
                                                        )
                                                    }
                                                    onTimeClear={ () => this.changeControlKey( 'schedule', 'timeTo', null ) }
                                                />
                                                { (
                                                    currentControlKey( advgbBlockControls, 'schedule', 'timeFrom' )
                                                    && currentControlKey( advgbBlockControls, 'schedule', 'timeTo' )
                                                    && (
                                                        '01/01/2020T' + currentControlKey( // We append a dummy date to make a datetime comparison
                                                            advgbBlockControls, 'schedule', 'timeFrom'
                                                        ) >= '01/01/2020T' + currentControlKey( // We append a dummy date to make a datetime comparison
                                                            advgbBlockControls, 'schedule', 'timeTo'
                                                        )
                                                    )
                                                ) &&
                                                    <Notice
                                                        className="advgb-notice-sidebar"
                                                        status="warning"
                                                        isDismissible={ false }
                                                    >
                                                        { __( '"To" time should be after "From" time!', 'advanced-gutenberg' ) }
                                                    </Notice>
                                                }
                                                { (
                                                    (
                                                        currentControlKey( advgbBlockControls, 'schedule', 'timeFrom' )
                                                        && ! currentControlKey( advgbBlockControls, 'schedule', 'timeTo' )
                                                    ) || (
                                                        ! currentControlKey( advgbBlockControls, 'schedule', 'timeFrom' )
                                                        && currentControlKey( advgbBlockControls, 'schedule', 'timeTo' )
                                                    )
                                                ) &&
                                                    <Notice
                                                        className="advgb-notice-sidebar"
                                                        status="warning"
                                                        isDismissible={ false }
                                                    >
                                                        { __( 'Please choose "From" time and "To" time.', 'advanced-gutenberg' ) }
                                                    </Notice>
                                                }

                                                <Notice
                                                    className="advgb-notice-sidebar"
                                                    status="info"
                                                    isDismissible={ false }
                                                >
                                                    { typeof advgbBlocks.timezone !== 'undefined' && advgbBlocks.timezone.length
                                                        ? `${advgbBlocks.timezone.replace(/_/g, ' ')} ${__( 'time', 'advanced-gutenberg' )}`
                                                        : __( 'WordPress settings timezone', 'advanced-gutenberg' ) }
                                                </Notice>
                                            </div>
                                        </Fragment>
                                    ) }
                                </Fragment>
                                ) }
                                { isControlEnabled( advgb_block_controls_vars.controls.user_role ) && (
                                <Fragment>
                                    <ToggleControl
                                        label={ __( 'User roles', 'advanced-gutenberg' ) }
                                        help={ currentControlKey( advgbBlockControls, 'user_role', 'enabled' )
                                            ? __( 'Choose which users can see this block.', 'advanced-gutenberg' )
                                            : ''
                                        }
                                        checked={ currentControlKey( advgbBlockControls, 'user_role', 'enabled' ) }
                                        onChange={ () => this.changeControlKey( 'user_role', 'enabled' ) }
                                    />
                                    { currentControlKey( advgbBlockControls, 'user_role', 'enabled' ) && (
                                        <Fragment>
                                            <div className="advgb-revert-mb">
                                                <SelectControl
                                                    value={
                                                        currentControlKey( advgbBlockControls, 'user_role', 'approach' )
                                                    }
                                                    options={ [
                                                        {
                                                            value: 'public',
                                                            label: __( 'Show to everyone', 'advanced-gutenberg' )
                                                        },
                                                        {
                                                            value: 'hidden',
                                                            label: __( 'Hide from everyone', 'advanced-gutenberg' )
                                                        },
                                                        {
                                                            value: 'login',
                                                            label: __( 'Show to logged in users', 'advanced-gutenberg' )
                                                        },
                                                        {
                                                            value: 'logout',
                                                            label: __( 'Show to logged out users', 'advanced-gutenberg' )
                                                        },
                                                        {
                                                            value: 'include',
                                                            label: __( 'Show to the selected user roles', 'advanced-gutenberg' )
                                                        },
                                                        {
                                                            value: 'exclude',
                                                            label: __( 'Hide from the selected user roles', 'advanced-gutenberg' )
                                                        }
                                                    ] }
                                                    onChange={ ( value ) => this.changeControlKey( 'user_role', 'approach', value ) }
                                                />
                                            </div>
                                            { ( currentControlKey( advgbBlockControls, 'user_role', 'approach' ) === 'include' ||
                                                currentControlKey( advgbBlockControls, 'user_role', 'approach' ) === 'exclude'
                                            ) && (
                                                <Fragment>
                                                    <FormTokenField
                                                        multiple
                                                        label={ __( 'Select user roles', 'advanced-gutenberg' ) }
                                                        placeholder={ __( 'Search', 'advanced-gutenberg' ) }
                                                        suggestions={ getOptionSuggestions( this.getUserRoles() ) }
                                                        maxSuggestions={ 10 }
                                                        value={
                                                            getOptionTitles(
                                                                !! currentControlKey( advgbBlockControls, 'user_role', 'roles' )
                                                                    ? currentControlKey( advgbBlockControls, 'user_role', 'roles' )
                                                                    : [],
                                                                this.getUserRoles()
                                                            )
                                                        }
                                                        onChange={ ( value ) => {
                                                            this.changeControlKey( 'user_role', 'roles', getOptionSlugs( value, this.getUserRoles() ) )
                                                        } }
                                                        __experimentalExpandOnFocus
                                                    />
                                                    { ( currentControlKey( advgbBlockControls, 'user_role', 'approach' ) === 'include' ||
                                                        currentControlKey( advgbBlockControls, 'user_role', 'approach' ) === 'exclude'
                                                    )
                                                    && ! currentControlKey( advgbBlockControls, 'user_role', 'roles' ).length && (
                                                        <Notice
                                                                className="advgb-notice-sidebar"
                                                                status="warning"
                                                                isDismissible={ false }
                                                                style={ { marginBottom: 30 } }
                                                            >
                                                            {
                                                                __(
                                                                    'Please select at least one user role.',
                                                                    'advanced-gutenberg'
                                                                )
                                                            }
                                                        </Notice>
                                                    ) }
                                                </Fragment>
                                            ) }
                                        </Fragment>
                                    ) }
                                </Fragment>
                                ) }
                                { ! this.isPost() && ( // Disabled in post edit
                                    <Fragment>
                                        { isControlEnabled( advgb_block_controls_vars.controls.archive ) && (
                                        <Fragment>
                                            <ToggleControl
                                                label={ __( 'Term archives', 'advanced-gutenberg' ) }
                                                help={ currentControlKey( advgbBlockControls, 'archive', 'enabled' )
                                                    ? __( 'Choose on which taxonomies and terms archive pages your blocks can be displayed.', 'advanced-gutenberg' )
                                                    : ''
                                                }
                                                checked={ currentControlKey( advgbBlockControls, 'archive', 'enabled' ) }
                                                onChange={ () => this.changeControlKey( 'archive', 'enabled' ) }
                                            />
                                            { currentControlKey( advgbBlockControls, 'archive', 'enabled' ) && (
                                                <Fragment>
                                                    <div className="advgb-revert-mb--disabled" style={{ marginBottom: 20 }}>
                                                        <SelectControl
                                                            value={
                                                                currentControlKey( advgbBlockControls, 'archive', 'approach' )
                                                            }
                                                            options={ [
                                                                {
                                                                    value: 'include',
                                                                    label: __( 'Show for selected terms', 'advanced-gutenberg' )
                                                                },
                                                                {
                                                                    value: 'exclude',
                                                                    label: __( 'Hide for selected terms', 'advanced-gutenberg' )
                                                                }
                                                            ] }
                                                            onChange={ ( value ) => this.changeControlKey( 'archive', 'approach', value ) }
                                                        />
                                                    </div>
                                                    <FormTokenField
                                                        multiple
                                                        label={ __( 'Select taxonomies', 'advanced-gutenberg' ) }
                                                        placeholder={ __( 'Search taxonomies', 'advanced-gutenberg' ) }
                                                        suggestions={ getOptionSuggestions( this.state.taxModOptions || this.getTaxonomies() ) }
                                                        maxSuggestions={ 10 }
                                                        value={
                                                            getOptionTitles(
                                                                this.currentArchiveControl( 'taxonomies' ),
                                                                this.state.taxModOptions || this.getTaxonomies()
                                                            )
                                                        }
                                                        onChange={ ( value ) => {
                                                            this.changeArchiveControl(
                                                                'taxonomies',
                                                                getOptionSlugs( value, this.state.taxModOptions || this.getTaxonomies() )
                                                            );
                                                        } }
                                                        __experimentalExpandOnFocus
                                                    />
                                                    { ( currentControlKey( advgbBlockControls, 'archive', 'taxonomies' ).length > 0 ) && (
                                                        <Fragment>
                                                            <FormTokenField
                                                                multiple
                                                                label={ __( 'Filter terms', 'advanced-gutenberg' ) }
                                                                placeholder={ __( 'Search terms', 'advanced-gutenberg' ) }
                                                                suggestions={ getOptionSuggestions(
                                                                    this.state.termOptions
                                                                ) }
                                                                maxSuggestions={ 10 }
                                                                value={
                                                                    getOptionTitles(
                                                                        this.currentArchiveControl( 'terms' ),
                                                                        this.state.termOptions
                                                                    )
                                                                }
                                                                onChange={ ( value ) => {
                                                                    this.changeArchiveControl(
                                                                        'terms',
                                                                        getOptionSlugs(
                                                                            value,
                                                                            this.state.termOptions
                                                                        )
                                                                    );
                                                                    this.setState( {
                                                                        updateTaxLabels: true
                                                                    } );
                                                                } }
                                                                onInputChange={ ( value ) => {
                                                                    this.setState( {
                                                                        searchTermWord: value
                                                                    } );
                                                                } }
                                                                __experimentalShowHowTo={ false }
                                                            />
                                                            <div className="advgb-revert-mb--disabled components-form-token-field__help"
                                                                style={{ marginBottom: 20 }}>
                                                                { __(
                                                                    'Use this filter to apply only to some terms.',
                                                                    'advanced-gutenberg'
                                                                ) }
                                                            </div>
                                                        </Fragment>
                                                    ) }
                                                </Fragment>
                                            ) }
                                        </Fragment>
                                        ) }

                                        { isControlEnabled( advgb_block_controls_vars.controls.page ) && (
                                        <Fragment>
                                            <ToggleControl
                                                label={ __( 'Pages', 'advanced-gutenberg' ) }
                                                help={ currentControlKey( advgbBlockControls, 'page', 'enabled' )
                                                    ? __( 'Choose in which pages this block can be displayed.', 'advanced-gutenberg' )
                                                    : ''
                                                }
                                                checked={ currentControlKey( advgbBlockControls, 'page', 'enabled' ) }
                                                onChange={ () => this.changeControlKey( 'page', 'enabled' ) }
                                            />
                                            { currentControlKey( advgbBlockControls, 'page', 'enabled' ) && (
                                                <Fragment>
                                                    <div className="advgb-revert-mb">
                                                        <SelectControl
                                                            value={
                                                                currentControlKey( advgbBlockControls, 'page', 'approach' )
                                                            }
                                                            options={ [
                                                                {
                                                                    value: 'include',
                                                                    label: __( 'Show on the selected pages', 'advanced-gutenberg' )
                                                                },
                                                                {
                                                                    value: 'exclude',
                                                                    label: __( 'Hide on the selected pages', 'advanced-gutenberg' )
                                                                }
                                                            ] }
                                                            onChange={ ( value ) => this.changeControlKey( 'page', 'approach', value ) }
                                                        />
                                                    </div>
                                                    { ( currentControlKey( advgbBlockControls, 'page', 'approach' ) === 'include' ||
                                                        currentControlKey( advgbBlockControls, 'page', 'approach' ) === 'exclude'
                                                    ) && (
                                                        <FormTokenField
                                                            multiple
                                                            label={ __( 'Select pages', 'advanced-gutenberg' ) }
                                                            placeholder={ __( 'Search', 'advanced-gutenberg' ) }
                                                            suggestions={ getOptionSuggestions( this.getPages() ) }
                                                            maxSuggestions={ 10 }
                                                            value={
                                                                getOptionTitles(
                                                                    !! currentControlKey( advgbBlockControls, 'page', 'pages' )
                                                                        ? currentControlKey( advgbBlockControls, 'page', 'pages' )
                                                                        : [],
                                                                    this.getPages()
                                                                )
                                                            }
                                                            onChange={ ( value ) => {
                                                                this.changeControlKey( 'page', 'pages', getOptionSlugs( value, this.getPages() ) )
                                                            } }
                                                            __experimentalExpandOnFocus
                                                        />
                                                    ) }
                                                </Fragment>
                                            ) }
                                        </Fragment>
                                        ) }
                                    </Fragment>
                                ) }
                            </PanelBody>
                        </InspectorControls>,
                        <BlockEdit key="block-edit-advgb-dates" {...this.props} />,
                    ] )
            }
        }
    }, 'withEditControls' );

    // Add option to add controls for supported blocks
    addFilter( 'editor.BlockEdit', 'advgb/addBlockControls', withEditControls );

    const withAttributes = createHigherOrderComponent( ( BlockListBlock ) => {
        return ( props ) => {
            if ( ( !NON_SUPPORTED_BLOCKS.includes( props.name ) ) && hasBlockSupport( props.name, 'advgb/blockControls', true ) && isAnyControlEnabledGlobal() ) {
                const { advgbBlockControls } = props.attributes;
                const advgbBcClass = props.isSelected === false
                    && isAnyControlEnabledBlock( advgbBlockControls )
                        ? 'advgb-bc-editor-preview' : '';

                return <BlockListBlock { ...props } className={ classnames( props.className, advgbBcClass ) } advgbBlockControls={ `${ advgbBlockControls }` } />;
            }

            return <BlockListBlock { ...props } />;
        };
    }, 'withAttributes' );

    // Apply attributes and CSS classes on backend
    addFilter( 'editor.BlockListBlock', 'advgb/loadBackendBlockControls', withAttributes );

})( wp.i18n, wp.hooks, wp.blocks, wp.blockEditor, wp.components, wp.compose, wp.element );
