import classnames from 'classnames';
import { AdvDateTimeControl } from "../0-adv-components/datetime.jsx";
import {
    getOptionSuggestions,
    getOptionTitles,
    getOptionSlugs
} from "../0-adv-components/utils.jsx";

(function ( wpI18n, wpHooks, wpBlocks, wpBlockEditor, wpComponents, wpCompose, wpElement ) {
    wpBlockEditor = wp.blockEditor || wp.editor;
    const { addFilter } = wpHooks;
    const { __ } = wpI18n;
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
                  termOptions: [], // Store term options with slug (id) and title
                  searchTermWord: '', // Updated when searching terms
                  initTaxonomy: true // When true, trigger initTaxonomyControl()
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
             * Get platforms
             *
             * @since 3.1.1
             *
             * @return {array}
             */
            getPlatforms() {
                return typeof advgb_block_controls_vars.platforms !== 'undefined'
                        && advgb_block_controls_vars.platforms.length > 0
                            ? advgb_block_controls_vars.platforms
                            : [];
            }

            /**
             * Get browsers
             *
             * @since 3.1.1
             *
             * @return {array}
             */
            getBrowsers() {
                return typeof advgb_block_controls_vars.browsers !== 'undefined'
                        && advgb_block_controls_vars.browsers.length > 0
                            ? advgb_block_controls_vars.browsers
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
             * @param {string} key      The control key value (not required for boolean keys)
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
                const browserControl = {
                    control: 'browser',
                    enabled: true,
                    browsers: [],
                    approach: 'public'
                };
                const platformControl = {
                    control: 'platform',
                    enabled: true,
                    platforms: [],
                    approach: 'public'
                };
                const taxonomyControl = {
                    control: 'taxonomy',
                    enabled: true,
                    taxonomies: [],
                    terms: [],
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

                        case 'browser':
                            setAttributes( {
                                advgbBlockControls: [
                                    ...advgbBlockControls,
                                    browserControl
                                ]
                            } );
                        break;

                        case 'platform':
                            setAttributes( {
                                advgbBlockControls: [
                                    ...advgbBlockControls,
                                    platformControl
                                ]
                            } );
                        break;

                        case 'taxonomy':
                            setAttributes( {
                                advgbBlockControls: [
                                    ...advgbBlockControls,
                                    taxonomyControl
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

                        case 'browser':
                            setAttributes( {
                                advgbBlockControls: [ browserControl ]
                            } );
                        break;

                        case 'platform':
                            setAttributes( {
                                advgbBlockControls: [ platformControl ]
                            } );
                        break;

                        case 'taxonomy':
                            setAttributes( {
                                advgbBlockControls: [ taxonomyControl ]
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
             * Execute when taxonomy selection changes
             *
             * @since 3.1.1
             *
             * @return {void}
             */
            taxonomiesChanged() {
                const { attributes } = this.props;
                const { advgbBlockControls } = attributes;

                const currentTerms  = !! currentControlKey( advgbBlockControls, 'taxonomy', 'terms' )
                                        ? currentControlKey( advgbBlockControls, 'taxonomy', 'terms' )
                                        : [];
                const taxonomies    = !! currentControlKey( advgbBlockControls, 'taxonomy', 'taxonomies' )
                                        ? currentControlKey( advgbBlockControls, 'taxonomy', 'taxonomies' )
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
                       'taxonomy',
                       'terms',
                       result
                   );
                }
            }

            /**
             * Get selected terms on first load
             *
             * @since 3.1.1
             *
             * @return {void}
             */
            initTaxonomyControl() {
                const { advgbBlockControls } = this.props.attributes;

                wp.apiFetch( {
                    path: wp.url.addQueryArgs(
                        'advgb/v1/terms',
                        {
                            taxonomies: !! currentControlKey( advgbBlockControls, 'taxonomy', 'taxonomies' )
                                ? currentControlKey( advgbBlockControls, 'taxonomy', 'taxonomies' )
                                : [],
                            ids: !! currentControlKey( advgbBlockControls, 'taxonomy', 'terms' )
                                ? currentControlKey( advgbBlockControls, 'taxonomy', 'terms' )
                                : []
                        }
                    )
                } ).then( ( list ) => {
                    this.setState( {
                        termOptions: list,
                        initTaxonomy: false
                    } );
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
                            taxonomies: !! currentControlKey( advgbBlockControls, 'taxonomy', 'taxonomies' )
                                ? currentControlKey( advgbBlockControls, 'taxonomy', 'taxonomies' )
                                : []
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

            componentDidUpdate(prevProps, prevState) {
                const { attributes, isSelected, name } = this.props;
                const { advgbBlockControls } = attributes;
                const { advgbBlockControls: prevBlockControls } = prevProps.attributes;
                const { searchTermWord, initTaxonomy } = this.state;
                const { searchTermWord: prevTermWord } = prevState;

                // Get human readable selected terms on selection one time
                if( ! this.isPost()
                    && ! NON_SUPPORTED_BLOCKS.includes( name )
                    && isSelected
                    && initTaxonomy
                    && isControlEnabled( advgb_block_controls_vars.controls.taxonomy )
                    && currentControlKey( advgbBlockControls, 'taxonomy', 'enabled' )
                    && currentControlKey( advgbBlockControls, 'taxonomy', 'taxonomies' ) !== null
                    && currentControlKey( advgbBlockControls, 'taxonomy', 'taxonomies' ).length
                    && currentControlKey( advgbBlockControls, 'taxonomy', 'terms' ) !== null
                    && currentControlKey( advgbBlockControls, 'taxonomy', 'terms' ).length
                ) {
                    console.log('initTaxonomy!!', currentControlKey( advgbBlockControls, 'taxonomy', 'taxonomies' ));
                    this.initTaxonomyControl();
                }

                // Search terms
                if( searchTermWord !== prevTermWord && searchTermWord.length > 2 ) {
                    /*console.log('prevTermWord',prevTermWord);
                    console.log('searchTermWord',searchTermWord);*/
                    this.searchTerms();
                }

                // Update available terms and remove terms which taxonomy has been removed
                if( ! this.isPost() &&
                    isControlEnabled( advgb_block_controls_vars.controls.taxonomy ) &&
                    currentControlKey( advgbBlockControls, 'taxonomy', 'enabled' ) &&
                    currentControlKey( prevBlockControls, 'taxonomy', 'taxonomies' ) !== currentControlKey( advgbBlockControls, 'taxonomy', 'taxonomies' )
                ) {
                    /*console.log('prevBlockControls',currentControlKey( prevBlockControls, 'taxonomy', 'taxonomies' ));
                    console.log('advgbBlockControls',currentControlKey( advgbBlockControls, 'taxonomy', 'taxonomies' ));
                    console.log('different!!!');*/
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
                                            ) }
                                        </Fragment>
                                    ) }
                                </Fragment>
                                ) }
                                { isControlEnabled( advgb_block_controls_vars.controls.browser ) && (
                                <Fragment>
                                    <ToggleControl
                                        label={ __( 'Browsers', 'advanced-gutenberg' ) }
                                        help={ currentControlKey( advgbBlockControls, 'browser', 'enabled' )
                                            ? __( 'Choose in which browsers this block can be displayed.', 'advanced-gutenberg' )
                                            : ''
                                        }
                                        checked={ currentControlKey( advgbBlockControls, 'browser', 'enabled' ) }
                                        onChange={ () => this.changeControlKey( 'browser', 'enabled' ) }
                                    />
                                    { currentControlKey( advgbBlockControls, 'browser', 'enabled' ) && (
                                        <Fragment>
                                            <div className="advgb-revert-mb">
                                                <SelectControl
                                                    value={
                                                        currentControlKey( advgbBlockControls, 'browser', 'approach' )
                                                    }
                                                    options={ [
                                                        {
                                                            value: 'public',
                                                            label: __( 'Show in all browsers', 'advanced-gutenberg' )
                                                        },
                                                        {
                                                            value: 'include',
                                                            label: __( 'Show in the selected browsers', 'advanced-gutenberg' )
                                                        },
                                                        {
                                                            value: 'exclude',
                                                            label: __( 'Hide in the selected browsers', 'advanced-gutenberg' )
                                                        }
                                                    ] }
                                                    onChange={ ( value ) => this.changeControlKey( 'browser', 'approach', value ) }
                                                />
                                            </div>
                                            { ( currentControlKey( advgbBlockControls, 'browser', 'approach' ) === 'include' ||
                                                currentControlKey( advgbBlockControls, 'browser', 'approach' ) === 'exclude'
                                            ) && (
                                                <Fragment>
                                                    <FormTokenField
                                                        multiple
                                                        label={ __( 'Select browsers', 'advanced-gutenberg' ) }
                                                        placeholder={ __( 'Search', 'advanced-gutenberg' ) }
                                                        suggestions={ getOptionSuggestions( this.getBrowsers() ) }
                                                        maxSuggestions={ 10 }
                                                        value={
                                                            getOptionTitles(
                                                                !! currentControlKey( advgbBlockControls, 'browser', 'browsers' )
                                                                    ? currentControlKey( advgbBlockControls, 'browser', 'browsers' )
                                                                    : [],
                                                                this.getBrowsers()
                                                            )
                                                        }
                                                        onChange={ ( value ) => {
                                                            this.changeControlKey( 'browser', 'browsers', getOptionSlugs( value, this.getBrowsers() ) )
                                                        } }
                                                        __experimentalExpandOnFocus
                                                    />
                                                    <Notice
                                                        className="advgb-notice-sidebar"
                                                        status="warning"
                                                        isDismissible={ false }
                                                    >
                                                    {
                                                        __(
                                                            'Please note the result could not be 100% accurate due some browsers can mimic a different browser.',
                                                            'advanced-gutenberg'
                                                        )
                                                    }
                                                    </Notice>
                                                </Fragment>
                                            ) }
                                        </Fragment>
                                    ) }
                                </Fragment>
                                ) }
                                { isControlEnabled( advgb_block_controls_vars.controls.platform ) && (
                                <Fragment>
                                    <ToggleControl
                                        label={ __( 'Platforms', 'advanced-gutenberg' ) }
                                        help={ currentControlKey( advgbBlockControls, 'platform', 'enabled' )
                                            ? __( 'Choose in which platforms this block can be displayed.', 'advanced-gutenberg' )
                                            : ''
                                        }
                                        checked={ currentControlKey( advgbBlockControls, 'platform', 'enabled' ) }
                                        onChange={ () => this.changeControlKey( 'platform', 'enabled' ) }
                                    />
                                    { currentControlKey( advgbBlockControls, 'platform', 'enabled' ) && (
                                        <Fragment>
                                            <div className="advgb-revert-mb">
                                                <SelectControl
                                                    value={
                                                        currentControlKey( advgbBlockControls, 'platform', 'approach' )
                                                    }
                                                    options={ [
                                                        {
                                                            value: 'public',
                                                            label: __( 'Show in all platforms', 'advanced-gutenberg' )
                                                        },
                                                        {
                                                            value: 'include',
                                                            label: __( 'Show in the selected platforms', 'advanced-gutenberg' )
                                                        },
                                                        {
                                                            value: 'exclude',
                                                            label: __( 'Hide in the selected platforms', 'advanced-gutenberg' )
                                                        }
                                                    ] }
                                                    onChange={ ( value ) => this.changeControlKey( 'platform', 'approach', value ) }
                                                />
                                            </div>
                                            { ( currentControlKey( advgbBlockControls, 'platform', 'approach' ) === 'include' ||
                                                currentControlKey( advgbBlockControls, 'platform', 'approach' ) === 'exclude'
                                            ) && (
                                                <Fragment>
                                                    <FormTokenField
                                                        multiple
                                                        label={ __( 'Select platforms', 'advanced-gutenberg' ) }
                                                        placeholder={ __( 'Search', 'advanced-gutenberg' ) }
                                                        suggestions={ getOptionSuggestions( this.getPlatforms() ) }
                                                        maxSuggestions={ 10 }
                                                        value={
                                                            getOptionTitles(
                                                                !! currentControlKey( advgbBlockControls, 'platform', 'platforms' )
                                                                    ? currentControlKey( advgbBlockControls, 'platform', 'platforms' )
                                                                    : [],
                                                                this.getPlatforms()
                                                            )
                                                        }
                                                        onChange={ ( value ) => {
                                                            this.changeControlKey( 'platform', 'platforms', getOptionSlugs( value, this.getPlatforms() ) )
                                                        } }
                                                        __experimentalExpandOnFocus
                                                    />
                                                    <Notice
                                                        className="advgb-notice-sidebar"
                                                        status="warning"
                                                        isDismissible={ false }
                                                    >
                                                    {
                                                        __(
                                                            'Please note the result could not be 100% accurate due some browsers can mimic a different platform.',
                                                            'advanced-gutenberg'
                                                        )
                                                    }
                                                    </Notice>
                                                </Fragment>
                                            ) }
                                        </Fragment>
                                    ) }
                                </Fragment>
                                ) }
                                { ! this.isPost() && ( // Disabled in post edit
                                    <Fragment>
                                        { isControlEnabled( advgb_block_controls_vars.controls.taxonomy ) && (
                                        <Fragment>
                                            <ToggleControl
                                                label={ __( 'Taxonomies & terms', 'advanced-gutenberg' ) }
                                                help={ currentControlKey( advgbBlockControls, 'taxonomy', 'enabled' )
                                                    ? __( 'Choose in which taxonomies & terms pages this block can be displayed.', 'advanced-gutenberg' )
                                                    : ''
                                                }
                                                checked={ currentControlKey( advgbBlockControls, 'taxonomy', 'enabled' ) }
                                                onChange={ () => this.changeControlKey( 'taxonomy', 'enabled' ) }
                                            />
                                            { currentControlKey( advgbBlockControls, 'taxonomy', 'enabled' ) && (
                                                <Fragment>
                                                    <FormTokenField
                                                        multiple
                                                        label={ __( 'Select taxonomies', 'advanced-gutenberg' ) }
                                                        placeholder={ __( 'Search taxonomies', 'advanced-gutenberg' ) }
                                                        suggestions={ getOptionSuggestions( this.getTaxonomies() ) }
                                                        maxSuggestions={ 10 }
                                                        value={
                                                            getOptionTitles(
                                                                !! currentControlKey( advgbBlockControls, 'taxonomy', 'taxonomies' )
                                                                    ? currentControlKey( advgbBlockControls, 'taxonomy', 'taxonomies' )
                                                                    : [],
                                                                this.getTaxonomies()
                                                            )
                                                        }
                                                        onChange={ ( value ) => {
                                                            const taxonomies = getOptionSlugs( value, this.getTaxonomies() );
                                                            this.changeControlKey( 'taxonomy', 'taxonomies', taxonomies );
                                                        } }
                                                        __experimentalExpandOnFocus
                                                    />
                                                    { ( currentControlKey( advgbBlockControls, 'taxonomy', 'taxonomies' ).length > 0 ) && (
                                                        <Fragment>
                                                            <div className="advgb-revert-mb--disabled" style={{ marginBottom: 20 }}>
                                                                <SelectControl
                                                                    value={
                                                                        currentControlKey( advgbBlockControls, 'taxonomy', 'approach' )
                                                                    }
                                                                    options={ [
                                                                        {
                                                                            value: 'include',
                                                                            label: __( 'Show on pages with selected terms', 'advanced-gutenberg' )
                                                                        },
                                                                        {
                                                                            value: 'exclude',
                                                                            label: __( 'Hide on pages with selected terms', 'advanced-gutenberg' )
                                                                        }
                                                                    ] }
                                                                    onChange={ ( value ) => this.changeControlKey( 'taxonomy', 'approach', value ) }
                                                                />
                                                            </div>
                                                            <FormTokenField
                                                                multiple
                                                                label={ __( 'Select terms', 'advanced-gutenberg' ) }
                                                                placeholder={ __( 'Search terms', 'advanced-gutenberg' ) }
                                                                suggestions={ getOptionSuggestions(
                                                                    this.state.termOptions
                                                                ) }
                                                                maxSuggestions={ 10 }
                                                                value={
                                                                    getOptionTitles(
                                                                        !! currentControlKey( advgbBlockControls, 'taxonomy', 'terms' )
                                                                            ? currentControlKey( advgbBlockControls, 'taxonomy', 'terms' )
                                                                            : [],
                                                                        this.state.termOptions
                                                                    )
                                                                }
                                                                onChange={ ( value ) => {
                                                                    this.changeControlKey(
                                                                        'taxonomy',
                                                                        'terms',
                                                                        getOptionSlugs(
                                                                            value,
                                                                            this.state.termOptions
                                                                        )
                                                                    )
                                                                } }
                                                                onInputChange={ ( value ) => {
                                                                    this.setState( {
                                                                        searchTermWord: value
                                                                    } );
                                                                } }
                                                            />
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
