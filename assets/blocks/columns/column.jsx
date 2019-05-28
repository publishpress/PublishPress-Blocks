(function ( wpI18n, wpBlocks, wpElement, wpEditor, wpComponents ) {
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InspectorControls, PanelColorSettings, InnerBlocks } = wpEditor;
    const { PanelBody, RangeControl, SelectControl, TextControl } = wpComponents;
    const { select } = wp.data;

    const columnsBlockIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    );

    class AdvColumnEdit extends Component {
        constructor() {
            super( ...arguments );
        }

        render() {
            const { attributes, setAttributes, clientId } = this.props;
            const {
                width,
                borderColor,
                borderStyle,
                borderWidth,
                borderRadius,
                marginTop, marginRight, marginBottom, marginLeft,
                marginTopM, marginRightM, marginBottomM, marginLeftM,
                paddingTop, paddingRight, paddingBottom, paddingLeft,
                paddingTopM, paddingRightM, paddingBottomM, paddingLeftM,
            } = attributes;
            const { getBlockOrder } = select( 'core/block-editor' );
            const hasChildBlocks = getBlockOrder( clientId ).length > 0;

            const blockClasses = [
                'advgb-column'
            ].filter( Boolean ).join( ' ' );

            return (
                <Fragment>
                    <InspectorControls>
                        <PanelBody title={ __( 'Column Settings' ) }>

                        </PanelBody>
                    </InspectorControls>
                    <div className={ blockClasses }>
                        <InnerBlocks
                            templateLock={ false }
                            renderAppender={ (
                                hasChildBlocks ?
                                    undefined :
                                    () => <InnerBlocks.ButtonBlockAppender />
                            ) }
                        />
                    </div>
                </Fragment>
            )
        }
    }

    const blockAttrs = {
        width: {
            type: 'number',
        },
        borderColor: {
            type: 'string',
        },
        borderStyle: {
            type: 'string',
        },
        borderWidth: {
            type: 'number',
        },
        borderRadius: {
            type: 'number',
        },
        marginTop: {
            type: 'number',
        },
        marginTopM: {
            type: 'number',
        },
        marginRight: {
            type: 'number',
        },
        marginRightM: {
            type: 'number',
        },
        marginBottom: {
            type: 'number',
        },
        marginBottomM: {
            type: 'number',
        },
        marginLeft: {
            type: 'number',
        },
        marginLeftM: {
            type: 'number',
        },
        paddingTop: {
            type: 'number',
        },
        paddingTopM: {
            type: 'number',
        },
        paddingRight: {
            type: 'number',
        },
        paddingRightM: {
            type: 'number',
        },
        paddingBottom: {
            type: 'number',
        },
        paddingBottomM: {
            type: 'number',
        },
        paddingLeft: {
            type: 'number',
        },
        paddingLeftM: {
            type: 'number',
        },
    };

    registerBlockType( 'advgb/column', {
        title: __( 'Adv. Column' ),
        parent: [ 'advgb/columns' ],
        description: __( 'Column in row.' ),
        icon: {
            src: columnsBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined,
        },
        category: 'advgb-category',
        keywords: [ __( 'columns' ), __( 'row' ), __( 'layout' ) ],
        supports: {
            inserter: false,
            reusable: false,
            html: false,
        },
        attributes: blockAttrs,
        edit: AdvColumnEdit,
        save: function ( props ) {
            return null;
        },
    } );
})( wp.i18n, wp.blocks, wp.element, wp.editor, wp.components );