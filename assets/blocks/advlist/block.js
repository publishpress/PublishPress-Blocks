'use strict';

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
                if (attributes.changed !== true && attributes.changed !== undefined) {
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
                                        onChange: function onChange(color) {
                                            return setAttributes({ iconColor: color });
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
                        getSettings: this.getEditorSettings,
                        onSetup: this.setupEditor,
                        onChange: this.setNextValues,
                        value: values,
                        wrapperClassName: 'advgb-list-item',
                        className: listClassName,
                        placeholder: __('Write advanced list…'),
                        onMerge: mergeBlocks,
                        onSplit: insertBlocksAfter ? function (before, after) {
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
                            '.' + id + ' li { font-size: ' + fontSize + 'px }'
                        ),
                        icon && React.createElement(
                            'style',
                            null,
                            '.' + id + ' li:before {\n                                font-size: ' + iconSize + 'px;\n                                color: ' + iconColor + ';\n                                line-height: ' + lineHeight + 'px;\n                                margin: ' + margin + 'px;\n                                padding: ' + padding + 'px;\n                            }'
                        )
                    )
                );
            }
        }]);

        return AdvList;
    }(Component);

    var blockColor = typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined;
    var listBlockIcon = React.createElement(
        'svg',
        { fill: blockColor, height: '20', viewBox: '2 2 22 22', width: '20', xmlns: 'http://www.w3.org/2000/svg' },
        React.createElement('path', { d: 'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z' }),
        React.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
    );

    registerBlockType('advgb/list', {
        title: __('Advanced List'),
        description: __('List block with custom icons and styles.'),
        icon: listBlockIcon,
        category: 'common',
        keywords: [__('list'), __('icon')],
        attributes: {
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
        },
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
    });
})(wp.i18n, wp.blocks, wp.element, wp.editor, wp.components);
