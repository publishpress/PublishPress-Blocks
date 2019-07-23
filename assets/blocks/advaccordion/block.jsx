(function ( wpI18n, wpBlocks, wpElement, wpBlockEditor, wpComponents ) {
    wpBlockEditor = wp.blockEditor || wp.editor;
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InspectorControls, RichText, PanelColorSettings, InnerBlocks } = wpBlockEditor;
    const { RangeControl, PanelBody, BaseControl , SelectControl, ToggleControl } = wpComponents;

    class AccordionsEdit extends Component {
        constructor() {
            super( ...arguments );
        }

        render() {
            return (
                <Fragment>
                    <div className="advgb-accordions-wrapper">
                        <InnerBlocks
                            template={ [ ['advgb/accordion-item'], ['advgb/accordion-item'] ] }
                            templateLock={ false }
                            allowedBlocks={ [ 'advgb/accordion-item' ] }
                        />
                    </div>
                </Fragment>
            )
        }
    }

    const accordionBlockIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="2 2 22 22">
            <path fill="none" d="M0,0h24v24H0V0z"/>
            <rect x="3" y="17" width="18" height="2"/>
            <path d="M19,12v1H5v-1H19 M21,10H3v5h18V10L21,10z"/>
            <rect x="3" y="6" width="18" height="2"/>
        </svg>
    );

    const blockAttrs = {
        headerBgColor: {
            type: 'string',
            default: '#000',
        },
        headerTextColor: {
            type: 'string',
            default: '#eee',
        },
        headerIcon: {
            type: 'string',
            default: 'unfold',
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
            default: 0,
        },
        borderColor: {
            type: 'string',
        },
        borderRadius: {
            type: 'number',
            default: 2,
        },
        marginBottom: {
            type: 'number',
            default: 15,
        },
        collapsedAll: {
            type: 'boolean',
            default: false,
        },
        changed: {
            type: 'boolean',
            default: false,
        },
    };

    registerBlockType( 'advgb/accordions', {
        title: __( 'Advanced Accordion' ),
        description: __( 'Easy to create an accordion for your post/page.' ),
        icon: {
            src: accordionBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined,
        },
        category: 'advgb-category',
        keywords: [ __( 'accordion' ), __( 'list' ), __( 'faq' ) ],
        attributes: blockAttrs,
        edit: AccordionsEdit,
        save: function ( { attributes } ) {
            return null;
        }
    } )
})( wp.i18n, wp.blocks, wp.element, wp.blockEditor, wp.components );