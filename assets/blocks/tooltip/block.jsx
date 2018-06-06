(function ( wpI18n, wpHooks, wpElement, wpEditor, wpComponents ) {
    const { addFilter } = wpHooks;
    const { __ } = wpI18n;
    const { Fragment } = wpElement;
    const { InspectorAdvancedControls } = wpEditor;
    const { PanelBody, ToggleControl, TextareaControl } = wpComponents;

    // Register extra tooltip attributes
    addFilter( 'blocks.registerBlockType', 'advgb/registerTooltipAttrs', function ( settings ) {
        if ( settings.name.indexOf( 'core/' ) > -1 ) {
            settings.attributes = Object.assign( settings.attributes, {
                enableTooltip: {
                    type: 'boolean',
                },
                tooltipText: {
                    type: 'string',
                },
            } );
        }

        return settings;
    } );

    // Add option for tooltip
    addFilter( 'blocks.BlockEdit', 'advgb/tooltipSettings', function ( BlockEdit ) {
        return ( props ) => {
            if ( props.name.indexOf( 'core/' ) > -1 ) {
                const { attributes, setAttributes } = props;
                const { enableTooltip, tooltipText } = attributes;

                return (
                    <Fragment>
                        <BlockEdit { ...props }/>
                        <InspectorAdvancedControls>
                            <PanelBody title={ __( 'Block tooltip' ) }>
                                <ToggleControl
                                    label={ __( 'Enable tooltip' ) }
                                    checked={ enableTooltip }
                                    onChange={ () => setAttributes( { enableTooltip: !enableTooltip } ) }
                                />
                                {!!enableTooltip &&
                                <TextareaControl
                                    label={ __( 'Tooltip text' ) }
                                    value={ tooltipText }
                                    placeholder={ __( 'Enter tooltip text…' ) }
                                    onChange={ (value) => setAttributes( { tooltipText: value } ) }
                                />
                                }
                            </PanelBody>
                        </InspectorAdvancedControls>
                    </Fragment>
                )
            }
            
            return <BlockEdit { ...props }/>;
        }
    } );

    // Apply tooltip on front-end
    addFilter( 'blocks.getSaveContent.extraProps', 'advgb/saveTooltip', function ( extraProps, blockType, attributes ) {
        if ( blockType.name.indexOf( 'core/' ) > -1 ) {
            const { enableTooltip, tooltipText } = attributes;

            const newClassName = [
                extraProps.className,
                enableTooltip && 'advgb-has-qtip',
            ].filter( Boolean ).join( ' ' );

            const text = new DOMParser().parseFromString( tooltipText, 'text/html' );
            const formattedText = text.body.innerText || '';

            extraProps = Object.assign( extraProps, {
                className: newClassName,
                'data-tooltip': enableTooltip ? formattedText : undefined,
            } );
        }

        return extraProps;
    } );
})( wp.i18n, wp.hooks, wp.element, wp.editor, wp.components );