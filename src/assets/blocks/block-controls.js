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

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./src/assets/blocks/0-adv-components/datetime.jsx":
/*!*********************************************************!*\
  !*** ./src/assets/blocks/0-adv-components/datetime.jsx ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.AdvDateTimeControl = AdvDateTimeControl;
function AdvDateTimeControl(props) {
    var _wp$components = wp.components,
        Button = _wp$components.Button,
        DateTimePicker = _wp$components.DateTimePicker,
        Popover = _wp$components.Popover,
        Tooltip = _wp$components.Tooltip;
    var _wp$element = wp.element,
        Fragment = _wp$element.Fragment,
        useState = _wp$element.useState;
    var __ = wp.i18n.__;

    var _useState = useState(false),
        _useState2 = _slicedToArray(_useState, 2),
        popupState = _useState2[0],
        setPopupState = _useState2[1];

    var togglePopup = function togglePopup() {
        setPopupState(function (state) {
            return !state;
        });
    };

    var buttonLabel = props.buttonLabel,
        dateLabel = props.dateLabel,
        date = props.date,
        onChangeDate = props.onChangeDate,
        onDateClear = props.onDateClear,
        onInvalidDate = props.onInvalidDate;


    return React.createElement(
        Fragment,
        null,
        React.createElement(
            "div",
            { className: "advgb-advcalendar-control" },
            React.createElement(
                "label",
                null,
                dateLabel
            ),
            React.createElement(
                "div",
                null,
                React.createElement(
                    Button,
                    {
                        isLink: true,
                        icon: "calendar",
                        onClick: function onClick() {
                            return setPopupState(togglePopup);
                        }
                    },
                    React.createElement(
                        Tooltip,
                        { text: __('Change date', 'advanced-gutenberg') },
                        React.createElement(
                            "span",
                            null,
                            date ? moment(date).format("MMMM DD YYYY, h:mm a") : buttonLabel
                        )
                    )
                ),
                date && React.createElement(Button, {
                    icon: "no-alt",
                    className: "advgb-advcalendar-remove-icon",
                    onClick: function onClick() {
                        return onDateClear();
                    }
                })
            )
        ),
        popupState && React.createElement(
            Popover,
            {
                className: "advgb-advcalendar-popover",
                onClose: setPopupState.bind(null, false)
            },
            React.createElement(
                "label",
                { className: "advgb-advcalendar-popover-label" },
                dateLabel,
                React.createElement(Button, {
                    icon: "no-alt",
                    className: "advgb-advcalendar-remove-icon",
                    onClick: function onClick() {
                        return setPopupState(togglePopup);
                    }
                })
            ),
            React.createElement(
                "div",
                { className: "advgb-advcalendar-popover-timezone" },
                typeof advgbBlocks.timezone !== 'undefined' && advgbBlocks.timezone.length ? advgbBlocks.timezone.replace(/_/g, ' ') + " " + __('time', 'advanced-gutenberg') : __('WordPress settings timezone', 'advanced-gutenberg')
            ),
            React.createElement(DateTimePicker, {
                currentDate: date,
                onChange: onChangeDate,
                is12Hour: true,
                isInvalidDate: onInvalidDate
            })
        )
    );
}

/***/ }),

/***/ "./src/assets/blocks/0-adv-components/utils.jsx":
/*!******************************************************!*\
  !*** ./src/assets/blocks/0-adv-components/utils.jsx ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Generate option title suggestions
 *
 * @since 3.1.1
 * @param options Available options as objects with slug and title. e.g. [{slug: 'subscriber', title: 'Subscriber'}, {slug: 'new_customer', title: 'New Customer'}]
 *
 * @return {array}  Option slugs. e.g. ['subscriber','new_customer']
 */
var getOptionSuggestions = exports.getOptionSuggestions = function getOptionSuggestions(options) {
    return options.map(function (item) {
        return item.title;
    });
};

/**
 * Match option slugs with its option titles
 * to display as field value (but NOT saved!).
 *
 * @since 3.1.1
 * @param slugs     Option slugs. e.g. ['subscriber','new_customer'] or [82, 92]
 * @param options   Available options as objects with slug and title. e.g. [{slug: 'subscriber', title: 'Subscriber'}, {slug: 'new_customer', title: 'New Customer'}]
 *
 * @return {array}  Option titles. e.g. ['Subscriber','New Customer']
 */
var getOptionTitles = exports.getOptionTitles = function getOptionTitles(slugs, options) {
    var field_value = [];

    if (options !== null) {
        field_value = slugs.map(function (option_slug) {
            var find_option = options.find(function (item) {
                return item.slug === option_slug;
            });
            if (find_option === undefined || !find_option) {
                return option_slug; // It should return false but creates empty selections
            }
            return find_option.title;
        });
    }

    return field_value;
};

/**
 * Match option titles with its slugs, and save slugs
 *
 * @since 3.1.1
 * @param slugs     Option slugs. e.g. ['subscriber','new_customer']
 * @param options   Available options as objects with slug and title. e.g. [{slug: 'subscriber', title: 'Subscriber'}, {slug: 'new_customer', title: 'New Customer'}]
 *
 * @return {array}  Option slugs. e.g. ['subscriber','new_customer']
 */
var getOptionSlugs = exports.getOptionSlugs = function getOptionSlugs(slugs, options) {
    var slugs_array = [];

    slugs.map(function (option_title) {
        var matching_slug = options.find(function (item) {
            return item.title === option_title;
        });
        if (matching_slug !== undefined) {
            slugs_array.push(matching_slug.slug);
        }
    });

    return slugs_array;
};

/***/ }),

/***/ "./src/assets/blocks/block-controls/block-controls.jsx":
/*!*************************************************************!*\
  !*** ./src/assets/blocks/block-controls/block-controls.jsx ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _datetime = __webpack_require__(/*! ../0-adv-components/datetime.jsx */ "./src/assets/blocks/0-adv-components/datetime.jsx");

