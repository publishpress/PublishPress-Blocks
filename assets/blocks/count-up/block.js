'use strict';

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
    RichText = _wp$blocks.RichText,
    ColorPalette = _wp$blocks.ColorPalette;
var _wp$components = wp.components,
    RangeControl = _wp$components.RangeControl,
    PanelBody = _wp$components.PanelBody,
    PanelColor = _wp$components.PanelColor,
    TextControl = _wp$components.TextControl,
    SelectControl = _wp$components.SelectControl,
    Fill = _wp$components.Fill;

var AdvCountUp = function (_Component) {
    _inherits(AdvCountUp, _Component);

    function AdvCountUp() {
        _classCallCheck(this, AdvCountUp);

        var _this = _possibleConstructorReturn(this, (AdvCountUp.__proto__ || Object.getPrototypeOf(AdvCountUp)).apply(this, arguments));

        _this.state = {
            currentEdit: ''
        };

        _this.setCurrentEditArea = _this.setCurrentEditArea.bind(_this);
        return _this;
    }

    _createClass(AdvCountUp, [{
        key: 'setCurrentEditArea',
        value: function setCurrentEditArea(area) {
            this.setState({ currentEdit: area });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var currentEdit = this.state.currentEdit;
            var _props = this.props,
                attributes = _props.attributes,
                setAttributes = _props.setAttributes,
                isSelected = _props.isSelected;
            var headerText = attributes.headerText,
                headerText2 = attributes.headerText2,
                headerText3 = attributes.headerText3,
                headerTextColor = attributes.headerTextColor,
                countUpNumber = attributes.countUpNumber,
                countUpNumber2 = attributes.countUpNumber2,
                countUpNumber3 = attributes.countUpNumber3,
                countUpNumberColor = attributes.countUpNumberColor,
                countUpNumberSize = attributes.countUpNumberSize,
                countUpSymbol = attributes.countUpSymbol,
                countUpSymbolPosition = attributes.countUpSymbolPosition,
                descText = attributes.descText,
                descText2 = attributes.descText2,
                descText3 = attributes.descText3,
                descTextColor = attributes.descTextColor,
                columns = attributes.columns;


            return React.createElement(
                Fragment,
                null,
                React.createElement(
                    InspectorControls,
                    null,
                    React.createElement(
                        PanelBody,
                        { title: __('Count Up Setting') },
                        React.createElement(SelectControl, {
                            label: __('Columns'),
                            help: __('Set numbers of Count Up be shown.'),
                            value: columns,
                            options: [{ label: 'One', value: 1 }, { label: 'Two', value: 2 }, { label: 'Three', value: 3 }],
                            onChange: function onChange(value) {
                                return setAttributes({ columns: value });
                            }
                        }),
                        React.createElement(
                            PanelColor,
                            { title: __('Header Color'), colorValue: headerTextColor, initialOpen: false },
                            React.createElement(ColorPalette, {
                                value: headerTextColor,
                                onChange: function onChange(value) {
                                    return setAttributes({ headerTextColor: value });
                                }
                            })
                        ),
                        React.createElement(
                            PanelColor,
                            { title: __('Count Up Color'), colorValue: countUpNumberColor, initialOpen: false },
                            React.createElement(ColorPalette, {
                                value: countUpNumberColor,
                                onChange: function onChange(value) {
                                    return setAttributes({ countUpNumberColor: value });
                                }
                            })
                        ),
                        React.createElement(
                            PanelColor,
                            { title: __('Description Color'), colorValue: descTextColor, initialOpen: false },
                            React.createElement(ColorPalette, {
                                value: descTextColor,
                                onChange: function onChange(value) {
                                    return setAttributes({ descTextColor: value });
                                }
                            })
                        ),
                        React.createElement(RangeControl, {
                            label: __('Counter Number Size'),
                            min: 10,
                            max: 100,
                            value: countUpNumberSize,
                            onChange: function onChange(value) {
                                return setAttributes({ countUpNumberSize: value });
                            }
                        }),
                        React.createElement(TextControl, {
                            label: __('Count Up Symbol'),
                            help: __('Add symbol before or after counter number.'),
                            value: countUpSymbol,
                            onChange: function onChange(value) {
                                return setAttributes({ countUpSymbol: value });
                            }
                        }),
                        React.createElement(SelectControl, {
                            label: __('Symbol Placement'),
                            value: countUpSymbolPosition,
                            options: [{ label: __('Before'), value: 'before' }, { label: __('After'), value: 'after' }],
                            onChange: function onChange(value) {
                                return setAttributes({ countUpSymbolPosition: value });
                            }
                        })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'advgb-count-up advgb-column-' + columns, style: { display: 'flex' } },
                    React.createElement(
                        'div',
                        { className: 'advgb-count-up-columns-one', style: { textAlign: 'center' } },
                        React.createElement(RichText, {
                            tagName: 'h4',
                            value: headerText,
                            onChange: function onChange(value) {
                                return setAttributes({ headerText: value });
                            },
                            isSelected: isSelected && currentEdit === 'header',
                            onFocus: function onFocus() {
                                return _this2.setCurrentEditArea('header');
                            },
                            style: { color: headerTextColor }
                        }),
                        React.createElement(RichText, {
                            tagName: 'div',
                            value: countUpNumber,
                            onChange: function onChange(value) {
                                return setAttributes({ countUpNumber: value });
                            },
                            isSelected: isSelected && currentEdit === 'countUp',
                            onFocus: function onFocus() {
                                return _this2.setCurrentEditArea('countUp');
                            },
                            style: { fontSize: countUpNumberSize + 'px', color: countUpNumberColor }
                        }),
                        React.createElement(RichText, {
                            tagName: 'p',
                            value: descText,
                            onChange: function onChange(value) {
                                return setAttributes({ descText: value });
                            },
                            isSelected: isSelected && currentEdit === 'desc',
                            onFocus: function onFocus() {
                                return _this2.setCurrentEditArea('desc');
                            },
                            style: { color: descTextColor }
                        })
                    ),
                    React.createElement(
                        'div',
                        { className: 'advgb-count-up-columns-two', style: { textAlign: 'center' } },
                        React.createElement(RichText, {
                            tagName: 'h4',
                            value: headerText2,
                            onChange: function onChange(value) {
                                return setAttributes({ headerText2: value });
                            },
                            isSelected: isSelected && currentEdit === 'header2',
                            onFocus: function onFocus() {
                                return _this2.setCurrentEditArea('header2');
                            },
                            style: { color: headerTextColor }
                        }),
                        React.createElement(RichText, {
                            tagName: 'div',
                            value: countUpNumber2,
                            onChange: function onChange(value) {
                                return setAttributes({ countUpNumber2: value });
                            },
                            isSelected: isSelected && currentEdit === 'countUp2',
                            onFocus: function onFocus() {
                                return _this2.setCurrentEditArea('countUp2');
                            },
                            style: { fontSize: countUpNumberSize + 'px', color: countUpNumberColor }
                        }),
                        React.createElement(RichText, {
                            tagName: 'p',
                            value: descText2,
                            onChange: function onChange(value) {
                                return setAttributes({ descText2: value });
                            },
                            isSelected: isSelected && currentEdit === 'desc2',
                            onFocus: function onFocus() {
                                return _this2.setCurrentEditArea('desc2');
                            },
                            style: { color: descTextColor }
                        })
                    ),
                    React.createElement(
                        'div',
                        { className: 'advgb-count-up-columns-three', style: { textAlign: 'center' } },
                        React.createElement(RichText, {
                            tagName: 'h4',
                            value: headerText3,
                            onChange: function onChange(value) {
                                return setAttributes({ headerText3: value });
                            },
                            isSelected: isSelected && currentEdit === 'header3',
                            onFocus: function onFocus() {
                                return _this2.setCurrentEditArea('header3');
                            },
                            style: { color: headerTextColor }
                        }),
                        React.createElement(RichText, {
                            tagName: 'div',
                            value: countUpNumber3,
                            onChange: function onChange(value) {
                                return setAttributes({ countUpNumber3: value });
                            },
                            isSelected: isSelected && currentEdit === 'countUp3',
                            onFocus: function onFocus() {
                                return _this2.setCurrentEditArea('countUp3');
                            },
                            style: { fontSize: countUpNumberSize + 'px', color: countUpNumberColor }
                        }),
                        React.createElement(RichText, {
                            tagName: 'p',
                            value: descText3,
                            onChange: function onChange(value) {
                                return setAttributes({ descText3: value });
                            },
                            isSelected: isSelected && currentEdit === 'desc3',
                            onFocus: function onFocus() {
                                return _this2.setCurrentEditArea('desc3');
                            },
                            style: { color: descTextColor }
                        })
                    )
                )
            );
        }
    }]);

    return AdvCountUp;
}(Component);

