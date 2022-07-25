import { AdvDateTimeControl } from "../0-adv-components/datetime.jsx";

(function ( wpI18n, wpHooks, wpBlocks, wpBlockEditor, wpComponents, wpCompose ) {
    wpBlockEditor = wp.blockEditor || wp.editor;
    const { addFilter } = wpHooks;
    const { __ } = wpI18n;
    const { hasBlockSupport } = wpBlocks;
    const { InspectorControls, BlockControls } = wpBlockEditor;
    const { DateTimePicker, ToggleControl, PanelBody, Notice } = wpComponents;
    const { createHigherOrderComponent } = wpCompose;
    const { Fragment } = wp.element;

    // do not show this feature if disabled.
    if( !parseInt(advgbBlocks.block_controls) ) return;

    // Blocks that are not supported
    const NON_SUPPORTED_BLOCKS = [
        'core/freeform',
        'core/legacy-widget',
        'core/widget-area'
    ];

    // Register block controls to blocks attributes
    addFilter( 'blocks.registerBlockType', 'advgb/blockControls', function ( settings ) {
        if (!NON_SUPPORTED_BLOCKS.includes( settings.name )) {
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
             * Return current advgbBlockControls array attribute value
             *
             * @since 2.14.0
             * @param {string} control  The use case block control. e.g. 'schedule'
             * @param {string} key      The control key to modify. e.g. 'enabled'
             *
             * @return {mixed}
             */
            const currentControlKey = function( control, key ) {
                const itemIndex = advgbBlockControls.findIndex(element => element.control === control);
                let newArray    = [...advgbBlockControls];
                const obj       = newArray[itemIndex];

                return obj[key];
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

            return ( [
                props.isSelected && (!NON_SUPPORTED_BLOCKS.includes( props.name )) &&
                <InspectorControls key="advgb-bc-controls">
                    <PanelBody
                        title={ __( 'Block Controls', 'advanced-gutenberg' ) }
                        icon="visibility"
                        initialOpen={ false }
                        className={
                            currentControlKey( 'schedule', 'enabled' ) && (
                                currentControlKey( 'schedule', 'dateFrom' )
                                || currentControlKey( 'schedule', 'dateTo' )
                            ) ? 'advgb-feature-icon-active' : ''
                        }
                    >
                        <Fragment>
                            <ToggleControl
                                label={ __( 'Enable block schedule', 'advanced-gutenberg' ) }
                                help={
                                    !currentControlKey( 'schedule', 'enabled' )
                                        ? __( 'Setup when to start showing and/or stop showing this block', 'advanced-gutenberg' )
                                        : ''
                                }
                                checked={ currentControlKey( 'schedule', 'enabled' ) }
                                onChange={ () => changeControlKey( 'schedule', 'enabled' ) }
                            />
                            { currentControlKey( 'schedule', 'enabled' ) && (
                                <Fragment>
                                    <AdvDateTimeControl
                                        buttonLabel={ __( 'Now', 'advanced-gutenberg' ) }
                                        dateLabel={ __( 'Start showing', 'advanced-gutenberg' ) }
                                        date={ currentControlKey( 'schedule', 'dateFrom' ) }
                                        onChangeDate={ ( newDate ) => changeControlKey( 'schedule', 'dateFrom', newDate ) }
                                        onDateClear={ () => changeControlKey( 'schedule', 'dateFrom', null ) }
                                        onInvalidDate={ false }
                                    />
                                    <AdvDateTimeControl
                                        buttonLabel={ __( 'Never', 'advanced-gutenberg' ) }
                                        dateLabel={ __( 'Stop showing', 'advanced-gutenberg' ) }
                                        date={ !!currentControlKey( 'schedule', 'dateTo' ) ? currentControlKey( 'schedule', 'dateTo' ) : null }
                                        onChangeDate={ ( newDate ) => changeControlKey( 'schedule', 'dateTo', newDate ) }
                                        onDateClear={ () => changeControlKey( 'schedule', 'dateTo', null ) }
                                        onInvalidDate={ ( date ) => {
                                            // Disable all dates before dateFrom
                                            if( currentControlKey( 'schedule', 'dateFrom' ) ) {
                                                let thisDate = new Date(date.getTime());
                                                thisDate.setHours(0, 0, 0, 0);
                                                let fromDate = new Date( currentControlKey( 'schedule', 'dateFrom' ) );
                                                fromDate.setHours(0, 0, 0, 0);
                                                return thisDate.getTime() < fromDate.getTime();
                                            }
                                        } }
                                    />
                                    { ( currentControlKey( 'schedule', 'dateFrom' ) > currentControlKey( 'schedule', 'dateTo' ) ) &&
                                        <Notice
                                            className="advgb-notice-sidebar"
                                            status="warning"
                                            isDismissible={ false }
                                        >
                                            { __( '"Stop showing" date should be after "Start showing" date!', 'advanced-gutenberg' ) }
                                        </Notice>
                                    }
                                    { currentControlKey( 'schedule', 'dateFrom' ) && currentControlKey( 'schedule', 'dateTo' ) &&
                                        <ToggleControl
                                            label={ __( 'Recurring', 'advanced-gutenberg' ) }
                                            checked={ currentControlKey( 'schedule', 'recurring' ) }
                                            onChange={ () => changeControlKey( 'schedule', 'recurring' ) }
                                            help={ __( 'If Recurring is enabled, the block will be displayed in frontend every year within the date interval', 'advanced-gutenberg' ) }
                                        />
                                    }
                                </Fragment>
                            ) }
                        </Fragment>
                    </PanelBody>
                </InspectorControls>,
                <BlockEdit key="block-edit-advgb-dates" {...props} />,
            ] )
        }
    } );

    const withAttributes = createHigherOrderComponent( ( BlockListBlock ) => {
        return ( props ) => {
            if ( ( !NON_SUPPORTED_BLOCKS.includes( props.name ) ) && hasBlockSupport( props.name, 'advgb/blockControls', true ) ) {
                const { advgbBlockControls } = props.attributes;
                // @TODO - Avoid having currentControlKey() duplicated. See 'blocks.registerBlockType' hook
                const currentControlKey = function( control, key ) {
                    const itemIndex = advgbBlockControls.findIndex(element => element.control === control);
                    let newArray = [...advgbBlockControls];
                    const obj = newArray[itemIndex];
                    return obj[key];
                }
                const advgbBcClass = props.isSelected === false
                    && currentControlKey( 'schedule', 'enabled' )
                    && (
                        currentControlKey( 'schedule', 'dateFrom' )
                        || currentControlKey( 'schedule', 'dateTo' )
                    ) ? 'advgb-bc-editor-preview' : '';

                return <BlockListBlock { ...props } className={ advgbBcClass } advgbBlockControls={ `${ advgbBlockControls }` } />;
            }

            return <BlockListBlock { ...props } />;
        };
    }, 'withAttributes' );

    // Apply custom styles on back-end
    wp.hooks.addFilter( 'editor.BlockListBlock', 'advgb/loadBackendBlockControls', withAttributes );

})( wp.i18n, wp.hooks, wp.blocks, wp.blockEditor, wp.components, wp.compose );
