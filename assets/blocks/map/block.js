"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __ = wp.i18n.__;
var _wp$element = wp.element,
    Component = _wp$element.Component,
    Fragment = _wp$element.Fragment;
var registerBlockType = wp.blocks.registerBlockType;
var _wp$editor = wp.editor,
    InspectorControls = _wp$editor.InspectorControls,
    BlockControls = _wp$editor.BlockControls,
    RichText = _wp$editor.RichText,
    MediaUpload = _wp$editor.MediaUpload;
var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    TextControl = _wp$components.TextControl,
    TextareaControl = _wp$components.TextareaControl,
    RangeControl = _wp$components.RangeControl,
    BaseControl = _wp$components.BaseControl,
    Button = _wp$components.Button,
    Placeholder = _wp$components.Placeholder;


var mapBlockIcon = React.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", width: "22", height: "22", viewBox: "2 2 22 22" },
    React.createElement("path", { d: "M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" }),
    React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" })
);

var mapWillUpdate = null;
var advgbMapError = false;

// Catch google map error
function gm_authFailure() {
    advgbMapError = true;
}

var AdvMap = function (_Component) {
    _inherits(AdvMap, _Component);

    function AdvMap() {
        _classCallCheck(this, AdvMap);

        var _this = _possibleConstructorReturn(this, (AdvMap.__proto__ || Object.getPrototypeOf(AdvMap)).apply(this, arguments));

        _this.state = {
            stillTyping: false
        };

        _this.initMap = _this.initMap.bind(_this);
        return _this;
    }

    _createClass(AdvMap, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var _props = this.props,
                attributes = _props.attributes,
                setAttributes = _props.setAttributes,
                id = _props.id;


            if (!attributes.mapID) {
                setAttributes({ mapID: 'advgbmap-' + id });
            }
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.initMap();
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            clearTimeout(mapWillUpdate);
            mapWillUpdate = setTimeout(this.initMap, 1000);
        }
    }, {
        key: "initMap",
        value: function initMap() {
            if (typeof google === "undefined" || !this.props.attributes.mapID || advgbMapError) return null;

            var DEFAULT_MARKER = 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png';
            var _props$attributes = this.props.attributes,
                mapID = _props$attributes.mapID,
                lat = _props$attributes.lat,
                lng = _props$attributes.lng,
                zoom = _props$attributes.zoom,
                markerTitle = _props$attributes.markerTitle,
                markerIcon = _props$attributes.markerIcon,
                markerDesc = _props$attributes.markerDesc;

            var location = { lat: parseFloat(lat), lng: parseFloat(lng) };

            var map = new google.maps.Map(document.getElementById(mapID), {
                zoom: zoom,
                center: location
            });

            var infoWindow = new google.maps.InfoWindow({
                content: "<div class=\"advgbmap-wrapper\">\n                <h2 class=\"advgbmap-title\">" + markerTitle + "</h2>\n                <p class=\"advgbmap-desc\">" + (markerDesc || '') + "</p>\n            </div>"
            });

            var marker = new google.maps.Marker({
                position: location,
                map: map,
                title: markerTitle,
                animation: google.maps.Animation.DROP,
                icon: {
                    url: markerIcon || DEFAULT_MARKER,
                    scaledSize: new google.maps.Size(27, 43)
                }
            });

            if (!!markerTitle) {
                marker.addListener('click', function () {
                    infoWindow.open(map, marker);
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _props2 = this.props,
                attributes = _props2.attributes,
                setAttributes = _props2.setAttributes;
            var mapID = attributes.mapID,
                lat = attributes.lat,
                lng = attributes.lng,
                zoom = attributes.zoom,
                height = attributes.height,
                markerIcon = attributes.markerIcon,
                markerIconID = attributes.markerIconID,
                markerTitle = attributes.markerTitle,
                markerDesc = attributes.markerDesc;


            return React.createElement(
                Fragment,
                null,
                typeof google !== 'undefined' && React.createElement(
                    InspectorControls,
                    null,
                    React.createElement(
                        PanelBody,
                        { title: __('Map settings') },
                        React.createElement(TextControl, {
                            label: __('Location'),
                            value: lat,
                            placeholder: __('Enter latitude…'),
                            onChange: function onChange(value) {
                                return setAttributes({ lat: value });
                            }
                        }),
                        React.createElement(TextControl, {
                            value: lng,
                            placeholder: __('Enter longitude…'),
                            onChange: function onChange(value) {
                                return setAttributes({ lng: value });
                            }
                        }),
                        React.createElement(RangeControl, {
                            label: __('Zoom level'),
                            value: zoom,
                            min: 0,
                            max: 25,
                            onChange: function onChange(value) {
                                return setAttributes({ zoom: value });
                            }
                        }),
                        React.createElement(RangeControl, {
                            label: __('Height'),
                            value: height,
                            min: 300,
                            max: 1000,
                            onChange: function onChange(value) {
                                return setAttributes({ height: value });
                            }
                        }),
                        React.createElement(MediaUpload, {
                            type: "image",
                            value: markerIconID,
                            onSelect: function onSelect(image) {
                                return setAttributes({ markerIcon: image.sizes.thumbnail.url, markerIconID: image.id });
                            },
                            render: function render(_ref) {
                                var open = _ref.open;

                                return React.createElement(
                                    BaseControl,
                                    { label: [__('Marker Icon'), markerIcon && React.createElement(
                                            "a",
                                            { key: "marker-icon-remove",
                                                style: { marginLeft: '10px' },
                                                onClick: function onClick() {
                                                    return setAttributes({
                                                        markerIcon: undefined,
                                                        markerIconID: undefined
                                                    });
                                                }
                                            },
                                            __('Remove')
                                        )]
                                    },
                                    React.createElement(
                                        Button,
                                        { className: 'button button-large',
                                            onClick: open
                                        },
                                        __('Choose icon')
                                    ),
                                    !!markerIcon && React.createElement("img", { style: { maxHeight: '30px', marginLeft: '10px' },
                                        src: markerIcon,
                                        alt: __('Marker icon') })
                                );
                            }
                        }),
                        React.createElement(TextControl, {
                            label: __('Marker Title'),
                            value: markerTitle,
                            placeholder: __('Enter custom title…'),
                            onChange: function onChange(value) {
                                return setAttributes({ markerTitle: value });
                            }
                        }),
                        React.createElement(TextareaControl, {
                            label: __('Marker description'),
                            value: markerDesc,
                            placeholder: __('Enter custom description…'),
                            onChange: function onChange(value) {
                                return setAttributes({ markerDesc: value });
                            }
                        })
                    )
                ),
                typeof google !== 'undefined' ? React.createElement(
                    "div",
                    { className: 'advgb-map-block' },
                    React.createElement("div", { className: 'advgb-map-content', id: mapID, style: { height: height } })
                ) : React.createElement(
                    Placeholder,
                    {
                        icon: mapBlockIcon,
                        label: __('No API Key Provided!'),
                        instructions: __('Opps! Look like you have not configured your Google API Key yet. ' + 'Add an API Key and refresh the page to start using Map Block. ' + 'This is a requirement enforced by Google.')
                    },
                    React.createElement(
                        "a",
                        { target: "_blank",
                            className: "button button-large",
                            href: wpApiSettings.schema.home + '/wp-admin/options-general.php?page=advgb_settings'
                        },
                        __('Add Google API Key')
                    )
                )
            );
        }
    }]);

    return AdvMap;
}(Component);

