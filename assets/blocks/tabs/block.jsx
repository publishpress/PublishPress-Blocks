(function ( wpI18n, wpBlocks, wpElement, wpEditor, wpComponents ) {
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InspectorControls, RichText, ColorPalette } = wpEditor;
    const { RangeControl, PanelBody, PanelColor, BaseControl , SelectControl, Dashicon } = wpComponents;

    class AdvTabsBlock extends Component {
        constructor() {
            super( ...arguments );

        }

        componentDidMount() {
            this.initTabs();
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
            const { attributes, setAttributes } = this.props;
            const { tabItems } = attributes;

            return (
                <Fragment>
                    <div className="advgb-tabs-block">
                        <ul className="advgb-tabs-panel">
                            {tabItems.map( ( item, index ) => (
                                <li key={ index } className="advgb-tab">
                                    <a href={`#${item.header.toLowerCase().replace(/ /g, '')}-${index}`}>
                                        <RichText
                                            tagName="p"
                                            value={ item.header }
                                            onChange={ ( value ) => this.updateTabs( { header: value[0] || '' }, index ) }
                                            onSplit={ () => null }
                                            placeholder={ __( 'Title…' ) }
                                        />
                                    </a>
                                </li>
                            ) ) }
                        </ul>
                        {tabItems.map( ( item, index ) => (
                            <div key={ index }
                                 id={`${item.header.toLowerCase().replace(/ /g, '')}-${index}`}
                                 className="advgb-tab-body"
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
                        body: __( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit 1.' )
                    },
                    {
                        header: __( 'Tab 2' ),
                        body: __( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit 2.' )
                    },
                    {
                        header: __( 'Tab 3' ),
                        body: __( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit 3.' )
                    },
                ]
            }
        },
        edit: AdvTabsBlock,
        save: function ( { attributes } ) {
            return null;
        },
    } );
})( wp.i18n, wp.blocks, wp.element, wp.editor, wp.components );