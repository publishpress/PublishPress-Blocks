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
	var nativeCodeString = '[native code]';

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
				if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
					classes.push(arg.toString());
					continue;
				}

				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
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

/***/ "./node_modules/hour-convert/index.js":
/*!********************************************!*\
  !*** ./node_modules/hour-convert/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {

    /**
     * Convert 24-hour time to 12-hour format.
     *
     * @param {number} hour Hour to convert (0-23)
     * @return {object} { hour, meridiem } (meridian is also returned for backwards compatibility)
     */
    to12Hour: function to12Hour(hour) {
        var meridiem = hour < 12 ? 'am' : 'pm';
        return {
            hour: ((hour + 11) % 12 + 1),
            meridiem: meridiem,
            meridian: meridiem
        };
    },

    /**
     * Convert 12-hour time to 24-hour format.
     *
     * @param {object} time Time object
     * @param {number} time.hour Hour to convert (1-12)
     * @param {string} time.meridiem Hour meridiem (am/pm). 'time.meridian' is
     *  supported for backwards compatibility.
     * @return {number}
     */
    to24Hour: function to24Hour(time) {
        var meridiem = time.meridiem || time.meridian;
        return (meridiem === 'am' ? 0 : 12) + (time.hour % 12);
    }
};


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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.AdvDateTimeControl = AdvDateTimeControl;
exports.AdvDaysControl = AdvDaysControl;
exports.AdvTimeControl = AdvTimeControl;

var _hourConvert = __webpack_require__(/*! hour-convert */ "./node_modules/hour-convert/index.js");

