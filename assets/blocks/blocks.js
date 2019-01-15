/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/blocks/accordion/block.jsx":
/*!*******************************************!*\
  !*** ./assets/blocks/accordion/block.jsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
        RichText = wpEditor.RichText,
        PanelColorSettings = wpEditor.PanelColorSettings,
        InnerBlocks = wpEditor.InnerBlocks;
    var RangeControl = wpComponents.RangeControl,
        PanelBody = wpComponents.PanelBody,
        BaseControl = wpComponents.BaseControl,
        SelectControl = wpComponents.SelectControl,
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
            key: "render",
            value: function render() {
                var _props2 = this.props,
                    isSelected = _props2.isSelected,
                    attributes = _props2.attributes,
                    setAttributes = _props2.setAttributes;
                var header = attributes.header,
                    headerBgColor = attributes.headerBgColor,
                    headerTextColor = attributes.headerTextColor,
                    headerIcon = attributes.headerIcon,
                    headerIconColor = attributes.headerIconColor,
                    bodyBgColor = attributes.bodyBgColor,
                    bodyTextColor = attributes.bodyTextColor,
                    borderStyle = attributes.borderStyle,
                    borderWidth = attributes.borderWidth,
                    borderColor = attributes.borderColor,
                    borderRadius = attributes.borderRadius,
                    marginBottom = attributes.marginBottom;


                return React.createElement(
                    Fragment,
                    null,
                    React.createElement(
                        InspectorControls,
                        null,
                        React.createElement(
                            PanelBody,
                            { title: __('Accordion Settings') },
                            React.createElement(RangeControl, {
                                label: __('Bottom spacing'),
                                value: marginBottom,
                                help: __('Define space to next block. This will override Block spacing option (Frontend view only)'),
                                min: 0,
                                max: 50,
                                onChange: function onChange(value) {
                                    return setAttributes({ marginBottom: value });
                                }
                            })
                        ),
                        React.createElement(
                            PanelBody,
                            { title: __('Header Settings') },
                            React.createElement(
                                BaseControl,
                                { label: __('Header Icon Style') },
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
                            React.createElement(PanelColorSettings, {
                                title: __('Color Settings'),
                                initialOpen: false,
                                colorSettings: [{
                                    label: __('Background Color'),
                                    value: headerBgColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ headerBgColor: value === undefined ? '#000' : value });
                                    }
                                }, {
                                    label: __('Text Color'),
                                    value: headerTextColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ headerTextColor: value === undefined ? '#eee' : value });
                                    }
                                }, {
                                    label: __('Icon Color'),
                                    value: headerIconColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ headerIconColor: value === undefined ? '#fff' : value });
                                    }
                                }]
                            })
                        ),
                        React.createElement(PanelColorSettings, {
                            title: __('Body Color Settings'),
                            initialOpen: false,
                            colorSettings: [{
                                label: __('Background Color'),
                                value: bodyBgColor,
                                onChange: function onChange(value) {
                                    return setAttributes({ bodyBgColor: value });
                                }
                            }, {
                                label: __('Text Color'),
                                value: bodyTextColor,
                                onChange: function onChange(value) {
                                    return setAttributes({ bodyTextColor: value });
                                }
                            }]
                        }),
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
                            React.createElement(PanelColorSettings, {
                                title: __('Color Settings'),
                                initialOpen: false,
                                colorSettings: [{
                                    label: __('Border Color'),
                                    value: borderColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ borderColor: value });
                                    }
                                }]
                            }),
                            React.createElement(RangeControl, {
                                label: __('Border width'),
                                value: borderWidth,
                                min: 0,
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
                            React.createElement(RichText, {
                                tagName: "h4",
                                value: header,
                                onChange: function onChange(value) {
                                    return setAttributes({ header: value });
                                },
                                unstableOnSplit: function unstableOnSplit() {
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
                            React.createElement(InnerBlocks, null)
                        )
                    )
                );
            }
        }]);

        return AdvAccordion;
    }(Component);

    var accordionBlockIcon = React.createElement(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "2 2 22 22" },
        React.createElement("path", { fill: "none", d: "M0,0h24v24H0V0z" }),
        React.createElement("rect", { x: "3", y: "17", width: "18", height: "2" }),
        React.createElement("path", { d: "M19,12v1H5v-1H19 M21,10H3v5h18V10L21,10z" }),
        React.createElement("rect", { x: "3", y: "6", width: "18", height: "2" })
    );

    var accordionAttrs = {
        header: {
            type: 'string',
            default: __('Header text')
        },
        headerBgColor: {
            type: 'string',
            default: '#000'
        },
        headerTextColor: {
            type: 'string',
            default: '#eee'
        },
        headerIcon: {
            type: 'string',
            default: 'unfold'
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
            default: 0
        },
        borderColor: {
            type: 'string'
        },
        borderRadius: {
            type: 'number',
            default: 2
        },
        marginBottom: {
            type: 'number',
            default: 15
        },
        changed: {
            type: 'boolean',
            default: false
        }
    };

    registerBlockType('advgb/accordion', {
        title: __('Accordion'),
        description: __('Easy to create an accordion for your post/page.'),
        icon: {
            src: accordionBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined
        },
        category: 'formatting',
        keywords: [__('accordion'), __('list'), __('faq')],
        attributes: accordionAttrs,
        edit: AdvAccordion,
        save: function save(_ref) {
            var attributes = _ref.attributes;
            var header = attributes.header,
                headerBgColor = attributes.headerBgColor,
                headerTextColor = attributes.headerTextColor,
                headerIcon = attributes.headerIcon,
                headerIconColor = attributes.headerIconColor,
                bodyBgColor = attributes.bodyBgColor,
                bodyTextColor = attributes.bodyTextColor,
                borderStyle = attributes.borderStyle,
                borderWidth = attributes.borderWidth,
                borderColor = attributes.borderColor,
                borderRadius = attributes.borderRadius,
                marginBottom = attributes.marginBottom;


            return React.createElement(
                "div",
                { className: "advgb-accordion-block", style: { marginBottom: marginBottom } },
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
                        header
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
                    React.createElement(InnerBlocks.Content, null)
                )
            );
        }
    });
})(wp.i18n, wp.blocks, wp.element, wp.editor, wp.components);

/***/ }),

/***/ "./assets/blocks/advbutton/block.jsx":
/*!*******************************************!*\
  !*** ./assets/blocks/advbutton/block.jsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
        PanelColorSettings = wpEditor.PanelColorSettings;
    var RangeControl = wpComponents.RangeControl,
        PanelBody = wpComponents.PanelBody,
        TextControl = wpComponents.TextControl,
        ToggleControl = wpComponents.ToggleControl,
        SelectControl = wpComponents.SelectControl,
        IconButton = wpComponents.IconButton,
        Toolbar = wpComponents.Toolbar;

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
                    setAttributes = _props.setAttributes;

                var currentBlockConfig = advgbDefaultConfig['advgb-button'];

                // No override attributes of blocks inserted before
                if (attributes.changed !== true) {
                    if (currentBlockConfig !== undefined && (typeof currentBlockConfig === 'undefined' ? 'undefined' : _typeof(currentBlockConfig)) === 'object') {
                        Object.keys(currentBlockConfig).map(function (attribute) {
                            attributes[attribute] = currentBlockConfig[attribute];
                        });

                        // Finally set changed attribute to true, so we don't modify anything again
                        setAttributes({ changed: true });
                    }
                }
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _props2 = this.props,
                    attributes = _props2.attributes,
                    setAttributes = _props2.setAttributes,
                    clientId = _props2.clientId;


                if (!attributes.id) {
                    setAttributes({ id: 'advgbbtn-' + clientId });
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var listBorderStyles = [{ label: __('None'), value: 'none' }, { label: __('Solid'), value: 'solid' }, { label: __('Dotted'), value: 'dotted' }, { label: __('Dashed'), value: 'dashed' }, { label: __('Double'), value: 'double' }, { label: __('Groove'), value: 'groove' }, { label: __('Ridge'), value: 'ridge' }, { label: __('Inset'), value: 'inset' }, { label: __('Outset'), value: 'outset' }];
                var _props3 = this.props,
                    attributes = _props3.attributes,
                    setAttributes = _props3.setAttributes,
                    isSelected = _props3.isSelected,
                    className = _props3.className,
                    blockID = _props3.clientId;
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
                            Toolbar,
                            null,
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
                            React.createElement(PanelColorSettings, {
                                title: __('Color Settings'),
                                initialOpen: false,
                                colorSettings: [{
                                    label: __('Background Color'),
                                    value: bgColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ bgColor: value === undefined ? '#2196f3' : value });
                                    }
                                }, {
                                    label: __('Text Color'),
                                    value: textColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ textColor: value === undefined ? '#fff' : value });
                                    }
                                }]
                            })
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
                            borderStyle !== 'none' && React.createElement(
                                Fragment,
                                null,
                                React.createElement(PanelColorSettings, {
                                    title: __('Border Color'),
                                    initialOpen: false,
                                    colorSettings: [{
                                        label: __('Border Color'),
                                        value: borderColor,
                                        onChange: function onChange(value) {
                                            return setAttributes({ borderColor: value === undefined ? '#2196f3' : value });
                                        }
                                    }]
                                }),
                                React.createElement(RangeControl, {
                                    label: __('Border width'),
                                    value: borderWidth || '',
                                    onChange: function onChange(value) {
                                        return setAttributes({ borderWidth: value });
                                    },
                                    min: 0,
                                    max: 100
                                })
                            )
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
                            React.createElement(PanelColorSettings, {
                                title: __('Color Settings'),
                                initialOpen: false,
                                colorSettings: [{
                                    label: __('Background Color'),
                                    value: hoverBgColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ hoverBgColor: value === undefined ? '#2196f3' : value });
                                    }
                                }, {
                                    label: __('Text Color'),
                                    value: hoverTextColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ hoverTextColor: value === undefined ? '#fff' : value });
                                    }
                                }, {
                                    label: __('Shadow Color'),
                                    value: hoverShadowColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ hoverShadowColor: value === undefined ? '#ccc' : value });
                                    }
                                }]
                            }),
                            React.createElement(
                                PanelBody,
                                { title: __('Shadow'), initialOpen: false },
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

    var buttonBlockIcon = React.createElement(
        'svg',
        { height: '20', viewBox: '2 2 22 22', width: '20', xmlns: 'http://www.w3.org/2000/svg' },
        React.createElement('path', { d: 'M0 0h24v24H0V0z', fill: 'none' }),
        React.createElement('path', { d: 'M5 14.5h14v-6H5v6zM11 .55V3.5h2V.55h-2zm8.04 2.5l-1.79 1.79 1.41 1.41 1.8-1.79-1.42-1.41zM13 22.45V19.5h-2v2.95h2zm7.45-3.91l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zM3.55 4.46l1.79 1.79 1.41-1.41-1.79-1.79-1.41 1.41zm1.41 15.49l1.79-1.8-1.41-1.41-1.79 1.79 1.41 1.42z' })
    );

    registerBlockType('advgb/button', {
        title: __('Advanced Button'),
        description: __('New button with more styles.'),
        icon: {
            src: buttonBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined
        },
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
            },
            changed: {
                type: 'boolean',
                default: false
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
                React.createElement(RichText.Content, {
                    tagName: 'a',
                    className: 'wp-block-advgb-button_link ' + id,
                    href: url || '#',
                    title: title,
                    target: !urlOpenNewTab ? '_self' : '_blank',
                    value: text
                }),
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

/***/ }),

/***/ "./assets/blocks/advimage/block.jsx":
/*!******************************************!*\
  !*** ./assets/blocks/advimage/block.jsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
        RichText = wpEditor.RichText,
        PanelColorSettings = wpEditor.PanelColorSettings,
        MediaUpload = wpEditor.MediaUpload;
    var RangeControl = wpComponents.RangeControl,
        PanelBody = wpComponents.PanelBody,
        ToggleControl = wpComponents.ToggleControl,
        SelectControl = wpComponents.SelectControl,
        TextControl = wpComponents.TextControl,
        IconButton = wpComponents.IconButton,
        Button = wpComponents.Button,
        Toolbar = wpComponents.Toolbar;

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
            key: 'componentWillMount',
            value: function componentWillMount() {
                var _props = this.props,
                    attributes = _props.attributes,
                    setAttributes = _props.setAttributes;

                var currentBlockConfig = advgbDefaultConfig['advgb-image'];

                // No override attributes of blocks inserted before
                if (attributes.changed !== true) {
                    if (currentBlockConfig !== undefined && (typeof currentBlockConfig === 'undefined' ? 'undefined' : _typeof(currentBlockConfig)) === 'object') {
                        Object.keys(currentBlockConfig).map(function (attribute) {
                            attributes[attribute] = currentBlockConfig[attribute];
                        });

                        // Finally set changed attribute to true, so we don't modify anything again
                        setAttributes({ changed: true });
                    }
                }
            }
        }, {
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
                var _props2 = this.props,
                    attributes = _props2.attributes,
                    setAttributes = _props2.setAttributes,
                    isSelected = _props2.isSelected;
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
                        React.createElement(
                            Toolbar,
                            null,
                            React.createElement(MediaUpload, {
                                allowedTypes: ['image'],
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
                        )
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
                            React.createElement(PanelColorSettings, {
                                title: __('Color Settings'),
                                initialOpen: false,
                                colorSettings: [{
                                    label: __('Title Color'),
                                    value: titleColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ titleColor: value === undefined ? '#fff' : value });
                                    }
                                }, {
                                    label: __('Subtitle Color'),
                                    value: subtitleColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ subtitleColor: value === undefined ? '#fff' : value });
                                    }
                                }, {
                                    label: __('Overlay Color'),
                                    value: overlayColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ overlayColor: value === undefined ? '#2196f3' : value });
                                    }
                                }]
                            }),
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
                            allowedTypes: ['image'],
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
                            unstableOnSetup: function unstableOnSetup(editor) {
                                return _this3.handleSetup(editor, 'title');
                            },
                            unstableOnSplit: function unstableOnSplit() {
                                return null;
                            },
                            placeholder: __('Enter title…')
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
                            unstableOnSetup: function unstableOnSetup(editor) {
                                return _this3.handleSetup(editor, 'subtitle');
                            },
                            unstableOnSplit: function unstableOnSplit() {
                                return null;
                            },
                            placeholder: __('Enter subtitle…')
                        })
                    )
                );
            }
        }]);

        return AdvImage;
    }(Component);

    var advImageBlockIcon = React.createElement(
        'svg',
        { height: '20', viewBox: '2 2 22 22', width: '20', xmlns: 'http://www.w3.org/2000/svg' },
        React.createElement('path', { d: 'M0 0h24v24H0V0z', fill: 'none' }),
        React.createElement('path', { d: 'M1 5h2v14H1zm4 0h2v14H5zm17 0H10c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zM11 17l2.5-3.15L15.29 16l2.5-3.22L21 17H11z' })
    );

    registerBlockType('advgb/image', {
        title: __('Advanced Image'),
        description: __('Advanced image/photo block with more options and styles.'),
        icon: {
            src: advImageBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined
        },
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
                type: 'number'
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
            },
            changed: {
                type: 'boolean',
                default: false
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

/***/ }),

/***/ "./assets/blocks/advlist/block.jsx":
/*!*****************************************!*\
  !*** ./assets/blocks/advlist/block.jsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
    var registerBlockType = wpBlocks.registerBlockType,
        createBlock = wpBlocks.createBlock;
    var InspectorControls = wpEditor.InspectorControls,
        RichText = wpEditor.RichText,
        ColorPalette = wpEditor.ColorPalette,
        BlockControls = wpEditor.BlockControls;
    var BaseControl = wpComponents.BaseControl,
        RangeControl = wpComponents.RangeControl,
        PanelBody = wpComponents.PanelBody,
        IconButton = wpComponents.IconButton,
        Dashicon = wpComponents.Dashicon,
        Toolbar = wpComponents.Toolbar;

    var AdvList = function (_Component) {
        _inherits(AdvList, _Component);

        function AdvList() {
            _classCallCheck(this, AdvList);

            var _this = _possibleConstructorReturn(this, (AdvList.__proto__ || Object.getPrototypeOf(AdvList)).apply(this, arguments));

            _this.getEditorSettings = _this.getEditorSettings.bind(_this);
            _this.setupEditor = _this.setupEditor.bind(_this);
            _this.setNextValues = _this.setNextValues.bind(_this);
            return _this;
        }

        _createClass(AdvList, [{
            key: 'componentWillMount',
            value: function componentWillMount() {
                var _props = this.props,
                    attributes = _props.attributes,
                    setAttributes = _props.setAttributes;

                var currentBlockConfig = advgbDefaultConfig['advgb-list'];

                // No override attributes of blocks inserted before
                if (attributes.changed !== true) {
                    if (currentBlockConfig !== undefined && (typeof currentBlockConfig === 'undefined' ? 'undefined' : _typeof(currentBlockConfig)) === 'object') {
                        Object.keys(currentBlockConfig).map(function (attribute) {
                            attributes[attribute] = currentBlockConfig[attribute];
                        });

                        // Finally set changed attribute to true, so we don't modify anything again
                        setAttributes({ changed: true });
                    }
                }
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _props2 = this.props,
                    attributes = _props2.attributes,
                    setAttributes = _props2.setAttributes,
                    clientId = _props2.clientId;


                if (!attributes.id) {
                    setAttributes({
                        id: 'advgblist-' + clientId
                    });
                }
            }
        }, {
            key: 'getEditorSettings',
            value: function getEditorSettings(editorSettings) {
                return _extends({}, editorSettings, {
                    plugins: (editorSettings.plugins || []).concat('lists'),
                    lists_indent_on_tab: false
                });
            }
        }, {
            key: 'setupEditor',
            value: function setupEditor(editor) {
                // this checks for languages that do not typically have square brackets on their keyboards
                var lang = window.navigator.browserLanguage || window.navigator.language;
                var keyboardHasSqBracket = !/^(?:fr|nl|sv|ru|de|es|it)/.test(lang);

                if (keyboardHasSqBracket) {
                    // keycode 219 = '[' and keycode 221 = ']'
                    editor.shortcuts.add('meta+219', 'Decrease indent', 'Outdent');
                    editor.shortcuts.add('meta+221', 'Increase indent', 'Indent');
                } else {
                    editor.shortcuts.add('meta+shift+m', 'Decrease indent', 'Outdent');
                    editor.shortcuts.add('meta+m', 'Increase indent', 'Indent');
                }

                this.editor = editor;
            }
        }, {
            key: 'setNextValues',
            value: function setNextValues(nextValues) {
                this.props.setAttributes({ values: nextValues });
            }
        }, {
            key: 'render',
            value: function render() {
                var listIcons = [{ label: __('None'), value: '' }, { label: __('Pushpin'), value: 'admin-post' }, { label: __('Configuration'), value: 'admin-generic' }, { label: __('Flag'), value: 'flag' }, { label: __('Star'), value: 'star-filled' }, { label: __('Checkmark'), value: 'yes' }, { label: __('Minus'), value: 'minus' }, { label: __('Plus'), value: 'plus' }, { label: __('Play'), value: 'controls-play' }, { label: __('Arrow right'), value: 'arrow-right-alt' }, { label: __('X Cross'), value: 'dismiss' }, { label: __('Warning'), value: 'warning' }, { label: __('Help'), value: 'editor-help' }, { label: __('Info'), value: 'info' }, { label: __('Circle'), value: 'marker' }];
                var _props3 = this.props,
                    attributes = _props3.attributes,
                    isSelected = _props3.isSelected,
                    insertBlocksAfter = _props3.insertBlocksAfter,
                    mergeBlocks = _props3.mergeBlocks,
                    setAttributes = _props3.setAttributes,
                    onReplace = _props3.onReplace,
                    className = _props3.className,
                    blockID = _props3.clientId;
                var id = attributes.id,
                    values = attributes.values,
                    icon = attributes.icon,
                    iconSize = attributes.iconSize,
                    iconColor = attributes.iconColor,
                    margin = attributes.margin,
                    padding = attributes.padding,
                    lineHeight = attributes.lineHeight,
                    fontSize = attributes.fontSize;

                var listClassName = [className, id, icon && 'advgb-list', icon && 'advgb-list-' + icon].filter(Boolean).join(' ');
                var size = typeof iconSize != 'undefined' ? parseInt(iconSize) : 16;
                var marg = typeof margin != 'undefined' ? parseInt(margin) : 2;
                var padd = typeof padding != 'undefined' ? parseInt(padding) * 2 : 4;

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
                                label: __('Refresh this list when it conflict with other lists styles'),
                                icon: 'update',
                                className: 'components-toolbar__control',
                                onClick: function onClick() {
                                    return setAttributes({ id: 'advgblist-' + blockID });
                                }
                            })
                        )
                    ),
                    React.createElement(
                        InspectorControls,
                        null,
                        React.createElement(
                            PanelBody,
                            { title: __('Text Settings'), initialOpen: false },
                            React.createElement(RangeControl, {
                                label: __('Text size'),
                                value: fontSize || '',
                                onChange: function onChange(size) {
                                    return setAttributes({ fontSize: size });
                                },
                                min: 10,
                                max: 100,
                                beforeIcon: 'editor-textcolor',
                                allowReset: true
                            })
                        ),
                        React.createElement(
                            PanelBody,
                            { title: __('Icon Settings') },
                            React.createElement(
                                BaseControl,
                                { label: __('List icon') },
                                React.createElement(
                                    'div',
                                    { className: 'advgb-icon-items-wrapper' },
                                    listIcons.map(function (item, index) {
                                        return React.createElement(
                                            'div',
                                            { className: 'advgb-icon-item h20', key: index },
                                            React.createElement(
                                                'span',
                                                { onClick: function onClick() {
                                                        return setAttributes({ icon: item.value });
                                                    },
                                                    className: [item.value === icon && 'active', item.value === '' && 'remove-icon'].filter(Boolean).join(' ')
                                                },
                                                React.createElement(Dashicon, { icon: item.value })
                                            )
                                        );
                                    })
                                )
                            ),
                            icon && React.createElement(
                                Fragment,
                                null,
                                React.createElement(
                                    PanelBody,
                                    {
                                        title: [__('Icon color'), React.createElement('span', { key: 'advgb-list-icon-color', className: 'dashicons dashicons-' + icon, style: { color: iconColor, marginLeft: '10px' } })],
                                        initialOpen: false
                                    },
                                    React.createElement(ColorPalette, {
                                        value: iconColor,
                                        onChange: function onChange(value) {
                                            return setAttributes({ iconColor: value === undefined ? '#000' : value });
                                        }
                                    })
                                ),
                                React.createElement(RangeControl, {
                                    label: __('Icon size'),
                                    value: iconSize || '',
                                    onChange: function onChange(size) {
                                        return setAttributes({ iconSize: size });
                                    },
                                    min: 10,
                                    max: 100,
                                    allowReset: true
                                }),
                                React.createElement(RangeControl, {
                                    label: __('Line height'),
                                    value: lineHeight || '',
                                    onChange: function onChange(size) {
                                        return setAttributes({ lineHeight: size });
                                    },
                                    min: 0,
                                    max: 100,
                                    allowReset: true
                                }),
                                React.createElement(RangeControl, {
                                    label: __('Margin'),
                                    value: margin || '',
                                    onChange: function onChange(size) {
                                        return setAttributes({ margin: size });
                                    },
                                    min: 0,
                                    max: 100,
                                    allowReset: true
                                }),
                                React.createElement(RangeControl, {
                                    label: __('Padding'),
                                    value: padding || '',
                                    onChange: function onChange(size) {
                                        return setAttributes({ padding: size });
                                    },
                                    min: 0,
                                    max: 100,
                                    allowReset: true
                                })
                            )
                        )
                    ),
                    React.createElement(RichText, {
                        multiline: 'li',
                        tagName: 'ul',
                        unstableGetSettings: this.getEditorSettings,
                        unstableOnSetup: this.setupEditor,
                        onChange: this.setNextValues,
                        value: values,
                        wrapperClassName: 'advgb-list-item',
                        className: listClassName,
                        placeholder: __('Write advanced list…'),
                        onMerge: mergeBlocks,
                        unstableOnSplit: insertBlocksAfter ? function (before, after) {
                            for (var _len = arguments.length, blocks = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                                blocks[_key - 2] = arguments[_key];
                            }

                            if (!blocks.length) {
                                blocks.push(createBlock('core/paragraph'));
                            }

                            if (after.length) {
                                blocks.push(createBlock('advgb/list', _extends({}, attributes, {
                                    values: after,
                                    id: undefined
                                })));
                            }

                            setAttributes({ values: before });
                            insertBlocksAfter(blocks);
                        } : undefined,
                        onRemove: function onRemove() {
                            return onReplace([]);
                        },
                        isSelected: isSelected
                    }),
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'style',
                            null,
                            '.' + id + ' li { font-size: ' + fontSize + 'px; margin-left: ' + (size + padd) + 'px }'
                        ),
                        icon && React.createElement(
                            'style',
                            null,
                            '.' + id + ' li:before {\n                                font-size: ' + iconSize + 'px;\n                                color: ' + iconColor + ';\n                                line-height: ' + lineHeight + 'px;\n                                margin: ' + margin + 'px;\n                                padding: ' + padding + 'px;\n                                margin-left: -' + (size + padd + marg) + 'px\n                            }'
                        )
                    )
                );
            }
        }]);

        return AdvList;
    }(Component);

    var listBlockIcon = React.createElement(
        'svg',
        { height: '20', viewBox: '2 2 22 22', width: '20', xmlns: 'http://www.w3.org/2000/svg' },
        React.createElement('path', { d: 'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z' }),
        React.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
    );

    var listBlockAttrs = {
        id: {
            type: 'string'
        },
        icon: {
            type: 'string'
        },
        iconSize: {
            type: 'number',
            default: 16
        },
        iconColor: {
            type: 'string',
            default: '#000'
        },
        fontSize: {
            type: 'number',
            default: 16
        },
        lineHeight: {
            type: 'number',
            default: 18
        },
        margin: {
            type: 'number',
            default: 2
        },
        padding: {
            type: 'number',
            default: 2
        },
        values: {
            type: 'array',
            source: 'children',
            selector: 'ul',
            default: []
        },
        changed: {
            type: 'boolean',
            default: false
        }
    };

    registerBlockType('advgb/list', {
        title: __('Advanced List'),
        description: __('List block with custom icons and styles.'),
        icon: {
            src: listBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined
        },
        category: 'common',
        keywords: [__('list'), __('icon')],
        attributes: listBlockAttrs,
        transforms: {
            from: [{
                type: 'block',
                blocks: ['core/list'],
                transform: function transform(_ref) {
                    var values = _ref.values;

                    return createBlock('advgb/list', {
                        values: values,
                        icon: 'controls-play',
                        iconColor: '#ff0000'
                    });
                }
            }],
            to: [{
                type: 'block',
                blocks: ['core/list'],
                transform: function transform(_ref2) {
                    var values = _ref2.values;

                    return createBlock('core/list', {
                        nodeName: 'UL',
                        values: values
                    });
                }
            }]
        },
        merge: function merge(attributes, attributesToMerge) {
            var valuesToMerge = attributesToMerge.values || [];

            // Standard text-like block attribute.
            if (attributesToMerge.content) {
                valuesToMerge.push(attributesToMerge.content);
            }

            return _extends({}, attributes, {
                values: [].concat(_toConsumableArray(attributes.values), _toConsumableArray(valuesToMerge))
            });
        },

        edit: AdvList,
        save: function save(_ref3) {
            var attributes = _ref3.attributes;
            var id = attributes.id,
                values = attributes.values,
                icon = attributes.icon,
                iconSize = attributes.iconSize,
                iconColor = attributes.iconColor,
                margin = attributes.margin,
                padding = attributes.padding,
                lineHeight = attributes.lineHeight,
                fontSize = attributes.fontSize;

            var listClassName = [id, icon && 'advgb-list', icon && 'advgb-list-' + icon].filter(Boolean).join(' ');

            var size = typeof iconSize != 'undefined' ? parseInt(iconSize) : 16;
            var marg = typeof margin != 'undefined' ? parseInt(margin) : 2;
            var padd = typeof padding != 'undefined' ? parseInt(padding) * 2 : 4;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'ul',
                    { className: listClassName },
                    values
                ),
                React.createElement(
                    'style',
                    null,
                    '.' + id + ' li { font-size: ' + fontSize + 'px; margin-left: ' + (size + padd) + 'px }'
                ),
                icon && React.createElement(
                    'style',
                    null,
                    '.' + id + ' li:before {\n                            font-size: ' + iconSize + 'px;\n                            color: ' + iconColor + ';\n                            line-height: ' + lineHeight + 'px;\n                            margin: ' + margin + 'px;\n                            padding: ' + padding + 'px;\n                            margin-left: -' + (size + padd + marg) + 'px;\n                        }'
                )
            );
        },
        deprecated: [{
            attributes: listBlockAttrs,
            save: function save(_ref4) {
                var attributes = _ref4.attributes;
                var id = attributes.id,
                    values = attributes.values,
                    icon = attributes.icon,
                    iconSize = attributes.iconSize,
                    iconColor = attributes.iconColor,
                    margin = attributes.margin,
                    padding = attributes.padding,
                    lineHeight = attributes.lineHeight,
                    fontSize = attributes.fontSize;

                var listClassName = [id, icon && 'advgb-list', icon && 'advgb-list-' + icon].filter(Boolean).join(' ');

                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'ul',
                        { className: listClassName },
                        values
                    ),
                    React.createElement(
                        'style',
                        null,
                        '.' + id + ' li { font-size: ' + fontSize + 'px }'
                    ),
                    icon && React.createElement(
                        'style',
                        null,
                        '.' + id + ' li:before {\n                            font-size: ' + iconSize + 'px;\n                            color: ' + iconColor + ';\n                            line-height: ' + lineHeight + 'px;\n                            margin: ' + margin + 'px;\n                            padding: ' + padding + 'px;\n                        }'
                    )
                );
            }
        }]
    });
})(wp.i18n, wp.blocks, wp.element, wp.editor, wp.components);

/***/ }),

