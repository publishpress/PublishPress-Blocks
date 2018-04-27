'use strict';

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
    InspectorControls = _wp$blocks.InspectorControls,
    RichText = _wp$blocks.RichText,
    ColorPalette = _wp$blocks.ColorPalette,
    MediaUpload = _wp$blocks.MediaUpload;
var _wp$components = wp.components,
    RangeControl = _wp$components.RangeControl,
    PanelBody = _wp$components.PanelBody,
    PanelColor = _wp$components.PanelColor;

var AdvTestimonial = function (_Component) {
    _inherits(AdvTestimonial, _Component);

    function AdvTestimonial() {
        _classCallCheck(this, AdvTestimonial);

        var _this = _possibleConstructorReturn(this, (AdvTestimonial.__proto__ || Object.getPrototypeOf(AdvTestimonial)).apply(this, arguments));

        _this.state = {
            currentEdit: ''
        };
        return _this;
    }

    _createClass(AdvTestimonial, [{
        key: 'setCurrentEditArea',
        value: function setCurrentEditArea(area) {
            this.setState({ currentEdit: area });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var currentEdit = this.state.currentEdit;
            var _props = this.props,
                attributes = _props.attributes,
                setAttributes = _props.setAttributes,
                isSelected = _props.isSelected;
            var avatarUrl = attributes.avatarUrl,
                avatarID = attributes.avatarID,
                avatarUrl2 = attributes.avatarUrl2,
                avatarID2 = attributes.avatarID2,
                avatarUrl3 = attributes.avatarUrl3,
                avatarID3 = attributes.avatarID3,
                avatarColor = attributes.avatarColor,
                avatarBorderRadius = attributes.avatarBorderRadius,
                avatarBorderWidth = attributes.avatarBorderWidth,
                avatarBorderColor = attributes.avatarBorderColor,
                avatarSize = attributes.avatarSize,
                name = attributes.name,
                name2 = attributes.name2,
                name3 = attributes.name3,
                nameColor = attributes.nameColor,
                position = attributes.position,
                position2 = attributes.position2,
                position3 = attributes.position3,
                positionColor = attributes.positionColor,
                desc = attributes.desc,
                desc2 = attributes.desc2,
                desc3 = attributes.desc3,
                descColor = attributes.descColor,
                columns = attributes.columns;


            return React.createElement(
                Fragment,
                null,
                React.createElement(
                    InspectorControls,
                    null,
                    React.createElement(
                        PanelBody,
                        { title: __('Count Up Setting') },
                        React.createElement(RangeControl, {
                            label: __('Columns'),
                            min: 1,
                            max: 3,
                            value: columns,
                            onChange: function onChange(value) {
                                return setAttributes({ columns: value });
                            }
                        }),
                        React.createElement(
                            PanelBody,
                            { title: __('Avatar'), initialOpen: false },
                            React.createElement(
                                PanelColor,
                                { title: __('Background Color'), colorValue: avatarColor, initialOpen: false },
                                React.createElement(ColorPalette, {
                                    value: avatarColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ avatarColor: value });
                                    }
                                })
                            ),
                            React.createElement(
                                PanelColor,
                                { title: __('Border Color'), colorValue: avatarBorderColor, initialOpen: false },
                                React.createElement(ColorPalette, {
                                    value: avatarBorderColor,
                                    onChange: function onChange(value) {
                                        return setAttributes({ avatarBorderColor: value });
                                    }
                                })
                            ),
                            React.createElement(RangeControl, {
                                label: __('Border Radius (%)'),
                                min: 0,
                                max: 50,
                                value: avatarBorderRadius,
                                onChange: function onChange(value) {
                                    return setAttributes({ avatarBorderRadius: value });
                                }
                            }),
                            React.createElement(RangeControl, {
                                label: __('Border Width'),
                                min: 0,
                                max: 5,
                                value: avatarBorderWidth,
                                onChange: function onChange(value) {
                                    return setAttributes({ avatarBorderWidth: value });
                                }
                            }),
                            React.createElement(RangeControl, {
                                label: __('Avatar Size'),
                                min: 50,
                                max: 130,
                                value: avatarSize,
                                onChange: function onChange(value) {
                                    return setAttributes({ avatarSize: value });
                                }
                            })
                        ),
                        React.createElement(
                            PanelColor,
                            { title: __('Name Color'), colorValue: nameColor, initialOpen: false },
                            React.createElement(ColorPalette, {
                                value: nameColor,
                                onChange: function onChange(value) {
                                    return setAttributes({ nameColor: value });
                                }
                            })
                        ),
                        React.createElement(
                            PanelColor,
                            { title: __('Position Color'), colorValue: positionColor, initialOpen: false },
                            React.createElement(ColorPalette, {
                                value: positionColor,
                                onChange: function onChange(value) {
                                    return setAttributes({ positionColor: value });
                                }
                            })
                        ),
                        React.createElement(
                            PanelColor,
                            { title: __('Description Color'), colorValue: descColor, initialOpen: false },
                            React.createElement(ColorPalette, {
                                value: descColor,
                                onChange: function onChange(value) {
                                    return setAttributes({ descColor: value });
                                }
                            })
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'advgb-testimonial advgb-column-' + columns },
                    React.createElement(
                        'div',
                        { className: 'advgb-testimonial-columns-one' },
                        React.createElement(MediaUpload, {
                            onSelect: function onSelect(media) {
                                return setAttributes({ avatarUrl: media.url, avatarID: media.id });
                            },
                            value: avatarID,
                            type: 'image',
                            render: function render(_ref) {
                                var open = _ref.open;
                                return React.createElement(
                                    'div',
                                    { className: 'advgb-testimonial-avatar-group' },
                                    React.createElement('div', { className: 'advgb-testimonial-avatar',
                                        onClick: open,
                                        style: {
                                            backgroundImage: 'url(' + (avatarUrl ? avatarUrl : advgbAvatar.holder) + ')',
                                            backgroundColor: avatarColor,
                                            borderRadius: avatarBorderRadius + '%',
                                            borderWidth: avatarBorderWidth + 'px',
                                            borderColor: avatarBorderColor,
                                            width: avatarSize + 'px',
                                            height: avatarSize + 'px'
                                        }
                                    }),
                                    React.createElement('span', { className: 'dashicons dashicons-no advgb-testimonial-avatar-clear',
                                        title: __('Remove avatar'),
                                        onClick: function onClick() {
                                            return setAttributes({ avatarUrl: undefined, avatarID: undefined });
                                        }
                                    })
                                );
                            }
                        }),
                        React.createElement(RichText, {
                            tagName: 'h4',
                            className: 'advgb-testimonial-name',
                            value: name,
                            onChange: function onChange(value) {
                                return setAttributes({ name: value });
                            },
                            isSelected: isSelected && currentEdit === 'name',
                            onFocus: function onFocus() {
                                return _this2.setCurrentEditArea('name');
                            },
                            style: { color: nameColor }
                        }),
                        React.createElement(RichText, {
                            tagName: 'p',
                            className: 'advgb-testimonial-position',
                            value: position,
                            onChange: function onChange(value) {
                                return setAttributes({ position: value });
                            },
                            isSelected: isSelected && currentEdit === 'position',
                            onFocus: function onFocus() {
                                return _this2.setCurrentEditArea('position');
                            },
                            style: { color: positionColor }
                        }),
                        React.createElement(RichText, {
                            tagName: 'p',
                            className: 'advgb-testimonial-desc',
                            value: desc,
                            onChange: function onChange(value) {
                                return setAttributes({ desc: value });
                            },
                            isSelected: isSelected && currentEdit === 'desc',
                            onFocus: function onFocus() {
                                return _this2.setCurrentEditArea('desc');
                            },
                            style: { color: descColor }
                        })
                    ),
                    React.createElement(
                        'div',
                        { className: 'advgb-testimonial-columns-two' },
                        React.createElement(MediaUpload, {
                            onSelect: function onSelect(media) {
                                return setAttributes({ avatarUrl2: media.url, avatarID2: media.id });
                            },
                            value: avatarID2,
                            type: 'image',
                            render: function render(_ref2) {
                                var open = _ref2.open;
                                return React.createElement(
                                    'div',
                                    { className: 'advgb-testimonial-avatar-group' },
                                    React.createElement('div', { className: 'advgb-testimonial-avatar',
                                        onClick: open,
                                        style: {
                                            backgroundImage: 'url(' + (avatarUrl2 ? avatarUrl2 : advgbAvatar.holder) + ')',
                                            backgroundColor: avatarColor,
                                            borderRadius: avatarBorderRadius + '%',
                                            borderWidth: avatarBorderWidth + 'px',
                                            borderColor: avatarBorderColor,
                                            width: avatarSize + 'px',
                                            height: avatarSize + 'px'
                                        }
                                    }),
                                    React.createElement('span', { className: 'dashicons dashicons-no advgb-testimonial-avatar-clear',
                                        title: __('Remove avatar'),
                                        onClick: function onClick() {
                                            return setAttributes({ avatarUrl2: undefined, avatarID2: undefined });
                                        }
                                    })
                                );
                            }
                        }),
                        React.createElement(RichText, {
                            tagName: 'h4',
                            className: 'advgb-testimonial-name',
                            value: name2,
                            onChange: function onChange(value) {
                                return setAttributes({ name2: value });
                            },
                            isSelected: isSelected && currentEdit === 'name2',
                            onFocus: function onFocus() {
                                return _this2.setCurrentEditArea('name2');
                            },
                            style: { color: nameColor }
                        }),
                        React.createElement(RichText, {
                            tagName: 'p',
                            className: 'advgb-testimonial-position',
                            value: position2,
                            onChange: function onChange(value) {
                                return setAttributes({ position2: value });
                            },
                            isSelected: isSelected && currentEdit === 'position2',
                            onFocus: function onFocus() {
                                return _this2.setCurrentEditArea('position2');
                            },
                            style: { color: positionColor }
                        }),
                        React.createElement(RichText, {
                            tagName: 'p',
                            className: 'advgb-testimonial-desc',
                            value: desc2,
                            onChange: function onChange(value) {
                                return setAttributes({ desc2: value });
                            },
                            isSelected: isSelected && currentEdit === 'desc2',
                            onFocus: function onFocus() {
                                return _this2.setCurrentEditArea('desc2');
                            },
                            style: { color: descColor }
                        })
                    ),
                    React.createElement(
                        'div',
                        { className: 'advgb-testimonial-columns-three' },
                        React.createElement(MediaUpload, {
                            onSelect: function onSelect(media) {
                                return setAttributes({ avatarUrl3: media.url, avatarID3: media.id });
                            },
                            value: avatarID3,
                            type: 'image',
                            render: function render(_ref3) {
                                var open = _ref3.open;
                                return React.createElement(
                                    'div',
                                    { className: 'advgb-testimonial-avatar-group' },
                                    React.createElement('div', { className: 'advgb-testimonial-avatar',
                                        onClick: open,
                                        style: {
                                            backgroundImage: 'url(' + (avatarUrl3 ? avatarUrl3 : advgbAvatar.holder) + ')',
                                            backgroundColor: avatarColor,
                                            borderRadius: avatarBorderRadius + '%',
                                            borderWidth: avatarBorderWidth + 'px',
                                            borderColor: avatarBorderColor,
                                            width: avatarSize + 'px',
                                            height: avatarSize + 'px'
                                        }
                                    }),
                                    React.createElement('span', { className: 'dashicons dashicons-no advgb-testimonial-avatar-clear',
                                        title: __('Remove avatar'),
                                        onClick: function onClick() {
                                            return setAttributes({ avatarUrl3: undefined, avatarID3: undefined });
                                        }
                                    })
                                );
                            }
                        }),
                        React.createElement(RichText, {
                            tagName: 'h4',
                            className: 'advgb-testimonial-name',
                            value: name3,
                            onChange: function onChange(value) {
                                return setAttributes({ name3: value });
                            },
                            isSelected: isSelected && currentEdit === 'name3',
                            onFocus: function onFocus() {
                                return _this2.setCurrentEditArea('name3');
                            },
                            style: { color: nameColor }
                        }),
                        React.createElement(RichText, {
                            tagName: 'p',
                            className: 'advgb-testimonial-position',
                            value: position3,
                            onChange: function onChange(value) {
                                return setAttributes({ position3: value });
                            },
                            isSelected: isSelected && currentEdit === 'position3',
                            onFocus: function onFocus() {
                                return _this2.setCurrentEditArea('position3');
                            },
                            style: { color: positionColor }
                        }),
                        React.createElement(RichText, {
                            tagName: 'p',
                            className: 'advgb-testimonial-desc',
                            value: desc3,
                            onChange: function onChange(value) {
                                return setAttributes({ desc3: value });
                            },
                            isSelected: isSelected && currentEdit === 'desc3',
                            onFocus: function onFocus() {
                                return _this2.setCurrentEditArea('desc3');
                            },
                            style: { color: descColor }
                        })
                    )
                )
            );
        }
    }]);

    return AdvTestimonial;
}(Component);

