"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
    createBlock = _wp$blocks.createBlock;
var _wp$editor = wp.editor,
    InspectorControls = _wp$editor.InspectorControls,
    BlockControls = _wp$editor.BlockControls,
    RichText = _wp$editor.RichText,
    MediaUpload = _wp$editor.MediaUpload,
    BlockAlignmentToolbar = _wp$editor.BlockAlignmentToolbar,
    ColorPalette = _wp$editor.ColorPalette;
var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    PanelColor = _wp$components.PanelColor,
    RangeControl = _wp$components.RangeControl,
    SelectControl = _wp$components.SelectControl,
    IconButton = _wp$components.IconButton,
    Toolbar = _wp$components.Toolbar,
    DropdownMenu = _wp$components.DropdownMenu;


var tableBlockIcon = React.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", width: "22", height: "22", viewBox: "2 2 22 22" },
    React.createElement("path", { d: "M3 3v18h18V3H3zm8 16H5v-6h6v6zm0-8H5V5h6v6zm8 8h-6v-6h6v6zm0-8h-6V5h6v6z" }),
    React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" })
);

var AdvTable = function (_Component) {
    _inherits(AdvTable, _Component);

    function AdvTable() {
        _classCallCheck(this, AdvTable);

        var _this = _possibleConstructorReturn(this, (AdvTable.__proto__ || Object.getPrototypeOf(AdvTable)).apply(this, arguments));

        _this.state = {
            editor: null,
            selectedCell: null,
            selectedCellBgColor: null,
            selectedCellTextColor: null,
            selectedCellBorderColor: null,
            selectedCellBorderStyle: '',
            selectedCellBorderWidth: '',
            selectedCellPaddingTop: '',
            selectedCellPaddingRight: '',
            selectedCellPaddingBottom: '',
            selectedCellPaddingLeft: ''
        };

        _this.handleSetup = _this.handleSetup.bind(_this);
        return _this;
    }

    _createClass(AdvTable, [{
        key: "handleSetup",
        value: function handleSetup(editor, isSelected) {
            var _this2 = this;

            editor.on('init', function () {
                if (isSelected) {
                    AdvTable.selectFirstCell(editor);
                }
            });

            this.setState({ editor: editor });

            editor.on('nodeChange', function () {
                var selectedCell = editor.dom.getParent(editor.selection.getStart(), 'td');
                var selectedCellBgColor = editor.dom.getStyle(selectedCell, 'background-color');
                var selectedCellTextColor = editor.dom.getStyle(selectedCell, 'color');
                var selectedCellBorderColor = editor.dom.getAttrib(selectedCell, 'data-border-color');
                var selectedCellBorderStyle = editor.dom.getStyle(selectedCell, 'border-style') || 'solid';
                var selectedCellBorderWidth = editor.dom.getStyle(selectedCell, 'border-width') || '1px';
                selectedCellBorderWidth = parseInt(selectedCellBorderWidth.replace('px', ''));
                var selectedCellPaddingTop = editor.dom.getStyle(selectedCell, 'padding-top');
                var selectedCellPaddingRight = editor.dom.getStyle(selectedCell, 'padding-right');
                var selectedCellPaddingBottom = editor.dom.getStyle(selectedCell, 'padding-bottom');
                var selectedCellPaddingLeft = editor.dom.getStyle(selectedCell, 'padding-left');
                if (selectedCellPaddingTop) selectedCellPaddingTop = selectedCellPaddingTop.replace('px', '');
                if (selectedCellPaddingRight) selectedCellPaddingRight = selectedCellPaddingRight.replace('px', '');
                if (selectedCellPaddingBottom) selectedCellPaddingBottom = selectedCellPaddingBottom.replace('px', '');
                if (selectedCellPaddingLeft) selectedCellPaddingLeft = selectedCellPaddingLeft.replace('px', '');

                return _this2.setState({
                    selectedCell: selectedCell,
                    selectedCellBgColor: selectedCellBgColor,
                    selectedCellTextColor: selectedCellTextColor,
                    selectedCellBorderColor: selectedCellBorderColor,
                    selectedCellBorderStyle: selectedCellBorderStyle,
                    selectedCellBorderWidth: selectedCellBorderWidth,
                    selectedCellPaddingTop: selectedCellPaddingTop,
                    selectedCellPaddingRight: selectedCellPaddingRight,
                    selectedCellPaddingBottom: selectedCellPaddingBottom,
                    selectedCellPaddingLeft: selectedCellPaddingLeft
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                isSelected = _props.isSelected,
                attributes = _props.attributes,
                setAttributes = _props.setAttributes,
                className = _props.className;
            var content = attributes.content,
                align = attributes.align,
                maxWidth = attributes.maxWidth;
            var _state = this.state,
                editor = _state.editor,
                selectedCell = _state.selectedCell,
                selectedCellBgColor = _state.selectedCellBgColor,
                selectedCellTextColor = _state.selectedCellTextColor,
                selectedCellBorderColor = _state.selectedCellBorderColor,
                selectedCellBorderStyle = _state.selectedCellBorderStyle,
                selectedCellBorderWidth = _state.selectedCellBorderWidth,
                selectedCellPaddingTop = _state.selectedCellPaddingTop,
                selectedCellPaddingRight = _state.selectedCellPaddingRight,
                selectedCellPaddingBottom = _state.selectedCellPaddingBottom,
                selectedCellPaddingLeft = _state.selectedCellPaddingLeft;


            var TABLE_CONTROLS = [{
                icon: 'table-row-before',
                title: __('Add Row Before'),
                onClick: AdvTable.execCommand('mceTableInsertRowBefore')
            }, {
                icon: 'table-row-after',
                title: __('Add Row After'),
                onClick: AdvTable.execCommand('mceTableInsertRowAfter')
            }, {
                icon: 'table-row-delete',
                title: __('Delete Row'),
                onClick: AdvTable.execCommand('mceTableDeleteRow')
            }, {
                icon: 'table-col-before',
                title: __('Add Column Before'),
                onClick: AdvTable.execCommand('mceTableInsertColBefore')
            }, {
                icon: 'table-col-after',
                title: __('Add Column After'),
                onClick: AdvTable.execCommand('mceTableInsertColAfter')
            }, {
                icon: 'table-col-delete',
                title: __('Delete Column'),
                onClick: AdvTable.execCommand('mceTableDeleteCol')
            }, {
                icon: React.createElement(
                    "svg",
                    { xmlns: "http://www.w3.org/2000/svg", className: "dashicon", width: "20", height: "20", viewBox: "0 0 24 24" },
                    React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" }),
                    React.createElement("path", { d: "M15 21h2v-2h-2v2zm4-12h2V7h-2v2zM3 5v14c0 1.1.9 2 2 2h4v-2H5V5h4V3H5c-1.1 0-2 .9-2 2zm16-2v2h2c0-1.1-.9-2-2-2zm-8 20h2V1h-2v22zm8-6h2v-2h-2v2zM15 5h2V3h-2v2zm4 8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2z" })
                ),
                title: __('Merge Cells'),
                onClick: AdvTable.execCommand('mceTableMergeCells')
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
                    editor.dom.setStyles(selectedCell, {
                        'border-top-color': selectedCellBorderColor
                    });
                    editor.undoManager.add();
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
                    editor.dom.setStyles(selectedCell, {
                        'border-right-color': selectedCellBorderColor
                    });
                    editor.undoManager.add();
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
                    editor.dom.setStyles(selectedCell, {
                        'border-bottom-color': selectedCellBorderColor
                    });
                    editor.undoManager.add();
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
                    editor.dom.setStyles(selectedCell, {
                        'border-left-color': selectedCellBorderColor
                    });
                    editor.undoManager.add();
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
                    editor.dom.setStyles(selectedCell, {
                        'border-top-color': selectedCellBorderColor,
                        'border-right-color': selectedCellBorderColor,
                        'border-bottom-color': selectedCellBorderColor,
                        'border-left-color': selectedCellBorderColor
                    });
                    editor.undoManager.add();
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
                    editor.dom.setStyles(selectedCell, {
                        'border-top-color': '',
                        'border-right-color': '',
                        'border-bottom-color': '',
                        'border-left-color': ''
                    });
                    editor.undoManager.add();
                }
            }];

            return React.createElement(
                Fragment,
                null,
                React.createElement(
                    BlockControls,
                    null,
                    React.createElement(BlockAlignmentToolbar, {
                        value: align,
                        onChange: function onChange(value) {
                            return setAttributes({ align: value });
                        }
                    }),
                    React.createElement(
                        Toolbar,
                        null,
                        React.createElement(DropdownMenu, {
                            icon: "editor-table",
                            label: __('Edit table'),
                            controls: TABLE_CONTROLS.map(function (control) {
                                return _extends({}, control, {
                                    onClick: function onClick() {
                                        return control.onClick(_this3.state.editor);
                                    }
                                });
                            })
                        }),
                        React.createElement(MediaUpload, {
                            type: "image",
                            onSelect: function onSelect(media) {
                                return editor.execCommand('mceInsertContent', false, "<img src=\"" + media.url + "\" alt=\"" + (media.alt || media.filename) + "\" />");
                            },
                            render: function render(_ref) {
                                var open = _ref.open;

                                return React.createElement(IconButton, {
                                    className: "components-icon-button components-toolbar__control",
                                    icon: "format-image",
                                    label: __('Insert image'),
                                    onClick: open
                                });
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
                        { title: __('Single Cell Settings') },
                        React.createElement(
                            PanelColor,
                            { title: __('Background Color'), colorValue: selectedCellBgColor, initialOpen: false },
                            React.createElement(ColorPalette, {
                                value: selectedCellBgColor,
                                onChange: function onChange(value) {
                                    editor.dom.setStyle(selectedCell, 'background-color', value || '');
                                    editor.undoManager.add();
                                    _this3.setState({ selectedCellBgColor: value });
                                }
                            })
                        ),
                        React.createElement(
                            PanelColor,
                            { title: __('Text Color'), colorValue: selectedCellTextColor, initialOpen: false },
                            React.createElement(ColorPalette, {
                                value: selectedCellTextColor,
                                onChange: function onChange(value) {
                                    editor.dom.setStyle(selectedCell, 'color', value || '');
                                    editor.undoManager.add();
                                    _this3.setState({ selectedCellTextColor: value });
                                }
                            })
                        ),
                        React.createElement(
                            PanelBody,
                            { title: __('Border'), initialOpen: false },
                            React.createElement(SelectControl, {
                                label: __('Border Style'),
                                value: selectedCellBorderStyle,
                                options: [{ label: __('Solid'), value: 'solid' }, { label: __('Dashed'), value: 'dashed' }, { label: __('Dotted'), value: 'dotted' }, { label: __('None'), value: 'none' }],
                                onChange: function onChange(value) {
                                    editor.dom.setStyle(selectedCell, 'border-style', value);
                                    editor.undoManager.add();
                                    _this3.setState({ selectedCellBorderStyle: value });
                                }
                            }),
                            React.createElement(
                                PanelColor,
                                { title: __('Border Color'), colorValue: selectedCellBorderColor, initialOpen: false },
                                React.createElement(ColorPalette, {
                                    value: selectedCellBorderColor,
                                    onChange: function onChange(value) {
                                        editor.dom.setAttrib(selectedCell, 'data-border-color', value || '');
                                        ['top', 'right', 'bottom', 'left'].map(function (pos) {
                                            if (editor.dom.getStyle(selectedCell, "border-" + pos + "-color")) editor.dom.setStyle(selectedCell, "border-" + pos + "-color", value || '');
                                        });
                                        editor.undoManager.add();
                                        _this3.setState({ selectedCellBorderColor: value });
                                    }
                                })
                            ),
                            React.createElement(RangeControl, {
                                label: __('Border width'),
                                value: selectedCellBorderWidth,
                                min: 1,
                                max: 10,
                                onChange: function onChange(value) {
                                    editor.dom.setStyle(selectedCell, 'border-width', value);
                                    editor.undoManager.add();
                                    _this3.setState({ selectedCellBorderWidth: value });
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
                                            "span",
                                            { title: item.title,
                                                onClick: item.onClick
                                            },
                                            item.icon
                                        )
                                    );
                                })
                            )
                        ),
                        React.createElement(
                            PanelBody,
                            { title: __('Padding'), initialOpen: false },
                            React.createElement(RangeControl, {
                                label: __('Padding Top'),
                                min: 0,
                                max: 50,
                                value: selectedCellPaddingTop,
                                onChange: function onChange(value) {
                                    editor.dom.setStyle(selectedCell, 'padding-top', value || '');
                                    editor.undoManager.add();
                                    _this3.setState({ selectedCellPaddingTop: value || '' });
                                },
                                allowReset: true
                            }),
                            React.createElement(RangeControl, {
                                label: __('Padding Bottom'),
                                min: 0,
                                max: 50,
                                value: selectedCellPaddingBottom,
                                onChange: function onChange(value) {
                                    editor.dom.setStyle(selectedCell, 'padding-bottom', value || '');
                                    editor.undoManager.add();
                                    _this3.setState({ selectedCellPaddingBottom: value || '' });
                                },
                                allowReset: true
                            }),
                            React.createElement(RangeControl, {
                                label: __('Padding Left'),
                                min: 0,
                                max: 50,
                                value: selectedCellPaddingLeft,
                                onChange: function onChange(value) {
                                    editor.dom.setStyle(selectedCell, 'padding-left', value || '');
                                    editor.undoManager.add();
                                    _this3.setState({ selectedCellPaddingLeft: value || '' });
                                },
                                allowReset: true
                            }),
                            React.createElement(RangeControl, {
                                label: __('Padding Right'),
                                min: 0,
                                max: 50,
                                value: selectedCellPaddingRight,
                                onChange: function onChange(value) {
                                    editor.dom.setStyle(selectedCell, 'padding-right', value || '');
                                    editor.undoManager.add();
                                    _this3.setState({ selectedCellPaddingRight: value || '' });
                                },
                                allowReset: true
                            })
                        )
                    )
                ),
                React.createElement(RichText, {
                    tagName: "table",
                    wrapperClassName: className,
                    getSettings: function getSettings(settings) {
                        return _extends({}, settings, {
                            plugins: (settings.plugins || []).concat('table'),
                            table_tab_navigation: false
                        });
                    },
                    value: content,
                    onSetup: function onSetup(editor) {
                        return _this3.handleSetup(editor, isSelected);
                    },
                    onChange: function onChange(value) {
                        return setAttributes({ content: value });
                    },
                    style: { maxWidth: !!maxWidth && maxWidth + 'px' }
                })
            );
        }
    }], [{
        key: "isTableSelected",
        value: function isTableSelected(editor) {
            return editor.dom.getParent(editor.selection.getStart(true), 'table', editor.getBody().parentNode);
        }
    }, {
        key: "selectFirstCell",
        value: function selectFirstCell(editor) {
            var cell = editor.getBody().querySelector('td,th');
            if (cell) {
                cell.focus();
                editor.selection.select(cell, true);
                editor.selection.collapse(false);
            }
        }
    }, {
        key: "execCommand",
        value: function execCommand(command) {
            return function (editor) {
                if (editor) {
                    if (!AdvTable.isTableSelected(editor)) {
                        AdvTable.selectFirstCell(editor);
                    }
                    editor.execCommand(command);
                }
            };
        }
    }]);

    return AdvTable;
}(Component);

registerBlockType('advgb/table', {
    title: __('Advanced Table'),
    description: __('Advanced table block with more styles and functions.'),
    icon: tableBlockIcon,
    category: 'formatting',
    keywords: [__('table'), __('cell'), __('data')],
    attributes: {
        content: {
            type: 'array',
            source: 'children',
            selector: 'table',
            default: [React.createElement(
                "tbody",
                { key: "a" },
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        null,
                        React.createElement("br", null)
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement("br", null)
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        null,
                        React.createElement("br", null)
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement("br", null)
                    )
                )
            )]
        },
        align: {
            type: 'string'
        },
        maxWidth: {
            type: 'number',
            default: 0
        }
    },
    edit: AdvTable,
    save: function save(_ref2) {
        var attributes = _ref2.attributes;
        var content = attributes.content,
            align = attributes.align,
            maxWidth = attributes.maxWidth;

        return React.createElement(RichText.Content, {
            tagName: "table",
            className: 'advgb-table-frontend ' + (align ? "align" + align : ''),
            style: { maxWidth: !!maxWidth ? maxWidth + 'px' : undefined },
            value: content
        });
    },
    getEditWrapperProps: function getEditWrapperProps(attributes) {
        var align = attributes.align;

        if ('left' === align || 'right' === align || 'wide' === align || 'full' === align) {
            return { 'data-align': align };
        }
    },

    transforms: {
        from: [{
            type: 'block',
            blocks: ['core/table'],
            transform: function transform(blockAttributes) {
                return createBlock('advgb/table', _extends({}, blockAttributes));
            }
        }]
    }
});
