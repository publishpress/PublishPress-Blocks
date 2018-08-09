"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function (wpI18n, wpBlocks, wpElement, wpEditor, wpComponents) {
    var __ = wpI18n.__;
    var Component = wpElement.Component,
        Fragment = wpElement.Fragment;
    var registerBlockType = wpBlocks.registerBlockType;
    var InspectorControls = wpEditor.InspectorControls,
        BlockControls = wpEditor.BlockControls,
        ColorPalette = wpEditor.ColorPalette,
        MediaUpload = wpEditor.MediaUpload;
    var RangeControl = wpComponents.RangeControl,
        PanelBody = wpComponents.PanelBody,
        PanelColor = wpComponents.PanelColor,
        ToggleControl = wpComponents.ToggleControl,
        BaseControl = wpComponents.BaseControl,
        TextControl = wpComponents.TextControl,
        Button = wpComponents.Button,
        IconButton = wpComponents.IconButton,
        Dashicon = wpComponents.Dashicon,
        Spinner = wpComponents.Spinner,
        Toolbar = wpComponents.Toolbar;


    var PLAY_BUTTON_STYLE = {
        normal: [React.createElement("path", { key: "x", d: "M8 5v14l11-7z" }), React.createElement("path", { key: "y", d: "M0 0h24v24H0z", fill: "none" })],
        circleFill: [React.createElement("path", { key: "x", d: "M0 0h24v24H0z", fill: "none" }), React.createElement("path", { key: "y", d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" })],
        circleOutline: [React.createElement("path", { key: "x", d: "M0 0h24v24H0z", fill: "none" }), React.createElement("path", { key: "y", d: "M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" })],
        videoCam: [React.createElement("path", { key: "x", d: "M0 0h24v24H0z", fill: "none" }), React.createElement("path", { key: "y", d: "M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" })],
        squareCurved: [React.createElement("path", { key: "x", d: "M20 8H4V6h16v2zm-2-6H6v2h12V2zm4 10v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-6 4l-6-3.27v6.53L16 16z" }), React.createElement("path", { key: "y", fill: "none", d: "M0 0h24v24H0z" })],
        starSticker: [React.createElement("path", { key: "x", d: "M0 0h24v24H0z", fill: "none" }), React.createElement("path", { key: "y", d: "M20 12c0-1.1.9-2 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2zm-4.42 4.8L12 14.5l-3.58 2.3 1.08-4.12-3.29-2.69 4.24-.25L12 5.8l1.54 3.95 4.24.25-3.29 2.69 1.09 4.11z" })]
    };

    var AdvVideo = function (_Component) {
        _inherits(AdvVideo, _Component);

        function AdvVideo() {
            _classCallCheck(this, AdvVideo);

            var _this = _possibleConstructorReturn(this, (AdvVideo.__proto__ || Object.getPrototypeOf(AdvVideo)).apply(this, arguments));

            _this.state = {
                fetching: false
            };

            _this.fetchVideoInfo = _this.fetchVideoInfo.bind(_this);
            return _this;
        }

        _createClass(AdvVideo, [{
            key: "componentWillMount",
            value: function componentWillMount() {
                var _props = this.props,
                    attributes = _props.attributes,
                    setAttributes = _props.setAttributes;

                var currentBlockConfig = advgbDefaultConfig['advgb-video'];

                // No override attributes of blocks inserted before
                if (attributes.changed !== true) {
                    if (currentBlockConfig !== undefined && (typeof currentBlockConfig === "undefined" ? "undefined" : _typeof(currentBlockConfig)) === 'object') {
                        Object.keys(currentBlockConfig).map(function (attribute) {
                            attributes[attribute] = currentBlockConfig[attribute];
                        });

                        // Finally set changed attribute to true, so we don't modify anything again
                        setAttributes({ changed: true });
                    }
                }
            }
        }, {
            key: "fetchVideoInfo",
            value: function fetchVideoInfo() {
                var _this2 = this;

                var _props2 = this.props,
                    attributes = _props2.attributes,
                    setAttributes = _props2.setAttributes;
                var videoID = attributes.videoID,
                    poster = attributes.poster;

                var realID = videoID;

                if (!!videoID) {
                    this.setState({ fetching: true });

                    var url = '';
                    if (videoID.match(/^\d+$/g)) {
                        url = "https://vimeo.com/" + videoID;
                    } else {
                        url = "https://www.youtube.com/watch?v=" + videoID;
                    }

                    if (videoID.indexOf('http') > -1) {
                        url = videoID;
                    }

                    if (videoID.match(/youtube.com/)) {
                        realID = videoID.split('v=');
                        realID = realID[1];
                    } else if (videoID.match(/youtu.be|vimeo.com/)) {
                        realID = videoID.split('/');
                        realID = realID[realID.length - 1];
                    }

                    if (realID.indexOf('&') > -1) realID = realID.substring(0, realID.indexOf('&'));

                    wp.apiRequest({ path: "/oembed/1.0/proxy&url=" + encodeURIComponent(url) }).then(function (obj) {
                        _this2.setState({ fetching: false });
                        if (!!obj.title && !!obj.provider_name) {
                            setAttributes({
                                videoTitle: obj.title,
                                poster: poster ? poster : obj.thumbnail_url
                            });

                            switch (obj.provider_name) {
                                case 'YouTube':
                                    setAttributes({
                                        videoSourceType: 'youtube',
                                        videoURL: "https://www.youtube.com/embed/" + realID + "?rel=0&wmode=transparent"
                                    });
                                    break;
                                case 'Vimeo':
                                    setAttributes({
                                        videoSourceType: 'vimeo',
                                        videoURL: "https://player.vimeo.com/video/" + realID
                                    });
                                    break;
                                default:
                                    break;
                            }
                        } else {
                            setAttributes({
                                videoTitle: 'ADVGB_FAIL_TO_LOAD',
                                poster: ''
                            });
                        }
                    });
                }
            }
        }, {
            key: "render",
            value: function render() {
                var _props3 = this.props,
                    isSelected = _props3.isSelected,
                    attributes = _props3.attributes,
                    setAttributes = _props3.setAttributes;
                var videoURL = attributes.videoURL,
                    videoID = attributes.videoID,
                    videoSourceType = attributes.videoSourceType,
                    videoTitle = attributes.videoTitle,
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


                var blockClassName = ['advgb-video-block', !!videoFullWidth && 'full-width', !!openInLightbox && !!videoURL && 'advgb-video-lightbox'].filter(Boolean).join(' ');

                var videoHostIcon = {
                    youtube: React.createElement(
                        "svg",
                        { id: "Social_Icons", version: "1.1", viewBox: "0 0 128 128", xmlns: "http://www.w3.org/2000/svg" },
                        React.createElement(
                            "g",
                            { id: "_x34__stroke" },
                            React.createElement(
                                "g",
                                { id: "Youtube_1_" },
                                React.createElement("rect", { clipRule: "evenodd", fill: "none", height: "128", width: "128" }),
                                React.createElement("path", { clipRule: "evenodd", d: "M126.72,38.224c0,0-1.252-8.883-5.088-12.794    c-4.868-5.136-10.324-5.16-12.824-5.458c-17.912-1.305-44.78-1.305-44.78-1.305h-0.056c0,0-26.868,0-44.78,1.305    c-2.504,0.298-7.956,0.322-12.828,5.458C2.528,29.342,1.28,38.224,1.28,38.224S0,48.658,0,59.087v9.781    c0,10.433,1.28,20.863,1.28,20.863s1.248,8.883,5.084,12.794c4.872,5.136,11.268,4.975,14.116,5.511    c10.24,0.991,43.52,1.297,43.52,1.297s26.896-0.04,44.808-1.345c2.5-0.302,7.956-0.326,12.824-5.462    c3.836-3.912,5.088-12.794,5.088-12.794S128,79.302,128,68.868v-9.781C128,48.658,126.72,38.224,126.72,38.224z M50.784,80.72    L50.78,44.501l34.584,18.172L50.784,80.72z", fill: "#CE1312", fillRule: "evenodd", id: "Youtube" })
                            )
                        )
                    ),
                    vimeo: React.createElement(
                        "svg",
                        { height: "25", viewBox: "0 0 32 32", width: "25", xmlns: "http://www.w3.org/2000/svg" },
                        React.createElement(
                            "g",
                            null,
                            React.createElement("circle", { cx: "16", cy: "16", id: "BG", r: "16", fill: "#5FCCFF" }),
                            React.createElement("path", { d: "M24,12.4c-0.1,1.6-1.2,3.7-3.3,6.4c-2.2,2.8-4,4.2-5.5,4.2        c-0.9,0-1.7-0.9-2.4-2.6c-0.4-1.6-0.9-3.2-1.3-4.7c-0.5-1.7-1-2.6-1.5-2.6c-0.1,0-0.5,0.3-1.3,0.8l-0.8-1        c0.8-0.7,1.6-1.4,2.3-2.1c1.1-0.9,1.8-1.4,2.4-1.4c1.2-0.1,2,0.7,2.3,2.5c0.3,2,0.5,3.2,0.6,3.7c0.4,1.6,0.8,2.4,1.2,2.4        c0.3,0,0.8-0.5,1.5-1.6c0.7-1.1,1-1.9,1.1-2.4c0.1-0.9-0.3-1.4-1.1-1.4c-0.4,0-0.8,0.1-1.2,0.3c0.8-2.6,2.3-3.8,4.5-3.7        C23.3,9.2,24.1,10.3,24,12.4", id: "Vimeo", fill: "#FFFFFF" })
                        )
                    ),
                    local: React.createElement(
                        "svg",
                        { height: "25", id: "Layer_1", version: "1.1", viewBox: "0 0 24 24", width: "25", xmlns: "http://www.w3.org/2000/svg" },
                        React.createElement("path", { clipRule: "evenodd", d: "M22.506,21v0.016L17,15.511V19c0,1.105-0.896,2-2,2h-1.5H3H2c-1.104,0-2-0.895-2-2  v-1l0,0V6l0,0V5c0-1.104,0.896-1.999,2-1.999h1l0,0h10.5l0,0H15c1.104,0,2,0.895,2,1.999v3.516l5.5-5.5V3.001  c0.828,0,1.5,0.671,1.5,1.499v15C24,20.327,23.331,20.996,22.506,21z", fillRule: "evenodd" })
                    )
                };

                return React.createElement(
                    Fragment,
                    null,
                    (!!poster && openInLightbox || !openInLightbox && videoSourceType === 'local') && React.createElement(
                        BlockControls,
                        null,
                        React.createElement(
                            Toolbar,
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
                                        label: __('Change image preview'),
                                        icon: 'edit',
                                        onClick: open
                                    });
                                }
                            }),
                            React.createElement(IconButton, {
                                className: "components-toolbar__control",
                                label: __('Remove image preview'),
                                icon: 'no',
                                onClick: function onClick() {
                                    return setAttributes({ poster: undefined, posterID: undefined });
                                }
                            })
                        )
                    ),
                    React.createElement(
                        InspectorControls,
                        null,
                        React.createElement(
                            PanelBody,
                            { title: __('Advanced Video Settings') },
                            React.createElement(ToggleControl, {
                                label: __('Open video in light box'),
                                help: __('Lightbox offers additional display options.'),
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
                                React.createElement(
                                    BaseControl,
                                    { label: __('Icon Style') },
                                    React.createElement(
                                        "div",
                                        { className: "advgb-icon-items-wrapper" },
                                        Object.keys(PLAY_BUTTON_STYLE).map(function (key, index) {
                                            return React.createElement(
                                                "div",
                                                { className: "advgb-icon-item", key: index },
                                                React.createElement(
                                                    "span",
                                                    { className: key === playButtonIcon ? 'active' : '',
                                                        onClick: function onClick() {
                                                            return setAttributes({ playButtonIcon: key });
                                                        } },
                                                    React.createElement(
                                                        "svg",
                                                        { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
                                                        PLAY_BUTTON_STYLE[key]
                                                    )
                                                )
                                            );
                                        })
                                    )
                                ),
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
                        !!openInLightbox && React.createElement(
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
                                            __('Select image preview')
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
                        !openInLightbox && ((videoSourceType === 'youtube' || videoSourceType === 'vimeo') && React.createElement("iframe", { src: videoURL,
                            width: videoWidth,
                            height: videoHeight,
                            frameBorder: "0",
                            allowFullScreen: true }) || videoSourceType === 'local' && React.createElement(
                            "video",
                            { width: videoWidth,
                                height: videoHeight,
                                poster: poster,
                                controls: true
                            },
                            React.createElement("source", { src: videoURL }),
                            __('Your browser does not support HTML5 video.')
                        ) || !videoSourceType && React.createElement("div", { style: { width: videoWidth, height: videoHeight } })),
                        isSelected && React.createElement(
                            "div",
                            { className: 'advgb-video-input-block' },
                            React.createElement(
                                "div",
                                { className: 'advgb-video-input' },
                                React.createElement(Dashicon, { className: "advgb-video-link-icon", icon: 'admin-links' }),
                                React.createElement(TextControl, {
                                    placeholder: __('Youtube/Vimeo video URL/ID…'),
                                    value: videoID,
                                    onChange: function onChange(value) {
                                        setAttributes({ videoID: value, videoURL: '', videoTitle: undefined, videoSourceType: '' });
                                    }
                                }),
                                React.createElement(
                                    Button,
                                    {
                                        className: "button button-large",
                                        disabled: !videoID || videoSourceType === 'local',
                                        style: { height: '31px', margin: '1px 0' },
                                        onClick: this.fetchVideoInfo
                                    },
                                    __('Fetch')
                                ),
                                React.createElement(
                                    "span",
                                    { style: { margin: 'auto 10px' } },
                                    __('or use')
                                ),
                                React.createElement(MediaUpload, {
                                    type: 'video',
                                    value: videoID,
                                    onSelect: function onSelect(video) {
                                        return setAttributes({ videoURL: video.url, videoID: video.id, videoTitle: video.title, videoSourceType: 'local' });
                                    },
                                    render: function render(_ref3) {
                                        var open = _ref3.open;
                                        return React.createElement(
                                            Button,
                                            {
                                                className: "button button-large",
                                                onClick: open
                                            },
                                            __('Local video')
                                        );
                                    }
                                })
                            ),
                            React.createElement(
                                "div",
                                { className: 'advgb-current-video-desc',
                                    style: { minWidth: '50%', margin: '10px auto', textAlign: 'center' }
                                },
                                React.createElement(
                                    "strong",
                                    null,
                                    __('Current Video'),
                                    ":"
                                ),
                                React.createElement(
                                    "span",
                                    { title: videoSourceType,
                                        style: {
                                            width: '25px',
                                            height: '25px',
                                            display: 'inline-block',
                                            verticalAlign: 'text-bottom',
                                            margin: 'auto 7px' }
                                    },
                                    videoHostIcon[videoSourceType] || this.state.fetching && React.createElement(Spinner, null)
                                ),
                                React.createElement(
                                    "span",
                                    null,
                                    videoTitle === 'ADVGB_FAIL_TO_LOAD' && React.createElement(
                                        "strong",
                                        { style: { color: 'red' } },
                                        __('Wrong video URL/ID. Please try another.')
                                    ) || videoTitle || __('Not selected yet.')
                                )
                            )
                        )
                    )
                );
            }
        }]);

        return AdvVideo;
    }(Component);

    var blockColor = typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined;
    var advVideoBlockIcon = React.createElement(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "2 2 22 22", fill: blockColor },
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
            videoID: {
                type: 'string'
            },
            videoSourceType: {
                type: 'string'
            },
            videoTitle: {
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
                type: 'number',
                default: 450
            },
            playButtonIcon: {
                type: 'string',
                default: 'normal'
            },
            playButtonSize: {
                type: 'number',
                default: 80
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
            },
            changed: {
                type: 'boolean',
                default: false
            }
        },
        edit: AdvVideo,
        save: function save(_ref4) {
            var attributes = _ref4.attributes;
            var videoURL = attributes.videoURL,
                videoSourceType = attributes.videoSourceType,
                videoTitle = attributes.videoTitle,
                videoFullWidth = attributes.videoFullWidth,
                videoWidth = attributes.videoWidth,
                videoHeight = attributes.videoHeight,
                playButtonIcon = attributes.playButtonIcon,
                playButtonSize = attributes.playButtonSize,
                playButtonColor = attributes.playButtonColor,
                overlayColor = attributes.overlayColor,
                poster = attributes.poster,
                openInLightbox = attributes.openInLightbox;


            var blockClassName = ['advgb-video-block', !!videoFullWidth && 'full-width', !!openInLightbox && !!videoURL && 'advgb-video-lightbox'].filter(Boolean).join(' ');

            return React.createElement(
                "div",
                { className: blockClassName,
                    style: { width: videoWidth },
                    "data-video": videoURL,
                    "data-source": videoSourceType
                },
                !openInLightbox && ((videoSourceType === 'youtube' || videoSourceType === 'vimeo') && React.createElement("iframe", { src: videoURL,
                    width: videoWidth,
                    height: videoHeight,
                    frameBorder: "0",
                    allowFullScreen: true }) || videoSourceType === 'local' && React.createElement(
                    "video",
                    { className: videoFullWidth && 'full-width',
                        width: videoWidth,
                        height: videoHeight,
                        poster: poster,
                        controls: true
                    },
                    React.createElement("source", { src: videoURL }),
                    __('Your browser does not support HTML5 video.')
                ) || !videoSourceType && React.createElement("div", { style: { width: videoWidth, height: videoHeight } })),
                !!openInLightbox && React.createElement(
                    "div",
                    { className: 'advgb-video-wrapper', style: { backgroundColor: overlayColor } },
                    React.createElement("div", { className: 'advgb-video-poster', style: { backgroundImage: "url(" + poster + ")" } }),
                    React.createElement(
                        "div",
                        { className: 'advgb-button-wrapper', style: { height: videoHeight } },
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
                )
            );
        }
    });
})(wp.i18n, wp.blocks, wp.element, wp.editor, wp.components);