function AdvTestimonialSave(_ref4) {
    var attributes = _ref4.attributes;
    var avatarUrl = attributes.avatarUrl,
        avatarUrl2 = attributes.avatarUrl2,
        avatarUrl3 = attributes.avatarUrl3,
        avatarColor = attributes.avatarColor,
        avatarBorderRadius = attributes.avatarBorderRadius,
        avatarBorderWidth = attributes.avatarBorderWidth,
        avatarBorderColor = attributes.avatarBorderColor,
        avatarSize = attributes.avatarSize,
        name = attributes.name,
        name2 = attributes.name2,
        name3 = attributes.name3,
        nameColor = attributes.nameColor,
        position = attributes.position,
        position2 = attributes.position2,
        position3 = attributes.position3,
        positionColor = attributes.positionColor,
        desc = attributes.desc,
        desc2 = attributes.desc2,
        desc3 = attributes.desc3,
        descColor = attributes.descColor,
        columns = attributes.columns;


    return React.createElement(
        'div',
        { className: 'advgb-testimonial' },
        React.createElement(
            'div',
            { className: 'advgb-testimonial-columns-one' },
            React.createElement(
                'div',
                { className: 'advgb-testimonial-avatar-group' },
                React.createElement('div', { className: 'advgb-testimonial-avatar',
                    style: {
                        backgroundImage: 'url(' + (avatarUrl ? avatarUrl : advgbAvatar.holder) + ')',
                        backgroundColor: avatarColor,
                        borderRadius: avatarBorderRadius + '%',
                        borderWidth: avatarBorderWidth + 'px',
                        borderColor: avatarBorderColor,
                        width: avatarSize + 'px',
                        height: avatarSize + 'px'
                    }
                })
            ),
            React.createElement(
                'h4',
                { className: 'advgb-testimonial-name',
                    style: { color: nameColor }
                },
                name
            ),
            React.createElement(
                'p',
                { className: 'advgb-testimonial-position',
                    style: { color: positionColor }
                },
                position
            ),
            React.createElement(
                'p',
                { className: 'advgb-testimonial-desc',
                    style: { color: descColor }
                },
                desc
            )
        ),
        parseInt(columns) > 1 && React.createElement(
            'div',
            { className: 'advgb-testimonial-columns-two' },
            React.createElement(
                'div',
                { className: 'advgb-testimonial-avatar-group' },
                React.createElement('div', { className: 'advgb-testimonial-avatar',
                    style: {
                        backgroundImage: 'url(' + (avatarUrl2 ? avatarUrl2 : advgbAvatar.holder) + ')',
                        backgroundColor: avatarColor,
                        borderRadius: avatarBorderRadius + '%',
                        borderWidth: avatarBorderWidth + 'px',
                        borderColor: avatarBorderColor,
                        width: avatarSize + 'px',
                        height: avatarSize + 'px'
                    }
                })
            ),
            React.createElement(
                'h4',
                { className: 'advgb-testimonial-name',
                    style: { color: nameColor }
                },
                name2
            ),
            React.createElement(
                'p',
                { className: 'advgb-testimonial-position',
                    style: { color: positionColor }
                },
                position2
            ),
            React.createElement(
                'p',
                { className: 'advgb-testimonial-desc',
                    style: { color: descColor }
                },
                desc2
            )
        ),
        parseInt(columns) > 2 && React.createElement(
            'div',
            { className: 'advgb-testimonial-columns-two' },
            React.createElement(
                'div',
                { className: 'advgb-testimonial-avatar-group' },
                React.createElement('div', { className: 'advgb-testimonial-avatar',
                    style: {
                        backgroundImage: 'url(' + (avatarUrl3 ? avatarUrl3 : advgbAvatar.holder) + ')',
                        backgroundColor: avatarColor,
                        borderRadius: avatarBorderRadius + '%',
                        borderWidth: avatarBorderWidth + 'px',
                        borderColor: avatarBorderColor,
                        width: avatarSize + 'px',
                        height: avatarSize + 'px'
                    }
                })
            ),
            React.createElement(
                'h4',
                { className: 'advgb-testimonial-name',
                    style: { color: nameColor }
                },
                name3
            ),
            React.createElement(
                'p',
                { className: 'advgb-testimonial-position',
                    style: { color: positionColor }
                },
                position3
            ),
            React.createElement(
                'p',
                { className: 'advgb-testimonial-desc',
                    style: { color: descColor }
                },
                desc3
            )
        )
    );
}

