const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { InspectorControls, BlockControls, RichText, MediaUpload } = wp.editor;
const { PanelBody, TextControl, TextareaControl, RangeControl, BaseControl, Button, Placeholder } = wp.components;

const mapBlockIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="2 2 22 22">
        <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
);

let mapWillUpdate = null;
let advgbMapError = false;

// Catch google map error
function gm_authFailure() {
    advgbMapError = true;
}

class AdvMap extends Component {
    constructor() {
        super( ...arguments );
        this.state = {
            stillTyping: false,
        };

        this.initMap = this.initMap.bind(this);
    }

    componentWillMount() {
        const { attributes, setAttributes, id } = this.props;

        if (!attributes.mapID) {
            setAttributes( { mapID: 'advgbmap-' + id } );
        }
    }

    componentDidMount() {
        this.initMap();
    }

    componentDidUpdate() {
        clearTimeout(mapWillUpdate);
        mapWillUpdate = setTimeout(this.initMap, 1000);
    }

    initMap() {
        if (typeof google === "undefined" || !this.props.attributes.mapID || advgbMapError)
            return null;

        const DEFAULT_MARKER = 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png';
        const { mapID, lat, lng, zoom, markerTitle, markerIcon, markerDesc } = this.props.attributes;
        const location = { lat: parseFloat(lat), lng: parseFloat(lng) };

        const map = new google.maps.Map(document.getElementById(mapID), {
            zoom: zoom,
            center: location,
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `<div class="advgbmap-wrapper">
                <h2 class="advgbmap-title">${markerTitle}</h2>
                <p class="advgbmap-desc">${markerDesc || ''}</p>
            </div>`
        });

        const marker = new google.maps.Marker({
            position: location,
            map: map,
            title: markerTitle,
            animation: google.maps.Animation.DROP,
            icon: {
                url: markerIcon || DEFAULT_MARKER,
                scaledSize: new google.maps.Size( 27, 43 ),
            },
        });

        if (!!markerTitle) {
            marker.addListener('click', function() {
                infoWindow.open(map, marker);
            });
        }
    }

