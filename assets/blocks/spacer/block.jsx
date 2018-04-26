const { __ } = wp.i18n;
const { Component } = wp.element;
const { registerBlockType, InspectorControls } = wp.blocks;
const { PanelBody, RangeControl } = wp.components;

class AdvgbSpacerBlock extends Component {
    constructor() {
        super( ...arguments );
    }

    render() {
        const { attributes, setAttributes, isSelected } = this.props;
        const { height } = attributes;

        return [
            <div key="advgb-spacer" style={ { display: 'block', height: height || 'auto' } } />,
            isSelected && (
                <InspectorControls key="advgb-spacer-inspector">
                    <PanelBody title={ __( 'Spacer settings' ) }>
                        <RangeControl
                            label={ __( 'Height' ) }
                            value={ height || 0 }
                            onChange={ ( value ) => setAttributes( { height: value } ) }
                            min={ 1 }
                            max={ 300 }
                        />
                    </PanelBody>
                </InspectorControls>
            )
        ]
    }
}

const spacerBlockIcon = (
    <svg fill="#000000" height="20" viewBox="1 2 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
        <path fill="none" d="m0,0l24,0l0,24l-24,0l0,-24z"/>
        <path transform="rotate(90 12,12)" d="m7.77,6.76l-1.54,-1.28l-5.41,6.52l5.41,6.52l1.54,-1.28l-4.35,-5.24l4.35,-5.24zm-0.77,6.24l2,0l0,-2l-2,0l0,2zm10,-2l-2,0l0,2l2,0l0,-2zm-6,2l2,0l0,-2l-2,0l0,2zm6.77,-7.52l-1.54,1.28l4.35,5.24l-4.35,5.24l1.54,1.28l5.41,-6.52l-5.41,-6.52z"/>
    </svg>
);

registerBlockType( 'advgb/spacer', {
    title: __( 'Spacer' ),
    description: __( 'Create space between blocks.' ),
    icon: spacerBlockIcon,
    category: 'layout',
    keywords: [ __( 'space' ), __( 'spacer' ), __( 'margin' ) ],
    attributes: {
        height: {
            type: 'number',
            default: 20,
        }
    },
    edit: AdvgbSpacerBlock,
    save: ( { attributes } ) => {
        return <div style={ { display: 'block', height: attributes.height || 'auto' } } />
    }
} );
