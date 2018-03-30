const { addFilter } = wp.hooks;
const { __ } = wp.i18n;
const { InspectorControls, hasBlockSupport } = wp.blocks;
const { SelectControl } = wp.components;

// Register custom styles to blocks attributes
addFilter( 'blocks.registerBlockType', 'advgb/registerCustomStyleClass', function ( settings ) {
    settings.attributes = Object.assign( settings.attributes, {
        customStyle: {
            type: 'string'
        },
        identifyColor: {
            type: 'string'
        }
    } );

    return settings;
} );

// Add option to return to default style
if (advGb_CS) {
    advGb_CS.unshift( {
        id: 0,
        label: __( 'Paragraph', 'advanced-gutenberg' ),
        value: '',
        identifyColor: ''
    } );
}

// Add option to select custom styles for paragraph blocks
addFilter( 'blocks.BlockEdit', 'advgb/customStyles', function ( BlockEdit ) {
    return ( props ) => {
        return ( [
            <BlockEdit key="block-edit-custom-class-name" {...props} />,
            props.isSelected && props.name === "core/paragraph" &&
            <InspectorControls key="advgb-custom-controls">
                <SelectControl
                    label={ [
                        __( 'Custom styles', 'advanced-gutenberg' ),
                        <span className={'components-panel__color-area'}
                              style={ {
                                  background: props.attributes.identifyColor,
                                  verticalAlign: 'text-bottom',
                                  borderRadius: '50%',
                                  border: 'none',
                                  width: '16px',
                                  height: '16px',
                              } } />
                    ] }
                    help={__( 'This option let you add custom style for current paragraph. (Front-end only!)', 'advanced-gutenberg' )}
                    value={props.attributes.customStyle}
                    options={advGb_CS.map( ( cstyle, index ) => {
                        if (cstyle.title) advGb_CS[ index ].label = cstyle.title;
                        if (cstyle.name) advGb_CS[ index ].value = cstyle.name;

                        return cstyle;
                    } )}
                    onChange={( cstyle ) => {
                        const { identifyColor } = advGb_CS.filter( ( style ) => style.value === cstyle )[0];
                        props.setAttributes( {
                            customStyle: cstyle,
                            identifyColor: identifyColor,
                            backgroundColor: undefined,
                            textColor: undefined,
                            fontSize: undefined,
                        } );
                    }}
                />
            </InspectorControls>
        ] )
    }
} );

// Apply custom styles on front-end
addFilter( 'blocks.getSaveContent.extraProps', 'advgb/loadFrontendCustomStyles', function ( extraProps, blockType, attributes ) {
    if (hasBlockSupport( blockType, 'customStyle', true ) && attributes.customStyle) {
        if (typeof extraProps.className === 'undefined') {
            extraProps.className = attributes.customStyle;
        } else {
            extraProps.className += ' ' + attributes.customStyle;
            extraProps.className = extraProps.className.trim();
        }
    }

    return extraProps;
} );
