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
    PanelColor = _wp$components.PanelColor;

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
                headerTextColor = attributes.headerTextColor,
                countUpNumber = attributes.countUpNumber,
                countUpNumberColor = attributes.countUpNumberColor,
                countUpNumberSize = attributes.countUpNumberSize,
                descText = attributes.descText,
                descTextColor = attributes.descTextColor;


            return React.createElement(
                Fragment,
                null,
                React.createElement(
                    InspectorControls,
                    null,
                    React.createElement(
                        PanelBody,
                        { title: __('Count Up Setting') },
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
                        })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'advgb-count-up', style: { textAlign: 'center' } },
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
                )
            );
        }
    }]);

    return AdvCountUp;
}(Component);

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
        headerTextColor: {
            type: 'string'
        },
        countUpNumber: {
            type: 'number',
            default: 5678.9
        },
        countUpNumberColor: {
            type: 'string'
        },
        countUpNumberSize: {
            type: 'number',
            default: 60
        },
        descText: {
            type: 'string',
            default: __('and description')
        },
        descTextColor: {
            type: 'string'
        }
    },
    edit: AdvCountUp,
    save: function save(_ref) {
        var attributes = _ref.attributes;
        var headerText = attributes.headerText,
            headerTextColor = attributes.headerTextColor,
            countUpNumber = attributes.countUpNumber,
            countUpNumberColor = attributes.countUpNumberColor,
            countUpNumberSize = attributes.countUpNumberSize,
            descText = attributes.descText,
            descTextColor = attributes.descTextColor;


        return React.createElement(
            'div',
            { className: 'advgb-count-up', style: { textAlign: 'center' } },
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
                countUpNumber
            ),
            React.createElement(
                'p',
                { className: 'advgb-count-up-desc', style: { color: descTextColor } },
                descText
            )
        );
    }
});
