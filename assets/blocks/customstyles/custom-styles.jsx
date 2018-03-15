const { addFilter } = wp.hooks;
const { __ } = wp.i18n;
const { InspectorControls, hasBlockSupport } = wp.blocks;
const { SelectControl } = wp.components;

// Register custom styles to blocks attributes
addFilter( 'blocks.registerBlockType', 'advgb/registerCustomStyleClass', function ( settings ) {
    settings.attributes = Object.assign( settings.attributes, {
        customStyle: {
            type: 'string'
        }
    } );

    return settings;
} );

// Add option to return to default style
if (advGb_CS) {
    advGb_CS.unshift( {
        id: 0,
        label: __( 'Paragraph' ),
        value: ''
    } );
}

// Add option to select custom styles for paragraph blocks
addFilter( 'blocks.BlockEdit', 'advgb/customStyles', function ( BlockEdit ) {
    return ( props ) => {
        // Apply custom styles on editor init
        if (props.attributes.customStyle) {
            jQuery( document ).ready( function ( $ ) {
                $( '.gutenberg #editor' )
                    .find( 'div[data-block="' + props.id + '"]' ).find( '.blocks-rich-text' )
                    .find( 'p' ).addClass( props.attributes.customStyle );
            } );
        }

        return ( [
            <BlockEdit key="block-edit-custom-class-name" {...props} />,
            props.isSelected && props.name === "core/paragraph" &&
            <InspectorControls key="advgb-custom-controls">
                <SelectControl
                    label={__( 'Custom styles' )}
                    help={__( 'This option let you add custom style for current paragraph.' )}
                    value={props.attributes.customStyle}
                    options={advGb_CS.map( ( cstyle, index ) => {
                        if (cstyle.title) advGb_CS[ index ].label = cstyle.title;
                        if (cstyle.name) advGb_CS[ index ].value = cstyle.name;

                        return cstyle;
                    } )}
                    onChange={( cstyle ) => {
                        const { id, attributes } = props;
                        const { customStyle: oldStyle } = attributes;

                        props.setAttributes( {
                            customStyle: cstyle,
                            backgroundColor: undefined,
                            textColor: undefined,
                            fontSize: undefined,
                        } );

                        // Apply custom style on select
                        jQuery( '.gutenberg #editor' )
                            .find( 'div[data-block="' + id + '"]' ).find( '.blocks-rich-text' )
                            .find( 'p' ).removeClass( oldStyle ).addClass( cstyle )
                    }}
                />
            </InspectorControls>
        ] )
    }
} );

// Apply custom styles on front-end
addFilter( 'blocks.getSaveContent.extraProps', 'advgb/loadFrontendCustomStyles', function ( extraProps, blockType, attributes ) {
    if (hasBlockSupport( blockType, 'customStyleName', true ) && attributes.customStyle) {
        if (typeof extraProps.className === 'undefined') {
            extraProps.className = attributes.customStyle;
        } else {
            extraProps.className += ' ' + attributes.customStyle;
            extraProps.className = extraProps.className.trim();
        }
    }

    return extraProps;
} );
