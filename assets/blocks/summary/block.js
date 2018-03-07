'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __ = wp.i18n.__;
var Component = wp.element.Component;
var _wp$blocks = wp.blocks,
    registerBlockType = _wp$blocks.registerBlockType,
    BlockControls = _wp$blocks.BlockControls;
var _wp$components = wp.components,
    IconButton = _wp$components.IconButton,
    Placeholder = _wp$components.Placeholder,
    Button = _wp$components.Button,
    Toolbar = _wp$components.Toolbar;
var select = wp.data.select;


var blockIcon = 'list-view';
var blockTitle = __('Summary');

var SummaryBlock = function (_Component) {
    _inherits(SummaryBlock, _Component);

    function SummaryBlock() {
        _classCallCheck(this, SummaryBlock);

        var _this = _possibleConstructorReturn(this, (SummaryBlock.__proto__ || Object.getPrototypeOf(SummaryBlock)).apply(this, arguments));

        _this.updateSummary = _this.updateSummary.bind(_this);
        return _this;
    }

    _createClass(SummaryBlock, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.updateSummary();
        }
    }, {
        key: 'updateSummary',
        value: function updateSummary() {
            var headingDatas = [];
            var allBlocks = select('core/editor').getBlocks();
            var headingBlocks = allBlocks.filter(function (block) {
                return block.name === 'core/heading';
            });
            headingBlocks.map(function (heading) {
                var thisHead = {};
                thisHead['level'] = parseInt(heading.attributes.nodeName.replace(/h/gi, ''));

                // We only get heading from h2
                if (thisHead['level'] > 1) {
                    thisHead['level'] -= 1;
                    thisHead['content'] = heading.attributes.content.length ? heading.attributes.content[0] : '';
                    thisHead['uid'] = heading.uid;
                    if (heading.attributes.anchor) {
                        thisHead['anchor'] = heading.attributes.anchor;
                    } else {
                        // Generate a random anchor for headings without it
                        thisHead['anchor'] = 'advgb-toc-' + heading.uid;
                        heading.attributes.anchor = thisHead['anchor'];
                    }

                    headingDatas.push(thisHead);
                }

                return heading;
            });

            this.props.setAttributes({
                headings: headingDatas
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                attributes = _props.attributes,
                isSelected = _props.isSelected;
            var headings = attributes.headings;

            // No heading blocks

            var summaryContent = React.createElement(
                Placeholder,
                {
                    icon: blockIcon,
                    label: blockTitle,
                    instructions: __('Your current post/page has no headings. Try add some headings and update this block later')
                },
                React.createElement(
                    Button,
                    { onClick: this.updateSummary,
                        className: 'button'
                    },
                    __('Update')
                )
            );

            // Having heading blocks
            if (headings.length > 0) {
                var _dispatch = dispatch('core/editor'),
                    selectBlock = _dispatch.selectBlock;

                summaryContent = React.createElement(
                    'ul',
                    { className: 'advgb-toc' },
                    headings.map(function (heading) {
                        return React.createElement(
                            'li',
                            { className: 'toc-level-' + heading.level,
                                style: { marginLeft: heading.level * 20 }
                            },
                            React.createElement(
                                'a',
                                { href: '#' + heading.anchor,
                                    onClick: function onClick() {
                                        return selectBlock(heading.uid);
                                    }
                                },
                                heading.content
                            )
                        );
                    })
                );
            }

            return [isSelected && !!headings.length && React.createElement(
                BlockControls,
                null,
                React.createElement(
                    Toolbar,
                    null,
                    React.createElement(IconButton, { className: 'components-icon-button components-toolbar__control',
                        icon: 'update',
                        label: __('Update Summary'),
                        onClick: this.updateSummary
                    })
                )
            ), summaryContent];
        }
    }]);

    return SummaryBlock;
}(Component);

registerBlockType('advgb/summary', {
    title: blockTitle,
    description: __('Show the table of content of current post/page.'),
    icon: blockIcon,
    category: 'formatting',
    keywords: [__('summary', 'table of content', 'content', 'list')],
    attributes: {
        headings: {
            type: 'array',
            default: []
        }
    },
    useOnce: true,
    edit: SummaryBlock,
    save: function save(_ref) {
        var attributes = _ref.attributes;
        var headings = attributes.headings;
        // No heading blocks

        if (headings.length < 1) {
            return null;
        }

        return React.createElement(
            'ul',
            { className: 'advgb-toc' },
            headings.map(function (heading) {
                return React.createElement(
                    'li',
                    { className: 'toc-level-' + heading.level,
                        style: { marginLeft: heading.level * 20 }
                    },
                    React.createElement(
                        'a',
                        { href: '#' + heading.anchor },
                        heading.content
                    )
                );
            })
        );
    }
});