var _hourConvert2 = _interopRequireDefault(_hourConvert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _wp$components = wp.components,
    ButtonGroup = _wp$components.ButtonGroup,
    Button = _wp$components.Button,
    DateTimePicker = _wp$components.DateTimePicker,
    TextControl = _wp$components.TextControl,
    CheckboxControl = _wp$components.CheckboxControl,
    Popover = _wp$components.Popover,
    Tooltip = _wp$components.Tooltip;
var _wp$element = wp.element,
    Component = _wp$element.Component,
    Fragment = _wp$element.Fragment,
    useState = _wp$element.useState;
var _wp$i18n = wp.i18n,
    __ = _wp$i18n.__,
    _x = _wp$i18n._x;
function AdvDateTimeControl(props) {
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

function AdvDaysControl(props) {
    var allDays = [{ slug: 0, label: _x('S', 'Sunday first letter', 'advanced-gutenberg') }, // Sunday
    { slug: 1, label: __('M', 'advanced-gutenberg') }, // Monday
    { slug: 2, label: _x('T', 'Tuesday first letter', 'advanced-gutenberg') }, // Tuesday
    { slug: 3, label: __('W', 'advanced-gutenberg') }, // Wednesday
    { slug: 4, label: _x('T', 'Thursday first letter', 'advanced-gutenberg') }, // Thursday
    { slug: 5, label: __('F', 'advanced-gutenberg') }, // Friday
    { slug: 6, label: _x('S', 'Saturday first letter', 'advanced-gutenberg') // Saturday
    }];

    var label = props.label,
        days = props.days,
        onChangeDays = props.onChangeDays;

    // Use a single state variable to store the selected days

    var _useState3 = useState(days),
        _useState4 = _slicedToArray(_useState3, 2),
        selectedDays = _useState4[0],
        setSelectedDays = _useState4[1];

    /**
    * Check if the day is selected or not
    *
    * @since 3.1.2
    *
    * @param {string} Day slug e.g. 'u' for Sunday, 't' for Tuesday
    *
    * @return {bool}
    */


    function isDaySelected(slug) {
        return selectedDays.some(function (el) {
            return el === slug;
        });
    }

    /**
    * Update the selected days state when a checkbox is changed
    *
    * @since 3.1.2
    *
    * @param {string} Day slug e.g. 'u' for Sunday, 't' for Tuesday
    *
    * @return {void}
    */
    function onChangeDay(slug) {

        // Check if the day is already selected
        var isSelected = isDaySelected(slug);

        // Create a new array with the updated selection
        var updatedDays = void 0;
        if (isSelected) {
            // Remove the day from the selected days
            updatedDays = selectedDays.filter(function (el) {
                return el !== slug;
            });
        } else {
            // Add the day to the selected days
            var findDay = allDays.find(function (el) {
                return el.slug === slug;
            });
            updatedDays = [].concat(_toConsumableArray(selectedDays), [findDay.slug]);
        }

        // Remove duplicates
        var uniqueDays = [].concat(_toConsumableArray(new Set(updatedDays)));

        // Update the selected days state
        setSelectedDays(uniqueDays);

        // Call the onChangeDays prop to notify the parent component of the change
        if (onChangeDays) {
            onChangeDays(updatedDays);
        }
    }

    return React.createElement(
        Fragment,
        null,
        React.createElement(
            "div",
            { className: "advgb-checkbox-wrapper" },
            React.createElement(
                "label",
                null,
                label
            ),
            React.createElement(
                "div",
                { className: "advgb-checkbox-inline" },
                allDays.map(function (day) {
                    return React.createElement(CheckboxControl, {
                        label: day.label,
                        checked: isDaySelected(day.slug),
                        onChange: function onChange() {
                            return onChangeDay(day.slug);
                        }
                    });
                })
            )
        )
    );
}

var AdvTimeClass = function (_Component) {
    _inherits(AdvTimeClass, _Component);

    function AdvTimeClass(props) {
        _classCallCheck(this, AdvTimeClass);

        var _this = _possibleConstructorReturn(this, (AdvTimeClass.__proto__ || Object.getPrototypeOf(AdvTimeClass)).call(this, props));

        _this.state = {
            onChangeTime: null,
            currentTime: _this.props.currentTime || null,
            hours: null,
            minutes: null,
            meridian: 'am',
            onInit: true
        };
        return _this;
    }

    _createClass(AdvTimeClass, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var _state = this.state,
                onChangeTime = _state.onChangeTime,
                currentTime = _state.currentTime,
                onInit = _state.onInit;


            if (this.props.onChangeTime !== onChangeTime) {
                this.setState({
                    onChangeTime: this.props.onChangeTime
                });
            }

            if (this.props.currentTime !== currentTime) {
                this.setState({
                    currentTime: this.props.currentTime
                });
            }

            // Init
            if (currentTime && currentTime.includes(':') && onInit) {
                this.setState({
                    hours: currentTime.split(':')[0],
                    minutes: currentTime.split(':')[1],
                    meridian: parseInt(currentTime.split(':')[0]) > 11 ? 'pm' : 'am', // We set > 11 because PM starts from 12:00:00
                    onInit: false
                });
            }
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, prevState) {
            var _props = this.props,
                onChangeTime = _props.onChangeTime,
                currentTime = _props.currentTime;
            var _state2 = this.state,
                hours = _state2.hours,
                minutes = _state2.minutes,
                meridian = _state2.meridian;
            var prevHours = prevState.hours,
                prevMinutes = prevState.minutes,
                prevMeridian = prevState.meridian;


            if (hours !== prevHours || minutes !== prevMinutes || meridian !== prevMeridian) {

                // When clearing time
                if (!hours && !minutes) {
                    return;
                }

                // Default minutes when hours selected
                if (hours && !minutes) {
                    this.setState({
                        minutes: '00'
                    });
                }

                // Default hours when minutes selected
                if (minutes && !hours) {
                    this.setState({
                        hours: '01'
                    });
                }

                /* Convert 12-hours to 24-hours.
                 * e.g. 12:00 AM becomes 00:00:00
                 *      12:00 PM becomes 12:00:00
                 *      01:00 PM becomes 13:00:00
                 */
                var savedTime = this.appendZero(_hourConvert2.default.to24Hour({
                    hour: parseInt(hours),
                    meridiem: meridian
                })) + ":" + minutes + ":00";

                // Value saved in source/attribute
                this.props.onChangeTime(savedTime);
            }
        }

        /**
         * Append zero to one digit numbers. e.g. 9 becomes '09'
         *
         * @since 3.1.2
         *
         * @param {string value Hours or minutes
         *
         * @return {string}
         */

    }, {
        key: "appendZero",
        value: function appendZero(value) {
            if (isNaN(value)) {
                return;
            }

            var res = parseInt(value);

            return res > 9 ? res : "0" + res;
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var _state3 = this.state,
                onChangeTime = _state3.onChangeTime,
                currentTime = _state3.currentTime,
                hours = _state3.hours,
                minutes = _state3.minutes,
                meridian = _state3.meridian;

            // Make sure hours are valid. 01: min, 12: max

            var handleChangeHours = function handleChangeHours(event) {
                var value = Math.max(1, Math.min(12, Number(event.target.value)));
                _this2.setState({
                    hours: _this2.appendZero(value)
                });
            };

            // Allow to use up/down keys for hours
            var handleKeyDownHours = function handleKeyDownHours(event) {
                var value = Number(event.target.value);
                if (event.key === 'ArrowUp' && value < 12) {
                    _this2.setState({
                        hours: _this2.appendZero(value + 1)
                    });
                } else if (event.key === 'ArrowDown' && value > 1) {
                    _this2.setState({
                        hours: _this2.appendZero(value - 1)
                    });
                }
            };

            // Make sure minutes are valid. 01: min, 59: max
            var handleChangeMinutes = function handleChangeMinutes(event) {
                var value = Math.max(0, Math.min(59, Number(event.target.value)));
                _this2.setState({
                    minutes: _this2.appendZero(value)
                });
            };

            // Allow to use up/down keys for minutes
            var handleKeyDownMinutes = function handleKeyDownMinutes(event) {
                var value = Number(event.target.value);
                if (event.key === 'ArrowUp' && value < 59) {
                    _this2.setState({
                        minutes: _this2.appendZero(value + 1)
                    });
                } else if (event.key === 'ArrowDown' && value > 0) {
                    _this2.setState({
                        minutes: _this2.appendZero(value - 1)
                    });
                }
            };

            return React.createElement(
                Fragment,
                null,
                React.createElement(
                    "div",
                    { className: "advgb-advtime-control" },
                    React.createElement(
                        "label",
                        null,
                        this.props.label
                    ),
                    React.createElement(
                        "div",
                        { className: "advgb-advtime-hours-minutes" },
                        React.createElement("input", {
                            type: "text",
                            value: hours ? this.appendZero(_hourConvert2.default.to12Hour(parseInt(hours)).hour) : '',
                            onChange: handleChangeHours,
                            onKeyDown: handleKeyDownHours,
                            placeholder: "--"
                        }),
                        React.createElement(
                            "span",
                            null,
                            ":"
                        ),
                        React.createElement("input", {
                            type: "text",
                            value: minutes ? minutes : '',
                            onChange: handleChangeMinutes,
                            onKeyDown: handleKeyDownMinutes,
                            placeholder: "--"
                        })
                    ),
                    React.createElement(
                        ButtonGroup,
                        { className: "advgb-advtime-meridian" },
                        React.createElement(
                            Button,
                            {
                                variant: meridian === null || meridian === 'am' ? 'primary' : 'secondary',
                                onClick: function onClick() {
                                    _this2.setState({
                                        meridian: 'am'
                                    });
                                },
                                disabled: hours && minutes ? false : true
                            },
                            __('AM', 'advanced-gutenberg')
                        ),
                        React.createElement(
                            Button,
                            {
                                variant: meridian === 'pm' ? 'primary' : 'secondary',
                                onClick: function onClick() {
                                    _this2.setState({
                                        meridian: 'pm'
                                    });
                                },
                                disabled: hours && minutes ? false : true
                            },
                            __('PM', 'advanced-gutenberg')
                        )
                    ),
                    hours && minutes && React.createElement(Button, {
                        className: "advgb-advtime-remove-icon",
                        icon: "no-alt",
                        onClick: function onClick() {
                            _this2.props.onTimeClear();
                            _this2.setState({
                                hours: null,
                                minutes: null,
                                meridian: 'am'
                            });
                        }
                    })
                )
            );
        }
    }]);

    return AdvTimeClass;
}(Component);

