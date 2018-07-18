'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

(function (wpI18n, wpHooks, wpElement, wpEditor, wpComponents) {
    var addFilter = wpHooks.addFilter;
    var __ = wpI18n.__;
    var Fragment = wpElement.Fragment;
    var InspectorControls = wpEditor.InspectorControls;
    var RangeControl = wpComponents.RangeControl;

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
                var isSelected = props.isSelected,
                    attributes = props.attributes,
                    setAttributes = props.setAttributes,
                    id = props.id;
                var colMargin = attributes.colMargin,
                    colPadding = attributes.colPadding,
                    blockID = attributes.blockID;


                return [React.createElement(BlockEdit, _extends({ key: 'block-edit-custom-columns' }, props)), isSelected && React.createElement(
                    InspectorControls,
                    { key: 'inspector-custom-columns' },
                    React.createElement(RangeControl, {
                        label: __('Columns margin'),
                        value: colMargin,
                        min: 0,
                        max: 200,
                        onChange: function onChange(value) {
                            if (!blockID) setAttributes({ blockID: 'columns-' + id });
                            return setAttributes({ colMargin: value });
                        }
                    }),
                    React.createElement(RangeControl, {
                        label: __('Columns padding'),
                        value: colPadding,
                        min: 0,
                        max: 100,
                        onChange: function onChange(value) {
                            if (!blockID) setAttributes({ blockID: 'columns-' + id });
                            return setAttributes({ colPadding: value });
                        }
                    })
                ), props.name === 'core/columns' && (!!colMargin || !!colPadding) && React.createElement(
                    'style',
                    { key: 'custom-columns-styles' },
                    '#block-' + id + ' .wp-block-columns .editor-block-list__block:not(:first-child) {margin-left: ' + colMargin + 'px;}',
                    '#block-' + id + ' .wp-block-columns .editor-block-list__block-edit {padding: ' + colPadding + 'px;}'
                ), props.name === 'core/text-columns' && (!!colMargin || !!colPadding) && React.createElement(
                    'style',
                    { key: 'custom-text-columns-styles' },
                    '#block-' + id + ' .wp-block-column:not(:first-child) {margin-left: ' + colMargin + 'px;}',
                    '#block-' + id + ' .wp-block-column {padding: ' + colPadding + 'px;}'
                )];
            }

            return React.createElement(BlockEdit, props);
        };
    });

    // Save options to show in frontend
    addFilter('blocks.getSaveContent.extraProps', 'advgb/saveColumnsAttrs', function (extraProps, blockType, attributes) {
        var blockID = attributes.blockID;


        if (blockType.name === 'core/text-columns' || blockType.name === 'core/columns') {
            extraProps = _extends(extraProps, {
                id: blockID
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
