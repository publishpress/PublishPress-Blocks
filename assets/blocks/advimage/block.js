'use strict';

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
        RichText = wpEditor.RichText,
        ColorPalette = wpEditor.ColorPalette,
        MediaUpload = wpEditor.MediaUpload;
    var RangeControl = wpComponents.RangeControl,
        PanelBody = wpComponents.PanelBody,
        PanelColor = wpComponents.PanelColor,
        ToggleControl = wpComponents.ToggleControl,
        SelectControl = wpComponents.SelectControl,
        TextControl = wpComponents.TextControl,
        IconButton = wpComponents.IconButton,
        Button = wpComponents.Button;

    var AdvImage = function (_Component) {
        _inherits(AdvImage, _Component);

        function AdvImage() {
            _classCallCheck(this, AdvImage);

            var _this = _possibleConstructorReturn(this, (AdvImage.__proto__ || Object.getPrototypeOf(AdvImage)).apply(this, arguments));

            _this.state = {
                currentEdit: ''
            };
            return _this;
        }

        _createClass(AdvImage, [{
            key: 'handleSetup',
            value: function handleSetup(editor, area) {
                var _this2 = this;

                editor.on('focus', function () {
                    return _this2.setState({ currentEdit: area });
                });
            }
        }, {
            key: 'render',
            value: function render() {
                var _this3 = this;

                var currentEdit = this.state.currentEdit;
                var _props = this.props,
                    attributes = _props.attributes,
                    setAttributes = _props.setAttributes,
                    isSelected = _props.isSelected;
                var openOnClick = attributes.openOnClick,
                    openUrl = attributes.openUrl,
                    imageUrl = attributes.imageUrl,
                    imageID = attributes.imageID,
                    title = attributes.title,
                    titleColor = attributes.titleColor,
                    subtitle = attributes.subtitle,
                    subtitleColor = attributes.subtitleColor,
                    overlayColor = attributes.overlayColor,
                    fullWidth = attributes.fullWidth,
                    width = attributes.width,
                    height = attributes.height,
                    vAlign = attributes.vAlign,
                    hAlign = attributes.hAlign;

                var blockClassName = ['advgb-image-block', fullWidth && 'full-width'].filter(Boolean).join(' ');

                return React.createElement(
                    Fragment,
                    null,
                    imageID && React.createElement(
                        BlockControls,
                        null,
                        React.createElement(MediaUpload, {
                            type: 'image',
                            value: imageID,
                            onSelect: function onSelect(image) {
                                return setAttributes({ imageUrl: image.url, imageID: image.id });
                            },
                            render: function render(_ref) {
                                var open = _ref.open;
                                return React.createElement(IconButton, {
                                    className: 'components-toolbar__control',
                                    label: __('Change image'),
                                    icon: 'edit',
                                    onClick: open
                                });
                            }
                        }),
                        React.createElement(IconButton, {
                            className: 'components-toolbar__control',
                            label: __('Remove image'),
                            icon: 'no',
                            onClick: function onClick() {
                                return setAttributes({ imageUrl: undefined, imageID: undefined });
                            }
                        })
                    ),
                    React.createElement(
                        InspectorControls,
                        null,
                        React.createElement(
                            PanelBody,
                            { title: __('Advanced Image') },
                            React.createElement(SelectControl, {
                                label: __('Action on click'),
                                value: openOnClick,
                                options: [{ label: __('None'), value: 'none' }, { label: __('Open image in lightbox'), value: 'lightbox' }, { label: __('Open custom URL'), value: 'url' }],
                                onChange: function onChange(value) {
                                    return setAttributes({ openOnClick: value });
                                }
                            }),
                            openOnClick === 'url' && React.createElement(TextControl, {
                                label: [__('Link URL'), openUrl && React.createElement(
                                    'a',
                                    { href: openUrl || '#', key: 'advgb_image_link_url', target: '_blank', style: { float: 'right' } },
                                    __('Preview')
                                )],
                                value: openUrl,
                                placeholder: __('Enter URL…'),
                                onChange: function onChange(text) {
                                    return setAttributes({ openUrl: text });
                                }
                            }),
                            React.createElement(
                                PanelBody,
                                { title: __('Image Size') },
                                React.createElement(ToggleControl, {
                                    label: __('Full width'),
                                    checked: fullWidth,
                                    onChange: function onChange() {
                                        return setAttributes({ fullWidth: !fullWidth });
                                    }
                                }),
                                React.createElement(RangeControl, {
                                    label: __('Height'),
                                    value: height,
                                    min: 100,
                                    max: 1000,
                                    onChange: function onChange(value) {
                                        return setAttributes({ height: value });
                                    }
                                }),
                                !fullWidth && React.createElement(RangeControl, {
                                    label: __('Width'),
                                    value: width,
                                    min: 200,
                                    max: 1300,
                                    onChange: function onChange(value) {
                                        return setAttributes({ width: value });
                                    }
                                })
                            ),
                            React.createElement(
                                PanelColor,
                                { title: __('Title Color'), colorValue: titleColor, initialOpen: false },
                                React.createElement(ColorPalette, {
                                    value: titleColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ titleColor: value });
                                    }
                                })
                            ),
                            React.createElement(
                                PanelColor,
                                { title: __('Subtitle Color'), colorValue: subtitleColor, initialOpen: false },
                                React.createElement(ColorPalette, {
                                    value: subtitleColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ subtitleColor: value });
                                    }
                                })
                            ),
                            React.createElement(
                                PanelColor,
                                { title: __('Overlay Color'), colorValue: overlayColor, initialOpen: false },
                                React.createElement(ColorPalette, {
                                    value: overlayColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ overlayColor: value });
                                    }
                                })
                            ),
                            React.createElement(
                                PanelBody,
                                { title: __('Text Alignment'), initialOpen: false },
                                React.createElement(SelectControl, {
                                    label: __('Vertical Alignment'),
                                    value: vAlign,
                                    options: [{ label: __('Top'), value: 'flex-start' }, { label: __('Center'), value: 'center' }, { label: __('Bottom'), value: 'flex-end' }],
                                    onChange: function onChange(value) {
                                        return setAttributes({ vAlign: value });
                                    }
                                }),
                                React.createElement(SelectControl, {
                                    label: __('Horizontal Alignment'),
                                    value: hAlign,
                                    options: [{ label: __('Left'), value: 'flex-start' }, { label: __('Center'), value: 'center' }, { label: __('Right'), value: 'flex-end' }],
                                    onChange: function onChange(value) {
                                        return setAttributes({ hAlign: value });
                                    }
                                })
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: blockClassName,
                            style: {
                                backgroundImage: 'url( ' + imageUrl + ')',
                                height: height,
                                width: width,
                                justifyContent: vAlign,
                                alignItems: hAlign
                            }
                        },
                        React.createElement('span', { className: 'advgb-image-overlay',
                            style: { backgroundColor: overlayColor }
                        }),
                        !imageID && React.createElement(MediaUpload, {
                            type: 'image',
                            value: imageID,
                            onSelect: function onSelect(image) {
                                return setAttributes({ imageUrl: image.url, imageID: image.id });
                            },
                            render: function render(_ref2) {
                                var open = _ref2.open;
                                return React.createElement(
                                    Button,
                                    {
                                        className: 'button button-large',
                                        onClick: open
                                    },
                                    __('Choose image')
                                );
                            }
                        }),
                        React.createElement(RichText, {
                            tagName: 'h4',
                            className: 'advgb-image-title',
                            value: title,
                            onChange: function onChange(value) {
                                return setAttributes({ title: value });
                            },
                            style: { color: titleColor },
                            isSelected: isSelected && currentEdit === 'title',
                            onSetup: function onSetup(editor) {
                                return _this3.handleSetup(editor, 'title');
                            }
                        }),
                        React.createElement(RichText, {
                            tagName: 'p',
                            className: 'advgb-image-subtitle',
                            value: subtitle,
                            onChange: function onChange(value) {
                                return setAttributes({ subtitle: value });
                            },
                            style: { color: subtitleColor },
                            isSelected: isSelected && currentEdit === 'subtitle',
                            onSetup: function onSetup(editor) {
                                return _this3.handleSetup(editor, 'subtitle');
                            }
                        })
                    )
                );
            }
        }]);

        return AdvImage;
    }(Component);

    var blockColor = typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined;
    var advImageBlockIcon = React.createElement(
        'svg',
        { fill: blockColor, height: '20', viewBox: '2 2 22 22', width: '20', xmlns: 'http://www.w3.org/2000/svg' },
        React.createElement('path', { d: 'M0 0h24v24H0V0z', fill: 'none' }),
        React.createElement('path', { d: 'M1 5h2v14H1zm4 0h2v14H5zm17 0H10c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zM11 17l2.5-3.15L15.29 16l2.5-3.22L21 17H11z' })
    );

    registerBlockType('advgb/image', {
        title: __('Advanced Image'),
        description: __('Advanced image/photo block with more options and styles.'),
        icon: advImageBlockIcon,
        category: 'common',
        keywords: [__('image'), __('photo'), __('box')],
        attributes: {
            openOnClick: {
                type: 'string',
                default: 'none'
            },
            openUrl: {
                type: 'string'
            },
            imageUrl: {
                type: 'string'
            },
            imageID: {
                type: 'string'
            },
            title: {
                type: 'string',
                default: __('Image title')
            },
            titleColor: {
                type: 'string',
                default: '#fff'
            },
            subtitle: {
                type: 'string',
                default: __('Your subtitle here')
            },
            subtitleColor: {
                type: 'string',
                default: '#fff'
            },
            overlayColor: {
                type: 'string',
                default: '#2196f3'
            },
            fullWidth: {
                type: 'boolean',
                default: false
            },
            width: {
                type: 'number',
                default: 500
            },
            height: {
                type: 'number',
                default: 500
            },
            vAlign: {
                type: 'string',
                default: 'center'
            },
            hAlign: {
                type: 'string',
                default: 'center'
            }
        },
        edit: AdvImage,
        save: function save(_ref3) {
            var attributes = _ref3.attributes;
            var openOnClick = attributes.openOnClick,
                openUrl = attributes.openUrl,
                imageUrl = attributes.imageUrl,
                title = attributes.title,
                titleColor = attributes.titleColor,
                subtitle = attributes.subtitle,
                subtitleColor = attributes.subtitleColor,
                overlayColor = attributes.overlayColor,
                fullWidth = attributes.fullWidth,
                width = attributes.width,
                height = attributes.height,
                vAlign = attributes.vAlign,
                hAlign = attributes.hAlign;

            var linkURL = openOnClick === 'url' && !!openUrl ? openUrl : undefined;
            var blockClassName = ['advgb-image-block', fullWidth && 'full-width', openOnClick === 'lightbox' && !!imageUrl && 'advgb-lightbox'].filter(Boolean).join(' ');

            return React.createElement(
                'div',
                { className: blockClassName,
                    style: {
                        backgroundImage: 'url( ' + imageUrl + ')',
                        height: height,
                        width: width,
                        justifyContent: vAlign,
                        alignItems: hAlign
                    },
                    'data-image': imageUrl
                },
                React.createElement('a', { className: 'advgb-image-overlay',
                    style: { backgroundColor: overlayColor },
                    target: '_blank',
                    href: linkURL
                }),
                React.createElement(
                    'h4',
                    { className: 'advgb-image-title', style: { color: titleColor } },
                    title
                ),
                React.createElement(
                    'p',
                    { className: 'advgb-image-subtitle', style: { color: subtitleColor } },
                    subtitle
                )
            );
        }
    });
})(wp.i18n, wp.blocks, wp.element, wp.editor, wp.components);
