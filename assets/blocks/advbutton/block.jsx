const { __ } = wp.i18n;
const { Component } = wp.element;
const { registerBlockType, createBlock, InspectorControls, BlockControls, BlockAlignmentToolbar, RichText, ColorPalette } = wp.blocks;
const { RangeControl, PanelBody, PanelColor, TextControl, ToggleControl } = wp.components;

class AdvButton extends Component {
    constructor() {
        super( ...arguments );
    }

    render() {
        const {
            attributes,
            setAttributes,
            isSelected,
            className,
        } = this.props;
        const {
            align,
            url,
            urlOpenNewTab,
            title,
            text,
            bgColor,
            textColor,
            textSize,
            paddingTop,
            paddingRight,
            paddingBottom,
            paddingLeft,
            borderWidth,
            borderColor,
            borderRadius,
            hoverTextColor,
            hoverBgColor,
            hoverShadowColor,
            hoverShadowH,
            hoverShadowV,
            hoverShadowBlur,
            hoverShadowSpread,
        } = attributes;

        return [
            isSelected && (
                <BlockControls key="advgb-button-toolbar" >
                    <BlockAlignmentToolbar value={ align } onChange={ ( align ) => setAttributes( { align: align } ) } />
                </BlockControls>
            ),
            <span key="advgb-button" style={ { display: 'inline-block' } } >
                <RichText
                    tagName="span"
                    placeholder={ __( 'Add text…' ) }
                    value={ text }
                    onChange={ ( value ) => setAttributes( { text: value } ) }
                    isSelected={ isSelected }
                    keepPlaceholderOnFocus
                />
            </span>,
            isSelected && (
                <InspectorControls key="advgb-button-inspector">
                    <PanelBody title={ __( 'Text/Color' ) }>
                        <RangeControl
                            label={ __( 'Text size' ) }
                            value={ textSize || '' }
                            onChange={ ( size ) => setAttributes( { textSize: size } ) }
                            min={ 10 }
                            max={ 100 }
                            beforeIcon="editor-textcolor"
                            allowReset
                        />
                        <PanelColor
                            title={ __( 'Text color' ) }
                            colorValue={ textColor }
                            initialOpen={ false }
                        >
                            <ColorPalette
                                value={ textColor }
                                onChange={ ( color ) => setAttributes( { textColor: color } ) }
                            />
                        </PanelColor>
                        <PanelColor
                            title={ __( 'Background color' ) }
                            colorValue={ bgColor }
                            initialOpen={ false }
                        >
                            <ColorPalette
                                value={ bgColor }
                                onChange={ ( color ) => setAttributes( { bgColor: color } ) }
                            />
                        </PanelColor>
                        <TextControl
                            label={ __( 'Link URL' ) }
                            value={ url || '' }
                            placeholder={ __( 'Enter URL…' ) }
                            onChange={ ( text ) => setAttributes( { url: text } ) }
                        />
                        <ToggleControl
                            label={ __( 'Open link in new tab' ) }
                            checked={ !!urlOpenNewTab }
                            onChange={ () => setAttributes( { urlOpenNewTab: !attributes.urlOpenNewTab } ) }
                        />
                    </PanelBody>
                    <PanelBody title={ __( 'Padding' ) } initialOpen={ false } >
                        <RangeControl
                            label={ __( 'Padding top' ) }
                            value={ paddingTop || '' }
                            onChange={ ( value ) => setAttributes( { paddingTop: value } ) }
                            min={ 0 }
                            max={ 100 }
                            allowReset
                        />
                        <RangeControl
                            label={ __( 'Padding right' ) }
                            value={ paddingRight || '' }
                            onChange={ ( value ) => setAttributes( { paddingRight: value } ) }
                            min={ 0 }
                            max={ 100 }
                            allowReset
                        />
                        <RangeControl
                            label={ __( 'Padding bottom' ) }
                            value={ paddingBottom || '' }
                            onChange={ ( value ) => setAttributes( { paddingBottom: value } ) }
                            min={ 0 }
                            max={ 100 }
                            allowReset
                        />
                        <RangeControl
                            label={ __( 'Padding left' ) }
                            value={ paddingLeft || '' }
                            onChange={ ( value ) => setAttributes( { paddingLeft: value } ) }
                            min={ 0 }
                            max={ 100 }
                            allowReset
                        />
                    </PanelBody>
                    <PanelBody title={ __( 'Border' ) } initialOpen={ false } >
                        <RangeControl
                            label={ __( 'Border width' ) }
                            value={ borderWidth || '' }
                            onChange={ ( value ) => setAttributes( { borderWidth: value } ) }
                            min={ 0 }
                            max={ 100 }
                            allowReset
                        />
                        <RangeControl
                            label={ __( 'Border radius' ) }
                            value={ borderRadius || '' }
                            onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
                            min={ 0 }
                            max={ 100 }
                            allowReset
                        />
                        <PanelColor title={ __( 'Border color' ) } colorValue={ borderColor } initialOpen={ false } >
                            <ColorPalette
                                value={ borderColor }
                                onChange={ ( value ) => setAttributes( { borderColor: value } ) }
                            />
                        </PanelColor>
                    </PanelBody>
                    <PanelBody title={ __( 'Hover' ) } initialOpen={ false } >
                        <PanelColor title={ __( 'Text color' ) } colorValue={ hoverTextColor } initialOpen={ false } >
                            <ColorPalette
                                value={ hoverTextColor }
                                onChange={ ( value ) => setAttributes( { hoverTextColor: value } ) }
                            />
                        </PanelColor>
                        <PanelColor title={ __( 'Background color' ) } colorValue={ hoverBgColor } initialOpen={ false } >
                            <ColorPalette
                                value={ hoverBgColor }
                                onChange={ ( value ) => setAttributes( { hoverBgColor: value } ) }
                            />
                        </PanelColor>
                        <PanelBody title={ __( 'Shadow' ) } initialOpen={ false }  >
                            <PanelColor title={ __( 'Shadow color' ) } colorValue={ hoverShadowColor } initialOpen={ false } >
                                <ColorPalette
                                    value={ hoverShadowColor }
                                    onChange={ ( value ) => setAttributes( { hoverShadowColor: value } ) }
                                />
                            </PanelColor>
                            <RangeControl
                                label={ __( 'Shadow H offset' ) }
                                value={ hoverShadowH || '' }
                                onChange={ ( value ) => setAttributes( { hoverShadowH: value } ) }
                                min={ -50 }
                                max={ 50 }
                                allowReset
                            />
                            <RangeControl
                                label={ __( 'Shadow V offset' ) }
                                value={ hoverShadowV || '' }
                                onChange={ ( value ) => setAttributes( { hoverShadowV: value } ) }
                                min={ -50 }
                                max={ 50 }
                                allowReset
                            />
                            <RangeControl
                                label={ __( 'Shadow blur' ) }
                                value={ hoverShadowBlur || '' }
                                onChange={ ( value ) => setAttributes( { hoverShadowBlur: value } ) }
                                min={ -50 }
                                max={ 50 }
                                allowReset
                            />
                            <RangeControl
                                label={ __( 'Shadow spread' ) }
                                value={ hoverShadowSpread || '' }
                                onChange={ ( value ) => setAttributes( { hoverShadowSpread: value } ) }
                                min={ -50 }
                                max={ 50 }
                                allowReset
                            />
                        </PanelBody>
                    </PanelBody>
                </InspectorControls>
            )
        ]
    }
}

