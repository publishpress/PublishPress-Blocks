'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function (wpI18n, wpBlocks, wpElement, wpEditor, wpComponents) {
    var __ = wpI18n.__;
    var Component = wpElement.Component,
        Fragment = wpElement.Fragment;
    var registerBlockType = wpBlocks.registerBlockType,
        createBlock = wpBlocks.createBlock;
    var InspectorControls = wpEditor.InspectorControls,
        BlockControls = wpEditor.BlockControls,
        BlockAlignmentToolbar = wpEditor.BlockAlignmentToolbar,
        RichText = wpEditor.RichText,
        ColorPalette = wpEditor.ColorPalette;
    var RangeControl = wpComponents.RangeControl,
        PanelBody = wpComponents.PanelBody,
        PanelColor = wpComponents.PanelColor,
        TextControl = wpComponents.TextControl,
        ToggleControl = wpComponents.ToggleControl,
        SelectControl = wpComponents.SelectControl,
        IconButton = wpComponents.IconButton;

    var AdvButton = function (_Component) {
        _inherits(AdvButton, _Component);

        function AdvButton() {
            _classCallCheck(this, AdvButton);

            return _possibleConstructorReturn(this, (AdvButton.__proto__ || Object.getPrototypeOf(AdvButton)).apply(this, arguments));
        }

        _createClass(AdvButton, [{
            key: 'componentWillMount',
            value: function componentWillMount() {
                var _props = this.props,
                    attributes = _props.attributes,
                    setAttributes = _props.setAttributes,
                    id = _props.id;


                if (!attributes.id) {
                    setAttributes({ id: 'advgbbtn-' + id });
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var listBorderStyles = [{ label: __('None'), value: 'none' }, { label: __('Solid'), value: 'solid' }, { label: __('Dotted'), value: 'dotted' }, { label: __('Dashed'), value: 'dashed' }, { label: __('Double'), value: 'double' }, { label: __('Groove'), value: 'groove' }, { label: __('Ridge'), value: 'ridge' }, { label: __('Inset'), value: 'inset' }, { label: __('Outset'), value: 'outset' }];
                var _props2 = this.props,
                    attributes = _props2.attributes,
                    setAttributes = _props2.setAttributes,
                    isSelected = _props2.isSelected,
                    className = _props2.className,
                    blockID = _props2.id;
                var id = attributes.id,
                    align = attributes.align,
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
                    borderStyle = attributes.borderStyle,
                    hoverTextColor = attributes.hoverTextColor,
                    hoverBgColor = attributes.hoverBgColor,
                    hoverShadowColor = attributes.hoverShadowColor,
                    hoverShadowH = attributes.hoverShadowH,
                    hoverShadowV = attributes.hoverShadowV,
                    hoverShadowBlur = attributes.hoverShadowBlur,
                    hoverShadowSpread = attributes.hoverShadowSpread,
                    transitionSpeed = attributes.transitionSpeed;


                return React.createElement(
                    Fragment,
                    null,
                    React.createElement(
                        BlockControls,
                        null,
                        React.createElement(BlockAlignmentToolbar, { value: align, onChange: function onChange(align) {
                                return setAttributes({ align: align });
                            } }),
                        React.createElement(
                            'div',
                            { className: 'components-toolbar' },
                            React.createElement(IconButton, {
                                label: __('Refresh this button when it conflict with other buttons styles'),
                                icon: 'update',
                                className: 'components-toolbar__control',
                                onClick: function onClick() {
                                    return setAttributes({ id: 'advgbbutton-' + blockID });
                                }
                            })
                        )
                    ),
                    React.createElement(
                        'span',
                        { style: { display: 'inline-block' } },
                        React.createElement(RichText, {
                            tagName: 'span',
                            placeholder: __('Add text…'),
                            value: text,
                            onChange: function onChange(value) {
                                return setAttributes({ text: value });
                            },
                            formattingControls: ['bold', 'italic', 'strikethrough'],
                            isSelected: isSelected,
                            className: 'wp-block-advgb-button_link ' + id,
                            keepPlaceholderOnFocus: true
                        })
                    ),
                    React.createElement(
                        'style',
                        null,
                        '.' + id + ' {\n                        font-size: ' + textSize + 'px;\n                        color: ' + textColor + ';\n                        background-color: ' + bgColor + ';\n                        padding: ' + paddingTop + 'px ' + paddingRight + 'px ' + paddingBottom + 'px ' + paddingLeft + 'px;\n                        border-width: ' + borderWidth + 'px;\n                        border-color: ' + borderColor + ';\n                        border-radius: ' + borderRadius + 'px;\n                        border-style: ' + borderStyle + ';\n                    }\n                    .' + id + ':hover {\n                        color: ' + hoverTextColor + ';\n                        background-color: ' + hoverBgColor + ';\n                        box-shadow: ' + hoverShadowH + 'px ' + hoverShadowV + 'px ' + hoverShadowBlur + 'px ' + hoverShadowSpread + 'px ' + hoverShadowColor + ';\n                        transition: all ' + transitionSpeed + 's ease;\n                    }'
                    ),
                    React.createElement(
                        InspectorControls,
                        null,
                        React.createElement(
                            PanelBody,
                            { title: __('Button link') },
                            React.createElement(TextControl, {
                                label: [__('Link URL'), url && React.createElement(
                                    'a',
                                    { href: url || '#', key: 'link_url', target: '_blank', style: { float: 'right' } },
                                    __('Preview')
                                )],
                                value: url || '',
                                placeholder: __('Enter URL…'),
                                onChange: function onChange(text) {
                                    return setAttributes({ url: text });
                                }
                            }),
                            React.createElement(ToggleControl, {
                                label: __('Open in new tab'),
                                checked: !!urlOpenNewTab,
                                onChange: function onChange() {
                                    return setAttributes({ urlOpenNewTab: !attributes.urlOpenNewTab });
                                }
                            })
                        ),
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
                                beforeIcon: 'editor-textcolor',
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
                            )
                        ),
                        React.createElement(
                            PanelBody,
                            { title: __('Border'), initialOpen: false },
                            React.createElement(RangeControl, {
                                label: __('Border radius'),
                                value: borderRadius || '',
                                onChange: function onChange(value) {
                                    return setAttributes({ borderRadius: value });
                                },
                                min: 0,
                                max: 100
                            }),
                            React.createElement(SelectControl, {
                                label: __('Border style'),
                                value: borderStyle,
                                options: listBorderStyles,
                                onChange: function onChange(value) {
                                    return setAttributes({ borderStyle: value });
                                }
                            }),
                            borderStyle !== 'none' && [React.createElement(
                                PanelColor,
                                { key: 'border-color', title: __('Border color'), colorValue: borderColor, initialOpen: false },
                                React.createElement(ColorPalette, {
                                    value: borderColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ borderColor: value });
                                    }
                                })
                            ), React.createElement(RangeControl, {
                                key: 'border-width',
                                label: __('Border width'),
                                value: borderWidth || '',
                                onChange: function onChange(value) {
                                    return setAttributes({ borderWidth: value });
                                },
                                min: 0,
                                max: 100
                            })]
                        ),
                        React.createElement(
                            PanelBody,
                            { title: __('Padding'), initialOpen: false },
                            React.createElement(RangeControl, {
                                label: __('Padding top'),
                                value: paddingTop || '',
                                onChange: function onChange(value) {
                                    return setAttributes({ paddingTop: value });
                                },
                                min: 0,
                                max: 100
                            }),
                            React.createElement(RangeControl, {
                                label: __('Padding right'),
                                value: paddingRight || '',
                                onChange: function onChange(value) {
                                    return setAttributes({ paddingRight: value });
                                },
                                min: 0,
                                max: 100
                            }),
                            React.createElement(RangeControl, {
                                label: __('Padding bottom'),
                                value: paddingBottom || '',
                                onChange: function onChange(value) {
                                    return setAttributes({ paddingBottom: value });
                                },
                                min: 0,
                                max: 100
                            }),
                            React.createElement(RangeControl, {
                                label: __('Padding left'),
                                value: paddingLeft || '',
                                onChange: function onChange(value) {
                                    return setAttributes({ paddingLeft: value });
                                },
                                min: 0,
                                max: 100
                            })
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
                                    max: 50
                                }),
                                React.createElement(RangeControl, {
                                    label: __('Shadow V offset'),
                                    value: hoverShadowV || '',
                                    onChange: function onChange(value) {
                                        return setAttributes({ hoverShadowV: value });
                                    },
                                    min: -50,
                                    max: 50
                                }),
                                React.createElement(RangeControl, {
                                    label: __('Shadow blur'),
                                    value: hoverShadowBlur || '',
                                    onChange: function onChange(value) {
                                        return setAttributes({ hoverShadowBlur: value });
                                    },
                                    min: 0,
                                    max: 50
                                }),
                                React.createElement(RangeControl, {
                                    label: __('Shadow spread'),
                                    value: hoverShadowSpread || '',
                                    onChange: function onChange(value) {
                                        return setAttributes({ hoverShadowSpread: value });
                                    },
                                    min: 0,
                                    max: 50
                                })
                            ),
                            React.createElement(RangeControl, {
                                label: __('Transition speed'),
                                value: transitionSpeed || '',
                                onChange: function onChange(value) {
                                    return setAttributes({ transitionSpeed: value });
                                },
                                min: 0,
                                max: 3
                            })
                        )
                    )
                );
            }
        }]);

        return AdvButton;
    }(Component);

    var blockColor = typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined;
    var buttonBlockIcon = React.createElement(
        'svg',
        { fill: blockColor, height: '20', viewBox: '2 2 22 22', width: '20', xmlns: 'http://www.w3.org/2000/svg' },
        React.createElement('path', { d: 'M0 0h24v24H0V0z', fill: 'none' }),
        React.createElement('path', { d: 'M5 14.5h14v-6H5v6zM11 .55V3.5h2V.55h-2zm8.04 2.5l-1.79 1.79 1.41 1.41 1.8-1.79-1.42-1.41zM13 22.45V19.5h-2v2.95h2zm7.45-3.91l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zM3.55 4.46l1.79 1.79 1.41-1.41-1.79-1.79-1.41 1.41zm1.41 15.49l1.79-1.8-1.41-1.41-1.79 1.79 1.41 1.42z' })
    );

    registerBlockType('advgb/button', {
        title: __('Advanced Button'),
        description: __('New button with more styles.'),
        icon: buttonBlockIcon,
        category: 'layout',
        keywords: [__('button'), __('link')],
        attributes: {
            id: {
                type: 'string'
            },
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
                type: 'number',
                default: 18
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
            borderStyle: {
                type: 'string',
                default: 'solid'
            },
            borderRadius: {
                type: 'number',
                default: 50
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
            transitionSpeed: {
                type: 'number',
                default: 0.2
            },
            align: {
                type: 'string',
                default: 'none'
            }
        },
        transforms: {
            from: [{
                type: 'block',
                blocks: ['core/button'],
                transform: function transform(attributes) {
                    return createBlock('advgb/button', _extends({}, attributes, {
                        bgColor: attributes.color
                    }));
                }
            }],
            to: [{
                type: 'block',
                blocks: ['core/button'],
                transform: function transform(attributes) {
                    return createBlock('core/button', _extends({}, attributes, {
                        color: attributes.bgColor
                    }));
                }
            }]
        },
        edit: AdvButton,
        save: function save(_ref) {
            var attributes = _ref.attributes;
            var id = attributes.id,
                align = attributes.align,
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
                borderStyle = attributes.borderStyle,
                hoverTextColor = attributes.hoverTextColor,
                hoverBgColor = attributes.hoverBgColor,
                hoverShadowColor = attributes.hoverShadowColor,
                hoverShadowH = attributes.hoverShadowH,
                hoverShadowV = attributes.hoverShadowV,
                hoverShadowBlur = attributes.hoverShadowBlur,
                hoverShadowSpread = attributes.hoverShadowSpread,
                transitionSpeed = attributes.transitionSpeed;


            return React.createElement(
                'div',
                { className: 'align' + align },
                React.createElement(
                    'a',
                    { className: 'wp-block-advgb-button_link ' + id,
                        href: url || '#', title: title,
                        target: !urlOpenNewTab ? '_self' : '_blank'
                    },
                    text
                ),
                React.createElement(
                    'style',
                    null,
                    '.' + id + ' {\n                        font-size: ' + textSize + 'px;\n                        color: ' + textColor + ';\n                        background-color: ' + bgColor + ';\n                        padding: ' + paddingTop + 'px ' + paddingRight + 'px ' + paddingBottom + 'px ' + paddingLeft + 'px;\n                        border-width: ' + borderWidth + 'px;\n                        border-color: ' + borderColor + ';\n                        border-radius: ' + borderRadius + 'px;\n                        border-style: ' + borderStyle + ';\n                    }\n                    .' + id + ':hover {\n                        color: ' + hoverTextColor + ';\n                        background-color: ' + hoverBgColor + ';\n                        box-shadow: ' + hoverShadowH + 'px ' + hoverShadowV + 'px ' + hoverShadowBlur + 'px ' + hoverShadowSpread + 'px ' + hoverShadowColor + ';\n                        transition: all ' + transitionSpeed + 's ease;\n                    }'
                )
            );
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
})(wp.i18n, wp.blocks, wp.element, wp.editor, wp.components);