function AdvCountUpSave(_ref) {
    var attributes = _ref.attributes;
    var headerText = attributes.headerText,
        headerText2 = attributes.headerText2,
        headerText3 = attributes.headerText3,
        headerTextColor = attributes.headerTextColor,
        countUpNumber = attributes.countUpNumber,
        countUpNumber2 = attributes.countUpNumber2,
        countUpNumber3 = attributes.countUpNumber3,
        countUpNumberColor = attributes.countUpNumberColor,
        countUpNumberSize = attributes.countUpNumberSize,
        countUpSymbol = attributes.countUpSymbol,
        countUpSymbolPosition = attributes.countUpSymbolPosition,
        descText = attributes.descText,
        descText2 = attributes.descText2,
        descText3 = attributes.descText3,
        descTextColor = attributes.descTextColor,
        columns = attributes.columns;


    var countSymbolElm = React.createElement(
        'span',
        { className: 'advgb-counter-symbol' },
        countUpSymbol
    );

    return React.createElement(
        'div',
        { className: 'advgb-count-up', style: { display: 'flex' } },
        React.createElement(
            'div',
            { className: 'advgb-count-up-columns-one', style: { textAlign: 'center' } },
            React.createElement(
                'h4',
                { className: 'advgb-count-up-header', style: { color: headerTextColor } },
                headerText
            ),
            React.createElement(
                'div',
                { className: 'advgb-counter',
                    style: { color: countUpNumberColor, fontSize: countUpNumberSize + 'px' }
                },
                countUpSymbolPosition === 'before' && countSymbolElm,
                React.createElement(
                    'span',
                    { className: 'advgb-counter-number' },
                    countUpNumber
                ),
                countUpSymbolPosition === 'after' && countSymbolElm
            ),
            React.createElement(
                'p',
                { className: 'advgb-count-up-desc', style: { color: descTextColor } },
                descText
            )
        ),
        parseInt(columns) > 1 && React.createElement(
            'div',
            { className: 'advgb-count-up-columns-two', style: { textAlign: 'center' } },
            React.createElement(
                'h4',
                { className: 'advgb-count-up-header', style: { color: headerTextColor } },
                headerText2
            ),
            React.createElement(
                'div',
                { className: 'advgb-counter',
                    style: { color: countUpNumberColor, fontSize: countUpNumberSize + 'px' }
                },
                countUpSymbolPosition === 'before' && countSymbolElm,
                React.createElement(
                    'span',
                    { className: 'advgb-counter-number' },
                    countUpNumber2
                ),
                countUpSymbolPosition === 'after' && countSymbolElm
            ),
            React.createElement(
                'p',
                { className: 'advgb-count-up-desc', style: { color: descTextColor } },
                descText2
            )
        ),
        parseInt(columns) > 2 && React.createElement(
            'div',
            { className: 'advgb-count-up-columns-three', style: { textAlign: 'center' } },
            React.createElement(
                'h4',
                { className: 'advgb-count-up-header', style: { color: headerTextColor } },
                headerText3
            ),
            React.createElement(
                'div',
                { className: 'advgb-counter',
                    style: { color: countUpNumberColor, fontSize: countUpNumberSize + 'px' }
                },
                countUpSymbolPosition === 'before' && countSymbolElm,
                React.createElement(
                    'span',
                    { className: 'advgb-counter-number' },
                    countUpNumber3
                ),
                countUpSymbolPosition === 'after' && countSymbolElm
            ),
            React.createElement(
                'p',
                { className: 'advgb-count-up-desc', style: { color: descTextColor } },
                descText3
            )
        )
    );
}

