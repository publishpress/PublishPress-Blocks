const { addFilter } = wp.hooks;
const { __ } = wp.i18n;
const { InspectorControls, hasBlockSupport } = wp.blocks;
const { SelectControl, PanelBody, ToggleControl } = wp.components;

// Register extra options to blocks attributes
addFilter( 'blocks.registerBlockType', 'advgb/registerExtraOptions', function ( settings ) {
    settings.attributes = Object.assign( settings.attributes, {
        showByDevices: {
            type: 'string',
            default: 'all',
        },
        showOnDesktop: {
            type: 'boolean',
        },
        showOnTablet: {
            type: 'boolean',
        },
        showOnMobile: {
            type: 'boolean',
        },
    } );

    return settings;
} );

// Add options to blocks
addFilter( 'blocks.BlockEdit', 'advgb/addExtraOptions', function ( BlockEdit ) {
    return ( props ) => {
        const { isSelected, attributes, setAttributes } = props;
        const { showByDevices, showOnDesktop, showOnTablet, showOnMobile } = attributes;

        return [
            <BlockEdit key="extra-options" {...props} />,
            isSelected &&
            <InspectorControls key="extra-options-inspector">
                <PanelBody title={ __( 'Extra options' ) }>
                    <SelectControl
                        label={ __( 'Show this block on devices' ) }
                        help={ __( 'Choose which devices can see this block.' ) }
                        value={ showByDevices || 'all' }
                        options={ [
                            { label: __( 'All' ), value: 'all' },
                            { label: __( 'Custom' ), value: 'custom' }
                        ] }
                        onChange={ (value) => setAttributes( { showByDevices: value } ) }
                    />
                    {showByDevices === 'custom' && [
                        <ToggleControl
                            key="show-block-desktop"
                            label={ __( 'Desktop' ) }
                            checked={ !!showOnDesktop }
                            onChange={ () => setAttributes( { showOnDesktop: !showOnDesktop } ) }
                        />,
                        <ToggleControl
                            key="show-block-tablet"
                            label={ __( 'Tablet' ) }
                            checked={ !!showOnTablet }
                            onChange={ () => setAttributes( { showOnTablet: !showOnTablet } ) }
                        />,
                        <ToggleControl
                            key="show-block-mobile"
                            label={ __( 'Mobile' ) }
                            checked={ !!showOnMobile }
                            onChange={ () => setAttributes( { showOnMobile: !showOnMobile } ) }
                        />,
                    ] }
                </PanelBody>
            </InspectorControls>
        ]
    }
} );

// Save extra options
addFilter( 'blocks.getSaveContent.extraProps', 'advgb/saveExtraOptions', function ( extraProps, blockType, attributes ) {
    if (hasBlockSupport( blockType, 'customClassName', true ) && attributes.showByDevices) {
        const { showByDevices, showOnDesktop, showOnTablet, showOnMobile } = attributes;
        const blockClassNames = [
            extraProps.className,
            showByDevices === 'custom' && 'blockhide',
            ( showByDevices === 'custom' && showOnDesktop ) && 'blockshow-desktop',
            ( showByDevices === 'custom' && showOnTablet ) && 'blockshow-tablet',
            ( showByDevices === 'custom' && showOnMobile ) && 'blockshow-mobile',
        ];

        extraProps.className = blockClassNames.filter( Boolean ).join( ' ' );
    }

    return extraProps;
} );