registerBlockType( 'advgb/button', {
    title: __( 'Advanced Button' ),
    description: __( 'New button with more styles.' ),
    icon: 'button',
    category: 'layout',
    attributes: {
        url: {
            type: 'string',
        },
        urlOpenNewTab: {
            type: 'boolean',
            default: true,
        },
        title: {
            type: 'string',
        },
        text: {
            type: 'string',
            source: 'children',
            selector: 'a',
        },
        bgColor: {
            type: 'string',
            default: '#2196f3',
        },
        textColor: {
            type: 'string',
            default: '#fff',
        },
        textSize: {
            type: 'number',
        },
        paddingTop: {
            type: 'number',
            default: 6,
        },
        paddingRight: {
            type: 'number',
            default: 12,
        },
        paddingBottom: {
            type: 'number',
            default: 6,
        },
        paddingLeft: {
            type: 'number',
            default: 12,
        },
        borderWidth: {
            type: 'number',
            default: 1,
        },
        borderColor: {
            type: 'string',
            default: '#2196f3'
        },
        borderRadius: {
            type: 'number',
            default: 0
        },
        hoverTextColor: {
            type: 'string',
            default: '#fff'
        },
        hoverBgColor: {
            type: 'string',
            default: '#2196f3'
        },
        hoverShadowColor: {
            type: 'string',
            default: '#ccc'
        },
        hoverShadowH: {
            type: 'number',
            default: 3,
        },
        hoverShadowV: {
            type: 'number',
            default: 3,
        },
        hoverShadowBlur: {
            type: 'number',
            default: 1,
        },
        hoverShadowSpread: {
            type: 'number',
            default: 0,
        },
        align: {
            type: 'string',
            default: 'none',
        }
    },
    edit: AdvButton,
    save: function ( { attributes } ) {
        return null;
    },
    getEditWrapperProps( attributes ) {
        const { align } = attributes;
        const props = { 'data-resized': true };

        if ( 'left' === align || 'right' === align || 'center' === align ) {
            props[ 'data-align' ] = align;
        }

        return props;
    },
} );