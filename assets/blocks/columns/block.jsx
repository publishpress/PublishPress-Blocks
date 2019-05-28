(function ( wpI18n, wpBlocks, wpElement, wpEditor, wpComponents ) {
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InspectorControls, PanelColorSettings, InnerBlocks } = wpEditor;
    const { PanelBody, RangeControl, SelectControl, TextControl } = wpComponents;

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
            const blockClasses = [
                'advgb-columns'
            ].filter( Boolean ).join( ' ' );

            return (
                <div className={ blockClasses }>
                    <InnerBlocks
                        template={ [ ['advgb/column'], ['advgb/column'], ['advgb/column'] ] }
                        templateLock="all"
                        allowdBlockType={ [ 'advgb/column' ] }
                    />
                </div>
            )
        }
    }

    registerBlockType( 'advgb/columns', {
        title: __( 'Columns Manager' ),
        description: __( 'Row layout with columns you decided.' ),
        icon: {
            src: columnsBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined,
        },
        category: 'advgb-category',
        keywords: [ __( 'columns' ), __( 'row' ), __( 'layout' ) ],
        attributes: {

        },
        edit: AdvColumnsEdit,
        save: function ( props ) {
            return null;
        },
    } );
})( wp.i18n, wp.blocks, wp.element, wp.editor, wp.components );