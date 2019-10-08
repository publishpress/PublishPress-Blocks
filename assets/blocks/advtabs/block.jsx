(function ( wpI18n, wpBlocks, wpElement, wpBlockEditor, wpComponents ) {
    wpBlockEditor = wp.blockEditor || wp.editor;
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType, createBlock } = wpBlocks;
    const { InspectorControls, RichText, PanelColorSettings, InnerBlocks } = wpBlockEditor;
    const { Dashicon, Tooltip, PanelBody, RangeControl, SelectControl, Button } = wpComponents;
    const { dispatch, select } = wp.data;

    let path = "M464.4,488h-440c-14.131,0-24-8.882-24-21.6v-440C0.4,13.938,10.664,0,24.4,0h440 ";
    path += "c13.736,0,24,13.938,24,26.4v440C488.4,479.118,478.531,488,464.4,488z M24.4,16c-3.813,0-8,5.443-8,10.4v440 ";
    path += "c0,5.054,5.595,5.6,8,5.6h440c2.405,0,8-0.546,8-5.6v-440c0-4.957-4.187-10.4-8-10.4C464.4,16,24.4,16,24.4,16z";

    let path2 = "M464.4,488.8h-440c-14.58,0-24-7.223-24-18.399V36h16v434.4c0,1.301,3.664,2.399,8,2.399h440 ";
    path2 += "c4.337,0,8-1.099,8-2.399V121.6c0-0.074-0.003-0.132-0.007-0.178c-0.587-0.447-2.915-1.422-7.993-1.422H207.305L154.75,7.383 ";
    path2 += "l14.499-6.766L217.495,104H464.4c22.27,0,24,13.471,24,17.6v348.8C488.4,481.577,478.979,488.8,464.4,488.8z";

    const tabHorizontalIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488.8 488.8" width="50px" height="50px" style={{backgroundColor: "#fff"}}>
            <polygon fill="#ddd" points="476.4,105.6 214.8,109.6 162,4 476.4,4 "/>
            <path d={path} />
            <path d={path2} />
            <rect x="328.4" y="3" width="16" height="114"/>
        </svg>
    );

    const tabVerticalIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488.8 488.8" width="50px" height="50px" transform="rotate(-90) scale(-1, 1)" style={{backgroundColor: "#fff"}}>
            <polygon fill="#ddd" points="476.4,105.6 214.8,109.6 162,4 476.4,4 "/>
            <path d={path} />
            <path d={path2} />
            <rect x="328.4" y="3" width="16" height="114"/>
        </svg>
    );

    const TABS_STYLES = [
        {name: 'horz', label: __('Horizontal', 'advanced-gutenberg'), icon: tabHorizontalIcon},
        {name: 'vert', label: __('Vertical', 'advanced-gutenberg'), icon: tabVerticalIcon},
    ];

    class AdvTabsWrapper extends Component {
        constructor() {
            super( ...arguments );
        }

        componentWillMount() {
            const { attributes, setAttributes } = this.props;
            const currentBlockConfig = advgbDefaultConfig['advgb-adv-tabs'];

            // No override attributes of blocks inserted before
            if (attributes.changed !== true) {
                if (typeof currentBlockConfig === 'object' && currentBlockConfig !== null) {
                    Object.keys(currentBlockConfig).map((attribute) => {
                        if (typeof attributes[attribute] === 'boolean') {
                            attributes[attribute] = !!currentBlockConfig[attribute];
                        } else {
                            attributes[attribute] = currentBlockConfig[attribute];
                        }
                    });
                }

                // Finally set changed attribute to true, so we don't modify anything again
                setAttributes( { changed: true } );
            }
        }

        componentDidMount() {
            if (!this.props.attributes.pid) {
                this.props.setAttributes( { pid: `advgb-tabs-${this.props.clientId}` } );
            }
        }

        updateTabsAttr( attrs ) {
            const { setAttributes, clientId } = this.props;
            const { updateBlockAttributes } = !wp.blockEditor ? dispatch( 'core/editor' ) : dispatch( 'core/block-editor' );
            const { getBlockOrder } = !wp.blockEditor ? select( 'core/editor' ) : select( 'core/block-editor' );
            const childBlocks = getBlockOrder(clientId);

            setAttributes( attrs );
            childBlocks.forEach( childBlockId => updateBlockAttributes( childBlockId, attrs ) );
        }

        addTab() {
            const { attributes, setAttributes, clientId } = this.props;
            const { insertBlock } = !wp.blockEditor ? dispatch( 'core/editor' ) : dispatch( 'core/block-editor' );
            const tabItemBlock = createBlock('advgb/tab');

            insertBlock(tabItemBlock, attributes.tabHeaders.length, clientId);
            setAttributes( {
                tabHeaders: [
                    ...attributes.tabHeaders,
                    __('Tab header', 'advanced-gutenberg')
                ]
            } )
        }

        removeTab(index) {
            const { attributes, setAttributes, clientId } = this.props;
            const { removeBlock } = !wp.blockEditor ? dispatch( 'core/editor' ) : dispatch( 'core/block-editor' );
            const { getBlockOrder } = !wp.blockEditor ? select( 'core/editor' ) : select( 'core/block-editor' );
            const childBlocks = getBlockOrder(clientId);

            removeBlock(childBlocks[index], false);
            setAttributes( {
                tabHeaders: attributes.tabHeaders.filter( (vl, idx) => idx !== index )
            } );
            this.updateTabsAttr({tabActive: 0})
        }

        render() {
            const { attributes, setAttributes, clientId } = this.props;
            const {
                tabHeaders,
                tabActive,
                tabsStyle,
                headerBgColor,
                headerTextColor,
                bodyBgColor,
                bodyTextColor,
                borderStyle,
                borderWidth,
                borderColor,
                borderRadius,
                pid,
                activeTabBgColor,
                activeTabTextColor,
            } = attributes;

            return (
                <Fragment>
                    <InspectorControls>
                        <PanelBody title={ __( 'Tab Style', 'advanced-gutenberg' ) }>
                            <div className="advgb-tabs-styles">
                                {TABS_STYLES.map((style, index) => (
                                    <Tooltip key={index} text={style.label}>
                                        <Button className="advgb-tabs-style"
                                                isToggled={ style.name === tabsStyle }
                                                onClick={ () => setAttributes( { tabsStyle: style.name } ) }
                                        >
                                            {style.icon}
                                        </Button>
                                    </Tooltip>
                                ))}
                            </div>
                        </PanelBody>
                        <PanelColorSettings
                            title={ __( 'Tab Colors', 'advanced-gutenberg' ) }
                            initialOpen={ false }
                            colorSettings={ [
                                {
                                    label: __( 'Background Color', 'advanced-gutenberg' ),
                                    value: headerBgColor,
                                    onChange: ( value ) => setAttributes( { headerBgColor: value === undefined ? '#000' : value } ),
                                },
                                {
                                    label: __( 'Text Color', 'advanced-gutenberg' ),
                                    value: headerTextColor,
                                    onChange: ( value ) => setAttributes( { headerTextColor: value === undefined ? '#fff' : value } ),
                                },
                                {
                                    label: __( 'Active Tab Background Color', 'advanced-gutenberg' ),
                                    value: activeTabBgColor,
                                    onChange: ( value ) => setAttributes( { activeTabBgColor: value } ),
                                },
                                {
                                    label: __( 'Active Tab Text Color', 'advanced-gutenberg' ),
                                    value: activeTabTextColor,
                                    onChange: ( value ) => setAttributes( { activeTabTextColor: value } ),
                                },
                            ] }
                        />
                        <PanelColorSettings
                            title={ __( 'Body Colors', 'advanced-gutenberg' ) }
                            initialOpen={ false }
                            colorSettings={ [
                                {
                                    label: __( 'Background Color', 'advanced-gutenberg' ),
                                    value: bodyBgColor,
                                    onChange: ( value ) => setAttributes( { bodyBgColor: value } ),
                                },
                                {
                                    label: __( 'Text Color', 'advanced-gutenberg' ),
                                    value: bodyTextColor,
                                    onChange: ( value ) => setAttributes( { bodyTextColor: value } ),
                                },
                            ] }
                        />
                        <PanelBody title={ __( 'Border Settings', 'advanced-gutenberg' ) } initialOpen={ false }>
                            <SelectControl
                                label={ __( 'Border Style', 'advanced-gutenberg' ) }
                                value={ borderStyle }
                                options={ [
                                    { label: __( 'Solid', 'advanced-gutenberg' ), value: 'solid' },
                                    { label: __( 'Dashed', 'advanced-gutenberg' ), value: 'dashed' },
                                    { label: __( 'Dotted', 'advanced-gutenberg' ), value: 'dotted' },
                                ] }
                                onChange={ ( value ) => setAttributes( { borderStyle: value } ) }
                            />
                            <PanelColorSettings
                                title={ __( 'Border Color', 'advanced-gutenberg' ) }
                                initialOpen={ false }
                                colorSettings={ [
                                    {
                                        label: __( 'Border Color', 'advanced-gutenberg' ),
                                        value: borderColor,
                                        onChange: ( value ) => setAttributes( { borderColor: value } ),
                                    },
                                ] }
                            />
                            <RangeControl
                                label={ __( 'Border width', 'advanced-gutenberg' ) }
                                value={ borderWidth }
                                min={ 1 }
                                max={ 10 }
                                onChange={ ( value ) => setAttributes( { borderWidth: value } ) }
                            />
                            <RangeControl
                                label={ __( 'Border radius', 'advanced-gutenberg' ) }
                                value={ borderRadius }
                                min={ 0 }
                                max={ 100 }
                                onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
                            />
                        </PanelBody>
                    </InspectorControls>
                    <div className={`advgb-tabs-wrapper advgb-tab-${tabsStyle}`} style={ { border: 'none' } }>
                        <ul className="advgb-tabs-panel">
                            {tabHeaders.map( ( item, index ) => (
                                <li key={ index }
                                    className={`advgb-tab ${tabActive === index && 'ui-tabs-active'}`}
                                    style={ {
                                        backgroundColor: headerBgColor,
                                        borderStyle: borderStyle,
                                        borderWidth: borderWidth + 'px',
                                        borderColor: borderColor,
                                        borderRadius: borderRadius + 'px',
                                        margin: `-${borderWidth}px 0 -${borderWidth}px -${borderWidth}px`,
                                    } }
                                >
                                    <a style={ { color: headerTextColor } }
                                       onClick={ () => this.updateTabsAttr( {tabActive: index} ) }
                                    >
                                        <RichText
                                            tagName="p"
                                            value={ item }
                                            onChange={ ( value ) => {
                                                let newHeaders = tabHeaders.map( ( item, thisIndex ) => {
                                                    if ( index === thisIndex ) {
                                                        item = value;
                                                    }
                                                    return item;
                                                } );

                                                return setAttributes( { tabHeaders: newHeaders} );
                                            } }
                                            unstableOnSplit={ () => null }
                                            placeholder={ __( 'Title…', 'advanced-gutenberg' ) }
                                        />
                                    </a>
                                    {tabHeaders.length > 1 && (
                                        <Tooltip text={ __( 'Remove tab', 'advanced-gutenberg' ) }>
                                            <span className="advgb-tab-remove"
                                                  onClick={ () => this.removeTab(index) }
                                            >
                                                <Dashicon icon="no"/>
                                            </span>
                                        </Tooltip>
                                    )}
                                </li>
                            ) ) }
                            <li className="advgb-tab advgb-add-tab"
                                style={ {
                                    borderRadius: borderRadius + 'px',
                                    borderWidth: borderWidth + 'px',
                                    margin: `-${borderWidth}px 0 -${borderWidth}px -${borderWidth}px`,
                                } }
                            >
                                <Tooltip text={ __( 'Add tab', 'advanced-gutenberg' ) }>
                                    <span onClick={ () => this.addTab() }>
                                        <Dashicon icon="plus-alt"/>
                                    </span>
                                </Tooltip>
                            </li>
                        </ul>
                        <div className="advgb-tab-body-wrapper"
                             style={ {
                                 backgroundColor: bodyBgColor,
                                 color: bodyTextColor,
                                 borderStyle: borderStyle,
                                 borderWidth: borderWidth + 'px',
                                 borderColor: borderColor,
                                 borderRadius: borderRadius + 'px',
                             } }
                        >
                            <InnerBlocks
                                template={ [ ['advgb/tab'], ['advgb/tab'], ['advgb/tab']] }
                                templateLock={false}
                                allowedBlocks={ [ 'advgb/tab' ] }
                            />
                        </div>
                    </div>
                    {!!pid &&
                    <style>
                        {activeTabBgColor && `#block-${clientId} li.advgb-tab.ui-tabs-active {
                                background-color: ${activeTabBgColor} !important;
                            }`}
                        {activeTabTextColor && `#block-${clientId} li.advgb-tab.ui-tabs-active a {
                                color: ${activeTabTextColor} !important;
                            }`}
                    </style>
                    }
                </Fragment>
            )
        }
    }

    const tabsBlockIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488.8 488.8" width="20px" height="20px">
            <polygon fill="#ddd" points="476.4,105.6 214.8,109.6 162,4 476.4,4 "/>
            <path d={path} />
            <path d={path2} />
            <rect x="328.4" y="3" width="16" height="114"/>
        </svg>
    );

    const tabBlockAttrs = {
        tabHeaders: {
            type: 'array',
            default: [
                __( 'Tab 1', 'advanced-gutenberg' ),
                __( 'Tab 2', 'advanced-gutenberg' ),
                __( 'Tab 3', 'advanced-gutenberg' ),
            ]
        },
        tabActive: {
            type: 'number',
            default: 0,
        },
        tabsStyle: {
            type: 'string',
            default: 'horz'
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
        pid: {
            type: 'string',
        },
        activeTabBgColor: {
            type: 'string',
        },
        activeTabTextColor: {
            type: 'string',
        },
        changed: {
            type: 'boolean',
            default: false,
        },
    };

    registerBlockType( 'advgb/adv-tabs', {
        title: __( 'Advanced Tabs', 'advanced-gutenberg' ),
        description: __( 'Create your own tabs never easy like this.', 'advanced-gutenberg' ),
        icon: {
            src: tabsBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined,
        },
        category: "advgb-category",
        keywords: [ __( 'tabs', 'advanced-gutenberg' ), __( 'cards', 'advanced-gutenberg' ) ],
        attributes: tabBlockAttrs,
        edit: AdvTabsWrapper,
        save: function ( { attributes } ) {
            const {
                tabHeaders,
                tabActive,
                tabsStyle,
                headerBgColor,
                headerTextColor,
                bodyBgColor,
                bodyTextColor,
                borderStyle,
                borderWidth,
                borderColor,
                borderRadius,
                pid,
            } = attributes;

            return (
                <div id={pid} className={`advgb-tabs-wrapper advgb-tab-${tabsStyle}`} data-tab-active={tabActive}>
                    <ul className="advgb-tabs-panel">
                        {tabHeaders.map( ( header, index ) => (
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
                                <a href={`#${pid}-${index}`}
                                   style={ { color: headerTextColor } }
                                >
                                    <span>{header}</span>
                                </a>
                            </li>
                        ) ) }
                    </ul>
                    <div className="advgb-tab-body-wrapper"
                         style={ {
                             backgroundColor: bodyBgColor,
                             color: bodyTextColor,
                             borderStyle: borderStyle,
                             borderWidth: borderWidth + 'px',
                             borderColor: borderColor,
                             borderRadius: borderRadius + 'px',
                         } }
                    >
                        <InnerBlocks.Content />
                    </div>
                </div>
            );
        },
    } );
})( wp.i18n, wp.blocks, wp.element, wp.blockEditor, wp.components );