/***/ "./assets/blocks/advtable/block.jsx":
/*!******************************************!*\
  !*** ./assets/blocks/advtable/block.jsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
        RichText = wpEditor.RichText,
        PanelColorSettings = wpEditor.PanelColorSettings;
    var PanelBody = wpComponents.PanelBody,
        BaseControl = wpComponents.BaseControl,
        RangeControl = wpComponents.RangeControl,
        SelectControl = wpComponents.SelectControl,
        TextControl = wpComponents.TextControl,
        IconButton = wpComponents.IconButton,
        Button = wpComponents.Button,
        Toolbar = wpComponents.Toolbar,
        DropdownMenu = wpComponents.DropdownMenu,
        Tooltip = wpComponents.Tooltip;
    var _lodash = lodash,
        times = _lodash.times;


    var tableBlockIcon = React.createElement(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "2 2 22 22" },
        React.createElement("path", { d: "M3 3v18h18V3H3zm8 16H5v-6h6v6zm0-8H5V5h6v6zm8 8h-6v-6h6v6zm0-8h-6V5h6v6z" }),
        React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" })
    );

    var AdvTable = function (_Component) {
        _inherits(AdvTable, _Component);

        function AdvTable() {
            _classCallCheck(this, AdvTable);

            var _this = _possibleConstructorReturn(this, (AdvTable.__proto__ || Object.getPrototypeOf(AdvTable)).apply(this, arguments));

            _this.state = {
                initRow: 3,
                initCol: 3,
                selectedCell: null,
                rangeSelected: null,
                multiSelected: null,
                updated: false
            };

            _this.calculateRealColIndex = _this.calculateRealColIndex.bind(_this);
            return _this;
        }

        _createClass(AdvTable, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                this.calculateRealColIndex();
            }
        }, {
            key: "componentDidUpdate",
            value: function componentDidUpdate() {
                var isSelected = this.props.isSelected;
                var _state = this.state,
                    selectedCell = _state.selectedCell,
                    updated = _state.updated;


                if (!isSelected && selectedCell) {
                    this.setState({
                        selectedCell: null,
                        rangeSelected: null,
                        multiSelected: null
                    });
                }

                if (updated) {
                    this.calculateRealColIndex();
                    this.setState({ updated: false });
                }
            }
        }, {
            key: "createTable",
            value: function createTable() {
                var setAttributes = this.props.setAttributes;
                var _state2 = this.state,
                    initRow = _state2.initRow,
                    initCol = _state2.initCol;


                this.setState({ updated: true });
                return setAttributes({
                    body: times(parseInt(initRow), function () {
                        return {
                            cells: times(parseInt(initCol), function () {
                                return {
                                    content: ''
                                };
                            })
                        };
                    })
                });
            }
        }, {
            key: "calculateRealColIndex",
            value: function calculateRealColIndex() {
                var _props = this.props,
                    attributes = _props.attributes,
                    setAttributes = _props.setAttributes;
                var body = attributes.body;


                if (!body.length) return null;

                var newBody = body.map(function (row, cRow) {
                    return {
                        cells: row.cells.map(function (cell, cCol) {
                            cell.cI = cCol;
                            for (var i = 0; i < cRow; i++) {
                                for (var j = 0; j < body[i].cells.length; j++) {
                                    if (body[i].cells[j] && body[i].cells[j].colSpan) {
                                        if (body[i].cells[j].rowSpan && i + parseInt(body[i].cells[j].rowSpan) > cRow) {
                                            if (cCol === 0) {
                                                if (body[i].cells[j].cI <= cell.cI) {
                                                    cell.cI += parseInt(body[i].cells[j].colSpan);
                                                }
                                            } else {
                                                var lastColSpan = !isNaN(parseInt(row.cells[cCol - 1].colSpan)) ? parseInt(row.cells[cCol - 1].colSpan) : 0;
                                                if (body[i].cells[j].cI === row.cells[cCol - 1].cI + 1 || body[i].cells[j].cI <= row.cells[cCol - 1].cI + lastColSpan) {
                                                    cell.cI += parseInt(body[i].cells[j].colSpan);
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            for (var _j = 0; _j < cCol; _j++) {
                                if (row.cells[_j]) {
                                    if (row.cells[_j].colSpan) {
                                        cell.cI += parseInt(row.cells[_j].colSpan) - 1;
                                    }
                                }
                            }

                            return cell;
                        })
                    };
                });

                setAttributes({ body: newBody });
            }
        }, {
            key: "insertRow",
            value: function insertRow(offset) {
                var selectedCell = this.state.selectedCell;


                if (!selectedCell) {
                    return null;
                }

                var _props2 = this.props,
                    attributes = _props2.attributes,
                    setAttributes = _props2.setAttributes;
                var body = attributes.body;
                var rowIndex = selectedCell.rowIndex;

                var newRow = jQuery.extend(true, {}, body[rowIndex]);
                newRow.cells.map(function (cell) {
                    cell.content = '';

                    return cell;
                });
                newRow.cells = newRow.cells.filter(function (cCell) {
                    return !cCell.rowSpan;
                });

                var newBody = [].concat(_toConsumableArray(body.slice(0, rowIndex + offset)), [newRow], _toConsumableArray(body.slice(rowIndex + offset))).map(function (row, rowIdx) {
                    return {
                        cells: row.cells.map(function (cell) {
                            if (cell.rowSpan) {
                                if (rowIdx <= rowIndex && rowIdx + parseInt(cell.rowSpan) - 1 >= rowIndex) {
                                    cell.rowSpan = parseInt(cell.rowSpan) + 1;
                                }
                            }
                            return cell;
                        })
                    };
                });

                this.setState({ selectedCell: null, updated: true });
                setAttributes({ body: newBody });
            }
        }, {
            key: "deleteRow",
            value: function deleteRow() {
                var selectedCell = this.state.selectedCell;


                if (!selectedCell) {
                    return null;
                }

                var _props3 = this.props,
                    attributes = _props3.attributes,
                    setAttributes = _props3.setAttributes;
                var body = attributes.body;
                var rowIndex = selectedCell.rowIndex;


                var newBody = body.map(function (row, cRowIdx) {
                    return {
                        cells: row.cells.map(function (cell) {
                            if (cell.rowSpan) {
                                if (cRowIdx <= rowIndex && parseInt(cell.rowSpan) + cRowIdx > rowIndex) {
                                    cell.rowSpan = parseInt(cell.rowSpan) - 1;
                                    if (cRowIdx === rowIndex) {
                                        var findColIdx = body[cRowIdx + 1].cells.findIndex(function (elm) {
                                            return elm.cI === cell.cI || elm.cI > cell.cI;
                                        });
                                        body[cRowIdx + 1].cells.splice(findColIdx, 0, cell);
                                    }
                                }
                            }

                            return cell;
                        })
                    };
                });

                this.setState({ selectedCell: null, updated: true });
                setAttributes({ body: newBody.filter(function (row, index) {
                        return index !== rowIndex;
                    }) });
            }
        }, {
            key: "insertColumn",
            value: function insertColumn(offset) {
                var selectedCell = this.state.selectedCell;


                if (!selectedCell) {
                    return null;
                }

                var _props4 = this.props,
                    attributes = _props4.attributes,
                    setAttributes = _props4.setAttributes;
                var body = attributes.body;
                var cI = selectedCell.cI;

                var countRowSpan = 0;

                this.setState({ selectedCell: null, updated: true });
                setAttributes({
                    body: body.map(function (row) {
                        if (countRowSpan > 0) {
                            // Skip if previous cell has row span
                            countRowSpan--;
                            return row;
                        }

                        var findColIdx = row.cells.findIndex(function (cell, idx) {
                            return cell.cI === cI || row.cells[idx + 1] && row.cells[idx + 1].cI > cI;
                        });
                        if (findColIdx === -1) {
                            findColIdx = row.cells.length - 1;
                        }

                        if (row.cells[findColIdx].colSpan && row.cells[findColIdx].cI < cI + offset && row.cells[findColIdx].cI + parseInt(row.cells[findColIdx].colSpan) > cI + offset) {
                            row.cells[findColIdx].colSpan++;

                            if (row.cells[findColIdx].rowSpan) {
                                countRowSpan = parseInt(row.cells[findColIdx].rowSpan) - 1;
                            }

                            return row;
                        } else {
                            var realOffset = offset;
                            if (row.cells[findColIdx].cI > cI && offset === 1) {
                                realOffset = 0;
                            } else if (row.cells[findColIdx].cI < cI && offset === 0) {
                                realOffset = 1;
                            }

                            return {
                                cells: [].concat(_toConsumableArray(row.cells.slice(0, findColIdx + realOffset)), [{ content: '' }], _toConsumableArray(row.cells.slice(findColIdx + realOffset)))
                            };
                        }
                    })
                });
            }
        }, {
            key: "deleteColumn",
            value: function deleteColumn() {
                var selectedCell = this.state.selectedCell;


                if (!selectedCell) {
                    return null;
                }

                var _props5 = this.props,
                    attributes = _props5.attributes,
                    setAttributes = _props5.setAttributes;
                var body = attributes.body;
                var cI = selectedCell.cI;

                var countRowSpan = 0;

                this.setState({ selectedCell: null, updated: true });
                setAttributes({
                    body: body.map(function (row) {
                        if (countRowSpan > 0) {
                            countRowSpan--;
                            return row;
                        }

                        var findColIdx = row.cells.findIndex(function (cell, idx) {
                            return cell.cI === cI || row.cells[idx + 1] && row.cells[idx + 1].cI > cI;
                        });

                        if (row.cells[findColIdx].rowSpan) {
                            countRowSpan = parseInt(row.cells[findColIdx].rowSpan) - 1;
                        }

                        if (row.cells[findColIdx].colSpan) {
                            row.cells[findColIdx].colSpan--;
                            if (row.cells[findColIdx].colSpan <= 1) {
                                delete row.cells[findColIdx].colSpan;
                            }

                            return row;
                        }

                        return {
                            cells: row.cells.filter(function (cell, index) {
                                return index !== findColIdx;
                            })
                        };
                    })
                });
            }
        }, {
            key: "mergeCells",
            value: function mergeCells() {
                var rangeSelected = this.state.rangeSelected;


                if (!rangeSelected.toCell) {
                    return null;
                }

                var _props6 = this.props,
                    attributes = _props6.attributes,
                    setAttributes = _props6.setAttributes;
                var fromCell = rangeSelected.fromCell,
                    toCell = rangeSelected.toCell;
                var body = attributes.body;

                var fCell = body[fromCell.rowIdx].cells[fromCell.colIdx];
                var tCell = body[toCell.rowIdx].cells[toCell.colIdx];
                var fcSpan = typeof fCell.colSpan === 'undefined' ? 0 : parseInt(fCell.colSpan) - 1;
                var frSpan = typeof fCell.rowSpan === 'undefined' ? 0 : parseInt(fCell.rowSpan) - 1;
                var tcSpan = typeof tCell.colSpan === 'undefined' ? 0 : parseInt(tCell.colSpan) - 1;
                var trSpan = typeof tCell.rowSpan === 'undefined' ? 0 : parseInt(tCell.rowSpan) - 1;
                var minRowIdx = Math.min(fromCell.rowIdx, toCell.rowIdx);
                var maxRowIdx = Math.max(fromCell.rowIdx + frSpan, toCell.rowIdx + trSpan);
                var minColIdx = Math.min(fromCell.RCI, toCell.RCI);
                var maxColIdx = Math.max(fromCell.RCI + fcSpan, toCell.RCI + tcSpan);

                var newBody = body.map(function (row, curRowIndex) {
                    if (curRowIndex < minRowIdx || curRowIndex > maxRowIdx) {
                        return row;
                    }

                    return {
                        cells: row.cells.map(function (cell, curColIndex) {
                            if (curColIndex === Math.min(fromCell.colIdx, toCell.colIdx) && curRowIndex === Math.min(fromCell.rowIdx, toCell.rowIdx)) {
                                var rowSpan = Math.abs(maxRowIdx - minRowIdx) + 1;
                                var colSpan = Math.abs(maxColIdx - minColIdx) + 1;

                                return _extends({}, cell, {
                                    rowSpan: rowSpan > 1 ? rowSpan : undefined,
                                    colSpan: colSpan > 1 ? colSpan : undefined
                                });
                            }

                            return cell;
                        }).filter(function (cell, cCol) {
                            return cell.cI < minColIdx || cCol === Math.min(fromCell.colIdx, toCell.colIdx) && curRowIndex === Math.min(fromCell.rowIdx, toCell.rowIdx) || cell.cI > maxColIdx;
                        })
                    };
                });

                setAttributes({ body: newBody });
                this.setState({ selectedCell: null, rangeSelected: null, updated: true });
            }
        }, {
            key: "splitMergedCells",
            value: function splitMergedCells() {
                var selectedCell = this.state.selectedCell;


                if (!selectedCell) {
                    return null;
                }

                var _props7 = this.props,
                    attributes = _props7.attributes,
                    setAttributes = _props7.setAttributes;
                var body = attributes.body;
                var colIndex = selectedCell.colIndex,
                    rowIndex = selectedCell.rowIndex,
                    cI = selectedCell.cI;


                var cellColSpan = body[rowIndex].cells[colIndex].colSpan ? parseInt(body[rowIndex].cells[colIndex].colSpan) : 1;
                var cellRowSpan = body[rowIndex].cells[colIndex].rowSpan ? parseInt(body[rowIndex].cells[colIndex].rowSpan) : 1;
                body[rowIndex].cells[colIndex].colSpan = undefined;
                body[rowIndex].cells[colIndex].rowSpan = undefined;

                var newBody = body.map(function (row, curRowIndex) {
                    if (curRowIndex >= rowIndex && curRowIndex < rowIndex + cellRowSpan) {
                        var findColIdx = row.cells.findIndex(function (cell) {
                            return cell.cI >= cI;
                        });
                        var startRowFix = 0;
                        if (curRowIndex === rowIndex) {
                            startRowFix = 1;
                        }

                        return {
                            cells: [].concat(_toConsumableArray(row.cells.slice(0, findColIdx + startRowFix)), _toConsumableArray(times(cellColSpan - startRowFix, function () {
                                return { content: '' };
                            })), _toConsumableArray(row.cells.slice(findColIdx + startRowFix)))
                        };
                    }

                    return row;
                });

                setAttributes({ body: newBody });
                this.setState({ selectedCell: null, updated: true });
            }

            // Parse styles from HTML form to React styles object

        }, {
            key: "getCellStyles",
            value: function getCellStyles(style) {
                var selectedCell = this.state.selectedCell;
                var body = this.props.attributes.body;


                if (!selectedCell) return undefined;

                var rowIndex = selectedCell.rowIndex,
                    colIndex = selectedCell.colIndex;


                if (style === 'borderColor') {
                    return body[rowIndex].cells[colIndex].borderColorSaved;
                }
                var styles = AdvTable.parseStyles(body[rowIndex].cells[colIndex].styles);

                if ((typeof styles === "undefined" ? "undefined" : _typeof(styles)) === 'object') {
                    var _convertedStyles = styles[style];

                    if (_convertedStyles && typeof _convertedStyles !== 'number' && _convertedStyles.indexOf('px')) {
                        _convertedStyles = styles[style].replace(/px/g, '');
                    }

                    return typeof _convertedStyles === 'undefined' && style === 'borderStyle' ? 'solid' : _convertedStyles;
                } else {
                    if (typeof styles !== 'undefined') {
                        var _convertedStyles2 = styles[style];
                    }

                    return typeof convertedStyles === 'undefined' && style === 'borderStyle' ? 'solid' : undefined;
                }
            }
        }, {
            key: "updateCellsStyles",
            value: function updateCellsStyles(style) {
                var _state3 = this.state,
                    selectedCell = _state3.selectedCell,
                    rangeSelected = _state3.rangeSelected,
                    multiSelected = _state3.multiSelected;

                if (!selectedCell && !rangeSelected.toCell && !multiSelected) {
                    return null;
                }

                var _props8 = this.props,
                    attributes = _props8.attributes,
                    setAttributes = _props8.setAttributes;
                var rowIndex = selectedCell.rowIndex,
                    colIndex = selectedCell.colIndex;
                var body = attributes.body;

                var minRowIdx = void 0,
                    maxRowIdx = void 0,
                    minColIdx = void 0,
                    maxColIdx = void 0;

                if (rangeSelected && rangeSelected.toCell) {
                    var fromCell = rangeSelected.fromCell,
                        toCell = rangeSelected.toCell;

                    var fCell = body[fromCell.rowIdx].cells[fromCell.colIdx];
                    var tCell = body[toCell.rowIdx].cells[toCell.colIdx];
                    var fcSpan = typeof fCell.colSpan === 'undefined' ? 0 : parseInt(fCell.colSpan) - 1;
                    var frSpan = typeof fCell.rowSpan === 'undefined' ? 0 : parseInt(fCell.rowSpan) - 1;
                    var tcSpan = typeof tCell.colSpan === 'undefined' ? 0 : parseInt(tCell.colSpan) - 1;
                    var trSpan = typeof tCell.rowSpan === 'undefined' ? 0 : parseInt(tCell.rowSpan) - 1;
                    minRowIdx = Math.min(fromCell.rowIdx, toCell.rowIdx);
                    maxRowIdx = Math.max(fromCell.rowIdx + frSpan, toCell.rowIdx + trSpan);
                    minColIdx = Math.min(fromCell.RCI, toCell.RCI);
                    maxColIdx = Math.max(fromCell.RCI + fcSpan, toCell.RCI + tcSpan);
                }

                var newBody = body.map(function (row, curRowIndex) {
                    if ((!rangeSelected || rangeSelected && !rangeSelected.toCell) && multiSelected.length < 2 && curRowIndex !== rowIndex || rangeSelected && rangeSelected.toCell && (curRowIndex < minRowIdx || curRowIndex > maxRowIdx) || multiSelected && multiSelected.length > 1 && multiSelected.findIndex(function (c) {
                        return c.rowIndex === curRowIndex;
                    }) === -1) {
                        return row;
                    }

                    return {
                        cells: row.cells.map(function (cell, curColIndex) {
                            if ((!rangeSelected || rangeSelected && !rangeSelected.toCell) && multiSelected.length < 2 && curColIndex === colIndex || rangeSelected && rangeSelected.toCell && cell.cI >= minColIdx && cell.cI <= maxColIdx || multiSelected && multiSelected.length > 1 && multiSelected.findIndex(function (c) {
                                return c.colIndex === curColIndex && c.rowIndex === curRowIndex;
                            }) > -1) {
                                cell.styles = AdvTable.parseStyles(cell.styles);

                                if (style.borderColor) {
                                    if (cell.styles.borderTopColor) {
                                        cell.styles = _extends({}, cell.styles, { borderTopColor: style.borderColor });
                                    }
                                    if (cell.styles.borderRightColor) {
                                        cell.styles = _extends({}, cell.styles, { borderRightColor: style.borderColor });
                                    }
                                    if (cell.styles.borderBottomColor) {
                                        cell.styles = _extends({}, cell.styles, { borderBottomColor: style.borderColor });
                                    }
                                    if (cell.styles.borderLeftColor) {
                                        cell.styles = _extends({}, cell.styles, { borderLeftColor: style.borderColor });
                                    }

                                    cell.borderColorSaved = style.borderColor;
                                } else {
                                    cell.styles = _extends({}, cell.styles, style);
                                }
                            }

                            return cell;
                        })
                    };
                });

                setAttributes({ body: newBody });
            }
        }, {
            key: "updateCellContent",
            value: function updateCellContent(content) {
                var selectedCell = this.state.selectedCell;

                if (!selectedCell) {
                    return null;
                }

                var _props9 = this.props,
                    attributes = _props9.attributes,
                    setAttributes = _props9.setAttributes;
                var rowIndex = selectedCell.rowIndex,
                    colIndex = selectedCell.colIndex;
                var body = attributes.body;


                var newBody = body.map(function (row, curRowIndex) {
                    if (curRowIndex !== rowIndex) {
                        return row;
                    }

                    return {
                        cells: row.cells.map(function (cell, curColIndex) {
                            if (curColIndex !== colIndex) {
                                return cell;
                            }

                            return _extends({}, cell, {
                                content: content
                            });
                        })
                    };
                });

                setAttributes({ body: newBody });
            }
        }, {
            key: "render",
            value: function render() {
                var _this2 = this;

                var _props10 = this.props,
                    attributes = _props10.attributes,
                    setAttributes = _props10.setAttributes,
                    className = _props10.className;
                var body = attributes.body,
                    maxWidth = attributes.maxWidth;
                var _state4 = this.state,
                    initRow = _state4.initRow,
                    initCol = _state4.initCol,
                    selectedCell = _state4.selectedCell,
                    rangeSelected = _state4.rangeSelected,
                    multiSelected = _state4.multiSelected;

                var maxWidthVal = !!maxWidth ? maxWidth : undefined;
                var currentCell = selectedCell ? body[selectedCell.rowIndex].cells[selectedCell.colIndex] : null;

                // First time insert block, let user determine the table
                if (!body.length) {
                    return React.createElement(
                        Fragment,
                        null,
                        React.createElement(
                            "div",
                            { className: "advgb-init-table" },
                            React.createElement(TextControl, {
                                type: "number",
                                label: __('Column Count'),
                                value: initCol,
                                onChange: function onChange(value) {
                                    return _this2.setState({ initCol: value });
                                },
                                min: "1"
                            }),
                            React.createElement(TextControl, {
                                type: "number",
                                label: __('Row Count'),
                                value: initRow,
                                onChange: function onChange(value) {
                                    return _this2.setState({ initRow: value });
                                },
                                min: "1"
                            }),
                            React.createElement(
                                Button,
                                { isPrimary: true, onClick: function onClick() {
                                        return _this2.createTable();
                                    } },
                                __('Create')
                            ),
                            React.createElement(
                                "div",
                                { style: { marginTop: 10 } },
                                React.createElement(
                                    "small",
                                    null,
                                    __('Hint: Hold CTRL key for multi cells selection. Hold SHIFT key for range cells selection.')
                                )
                            )
                        )
                    );
                }

                var TABLE_CONTROLS = [{
                    icon: 'table-row-before',
                    title: __('Add Row Before'),
                    isDisabled: !selectedCell || rangeSelected && rangeSelected.toCell || multiSelected && multiSelected.length > 1,
                    onClick: function onClick() {
                        return _this2.insertRow(0);
                    }
                }, {
                    icon: 'table-row-after',
                    title: __('Add Row After'),
                    isDisabled: !selectedCell || rangeSelected && rangeSelected.toCell || multiSelected && multiSelected.length > 1,
                    onClick: function onClick() {
                        return _this2.insertRow(1);
                    }
                }, {
                    icon: 'table-row-delete',
                    title: __('Delete Row'),
                    isDisabled: !selectedCell || rangeSelected && rangeSelected.toCell || multiSelected && multiSelected.length > 1,
                    onClick: function onClick() {
                        return _this2.deleteRow();
                    }
                }, {
                    icon: 'table-col-before',
                    title: __('Add Column Before'),
                    isDisabled: !selectedCell || rangeSelected && rangeSelected.toCell || multiSelected && multiSelected.length > 1,
                    onClick: function onClick() {
                        return _this2.insertColumn(0);
                    }
                }, {
                    icon: 'table-col-after',
                    title: __('Add Column After'),
                    isDisabled: !selectedCell || rangeSelected && rangeSelected.toCell || multiSelected && multiSelected.length > 1,
                    onClick: function onClick() {
                        return _this2.insertColumn(1);
                    }
                }, {
                    icon: 'table-col-delete',
                    title: __('Delete Column'),
                    isDisabled: !selectedCell || rangeSelected && rangeSelected.toCell || multiSelected && multiSelected.length > 1,
                    onClick: function onClick() {
                        return _this2.deleteColumn();
                    }
                }, {
                    icon: React.createElement(
                        "svg",
                        { width: "20", height: "20", viewBox: "4 2 18 18", className: "dashicon" },
                        React.createElement("path", { fill: "none", d: "M0,0h24v24H0V0z" }),
                        React.createElement("path", { d: "M4,5v13h17V5H4z M14,7v9h-3V7H14z M6,7h3v9H6V7z M19,16h-3V7h3V16z" })
                    ),
                    title: __('Split Merged Cells'),
                    isDisabled: !selectedCell || currentCell && !currentCell.rowSpan && !currentCell.colSpan || rangeSelected && rangeSelected.toCell || multiSelected && multiSelected.length > 1,
                    onClick: function onClick() {
                        return _this2.splitMergedCells();
                    }
                }, {
                    icon: React.createElement(
                        "svg",
                        { width: "20", height: "20", className: "dashicon", viewBox: "2 2 22 22" },
                        React.createElement("path", { fill: "none", d: "M0,0h24v24H0V0z" }),
                        React.createElement("polygon", { points: "21,18 2,18 2,20 21,20 21,18" }),
                        React.createElement("path", { d: "M19,10v4H4v-4H19 M20,8H3C2.45,8,2,8.45,2,9v6c0,0.55,0.45,1,1,1h17c0.55,0,1-0.45,1-1V9C21,8.45,20.55,8,20,8L20,8z" }),
                        React.createElement("polygon", { points: "21,4 2,4 2,6 21,6 21,4" })
                    ),
                    title: __('Merge Cells'),
                    isDisabled: !rangeSelected || rangeSelected && !rangeSelected.toCell,
                    onClick: function onClick() {
                        return _this2.mergeCells();
                    }
                }];

                var BORDER_SELECT = [{
                    title: __('Border Top'),
                    icon: React.createElement(
                        "svg",
                        { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
                        React.createElement("path", { d: "M7 21h2v-2H7v2zm0-8h2v-2H7v2zm4 0h2v-2h-2v2zm0 8h2v-2h-2v2zm-8-4h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2v-2H3v2zm0-4h2V7H3v2zm8 8h2v-2h-2v2zm8-8h2V7h-2v2zm0 4h2v-2h-2v2zM3 3v2h18V3H3zm16 14h2v-2h-2v2zm-4 4h2v-2h-2v2zM11 9h2V7h-2v2zm8 12h2v-2h-2v2zm-4-8h2v-2h-2v2z" }),
                        React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" })
                    ),
                    onClick: function onClick() {
                        return _this2.updateCellsStyles({ borderTopColor: _this2.getCellStyles('borderColor') });
                    }
                }, {
                    title: __('Border Right'),
                    icon: React.createElement(
                        "svg",
                        { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
                        React.createElement("path", { d: "M7 21h2v-2H7v2zM3 5h2V3H3v2zm4 0h2V3H7v2zm0 8h2v-2H7v2zm-4 8h2v-2H3v2zm8 0h2v-2h-2v2zm-8-8h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm8 8h2v-2h-2v2zm4-4h2v-2h-2v2zm4-10v18h2V3h-2zm-4 18h2v-2h-2v2zm0-16h2V3h-2v2zm-4 8h2v-2h-2v2zm0-8h2V3h-2v2zm0 4h2V7h-2v2z" }),
                        React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" })
                    ),
                    onClick: function onClick() {
                        return _this2.updateCellsStyles({ borderRightColor: _this2.getCellStyles('borderColor') });
                    }
                }, {
                    title: __('Border Bottom'),
                    icon: React.createElement(
                        "svg",
                        { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
                        React.createElement("path", { d: "M9 11H7v2h2v-2zm4 4h-2v2h2v-2zM9 3H7v2h2V3zm4 8h-2v2h2v-2zM5 3H3v2h2V3zm8 4h-2v2h2V7zm4 4h-2v2h2v-2zm-4-8h-2v2h2V3zm4 0h-2v2h2V3zm2 10h2v-2h-2v2zm0 4h2v-2h-2v2zM5 7H3v2h2V7zm14-4v2h2V3h-2zm0 6h2V7h-2v2zM5 11H3v2h2v-2zM3 21h18v-2H3v2zm2-6H3v2h2v-2z" }),
                        React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" })
                    ),
                    onClick: function onClick() {
                        return _this2.updateCellsStyles({ borderBottomColor: _this2.getCellStyles('borderColor') });
                    }
                }, {
                    title: __('Border Left'),
                    icon: React.createElement(
                        "svg",
                        { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
                        React.createElement("path", { d: "M11 21h2v-2h-2v2zm0-4h2v-2h-2v2zm0-12h2V3h-2v2zm0 4h2V7h-2v2zm0 4h2v-2h-2v2zm-4 8h2v-2H7v2zM7 5h2V3H7v2zm0 8h2v-2H7v2zm-4 8h2V3H3v18zM19 9h2V7h-2v2zm-4 12h2v-2h-2v2zm4-4h2v-2h-2v2zm0-14v2h2V3h-2zm0 10h2v-2h-2v2zm0 8h2v-2h-2v2zm-4-8h2v-2h-2v2zm0-8h2V3h-2v2z" }),
                        React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" })
                    ),
                    onClick: function onClick() {
                        return _this2.updateCellsStyles({ borderLeftColor: _this2.getCellStyles('borderColor') });
                    }
                }, {
                    title: __('Border All'),
                    icon: React.createElement(
                        "svg",
                        { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
                        React.createElement("path", { d: "M13 7h-2v2h2V7zm0 4h-2v2h2v-2zm4 0h-2v2h2v-2zM3 3v18h18V3H3zm16 16H5V5h14v14zm-6-4h-2v2h2v-2zm-4-4H7v2h2v-2z" }),
                        React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" })
                    ),
                    onClick: function onClick() {
                        return _this2.updateCellsStyles({
                            borderTopColor: _this2.getCellStyles('borderColor'),
                            borderRightColor: _this2.getCellStyles('borderColor'),
                            borderBottomColor: _this2.getCellStyles('borderColor'),
                            borderLeftColor: _this2.getCellStyles('borderColor')
                        });
                    }
                }, {
                    title: __('Border None'),
                    icon: React.createElement(
                        "svg",
                        { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
                        React.createElement("path", { d: "M7 5h2V3H7v2zm0 8h2v-2H7v2zm0 8h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm-8 0h2v-2H3v2zm0-4h2v-2H3v2zm0-4h2v-2H3v2zm0-4h2V7H3v2zm0-4h2V3H3v2zm8 8h2v-2h-2v2zm8 4h2v-2h-2v2zm0-4h2v-2h-2v2zm0 8h2v-2h-2v2zm0-12h2V7h-2v2zm-8 0h2V7h-2v2zm8-6v2h2V3h-2zm-8 2h2V3h-2v2zm4 16h2v-2h-2v2zm0-8h2v-2h-2v2zm0-8h2V3h-2v2z" }),
                        React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" })
                    ),
                    onClick: function onClick() {
                        return _this2.updateCellsStyles({
                            borderTopColor: undefined,
                            borderRightColor: undefined,
                            borderBottomColor: undefined,
                            borderLeftColor: undefined
                        });
                    }
                }];

                var HORZ_ALIGNMENT_CONTROLS = [{
                    icon: 'editor-alignleft',
                    title: __('Align left'),
                    align: 'left'
                }, {
                    icon: 'editor-aligncenter',
                    title: __('Align center'),
                    align: 'center'
                }, {
                    icon: 'editor-alignright',
                    title: __('Align right'),
                    align: 'right'
                }, {
                    icon: 'editor-justify',
                    title: __('Align justify'),
                    align: 'justify'
                }];

                var VERT_ALIGNMENT_CONTROLS = [{
                    icon: React.createElement(
                        "svg",
                        { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24" },
                        React.createElement("path", { d: "M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z" }),
                        React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" })
                    ),
                    title: __('Align top'),
                    align: 'top'
                }, {
                    icon: React.createElement(
                        "svg",
                        { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24" },
                        React.createElement("path", { d: "M8 19h3v4h2v-4h3l-4-4-4 4zm8-14h-3V1h-2v4H8l4 4 4-4zM4 11v2h16v-2H4z" }),
                        React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" })
                    ),
                    title: __('Align middle'),
                    align: 'middle'
                }, {
                    icon: React.createElement(
                        "svg",
                        { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24" },
                        React.createElement("path", { d: "M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z" }),
                        React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" })
                    ),
                    title: __('Align bottom'),
                    align: 'bottom'
                }];

                return React.createElement(
                    Fragment,
                    null,
                    React.createElement(
                        BlockControls,
                        null,
                        React.createElement(
                            Toolbar,
                            null,
                            React.createElement(DropdownMenu, {
                                icon: "editor-table",
                                label: __('Edit Table'),
                                controls: TABLE_CONTROLS
                            }),
                            React.createElement(IconButton, {
                                icon: "update",
                                label: __('Refresh table (Use this after using undo or redo)'),
                                onClick: function onClick() {
                                    return _this2.calculateRealColIndex();
                                }
                            })
                        )
                    ),
                    React.createElement(
                        InspectorControls,
                        null,
                        React.createElement(
                            PanelBody,
                            { title: __('Table Settings') },
                            React.createElement(RangeControl, {
                                label: __('Max width (px)'),
                                help: __('Set this to 0 to make max-width is 100%'),
                                min: 0,
                                max: 1999,
                                value: maxWidth,
                                onChange: function onChange(value) {
                                    return setAttributes({ maxWidth: value });
                                }
                            })
                        ),
                        React.createElement(
                            PanelBody,
                            { title: __('Cell Settings') },
                            React.createElement(PanelColorSettings, {
                                title: __('Color Settings'),
                                colorSettings: [{
                                    label: __('Background Color'),
                                    value: this.getCellStyles('backgroundColor'),
                                    onChange: function onChange(value) {
                                        return _this2.updateCellsStyles({ backgroundColor: value });
                                    }
                                }, {
                                    label: __('Text Color'),
                                    value: this.getCellStyles('color'),
                                    onChange: function onChange(value) {
                                        return _this2.updateCellsStyles({ color: value });
                                    }
                                }, {
                                    label: __('Border Color'),
                                    value: this.getCellStyles('borderColor'),
                                    onChange: function onChange(value) {
                                        return _this2.updateCellsStyles({ borderColor: value });
                                    }
                                }]
                            }),
                            React.createElement(
                                PanelBody,
                                { title: __('Border'), initialOpen: false },
                                React.createElement(SelectControl, {
                                    label: __('Border Style'),
                                    value: this.getCellStyles('borderStyle'),
                                    options: [{ label: __('Solid'), value: 'solid' }, { label: __('Dashed'), value: 'dashed' }, { label: __('Dotted'), value: 'dotted' }, { label: __('None'), value: 'none' }],
                                    onChange: function onChange(value) {
                                        return _this2.updateCellsStyles({ borderStyle: value });
                                    }
                                }),
                                React.createElement(RangeControl, {
                                    label: __('Border width'),
                                    value: this.getCellStyles('borderWidth'),
                                    min: 1,
                                    max: 10,
                                    onChange: function onChange(value) {
                                        return _this2.updateCellsStyles({ borderWidth: value });
                                    }
                                }),
                                React.createElement(
                                    "div",
                                    { className: 'advgb-border-item-wrapper' },
                                    BORDER_SELECT.map(function (item, index) {
                                        return React.createElement(
                                            "div",
                                            { className: 'advgb-border-item', key: index },
                                            React.createElement(
                                                Tooltip,
                                                { text: item.title },
                                                React.createElement(
                                                    "span",
                                                    { onClick: item.onClick },
                                                    item.icon
                                                )
                                            )
                                        );
                                    })
                                )
                            ),
                            React.createElement(
                                PanelBody,
                                { title: __('Text Alignment'), initialOpen: false },
                                React.createElement(
                                    BaseControl,
                                    { label: __('Horizontal Align') },
                                    React.createElement(Toolbar, {
                                        controls: HORZ_ALIGNMENT_CONTROLS.map(function (control) {
                                            var isActive = _this2.getCellStyles('textAlign') === control.align;

                                            return _extends({}, control, {
                                                isActive: isActive,
                                                onClick: function onClick() {
                                                    return _this2.updateCellsStyles({ textAlign: isActive ? undefined : control.align });
                                                }
                                            });
                                        })
                                    })
                                ),
                                React.createElement(
                                    BaseControl,
                                    { label: __('Vertical Align') },
                                    React.createElement(Toolbar, {
                                        controls: VERT_ALIGNMENT_CONTROLS.map(function (control) {
                                            var isActive = _this2.getCellStyles('verticalAlign') === control.align;

                                            return _extends({}, control, {
                                                isActive: isActive,
                                                onClick: function onClick() {
                                                    return _this2.updateCellsStyles({ verticalAlign: isActive ? undefined : control.align });
                                                }
                                            });
                                        })
                                    })
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "table",
                        { className: className, style: { maxWidth: maxWidthVal } },
                        React.createElement(
                            "tbody",
                            null,
                            body.map(function (_ref, rowIndex) {
                                var cells = _ref.cells;
                                return React.createElement(
                                    "tr",
                                    { key: rowIndex },
                                    cells.map(function (_ref2, colIndex) {
                                        var content = _ref2.content,
                                            styles = _ref2.styles,
                                            colSpan = _ref2.colSpan,
                                            rowSpan = _ref2.rowSpan,
                                            cI = _ref2.cI;

                                        var cell = { rowIndex: rowIndex, colIndex: colIndex, cI: cI };

                                        var isSelected = selectedCell && selectedCell.rowIndex === rowIndex && selectedCell.colIndex === colIndex;

                                        if (rangeSelected && rangeSelected.toCell) {
                                            var fromCell = rangeSelected.fromCell,
                                                toCell = rangeSelected.toCell;

                                            var fCell = body[fromCell.rowIdx].cells[fromCell.colIdx];
                                            var tCell = body[toCell.rowIdx].cells[toCell.colIdx];
                                            var fcSpan = typeof fCell.colSpan === 'undefined' ? 0 : parseInt(fCell.colSpan) - 1;
                                            var frSpan = typeof fCell.rowSpan === 'undefined' ? 0 : parseInt(fCell.rowSpan) - 1;
                                            var tcSpan = typeof tCell.colSpan === 'undefined' ? 0 : parseInt(tCell.colSpan) - 1;
                                            var trSpan = typeof tCell.rowSpan === 'undefined' ? 0 : parseInt(tCell.rowSpan) - 1;

                                            isSelected = rowIndex >= Math.min(fromCell.rowIdx, toCell.rowIdx) && rowIndex <= Math.max(fromCell.rowIdx + frSpan, toCell.rowIdx + trSpan) && cI >= Math.min(fromCell.RCI, toCell.RCI) && cI <= Math.max(fromCell.RCI + fcSpan, toCell.RCI + tcSpan);
                                        }

                                        if (multiSelected && multiSelected.length > 1) {
                                            isSelected = multiSelected.findIndex(function (c) {
                                                return c.rowIndex === rowIndex && c.colIndex === colIndex;
                                            }) > -1;
                                        }

                                        var cellClassName = [isSelected && 'cell-selected'].filter(Boolean).join(' ');

                                        styles = AdvTable.parseStyles(styles);

                                        return React.createElement(
                                            "td",
                                            { key: colIndex,
                                                className: cellClassName,
                                                style: styles,
                                                colSpan: colSpan,
                                                rowSpan: rowSpan,
                                                onClick: function onClick(e) {
                                                    if (e.shiftKey) {
                                                        if (!rangeSelected) return;
                                                        if (!rangeSelected.fromCell) return;

                                                        var _fromCell = rangeSelected.fromCell;

                                                        var _toCell = {
                                                            rowIdx: rowIndex,
                                                            colIdx: colIndex,
                                                            RCI: cI
                                                        };

                                                        _this2.setState({
                                                            rangeSelected: { fromCell: _fromCell, toCell: _toCell },
                                                            multiSelected: null
                                                        });
                                                    } else if (e.ctrlKey || e.metaKey) {
                                                        var multiCells = multiSelected ? multiSelected : [];
                                                        var existCell = multiCells.findIndex(function (cel) {
                                                            return cel.rowIndex === rowIndex && cel.colIndex === colIndex;
                                                        });

                                                        if (existCell === -1) {
                                                            multiCells.push(cell);
                                                        } else {
                                                            multiCells.splice(existCell, 1);
                                                        }

                                                        _this2.setState({
                                                            multiSelected: multiCells,
                                                            rangeSelected: null
                                                        });
                                                    } else {
                                                        _this2.setState({
                                                            rangeSelected: {
                                                                fromCell: {
                                                                    rowIdx: rowIndex,
                                                                    colIdx: colIndex,
                                                                    RCI: cI
                                                                }
                                                            },
                                                            multiSelected: [cell]
                                                        });
                                                    }
                                                }
                                            },
                                            React.createElement(RichText, {
                                                className: "wp-block-table__cell-content",
                                                value: content,
                                                onChange: function onChange(value) {
                                                    return _this2.updateCellContent(value);
                                                },
                                                unstableOnFocus: function unstableOnFocus() {
                                                    return _this2.setState({ selectedCell: cell });
                                                }
                                            })
                                        );
                                    })
                                );
                            })
                        )
                    )
                );
            }
        }], [{
            key: "parseStyles",
            value: function parseStyles(styles) {
                if (typeof styles !== 'string') {
                    return styles;
                }

                return styles.split(';').filter(function (style) {
                    return style.split(':')[0] && style.split(':')[1];
                }).map(function (style) {
                    return [style.split(':')[0].trim().replace(/-./g, function (c) {
                        return c.substr(1).toUpperCase();
                    }), style.split(':')[1].trim()];
                }).reduce(function (styleObj, style) {
                    return _extends({}, styleObj, _defineProperty({}, style[0], style[1]));
                }, {});
            }
        }]);

        return AdvTable;
    }(Component);

    registerBlockType('advgb/table', {
        title: __('Advanced Table'),
        description: __('Advanced table block with more styles and functions.'),
        icon: {
            src: tableBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined
        },
        category: 'formatting',
        keywords: [__('table'), __('cell'), __('data')],
        attributes: {
            body: {
                type: 'array',
                default: [],
                source: 'query',
                selector: 'tbody tr',
                query: {
                    cells: {
                        type: 'array',
                        default: [],
                        source: 'query',
                        selector: 'td',
                        query: {
                            content: {
                                source: 'html'
                            },
                            styles: {
                                type: 'string',
                                source: 'attribute',
                                attribute: 'style'
                            },
                            colSpan: {
                                type: 'string',
                                source: 'attribute',
                                attribute: 'colspan'
                            },
                            rowSpan: {
                                type: 'string',
                                source: 'attribute',
                                attribute: 'rowspan'
                            },
                            borderColorSaved: {
                                type: 'string',
                                source: 'attribute',
                                attribute: 'data-border-color'
                            }
                        }
                    }
                }
            },
            maxWidth: {
                type: 'number',
                default: 0
            },
            changed: {
                type: 'boolean',
                default: false
            }
        },
        supports: {
            align: true
        },
        edit: AdvTable,
        save: function save(_ref3) {
            var attributes = _ref3.attributes;
            var body = attributes.body,
                maxWidth = attributes.maxWidth;

            var maxWidthVal = !!maxWidth ? maxWidth : undefined;

            return React.createElement(
                "table",
                { className: "advgb-table-frontend", style: { maxWidth: maxWidthVal } },
                React.createElement(
                    "tbody",
                    null,
                    body.map(function (_ref4, rowIndex) {
                        var cells = _ref4.cells;
                        return React.createElement(
                            "tr",
                            { key: rowIndex },
                            cells.map(function (_ref5, colIndex) {
                                var content = _ref5.content,
                                    styles = _ref5.styles,
                                    colSpan = _ref5.colSpan,
                                    rowSpan = _ref5.rowSpan,
                                    borderColorSaved = _ref5.borderColorSaved;
                                return React.createElement(RichText.Content, {
                                    tagName: "td",
                                    value: content,
                                    key: colIndex,
                                    style: styles,
                                    colSpan: colSpan,
                                    rowSpan: rowSpan,
                                    "data-border-color": borderColorSaved
                                });
                            })
                        );
                    })
                )
            );
        },
        transforms: {
            from: [{
                type: 'block',
                blocks: ['core/table'],
                transform: function transform(attributes) {
                    return createBlock('advgb/table', {
                        body: attributes.body
                    });
                }
            }]
        }
    });
})(wp.i18n, wp.blocks, wp.element, wp.editor, wp.components);

/***/ }),