exports.default = AdvTimeClass;
function AdvTimeControl(props) {
    var label = props.label,
        currentTime = props.currentTime,
        onChangeTime = props.onChangeTime,
        onTimeClear = props.onTimeClear;


    return React.createElement(AdvTimeClass, {
        label: label,
        currentTime: currentTime,
        onChangeTime: onChangeTime,
        onTimeClear: onTimeClear
    });
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
    var sprintf = wpI18n.sprintf,
        __ = wpI18n.__;
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
                    taxModOptions: [], // Store modified taxonomy options to decide if selected tax is for "all terms" or "selected terms"
                    termOptions: [], // Store term options with slug (id) and title
                    searchTermWord: '', // Updated when searching terms
                    initArchive: true, // When true, trigger initArchiveControl()
                    updateTaxLabels: false // When true, update taxonomy option labels
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
                 * @param {string} value    The control key value (not required for boolean keys)
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
                    var archiveControl = {
                        control: 'archive',
                        enabled: true,
                        taxonomies: [],
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

                            case 'archive':
                                setAttributes({
                                    advgbBlockControls: [].concat(_toConsumableArray(advgbBlockControls), [archiveControl])
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

                            case 'archive':
                                setAttributes({
                                    advgbBlockControls: [archiveControl]
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
                 * Update archive control in advgbBlockControls attribute when taxonomies value changes
                 *
                 * @since 3.1.2
                 *
                 * @param {string} topic 'taxonomies' or 'terms'
                 * @param {string} slugs The taxonomy slugs or term ids to insert/modify. e.g. ['category','post_tag'] or [82,161,99] or ['all_<taxonomy_slug>']
                 *
                 * @return {void}
                 */

            }, {
                key: "changeArchiveControl",
                value: function changeArchiveControl(topic, slugs) {
                    var _this4 = this;

                    var _props2 = this.props,
                        attributes = _props2.attributes,
                        setAttributes = _props2.setAttributes;
                    var advgbBlockControls = attributes.advgbBlockControls;


                    var taxArray = [];
                    var controlIndex = advgbBlockControls.findIndex(function (element) {
                        return element.control === 'archive';
                    });

                    // No control found (this check seems not necessary but is here to prevent an unlikely error)
                    if (controlIndex < 0) {
                        return false;
                    }

                    var newArray = [].concat(_toConsumableArray(advgbBlockControls));

                    if (topic === 'taxonomies') {

                        // Check each taxonomy and its terms
                        slugs.forEach(function (item) {

                            // Get terms from current taxonomy (item)
                            var taxIndex = newArray[controlIndex].taxonomies.findIndex(function (element) {
                                return element.tax === item;
                            });

                            if (taxIndex === -1) {

                                // The last selected taxonomy
                                taxArray.push({
                                    tax: item,
                                    terms: [],
                                    all: true
                                });
                            } else {

                                // Existing taxonomy
                                var terms = newArray[controlIndex].taxonomies[taxIndex].terms.length ? newArray[controlIndex].taxonomies[taxIndex].terms : [];
                                var approach = terms.length ? 'select' : 'all';

                                taxArray.push({
                                    tax: item,
                                    terms: terms,
                                    all: terms.length ? false : true
                                });
                            }
                        });

                        newArray[controlIndex] = _extends({}, newArray[controlIndex], _defineProperty({}, 'taxonomies', taxArray));

                        setAttributes({
                            advgbBlockControls: newArray
                        });
                    } else if (topic === 'terms') {

                        var terms = {};
                        var taxonomies = this.currentArchiveControl('taxonomies');

                        // Check each term id (item). slug means the id
                        slugs.forEach(function (item) {

                            // Find the current term in termOptions state to use its tax later
                            var option = _this4.state.termOptions.find(function (el) {
                                return el.slug === item;
                            });

                            if (terms[option.tax] === undefined) {
                                terms[option.tax] = [];
                            }

                            // Get taxonomy from current term (item)
                            var taxIndex = newArray[controlIndex].taxonomies.findIndex(function (element) {
                                return element.tax === option.tax;
                            });

                            /* Taxonomy for this term is selected? Is a bit reduntant but let's make sure
                             * Then include the term.
                             */
                            if (taxonomies.includes(option.tax)) {
                                terms[option.tax].push(item);
                            }
                        });

                        // Update taxonomies with at least one term selected
                        Object.keys(terms).forEach(function (tax) {

                            // Get taxonomy from current tax
                            var taxIndex = newArray[controlIndex].taxonomies.findIndex(function (element) {
                                return element.tax === tax;
                            });

                            if (taxIndex >= 0) {
                                newArray[controlIndex].taxonomies[taxIndex] = {
                                    tax: tax,
                                    terms: terms[tax],
                                    all: terms[tax].length ? false : true
                                };
                            }
                        });

                        // Include taxonomies with no terms selected (empty terms[option.tax] array)
                        taxonomies.forEach(function (tax) {
                            if (!Object.keys(terms).includes(tax)) {

                                // Get taxonomy from current tax
                                var taxIndex = newArray[controlIndex].taxonomies.findIndex(function (element) {
                                    return element.tax === tax;
                                });

                                if (taxIndex >= 0) {
                                    newArray[controlIndex].taxonomies[taxIndex] = {
                                        tax: tax,
                                        terms: [],
                                        all: true
                                    };
                                }
                            }
                        });

                        setAttributes({
                            advgbBlockControls: newArray
                        });
                    } else {
                        // Nothing to do here
                    }
                }

                /**
                 * Return merged taxonomies or terms
                 *
                 * @since 3.1.2
                 *
                 * @param {string} topic 'taxonomies' or 'terms'
                 *
                 * @return {array} An single array with all the selected terms or taxonomies ['category','post_tag'] or [99,182,42]
                 */

            }, {
                key: "currentArchiveControl",
                value: function currentArchiveControl(topic) {
                    var _props3 = this.props,
                        attributes = _props3.attributes,
                        setAttributes = _props3.setAttributes;
                    var advgbBlockControls = attributes.advgbBlockControls;


                    var result = [];

                    /* Get all the taxonomy objects.
                     * e.g.
                     * [
                     *     { "tax": "post_tag", "terms": [220,221]},
                     *     { "tax": "category", "terms": []}
                     * ]
                     */
                    var taxonomies = currentControlKey(advgbBlockControls, 'archive', 'taxonomies').length ? currentControlKey(advgbBlockControls, 'archive', 'taxonomies') : [];

                    if (topic === 'taxonomies') {

                        taxonomies.forEach(function (item) {
                            result.push(item.tax);
                        });
                    } else if (topic === 'terms') {

                        taxonomies.forEach(function (item) {
                            item.terms.forEach(function (el) {
                                result.push(el); // term id
                            });
                        });
                    } else {
                        // Nothing to do here
                    }

                    return result;
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
                    var _this5 = this;

                    var attributes = this.props.attributes;
                    var advgbBlockControls = attributes.advgbBlockControls;


                    var currentTerms = !!currentControlKey(advgbBlockControls, 'archive', 'terms') ? currentControlKey(advgbBlockControls, 'archive', 'terms') : [];
                    var taxonomies = !!currentControlKey(advgbBlockControls, 'archive', 'taxonomies') ? currentControlKey(advgbBlockControls, 'archive', 'taxonomies') : [];

                    if (currentTerms.length) {

                        var result = [];
                        currentTerms.forEach(function (slug) {
                            var itemIndex = _this5.state.termOptions.findIndex(function (item) {
                                return item.slug === slug;
                            });

                            /* Get only the terms that belongs to selected taxonomies
                             * and skip the ones that belongs to the deleted taxonomy
                             */
                            if (taxonomies.includes(_this5.state.termOptions[itemIndex].tax)) {
                                result.push(_this5.state.termOptions[itemIndex].slug);
                            }
                        });

                        this.changeControlKey('archive', 'terms', result);
                    }

                    /* Remove term options from non-selected taxonomies.
                     * Case scenario: the terms from the last removed taxonomy.
                     */
                    this.setState({
                        termOptions: this.state.termOptions.filter(function (item) {
                            return _this5.currentArchiveControl('taxonomies').includes(item.tax);
                        })
                    });

                    // Update tax label options to "All <taxonomy> terms" or "Selected <taxonomy> terms"
                    this.modifyTaxLabels();
                }

                /**
                 * Get selected terms on first load
                 *
                 * @since 3.1.1
                 *
                 * @return {void}
                 */

            }, {
                key: "initArchiveControl",
                value: function initArchiveControl() {
                    var _this6 = this;

                    var advgbBlockControls = this.props.attributes.advgbBlockControls;


                    wp.apiFetch({
                        path: wp.url.addQueryArgs('advgb/v1/terms', {
                            taxonomies: this.currentArchiveControl('taxonomies'),
                            ids: this.currentArchiveControl('terms')
                        })
                    }).then(function (list) {

                        // Update tax label options to "All <taxonomy> terms" or "Selected <taxonomy> terms"
                        _this6.modifyTaxLabels();

                        _this6.setState({
                            termOptions: list,
                            initArchive: false,
                            updateTaxLabels: false
                        });
                    });
                }

                /**
                 * Initial taxonomy labels to allow "All <taxonomy> terms" "Selected <taxonomy> terms" visual indicator
                 *
                 * @since 3.1.2
                 *
                 * @return {array}
                 */

            }, {
                key: "iniTaxLabels",
                value: function iniTaxLabels() {

                    var result = [];
                    this.getTaxonomies().forEach(function (item) {
                        /* Item example
                         *  {
                         *      "slug": "category",
                         *      "title": "All Category terms",
                         *      "singular": "Category"
                         *  }
                         */
                        result.push({
                            slug: item.slug,
                            title: sprintf(__('All %s terms', 'advanced-gutenberg'), item.title),
                            singular: item.title

                        });
                    });

                    return result;
                }

                /**
                 * Modify taxonomy labels. Very similar to iniTaxLabels()
                 *
                 * @since 3.1.2
                 *
                 * @return {array}
                 */

            }, {
                key: "modifyTaxLabels",
                value: function modifyTaxLabels() {
                    var advgbBlockControls = this.props.attributes.advgbBlockControls;

                    /* Get all selected taxonomy objects.
                     * e.g.
                     * [
                     *     { "tax": "post_tag", "terms": [220,221]},
                     *     { "tax": "category", "terms": []}
                     * ]
                     */

                    var taxonomies = currentControlKey(advgbBlockControls, 'archive', 'taxonomies').length ? currentControlKey(advgbBlockControls, 'archive', 'taxonomies') : [];

                    // Copy whole state
                    var options = [].concat(_toConsumableArray(this.state.taxModOptions));

                    options.forEach(function (item, index) {
                        var tax = taxonomies.find(function (el) {
                            return item.slug === el.tax;
                        });

                        // Copy option to modify
                        var option = _extends({}, options[index]);
                        // Update title value
                        option.title = sprintf(tax === undefined || !tax.terms.length ? __('All %s terms', 'advanced-gutenberg') : __('Selected %s terms', 'advanced-gutenberg'), option.singular);
                        // Add option back to the state
                        options[index] = option;
                    });

                    // Save
                    this.setState({
                        taxModOptions: options,
                        updateTaxLabels: false
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
                    var _this7 = this;

                    var _state = this.state,
                        termOptions = _state.termOptions,
                        searchTermWord = _state.searchTermWord;
                    var advgbBlockControls = this.props.attributes.advgbBlockControls;


                    wp.apiFetch({
                        /*/ To get taxonomies
                        path: wp.url.addQueryArgs( 'wp/v2/taxonomies', { context: 'edit' } )*/

                        path: wp.url.addQueryArgs('advgb/v1/terms', {
                            search: searchTermWord,
                            taxonomies: this.currentArchiveControl('taxonomies')
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

                        _this7.setState({
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
                key: "componentDidMount",
                value: function componentDidMount() {
                    this.setState({
                        taxModOptions: this.iniTaxLabels()
                    });
                }
            }, {
                key: "componentDidUpdate",
                value: function componentDidUpdate(prevProps, prevState) {
                    var _props4 = this.props,
                        attributes = _props4.attributes,
                        isSelected = _props4.isSelected,
                        name = _props4.name;
                    var advgbBlockControls = attributes.advgbBlockControls;
                    var prevBlockControls = prevProps.attributes.advgbBlockControls;
                    var _state2 = this.state,
                        searchTermWord = _state2.searchTermWord,
                        initArchive = _state2.initArchive;
                    var prevTermWord = prevState.searchTermWord;

                    // Get human readable selected terms on block selection the first time

                    if (!this.isPost() && !NON_SUPPORTED_BLOCKS.includes(name) && isSelected && initArchive && isControlEnabled(advgb_block_controls_vars.controls.archive) && currentControlKey(advgbBlockControls, 'archive', 'enabled') && this.currentArchiveControl('taxonomies').length && this.currentArchiveControl('terms').length) {
                        this.initArchiveControl();
                    }

                    // Search terms
                    if (searchTermWord !== prevTermWord && searchTermWord.length > 2) {
                        this.searchTerms();
                    }

                    // Update available terms and remove terms which taxonomy has been removed
                    if (!this.isPost() && isControlEnabled(advgb_block_controls_vars.controls.archive) && currentControlKey(advgbBlockControls, 'archive', 'enabled') && (currentControlKey(prevBlockControls, 'archive', 'taxonomies') !== currentControlKey(advgbBlockControls, 'archive', 'taxonomies') // This trigger works when taxo changes, but not terms
                    || this.state.updateTaxLabels // Trigger when terms changes
                    )) {
                        this.taxonomiesChanged();
                    }
                }
            }, {
                key: "render",
                value: function render() {
                    var _this8 = this;

                    var _props5 = this.props,
                        attributes = _props5.attributes,
                        setAttributes = _props5.setAttributes;
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
                                        return _this8.changeControlKey('schedule', 'enabled');
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
                                                return _this8.changeControlKey('schedule', 'dateFrom', newDate);
                                            },
                                            onDateClear: function onDateClear() {
                                                return _this8.changeControlKey('schedule', 'dateFrom', null);
                                            },
                                            onInvalidDate: false
                                        }),
                                        React.createElement(_datetime.AdvDateTimeControl, {
                                            buttonLabel: __('Never', 'advanced-gutenberg'),
                                            dateLabel: __('Stop showing', 'advanced-gutenberg'),
                                            date: !!currentControlKey(advgbBlockControls, 'schedule', 'dateTo') ? currentControlKey(advgbBlockControls, 'schedule', 'dateTo') : null,
                                            onChangeDate: function onChangeDate(newDate) {
                                                return _this8.changeControlKey('schedule', 'dateTo', newDate);
                                            },
                                            onDateClear: function onDateClear() {
                                                return _this8.changeControlKey('schedule', 'dateTo', null);
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
                                                return _this8.changeControlKey('schedule', 'recurring');
                                            },
                                            help: __('If Recurring is enabled, this block will be displayed every year between the selected dates.', 'advanced-gutenberg')
                                        }),
                                        React.createElement(_datetime.AdvDaysControl, {
                                            label: __('On these days (optional)', 'advanced-gutenberg'),
                                            days: !!currentControlKey(advgbBlockControls, 'schedule', 'days') ? currentControlKey(advgbBlockControls, 'schedule', 'days') : [],
                                            onChangeDays: function onChangeDays(value) {
                                                return _this8.changeControlKey('schedule', 'days', value);
                                            }
                                        }),
                                        React.createElement(
                                            "label",
                                            { style: { marginBottom: 8, display: 'block' } },
                                            __('Between these times (optional)', 'advanced-gutenberg')
                                        ),
                                        React.createElement(_datetime.AdvTimeControl, {
                                            label: __('From', 'advanced-gutenberg'),
                                            currentTime: !!currentControlKey(advgbBlockControls, 'schedule', 'timeFrom') ? currentControlKey(advgbBlockControls, 'schedule', 'timeFrom') : null,
                                            onChangeTime: function onChangeTime(newTime) {
                                                return _this8.changeControlKey('schedule', 'timeFrom', newTime);
                                            },
                                            onTimeClear: function onTimeClear() {
                                                return _this8.changeControlKey('schedule', 'timeFrom', null);
                                            }
                                        }),
                                        React.createElement(_datetime.AdvTimeControl, {
                                            label: __('To', 'advanced-gutenberg'),
                                            currentTime: currentControlKey(advgbBlockControls, 'schedule', 'timeTo') || null,
                                            onChangeTime: function onChangeTime(newTime) {
                                                return _this8.changeControlKey('schedule', 'timeTo', newTime);
                                            },
                                            onTimeClear: function onTimeClear() {
                                                return _this8.changeControlKey('schedule', 'timeTo', null);
                                            }
                                        }),
                                        currentControlKey(advgbBlockControls, 'schedule', 'timeFrom') && currentControlKey(advgbBlockControls, 'schedule', 'timeTo') && '01/01/2020T' + currentControlKey( // We append a dummy date to make a datetime comparison
                                        advgbBlockControls, 'schedule', 'timeFrom') >= '01/01/2020T' + currentControlKey( // We append a dummy date to make a datetime comparison
                                        advgbBlockControls, 'schedule', 'timeTo') && React.createElement(
                                            Notice,
                                            {
                                                className: "advgb-notice-sidebar",
                                                status: "warning",
                                                isDismissible: false
                                            },
                                            __('"To" time should be after "From" time!', 'advanced-gutenberg')
                                        ),
                                        (currentControlKey(advgbBlockControls, 'schedule', 'timeFrom') && !currentControlKey(advgbBlockControls, 'schedule', 'timeTo') || !currentControlKey(advgbBlockControls, 'schedule', 'timeFrom') && currentControlKey(advgbBlockControls, 'schedule', 'timeTo')) && React.createElement(
                                            Notice,
                                            {
                                                className: "advgb-notice-sidebar",
                                                status: "warning",
                                                isDismissible: false
                                            },
                                            __('Please choose "From" time and "To" time.', 'advanced-gutenberg')
                                        ),
                                        React.createElement(
                                            Notice,
                                            {
                                                className: "advgb-notice-sidebar",
                                                status: "info",
                                                isDismissible: false
                                            },
                                            typeof advgbBlocks.timezone !== 'undefined' && advgbBlocks.timezone.length ? advgbBlocks.timezone.replace(/_/g, ' ') + " " + __('time', 'advanced-gutenberg') : __('WordPress settings timezone', 'advanced-gutenberg')
                                        )
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
                                        return _this8.changeControlKey('user_role', 'enabled');
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
                                                value: 'hidden',
                                                label: __('Hide from everyone', 'advanced-gutenberg')
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
                                                return _this8.changeControlKey('user_role', 'approach', value);
                                            }
                                        })
                                    ),
                                    (currentControlKey(advgbBlockControls, 'user_role', 'approach') === 'include' || currentControlKey(advgbBlockControls, 'user_role', 'approach') === 'exclude') && React.createElement(
                                        Fragment,
                                        null,
                                        React.createElement(FormTokenField, {
                                            multiple: true,
                                            label: __('Select user roles', 'advanced-gutenberg'),
                                            placeholder: __('Search', 'advanced-gutenberg'),
                                            suggestions: (0, _utils.getOptionSuggestions)(this.getUserRoles()),
                                            maxSuggestions: 10,
                                            value: (0, _utils.getOptionTitles)(!!currentControlKey(advgbBlockControls, 'user_role', 'roles') ? currentControlKey(advgbBlockControls, 'user_role', 'roles') : [], this.getUserRoles()),
                                            onChange: function onChange(value) {
                                                _this8.changeControlKey('user_role', 'roles', (0, _utils.getOptionSlugs)(value, _this8.getUserRoles()));
                                            },
                                            __experimentalExpandOnFocus: true
                                        }),
                                        (currentControlKey(advgbBlockControls, 'user_role', 'approach') === 'include' || currentControlKey(advgbBlockControls, 'user_role', 'approach') === 'exclude') && !currentControlKey(advgbBlockControls, 'user_role', 'roles').length && React.createElement(
                                            Notice,
                                            {
                                                className: "advgb-notice-sidebar",
                                                status: "warning",
                                                isDismissible: false,
                                                style: { marginBottom: 30 }
                                            },
                                            __('Please select at least one user role.', 'advanced-gutenberg')
                                        )
                                    )
                                )
                            ),
                            this.isPost() &&
                            // Placeholder message when Archive and Page controls not available in post edit
                            React.createElement(
                                Fragment,
                                null,
                                React.createElement("hr", { className: "advgb-hr-separator" }),
                                React.createElement(
                                    "div",
                                    null,
                                    __('Term archives & Pages controls are available in Widgets and FSE screens.', 'advanced-gutenberg')
                                )
                            ),
                            !this.isPost() && // Disabled in post edit
                            React.createElement(
                                Fragment,
                                null,
                                isControlEnabled(advgb_block_controls_vars.controls.archive) && React.createElement(
                                    Fragment,
                                    null,
                                    React.createElement(ToggleControl, {
                                        label: __('Term archives', 'advanced-gutenberg'),
                                        help: currentControlKey(advgbBlockControls, 'archive', 'enabled') ? __('Choose on which taxonomies and terms archive pages your blocks can be displayed.', 'advanced-gutenberg') : '',
                                        checked: currentControlKey(advgbBlockControls, 'archive', 'enabled'),
                                        onChange: function onChange() {
                                            return _this8.changeControlKey('archive', 'enabled');
                                        }
                                    }),
                                    currentControlKey(advgbBlockControls, 'archive', 'enabled') && React.createElement(
                                        Fragment,
                                        null,
                                        React.createElement(
                                            "div",
                                            { className: "advgb-revert-mb--disabled", style: { marginBottom: 20 } },
                                            React.createElement(SelectControl, {
                                                value: currentControlKey(advgbBlockControls, 'archive', 'approach'),
                                                options: [{
                                                    value: 'include',
                                                    label: __('Show for selected terms', 'advanced-gutenberg')
                                                }, {
                                                    value: 'exclude',
                                                    label: __('Hide for selected terms', 'advanced-gutenberg')
                                                }],
                                                onChange: function onChange(value) {
                                                    return _this8.changeControlKey('archive', 'approach', value);
                                                }
                                            })
                                        ),
                                        React.createElement(FormTokenField, {
                                            multiple: true,
                                            label: __('Select taxonomies', 'advanced-gutenberg'),
                                            placeholder: __('Search taxonomies', 'advanced-gutenberg'),
                                            suggestions: (0, _utils.getOptionSuggestions)(this.state.taxModOptions || this.getTaxonomies()),
                                            maxSuggestions: 10,
                                            value: (0, _utils.getOptionTitles)(this.currentArchiveControl('taxonomies'), this.state.taxModOptions || this.getTaxonomies()),
                                            onChange: function onChange(value) {
                                                _this8.changeArchiveControl('taxonomies', (0, _utils.getOptionSlugs)(value, _this8.state.taxModOptions || _this8.getTaxonomies()));
                                            },
                                            __experimentalExpandOnFocus: true
                                        }),
                                        currentControlKey(advgbBlockControls, 'archive', 'taxonomies').length > 0 && React.createElement(
                                            Fragment,
                                            null,
                                            React.createElement(FormTokenField, {
                                                multiple: true,
                                                label: __('Filter terms', 'advanced-gutenberg'),
                                                placeholder: __('Search terms', 'advanced-gutenberg'),
                                                suggestions: (0, _utils.getOptionSuggestions)(this.state.termOptions),
                                                maxSuggestions: 10,
                                                value: (0, _utils.getOptionTitles)(this.currentArchiveControl('terms'), this.state.termOptions),
                                                onChange: function onChange(value) {
                                                    _this8.changeArchiveControl('terms', (0, _utils.getOptionSlugs)(value, _this8.state.termOptions));
                                                    _this8.setState({
                                                        updateTaxLabels: true
                                                    });
                                                },
                                                onInputChange: function onInputChange(value) {
                                                    _this8.setState({
                                                        searchTermWord: value
                                                    });
                                                },
                                                __experimentalShowHowTo: false
                                            }),
                                            React.createElement(
                                                "div",
                                                { className: "advgb-revert-mb--disabled components-form-token-field__help",
                                                    style: { marginBottom: 20 } },
                                                __('Use this filter to apply only to some terms.', 'advanced-gutenberg')
                                            )
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
                                            return _this8.changeControlKey('page', 'enabled');
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
                                                    return _this8.changeControlKey('page', 'approach', value);
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
                                                _this8.changeControlKey('page', 'pages', (0, _utils.getOptionSlugs)(value, _this8.getPages()));
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