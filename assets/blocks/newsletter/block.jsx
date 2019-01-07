(function ( wpI18n, wpBlocks, wpElement, wpEditor, wpComponents ) {
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InspectorControls, PanelColorSettings } = wpEditor;
    const { PanelBody, RangeControl, SelectControl } = wpComponents;

    const newsletterBlockIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="none" d="M0 0h24v24H0V0z"/>
            <path fill-opacity=".9" d="M12 1.95c-5.52 0-10 4.48-10 10s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57v-1.43c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57v-1.43c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
        </svg>
    );

    class AdvNewsletter extends Component {
        constructor() {
            super( ...arguments );
        }

        render() {
            const { attributes, setAttributes } = this.props;
            const {
                formStyle,
                formWidth,
                bgColor,
                textColor,
                borderColor,
                borderStyle,
                borderRadius,
                submitColor,
                submitBgColor,
                submitRadius,
            } = attributes;

            return (
                <Fragment>
                    <InspectorControls>
                        <PanelBody title={ __( 'Form Settings' ) }>
                            <SelectControl
                                label={ __( 'Form style' ) }
                                value={ formStyle }
                                options={ [
                                    { label: __( 'Default' ), value: 'default' },
                                    { label: __( 'Alternative' ), value: 'alt' },
                                ] }
                                onChange={ (value) => setAttributes( { formStyle: value } ) }
                            />
                            <RangeControl
                                label={ __( 'Form width (px)' ) }
                                value={ formWidth }
                                onChange={ (value) => setAttributes( { formWidth: value } ) }
                                min={ 200 }
                                max={ 1000 }
                            />
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
                            </PanelBody>
                        </PanelBody>
                    </InspectorControls>
                    <div className="advgb-newsletter-wrapper">
                        <div className={ `advgb-newsletter clearfix style-${formStyle}` } style={ { maxWidth: formWidth } }>
                        {formStyle === 'default' && (
                            <div className="advgb-form-field">
                                <input type="text" disabled={ true }
                                       className="advgb-form-input"
                                       value={ __( 'Email address' ) }
                                       style={ {
                                           backgroundColor: bgColor,
                                           color: textColor,
                                           borderColor: borderColor,
                                           borderStyle: borderStyle,
                                           borderRadius: borderRadius,
                                       } }
                                />
                                <div className="advgb-form-submit-wrapper">
                                    <button className="advgb-form-submit"
                                            type="button"
                                            style={ {
                                                borderColor: submitColor,
                                                color: submitColor,
                                                backgroundColor: submitBgColor,
                                                borderRadius: submitRadius,
                                            } }
                                    >
                                        { __( 'Submit' ) }
                                    </button>
                                </div>
                            </div>
                        ) }

                        {formStyle === 'alt' && (
                            <Fragment>
                                <div className="advgb-form-field advgb-form-field-full">
                                    <input type="text" disabled={ true }
                                           className="advgb-form-input"
                                           value={ __( 'First Name' ) }
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
                                    <input type="text" disabled={ true }
                                           className="advgb-form-input"
                                           value={ __( 'Last Name' ) }
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
                                    <input type="text" disabled={ true }
                                           className="advgb-form-input"
                                           value={ __( 'Email address' ) }
                                           style={ {
                                               backgroundColor: bgColor,
                                               color: textColor,
                                               borderColor: borderColor,
                                               borderStyle: borderStyle,
                                               borderRadius: borderRadius,
                                           } }
                                    />
                                </div>
                                <div className="advgb-form-submit-wrapper">
                                    <button className="advgb-form-submit"
                                            type="button"
                                            style={ {
                                                borderColor: submitColor,
                                                color: submitColor,
                                                backgroundColor: submitBgColor,
                                                borderRadius: submitRadius,
                                            } }
                                    >
                                        { __( 'Submit' ) }
                                    </button>
                                </div>
                            </Fragment>
                        ) }
                        </div>
                    </div>
                </Fragment>
            )
        }
    }

    registerBlockType( 'advgb/newsletter', {
        title: __( 'Newsletter' ),
        description: __( 'Fastest way to create a newsletter form for your page.' ),
        icon: {
            src: newsletterBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined,
        },
        category: 'widgets',
        keywords: [ __( 'newsletter' ), __( 'form' ), __( 'email' ) ],
        attributes: {
            formStyle: {
                type: 'string',
                default: 'default',
            },
            formWidth: {
                type: 'number',
                default: 400,
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
            changed: {
                type: 'boolean',
                default: false,
            }
        },
        edit: AdvNewsletter,
        save: function ( { attributes } ) {
            const {
                formStyle,
                formWidth,
                bgColor,
                textColor,
                borderColor,
                borderStyle,
                borderRadius,
                submitColor,
                submitBgColor,
                submitRadius,
            } = attributes;

            return (
                <div className={`advgb-newsletter clearfix style-${formStyle}`} style={ { maxWidth: formWidth } }>
                    <form method="POST">
                        {formStyle === 'default' && (
                            <div className="advgb-form-field">
                                <input type="email"
                                       className="advgb-form-input advgb-form-input-email"
                                       placeholder={ __( 'Email address' ) }
                                       style={ {
                                           backgroundColor: bgColor,
                                           color: textColor,
                                           borderColor: borderColor,
                                           borderStyle: borderStyle,
                                           borderRadius: borderRadius,
                                       } }
                                />
                                <div className="advgb-form-submit-wrapper">
                                    <button className="advgb-form-submit"
                                            type="submit"
                                            style={ {
                                                borderColor: submitColor,
                                                color: submitColor,
                                                backgroundColor: submitBgColor,
                                                borderRadius: submitRadius,
                                            } }
                                    >
                                        { __( 'Submit' ) }
                                    </button>
                                </div>
                            </div>
                        ) }

                        {formStyle === 'alt' && (
                            <Fragment>
                                <div className="advgb-form-field advgb-form-field-full">
                                    <input type="text"
                                           className="advgb-form-input advgb-form-input-fname"
                                           placeholder={ __( 'First Name' ) }
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
                                    <input type="text"
                                           className="advgb-form-input advgb-form-input-lname"
                                           placeholder={ __( 'Last Name' ) }
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
                                    <input type="email"
                                           className="advgb-form-input advgb-form-input-email"
                                           placeholder={ __( 'Email address' ) }
                                           style={ {
                                               backgroundColor: bgColor,
                                               color: textColor,
                                               borderColor: borderColor,
                                               borderStyle: borderStyle,
                                               borderRadius: borderRadius,
                                           } }
                                    />
                                </div>
                                <div className="advgb-form-submit-wrapper">
                                    <button className="advgb-form-submit"
                                            type="submit"
                                            style={ {
                                                borderColor: submitColor,
                                                color: submitColor,
                                                backgroundColor: submitBgColor,
                                                borderRadius: submitRadius,
                                            } }
                                    >
                                        { __( 'Submit' ) }
                                    </button>
                                </div>
                            </Fragment>
                        ) }
                    </form>
                </div>
            );
        }
    } );
})( wp.i18n, wp.blocks, wp.element, wp.editor, wp.components );