/***/ "./assets/blocks/advvideo/block.jsx":
/*!******************************************!*\
  !*** ./assets/blocks/advvideo/block.jsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
        PanelColorSettings = wpEditor.PanelColorSettings,
        MediaUpload = wpEditor.MediaUpload;
    var RangeControl = wpComponents.RangeControl,
        PanelBody = wpComponents.PanelBody,
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
                    poster = attributes.poster,
                    posterID = attributes.posterID;

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

                    wp.apiFetch({ path: wp.url.addQueryArgs("/oembed/1.0/proxy?url=" + encodeURIComponent(url)) }).then(function (obj) {
                        _this2.setState({ fetching: false });
                        if (!!obj.title && !!obj.provider_name) {
                            setAttributes({
                                videoTitle: obj.title,
                                poster: !!posterID ? poster : obj.thumbnail_url
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


                var blockClassName = ['advgb-video-block', !!openInLightbox && !!videoURL && 'advgb-video-lightbox'].filter(Boolean).join(' ');

                var videoWrapperClass = ['advgb-video-wrapper', !!videoFullWidth && 'full-width'].filter(Boolean).join(' ');

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
                                allowedTypes: ["image"],
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
                                Fragment,
                                null,
                                React.createElement(PanelColorSettings, {
                                    title: __('Color Settings'),
                                    initialOpen: false,
                                    colorSettings: [{
                                        label: __('Overlay Color'),
                                        value: overlayColor,
                                        onChange: function onChange(value) {
                                            return setAttributes({ overlayColor: value === undefined ? '#EEEEEE' : value });
                                        }
                                    }, {
                                        label: __('Play Button Color'),
                                        value: playButtonColor,
                                        onChange: function onChange(value) {
                                            return setAttributes({ playButtonColor: value === undefined ? '#fff' : value });
                                        }
                                    }]
                                }),
                                React.createElement(
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
                                    })
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: blockClassName },
                        !!openInLightbox && React.createElement(
                            "div",
                            { className: videoWrapperClass, style: { backgroundColor: overlayColor, width: videoWidth } },
                            React.createElement("div", { className: 'advgb-video-poster', style: { backgroundImage: "url(" + poster + ")" } }),
                            React.createElement(
                                "div",
                                { className: 'advgb-button-wrapper', style: { height: videoHeight } },
                                !poster && React.createElement(MediaUpload, {
                                    allowedTypes: ["image"],
                                    onSelect: function onSelect(media) {
                                        return setAttributes({ poster: media.url, posterID: media.id });
                                    },
                                    value: posterID,
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
                                    { className: 'advgb-play-button', style: { color: playButtonColor } },
                                    React.createElement(
                                        "svg",
                                        { xmlns: "http://www.w3.org/2000/svg",
                                            width: playButtonSize,
                                            height: playButtonSize,
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
                                        style: { height: '31px' },
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
                                    allowedTypes: ["video"],
                                    value: videoID,
                                    onSelect: function onSelect(video) {
                                        return setAttributes({ videoURL: video.url, videoID: video.id, videoTitle: video.title, videoSourceType: 'local' });
                                    },
                                    render: function render(_ref3) {
                                        var open = _ref3.open;
                                        return React.createElement(
                                            Button,
                                            {
                                                className: "button button-large is-primary",
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

    var advVideoBlockIcon = React.createElement(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "2 2 22 22" },
        React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" }),
        React.createElement("path", { d: "M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" })
    );

    registerBlockType('advgb/video', {
        title: __('Advanced Video'),
        description: __('Powerful block for insert and embed video.'),
        icon: {
            src: advVideoBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined
        },
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
                default: '#EEEEEE'
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

            var videoWrapperClass = ['advgb-video-wrapper', !!videoFullWidth && 'full-width'].filter(Boolean).join(' ');

            return React.createElement(
                "div",
                { className: blockClassName,
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
                    { className: videoWrapperClass, style: { backgroundColor: overlayColor, width: videoWidth } },
                    React.createElement("div", { className: 'advgb-video-poster', style: { backgroundImage: "url(" + poster + ")" } }),
                    React.createElement(
                        "div",
                        { className: 'advgb-button-wrapper', style: { height: videoHeight } },
                        React.createElement(
                            "div",
                            { className: 'advgb-play-button', style: { color: playButtonColor } },
                            React.createElement(
                                "svg",
                                { xmlns: "http://www.w3.org/2000/svg",
                                    width: playButtonSize,
                                    height: playButtonSize,
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

/***/ }),

/***/ "./assets/blocks/contact-form/block.jsx":
/*!**********************************************!*\
  !*** ./assets/blocks/contact-form/block.jsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
        PanelColorSettings = wpEditor.PanelColorSettings;
    var PanelBody = wpComponents.PanelBody,
        RangeControl = wpComponents.RangeControl,
        SelectControl = wpComponents.SelectControl,
        TextControl = wpComponents.TextControl;


    var contactBlockIcon = React.createElement(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24" },
        React.createElement("path", { fill: "none", d: "M0 0h24v24H0V0z" }),
        React.createElement("path", { d: "M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 4.99L4 6h16zm0 12H4V8l8 5 8-5v10z" })
    );

    var AdvContactForm = function (_Component) {
        _inherits(AdvContactForm, _Component);

        function AdvContactForm() {
            _classCallCheck(this, AdvContactForm);

            return _possibleConstructorReturn(this, (AdvContactForm.__proto__ || Object.getPrototypeOf(AdvContactForm)).apply(this, arguments));
        }

        _createClass(AdvContactForm, [{
            key: "render",
            value: function render() {
                var _props = this.props,
                    attributes = _props.attributes,
                    setAttributes = _props.setAttributes;
                var nameLabel = attributes.nameLabel,
                    emailLabel = attributes.emailLabel,
                    msgLabel = attributes.msgLabel,
                    submitLabel = attributes.submitLabel,
                    successLabel = attributes.successLabel,
                    bgColor = attributes.bgColor,
                    textColor = attributes.textColor,
                    borderColor = attributes.borderColor,
                    borderStyle = attributes.borderStyle,
                    borderRadius = attributes.borderRadius,
                    submitColor = attributes.submitColor,
                    submitBgColor = attributes.submitBgColor,
                    submitRadius = attributes.submitRadius,
                    submitPosition = attributes.submitPosition;


                return React.createElement(
                    Fragment,
                    null,
                    React.createElement(
                        InspectorControls,
                        null,
                        React.createElement(
                            PanelBody,
                            { title: __('Form Settings') },
                            React.createElement(
                                PanelBody,
                                { title: __('Email sender'), initialOpen: false },
                                React.createElement(
                                    "p",
                                    { style: { fontStyle: 'italic' } },
                                    __('An email will be sent to the admin email (by default) whenever a contact form is submitted. You can change it in '),
                                    React.createElement(
                                        "a",
                                        { href: advgbSettings.config_url + '#settings', target: "_blank" },
                                        " ",
                                        __('settings'),
                                        "."
                                    )
                                )
                            ),
                            React.createElement(
                                PanelBody,
                                { title: __('Text Label') },
                                React.createElement(TextControl, {
                                    label: __('Name input placeholder'),
                                    value: nameLabel,
                                    onChange: function onChange(value) {
                                        return setAttributes({ nameLabel: value });
                                    }
                                }),
                                React.createElement(TextControl, {
                                    label: __('Email input placeholder'),
                                    value: emailLabel,
                                    onChange: function onChange(value) {
                                        return setAttributes({ emailLabel: value });
                                    }
                                }),
                                React.createElement(TextControl, {
                                    label: __('Message input placeholder'),
                                    value: msgLabel,
                                    onChange: function onChange(value) {
                                        return setAttributes({ msgLabel: value });
                                    }
                                }),
                                React.createElement(TextControl, {
                                    label: __('Submit text'),
                                    value: submitLabel,
                                    onChange: function onChange(value) {
                                        return setAttributes({ submitLabel: value });
                                    }
                                }),
                                React.createElement(TextControl, {
                                    label: __('Submit success text'),
                                    value: successLabel,
                                    onChange: function onChange(value) {
                                        return setAttributes({ successLabel: value });
                                    }
                                })
                            ),
                            React.createElement(PanelColorSettings, {
                                title: __('Input Color'),
                                colorSettings: [{
                                    label: __('Background color'),
                                    value: bgColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ bgColor: value });
                                    }
                                }, {
                                    label: __('Text color'),
                                    value: textColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ textColor: value });
                                    }
                                }]
                            }),
                            React.createElement(
                                PanelBody,
                                { title: __('Border Settings'), initialOpen: false },
                                React.createElement(PanelColorSettings, {
                                    title: __('Border Color'),
                                    initialOpen: false,
                                    colorSettings: [{
                                        label: __('Border color'),
                                        value: borderColor,
                                        onChange: function onChange(value) {
                                            return setAttributes({ borderColor: value });
                                        }
                                    }]
                                }),
                                React.createElement(SelectControl, {
                                    label: __('Border Style'),
                                    value: borderStyle,
                                    options: [{ label: __('Solid'), value: 'solid' }, { label: __('Dashed'), value: 'dashed' }, { label: __('Dotted'), value: 'dotted' }],
                                    onChange: function onChange(value) {
                                        return setAttributes({ borderStyle: value });
                                    }
                                }),
                                React.createElement(RangeControl, {
                                    label: __('Border radius (px)'),
                                    value: borderRadius,
                                    onChange: function onChange(value) {
                                        return setAttributes({ borderRadius: value });
                                    },
                                    min: 0,
                                    max: 50
                                })
                            ),
                            React.createElement(
                                PanelBody,
                                { title: __('Submit Button Settings') },
                                React.createElement(PanelColorSettings, {
                                    title: __('Color Settings'),
                                    initialOpen: false,
                                    colorSettings: [{
                                        label: __('Border and Text'),
                                        value: submitColor,
                                        onChange: function onChange(value) {
                                            return setAttributes({ submitColor: value });
                                        }
                                    }, {
                                        label: __('Background'),
                                        value: submitBgColor,
                                        onChange: function onChange(value) {
                                            return setAttributes({ submitBgColor: value });
                                        }
                                    }]
                                }),
                                React.createElement(RangeControl, {
                                    label: __('Button border radius'),
                                    value: submitRadius,
                                    onChange: function onChange(value) {
                                        return setAttributes({ submitRadius: value });
                                    },
                                    min: 0,
                                    max: 50
                                }),
                                React.createElement(SelectControl, {
                                    label: __('Button position'),
                                    value: submitPosition,
                                    options: [{ label: __('Center'), value: 'center' }, { label: __('Left'), value: 'left' }, { label: __('Right'), value: 'right' }],
                                    onChange: function onChange(value) {
                                        return setAttributes({ submitPosition: value });
                                    }
                                })
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "advgb-contact-form" },
                        React.createElement(
                            "div",
                            { className: "advgb-form-field advgb-form-field-half" },
                            React.createElement("input", { type: "text", disabled: true,
                                className: "advgb-form-input",
                                value: nameLabel ? nameLabel : __('Name'),
                                style: {
                                    backgroundColor: bgColor,
                                    color: textColor,
                                    borderColor: borderColor,
                                    borderStyle: borderStyle,
                                    borderRadius: borderRadius
                                }
                            })
                        ),
                        React.createElement(
                            "div",
                            { className: "advgb-form-field advgb-form-field-half" },
                            React.createElement("input", { type: "text", disabled: true,
                                className: "advgb-form-input",
                                value: emailLabel ? emailLabel : __('Email address'),
                                style: {
                                    backgroundColor: bgColor,
                                    color: textColor,
                                    borderColor: borderColor,
                                    borderStyle: borderStyle,
                                    borderRadius: borderRadius
                                }
                            })
                        ),
                        React.createElement(
                            "div",
                            { className: "advgb-form-field advgb-form-field-full" },
                            React.createElement("textarea", { className: "advgb-form-input",
                                disabled: true,
                                value: msgLabel ? msgLabel : __('Message'),
                                style: {
                                    backgroundColor: bgColor,
                                    color: textColor,
                                    borderColor: borderColor,
                                    borderStyle: borderStyle,
                                    borderRadius: borderRadius
                                }
                            })
                        ),
                        React.createElement(
                            "div",
                            { className: "advgb-form-submit-wrapper",
                                style: { textAlign: submitPosition }
                            },
                            React.createElement(
                                "button",
                                { className: "advgb-form-submit",
                                    style: {
                                        borderColor: submitColor,
                                        color: submitColor,
                                        backgroundColor: submitBgColor,
                                        borderRadius: submitRadius
                                    }
                                },
                                submitLabel ? submitLabel : __('Submit')
                            )
                        )
                    )
                );
            }
        }]);

        return AdvContactForm;
    }(Component);

    registerBlockType('advgb/contact-form', {
        title: __('Contact Form'),
        description: __('Fastest way to create a contact form for your page.'),
        icon: {
            src: contactBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined
        },
        category: 'widgets',
        keywords: [__('contact'), __('form')],
        attributes: {
            nameLabel: {
                type: 'string'
            },
            emailLabel: {
                type: 'string'
            },
            msgLabel: {
                type: 'string'
            },
            submitLabel: {
                type: 'string'
            },
            successLabel: {
                type: 'string'
            },
            bgColor: {
                type: 'string'
            },
            textColor: {
                type: 'string'
            },
            borderStyle: {
                type: 'string'
            },
            borderColor: {
                type: 'string'
            },
            borderRadius: {
                type: 'number'
            },
            submitColor: {
                type: 'string'
            },
            submitBgColor: {
                type: 'string'
            },
            submitRadius: {
                type: 'number'
            },
            submitPosition: {
                type: 'string',
                default: 'right'
            },
            changed: {
                type: 'boolean',
                default: false
            }
        },
        edit: AdvContactForm,
        save: function save(_ref) {
            var attributes = _ref.attributes;
            var nameLabel = attributes.nameLabel,
                emailLabel = attributes.emailLabel,
                msgLabel = attributes.msgLabel,
                submitLabel = attributes.submitLabel,
                successLabel = attributes.successLabel,
                bgColor = attributes.bgColor,
                textColor = attributes.textColor,
                borderColor = attributes.borderColor,
                borderStyle = attributes.borderStyle,
                borderRadius = attributes.borderRadius,
                submitColor = attributes.submitColor,
                submitBgColor = attributes.submitBgColor,
                submitRadius = attributes.submitRadius,
                submitPosition = attributes.submitPosition;


            return React.createElement(
                "div",
                { className: "advgb-contact-form" },
                React.createElement(
                    "form",
                    { method: "POST" },
                    React.createElement(
                        "div",
                        { className: "advgb-form-field advgb-form-field-half" },
                        React.createElement("input", { type: "text",
                            className: "advgb-form-input advgb-form-input-name",
                            placeholder: nameLabel ? nameLabel : __('Name'),
                            name: "contact_name",
                            style: {
                                backgroundColor: bgColor,
                                color: textColor,
                                borderColor: borderColor,
                                borderStyle: borderStyle,
                                borderRadius: borderRadius
                            }
                        })
                    ),
                    React.createElement(
                        "div",
                        { className: "advgb-form-field advgb-form-field-half" },
                        React.createElement("input", { type: "email",
                            className: "advgb-form-input advgb-form-input-email",
                            placeholder: emailLabel ? emailLabel : __('Email address'),
                            name: "contact_email",
                            style: {
                                backgroundColor: bgColor,
                                color: textColor,
                                borderColor: borderColor,
                                borderStyle: borderStyle,
                                borderRadius: borderRadius
                            }
                        })
                    ),
                    React.createElement(
                        "div",
                        { className: "advgb-form-field advgb-form-field-full" },
                        React.createElement("textarea", { className: "advgb-form-input advgb-form-input-msg",
                            placeholder: msgLabel ? msgLabel : __('Message'),
                            name: "contact_message",
                            style: {
                                backgroundColor: bgColor,
                                color: textColor,
                                borderColor: borderColor,
                                borderStyle: borderStyle,
                                borderRadius: borderRadius
                            }
                        })
                    ),
                    React.createElement(
                        "div",
                        { className: "advgb-form-submit-wrapper",
                            style: { textAlign: submitPosition }
                        },
                        React.createElement(
                            "button",
                            { className: "advgb-form-submit",
                                type: "submit",
                                "data-success": successLabel ? successLabel : undefined,
                                style: {
                                    borderColor: submitColor,
                                    color: submitColor,
                                    backgroundColor: submitBgColor,
                                    borderRadius: submitRadius
                                }
                            },
                            submitLabel ? submitLabel : __('Submit')
                        )
                    )
                )
            );
        }
    });
})(wp.i18n, wp.blocks, wp.element, wp.editor, wp.components);

/***/ }),

/***/ "./assets/blocks/count-up/block.jsx":
/*!******************************************!*\
  !*** ./assets/blocks/count-up/block.jsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
        RichText = wpEditor.RichText,
        PanelColorSettings = wpEditor.PanelColorSettings;
    var RangeControl = wpComponents.RangeControl,
        PanelBody = wpComponents.PanelBody,
        TextControl = wpComponents.TextControl,
        FormToggle = wpComponents.FormToggle;

    var AdvCountUp = function (_Component) {
        _inherits(AdvCountUp, _Component);

        function AdvCountUp() {
            _classCallCheck(this, AdvCountUp);

            var _this = _possibleConstructorReturn(this, (AdvCountUp.__proto__ || Object.getPrototypeOf(AdvCountUp)).apply(this, arguments));

            _this.state = {
                currentEdit: ''
            };
            return _this;
        }

        _createClass(AdvCountUp, [{
            key: 'componentWillMount',
            value: function componentWillMount() {
                var _props = this.props,
                    attributes = _props.attributes,
                    setAttributes = _props.setAttributes;

                var currentBlockConfig = advgbDefaultConfig['advgb-count-up'];

                // No override attributes of blocks inserted before
                if (attributes.changed !== true) {
                    if (currentBlockConfig !== undefined && (typeof currentBlockConfig === 'undefined' ? 'undefined' : _typeof(currentBlockConfig)) === 'object') {
                        Object.keys(currentBlockConfig).map(function (attribute) {
                            attributes[attribute] = currentBlockConfig[attribute];
                        });

                        // Finally set changed attribute to true, so we don't modify anything again
                        setAttributes({ changed: true });
                    }
                }
            }
        }, {
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
                var _props2 = this.props,
                    attributes = _props2.attributes,
                    setAttributes = _props2.setAttributes,
                    isSelected = _props2.isSelected;
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
                    countUpSymbol2 = attributes.countUpSymbol2,
                    countUpSymbol3 = attributes.countUpSymbol3,
                    countUpSymbolAfter = attributes.countUpSymbolAfter,
                    countUpSymbolAfter2 = attributes.countUpSymbolAfter2,
                    countUpSymbolAfter3 = attributes.countUpSymbolAfter3,
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
                            { title: __('Count Up Settings') },
                            React.createElement(PanelColorSettings, {
                                title: __('Color Settings'),
                                initialOpen: false,
                                colorSettings: [{
                                    label: __('Header Color'),
                                    value: headerTextColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ headerTextColor: value });
                                    }
                                }, {
                                    label: __('Count Up Color'),
                                    value: countUpNumberColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ countUpNumberColor: value });
                                    }
                                }, {
                                    label: __('Description Color'),
                                    value: descTextColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ descTextColor: value });
                                    }
                                }]
                            }),
                            React.createElement(RangeControl, {
                                label: __('Columns'),
                                min: 1,
                                max: 3,
                                value: columns,
                                onChange: function onChange(value) {
                                    return setAttributes({ columns: value });
                                }
                            }),
                            React.createElement(RangeControl, {
                                label: __('Counter Number Size'),
                                min: 10,
                                max: 100,
                                value: countUpNumberSize,
                                onChange: function onChange(value) {
                                    return setAttributes({ countUpNumberSize: value });
                                }
                            }),
                            React.createElement(
                                'div',
                                null,
                                __('Counter Up Symbol')
                            ),
                            React.createElement(
                                'div',
                                { className: 'advgb-col-3' },
                                React.createElement(TextControl, {
                                    value: countUpSymbol,
                                    onChange: function onChange(value) {
                                        return setAttributes({ countUpSymbol: value });
                                    }
                                }),
                                React.createElement(FormToggle, {
                                    checked: countUpSymbolAfter,
                                    onChange: function onChange() {
                                        return setAttributes({ countUpSymbolAfter: !countUpSymbolAfter });
                                    },
                                    title: !!countUpSymbolAfter ? __('After') : __('Before')
                                })
                            ),
                            parseInt(columns) > 1 && React.createElement(
                                'div',
                                { className: 'advgb-col-3' },
                                React.createElement(TextControl, {
                                    value: countUpSymbol2,
                                    onChange: function onChange(value) {
                                        return setAttributes({ countUpSymbol2: value });
                                    }
                                }),
                                React.createElement(FormToggle, {
                                    checked: countUpSymbolAfter2,
                                    onChange: function onChange() {
                                        return setAttributes({ countUpSymbolAfter2: !countUpSymbolAfter2 });
                                    },
                                    title: !!countUpSymbolAfter2 ? __('After') : __('Before')
                                })
                            ),
                            parseInt(columns) > 2 && React.createElement(
                                'div',
                                { className: 'advgb-col-3' },
                                React.createElement(TextControl, {
                                    value: countUpSymbol3,
                                    onChange: function onChange(value) {
                                        return setAttributes({ countUpSymbol3: value });
                                    }
                                }),
                                React.createElement(FormToggle, {
                                    checked: countUpSymbolAfter3,
                                    onChange: function onChange() {
                                        return setAttributes({ countUpSymbolAfter3: !countUpSymbolAfter3 });
                                    },
                                    title: !!countUpSymbolAfter3 ? __('After') : __('Before')
                                })
                            ),
                            React.createElement(
                                'p',
                                { className: 'components-base-control__help', style: { clear: 'both' } },
                                __('Use toggle buttons above to define symbol placement before/after the number (toggle on is after).')
                            )
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
                                unstableOnSetup: function unstableOnSetup(editor) {
                                    return _this3.handleSetup(editor, 'header');
                                },
                                style: { color: headerTextColor },
                                placeholder: __('Enter text…')
                            }),
                            React.createElement(RichText, {
                                tagName: 'div',
                                value: countUpNumber,
                                onChange: function onChange(value) {
                                    return setAttributes({ countUpNumber: value });
                                },
                                isSelected: isSelected && currentEdit === 'countUp',
                                unstableOnSetup: function unstableOnSetup(editor) {
                                    return _this3.handleSetup(editor, 'countUp');
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
                                unstableOnSetup: function unstableOnSetup(editor) {
                                    return _this3.handleSetup(editor, 'desc');
                                },
                                style: { color: descTextColor },
                                placeholder: __('Enter text…')
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
                                unstableOnSetup: function unstableOnSetup(editor) {
                                    return _this3.handleSetup(editor, 'header2');
                                },
                                style: { color: headerTextColor },
                                placeholder: __('Enter text…')
                            }),
                            React.createElement(RichText, {
                                tagName: 'div',
                                value: countUpNumber2,
                                onChange: function onChange(value) {
                                    return setAttributes({ countUpNumber2: value });
                                },
                                isSelected: isSelected && currentEdit === 'countUp2',
                                unstableOnSetup: function unstableOnSetup(editor) {
                                    return _this3.handleSetup(editor, 'countUp2');
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
                                unstableOnSetup: function unstableOnSetup(editor) {
                                    return _this3.handleSetup(editor, 'desc2');
                                },
                                style: { color: descTextColor },
                                placeholder: __('Enter text…')
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
                                unstableOnSetup: function unstableOnSetup(editor) {
                                    return _this3.handleSetup(editor, 'header3');
                                },
                                style: { color: headerTextColor },
                                placeholder: __('Enter text…')
                            }),
                            React.createElement(RichText, {
                                tagName: 'div',
                                value: countUpNumber3,
                                onChange: function onChange(value) {
                                    return setAttributes({ countUpNumber3: value });
                                },
                                isSelected: isSelected && currentEdit === 'countUp3',
                                unstableOnSetup: function unstableOnSetup(editor) {
                                    return _this3.handleSetup(editor, 'countUp3');
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
                                unstableOnSetup: function unstableOnSetup(editor) {
                                    return _this3.handleSetup(editor, 'desc3');
                                },
                                style: { color: descTextColor },
                                placeholder: __('Enter text…')
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
            countUpSymbol2 = attributes.countUpSymbol2,
            countUpSymbol3 = attributes.countUpSymbol3,
            countUpSymbolAfter = attributes.countUpSymbolAfter,
            countUpSymbolAfter2 = attributes.countUpSymbolAfter2,
            countUpSymbolAfter3 = attributes.countUpSymbolAfter3,
            descText = attributes.descText,
            descText2 = attributes.descText2,
            descText3 = attributes.descText3,
            descTextColor = attributes.descTextColor,
            columns = attributes.columns;


        var countSymbolElm = countUpSymbol ? React.createElement(
            'span',
            { className: 'advgb-counter-symbol' },
            countUpSymbol
        ) : '';
        var countSymbolElm2 = countUpSymbol2 ? React.createElement(
            'span',
            { className: 'advgb-counter-symbol' },
            countUpSymbol2
        ) : '';
        var countSymbolElm3 = countUpSymbol3 ? React.createElement(
            'span',
            { className: 'advgb-counter-symbol' },
            countUpSymbol3
        ) : '';

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
                    !countUpSymbolAfter && countSymbolElm,
                    React.createElement(
                        'span',
                        { className: 'advgb-counter-number' },
                        countUpNumber
                    ),
                    !!countUpSymbolAfter && countSymbolElm
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
                    !countUpSymbolAfter2 && countSymbolElm2,
                    React.createElement(
                        'span',
                        { className: 'advgb-counter-number' },
                        countUpNumber2
                    ),
                    !!countUpSymbolAfter2 && countSymbolElm2
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
                    !countUpSymbolAfter3 && countSymbolElm3,
                    React.createElement(
                        'span',
                        { className: 'advgb-counter-number' },
                        countUpNumber3
                    ),
                    !!countUpSymbolAfter3 && countSymbolElm3
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
        { height: '20', viewBox: '2 2 22 22', width: '20', xmlns: 'http://www.w3.org/2000/svg' },
        React.createElement('path', { d: 'M0 0h24v24H0zm0 0h24v24H0z', fill: 'none' }),
        React.createElement('path', { d: 'M16.05 16.29l2.86-3.07c.38-.39.72-.79 1.04-1.18.32-.39.59-.78.82-1.17.23-.39.41-.78.54-1.17.13-.39.19-.79.19-1.18 0-.53-.09-1.02-.27-1.46-.18-.44-.44-.81-.78-1.11-.34-.31-.77-.54-1.26-.71-.51-.16-1.08-.24-1.72-.24-.69 0-1.31.11-1.85.32-.54.21-1 .51-1.36.88-.37.37-.65.8-.84 1.3-.18.47-.27.97-.28 1.5h2.14c.01-.31.05-.6.13-.87.09-.29.23-.54.4-.75.18-.21.41-.37.68-.49.27-.12.6-.18.96-.18.31 0 .58.05.81.15.23.1.43.25.59.43.16.18.28.4.37.65.08.25.13.52.13.81 0 .22-.03.43-.08.65-.06.22-.15.45-.29.7-.14.25-.32.53-.56.83-.23.3-.52.65-.88 1.03l-4.17 4.55V18H22v-1.71h-5.95zM8 7H6v4H2v2h4v4h2v-4h4v-2H8V7z' })
    );

    registerBlockType('advgb/count-up', {
        title: __('Count Up'),
        description: __('Make a block with animate counting numbers.'),
        icon: {
            src: countUpBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined
        },
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
                type: 'string',
                default: '56789'
            },
            countUpNumber2: {
                type: 'string',
                default: '56789'
            },
            countUpNumber3: {
                type: 'string',
                default: '56789'
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
            countUpSymbol2: {
                type: 'string'
            },
            countUpSymbol3: {
                type: 'string'
            },
            countUpSymbolAfter: {
                type: 'boolean',
                default: false
            },
            countUpSymbolAfter2: {
                type: 'boolean',
                default: false
            },
            countUpSymbolAfter3: {
                type: 'boolean',
                default: false
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
            },
            changed: {
                type: 'boolean',
                default: false
            }
        },
        edit: AdvCountUp,
        save: AdvCountUpSave
    });
})(wp.i18n, wp.blocks, wp.element, wp.editor, wp.components);

/***/ }),

