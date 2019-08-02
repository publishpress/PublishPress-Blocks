(function ( wpI18n, wpBlocks, wpElement, wpBlockEditor, wpComponents ) {
    wpBlockEditor = wp.blockEditor || wp.editor;
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InspectorControls, BlockControls, RichText, PanelColorSettings, MediaUpload } = wpBlockEditor;
    const { RangeControl, PanelBody, TextControl , SelectControl, ToggleControl, Tooltip, Toolbar, IconButton } = wpComponents;

    const userIcon = (
        <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    );
    const emailIcon = (
        <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
            <path fill="none" d="M0 0h24v24H0z"/>
        </svg>
    );
    const passwordIcon = (
        <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g fill="none">
                <path d="M0 0h24v24H0V0z"/>
                <path opacity=".87" d="M0 0h24v24H0V0z"/>
            </g>
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
        </svg>
    );

    class LoginFormEdit extends Component {
        constructor() {
            super( ...arguments );
            this.state = {
                registerView: false,
            }
        }

        componentWillMount() {
            const { attributes, setAttributes } = this.props;
            const currentBlockConfig = advgbDefaultConfig['advgb-login-form'];

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

            // Change view to Register form regard to initial form option
            this.setState( { registerView: attributes.formType === 'register' } );
        }

        render() {
            const { registerView } = this.state;
            const { attributes, setAttributes } = this.props;
            const {
                formType,
                formWidth,
                showLogo,
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
                loginSubmitLabel,
                registerSubmitLabel,
                registerText,
                registerLinkText,
                registerWelcome,
                backToLoginText,
                lostPasswordText,
                bgColor,
                textColor,
                inputColor,
                borderColor,
                borderStyle,
                borderWidth,
                submitColor,
                submitBgColor,
                submitRadius,
                submitPosition,
            } = attributes;

            const logoElm = (
                <MediaUpload
                    allowedTypes={ ["image"] }
                    onSelect={ (media) => setAttributes( {
                        logoImg: media.sizes.medium ? media.sizes.medium.url : media.sizes.full.url,
                        logoID: media.id
                    } ) }
                    value={ logoID }
                    render={ ( { open } ) => (
                        <div className="advgb-lores-form-logo-wrapper">
                            <Tooltip text={ __( 'Click to change logo' ) }>
                                <span style={ {
                                    display: 'block',
                                } }>
                                    <img className="advgb-lores-form-logo"
                                         onClick={ open }
                                         src={ logoImg }
                                         alt={ __( 'Site logo' ) }
                                         style={ {
                                             width: logoWidth ? logoWidth + 'px' : undefined,
                                             cursor: 'pointer',
                                         } }
                                    />
                                </span>
                            </Tooltip>
                        </div>
                    ) }
                />
            );

            const loginForm = (
                <div className="advgb-login-form-wrapper advgb-lores-form">
                    {!!showRegisterLink && (
                        <div className="advgb-register-link-wrapper advgb-header-navigation">
                            <RichText
                                tagName="span"
                                value={ registerText }
                                className="advgb-register-text"
                                onChange={ (value) => setAttributes( { registerText: value.trim() } ) }
                                style={ { color: textColor } }
                                onReplace={ () => null }
                                onSplit={ () => null }
                                placeholder={ __( 'Text…' ) }
                                keepPlaceholderOnFocus
                            />
                            <RichText
                                tagName="a"
                                value={ registerLinkText }
                                className="advgb-register-link"
                                onChange={ (value) => setAttributes( { registerLinkText: value.trim() } ) }
                                style={ { color: submitBgColor } }
                                onReplace={ () => null }
                                onSplit={ () => null }
                                placeholder={ __( 'Register…' ) }
                                keepPlaceholderOnFocus
                            />
                        </div>
                    ) }
                    <div className="advgb-login-form advgb-form-inner">
                        <div className="advgb-lores-form-header">
                            {!!showLogo && logoElm}
                            <RichText
                                tagName="h3"
                                value={ welcomeText }
                                className="advgb-lores-form-welcome"
                                onChange={ (value) => setAttributes( { welcomeText: value.trim() } ) }
                                style={ { color: textColor } }
                                placeholder={ __( 'Welcome text…' ) }
                                keepPlaceholderOnFocus
                            />
                        </div>
                        <div className="advgb-lores-field advgb-login-user">
                            <div className="advgb-lores-field-label">
                                <RichText
                                    tagName="label"
                                    value={ loginText }
                                    onChange={ (value) => setAttributes( { loginText: value.trim() } ) }
                                    style={ { color: textColor } }
                                    onReplace={ () => null }
                                    onSplit={ () => null }
                                    placeholder={ __( 'Username label…' ) }
                                    keepPlaceholderOnFocus
                                />
                            </div>
                            <div className="advgb-lores-field-input"
                                 style={ {
                                     backgroundColor: bgColor,
                                     color: inputColor,
                                     borderBottomColor: borderColor,
                                     borderStyle: borderStyle,
                                     borderWidth: borderWidth,
                                 } }
                            >
                                {!!showInputFieldIcon && (
                                    <span className="advgb-lores-input-icon"
                                          style={ { color: textColor } }
                                    >
                                        { emailIcon }
                                    </span>
                                ) }
                                <input type="text" disabled={ true }
                                       className="advgb-lores-input"
                                       style={ { color: inputColor } }
                                       value={ loginLabel ? loginLabel : __( 'user@email.com' ) }
                                />
                            </div>
                        </div>
                        <div className="advgb-lores-field advgb-login-password">
                            <div className="advgb-lores-field-label">
                                <RichText
                                    tagName="label"
                                    value={ passwordText }
                                    onChange={ (value) => setAttributes( { passwordText: value.trim() } ) }
                                    style={ { color: textColor } }
                                    onReplace={ () => null }
                                    onSplit={ () => null }
                                    placeholder={ __( 'Password label…' ) }
                                    keepPlaceholderOnFocus
                                />
                            </div>
                            <div className="advgb-lores-field-input"
                                 style={ {
                                     backgroundColor: bgColor,
                                     color: inputColor,
                                     borderBottomColor: borderColor,
                                     borderStyle: borderStyle,
                                     borderWidth: borderWidth,
                                 } }
                            >
                                {!!showInputFieldIcon && (
                                    <span className="advgb-lores-input-icon"
                                          style={ { color: textColor } }
                                    >
                                        { passwordIcon }
                                    </span>
                                ) }
                                <input type="password" disabled={ true }
                                       className="advgb-lores-input"
                                       style={ { color: inputColor } }
                                       value="password"
                                />
                            </div>
                        </div>
                        <div className={`advgb-lores-field advgb-lores-submit-wrapper advgb-submit-align-${submitPosition}`}>
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
                                        onReplace={ () => null }
                                        onSplit={ () => null }
                                        placeholder={ __( 'Remember me…' ) }
                                        keepPlaceholderOnFocus
                                    />
                                </span>
                            </label>
                            <div className="advgb-lores-submit advgb-login-submit">
                                <RichText
                                    tagName="span"
                                    value={ loginSubmitLabel }
                                    onChange={ (value) => setAttributes( { loginSubmitLabel: value.trim() } ) }
                                    style={ {
                                        borderColor: submitColor,
                                        color: submitColor,
                                        backgroundColor: submitBgColor,
                                        borderRadius: submitRadius,
                                    } }
                                    className="advgb-lores-submit-button"
                                    onReplace={ () => null }
                                    onSplit={ () => null }
                                    placeholder={ __( 'Login…' ) }
                                    keepPlaceholderOnFocus
                                />
                            </div>
                        </div>
                        {!!showLostPasswordLink && (
                            <div className="advgb-lores-field advgb-lost-password-field">
                                <div className="advgb-lost-password">
                                    <RichText
                                        tagName="a"
                                        value={ lostPasswordText }
                                        className="advgb-lost-password-link"
                                        onChange={ (value) => setAttributes( { lostPasswordText: value.trim() } ) }
                                        style={ { color: submitBgColor } }
                                        onReplace={ () => null }
                                        onSplit={ () => null }
                                        placeholder={ __( 'Lost password…' ) }
                                        keepPlaceholderOnFocus
                                    />
                                </div>
                            </div>
                        ) }
                    </div>
                </div>
            );

            const registerForm = (
                <div className="advgb-register-form-wrapper advgb-lores-form">
                    {!!showRegisterLink && (
                        <div className="advgb-header-navigation advgb-back-to-login">
                            <div className="advgb-back-to-login-link"
                                 style={ { color: submitBgColor } }
                            >
                                <RichText
                                    tagName="span"
                                    value={ backToLoginText }
                                    className="advgb-register-text"
                                    onChange={ (value) => setAttributes( { backToLoginText: value.trim() } ) }
                                    style={ { color: submitBgColor } }
                                    onReplace={ () => null }
                                    onSplit={ () => null }
                                    placeholder={ __( 'Back…' ) }
                                    keepPlaceholderOnFocus
                                />
                            </div>
                        </div>
                    ) }
                    <div className="advgb-register-form advgb-form-inner">
                        <div className="advgb-lores-form-header">
                            {!!showLogo && logoElm}
                            <RichText
                                tagName="h3"
                                value={ registerWelcome }
                                className="advgb-lores-form-welcome"
                                onChange={ (value) => setAttributes( { registerWelcome: value.trim() } ) }
                                style={ { color: textColor } }
                                placeholder={ __( 'Register…' ) }
                                keepPlaceholderOnFocus
                            />
                        </div>
                        <div className="advgb-lores-field advgb-register-username">
                            <div className="advgb-lores-field-label">
                                <RichText
                                    tagName="label"
                                    value={ userText }
                                    onChange={ (value) => setAttributes( { userText: value.trim() } ) }
                                    style={ { color: textColor } }
                                    onReplace={ () => null }
                                    onSplit={ () => null }
                                    placeholder={ __( 'Username label…' ) }
                                    keepPlaceholderOnFocus
                                />
                            </div>
                            <div className="advgb-lores-field-input"
                                 style={ {
                                     backgroundColor: bgColor,
                                     color: inputColor,
                                     borderBottomColor: borderColor,
                                     borderStyle: borderStyle,
                                     borderWidth: borderWidth,
                                 } }
                            >
                                {!!showInputFieldIcon && (
                                    <span className="advgb-lores-input-icon"
                                          style={ { color: textColor } }
                                    >
                                        { userIcon }
                                    </span>
                                ) }
                                <input type="text" disabled={ true }
                                       className="advgb-lores-input"
                                       style={ { color: inputColor } }
                                       value={ usernameLabel ? usernameLabel : __( 'username' ) }
                                />
                            </div>
                        </div>
                        <div className="advgb-lores-field advgb-register-email">
                            <div className="advgb-lores-field-label">
                                <RichText
                                    tagName="label"
                                    value={ emailText }
                                    onChange={ (value) => setAttributes( { emailText: value.trim() } ) }
                                    style={ { color: textColor } }
                                    onReplace={ () => null }
                                    onSplit={ () => null }
                                    placeholder={ __( 'Email label…' ) }
                                    keepPlaceholderOnFocus
                                />
                            </div>
                            <div className="advgb-lores-field-input"
                                 style={ {
                                     backgroundColor: bgColor,
                                     color: inputColor,
                                     borderBottomColor: borderColor,
                                     borderStyle: borderStyle,
                                     borderWidth: borderWidth,
                                 } }
                            >
                                {!!showInputFieldIcon && (
                                    <span className="advgb-lores-input-icon"
                                          style={ { color: textColor } }
                                    >
                                        { emailIcon }
                                    </span>
                                ) }
                                <input type="text" disabled={ true }
                                       className="advgb-lores-input"
                                       style={ { color: inputColor } }
                                       value={ emailLabel ? emailLabel : __( 'user@email.com' ) }
                                />
                            </div>
                        </div>
                        <div className={`advgb-lores-field advgb-lores-submit-wrapper advgb-submit-align-${submitPosition}`}>
                            <div className="advgb-lores-submit advgb-register-submit">
                                <RichText
                                    tagName="span"
                                    value={ registerSubmitLabel }
                                    onChange={ (value) => setAttributes( { registerSubmitLabel: value.trim() } ) }
                                    style={ {
                                        borderColor: submitColor,
                                        color: submitColor,
                                        backgroundColor: submitBgColor,
                                        borderRadius: submitRadius,
                                    } }
                                    className="advgb-lores-submit-button"
                                    onReplace={ () => null }
                                    onSplit={ () => null }
                                    placeholder={ __( 'Register…' ) }
                                    keepPlaceholderOnFocus
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );

            return (
                <Fragment>
                    <BlockControls>
                        <Toolbar>
                            <IconButton
                                icon="image-flip-horizontal"
                                label={ __( 'Switch View' ) }
                                onClick={ () => this.setState( { registerView: !registerView } ) }
                            />
                        </Toolbar>
                    </BlockControls>
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
                                    onChange={ (value) => {
                                        setAttributes( { formType: value } );
                                        this.setState( { registerView: value === 'register' } );
                                    } }
                                />
                                <RangeControl
                                    label={ __( 'Form Width (px)' ) }
                                    value={ formWidth }
                                    onChange={ ( value ) => setAttributes( { formWidth: value } ) }
                                    min={ 300 }
                                    max={ 1500 }
                                />
                                <ToggleControl
                                    label={ __( 'Show Logo' ) }
                                    checked={ !!showLogo }
                                    onChange={ () => setAttributes( { showLogo: !showLogo } ) }
                                />
                                {!!showLogo && (
                                    <RangeControl
                                        label={ __( 'Logo Width (px)' ) }
                                        value={ logoWidth }
                                        onChange={ ( value ) => setAttributes( { logoWidth: value } ) }
                                        min={ 100 }
                                        max={ 1500 }
                                    />
                                ) }
                                <ToggleControl
                                    label={ __( 'Show input field icon' ) }
                                    checked={ !!showInputFieldIcon }
                                    onChange={ () => setAttributes( { showInputFieldIcon: !showInputFieldIcon } ) }
                                />
                                <ToggleControl
                                    label={ __( 'Show register/header link' ) }
                                    checked={ !!showRegisterLink }
                                    onChange={ () => setAttributes( { showRegisterLink: !showRegisterLink } ) }
                                />
                                <ToggleControl
                                    label={ __( 'Show lost password link' ) }
                                    checked={ !!showLostPasswordLink }
                                    onChange={ () => setAttributes( { showLostPasswordLink: !showLostPasswordLink } ) }
                                />
                            </PanelBody>
                            <PanelBody title={ __( 'Input placeholder' ) } initialOpen={ false }>
                                <TextControl
                                    label={ __( 'Login input placeholder' ) }
                                    value={ loginLabel }
                                    onChange={ (value) => setAttributes( { loginLabel: value } ) }
                                />
                                <TextControl
                                    label={ __( 'Username input placeholder' ) }
                                    help={ __( 'Use in register form' ) }
                                    value={ usernameLabel }
                                    onChange={ (value) => setAttributes( { usernameLabel: value } ) }
                                />
                                <TextControl
                                    label={ __( 'Email input placeholder' ) }
                                    help={ __( 'Use in register form' ) }
                                    value={ emailLabel }
                                    onChange={ (value) => setAttributes( { emailLabel: value } ) }
                                />
                            </PanelBody>
                            <PanelColorSettings
                                title={ __( 'Text/Input Color' ) }
                                initialOpen={ false }
                                colorSettings={ [
                                    {
                                        label: __( 'Input background color' ),
                                        value: bgColor,
                                        onChange: (value) => setAttributes( { bgColor: value } ),
                                    },
                                    {
                                        label: __( 'Input color' ),
                                        value: inputColor,
                                        onChange: (value) => setAttributes( { inputColor: value } ),
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
                                    label={ __( 'Border width' ) }
                                    value={ borderWidth }
                                    onChange={ (value) => setAttributes( { borderWidth: value } ) }
                                    min={ 0 }
                                    max={ 10 }
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
                    <div className="advgb-lores-form-wrapper" style={ { width: formWidth } }>
                        {!registerView ? loginForm : registerForm }
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
        formWidth: {
            type: 'number',
            default: 500,
        },
        showLogo: {
            type: 'boolean',
            default: true,
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
            default: 150,
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
            default: __( 'Email Address' ),
        },
        rememberMeText: {
            type: 'string',
            default: __( 'Remember me' ),
        },
        loginSubmitLabel: {
            type: 'string',
            default: __( 'Login' ),
        },
        registerSubmitLabel: {
            type: 'string',
            default: __( 'Register' ),
        },
        registerText: {
            type: 'string',
            default: __( "Don't have an account?" ),
        },
        registerLinkText: {
            type: 'string',
            default: __( 'Register now' ),
        },
        registerWelcome: {
            type: 'string',
            default: __( 'Register new account' ),
        },
        backToLoginText: {
            type: 'string',
            default: __( 'Login' ),
        },
        lostPasswordText: {
            type: 'string',
            default: __( 'Lost your password?' ),
        },
        bgColor: {
            type: 'string',
        },
        textColor: {
            type: 'string',
        },
        inputColor: {
            type: 'string',
        },
        borderStyle: {
            type: 'string',
        },
        borderColor: {
            type: 'string',
        },
        borderWidth: {
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