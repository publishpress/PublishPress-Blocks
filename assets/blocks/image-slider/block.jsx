(function ( wpI18n, wpBlocks, wpElement, wpEditor, wpComponents ) {
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InspectorControls, RichText, PanelColorSettings } = wpEditor;
    const { PanelBody, RangeControl, ToggleControl , SelectControl, Tooltip } = wpComponents;

    class AdvImageSlider extends Component {
        constructor() {
            super( ...arguments );
        }

        render() {
            const { attributes, setAttributes, isSelected } = this.props;
            const {
                images,
                actionOnClick,
                fullWidth,
                width,
                height,
                hoverColor,
                titleColor,
                textColor,
            } = attributes;

            return (
                <Fragment>
                    <InspectorControls>
                        <PanelBody title={ __( 'Image Settings' ) }>
                            <SelectControl
                                label={ __( 'Action on click' ) }
                                value={ actionOnClick }
                                options={ [
                                    { label: __( 'None' ), value: '' },
                                    { label: __( 'Open image in lightbox' ), value: 'lightbox' },
                                    { label: __( 'Open custom link' ), value: 'link' },
                                ] }
                                onChange={ (value) => setAttributes( { actionOnClick: value } ) }
                            />
                            <ToggleControl
                                label={ __( 'Full width' ) }
                                checked={ fullWidth }
                                onChange={ () => setAttributes( { fullWidth: !fullWidth } ) }
                            />
                            <RangeControl
                                label={ __( 'Height' ) }
                                value={ height }
                                onChange={ (value) => setAttributes( { height: value } ) }
                                min={ 100 }
                                max={ 1000 }
                            />
                            {!fullWidth && (
                                <RangeControl
                                    label={ __( 'Width' ) }
                                    value={ width }
                                    onChange={ (value) => setAttributes( { width: value } ) }
                                    min={ 200 }
                                    max={ 1300 }
                                />
                            ) }
                        </PanelBody>
                        <PanelColorSettings
                            title={ __( 'Color Settings' ) }
                            initialOpen={ false }
                            colorSettings={ [
                                {
                                    label: __( 'Hover Color' ),
                                    value: hoverColor,
                                    onChange: ( value ) => setAttributes( { hoverColor: value } ),
                                },
                                {
                                    label: __( 'Title Color' ),
                                    value: titleColor,
                                    onChange: ( value ) => setAttributes( { titleColor: value } ),
                                },
                                {
                                    label: __( 'Text Color' ),
                                    value: textColor,
                                    onChange: ( value ) => setAttributes( { textColor: value } ),
                                },
                            ] }
                        />
                    </InspectorControls>
                    <div className="advgb-image-slider">
                        123
                    </div>
                </Fragment>
            )
        }
    }

    registerBlockType( 'advgb/image-slider', {
        title: __( 'Image Slider' ),
        description: __( 'Display your images in a slider.' ),
        icon: {
            src: 'slides',
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined,
        },
        category: 'formatting',
        keywords: [ __( 'slide' ), __( 'gallery' ), __( 'photos' ) ],
        attributes: {
            images: {
                type: 'array',
                default: [
                    {
                        id: null,
                        title: '',
                        text: '',
                        link: '',
                    }
                ]
            },
            actionOnClick: {
                type: 'string',
            },
            fullWidth: {
                type: 'boolean',
                default: true,
            },
            width: {
                type: 'number',
                default: 700,
            },
            height: {
                type: 'number',
                default: 500,
            },
            hoverColor: {
                type: 'string',
            },
            titleColor: {
                type: 'string',
            },
            textColor: {
                type: 'string',
            },
        },
        edit: AdvImageSlider,
        save: function ( { attributes } ) {
            return null;
        },
    } );
})( wp.i18n, wp.blocks, wp.element, wp.editor, wp.components );