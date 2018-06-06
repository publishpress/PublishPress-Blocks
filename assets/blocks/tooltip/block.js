'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

(function (wpI18n, wpHooks, wpElement, wpEditor, wpComponents) {
    var addFilter = wpHooks.addFilter;
    var __ = wpI18n.__;
    var Fragment = wpElement.Fragment;
    var InspectorAdvancedControls = wpEditor.InspectorAdvancedControls;
    var PanelBody = wpComponents.PanelBody,
        ToggleControl = wpComponents.ToggleControl,
        TextareaControl = wpComponents.TextareaControl;

    // Register extra tooltip attributes

    addFilter('blocks.registerBlockType', 'advgb/registerTooltipAttrs', function (settings) {
        if (settings.name.indexOf('core/') > -1) {
            settings.attributes = _extends(settings.attributes, {
                enableTooltip: {
                    type: 'boolean'
                },
                tooltipText: {
                    type: 'string'
                }
            });
        }

        return settings;
    });

    // Add option for tooltip
    addFilter('blocks.BlockEdit', 'advgb/tooltipSettings', function (BlockEdit) {
        return function (props) {
            if (props.name.indexOf('core/') > -1) {
                var attributes = props.attributes,
                    setAttributes = props.setAttributes;
                var enableTooltip = attributes.enableTooltip,
                    tooltipText = attributes.tooltipText;


                return React.createElement(
                    Fragment,
                    null,
                    React.createElement(BlockEdit, props),
                    React.createElement(
                        InspectorAdvancedControls,
                        null,
                        React.createElement(
                            PanelBody,
                            { title: __('Block tooltip') },
                            React.createElement(ToggleControl, {
                                label: __('Enable tooltip'),
                                checked: enableTooltip,
                                onChange: function onChange() {
                                    return setAttributes({ enableTooltip: !enableTooltip });
                                }
                            }),
                            !!enableTooltip && React.createElement(TextareaControl, {
                                label: __('Tooltip text'),
                                value: tooltipText,
                                placeholder: __('Enter tooltip text…'),
                                onChange: function onChange(value) {
                                    return setAttributes({ tooltipText: value });
                                }
                            })
                        )
                    )
                );
            }

            return React.createElement(BlockEdit, props);
        };
    });

    // Apply tooltip on front-end
    addFilter('blocks.getSaveContent.extraProps', 'advgb/saveTooltip', function (extraProps, blockType, attributes) {
        if (blockType.name.indexOf('core/') > -1) {
            var enableTooltip = attributes.enableTooltip,
                tooltipText = attributes.tooltipText;


            var newClassName = [extraProps.className, enableTooltip && 'advgb-has-qtip'].filter(Boolean).join(' ');

            var text = new DOMParser().parseFromString(tooltipText, 'text/html');
            var formattedText = text.body.innerText || '';

            extraProps = _extends(extraProps, {
                className: newClassName,
                'data-tooltip': enableTooltip ? formattedText : undefined
            });
        }

        return extraProps;
    });
})(wp.i18n, wp.hooks, wp.element, wp.editor, wp.components);