/***/ "./assets/blocks/custom-columns/columns.jsx":
/*!**************************************************!*\
  !*** ./assets/blocks/custom-columns/columns.jsx ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

(function (wpI18n, wpHooks, wpElement, wpEditor, wpComponents) {
    var addFilter = wpHooks.addFilter;
    var __ = wpI18n.__;
    var Fragment = wpElement.Fragment;
    var InspectorControls = wpEditor.InspectorControls;
    var PanelBody = wpComponents.PanelBody,
        Button = wpComponents.Button;

    // Register extra attributes

    addFilter('blocks.registerBlockType', 'advgb/registerExtraColumnsAttrs', function (settings) {
        if (settings.name === 'core/text-columns' || settings.name === 'core/columns') {
            settings.attributes = _extends(settings.attributes, {
                colMargin: {
                    type: 'number'
                },
                colPadding: {
                    type: 'number'
                },
                blockID: {
                    type: 'string'
                }
            });
        }

        return settings;
    });

    // Add options to edit in backend
    addFilter('editor.BlockEdit', 'advgb/editColumnsAttrs', function (BlockEdit) {
        return function (props) {
            if (props.name === "core/text-columns" || props.name === "core/columns") {
                var attributes = props.attributes,
                    clientId = props.clientId;
                var colMargin = attributes.colMargin,
                    colPadding = attributes.colPadding;


                return React.createElement(
                    Fragment,
                    null,
                    React.createElement(BlockEdit, props),
                    React.createElement(
                        InspectorControls,
                        null,
                        React.createElement(
                            PanelBody,
                            { title: __('Custom styles') },
                            React.createElement(
                                Button,
                                { isPrimary: true,
                                    onClick: function onClick() {
                                        return props.setAttributes({
                                            colMargin: undefined,
                                            colPadding: undefined,
                                            blockID: undefined
                                        });
                                    } },
                                __('Clear custom styles')
                            ),
                            React.createElement(
                                'p',
                                { style: { fontStyle: 'italic', marginTop: 10 } },
                                __('We recommend to clear all custom styles as soon as possible to avoid block error validation,' + ' because we will remove this feature in very next version.')
                            )
                        )
                    ),
                    props.name === 'core/columns' && (!!colMargin || !!colPadding) && React.createElement(
                        'style',
                        { key: 'custom-columns-styles' },
                        '#block-' + clientId + ' .wp-block-columns .editor-block-list__block:not(:first-child) {margin-left: ' + colMargin + 'px;}',
                        '#block-' + clientId + ' .wp-block-columns .editor-block-list__block-edit {padding: ' + colPadding + 'px;}'
                    )
                );
            }

            return React.createElement(BlockEdit, props);
        };
    });

    // Save options to show in frontend
    addFilter('blocks.getSaveContent.extraProps', 'advgb/saveColumnsAttrs', function (extraProps, blockType, attributes) {
        var colMargin = attributes.colMargin,
            colPadding = attributes.colPadding,
            blockID = attributes.blockID;


        if (blockType.name === 'core/text-columns' || blockType.name === 'core/columns') {
            extraProps = _extends(extraProps, {
                id: colMargin || colPadding || blockID ? blockID : extraProps.id
            });
        }

        return extraProps;
    });

    // Save option to show in frontend
    addFilter('blocks.getSaveElement', 'advgb/saveTextColumnsElm', function (SaveElm, blockType, attributes) {
        if (blockType.name === 'core/text-columns' || blockType.name === 'core/columns') {
            var colMargin = attributes.colMargin,
                colPadding = attributes.colPadding,
                blockID = attributes.blockID;


            return React.createElement(
                Fragment,
                null,
                SaveElm,
                blockID && (!!colMargin || !!colPadding) && React.createElement(
                    'style',
                    null,
                    '#' + blockID + ' .wp-block-column:not(:first-child) {\n                        margin-left: ' + colMargin + 'px;\n                    }\n                    #' + blockID + ' .wp-block-column {\n                        padding: ' + colPadding + 'px;\n                    }'
                )
            );
        }

        return SaveElm;
    });
})(wp.i18n, wp.hooks, wp.element, wp.editor, wp.components);

/***/ }),

/***/ "./assets/blocks/custom-separator/separator.jsx":
/*!******************************************************!*\
  !*** ./assets/blocks/custom-separator/separator.jsx ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

(function (wpI18n, wpHooks, wpEditor, wpComponents) {
    var addFilter = wpHooks.addFilter;
    var __ = wpI18n.__;
    var InspectorControls = wpEditor.InspectorControls;
    var PanelBody = wpComponents.PanelBody,
        Button = wpComponents.Button;

    // Register extra attributes to separator blocks

    addFilter('blocks.registerBlockType', 'advgb/registerExtraSeparatorAttrs', function (settings) {
        if (settings.name === 'core/separator') {
            settings.attributes = _extends(settings.attributes, {
                borderColor: {
                    type: 'string'
                },
                borderSize: {
                    type: 'number'
                },
                borderStyle: {
                    type: 'string'
                },
                borderWidth: {
                    type: 'number'
                }
            });
        }

        return settings;
    });

    // Add option to select styles for separator
    addFilter('editor.BlockEdit', 'advgb/customSeparatorStyles', function (BlockEdit) {
        return function (props) {
            if (props.name === "core/separator") {
                var attributes = props.attributes,
                    clientId = props.clientId;
                var borderColor = attributes.borderColor,
                    borderSize = attributes.borderSize,
                    borderStyle = attributes.borderStyle,
                    borderWidth = attributes.borderWidth;


                return [React.createElement(BlockEdit, _extends({ key: 'block-edit-custom-separator' }, props)), React.createElement(
                    InspectorControls,
                    { key: 'inspector-custom' },
                    React.createElement(
                        PanelBody,
                        { title: __('Custom styles') },
                        React.createElement(
                            Button,
                            { isPrimary: true,
                                onClick: function onClick() {
                                    return props.setAttributes({
                                        borderColor: undefined,
                                        borderSize: undefined,
                                        borderStyle: undefined,
                                        borderWidth: undefined
                                    });
                                } },
                            __('Clear custom styles')
                        ),
                        React.createElement(
                            'p',
                            { style: { fontStyle: 'italic', marginTop: 10 } },
                            __('We recommend to clear all custom styles as soon as possible to avoid block error validation,' + ' because we will remove this feature in very next version.')
                        )
                    )
                ), React.createElement(
                    'style',
                    { key: 'custom-separator-styles' },
                    '#block-' + clientId + ' hr {\n                        border-bottom-color: ' + borderColor + ';\n                        border-bottom-style: ' + borderStyle + ';\n                        border-bottom-width: ' + borderWidth + 'px;\n                        max-width: ' + borderSize + 'px;\n                    }'
                )];
            }

            return React.createElement(BlockEdit, props);
        };
    });

    // Apply custom styles on front-end
    addFilter('blocks.getSaveContent.extraProps', 'advgb/saveSeparatorStyles', function (extraProps, blockType, attributes) {
        if (blockType.name === 'core/separator') {
            var borderColor = attributes.borderColor,
                borderSize = attributes.borderSize,
                borderStyle = attributes.borderStyle,
                borderWidth = attributes.borderWidth;


            extraProps = _extends(extraProps, {
                style: {
                    borderBottomColor: borderColor,
                    borderBottomWidth: borderWidth ? borderWidth + 'px' : undefined,
                    borderBottomStyle: borderStyle,
                    maxWidth: borderSize ? borderSize + 'px' : undefined
                }
            });
        }

        return extraProps;
    });
})(wp.i18n, wp.hooks, wp.editor, wp.components);

/***/ }),

/***/ "./assets/blocks/customstyles/custom-styles.jsx":
/*!******************************************************!*\
  !*** ./assets/blocks/customstyles/custom-styles.jsx ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

(function (wpI18n, wpHooks, wpBlocks, wpEditor, wpComponents) {
    var addFilter = wpHooks.addFilter;
    var __ = wpI18n.__;
    var hasBlockSupport = wpBlocks.hasBlockSupport;
    var InspectorControls = wpEditor.InspectorControls;
    var SelectControl = wpComponents.SelectControl;

    // Register custom styles to blocks attributes

    addFilter('blocks.registerBlockType', 'advgb/registerCustomStyleClass', function (settings) {
        if (settings.name === 'core/paragraph') {
            settings.attributes = _extends(settings.attributes, {
                customStyle: {
                    type: 'string'
                },
                identifyColor: {
                    type: 'string'
                }
            });
        }

        return settings;
    });

    // Add option to return to default style
    if (typeof advGb_CS !== 'undefined' && advGb_CS) {
        advGb_CS.unshift({
            id: 0,
            label: __('Paragraph'),
            value: '',
            identifyColor: ''
        });
    }

    // Add option to select custom styles for paragraph blocks
    addFilter('editor.BlockEdit', 'advgb/customStyles', function (BlockEdit) {
        return function (props) {
            return [React.createElement(BlockEdit, _extends({ key: 'block-edit-custom-class-name' }, props)), props.isSelected && props.name === "core/paragraph" && React.createElement(
                InspectorControls,
                { key: 'advgb-custom-controls' },
                React.createElement(SelectControl, {
                    label: [__('Custom styles'), React.createElement('span', { className: 'components-panel__color-area',
                        key: 'customstyle-identify',
                        style: {
                            background: props.attributes.identifyColor,
                            verticalAlign: 'text-bottom',
                            borderRadius: '50%',
                            border: 'none',
                            width: '16px',
                            height: '16px',
                            display: 'inline-block',
                            marginLeft: '10px'
                        } })],
                    help: __('This option let you add custom style for current paragraph. (Front-end only!)'),
                    value: props.attributes.customStyle,
                    options: advGb_CS.map(function (cstyle, index) {
                        if (cstyle.title) advGb_CS[index].label = cstyle.title;
                        if (cstyle.name) advGb_CS[index].value = cstyle.name;

                        return cstyle;
                    }),
                    onChange: function onChange(cstyle) {
                        var identifyColor = advGb_CS.filter(function (style) {
                            return style.value === cstyle;
                        })[0].identifyColor;

                        props.setAttributes({
                            customStyle: cstyle,
                            identifyColor: identifyColor,
                            backgroundColor: undefined,
                            textColor: undefined,
                            fontSize: undefined
                        });
                    }
                })
            )];
        };
    });

    // Apply custom styles on front-end
    addFilter('blocks.getSaveContent.extraProps', 'advgb/loadFrontendCustomStyles', function (extraProps, blockType, attributes) {
        if (hasBlockSupport(blockType, 'customStyle', true) && attributes.customStyle) {
            if (typeof extraProps.className === 'undefined') {
                extraProps.className = attributes.customStyle;
            } else {
                extraProps.className += ' ' + attributes.customStyle;
                extraProps.className = extraProps.className.trim();
            }
        }

        return extraProps;
    });
})(wp.i18n, wp.hooks, wp.blocks, wp.editor, wp.components);

/***/ }),

/***/ "./assets/blocks/images-slider/block.jsx":
/*!***********************************************!*\
  !*** ./assets/blocks/images-slider/block.jsx ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
        PanelColorSettings = wpEditor.PanelColorSettings,
        MediaUpload = wpEditor.MediaUpload;
    var PanelBody = wpComponents.PanelBody,
        RangeControl = wpComponents.RangeControl,
        ToggleControl = wpComponents.ToggleControl,
        SelectControl = wpComponents.SelectControl,
        TextControl = wpComponents.TextControl,
        TextareaControl = wpComponents.TextareaControl,
        IconButton = wpComponents.IconButton,
        Button = wpComponents.Button,
        Placeholder = wpComponents.Placeholder,
        Tooltip = wpComponents.Tooltip;

    var $ = jQuery;
    var oldIndex = void 0,
        newIndex = void 0;

    var imageSliderBlockIcon = React.createElement(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "2 2 22 22", className: "dashicon" },
        React.createElement("path", { fill: "none", d: "M0 0h24v24H0V0z" }),
        React.createElement("path", { d: "M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM9.88 4h4.24l1.83 2H20v12H4V6h4.05" }),
        React.createElement("path", { d: "M15 11H9V8.5L5.5 12 9 15.5V13h6v2.5l3.5-3.5L15 8.5z" })
    );

    var AdvImageSlider = function (_Component) {
        _inherits(AdvImageSlider, _Component);

        function AdvImageSlider() {
            _classCallCheck(this, AdvImageSlider);

            var _this = _possibleConstructorReturn(this, (AdvImageSlider.__proto__ || Object.getPrototypeOf(AdvImageSlider)).apply(this, arguments));

            _this.state = {
                currentSelected: 0,
                inited: false
            };

            _this.initSlider = _this.initSlider.bind(_this);
            _this.initItemSortable = _this.initItemSortable.bind(_this);
            return _this;
        }

        _createClass(AdvImageSlider, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                var attributes = this.props.attributes;


                if (attributes.images.length) {
                    this.initSlider();
                }
            }
        }, {
            key: "componentWillUpdate",
            value: function componentWillUpdate(nextProps) {
                var _props = this.props,
                    clientId = _props.clientId,
                    attributes = _props.attributes;
                var images = attributes.images;
                var nextImages = nextProps.attributes.images;


                if (images.length !== nextImages.length) {
                    $("#block-" + clientId + " .advgb-images-slider.slick-initialized").slick('unslick');
                    $("#block-" + clientId + " .advgb-image-slider-item").removeAttr('tabindex').removeAttr('role').removeAttr('aria-describedby');
                }
            }
        }, {
            key: "componentDidUpdate",
            value: function componentDidUpdate(prevProps) {
                var _props2 = this.props,
                    attributes = _props2.attributes,
                    isSelected = _props2.isSelected;
                var images = attributes.images;
                var prevImages = prevProps.attributes.images;


                if (images.length !== prevImages.length && images.length) {
                    this.initSlider();
                }

                if (!this.state.inited && isSelected) {
                    this.initItemSortable();
                    this.setState({ inited: true });
                }

                if (!isSelected && this.state.inited) {
                    this.setState({ inited: false });
                }
            }
        }, {
            key: "initSlider",
            value: function initSlider() {
                var _this2 = this;

                var clientId = this.props.clientId;


                $("#block-" + clientId + " .advgb-images-slider:not(.slick-initialized)").slick({
                    dots: true,
                    adaptiveHeight: true
                });

                $("#block-" + clientId + " .advgb-images-slider").on('afterChange', function (e, s, currentSlide) {
                    if (_this2.state.currentSelected !== currentSlide) {
                        _this2.setState({ currentSelected: currentSlide });
                    }
                });
            }
        }, {
            key: "initItemSortable",
            value: function initItemSortable() {
                var _this3 = this;

                var _props3 = this.props,
                    clientId = _props3.clientId,
                    setAttributes = _props3.setAttributes,
                    attributes = _props3.attributes;
                var images = attributes.images;


                $("#block-" + clientId + " .advgb-image-slider-image-list:not(.ui-sortable)").sortable({
                    items: "> .advgb-image-slider-image-list-item",
                    placeholder: 'advgb-slider-image-dragholder',
                    start: function start(e, ui) {
                        oldIndex = ui.item.index();
                    },
                    update: function update(e, ui) {
                        newIndex = ui.item.index();
                        var image = images[oldIndex];

                        $("#block-" + clientId + " .advgb-image-slider-image-list.ui-sortable").sortable('cancel').sortable('destroy');
                        setAttributes({
                            images: [].concat(_toConsumableArray(images.filter(function (img, idx) {
                                return idx !== oldIndex;
                            }).slice(0, newIndex)), [image], _toConsumableArray(images.filter(function (img, idx) {
                                return idx !== oldIndex;
                            }).slice(newIndex)))
                        });
                        _this3.initItemSortable();
                        $("#block-" + clientId + " .advgb-images-slider.slick-initialized").slick('setPosition');
                    }
                });
            }
        }, {
            key: "updateImagesData",
            value: function updateImagesData(data) {
                var currentSelected = this.state.currentSelected;

                if (typeof currentSelected !== 'number') {
                    return null;
                }

                var _props4 = this.props,
                    attributes = _props4.attributes,
                    setAttributes = _props4.setAttributes;
                var images = attributes.images;


                var newImages = images.map(function (image, index) {
                    if (index === currentSelected) {
                        image = _extends({}, image, data);
                    }

                    return image;
                });

                setAttributes({ images: newImages });
            }
        }, {
            key: "render",
            value: function render() {
                var _this4 = this;

                var _props5 = this.props,
                    attributes = _props5.attributes,
                    setAttributes = _props5.setAttributes,
                    isSelected = _props5.isSelected,
                    clientId = _props5.clientId;
                var currentSelected = this.state.currentSelected;
                var images = attributes.images,
                    actionOnClick = attributes.actionOnClick,
                    fullWidth = attributes.fullWidth,
                    autoHeight = attributes.autoHeight,
                    width = attributes.width,
                    height = attributes.height,
                    alwaysShowOverlay = attributes.alwaysShowOverlay,
                    hoverColor = attributes.hoverColor,
                    titleColor = attributes.titleColor,
                    textColor = attributes.textColor,
                    hAlign = attributes.hAlign,
                    vAlign = attributes.vAlign;


                if (images.length === 0) {
                    return React.createElement(
                        Placeholder,
                        {
                            icon: imageSliderBlockIcon,
                            label: __('Image Slider Block'),
                            instructions: __('No images selected. Adding images to start using this block.')
                        },
                        React.createElement(MediaUpload, {
                            allowedTypes: ['image'],
                            value: null,
                            multiple: true,
                            onSelect: function onSelect(image) {
                                var imgInsert = image.map(function (img) {
                                    return {
                                        url: img.url,
                                        id: img.id
                                    };
                                });

                                setAttributes({
                                    images: [].concat(_toConsumableArray(images), _toConsumableArray(imgInsert))
                                });
                            },
                            render: function render(_ref) {
                                var open = _ref.open;
                                return React.createElement(
                                    Button,
                                    { className: "button button-large button-primary", onClick: open },
                                    __('Add images')
                                );
                            }
                        })
                    );
                }

                return React.createElement(
                    Fragment,
                    null,
                    React.createElement(
                        InspectorControls,
                        null,
                        React.createElement(
                            PanelBody,
                            { title: __('Image Settings') },
                            React.createElement(SelectControl, {
                                label: __('Action on click'),
                                value: actionOnClick,
                                options: [{ label: __('None'), value: '' }, { label: __('Open image in lightbox'), value: 'lightbox' }, { label: __('Open custom link'), value: 'link' }],
                                onChange: function onChange(value) {
                                    return setAttributes({ actionOnClick: value });
                                }
                            }),
                            React.createElement(ToggleControl, {
                                label: __('Full width'),
                                checked: fullWidth,
                                onChange: function onChange() {
                                    return setAttributes({ fullWidth: !fullWidth });
                                }
                            }),
                            React.createElement(ToggleControl, {
                                label: __('Auto height'),
                                checked: autoHeight,
                                onChange: function onChange() {
                                    return setAttributes({ autoHeight: !autoHeight });
                                }
                            }),
                            !fullWidth && React.createElement(RangeControl, {
                                label: __('Width'),
                                value: width,
                                onChange: function onChange(value) {
                                    return setAttributes({ width: value });
                                },
                                min: 200,
                                max: 1300
                            }),
                            !autoHeight && React.createElement(RangeControl, {
                                label: __('Height'),
                                value: height,
                                onChange: function onChange(value) {
                                    return setAttributes({ height: value });
                                },
                                min: 100,
                                max: 1000
                            }),
                            React.createElement(ToggleControl, {
                                label: __('Always show overlay'),
                                checked: alwaysShowOverlay,
                                onChange: function onChange() {
                                    return setAttributes({ alwaysShowOverlay: !alwaysShowOverlay });
                                }
                            })
                        ),
                        React.createElement(PanelColorSettings, {
                            title: __('Color Settings'),
                            colorSettings: [{
                                label: __('Hover Color'),
                                value: hoverColor,
                                onChange: function onChange(value) {
                                    return setAttributes({ hoverColor: value });
                                }
                            }, {
                                label: __('Title Color'),
                                value: titleColor,
                                onChange: function onChange(value) {
                                    return setAttributes({ titleColor: value });
                                }
                            }, {
                                label: __('Text Color'),
                                value: textColor,
                                onChange: function onChange(value) {
                                    return setAttributes({ textColor: value });
                                }
                            }]
                        }),
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
                    ),
                    React.createElement(
                        "div",
                        { className: "advgb-images-slider-block" },
                        React.createElement(
                            "div",
                            { className: "advgb-images-slider" },
                            images.map(function (image, index) {
                                return React.createElement(
                                    "div",
                                    { className: "advgb-image-slider-item", key: index },
                                    React.createElement("img", { src: image.url,
                                        className: "advgb-image-slider-img",
                                        alt: __('Slider image'),
                                        style: {
                                            width: fullWidth ? '100%' : width,
                                            height: autoHeight ? 'auto' : height
                                        }
                                    }),
                                    React.createElement(
                                        "div",
                                        { className: "advgb-image-slider-item-info",
                                            style: {
                                                justifyContent: vAlign,
                                                alignItems: hAlign
                                            }
                                        },
                                        React.createElement("span", { className: "advgb-image-slider-overlay",
                                            style: {
                                                backgroundColor: hoverColor,
                                                opacity: alwaysShowOverlay ? 0.5 : undefined
                                            }
                                        }),
                                        React.createElement(
                                            "h4",
                                            { className: "advgb-image-slider-title",
                                                style: { color: titleColor }
                                            },
                                            image.title
                                        ),
                                        React.createElement(
                                            "p",
                                            { className: "advgb-image-slider-text",
                                                style: { color: textColor }
                                            },
                                            image.text
                                        )
                                    )
                                );
                            })
                        ),
                        isSelected && React.createElement(
                            "div",
                            { className: "advgb-image-slider-controls" },
                            React.createElement(
                                "div",
                                { className: "advgb-image-slider-control" },
                                React.createElement(TextControl, {
                                    label: __('Title'),
                                    value: images[currentSelected] ? images[currentSelected].title || '' : '',
                                    onChange: function onChange(value) {
                                        return _this4.updateImagesData({ title: value || '' });
                                    }
                                })
                            ),
                            React.createElement(
                                "div",
                                { className: "advgb-image-slider-control" },
                                React.createElement(TextareaControl, {
                                    label: __('Text'),
                                    value: images[currentSelected] ? images[currentSelected].text || '' : '',
                                    onChange: function onChange(value) {
                                        return _this4.updateImagesData({ text: value || '' });
                                    }
                                })
                            ),
                            actionOnClick === 'link' && React.createElement(
                                "div",
                                { className: "advgb-image-slider-control" },
                                React.createElement(TextControl, {
                                    label: __('Link'),
                                    value: images[currentSelected] ? images[currentSelected].link || '' : '',
                                    onChange: function onChange(value) {
                                        return _this4.updateImagesData({ link: value || '' });
                                    }
                                })
                            ),
                            React.createElement(
                                "div",
                                { className: "advgb-image-slider-image-list" },
                                images.map(function (image, index) {
                                    return React.createElement(
                                        "div",
                                        { className: "advgb-image-slider-image-list-item", key: index },
                                        React.createElement("img", { src: image.url,
                                            className: "advgb-image-slider-image-list-img",
                                            onClick: function onClick() {
                                                $("#block-" + clientId + " .advgb-images-slider").slick('slickGoTo', index, false);
                                                _this4.setState({ currentSelected: index });
                                            }
                                        }),
                                        React.createElement(
                                            Tooltip,
                                            { text: __('Remove image') },
                                            React.createElement(IconButton, {
                                                className: "advgb-image-slider-image-list-item-remove",
                                                icon: "no",
                                                onClick: function onClick() {
                                                    if (index === currentSelected) _this4.setState({ currentSelected: null });
                                                    setAttributes({ images: images.filter(function (img, idx) {
                                                            return idx !== index;
                                                        }) });
                                                }
                                            })
                                        )
                                    );
                                }),
                                React.createElement(
                                    "div",
                                    { className: "advgb-image-slider-add-item" },
                                    React.createElement(MediaUpload, {
                                        allowedTypes: ['image'],
                                        value: currentSelected,
                                        onSelect: function onSelect(image) {
                                            return setAttributes({
                                                images: [].concat(_toConsumableArray(images), [{ id: image.id, url: image.url }])
                                            });
                                        },
                                        render: function render(_ref2) {
                                            var open = _ref2.open;
                                            return React.createElement(IconButton, {
                                                label: __('Add image'),
                                                icon: "plus",
                                                onClick: open
                                            });
                                        }
                                    })
                                )
                            )
                        )
                    )
                );
            }
        }]);

        return AdvImageSlider;
    }(Component);

    registerBlockType('advgb/images-slider', {
        title: __('Images Slider'),
        description: __('Display your images in a slider.'),
        icon: {
            src: imageSliderBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined
        },
        category: 'formatting',
        keywords: [__('slide'), __('gallery'), __('photos')],
        attributes: {
            images: {
                type: 'array',
                default: [] // [ { id: int, url, title, text, link: string } ]
            },
            actionOnClick: {
                type: 'string'
            },
            fullWidth: {
                type: 'boolean',
                default: true
            },
            autoHeight: {
                type: 'boolean',
                default: true
            },
            width: {
                type: 'number',
                default: 700
            },
            height: {
                type: 'number',
                default: 500
            },
            alwaysShowOverlay: {
                type: 'boolean',
                default: false
            },
            hoverColor: {
                type: 'string'
            },
            titleColor: {
                type: 'string'
            },
            textColor: {
                type: 'string'
            },
            vAlign: {
                type: 'string',
                default: 'center'
            },
            hAlign: {
                type: 'string',
                default: 'center'
            },
            changed: {
                type: 'boolean',
                default: false
            }
        },
        edit: AdvImageSlider,
        save: function save(_ref3) {
            var attributes = _ref3.attributes;
            var images = attributes.images,
                actionOnClick = attributes.actionOnClick,
                fullWidth = attributes.fullWidth,
                autoHeight = attributes.autoHeight,
                width = attributes.width,
                height = attributes.height,
                alwaysShowOverlay = attributes.alwaysShowOverlay,
                hoverColor = attributes.hoverColor,
                titleColor = attributes.titleColor,
                textColor = attributes.textColor,
                hAlign = attributes.hAlign,
                vAlign = attributes.vAlign;

            var blockClassName = ['advgb-images-slider-block', actionOnClick === 'lightbox' && 'advgb-images-slider-lightbox'].filter(Boolean).join(' ');

            return React.createElement(
                "div",
                { className: blockClassName },
                React.createElement(
                    "div",
                    { className: "advgb-images-slider" },
                    images.map(function (image, index) {
                        return React.createElement(
                            "div",
                            { className: "advgb-image-slider-item", key: index },
                            React.createElement("img", { src: image.url,
                                className: "advgb-image-slider-img",
                                alt: __('Slider image'),
                                style: {
                                    width: fullWidth ? '100%' : width,
                                    height: autoHeight ? 'auto' : height
                                }
                            }),
                            React.createElement(
                                "div",
                                { className: "advgb-image-slider-item-info",
                                    style: {
                                        justifyContent: vAlign,
                                        alignItems: hAlign
                                    }
                                },
                                React.createElement("a", { className: "advgb-image-slider-overlay",
                                    target: "_blank",
                                    href: actionOnClick === 'link' && !!image.link ? image.link : undefined,
                                    style: {
                                        backgroundColor: hoverColor,
                                        opacity: alwaysShowOverlay ? 0.5 : undefined
                                    }
                                }),
                                React.createElement(
                                    "h4",
                                    { className: "advgb-image-slider-title",
                                        style: { color: titleColor }
                                    },
                                    image.title
                                ),
                                React.createElement(
                                    "p",
                                    { className: "advgb-image-slider-text",
                                        style: { color: textColor }
                                    },
                                    image.text
                                )
                            )
                        );
                    })
                )
            );
        }
    });
})(wp.i18n, wp.blocks, wp.element, wp.editor, wp.components);

/***/ }),

/***/ "./assets/blocks/map/block.jsx":
/*!*************************************!*\
  !*** ./assets/blocks/map/block.jsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
        MediaUpload = wpEditor.MediaUpload;
    var PanelBody = wpComponents.PanelBody,
        TextControl = wpComponents.TextControl,
        TextareaControl = wpComponents.TextareaControl,
        RangeControl = wpComponents.RangeControl,
        BaseControl = wpComponents.BaseControl,
        Button = wpComponents.Button,
        Placeholder = wpComponents.Placeholder,
        Spinner = wpComponents.Spinner;


    var mapBlockIcon = React.createElement(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "2 2 22 22", className: "dashicon" },
        React.createElement("path", { d: "M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" }),
        React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" })
    );

    var mapWillUpdate = null;

    var AdvMap = function (_Component) {
        _inherits(AdvMap, _Component);

        function AdvMap() {
            _classCallCheck(this, AdvMap);

            var _this = _possibleConstructorReturn(this, (AdvMap.__proto__ || Object.getPrototypeOf(AdvMap)).apply(this, arguments));

            _this.state = {
                currentAddress: '',
                currentMap: null,
                currentMarker: null,
                currentInfo: null,
                fetching: false
            };

            _this.initMap = _this.initMap.bind(_this);
            _this.fetchLocation = _this.fetchLocation.bind(_this);
            return _this;
        }

        _createClass(AdvMap, [{
            key: "componentWillMount",
            value: function componentWillMount() {
                var _props = this.props,
                    attributes = _props.attributes,
                    setAttributes = _props.setAttributes;

                var currentBlockConfig = advgbDefaultConfig['advgb-map'];

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
                var _props2 = this.props,
                    attributes = _props2.attributes,
                    setAttributes = _props2.setAttributes,
                    clientId = _props2.clientId;


                if (!attributes.mapID) {
                    setAttributes({ mapID: 'advgbmap-' + clientId });
                }

                this.initMap();
            }
        }, {
            key: "componentDidUpdate",
            value: function componentDidUpdate(prevProps, prevState) {
                var _prevProps$attributes = prevProps.attributes,
                    prevAddr = _prevProps$attributes.address,
                    prevUseLatLng = _prevProps$attributes.useLatLng;
                var _props$attributes = this.props.attributes,
                    address = _props$attributes.address,
                    useLatLng = _props$attributes.useLatLng;


                if (prevAddr !== address || prevUseLatLng !== useLatLng || prevState !== this.state) return null;

                if (prevProps.attributes !== this.props.attributes) {
                    clearTimeout(mapWillUpdate);
                    mapWillUpdate = setTimeout(this.initMap, 1000);
                }
            }
        }, {
            key: "initMap",
            value: function initMap() {
                if (typeof google === "undefined" || !this.props.attributes.mapID) return null;

                var DEFAULT_MARKER = 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png';
                var _state = this.state,
                    currentMap = _state.currentMap,
                    currentMarker = _state.currentMarker,
                    currentInfo = _state.currentInfo;
                var _props$attributes2 = this.props.attributes,
                    mapID = _props$attributes2.mapID,
                    lat = _props$attributes2.lat,
                    lng = _props$attributes2.lng,
                    zoom = _props$attributes2.zoom,
                    markerTitle = _props$attributes2.markerTitle,
                    markerIcon = _props$attributes2.markerIcon,
                    markerDesc = _props$attributes2.markerDesc;

                var location = { lat: parseFloat(lat), lng: parseFloat(lng) };
                var that = this;
                var formattedDesc = markerDesc.replace(/\n/g, '<br/>');
                var map = currentMap;
                var marker = currentMarker;
                var infoWindow = currentInfo;

                if (!map) {
                    map = new google.maps.Map(document.getElementById(mapID), {
                        zoom: zoom,
                        center: location,
                        gestureHandling: 'cooperative'
                    });
                    this.setState({ currentMap: map });
                }

                map.setCenter(location);
                map.setZoom(zoom);

                if (!infoWindow) {
                    infoWindow = new google.maps.InfoWindow({
                        content: "<div class=\"advgbmap-wrapper\">\n                    <h2 class=\"advgbmap-title\">" + markerTitle + "</h2>\n                    <p class=\"advgbmap-desc\">" + (formattedDesc || '') + "</p>\n                </div>",
                        maxWidth: 500
                    });
                    this.setState({ currentInfo: infoWindow });
                }

                infoWindow.setContent("<div class=\"advgbmap-wrapper\">\n                <h2 class=\"advgbmap-title\">" + markerTitle + "</h2>\n                <p class=\"advgbmap-desc\">" + (formattedDesc || '') + "</p>\n            </div>");

                if (!marker) {
                    marker = new google.maps.Marker({
                        position: location,
                        map: map,
                        title: markerTitle,
                        draggable: true,
                        animation: google.maps.Animation.DROP,
                        icon: {
                            url: markerIcon || DEFAULT_MARKER,
                            scaledSize: new google.maps.Size(27, 43)
                        }
                    });
                    this.setState({ currentMarker: marker });
                }

                marker.setPosition(location);
                marker.setTitle(markerTitle);
                marker.setIcon({
                    url: markerIcon || DEFAULT_MARKER,
                    scaledSize: new google.maps.Size(27, 43)
                });

                if (!!markerTitle) {
                    marker.addListener('click', function () {
                        infoWindow.open(map, marker);
                    });
                }

                marker.addListener('dragend', function () {
                    var newLocation = marker.getPosition();
                    var newLat = newLocation.lat();
                    var newLng = newLocation.lng();

                    that.props.setAttributes({ lat: newLat, lng: newLng });
                });
            }
        }, {
            key: "fetchLocation",
            value: function fetchLocation() {
                if (typeof google === "undefined") return null;

                var _props3 = this.props,
                    attributes = _props3.attributes,
                    setAttributes = _props3.setAttributes;
                var address = attributes.address;

                var geoCoder = new google.maps.Geocoder();
                var _google$maps$Geocoder = google.maps.GeocoderStatus,
                    OK = _google$maps$Geocoder.OK,
                    ZERO_RESULTS = _google$maps$Geocoder.ZERO_RESULTS;

                var that = this;

                if (geoCoder) {
                    that.setState({ fetching: true });
                    geoCoder.geocode({ address: address }, function (res, stt) {
                        if (stt === OK) {
                            var location = res[0].geometry.location;


                            setAttributes({
                                lat: location.lat().toString(),
                                lng: location.lng().toString(),
                                currentAddress: res[0].formatted_address
                            });
                        } else if (stt === ZERO_RESULTS) {
                            setAttributes({ currentAddress: __('No matching address found!') });
                        } else {
                            setAttributes({ currentAddress: stt });
                        }

                        that.setState({ fetching: false });
                    });
                }
            }
        }, {
            key: "render",
            value: function render() {
                var fetching = this.state.fetching;
                var _props4 = this.props,
                    attributes = _props4.attributes,
                    setAttributes = _props4.setAttributes;
                var mapID = attributes.mapID,
                    useLatLng = attributes.useLatLng,
                    address = attributes.address,
                    currentAddress = attributes.currentAddress,
                    lat = attributes.lat,
                    lng = attributes.lng,
                    zoom = attributes.zoom,
                    height = attributes.height,
                    markerIcon = attributes.markerIcon,
                    markerIconID = attributes.markerIconID,
                    markerTitle = attributes.markerTitle,
                    markerDesc = attributes.markerDesc;


                return React.createElement(
                    Fragment,
                    null,
                    typeof google !== 'undefined' && React.createElement(
                        InspectorControls,
                        null,
                        React.createElement(
                            PanelBody,
                            { title: __('Map settings') },
                            !useLatLng && React.createElement(
                                Fragment,
                                null,
                                React.createElement(TextControl, {
                                    label: [__('Address'), React.createElement(
                                        "a",
                                        { key: "switch-type",
                                            style: { marginLeft: '10px' },
                                            onClick: function onClick() {
                                                return setAttributes({ useLatLng: !useLatLng });
                                            }
                                        },
                                        __('Use Lat/Lng')
                                    )],
                                    value: address,
                                    placeholder: __('Enter address…'),
                                    onChange: function onChange(value) {
                                        return setAttributes({ address: value });
                                    }
                                }),
                                React.createElement(
                                    "div",
                                    null,
                                    React.createElement(
                                        Button,
                                        { className: "button button-large", onClick: this.fetchLocation },
                                        __('Fetch Location')
                                    ),
                                    fetching && React.createElement(Spinner, null),
                                    React.createElement(
                                        "div",
                                        { style: { margin: '10px auto' } },
                                        React.createElement(
                                            "strong",
                                            { style: { marginRight: '5px' } },
                                            __('Current'),
                                            ":"
                                        ),
                                        React.createElement(
                                            "span",
                                            null,
                                            currentAddress
                                        )
                                    )
                                )
                            ),
                            !!useLatLng && React.createElement(
                                Fragment,
                                null,
                                React.createElement(TextControl, {
                                    label: [__('Location'), React.createElement(
                                        "a",
                                        { key: "switch-type",
                                            style: { marginLeft: '10px' },
                                            onClick: function onClick() {
                                                return setAttributes({ useLatLng: !useLatLng });
                                            }
                                        },
                                        __('Use Address')
                                    )],
                                    value: lat,
                                    placeholder: __('Enter latitude…'),
                                    title: __('Latitude'),
                                    onChange: function onChange(value) {
                                        return setAttributes({ lat: value });
                                    }
                                }),
                                React.createElement(TextControl, {
                                    value: lng,
                                    placeholder: __('Enter longitude…'),
                                    title: __('Longitude'),
                                    onChange: function onChange(value) {
                                        return setAttributes({ lng: value });
                                    }
                                })
                            ),
                            React.createElement(RangeControl, {
                                label: __('Zoom level'),
                                value: zoom,
                                min: 0,
                                max: 25,
                                onChange: function onChange(value) {
                                    return setAttributes({ zoom: value });
                                }
                            }),
                            React.createElement(RangeControl, {
                                label: __('Height'),
                                value: height,
                                min: 300,
                                max: 1000,
                                onChange: function onChange(value) {
                                    return setAttributes({ height: value });
                                }
                            }),
                            React.createElement(MediaUpload, {
                                allowedTypes: ["image"],
                                value: markerIconID,
                                onSelect: function onSelect(image) {
                                    return setAttributes({ markerIcon: image.sizes.thumbnail.url, markerIconID: image.id });
                                },
                                render: function render(_ref) {
                                    var open = _ref.open;

                                    return React.createElement(
                                        BaseControl,
                                        { label: [__('Marker Icon (27x43 px)'), markerIcon && React.createElement(
                                                "a",
                                                { key: "marker-icon-remove",
                                                    style: { marginLeft: '10px', cursor: 'pointer' },
                                                    onClick: function onClick() {
                                                        return setAttributes({
                                                            markerIcon: undefined,
                                                            markerIconID: undefined
                                                        });
                                                    }
                                                },
                                                __('Remove')
                                            )]
                                        },
                                        React.createElement(
                                            Button,
                                            { className: 'button button-large',
                                                onClick: open
                                            },
                                            __('Choose icon')
                                        ),
                                        !!markerIcon && React.createElement("img", { style: { maxHeight: '30px', marginLeft: '10px' },
                                            src: markerIcon,
                                            alt: __('Marker icon') })
                                    );
                                }
                            }),
                            React.createElement(TextControl, {
                                label: __('Marker Title'),
                                value: markerTitle,
                                placeholder: __('Enter custom title…'),
                                onChange: function onChange(value) {
                                    return setAttributes({ markerTitle: value });
                                }
                            }),
                            React.createElement(TextareaControl, {
                                label: __('Marker description'),
                                value: markerDesc,
                                placeholder: __('Enter custom description…'),
                                onChange: function onChange(value) {
                                    return setAttributes({ markerDesc: value });
                                }
                            })
                        )
                    ),
                    typeof google !== 'undefined' ? React.createElement(
                        "div",
                        { className: 'advgb-map-block' },
                        React.createElement("div", { className: 'advgb-map-content', id: mapID, style: { height: height } })
                    ) : React.createElement(
                        Placeholder,
                        {
                            icon: mapBlockIcon,
                            label: __('No API Key Provided!'),
                            instructions: __('Opps! Look like you have not configured your Google API Key yet. ' + 'Add an API Key and refresh the page to start using Map Block. ' + 'This is a requirement enforced by Google.')
                        },
                        React.createElement(
                            "a",
                            { target: "_blank",
                                className: "button button-large",
                                href: advgbSettings.config_url + '#settings'
                            },
                            __('Add Google API Key')
                        )
                    )
                );
            }
        }]);

        return AdvMap;
    }(Component);

    registerBlockType('advgb/map', {
        title: __('Map'),
        description: __('Block for inserting location map.'),
        icon: {
            src: mapBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined
        },
        category: 'common',
        keywords: [__('google map'), __('location'), __('address')],
        attributes: {
            mapID: {
                type: 'string'
            },
            useLatLng: {
                type: 'boolean',
                default: false
            },
            address: {
                type: 'string',
                default: ''
            },
            currentAddress: {
                type: 'string'
            },
            lat: {
                type: 'string',
                default: '48.858370'
            },
            lng: {
                type: 'string',
                default: '2.294471'
            },
            zoom: {
                type: 'number',
                default: 14
            },
            height: {
                type: 'number',
                default: 350
            },
            markerIcon: {
                type: 'string'
            },
            markerIconID: {
                type: 'number'
            },
            markerTitle: {
                type: 'string',
                default: __('Eiffel Tower')
            },
            markerDesc: {
                type: 'string',
                default: ''
            },
            changed: {
                type: 'boolean',
                default: false
            }
        },
        edit: AdvMap,
        save: function save(_ref2) {
            var attributes = _ref2.attributes;
            var mapID = attributes.mapID,
                lat = attributes.lat,
                lng = attributes.lng,
                zoom = attributes.zoom,
                height = attributes.height,
                markerIcon = attributes.markerIcon,
                markerTitle = attributes.markerTitle,
                markerDesc = attributes.markerDesc;


            var formattedDesc = markerDesc.replace(/\n/g, '<br/>').replace(/'/, '\\\'');
            var formattedTitle = markerTitle.replace(/'/, '\\\'');
            var DEFAULT_MARKER = 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png';
            var infoWindowHtml = "<div class=\"advgbmap-wrapper\"><h2 class=\"advgbmap-title\">" + formattedTitle + "</h2><p class=\"advgbmap-desc\">" + (formattedDesc || '') + "</p></div>";

            return React.createElement(
                "div",
                { className: 'advgb-map-block', style: { margin: '10px auto' } },
                React.createElement("div", { className: 'advgb-map-content', id: mapID, style: { height: height } }),
                React.createElement(
                    "script",
                    { type: "text/javascript" },
                    "window.addEventListener('load', function() {\n                        if (typeof google === \"undefined\") return null;\n                        var location = {\n                            lat: parseFloat(" + lat + "),\n                            lng: parseFloat(" + lng + ")\n                        };\n                        var map = new google.maps.Map(document.getElementById('" + mapID + "'), {\n                            zoom: " + zoom + ",\n                            center: location,\n                            gestureHandling: 'cooperative',\n                        });\n                        var infoWindow = new google.maps.InfoWindow({\n                            content: '" + infoWindowHtml + "'\n                        });\n                        var marker = new google.maps.Marker({\n                            position: location,\n                            map: map,\n                            title: '" + formattedTitle + "',\n                            animation: google.maps.Animation.DROP,\n                            icon: {\n                                url: '" + (markerIcon || DEFAULT_MARKER) + "',\n                                scaledSize: new google.maps.Size(27, 43),\n                            },\n                        });\n                        " + (markerTitle && "marker.addListener('click', function() {\n                            infoWindow.open(map, marker);\n                        });") + "\n                    })"
                )
            );
        }
    });
})(wp.i18n, wp.blocks, wp.element, wp.editor, wp.components);

/***/ }),

