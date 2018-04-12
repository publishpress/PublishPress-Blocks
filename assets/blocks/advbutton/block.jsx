const { __ } = wp.i18n;
const { Component } = wp.element;
const { registerBlockType, createBlock, InspectorControls, BlockControls, BlockAlignmentToolbar, RichText, ColorPalette } = wp.blocks;
const { RangeControl, PanelBody, PanelColor, TextControl, ToggleControl, SelectControl, IconButton } = wp.components;

class AdvButton extends Component {
    constructor() {
        super( ...arguments );
    }

    componentWillMount() {
        const { attributes, setAttributes, id } = this.props;

        if ( !attributes.id ) {
            setAttributes( { id: 'advgbbtn-' + id } );
        }
    }

    render() {
        const listBorderStyles = [
            { label: __( 'None' ), value: 'none' },
            { label: __( 'Solid' ), value: 'solid' },
            { label: __( 'Dotted' ), value: 'dotted' },
            { label: __( 'Dashed' ), value: 'dashed' },
            { label: __( 'Double' ), value: 'double' },
            { label: __( 'Groove' ), value: 'groove' },
            { label: __( 'Ridge' ), value: 'ridge' },
            { label: __( 'Inset' ), value: 'inset' },
            { label: __( 'Outset' ), value: 'outset' },
        ];
        const {
            attributes,
            setAttributes,
            isSelected,
            className,
            id: blockID,
        } = this.props;
        const {
            id,
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
            borderStyle,
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
                    <div className="components-toolbar">
                        <IconButton
                            label={ __( 'Refresh this button when it conflict with other buttons styles' ) }
                            icon="update"
                            className="components-toolbar__control"
                            onClick={ () => setAttributes( { id: 'advgbbutton-' + blockID } ) }
                        />
                    </div>
                </BlockControls>
            ),
            <span key="advgb-button" style={ { display: 'inline-block' } } >
                <RichText
                    tagName="span"
                    placeholder={ __( 'Add text…' ) }
                    value={ text }
                    onChange={ ( value ) => setAttributes( { text: value } ) }
                    formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
                    isSelected={ isSelected }
                    className={ `wp-block-advgb-button_link ${id}` }
                    keepPlaceholderOnFocus
                />
            </span>,
            <style key="advgb-button-styles">
                {`.${id} {
                    font-size: ${textSize}px;
                    color: ${textColor};
                    background-color: ${bgColor};
                    padding: ${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px;
                    border-width: ${borderWidth}px;
                    border-color: ${borderColor};
                    border-radius: ${borderRadius}px;
                    border-style: ${borderStyle};
                }
                .${id}:hover {
                    color: ${hoverTextColor};
                    background-color: ${hoverBgColor};
                    box-shadow: ${hoverShadowH}px ${hoverShadowV}px ${hoverShadowBlur}px ${hoverShadowSpread}px ${hoverShadowColor};
                }`}
            </style>,
            isSelected && (
                <InspectorControls key="advgb-button-inspector">
                    <PanelBody title={ __( 'Button link' ) }>
                        <TextControl
                            label={ [
                                __( 'Link URL' ),
                                (url && <a href={ url || '#' } target="_blank" style={ { float: 'right' } }>
                                    { __( 'Preview' ) }
                                </a>)
                            ] }
                            value={ url || '' }
                            placeholder={ __( 'Enter URL…' ) }
                            onChange={ ( text ) => setAttributes( { url: text } ) }
                        />
                        <ToggleControl
                            label={ __( 'Open in new tab' ) }
                            checked={ !!urlOpenNewTab }
                            onChange={ () => setAttributes( { urlOpenNewTab: !attributes.urlOpenNewTab } ) }
                        />
                    </PanelBody>
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
                    </PanelBody>
                    <PanelBody title={ __( 'Border' ) } initialOpen={ false } >
                        <RangeControl
                            label={ __( 'Border radius' ) }
                            value={ borderRadius || '' }
                            onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
                            min={ 0 }
                            max={ 100 }
                        />
                        <SelectControl
                            label={ __( 'Border style' ) }
                            value={ borderStyle }
                            options={ listBorderStyles }
                            onChange={ ( value ) => setAttributes( { borderStyle: value } ) }
                        />
                        {borderStyle !== 'none' &&
                        [
                            <PanelColor key="border-color" title={ __( 'Border color' ) } colorValue={ borderColor } initialOpen={ false } >
                                <ColorPalette
                                    value={ borderColor }
                                    onChange={ ( value ) => setAttributes( { borderColor: value } ) }
                                />
                            </PanelColor>,
                            <RangeControl
                                key="border-width"
                                label={ __( 'Border width' ) }
                                value={ borderWidth || '' }
                                onChange={ ( value ) => setAttributes( { borderWidth: value } ) }
                                min={ 0 }
                                max={ 100 }
                            />
                        ]
                        }
                    </PanelBody>
                    <PanelBody title={ __( 'Padding' ) } initialOpen={ false } >
                        <RangeControl
                            label={ __( 'Padding top' ) }
                            value={ paddingTop || '' }
                            onChange={ ( value ) => setAttributes( { paddingTop: value } ) }
                            min={ 0 }
                            max={ 100 }
                        />
                        <RangeControl
                            label={ __( 'Padding right' ) }
                            value={ paddingRight || '' }
                            onChange={ ( value ) => setAttributes( { paddingRight: value } ) }
                            min={ 0 }
                            max={ 100 }
                        />
                        <RangeControl
                            label={ __( 'Padding bottom' ) }
                            value={ paddingBottom || '' }
                            onChange={ ( value ) => setAttributes( { paddingBottom: value } ) }
                            min={ 0 }
                            max={ 100 }
                        />
                        <RangeControl
                            label={ __( 'Padding left' ) }
                            value={ paddingLeft || '' }
                            onChange={ ( value ) => setAttributes( { paddingLeft: value } ) }
                            min={ 0 }
                            max={ 100 }
                        />
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
                            />
                            <RangeControl
                                label={ __( 'Shadow V offset' ) }
                                value={ hoverShadowV || '' }
                                onChange={ ( value ) => setAttributes( { hoverShadowV: value } ) }
                                min={ -50 }
                                max={ 50 }
                            />
                            <RangeControl
                                label={ __( 'Shadow blur' ) }
                                value={ hoverShadowBlur || '' }
                                onChange={ ( value ) => setAttributes( { hoverShadowBlur: value } ) }
                                min={ 0 }
                                max={ 50 }
                            />
                            <RangeControl
                                label={ __( 'Shadow spread' ) }
                                value={ hoverShadowSpread || '' }
                                onChange={ ( value ) => setAttributes( { hoverShadowSpread: value } ) }
                                min={ 0 }
                                max={ 50 }
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
    keywords: [ __('button'), __('link') ],
    attributes: {
        id: {
            type: 'string',
        },
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
            default: 18,
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
        borderStyle: {
            type: 'string',
            default: 'solid',
        },
        borderRadius: {
            type: 'number',
            default: 50
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
    transforms: {
        from: [
            {
                type: 'block',
                blocks: [ 'core/button' ],
                transform: ( attributes ) => {
                    return createBlock( 'advgb/button', {
                        ...attributes,
                        bgColor: attributes.color,
                    } )
                }
            }
        ],
        to: [
            {
                type: 'block',
                blocks: [ 'core/button' ],
                transform: ( attributes ) => {
                    return createBlock( 'core/button', {
                        ...attributes,
                        color: attributes.bgColor,
                    } )
                }
            }
        ]
    },
    edit: AdvButton,
    save: function ( { attributes } ) {
        const {
            id,
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
            borderStyle,
            hoverTextColor,
            hoverBgColor,
            hoverShadowColor,
            hoverShadowH,
            hoverShadowV,
            hoverShadowBlur,
            hoverShadowSpread,
        } = attributes;

        return (
            <div className={ `align${align}` }>
                <a className={ `wp-block-advgb-button_link ${id}` }
                   href={ url || '#' } title={ title }
                   target={ !urlOpenNewTab ? '_self' : '_blank' }
                >
                    { text }
                </a>
                <style>
                    {`.${id} {
                        font-size: ${textSize}px;
                        color: ${textColor};
                        background-color: ${bgColor};
                        padding: ${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px;
                        border-width: ${borderWidth}px;
                        border-color: ${borderColor};
                        border-radius: ${borderRadius}px;
                        border-style: ${borderStyle};
                    }
                    .${id}:hover {
                        color: ${hoverTextColor};
                        background-color: ${hoverBgColor};
                        box-shadow: ${hoverShadowH}px ${hoverShadowV}px ${hoverShadowBlur}px ${hoverShadowSpread}px ${hoverShadowColor};
                    }`}
                </style>
            </div>
        );
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