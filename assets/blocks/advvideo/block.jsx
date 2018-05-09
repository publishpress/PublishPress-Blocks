const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { registerBlockType, InspectorControls, BlockControls, RichText, ColorPalette, MediaUpload } = wp.blocks;
const { RangeControl, PanelBody, PanelColor, ToggleControl, SelectControl, Button, IconButton } = wp.components;

class AdvVideo extends Component {
    constructor() {
        super( ...arguments );
    }

    render() {
        const { isSelected, attributes, setAttributes } = this.props;
        const {
            videoURL,
            videoFullWidth,
            videoWidth,
            videoHeight,
            playButtonIcon,
            playButtonSize,
            playButtonColor,
            overlayColor,
            poster,
            posterID,
            openInLightbox,
        } = attributes;

        const PLAY_BUTTON_STYLE = {
            normal: [
                <path d="M8 5v14l11-7z" key="x"/>,
                <path d="M0 0h24v24H0z" fill="none" key="y"/>
            ],
            circleFill: [
                <path d="M0 0h24v24H0z" fill="none" key="x"/>,
                <path key="y" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            ],
            circleOutline: [
                <path d="M0 0h24v24H0z" fill="none" key="x"/>,
                <path key="y" d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            ],
            videoCam: [
                <path d="M0 0h24v24H0z" fill="none" key="x"/>,
                <path key="y" d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
            ],
            squareCurved: [
                <path key="x" d="M20 8H4V6h16v2zm-2-6H6v2h12V2zm4 10v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-6 4l-6-3.27v6.53L16 16z"/>,
                <path key="y" fill="none" d="M0 0h24v24H0z"/>
            ],
            starSticker: [
                <path key="x" d="M0 0h24v24H0z" fill="none"/>,
                <path key="x" d="M20 12c0-1.1.9-2 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2zm-4.42 4.8L12 14.5l-3.58 2.3 1.08-4.12-3.29-2.69 4.24-.25L12 5.8l1.54 3.95 4.24.25-3.29 2.69 1.09 4.11z"/>
            ],
        };

        const blockClassName = [
            'advgb-video-block',
            !!videoFullWidth && 'full-width',
            !!openInLightbox && !!videoURL && 'advgb-video-lightbox',
        ].filter( Boolean ).join( ' ' );

        return (
            <Fragment>
                {!!poster &&
                    <BlockControls>
                        <MediaUpload
                            type={ 'image' }
                            value={ posterID }
                            onSelect={ (image) => setAttributes( { poster: image.url, posterID: image.id } ) }
                            render={ ( { open } ) => (
                                <IconButton
                                    className="components-toolbar__control"
                                    label={ __( 'Change poster' ) }
                                    icon={ 'edit' }
                                    onClick={ open }
                                />
                            ) }
                        />
                        <IconButton
                            className="components-toolbar__control"
                            label={ __( 'Remove poster' ) }
                            icon={ 'no' }
                            onClick={ () => setAttributes( { poster: undefined, posterID: undefined } ) }
                        />
                    </BlockControls>
                }
                <InspectorControls>
                    <PanelBody title={ __( 'Advanced Video Settings' ) }>
                        <ToggleControl
                            label={ __( 'Open video in light box' ) }
                            help={ __( 'We highly recommend to keep video open in light box to use all of blocks features!' ) }
                            checked={ openInLightbox }
                            onChange={ () => setAttributes( { openInLightbox: !openInLightbox } ) }
                        />
                        <ToggleControl
                            label={ __( 'Full width' ) }
                            checked={ videoFullWidth }
                            onChange={ () => setAttributes( { videoFullWidth: !videoFullWidth } ) }
                        />
                        {!videoFullWidth &&
                            <RangeControl
                                label={ __( 'Video width' ) }
                                value={ videoWidth }
                                min={ 100 }
                                max={ 1000 }
                                onChange={ (value) => setAttributes( { videoWidth: value } ) }
                            />
                        }
                        <RangeControl
                            label={ __( 'Video height' ) }
                            value={ videoHeight }
                            min={ 300 }
                            max={ 700 }
                            onChange={ (value) => setAttributes( { videoHeight: value } ) }
                        />
                        {!!openInLightbox &&
                            <PanelColor title={ __( 'Overlay Color' ) } colorValue={ overlayColor } initialOpen={ false }>
                                <ColorPalette
                                    value={ overlayColor }
                                    onChange={ (value) => setAttributes( { overlayColor: value } ) }
                                />
                            </PanelColor>
                        }
                        {!!openInLightbox &&
                            <PanelBody title={ __( 'Play Button' ) }>
                                <SelectControl
                                    label={ __( 'Play Button Icon' ) }
                                    value={ playButtonIcon }
                                    options={ [
                                        { label: __( 'Normal' ), value: 'normal' },
                                        { label: __( 'Circle' ), value: 'circleFill' },
                                        { label: __( 'Outline Circle' ), value: 'circleOutline' },
                                        { label: __( 'Video Camera' ), value: 'videoCam' },
                                        { label: __( 'Square Curved' ), value: 'squareCurved' },
                                        { label: __( 'Star' ), value: 'starSticker' },
                                    ] }
                                    onChange={ (value) => setAttributes( { playButtonIcon: value } ) }
                                />
                                <RangeControl
                                    label={ __( 'Play Button Size' ) }
                                    value={ playButtonSize }
                                    min={ 40 }
                                    max={ 200 }
                                    onChange={ (value) => setAttributes( { playButtonSize: value } ) }
                                />
                                <PanelColor title={ __( 'Play Button Color' ) } colorValue={ playButtonColor } initialOpen={ false }>
                                    <ColorPalette
                                        value={ playButtonColor }
                                        onChange={ (value) => setAttributes( { playButtonColor: value } ) }
                                    />
                                </PanelColor>
                            </PanelBody>
                        }
                    </PanelBody>
                </InspectorControls>
                <div className={ blockClassName } style={ { width: videoWidth } }>
                    <div className={ 'advgb-video-wrapper' } style={ { backgroundColor: overlayColor } }>
                        <div className={ 'advgb-video-poster' } style={ { backgroundImage: `url(${poster})` } }/>
                        <div className={ 'advgb-button-wrapper' } style={ { height: videoHeight } }>
                            {!poster &&
                                <MediaUpload
                                    onSelect={ (media) => setAttributes( { poster: media.url, posterID: media.id } ) }
                                    value={ posterID }
                                    type="image"
                                    render={ ( { open } ) => (
                                        <Button
                                            className={ 'button button-large' }
                                            onClick={ open }
                                        >
                                            { __( 'Choose poster' ) }
                                        </Button>
                                    ) }
                                />
                            }
                            <div className={ 'advgb-play-button' }>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     width={ playButtonSize }
                                     height={ playButtonSize }
                                     fill={ playButtonColor }
                                     viewBox="0 0 24 24"
                                >
                                    {PLAY_BUTTON_STYLE[playButtonIcon]}
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className={ 'advgb-video-input' }>
                        123
                    </div>
                </div>
            </Fragment>
        )
    }
}

const advVideoBlockIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="2 2 22 22">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
    </svg>
);

registerBlockType( 'advgb/video', {
    title: __( 'Advanced Video' ),
    description: __( 'Powerful block for insert and embed video.' ),
    icon: advVideoBlockIcon,
    category: 'common',
    keywords: [ __( 'video' ), __( 'embed' ), __( 'media' ) ],
    attributes: {
        videoURL: {
            type: 'string',
        },
        videoFullWidth: {
            type: 'boolean',
            default: true,
        },
        videoWidth: {
            type: 'number',
        },
        videoHeight: {
            type: 'number',
        },
        playButtonIcon: {
            type: 'string',
            default: 'normal'
        },
        playButtonSize: {
            type: 'number',
            default: 40,
        },
        playButtonColor: {
            type: 'string',
            default: '#fff',
        },
        overlayColor: {
            type: 'string',
            default: '#2196f3',
        },
        poster: {
            type: 'string',
        },
        posterID: {
            type: 'number',
        },
        openInLightbox: {
            type: 'boolean',
            default: true,
        }
    },
    edit: AdvVideo,
    save: function ( { attributes } ) {
        return null;
    }
} );