/***/ "./assets/blocks/recent-posts/block.jsx":
/*!**********************************************!*\
  !*** ./assets/blocks/recent-posts/block.jsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function (wpI18n, wpBlocks, wpElement, wpEditor, wpComponents, wpData, lodash, wpHtmlEntities, wpDate) {
    var __ = wpI18n.__;
    var Component = wpElement.Component,
        Fragment = wpElement.Fragment;
    var registerBlockType = wpBlocks.registerBlockType;
    var InspectorControls = wpEditor.InspectorControls,
        BlockControls = wpEditor.BlockControls;
    var PanelBody = wpComponents.PanelBody,
        RangeControl = wpComponents.RangeControl,
        ToggleControl = wpComponents.ToggleControl,
        QueryControls = wpComponents.QueryControls,
        Spinner = wpComponents.Spinner,
        Toolbar = wpComponents.Toolbar,
        Placeholder = wpComponents.Placeholder,
        IconButton = wpComponents.IconButton;
    var withSelect = wpData.withSelect;
    var pickBy = lodash.pickBy,
        isUndefined = lodash.isUndefined;
    var decodeEntities = wpHtmlEntities.decodeEntities;
    var dateI18n = wpDate.dateI18n,
        __experimentalGetSettings = wpDate.__experimentalGetSettings;


    var advRecentPostsBlockIcon = React.createElement(
        "svg",
        { width: "20", height: "20", viewBox: "2 2 22 22" },
        React.createElement("path", { fill: "none", d: "M0,0h24v24H0V0z" }),
        React.createElement("rect", { x: "13", y: "7.5", width: "5", height: "2" }),
        React.createElement("rect", { x: "13", y: "14.5", width: "5", height: "2" }),
        React.createElement("path", { d: "M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V5h14V19z" }),
        React.createElement("path", { d: "M11,6H6v5h5V6z M10,10H7V7h3V10z" }),
        React.createElement("path", { d: "M11,13H6v5h5V13z M10,17H7v-3h3V17z" })
    );

    var initSlider = null;

    var RecentPostsEdit = function (_Component) {
        _inherits(RecentPostsEdit, _Component);

        function RecentPostsEdit() {
            _classCallCheck(this, RecentPostsEdit);

            var _this = _possibleConstructorReturn(this, (RecentPostsEdit.__proto__ || Object.getPrototypeOf(RecentPostsEdit)).apply(this, arguments));

            _this.state = {
                updating: false
            };
            return _this;
        }

        _createClass(RecentPostsEdit, [{
            key: "componentWillUpdate",
            value: function componentWillUpdate(nextProps) {
                var nextPosts = nextProps.recentPosts;
                var nextView = nextProps.attributes.postView;
                var _props = this.props,
                    attributes = _props.attributes,
                    clientId = _props.clientId,
                    recentPosts = _props.recentPosts;

                var $ = jQuery;

                if (nextView !== 'slider' || nextPosts && recentPosts && nextPosts.length !== recentPosts.length) {
                    $("#block-" + clientId + " .advgb-recent-posts.slick-initialized").slick('unslick');
                    $("#block-" + clientId + " .advgb-recent-post").removeAttr('tabindex').removeAttr('role').removeAttr('aria-describedby');

                    if (nextView === 'slider' && nextPosts && recentPosts && nextPosts.length !== recentPosts.length) {
                        if (!this.state.updating) {
                            this.setState({ updating: true });
                        }
                    }

                    if (initSlider) {
                        clearTimeout(initSlider);
                    }
                }
            }
        }, {
            key: "componentDidUpdate",
            value: function componentDidUpdate(prevProps) {
                var that = this;
                var _props2 = this.props,
                    attributes = _props2.attributes,
                    clientId = _props2.clientId;
                var postView = attributes.postView;

                var $ = jQuery;

                if (postView === 'slider') {
                    initSlider = setTimeout(function () {
                        $("#block-" + clientId + " .advgb-recent-posts-block.slider-view .advgb-recent-posts:not(.slick-initialized)").slick({
                            dots: true,
                            adaptiveHeight: true
                        });

                        if (that.state.updating) {
                            that.setState({ updating: false });
                        }
                    }, 100);
                } else {
                    $("#block-" + clientId + " .advgb-recent-posts.slick-initialized").slick('unslick');
                }
            }
        }, {
            key: "render",
            value: function render() {
                var _props3 = this.props,
                    attributes = _props3.attributes,
                    setAttributes = _props3.setAttributes,
                    recentPosts = _props3.recentPosts,
                    categoriesList = _props3.categoriesList;
                var postView = attributes.postView,
                    order = attributes.order,
                    orderBy = attributes.orderBy,
                    category = attributes.category,
                    numberOfPosts = attributes.numberOfPosts,
                    columns = attributes.columns,
                    displayFeaturedImage = attributes.displayFeaturedImage,
                    displayAuthor = attributes.displayAuthor,
                    displayDate = attributes.displayDate,
                    displayExcerpt = attributes.displayExcerpt,
                    postTextAsExcerpt = attributes.postTextAsExcerpt,
                    postTextExcerptLength = attributes.postTextExcerptLength,
                    displayReadMore = attributes.displayReadMore;


                var inspectorControls = React.createElement(
                    InspectorControls,
                    null,
                    React.createElement(
                        PanelBody,
                        { title: __('Block Settings') },
                        React.createElement(QueryControls, _extends({ order: order, orderBy: orderBy }, {
                            categoriesList: categoriesList,
                            selectedCategoryId: category,
                            numberOfItems: numberOfPosts,
                            onOrderChange: function onOrderChange(value) {
                                return setAttributes({ order: value });
                            },
                            onOrderByChange: function onOrderByChange(value) {
                                return setAttributes({ orderBy: value });
                            },
                            onCategoryChange: function onCategoryChange(value) {
                                return setAttributes({ category: value !== '' ? value : undefined });
                            },
                            onNumberOfItemsChange: function onNumberOfItemsChange(value) {
                                return setAttributes({ numberOfPosts: value });
                            }
                        })),
                        postView === 'grid' && React.createElement(RangeControl, {
                            label: __('Columns'),
                            value: columns,
                            min: 1,
                            max: 4,
                            onChange: function onChange(value) {
                                return setAttributes({ columns: value });
                            }
                        }),
                        React.createElement(ToggleControl, {
                            label: __('Display Featured Image'),
                            checked: displayFeaturedImage,
                            onChange: function onChange() {
                                return setAttributes({ displayFeaturedImage: !displayFeaturedImage });
                            }
                        }),
                        React.createElement(ToggleControl, {
                            label: __('Display Post Author'),
                            checked: displayAuthor,
                            onChange: function onChange() {
                                return setAttributes({ displayAuthor: !displayAuthor });
                            }
                        }),
                        React.createElement(ToggleControl, {
                            label: __('Display Post Date'),
                            checked: displayDate,
                            onChange: function onChange() {
                                return setAttributes({ displayDate: !displayDate });
                            }
                        }),
                        React.createElement(ToggleControl, {
                            label: __('Display Read More Link'),
                            checked: displayReadMore,
                            onChange: function onChange() {
                                return setAttributes({ displayReadMore: !displayReadMore });
                            }
                        }),
                        React.createElement(ToggleControl, {
                            label: __('Display Post Excerpt'),
                            checked: displayExcerpt,
                            onChange: function onChange() {
                                return setAttributes({ displayExcerpt: !displayExcerpt });
                            }
                        }),
                        displayExcerpt && React.createElement(ToggleControl, {
                            label: __('First Post text as Excerpt'),
                            help: __('Display some part of first text found in post as excerpt.'),
                            checked: postTextAsExcerpt,
                            onChange: function onChange() {
                                return setAttributes({ postTextAsExcerpt: !postTextAsExcerpt });
                            }
                        }),
                        displayExcerpt && postTextAsExcerpt && React.createElement(RangeControl, {
                            label: __('Post Text Excerpt length'),
                            min: 50,
                            max: 300,
                            value: postTextExcerptLength,
                            onChange: function onChange(value) {
                                return setAttributes({ postTextExcerptLength: value });
                            }
                        })
                    )
                );

                var hasPosts = Array.isArray(recentPosts) && recentPosts.length;

                // If no posts found we show this notice
                if (!hasPosts) {
                    return React.createElement(
                        Fragment,
                        null,
                        inspectorControls,
                        React.createElement(
                            Placeholder,
                            {
                                icon: advRecentPostsBlockIcon,
                                label: __('ADVGB Recent Posts Block')
                            },
                            !Array.isArray(recentPosts) ? React.createElement(Spinner, null) : __('No posts found! Try to change category or publish posts.')
                        )
                    );
                }

                var postViewControls = [{
                    icon: 'grid-view',
                    title: __('Grid View'),
                    onClick: function onClick() {
                        return setAttributes({ postView: 'grid' });
                    },
                    isActive: postView === 'grid'
                }, {
                    icon: 'list-view',
                    title: __('List View'),
                    onClick: function onClick() {
                        return setAttributes({ postView: 'list' });
                    },
                    isActive: postView === 'list'
                }, {
                    icon: 'slides',
                    title: __('Slider View'),
                    onClick: function onClick() {
                        return setAttributes({ postView: 'slider' });
                    },
                    isActive: postView === 'slider'
                }];

                var blockClassName = ['advgb-recent-posts-block', this.state.updating && 'loading', postView === 'grid' && 'columns-' + columns, postView === 'grid' && 'grid-view', postView === 'list' && 'list-view', postView === 'slider' && 'slider-view'].filter(Boolean).join(' ');

                var dateFormat = __experimentalGetSettings().formats.date;

                return React.createElement(
                    Fragment,
                    null,
                    inspectorControls,
                    React.createElement(
                        BlockControls,
                        null,
                        React.createElement(Toolbar, { controls: postViewControls }),
                        React.createElement(
                            Toolbar,
                            null,
                            React.createElement(IconButton, {
                                label: __('Refresh'),
                                icon: "update",
                                onClick: function onClick() {
                                    return setAttributes({ myToken: Math.floor(Math.random() * Math.floor(999)) });
                                }
                            })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: blockClassName },
                        this.state.updating && React.createElement("div", { className: "advgb-recent-posts-loading" }),
                        React.createElement(
                            "div",
                            { className: "advgb-recent-posts" },
                            recentPosts.map(function (post, index) {
                                return React.createElement(
                                    "article",
                                    { key: index, className: "advgb-recent-post" },
                                    displayFeaturedImage && post.featured_img && React.createElement(
                                        "div",
                                        { className: "advgb-post-thumbnail" },
                                        React.createElement(
                                            "a",
                                            { href: post.link, target: "_blank" },
                                            React.createElement("img", { src: post.featured_img, alt: __('Post Image') })
                                        )
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: 'advgb-post-wrapper' },
                                        React.createElement(
                                            "h2",
                                            { className: "advgb-post-title" },
                                            React.createElement(
                                                "a",
                                                { href: post.link, target: "_blank" },
                                                decodeEntities(post.title.rendered)
                                            )
                                        ),
                                        React.createElement(
                                            "div",
                                            { className: "advgb-post-info" },
                                            displayAuthor && React.createElement(
                                                "a",
                                                { href: post.author_meta.author_link,
                                                    target: "_blank",
                                                    className: "advgb-post-author"
                                                },
                                                post.author_meta.display_name
                                            ),
                                            displayDate && React.createElement(
                                                "span",
                                                { className: "advgb-post-date" },
                                                dateI18n(dateFormat, post.date_gmt)
                                            )
                                        ),
                                        React.createElement(
                                            "div",
                                            { className: "advgb-post-content" },
                                            displayExcerpt && React.createElement("div", { className: "advgb-post-excerpt",
                                                dangerouslySetInnerHTML: {
                                                    __html: postTextAsExcerpt ? RecentPostsEdit.extractContent(post.content.rendered, postTextExcerptLength) : post.excerpt.rendered
                                                } }),
                                            displayReadMore && React.createElement(
                                                "div",
                                                { className: "advgb-post-readmore" },
                                                React.createElement(
                                                    "a",
                                                    { href: post.link, target: "_blank" },
                                                    __('Read More')
                                                )
                                            )
                                        )
                                    )
                                );
                            })
                        )
                    )
                );
            }
        }], [{
            key: "extractContent",
            value: function extractContent(html, length) {
                var span = document.createElement('span');
                span.innerHTML = html;

                // Remove script tag
                var scripts = span.getElementsByTagName('script');
                var j = scripts.length;
                while (j--) {
                    scripts[j].parentNode.removeChild(scripts[j]);
                }

                // Remove style tag
                var styles = span.getElementsByTagName('style');
                var k = styles.length;
                while (k--) {
                    styles[k].parentNode.removeChild(styles[k]);
                }

                var children = span.querySelectorAll('*');
                for (var i = 0; i < children.length; i++) {
                    if (children[i].textContent) children[i].textContent += ' ';else children[i].innerText += ' ';
                }

                var text = [span.textContent || span.innerText].toString().replace(/\s\s+/g, ' ');
                text = text.slice(0, length).trim();

                if (text.length) text += '…';

                return text;
            }
        }]);

        return RecentPostsEdit;
    }(Component);

    registerBlockType('advgb/recent-posts', {
        title: __('Recent Posts'),
        description: __('Display your recent posts in slider or grid view with beautiful styles.'),
        icon: {
            src: advRecentPostsBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined
        },
        category: 'widgets',
        keywords: [__('latest posts'), __('posts slide'), __('posts grid')],
        edit: withSelect(function (select, props) {
            var _select = select('core'),
                getEntityRecords = _select.getEntityRecords;

            var _props$attributes = props.attributes,
                category = _props$attributes.category,
                order = _props$attributes.order,
                orderBy = _props$attributes.orderBy,
                numberOfPosts = _props$attributes.numberOfPosts,
                myToken = _props$attributes.myToken;


            var recentPostsQuery = pickBy({
                categories: category,
                order: order,
                orderby: orderBy,
                per_page: numberOfPosts,
                token: myToken
            }, function (value) {
                return !isUndefined(value);
            });

            var categoriesListQuery = {
                per_page: 99
            };

            return {
                recentPosts: getEntityRecords('postType', 'post', recentPostsQuery),
                categoriesList: getEntityRecords('taxonomy', 'category', categoriesListQuery)
            };
        })(RecentPostsEdit),
        save: function save() {
            // Render in PHP
            return null;
        }
    });
})(wp.i18n, wp.blocks, wp.element, wp.editor, wp.components, wp.data, lodash, wp.htmlEntities, wp.date);

/***/ }),