var testimonialBlockIcon = React.createElement(
    'svg',
    { fill: '#000000', height: '20', viewBox: '2 2 22 22', width: '20', xmlns: 'http://www.w3.org/2000/svg' },
    React.createElement('path', { d: 'M19 2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 3.3c1.49 0 2.7 1.21 2.7 2.7 0 1.49-1.21 2.7-2.7 2.7-1.49 0-2.7-1.21-2.7-2.7 0-1.49 1.21-2.7 2.7-2.7zM18 16H6v-.9c0-2 4-3.1 6-3.1s6 1.1 6 3.1v.9z' }),
    React.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
);

registerBlockType('advgb/testimonial', {
    title: __('Testimonial'),
    description: __('Block for creating personal or team/group information.'),
    icon: testimonialBlockIcon,
    category: 'common',
    keywords: [__('testimonial'), __('personal'), __('about')],
    attributes: {
        avatarUrl: {
            type: 'string',
            default: advgbAvatar.holder
        },
        avatarID: {
            type: 'number'
        },
        avatarUrl2: {
            type: 'string',
            default: advgbAvatar.holder
        },
        avatarID2: {
            type: 'number'
        },
        avatarUrl3: {
            type: 'string',
            default: advgbAvatar.holder
        },
        avatarID3: {
            type: 'number'
        },
        avatarColor: {
            type: 'string'
        },
        avatarBorderRadius: {
            type: 'number',
            default: 50
        },
        avatarBorderWidth: {
            type: 'number'
        },
        avatarBorderColor: {
            type: 'string'
        },
        avatarSize: {
            type: 'number',
            default: 70
        },
        name: {
            type: 'string',
            default: __('Person Name')
        },
        name2: {
            type: 'string',
            default: __('Person Name')
        },
        name3: {
            type: 'string',
            default: __('Person Name')
        },
        nameColor: {
            type: 'string'
        },
        position: {
            type: 'string',
            default: __('Position')
        },
        position2: {
            type: 'string',
            default: __('Position')
        },
        position3: {
            type: 'string',
            default: __('Position')
        },
        positionColor: {
            type: 'string'
        },
        desc: {
            type: 'string',
            default: __('A little description about this person will show up here.')
        },
        desc2: {
            type: 'string',
            default: __('A little description about this person will show up here.')
        },
        desc3: {
            type: 'string',
            default: __('A little description about this person will show up here.')
        },
        descColor: {
            type: 'string'
        },
        columns: {
            type: 'number',
            default: 1
        }
    },
    edit: AdvTestimonial,
    save: AdvTestimonialSave
});
