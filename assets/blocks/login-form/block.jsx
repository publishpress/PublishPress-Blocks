(function ( wpI18n, wpBlocks, wpElement, wpBlockEditor, wpComponents ) {
    wpBlockEditor = wp.blockEditor || wp.editor;
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InspectorControls, BlockControls, RichText, PanelColorSettings, MediaUpload } = wpBlockEditor;
    const { RangeControl, PanelBody, TextControl , SelectControl, ToggleControl, Tooltip, Toolbar, IconButton } = wpComponents;

    class LoginFormEdit extends Component {
        constructor() {
            super( ...arguments );
        }

        render() {
            const { attributes, setAttributes } = this.props;
            const {
                formType,
                showInputFieldIcon,
                showRegisterLink,
                showLostPasswordLink,
                logoImg,
                logoID,
                logoWidth,
                welcomeText,
                loginLabel,
                loginText,
                passwordText,
                usernameLabel,
                userText,
                emailLabel,
                emailText,
                rememberMeText,
                submitLabel,
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
                            <PanelBody title={ __( 'Form State' ) }>
                                <SelectControl
                                    label={ __( 'Initial Form' ) }
                                    help={ __( 'Form that show on load.' ) }
                                    value={ formType }
                                    options={ [
                                        { label: __( 'Login' ), value: 'login' },
                                        { label: __( 'Register' ), value: 'register' },
                                    ] }
                                    onChange={ (value) => setAttributes( { formType: value } ) }
                                />
                                <ToggleControl
                                    label={ __( 'Show input field icon' ) }
                                    checked={ !!showInputFieldIcon }
                                    onChange={ () => setAttributes( { showInputFieldIcon: !showInputFieldIcon } ) }
                                />
                                <ToggleControl
                                    label={ __( 'Show register link' ) }
                                    checked={ !!showRegisterLink }
                                    onChange={ () => setAttributes( { showRegisterLink: !showRegisterLink } ) }
                                />
                                <ToggleControl
                                    label={ __( 'Show lost password link' ) }
                                    checked={ !!showLostPasswordLink }
                                    onChange={ () => setAttributes( { showLostPasswordLink: !showLostPasswordLink } ) }
                                />
                            </PanelBody>
                            <PanelBody title={ __( 'Text Label' ) } initialOpen={ false }>
                                <TextControl
                                    label={ __( 'Login input placeholder' ) }
                                    value={ loginLabel }
                                    onChange={ (value) => setAttributes( { loginLabel: value } ) }
                                />
                                <TextControl
                                    label={ __( 'Username input placeholder' ) }
                                    value={ usernameLabel }
                                    onChange={ (value) => setAttributes( { usernameLabel: value } ) }
                                />
                                <TextControl
                                    label={ __( 'Email input placeholder' ) }
                                    value={ emailLabel }
                                    onChange={ (value) => setAttributes( { emailLabel: value } ) }
                                />
                                <TextControl
                                    label={ __( 'Submit text' ) }
                                    value={ submitLabel }
                                    onChange={ (value) => setAttributes( { submitLabel: value } ) }
                                />
                            </PanelBody>
                            <PanelColorSettings
                                title={ __( 'Input Color' ) }
                                initialOpen={ false }
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
                    <div className="advgb-lores-form">
                        <div className="advgb-login-form-wrapper">
                            <div className="advgb-register-link-wrapper">
                                <span className="advgb-register-text">
                                    { __( "Don't have an account?" ) }
                                </span>
                                <a href="" className="advgb-register-link">
                                    { __( 'Register now' ) }
                                </a>
                            </div>
                            <div className="advgb-login-form">
                                <div className="advgb-login-form-header">
                                    <MediaUpload
                                        allowedTypes={ ["image"] }
                                        onSelect={ (media) => setAttributes( {
                                            logoImg: media.sizes.thumbnail ? media.sizes.thumbnail.url : media.sizes.full.url,
                                            logoID: media.id
                                        } ) }
                                        value={ logoID }
                                        render={ ( { open } ) => (
                                            <div className="advgb-login-form-logo-wrapper">
                                                <Tooltip text={ __( 'Click to change avatar' ) }>
                                                    <span style={ {
                                                        display: 'inline-block',
                                                        cursor: 'pointer',
                                                    } }>
                                                        <img className="advgb-login-form-logo"
                                                             onClick={ open }
                                                             src={ logoImg }
                                                             alt={ __( 'Site logo' ) }
                                                             style={ {
                                                                 width: logoWidth ? logoWidth + 'px' : undefined,
                                                                 height: logoWidth ? logoWidth + 'px' : undefined,
                                                             } }
                                                        />
                                                    </span>
                                                </Tooltip>
                                            </div>
                                        ) }
                                    />
                                    <RichText
                                        tagName="h3"
                                        value={ welcomeText }
                                        className="advgb-login-form-welcome"
                                        onChange={ (value) => setAttributes( { welcomeText: value.trim() } ) }
                                        style={ { color: textColor } }
                                        unstableOnSplit={ () => null }
                                        placeholder={ __( 'Welcome text…' ) }
                                    />
                                </div>
                                <div className="advgb-lores-field">
                                    <div className="advgb-lores-field-label">
                                        <RichText
                                            tagName="label"
                                            value={ loginText }
                                            onChange={ (value) => setAttributes( { loginText: value.trim() } ) }
                                            style={ { color: textColor } }
                                            unstableOnSplit={ () => null }
                                            placeholder={ __( 'Username label…' ) }
                                        />
                                    </div>
                                    <div className="advgb-lores-field-input advgb-login-user">
                                        {!!showInputFieldIcon && (
                                            <span className="advgb-lores-input-icon"
                                                  style={ { color: textColor } }
                                            >
                                                <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                                                    <path fill="none" d="M0 0h24v24H0z"/>
                                                </svg>
                                            </span>
                                        ) }
                                        <input type="text" disabled={ true }
                                               className="advgb-lores-input"
                                               value={ loginLabel }
                                               style={ {
                                                   backgroundColor: bgColor,
                                                   color: textColor,
                                                   borderColor: borderColor,
                                                   borderStyle: borderStyle,
                                                   borderRadius: borderRadius,
                                               } }
                                        />
                                    </div>
                                </div>
                                <div className="advgb-lores-field">
                                    <div className="advgb-lores-field-label">
                                        <RichText
                                            tagName="label"
                                            value={ passwordText }
                                            onChange={ (value) => setAttributes( { passwordText: value.trim() } ) }
                                            style={ { color: textColor } }
                                            unstableOnSplit={ () => null }
                                            placeholder={ __( 'Password label…' ) }
                                        />
                                    </div>
                                    <div className="advgb-lores-field-input advgb-login-password">
                                        {!!showInputFieldIcon && (
                                            <span className="advgb-lores-input-icon"
                                                  style={ { color: textColor } }
                                            >
                                                <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <g fill="none">
                                                        <path d="M0 0h24v24H0V0z"/>
                                                        <path opacity=".87" d="M0 0h24v24H0V0z"/>
                                                    </g>
                                                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
                                                </svg>
                                            </span>
                                        ) }
                                        <input type="password" disabled={ true }
                                               className="advgb-lores-input"
                                               value="password"
                                               style={ {
                                                   backgroundColor: bgColor,
                                                   color: textColor,
                                                   borderColor: borderColor,
                                                   borderStyle: borderStyle,
                                                   borderRadius: borderRadius,
                                               } }
                                        />
                                    </div>
                                </div>
                                <div className="advgb-lores-field advgb-lores-submit-wrapper">
                                    <label htmlFor="rememberme">
                                        <input type="checkbox"
                                               disabled={ true }
                                               checked={ true }
                                               className="advgb-lores-checkbox"
                                        />
                                        <span>
                                            <RichText
                                                tagName="span"
                                                value={ rememberMeText }
                                                onChange={ (value) => setAttributes( { passwordText: value.trim() } ) }
                                                style={ { color: textColor } }
                                                unstableOnSplit={ () => null }
                                                placeholder={ __( 'Remember me…' ) }
                                            />
                                        </span>
                                    </label>
                                    <div className="advgb-lores-submit">
                                        <button className="advgb-lores-submit-button"
                                                type="button"
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
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        }
    }

    const loginFormBlockIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path d="M8 9v-4l8 7-8 7v-4h-8v-6h8zm2-7v2h12v16h-12v2h14v-20h-14z"/>
        </svg>
    );

    const blockAttrs = {
        formType: {
            type: 'string',
        },
        showInputFieldIcon: {
            type: 'boolean',
            default: true,
        },
        showRegisterLink: {
            type: 'boolean',
            default: true,
        },
        showLostPasswordLink: {
            type: 'boolean',
            default: true,
        },
        logoImg: {
            type: 'string',
            default: advgbBlocks.home_logo,
        },
        logoID: {
            type: 'number',
        },
        logoWidth: {
            type: 'number',
        },
        welcomeText: {
            type: 'string',
            default: __( 'Welcome' ),
        },
        loginLabel: {
            type: 'string',
        },
        loginText: {
            type: 'string',
            default: __( 'Username or Email Address' ),
        },
        passwordText: {
            type: 'string',
            default: __( 'Password' )
        },
        usernameLabel: {
            type: 'string',
        },
        userText: {
            type: 'string',
            default: __( 'Username' ),
        },
        emailLabel: {
            type: 'string',
        },
        emailText: {
            type: 'string',
            default: __( 'user@email.com' ),
        },
        rememberMeText: {
            type: 'string',
            default: __( 'Remember me' ),
        },
        submitLabel: {
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
        changed: {
            type: 'boolean',
            default: false,
        },
    };

    registerBlockType( 'advgb/login-form', {
        title: __( 'Login/Register Form' ),
        description: __( 'Create a login form for your post/page.' ),
        icon: {
            src: loginFormBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined,
        },
        category: 'advgb-category',
        keywords: [ __( 'accordion' ), __( 'list' ), __( 'faq' ) ],
        attributes: blockAttrs,
        edit: LoginFormEdit,
        save: function ( { attributes } ) {
            return null;
        }
    } );
})( wp.i18n, wp.blocks, wp.element, wp.blockEditor, wp.components );