/***/ "./assets/blocks/social-links/block.jsx":
/*!**********************************************!*\
  !*** ./assets/blocks/social-links/block.jsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
        BlockControls = wpEditor.BlockControls,
        MediaUpload = wpEditor.MediaUpload,
        AlignmentToolbar = wpEditor.AlignmentToolbar,
        PanelColorSettings = wpEditor.PanelColorSettings;
    var RangeControl = wpComponents.RangeControl,
        BaseControl = wpComponents.BaseControl,
        PanelBody = wpComponents.PanelBody,
        TextControl = wpComponents.TextControl,
        IconButton = wpComponents.IconButton,
        Button = wpComponents.Button,
        Toolbar = wpComponents.Toolbar,
        Tooltip = wpComponents.Tooltip;


    var socialBlockIconContent = React.createElement(
        Fragment,
        null,
        React.createElement("path", { fill: "none", d: "M0,0h24v24H0V0z" }),
        React.createElement("path", { d: "M18,16.08c-0.76,0-1.44,0.3-1.96,0.77L8.91,12.7C8.96,12.47,9,12.24,9,12s-0.04-0.47-0.09-0.7l7.05-4.11\r C16.5,7.69,17.21,8,18,8c1.66,0,3-1.34,3-3c0-1.66-1.34-3-3-3s-3,1.34-3,3c0,0.24,0.04,0.47,0.09,0.7L8.04,9.81\r C7.5,9.31,6.79,9,6,9c-1.66,0-3,1.34-3,3c0,1.66,1.34,3,3,3c0.79,0,1.5-0.31,2.04-0.81l7.12,4.16c-0.05,0.21-0.08,0.43-0.08,0.65\r c0,1.61,1.31,2.92,2.92,2.92s2.92-1.31,2.92-2.92C20.92,17.39,19.61,16.08,18,16.08z M18,4c0.55,0,1,0.45,1,1s-0.45,1-1,1\r s-1-0.45-1-1S17.45,4,18,4z M6,13c-0.55,0-1-0.45-1-1s0.45-1,1-1s1,0.45,1,1S6.55,13,6,13z M18,20.02c-0.55,0-1-0.45-1-1\r s0.45-1,1-1s1,0.45,1,1S18.55,20.02,18,20.02z" })
    );

    var socialBlockIcon = React.createElement(
        "svg",
        { width: "20", height: "20", viewBox: "0 0 24 24" },
        socialBlockIconContent
    );

    var ICONS_SET = {
        blogger: React.createElement(
            Fragment,
            null,
            React.createElement(
                "g",
                { fill: "none", "fill-rule": "evenodd", stroke: "none", "stroke-width": "1" },
                React.createElement(
                    "g",
                    { fill: "currentColor" },
                    React.createElement("path", { d: "M50,25 C50,11.1928806 38.8071194,0 25,0 C11.1928806,0 0,11.1928806 0,25 C0,38.8071194 11.1928806,50 25,50 C38.8071194,50 50,38.8071194 50,25 Z M47,25 C47,12.8497349 37.1502651,3 25,3 C12.8497349,3 3,12.8497349 3,25 C3,37.1502651 12.8497349,47 25,47 C37.1502651,47 47,37.1502651 47,25 Z M14,28.8986406 C14,32.8228477 17.2049102,36 21.1539531,36 L28.8544258,36 C32.8063906,36 36,32.8228477 36,28.8986406 L36,23.8630898 C36,23.0788672 35.3675,22.4423281 34.5776484,22.4423281 L33.3700977,22.4423281 C32.5888398,22.4423281 31.9736563,21.8570938 31.9220508,21.121082 C31.9136289,17.1796445 28.7112969,14 24.7595898,14 L21.1539531,14 C17.2049102,14 14.002793,17.1796875 14,21.1041523 L14,28.8986406 Z M27,21.5001179 C27,22.3263074 26.3641346,23 25.5840879,23 L21.4159121,23 C20.6359096,23 20,22.3264017 20,21.5001179 C19.9999116,20.6705805 20.6358212,20 21.4159121,20 L25.5840879,20 C26.3641346,20 27,20.6705805 27,21.5001179 Z M31,28.4932201 C31,29.3206654 30.3988164,30 29.6624116,30 L21.3288673,30 C20.5925066,30 20,29.3206654 20,28.4932201 C20,27.6657749 20.5925947,27 21.3288673,27 L29.6624116,27 C30.3988164,27 31,27.665725 31,28.4932201 Z M31,28.4932201" })
                )
            )
        ),
        facebook: React.createElement(
            Fragment,
            null,
            React.createElement(
                "g",
                { fill: "none", "fill-rule": "evenodd", stroke: "none", "stroke-width": "1" },
                React.createElement(
                    "g",
                    { fill: "currentColor" },
                    React.createElement("path", { d: "M25,50 C38.8071194,50 50,38.8071194 50,25 C50,11.1928806 38.8071194,0 25,0 C11.1928806,0 0,11.1928806 0,25 C0,38.8071194 11.1928806,50 25,50 Z M25,47 C37.1502651,47 47,37.1502651 47,25 C47,12.8497349 37.1502651,3 25,3 C12.8497349,3 3,12.8497349 3,25 C3,37.1502651 12.8497349,47 25,47 Z M26.8145197,36 L26.8145197,24.998712 L30.0687449,24.998712 L30.5,21.2076072 L26.8145197,21.2076072 L26.8200486,19.3101227 C26.8200486,18.3213442 26.9207209,17.7915341 28.4425538,17.7915341 L30.4769629,17.7915341 L30.4769629,14 L27.2222769,14 C23.3128757,14 21.9368678,15.8390937 21.9368678,18.9318709 L21.9368678,21.2080366 L19.5,21.2080366 L19.5,24.9991413 L21.9368678,24.9991413 L21.9368678,36 L26.8145197,36 Z M26.8145197,36" })
                )
            )
        ),
        flickr: React.createElement(
            Fragment,
            null,
            React.createElement(
                "g",
                { fill: "none", "fill-rule": "evenodd", stroke: "none", "stroke-width": "1" },
                React.createElement(
                    "g",
                    { fill: "currentColor" },
                    React.createElement("path", { d: "M0,25 C0,38.8071194 11.1928806,50 25,50 C38.8071194,50 50,38.8071194 50,25 C50,11.1928806 38.8071194,0 25,0 C11.1928806,0 0,11.1928806 0,25 Z M3,25 C3,37.1502651 12.8497349,47 25,47 C37.1502651,47 47,37.1502651 47,25 C47,12.8497349 37.1502651,3 25,3 C12.8497349,3 3,12.8497349 3,25 Z M11,24.3933898 C11,27.9245881 13.8664452,30.7868324 17.4026552,30.7868852 C20.9389182,30.7868852 23.8053634,27.9245881 23.8053634,24.3933898 C23.8053634,20.8622443 20.9389711,17.9999472 17.4026552,18 C13.8664452,18 11,20.8622443 11,24.3933898 Z M33.4026552,30.7868852 C36.9389711,30.7868852 39.8053634,27.9245881 39.8053634,24.3933898 C39.8053634,20.8622971 36.9389182,18 33.4026552,18 C29.8663923,18 27,20.8622971 27,24.3933898 C27,27.9245881 29.8664452,30.7868852 33.4026552,30.7868852 Z M33.394864,19.9672131 C35.8394032,19.9672131 37.8210935,21.9489034 37.8210935,24.3934426 C37.8210935,26.8379818 35.8394032,28.8196721 33.394864,28.8196721 C30.9503248,28.8196721 28.9686345,26.8379818 28.9686345,24.3934426 C28.9686345,21.9489034 30.9503248,19.9672131 33.394864,19.9672131 Z M33.394864,19.9672131" })
                )
            )
        ),
        google: React.createElement(
            Fragment,
            null,
            React.createElement(
                "g",
                { fill: "none", "fill-rule": "evenodd", stroke: "none", "stroke-width": "1" },
                React.createElement(
                    "g",
                    { fill: "currentColor" },
                    React.createElement("path", { d: "M25,0 C11.1928806,0 0,11.1928806 0,25 C0,38.8071194 11.1928806,50 25,50 C38.8071194,50 50,38.8071194 50,25 C50,11.1928806 38.8071194,0 25,0 Z M25,3 C12.8497349,3 3,12.8497349 3,25 C3,37.1502651 12.8497349,47 25,47 C37.1502651,47 47,37.1502651 47,25 C47,12.8497349 37.1502651,3 25,3 Z M38.2449877,22.1097512 L38.2449877,27.3881872 L36.0036768,27.3881872 L36.0036768,22.1097512 L30.7739796,22.1097512 L30.7739796,19.9128403 L36.0036768,19.9128403 L36.0036768,14.6807808 L38.2449877,14.6807808 L38.2449877,19.9128403 L42.2375586,19.9128403 C42.5324436,20.6254301 42.7875249,21.3586918 43,22.1097512 L38.2449877,22.1097512 Z M11.7255525,37.2757943 C14.6396541,35.4919506 18.5644269,35.2563486 20.6868362,35.1217189 C20.0299,34.2802832 19.2718967,33.3883614 19.2718967,31.9242632 C19.2718967,31.1333137 19.5077199,30.6621097 19.7435432,30.1067621 C19.2213631,30.1572483 18.7160276,30.2077344 18.2443811,30.2077344 C13.2752481,30.2077344 10.4622136,26.5054173 10.4622136,22.8535864 C10.4622136,20.699511 11.4560402,18.3064679 13.4605378,16.5747932 C16.1388163,14.3752803 19.3224302,14 21.849108,14 L31.501017,14 L28.5026927,15.6845543 L25.6054356,15.6845543 C26.6834848,16.5747932 28.9238057,18.4478291 28.9238057,22.0121507 C28.9238057,25.4788658 26.952997,27.1112511 24.9990329,28.6594927 C24.3757857,29.2653264 23.6851605,29.9216463 23.6851605,30.9481978 C23.6851605,31.9747494 24.3757857,32.5469257 24.8979658,32.9676435 L26.5824176,34.2802832 C28.6542934,35.996812 30.5240349,37.5955399 30.5240349,40.8266529 C30.5240349,42.9574523 29.5287217,45.0961123 27.5894278,46.7373863 C26.5459915,46.9073414 25.4755787,46.9970613 24.3847411,47 C26.3539444,46.1370063 27.37411,44.55802 27.37411,42.6609828 C27.37411,40.2713054 25.8412588,39.0091518 22.2702209,36.468016 C21.8996415,36.4343586 21.6638183,36.4343586 21.1921718,36.4343586 C20.7710588,36.4343586 18.2443811,36.5185022 16.2735724,37.174822 C15.2460568,37.5450537 12.2477325,38.6725775 12.2477325,42.0046629 C12.2477325,42.3667791 12.2863178,42.7178526 12.3616005,43.0559755 C7.42272978,39.3956824 9.56224074,39.9122538 9,39.9122529 C9.5622407,38.9676509 10.4340377,38.0389613 11.7255525,37.2757943 Z M18.9013173,15.5448759 C17.688512,15.5448759 16.3746395,16.1540754 15.6166362,17.0914348 C14.8249438,18.0742317 14.5891206,19.3363852 14.5891206,20.5480526 C14.5891206,23.6950221 16.4083286,28.8950947 20.451013,28.8950947 C21.6132847,28.8950947 22.8766236,28.3229185 23.6346269,27.582455 C24.7126761,26.5054173 24.7968987,25.0076618 24.7968987,24.1662261 C24.7968987,20.7836546 22.792401,15.5448759 18.9013173,15.5448759 Z M18.9013173,15.5448759" })
                )
            )
        ),
        instagram: React.createElement(
            Fragment,
            null,
            React.createElement(
                "g",
                { fill: "none", "fill-rule": "evenodd", stroke: "none", "stroke-width": "1" },
                React.createElement(
                    "g",
                    { fill: "currentColor" },
                    React.createElement("path", { d: "M25,0 C11.1928806,0 0,11.1928806 0,25 C0,38.8071194 11.1928806,50 25,50 C38.8071194,50 50,38.8071194 50,25 C50,11.1928806 38.8071194,0 25,0 Z M25,3 C12.8497349,3 3,12.8497349 3,25 C3,37.1502651 12.8497349,47 25,47 C37.1502651,47 47,37.1502651 47,25 C47,12.8497349 37.1502651,3 25,3 Z M35.9513128,34.5096659 C35.9701595,34.4075385 35.9839804,34.3037693 36,34.2013135 L36,15.7986865 C35.9846086,15.6978726 35.9714159,15.5967304 35.9525693,15.496245 C35.7600194,14.4654483 34.9467868,13.6655054 33.9482288,13.5226585 C33.9067662,13.517076 33.8662459,13.5075528 33.8254116,13.5 L16.1745884,13.5 C16.0681049,13.5200314 15.9609932,13.5351371 15.8560802,13.5600942 C14.8813947,13.7922616 14.1601965,14.6128926 14.0213595,15.6453312 C14.0157055,15.6883495 14.0072245,15.7310394 14,15.7740577 L14,34.2269275 C14.0201031,34.3438321 14.0361227,34.4617219 14.0612516,34.5779697 C14.2767315,35.5742861 15.0902783,36.3466448 16.0580534,36.4766848 C16.1048559,36.4825957 16.1519725,36.4921188 16.198775,36.5 L33.801225,36.5 C33.9155613,36.4796402 34.0302117,36.4628926 34.1432916,36.4372787 C35.0416482,36.2379497 35.775725,35.454426 35.9513128,34.5096659 Z M16.380331,33.0989292 C16.380331,33.5885494 16.7858479,34.0095374 17.254187,34.0095374 C22.4169106,34.0098658 27.5793201,34.0098658 32.7420437,34.0095374 C33.2147803,34.0095374 33.6180985,33.5892062 33.6180985,33.0959737 C33.6184126,29.6962164 33.6180985,26.2967875 33.6180985,22.8973587 L33.6180985,22.8267561 L31.5179543,22.8267561 C31.8144748,23.81749 31.9055669,24.8252998 31.7893459,25.8524843 C31.6724968,26.8799971 31.3558732,27.8362507 30.8401034,28.7192747 C30.3240195,29.6032838 29.6549637,30.3355797 28.8357629,30.9184609 C26.7123745,32.4303398 23.9167892,32.5633352 21.6636731,31.2412621 C20.5247077,30.5736579 19.6304345,29.6426899 19.0069247,28.4431039 C18.0768429,26.653084 17.9282685,24.7744003 18.4738788,22.8251142 C17.7771813,22.825771 17.0833107,22.825771 16.3800168,22.825771 L16.3800168,22.8878355 C16.3800168,26.2915334 16.3797027,29.6952313 16.380331,33.0989292 Z M24.897757,29.6581239 C27.3886549,29.7139492 29.403361,27.6333095 29.4558175,25.1027841 C29.5095304,22.4931182 27.4960808,20.3376071 25.0001571,20.339249 C22.5601451,20.3376071 20.5765359,22.3900057 20.5422979,24.9293975 C20.5071175,27.5370931 22.5039192,29.604269 24.897757,29.6581239 Z M33.6177844,18.481582 C33.6180985,17.7555254 33.6180985,17.0291405 33.6177844,16.303084 C33.6177844,15.7822673 33.2235754,15.3678469 32.7260241,15.3675186 C32.03341,15.3671902 31.3407958,15.3668618 30.6478676,15.3675186 C30.1515727,15.3681753 29.7561073,15.7835808 29.7557932,16.3043975 C29.7554791,17.0242147 29.7535944,17.744032 29.7583061,18.4641776 C29.7589343,18.5715591 29.7784092,18.6832096 29.8110767,18.7850086 C29.9354645,19.1682324 30.2712489,19.4033552 30.6824198,19.4053255 C31.0166336,19.4059823 31.3508474,19.4049971 31.6853753,19.4049971 C32.0472308,19.4007282 32.4103428,19.4079526 32.7725125,19.3987579 C33.2383386,19.3866077 33.6177844,18.9692319 33.6177844,18.481582 Z M33.6177844,18.481582" })
                )
            )
        ),
        linkedin: React.createElement(
            Fragment,
            null,
            React.createElement(
                "g",
                { fill: "none", "fill-rule": "evenodd", stroke: "none", "stroke-width": "1" },
                React.createElement(
                    "g",
                    { fill: "currentColor" },
                    React.createElement("path", { d: "M25,50 C38.8071194,50 50,38.8071194 50,25 C50,11.1928806 38.8071194,0 25,0 C11.1928806,0 0,11.1928806 0,25 C0,38.8071194 11.1928806,50 25,50 Z M25,47 C37.1502651,47 47,37.1502651 47,25 C47,12.8497349 37.1502651,3 25,3 C12.8497349,3 3,12.8497349 3,25 C3,37.1502651 12.8497349,47 25,47 Z M14,20.1180479 L14,34.6581834 L18.7100851,34.6581834 L18.7100851,20.1180479 L14,20.1180479 Z M16.6646962,13 C15.0534058,13 14,14.0858611 14,15.5115122 C14,16.9076331 15.0222711,18.0247614 16.6035556,18.0247614 L16.6336556,18.0247614 C18.2759867,18.0247614 19.2988222,16.9076331 19.2988222,15.5115122 C19.2682519,14.0858611 18.2759867,13 16.6646962,13 Z M30.5769213,20.1180479 C28.076176,20.1180479 26.9565501,21.5293199 26.3314108,22.5193527 L26.3314108,20.4598644 L21.6207614,20.4598644 C21.6828427,21.8242356 21.6207614,35 21.6207614,35 L26.3314108,35 L26.3314108,26.8795887 C26.3314108,26.445032 26.3619812,26.0115368 26.4865199,25.7004084 C26.826932,24.83226 27.6020069,23.9334233 28.9032674,23.9334233 C30.6083381,23.9334233 31.2899149,25.2667202 31.2899149,27.2206333 L31.2899149,34.999614 L35.9998119,34.999614 L36,26.6627446 C36,22.1966439 33.6763743,20.1180479 30.5769213,20.1180479 Z M30.5769213,20.1180479" })
                )
            )
        ),
        mail: React.createElement(
            Fragment,
            null,
            React.createElement(
                "g",
                { fill: "none", "fill-rule": "evenodd", stroke: "none", "stroke-width": "1" },
                React.createElement(
                    "g",
                    { fill: "currentColor" },
                    React.createElement("path", { d: "M25,0 C11.1928806,0 0,11.1928806 0,25 C0,38.8071194 11.1928806,50 25,50 C38.8071194,50 50,38.8071194 50,25 C50,11.1928806 38.8071194,0 25,0 Z M25,3 C12.8497349,3 3,12.8497349 3,25 C3,37.1502651 12.8497349,47 25,47 C37.1502651,47 47,37.1502651 47,25 C47,12.8497349 37.1502651,3 25,3 Z M37,31.9646738 L37,17 L28.262875,25.4642914 L37,31.9646738 Z M13,31.9646738 L21.7369375,25.4633812 L13,17 L13,31.9646738 Z M22.9140156,26.604743 L13,33 L37,33 L27.08575,26.604743 L25,28.625083 L22.9140156,26.604743 Z M13.72,17 L25,26.0581312 L36.28,17 L13.72,17 Z M13.72,17" })
                )
            )
        ),
        picasa: React.createElement(
            Fragment,
            null,
            React.createElement(
                "g",
                { fill: "none", "fill-rule": "evenodd", stroke: "none", "stroke-width": "1" },
                React.createElement(
                    "g",
                    { fill: "currentColor" },
                    React.createElement("path", { d: "M25,50 C38.8071194,50 50,38.8071194 50,25 C50,11.1928806 38.8071194,0 25,0 C11.1928806,0 0,11.1928806 0,25 C0,38.8071194 11.1928806,50 25,50 Z M25,47 C37.1502651,47 47,37.1502651 47,25 C47,12.8497349 37.1502651,3 25,3 C12.8497349,3 3,12.8497349 3,25 C3,37.1502651 12.8497349,47 25,47 Z M18.3081608,24.9268242 L18.3081608,36.1026094 C15.8801013,34.6339648 13.9785429,32.4174648 12.9377792,29.8090352 L18.3081608,24.9268242 Z M20.4591064,12.8520586 C21.9243514,12.297832 23.4480966,12 24.9979941,12 C26.8609587,12 28.6590247,12.3973125 30.3579148,13.1656836 L30.3579148,21.8322148 L20.4591064,12.8520586 Z M12.4719619,28.3769023 C12.1682386,27.2530625 12,26.1186602 12,25 C12,20.096918 14.7097944,15.6850937 19.0744513,13.4426953 L23.9947578,17.9067734 L12.4719619,28.3769023 Z M36.6723724,30.6506328 C34.5083252,35.1147617 29.9554726,38 24.9979941,38 C23.1521937,38 21.3633699,37.6133008 19.6735189,36.8500586 L19.6735189,30.6506328 L36.6723724,30.6506328 Z M37.257729,29.2811133 L31.727437,29.2811133 L31.727437,13.9131836 C35.5955539,16.2654219 38.0001016,20.483668 38,25.0000508 C38,26.4583867 37.7438081,27.8959531 37.257729,29.2811133 Z M37.257729,29.2811133" })
                )
            )
        ),
        pinterest: React.createElement(
            Fragment,
            null,
            React.createElement(
                "g",
                { fill: "none", "fill-rule": "evenodd", stroke: "none", "stroke-width": "1" },
                React.createElement(
                    "g",
                    { fill: "currentColor" },
                    React.createElement("path", { d: "M25,0 C11.1928806,0 0,11.1928806 0,25 C0,38.8071194 11.1928806,50 25,50 C38.8071194,50 50,38.8071194 50,25 C50,11.1928806 38.8071194,0 25,0 Z M25,3 C12.8497349,3 3,12.8497349 3,25 C3,37.1502651 12.8497349,47 25,47 C37.1502651,47 47,37.1502651 47,25 C47,12.8497349 37.1502651,3 25,3 Z M15.5,21.3293651 C15.5,23.8979841 16.4179886,26.1831362 18.3868965,27.0346983 C18.7097504,27.1745243 18.9989411,27.0395084 19.0925718,26.6608336 C19.1577063,26.3987635 19.3117743,25.737617 19.3805099,25.4622774 C19.4749236,25.0877494 19.4382854,24.9563826 19.1777477,24.629956 C18.6100133,23.9205421 18.2472332,23.0021355 18.2472332,21.7012393 C18.2472332,17.9270976 20.9127352,14.5483833 25.1881227,14.5483833 C28.9739058,14.5483833 31.0538241,16.9989049 31.0538241,20.2716301 C31.0538241,24.5777078 29.2549547,28.2120235 26.5844424,28.2120235 C25.1096795,28.2120235 24.005682,26.9199182 24.3595374,25.3352232 C24.7832244,23.4433422 25.6039811,21.4015173 25.6039811,20.0359328 C25.6039811,18.8134918 24.9845775,17.7939063 23.7027128,17.7939063 C22.1950696,17.7939063 20.983976,19.4461092 20.983976,21.6594407 C20.983976,23.0691459 21.4336542,24.0225504 21.4336542,24.0225504 C21.4336542,24.0225504 19.890782,30.9476708 19.6203801,32.1604915 C19.0817683,34.5758493 19.5394317,37.5367443 19.5781053,37.8358028 C19.6008084,38.0129489 19.8157834,38.0550792 19.9131719,37.9212244 C20.0522089,37.7289843 21.8477903,35.3806369 22.4582691,33.0341139 C22.6309694,32.36965 23.4498471,28.9290673 23.4498471,28.9290673 C23.9396081,29.9187967 25.3711567,30.7905945 26.8935179,30.7905945 C31.4253723,30.7905945 34.5,26.4138574 34.5,20.5554288 C34.5,16.1256142 30.9581579,12 25.575015,12 C18.8771271,12 15.5,17.0871462 15.5,21.3293651 Z M15.5,21.3293651" })
                )
            )
        ),
        reddit: React.createElement(
            Fragment,
            null,
            React.createElement(
                "g",
                { fill: "none", "fill-rule": "evenodd", stroke: "none", "stroke-width": "1" },
                React.createElement(
                    "g",
                    { fill: "currentColor" },
                    React.createElement("path", { d: "M50,25 C50,11.1928806 38.8071194,0 25,0 C11.1928806,0 0,11.1928806 0,25 C0,38.8071194 11.1928806,50 25,50 C38.8071194,50 50,38.8071194 50,25 Z M47,25 C47,12.8497349 37.1502651,3 25,3 C12.8497349,3 3,12.8497349 3,25 C3,37.1502651 12.8497349,47 25,47 C37.1502651,47 47,37.1502651 47,25 Z M29.285672,25.1142857 C28.1613122,25.1142857 27.25,26.0886553 27.25,27.2907328 C27.25,28.4931237 28.1613122,29.4676812 29.285672,29.4676812 C30.4097389,29.4676812 31.3211097,28.4931237 31.3211097,27.2907328 C31.3211097,26.0886553 30.4097389,25.1142857 29.285672,25.1142857 L29.285672,25.1142857 Z M40,25.1842541 C40,23.1661499 38.4647792,21.5245722 36.5778773,21.5245722 C35.7246903,21.5245722 34.9441013,21.8609333 34.344099,22.4154154 C32.0204962,20.8025988 29.01275,19.8611259 25.7938312,19.7275339 L27.4944043,13.7975395 L32.4418455,14.9819468 C32.4417283,14.9962334 32.4399119,15.0100187 32.4399119,15.0243053 C32.4399119,16.6918871 33.7087059,18.0486732 35.2680089,18.0486732 C36.8273118,18.0486732 38.0961058,16.6919498 38.0961058,15.0243053 C38.0961058,13.3566608 36.827429,12 35.2680089,12 C34.0961293,12 33.0888402,12.7662743 32.6602252,13.8548112 L27.2437392,12.5581164 C26.969285,12.4923856 26.6939519,12.6634486 26.6115688,12.9510599 L24.6717565,19.7148765 C21.2781691,19.773088 18.0911839,20.7250878 15.6557838,22.4155407 C15.0558987,21.8611213 14.2751339,21.5246975 13.4220056,21.5246975 C11.5351037,21.5246975 10,23.1663379 10,25.1843795 C10,26.5078929 10.6604127,27.6694291 11.6472525,28.3122624 C11.5968617,28.6558922 11.5703186,29.0034695 11.5703186,29.3544932 C11.5703186,31.9771452 12.997375,34.4258518 15.5885179,36.2485809 C18.110227,38.0226854 21.4524861,39 24.9999414,39 C28.5471037,39 31.8895972,38.0224974 34.4113063,36.2485809 C37.0025078,34.4256639 38.429447,31.9771452 38.429447,29.3544932 C38.429447,29.0034695 38.4030211,28.6560801 38.3525131,28.3122624 C39.3394701,27.6693665 40,26.5077049 40,25.1842541 L40,25.1842541 Z M35.2678917,13.1509466 C36.2337548,13.1509466 37.0196173,13.9912229 37.0196173,15.0242426 C37.0196173,16.0570117 36.2337548,16.8975386 35.2678917,16.8975386 C34.3021457,16.8975386 33.5161661,16.0570117 33.5161661,15.0242426 C33.5161075,13.9912856 34.3019699,13.1509466 35.2678917,13.1509466 L35.2678917,13.1509466 Z M11.076137,25.1842541 C11.076137,23.8009626 12.1284263,22.6755815 13.4218884,22.6755815 C13.9116754,22.6755815 14.3665405,22.8374333 14.7430654,23.1128259 C13.3654038,24.2769312 12.4090914,25.6430537 11.9283278,27.1170775 C11.4083063,26.6566487 11.076137,25.9612434 11.076137,25.1842541 L11.076137,25.1842541 Z M24.9999414,37.8488654 C18.1882742,37.8488654 12.6466314,34.0382971 12.6466314,29.3543679 C12.6466314,29.15304 12.6575885,28.9535918 12.6776862,28.7556476 C12.7167684,28.3727297 12.7922961,27.9965165 12.9030387,27.6288878 C13.3168294,26.2557474 14.2139618,25.0028522 15.4665839,23.9584283 C15.7443779,23.7265221 16.0403361,23.5054561 16.3517045,23.295293 C18.5818499,21.7901897 21.6355923,20.8602464 24.9999414,20.8602464 C28.3641147,20.8602464 31.4179743,21.790315 33.6479439,23.295293 C33.9593123,23.5054561 34.2553877,23.7265847 34.5331232,23.9584283 C35.7858039,25.0027895 36.6829949,26.2557474 37.0967269,27.6288878 C37.2075282,27.9965165 37.2830558,28.3727297 37.3220794,28.7556476 C37.3423529,28.9534039 37.3530756,29.15304 37.3530756,29.3543679 C37.3530756,34.0383598 31.8114915,37.8488654 24.9999414,37.8488654 L24.9999414,37.8488654 Z M38.071555,27.1172028 C37.5909086,25.6432417 36.6344204,24.2769312 35.2567588,23.1128886 C35.6332837,22.837496 36.0880902,22.6756441 36.5778773,22.6756441 C37.8713979,22.6756441 38.9236872,23.8009626 38.9236872,25.1843168 C38.9236872,25.9612434 38.5916937,26.6566487 38.071555,27.1172028 L38.071555,27.1172028 Z M29.1000551,33.0352917 C28.0801683,33.929456 26.815593,34.3281642 24.9999414,34.3281642 C23.1841726,34.3281642 21.9196559,33.929456 20.8995934,33.0352917 C20.6583619,32.8238128 20.3022277,32.8616597 20.1045317,33.1195073 C19.9066598,33.3776056 19.9419334,33.7583304 20.183282,33.9699346 C21.4026227,35.0389841 22.9330974,35.5366958 24.9999414,35.5366958 C27.0667854,35.5366958 28.5972016,35.0389841 29.8166008,33.9699346 C30.0578323,33.7583304 30.093223,33.3776056 29.8953512,33.1195073 C29.6971863,32.8611584 29.3412865,32.8238128 29.1000551,33.0352917 L29.1000551,33.0352917 Z M22.3208167,27.2907328 C22.3208167,26.0886553 21.4096217,25.1142857 20.2855548,25.1142857 C19.1613122,25.1142857 18.25,26.0886553 18.25,27.2907328 C18.25,28.4931237 19.1613707,29.4676812 20.2855548,29.4676812 C21.4096217,29.4675559 22.3208167,28.4931237 22.3208167,27.2907328 L22.3208167,27.2907328 Z M22.3208167,27.2907328" })
                )
            )
        ),
        skype: React.createElement(
            Fragment,
            null,
            React.createElement(
                "g",
                { fill: "none", "fill-rule": "evenodd", stroke: "none", "stroke-width": "1" },
                React.createElement(
                    "g",
                    { fill: "currentColor" },
                    React.createElement("path", { d: "M50,25 C50,11.1928806 38.8071194,0 25,0 C11.1928806,0 0,11.1928806 0,25 C0,38.8071194 11.1928806,50 25,50 C38.8071194,50 50,38.8071194 50,25 Z M47,25 C47,12.8497349 37.1502651,3 25,3 C12.8497349,3 3,12.8497349 3,25 C3,37.1502651 12.8497349,47 25,47 C37.1502651,47 47,37.1502651 47,25 Z M25.4397706,13.975276 C24.8096937,13.975276 24.1919703,14.0277875 23.5908485,14.1278564 C22.5130674,13.4152862 21.2304038,13 19.8499866,13 C16.0647401,13 13,16.1114511 13,19.9506313 C13,21.3475345 13.4052238,22.6452605 14.1030252,23.7348727 C14.0090312,24.330184 13.9609845,24.939812 13.9609845,25.5608835 C13.9609845,31.9601448 19.0985232,37.1471351 25.4397218,37.1471351 C26.1553942,37.1471351 26.8521702,37.0764923 27.5293662,36.9523474 C28.5816102,37.6146354 29.8210609,38 31.1497692,38 C34.9340392,38 38,34.8877563 38,31.0489724 C37.9998535,29.5978238 37.5625009,28.2486268 36.8112328,27.1332542 C36.879885,26.6180477 36.9193869,26.0942709 36.9193869,25.5610817 C36.9193869,19.1628112 31.7792114,13.975276 25.4397706,13.975276 Z M19.9677886,28.6935701 C21.3911596,28.5966276 22.2458078,30.338952 23.0054897,30.8236149 C23.7642429,31.3064835 26.6513076,32.4065946 28.1762921,30.6288326 C29.836859,28.6935701 27.0719846,27.6921461 25.0453354,27.3890074 C22.1517212,26.9520931 18.4983763,25.3558056 18.7825911,22.210082 C19.0669036,19.066352 21.4014725,17.454464 23.8583783,17.2270851 C26.9902148,16.9371546 29.0290341,17.7109007 30.6416535,19.1141006 C32.5063271,20.7354087 31.497377,22.5479106 30.3093446,22.693748 C29.1260044,22.8387382 27.7969155,20.0270054 25.187565,19.9847394 C22.4980576,19.941676 20.6803539,22.8387382 24.000559,23.6622764 C27.3224748,24.4849175 30.8798758,24.8228956 32.1609683,27.9196246 C33.4429406,31.0166527 30.1690701,34.305622 26.5147477,34.4997563 C22.8634067,34.6936913 21.1547457,33.8699039 19.5894873,32.3719545 C17.8414321,30.6988605 18.5436356,28.7905625 19.9677886,28.6935701 Z M19.9677886,28.6935701" })
                )
            )
        ),
        soundcloud: React.createElement(
            Fragment,
            null,
            React.createElement(
                "g",
                { fill: "none", "fill-rule": "evenodd", stroke: "none", "stroke-width": "1" },
                React.createElement(
                    "g",
                    { fill: "currentColor" },
                    React.createElement("path", { d: "M25,0 C11.1928806,0 0,11.1928806 0,25 C0,38.8071194 11.1928806,50 25,50 C38.8071194,50 50,38.8071194 50,25 C50,11.1928806 38.8071194,0 25,0 Z M25,3 C12.8497349,3 3,12.8497349 3,25 C3,37.1502651 12.8497349,47 25,47 C37.1502651,47 47,37.1502651 47,25 C47,12.8497349 37.1502651,3 25,3 Z M11.2046957,26.4994198 L11,28.2899843 L11.2046957,30.0498224 C11.2122973,30.1238678 11.258563,30.1755611 11.3170241,30.1755611 C11.3736257,30.1755611 11.4197274,30.1243715 11.4286961,30.0505779 L11.6713997,28.2899843 L11.4286961,26.4989161 C11.4200555,26.4251226 11.3733523,26.3731145 11.3170241,26.3731145 C11.2586177,26.3731145 11.2122426,26.4251226 11.2046957,26.4994198 Z M12.8503005,25.3946571 C12.8503005,25.3952867 12.5750031,28.2897324 12.5750031,28.2897324 L12.8503005,31.1207736 C12.8580661,31.1967079 12.9071756,31.2514864 12.9668398,31.2514864 C13.0253555,31.2514864 13.0733712,31.1979672 13.0829963,31.1215921 L13.3961375,28.2897324 L13.0833791,25.3946571 C13.0737541,25.3177153 13.0258477,25.2645739 12.9668398,25.2645739 C12.9075037,25.2645739 12.8583943,25.3194783 12.8503005,25.3946571 Z M14.396866,24.761745 L14.1500608,28.2908658 L14.396866,31.7053294 C14.4034832,31.8110456 14.4745771,31.8908837 14.5613116,31.8908837 C14.6470618,31.8908837 14.7178823,31.8109197 14.7254838,31.7053294 L15.0061953,28.2908658 L14.7254838,24.7609894 C14.7179369,24.6552103 14.6471712,24.5753722 14.5613116,24.5753722 C14.4745771,24.5753722 14.403866,24.6552732 14.396866,24.761745 Z M15.9578691,25.0172521 L15.7251733,28.2909287 L15.9578691,31.7335372 C15.9645956,31.8549944 16.0449317,31.9468586 16.1461038,31.9468586 C16.2457993,31.9468586 16.3264635,31.8549314 16.3339557,31.733852 L16.5983703,28.2909287 L16.3339557,25.0157409 C16.3268463,24.8947875 16.2460727,24.8036159 16.1461038,24.8036159 C16.044877,24.8036159 15.9642128,24.8955431 15.9578691,25.0172521 Z M17.5195284,22.9658916 L17.3001764,28.292251 L17.5195284,31.7345446 C17.5252159,31.8690983 17.6326223,31.9751293 17.7456069,31.9751293 C17.85799,31.9751293 17.972123,31.8685946 17.972123,31.7337261 L18.205475,28.292251 L17.950412,22.9658916 C17.9436307,22.8306454 17.8434977,22.7241106 17.7311147,22.7241106 C17.6182395,22.7241106 17.5248877,22.8305824 17.5195284,22.9658916 Z M19.0799298,21.7485496 C19.0799298,21.7489903 18.8752888,28.2933213 18.8752888,28.2933213 L19.0803673,31.7138925 C19.085508,31.8633686 19.1890863,31.9816775 19.3161256,31.9816775 C19.4420165,31.9816775 19.5458683,31.8633686 19.5518839,31.7126332 L19.7832125,28.2933213 L19.5518839,21.7485496 C19.5455948,21.5974994 19.4419618,21.4795682 19.3160709,21.4795682 C19.1890863,21.4795682 19.085508,21.5977513 19.0799298,21.7485496 Z M20.6267141,20.9640207 L20.4502919,28.2940139 L20.6269329,31.6585473 C20.6312532,31.8388756 20.7830113,31.9814257 20.9374491,31.9814257 C21.0916135,31.9814257 21.2481294,31.8388756 21.2481294,31.657477 L21.4195204,28.2942028 L21.2073871,20.9639577 C21.2024652,20.7820553 21.064215,20.6391905 20.9103787,20.6391905 C20.7556128,20.6391905 20.6309251,20.7816146 20.6267141,20.9640207 Z M22.1736078,21.4133933 L22.025459,28.2954621 L22.1736078,31.6071059 C22.1771625,31.8179717 22.3266784,31.9846998 22.5091162,31.9846998 C22.6910072,31.9846998 22.8440778,31.8182235 22.8440778,31.6048392 L23.0066094,28.2958399 L22.8385544,21.4128896 C22.8341794,21.1998201 22.6872885,21.032966 22.5053975,21.032966 C22.3232331,21.032966 22.1771625,21.1997571 22.1736078,21.4133933 Z M23.7558296,19.3647403 L23.6005168,28.2972251 L23.7562671,31.5388532 C23.7590015,31.7759119 23.947455,31.9709107 24.1542288,31.9709107 C24.3605652,31.9709107 24.5521358,31.7757859 24.5521358,31.5353272 L24.7023627,28.2972251 L24.5239717,19.3640477 C24.5209639,19.1245334 24.341862,18.9290938 24.1355257,18.9290938 C23.9286971,18.9290938 23.7589468,19.1245334 23.7558296,19.3647403 Z M34.2236391,24.3767843 C33.9495448,20.8031482 31.3466882,18 28.1717992,18 C27.3948523,18 26.641093,18.1759838 25.9723183,18.4738655 C25.7124428,18.589593 25.6441927,18.7089094 25.6441927,18.9399865 L25.6441927,31.5248122 C25.6441927,31.7674747 25.8069977,31.9696515 26.0125684,31.9933888 C26.0213184,31.9945221 35.4956182,32 35.5570323,32 C37.4589032,32 39,30.2245469 39,28.0346031 C39,25.8446593 37.4574267,24.0688914 35.5556651,24.0688914 C35.0838752,24.0688914 34.6335774,24.1788262 34.2236391,24.3767843 Z M34.2236391,24.3767843" })
                )
            )
        ),
        tumblr: React.createElement(
            Fragment,
            null,
            React.createElement(
                "g",
                { fill: "none", "fill-rule": "evenodd", stroke: "none", "stroke-width": "1" },
                React.createElement(
                    "g",
                    { fill: "currentColor" },
                    React.createElement("path", { d: "M25,50 C38.8071194,50 50,38.8071194 50,25 C50,11.1928806 38.8071194,0 25,0 C11.1928806,0 0,11.1928806 0,25 C0,38.8071194 11.1928806,50 25,50 Z M25,47 C37.1502651,47 47,37.1502651 47,25 C47,12.8497349 37.1502651,3 25,3 C12.8497349,3 3,12.8497349 3,25 C3,37.1502651 12.8497349,47 25,47 Z M20.1212122,23.428572 L20.1212122,29.5776397 C20.2888032,34.6055735 23.1493975,35.6536697 26.4848488,36 C28.4239345,35.9068215 30.7994507,35.2128501 32,34.291925 L32,30.807453 C30.4550907,32.2576564 26.3092334,33.6801939 25.5656572,29.5776397 L25.4949496,23.3602485 L32,23.428572 L32,19.2608705 L25.4949496,19.2608705 L25.6363634,14 L23.0202023,14.0683235 C23.2002807,18.5559785 20.7320276,19.156712 18,19.3291926 L18,23.428572 L20.1212122,23.428572 Z M20.1212122,23.428572" })
                )
            )
        ),
        twitter: React.createElement(
            Fragment,
            null,
            React.createElement(
                "g",
                { fill: "none", "fill-rule": "evenodd", stroke: "none", "stroke-width": "1" },
                React.createElement(
                    "g",
                    { fill: "currentColor" },
                    React.createElement("path", { d: "M25,50 C38.8071194,50 50,38.8071194 50,25 C50,11.1928806 38.8071194,0 25,0 C11.1928806,0 0,11.1928806 0,25 C0,38.8071194 11.1928806,50 25,50 Z M25,47 C37.1502651,47 47,37.1502651 47,25 C47,12.8497349 37.1502651,3 25,3 C12.8497349,3 3,12.8497349 3,25 C3,37.1502651 12.8497349,47 25,47 Z M24.6822554,20.5542975 L24.729944,21.3761011 L23.9351333,21.2754721 C21.0420225,20.8897275 18.5145246,19.5815504 16.3685358,17.3844837 L15.3193857,16.2943361 L15.0491501,17.0993681 C14.4768864,18.8939188 14.8424993,20.7890985 16.0347153,22.0637326 C16.6705638,22.7681357 16.5274979,22.8687647 15.4306592,22.4494772 C15.0491501,22.3153051 14.7153296,22.2146761 14.6835371,22.2649907 C14.5722637,22.3823912 14.9537728,23.9085978 15.2558008,24.5123719 C15.6691024,25.350947 16.5116017,26.1727505 17.433582,26.6591241 L18.2124965,27.0448686 L17.2905161,27.0616401 C16.4003282,27.0616401 16.3685358,27.0784116 16.4639131,27.4306131 C16.7818374,28.5207608 18.0376382,29.6779944 19.436505,30.1811394 L20.4220701,30.533341 L19.5636746,31.070029 C18.2919776,31.8415181 16.7977335,32.2775772 15.3034895,32.3111202 C14.5881599,32.3278916 14,32.3949776 14,32.4452922 C14,32.6130071 15.939338,33.5522113 17.0679692,33.9211843 C20.4538626,35.0113319 24.4756046,34.5417298 27.4958851,32.6800932 C29.6418739,31.3551445 31.7878628,28.7220188 32.7893242,26.1727505 C33.3297954,24.8142589 33.8702667,22.3320767 33.8702667,21.1413 C33.8702667,20.369811 33.9179553,20.269182 34.8081432,19.3467494 C35.3327183,18.8100613 35.8255009,18.2230588 35.9208782,18.0553437 C36.0798403,17.7366852 36.0639442,17.7366852 35.2532373,18.0218007 C33.9020591,18.5249458 33.7113045,18.4578598 34.3789455,17.7031422 C34.8717281,17.1664541 35.459888,16.1937071 35.459888,15.9085915 C35.459888,15.858277 35.2214448,15.9421346 34.9512092,16.093078 C34.6650773,16.2607931 34.0292288,16.5123656 33.5523424,16.6633091 L32.6939469,16.9484246 L31.9150324,16.394965 C31.4858346,16.093078 30.8817786,15.757648 30.5638543,15.657019 C29.7531474,15.422218 28.5132428,15.455761 27.7820169,15.724105 C25.7949903,16.4788226 24.5391894,18.4243168 24.6822554,20.5542975 C24.6822554,20.5542975 24.5391894,18.4243168 24.6822554,20.5542975 Z M24.6822554,20.5542975" })
                )
            )
        ),
        vimeo: React.createElement(
            Fragment,
            null,
            React.createElement(
                "g",
                { fill: "none", "fill-rule": "evenodd", stroke: "none", "stroke-width": "1" },
                React.createElement(
                    "g",
                    { fill: "currentColor" },
                    React.createElement("path", { d: "M50,25 C50,11.1928806 38.8071194,0 25,0 C11.1928806,0 0,11.1928806 0,25 C0,38.8071194 11.1928806,50 25,50 C38.8071194,50 50,38.8071194 50,25 Z M47,25 C47,12.8497349 37.1502651,3 25,3 C12.8497349,3 3,12.8497349 3,25 C3,37.1502651 12.8497349,47 25,47 C37.1502651,47 47,37.1502651 47,25 Z M17.315812,20.9060694 C17.9328006,21.6627251 20.2884417,30.7991385 21.0747632,32.4845455 C21.7610734,33.9625783 23.6542105,35.9166045 25.7302773,34.5211721 C27.8051355,33.1256949 34.7049271,27.0158598 35.9400265,19.8005667 C37.1740468,12.5875569 27.6369679,14.0985404 26.6267538,20.382799 C29.1516416,18.8105703 30.4993563,21.0216204 29.2073234,23.5249731 C27.9176213,26.0259082 26.7391965,27.657054 26.1221216,27.657054 C25.5062553,27.657054 25.0324423,25.9834215 24.3267945,23.0582023 C23.5973201,20.0339521 23.6018092,14.5864425 20.5690087,15.204043 C17.7089081,15.7862753 13.95,20.4417609 13.95,20.4417609 L14.8476851,21.6627251 C14.8476851,21.6627251 16.6987803,20.1493241 17.315812,20.9060694 Z M17.315812,20.9060694" })
                )
            )
        ),
        youtube: React.createElement(
            Fragment,
            null,
            React.createElement(
                "g",
                { fill: "none", "fill-rule": "evenodd", stroke: "none", "stroke-width": "1" },
                React.createElement(
                    "g",
                    { fill: "currentColor" },
                    React.createElement("path", { d: "M50,25 C50,11.1928806 38.8071194,0 25,0 C11.1928806,0 0,11.1928806 0,25 C0,38.8071194 11.1928806,50 25,50 C38.8071194,50 50,38.8071194 50,25 Z M47,25 C47,12.8497349 37.1502651,3 25,3 C12.8497349,3 3,12.8497349 3,25 C3,37.1502651 12.8497349,47 25,47 C37.1502651,47 47,37.1502651 47,25 Z M36.768327,30.7654774 C36.4698281,32.0627028 35.4087162,33.0191862 34.1319129,33.1618614 C31.1074781,33.4998058 28.0463955,33.5014844 24.9984613,33.4998058 C21.9508068,33.5014844 18.8894444,33.4998058 15.8652894,33.1618614 C14.5882064,33.0191862 13.5276539,32.0627028 13.2294348,30.7654774 C12.8047662,28.9179732 12.8047662,26.9020564 12.8047662,25.0002798 C12.8047662,23.0982233 12.8098018,21.0820268 13.2341906,19.2345226 C13.5326895,17.9372972 14.5932419,16.980534 15.8700452,16.8381386 C18.89448,16.5001942 21.9555627,16.4985156 25.0034969,16.5001942 C28.0511513,16.4985156 31.1125137,16.5001942 34.1366687,16.8381386 C35.4137518,16.980534 36.4748637,17.9372972 36.7730829,19.2345226 C37.1977514,21.0820268 37.1952336,23.0982233 37.1952336,25.0002798 C37.1952336,26.9020564 37.1927158,28.9179732 36.768327,30.7654774 Z M22.8047662,20.5 L29.5547662,24.3971143 L22.8047662,28.2942286 L22.8047662,20.5 Z M22.8047662,20.5" })
                )
            )
        )
    };

    var AdvSocialBlock = function (_Component) {
        _inherits(AdvSocialBlock, _Component);

        function AdvSocialBlock() {
            _classCallCheck(this, AdvSocialBlock);

            var _this = _possibleConstructorReturn(this, (AdvSocialBlock.__proto__ || Object.getPrototypeOf(AdvSocialBlock)).apply(this, arguments));

            _this.state = {
                currentSelected: 0,
                searchedText: ''
            };
            return _this;
        }

        _createClass(AdvSocialBlock, [{
            key: "componentWillMount",
            value: function componentWillMount() {
                var _props = this.props,
                    attributes = _props.attributes,
                    setAttributes = _props.setAttributes;

                var currentBlockConfig = advgbDefaultConfig['advgb-social-links'];

                // No override attributes of blocks inserted before
                if (attributes.changed !== true) {
                    if (currentBlockConfig !== undefined && (typeof currentBlockConfig === "undefined" ? "undefined" : _typeof(currentBlockConfig)) === 'object') {
                        Object.keys(currentBlockConfig).map(function (attribute) {
                            if (attribute.indexOf('.') === -1) attributes[attribute] = currentBlockConfig[attribute];
                        });

                        // Finally set changed attribute to true, so we don't modify anything again
                        setAttributes({ changed: true });
                    }
                }
            }
        }, {
            key: "render",
            value: function render() {
                var _this2 = this;

                var _props2 = this.props,
                    attributes = _props2.attributes,
                    setAttributes = _props2.setAttributes,
                    isSelected = _props2.isSelected;
                var items = attributes.items,
                    align = attributes.align,
                    iconSize = attributes.iconSize,
                    iconSpace = attributes.iconSpace;
                var _state = this.state,
                    currentSelected = _state.currentSelected,
                    searchedText = _state.searchedText;

                var matchedIcons = Object.keys(ICONS_SET).filter(function (key) {
                    return key.indexOf(searchedText.toLowerCase().trim()) > -1;
                });

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
                                            items: [{ icon: '', iconID: '', iconColor: '', link: '#' }]
                                        });
                                    }
                                }
                            })
                        ),
                        React.createElement(AlignmentToolbar, { value: align, onChange: function onChange(value) {
                                return setAttributes({ align: value === undefined ? 'center' : value });
                            } })
                    ),
                    React.createElement(
                        InspectorControls,
                        null,
                        React.createElement(
                            PanelBody,
                            { title: __('Preset Icons') },
                            React.createElement(TextControl, {
                                placeholder: __('Type here to search…'),
                                value: searchedText,
                                onChange: function onChange(value) {
                                    return _this2.setState({ searchedText: value });
                                }
                            }),
                            React.createElement(
                                "div",
                                { className: "advgb-icon-items-wrapper" },
                                matchedIcons.map(function (key, index) {
                                    return React.createElement(
                                        "div",
                                        { className: "advgb-icon-item", key: index },
                                        React.createElement(
                                            Tooltip,
                                            { text: key },
                                            React.createElement(
                                                "span",
                                                { className: key === items[currentSelected].icon ? 'active' : '',
                                                    onClick: function onClick() {
                                                        var newItems = items.map(function (item, index) {
                                                            if (index === currentSelected) {
                                                                item = _extends({}, item, {
                                                                    icon: key,
                                                                    iconID: ''
                                                                });
                                                            }
                                                            return item;
                                                        });

                                                        setAttributes({ items: newItems });
                                                    } },
                                                React.createElement(
                                                    "svg",
                                                    { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 50 50" },
                                                    ICONS_SET[key]
                                                )
                                            )
                                        )
                                    );
                                }),
                                React.createElement(
                                    BaseControl,
                                    { label: __('Custom icon') },
                                    React.createElement(MediaUpload, {
                                        allowedTypes: ["image"],
                                        value: items[currentSelected].iconID,
                                        onSelect: function onSelect(media) {
                                            var newItems = items.map(function (item, index) {
                                                if (index === currentSelected) {
                                                    item = _extends({}, item, {
                                                        icon: media.sizes.thumbnail ? media.sizes.thumbnail.url : media.sizes.full.url,
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
                                                Button,
                                                {
                                                    className: "button button-large",
                                                    onClick: open
                                                },
                                                __('Upload/Choose')
                                            );
                                        }
                                    })
                                )
                            ),
                            React.createElement(PanelColorSettings, {
                                title: __('Preset Icon Color'),
                                initialOpen: false,
                                colorSettings: [{
                                    label: __('Preset Icon Color'),
                                    value: items[currentSelected].iconColor,
                                    onChange: function onChange(value) {
                                        var newItems = items.map(function (item, index) {
                                            if (index === currentSelected) {
                                                item = _extends({}, item, {
                                                    iconColor: value
                                                });
                                            }
                                            return item;
                                        });

                                        setAttributes({ items: newItems });
                                    }
                                }]
                            })
                        ),
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
                                            marginRight: iconSpace + 'px',
                                            color: item.iconColor
                                        }
                                    },
                                    !!item.icon ? item.icon in ICONS_SET ? React.createElement(
                                        "svg",
                                        { width: iconSize - 6, height: iconSize - 6, viewBox: "0 0 50 50" },
                                        ICONS_SET[item.icon]
                                    ) : React.createElement("img", { src: item.icon, alt: __('Social link icon') }) : React.createElement(
                                        "svg",
                                        { width: iconSize - 6, height: iconSize - 6, viewBox: "0 0 24 24" },
                                        socialBlockIconContent
                                    )
                                );
                            })
                        ),
                        isSelected && React.createElement(
                            Fragment,
                            null,
                            React.createElement(
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
                    )
                );
            }
        }]);

        return AdvSocialBlock;
    }(Component);

    registerBlockType('advgb/social-links', {
        title: __('Social Links'),
        description: __('Insert your social link with icon.'),
        icon: {
            src: socialBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined
        },
        category: 'common',
        keywords: [__('social icons'), __('shares'), __('icon link')],
        attributes: {
            items: {
                type: 'array',
                default: [{ icon: '', iconID: '', iconColor: '', link: '#' }, { icon: '', iconID: '', iconColor: '', link: '#' }, { icon: '', iconID: '', iconColor: '', link: '#' }]
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
            },
            changed: {
                type: 'boolean',
                default: false
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
                                    marginRight: iconSpace + 'px',
                                    color: item.iconColor
                                }
                            },
                            !!item.icon ? item.icon in ICONS_SET ? React.createElement(
                                "svg",
                                { width: iconSize - 6, height: iconSize - 6, viewBox: "0 0 50 50" },
                                ICONS_SET[item.icon]
                            ) : React.createElement("img", { src: item.icon, alt: __('Social link icon') }) : React.createElement(
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

/***/ }),

