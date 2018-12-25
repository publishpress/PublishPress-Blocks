(function ( wpI18n, wpBlocks, wpElement, wpEditor, wpComponents ) {
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InspectorControls, PanelColorSettings } = wpEditor;
    const { PanelBody, RangeControl, SelectControl, TextControl, Tooltip } = wpComponents;

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
            const { attributes, setAttributes } = this.props;
            const {
                bgColor,
                textColor,
                borderColor,
                borderStyle,
                borderRadius,
            } = attributes;

            return (
                <Fragment>
                    <InspectorControls>
                        <PanelBody title={ __( 'Form Settings' ) }>
                            <PanelColorSettings
                                title={ __( 'Input Color' ) }
                                colorSettings={ [
                                    {
                                        label: __( 'Background color' ),
                                        value: bgColor,
                                        onChange: (value) => setAttributes( { bgColor: value } ),
                                    },
                                    {
                                        label: __( 'Text color' ),
                                        value: textColor,
                                        onChange: (value) => setAttributes( { textColor: value } ),
                                    },
                                ] }
                            />
                            <PanelBody title={ __( 'Border Settings' ) } initialOpen={ false }>
                                <PanelColorSettings
                                    title={ __( 'Border Color' ) }
                                    initialOpen={ false }
                                    colorSettings={ [
                                        {
                                            label: __( 'Border color' ),
                                            value: borderColor,
                                            onChange: (value) => setAttributes( { borderColor: value } ),
                                        },
                                    ] }
                                />
                                <SelectControl
                                    label={ __( 'Border Style' ) }
                                    value={ borderStyle }
                                    options={ [
                                        { label: __( 'Solid' ), value: 'solid' },
                                        { label: __( 'Dashed' ), value: 'dashed' },
                                        { label: __( 'Dotted' ), value: 'dotted' },
                                    ] }
                                    onChange={ (value) => setAttributes( { borderStyle: value } ) }
                                />
                                <RangeControl
                                    label={ __( 'Border radius (px)' ) }
                                    value={ borderRadius }
                                    onChange={ (value) => setAttributes( { borderRadius: value } ) }
                                    min={ 0 }
                                    max={ 50 }
                                />
                            </PanelBody>
                        </PanelBody>
                    </InspectorControls>
                    <div className="advgb-contact-form">
                        <div className="advgb-form-field advgb-form-field-half">
                            <input type="text" disabled={ true }
                                   className="advgb-form-input"
                                   value={ __( 'Name' ) }
                                   style={ {
                                       backgroundColor: bgColor,
                                       color: textColor,
                                       borderColor: borderColor,
                                       borderStyle: borderStyle,
                                       borderRadius: borderRadius ? borderRadius + 'px' : undefined,
                                   } }
                            />
                        </div>
                        <div className="advgb-form-field advgb-form-field-half">
                            <input type="text" disabled={ true }
                                   className="advgb-form-input"
                                   value={ __( 'Email address' ) }
                                   style={ {
                                       backgroundColor: bgColor,
                                       color: textColor,
                                       borderColor: borderColor,
                                       borderStyle: borderStyle,
                                       borderRadius: borderRadius ? borderRadius + 'px' : undefined,
                                   } }
                            />
                        </div>
                        <div className="advgb-form-field advgb-form-field-full">
                            <textarea className="advgb-form-input"
                                      disabled={ true }
                                      value={ __( 'Message' ) }
                                      style={ {
                                          backgroundColor: bgColor,
                                          color: textColor,
                                          borderColor: borderColor,
                                          borderStyle: borderStyle,
                                          borderRadius: borderRadius ? borderRadius + 'px' : undefined,
                                      } }
                            />
                        </div>
                        <div className="advgb-form-submit-wrapper">
                            <button className="advgb-form-submit">Submit</button>
                        </div>
                    </div>
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
            borderRadius: {
                type: 'number',
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