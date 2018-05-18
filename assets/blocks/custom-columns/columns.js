'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var addFilter = wp.hooks.addFilter;
var __ = wp.i18n.__;
var InspectorControls = wp.blocks.InspectorControls;
var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    RangeControl = _wp$components.RangeControl;

// Register extra attributes

addFilter('blocks.registerBlockType', 'advgb/registerExtraColumnsAttrs', function (settings) {
    if (settings.name === 'core/text-columns' || settings.name === 'core/columns') {
        settings.attributes = _extends(settings.attributes, {
            colMargin: {
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
addFilter('blocks.BlockEdit', 'advgb/editColumnsAttrs', function (BlockEdit) {
    return function (props) {
        if (props.name === "core/text-columns" || props.name === "core/columns") {
            var isSelected = props.isSelected,
                attributes = props.attributes,
                setAttributes = props.setAttributes,
                id = props.id;
            var colMargin = attributes.colMargin,
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
                })
            ), props.name === 'core/columns' && !!colMargin && React.createElement(
                'style',
                { key: 'custom-columns-styles' },
                '#block-' + id + ' .wp-block-columns {grid-gap: ' + colMargin + 'px;}'
            ), props.name === 'core/text-columns' && !!colMargin && React.createElement(
                'style',
                { key: 'custom-text-columns-styles' },
                '#block-' + id + ' .wp-block-column:not(:first-child) {margin-left: ' + colMargin + 'px;}'
            )];
        }

        return React.createElement(BlockEdit, props);
    };
});

// Save options to show in frontend
addFilter('blocks.getSaveContent.extraProps', 'advgb/saveColumnsAttrs', function (extraProps, blockType, attributes) {
    var colMargin = attributes.colMargin,
        blockID = attributes.blockID;


    if (blockType.name === 'core/text-columns') {
        extraProps = _extends(extraProps, {
            id: blockID
        });
    } else if (blockType.name === 'core/columns') {
        extraProps = _extends(extraProps, {
            style: { gridGap: colMargin + 'px' }
        });
    }

    return extraProps;
});

// Save option to show in frontend
addFilter('blocks.getSaveElement', 'advgb/saveTextColumnsElm', function (SaveElm, blockType, attributes) {
    if (blockType.name === 'core/text-columns') {
        var colMargin = attributes.colMargin,
            blockID = attributes.blockID;


        return [SaveElm, blockID && !!colMargin && React.createElement(
            'style',
            { key: 'custom-columns-styles' },
            '#' + blockID + ' .wp-block-column:not(:first-child) {\n                    margin-left: ' + colMargin + 'px;\n                }'
        )];
    }

    return SaveElm;
});
