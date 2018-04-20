'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var addFilter = wp.hooks.addFilter;
var __ = wp.i18n.__;
var _wp$blocks = wp.blocks,
    InspectorControls = _wp$blocks.InspectorControls,
    hasBlockSupport = _wp$blocks.hasBlockSupport;
var _wp$components = wp.components,
    SelectControl = _wp$components.SelectControl,
    PanelBody = _wp$components.PanelBody,
    ToggleControl = _wp$components.ToggleControl;

// Register extra options to blocks attributes

addFilter('blocks.registerBlockType', 'advgb/registerExtraOptions', function (settings) {
    settings.attributes = _extends(settings.attributes, {
        showByDevices: {
            type: 'string',
            default: 'all'
        },
        showOnDesktop: {
            type: 'boolean'
        },
        showOnTablet: {
            type: 'boolean'
        },
        showOnMobile: {
            type: 'boolean'
        }
    });

    return settings;
});

// Add options to blocks
addFilter('blocks.BlockEdit', 'advgb/addExtraOptions', function (BlockEdit) {
    return function (props) {
        var isSelected = props.isSelected,
            attributes = props.attributes,
            setAttributes = props.setAttributes;
        var showByDevices = attributes.showByDevices,
            showOnDesktop = attributes.showOnDesktop,
            showOnTablet = attributes.showOnTablet,
            showOnMobile = attributes.showOnMobile;


        return [React.createElement(BlockEdit, _extends({ key: 'extra-options' }, props)), isSelected && React.createElement(
            InspectorControls,
            { key: 'extra-options-inspector' },
            React.createElement(
                PanelBody,
                { title: __('Extra options') },
                React.createElement(SelectControl, {
                    label: __('Show this block on devices'),
                    help: __('Choose which devices can see this block.'),
                    value: showByDevices || 'all',
                    options: [{ label: __('All'), value: 'all' }, { label: __('Custom'), value: 'custom' }],
                    onChange: function onChange(value) {
                        return setAttributes({ showByDevices: value });
                    }
                }),
                showByDevices === 'custom' && [React.createElement(ToggleControl, {
                    key: 'show-block-desktop',
                    label: __('Desktop'),
                    checked: !!showOnDesktop,
                    onChange: function onChange() {
                        return setAttributes({ showOnDesktop: !showOnDesktop });
                    }
                }), React.createElement(ToggleControl, {
                    key: 'show-block-tablet',
                    label: __('Tablet'),
                    checked: !!showOnTablet,
                    onChange: function onChange() {
                        return setAttributes({ showOnTablet: !showOnTablet });
                    }
                }), React.createElement(ToggleControl, {
                    key: 'show-block-mobile',
                    label: __('Mobile'),
                    checked: !!showOnMobile,
                    onChange: function onChange() {
                        return setAttributes({ showOnMobile: !showOnMobile });
                    }
                })]
            )
        )];
    };
});

// Save extra options
addFilter('blocks.getSaveContent.extraProps', 'advgb/saveExtraOptions', function (extraProps, blockType, attributes) {
    if (hasBlockSupport(blockType, 'customClassName', true) && attributes.showByDevices) {
        var showByDevices = attributes.showByDevices,
            showOnDesktop = attributes.showOnDesktop,
            showOnTablet = attributes.showOnTablet,
            showOnMobile = attributes.showOnMobile;

        var blockClassNames = [extraProps.className, showByDevices === 'custom' && 'blockhide', showByDevices === 'custom' && showOnDesktop && 'blockshow-desktop', showByDevices === 'custom' && showOnTablet && 'blockshow-tablet', showByDevices === 'custom' && showOnMobile && 'blockshow-mobile'];

        extraProps.className = blockClassNames.filter(Boolean).join(' ');
    }

    return extraProps;
});