/***/ "./assets/blocks/summary/block.jsx":
/*!*****************************************!*\
  !*** ./assets/blocks/summary/block.jsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function (wpI18n, wpBlocks, wpElement, wpEditor, wpComponents, wpData, wpHooks) {
    var __ = wpI18n.__;
    var Component = wpElement.Component,
        Fragment = wpElement.Fragment;
    var registerBlockType = wpBlocks.registerBlockType,
        getBlockContent = wpBlocks.getBlockContent,
        createBlock = wpBlocks.createBlock;
    var BlockControls = wpEditor.BlockControls,
        InspectorControls = wpEditor.InspectorControls,
        InspectorAdvancedControls = wpEditor.InspectorAdvancedControls,
        PanelColorSettings = wpEditor.PanelColorSettings,
        BlockAlignmentToolbar = wpEditor.BlockAlignmentToolbar;
    var IconButton = wpComponents.IconButton,
        Placeholder = wpComponents.Placeholder,
        Button = wpComponents.Button,
        Toolbar = wpComponents.Toolbar,
        ToggleControl = wpComponents.ToggleControl,
        TextControl = wpComponents.TextControl,
        PanelBody = wpComponents.PanelBody;
    var select = wpData.select,
        dispatch = wpData.dispatch;
    var addFilter = wpHooks.addFilter;


    var summaryBlockIcon = React.createElement(
        "svg",
        { height: "20", viewBox: "2 2 22 22", width: "20", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", { d: "M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z" }),
        React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" })
    );
    var summaryBlockTitle = __('Summary');

    // Add button to insert summary inside table of contents component
    (function () {
        jQuery(window).on('load', function () {
            if (typeof dispatch('core/editor') === 'undefined') {
                return false;
            }

            var $ = jQuery;

            var _dispatch = dispatch('core/editor'),
                insertBlock = _dispatch.insertBlock;

            var summaryBlock = createBlock('advgb/summary');

            $('#editor').find('.table-of-contents').click(function () {
                var allBlocks = select('core/editor').getBlocks();
                var summaryBlockExist = !!allBlocks.filter(function (block) {
                    return block.name === 'advgb/summary';
                }).length;
                setTimeout(function () {
                    var summaryButton = $('<button class="button" style="position: absolute; bottom: 10px; right: 15px">' + __('Insert Summary') + '</button>');

                    $('#editor').find('.table-of-contents__popover').find('.document-outline').append(summaryButton);
                    summaryButton.unbind('click').click(function () {
                        insertBlock(summaryBlock, 0);
                        $('.table-of-contents__popover').hide();
                    });

                    if (summaryBlockExist) {
                        summaryButton.prop('disabled', true);
                    }
                }, 100);
            });
        });
    })();

    // Add notice for user to refresh summary if manually change heading anchor
    addFilter('editor.BlockEdit', 'advgb/addHeadingNotice', function (BlockEdit) {
        return function (props) {
            var isSelected = props.isSelected,
                blockType = props.name,
                attributes = props.attributes;


            return [React.createElement(BlockEdit, _extends({ key: "block-edit-summary" }, props)), isSelected && blockType === 'core/heading' && attributes.nodeName !== 'H1' && React.createElement(
                InspectorAdvancedControls,
                { key: "advgb-summary-controls-hint" },
                React.createElement(
                    "p",
                    { style: { color: 'red', fontStyle: 'italic' } },
                    __('After manually changing the anchor, remember to refresh summary block to make the links work!')
                )
            )];
        };
    });

    var SummaryBlock = function (_Component) {
        _inherits(SummaryBlock, _Component);

        function SummaryBlock() {
            _classCallCheck(this, SummaryBlock);

            var _this = _possibleConstructorReturn(this, (SummaryBlock.__proto__ || Object.getPrototypeOf(SummaryBlock)).apply(this, arguments));

            _this.updateSummary = _this.updateSummary.bind(_this);
            return _this;
        }

        _createClass(SummaryBlock, [{
            key: "componentWillMount",
            value: function componentWillMount() {
                var _props = this.props,
                    attributes = _props.attributes,
                    setAttributes = _props.setAttributes;

                var currentBlockConfig = advgbDefaultConfig['advgb-summary'];

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
                this.updateSummary();
            }
        }, {
            key: "updateSummary",
            value: function updateSummary() {
                var headingDatas = [];
                var headingBlocks = [];
                var allBlocks = select('core/editor').getBlocks();
                var filteredBlocks = allBlocks.filter(function (block) {
                    return block.name === 'core/heading' || block.name === 'core/columns';
                });
                filteredBlocks.map(function (block) {
                    if (block.name === 'core/columns') {
                        SummaryBlock.getHeadingBlocksFromColumns(block, headingBlocks);
                    } else {
                        headingBlocks.push(block);
                    }

                    return block;
                });

                headingBlocks.map(function (heading) {
                    var thisHead = {};
                    thisHead['level'] = parseInt(heading.attributes.level);

                    // We only get heading from h2
                    if (thisHead['level'] > 1) {
                        thisHead['level'] -= 1;
                        thisHead['content'] = heading.attributes.content.length ? getBlockContent(heading).replace(/<(?:.|\n)*?>/gm, '') : '';
                        thisHead['clientId'] = heading.clientId;
                        if (heading.attributes.anchor) {
                            thisHead['anchor'] = heading.attributes.anchor;
                        } else {
                            // Generate a random anchor for headings without it
                            thisHead['anchor'] = 'advgb-toc-' + heading.clientId;
                            heading.attributes.anchor = thisHead['anchor'];
                        }

                        headingDatas.push(thisHead);
                    }

                    return heading;
                });

                this.props.setAttributes({
                    headings: headingDatas
                });
            }
        }, {
            key: "render",
            value: function render() {
                var _props2 = this.props,
                    attributes = _props2.attributes,
                    isSelected = _props2.isSelected,
                    setAttributes = _props2.setAttributes;
                var headings = attributes.headings,
                    loadMinimized = attributes.loadMinimized,
                    anchorColor = attributes.anchorColor,
                    align = attributes.align,
                    headerTitle = attributes.headerTitle;

                // No heading blocks

                var summaryContent = React.createElement(
                    Placeholder,
                    {
                        icon: summaryBlockIcon,
                        label: summaryBlockTitle,
                        instructions: __('Your current post/page has no headings. Try add some headings and update this block later')
                    },
                    React.createElement(
                        Button,
                        { onClick: this.updateSummary,
                            className: 'button'
                        },
                        __('Update')
                    )
                );

                // Having heading blocks
                if (headings.length > 0) {
                    var _dispatch2 = dispatch('core/editor'),
                        selectBlock = _dispatch2.selectBlock;

                    summaryContent = React.createElement(
                        "ul",
                        { className: 'advgb-toc' },
                        headings.map(function (heading) {
                            return React.createElement(
                                "li",
                                { className: 'toc-level-' + heading.level,
                                    style: { marginLeft: heading.level * 20 },
                                    key: heading.anchor
                                },
                                React.createElement(
                                    "a",
                                    { href: '#' + heading.anchor,
                                        onClick: function onClick() {
                                            return selectBlock(heading.clientId);
                                        }
                                    },
                                    heading.content
                                )
                            );
                        })
                    );
                }

                return React.createElement(
                    Fragment,
                    null,
                    !!headings.length && React.createElement(
                        BlockControls,
                        null,
                        React.createElement(BlockAlignmentToolbar, { value: align, onChange: function onChange(align) {
                                return setAttributes({ align: align });
                            } }),
                        React.createElement(
                            Toolbar,
                            null,
                            React.createElement(IconButton, { className: 'components-icon-button components-toolbar__control',
                                icon: 'update',
                                label: __('Update Summary'),
                                onClick: this.updateSummary
                            })
                        )
                    ),
                    React.createElement(
                        InspectorControls,
                        null,
                        React.createElement(
                            PanelBody,
                            { title: __('Summary settings') },
                            React.createElement(ToggleControl, {
                                label: __('Load minimized'),
                                checked: !!loadMinimized,
                                onChange: function onChange() {
                                    return setAttributes({ loadMinimized: !loadMinimized, postTitle: select('core/editor').getEditedPostAttribute('title') });
                                }
                            }),
                            loadMinimized && React.createElement(TextControl, {
                                label: __('Summary header title'),
                                value: headerTitle || '',
                                placeholder: __('Enter header…'),
                                onChange: function onChange(value) {
                                    return setAttributes({ headerTitle: value });
                                }
                            }),
                            React.createElement(PanelColorSettings, {
                                title: __('Anchor Color'),
                                initialOpen: false,
                                colorSettings: [{
                                    label: __('Anchor Color'),
                                    value: anchorColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ anchorColor: value });
                                    }
                                }]
                            })
                        )
                    ),
                    summaryContent,
                    anchorColor && React.createElement(
                        "style",
                        null,
                        ".advgb-toc li a {\n                        color: " + anchorColor + ";\n                    }"
                    )
                );
            }
        }], [{
            key: "getHeadingBlocksFromColumns",


            /**
             * Function to get heading blocks from columns blocks
             *
             * @param block     array Columns block to get data
             * @param storeData array Data array to store heading blocks
             *
             * @returns array   array Heading blocks from block given
             */
            value: function getHeadingBlocksFromColumns(block, storeData) {
                if (block.name === 'core/columns' || block.name === 'core/column') {
                    block.innerBlocks.map(function (bl) {
                        SummaryBlock.getHeadingBlocksFromColumns(bl, storeData);
                        return bl;
                    });
                } else if (block.name === 'core/heading') {
                    storeData.push(block);
                }

                return storeData;
            }
        }]);

        return SummaryBlock;
    }(Component);

    registerBlockType('advgb/summary', {
        title: summaryBlockTitle,
        description: __('Show the table of content of current post/page.'),
        icon: {
            src: summaryBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined
        },
        category: 'formatting',
        keywords: [__('summary'), __('table of content'), __('list')],
        attributes: {
            headings: {
                type: 'array',
                default: []
            },
            loadMinimized: {
                type: 'boolean',
                default: false
            },
            anchorColor: {
                type: 'string'
            },
            align: {
                type: 'string',
                default: 'none'
            },
            postTitle: {
                type: 'string'
            },
            headerTitle: {
                type: 'string'
            },
            changed: {
                type: 'boolean',
                default: false
            }
        },
        supports: {
            multiple: false
        },
        edit: SummaryBlock,
        save: function save(_ref) {
            var attributes = _ref.attributes;
            var headings = attributes.headings,
                loadMinimized = attributes.loadMinimized,
                anchorColor = attributes.anchorColor,
                _attributes$align = attributes.align,
                align = _attributes$align === undefined ? 'none' : _attributes$align,
                postTitle = attributes.postTitle,
                headerTitle = attributes.headerTitle;
            // No heading blocks

            if (headings.length < 1) {
                return null;
            }

            var blockStyle = undefined;
            if (loadMinimized) blockStyle = { display: 'none' };

            var summary = React.createElement(
                "ul",
                { className: "advgb-toc align" + align, style: blockStyle },
                headings.map(function (heading, index) {
                    return React.createElement(
                        "li",
                        { className: 'toc-level-' + heading.level,
                            key: "summary-save-" + index,
                            style: { marginLeft: heading.level * 20 }
                        },
                        React.createElement(
                            "a",
                            { href: '#' + heading.anchor },
                            heading.content
                        )
                    );
                }),
                anchorColor && React.createElement(
                    "style",
                    null,
                    ".advgb-toc li a {\n                            color: " + anchorColor + ";\n                        }"
                )
            );

            if (loadMinimized) {
                return React.createElement(
                    "div",
                    { className: "align" + align },
                    React.createElement(
                        "div",
                        { className: 'advgb-toc-header collapsed' },
                        headerTitle || postTitle
                    ),
                    summary
                );
            }

            return summary;
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
})(wp.i18n, wp.blocks, wp.element, wp.editor, wp.components, wp.data, wp.hooks);

/***/ }),

/***/ "./assets/blocks/tabs/block.jsx":
/*!**************************************!*\
  !*** ./assets/blocks/tabs/block.jsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
        PanelColorSettings = wpEditor.PanelColorSettings;
    var Dashicon = wpComponents.Dashicon,
        Tooltip = wpComponents.Tooltip,
        PanelBody = wpComponents.PanelBody,
        RangeControl = wpComponents.RangeControl,
        SelectControl = wpComponents.SelectControl;

    var AdvTabsBlock = function (_Component) {
        _inherits(AdvTabsBlock, _Component);

        function AdvTabsBlock() {
            _classCallCheck(this, AdvTabsBlock);

            return _possibleConstructorReturn(this, (AdvTabsBlock.__proto__ || Object.getPrototypeOf(AdvTabsBlock)).apply(this, arguments));
        }

        _createClass(AdvTabsBlock, [{
            key: 'componentWillMount',
            value: function componentWillMount() {
                var _props = this.props,
                    attributes = _props.attributes,
                    setAttributes = _props.setAttributes;

                var currentBlockConfig = advgbDefaultConfig['advgb-tabs'];

                // No override attributes of blocks inserted before
                if (attributes.changed !== true) {
                    if (currentBlockConfig !== undefined && (typeof currentBlockConfig === 'undefined' ? 'undefined' : _typeof(currentBlockConfig)) === 'object') {
                        Object.keys(currentBlockConfig).map(function (attribute) {
                            attributes[attribute] = currentBlockConfig[attribute];
                        });

                        // Finally set changed attribute to true, so we don't modify anything again
                        setAttributes({ changed: true });
                    }
                }
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _this2 = this;

                setTimeout(function () {
                    return _this2.initTabs();
                }, 100);
                if (!this.props.attributes.blockID) {
                    this.props.setAttributes({ blockID: this.props.clientId });
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
                        jQuery('#block-' + this.props.clientId + ' .advgb-tabs-block').tabs();
                    } else {
                        jQuery('#block-' + this.props.clientId + ' .advgb-tabs-block').tabs('refresh');
                    }

                    jQuery('#block-' + this.props.clientId + ' .advgb-tabs-block a').on('keydown', function (e) {
                        e.stopPropagation();
                    });
                }
            }
        }, {
            key: 'updateTabs',
            value: function updateTabs(value, index) {
                var _props2 = this.props,
                    attributes = _props2.attributes,
                    setAttributes = _props2.setAttributes;
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
                var _this3 = this;

                var _props3 = this.props,
                    attributes = _props3.attributes,
                    setAttributes = _props3.setAttributes,
                    clientId = _props3.clientId;
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
                        React.createElement(PanelColorSettings, {
                            title: __('Tab Colors'),
                            initialOpen: false,
                            colorSettings: [{
                                label: __('Background Color'),
                                value: headerBgColor,
                                onChange: function onChange(value) {
                                    return setAttributes({ headerBgColor: value === undefined ? '#000' : value });
                                }
                            }, {
                                label: __('Text Color'),
                                value: headerTextColor,
                                onChange: function onChange(value) {
                                    return setAttributes({ headerTextColor: value === undefined ? '#fff' : value });
                                }
                            }, {
                                label: __('Active Tab Background Color'),
                                value: activeTabBgColor,
                                onChange: function onChange(value) {
                                    return setAttributes({ activeTabBgColor: value });
                                }
                            }, {
                                label: __('Active Tab Text Color'),
                                value: activeTabTextColor,
                                onChange: function onChange(value) {
                                    return setAttributes({ activeTabTextColor: value });
                                }
                            }]
                        }),
                        React.createElement(PanelColorSettings, {
                            title: __('Body Colors'),
                            initialOpen: false,
                            colorSettings: [{
                                label: __('Background Color'),
                                value: bodyBgColor,
                                onChange: function onChange(value) {
                                    return setAttributes({ bodyBgColor: value });
                                }
                            }, {
                                label: __('Text Color'),
                                value: bodyTextColor,
                                onChange: function onChange(value) {
                                    return setAttributes({ bodyTextColor: value });
                                }
                            }]
                        }),
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
                            React.createElement(PanelColorSettings, {
                                title: __('Border Color'),
                                initialOpen: false,
                                colorSettings: [{
                                    label: __('Border Color'),
                                    value: borderColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ borderColor: value });
                                    }
                                }]
                            }),
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
                            { className: 'advgb-tabs-panel' },
                            tabItems.map(function (item, index) {
                                return React.createElement(
                                    'li',
                                    { key: index,
                                        className: 'advgb-tab',
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
                                        { href: '#advgb-tab-' + blockID + '-' + index,
                                            style: { color: headerTextColor }
                                        },
                                        React.createElement(RichText, {
                                            tagName: 'p',
                                            value: item.header,
                                            onChange: function onChange(value) {
                                                return _this3.updateTabs({ header: value || '' }, index);
                                            },
                                            unstableOnSplit: function unstableOnSplit() {
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
                                    id: 'advgb-tab-' + blockID + '-' + index,
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
                                        return _this3.updateTabs({ body: value }, index);
                                    },
                                    placeholder: __('Enter text…')
                                })
                            );
                        })
                    ),
                    !!blockID && React.createElement(
                        'style',
                        null,
                        activeTabBgColor && '#block-' + clientId + ' li.advgb-tab.ui-tabs-active {\n                                background-color: ' + activeTabBgColor + ' !important;\n                            }',
                        activeTabTextColor && '#block-' + clientId + ' li.advgb-tab.ui-tabs-active a {\n                                color: ' + activeTabTextColor + ' !important;\n                            }'
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

    var tabBlockAttrs = {
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
        },
        changed: {
            type: 'boolean',
            default: false
        }
    };

    registerBlockType('advgb/tabs', {
        title: __('Tabs'),
        description: __('Create your own tabs never easy like this.'),
        icon: {
            src: tabsBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined
        },
        category: "formatting",
        keywords: [__('tabs'), __('cards')],
        attributes: tabBlockAttrs,
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
                    { className: 'advgb-tabs-panel' },
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
                                { href: '#advgb-tab-' + blockID + '-' + index,
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
                            id: 'advgb-tab-' + blockID + '-' + index,
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
        },
        deprecated: [{
            attributes: tabBlockAttrs,
            save: function save(_ref2) {
                var attributes = _ref2.attributes;
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
                        { className: 'advgb-tabs-panel' },
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
        }]
    });
})(wp.i18n, wp.blocks, wp.element, wp.editor, wp.components);

/***/ }),

