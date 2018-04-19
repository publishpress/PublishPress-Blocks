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

registerBlockType( 'advgb/spacer', {
    title: __( 'Spacer' ),
    description: __( 'Create space between blocks.' ),
    icon: 'align-center',
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
