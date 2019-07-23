(function ( wpI18n, wpBlocks, wpElement, wpBlockEditor, wpComponents ) {
    wpBlockEditor = wp.blockEditor || wp.editor;
    const { __ } = wpI18n;
    const { Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { RichText, InnerBlocks } = wpBlockEditor;

    const accordionBlockIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="2 2 22 22">
            <path fill="none" d="M0,0h24v24H0V0z"/>
            <rect x="3" y="17" width="18" height="2"/>
            <path d="M19,12v1H5v-1H19 M21,10H3v5h18V10L21,10z"/>
            <rect x="3" y="6" width="18" height="2"/>
        </svg>
    );

    registerBlockType( 'advgb/accordion-item', {
        title: __( 'Accordion Item' ),
        description: __( 'Easy to create an accordion for your post/page.' ),
        icon: {
            src: accordionBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined,
        },
        parent: [ 'advgb/accordions' ],
        category: 'advgb-category',
        keywords: [ __( 'accordion' ), __( 'list' ), __( 'faq' ) ],
        attributes: {
            header: {
                type: 'string',
                default: __( 'Header text' ),
            },
            changed: {
                type: 'boolean',
                default: false,
            }
        },
        edit: function ( { attributes, setAttributes } ) {
            const { header } = attributes;

            return (
                <Fragment>
                    <div className="advgb-accordion-item">
                        <div className="advgb-accordion-header">
                            <span className="advgb-accordion-header-icon">
                                <svg fill={ null } xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    { null }
                                </svg>
                            </span>
                            <RichText
                                tagName="h4"
                                value={ header }
                                onChange={ ( value ) => setAttributes( { header: value } ) }
                                unstableOnSplit={ () => null }
                                className="advgb-accordion-header-title"
                                placeholder={ __( 'Enter header…' ) }
                            />
                        </div>
                        <div className="advgb-accordion-body">
                            <InnerBlocks />
                        </div>
                    </div>
                </Fragment>
            )
        },
        save: function ( { attributes } ) {
            const { header } = attributes;

            return (
                <div className="advgb-accordion-item">
                    <div className="advgb-accordion-header">
                        <span className="advgb-accordion-header-icon">
                            <svg fill={ null } xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                { null }
                            </svg>
                        </span>
                        <h4 className="advgb-accordion-header-title">{ header }</h4>
                    </div>
                    <div className="advgb-accordion-body">
                        <InnerBlocks.Content />
                    </div>
                </div>
            );
        },
    } )
})( wp.i18n, wp.blocks, wp.element, wp.blockEditor, wp.components );