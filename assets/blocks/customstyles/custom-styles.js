'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var addFilter = wp.hooks.addFilter;
var __ = wp.i18n.__;
var _wp$blocks = wp.blocks,
    InspectorControls = _wp$blocks.InspectorControls,
    hasBlockSupport = _wp$blocks.hasBlockSupport;
var SelectControl = wp.components.SelectControl;

// Register custom styles to blocks attributes

addFilter('blocks.registerBlockType', 'advgb/registerCustomStyleClass', function (settings) {
    settings.attributes = _extends(settings.attributes, {
        customStyle: {
            type: 'string'
        }
    });

    return settings;
});

// Add option to return to default style
if (advGb_CS) {
    advGb_CS.unshift({
        id: 0,
        label: __('Paragraph'),
        value: ''
    });
}

// Add option to select custom styles for paragraph blocks
addFilter('blocks.BlockEdit', 'advgb/customStyles', function (BlockEdit) {
    return function (props) {
        // Apply custom styles on editor init
        if (props.attributes.customStyle) {
            jQuery(document).ready(function ($) {
                $('.gutenberg #editor').find('div[data-block="' + props.id + '"]').find('.blocks-rich-text').find('p').addClass(props.attributes.customStyle);
            });
        }

        return [React.createElement(BlockEdit, _extends({ key: 'block-edit-custom-class-name' }, props)), props.isSelected && props.name === "core/paragraph" && React.createElement(
            InspectorControls,
            { key: 'advgb-custom-controls' },
            React.createElement(SelectControl, {
                label: __('Custom styles'),
                help: __('This option let you add custom style for current paragraph.'),
                value: props.attributes.customStyle,
                options: advGb_CS.map(function (cstyle, index) {
                    if (cstyle.title) advGb_CS[index].label = cstyle.title;
                    if (cstyle.name) advGb_CS[index].value = cstyle.name;

                    return cstyle;
                }),
                onChange: function onChange(cstyle) {
                    var id = props.id,
                        attributes = props.attributes;
                    var oldStyle = attributes.customStyle;


                    props.setAttributes({
                        customStyle: cstyle,
                        backgroundColor: undefined,
                        textColor: undefined,
                        fontSize: undefined
                    });

                    // Apply custom style on select
                    jQuery('.gutenberg #editor').find('div[data-block="' + id + '"]').find('.blocks-rich-text').find('p').removeClass(oldStyle).addClass(cstyle);
                }
            })
        )];
    };
});

// Apply custom styles on front-end
addFilter('blocks.getSaveContent.extraProps', 'advgb/loadFrontendCustomStyles', function (extraProps, blockType, attributes) {
    if (hasBlockSupport(blockType, 'customStyleName', true) && attributes.customStyle) {
        if (typeof extraProps.className === 'undefined') {
            extraProps.className = attributes.customStyle;
        } else {
            extraProps.className += ' ' + attributes.customStyle;
            extraProps.className = extraProps.className.trim();
        }
    }

    return extraProps;
});
