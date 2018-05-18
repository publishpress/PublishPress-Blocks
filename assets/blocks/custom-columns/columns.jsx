const { addFilter } = wp.hooks;
const { __ } = wp.i18n;
const { InspectorControls } = wp.blocks;
const { PanelBody, RangeControl } = wp.components;

// Register extra attributes
addFilter( 'blocks.registerBlockType', 'advgb/registerExtraColumnsAttrs', function ( settings ) {
    if (settings.name === 'core/text-columns' || settings.name === 'core/columns') {
        settings.attributes = Object.assign( settings.attributes, {
            colMargin: {
                type: 'number',
            },
            blockID: {
                type: 'string',
            }
        } );
    }

    return settings;
} );

// Add options to edit in backend
addFilter( 'blocks.BlockEdit', 'advgb/editColumnsAttrs', function ( BlockEdit ) {
    return ( props ) => {
        if (props.name === "core/text-columns" || props.name === "core/columns") {
            const { isSelected, attributes, setAttributes, id } = props;
            const { colMargin, blockID } = attributes;

            return ( [
                <BlockEdit key="block-edit-custom-columns" {...props}/>,
                isSelected &&
                <InspectorControls key="inspector-custom-columns">
                    <RangeControl
                        label={ __( 'Columns margin' ) }
                        value={ colMargin }
                        min={ 0 }
                        max={ 200 }
                        onChange={ (value) => {
                            if (!blockID) setAttributes( { blockID: 'columns-' + id } );
                            return setAttributes( { colMargin: value } );
                        } }
                    />
                </InspectorControls>,
                props.name === 'core/columns' && !!colMargin &&
                <style key="custom-columns-styles">
                    {`#block-${id} .wp-block-columns {grid-gap: ${colMargin}px;}`}
                </style>,
                props.name === 'core/text-columns' && !!colMargin &&
                <style key="custom-text-columns-styles">
                    {`#block-${id} .wp-block-column:not(:first-child) {margin-left: ${colMargin}px;}`}
                </style>
            ] )
        }

        return <BlockEdit {...props} />;
    }
} );

// Save options to show in frontend
addFilter( 'blocks.getSaveContent.extraProps', 'advgb/saveColumnsAttrs', function ( extraProps, blockType, attributes ) {
    const { colMargin, blockID } = attributes;

    if (blockType.name === 'core/text-columns') {
        extraProps = Object.assign( extraProps, {
            id: blockID,
        } )
    } else if (blockType.name === 'core/columns') {
        extraProps = Object.assign( extraProps, {
            style: { gridGap: colMargin + 'px' },
        } )
    }

    return extraProps;
} );

// Save option to show in frontend
addFilter( 'blocks.getSaveElement', 'advgb/saveTextColumnsElm', function ( SaveElm, blockType, attributes ) {
    if (blockType.name === 'core/text-columns') {
        const { colMargin, blockID } = attributes;

        return [
            SaveElm,
            blockID && !!colMargin &&
            <style key="custom-columns-styles">
                {`#${blockID} .wp-block-column:not(:first-child) {
                    margin-left: ${colMargin}px;
                }`}
            </style>
        ]
    }

    return SaveElm;
} );