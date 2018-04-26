'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __ = wp.i18n.__;
var Component = wp.element.Component;
var _wp$blocks = wp.blocks,
    registerBlockType = _wp$blocks.registerBlockType,
    InspectorControls = _wp$blocks.InspectorControls;
var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    RangeControl = _wp$components.RangeControl;

var AdvgbSpacerBlock = function (_Component) {
    _inherits(AdvgbSpacerBlock, _Component);

    function AdvgbSpacerBlock() {
        _classCallCheck(this, AdvgbSpacerBlock);

        return _possibleConstructorReturn(this, (AdvgbSpacerBlock.__proto__ || Object.getPrototypeOf(AdvgbSpacerBlock)).apply(this, arguments));
    }

    _createClass(AdvgbSpacerBlock, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                attributes = _props.attributes,
                setAttributes = _props.setAttributes,
                isSelected = _props.isSelected;
            var height = attributes.height;


            return [React.createElement('div', { key: 'advgb-spacer', style: { display: 'block', height: height || 'auto' } }), isSelected && React.createElement(
                InspectorControls,
                { key: 'advgb-spacer-inspector' },
                React.createElement(
                    PanelBody,
                    { title: __('Spacer settings') },
                    React.createElement(RangeControl, {
                        label: __('Height'),
                        value: height || 0,
                        onChange: function onChange(value) {
                            return setAttributes({ height: value });
                        },
                        min: 1,
                        max: 300
                    })
                )
            )];
        }
    }]);

    return AdvgbSpacerBlock;
}(Component);

var spacerBlockIcon = React.createElement(
    'svg',
    { fill: '#000000', height: '20', viewBox: '1 2 20 20', width: '20', xmlns: 'http://www.w3.org/2000/svg' },
    React.createElement('path', { fill: 'none', d: 'm0,0l24,0l0,24l-24,0l0,-24z' }),
    React.createElement('path', { transform: 'rotate(90 12,12)', d: 'm7.77,6.76l-1.54,-1.28l-5.41,6.52l5.41,6.52l1.54,-1.28l-4.35,-5.24l4.35,-5.24zm-0.77,6.24l2,0l0,-2l-2,0l0,2zm10,-2l-2,0l0,2l2,0l0,-2zm-6,2l2,0l0,-2l-2,0l0,2zm6.77,-7.52l-1.54,1.28l4.35,5.24l-4.35,5.24l1.54,1.28l5.41,-6.52l-5.41,-6.52z' })
);

registerBlockType('advgb/spacer', {
    title: __('Spacer'),
    description: __('Create space between blocks.'),
    icon: spacerBlockIcon,
    category: 'layout',
    keywords: [__('space'), __('spacer'), __('margin')],
    attributes: {
        height: {
            type: 'number',
            default: 20
        }
    },
    edit: AdvgbSpacerBlock,
    save: function save(_ref) {
        var attributes = _ref.attributes;

        return React.createElement('div', { style: { display: 'block', height: attributes.height || 'auto' } });
    }
});
