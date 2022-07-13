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

/***/ "./src/assets/blocks/0-adv-components/components.jsx":
/*!***********************************************************!*\
  !*** ./src/assets/blocks/0-adv-components/components.jsx ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.AdvColorControl = AdvColorControl;
exports.AdvDateTimeControl = AdvDateTimeControl;
function AdvColorControl(props) {
    var _wp$components = wp.components,
        ColorIndicator = _wp$components.ColorIndicator,
        BaseControl = _wp$components.BaseControl;

    var _ref = wp.blockEditor || wp.editor,
        ColorPalette = _ref.ColorPalette;

    var BaseLabel = BaseControl.VisualLabel ? BaseControl.VisualLabel : "span";

    var label = props.label,
        value = props.value,
        onChange = props.onChange;

    return React.createElement(
        BaseControl,
        {
            className: "editor-color-palette-control block-editor-color-palette-control"
        },
        React.createElement(
            BaseLabel,
            { className: "components-base-control__label" },
            label,
            value && React.createElement(ColorIndicator, { colorValue: value })
        ),
        React.createElement(ColorPalette, {
            className: "editor-color-palette-control__color-palette block-editor-color-palette-control__color-palette",
            value: value,
            onChange: onChange
        })
    );
}

function AdvDateTimeControl(props) {
    var _wp$components2 = wp.components,
        Button = _wp$components2.Button,
        DateTimePicker = _wp$components2.DateTimePicker,
        Popover = _wp$components2.Popover,
        Tooltip = _wp$components2.Tooltip;
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

/***/ "./src/assets/blocks/block-visibility/block-visibility.jsx":
/*!*****************************************************************!*\
  !*** ./src/assets/blocks/block-visibility/block-visibility.jsx ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _components = __webpack_require__(/*! ../0-adv-components/components.jsx */ "./src/assets/blocks/0-adv-components/components.jsx");

