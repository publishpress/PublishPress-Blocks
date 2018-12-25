(function ( wpI18n, wpBlocks, wpElement, wpEditor, wpComponents ) {
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InspectorControls, BlockControls, MediaUpload, AlignmentToolbar, PanelColorSettings } = wpEditor;
    const { RangeControl, BaseControl, PanelBody, TextControl, IconButton, Button, Toolbar, Tooltip } = wpComponents;

    const contactBlockIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="none" d="M0 0h24v24H0V0z"/>
            <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 4.99L4 6h16zm0 12H4V8l8 5 8-5v10z"/>
        </svg>
    );

    class AdvContactForm extends Component {
        constructor() {
            super( ...arguments );
        }

        render() {
            return (
                <Fragment>
                    <div>123</div>
                </Fragment>
            )
        }
    }

    registerBlockType( 'advgb/contact-form', {
        title: __( 'Contact Form' ),
        description: __( 'Fastest way to create a contact form for your page.' ),
        icon: {
            src: contactBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined,
        },
        category: 'widgets',
        keywords: [ __( 'contact' ), __( 'form' ) ],
        attributes: {
            bgColor: {
                type: 'string',
            },
            textColor: {
                type: 'string',
            },
            borderStyle: {
                type: 'string',
            },
            borderColor: {
                type: 'string',
            },
            changed: {
                type: 'boolean',
                default: false,
            }
        },
        edit: AdvContactForm,
        save: function ( { attributes } ) {
            return null;
        }
    } );
})( wp.i18n, wp.blocks, wp.element, wp.editor, wp.components );