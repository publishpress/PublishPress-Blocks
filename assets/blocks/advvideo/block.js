"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __ = wp.i18n.__;
var _wp$element = wp.element,
    Component = _wp$element.Component,
    Fragment = _wp$element.Fragment;
var _wp$blocks = wp.blocks,
    registerBlockType = _wp$blocks.registerBlockType,
    InspectorControls = _wp$blocks.InspectorControls,
    BlockControls = _wp$blocks.BlockControls,
    RichText = _wp$blocks.RichText,
    ColorPalette = _wp$blocks.ColorPalette,
    MediaUpload = _wp$blocks.MediaUpload;
var _wp$components = wp.components,
    RangeControl = _wp$components.RangeControl,
    PanelBody = _wp$components.PanelBody,
    PanelColor = _wp$components.PanelColor,
    ToggleControl = _wp$components.ToggleControl,
    SelectControl = _wp$components.SelectControl,
    Button = _wp$components.Button,
    IconButton = _wp$components.IconButton;

var AdvVideo = function (_Component) {
    _inherits(AdvVideo, _Component);

    function AdvVideo() {
        _classCallCheck(this, AdvVideo);

        return _possibleConstructorReturn(this, (AdvVideo.__proto__ || Object.getPrototypeOf(AdvVideo)).apply(this, arguments));
    }

    _createClass(AdvVideo, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                isSelected = _props.isSelected,
                attributes = _props.attributes,
                setAttributes = _props.setAttributes;
            var videoURL = attributes.videoURL,
                videoFullWidth = attributes.videoFullWidth,
                videoWidth = attributes.videoWidth,
                videoHeight = attributes.videoHeight,
                playButtonIcon = attributes.playButtonIcon,
                playButtonSize = attributes.playButtonSize,
                playButtonColor = attributes.playButtonColor,
                overlayColor = attributes.overlayColor,
                poster = attributes.poster,
                posterID = attributes.posterID,
                openInLightbox = attributes.openInLightbox;


            var PLAY_BUTTON_STYLE = {
                normal: [React.createElement("path", { d: "M8 5v14l11-7z", key: "x" }), React.createElement("path", { d: "M0 0h24v24H0z", fill: "none", key: "y" })],
                circleFill: [React.createElement("path", { d: "M0 0h24v24H0z", fill: "none", key: "x" }), React.createElement("path", { key: "y", d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" })],
                circleOutline: [React.createElement("path", { d: "M0 0h24v24H0z", fill: "none", key: "x" }), React.createElement("path", { key: "y", d: "M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" })],
                videoCam: [React.createElement("path", { d: "M0 0h24v24H0z", fill: "none", key: "x" }), React.createElement("path", { key: "y", d: "M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" })],
                squareCurved: [React.createElement("path", { key: "x", d: "M20 8H4V6h16v2zm-2-6H6v2h12V2zm4 10v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-6 4l-6-3.27v6.53L16 16z" }), React.createElement("path", { key: "y", fill: "none", d: "M0 0h24v24H0z" })],
                starSticker: [React.createElement("path", { key: "x", d: "M0 0h24v24H0z", fill: "none" }), React.createElement("path", { key: "x", d: "M20 12c0-1.1.9-2 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2zm-4.42 4.8L12 14.5l-3.58 2.3 1.08-4.12-3.29-2.69 4.24-.25L12 5.8l1.54 3.95 4.24.25-3.29 2.69 1.09 4.11z" })]
            };

            var blockClassName = ['advgb-video-block', !!videoFullWidth && 'full-width', !!openInLightbox && !!videoURL && 'advgb-video-lightbox'].filter(Boolean).join(' ');

            return React.createElement(
                Fragment,
                null,
                !!poster && React.createElement(
                    BlockControls,
                    null,
                    React.createElement(MediaUpload, {
                        type: 'image',
                        value: posterID,
                        onSelect: function onSelect(image) {
                            return setAttributes({ poster: image.url, posterID: image.id });
                        },
                        render: function render(_ref) {
                            var open = _ref.open;
                            return React.createElement(IconButton, {
                                className: "components-toolbar__control",
                                label: __('Change poster'),
                                icon: 'edit',
                                onClick: open
                            });
                        }
                    }),
                    React.createElement(IconButton, {
                        className: "components-toolbar__control",
                        label: __('Remove poster'),
                        icon: 'no',
                        onClick: function onClick() {
                            return setAttributes({ poster: undefined, posterID: undefined });
                        }
                    })
                ),
                React.createElement(
                    InspectorControls,
                    null,
                    React.createElement(
                        PanelBody,
                        { title: __('Advanced Video Settings') },
                        React.createElement(ToggleControl, {
                            label: __('Open video in light box'),
                            help: __('We highly recommend to keep video open in light box to use all of blocks features!'),
                            checked: openInLightbox,
                            onChange: function onChange() {
                                return setAttributes({ openInLightbox: !openInLightbox });
                            }
                        }),
                        React.createElement(ToggleControl, {
                            label: __('Full width'),
                            checked: videoFullWidth,
                            onChange: function onChange() {
                                return setAttributes({ videoFullWidth: !videoFullWidth });
                            }
                        }),
                        !videoFullWidth && React.createElement(RangeControl, {
                            label: __('Video width'),
                            value: videoWidth,
                            min: 100,
                            max: 1000,
                            onChange: function onChange(value) {
                                return setAttributes({ videoWidth: value });
                            }
                        }),
                        React.createElement(RangeControl, {
                            label: __('Video height'),
                            value: videoHeight,
                            min: 300,
                            max: 700,
                            onChange: function onChange(value) {
                                return setAttributes({ videoHeight: value });
                            }
                        }),
                        !!openInLightbox && React.createElement(
                            PanelColor,
                            { title: __('Overlay Color'), colorValue: overlayColor, initialOpen: false },
                            React.createElement(ColorPalette, {
                                value: overlayColor,
                                onChange: function onChange(value) {
                                    return setAttributes({ overlayColor: value });
                                }
                            })
                        ),
                        !!openInLightbox && React.createElement(
                            PanelBody,
                            { title: __('Play Button') },
                            React.createElement(SelectControl, {
                                label: __('Play Button Icon'),
                                value: playButtonIcon,
                                options: [{ label: __('Normal'), value: 'normal' }, { label: __('Circle'), value: 'circleFill' }, { label: __('Outline Circle'), value: 'circleOutline' }, { label: __('Video Camera'), value: 'videoCam' }, { label: __('Square Curved'), value: 'squareCurved' }, { label: __('Star'), value: 'starSticker' }],
                                onChange: function onChange(value) {
                                    return setAttributes({ playButtonIcon: value });
                                }
                            }),
                            React.createElement(RangeControl, {
                                label: __('Play Button Size'),
                                value: playButtonSize,
                                min: 40,
                                max: 200,
                                onChange: function onChange(value) {
                                    return setAttributes({ playButtonSize: value });
                                }
                            }),
                            React.createElement(
                                PanelColor,
                                { title: __('Play Button Color'), colorValue: playButtonColor, initialOpen: false },
                                React.createElement(ColorPalette, {
                                    value: playButtonColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ playButtonColor: value });
                                    }
                                })
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: blockClassName, style: { width: videoWidth } },
                    React.createElement(
                        "div",
                        { className: 'advgb-video-wrapper', style: { backgroundColor: overlayColor } },
                        React.createElement("div", { className: 'advgb-video-poster', style: { backgroundImage: "url(" + poster + ")" } }),
                        React.createElement(
                            "div",
                            { className: 'advgb-button-wrapper', style: { height: videoHeight } },
                            !poster && React.createElement(MediaUpload, {
                                onSelect: function onSelect(media) {
                                    return setAttributes({ poster: media.url, posterID: media.id });
                                },
                                value: posterID,
                                type: "image",
                                render: function render(_ref2) {
                                    var open = _ref2.open;
                                    return React.createElement(
                                        Button,
                                        {
                                            className: 'button button-large',
                                            onClick: open
                                        },
                                        __('Choose poster')
                                    );
                                }
                            }),
                            React.createElement(
                                "div",
                                { className: 'advgb-play-button' },
                                React.createElement(
                                    "svg",
                                    { xmlns: "http://www.w3.org/2000/svg",
                                        width: playButtonSize,
                                        height: playButtonSize,
                                        fill: playButtonColor,
                                        viewBox: "0 0 24 24"
                                    },
                                    PLAY_BUTTON_STYLE[playButtonIcon]
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: 'advgb-video-input' },
                        "123"
                    )
                )
            );
        }
    }]);

    return AdvVideo;
}(Component);

var advVideoBlockIcon = React.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "2 2 22 22" },
    React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" }),
    React.createElement("path", { d: "M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" })
);

registerBlockType('advgb/video', {
    title: __('Advanced Video'),
    description: __('Powerful block for insert and embed video.'),
    icon: advVideoBlockIcon,
    category: 'common',
    keywords: [__('video'), __('embed'), __('media')],
    attributes: {
        videoURL: {
            type: 'string'
        },
        videoFullWidth: {
            type: 'boolean',
            default: true
        },
        videoWidth: {
            type: 'number'
        },
        videoHeight: {
            type: 'number'
        },
        playButtonIcon: {
            type: 'string',
            default: 'normal'
        },
        playButtonSize: {
            type: 'number',
            default: 40
        },
        playButtonColor: {
            type: 'string',
            default: '#fff'
        },
        overlayColor: {
            type: 'string',
            default: '#2196f3'
        },
        poster: {
            type: 'string'
        },
        posterID: {
            type: 'number'
        },
        openInLightbox: {
            type: 'boolean',
            default: true
        }
    },
    edit: AdvVideo,
    save: function save(_ref3) {
        var attributes = _ref3.attributes;

        return null;
    }
});