registerBlockType('advgb/map', {
    title: __('Map'),
    description: __('Block for inserting location map.'),
    icon: mapBlockIcon,
    category: 'common',
    keywords: [__('google map'), __('location'), __('address')],
    attributes: {
        mapID: {
            type: 'string'
        },
        lat: {
            type: 'string',
            default: '48.858370'
        },
        lng: {
            type: 'string',
            default: '2.294471'
        },
        zoom: {
            type: 'number',
            default: 15
        },
        height: {
            type: 'number',
            default: 350
        },
        markerIcon: {
            type: 'string'
        },
        markerIconID: {
            type: 'number'
        },
        markerTitle: {
            type: 'string',
            default: __('Eiffel Tower')
        },
        markerDesc: {
            type: 'string'
        }
    },
    edit: AdvMap,
    save: function save(_ref2) {
        var attributes = _ref2.attributes;
        var mapID = attributes.mapID,
            lat = attributes.lat,
            lng = attributes.lng,
            zoom = attributes.zoom,
            height = attributes.height,
            markerIcon = attributes.markerIcon,
            markerTitle = attributes.markerTitle,
            markerDesc = attributes.markerDesc;


        var DEFAULT_MARKER = 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png';
        var infoWindowHtml = "<div class=\"advgbmap-wrapper\"><h2 class=\"advgbmap-title\">" + markerTitle + "</h2><p class=\"advgbmap-desc\">" + (markerDesc || '') + "</p></div>";

        return React.createElement(
            "div",
            { className: 'advgb-map-block', style: { margin: '10px auto' } },
            React.createElement("div", { className: 'advgb-map-content', id: mapID, style: { height: height } }),
            React.createElement(
                "script",
                { "typeof": "text/javascript" },
                "window.addEventListener('load', function() {\n                        if (typeof google === \"undefined\") return null;\n                        var location = {\n                            lat: parseFloat(" + lat + "),\n                            lng: parseFloat(" + lng + ")\n                        };\n\n                        var map = new google.maps.Map(document.getElementById('" + mapID + "'), {\n                            zoom: " + zoom + ",\n                            center: location,\n                        });\n\n                        var infoWindow = new google.maps.InfoWindow({\n                            content: '" + infoWindowHtml + "'\n                        });\n\n                        var marker = new google.maps.Marker({\n                            position: location,\n                            map: map,\n                            title: '" + markerTitle + "',\n                            animation: google.maps.Animation.DROP,\n                            icon: {\n                                url: '" + (markerIcon || DEFAULT_MARKER) + "',\n                                scaledSize: new google.maps.Size(27, 43),\n                            },\n                        });\n\n                        " + (markerTitle && "marker.addListener('click', function() {\n                            infoWindow.open(map, marker);\n                        });") + "\n                    })"
            )
        );
    }
});
