(function ( wpI18n, wpHooks, wpEditor, wpComponents ) {
    const { addFilter } = wpHooks;
    const { __ } = wpI18n;
    const { InspectorControls, ColorPalette } = wpEditor;
    const { SelectControl, PanelColor, PanelBody, RangeControl } = wpComponents;

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
                const { isSelected, attributes, setAttributes, id } = props;
                const { borderColor, borderSize, borderStyle, borderWidth } = attributes;

                return ( [
                    <BlockEdit key="block-edit-custom-separator" {...props} />,
                    isSelected &&
                    <InspectorControls key="inspector-custom-separator">
                        <PanelBody title={__( 'Separator Settings' )}>
                            <PanelColor title={__( 'Color' )} colorValue={borderColor} initialOpen={false}>
                                <ColorPalette
                                    value={borderColor}
                                    onChange={( value ) => setAttributes( { borderColor: value } )}
                                />
                            </PanelColor>
                            <SelectControl
                                label={__( 'Styles' )}
                                value={borderStyle}
                                options={[
                                    { label: __( 'Solid' ), value: 'solid' },
                                    { label: __( 'Dotted' ), value: 'dotted' },
                                    { label: __( 'Dashed' ), value: 'dashed' },
                                    { label: __( 'Double' ), value: 'double' },
                                ]}
                                onChange={( value ) => setAttributes( { borderStyle: value } )}
                            />
                            <RangeControl
                                label={__( 'Thick' )}
                                value={borderWidth}
                                min={1}
                                max={20}
                                onChange={( value ) => setAttributes( { borderWidth: value } )}
                            />
                            <RangeControl
                                label={__( 'Width' )}
                                value={borderSize}
                                min={50}
                                max={1000}
                                onChange={( value ) => setAttributes( { borderSize: value } )}
                            />
                        </PanelBody>
                    </InspectorControls>,
                    <style key="custom-separator-styles">
                        {`#block-${id} hr {
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