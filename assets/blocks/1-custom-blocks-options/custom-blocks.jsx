(function ( wpI18n, wpHooks, wpEditor, wpComponents, wpElement ) {
    const { addFilter } = wpHooks;
    const { __ } = wpI18n;
    const { Fragment } = wpElement;
    const { InspectorControls, PanelColorSettings, MediaUpload } = wpEditor;
    const { PanelBody, BaseControl, SelectControl, RangeControl, ToggleControl, Button } = wpComponents;

    // Register extra attributes to separator blocks
    addFilter( 'blocks.registerBlockType', 'advgb/registerExtraBlocksAttrs', function ( settings ) {
        if (!!settings.attributes) {
            settings.attributes = Object.assign( settings.attributes, {
                blockWidth: {
                    type: 'number',
                },
                blockBgColor: {
                    type: 'string',
                },
                blockBgImage: {
                    type: 'string',
                },
                blockBgImageID: {
                    type: 'number',
                },
                blockBgImageSize: {
                    type: 'string',
                },
                blockBgImageSizeCustom: {
                    type: 'number',
                },
                blockBgImageAlignH: {
                    type: 'string',
                },
                blockBgImageAlignV: {
                    type: 'string',
                },
                blockOverlayDisplay: {
                    type: 'boolean',
                },
                blockOverlayColor: {
                    type: 'string',
                },
                blockOverlayOpacity: {
                    type: 'number',
                },
                blockTopDivider: {
                    type: 'string',
                },
                blockTopDividerColor: {
                    type: 'string',
                },
                blockTopDividerHeight: {
                    type: 'number',
                },
                blockTopDividerRotateX: {
                    type: 'boolean',
                },
                blockTopDividerRotateY: {
                    type: 'boolean',
                },
                blockBottomDivider: {
                    type: 'string',
                },
                blockBottomDividerColor: {
                    type: 'string',
                },
                blockBottomDividerHeight: {
                    type: 'number',
                },
                blockBottomDividerRotateX: {
                    type: 'boolean',
                },
                blockBottomDividerRotateY: {
                    type: 'boolean',
                },
            } );
        }

        return settings;
    } );

    // Add option to select styles for separator
    addFilter( 'editor.BlockEdit', 'advgb/addExtraBlocksStyle', function ( BlockEdit ) {
        return ( props ) => {
            const { attributes, setAttributes, clientId } = props;
            const {
                blockWidth,
                blockBgColor,
                blockBgImage,
                blockBgImageID,
                blockBgImageSize,
                blockBgImageSizeCustom,
                blockBgImageAlignH,
                blockBgImageAlignV,
                blockOverlayDisplay,
                blockOverlayColor,
                blockOverlayOpacity,
                blockTopDivider,
                blockTopDividerColor,
                blockTopDividerHeight,
                blockTopDividerRotateX,
                blockTopDividerRotateY,
                blockBottomDivider,
                blockBottomDividerColor,
                blockBottomDividerHeight,
                blockBottomDividerRotateX,
                blockBottomDividerRotateY,
            } = attributes;

            return (
                <Fragment>
                    <BlockEdit {...props} />
                    {typeof agTheme !== 'undefined' && !!agTheme.activated && (
                        <InspectorControls>
                            <PanelBody title={ __( 'Blocks Settings' ) }>
                                <RangeControl
                                    label={ __( 'Block width (%)' ) }
                                    value={ blockWidth }
                                    min={ 10 }
                                    max={ 100 }
                                    onChange={ ( value ) => setAttributes( { blockWidth: value } ) }
                                    allowReset
                                />
                                <PanelColorSettings
                                    title={ __( 'Block Color' ) }
                                    initialOpen={ false }
                                    colorSettings={ [
                                        {
                                            label: __( 'Background color' ),
                                            value: blockBgColor,
                                            onChange: ( value ) => setAttributes( { blockBgColor: value } ),
                                        },
                                        {
                                            label: __( 'Overlay color' ),
                                            value: blockOverlayColor,
                                            onChange: ( value ) => setAttributes( { blockOverlayColor: value } ),
                                        },
                                    ] }
                                />
                                {blockOverlayColor && (
                                    <Fragment>
                                        <RangeControl
                                            label={ __( 'Overlay opacity (%)' ) }
                                            value={ blockOverlayOpacity }
                                            min={ 10 }
                                            max={ 90 }
                                            onChange={ ( value ) => setAttributes( { blockOverlayOpacity: value } ) }
                                        />
                                        <ToggleControl
                                            label={ __( 'Always show overlay' ) }
                                            checked={ blockOverlayDisplay }
                                            onChange={ () => setAttributes( { blockOverlayDisplay: !blockOverlayDisplay } ) }
                                        />
                                    </Fragment>
                                ) }
                                <PanelBody title={ __( 'Block Background' ) } initialOpen={ false }>
                                    <MediaUpload
                                        allowedTypes={ ["image"] }
                                        value={ blockBgImageID }
                                        onSelect={ (image) => setAttributes( { blockBgImage: image.url, blockBgImageID: image.id } ) }
                                        render={ ( { open } ) => {
                                            return (
                                                <BaseControl label={ [
                                                    __( 'Background Image' ),
                                                    blockBgImage && (
                                                        <a key="icon-remove"
                                                           style={ { marginLeft: '10px', cursor: 'pointer' } }
                                                           onClick={ () => setAttributes( {
                                                               blockBgImage: undefined,
                                                               blockBgImageID: undefined,
                                                           } ) }
                                                        >
                                                            { __( 'Remove' ) }
                                                        </a>
                                                    )
                                                ] }
                                                >
                                                    <Button className={ 'button button-large' }
                                                            onClick={ open }
                                                    >
                                                        { __( 'Choose' ) }
                                                    </Button>
                                                    {!!blockBgImage &&
                                                    <img style={ { maxHeight: '30px', marginLeft: '10px' } }
                                                         src={ blockBgImage }
                                                         alt={ __( 'Background image' ) }/>
                                                    }
                                                </BaseControl>
                                            )
                                        } }
                                    />
                                    {!!blockBgImage && (
                                        <PanelBody title={ __( 'Background Image Options' ) }>
                                            <SelectControl
                                                label={__( 'Image Size' )}
                                                value={ blockBgImageSize }
                                                options={[
                                                    { label: __( 'Auto' ), value: 'auto' },
                                                    { label: __( 'Fit height' ), value: 'contain' },
                                                    { label: __( 'Fit width' ), value: 'cover' },
                                                    { label: __( 'Custom' ), value: 'custom' },
                                                ]}
                                                onChange={( value ) => setAttributes( { blockBgImageSize: value } )}
                                            />
                                            {blockBgImageSize === 'custom' && (
                                                <RangeControl
                                                    label={__( 'Image size (%)' )}
                                                    value={ blockBgImageSizeCustom }
                                                    min={ 1 }
                                                    max={ 100 }
                                                    onChange={ ( value ) => setAttributes( { blockBgImageSizeCustom: value } ) }
                                                />
                                            ) }
                                            <SelectControl
                                                label={__( 'Horizontal Align' )}
                                                value={ blockBgImageAlignH }
                                                options={[
                                                    { label: __( 'Left' ), value: 'left' },
                                                    { label: __( 'Center' ), value: 'center' },
                                                    { label: __( 'Right' ), value: 'right' },
                                                ]}
                                                onChange={( value ) => setAttributes( { blockBgImageAlignH: value } )}
                                            />
                                            <SelectControl
                                                label={__( 'Vertical Align' )}
                                                value={ blockBgImageAlignV }
                                                options={[
                                                    { label: __( 'Top' ), value: 'top' },
                                                    { label: __( 'Center' ), value: 'center' },
                                                    { label: __( 'Bottom' ), value: 'bottom' },
                                                ]}
                                                onChange={( value ) => setAttributes( { blockBgImageAlignV: value } )}
                                            />
                                        </PanelBody>
                                    ) }
                                </PanelBody>
                            </PanelBody>
                        </InspectorControls>
                    ) }
                    <style>
                        {`#block-${clientId} .editor-block-list__block-edit {
                            max-width: ${blockWidth ? parseInt(blockWidth) + 8 : undefined}%;
                        }`}
                        {`#block-${clientId} > .editor-block-list__block-edit::before {
                            background-color: ${blockBgColor};
                            background-image: url(${blockBgImage});
                            background-size: ${blockBgImageSize === 'custom' ? blockBgImageSizeCustom + '%' : blockBgImageSize};
                            background-position: ${blockBgImageAlignV} ${blockBgImageAlignH};
                        }`}
                        {`#block-${clientId} > .editor-block-list__block-edit::after {
                            background-color: ${blockOverlayColor};
                            ${blockOverlayDisplay && `opacity: ${blockOverlayOpacity/100};`}
                        }`}
                        {!blockOverlayDisplay &&
                        `#block-${clientId} > .editor-block-list__block-edit:hover::after {
                            opacity: ${blockOverlayOpacity/100};
                        }`}
                    </style>
                </Fragment>
            );
        }
    } );

    // Apply custom styles on front-end
    addFilter( 'blocks.getSaveContent.extraProps', 'advgb/saveExtraBlocksStyles', function ( extraProps, blockType, attributes ) {


        return extraProps;
    } );
})( wp.i18n, wp.hooks, wp.editor, wp.components, wp.element );