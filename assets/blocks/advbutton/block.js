"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __ = wp.i18n.__;
var Component = wp.element.Component;
var _wp$blocks = wp.blocks,
    registerBlockType = _wp$blocks.registerBlockType,
    createBlock = _wp$blocks.createBlock,
    InspectorControls = _wp$blocks.InspectorControls,
    BlockControls = _wp$blocks.BlockControls,
    BlockAlignmentToolbar = _wp$blocks.BlockAlignmentToolbar,
    RichText = _wp$blocks.RichText,
    ColorPalette = _wp$blocks.ColorPalette;
var _wp$components = wp.components,
    RangeControl = _wp$components.RangeControl,
    PanelBody = _wp$components.PanelBody,
    PanelColor = _wp$components.PanelColor,
    TextControl = _wp$components.TextControl,
    ToggleControl = _wp$components.ToggleControl;

var AdvButton = function (_Component) {
    _inherits(AdvButton, _Component);

    function AdvButton() {
        _classCallCheck(this, AdvButton);

        return _possibleConstructorReturn(this, (AdvButton.__proto__ || Object.getPrototypeOf(AdvButton)).apply(this, arguments));
    }

    _createClass(AdvButton, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                attributes = _props.attributes,
                setAttributes = _props.setAttributes,
                isSelected = _props.isSelected,
                className = _props.className;
            var align = attributes.align,
                url = attributes.url,
                urlOpenNewTab = attributes.urlOpenNewTab,
                title = attributes.title,
                text = attributes.text,
                bgColor = attributes.bgColor,
                textColor = attributes.textColor,
                textSize = attributes.textSize,
                paddingTop = attributes.paddingTop,
                paddingRight = attributes.paddingRight,
                paddingBottom = attributes.paddingBottom,
                paddingLeft = attributes.paddingLeft,
                borderWidth = attributes.borderWidth,
                borderColor = attributes.borderColor,
                borderRadius = attributes.borderRadius,
                hoverTextColor = attributes.hoverTextColor,
                hoverBgColor = attributes.hoverBgColor,
                hoverShadowColor = attributes.hoverShadowColor,
                hoverShadowH = attributes.hoverShadowH,
                hoverShadowV = attributes.hoverShadowV,
                hoverShadowBlur = attributes.hoverShadowBlur,
                hoverShadowSpread = attributes.hoverShadowSpread;


            return [isSelected && React.createElement(
                BlockControls,
                { key: "advgb-button-toolbar" },
                React.createElement(BlockAlignmentToolbar, { value: align, onChange: function onChange(align) {
                        return setAttributes({ align: align });
                    } })
            ), React.createElement(
                "span",
                { key: "advgb-button", style: { display: 'inline-block' } },
                React.createElement(RichText, {
                    tagName: "span",
                    placeholder: __('Add text…'),
                    value: text,
                    onChange: function onChange(value) {
                        return setAttributes({ text: value });
                    },
                    isSelected: isSelected,
                    keepPlaceholderOnFocus: true
                })
            ), isSelected && React.createElement(
                InspectorControls,
                { key: "advgb-button-inspector" },
                React.createElement(
                    PanelBody,
                    { title: __('Text/Color') },
                    React.createElement(RangeControl, {
                        label: __('Text size'),
                        value: textSize || '',
                        onChange: function onChange(size) {
                            return setAttributes({ textSize: size });
                        },
                        min: 10,
                        max: 100,
                        beforeIcon: "editor-textcolor",
                        allowReset: true
                    }),
                    React.createElement(
                        PanelColor,
                        {
                            title: __('Text color'),
                            colorValue: textColor,
                            initialOpen: false
                        },
                        React.createElement(ColorPalette, {
                            value: textColor,
                            onChange: function onChange(color) {
                                return setAttributes({ textColor: color });
                            }
                        })
                    ),
                    React.createElement(
                        PanelColor,
                        {
                            title: __('Background color'),
                            colorValue: bgColor,
                            initialOpen: false
                        },
                        React.createElement(ColorPalette, {
                            value: bgColor,
                            onChange: function onChange(color) {
                                return setAttributes({ bgColor: color });
                            }
                        })
                    ),
                    React.createElement(TextControl, {
                        label: __('Link URL'),
                        value: url || '',
                        placeholder: __('Enter URL…'),
                        onChange: function onChange(text) {
                            return setAttributes({ url: text });
                        }
                    }),
                    React.createElement(ToggleControl, {
                        label: __('Open link in new tab'),
                        checked: !!urlOpenNewTab,
                        onChange: function onChange() {
                            return setAttributes({ urlOpenNewTab: !attributes.urlOpenNewTab });
                        }
                    })
                ),
                React.createElement(
                    PanelBody,
                    { title: __('Padding'), initialOpen: false },
                    React.createElement(RangeControl, {
                        label: __('Padding left'),
                        value: paddingLeft || '',
                        onChange: function onChange(value) {
                            return setAttributes({ paddingLeft: value });
                        },
                        min: 0,
                        max: 100,
                        allowReset: true
                    }),
                    React.createElement(RangeControl, {
                        label: __('Padding top'),
                        value: paddingTop || '',
                        onChange: function onChange(value) {
                            return setAttributes({ paddingTop: value });
                        },
                        min: 0,
                        max: 100,
                        allowReset: true
                    }),
                    React.createElement(RangeControl, {
                        label: __('Padding right'),
                        value: paddingRight || '',
                        onChange: function onChange(value) {
                            return setAttributes({ paddingRight: value });
                        },
                        min: 0,
                        max: 100,
                        allowReset: true
                    }),
                    React.createElement(RangeControl, {
                        label: __('Padding bottom'),
                        value: paddingBottom || '',
                        onChange: function onChange(value) {
                            return setAttributes({ paddingBottom: value });
                        },
                        min: 0,
                        max: 100,
                        allowReset: true
                    })
                ),
                React.createElement(
                    PanelBody,
                    { title: __('Border'), initialOpen: false },
                    React.createElement(RangeControl, {
                        label: __('Border width'),
                        value: borderWidth || '',
                        onChange: function onChange(value) {
                            return setAttributes({ borderWidth: value });
                        },
                        min: 0,
                        max: 100,
                        allowReset: true
                    }),
                    React.createElement(RangeControl, {
                        label: __('Border radius'),
                        value: borderRadius || '',
                        onChange: function onChange(value) {
                            return setAttributes({ borderRadius: value });
                        },
                        min: 0,
                        max: 100,
                        allowReset: true
                    }),
                    React.createElement(
                        PanelColor,
                        { title: __('Border color'), colorValue: borderColor, initialOpen: false },
                        React.createElement(ColorPalette, {
                            value: borderColor,
                            onChange: function onChange(value) {
                                return setAttributes({ borderColor: value });
                            }
                        })
                    )
                ),
                React.createElement(
                    PanelBody,
                    { title: __('Hover'), initialOpen: false },
                    React.createElement(
                        PanelColor,
                        { title: __('Text color'), colorValue: hoverTextColor, initialOpen: false },
                        React.createElement(ColorPalette, {
                            value: hoverTextColor,
                            onChange: function onChange(value) {
                                return setAttributes({ hoverTextColor: value });
                            }
                        })
                    ),
                    React.createElement(
                        PanelColor,
                        { title: __('Background color'), colorValue: hoverBgColor, initialOpen: false },
                        React.createElement(ColorPalette, {
                            value: hoverBgColor,
                            onChange: function onChange(value) {
                                return setAttributes({ hoverBgColor: value });
                            }
                        })
                    ),
                    React.createElement(
                        PanelBody,
                        { title: __('Shadow'), initialOpen: false },
                        React.createElement(
                            PanelColor,
                            { title: __('Shadow color'), colorValue: hoverShadowColor, initialOpen: false },
                            React.createElement(ColorPalette, {
                                value: hoverShadowColor,
                                onChange: function onChange(value) {
                                    return setAttributes({ hoverShadowColor: value });
                                }
                            })
                        ),
                        React.createElement(RangeControl, {
                            label: __('Shadow H offset'),
                            value: hoverShadowH || '',
                            onChange: function onChange(value) {
                                return setAttributes({ hoverShadowH: value });
                            },
                            min: -50,
                            max: 50,
                            allowReset: true
                        }),
                        React.createElement(RangeControl, {
                            label: __('Shadow V offset'),
                            value: hoverShadowV || '',
                            onChange: function onChange(value) {
                                return setAttributes({ hoverShadowV: value });
                            },
                            min: -50,
                            max: 50,
                            allowReset: true
                        }),
                        React.createElement(RangeControl, {
                            label: __('Shadow blur'),
                            value: hoverShadowBlur || '',
                            onChange: function onChange(value) {
                                return setAttributes({ hoverShadowBlur: value });
                            },
                            min: -50,
                            max: 50,
                            allowReset: true
                        }),
                        React.createElement(RangeControl, {
                            label: __('Shadow spread'),
                            value: hoverShadowSpread || '',
                            onChange: function onChange(value) {
                                return setAttributes({ hoverShadowSpread: value });
                            },
                            min: -50,
                            max: 50,
                            allowReset: true
                        })
                    )
                )
            )];
        }
    }]);

    return AdvButton;
}(Component);