(function (wpI18n, wpHooks, wpBlocks, wpBlockEditor, wpComponents, wpCompose) {
    wpBlockEditor = wp.blockEditor || wp.editor;
    var addFilter = wpHooks.addFilter;
    var __ = wpI18n.__;
    var hasBlockSupport = wpBlocks.hasBlockSupport;
    var _wpBlockEditor = wpBlockEditor,
        InspectorControls = _wpBlockEditor.InspectorControls;
    var DateTimePicker = wpComponents.DateTimePicker,
        ToggleControl = wpComponents.ToggleControl,
        PanelBody = wpComponents.PanelBody,
        PanelRow = wpComponents.PanelRow,
        Button = wpComponents.Button,
        Notice = wpComponents.Notice;
    var createHigherOrderComponent = wpCompose.createHigherOrderComponent;
    var Fragment = wp.element.Fragment;

    // null: all blocks supported
    // non-empty array: only the specified blocks supported

    var SUPPORTED_BLOCKS = null;

    // do not show this feature if disabled.
    if (!parseInt(advg_settings.block_visibility)) return;

    // Register block visibility to blocks attributes
    addFilter('blocks.registerBlockType', 'advgb/blockVisibility', function (settings) {
        if (!SUPPORTED_BLOCKS || SUPPORTED_BLOCKS.includes(settings.name)) {
            settings.attributes = _extends(settings.attributes, {
                bvEnabled: {
                    type: 'boolean',
                    default: false
                },
                bvDateFrom: {
                    type: 'string'
                },
                bvDateTo: {
                    type: 'string'
                },
                bvRecur: {
                    type: 'boolean',
                    default: false
                }
            });
        }

        return settings;
    });

    // Add option to add dates for supported blocks
    addFilter('editor.BlockEdit', 'advgb/addBlockVisibility', function (BlockEdit) {
        return function (props) {
            var _props$attributes = props.attributes,
                bvEnabled = _props$attributes.bvEnabled,
                bvDateFrom = _props$attributes.bvDateFrom,
                bvDateTo = _props$attributes.bvDateTo,
                bvRecur = _props$attributes.bvRecur;


            return [props.isSelected && (!SUPPORTED_BLOCKS || SUPPORTED_BLOCKS.includes(props.name)) && React.createElement(
                InspectorControls,
                { key: 'advgb-bv-controls' },
                React.createElement(
                    PanelBody,
                    {
                        title: __('Block Visibility', 'advanced-gutenberg'),
                        icon: 'visibility',
                        initialOpen: false,
                        className: bvEnabled && (bvDateFrom || bvDateTo) ? 'advgb-bv-panel-icon' : ''
                    },
                    React.createElement(ToggleControl, {
                        label: __('Enable block schedule', 'advanced-gutenberg'),
                        checked: bvEnabled,
                        onChange: function onChange() {
                            return props.setAttributes({ bvEnabled: !bvEnabled });
                        }
                    }),
                    bvEnabled && React.createElement(
                        Fragment,
                        null,
                        React.createElement(_components.AdvDateTimeControl, {
                            buttonLabel: __('Now', 'advanced-gutenberg'),
                            dateLabel: __('Start showing', 'advanced-gutenberg'),
                            date: bvDateFrom,
                            onChangeDate: function onChangeDate(newDate) {
                                props.setAttributes({ bvDateFrom: newDate });
                            },
                            onDateClear: function onDateClear() {
                                return props.setAttributes({ bvDateFrom: null });
                            },
                            onInvalidDate: false
                        }),
                        React.createElement(_components.AdvDateTimeControl, {
                            buttonLabel: __('Never', 'advanced-gutenberg'),
                            dateLabel: __('Stop showing', 'advanced-gutenberg'),
                            date: !!bvDateTo ? bvDateTo : null,
                            onChangeDate: function onChangeDate(newDate) {
                                props.setAttributes({ bvDateTo: newDate });
                            },
                            onDateClear: function onDateClear() {
                                return props.setAttributes({ bvDateTo: null });
                            },
                            onInvalidDate: function onInvalidDate(date) {
                                // Disable all dates before bvDateFrom
                                if (bvDateFrom) {
                                    var thisDate = new Date(date.getTime());
                                    thisDate.setHours(0, 0, 0, 0);
                                    var fromDate = new Date(bvDateFrom);
                                    fromDate.setHours(0, 0, 0, 0);
                                    return thisDate.getTime() < fromDate.getTime();
                                }
                            }
                        }),
                        bvDateFrom > bvDateTo && React.createElement(
                            Notice,
                            {
                                className: 'advgb-notice-sidebar',
                                status: 'warning',
                                isDismissible: false
                            },
                            __('Stop showing should be after Start showing!', 'advanced-gutenberg')
                        ),
                        bvDateFrom && bvDateTo && React.createElement(ToggleControl, {
                            label: __('Recurring', 'advanced-gutenberg'),
                            checked: bvRecur,
                            onChange: function onChange() {
                                return props.setAttributes({ bvRecur: !bvRecur });
                            },
                            help: __('Show the block within the date interval every year', 'advanced-gutenberg')
                        })
                    )
                )
            ), React.createElement(BlockEdit, _extends({ key: 'block-edit-advgb-dates' }, props))];
        };
    });

    var withAttributes = createHigherOrderComponent(function (BlockListBlock) {
        return function (props) {
            if ((!SUPPORTED_BLOCKS || SUPPORTED_BLOCKS.includes(props.name)) && hasBlockSupport(props.name, 'advgb/blockVisibility', true)) {
                var _props$attributes2 = props.attributes,
                    bvEnabled = _props$attributes2.bvEnabled,
                    bvDateFrom = _props$attributes2.bvDateFrom,
                    bvDateTo = _props$attributes2.bvDateTo,
                    bvRecur = _props$attributes2.bvRecur;


                var advgbBvClass = props.isSelected === false && bvEnabled && (bvDateFrom || bvDateTo) ? 'advgb-bv-editor-preview' : '';

                return React.createElement(BlockListBlock, _extends({}, props, { className: advgbBvClass, bvDateFrom: '' + bvDateFrom, bvDateTo: '' + bvDateTo, bvEnabled: '' + bvEnabled, bvRecur: '' + bvRecur }));
            }

            return React.createElement(BlockListBlock, props);
        };
    }, 'withAttributes');

    // Apply custom styles on back-end
    wp.hooks.addFilter('editor.BlockListBlock', 'advgb/loadBackendBlockVisibility', withAttributes);
})(wp.i18n, wp.hooks, wp.blocks, wp.blockEditor, wp.components, wp.compose);

/***/ }),

/***/ 0:
/*!***********************************************************************!*\
  !*** multi ./src/assets/blocks/block-visibility/block-visibility.jsx ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/assets/blocks/block-visibility/block-visibility.jsx */"./src/assets/blocks/block-visibility/block-visibility.jsx");


/***/ })

/******/ });
//# sourceMappingURL=block-visibility.js.map