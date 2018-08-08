"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
    var RangeControl = wpComponents.RangeControl,
        PanelBody = wpComponents.PanelBody,
        PanelColor = wpComponents.PanelColor,
        BaseControl = wpComponents.BaseControl,
        SelectControl = wpComponents.SelectControl,
        Dashicon = wpComponents.Dashicon,
        Tooltip = wpComponents.Tooltip;


    var HEADER_ICONS = {
        plus: React.createElement(
            Fragment,
            null,
            React.createElement("path", { fill: "none", d: "M0,0h24v24H0V0z" }),
            React.createElement("path", { d: "M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z" })
        ),
        plusCircle: React.createElement(
            Fragment,
            null,
            React.createElement("path", { fill: "none", d: "M0,0h24v24H0V0z" }),
            React.createElement("path", { d: "M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M17,13h-4v4h-2v-4H7v-2h4V7h2v4h4V13z" })
        ),
        plusCircleOutline: React.createElement(
            Fragment,
            null,
            React.createElement("path", { fill: "none", d: "M0,0h24v24H0V0z" }),
            React.createElement("path", { d: "M13,7h-2v4H7v2h4v4h2v-4h4v-2h-4V7z M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20 c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z" })
        ),
        plusBox: React.createElement(
            Fragment,
            null,
            React.createElement("path", { fill: "none", d: "M0,0h24v24H0V0z" }),
            React.createElement("path", { d: "M19,3H5C3.89,3,3,3.9,3,5v14c0,1.1,0.89,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V5h14V19z" }),
            React.createElement("polygon", { points: "11,17 13,17 13,13 17,13 17,11 13,11 13,7 11,7 11,11 7,11 7,13 11,13" })
        ),
        unfold: React.createElement(
            Fragment,
            null,
            React.createElement("path", { fill: "none", d: "M0,0h24v24H0V0z" }),
            React.createElement("path", { d: "M12,5.83L15.17,9l1.41-1.41L12,3L7.41,7.59L8.83,9L12,5.83z M12,18.17L8.83,15l-1.41,1.41L12,21l4.59-4.59L15.17,15 L12,18.17z" })
        ),
        threeDots: React.createElement(
            Fragment,
            null,
            React.createElement("path", { fill: "none", d: "M0,0h24v24H0V0z" }),
            React.createElement("path", { d: "M6,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S7.1,10,6,10z M18,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S19.1,10,18,10z M12,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S13.1,10,12,10z" })
        ),
        arrowDown: React.createElement(
            Fragment,
            null,
            React.createElement("path", { opacity: "0.87", fill: "none", d: "M24,24H0L0,0l24,0V24z" }),
            React.createElement("path", { d: "M16.59,8.59L12,13.17L7.41,8.59L6,10l6,6l6-6L16.59,8.59z" })
        )
    };

    var AdvAccordion = function (_Component) {
        _inherits(AdvAccordion, _Component);

        function AdvAccordion() {
            _classCallCheck(this, AdvAccordion);

            var _this = _possibleConstructorReturn(this, (AdvAccordion.__proto__ || Object.getPrototypeOf(AdvAccordion)).apply(this, arguments));

            _this.state = {
                currentAccordion: null
            };
            return _this;
        }

        _createClass(AdvAccordion, [{
            key: "componentWillMount",
            value: function componentWillMount() {
                var _props = this.props,
                    attributes = _props.attributes,
                    setAttributes = _props.setAttributes;

                var currentBlockConfig = advgbDefaultConfig['advgb-accordion'];

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
            key: "componentDidMount",
            value: function componentDidMount() {
                this.initAccordion();
            }
        }, {
            key: "componentDidUpdate",
            value: function componentDidUpdate(prevProps) {
                if (prevProps.attributes.items.length < this.props.attributes.items.length) {
                    this.initAccordion(true);
                }

                if (this.props.attributes.items.length === 0) {
                    this.props.setAttributes({
                        items: [{
                            header: 'Header 1',
                            body: 'At least one accordion must remaining, to remove block use "Remove Block" button from right menu.'
                        }]
                    });
                }
            }
        }, {
            key: "initAccordion",
            value: function initAccordion() {
                var refresh = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

                if (typeof jQuery !== "undefined") {
                    if (!refresh) {
                        jQuery("#block-" + this.props.clientId + " .advgb-accordion-block").accordion({
                            header: ".advgb-accordion-header",
                            heightStyle: "content"
                        });
                    } else {
                        jQuery("#block-" + this.props.clientId + " .advgb-accordion-block").accordion('refresh');
                    }

                    jQuery("#block-" + this.props.clientId + " .advgb-accordion-block h4").on('keydown', function (e) {
                        e.stopPropagation();
                    });
                }
            }
        }, {
            key: "updateAccordion",
            value: function updateAccordion(value, index) {
                var _this2 = this;

                var _props2 = this.props,
                    attributes = _props2.attributes,
                    setAttributes = _props2.setAttributes;
                var items = attributes.items;


                var newItems = items.map(function (item, thisIndex) {
                    if (index === thisIndex) {
                        if (value.body) {
                            if (value.body.length !== item.body.length) {
                                _this2.initAccordion(true);
                            }
                        }

                        item = _extends({}, item, value);
                    }

                    return item;
                });

                setAttributes({ items: newItems });
            }
        }, {
            key: "render",
            value: function render() {
                var _this3 = this;

                var _props3 = this.props,
                    isSelected = _props3.isSelected,
                    attributes = _props3.attributes,
                    setAttributes = _props3.setAttributes;
                var items = attributes.items,
                    headerBgColor = attributes.headerBgColor,
                    headerTextColor = attributes.headerTextColor,
                    headerIcon = attributes.headerIcon,
                    headerIconColor = attributes.headerIconColor,
                    bodyBgColor = attributes.bodyBgColor,
                    bodyTextColor = attributes.bodyTextColor,
                    borderStyle = attributes.borderStyle,
                    borderWidth = attributes.borderWidth,
                    borderColor = attributes.borderColor,
                    borderRadius = attributes.borderRadius;


                return React.createElement(
                    Fragment,
                    null,
                    React.createElement(
                        InspectorControls,
                        null,
                        React.createElement(
                            PanelBody,
                            { title: __('Header Settings') },
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
                                { title: __('Header Icon') },
                                React.createElement(
                                    BaseControl,
                                    { label: __('Icon Style') },
                                    React.createElement(
                                        "div",
                                        { className: "advgb-icon-items-wrapper" },
                                        Object.keys(HEADER_ICONS).map(function (key, index) {
                                            return React.createElement(
                                                "div",
                                                { className: "advgb-icon-item", key: index },
                                                React.createElement(
                                                    "span",
                                                    { className: key === headerIcon ? 'active' : '',
                                                        onClick: function onClick() {
                                                            return setAttributes({ headerIcon: key });
                                                        } },
                                                    React.createElement(
                                                        "svg",
                                                        { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
                                                        HEADER_ICONS[key]
                                                    )
                                                )
                                            );
                                        })
                                    )
                                ),
                                React.createElement(
                                    PanelColor,
                                    { title: __('Icon Color'), colorValue: headerIconColor, initialOpen: false },
                                    React.createElement(ColorPalette, {
                                        value: headerIconColor,
                                        onChange: function onChange(value) {
                                            return setAttributes({ headerIconColor: value });
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
                        "div",
                        { className: "advgb-accordion-block" },
                        items.map(function (item, index) {
                            return React.createElement(
                                Fragment,
                                { key: index },
                                React.createElement(
                                    "div",
                                    { className: "advgb-accordion-header",
                                        style: {
                                            backgroundColor: headerBgColor,
                                            color: headerTextColor,
                                            borderStyle: borderStyle,
                                            borderWidth: borderWidth + 'px',
                                            borderColor: borderColor,
                                            borderRadius: borderRadius + 'px'
                                        }
                                    },
                                    React.createElement(
                                        Tooltip,
                                        { text: __('Remove item') },
                                        React.createElement(
                                            "span",
                                            { className: "advgb-accordion-remove",
                                                onClick: function onClick() {
                                                    return setAttributes({ items: items.filter(function (cItem, cIndex) {
                                                            return cIndex !== index;
                                                        }) });
                                                }
                                            },
                                            React.createElement(Dashicon, { icon: "no" })
                                        )
                                    ),
                                    React.createElement(
                                        "span",
                                        { className: "advgb-accordion-header-icon" },
                                        React.createElement(
                                            "svg",
                                            { fill: headerIconColor, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
                                            HEADER_ICONS[headerIcon]
                                        )
                                    ),
                                    React.createElement(RichText, {
                                        tagName: "h4",
                                        value: item.header,
                                        onChange: function onChange(value) {
                                            return _this3.updateAccordion({ header: value }, index);
                                        },
                                        onSplit: function onSplit() {
                                            return null;
                                        },
                                        placeholder: __('Enter header…')
                                    })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "advgb-accordion-body",
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
                                        tagName: "p",
                                        value: item.body,
                                        onChange: function onChange(value) {
                                            return _this3.updateAccordion({ body: value }, index);
                                        },
                                        placeholder: __('Enter text…')
                                    })
                                )
                            );
                        })
                    ),
                    isSelected && React.createElement(
                        "div",
                        { className: "advgb-accordion-controls" },
                        React.createElement(
                            "button",
                            { className: "button button-large button-primary",
                                onClick: function onClick() {
                                    return setAttributes({
                                        items: [].concat(_toConsumableArray(items), [{ header: __('New item'), body: __('New item') }])
                                    });
                                }
                            },
                            __('Add item')
                        )
                    )
                );
            }
        }]);

        return AdvAccordion;
    }(Component);

    var blockColor = typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined;
    var accordionBlockIcon = React.createElement(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "2 2 22 22", fill: blockColor },
        React.createElement("path", { fill: "none", d: "M0,0h24v24H0V0z" }),
        React.createElement("rect", { x: "3", y: "17", width: "18", height: "2" }),
        React.createElement("path", { d: "M19,12v1H5v-1H19 M21,10H3v5h18V10L21,10z" }),
        React.createElement("rect", { x: "3", y: "6", width: "18", height: "2" })
    );

    registerBlockType('advgb/accordion', {
        title: __('Accordion'),
        description: __('Easy to create an accordion for your post/page.'),
        icon: accordionBlockIcon,
        category: 'formatting',
        keywords: [__('accordion'), __('list'), __('faq')],
        attributes: {
            items: {
                type: 'array',
                default: [{
                    header: 'Header 1',
                    body: 'Filler text (also placeholder text or dummy text) is text that shares some characteristics of a real written text, but is random or otherwise generated'
                }, {
                    header: 'Header 2',
                    body: 'Description 2'
                }, {
                    header: 'Header 3',
                    body: 'Description 3'
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
            headerIcon: {
                type: 'string',
                default: 'plusCircleOutline'
            },
            headerIconColor: {
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
            changed: {
                type: 'boolean',
                default: false
            }
        },
        edit: AdvAccordion,
        save: function save(_ref) {
            var attributes = _ref.attributes;
            var items = attributes.items,
                headerBgColor = attributes.headerBgColor,
                headerTextColor = attributes.headerTextColor,
                headerIcon = attributes.headerIcon,
                headerIconColor = attributes.headerIconColor,
                bodyBgColor = attributes.bodyBgColor,
                bodyTextColor = attributes.bodyTextColor,
                borderStyle = attributes.borderStyle,
                borderWidth = attributes.borderWidth,
                borderColor = attributes.borderColor,
                borderRadius = attributes.borderRadius;


            return React.createElement(
                "div",
                { className: "advgb-accordion-block" },
                items.map(function (item, index) {
                    return React.createElement(
                        Fragment,
                        { key: index },
                        React.createElement(
                            "div",
                            { className: "advgb-accordion-header",
                                style: {
                                    backgroundColor: headerBgColor,
                                    color: headerTextColor,
                                    borderStyle: borderStyle,
                                    borderWidth: borderWidth + 'px',
                                    borderColor: borderColor,
                                    borderRadius: borderRadius + 'px'
                                }
                            },
                            React.createElement(
                                "span",
                                { className: "advgb-accordion-header-icon" },
                                React.createElement(
                                    "svg",
                                    { fill: headerIconColor, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
                                    HEADER_ICONS[headerIcon]
                                )
                            ),
                            React.createElement(
                                "h4",
                                { className: "advgb-accordion-header-title" },
                                item.header
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "advgb-accordion-body",
                                style: {
                                    backgroundColor: bodyBgColor,
                                    color: bodyTextColor,
                                    borderStyle: borderStyle,
                                    borderWidth: borderWidth + 'px',
                                    borderColor: borderColor,
                                    borderRadius: borderRadius + 'px'
                                }
                            },
                            React.createElement(RichText.Content, { tagName: "p", value: item.body })
                        )
                    );
                })
            );
        }
    });
})(wp.i18n, wp.blocks, wp.element, wp.editor, wp.components);
