(function ( wpI18n, wpHooks, wpElement, wpEditor, wpComponents ) {
    const { addFilter } = wpHooks;
    const { __ } = wpI18n;
    const { Fragment } = wpElement;
    const { InspectorControls } = wpEditor;
    const { PanelBody, Button } = wpComponents;

    // Register extra attributes
    addFilter( 'blocks.registerBlockType', 'advgb/registerExtraColumnsAttrs', function ( settings ) {
        if (settings.name === 'core/text-columns' || settings.name === 'core/columns') {
            settings.attributes = Object.assign( settings.attributes, {
                colMargin: {
                    type: 'number',
                },
                colPadding: {
                    type: 'number',
                },
                blockID: {
                    type: 'string',
                },
            } );
        }

        return settings;
    } );

    // Add options to edit in backend
    addFilter( 'editor.BlockEdit', 'advgb/editColumnsAttrs', function ( BlockEdit ) {
        return ( props ) => {
            if (props.name === "core/text-columns" || props.name === "core/columns") {
                const { attributes, clientId } = props;
                const { colMargin, colPadding } = attributes;

                return (
                    <Fragment>
                        <BlockEdit {...props} />
                        <InspectorControls>
                            <PanelBody title={ __( 'Custom styles' ) }>
                                <Button isPrimary
                                        onClick={ () => props.setAttributes( {
                                            colMargin: undefined,
                                            colPadding: undefined,
                                            blockID: undefined,
                                        } ) }>
                                    { __( 'Clear custom styles' ) }
                                </Button>
                                <p style={ { fontStyle: 'italic', marginTop: 10 } }>
                                    { __( 'We recommend to clear all custom styles as soon as possible to avoid block error validation,' +
                                        ' because we will remove this feature in very next version.' ) }
                                </p>
                            </PanelBody>
                        </InspectorControls>
                        {props.name === 'core/columns' && (!!colMargin || !!colPadding) &&
                        <style key="custom-columns-styles">
                            {`#block-${clientId} .wp-block-columns .editor-block-list__block:not(:first-child) {margin-left: ${colMargin}px;}`}
                            {`#block-${clientId} .wp-block-columns .editor-block-list__block-edit {padding: ${colPadding}px;}`}
                        </style>}
                    </Fragment>
                )
            }

            return <BlockEdit {...props} />;
        }
    } );

    // Save options to show in frontend
    addFilter( 'blocks.getSaveContent.extraProps', 'advgb/saveColumnsAttrs', function ( extraProps, blockType, attributes ) {
        const { colMargin, colPadding, blockID } = attributes;

        if (blockType.name === 'core/text-columns' || blockType.name === 'core/columns') {
            extraProps = Object.assign( extraProps, {
                id: (colMargin || colPadding || blockID) ? blockID : extraProps.id,
            } )
        }

        return extraProps;
    } );

    // Save option to show in frontend
    addFilter( 'blocks.getSaveElement', 'advgb/saveTextColumnsElm', function ( SaveElm, blockType, attributes ) {
        if (blockType.name === 'core/text-columns' || blockType.name === 'core/columns') {
            const { colMargin, colPadding, blockID } = attributes;

            return (
                <Fragment>
                    {SaveElm}
                    {blockID && (!!colMargin || !!colPadding) &&
                    <style>
                        {`#${blockID} .wp-block-column:not(:first-child) {
                        margin-left: ${colMargin}px;
                    }
                    #${blockID} .wp-block-column {
                        padding: ${colPadding}px;
                    }`}
                    </style>}
                </Fragment>
            )
        }

        return SaveElm;
    } );
})( wp.i18n, wp.hooks, wp.element, wp.editor, wp.components );