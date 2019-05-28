(function ( wpI18n, wpBlocks, wpElement, wpEditor, wpComponents ) {
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InspectorControls, PanelColorSettings, InnerBlocks } = wpEditor;
    const { PanelBody, RangeControl, SelectControl, TextControl } = wpComponents;
    const { times } = lodash;

    const columnsBlockIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    );

    class AdvColumnsEdit extends Component {
        constructor() {
            super( ...arguments );
        }

        render() {
            const { attributes, setAttributes } = this.props;
            const {
                columns,
                columnsLayout, columnsLayoutT, columnsLayoutM,
                marginTop, marginRight, marginBottom, marginLeft,
                marginTopT, marginRightT, marginBottomT, marginLeftT,
                marginTopM, marginRightM, marginBottomM, marginLeftM,
                paddingTop, paddingRight, paddingBottom, paddingLeft,
                paddingTopT, paddingRightT, paddingBottomT, paddingLeftT,
                paddingTopM, paddingRightM, paddingBottomM, paddingLeftM,
                vAlign,
                gutter,
                contentMaxWidth,
                contentMinHeight,
                wrapperTag,
            } = attributes;

            const blockClasses = [
                'advgb-columns'
            ].filter( Boolean ).join( ' ' );

            return (
                <Fragment>
                    <InspectorControls>
                        <PanelBody title={ __( 'Columns Settings' ) }>
                            <PanelBody title={ __( 'Responsive Settings' ) }>
                            </PanelBody>
                            <PanelBody title={ __( 'Row Settings' ) } initialOpen={ false }>
                            </PanelBody>
                        </PanelBody>
                    </InspectorControls>
                    <div className="advgb-columns-wrapper">
                        <div className={ blockClasses }>
                            <InnerBlocks
                                template={ [ ['advgb/column'], ['advgb/column'], ['advgb/column'] ] }
                                templateLock="all"
                                allowdBlockType={ [ 'advgb/column' ] }
                            />
                        </div>
                    </div>
                </Fragment>
            )
        }
    }

    const blockAttrs = {
        columns: {
            type: 'number',
        },
        columnsLayout: {
            type: 'string',
        },
        columnsLayoutT: {
            type: 'string',
        },
        columnsLayoutM: {
            type: 'string',
        },
        marginTop: {
            type: 'number',
        },
        marginTopT: {
            type: 'number',
        },
        marginTopM: {
            type: 'number',
        },
        marginRight: {
            type: 'number',
        },
        marginRightT: {
            type: 'number',
        },
        marginRightM: {
            type: 'number',
        },
        marginBottom: {
            type: 'number',
        },
        marginBottomT: {
            type: 'number',
        },
        marginBottomM: {
            type: 'number',
        },
        marginLeft: {
            type: 'number',
        },
        marginLeftT: {
            type: 'number',
        },
        marginLeftM: {
            type: 'number',
        },
        paddingTop: {
            type: 'number',
        },
        paddingTopT: {
            type: 'number',
        },
        paddingTopM: {
            type: 'number',
        },
        paddingRight: {
            type: 'number',
        },
        paddingRightT: {
            type: 'number',
        },
        paddingRightM: {
            type: 'number',
        },
        paddingBottom: {
            type: 'number',
        },
        paddingBottomT: {
            type: 'number',
        },
        paddingBottomM: {
            type: 'number',
        },
        paddingLeft: {
            type: 'number',
        },
        paddingLeftT: {
            type: 'number',
        },
        paddingLeftM: {
            type: 'number',
        },
        vAlign: {
            type: 'string',
        },
        gutter: {
            type: 'number',
            default: 10,
        },
        contentMaxWidth: {
            type: 'number',
        },
        contentMinHeight: {
            type: 'number',
        },
        wrapperTag: {
            type: 'string',
            default: 'div',
        },
    };

    registerBlockType( 'advgb/columns', {
        title: __( 'Columns Manager' ),
        description: __( 'Row layout with columns you decided.' ),
        icon: {
            src: columnsBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined,
        },
        category: 'advgb-category',
        keywords: [ __( 'columns' ), __( 'row' ), __( 'layout' ) ],
        supports: {
            align: [ 'wide', 'full' ],
            html: false,
        },
        attributes: blockAttrs,
        edit: AdvColumnsEdit,
        save: function ( props ) {
            return null;
        },
    } );
})( wp.i18n, wp.blocks, wp.element, wp.editor, wp.components );