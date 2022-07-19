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

    // Blocks that are not supported
    const NON_SUPPORTED_BLOCKS = [
        'core/freeform',
        'core/legacy-widget',
        'core/widget-area'
    ];

    // do not show this feature if disabled.
    if( !parseInt(advgbBlocks.block_controls) ) return;

    // Register block controls to blocks attributes
    addFilter( 'blocks.registerBlockType', 'advgb/blockControls', function ( settings ) {
        if (!NON_SUPPORTED_BLOCKS.includes( settings.name )) {
            settings.attributes = Object.assign( settings.attributes, {
                bControlsEnabled: {
                    type: 'boolean',
                    default: false
                },
                bControlsDateFrom: {
                    type: 'string'
                },
                bControlsDateTo: {
                    type: 'string'
                },
                bControlsDateRecur: {
                    type: 'boolean',
                    default: false
                },
            } );
        }

        return settings;
    } );

    // Add option to add dates for supported blocks
    addFilter( 'editor.BlockEdit', 'advgb/addBlockControls', function ( BlockEdit ) {
        return ( props ) => {
            const {
                bControlsEnabled,
                bControlsDateFrom,
                bControlsDateTo,
                bControlsDateRecur,
            } = props.attributes;

            return ( [
                props.isSelected && (!NON_SUPPORTED_BLOCKS.includes( props.name )) &&
                <InspectorControls key="advgb-bc-controls">
                    <PanelBody
                        title={ __( 'Block Controls', 'advanced-gutenberg' ) }
                        icon="visibility"
                        initialOpen={ false }
                        className={ bControlsEnabled && ( bControlsDateFrom || bControlsDateTo ) ? 'advgb-feature-icon-active' : '' }
                    >
                        <Fragment>
                            <ToggleControl
                                label={ __( 'Enable block schedule', 'advanced-gutenberg' ) }
                                help={
                                    !bControlsEnabled
                                        ? __( 'Setup when to start showing and/or stop showing this block', 'advanced-gutenberg' )
                                        : ''
                                }
                                checked={ bControlsEnabled }
                                onChange={ () => props.setAttributes( { bControlsEnabled: !bControlsEnabled } ) }
                            />
                            { bControlsEnabled && (
                                <Fragment>
                                    <AdvDateTimeControl
                                        buttonLabel={ __( 'Now', 'advanced-gutenberg' ) }
                                        dateLabel={ __( 'Start showing', 'advanced-gutenberg' ) }
                                        date={ bControlsDateFrom }
                                        onChangeDate={ ( newDate ) => { props.setAttributes( { bControlsDateFrom: newDate } ); } }
                                        onDateClear={ () => props.setAttributes( { bControlsDateFrom: null } ) }
                                        onInvalidDate={ false }
                                    />
                                    <AdvDateTimeControl
                                        buttonLabel={ __( 'Never', 'advanced-gutenberg' ) }
                                        dateLabel={ __( 'Stop showing', 'advanced-gutenberg' ) }
                                        date={ !!bControlsDateTo ? bControlsDateTo : null }
                                        onChangeDate={ ( newDate ) => { props.setAttributes( { bControlsDateTo: newDate } ); } }
                                        onDateClear={ () => props.setAttributes( { bControlsDateTo: null } ) }
                                        onInvalidDate={ ( date ) => {
                                            // Disable all dates before bControlsDateFrom
                                            if( bControlsDateFrom ) {
                                                let thisDate = new Date(date.getTime());
                                                thisDate.setHours(0, 0, 0, 0);
                                                let fromDate = new Date(bControlsDateFrom);
                                                fromDate.setHours(0, 0, 0, 0);
                                                return thisDate.getTime() < fromDate.getTime();
                                            }
                                        } }
                                    />
                                    { ( bControlsDateFrom > bControlsDateTo ) &&
                                        <Notice
                                            className="advgb-notice-sidebar"
                                            status="warning"
                                            isDismissible={ false }
                                        >
                                            { __( '"Stop showing" date should be after "Start showing" date!', 'advanced-gutenberg' ) }
                                        </Notice>
                                    }
                                    { bControlsDateFrom && bControlsDateTo &&
                                        <ToggleControl
                                            label={ __( 'Recurring', 'advanced-gutenberg' ) }
                                            checked={ bControlsDateRecur }
                                            onChange={ () => props.setAttributes( { bControlsDateRecur: !bControlsDateRecur } ) }
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
                const {
                    bControlsEnabled,
                    bControlsDateFrom,
                    bControlsDateTo,
                    bControlsDateRecur,
                } = props.attributes;

                const advgbBcClass = props.isSelected === false && bControlsEnabled && ( bControlsDateFrom || bControlsDateTo )
                    ? 'advgb-bc-editor-preview' : '';

                return <BlockListBlock { ...props } className={ advgbBcClass } bControlsDateFrom={ `${ bControlsDateFrom }` } bControlsDateTo={ `${ bControlsDateTo }` } bControlsEnabled={ `${ bControlsEnabled }` } bControlsDateRecur={ `${ bControlsDateRecur }` } />;
            }

            return <BlockListBlock { ...props } />;
        };
    }, 'withAttributes' );

    // Apply custom styles on back-end
    wp.hooks.addFilter( 'editor.BlockListBlock', 'advgb/loadBackendBlockControls', withAttributes );

})( wp.i18n, wp.hooks, wp.blocks, wp.blockEditor, wp.components, wp.compose );
