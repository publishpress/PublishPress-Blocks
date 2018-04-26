const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { registerBlockType, InspectorControls, RichText, ColorPalette } = wp.blocks;
const { RangeControl, PanelBody, PanelColor } = wp.components;

class AdvCountUp extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            currentEdit: '',
        };

        this.setCurrentEditArea = this.setCurrentEditArea.bind( this )
    }

    setCurrentEditArea( area ) {
        this.setState( { currentEdit: area } )
    }

    render() {
        const { currentEdit } = this.state;
        const { attributes, setAttributes, isSelected } = this.props;
        const {
            headerText,
            headerTextColor,
            countUpNumber,
            countUpNumberColor,
            countUpNumberSize,
            descText,
            descTextColor,
        } = attributes;

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={ __( 'Count Up Setting' ) }>
                        <PanelColor title={ __( 'Header Color' ) } colorValue={ headerTextColor } initialOpen={ false }>
                            <ColorPalette
                                value={ headerTextColor }
                                onChange={ (value) => setAttributes( { headerTextColor: value } ) }
                            />
                        </PanelColor>
                        <PanelColor title={ __( 'Count Up Color' ) } colorValue={ countUpNumberColor } initialOpen={ false }>
                            <ColorPalette
                                value={ countUpNumberColor }
                                onChange={ (value) => setAttributes( { countUpNumberColor: value } ) }
                            />
                        </PanelColor>
                        <PanelColor title={ __( 'Description Color' ) } colorValue={ descTextColor } initialOpen={ false }>
                            <ColorPalette
                                value={ descTextColor }
                                onChange={ (value) => setAttributes( { descTextColor: value } ) }
                            />
                        </PanelColor>
                        <RangeControl
                            label={ __( 'Counter Number Size' ) }
                            min={ 10 }
                            max={ 100 }
                            value={ countUpNumberSize }
                            onChange={ (value) => setAttributes( { countUpNumberSize: value } ) }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className="advgb-count-up" style={ { textAlign: 'center' } }>
                    <RichText
                        tagName={ 'h4' }
                        value={ headerText }
                        onChange={ (value) => setAttributes( { headerText: value } ) }
                        isSelected={ isSelected && currentEdit === 'header' }
                        onFocus={ () => this.setCurrentEditArea( 'header' ) }
                        style={ { color: headerTextColor } }
                    />
                    <RichText
                        tagName={ 'div' }
                        value={ countUpNumber }
                        onChange={ (value) => setAttributes( { countUpNumber: value } ) }
                        isSelected={ isSelected && currentEdit === 'countUp' }
                        onFocus={ () => this.setCurrentEditArea( 'countUp' ) }
                        style={ { fontSize: countUpNumberSize + 'px', color: countUpNumberColor } }
                    />
                    <RichText
                        tagName={ 'p' }
                        value={ descText }
                        onChange={ (value) => setAttributes( { descText: value } ) }
                        isSelected={ isSelected && currentEdit === 'desc' }
                        onFocus={ () => this.setCurrentEditArea( 'desc' ) }
                        style={ { color: descTextColor } }
                    />
                </div>
            </Fragment>
        )
    }
}

const countUpBlockIcon = (
    <svg fill="#000000" height="20" viewBox="1 2 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0zm0 0h24v24H0z" fill="none"/>
        <path d="M16.05 16.29l2.86-3.07c.38-.39.72-.79 1.04-1.18.32-.39.59-.78.82-1.17.23-.39.41-.78.54-1.17.13-.39.19-.79.19-1.18 0-.53-.09-1.02-.27-1.46-.18-.44-.44-.81-.78-1.11-.34-.31-.77-.54-1.26-.71-.51-.16-1.08-.24-1.72-.24-.69 0-1.31.11-1.85.32-.54.21-1 .51-1.36.88-.37.37-.65.8-.84 1.3-.18.47-.27.97-.28 1.5h2.14c.01-.31.05-.6.13-.87.09-.29.23-.54.4-.75.18-.21.41-.37.68-.49.27-.12.6-.18.96-.18.31 0 .58.05.81.15.23.1.43.25.59.43.16.18.28.4.37.65.08.25.13.52.13.81 0 .22-.03.43-.08.65-.06.22-.15.45-.29.7-.14.25-.32.53-.56.83-.23.3-.52.65-.88 1.03l-4.17 4.55V18H22v-1.71h-5.95zM8 7H6v4H2v2h4v4h2v-4h4v-2H8V7z"/>
    </svg>
);

registerBlockType( 'advgb/count-up', {
    title: __( 'Count Up' ),
    description: __( 'Make a block with animate counting numbers.' ),
    icon: countUpBlockIcon,
    category: 'common',
    keywords: [ __( 'numbers' ), __( 'count' ), __( 'increase' ) ],
    attributes: {
        headerText: {
            type: 'string',
            default: __( 'Header text' )
        },
        headerTextColor: {
            type: 'string',
        },
        countUpNumber: {
            type: 'number',
            default: 5678.9
        },
        countUpNumberColor: {
            type: 'string',
        },
        countUpNumberSize: {
            type: 'number',
            default: 60,
        },
        descText: {
            type: 'string',
            default: __( 'and description' ),
        },
        descTextColor: {
            type: 'string',
        }
    },
    edit: AdvCountUp,
    save: ( { attributes } ) => {
        const {
            headerText,
            headerTextColor,
            countUpNumber,
            countUpNumberColor,
            countUpNumberSize,
            descText,
            descTextColor,
        } = attributes;

        return (
            <div className={ 'advgb-count-up' } style={ { textAlign: 'center' } }>
                <h4 className={ 'advgb-count-up-header' } style={ { color: headerTextColor } }>
                    { headerText }
                </h4>
                <div className={ 'advgb-counter' }
                     style={ { color: countUpNumberColor, fontSize: countUpNumberSize + 'px' } }
                >
                    { countUpNumber }
                </div>
                <p className={ 'advgb-count-up-desc' } style={ { color: descTextColor } }>
                    { descText }
                </p>
            </div>
        );
    }
} );