var countUpBlockIcon = React.createElement(
    'svg',
    { fill: '#000000', height: '20', viewBox: '1 2 20 20', width: '20', xmlns: 'http://www.w3.org/2000/svg' },
    React.createElement('path', { d: 'M0 0h24v24H0zm0 0h24v24H0z', fill: 'none' }),
    React.createElement('path', { d: 'M16.05 16.29l2.86-3.07c.38-.39.72-.79 1.04-1.18.32-.39.59-.78.82-1.17.23-.39.41-.78.54-1.17.13-.39.19-.79.19-1.18 0-.53-.09-1.02-.27-1.46-.18-.44-.44-.81-.78-1.11-.34-.31-.77-.54-1.26-.71-.51-.16-1.08-.24-1.72-.24-.69 0-1.31.11-1.85.32-.54.21-1 .51-1.36.88-.37.37-.65.8-.84 1.3-.18.47-.27.97-.28 1.5h2.14c.01-.31.05-.6.13-.87.09-.29.23-.54.4-.75.18-.21.41-.37.68-.49.27-.12.6-.18.96-.18.31 0 .58.05.81.15.23.1.43.25.59.43.16.18.28.4.37.65.08.25.13.52.13.81 0 .22-.03.43-.08.65-.06.22-.15.45-.29.7-.14.25-.32.53-.56.83-.23.3-.52.65-.88 1.03l-4.17 4.55V18H22v-1.71h-5.95zM8 7H6v4H2v2h4v4h2v-4h4v-2H8V7z' })
);

registerBlockType('advgb/count-up', {
    title: __('Count Up'),
    description: __('Make a block with animate counting numbers.'),
    icon: countUpBlockIcon,
    category: 'common',
    keywords: [__('numbers'), __('count'), __('increase')],
    attributes: {
        headerText: {
            type: 'string',
            default: __('Header text')
        },
        headerText2: {
            type: 'string',
            default: __('Header text')
        },
        headerText3: {
            type: 'string',
            default: __('Header text')
        },
        headerTextColor: {
            type: 'string'
        },
        countUpNumber: {
            type: 'number',
            default: 56789
        },
        countUpNumber2: {
            type: 'number',
            default: 56789
        },
        countUpNumber3: {
            type: 'number',
            default: 56789
        },
        countUpNumberColor: {
            type: 'string'
        },
        countUpNumberSize: {
            type: 'number',
            default: 55
        },
        countUpSymbol: {
            type: 'string'
        },
        countUpSymbolPosition: {
            type: 'string',
            default: 'before'
        },
        descText: {
            type: 'string',
            default: __('and description')
        },
        descText2: {
            type: 'string',
            default: __('and description')
        },
        descText3: {
            type: 'string',
            default: __('and description')
        },
        descTextColor: {
            type: 'string'
        },
        columns: {
            type: 'number',
            default: 1
        }
    },
    edit: AdvCountUp,
    save: AdvCountUpSave
});