    render() {
        const { attributes, setAttributes } = this.props;
        const {
            mapID,
            lat,
            lng,
            zoom,
            height,
            markerIcon,
            markerIconID,
            markerTitle,
            markerDesc,
        } = attributes;

        return (
            <Fragment>
                {typeof google !== 'undefined' &&
                    <InspectorControls>
                        <PanelBody title={ __( 'Map settings' ) }>
                            <TextControl
                                label={ __( 'Location' ) }
                                value={ lat }
                                placeholder={ __( 'Enter latitude…' ) }
                                onChange={ (value) => setAttributes( { lat: value } ) }
                            />
                            <TextControl
                                value={ lng }
                                placeholder={ __( 'Enter longitude…' ) }
                                onChange={ (value) => setAttributes( { lng: value } ) }
                            />
                            <RangeControl
                                label={ __( 'Zoom level' ) }
                                value={ zoom }
                                min={ 0 }
                                max={ 25 }
                                onChange={ (value) => setAttributes( { zoom: value } ) }
                            />
                            <RangeControl
                                label={ __( 'Height' ) }
                                value={ height }
                                min={ 300 }
                                max={ 1000 }
                                onChange={ (value) => setAttributes( { height: value } ) }
                            />
                            <MediaUpload
                                type="image"
                                value={ markerIconID }
                                onSelect={ (image) => setAttributes( { markerIcon: image.sizes.thumbnail.url, markerIconID: image.id } ) }
                                render={ ( { open } ) => {
                                    return (
                                        <BaseControl label={ [
                                            __( 'Marker Icon' ),
                                            markerIcon && (
                                                <a key="marker-icon-remove"
                                                   style={ { marginLeft: '10px' } }
                                                   onClick={ () => setAttributes( {
                                                       markerIcon: undefined,
                                                       markerIconID: undefined,
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
                                                { __( 'Choose icon' ) }
                                            </Button>
                                            { !!markerIcon &&
                                            <img style={ { maxHeight: '30px', marginLeft: '10px' } }
                                                 src={ markerIcon }
                                                 alt={ __( 'Marker icon' ) }/>
                                            }
                                        </BaseControl>
                                    )
                                } }
                            />
                            <TextControl
                                label={ __( 'Marker Title' ) }
                                value={ markerTitle }
                                placeholder={ __( 'Enter custom title…' ) }
                                onChange={ (value) => setAttributes( { markerTitle: value } ) }
                            />
                            <TextareaControl
                                label={ __( 'Marker description' ) }
                                value={ markerDesc }
                                placeholder={ __( 'Enter custom description…' ) }
                                onChange={ (value) => setAttributes( { markerDesc: value } ) }
                            />
                        </PanelBody>
                    </InspectorControls>
                }
                {typeof google !== 'undefined' ?
                    <div className={ 'advgb-map-block' }>
                        <div className={ 'advgb-map-content' } id={ mapID } style={ { height: height } }/>
                    </div>
                    :
                    <Placeholder
                        icon={ mapBlockIcon }
                        label={ __( 'No API Key Provided!' ) }
                        instructions={ __( 'Opps! Look like you have not configured your Google API Key yet. ' +
                            'Add an API Key and refresh the page to start using Map Block. ' +
                            'This is a requirement enforced by Google.' ) }
                    >
                        <a target="_blank"
                           className="button button-large"
                           href={wpApiSettings.schema.home + '/wp-admin/options-general.php?page=advgb_settings'}
                        >
                            { __( 'Add Google API Key' ) }
                        </a>
                    </Placeholder>
                }
            </Fragment>
        )
    }
}

registerBlockType( 'advgb/map', {
    title: __( 'Map' ),
    description: __( 'Block for inserting location map.' ),
    icon: mapBlockIcon,
    category: 'common',
    keywords: [ __( 'google map' ), __( 'location' ), __( 'address' ) ],
    attributes: {
        mapID: {
            type: 'string',
        },
        lat: {
            type: 'string',
            default: '48.858370',
        },
        lng: {
            type: 'string',
            default: '2.294471',
        },
        zoom: {
            type: 'number',
            default: 15,
        },
        height: {
            type: 'number',
            default: 350,
        },
        markerIcon: {
            type: 'string',
        },
        markerIconID: {
            type: 'number',
        },
        markerTitle: {
            type: 'string',
            default: __( 'Eiffel Tower' ),
        },
        markerDesc: {
            type: 'string',
        },
    },
    edit: AdvMap,
    save: function ( { attributes } ) {
        const {
            mapID,
            lat,
            lng,
            zoom,
            height,
            markerIcon,
            markerTitle,
            markerDesc,
        } = attributes;

        const DEFAULT_MARKER = 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png';
        const infoWindowHtml = `<div class="advgbmap-wrapper"><h2 class="advgbmap-title">${markerTitle}</h2><p class="advgbmap-desc">${markerDesc || ''}</p></div>`;

        return (
            <div className={ 'advgb-map-block' } style={ { margin: '10px auto' } }>
                <div className={ 'advgb-map-content' } id={ mapID } style={ { height: height } }/>
                <script typeof="text/javascript">
                    {`window.addEventListener( 'load', function() {
                        if (typeof google === "undefined") return null;
                        var location = { lat: parseFloat(${lat}), lng: parseFloat(${lng}) };

                        var map = new google.maps.Map(document.getElementById('${mapID}'), {
                            zoom: ${zoom},
                            center: location,
                        });

                        var infoWindow = new google.maps.InfoWindow({
                            content: '${infoWindowHtml}'
                        });

                        var marker = new google.maps.Marker({
                            position: location,
                            map: map,
                            title: '${markerTitle}',
                            animation: google.maps.Animation.DROP,
                            icon: {
                                url: '${markerIcon || DEFAULT_MARKER}',
                                scaledSize: new google.maps.Size( 27, 43 ),
                            },
                        });

                        ${markerTitle &&
                        `marker.addListener('click', function() {
                            infoWindow.open(map, marker);
                        });`}
                    })`}
                </script>
            </div>
        );
    }
} );