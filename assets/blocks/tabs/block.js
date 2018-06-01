'use strict';

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
        RichText = wpEditor.RichText,
        ColorPalette = wpEditor.ColorPalette,
        InnerBlocks = wpEditor.InnerBlocks;
    var RangeControl = wpComponents.RangeControl,
        PanelBody = wpComponents.PanelBody,
        PanelColor = wpComponents.PanelColor,
        SelectControl = wpComponents.SelectControl,
        Dashicon = wpComponents.Dashicon,
        Tooltip = wpComponents.Tooltip;

    var AdvTabsBlock = function (_Component) {
        _inherits(AdvTabsBlock, _Component);

        function AdvTabsBlock() {
            _classCallCheck(this, AdvTabsBlock);

            return _possibleConstructorReturn(this, (AdvTabsBlock.__proto__ || Object.getPrototypeOf(AdvTabsBlock)).apply(this, arguments));
        }

        _createClass(AdvTabsBlock, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.initTabs();
            }
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate(prevProps) {
                var prevItems = prevProps.attributes.tabItems;
                var tabItems = this.props.attributes.tabItems;


                if (prevItems !== tabItems) {
                    this.initTabs(true);
                }
            }
        }, {
            key: 'initTabs',
            value: function initTabs() {
                var refresh = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

                if (typeof jQuery !== "undefined") {
                    if (!refresh) {
                        jQuery('#block-' + this.props.id + ' .advgb-tabs-block').tabs();
                    } else {
                        jQuery('#block-' + this.props.id + ' .advgb-tabs-block').tabs('refresh');
                    }

                    jQuery('#block-' + this.props.id + ' .advgb-tabs-block a').on('keydown', function (e) {
                        e.stopPropagation();
                    });
                }
            }
        }, {
            key: 'updateTabs',
            value: function updateTabs(value, index) {
                var _props = this.props,
                    attributes = _props.attributes,
                    setAttributes = _props.setAttributes;
                var tabItems = attributes.tabItems;


                var newItems = tabItems.map(function (item, thisIndex) {
                    if (index === thisIndex) {
                        item = _extends({}, item, value);
                    }

                    return item;
                });

                setAttributes({ tabItems: newItems });
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                var _props2 = this.props,
                    attributes = _props2.attributes,
                    setAttributes = _props2.setAttributes;
                var tabItems = attributes.tabItems;


                return React.createElement(
                    Fragment,
                    null,
                    React.createElement(
                        'div',
                        { className: 'advgb-tabs-block' },
                        React.createElement(
                            'ul',
                            { className: 'advgb-tabs-panel' },
                            tabItems.map(function (item, index) {
                                return React.createElement(
                                    'li',
                                    { key: index, className: 'advgb-tab' },
                                    React.createElement(
                                        'a',
                                        { href: '#' + item.header.toLowerCase().replace(/ /g, '') + '-' + index },
                                        React.createElement(RichText, {
                                            tagName: 'p',
                                            value: item.header,
                                            onChange: function onChange(value) {
                                                return _this2.updateTabs({ header: value[0] || '' }, index);
                                            },
                                            onSplit: function onSplit() {
                                                return null;
                                            },
                                            placeholder: __('Title…')
                                        })
                                    ),
                                    React.createElement(
                                        Tooltip,
                                        { text: __('Remove tab') },
                                        React.createElement(
                                            'span',
                                            { className: 'advgb-tab-remove',
                                                onClick: function onClick() {
                                                    return setAttributes({
                                                        tabItems: tabItems.filter(function (vl, idx) {
                                                            return idx !== index;
                                                        })
                                                    });
                                                }
                                            },
                                            React.createElement(Dashicon, { icon: 'no' })
                                        )
                                    )
                                );
                            }),
                            React.createElement(
                                'li',
                                { className: 'advgb-tab advgb-add-tab' },
                                React.createElement(
                                    Tooltip,
                                    { text: __('Add tab') },
                                    React.createElement(
                                        'span',
                                        { onClick: function onClick() {
                                                return setAttributes({
                                                    tabItems: [].concat(_toConsumableArray(tabItems), [{ header: __('New Tab'), body: __('Enter your content.') }])
                                                });
                                            } },
                                        React.createElement(Dashicon, { icon: 'plus-alt' })
                                    )
                                )
                            )
                        ),
                        tabItems.map(function (item, index) {
                            return React.createElement(
                                'div',
                                { key: index,
                                    id: item.header.toLowerCase().replace(/ /g, '') + '-' + index,
                                    className: 'advgb-tab-body'
                                },
                                React.createElement(RichText, {
                                    tagName: 'p',
                                    value: item.body,
                                    onChange: function onChange(value) {
                                        return _this2.updateTabs({ body: value }, index);
                                    },
                                    placeholder: __('Enter text…')
                                })
                            );
                        })
                    )
                );
            }
        }]);

        return AdvTabsBlock;
    }(Component);

    var tabsBlockIcon = React.createElement(
        'svg',
        { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 24 24' },
        React.createElement('path', { fill: 'none', d: 'M0,0h24v24H0V0z' }),
        React.createElement('path', { fill: 'none', d: 'M0,0h24v24H0V0z' }),
        React.createElement('path', { d: 'M21,3H3C1.9,3,1,3.9,1,5v14c0,1.1,0.9,2,2,2h18c1.1,0,2-0.9,2-2V5C23,3.9,22.1,3,21,3z M21,19H3V5h10v4h8V19z' })
    );

    registerBlockType('advgb/tabs', {
        title: __('Tabs'),
        description: __('Create your own tabs never easy like this.'),
        icon: tabsBlockIcon,
        category: "formatting",
        keywords: [__('tabs'), __('cards')],
        attributes: {
            tabItems: {
                type: "array",
                default: [{
                    header: __('Tab 1'),
                    body: __('Lorem ipsum dolor sit amet, consectetur adipiscing elit 1.')
                }, {
                    header: __('Tab 2'),
                    body: __('Lorem ipsum dolor sit amet, consectetur adipiscing elit 2.')
                }, {
                    header: __('Tab 3'),
                    body: __('Lorem ipsum dolor sit amet, consectetur adipiscing elit 3.')
                }]
            }
        },
        edit: AdvTabsBlock,
        save: function save(_ref) {
            var attributes = _ref.attributes;
            var tabItems = attributes.tabItems;


            return React.createElement(
                'div',
                { className: 'advgb-tabs-block' },
                React.createElement(
                    'ul',
                    { className: 'advgb-tabs-panel' },
                    tabItems.map(function (item, index) {
                        return React.createElement(
                            'li',
                            { key: index, className: 'advgb-tab' },
                            React.createElement(
                                'a',
                                { href: '#' + item.header.toLowerCase().replace(/ /g, '') + '-' + index },
                                React.createElement(RichText.Content, { tagName: 'span', value: item.header })
                            )
                        );
                    })
                ),
                tabItems.map(function (item, index) {
                    return React.createElement(
                        'div',
                        { key: index,
                            id: item.header.toLowerCase().replace(/ /g, '') + '-' + index,
                            className: 'advgb-tab-body'
                        },
                        React.createElement(RichText.Content, { tagName: 'p', value: item.body })
                    );
                })
            );
        }
    });
})(wp.i18n, wp.blocks, wp.element, wp.editor, wp.components);
