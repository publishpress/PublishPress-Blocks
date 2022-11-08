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
    const { Fragment, useState, useEffect } = wpElement;

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

    // Add option to add controls for supported blocks
    addFilter( 'editor.BlockEdit', 'advgb/addBlockControls', function ( BlockEdit ) {
        return ( props ) => {
            const { advgbBlockControls } = props.attributes;

            const [taxonomiesState, updateTaxonomiesState] = useState(
                !! currentControlKey( advgbBlockControls, 'taxonomy', 'taxonomies' )
                    ? currentControlKey( advgbBlockControls, 'taxonomy', 'taxonomies' )
                    : []
            );

            // Remove selected terms from terms field when its taxonomy is removed from this field
            useEffect( () => {
                const currentTermSlugs = !! currentControlKey( advgbBlockControls, 'taxonomy', 'terms' )
                    ? currentControlKey( advgbBlockControls, 'taxonomy', 'terms' )
                    : [];
                //console.log('currentTermSlugs', currentTermSlugs);

                // Check if currentTermSlugs ara listed in validTermSlugs
                if( currentTermSlugs.length ) {
                    const validTermSlugs = getTermSlugs(
                        !! currentControlKey( advgbBlockControls, 'taxonomy', 'taxonomies' )
                            ? currentControlKey( advgbBlockControls, 'taxonomy', 'taxonomies' )
                            : []
                    );
                    //console.log('validTermSlugs', validTermSlugs);

                    // Remove non valid terms (due its taxonomy was removed)
                    const result = currentTermSlugs.filter( (item) => {
                        return validTermSlugs.includes(item);
                    } );
                    console.log('result', result);

                    // Update terms control
                    changeControlKey(
                        'taxonomy',
                        'terms',
                        result
                    );
                    //console.log('Saved terms!', currentControlKey( advgbBlockControls, 'taxonomy', 'terms' ));
                }
                //console.log(taxonomiesState);
            }, [taxonomiesState]);

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
            const changeControlKey = function( control, key, value = '' ) {

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
                const miscControl = {
                    control: 'misc',
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

                    props.setAttributes( {
                        advgbBlockControls: newArray
                    } );
                } else if( controlsAdded && ! controlExists ) {

                    // Add a new control object when other controls already exists
                    switch( control ) {
                        case 'schedule':
                            props.setAttributes( {
                                advgbBlockControls: [
                                    ...advgbBlockControls,
                                    scheduleControl
                                ]
                            } );
                        break;

                        case 'user_role':
                            props.setAttributes( {
                                advgbBlockControls: [
                                    ...advgbBlockControls,
                                    userRoleControl
                                ]
                            } );
                        break;

                        case 'browser':
                            props.setAttributes( {
                                advgbBlockControls: [
                                    ...advgbBlockControls,
                                    browserControl
                                ]
                            } );
                        break;

                        case 'platform':
                            props.setAttributes( {
                                advgbBlockControls: [
                                    ...advgbBlockControls,
                                    platformControl
                                ]
                            } );
                        break;

                        case 'taxonomy':
                            props.setAttributes( {
                                advgbBlockControls: [
                                    ...advgbBlockControls,
                                    taxonomyControl
                                ]
                            } );
                        break;

                        case 'misc':
                            props.setAttributes( {
                                advgbBlockControls: [
                                    ...advgbBlockControls,
                                    miscControl
                                ]
                            } );
                        break;
                    }
                } else {
                    // Add the first control object attribute
                    switch( control ) {
                        case 'schedule':
                            props.setAttributes( {
                                advgbBlockControls: [ scheduleControl ]
                            } );
                        break;

                        case 'user_role':
                            props.setAttributes( {
                                advgbBlockControls: [ userRoleControl ]
                            } );
                        break;

                        case 'browser':
                            props.setAttributes( {
                                advgbBlockControls: [ browserControl ]
                            } );
                        break;

                        case 'platform':
                            props.setAttributes( {
                                advgbBlockControls: [ platformControl ]
                            } );
                        break;

                        case 'taxonomy':
                            props.setAttributes( {
                                advgbBlockControls: [ taxonomyControl ]
                            } );
                        break;

                        case 'misc':
                            props.setAttributes( {
                                advgbBlockControls: [ miscControl ]
                            } );
                        break;
                    }
                }
            }

            /**
             * Get all the available user roles from the site
             *
             * @since 3.1.0
             *
             * @return {array}
             */
            const getUserRoles = function() {
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
            const getPlatforms = function() {
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
            const getBrowsers = function() {
                return typeof advgb_block_controls_vars.browsers !== 'undefined'
                        && advgb_block_controls_vars.browsers.length > 0
                            ? advgb_block_controls_vars.browsers
                            : [];
            }

            /**
             * Get taxonomies
             *
             * @since 3.1.1
             *
             * @return {array}
             */
            const getTaxonomies = function() {
                return typeof advgb_block_controls_vars.taxonomies !== 'undefined'
                        && advgb_block_controls_vars.taxonomies.length > 0
                            ? advgb_block_controls_vars.taxonomies
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
            const getTerms = function( taxonomies ) {
                const allTaxonomies = getTaxonomies();
                let terms = [];

                taxonomies.forEach( ( tax ) => {
                    const allTaxonomies = getTaxonomies();
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
             * Get filtered term slugs based on selected taxonomies
             *
             * @since 3.1.1
             * @param {array} taxonomies Array of taxonomies slugs
             *
             * @return {array}
             */
            const getTermSlugs = function( taxonomies ) {
                const allTaxonomies = getTaxonomies();
                let terms = [];

                taxonomies.forEach( ( tax ) => {
                    const allTaxonomies = getTaxonomies();
                    const itemIndex = allTaxonomies.findIndex( ( element ) => element.slug === tax );

                    allTaxonomies[itemIndex].terms.forEach( ( term ) => {
                        terms.push( term.slug );
                    } );
                } );

                return terms;
            }

            /*const getTerms = function() {
                const taxonomies    = getTaxonomies();
                let terms           = [];

                taxonomies.forEach( ( tax ) => {
                    tax.terms.forEach( ( term ) => {
                        terms.push( {
                            slug: term.slug,
                            title: `${term.title} (${tax.title})`
                        } );
                    } );
                } );

                return terms;
            }*/

            /**
             * Get misc pages
             *
             * @since 3.1.1
             *
             * @return {array}
             */
            const getMiscPages = function() {
                return typeof advgb_block_controls_vars.misc !== 'undefined'
                        && advgb_block_controls_vars.misc.length > 0
                            ? advgb_block_controls_vars.misc
                            : [];
            }

            /**
             * Get misc page slugs
             *
             * @since 3.1.1
             *
             * @return {array}
             */
            const getMiscPageSlugs = function() {
                const pages = typeof advgb_block_controls_vars.misc !== 'undefined'
                        && advgb_block_controls_vars.misc.length > 0
                            ? advgb_block_controls_vars.misc
                            : [];

                return pages.map( ( item ) => {
                    return item.slug;
                } );
            }

            return ( [
                props.isSelected && ( ! NON_SUPPORTED_BLOCKS.includes( props.name ) )
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
                                help={
                                    __( 'Choose when to start showing and/or stop showing this block.', 'advanced-gutenberg' )
                                }
                                checked={ currentControlKey( advgbBlockControls, 'schedule', 'enabled' ) }
                                onChange={ () => changeControlKey( 'schedule', 'enabled' ) }
                            />
                            { currentControlKey( advgbBlockControls, 'schedule', 'enabled' ) && (
                                <Fragment>
                                    <div style={ { marginBottom: 30 } }>
                                        <AdvDateTimeControl
                                            buttonLabel={ __( 'Now', 'advanced-gutenberg' ) }
                                            dateLabel={ __( 'Start showing', 'advanced-gutenberg' ) }
                                            date={ currentControlKey( advgbBlockControls, 'schedule', 'dateFrom' ) }
                                            onChangeDate={ ( newDate ) => changeControlKey( 'schedule', 'dateFrom', newDate ) }
                                            onDateClear={ () => changeControlKey( 'schedule', 'dateFrom', null ) }
                                            onInvalidDate={ false }
                                        />
                                        <AdvDateTimeControl
                                            buttonLabel={ __( 'Never', 'advanced-gutenberg' ) }
                                            dateLabel={ __( 'Stop showing', 'advanced-gutenberg' ) }
                                            date={ !! currentControlKey( advgbBlockControls, 'schedule', 'dateTo' ) ? currentControlKey( advgbBlockControls, 'schedule', 'dateTo' ) : null }
                                            onChangeDate={ ( newDate ) => changeControlKey( 'schedule', 'dateTo', newDate ) }
                                            onDateClear={ () => changeControlKey( 'schedule', 'dateTo', null ) }
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
                                                onChange={ () => changeControlKey( 'schedule', 'recurring' ) }
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
                                help={
                                    __( 'Choose which users can see this block.', 'advanced-gutenberg' )
                                }
                                checked={ currentControlKey( advgbBlockControls, 'user_role', 'enabled' ) }
                                onChange={ () => changeControlKey( 'user_role', 'enabled' ) }
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
                                            onChange={ ( value ) => changeControlKey( 'user_role', 'approach', value ) }
                                        />
                                    </div>
                                    { ( currentControlKey( advgbBlockControls, 'user_role', 'approach' ) === 'include' ||
                                        currentControlKey( advgbBlockControls, 'user_role', 'approach' ) === 'exclude'
                                    ) && (
                                        <FormTokenField
                                            multiple
                                            label={ __( 'Select user roles', 'advanced-gutenberg' ) }
                                            placeholder={ __( 'Search', 'advanced-gutenberg' ) }
                                            suggestions={ getOptionSuggestions( getUserRoles() ) }
                                            maxSuggestions={ 10 }
                                            value={
                                                getOptionTitles(
                                                    !! currentControlKey( advgbBlockControls, 'user_role', 'roles' )
                                                        ? currentControlKey( advgbBlockControls, 'user_role', 'roles' )
                                                        : [],
                                                    getUserRoles()
                                                )
                                            }
                                            onChange={ ( value ) => {
                                                changeControlKey( 'user_role', 'roles', getOptionSlugs( value, getUserRoles() ) )
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
                                help={
                                    __( 'Choose in which browsers this block can be displayed.', 'advanced-gutenberg' )
                                }
                                checked={ currentControlKey( advgbBlockControls, 'browser', 'enabled' ) }
                                onChange={ () => changeControlKey( 'browser', 'enabled' ) }
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
                                            onChange={ ( value ) => changeControlKey( 'browser', 'approach', value ) }
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
                                                suggestions={ getOptionSuggestions( getBrowsers() ) }
                                                maxSuggestions={ 10 }
                                                value={
                                                    getOptionTitles(
                                                        !! currentControlKey( advgbBlockControls, 'browser', 'browsers' )
                                                            ? currentControlKey( advgbBlockControls, 'browser', 'browsers' )
                                                            : [],
                                                        getBrowsers()
                                                    )
                                                }
                                                onChange={ ( value ) => {
                                                    changeControlKey( 'browser', 'browsers', getOptionSlugs( value, getBrowsers() ) )
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
                                help={
                                    __( 'Choose in which platforms this block can be displayed.', 'advanced-gutenberg' )
                                }
                                checked={ currentControlKey( advgbBlockControls, 'platform', 'enabled' ) }
                                onChange={ () => changeControlKey( 'platform', 'enabled' ) }
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
                                            onChange={ ( value ) => changeControlKey( 'platform', 'approach', value ) }
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
                                                suggestions={ getOptionSuggestions( getPlatforms() ) }
                                                maxSuggestions={ 10 }
                                                value={
                                                    getOptionTitles(
                                                        !! currentControlKey( advgbBlockControls, 'platform', 'platforms' )
                                                            ? currentControlKey( advgbBlockControls, 'platform', 'platforms' )
                                                            : [],
                                                        getPlatforms()
                                                    )
                                                }
                                                onChange={ ( value ) => {
                                                    changeControlKey( 'platform', 'platforms', getOptionSlugs( value, getPlatforms() ) )
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
                        { isControlEnabled( advgb_block_controls_vars.controls.taxonomy ) && (
                        <Fragment>
                            <ToggleControl
                                label={ __( 'Taxonomies & terms', 'advanced-gutenberg' ) }
                                help={
                                    __( 'Choose in which taxonomies & terms pages this block can be displayed.', 'advanced-gutenberg' )
                                }
                                checked={ currentControlKey( advgbBlockControls, 'taxonomy', 'enabled' ) }
                                onChange={ () => changeControlKey( 'taxonomy', 'enabled' ) }
                            />
                            { currentControlKey( advgbBlockControls, 'taxonomy', 'enabled' ) && (
                                <Fragment>
                                    <FormTokenField
                                        multiple
                                        label={ __( 'Select taxonomies', 'advanced-gutenberg' ) }
                                        placeholder={ __( 'Search taxonomies', 'advanced-gutenberg' ) }
                                        suggestions={ getOptionSuggestions( getTaxonomies() ) }
                                        maxSuggestions={ 10 }
                                        value={
                                            getOptionTitles(
                                                !! currentControlKey( advgbBlockControls, 'taxonomy', 'taxonomies' )
                                                    ? currentControlKey( advgbBlockControls, 'taxonomy', 'taxonomies' )
                                                    : [],
                                                getTaxonomies()
                                            )
                                        }
                                        onChange={ ( value ) => {
                                            const taxonomies = getOptionSlugs( value, getTaxonomies() );
                                            changeControlKey( 'taxonomy', 'taxonomies', taxonomies );
                                            // Adust terms when removing taxonomies
                                            updateTaxonomiesState( taxonomies );
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
                                                    onChange={ ( value ) => changeControlKey( 'taxonomy', 'approach', value ) }
                                                />
                                            </div>
                                            <FormTokenField
                                                multiple
                                                label={ __( 'Select terms', 'advanced-gutenberg' ) }
                                                placeholder={ __( 'Search terms', 'advanced-gutenberg' ) }
                                                suggestions={ getOptionSuggestions(
                                                    getTerms(
                                                        !! currentControlKey( advgbBlockControls, 'taxonomy', 'taxonomies' )
                                                            ? currentControlKey( advgbBlockControls, 'taxonomy', 'taxonomies' )
                                                            : []
                                                    )
                                                ) }
                                                maxSuggestions={ 10 }
                                                value={
                                                    getOptionTitles(
                                                        !! currentControlKey( advgbBlockControls, 'taxonomy', 'terms' )
                                                            ? currentControlKey( advgbBlockControls, 'taxonomy', 'terms' )
                                                            : [],
                                                        getTerms(
                                                            !! currentControlKey( advgbBlockControls, 'taxonomy', 'taxonomies' )
                                                                ? currentControlKey( advgbBlockControls, 'taxonomy', 'taxonomies' )
                                                                : []
                                                        )
                                                    )
                                                }
                                                onChange={ ( value ) => {
                                                    changeControlKey(
                                                        'taxonomy',
                                                        'terms',
                                                        getOptionSlugs(
                                                            value,
                                                            getTerms(
                                                                !! currentControlKey( advgbBlockControls, 'taxonomy', 'taxonomies' )
                                                                    ? currentControlKey( advgbBlockControls, 'taxonomy', 'taxonomies' )
                                                                    : []
                                                            )
                                                        )
                                                    )
                                                } }
                                                __experimentalExpandOnFocus
                                            />
                                        </Fragment>
                                    ) }
                                </Fragment>
                            ) }
                        </Fragment>
                        ) }

                        { isControlEnabled( advgb_block_controls_vars.controls.misc ) && (
                        <Fragment>
                            <ToggleControl
                                label={ __( 'Pages', 'advanced-gutenberg' ) }
                                help={
                                    __( 'Choose in which pages this block can be displayed.', 'advanced-gutenberg' )
                                }
                                checked={ currentControlKey( advgbBlockControls, 'misc', 'enabled' ) }
                                onChange={ () => changeControlKey( 'misc', 'enabled' ) }
                            />
                            { currentControlKey( advgbBlockControls, 'misc', 'enabled' ) && (
                                <Fragment>
                                    <div className="advgb-revert-mb">
                                        <SelectControl
                                            value={
                                                currentControlKey( advgbBlockControls, 'misc', 'approach' )
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
                                            onChange={ ( value ) => changeControlKey( 'misc', 'approach', value ) }
                                        />
                                    </div>
                                    { ( currentControlKey( advgbBlockControls, 'misc', 'approach' ) === 'include' ||
                                        currentControlKey( advgbBlockControls, 'misc', 'approach' ) === 'exclude'
                                    ) && (
                                        <FormTokenField
                                            multiple
                                            label={ __( 'Select miscellaneous pages', 'advanced-gutenberg' ) }
                                            placeholder={ __( 'Search', 'advanced-gutenberg' ) }
                                            suggestions={ getOptionSuggestions( getMiscPages() ) }
                                            maxSuggestions={ 10 }
                                            value={
                                                getOptionTitles(
                                                    !! currentControlKey( advgbBlockControls, 'misc', 'pages' )
                                                        ? currentControlKey( advgbBlockControls, 'misc', 'pages' )
                                                        : [],
                                                    getMiscPages()
                                                )
                                            }
                                            onChange={ ( value ) => {
                                                changeControlKey( 'misc', 'pages', getOptionSlugs( value, getMiscPages() ) )
                                            } }
                                            __experimentalExpandOnFocus
                                        />
                                    ) }
                                </Fragment>
                            ) }
                        </Fragment>
                        ) }

                    </PanelBody>
                </InspectorControls>,
                <BlockEdit key="block-edit-advgb-dates" {...props} />,
            ] )
        }
    } );

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

    // Apply custom styles on back-end
    wp.hooks.addFilter( 'editor.BlockListBlock', 'advgb/loadBackendBlockControls', withAttributes );

})( wp.i18n, wp.hooks, wp.blocks, wp.blockEditor, wp.components, wp.compose, wp.element );