var _utils = __webpack_require__(/*! ../0-adv-components/utils.jsx */ "./src/assets/blocks/0-adv-components/utils.jsx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function (wpI18n, wpHooks, wpBlocks, wpBlockEditor, wpComponents, wpCompose, wpElement) {
    wpBlockEditor = wp.blockEditor || wp.editor;
    var addFilter = wpHooks.addFilter;
    var __ = wpI18n.__;
    var hasBlockSupport = wpBlocks.hasBlockSupport;
    var _wpBlockEditor = wpBlockEditor,
        InspectorControls = _wpBlockEditor.InspectorControls,
        BlockControls = _wpBlockEditor.BlockControls;
    var DateTimePicker = wpComponents.DateTimePicker,
        ToggleControl = wpComponents.ToggleControl,
        PanelBody = wpComponents.PanelBody,
        Notice = wpComponents.Notice,
        FormTokenField = wpComponents.FormTokenField,
        SelectControl = wpComponents.SelectControl;
    var createHigherOrderComponent = wpCompose.createHigherOrderComponent;
    var Component = wpElement.Component,
        Fragment = wpElement.Fragment;

    // do not show this feature if disabled.

    if (!parseInt(advgbBlocks.block_controls)) return;

    // Blocks that are not supported
    var NON_SUPPORTED_BLOCKS = ['core/freeform', 'core/legacy-widget', 'core/widget-area', 'core/column', 'advgb/tab', 'advgb/column'];

    var getGlobalControls = function getGlobalControls() {
        return typeof advgb_block_controls_vars.controls !== 'undefined' && Object.keys(advgb_block_controls_vars.controls).length > 0 ? advgb_block_controls_vars.controls : [];
    };

    /**
     * Check if a control is enabled
     *
     * @since 3.1.0
     * @param {string} control  The use case block control. e.g. 'schedule'
     *
     * @return {bool}
     */
    var isControlEnabled = function isControlEnabled(control) {
        return typeof control !== 'undefined' && control;
    };

    /**
     * Check if at least one control is enabled per block instance
     *
     * @since 3.1.1
     * @param {string} controlAttrs     Controls attributes. e.g. advgbBlockControls or props.attributes @TODO Figure out a way to NOT require controlAttrs as param due is the same always
     *
     * @return {bool}
     */
    var isAnyControlEnabledBlock = function isAnyControlEnabledBlock(controlAttrs) {
        var globalControls = getGlobalControls();
        var counter = 0;
        var blockControls = []; // Controls enabled in block instance

        // Get enabled global controls (in Settings)
        Object.keys(globalControls).forEach(function (item) {
            if (isControlEnabled(advgb_block_controls_vars.controls[item])) {
                blockControls.push(item);
            }
        });

        // Get counter for enabled controls in block instance
        blockControls.forEach(function (item) {
            if (currentControlKey(controlAttrs, item, 'enabled')) {
                counter++;
            }
        });

        return counter > 0 ? true : false;
    };

    /**
     * Check if at least one control is enabled globally (in Settings)
     *
     * @since 3.1.0
     *
     * @return {bool}
     */
    var isAnyControlEnabledGlobal = function isAnyControlEnabledGlobal() {
        var globalControls = getGlobalControls();
        var counter = 0;

        Object.keys(globalControls).map(function (item) {
            if (isControlEnabled(advgb_block_controls_vars.controls[item])) {
                counter++;
            }
        });

        return counter > 0 ? true : false;
    };

    /**
     * Return single controls array attribute value
     *
     * @since 3.1.0
     * @param {string} controlAttrs     Controls attributes. e.g. advgbBlockControls or props.attributes @TODO Figure out a way to NOT require controlAttrs as param due is the same always
     * @param {string} control          The use case block control. e.g. 'schedule'
     * @param {string} key              The control key to check. e.g. 'enabled'
     *
     * @return {mixed}
     */
    var currentControlKey = function currentControlKey(controlAttrs, control, key) {

        // Check if advgbBlockControls attribute exists
        var controlsAdded = typeof controlAttrs !== 'undefined' && controlAttrs.length ? true : false;
        // Check if control exists in advgbBlockControls array
        var controlExists = controlsAdded && controlAttrs.some(function (element) {
            return element.control === control;
        }) ? true : false;

        if (controlExists) {
            var itemIndex = controlAttrs.findIndex(function (element) {
                return element.control === control;
            });

            // No control found (this check seems not necessary but is here to prevent an unlikely error)
            if (itemIndex < 0) {
                return false;
            }

            var newArray = [].concat(_toConsumableArray(controlAttrs));
            var obj = newArray[itemIndex];

            return obj[key];
        }

        return null;
    };

    // Add non supported blocks according to Block controls
    if (typeof advgb_block_controls_vars !== 'undefined' && typeof advgb_block_controls_vars.non_supported !== 'undefined' && advgb_block_controls_vars.non_supported.length > 0) {
        // Merge dynamically disabled blocks
        NON_SUPPORTED_BLOCKS = [].concat(_toConsumableArray(NON_SUPPORTED_BLOCKS), _toConsumableArray(advgb_block_controls_vars.non_supported));
        // Remove duplicated values
        NON_SUPPORTED_BLOCKS = [].concat(_toConsumableArray(new Set(NON_SUPPORTED_BLOCKS)));
    }

    // Register block controls to blocks attributes
    addFilter('blocks.registerBlockType', 'advgb/blockControls', function (settings) {
        if (!NON_SUPPORTED_BLOCKS.includes(settings.name) && isAnyControlEnabledGlobal()) {
            settings.attributes = _extends(settings.attributes, {
                advgbBlockControls: {
                    type: 'array',
                    items: {
                        type: 'object'
                    },
                    default: []
                }
            });
        }

        return settings;
    });

    var withEditControls = createHigherOrderComponent(function (BlockEdit) {

        return function (_Component) {
            _inherits(BlockControlsEdit, _Component);

            function BlockControlsEdit(props) {
                var _ref;

                _classCallCheck(this, BlockControlsEdit);

                var _this = _possibleConstructorReturn(this, (_ref = BlockControlsEdit.__proto__ || Object.getPrototypeOf(BlockControlsEdit)).call.apply(_ref, [this].concat(_toConsumableArray(props))));

                _this.state = {
                    termOptions: [], // Store term options with slug (id) and title
                    searchTermWord: '', // Updated when searching terms
                    initTaxonomy: true // When true, trigger initTaxonomyControl()
                };

                _this.isPost = _this.isPost.bind(_this);
                return _this;
            }

            /**
             * Get filtered term slugs based on selected taxonomies
             *
             * @since 3.1.1
             * @param {array} taxonomies Array of taxonomies slugs
             *
             * @return {array}
             */


            _createClass(BlockControlsEdit, [{
                key: "getTermSlugs",
                value: function getTermSlugs(taxonomies) {
                    var _this2 = this;

                    var allTaxonomies = this.getTaxonomies();
                    var terms = [];

                    taxonomies.forEach(function (tax) {
                        var allTaxonomies = _this2.getTaxonomies();
                        var itemIndex = allTaxonomies.findIndex(function (element) {
                            return element.slug === tax;
                        });

                        allTaxonomies[itemIndex].terms.forEach(function (term) {
                            terms.push(term.slug);
                        });
                    });

                    return terms;
                }

                /**
                 * Get taxonomies
                 *
                 * @since 3.1.1
                 *
                 * @return {array}
                 */

            }, {
                key: "getTaxonomies",
                value: function getTaxonomies() {
                    return typeof advgb_block_controls_vars.taxonomies !== 'undefined' && advgb_block_controls_vars.taxonomies.length > 0 ? advgb_block_controls_vars.taxonomies : [];
                }

                /**
                 * Get all the available user roles from the site
                 *
                 * @since 3.1.0
                 *
                 * @return {array}
                 */

            }, {
                key: "getUserRoles",
                value: function getUserRoles() {
                    return typeof advgb_block_controls_vars.user_roles !== 'undefined' && advgb_block_controls_vars.user_roles.length > 0 ? advgb_block_controls_vars.user_roles : [];
                }

                /**
                 * Get platforms
                 *
                 * @since 3.1.1
                 *
                 * @return {array}
                 */

            }, {
                key: "getPlatforms",
                value: function getPlatforms() {
                    return typeof advgb_block_controls_vars.platforms !== 'undefined' && advgb_block_controls_vars.platforms.length > 0 ? advgb_block_controls_vars.platforms : [];
                }

                /**
                 * Get browsers
                 *
                 * @since 3.1.1
                 *
                 * @return {array}
                 */

            }, {
                key: "getBrowsers",
                value: function getBrowsers() {
                    return typeof advgb_block_controls_vars.browsers !== 'undefined' && advgb_block_controls_vars.browsers.length > 0 ? advgb_block_controls_vars.browsers : [];
                }

                /**
                 * Get filtered terms based on selected taxonomies
                 *
                 * @since 3.1.1
                 * @param {array} taxonomies Taxonomies slugs
                 *
                 * @return {array}
                 */

            }, {
                key: "getTerms",
                value: function getTerms(taxonomies) {
                    var _this3 = this;

                    var allTaxonomies = this.getTaxonomies();
                    var terms = [];

                    taxonomies.forEach(function (tax) {
                        var allTaxonomies = _this3.getTaxonomies();
                        var itemIndex = allTaxonomies.findIndex(function (element) {
                            return element.slug === tax;
                        });

                        allTaxonomies[itemIndex].terms.forEach(function (term) {
                            terms.push({
                                slug: term.slug,
                                title: term.title + " (" + allTaxonomies[itemIndex].title + ")"
                            });
                        });
                    });

                    return terms;
                }

                /**
                 * Get pages
                 *
                 * @since 3.1.1
                 *
                 * @return {array}
                 */

            }, {
                key: "getPages",
                value: function getPages() {
                    return typeof advgb_block_controls_vars.page !== 'undefined' && advgb_block_controls_vars.page.length > 0 ? advgb_block_controls_vars.page : [];
                }

                /**
                 * Update advgbBlockControls attribute when a key value changes
                 *
                 * @since 2.14.0
                 * @param {string} control  The use case block control. e.g. 'schedule'
                 * @param {string} key      The control key to modify. e.g. 'enabled'
                 * @param {string} key      The control key value (not required for boolean keys)
                 *
                 * @return {void}
                 */

            }, {
                key: "changeControlKey",
                value: function changeControlKey(control, key) {
                    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
                    var _props = this.props,
                        attributes = _props.attributes,
                        setAttributes = _props.setAttributes;
                    var advgbBlockControls = attributes.advgbBlockControls;

                    // Control objects to add  when enabled for the first time

                    var scheduleControl = {
                        control: 'schedule',
                        enabled: true,
                        dateFrom: null,
                        dateTo: null,
                        recurring: false
                    };
                    var userRoleControl = {
                        control: 'user_role',
                        enabled: true,
                        roles: [],
                        approach: 'public'
                    };
                    var browserControl = {
                        control: 'browser',
                        enabled: true,
                        browsers: [],
                        approach: 'public'
                    };
                    var platformControl = {
                        control: 'platform',
                        enabled: true,
                        platforms: [],
                        approach: 'public'
                    };
                    var taxonomyControl = {
                        control: 'taxonomy',
                        enabled: true,
                        taxonomies: [],
                        terms: [],
                        approach: 'exclude'
                    };
                    var pageControl = {
                        control: 'page',
                        enabled: true,
                        pages: [],
                        approach: 'exclude'
                    };

                    // Check if advgbBlockControls attribute exists
                    var controlsAdded = typeof advgbBlockControls !== 'undefined' && advgbBlockControls.length ? true : false;
                    // Check if control exists in advgbBlockControls array
                    var controlExists = controlsAdded && advgbBlockControls.some(function (element) {
                        return element.control === control;
                    }) ? true : false;

                    if (controlExists) {
                        var itemIndex = advgbBlockControls.findIndex(function (element) {
                            return element.control === control;
                        });

                        // No control found (this check seems not necessary but is here to prevent an unlikely error)
                        if (itemIndex < 0) {
                            return false;
                        }

                        var newArray = [].concat(_toConsumableArray(advgbBlockControls));
                        var obj = newArray[itemIndex];

                        newArray[itemIndex] = typeof obj[key] === 'boolean' ? _extends({}, newArray[itemIndex], _defineProperty({}, key, !obj[key])) : _extends({}, newArray[itemIndex], _defineProperty({}, key, value));

                        setAttributes({
                            advgbBlockControls: newArray
                        });
                    } else if (controlsAdded && !controlExists) {

                        // Add a new control object when other controls already exists
                        switch (control) {
                            case 'schedule':
                                setAttributes({
                                    advgbBlockControls: [].concat(_toConsumableArray(advgbBlockControls), [scheduleControl])
                                });
                                break;

                            case 'user_role':
                                setAttributes({
                                    advgbBlockControls: [].concat(_toConsumableArray(advgbBlockControls), [userRoleControl])
                                });
                                break;

                            case 'browser':
                                setAttributes({
                                    advgbBlockControls: [].concat(_toConsumableArray(advgbBlockControls), [browserControl])
                                });
                                break;

                            case 'platform':
                                setAttributes({
                                    advgbBlockControls: [].concat(_toConsumableArray(advgbBlockControls), [platformControl])
                                });
                                break;

                            case 'taxonomy':
                                setAttributes({
                                    advgbBlockControls: [].concat(_toConsumableArray(advgbBlockControls), [taxonomyControl])
                                });
                                break;

                            case 'page':
                                setAttributes({
                                    advgbBlockControls: [].concat(_toConsumableArray(advgbBlockControls), [pageControl])
                                });
                                break;
                        }
                    } else {
                        // Add the first control object attribute
                        switch (control) {
                            case 'schedule':
                                setAttributes({
                                    advgbBlockControls: [scheduleControl]
                                });
                                break;

                            case 'user_role':
                                setAttributes({
                                    advgbBlockControls: [userRoleControl]
                                });
                                break;

                            case 'browser':
                                setAttributes({
                                    advgbBlockControls: [browserControl]
                                });
                                break;

                            case 'platform':
                                setAttributes({
                                    advgbBlockControls: [platformControl]
                                });
                                break;

                            case 'taxonomy':
                                setAttributes({
                                    advgbBlockControls: [taxonomyControl]
                                });
                                break;

                            case 'page':
                                setAttributes({
                                    advgbBlockControls: [pageControl]
                                });
                                break;
                        }
                    }
                }

                /**
                 * Execute when taxonomy selection changes
                 *
                 * @since 3.1.1
                 *
                 * @return {void}
                 */

            }, {
                key: "taxonomiesChanged",
                value: function taxonomiesChanged() {
                    var _this4 = this;

                    var attributes = this.props.attributes;
                    var advgbBlockControls = attributes.advgbBlockControls;


                    var currentTerms = !!currentControlKey(advgbBlockControls, 'taxonomy', 'terms') ? currentControlKey(advgbBlockControls, 'taxonomy', 'terms') : [];
                    var taxonomies = !!currentControlKey(advgbBlockControls, 'taxonomy', 'taxonomies') ? currentControlKey(advgbBlockControls, 'taxonomy', 'taxonomies') : [];

                    if (currentTerms.length) {

                        var result = [];
                        currentTerms.forEach(function (slug) {
                            var itemIndex = _this4.state.termOptions.findIndex(function (item) {
                                return item.slug === slug;
                            });

                            /* Get only the terms that belongs to selected taxonomies
                             * and skip the ones that belongs to the deleted taxonomy
                             */
                            if (taxonomies.includes(_this4.state.termOptions[itemIndex].tax)) {
                                result.push(_this4.state.termOptions[itemIndex].slug);
                            }
                        });

                        this.changeControlKey('taxonomy', 'terms', result);
                    }
                }

                /**
                 * Get selected terms on first load
                 *
                 * @since 3.1.1
                 *
                 * @return {void}
                 */

            }, {
                key: "initTaxonomyControl",
                value: function initTaxonomyControl() {
                    var _this5 = this;

                    var advgbBlockControls = this.props.attributes.advgbBlockControls;


                    wp.apiFetch({
                        path: wp.url.addQueryArgs('advgb/v1/terms', {
                            taxonomies: !!currentControlKey(advgbBlockControls, 'taxonomy', 'taxonomies') ? currentControlKey(advgbBlockControls, 'taxonomy', 'taxonomies') : [],
                            ids: !!currentControlKey(advgbBlockControls, 'taxonomy', 'terms') ? currentControlKey(advgbBlockControls, 'taxonomy', 'terms') : []
                        })
                    }).then(function (list) {
                        _this5.setState({
                            termOptions: list,
                            initTaxonomy: false
                        });
                    });
                }

                /**
                 * Search terms based on search
                 *
                 * @since 3.1.1
                 *
                 * @return {void}
                 */

            }, {
                key: "searchTerms",
                value: function searchTerms() {
                    var _this6 = this;

                    var _state = this.state,
                        termOptions = _state.termOptions,
                        searchTermWord = _state.searchTermWord;
                    var advgbBlockControls = this.props.attributes.advgbBlockControls;


                    wp.apiFetch({
                        /*/ To get taxonomies
                        path: wp.url.addQueryArgs( 'wp/v2/taxonomies', { context: 'edit' } )*/

                        path: wp.url.addQueryArgs('advgb/v1/terms', {
                            search: searchTermWord,
                            taxonomies: !!currentControlKey(advgbBlockControls, 'taxonomy', 'taxonomies') ? currentControlKey(advgbBlockControls, 'taxonomy', 'taxonomies') : []
                        })

                    }).then(function (list) {

                        /*/ To get taxonomies
                        Object.keys(list).forEach( (item) => {
                            options.push( {
                                label: list[item].name,
                                value: list[item].slug
                            } );
                        });*/

                        // Merge selected terms with results from fetch
                        var options = [].concat(_toConsumableArray(termOptions), _toConsumableArray(list));

                        // Remove duplicated values
                        options = Array.from(new Set(options.map(function (a) {
                            return a.slug;
                        }))).map(function (slug) {
                            return options.find(function (a) {
                                return a.slug === slug;
                            });
                        });

                        _this6.setState({
                            termOptions: options
                        });
                    });
                }

                /**
                 * Check if we're in post edit screen
                 *
                 * @since 3.1.2
                 *
                 * @return {bool}
                 */

            }, {
                key: "isPost",
                value: function isPost() {
                    return wp.data.select('core/editor') && wp.data.select('core/editor').getCurrentPostId();
                }
            }, {
                key: "componentDidUpdate",
                value: function componentDidUpdate(prevProps, prevState) {
                    var _props2 = this.props,
                        attributes = _props2.attributes,
                        isSelected = _props2.isSelected,
                        name = _props2.name;
                    var advgbBlockControls = attributes.advgbBlockControls;
                    var prevBlockControls = prevProps.attributes.advgbBlockControls;
                    var _state2 = this.state,
                        searchTermWord = _state2.searchTermWord,
                        initTaxonomy = _state2.initTaxonomy;
                    var prevTermWord = prevState.searchTermWord;

                    // Get human readable selected terms on selection one time

                    if (!this.isPost() && !NON_SUPPORTED_BLOCKS.includes(name) && isSelected && initTaxonomy && isControlEnabled(advgb_block_controls_vars.controls.taxonomy) && currentControlKey(advgbBlockControls, 'taxonomy', 'enabled') && currentControlKey(advgbBlockControls, 'taxonomy', 'taxonomies') !== null && currentControlKey(advgbBlockControls, 'taxonomy', 'taxonomies').length && currentControlKey(advgbBlockControls, 'taxonomy', 'terms') !== null && currentControlKey(advgbBlockControls, 'taxonomy', 'terms').length) {
                        console.log('initTaxonomy!!', currentControlKey(advgbBlockControls, 'taxonomy', 'taxonomies'));
                        this.initTaxonomyControl();
                    }

                    // Search terms
                    if (searchTermWord !== prevTermWord && searchTermWord.length > 2) {
                        /*console.log('prevTermWord',prevTermWord);
                        console.log('searchTermWord',searchTermWord);*/
                        this.searchTerms();
                    }

                    // Update available terms and remove terms which taxonomy has been removed
                    if (!this.isPost() && isControlEnabled(advgb_block_controls_vars.controls.taxonomy) && currentControlKey(advgbBlockControls, 'taxonomy', 'enabled') && currentControlKey(prevBlockControls, 'taxonomy', 'taxonomies') !== currentControlKey(advgbBlockControls, 'taxonomy', 'taxonomies')) {
                        /*console.log('prevBlockControls',currentControlKey( prevBlockControls, 'taxonomy', 'taxonomies' ));
                        console.log('advgbBlockControls',currentControlKey( advgbBlockControls, 'taxonomy', 'taxonomies' ));
                        console.log('different!!!');*/
                        this.taxonomiesChanged();
                    }
                }
            }, {
                key: "render",
                value: function render() {
                    var _this7 = this;

                    var _props3 = this.props,
                        attributes = _props3.attributes,
                        setAttributes = _props3.setAttributes;
                    var advgbBlockControls = attributes.advgbBlockControls;


                    return [this.props.isSelected && !NON_SUPPORTED_BLOCKS.includes(this.props.name) && isAnyControlEnabledGlobal() && React.createElement(
                        InspectorControls,
                        { key: "advgb-bc-controls" },
                        React.createElement(
                            PanelBody,
                            {
                                title: __('Block Controls', 'advanced-gutenberg'),
                                icon: "visibility",
                                initialOpen: false,
                                className: isAnyControlEnabledBlock(advgbBlockControls) ? 'advgb-feature-icon-active' : ''
                            },
                            isControlEnabled(advgb_block_controls_vars.controls.schedule) && React.createElement(
                                Fragment,
                                null,
                                React.createElement(ToggleControl, {
                                    label: __('Schedule', 'advanced-gutenberg'),
                                    help: currentControlKey(advgbBlockControls, 'schedule', 'enabled') ? __('Choose when to start showing and/or stop showing this block.', 'advanced-gutenberg') : '',
                                    checked: currentControlKey(advgbBlockControls, 'schedule', 'enabled'),
                                    onChange: function onChange() {
                                        return _this7.changeControlKey('schedule', 'enabled');
                                    }
                                }),
                                currentControlKey(advgbBlockControls, 'schedule', 'enabled') && React.createElement(
                                    Fragment,
                                    null,
                                    React.createElement(
                                        "div",
                                        { style: { marginBottom: 30 } },
                                        React.createElement(_datetime.AdvDateTimeControl, {
                                            buttonLabel: __('Now', 'advanced-gutenberg'),
                                            dateLabel: __('Start showing', 'advanced-gutenberg'),
                                            date: currentControlKey(advgbBlockControls, 'schedule', 'dateFrom'),
                                            onChangeDate: function onChangeDate(newDate) {
                                                return _this7.changeControlKey('schedule', 'dateFrom', newDate);
                                            },
                                            onDateClear: function onDateClear() {
                                                return _this7.changeControlKey('schedule', 'dateFrom', null);
                                            },
                                            onInvalidDate: false
                                        }),
                                        React.createElement(_datetime.AdvDateTimeControl, {
                                            buttonLabel: __('Never', 'advanced-gutenberg'),
                                            dateLabel: __('Stop showing', 'advanced-gutenberg'),
                                            date: !!currentControlKey(advgbBlockControls, 'schedule', 'dateTo') ? currentControlKey(advgbBlockControls, 'schedule', 'dateTo') : null,
                                            onChangeDate: function onChangeDate(newDate) {
                                                return _this7.changeControlKey('schedule', 'dateTo', newDate);
                                            },
                                            onDateClear: function onDateClear() {
                                                return _this7.changeControlKey('schedule', 'dateTo', null);
                                            },
                                            onInvalidDate: function onInvalidDate(date) {
                                                // Disable all dates before dateFrom
                                                if (currentControlKey(advgbBlockControls, 'schedule', 'dateFrom')) {
                                                    var thisDate = new Date(date.getTime());
                                                    thisDate.setHours(0, 0, 0, 0);
                                                    var fromDate = new Date(currentControlKey(advgbBlockControls, 'schedule', 'dateFrom'));
                                                    fromDate.setHours(0, 0, 0, 0);
                                                    return thisDate.getTime() < fromDate.getTime();
                                                }
                                            }
                                        }),
                                        currentControlKey(advgbBlockControls, 'schedule', 'dateFrom') > currentControlKey(advgbBlockControls, 'schedule', 'dateTo') && React.createElement(
                                            Notice,
                                            {
                                                className: "advgb-notice-sidebar",
                                                status: "warning",
                                                isDismissible: false
                                            },
                                            __('"Stop showing" date should be after "Start showing" date!', 'advanced-gutenberg')
                                        ),
                                        currentControlKey(advgbBlockControls, 'schedule', 'dateFrom') && currentControlKey(advgbBlockControls, 'schedule', 'dateTo') && React.createElement(ToggleControl, {
                                            label: __('Recurring', 'advanced-gutenberg'),
                                            checked: currentControlKey(advgbBlockControls, 'schedule', 'recurring'),
                                            onChange: function onChange() {
                                                return _this7.changeControlKey('schedule', 'recurring');
                                            },
                                            help: __('If Recurring is enabled, this block will be displayed every year between the selected dates.', 'advanced-gutenberg')
                                        })
                                    )
                                )
                            ),
                            isControlEnabled(advgb_block_controls_vars.controls.user_role) && React.createElement(
                                Fragment,
                                null,
                                React.createElement(ToggleControl, {
                                    label: __('User roles', 'advanced-gutenberg'),
                                    help: currentControlKey(advgbBlockControls, 'user_role', 'enabled') ? __('Choose which users can see this block.', 'advanced-gutenberg') : '',
                                    checked: currentControlKey(advgbBlockControls, 'user_role', 'enabled'),
                                    onChange: function onChange() {
                                        return _this7.changeControlKey('user_role', 'enabled');
                                    }
                                }),
                                currentControlKey(advgbBlockControls, 'user_role', 'enabled') && React.createElement(
                                    Fragment,
                                    null,
                                    React.createElement(
                                        "div",
                                        { className: "advgb-revert-mb" },
                                        React.createElement(SelectControl, {
                                            value: currentControlKey(advgbBlockControls, 'user_role', 'approach'),
                                            options: [{
                                                value: 'public',
                                                label: __('Show to everyone', 'advanced-gutenberg')
                                            }, {
                                                value: 'login',
                                                label: __('Show to logged in users', 'advanced-gutenberg')
                                            }, {
                                                value: 'logout',
                                                label: __('Show to logged out users', 'advanced-gutenberg')
                                            }, {
                                                value: 'include',
                                                label: __('Show to the selected user roles', 'advanced-gutenberg')
                                            }, {
                                                value: 'exclude',
                                                label: __('Hide from the selected user roles', 'advanced-gutenberg')
                                            }],
                                            onChange: function onChange(value) {
                                                return _this7.changeControlKey('user_role', 'approach', value);
                                            }
                                        })
                                    ),
                                    (currentControlKey(advgbBlockControls, 'user_role', 'approach') === 'include' || currentControlKey(advgbBlockControls, 'user_role', 'approach') === 'exclude') && React.createElement(FormTokenField, {
                                        multiple: true,
                                        label: __('Select user roles', 'advanced-gutenberg'),
                                        placeholder: __('Search', 'advanced-gutenberg'),
                                        suggestions: (0, _utils.getOptionSuggestions)(this.getUserRoles()),
                                        maxSuggestions: 10,
                                        value: (0, _utils.getOptionTitles)(!!currentControlKey(advgbBlockControls, 'user_role', 'roles') ? currentControlKey(advgbBlockControls, 'user_role', 'roles') : [], this.getUserRoles()),
                                        onChange: function onChange(value) {
                                            _this7.changeControlKey('user_role', 'roles', (0, _utils.getOptionSlugs)(value, _this7.getUserRoles()));
                                        },
                                        __experimentalExpandOnFocus: true
                                    })
                                )
                            ),
                            isControlEnabled(advgb_block_controls_vars.controls.browser) && React.createElement(
                                Fragment,
                                null,
                                React.createElement(ToggleControl, {
                                    label: __('Browsers', 'advanced-gutenberg'),
                                    help: currentControlKey(advgbBlockControls, 'browser', 'enabled') ? __('Choose in which browsers this block can be displayed.', 'advanced-gutenberg') : '',
                                    checked: currentControlKey(advgbBlockControls, 'browser', 'enabled'),
                                    onChange: function onChange() {
                                        return _this7.changeControlKey('browser', 'enabled');
                                    }
                                }),
                                currentControlKey(advgbBlockControls, 'browser', 'enabled') && React.createElement(
                                    Fragment,
                                    null,
                                    React.createElement(
                                        "div",
                                        { className: "advgb-revert-mb" },
                                        React.createElement(SelectControl, {
                                            value: currentControlKey(advgbBlockControls, 'browser', 'approach'),
                                            options: [{
                                                value: 'public',
                                                label: __('Show in all browsers', 'advanced-gutenberg')
                                            }, {
                                                value: 'include',
                                                label: __('Show in the selected browsers', 'advanced-gutenberg')
                                            }, {
                                                value: 'exclude',
                                                label: __('Hide in the selected browsers', 'advanced-gutenberg')
                                            }],
                                            onChange: function onChange(value) {
                                                return _this7.changeControlKey('browser', 'approach', value);
                                            }
                                        })
                                    ),
                                    (currentControlKey(advgbBlockControls, 'browser', 'approach') === 'include' || currentControlKey(advgbBlockControls, 'browser', 'approach') === 'exclude') && React.createElement(
                                        Fragment,
                                        null,
                                        React.createElement(FormTokenField, {
                                            multiple: true,
                                            label: __('Select browsers', 'advanced-gutenberg'),
                                            placeholder: __('Search', 'advanced-gutenberg'),
                                            suggestions: (0, _utils.getOptionSuggestions)(this.getBrowsers()),
                                            maxSuggestions: 10,
                                            value: (0, _utils.getOptionTitles)(!!currentControlKey(advgbBlockControls, 'browser', 'browsers') ? currentControlKey(advgbBlockControls, 'browser', 'browsers') : [], this.getBrowsers()),
                                            onChange: function onChange(value) {
                                                _this7.changeControlKey('browser', 'browsers', (0, _utils.getOptionSlugs)(value, _this7.getBrowsers()));
                                            },
                                            __experimentalExpandOnFocus: true
                                        }),
                                        React.createElement(
                                            Notice,
                                            {
                                                className: "advgb-notice-sidebar",
                                                status: "warning",
                                                isDismissible: false
                                            },
                                            __('Please note the result could not be 100% accurate due some browsers can mimic a different browser.', 'advanced-gutenberg')
                                        )
                                    )
                                )
                            ),
                            isControlEnabled(advgb_block_controls_vars.controls.platform) && React.createElement(
                                Fragment,
                                null,
                                React.createElement(ToggleControl, {
                                    label: __('Platforms', 'advanced-gutenberg'),
                                    help: currentControlKey(advgbBlockControls, 'platform', 'enabled') ? __('Choose in which platforms this block can be displayed.', 'advanced-gutenberg') : '',
                                    checked: currentControlKey(advgbBlockControls, 'platform', 'enabled'),
                                    onChange: function onChange() {
                                        return _this7.changeControlKey('platform', 'enabled');
                                    }
                                }),
                                currentControlKey(advgbBlockControls, 'platform', 'enabled') && React.createElement(
                                    Fragment,
                                    null,
                                    React.createElement(
                                        "div",
                                        { className: "advgb-revert-mb" },
                                        React.createElement(SelectControl, {
                                            value: currentControlKey(advgbBlockControls, 'platform', 'approach'),
                                            options: [{
                                                value: 'public',
                                                label: __('Show in all platforms', 'advanced-gutenberg')
                                            }, {
                                                value: 'include',
                                                label: __('Show in the selected platforms', 'advanced-gutenberg')
                                            }, {
                                                value: 'exclude',
                                                label: __('Hide in the selected platforms', 'advanced-gutenberg')
                                            }],
                                            onChange: function onChange(value) {
                                                return _this7.changeControlKey('platform', 'approach', value);
                                            }
                                        })
                                    ),
                                    (currentControlKey(advgbBlockControls, 'platform', 'approach') === 'include' || currentControlKey(advgbBlockControls, 'platform', 'approach') === 'exclude') && React.createElement(
                                        Fragment,
                                        null,
                                        React.createElement(FormTokenField, {
                                            multiple: true,
                                            label: __('Select platforms', 'advanced-gutenberg'),
                                            placeholder: __('Search', 'advanced-gutenberg'),
                                            suggestions: (0, _utils.getOptionSuggestions)(this.getPlatforms()),
                                            maxSuggestions: 10,
                                            value: (0, _utils.getOptionTitles)(!!currentControlKey(advgbBlockControls, 'platform', 'platforms') ? currentControlKey(advgbBlockControls, 'platform', 'platforms') : [], this.getPlatforms()),
                                            onChange: function onChange(value) {
                                                _this7.changeControlKey('platform', 'platforms', (0, _utils.getOptionSlugs)(value, _this7.getPlatforms()));
                                            },
                                            __experimentalExpandOnFocus: true
                                        }),
                                        React.createElement(
                                            Notice,
                                            {
                                                className: "advgb-notice-sidebar",
                                                status: "warning",
                                                isDismissible: false
                                            },
                                            __('Please note the result could not be 100% accurate due some browsers can mimic a different platform.', 'advanced-gutenberg')
                                        )
                                    )
                                )
                            ),
                            !this.isPost() && // Disabled in post edit
                            React.createElement(
                                Fragment,
                                null,
                                isControlEnabled(advgb_block_controls_vars.controls.taxonomy) && React.createElement(
                                    Fragment,
                                    null,
                                    React.createElement(ToggleControl, {
                                        label: __('Taxonomies & terms', 'advanced-gutenberg'),
                                        help: currentControlKey(advgbBlockControls, 'taxonomy', 'enabled') ? __('Choose in which taxonomies & terms pages this block can be displayed.', 'advanced-gutenberg') : '',
                                        checked: currentControlKey(advgbBlockControls, 'taxonomy', 'enabled'),
                                        onChange: function onChange() {
                                            return _this7.changeControlKey('taxonomy', 'enabled');
                                        }
                                    }),
                                    currentControlKey(advgbBlockControls, 'taxonomy', 'enabled') && React.createElement(
                                        Fragment,
                                        null,
                                        React.createElement(FormTokenField, {
                                            multiple: true,
                                            label: __('Select taxonomies', 'advanced-gutenberg'),
                                            placeholder: __('Search taxonomies', 'advanced-gutenberg'),
                                            suggestions: (0, _utils.getOptionSuggestions)(this.getTaxonomies()),
                                            maxSuggestions: 10,
                                            value: (0, _utils.getOptionTitles)(!!currentControlKey(advgbBlockControls, 'taxonomy', 'taxonomies') ? currentControlKey(advgbBlockControls, 'taxonomy', 'taxonomies') : [], this.getTaxonomies()),
                                            onChange: function onChange(value) {
                                                var taxonomies = (0, _utils.getOptionSlugs)(value, _this7.getTaxonomies());
                                                _this7.changeControlKey('taxonomy', 'taxonomies', taxonomies);
                                            },
                                            __experimentalExpandOnFocus: true
                                        }),
                                        currentControlKey(advgbBlockControls, 'taxonomy', 'taxonomies').length > 0 && React.createElement(
                                            Fragment,
                                            null,
                                            React.createElement(
                                                "div",
                                                { className: "advgb-revert-mb--disabled", style: { marginBottom: 20 } },
                                                React.createElement(SelectControl, {
                                                    value: currentControlKey(advgbBlockControls, 'taxonomy', 'approach'),
                                                    options: [{
                                                        value: 'include',
                                                        label: __('Show on pages with selected terms', 'advanced-gutenberg')
                                                    }, {
                                                        value: 'exclude',
                                                        label: __('Hide on pages with selected terms', 'advanced-gutenberg')
                                                    }],
                                                    onChange: function onChange(value) {
                                                        return _this7.changeControlKey('taxonomy', 'approach', value);
                                                    }
                                                })
                                            ),
                                            React.createElement(FormTokenField, {
                                                multiple: true,
                                                label: __('Select terms', 'advanced-gutenberg'),
                                                placeholder: __('Search terms', 'advanced-gutenberg'),
                                                suggestions: (0, _utils.getOptionSuggestions)(this.state.termOptions),
                                                maxSuggestions: 10,
                                                value: (0, _utils.getOptionTitles)(!!currentControlKey(advgbBlockControls, 'taxonomy', 'terms') ? currentControlKey(advgbBlockControls, 'taxonomy', 'terms') : [], this.state.termOptions),
                                                onChange: function onChange(value) {
                                                    _this7.changeControlKey('taxonomy', 'terms', (0, _utils.getOptionSlugs)(value, _this7.state.termOptions));
                                                },
                                                onInputChange: function onInputChange(value) {
                                                    _this7.setState({
                                                        searchTermWord: value
                                                    });
                                                }
                                            })
                                        )
                                    )
                                ),
                                isControlEnabled(advgb_block_controls_vars.controls.page) && React.createElement(
                                    Fragment,
                                    null,
                                    React.createElement(ToggleControl, {
                                        label: __('Pages', 'advanced-gutenberg'),
                                        help: currentControlKey(advgbBlockControls, 'page', 'enabled') ? __('Choose in which pages this block can be displayed.', 'advanced-gutenberg') : '',
                                        checked: currentControlKey(advgbBlockControls, 'page', 'enabled'),
                                        onChange: function onChange() {
                                            return _this7.changeControlKey('page', 'enabled');
                                        }
                                    }),
                                    currentControlKey(advgbBlockControls, 'page', 'enabled') && React.createElement(
                                        Fragment,
                                        null,
                                        React.createElement(
                                            "div",
                                            { className: "advgb-revert-mb" },
                                            React.createElement(SelectControl, {
                                                value: currentControlKey(advgbBlockControls, 'page', 'approach'),
                                                options: [{
                                                    value: 'include',
                                                    label: __('Show on the selected pages', 'advanced-gutenberg')
                                                }, {
                                                    value: 'exclude',
                                                    label: __('Hide on the selected pages', 'advanced-gutenberg')
                                                }],
                                                onChange: function onChange(value) {
                                                    return _this7.changeControlKey('page', 'approach', value);
                                                }
                                            })
                                        ),
                                        (currentControlKey(advgbBlockControls, 'page', 'approach') === 'include' || currentControlKey(advgbBlockControls, 'page', 'approach') === 'exclude') && React.createElement(FormTokenField, {
                                            multiple: true,
                                            label: __('Select pages', 'advanced-gutenberg'),
                                            placeholder: __('Search', 'advanced-gutenberg'),
                                            suggestions: (0, _utils.getOptionSuggestions)(this.getPages()),
                                            maxSuggestions: 10,
                                            value: (0, _utils.getOptionTitles)(!!currentControlKey(advgbBlockControls, 'page', 'pages') ? currentControlKey(advgbBlockControls, 'page', 'pages') : [], this.getPages()),
                                            onChange: function onChange(value) {
                                                _this7.changeControlKey('page', 'pages', (0, _utils.getOptionSlugs)(value, _this7.getPages()));
                                            },
                                            __experimentalExpandOnFocus: true
                                        })
                                    )
                                )
                            )
                        )
                    ), React.createElement(BlockEdit, _extends({ key: "block-edit-advgb-dates" }, this.props))];
                }
            }]);

            return BlockControlsEdit;
        }(Component);
    }, 'withEditControls');

    // Add option to add controls for supported blocks
    addFilter('editor.BlockEdit', 'advgb/addBlockControls', withEditControls);

    var withAttributes = createHigherOrderComponent(function (BlockListBlock) {
        return function (props) {
            if (!NON_SUPPORTED_BLOCKS.includes(props.name) && hasBlockSupport(props.name, 'advgb/blockControls', true) && isAnyControlEnabledGlobal()) {
                var advgbBlockControls = props.attributes.advgbBlockControls;

                var advgbBcClass = props.isSelected === false && isAnyControlEnabledBlock(advgbBlockControls) ? 'advgb-bc-editor-preview' : '';

                return React.createElement(BlockListBlock, _extends({}, props, { className: (0, _classnames2.default)(props.className, advgbBcClass), advgbBlockControls: "" + advgbBlockControls }));
            }

            return React.createElement(BlockListBlock, props);
        };
    }, 'withAttributes');

    // Apply attributes and CSS classes on backend
    addFilter('editor.BlockListBlock', 'advgb/loadBackendBlockControls', withAttributes);
})(wp.i18n, wp.hooks, wp.blocks, wp.blockEditor, wp.components, wp.compose, wp.element);

/***/ }),

/***/ 0:
/*!*******************************************************************!*\
  !*** multi ./src/assets/blocks/block-controls/block-controls.jsx ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/assets/blocks/block-controls/block-controls.jsx */"./src/assets/blocks/block-controls/block-controls.jsx");


/***/ })

/******/ });
//# sourceMappingURL=block-controls.js.map