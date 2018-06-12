(function ( wpI18n, wpBlocks, wpElement, wpEditor, wpComponents ) {
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InspectorControls, RichText, ColorPalette } = wpEditor;
    const { Dashicon, Tooltip, PanelBody, PanelColor, RangeControl, SelectControl } = wpComponents;

    class AdvTabsBlock extends Component {
        constructor() {
            super( ...arguments );
        }

        componentDidMount() {
            this.initTabs();
            if (!this.props.attributes.blockID) {
                this.props.setAttributes( { blockID: this.props.id } );
            }
        }

        componentDidUpdate( prevProps ) {
            const { tabItems: prevItems } = prevProps.attributes;
            const { tabItems } = this.props.attributes;

            if (prevItems !== tabItems) {
                this.initTabs( true );
            }
        }

        initTabs( refresh = false ) {
            if (typeof jQuery !== "undefined") {
                if (!refresh) {
                    jQuery(`#block-${this.props.id} .advgb-tabs-block`).tabs();
                } else {
                    jQuery(`#block-${this.props.id} .advgb-tabs-block`).tabs('refresh');
                }

                jQuery(`#block-${this.props.id} .advgb-tabs-block a`).on( 'keydown', function ( e ) {
                    e.stopPropagation();
                } )
            }
        }

        updateTabs( value, index ) {
            const { attributes, setAttributes } = this.props;
            const { tabItems } = attributes;

            let newItems = tabItems.map( ( item, thisIndex ) => {
                if ( index === thisIndex ) {
                    item = { ...item, ...value };
                }

                return item;
            } );

            setAttributes( { tabItems: newItems } )
        }

        render() {
            const { attributes, setAttributes, id } = this.props;
            const {
                tabItems,
                headerBgColor,
                headerTextColor,
                bodyBgColor,
                bodyTextColor,
                borderStyle,
                borderWidth,
                borderColor,
                borderRadius,
                blockID,
                activeTabBgColor,
                activeTabTextColor,
            } = attributes;

            return (
                <Fragment>
                    <InspectorControls>
                        <PanelBody title={ __( 'Tab settings' ) }>
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
                            <PanelBody title={ __( 'Active Tab Settings' ) }>
                                <PanelColor title={ __( 'Background Color' ) } colorValue={ activeTabBgColor } initialOpen={ false }>
                                    <ColorPalette
                                        value={ activeTabBgColor }
                                        onChange={ ( value ) => setAttributes( { activeTabBgColor: value } ) }
                                    />
                                </PanelColor>
                                <PanelColor title={ __( 'Text Color' ) } colorValue={ activeTabTextColor } initialOpen={ false }>
                                    <ColorPalette
                                        value={ activeTabTextColor }
                                        onChange={ ( value ) => setAttributes( { activeTabTextColor: value } ) }
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
                    <div className="advgb-tabs-block" style={ { border: 'none' } }>
                        <ul className="advgb-tabs-panel"
                            style={ {
                                borderStyle: borderStyle,
                                borderWidth: borderWidth + 'px',
                                borderColor: borderColor,
                                borderRadius: borderRadius + 'px',
                            } }
                        >
                            {tabItems.map( ( item, index ) => (
                                <li key={ index } className="advgb-tab"
                                    style={ {
                                        backgroundColor: headerBgColor,
                                        borderStyle: borderStyle,
                                        borderWidth: borderWidth + 'px',
                                        borderColor: borderColor,
                                        borderRadius: borderRadius + 'px',
                                        margin: `-${borderWidth}px 0 -${borderWidth}px -${borderWidth}px`,
                                    } }
                                >
                                    <a href={`#${item.header.toLowerCase().replace(/\s/g, '').trim()}-${index}`}
                                       style={ { color: headerTextColor } }
                                    >
                                        <RichText
                                            tagName="p"
                                            value={ item.header }
                                            onChange={ ( value ) => this.updateTabs( { header: value[0] || '' }, index ) }
                                            onSplit={ () => null }
                                            placeholder={ __( 'Title…' ) }
                                        />
                                    </a>
                                    <Tooltip text={ __( 'Remove tab' ) }>
                                        <span className="advgb-tab-remove"
                                              onClick={ () => setAttributes( {
                                                  tabItems: tabItems.filter( (vl, idx) => idx !== index )
                                              } ) }
                                        >
                                            <Dashicon icon="no"/>
                                        </span>
                                    </Tooltip>
                                </li>
                            ) ) }
                            <li className="advgb-tab advgb-add-tab ui-state-default"
                                style={ {
                                    borderRadius: borderRadius + 'px',
                                    borderWidth: borderWidth + 'px',
                                    margin: `-${borderWidth}px 0 -${borderWidth}px -${borderWidth}px`,
                                } }
                            >
                                <Tooltip text={ __( 'Add tab' ) }>
                                    <span onClick={ () => setAttributes( {
                                        tabItems: [
                                            ...tabItems,
                                            { header: __( 'New Tab' ), body: __( 'Enter your content.' ) }
                                        ]
                                    } ) }>
                                        <Dashicon icon="plus-alt"/>
                                    </span>
                                </Tooltip>
                            </li>
                        </ul>
                        {tabItems.map( ( item, index ) => (
                            <div key={ index }
                                 id={`${item.header.toLowerCase().replace(/\s/g, '')}-${index}`}
                                 className="advgb-tab-body"
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
                                    onChange={ ( value ) => this.updateTabs( { body: value }, index ) }
                                    placeholder={ __( 'Enter text…' ) }
                                />
                            </div>
                        ) ) }
                    </div>
                    {!!blockID &&
                        <style>
                            {activeTabBgColor && `#block-${id} li.advgb-tab.ui-tabs-active {
                                background-color: ${activeTabBgColor} !important;
                            }`}
                            {activeTabTextColor && `#block-${id} li.advgb-tab.ui-tabs-active a {
                                color: ${activeTabTextColor} !important;
                            }`}
                        </style>
                    }
                </Fragment>
            )
        }
    }

    const tabsBlockIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="none" d="M0,0h24v24H0V0z"/>
            <path fill="none" d="M0,0h24v24H0V0z"/>
            <path d="M21,3H3C1.9,3,1,3.9,1,5v14c0,1.1,0.9,2,2,2h18c1.1,0,2-0.9,2-2V5C23,3.9,22.1,3,21,3z M21,19H3V5h10v4h8V19z"/>
        </svg>
    );

    registerBlockType( 'advgb/tabs', {
        title: __( 'Tabs' ),
        description: __( 'Create your own tabs never easy like this.' ),
        icon: tabsBlockIcon,
        category: "formatting",
        keywords: [ __( 'tabs' ), __( 'cards' ) ],
        attributes: {
            tabItems: {
                type: "array",
                default: [
                    {
                        header: __( 'Tab 1' ),
                        body: __( 'Filler text (also placeholder text or dummy text) is text that shares some characteristics of a real written text, but is random or otherwise generated.' )
                    },
                    {
                        header: __( 'Tab 2' ),
                        body: __( 'Filler text (also placeholder text or dummy text) is text that shares some characteristics of a real written text, but is random or otherwise generated.' )
                    },
                    {
                        header: __( 'Tab 3' ),
                        body: __( 'Filler text (also placeholder text or dummy text) is text that shares some characteristics of a real written text, but is random or otherwise generated.' )
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
            blockID: {
                type: 'string',
            },
            activeTabBgColor: {
                type: 'string',
            },
            activeTabTextColor: {
                type: 'string',
            },
        },
        edit: AdvTabsBlock,
        save: function ( { attributes } ) {
            const {
                tabItems,
                headerBgColor,
                headerTextColor,
                bodyBgColor,
                bodyTextColor,
                borderStyle,
                borderWidth,
                borderColor,
                borderRadius,
                blockID,
                activeTabBgColor,
                activeTabTextColor,
            } = attributes;

            return (
                <div id={`advgb-tabs-${blockID}`} className="advgb-tabs-block" style={ { border: 'none' } }>
                    <ul className="advgb-tabs-panel"
                        style={ {
                            borderStyle: borderStyle,
                            borderWidth: borderWidth + 'px',
                            borderColor: borderColor,
                            borderRadius: borderRadius + 'px',
                        } }
                    >
                        {tabItems.map( ( item, index ) => (
                            <li key={ index } className="advgb-tab"
                                style={ {
                                    backgroundColor: headerBgColor,
                                    borderStyle: borderStyle,
                                    borderWidth: borderWidth + 'px',
                                    borderColor: borderColor,
                                    borderRadius: borderRadius + 'px',
                                    margin: `-${borderWidth}px 0 -${borderWidth}px -${borderWidth}px`,
                                } }
                            >
                                <a href={`#${item.header.toLowerCase().replace(/\s/g, '')}-${index}`}
                                   style={ { color: headerTextColor } }
                                >
                                    <RichText.Content tagName="span" value={ item.header }/>
                                </a>
                            </li>
                        ) ) }
                    </ul>
                    {tabItems.map( ( item, index ) => (
                        <div key={ index }
                             id={`${item.header.toLowerCase().replace(/\s/g, '')}-${index}`}
                             className="advgb-tab-body"
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
                    ) ) }
                    {!!blockID &&
                        <style>
                            {activeTabBgColor && `#advgb-tabs-${blockID} li.advgb-tab.ui-tabs-active {
                                background-color: ${activeTabBgColor} !important;
                            }
                            `}
                            {activeTabTextColor && `#advgb-tabs-${blockID} li.advgb-tab.ui-tabs-active a {
                                color: ${activeTabTextColor} !important;
                            }`}
                        </style>
                    }
                </div>
            );
        },
    } );
})( wp.i18n, wp.blocks, wp.element, wp.editor, wp.components );