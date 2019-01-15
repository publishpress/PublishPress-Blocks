(function ( wpI18n, wpHooks, wpEditor, wpComponents ) {
    const { addFilter } = wpHooks;
    const { __ } = wpI18n;
    const { InspectorControls } = wpEditor;
    const { PanelBody, Button } = wpComponents;

    // Register extra attributes to separator blocks
    addFilter( 'blocks.registerBlockType', 'advgb/registerExtraSeparatorAttrs', function ( settings ) {
        if (settings.name === 'core/separator') {
            settings.attributes = Object.assign( settings.attributes, {
                borderColor: {
                    type: 'string',
                },
                borderSize: {
                    type: 'number',
                },
                borderStyle: {
                    type: 'string',
                },
                borderWidth: {
                    type: 'number',
                },
            } );
        }

        return settings;
    } );

    // Add option to select styles for separator
    addFilter( 'editor.BlockEdit', 'advgb/customSeparatorStyles', function ( BlockEdit ) {
        return ( props ) => {
            if (props.name === "core/separator") {
                const { attributes, clientId } = props;
                const { borderColor, borderSize, borderStyle, borderWidth } = attributes;

                return ( [
                    <BlockEdit key="block-edit-custom-separator" {...props} />,
                    <InspectorControls key="inspector-custom">
                        <PanelBody title={ __( 'Custom styles' ) }>
                            <Button isPrimary
                                    onClick={ () => props.setAttributes( {
                                        borderColor: undefined,
                                        borderSize: undefined,
                                        borderStyle: undefined,
                                        borderWidth: undefined,
                                    } ) }>
                                { __( 'Clear custom styles' ) }
                            </Button>
                            <p style={ { fontStyle: 'italic', marginTop: 10 } }>
                                { __( 'We recommend to clear all custom styles as soon as possible to avoid block error validation,' +
                                    ' because we will remove this feature in very next version.' ) }
                            </p>
                        </PanelBody>
                    </InspectorControls>,
                    <style key="custom-separator-styles">
                        {`#block-${clientId} hr {
                        border-bottom-color: ${borderColor};
                        border-bottom-style: ${borderStyle};
                        border-bottom-width: ${borderWidth}px;
                        max-width: ${borderSize}px;
                    }`}
                    </style>
                ] )
            }

            return <BlockEdit {...props} />;
        }
    } );

    // Apply custom styles on front-end
    addFilter( 'blocks.getSaveContent.extraProps', 'advgb/saveSeparatorStyles', function ( extraProps, blockType, attributes ) {
        if (blockType.name === 'core/separator') {
            const { borderColor, borderSize, borderStyle, borderWidth } = attributes;

            extraProps = Object.assign( extraProps, {
                style: {
                    borderBottomColor: borderColor,
                    borderBottomWidth: borderWidth ? borderWidth + 'px' : undefined,
                    borderBottomStyle: borderStyle,
                    maxWidth: borderSize ? borderSize + 'px' : undefined,
                }
            } )
        }

        return extraProps;
    } );
})( wp.i18n, wp.hooks, wp.editor, wp.components );