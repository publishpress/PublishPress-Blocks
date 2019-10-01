( function(wpI18n, wpBlocks, wpElement, wpBlockEditor, wpComponents) {
    wpBlockEditor = wp.blockEditor || wp.editor;
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InnerBlocks } = wpBlockEditor;
    const { select } = wp.data;

    const tabsBlockIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="none" d="M0,0h24v24H0V0z"/>
            <path fill="none" d="M0,0h24v24H0V0z"/>
            <path d="M21,3H3C1.9,3,1,3.9,1,5v14c0,1.1,0.9,2,2,2h18c1.1,0,2-0.9,2-2V5C23,3.9,22.1,3,21,3z M21,19H3V5h10v4h8V19z"/>
        </svg>
    );

    class TabItemEdit extends Component {
        constructor() {
            super( ...arguments );
        }

        componentWillMount() {
            const { attributes, setAttributes, clientId } = this.props;

            const { getBlockRootClientId, getBlockAttributes } = !wp.blockEditor ? select( 'core/editor' ) : select( 'core/block-editor' );
            const rootBlockId = getBlockRootClientId( clientId );
            const rootBlockAttrs = getBlockAttributes( rootBlockId );

            // Apply parent style if newly inserted
            if (attributes.changed !== true) {
                if (rootBlockAttrs !== null && rootBlockAttrs.needUpdate !== false) {
                    Object.keys(rootBlockAttrs).map((attribute) => {
                        attributes[attribute] = rootBlockAttrs[attribute];
                    });

                    // Done applied, we will not do this again
                    setAttributes( { changed: true } );
                }
            }
        }

        render() {
            const { attributes, clientId } = this.props;
            const {bodyBgColor, bodyTextColor} = attributes;

            const { getBlockRootClientId } = !wp.blockEditor ? select( 'core/editor' ) : select( 'core/block-editor' );
            const rootBlockId = getBlockRootClientId( clientId );
            const { getBlockOrder } = !wp.blockEditor ? select( 'core/editor' ) : select( 'core/block-editor' );
            const childBlocks = getBlockOrder(rootBlockId);

            return (
                <Fragment>
                    <div className="advgb-tab-body"
                         style={ {
                             backgroundColor: bodyBgColor,
                             color: bodyTextColor,
                         } }
                    >
                        <InnerBlocks
                            template={ [[ 'core/paragraph' ]] }
                            templateLock={false}
                        />
                    </div>
                </Fragment>
            );
        }
    }

    registerBlockType( 'advgb/tab-item', {
        title: __( 'Tab Item' ),
        parent: [ 'advgb/tabs' ],
        icon: {
            src: tabsBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined,
        },
        category: 'advgb-category',
        attributes: {
            bodyBgColor: {
                type: 'string',
            },
            bodyTextColor: {
                type: 'string',
            },
            active: {
                type: 'boolean',
                default: false,
            },
            changed: {
                type: 'boolean',
                default: false,
            }
        },
        keywords: [ __( 'tab' ) ],
        edit: TabItemEdit,
        save: function( { attributes } ) {

            const {bodyBgColor, bodyTextColor, blockID} = attributes;

            return (
                <div className="advgb-tab-body"
                     style={ {
                         backgroundColor: bodyBgColor,
                         color: bodyTextColor,
                     } }
                >
                    <InnerBlocks.Content />
                </div>
            );
        }

    });

} ) ( wp.i18n, wp.blocks, wp.element, wp.blockEditor, wp.components );