(function ( wpI18n, wpBlocks, wpElement, wpEditor, wpComponents ) {
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InspectorControls, PanelColorSettings, InnerBlocks, AlignmentToolbar } = wpEditor;
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
            this.state = {
                tabSelected: 'desktop',
            };
        }

        render() {
            const { tabSelected } = this.state;
            const { attributes, setAttributes, clientId } = this.props;
            const {
                width,
                borderColor, borderStyle, borderWidth, borderRadius,
                textAlign, textAlignM,
                marginTop, marginRight, marginBottom, marginLeft,
                marginTopM, marginRightM, marginBottomM, marginLeftM,
                paddingTop, paddingRight, paddingBottom, paddingLeft,
                paddingTopM, paddingRightM, paddingBottomM, paddingLeftM,
            } = attributes;
            const { getBlockOrder  } = select( 'core/block-editor' );
            const hasChildBlocks = getBlockOrder( clientId ).length > 0;

            const blockClasses = [
                'advgb-column',
                'column',
            ].filter( Boolean ).join( ' ' );

            let deviceLetter = '';
            if (tabSelected === 'mobile') deviceLetter = 'M';

            return (
                <Fragment>
                    <InspectorControls>
                        <PanelBody title={ __( 'Column Settings' ) }>
                            <RangeControl
                                label={ __( 'Width (%)' ) }
                                help={ __( 'Set to 0 = auto. This will override predefine layout styles. Recommend for experience users!' ) }
                                value={ width }
                                min={ 0 }
                                max={ 100 }
                                onChange={ (value) => setAttributes( { width: value } ) }
                            />

                        </PanelBody>
                    </InspectorControls>
                    <div className={ blockClasses } style={ {
                        width: width ? width + '%' : undefined,
                    } }>
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
        columnClasses: {
            type: 'string',
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
        textAlign: {
            type: 'string',
        },
        textAlignM: {
            type: 'string',
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
        save: function ( { attributes } ) {
            const {
                width,
                columnClasses,
                borderColor, borderStyle, borderWidth, borderRadius,
                marginTop, marginRight, marginBottom, marginLeft,
                marginTopM, marginRightM, marginBottomM, marginLeftM,
                paddingTop, paddingRight, paddingBottom, paddingLeft,
                paddingTopM, paddingRightM, paddingBottomM, paddingLeftM,
            } = attributes;

            const blockClasses = [
                'advgb-column',
                'column',
                columnClasses,
            ].filter( Boolean ).join( ' ' );

            return (
                <div className={ blockClasses } style={ {
                    width: width ? width + '%' : undefined,
                } }>
                    <div className="advgb-column-inner">
                        <InnerBlocks.Content />
                    </div>
                </div>
            );
        },
    } );
})( wp.i18n, wp.blocks, wp.element, wp.editor, wp.components );