/***/ "./assets/blocks/testimonial/block.jsx":
/*!*********************************************!*\
  !*** ./assets/blocks/testimonial/block.jsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
        RichText = wpEditor.RichText,
        PanelColorSettings = wpEditor.PanelColorSettings,
        MediaUpload = wpEditor.MediaUpload;
    var RangeControl = wpComponents.RangeControl,
        PanelBody = wpComponents.PanelBody,
        Tooltip = wpComponents.Tooltip;

    var AdvTestimonial = function (_Component) {
        _inherits(AdvTestimonial, _Component);

        function AdvTestimonial() {
            _classCallCheck(this, AdvTestimonial);

            var _this = _possibleConstructorReturn(this, (AdvTestimonial.__proto__ || Object.getPrototypeOf(AdvTestimonial)).apply(this, arguments));

            _this.state = {
                currentEdit: ''
            };
            return _this;
        }

        _createClass(AdvTestimonial, [{
            key: 'componentWillMount',
            value: function componentWillMount() {
                var _props = this.props,
                    attributes = _props.attributes,
                    setAttributes = _props.setAttributes;

                var currentBlockConfig = advgbDefaultConfig['advgb-testimonial'];

                // No override attributes of blocks inserted before
                if (attributes.changed !== true) {
                    if (currentBlockConfig !== undefined && (typeof currentBlockConfig === 'undefined' ? 'undefined' : _typeof(currentBlockConfig)) === 'object') {
                        Object.keys(currentBlockConfig).map(function (attribute) {
                            attributes[attribute] = currentBlockConfig[attribute];
                        });

                        // Finally set changed attribute to true, so we don't modify anything again
                        setAttributes({ changed: true });
                    }
                }
            }
        }, {
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
                var _props2 = this.props,
                    attributes = _props2.attributes,
                    setAttributes = _props2.setAttributes,
                    isSelected = _props2.isSelected;
                var avatarUrl = attributes.avatarUrl,
                    avatarID = attributes.avatarID,
                    avatarUrl2 = attributes.avatarUrl2,
                    avatarID2 = attributes.avatarID2,
                    avatarUrl3 = attributes.avatarUrl3,
                    avatarID3 = attributes.avatarID3,
                    avatarColor = attributes.avatarColor,
                    avatarBorderRadius = attributes.avatarBorderRadius,
                    avatarBorderWidth = attributes.avatarBorderWidth,
                    avatarBorderColor = attributes.avatarBorderColor,
                    avatarSize = attributes.avatarSize,
                    name = attributes.name,
                    name2 = attributes.name2,
                    name3 = attributes.name3,
                    nameColor = attributes.nameColor,
                    position = attributes.position,
                    position2 = attributes.position2,
                    position3 = attributes.position3,
                    positionColor = attributes.positionColor,
                    desc = attributes.desc,
                    desc2 = attributes.desc2,
                    desc3 = attributes.desc3,
                    descColor = attributes.descColor,
                    columns = attributes.columns;


                return React.createElement(
                    Fragment,
                    null,
                    React.createElement(
                        InspectorControls,
                        null,
                        React.createElement(
                            PanelBody,
                            { title: __('Testimonial Settings') },
                            React.createElement(RangeControl, {
                                label: __('Columns'),
                                min: 1,
                                max: 3,
                                value: columns,
                                onChange: function onChange(value) {
                                    return setAttributes({ columns: value });
                                }
                            }),
                            React.createElement(
                                PanelBody,
                                { title: __('Avatar'), initialOpen: false },
                                React.createElement(PanelColorSettings, {
                                    title: __('Avatar Colors'),
                                    initialOpen: false,
                                    colorSettings: [{
                                        label: __('Background Color'),
                                        value: avatarColor,
                                        onChange: function onChange(value) {
                                            return setAttributes({ avatarColor: value });
                                        }
                                    }, {
                                        label: __('Border Color'),
                                        value: avatarBorderColor,
                                        onChange: function onChange(value) {
                                            return setAttributes({ avatarBorderColor: value });
                                        }
                                    }]
                                }),
                                React.createElement(RangeControl, {
                                    label: __('Border Radius (%)'),
                                    min: 0,
                                    max: 50,
                                    value: avatarBorderRadius,
                                    onChange: function onChange(value) {
                                        return setAttributes({ avatarBorderRadius: value });
                                    }
                                }),
                                React.createElement(RangeControl, {
                                    label: __('Border Width'),
                                    min: 0,
                                    max: 5,
                                    value: avatarBorderWidth,
                                    onChange: function onChange(value) {
                                        return setAttributes({ avatarBorderWidth: value });
                                    }
                                }),
                                React.createElement(RangeControl, {
                                    label: __('Avatar Size'),
                                    min: 50,
                                    max: 130,
                                    value: avatarSize,
                                    onChange: function onChange(value) {
                                        return setAttributes({ avatarSize: value });
                                    }
                                })
                            ),
                            React.createElement(PanelColorSettings, {
                                title: __('Text Colors'),
                                initialOpen: false,
                                colorSettings: [{
                                    label: __('Name Color'),
                                    value: nameColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ nameColor: value });
                                    }
                                }, {
                                    label: __('Position Color'),
                                    value: positionColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ positionColor: value });
                                    }
                                }, {
                                    label: __('Description Color'),
                                    value: descColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ descColor: value });
                                    }
                                }]
                            })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'advgb-testimonial advgb-column-' + columns },
                        React.createElement(
                            'div',
                            { className: 'advgb-testimonial-columns-one' },
                            React.createElement(MediaUpload, {
                                allowedTypes: ["image"],
                                onSelect: function onSelect(media) {
                                    return setAttributes({ avatarUrl: media.sizes.thumbnail.url, avatarID: media.id });
                                },
                                value: avatarID,
                                render: function render(_ref) {
                                    var open = _ref.open;
                                    return React.createElement(
                                        'div',
                                        { className: 'advgb-testimonial-avatar-group' },
                                        React.createElement(
                                            Tooltip,
                                            { text: __('Click to change avatar') },
                                            React.createElement('div', { className: 'advgb-testimonial-avatar',
                                                onClick: open,
                                                style: {
                                                    backgroundImage: 'url(' + (avatarUrl ? avatarUrl : advgbAvatar.holder) + ')',
                                                    backgroundColor: avatarColor,
                                                    borderRadius: avatarBorderRadius + '%',
                                                    borderWidth: avatarBorderWidth + 'px',
                                                    borderColor: avatarBorderColor,
                                                    width: avatarSize + 'px',
                                                    height: avatarSize + 'px'
                                                }
                                            })
                                        ),
                                        React.createElement(
                                            Tooltip,
                                            { text: __('Remove avatar') },
                                            React.createElement('span', { className: 'dashicons dashicons-no advgb-testimonial-avatar-clear',
                                                onClick: function onClick() {
                                                    return setAttributes({ avatarUrl: undefined, avatarID: undefined });
                                                }
                                            })
                                        )
                                    );
                                }
                            }),
                            React.createElement(RichText, {
                                tagName: 'h4',
                                className: 'advgb-testimonial-name',
                                value: name,
                                onChange: function onChange(value) {
                                    return setAttributes({ name: value });
                                },
                                isSelected: isSelected && currentEdit === 'name',
                                unstableOnSetup: function unstableOnSetup(editor) {
                                    return _this3.handleSetup(editor, 'name');
                                },
                                style: { color: nameColor },
                                placeholder: __('Text…')
                            }),
                            React.createElement(RichText, {
                                tagName: 'p',
                                className: 'advgb-testimonial-position',
                                value: position,
                                onChange: function onChange(value) {
                                    return setAttributes({ position: value });
                                },
                                isSelected: isSelected && currentEdit === 'position',
                                unstableOnSetup: function unstableOnSetup(editor) {
                                    return _this3.handleSetup(editor, 'position');
                                },
                                style: { color: positionColor },
                                placeholder: __('Text…')
                            }),
                            React.createElement(RichText, {
                                tagName: 'p',
                                className: 'advgb-testimonial-desc',
                                value: desc,
                                onChange: function onChange(value) {
                                    return setAttributes({ desc: value });
                                },
                                isSelected: isSelected && currentEdit === 'desc',
                                unstableOnSetup: function unstableOnSetup(editor) {
                                    return _this3.handleSetup(editor, 'desc');
                                },
                                style: { color: descColor },
                                placeholder: __('Text…')
                            })
                        ),
                        React.createElement(
                            'div',
                            { className: 'advgb-testimonial-columns-two' },
                            React.createElement(MediaUpload, {
                                allowedTypes: ["image"],
                                onSelect: function onSelect(media) {
                                    return setAttributes({ avatarUrl2: media.sizes.thumbnail.url, avatarID2: media.id });
                                },
                                value: avatarID2,
                                render: function render(_ref2) {
                                    var open = _ref2.open;
                                    return React.createElement(
                                        'div',
                                        { className: 'advgb-testimonial-avatar-group' },
                                        React.createElement(
                                            Tooltip,
                                            { text: __('Click to change avatar') },
                                            React.createElement('div', { className: 'advgb-testimonial-avatar',
                                                onClick: open,
                                                style: {
                                                    backgroundImage: 'url(' + (avatarUrl2 ? avatarUrl2 : advgbAvatar.holder) + ')',
                                                    backgroundColor: avatarColor,
                                                    borderRadius: avatarBorderRadius + '%',
                                                    borderWidth: avatarBorderWidth + 'px',
                                                    borderColor: avatarBorderColor,
                                                    width: avatarSize + 'px',
                                                    height: avatarSize + 'px'
                                                }
                                            })
                                        ),
                                        React.createElement(
                                            Tooltip,
                                            { text: __('Remove avatar') },
                                            React.createElement('span', { className: 'dashicons dashicons-no advgb-testimonial-avatar-clear',
                                                onClick: function onClick() {
                                                    return setAttributes({ avatarUrl2: undefined, avatarID2: undefined });
                                                }
                                            })
                                        )
                                    );
                                }
                            }),
                            React.createElement(RichText, {
                                tagName: 'h4',
                                className: 'advgb-testimonial-name',
                                value: name2,
                                onChange: function onChange(value) {
                                    return setAttributes({ name2: value });
                                },
                                isSelected: isSelected && currentEdit === 'name2',
                                unstableOnSetup: function unstableOnSetup(editor) {
                                    return _this3.handleSetup(editor, 'name2');
                                },
                                style: { color: nameColor },
                                placeholder: __('Text…')
                            }),
                            React.createElement(RichText, {
                                tagName: 'p',
                                className: 'advgb-testimonial-position',
                                value: position2,
                                onChange: function onChange(value) {
                                    return setAttributes({ position2: value });
                                },
                                isSelected: isSelected && currentEdit === 'position2',
                                unstableOnSetup: function unstableOnSetup(editor) {
                                    return _this3.handleSetup(editor, 'position2');
                                },
                                style: { color: positionColor },
                                placeholder: __('Text…')
                            }),
                            React.createElement(RichText, {
                                tagName: 'p',
                                className: 'advgb-testimonial-desc',
                                value: desc2,
                                onChange: function onChange(value) {
                                    return setAttributes({ desc2: value });
                                },
                                isSelected: isSelected && currentEdit === 'desc2',
                                unstableOnSetup: function unstableOnSetup(editor) {
                                    return _this3.handleSetup(editor, 'desc2');
                                },
                                style: { color: descColor },
                                placeholder: __('Text…')
                            })
                        ),
                        React.createElement(
                            'div',
                            { className: 'advgb-testimonial-columns-three' },
                            React.createElement(MediaUpload, {
                                allowedTypes: ["image"],
                                onSelect: function onSelect(media) {
                                    return setAttributes({ avatarUrl3: media.sizes.thumbnail.url, avatarID3: media.id });
                                },
                                value: avatarID3,
                                render: function render(_ref3) {
                                    var open = _ref3.open;
                                    return React.createElement(
                                        'div',
                                        { className: 'advgb-testimonial-avatar-group' },
                                        React.createElement(
                                            Tooltip,
                                            { text: __('Click to change avatar') },
                                            React.createElement('div', { className: 'advgb-testimonial-avatar',
                                                onClick: open,
                                                style: {
                                                    backgroundImage: 'url(' + (avatarUrl3 ? avatarUrl3 : advgbAvatar.holder) + ')',
                                                    backgroundColor: avatarColor,
                                                    borderRadius: avatarBorderRadius + '%',
                                                    borderWidth: avatarBorderWidth + 'px',
                                                    borderColor: avatarBorderColor,
                                                    width: avatarSize + 'px',
                                                    height: avatarSize + 'px'
                                                }
                                            })
                                        ),
                                        React.createElement(
                                            Tooltip,
                                            { text: __('Remove avatar') },
                                            React.createElement('span', { className: 'dashicons dashicons-no advgb-testimonial-avatar-clear',
                                                onClick: function onClick() {
                                                    return setAttributes({ avatarUrl3: undefined, avatarID3: undefined });
                                                }
                                            })
                                        )
                                    );
                                }
                            }),
                            React.createElement(RichText, {
                                tagName: 'h4',
                                className: 'advgb-testimonial-name',
                                value: name3,
                                onChange: function onChange(value) {
                                    return setAttributes({ name3: value });
                                },
                                isSelected: isSelected && currentEdit === 'name3',
                                onSetup: function onSetup(editor) {
                                    return _this3.handleSetup(editor, 'name3');
                                },
                                style: { color: nameColor },
                                placeholder: __('Text…')
                            }),
                            React.createElement(RichText, {
                                tagName: 'p',
                                className: 'advgb-testimonial-position',
                                value: position3,
                                onChange: function onChange(value) {
                                    return setAttributes({ position3: value });
                                },
                                isSelected: isSelected && currentEdit === 'position3',
                                onSetup: function onSetup(editor) {
                                    return _this3.handleSetup(editor, 'position3');
                                },
                                style: { color: positionColor },
                                placeholder: __('Text…')
                            }),
                            React.createElement(RichText, {
                                tagName: 'p',
                                className: 'advgb-testimonial-desc',
                                value: desc3,
                                onChange: function onChange(value) {
                                    return setAttributes({ desc3: value });
                                },
                                isSelected: isSelected && currentEdit === 'desc3',
                                onSetup: function onSetup(editor) {
                                    return _this3.handleSetup(editor, 'desc3');
                                },
                                style: { color: descColor },
                                placeholder: __('Text…')
                            })
                        )
                    )
                );
            }
        }]);

        return AdvTestimonial;
    }(Component);

    function AdvTestimonialSave(_ref4) {
        var attributes = _ref4.attributes;
        var avatarUrl = attributes.avatarUrl,
            avatarUrl2 = attributes.avatarUrl2,
            avatarUrl3 = attributes.avatarUrl3,
            avatarColor = attributes.avatarColor,
            avatarBorderRadius = attributes.avatarBorderRadius,
            avatarBorderWidth = attributes.avatarBorderWidth,
            avatarBorderColor = attributes.avatarBorderColor,
            avatarSize = attributes.avatarSize,
            name = attributes.name,
            name2 = attributes.name2,
            name3 = attributes.name3,
            nameColor = attributes.nameColor,
            position = attributes.position,
            position2 = attributes.position2,
            position3 = attributes.position3,
            positionColor = attributes.positionColor,
            desc = attributes.desc,
            desc2 = attributes.desc2,
            desc3 = attributes.desc3,
            descColor = attributes.descColor,
            columns = attributes.columns;


        return React.createElement(
            'div',
            { className: 'advgb-testimonial' },
            React.createElement(
                'div',
                { className: 'advgb-testimonial-columns-one' },
                React.createElement(
                    'div',
                    { className: 'advgb-testimonial-avatar-group' },
                    React.createElement('div', { className: 'advgb-testimonial-avatar',
                        style: {
                            backgroundImage: 'url(' + (avatarUrl ? avatarUrl : advgbAvatar.holder) + ')',
                            backgroundColor: avatarColor,
                            borderRadius: avatarBorderRadius + '%',
                            borderWidth: avatarBorderWidth + 'px',
                            borderColor: avatarBorderColor,
                            width: avatarSize + 'px',
                            height: avatarSize + 'px'
                        }
                    })
                ),
                React.createElement(
                    'h4',
                    { className: 'advgb-testimonial-name',
                        style: { color: nameColor }
                    },
                    name
                ),
                React.createElement(
                    'p',
                    { className: 'advgb-testimonial-position',
                        style: { color: positionColor }
                    },
                    position
                ),
                React.createElement(
                    'p',
                    { className: 'advgb-testimonial-desc',
                        style: { color: descColor }
                    },
                    desc
                )
            ),
            parseInt(columns) > 1 && React.createElement(
                'div',
                { className: 'advgb-testimonial-columns-two' },
                React.createElement(
                    'div',
                    { className: 'advgb-testimonial-avatar-group' },
                    React.createElement('div', { className: 'advgb-testimonial-avatar',
                        style: {
                            backgroundImage: 'url(' + (avatarUrl2 ? avatarUrl2 : advgbAvatar.holder) + ')',
                            backgroundColor: avatarColor,
                            borderRadius: avatarBorderRadius + '%',
                            borderWidth: avatarBorderWidth + 'px',
                            borderColor: avatarBorderColor,
                            width: avatarSize + 'px',
                            height: avatarSize + 'px'
                        }
                    })
                ),
                React.createElement(
                    'h4',
                    { className: 'advgb-testimonial-name',
                        style: { color: nameColor }
                    },
                    name2
                ),
                React.createElement(
                    'p',
                    { className: 'advgb-testimonial-position',
                        style: { color: positionColor }
                    },
                    position2
                ),
                React.createElement(
                    'p',
                    { className: 'advgb-testimonial-desc',
                        style: { color: descColor }
                    },
                    desc2
                )
            ),
            parseInt(columns) > 2 && React.createElement(
                'div',
                { className: 'advgb-testimonial-columns-two' },
                React.createElement(
                    'div',
                    { className: 'advgb-testimonial-avatar-group' },
                    React.createElement('div', { className: 'advgb-testimonial-avatar',
                        style: {
                            backgroundImage: 'url(' + (avatarUrl3 ? avatarUrl3 : advgbAvatar.holder) + ')',
                            backgroundColor: avatarColor,
                            borderRadius: avatarBorderRadius + '%',
                            borderWidth: avatarBorderWidth + 'px',
                            borderColor: avatarBorderColor,
                            width: avatarSize + 'px',
                            height: avatarSize + 'px'
                        }
                    })
                ),
                React.createElement(
                    'h4',
                    { className: 'advgb-testimonial-name',
                        style: { color: nameColor }
                    },
                    name3
                ),
                React.createElement(
                    'p',
                    { className: 'advgb-testimonial-position',
                        style: { color: positionColor }
                    },
                    position3
                ),
                React.createElement(
                    'p',
                    { className: 'advgb-testimonial-desc',
                        style: { color: descColor }
                    },
                    desc3
                )
            )
        );
    }

    var testimonialBlockIcon = React.createElement(
        'svg',
        { height: '20', viewBox: '2 2 22 22', width: '20', xmlns: 'http://www.w3.org/2000/svg' },
        React.createElement('path', { d: 'M19 2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 3.3c1.49 0 2.7 1.21 2.7 2.7 0 1.49-1.21 2.7-2.7 2.7-1.49 0-2.7-1.21-2.7-2.7 0-1.49 1.21-2.7 2.7-2.7zM18 16H6v-.9c0-2 4-3.1 6-3.1s6 1.1 6 3.1v.9z' }),
        React.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
    );

    registerBlockType('advgb/testimonial', {
        title: __('Testimonial'),
        description: __('Block for creating personal or team/group information.'),
        icon: {
            src: testimonialBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined
        },
        category: 'common',
        keywords: [__('testimonial'), __('personal'), __('about')],
        attributes: {
            avatarUrl: {
                type: 'string',
                default: advgbAvatar.holder
            },
            avatarID: {
                type: 'number'
            },
            avatarUrl2: {
                type: 'string',
                default: advgbAvatar.holder
            },
            avatarID2: {
                type: 'number'
            },
            avatarUrl3: {
                type: 'string',
                default: advgbAvatar.holder
            },
            avatarID3: {
                type: 'number'
            },
            avatarColor: {
                type: 'string'
            },
            avatarBorderRadius: {
                type: 'number',
                default: 50
            },
            avatarBorderWidth: {
                type: 'number'
            },
            avatarBorderColor: {
                type: 'string'
            },
            avatarSize: {
                type: 'number',
                default: 70
            },
            name: {
                type: 'string',
                default: __('Person Name')
            },
            name2: {
                type: 'string',
                default: __('Person Name')
            },
            name3: {
                type: 'string',
                default: __('Person Name')
            },
            nameColor: {
                type: 'string'
            },
            position: {
                type: 'string',
                default: __('Job Position')
            },
            position2: {
                type: 'string',
                default: __('Job Position')
            },
            position3: {
                type: 'string',
                default: __('Job Position')
            },
            positionColor: {
                type: 'string'
            },
            desc: {
                type: 'string',
                default: __('A little description about this person will show up here.')
            },
            desc2: {
                type: 'string',
                default: __('A little description about this person will show up here.')
            },
            desc3: {
                type: 'string',
                default: __('A little description about this person will show up here.')
            },
            descColor: {
                type: 'string'
            },
            columns: {
                type: 'number',
                default: 1
            },
            changed: {
                type: 'boolean',
                default: false
            }
        },
        edit: AdvTestimonial,
        save: AdvTestimonialSave
    });
})(wp.i18n, wp.blocks, wp.element, wp.editor, wp.components);

/***/ }),

/***/ "./assets/blocks/woo-products/block.jsx":
/*!**********************************************!*\
  !*** ./assets/blocks/woo-products/block.jsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
        BlockControls = wpEditor.BlockControls;
    var RangeControl = wpComponents.RangeControl,
        PanelBody = wpComponents.PanelBody,
        CheckboxControl = wpComponents.CheckboxControl,
        SelectControl = wpComponents.SelectControl,
        Spinner = wpComponents.Spinner,
        Toolbar = wpComponents.Toolbar,
        Placeholder = wpComponents.Placeholder,
        Button = wpComponents.Button;


    var fetchingQueue = null;

    var advProductsBlockIcon = React.createElement(
        "svg",
        { width: "20", height: "20", viewBox: "0 0 24 24" },
        React.createElement("path", { fill: "none", d: "M0,0h24v24H0V0z" }),
        React.createElement("path", { d: "M15.55,13c0.75,0,1.41-0.41,1.75-1.03l3.58-6.49C21.25,4.82,20.77,4,20.01,4H5.21L4.27,2H1v2h2l3.6,7.59l-1.35,2.44 C4.52,15.37,5.48,17,7,17h12v-2H7l1.1-2H15.55z M6.16,6h12.15l-2.76,5H8.53L6.16,6z" }),
        React.createElement("path", { d: "M7,18c-1.1,0-1.99,0.9-1.99,2c0,1.1,0.89,2,1.99,2c1.1,0,2-0.9,2-2C9,18.9,8.1,18,7,18z" }),
        React.createElement("path", { d: "M17,18c-1.1,0-1.99,0.9-1.99,2c0,1.1,0.89,2,1.99,2c1.1,0,2-0.9,2-2C19,18.9,18.1,18,17,18z" })
    );

    var AdvProductsEdit = function (_Component) {
        _inherits(AdvProductsEdit, _Component);

        function AdvProductsEdit() {
            _classCallCheck(this, AdvProductsEdit);

            var _this = _possibleConstructorReturn(this, (AdvProductsEdit.__proto__ || Object.getPrototypeOf(AdvProductsEdit)).apply(this, arguments));

            _this.state = {
                categoriesList: [],
                productsList: [],
                loading: true,
                error: false
            };

            _this.fetchProducts = _this.fetchProducts.bind(_this);
            return _this;
        }

        _createClass(AdvProductsEdit, [{
            key: "componentWillMount",
            value: function componentWillMount() {
                this.fetchProducts();
            }
        }, {
            key: "componentWillUpdate",
            value: function componentWillUpdate(nextProps, nextState) {
                var clientId = this.props.clientId;

                var $ = jQuery;

                if (this.checkAttrChanged(nextProps.attributes, this.props.attributes)) {
                    $("#block-" + clientId + " .advgb-products-wrapper.slick-initialized").slick('unslick');
                    $("#block-" + clientId + " .advgb-product").removeAttr('tabindex').removeAttr('role').removeAttr('aria-describedby');
                }
            }
        }, {
            key: "componentDidUpdate",
            value: function componentDidUpdate(prevProps) {
                var _this2 = this;

                var categoriesList = this.state.categoriesList;
                var attributes = this.props.attributes;
                var category = attributes.category;


                if (category === 'selected' && categoriesList.length === 0) {
                    wp.apiFetch({ path: '/wc/v2/products/categories' }).then(function (obj) {
                        _this2.setState({ categoriesList: obj });
                    });
                }

                if (this.checkAttrChanged(prevProps.attributes, attributes)) {
                    this.fetchProducts();
                }
            }
        }, {
            key: "checkAttrChanged",
            value: function checkAttrChanged(prevAttrs, curAttrs) {
                var prevView = prevAttrs.viewType,
                    prevCat = prevAttrs.category,
                    prevCats = prevAttrs.categories,
                    prevStatus = prevAttrs.status,
                    prevOrder = prevAttrs.order,
                    prevOrderBy = prevAttrs.orderBy,
                    prevLength = prevAttrs.numberOfProducts;
                var viewType = curAttrs.viewType,
                    category = curAttrs.category,
                    categories = curAttrs.categories,
                    status = curAttrs.status,
                    order = curAttrs.order,
                    orderBy = curAttrs.orderBy,
                    numberOfProducts = curAttrs.numberOfProducts;


                return category !== prevCat || categories !== prevCats || status !== prevStatus || order !== prevOrder || orderBy !== prevOrderBy || numberOfProducts !== prevLength || prevView !== viewType;
            }
        }, {
            key: "fetchProducts",
            value: function fetchProducts() {
                var self = this;
                var _props$attributes = this.props.attributes,
                    viewType = _props$attributes.viewType,
                    category = _props$attributes.category,
                    categories = _props$attributes.categories,
                    status = _props$attributes.status,
                    order = _props$attributes.order,
                    orderBy = _props$attributes.orderBy,
                    numberOfProducts = _props$attributes.numberOfProducts;
                var addQueryArgs = wp.url.addQueryArgs;

                var query = addQueryArgs('/agwc/v1/products', {
                    order: order || undefined,
                    orderby: orderBy || undefined,
                    per_page: numberOfProducts,
                    category: category === 'selected' ? categories.join(',') : undefined,
                    featured: status === 'featured' ? 1 : undefined,
                    on_sale: status === 'on_sale' ? 1 : undefined
                });

                if (fetchingQueue) {
                    clearTimeout(fetchingQueue);
                }

                if (this.state.error) {
                    this.setState({ error: false });
                }

                fetchingQueue = setTimeout(function () {
                    if (!self.state.loading) {
                        self.setState({ loading: true });
                    }
                    wp.apiFetch({ path: query }).then(function (obj) {
                        self.setState({
                            productsList: obj,
                            loading: false
                        });
                    }).catch(function (error) {
                        self.setState({
                            loading: false,
                            error: true
                        });
                    }).then(function () {
                        if (viewType === 'slider') {
                            $("#block-" + self.props.clientId + " .advgb-products-block.slider-view .advgb-products-wrapper:not(.slick-initialized)").slick({
                                dots: true,
                                adaptiveHeight: true
                            });
                        }
                    });
                }, 500);
            }
        }, {
            key: "setCategories",
            value: function setCategories(catID, willAdd) {
                var _props = this.props,
                    attributes = _props.attributes,
                    setAttributes = _props.setAttributes;
                var categories = attributes.categories;


                if (willAdd) {
                    setAttributes({ categories: [].concat(_toConsumableArray(categories), [catID]) });
                } else {
                    setAttributes({ categories: categories.filter(function (cat) {
                            return cat !== catID;
                        }) });
                }

                this.fetchProducts();
            }
        }, {
            key: "render",
            value: function render() {
                var _this3 = this;

                var _state = this.state,
                    categoriesList = _state.categoriesList,
                    productsList = _state.productsList,
                    loading = _state.loading,
                    error = _state.error;
                var _props2 = this.props,
                    attributes = _props2.attributes,
                    setAttributes = _props2.setAttributes;
                var viewType = attributes.viewType,
                    category = attributes.category,
                    categories = attributes.categories,
                    status = attributes.status,
                    order = attributes.order,
                    orderBy = attributes.orderBy,
                    numberOfProducts = attributes.numberOfProducts,
                    columns = attributes.columns;


                var viewControls = [{
                    icon: 'grid-view',
                    title: __('Normal View'),
                    onClick: function onClick() {
                        return setAttributes({ viewType: 'normal' });
                    },
                    isActive: viewType === 'normal'
                }, {
                    icon: 'slides',
                    title: __('Slider View'),
                    onClick: function onClick() {
                        return setAttributes({ viewType: 'slider' });
                    },
                    isActive: viewType === 'slider'
                }];

                var blockClassName = ["advgb-products-block", viewType === 'slider' && 'slider-view'].filter(Boolean).join(' ');

                var blockWrapperClassName = ["advgb-products-wrapper", viewType === 'normal' && "columns-" + columns].filter(Boolean).join(' ');

                return React.createElement(
                    Fragment,
                    null,
                    React.createElement(
                        BlockControls,
                        null,
                        React.createElement(Toolbar, { controls: viewControls })
                    ),
                    React.createElement(
                        InspectorControls,
                        null,
                        React.createElement(
                            PanelBody,
                            { title: __('Products Settings') },
                            React.createElement(SelectControl, {
                                label: __('Product Status'),
                                value: status,
                                options: [{ label: __('All'), value: '' }, { label: __('Featured'), value: 'featured' }, { label: __('On Sale'), value: 'on_sale' }],
                                onChange: function onChange(value) {
                                    return setAttributes({ status: value });
                                }
                            }),
                            React.createElement(SelectControl, {
                                label: __('Category'),
                                value: category,
                                options: [{ label: __('All'), value: '' }, { label: __('Selected'), value: 'selected' }],
                                onChange: function onChange(value) {
                                    return setAttributes({ category: value });
                                }
                            }),
                            category === 'selected' && React.createElement(
                                "div",
                                { className: "advgb-categories-list" },
                                categoriesList.map(function (cat, index) {
                                    return React.createElement(CheckboxControl, {
                                        key: index,
                                        label: [cat.name, React.createElement(
                                            "span",
                                            { key: "cat-count", style: { fontSize: 'small', color: '#999', marginLeft: 5 } },
                                            "(",
                                            cat.count,
                                            ")"
                                        )],
                                        checked: jQuery.inArray(cat.id, categories) > -1,
                                        onChange: function onChange(checked) {
                                            return _this3.setCategories(cat.id, checked);
                                        }
                                    });
                                })
                            )
                        ),
                        React.createElement(
                            PanelBody,
                            { title: __('Layout Settings') },
                            viewType !== 'slider' && React.createElement(RangeControl, {
                                label: __('Columns'),
                                value: columns,
                                min: 1,
                                max: 4,
                                onChange: function onChange(value) {
                                    return setAttributes({ columns: value });
                                }
                            }),
                            React.createElement(RangeControl, {
                                label: __('Number of Products'),
                                value: numberOfProducts,
                                min: 1,
                                max: 48,
                                onChange: function onChange(value) {
                                    return setAttributes({ numberOfProducts: value });
                                }
                            }),
                            React.createElement(SelectControl, {
                                label: __('Order'),
                                value: orderBy + "-" + order,
                                options: [{ label: __('Newest to oldest'), value: 'date-desc' }, { label: __('Price: high to low'), value: 'price-desc' }, { label: __('Price: low to high'), value: 'price-asc' }, { label: __('Highest Rating first'), value: 'rating-desc' }, { label: __('Most sale first'), value: 'popularity-desc' }, { label: __('Title: Alphabetical'), value: 'title-asc' }, { label: __('Title: Alphabetical reversed'), value: 'title-desc' }],
                                onChange: function onChange(value) {
                                    var splitedVal = value.split('-');
                                    return setAttributes({
                                        orderBy: splitedVal[0],
                                        order: splitedVal[1]
                                    });
                                }
                            })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: blockClassName },
                        !error ? !loading ? productsList.length > 0 ? React.createElement(
                            "div",
                            { className: blockWrapperClassName },
                            productsList.map(function (product, idx) {
                                return React.createElement(
                                    "div",
                                    { key: idx, className: "advgb-product" },
                                    React.createElement(
                                        "div",
                                        { className: "advgb-product-img" },
                                        React.createElement("img", { src: product.images.length ? product.images[0].src : undefined, alt: product.name })
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "advgb-product-title" },
                                        product.name
                                    ),
                                    React.createElement("div", { className: "advgb-product-price", dangerouslySetInnerHTML: { __html: product.price_html } }),
                                    React.createElement(
                                        "div",
                                        { className: "advgb-product-add-to-cart" },
                                        React.createElement(
                                            "span",
                                            null,
                                            __('Add to cart')
                                        )
                                    )
                                );
                            })
                        ) : // When no products found
                        React.createElement(
                            "div",
                            null,
                            __('No products found.')
                        ) : // When products is fetching
                        React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "span",
                                null,
                                __('Loading')
                            ),
                            React.createElement(Spinner, null)
                        ) : // When error
                        React.createElement(
                            Placeholder,
                            {
                                icon: advProductsBlockIcon,
                                label: __('ADVGB Woo Products Block')
                            },
                            React.createElement(
                                "div",
                                { style: { marginBottom: 10 } },
                                __('WooCommerce has not been detected, make sure WooCommerce is installed and activated.')
                            ),
                            React.createElement(
                                Button,
                                {
                                    className: "button button-large",
                                    onClick: function onClick() {
                                        return _this3.fetchProducts();
                                    }
                                },
                                __('Try again')
                            )
                        )
                    )
                );
            }
        }]);

        return AdvProductsEdit;
    }(Component);

    registerBlockType('advgb/woo-products', {
        title: __('Woo Products'),
        description: __('Listing your products in a easy way.'),
        icon: {
            src: advProductsBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined
        },
        category: 'widgets',
        keywords: [__('woo commerce'), __('products list'), __('price list')],
        attributes: {
            viewType: {
                type: 'string',
                default: 'normal'
            },
            category: {
                type: 'string'
            },
            categories: {
                type: 'array',
                default: []
            },
            status: {
                type: 'string'
            },
            order: {
                type: 'string',
                default: 'desc'
            },
            orderBy: {
                type: 'string',
                default: 'date'
            },
            numberOfProducts: {
                type: 'number',
                default: 6
            },
            columns: {
                type: 'number',
                default: 3
            },
            changed: {
                type: 'boolean',
                default: false
            }
        },
        edit: AdvProductsEdit,
        save: function save(_ref) {
            var attributes = _ref.attributes;
            var viewType = attributes.viewType,
                category = attributes.category,
                categories = attributes.categories,
                status = attributes.status,
                order = attributes.order,
                orderBy = attributes.orderBy,
                numberOfProducts = attributes.numberOfProducts,
                columns = attributes.columns;


            var listCats = categories.join(',');
            var shortCode = ['[products', "limit=\"" + numberOfProducts + "\"", "columns=\"" + columns + "\"", "orderby=\"" + orderBy + "\"", "order=\"" + order + "\"", category === 'selected' && "category=\"" + listCats + "\"", status === 'featured' && 'featured="1"', status === 'on_sale' && 'on_sale="1"', ']'].filter(Boolean).join(' ');

            var blockClassName = ['advgb-woo-products', viewType === 'slider' && 'slider-view'].filter(Boolean).join(' ');

            return React.createElement(
                "div",
                { className: blockClassName },
                shortCode
            );
        }
    });
})(wp.i18n, wp.blocks, wp.element, wp.editor, wp.components);

/***/ }),

/***/ "./assets/js/editor.jsx":
/*!******************************!*\
  !*** ./assets/js/editor.jsx ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (typeof wp !== 'undefined' && typeof wp.domReady !== 'undefined') {
    wp.domReady(function () {
        var gutenberg_init_function = null;
        if (typeof window._wpLoadGutenbergEditor !== 'undefined') {
            // Using WP core Gutenberg
            gutenberg_init_function = window._wpLoadGutenbergEditor;
        } else if (typeof window._wpLoadBlockEditor !== 'undefined') {
            // Using Gutenberg plugin
            gutenberg_init_function = window._wpLoadBlockEditor;
        }

        if (gutenberg_init_function !== null) {
            // Wait for Gutenberg editor to be ready
            gutenberg_init_function.then(function () {
                if (advgb_blocks_vars.original_settings.allowedBlockTypes !== true) {
                    // allowed_block_types filter has been used, in this case we do nothing as we don't know why blocks have been filtered
                    return;
                }

                var list_blocks = [];
                var granted_blocks = [];
                var missing_block = false;
                // Retrieve all registered blocks
                var blocks = wp.blocks.getBlockTypes();
                for (var block in blocks) {
                    var blockItemIcon = '';
                    var blockItem = {
                        name: blocks[block].name,
                        icon: blocks[block].icon.src,
                        title: blocks[block].title,
                        category: blocks[block].category
                    };

                    var savedIcon = !!blocks[block].icon.src ? blocks[block].icon.src : blocks[block].icon;

                    if (blocks[block].icon.foreground !== undefined) blockItem.iconColor = blocks[block].icon.foreground;

                    if (typeof savedIcon === 'function') {
                        if (!!savedIcon.prototype.render) {
                            blockItem.icon = wp.element.renderToString(wp.element.createElement(savedIcon));
                        } else {
                            blockItem.icon = wp.element.renderToString(savedIcon());
                        }

                        blockItem.icon = blockItem.icon.replace(/stopcolor/g, 'stop-color');
                        blockItem.icon = blockItem.icon.replace(/stopopacity/g, 'stop-opacity');
                    } else if ((typeof savedIcon === 'undefined' ? 'undefined' : _typeof(savedIcon)) === 'object') {
                        blockItem.icon = wp.element.renderToString(savedIcon);
                        blockItem.icon = blockItem.icon.replace(/stopcolor/g, 'stop-color');
                        blockItem.icon = blockItem.icon.replace(/stopopacity/g, 'stop-opacity');
                    } else if (typeof savedIcon === 'string') {
                        blockItemIcon = wp.element.createElement(wp.components.Dashicon, { icon: savedIcon });
                        blockItem.icon = wp.element.renderToString(blockItemIcon);
                    }
                    list_blocks.push(blockItem);

                    // Compare current block with the list of blocks we have
                    if (advgb_blocks_vars.blocks.active_blocks.indexOf(blocks[block].name) >= 0) {
                        // Block is active
                        granted_blocks.push(blocks[block].name);
                    } else if (advgb_blocks_vars.blocks.inactive_blocks.indexOf(blocks[block].name) >= 0) {
                        // Block is inactive
                    } else {
                        // This block is not in our database yet, but by default we allow the usage
                        granted_blocks.push(blocks[block].name);
                        missing_block = true;
                    }
                }

                if (missing_block) {
                    if (console !== undefined && console.error !== undefined) {
                        console.error('Reloading editor by Advanced Gutenberg plugin');
                    }
                    // Replace original allowed block settings by our modified list
                    var new_settings = advgb_blocks_vars.original_settings;
                    new_settings.allowedBlockTypes = granted_blocks;
                    var target = document.getElementById('editor');

                    // Initialize again the editor
                    wp.editPost.initializeEditor('editor', advgb_blocks_vars.post_type, advgb_blocks_vars.post_id, new_settings, window._wpGutenbergDefaultPost);

                    var list_categories = wp.blocks.getCategories();

                    try {
                        // Use this ajax query to update the block list in db
                        $.ajax({
                            url: advgb_blocks_vars.ajaxurl,
                            method: 'POST',
                            data: {
                                action: 'advgb_update_blocks_list',
                                blocksList: JSON.stringify(list_blocks),
                                categoriesList: JSON.stringify(list_categories),
                                nonce: advgb_blocks_vars.nonce
                            },
                            success: function success(data) {
                                //console.log(data);
                            }
                        });
                    } catch (e) {
                        // console.log(e);
                    }
                }
            });
        }
    });
}

/***/ }),

/***/ 0:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./assets/blocks/accordion/block.jsx ./assets/blocks/advbutton/block.jsx ./assets/blocks/advimage/block.jsx ./assets/blocks/advlist/block.jsx ./assets/blocks/advtable/block.jsx ./assets/blocks/advvideo/block.jsx ./assets/blocks/contact-form/block.jsx ./assets/blocks/count-up/block.jsx ./assets/blocks/custom-columns/columns.jsx ./assets/blocks/custom-separator/separator.jsx ./assets/blocks/customstyles/custom-styles.jsx ./assets/blocks/images-slider/block.jsx ./assets/blocks/map/block.jsx ./assets/blocks/recent-posts/block.jsx ./assets/blocks/social-links/block.jsx ./assets/blocks/summary/block.jsx ./assets/blocks/tabs/block.jsx ./assets/blocks/testimonial/block.jsx ./assets/blocks/woo-products/block.jsx ./assets/js/editor.jsx ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./assets/blocks/accordion/block.jsx */"./assets/blocks/accordion/block.jsx");
__webpack_require__(/*! ./assets/blocks/advbutton/block.jsx */"./assets/blocks/advbutton/block.jsx");
__webpack_require__(/*! ./assets/blocks/advimage/block.jsx */"./assets/blocks/advimage/block.jsx");
__webpack_require__(/*! ./assets/blocks/advlist/block.jsx */"./assets/blocks/advlist/block.jsx");
__webpack_require__(/*! ./assets/blocks/advtable/block.jsx */"./assets/blocks/advtable/block.jsx");
__webpack_require__(/*! ./assets/blocks/advvideo/block.jsx */"./assets/blocks/advvideo/block.jsx");
__webpack_require__(/*! ./assets/blocks/contact-form/block.jsx */"./assets/blocks/contact-form/block.jsx");
__webpack_require__(/*! ./assets/blocks/count-up/block.jsx */"./assets/blocks/count-up/block.jsx");
__webpack_require__(/*! ./assets/blocks/custom-columns/columns.jsx */"./assets/blocks/custom-columns/columns.jsx");
__webpack_require__(/*! ./assets/blocks/custom-separator/separator.jsx */"./assets/blocks/custom-separator/separator.jsx");
__webpack_require__(/*! ./assets/blocks/customstyles/custom-styles.jsx */"./assets/blocks/customstyles/custom-styles.jsx");
__webpack_require__(/*! ./assets/blocks/images-slider/block.jsx */"./assets/blocks/images-slider/block.jsx");
__webpack_require__(/*! ./assets/blocks/map/block.jsx */"./assets/blocks/map/block.jsx");
__webpack_require__(/*! ./assets/blocks/recent-posts/block.jsx */"./assets/blocks/recent-posts/block.jsx");
__webpack_require__(/*! ./assets/blocks/social-links/block.jsx */"./assets/blocks/social-links/block.jsx");
__webpack_require__(/*! ./assets/blocks/summary/block.jsx */"./assets/blocks/summary/block.jsx");
__webpack_require__(/*! ./assets/blocks/tabs/block.jsx */"./assets/blocks/tabs/block.jsx");
__webpack_require__(/*! ./assets/blocks/testimonial/block.jsx */"./assets/blocks/testimonial/block.jsx");
__webpack_require__(/*! ./assets/blocks/woo-products/block.jsx */"./assets/blocks/woo-products/block.jsx");
module.exports = __webpack_require__(/*! ./assets/js/editor.jsx */"./assets/js/editor.jsx");


/***/ })

/******/ });
//# sourceMappingURL=blocks.js.map