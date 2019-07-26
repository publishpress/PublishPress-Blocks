(function ( wpI18n, wpBlocks, wpElement, wpBlockEditor, wpComponents ) {
    wpBlockEditor = wp.blockEditor || wp.editor;
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InspectorControls, BlockControls, PanelColorSettings, InnerBlocks } = wpBlockEditor;
    const { RangeControl, PanelBody, BaseControl , SelectControl, ToggleControl, Toolbar, IconButton } = wpComponents;

    class LoginFormEdit extends Component {
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
        usernameLabel: {
            type: 'string',
        },
        passwordLabel: {
            type: 'string',
        },
        emailLabel: {
            type: 'string',
        },
        submitLabel: {
            type: 'string',
        },
        successLabel: {
            type: 'string',
        },
        alertLabel: {
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