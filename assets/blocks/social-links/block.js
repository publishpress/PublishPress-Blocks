"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
        MediaUpload = wpEditor.MediaUpload,
        AlignmentToolbar = wpEditor.AlignmentToolbar;
    var RangeControl = wpComponents.RangeControl,
        PanelBody = wpComponents.PanelBody,
        TextControl = wpComponents.TextControl,
        IconButton = wpComponents.IconButton,
        Toolbar = wpComponents.Toolbar;


    var socialBlockIconContent = React.createElement(
        Fragment,
        null,
        React.createElement("path", { fill: "none", d: "M0,0h24v24H0V0z" }),
        React.createElement("path", { d: "M18,16.08c-0.76,0-1.44,0.3-1.96,0.77L8.91,12.7C8.96,12.47,9,12.24,9,12s-0.04-0.47-0.09-0.7l7.05-4.11\r C16.5,7.69,17.21,8,18,8c1.66,0,3-1.34,3-3c0-1.66-1.34-3-3-3s-3,1.34-3,3c0,0.24,0.04,0.47,0.09,0.7L8.04,9.81\r C7.5,9.31,6.79,9,6,9c-1.66,0-3,1.34-3,3c0,1.66,1.34,3,3,3c0.79,0,1.5-0.31,2.04-0.81l7.12,4.16c-0.05,0.21-0.08,0.43-0.08,0.65\r c0,1.61,1.31,2.92,2.92,2.92s2.92-1.31,2.92-2.92C20.92,17.39,19.61,16.08,18,16.08z M18,4c0.55,0,1,0.45,1,1s-0.45,1-1,1\r s-1-0.45-1-1S17.45,4,18,4z M6,13c-0.55,0-1-0.45-1-1s0.45-1,1-1s1,0.45,1,1S6.55,13,6,13z M18,20.02c-0.55,0-1-0.45-1-1\r s0.45-1,1-1s1,0.45,1,1S18.55,20.02,18,20.02z" })
    );

    var socialBlockIcon = React.createElement(
        "svg",
        { width: "24", height: "24", viewBox: "0 0 24 24" },
        socialBlockIconContent
    );

    var AdvSocialBlock = function (_Component) {
        _inherits(AdvSocialBlock, _Component);

        function AdvSocialBlock() {
            _classCallCheck(this, AdvSocialBlock);

            var _this = _possibleConstructorReturn(this, (AdvSocialBlock.__proto__ || Object.getPrototypeOf(AdvSocialBlock)).apply(this, arguments));

            _this.state = {
                currentSelected: 0
            };
            return _this;
        }

        _createClass(AdvSocialBlock, [{
            key: "render",
            value: function render() {
                var _this2 = this;

                var _props = this.props,
                    attributes = _props.attributes,
                    setAttributes = _props.setAttributes,
                    isSelected = _props.isSelected;
                var items = attributes.items,
                    align = attributes.align,
                    iconSize = attributes.iconSize,
                    iconSpace = attributes.iconSpace;
                var currentSelected = this.state.currentSelected;


                return React.createElement(
                    Fragment,
                    null,
                    React.createElement(
                        BlockControls,
                        null,
                        React.createElement(
                            Toolbar,
                            null,
                            React.createElement(IconButton, {
                                className: "components-toolbar__control",
                                icon: "plus",
                                label: __('Add item'),
                                onClick: function onClick() {
                                    return setAttributes({ items: [].concat(_toConsumableArray(items), [{ icon: '', iconID: '', link: '#' }]) });
                                }
                            }),
                            React.createElement(IconButton, {
                                className: "components-toolbar__control",
                                icon: "no",
                                label: __('Remove selected item'),
                                onClick: function onClick() {
                                    _this2.setState({ currentSelected: Math.max(currentSelected - 1, 0) });
                                    if (items.length > 1) {
                                        setAttributes({
                                            items: items.filter(function (item, index) {
                                                return index !== currentSelected;
                                            })
                                        });
                                    } else {
                                        setAttributes({
                                            items: [{ icon: '', iconID: '', link: '#' }]
                                        });
                                    }
                                }
                            })
                        ),
                        React.createElement(MediaUpload, {
                            type: "image",
                            value: items[currentSelected].iconID,
                            onSelect: function onSelect(media) {
                                var newItems = items.map(function (item, index) {
                                    if (index === currentSelected) {
                                        item = _extends({}, item, {
                                            icon: media.sizes.thumbnail.url,
                                            iconID: media.id
                                        });
                                    }
                                    return item;
                                });

                                setAttributes({ items: newItems });
                            },
                            render: function render(_ref) {
                                var open = _ref.open;
                                return React.createElement(
                                    Toolbar,
                                    null,
                                    React.createElement(IconButton, {
                                        className: "components-toolbar__control",
                                        icon: "format-image",
                                        label: __('Choose icon'),
                                        onClick: open
                                    })
                                );
                            }
                        }),
                        React.createElement(AlignmentToolbar, { value: align, onChange: function onChange(value) {
                                return setAttributes({ align: value });
                            } })
                    ),
                    React.createElement(
                        InspectorControls,
                        null,
                        React.createElement(
                            PanelBody,
                            { title: __('Icons settings') },
                            React.createElement(RangeControl, {
                                label: __('Icon size'),
                                value: iconSize,
                                min: 20,
                                max: 60,
                                onChange: function onChange(value) {
                                    return setAttributes({ iconSize: value });
                                }
                            }),
                            React.createElement(RangeControl, {
                                label: __('Icon space'),
                                value: iconSpace,
                                min: 0,
                                max: 30,
                                onChange: function onChange(value) {
                                    return setAttributes({ iconSpace: value });
                                }
                            })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "advgb-social-links-block", style: { textAlign: align } },
                        React.createElement(
                            "div",
                            { className: "advgb-social-icons" },
                            items.map(function (item, index) {
                                return React.createElement(
                                    "span",
                                    { key: index,
                                        className: "advgb-social-icon " + (currentSelected === index ? 'selected' : ''),
                                        onClick: function onClick() {
                                            return _this2.setState({ currentSelected: index });
                                        },
                                        style: {
                                            width: iconSize + 'px',
                                            height: iconSize + 'px',
                                            marginLeft: iconSpace + 'px',
                                            marginRight: iconSpace + 'px'
                                        }
                                    },
                                    !!item.icon ? React.createElement("img", { src: item.icon, alt: __('Social link icon') }) : React.createElement(
                                        "svg",
                                        { width: iconSize - 6, height: iconSize - 6, viewBox: "0 0 24 24" },
                                        socialBlockIconContent
                                    )
                                );
                            })
                        ),
                        isSelected && React.createElement(
                            "div",
                            { className: "advgb-social-link" },
                            React.createElement(
                                "strong",
                                null,
                                __('Social link:')
                            ),
                            React.createElement(TextControl, {
                                placeholder: __('Enter social link…'),
                                value: items[currentSelected].link,
                                onChange: function onChange(value) {
                                    var newItems = items.map(function (vl, idx) {
                                        if (idx === parseInt(currentSelected)) vl = _extends({}, vl, { link: value });
                                        return vl;
                                    });
                                    return setAttributes({ items: newItems });
                                }
                            })
                        )
                    )
                );
            }
        }]);

        return AdvSocialBlock;
    }(Component);

    registerBlockType('advgb/social-links', {
        title: __('Social Links'),
        description: __('Insert your social link with icon.'),
        icon: socialBlockIcon,
        category: 'common',
        keywords: [__('social icons'), __('shares'), __('icon link')],
        attributes: {
            items: {
                type: 'array',
                default: [{ icon: '', iconID: '', link: '#' }, { icon: '', iconID: '', link: '#' }, { icon: '', iconID: '', link: '#' }]
            },
            align: {
                type: 'string'
            },
            iconSize: {
                type: 'number',
                default: 24
            },
            iconSpace: {
                type: 'number',
                default: 5
            }
        },
        edit: AdvSocialBlock,
        save: function save(_ref2) {
            var attributes = _ref2.attributes;
            var items = attributes.items,
                align = attributes.align,
                iconSize = attributes.iconSize,
                iconSpace = attributes.iconSpace;


            return React.createElement(
                "div",
                { className: "advgb-social-links-block", style: { textAlign: align } },
                React.createElement(
                    "div",
                    { className: "advgb-social-icons" },
                    items.map(function (item, index) {
                        return React.createElement(
                            "a",
                            { key: index,
                                className: "advgb-social-icon",
                                href: item.link || '#',
                                target: "_blank",
                                style: {
                                    width: iconSize + 'px',
                                    height: iconSize + 'px',
                                    marginLeft: iconSpace + 'px',
                                    marginRight: iconSpace + 'px'
                                }
                            },
                            !!item.icon ? React.createElement("img", { src: item.icon, alt: __('Social link icon') }) : React.createElement(
                                "svg",
                                { width: iconSize - 6, height: iconSize - 6, viewBox: "0 0 24 24" },
                                socialBlockIconContent
                            )
                        );
                    })
                )
            );
        }
    });
})(wp.i18n, wp.blocks, wp.element, wp.editor, wp.components);
