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
        ColorPalette = wpEditor.ColorPalette;
    var Dashicon = wpComponents.Dashicon,
        Tooltip = wpComponents.Tooltip,
        PanelBody = wpComponents.PanelBody,
        PanelColor = wpComponents.PanelColor,
        RangeControl = wpComponents.RangeControl,
        SelectControl = wpComponents.SelectControl;

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
                if (!this.props.attributes.blockID) {
                    this.props.setAttributes({ blockID: this.props.id });
                }
            }
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate(prevProps) {
                var prevItems = prevProps.attributes.tabItems;
                var tabItems = this.props.attributes.tabItems;


                if (prevItems !== tabItems) {
                    this.initTabs(true);
                }

                if (tabItems.length === 0) {
                    this.props.setAttributes({
                        tabItems: [{
                            header: 'Tab 1',
                            body: 'At least one tab must remaining, to remove block use "Remove Block" button from right menu.'
                        }]
                    });
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
                    setAttributes = _props2.setAttributes,
                    id = _props2.id;
                var tabItems = attributes.tabItems,
                    headerBgColor = attributes.headerBgColor,
                    headerTextColor = attributes.headerTextColor,
                    bodyBgColor = attributes.bodyBgColor,
                    bodyTextColor = attributes.bodyTextColor,
                    borderStyle = attributes.borderStyle,
                    borderWidth = attributes.borderWidth,
                    borderColor = attributes.borderColor,
                    borderRadius = attributes.borderRadius,
                    blockID = attributes.blockID,
                    activeTabBgColor = attributes.activeTabBgColor,
                    activeTabTextColor = attributes.activeTabTextColor;


                return React.createElement(
                    Fragment,
                    null,
                    React.createElement(
                        InspectorControls,
                        null,
                        React.createElement(
                            PanelBody,
                            { title: __('Tab Settings') },
                            React.createElement(
                                PanelColor,
                                { title: __('Background Color'), colorValue: headerBgColor, initialOpen: false },
                                React.createElement(ColorPalette, {
                                    value: headerBgColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ headerBgColor: value });
                                    }
                                })
                            ),
                            React.createElement(
                                PanelColor,
                                { title: __('Text Color'), colorValue: headerTextColor, initialOpen: false },
                                React.createElement(ColorPalette, {
                                    value: headerTextColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ headerTextColor: value });
                                    }
                                })
                            ),
                            React.createElement(
                                PanelBody,
                                { title: __('Active Tab Settings') },
                                React.createElement(
                                    PanelColor,
                                    { title: __('Background Color'), colorValue: activeTabBgColor, initialOpen: false },
                                    React.createElement(ColorPalette, {
                                        value: activeTabBgColor,
                                        onChange: function onChange(value) {
                                            return setAttributes({ activeTabBgColor: value });
                                        }
                                    })
                                ),
                                React.createElement(
                                    PanelColor,
                                    { title: __('Text Color'), colorValue: activeTabTextColor, initialOpen: false },
                                    React.createElement(ColorPalette, {
                                        value: activeTabTextColor,
                                        onChange: function onChange(value) {
                                            return setAttributes({ activeTabTextColor: value });
                                        }
                                    })
                                )
                            )
                        ),
                        React.createElement(
                            PanelBody,
                            { title: __('Body Settings'), initialOpen: false },
                            React.createElement(
                                PanelColor,
                                { title: __('Background Color'), colorValue: bodyBgColor, initialOpen: false },
                                React.createElement(ColorPalette, {
                                    value: bodyBgColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ bodyBgColor: value });
                                    }
                                })
                            ),
                            React.createElement(
                                PanelColor,
                                { title: __('Text Color'), colorValue: bodyTextColor, initialOpen: false },
                                React.createElement(ColorPalette, {
                                    value: bodyTextColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ bodyTextColor: value });
                                    }
                                })
                            )
                        ),
                        React.createElement(
                            PanelBody,
                            { title: __('Border Settings'), initialOpen: false },
                            React.createElement(SelectControl, {
                                label: __('Border Style'),
                                value: borderStyle,
                                options: [{ label: __('Solid'), value: 'solid' }, { label: __('Dashed'), value: 'dashed' }, { label: __('Dotted'), value: 'dotted' }],
                                onChange: function onChange(value) {
                                    return setAttributes({ borderStyle: value });
                                }
                            }),
                            React.createElement(
                                PanelColor,
                                { title: __('Border Color'), colorValue: borderColor, initialOpen: false },
                                React.createElement(ColorPalette, {
                                    value: borderColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ borderColor: value });
                                    }
                                })
                            ),
                            React.createElement(RangeControl, {
                                label: __('Border width'),
                                value: borderWidth,
                                min: 1,
                                max: 10,
                                onChange: function onChange(value) {
                                    return setAttributes({ borderWidth: value });
                                }
                            }),
                            React.createElement(RangeControl, {
                                label: __('Border radius'),
                                value: borderRadius,
                                min: 0,
                                max: 100,
                                onChange: function onChange(value) {
                                    return setAttributes({ borderRadius: value });
                                }
                            })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'advgb-tabs-block', style: { border: 'none' } },
                        React.createElement(
                            'ul',
                            { className: 'advgb-tabs-panel',
                                style: {
                                    borderStyle: borderStyle,
                                    borderWidth: borderWidth + 'px',
                                    borderColor: borderColor,
                                    borderRadius: borderRadius + 'px'
                                }
                            },
                            tabItems.map(function (item, index) {
                                return React.createElement(
                                    'li',
                                    { key: index, className: 'advgb-tab',
                                        style: {
                                            backgroundColor: headerBgColor,
                                            borderStyle: borderStyle,
                                            borderWidth: borderWidth + 'px',
                                            borderColor: borderColor,
                                            borderRadius: borderRadius + 'px',
                                            margin: '-' + borderWidth + 'px 0 -' + borderWidth + 'px -' + borderWidth + 'px'
                                        }
                                    },
                                    React.createElement(
                                        'a',
                                        { href: '#' + item.header.toLowerCase().replace(/\s/g, '').trim() + '-' + index,
                                            style: { color: headerTextColor }
                                        },
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
                                { className: 'advgb-tab advgb-add-tab ui-state-default',
                                    style: {
                                        borderRadius: borderRadius + 'px',
                                        borderWidth: borderWidth + 'px',
                                        margin: '-' + borderWidth + 'px 0 -' + borderWidth + 'px -' + borderWidth + 'px'
                                    }
                                },
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
                                    id: item.header.toLowerCase().replace(/\s/g, '') + '-' + index,
                                    className: 'advgb-tab-body',
                                    style: {
                                        backgroundColor: bodyBgColor,
                                        color: bodyTextColor,
                                        borderStyle: borderStyle,
                                        borderWidth: borderWidth + 'px',
                                        borderColor: borderColor,
                                        borderRadius: borderRadius + 'px'
                                    }
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
                    ),
                    !!blockID && React.createElement(
                        'style',
                        null,
                        activeTabBgColor && '#block-' + id + ' li.advgb-tab.ui-tabs-active {\n                                background-color: ' + activeTabBgColor + ' !important;\n                            }',
                        activeTabTextColor && '#block-' + id + ' li.advgb-tab.ui-tabs-active a {\n                                color: ' + activeTabTextColor + ' !important;\n                            }'
                    )
                );
            }
        }]);

        return AdvTabsBlock;
    }(Component);

    var blockColor = typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined;
    var tabsBlockIcon = React.createElement(
        'svg',
        { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 24 24', fill: blockColor },
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
                    body: __('Filler text (also placeholder text or dummy text) is text that shares some characteristics of a real written text, but is random or otherwise generated.')
                }, {
                    header: __('Tab 2'),
                    body: __('Filler text (also placeholder text or dummy text) is text that shares some characteristics of a real written text, but is random or otherwise generated.')
                }, {
                    header: __('Tab 3'),
                    body: __('Filler text (also placeholder text or dummy text) is text that shares some characteristics of a real written text, but is random or otherwise generated.')
                }]
            },
            headerBgColor: {
                type: 'string',
                default: '#000'
            },
            headerTextColor: {
                type: 'string',
                default: '#fff'
            },
            bodyBgColor: {
                type: 'string'
            },
            bodyTextColor: {
                type: 'string'
            },
            borderStyle: {
                type: 'string',
                default: 'solid'
            },
            borderWidth: {
                type: 'number',
                default: 1
            },
            borderColor: {
                type: 'string'
            },
            borderRadius: {
                type: 'number',
                default: 2
            },
            blockID: {
                type: 'string'
            },
            activeTabBgColor: {
                type: 'string'
            },
            activeTabTextColor: {
                type: 'string'
            }
        },
        edit: AdvTabsBlock,
        save: function save(_ref) {
            var attributes = _ref.attributes;
            var tabItems = attributes.tabItems,
                headerBgColor = attributes.headerBgColor,
                headerTextColor = attributes.headerTextColor,
                bodyBgColor = attributes.bodyBgColor,
                bodyTextColor = attributes.bodyTextColor,
                borderStyle = attributes.borderStyle,
                borderWidth = attributes.borderWidth,
                borderColor = attributes.borderColor,
                borderRadius = attributes.borderRadius,
                blockID = attributes.blockID,
                activeTabBgColor = attributes.activeTabBgColor,
                activeTabTextColor = attributes.activeTabTextColor;


            return React.createElement(
                'div',
                { id: 'advgb-tabs-' + blockID, className: 'advgb-tabs-block', style: { border: 'none' } },
                React.createElement(
                    'ul',
                    { className: 'advgb-tabs-panel',
                        style: {
                            borderStyle: borderStyle,
                            borderWidth: borderWidth + 'px',
                            borderColor: borderColor,
                            borderRadius: borderRadius + 'px'
                        }
                    },
                    tabItems.map(function (item, index) {
                        return React.createElement(
                            'li',
                            { key: index, className: 'advgb-tab',
                                style: {
                                    backgroundColor: headerBgColor,
                                    borderStyle: borderStyle,
                                    borderWidth: borderWidth + 'px',
                                    borderColor: borderColor,
                                    borderRadius: borderRadius + 'px',
                                    margin: '-' + borderWidth + 'px 0 -' + borderWidth + 'px -' + borderWidth + 'px'
                                }
                            },
                            React.createElement(
                                'a',
                                { href: '#' + item.header.toLowerCase().replace(/\s/g, '') + '-' + index,
                                    style: { color: headerTextColor }
                                },
                                React.createElement(RichText.Content, { tagName: 'span', value: item.header })
                            )
                        );
                    })
                ),
                tabItems.map(function (item, index) {
                    return React.createElement(
                        'div',
                        { key: index,
                            id: item.header.toLowerCase().replace(/\s/g, '') + '-' + index,
                            className: 'advgb-tab-body',
                            style: {
                                backgroundColor: bodyBgColor,
                                color: bodyTextColor,
                                borderStyle: borderStyle,
                                borderWidth: borderWidth + 'px',
                                borderColor: borderColor,
                                borderRadius: borderRadius + 'px'
                            }
                        },
                        React.createElement(RichText.Content, { tagName: 'p', value: item.body })
                    );
                }),
                !!blockID && React.createElement(
                    'style',
                    null,
                    activeTabBgColor && '#advgb-tabs-' + blockID + ' li.advgb-tab.ui-tabs-active {\n                                background-color: ' + activeTabBgColor + ' !important;\n                            }\n                            ',
                    activeTabTextColor && '#advgb-tabs-' + blockID + ' li.advgb-tab.ui-tabs-active a {\n                                color: ' + activeTabTextColor + ' !important;\n                            }'
                )
            );
        }
    });
})(wp.i18n, wp.blocks, wp.element, wp.editor, wp.components);
