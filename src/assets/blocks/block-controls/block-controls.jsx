import classnames from 'classnames';
import { AdvDateTimeControl } from "../0-adv-components/datetime.jsx";

(function ( wpI18n, wpHooks, wpBlocks, wpBlockEditor, wpComponents, wpCompose, wpElement ) {
    wpBlockEditor = wp.blockEditor || wp.editor;
    const { addFilter } = wpHooks;
    const { __ } = wpI18n;
    const { hasBlockSupport } = wpBlocks;
    const { InspectorControls, BlockControls } = wpBlockEditor;
    const { DateTimePicker, ToggleControl, PanelBody, Notice, FormTokenField } = wpComponents;
    const { createHigherOrderComponent } = wpCompose;
    const { Fragment, useState } = wpElement;

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
     * Check how many controls are enabled
     *
     * @since 3.1.0
     *
     * @return {bool}
     */
    const countControlEnabled = function() {
        const allControls = typeof advgb_block_controls_vars.controls !== 'undefined'
                            && Object.keys(advgb_block_controls_vars.controls).length > 0
                                ? advgb_block_controls_vars.controls
                                : [];
        let counter = 0;
        Object.keys(allControls).map( (item) => {
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
        const itemIndex = controlAttrs.findIndex(element => element.control === control);

        // No control found
        if( itemIndex < 0 ) {
            return false;
        }

        let newArray    = [...controlAttrs];
        const obj       = newArray[itemIndex];

        return obj[key];
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
    /*console.log('NON SUPPORTED BLOCKS');
    console.log(NON_SUPPORTED_BLOCKS);*/

    // Register block controls to blocks attributes
    addFilter( 'blocks.registerBlockType', 'advgb/blockControls', function ( settings ) {
        if ( ! NON_SUPPORTED_BLOCKS.includes( settings.name ) && countControlEnabled() ) {
            settings.attributes = Object.assign( settings.attributes, {
                advgbBlockControls: {
                    type: 'array',
                    items: {
                        type: 'object'
                    },
                    default: [
                        {
                            control: 'schedule',
                            enabled: false,
                            dateFrom: null,
                            dateTo: null,
                            recurring: false
                        },
                        {
                            control: 'user_role',
                            enabled: false,
                            roles: []
                        }
                    ]
                }
            } );
        }

        return settings;
    } );

    // Add option to add dates for supported blocks
    addFilter( 'editor.BlockEdit', 'advgb/addBlockControls', function ( BlockEdit ) {
        return ( props ) => {
            const { advgbBlockControls } = props.attributes;

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
                const itemIndex = advgbBlockControls.findIndex(element => element.control === control);
                let newArray    = [...advgbBlockControls];
                const obj       = newArray[itemIndex];

                newArray[itemIndex] = typeof obj[key] === 'boolean'
                    ? { ...newArray[itemIndex], [key]: !obj[key] }
                    : { ...newArray[itemIndex], [key]: value }

                props.setAttributes( {
                    advgbBlockControls: newArray
                } );
            }

            /**
             * Get available user role slugs from site
             *
             * @return {array}
             */
            const getUserRoleSlugs = function() {
                return typeof advgb_block_controls_vars.user_roles !== 'undefined'
                        && advgb_block_controls_vars.user_roles.length > 0
                            ? advgb_block_controls_vars.user_roles.map( ( role ) => role.slug )
                            : [];
            }

            /**
             * Get available user role titles from site
             *
             * @return {array}
             */
            /*const getUserRoleTitles = function() {
                return typeof advgb_block_controls_vars.user_roles !== 'undefined'
                        && advgb_block_controls_vars.user_roles.length > 0
                            ? advgb_block_controls_vars.user_roles.map( ( role ) => role.title )
                            : [];
            }*/

            /**
             * Get the User role titles and slugs
             *
             * @return {array}
             */
            /*const getUserRoleSlugTitles = function() {
                return typeof advgb_block_controls_vars.user_roles !== 'undefined'
                                && advgb_block_controls_vars.user_roles.length > 0
                                    ? advgb_block_controls_vars.user_roles
                                    : [];
            }*/

            //const [selectedUserRoles, setSelectedUserRoles] = useState( [] );

            return ( [
                props.isSelected && ( ! NON_SUPPORTED_BLOCKS.includes( props.name ) )
                && countControlEnabled() &&
                <InspectorControls key="advgb-bc-controls">
                    <PanelBody
                        title={ __( 'Block Controls', 'advanced-gutenberg' ) }
                        icon="visibility"
                        initialOpen={ false }
                        className={
                            ( currentControlKey( advgbBlockControls, 'schedule', 'enabled' )
                                || currentControlKey( advgbBlockControls, 'user_role', 'enabled' )
                            ) ? 'advgb-feature-icon-active' : ''
                        }
                    >
                        { isControlEnabled( advgb_block_controls_vars.controls.schedule ) && (
                        <Fragment>
                            <ToggleControl
                                label={ __( 'Enable block schedule', 'advanced-gutenberg' ) }
                                help={
                                    ! currentControlKey( advgbBlockControls, 'schedule', 'enabled' )
                                        ? __( 'Setup when to start showing and/or stop showing this block', 'advanced-gutenberg' )
                                        : ''
                                }
                                checked={ currentControlKey( advgbBlockControls, 'schedule', 'enabled' ) }
                                onChange={ () => changeControlKey( 'schedule', 'enabled' ) }
                            />
                            { currentControlKey( advgbBlockControls, 'schedule', 'enabled' ) && (
                                <Fragment>
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
                                </Fragment>
                            ) }
                        </Fragment>
                        ) }
                        { isControlEnabled( advgb_block_controls_vars.controls.user_role ) && (
                        <Fragment>
                            <ToggleControl
                                label={ __( 'Show block user roles', 'advanced-gutenberg' ) }
                                help={
                                    ! currentControlKey( advgbBlockControls, 'user_role', 'enabled' )
                                        ? __( 'Setup to which user roles this block will be visible', 'advanced-gutenberg' )
                                        : ''
                                }
                                checked={ currentControlKey( advgbBlockControls, 'user_role', 'enabled' ) }
                                onChange={ () => changeControlKey( 'user_role', 'enabled' ) }
                            />
                            { currentControlKey( advgbBlockControls, 'user_role', 'enabled' ) && (
                                <FormTokenField
                                    multiple
                                    label={ __( 'Show to these user roles', 'advanced-gutenberg' ) }
                                    placeholder={ __( 'Search', 'advanced-gutenberg' ) }
                                    suggestions={ getUserRoleSlugs() }
                                    maxSuggestions={ 10 }
                                    value={
                                        !! currentControlKey( advgbBlockControls, 'user_role', 'roles' )
                                            ? currentControlKey( advgbBlockControls, 'user_role', 'roles' )
                                            : []
                                    }
                                    onChange={ ( value ) => {
                                        const roleSlugs = getUserRoleSlugs();
                                        if( roleSlugs.length > 0 ) {
                                            value.map( (item, index) => {
                                                // Remove invalid user roles (doesn't exist)
                                                if( roleSlugs.indexOf(item) === -1 ){
                                                    value.splice(index, 1);
                                                }
                                            } );
                                        }
                                        //setSelectedUserRoles( value );
                                        changeControlKey( 'user_role', 'roles', value );
                                    } }
                                />
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
            if ( ( !NON_SUPPORTED_BLOCKS.includes( props.name ) ) && hasBlockSupport( props.name, 'advgb/blockControls', true ) && countControlEnabled() ) {
                const { advgbBlockControls } = props.attributes;
                const advgbBcClass = props.isSelected === false
                    && ( currentControlKey( advgbBlockControls, 'schedule', 'enabled' )
                        || currentControlKey( advgbBlockControls, 'user_role', 'enabled' )
                    ) ? 'advgb-bc-editor-preview' : '';

                return <BlockListBlock { ...props } className={ classnames( props.className, advgbBcClass ) } advgbBlockControls={ `${ advgbBlockControls }` } />;
            }

            return <BlockListBlock { ...props } />;
        };
    }, 'withAttributes' );

    // Apply custom styles on back-end
    wp.hooks.addFilter( 'editor.BlockListBlock', 'advgb/loadBackendBlockControls', withAttributes );

})( wp.i18n, wp.hooks, wp.blocks, wp.blockEditor, wp.components, wp.compose, wp.element );
