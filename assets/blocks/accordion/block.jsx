(function ( wpI18n, wpBlocks, wpElement, wpEditor, wpComponents ) {
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InspectorControls, RichText, ColorPalette } = wpEditor;
    const { RangeControl, PanelBody, PanelColor, BaseControl , SelectControl, Dashicon, Tooltip } = wpComponents;

    const HEADER_ICONS = {
        plus: (
            <Fragment>
                <path fill="none" d="M0,0h24v24H0V0z"/>
                <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"/>
            </Fragment>
        ),
        plusCircle: (
            <Fragment>
                <path fill="none" d="M0,0h24v24H0V0z"/>
                <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M17,13h-4v4h-2v-4H7v-2h4V7h2v4h4V13z"/>
            </Fragment>
        ),
        plusCircleOutline: (
            <Fragment>
                <path fill="none" d="M0,0h24v24H0V0z"/>
                <path d="M13,7h-2v4H7v2h4v4h2v-4h4v-2h-4V7z M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20 c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z"/>
            </Fragment>
        ),
        plusBox: (
            <Fragment>
                <path fill="none" d="M0,0h24v24H0V0z"/>
                <path d="M19,3H5C3.89,3,3,3.9,3,5v14c0,1.1,0.89,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V5h14V19z"/>
                <polygon points="11,17 13,17 13,13 17,13 17,11 13,11 13,7 11,7 11,11 7,11 7,13 11,13"/>
            </Fragment>
        ),
        unfold: (
            <Fragment>
                <path fill="none" d="M0,0h24v24H0V0z"/>
                <path d="M12,5.83L15.17,9l1.41-1.41L12,3L7.41,7.59L8.83,9L12,5.83z M12,18.17L8.83,15l-1.41,1.41L12,21l4.59-4.59L15.17,15 L12,18.17z"/>
            </Fragment>
        ),
        threeDots: (
            <Fragment>
                <path fill="none" d="M0,0h24v24H0V0z"/>
                <path d="M6,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S7.1,10,6,10z M18,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S19.1,10,18,10z M12,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S13.1,10,12,10z"/>
            </Fragment>
        ),
        arrowDown: (
            <Fragment>
                <path opacity="0.87" fill="none" d="M24,24H0L0,0l24,0V24z"/>
                <path d="M16.59,8.59L12,13.17L7.41,8.59L6,10l6,6l6-6L16.59,8.59z"/>
            </Fragment>
        )
    };

    class AdvAccordion extends Component {
        constructor() {
            super( ...arguments );
            this.state = {
                currentAccordion: null,
            }
        }

        componentDidMount() {
            this.initAccordion();
        }

        componentDidUpdate( prevProps ) {
            if ( prevProps.attributes.items.length < this.props.attributes.items.length ) {
                this.initAccordion( true );
            }

            if (this.props.attributes.items.length === 0) {
                this.props.setAttributes( {
                    items: [
                        {
                            header: 'Header 1',
                            body: 'At least one accordion must remaining, to remove block use "Remove Block" button from right menu.',
                        },
                    ],
                } );
            }
        }

        initAccordion( refresh = false ) {
            if (typeof jQuery !== "undefined") {
                if (!refresh) {
                    jQuery( `#block-${this.props.id} .advgb-accordion-block` ).accordion( {
                        header: ".advgb-accordion-header",
                        heightStyle: "content",
                    } );
                } else {
                    jQuery(`#block-${this.props.id} .advgb-accordion-block`).accordion('refresh');
                }

                jQuery(`#block-${this.props.id} .advgb-accordion-block h4`).on( 'keydown', function ( e ) {
                    e.stopPropagation();
                } )
            }
        }

        updateAccordion( value, index ) {
            const { attributes, setAttributes } = this.props;
            const { items } = attributes;

            let newItems = items.map( ( item, thisIndex ) => {
                if ( index === thisIndex ) {
                    if (value.body) {
                        if (value.body.length !== item.body.length) {
                            this.initAccordion( true );
                        }
                    }

                    item = { ...item, ...value };
                }

                return item;
            } );

            setAttributes( { items: newItems } )
        }

        render() {
            const { isSelected, attributes, setAttributes } = this.props;
            const {
                items,
                headerBgColor,
                headerTextColor,
                headerIcon,
                headerIconColor,
                bodyBgColor,
                bodyTextColor,
                borderStyle,
                borderWidth,
                borderColor,
                borderRadius,
            } = attributes;

            return (
                <Fragment>
                    <InspectorControls>
                        <PanelBody title={ __( 'Header Settings' ) }>
                            <PanelColor title={ __( 'Background Color' ) } colorValue={ headerBgColor } initialOpen={ false }>
                                <ColorPalette
                                    value={ headerBgColor }
                                    onChange={ ( value ) => setAttributes( { headerBgColor: value } ) }
                                />
                            </PanelColor>
                            <PanelColor title={ __( 'Text Color' ) } colorValue={ headerTextColor } initialOpen={ false }>
                                <ColorPalette
                                    value={ headerTextColor }
                                    onChange={ ( value ) => setAttributes( { headerTextColor: value } ) }
                                />
                            </PanelColor>
                            <PanelBody title={ __( 'Header Icon' ) }>
                                <BaseControl label={ __( 'Icon Style' ) }>
                                    <div className="advgb-icon-items-wrapper">
                                        {Object.keys( HEADER_ICONS ).map( ( key, index ) => (
                                            <div className="advgb-icon-item" key={ index }>
                                                <span className={ key === headerIcon ? 'active' : '' }
                                                      onClick={ () => setAttributes( { headerIcon: key } ) }>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        { HEADER_ICONS[key] }
                                                    </svg>
                                                </span>
                                            </div>
                                        ) ) }
                                    </div>
                                </BaseControl>
                                <PanelColor title={ __( 'Icon Color' ) } colorValue={ headerIconColor } initialOpen={ false }>
                                    <ColorPalette
                                        value={ headerIconColor }
                                        onChange={ ( value ) => setAttributes( { headerIconColor: value } ) }
                                    />
                                </PanelColor>
                            </PanelBody>
                        </PanelBody>
                        <PanelBody title={ __( 'Body Settings' ) } initialOpen={ false }>
                            <PanelColor title={ __( 'Background Color' ) } colorValue={ bodyBgColor } initialOpen={ false }>
                                <ColorPalette
                                    value={ bodyBgColor }
                                    onChange={ ( value ) => setAttributes( { bodyBgColor: value } ) }
                                />
                            </PanelColor>
                            <PanelColor title={ __( 'Text Color' ) } colorValue={ bodyTextColor } initialOpen={ false }>
                                <ColorPalette
                                    value={ bodyTextColor }
                                    onChange={ ( value ) => setAttributes( { bodyTextColor: value } ) }
                                />
                            </PanelColor>
                        </PanelBody>
                        <PanelBody title={ __( 'Border Settings' ) } initialOpen={ false }>
                            <SelectControl
                                label={ __( 'Border Style' ) }
                                value={ borderStyle }
                                options={ [
                                    { label: __( 'Solid' ), value: 'solid' },
                                    { label: __( 'Dashed' ), value: 'dashed' },
                                    { label: __( 'Dotted' ), value: 'dotted' },
                                ] }
                                onChange={ ( value ) => setAttributes( { borderStyle: value } ) }
                            />
                            <PanelColor title={ __( 'Border Color' ) } colorValue={ borderColor } initialOpen={ false }>
                                <ColorPalette
                                    value={ borderColor }
                                    onChange={ ( value ) => setAttributes( { borderColor: value } ) }
                                />
                            </PanelColor>
                            <RangeControl
                                label={ __( 'Border width' ) }
                                value={ borderWidth }
                                min={ 1 }
                                max={ 10 }
                                onChange={ ( value ) => setAttributes( { borderWidth: value } ) }
                            />
                            <RangeControl
                                label={ __( 'Border radius' ) }
                                value={ borderRadius }
                                min={ 0 }
                                max={ 100 }
                                onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
                            />
                        </PanelBody>
                    </InspectorControls>
                    <div className="advgb-accordion-block">
                        {items.map( ( item, index ) => (
                            <Fragment key={ index }>
                                <div className="advgb-accordion-header"
                                     style={ {
                                         backgroundColor: headerBgColor,
                                         color: headerTextColor,
                                         borderStyle: borderStyle,
                                         borderWidth: borderWidth + 'px',
                                         borderColor: borderColor,
                                         borderRadius: borderRadius + 'px',
                                     } }
                                >
                                    <Tooltip text={ __( 'Remove item' ) }>
                                        <span className="advgb-accordion-remove"
                                              onClick={ () => setAttributes( { items: items.filter( ( cItem, cIndex) => cIndex !== index ) } ) }
                                        >
                                            <Dashicon icon="no"/>
                                        </span>
                                    </Tooltip>
                                    <span className="advgb-accordion-header-icon">
                                        <svg fill={ headerIconColor } xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            { HEADER_ICONS[headerIcon] }
                                        </svg>
                                    </span>
                                    <RichText
                                        tagName="h4"
                                        value={ item.header }
                                        onChange={ ( value ) => this.updateAccordion( { header: value }, index ) }
                                        onSplit={ () => null }
                                        placeholder={ __( 'Enter header…' ) }
                                    />
                                </div>
                                <div className="advgb-accordion-body"
                                     style={ {
                                         backgroundColor: bodyBgColor,
                                         color: bodyTextColor,
                                         borderStyle: borderStyle,
                                         borderWidth: borderWidth + 'px',
                                         borderColor: borderColor,
                                         borderRadius: borderRadius + 'px',
                                     } }
                                >
                                    <RichText
                                        tagName="p"
                                        value={ item.body }
                                        onChange={ ( value ) => this.updateAccordion( { body: value }, index ) }
                                        placeholder={ __( 'Enter text…' ) }
                                    />
                                </div>
                            </Fragment>
                        ) ) }
                    </div>
                    {isSelected &&
                        <div className="advgb-accordion-controls">
                            <button className="button button-large button-primary"
                                    onClick={ () => setAttributes( {
                                        items: [
                                            ...items,
                                            { header: __( 'New item' ), body: __( 'New item' ) }
                                        ]
                                    } ) }
                            >
                                { __( 'Add item' ) }
                            </button>
                        </div>
                    }
                </Fragment>
            )
        }
    }

    const blockColor = typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined;
    const accordionBlockIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="2 2 22 22" fill={ blockColor }>
            <path fill="none" d="M0,0h24v24H0V0z"/>
            <rect x="3" y="17" width="18" height="2"/>
            <path d="M19,12v1H5v-1H19 M21,10H3v5h18V10L21,10z"/>
            <rect x="3" y="6" width="18" height="2"/>
        </svg>
    );

    registerBlockType( 'advgb/accordion', {
        title: __( 'Accordion' ),
        description: __( 'Easy to create an accordion for your post/page.' ),
        icon: accordionBlockIcon,
        category: 'formatting',
        keywords: [ __( 'accordion' ), __( 'list' ), __( 'faq' ) ],
        attributes: {
            items: {
                type: 'array',
                default: [
                    {
                        header: 'Header 1',
                        body: 'Filler text (also placeholder text or dummy text) is text that shares some characteristics of a real written text, but is random or otherwise generated',
                    },
                    {
                        header: 'Header 2',
                        body: 'Description 2',
                    },
                    {
                        header: 'Header 3',
                        body: 'Description 3',
                    },
                ]
            },
            headerBgColor: {
                type: 'string',
                default: '#000',
            },
            headerTextColor: {
                type: 'string',
                default: '#fff',
            },
            headerIcon: {
                type: 'string',
                default: 'plusCircleOutline',
            },
            headerIconColor: {
                type: 'string',
                default: '#fff',
            },
            bodyBgColor: {
                type: 'string',
            },
            bodyTextColor: {
                type: 'string',
            },
            borderStyle: {
                type: 'string',
                default: 'solid',
            },
            borderWidth: {
                type: 'number',
                default: 1,
            },
            borderColor: {
                type: 'string',
            },
            borderRadius: {
                type: 'number',
                default: 2,
            },
            changed: {
                type: 'boolean',
                default: false,
            }
        },
        edit: AdvAccordion,
        save: function ( { attributes } ) {
            const {
                items,
                headerBgColor,
                headerTextColor,
                headerIcon,
                headerIconColor,
                bodyBgColor,
                bodyTextColor,
                borderStyle,
                borderWidth,
                borderColor,
                borderRadius,
            } = attributes;

            return (
                <div className="advgb-accordion-block">
                    {items.map( ( item, index ) => (
                        <Fragment key={ index }>
                            <div className="advgb-accordion-header"
                                 style={ {
                                     backgroundColor: headerBgColor,
                                     color: headerTextColor,
                                     borderStyle: borderStyle,
                                     borderWidth: borderWidth + 'px',
                                     borderColor: borderColor,
                                     borderRadius: borderRadius + 'px',
                                 } }
                            >
                                <span className="advgb-accordion-header-icon">
                                    <svg fill={ headerIconColor } xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        { HEADER_ICONS[headerIcon] }
                                    </svg>
                                </span>
                                <h4 className="advgb-accordion-header-title">{ item.header }</h4>
                            </div>
                            <div className="advgb-accordion-body"
                                 style={ {
                                     backgroundColor: bodyBgColor,
                                     color: bodyTextColor,
                                     borderStyle: borderStyle,
                                     borderWidth: borderWidth + 'px',
                                     borderColor: borderColor,
                                     borderRadius: borderRadius + 'px',
                                 } }
                            >
                                <RichText.Content tagName="p" value={ item.body }/>
                            </div>
                        </Fragment>
                    ) ) }
                </div>
            );
        },
    } );
})( wp.i18n, wp.blocks, wp.element, wp.editor, wp.components );