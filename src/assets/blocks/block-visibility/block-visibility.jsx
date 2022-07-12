import { AdvDateTimeControl } from "../0-adv-components/components.jsx";

(function ( wpI18n, wpHooks, wpBlocks, wpBlockEditor, wpComponents, wpCompose ) {
    wpBlockEditor = wp.blockEditor || wp.editor;
    const { addFilter } = wpHooks;
    const { __ } = wpI18n;
    const { hasBlockSupport } = wpBlocks;
    const { InspectorControls } = wpBlockEditor;
    const { DateTimePicker, ToggleControl, SelectControl, PanelBody, PanelRow, Button, Notice } = wpComponents;
    const { createHigherOrderComponent } = wpCompose;
    const { Fragment } = wp.element;

    // null: all blocks supported
    // non-empty array: only the specified blocks supported
    const SUPPORTED_BLOCKS = null;

    // do not show this feature if disabled.
    if( !parseInt(advg_settings.block_visibility) ) return;

    // Register block visibility to blocks attributes
    addFilter( 'blocks.registerBlockType', 'advgb/blockVisibility', function ( settings ) {
        if (!SUPPORTED_BLOCKS || SUPPORTED_BLOCKS.includes( settings.name )) {
            settings.attributes = Object.assign( settings.attributes, {
                bvEnabled: {
                    type: 'boolean',
                    default: false
                },
                bvDateFrom: {
                    type: 'string'
                },
                bvDateTo: {
                    type: 'string'
                },
                bvRecur: {
                    type: 'string',
                    default: 'once'
                },
            } );
        }

        return settings;
    } );

    // Add option to add dates for supported blocks
    addFilter( 'editor.BlockEdit', 'advgb/addBlockVisibility', function ( BlockEdit ) {
        return ( props ) => {
                const {
                    bvEnabled,
                    bvDateFrom,
                    bvDateTo,
                    bvRecur,
                } = props.attributes;

            return ( [
                <BlockEdit key="block-edit-advgb-dates" {...props} />,
                props.isSelected && (!SUPPORTED_BLOCKS || SUPPORTED_BLOCKS.includes( props.name )) &&
                <InspectorControls key="advgb-bv-controls">
                        <PanelBody title={ __( 'Block Visibility', 'advanced-gutenberg' ) } icon="visibility" initialOpen={ false }>
                            <ToggleControl
                                label={ __( 'Enable block scheduling', 'advanced-gutenberg' ) }
                                checked={ bvEnabled }
                                onChange={ () => {
                                    if(bvEnabled){
                                        props.setAttributes( { bvDateFrom: null, bvDateto: null } );
                                    }
                                    props.setAttributes( { bvEnabled: !bvEnabled } );
                                } }
                            />
                            { bvEnabled && (
                                <Fragment>
                                    <SelectControl
                                        label={ __( 'Recurrence',  'advanced-gutenberg' ) }
                                        value={ bvRecur }
                                        options={ [
                                            { label: __( 'Once', 'advanced-gutenberg' ), value: 'once' },
                                            { label: __( 'Monthly', 'advanced-gutenberg' ), value: 'monthly' },
                                            { label: __( 'Annually', 'advanced-gutenberg' ), value: 'yearly' },
                                        ] }
                                        onChange={ ( value ) => props.setAttributes( { bvRecur: value } ) }
                                    />
                                    <AdvDateTimeControl
                                        buttonLabel={ __( 'Now', 'advanced-gutenberg' ) }
                                        dateLabel={ __( 'Start showing', 'advanced-gutenberg' ) }
                                        date={ bvDateFrom }
                                        onChangeDate={ ( newDate ) => { props.setAttributes( { bvDateFrom: newDate } ); } }
                                        onDateClear={ () => props.setAttributes( { bvDateFrom: null } ) }
                                        onInvalidDate={ false }
                                    />
                                    <AdvDateTimeControl
                                        buttonLabel={ __( 'Never', 'advanced-gutenberg' ) }
                                        dateLabel={ __( 'Stop showing', 'advanced-gutenberg' ) }
                                        date={ !!bvDateTo ? bvDateTo : null }
                                        onChangeDate={ ( newDate ) => { props.setAttributes( { bvDateTo: newDate } ); } }
                                        onDateClear={ () => props.setAttributes( { bvDateTo: null } ) }
                                        onInvalidDate={ ( date ) => {
                                            // Disable all dates before bvDateFrom
                                            if( bvDateFrom ) {
                                                let thisDate = new Date(date.getTime());
                                                thisDate.setHours(0, 0, 0, 0);
                                                let fromDate = new Date(bvDateFrom);
                                                fromDate.setHours(0, 0, 0, 0);
                                                return thisDate.getTime() < fromDate.getTime();
                                            }
                                        } }
                                    />
                                    { ( bvDateFrom > bvDateTo ) &&
                                        <Notice
                                            className="advgb-notice-sidebar"
                                            status="warning"
                                            isDismissible={ false }
                                        >
                                            { __( 'Stop showing date should be after Start showing date!', 'advanced-gutenberg' ) }
                                        </Notice>
                                    }
                                    { console.log(bvDateFrom > bvDateTo) }
                                </Fragment>
                            ) }
                        </PanelBody>
                </InspectorControls>
            ] )
        }
    } );

    const withAttributes = createHigherOrderComponent( ( BlockListBlock ) => {
        return ( props ) => {
            if ( ( ! SUPPORTED_BLOCKS || SUPPORTED_BLOCKS.includes( props.name ) ) && hasBlockSupport( props.name, 'advgb/blockVisibility', true ) ) {
                const {
                    bvEnabled,
                    bvDateFrom,
                    bvDateTo,
                    bvRecur,
                } = props.attributes;

                return <BlockListBlock { ...props } bvDateFrom={ `${ bvDateFrom }` } bvDateTo={ `${ bvDateTo }` } bvEnabled={ `${ bvEnabled }` } bvRecur={ `${ bvRecur }` } />;
            }

            return <BlockListBlock { ...props } />;
        };
    }, 'withAttributes' );

    // Apply custom styles on back-end
    wp.hooks.addFilter( 'editor.BlockListBlock', 'advgb/loadBackendBlockVisibility', withAttributes );

})( wp.i18n, wp.hooks, wp.blocks, wp.blockEditor, wp.components, wp.compose );
