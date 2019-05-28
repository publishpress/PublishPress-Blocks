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
            const { getBlockOrder } = select( 'core/block-editor' );
            const hasChildBlocks = getBlockOrder( clientId ).length > 0;

            const blockClasses = [
                'advgb-columns'
            ].filter( Boolean ).join( ' ' );

            return (
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
            )
        }
    }

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
        attributes: {

        },
        edit: AdvColumnEdit,
        save: function ( props ) {
            return null;
        },
    } );
})( wp.i18n, wp.blocks, wp.element, wp.editor, wp.components );