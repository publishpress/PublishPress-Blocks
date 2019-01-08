(function ( wpI18n, wpBlocks, wpElement, wpEditor, wpComponents ) {
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InspectorControls, PanelColorSettings } = wpEditor;
    const { PanelBody, RangeControl, SelectControl, TextControl } = wpComponents;

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
                nameLabel,
                emailLabel,
                msgLabel,
                submitLabel,
                successLabel,
                bgColor,
                textColor,
                borderColor,
                borderStyle,
                borderRadius,
                submitColor,
                submitBgColor,
                submitRadius,
                submitPosition,
            } = attributes;

            return (
                <Fragment>
                    <InspectorControls>
                        <PanelBody title={ __( 'Form Settings' ) }>
                            <PanelBody title={ __( 'Email sender' ) } initialOpen={ false }>
                                <p style={ { fontStyle: 'italic' } }>
                                    { __('An email will be sent to the admin email (by default) whenever a contact form is submitted. You can change it in ') }
                                    <a href={advgbSettings.config_url + '#settings'} target="_blank"> { __( 'settings' ) }.</a>
                                </p>
                            </PanelBody>
                            <PanelBody title={ __( 'Text Label' ) }>
                                <TextControl
                                    label={ __( 'Name input placeholder' ) }
                                    value={ nameLabel }
                                    onChange={ (value) => setAttributes( { nameLabel: value } ) }
                                />
                                <TextControl
                                    label={ __( 'Email input placeholder' ) }
                                    value={ emailLabel }
                                    onChange={ (value) => setAttributes( { emailLabel: value } ) }
                                />
                                <TextControl
                                    label={ __( 'Message input placeholder' ) }
                                    value={ msgLabel }
                                    onChange={ (value) => setAttributes( { msgLabel: value } ) }
                                />
                                <TextControl
                                    label={ __( 'Submit text' ) }
                                    value={ submitLabel }
                                    onChange={ (value) => setAttributes( { submitLabel: value } ) }
                                />
                                <TextControl
                                    label={ __( 'Submit success text' ) }
                                    value={ successLabel }
                                    onChange={ (value) => setAttributes( { successLabel: value } ) }
                                />
                            </PanelBody>
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
                            <PanelBody title={ __( 'Submit Button Settings' ) }>
                                <PanelColorSettings
                                    title={ __( 'Color Settings' ) }
                                    initialOpen={ false }
                                    colorSettings={ [
                                        {
                                            label: __( 'Border and Text' ),
                                            value: submitColor,
                                            onChange: (value) => setAttributes( { submitColor: value } ),
                                        },
                                        {
                                            label: __( 'Background' ),
                                            value: submitBgColor,
                                            onChange: (value) => setAttributes( { submitBgColor: value } ),
                                        },
                                    ] }
                                />
                                <RangeControl
                                    label={ __( 'Button border radius' ) }
                                    value={ submitRadius }
                                    onChange={ (value) => setAttributes( { submitRadius: value } ) }
                                    min={ 0 }
                                    max={ 50 }
                                />
                                <SelectControl
                                    label={ __( 'Button position' ) }
                                    value={ submitPosition }
                                    options={ [
                                        { label: __( 'Center' ), value: 'center' },
                                        { label: __( 'Left' ), value: 'left' },
                                        { label: __( 'Right' ), value: 'right' },
                                    ] }
                                    onChange={ (value) => setAttributes( { submitPosition: value } ) }
                                />
                            </PanelBody>
                        </PanelBody>
                    </InspectorControls>
                    <div className="advgb-contact-form">
                        <div className="advgb-form-field advgb-form-field-half">
                            <input type="text" disabled={ true }
                                   className="advgb-form-input"
                                   value={ nameLabel ? nameLabel : __( 'Name' ) }
                                   style={ {
                                       backgroundColor: bgColor,
                                       color: textColor,
                                       borderColor: borderColor,
                                       borderStyle: borderStyle,
                                       borderRadius: borderRadius,
                                   } }
                            />
                        </div>
                        <div className="advgb-form-field advgb-form-field-half">
                            <input type="text" disabled={ true }
                                   className="advgb-form-input"
                                   value={ emailLabel ? emailLabel : __( 'Email address' ) }
                                   style={ {
                                       backgroundColor: bgColor,
                                       color: textColor,
                                       borderColor: borderColor,
                                       borderStyle: borderStyle,
                                       borderRadius: borderRadius,
                                   } }
                            />
                        </div>
                        <div className="advgb-form-field advgb-form-field-full">
                            <textarea className="advgb-form-input"
                                      disabled={ true }
                                      value={ msgLabel ? msgLabel : __( 'Message' ) }
                                      style={ {
                                          backgroundColor: bgColor,
                                          color: textColor,
                                          borderColor: borderColor,
                                          borderStyle: borderStyle,
                                          borderRadius: borderRadius,
                                      } }
                            />
                        </div>
                        <div className="advgb-form-submit-wrapper"
                             style={ { textAlign: submitPosition } }
                        >
                            <button className="advgb-form-submit"
                                    style={ {
                                        borderColor: submitColor,
                                        color: submitColor,
                                        backgroundColor: submitBgColor,
                                        borderRadius: submitRadius,
                                    } }
                            >
                                { submitLabel ? submitLabel : __( 'Submit' ) }
                            </button>
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
            nameLabel: {
                type: 'string',
            },
            emailLabel: {
                type: 'string',
            },
            msgLabel: {
                type: 'string',
            },
            submitLabel: {
                type: 'string',
            },
            successLabel: {
                type: 'string',
            },
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
            submitColor: {
                type: 'string',
            },
            submitBgColor: {
                type: 'string',
            },
            submitRadius: {
                type: 'number',
            },
            submitPosition: {
                type: 'string',
                default: 'right',
            },
            changed: {
                type: 'boolean',
                default: false,
            }
        },
        edit: AdvContactForm,
        save: function ( { attributes } ) {
            const {
                nameLabel,
                emailLabel,
                msgLabel,
                submitLabel,
                successLabel,
                bgColor,
                textColor,
                borderColor,
                borderStyle,
                borderRadius,
                submitColor,
                submitBgColor,
                submitRadius,
                submitPosition,
            } = attributes;

            return (
                <div className="advgb-contact-form">
                    <form method="POST">
                        <div className="advgb-form-field advgb-form-field-half">
                            <input type="text"
                                   className="advgb-form-input advgb-form-input-name"
                                   placeholder={ nameLabel ? nameLabel : __( 'Name' ) }
                                   name="contact_name"
                                   style={ {
                                       backgroundColor: bgColor,
                                       color: textColor,
                                       borderColor: borderColor,
                                       borderStyle: borderStyle,
                                       borderRadius: borderRadius,
                                   } }
                            />
                        </div>
                        <div className="advgb-form-field advgb-form-field-half">
                            <input type="email"
                                   className="advgb-form-input advgb-form-input-email"
                                   placeholder={ emailLabel ? emailLabel : __( 'Email address' ) }
                                   name="contact_email"
                                   style={ {
                                       backgroundColor: bgColor,
                                       color: textColor,
                                       borderColor: borderColor,
                                       borderStyle: borderStyle,
                                       borderRadius: borderRadius,
                                   } }
                            />
                        </div>
                        <div className="advgb-form-field advgb-form-field-full">
                            <textarea className="advgb-form-input advgb-form-input-msg"
                                      placeholder={ msgLabel ? msgLabel : __( 'Message' ) }
                                      name="contact_message"
                                      style={ {
                                          backgroundColor: bgColor,
                                          color: textColor,
                                          borderColor: borderColor,
                                          borderStyle: borderStyle,
                                          borderRadius: borderRadius,
                                      } }
                            />
                        </div>
                        <div className="advgb-form-submit-wrapper"
                             style={ { textAlign: submitPosition } }
                        >
                            <button className="advgb-form-submit"
                                    type="submit"
                                    data-success={ successLabel ? successLabel : undefined }
                                    style={ {
                                        borderColor: submitColor,
                                        color: submitColor,
                                        backgroundColor: submitBgColor,
                                        borderRadius: submitRadius,
                                    } }
                            >
                                { submitLabel ? submitLabel : __( 'Submit' ) }
                            </button>
                        </div>
                    </form>
                </div>
            );
        }
    } );
})( wp.i18n, wp.blocks, wp.element, wp.editor, wp.components );