registerBlockType('advgb/button', {
    title: __('Advanced Button'),
    description: __('New button with more styles.'),
    icon: 'button',
    category: 'layout',
    attributes: {
        url: {
            type: 'string'
        },
        urlOpenNewTab: {
            type: 'boolean',
            default: true
        },
        title: {
            type: 'string'
        },
        text: {
            type: 'string',
            source: 'children',
            selector: 'a'
        },
        bgColor: {
            type: 'string',
            default: '#2196f3'
        },
        textColor: {
            type: 'string',
            default: '#fff'
        },
        textSize: {
            type: 'number'
        },
        paddingTop: {
            type: 'number',
            default: 6
        },
        paddingRight: {
            type: 'number',
            default: 12
        },
        paddingBottom: {
            type: 'number',
            default: 6
        },
        paddingLeft: {
            type: 'number',
            default: 12
        },
        borderWidth: {
            type: 'number',
            default: 1
        },
        borderColor: {
            type: 'string',
            default: '#2196f3'
        },
        borderRadius: {
            type: 'number',
            default: 0
        },
        hoverTextColor: {
            type: 'string',
            default: '#fff'
        },
        hoverBgColor: {
            type: 'string',
            default: '#2196f3'
        },
        hoverShadowColor: {
            type: 'string',
            default: '#ccc'
        },
        hoverShadowH: {
            type: 'number',
            default: 3
        },
        hoverShadowV: {
            type: 'number',
            default: 3
        },
        hoverShadowBlur: {
            type: 'number',
            default: 1
        },
        hoverShadowSpread: {
            type: 'number',
            default: 0
        },
        align: {
            type: 'string',
            default: 'none'
        }
    },
    edit: AdvButton,
    save: function save(_ref) {
        var attributes = _ref.attributes;

        return null;
    },
    getEditWrapperProps: function getEditWrapperProps(attributes) {
        var align = attributes.align;

        var props = { 'data-resized': true };

        if ('left' === align || 'right' === align || 'center' === align) {
            props['data-align'] = align;
        }

        return props;
    }
});
