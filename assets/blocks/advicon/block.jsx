import {AdvColorControl} from "../0-adv-components/components.jsx";

(function ( wpI18n, wpBlocks, wpElement, wpBlockEditor, wpComponents ) {
    wpBlockEditor = wp.blockEditor || wp.editor;
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InspectorControls, BlockControls, AlignmentToolbar, URLInput } = wpBlockEditor;
    const { BaseControl, PanelBody, RangeControl, SelectControl, TextControl } = wpComponents;
    const { times } = lodash;

    const previewImageData = '';

    class AdvIconEdit extends Component {

        constructor() {
            super( ...arguments );
            this.state = {
                searchedText: '',
            }
        }

        componentWillMount() {
            const { attributes, setAttributes } = this.props;
            const currentBlockConfig = advgbDefaultConfig['advgb-icon'];

            // No override attributes of blocks inserted before
            if (attributes.changed !== true) {
                if (typeof currentBlockConfig === 'object' && currentBlockConfig !== null) {
                    Object.keys(currentBlockConfig).map((attribute) => {
                        if (typeof attributes[attribute] === 'boolean') {
                            attributes[attribute] = !!currentBlockConfig[attribute];
                        } else {
                            attributes[attribute] = currentBlockConfig[attribute];
                        }
                    });
                }

                // Finally set changed attribute to true, so we don't modify anything again
                setAttributes( { changed: true } );
            }
        }

        componentDidMount() {
            const { attributes, setAttributes, clientId } = this.props;
            const { blockIDX } = attributes;

            if (!blockIDX) {
                setAttributes( { blockIDX: `advgb-icon-${clientId}` } );
            }
        }

        updateItems(idx, data) {
            const { attributes, setAttributes } = this.props;
            const { items } = attributes;

            const newItems = items.map( (item, index) => {
                if (idx === index) item = { ...item, ...data };

                return item;
            } );

            setAttributes( { items: newItems } );
            this.setState( { searchedText: '' } )
        }

        render() {
            const { attributes, setAttributes } = this.props;
            const {
                blockIDX,
                items,
                numberItem,
                tAlign,
                isPreview
            } = attributes;

            const { searchedText } = this.state;

            const blockWrapClass = [
                'advgb-icon-wrapper'
            ].filter( Boolean ).join( ' ' );

            const blockClass = [
                'advgb-icons',
            ].filter( Boolean ).join( ' ' );

            let i = 0;
            let j = 0;

            return (
                isPreview ?
                    <img alt={__('Advanced Icon', 'advanced-gutenberg')} width='100%' src={previewImageData}/>
                    :
                    <Fragment>
                    <BlockControls>
                        <AlignmentToolbar
                            value={ tAlign }
                            onChange={ ( value ) => setAttributes( { tAlign: value } ) }
                        />
                    </BlockControls>
                    <InspectorControls>
                        <PanelBody title={ __( 'Icon Count', 'advanced-gutenberg' ) }>
                            <RangeControl
                                label={ __( 'Number of Icons', 'advanced-gutenberg' ) }
                                min={ 1 }
                                max={ 10 }
                                value={ numberItem }
                                onChange={ (value) => setAttributes( { numberItem: value } ) }
                            />
                        </PanelBody>
                        {items.map( (item, idx) => {
                                i++;
                                if (i > numberItem) return false;
                                return (
                                    <Fragment>
                                        <PanelBody
                                            title={ __( `Icon ${i} Settings`, 'advanced-gutenberg' ) }
                                            initialOpen={ false }
                                        >

                                            <BaseControl
                                                label={ __( 'Icon Library (Material Icon)', 'advanced-gutenberg' )}
                                            >
                                                <TextControl
                                                    placeholder={ __( 'Search icons (at least 3 characters)', 'advanced-gutenberg' ) }
                                                    value={ searchedText }
                                                    onChange={ (value) => this.setState( { searchedText: value } ) }
                                                />
                                                {searchedText.trim().length > 2 && !!advgbBlocks.iconList[item.iconType] && (
                                                    <div className="advgb-icon-items-wrapper button-icons-list" style={ {maxHeight: 300, overflow: 'auto', marginBottom: '24px'} }>
                                                        {Object.keys(advgbBlocks.iconList[item.iconType])
                                                            .filter((icon) => icon.indexOf(searchedText.trim().split(' ').join('_')) > -1)
                                                            .map( (icon, index) => {

                                                                const iconName = icon.replace(/_/g, '-');
                                                                const iconClass = [
                                                                    item.iconType === 'material' && 'mi mi-',
                                                                    icon.replace(/_/g, '-'),
                                                                ].filter( Boolean ).join('');

                                                                return (
                                                                    <div className="advgb-icon-item" key={ index }>
                                                                    <span onClick={ () => this.updateItems(idx, { icon: iconName } ) }
                                                                          className={ iconName === item.icon && 'active' }
                                                                          title={ iconClass.split(' ').pop() }
                                                                    >
                                                                        <i className={ iconClass } />
                                                                    </span>
                                                                    </div>
                                                                )
                                                            } ) }
                                                    </div>
                                                ) }
                                            </BaseControl>

                                            <SelectControl
                                                label={ __('Icon Style', 'advanced-gutenberg') }
                                                value={ item.style }
                                                options={ [
                                                    { label: __('Default', 'advanced-gutenberg'), value: 'default' },
                                                    { label: __('Stacked', 'advanced-gutenberg'), value: 'stacked' },
                                                ] }
                                                onChange={ ( value ) => this.updateItems(idx, { style: value } ) }
                                            />
                                            <RangeControl
                                                label={ __( 'Icon Size', 'advanced-gutenberg' ) }
                                                min={ 10 }
                                                max={ 250 }
                                                value={ item.size }
                                                onChange={ (value) => this.updateItems(idx, { size: value } ) }
                                            />
                                            <AdvColorControl
                                                label={ __('Icon Color', 'advanced-gutenberg') }
                                                value={ item.color }
                                                onChange={ (value) => this.updateItems(idx, { color: value } ) }
                                            />
                                            <AdvColorControl
                                                label={ __('Icon Background', 'advanced-gutenberg') }
                                                value={ item.bgColor }
                                                onChange={ (value) => this.updateItems(idx, { bgColor: value } ) }
                                            />
                                            {item.style && item.style === 'stacked' && <PanelBody
                                                title={__( `Border`, 'advanced-gutenberg' )}
                                                initialOpen={false}
                                            >
                                                <AdvColorControl
                                                    label={__( 'Border Color', 'advanced-gutenberg' )}
                                                    value={item.borderColor}
                                                    onChange={( value ) => this.updateItems( idx, { borderColor: value } )}
                                                />
                                                <RangeControl
                                                    label={__( 'Border Size(px)', 'advanced-gutenberg' )}
                                                    min={0}
                                                    max={20}
                                                    value={item.borderSize}
                                                    onChange={( value ) => this.updateItems( idx, { borderSize: value } )}
                                                />
                                                <RangeControl
                                                    label={__( 'Border Radius(%)', 'advanced-gutenberg' )}
                                                    min={0}
                                                    max={50}
                                                    value={item.borderRadius}
                                                    onChange={( value ) => this.updateItems( idx, { borderRadius: value } )}
                                                />
                                            </PanelBody>
                                            }
                                            <PanelBody
                                                title={ __('Link', 'advanced-gutenberg') }
                                                initialOpen={false}
                                            >
                                                <BaseControl
                                                    label={ [
                                                        __( 'Link', 'advanced-gutenberg' ),
                                                        (item.link && <a href={ item.link || '#' } key="link_url" target="_blank" style={ { marginLeft: '5px' } }>
                                                            { __( 'Preview', 'advanced-gutenberg' ) }
                                                        </a>)
                                                    ] }
                                                >
                                                    <URLInput
                                                        value={item.link}
                                                        onChange={ (value) =>  this.updateItems(idx, { link: value } ) }
                                                        autoFocus={false}
                                                        isFullWidth
                                                        hasBorder
                                                    />
                                                </BaseControl>
                                                <SelectControl
                                                    label={ __('Link Target', 'advanced-gutenberg') }
                                                    value={ item.linkTarget }
                                                    options={ [
                                                        { label: __('Same Window', 'advanced-gutenberg'), value: '_self' },
                                                        { label: __('New Window', 'advanced-gutenberg'), value: '_blank' },
                                                    ] }
                                                    onChange={ ( value ) => this.updateItems(idx, { linkTarget: value } ) }
                                                />
                                                <TextControl
                                                    label={ __('Title for Accessibility', 'advanced-gutenberg') }
                                                    value={ item.title }
                                                    onChange={ ( value ) => this.updateItems(idx, { title: value } ) }
                                                />
                                            </PanelBody>
                                            {item.style && item.style === 'stacked' && <PanelBody
                                                title={__( ' Padding', 'advanced-gutenberg' )}
                                                initialOpen={false}
                                            >
                                                <div className="advgb-controls-title">
                                                    <span>{__( 'Unit', 'advanced-gutenberg' )}</span>
                                                    <div className="advgb-unit-wrapper" key="unit">
                                                        {[ 'px', 'em', 'vh', '%' ].map( ( unit, uIdx ) => (
                                                            <span
                                                                className={`advgb-unit ${item.paddingUnit === unit ? 'selected' : ''}`}
                                                                key={uIdx}
                                                                onClick={() => this.updateItems( idx, { paddingUnit: unit } )}
                                                            >
                                                            {unit}
                                                        </span>
                                                        ) )}
                                                    </div>
                                                </div>
                                                <RangeControl
                                                    beforeIcon="arrow-up-alt2"
                                                    value={item.paddingTop}
                                                    min={0}
                                                    max={180}
                                                    onChange={( value ) => this.updateItems( idx, { paddingTop: value } )}
                                                />
                                                <RangeControl
                                                    beforeIcon="arrow-down-alt2"
                                                    value={item.paddingBottom}
                                                    min={0}
                                                    max={180}
                                                    onChange={( value ) => this.updateItems( idx, { paddingBottom: value } )}
                                                />
                                                <RangeControl
                                                    beforeIcon="arrow-left-alt2"
                                                    value={item.paddingLeft}
                                                    min={0}
                                                    max={180}
                                                    onChange={( value ) => this.updateItems( idx, { paddingLeft: value } )}
                                                />
                                                <RangeControl
                                                    beforeIcon="arrow-right-alt2"
                                                    value={item.paddingRight}
                                                    min={0}
                                                    max={180}
                                                    onChange={( value ) => this.updateItems( idx, { paddingRight: value } )}
                                                />
                                            </PanelBody>
                                            }
                                            <PanelBody
                                                title={ __(' Margin', 'advanced-gutenberg') }
                                                initialOpen={false}
                                            >
                                                <div className="advgb-controls-title">
                                                    <span>{ __( 'Unit', 'advanced-gutenberg' ) }</span>
                                                    <div className="advgb-unit-wrapper" key="unit">
                                                        { ['px', 'em', 'vh', '%'].map( (unit, uIdx) => (
                                                            <span
                                                                className={`advgb-unit ${item.marginUnit === unit ? 'selected' : ''}`} key={uIdx}
                                                                onClick={ () => this.updateItems(idx, { marginUnit: unit } ) }
                                                            >
                                                            {unit}
                                                        </span>
                                                        ) ) }
                                                    </div>
                                                </div>
                                                <RangeControl
                                                    beforeIcon="arrow-up-alt2"
                                                    value={ item.marginTop }
                                                    min={ 0 }
                                                    max={ 180 }
                                                    onChange={ (value) => this.updateItems(idx, { marginTop: value } ) }
                                                />
                                                <RangeControl
                                                    beforeIcon="arrow-down-alt2"
                                                    value={ item.marginBottom }
                                                    min={ 0 }
                                                    max={ 180 }
                                                    onChange={ (value) => this.updateItems(idx, { marginBottom: value } ) }
                                                />
                                                <RangeControl
                                                    beforeIcon="arrow-left-alt2"
                                                    value={ item.marginLeft }
                                                    min={ 0 }
                                                    max={ 180 }
                                                    onChange={ (value) => this.updateItems(idx, { marginLeft: value } ) }
                                                />
                                                <RangeControl
                                                    beforeIcon="arrow-right-alt2"
                                                    value={ item.marginRight }
                                                    min={ 0 }
                                                    max={ 180 }
                                                    onChange={ (value) => this.updateItems(idx, { marginRight: value } ) }
                                                />
                                            </PanelBody>
                                        </PanelBody>
                                    </Fragment>
                                );
                            }
                        )}
                    </InspectorControls>

                    <div className={blockWrapClass} id={blockIDX}>
                        <div className={ blockClass } style={ {textAlign: tAlign} }>
                            {items.map( (item, idx) => {
                                j++;
                                if (j > numberItem) return false;
                                const advgbIconClass = [
                                    `advgb-icon-style-${item.style}`,
                                    'advgb-icon-wrap',
                                    `advgb-item-${idx}`,
                                ].filter( Boolean ).join( ' ' );

                                const iconWrapClass = [
                                    'advgb-icon',
                                    `advgb-icon-${item.icon}`
                                ].filter( Boolean ).join(' ');

                                const iconClass = [
                                    item.iconType === 'material' && 'mi mi-',
                                    item.icon,
                                ].filter( Boolean ).join('');

                                const iconWrapStyles = {
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginTop: item.marginTop + item.marginUnit,
                                    marginBottom: item.marginBottom + item.marginUnit,
                                    marginLeft: item.marginLeft + item.marginUnit,
                                    marginRight: item.marginRight + item.marginUnit,
                                    paddingTop: item.style !== 'default' ? item.paddingTop + item.paddingUnit : 0,
                                    paddingBottom: item.style !== 'default' ? item.paddingBottom + item.paddingUnit : 0,
                                    paddingLeft: item.style !== 'default' ? item.paddingLeft + item.paddingUnit : 0,
                                    paddingRight: item.style !== 'default' ? item.paddingRight + item.paddingUnit : 0,
                                    borderWidth: item.style !== 'default' ? item.borderSize + 'px' : 0,
                                    borderStyle: 'solid',
                                    borderColor: item.borderColor,
                                    background: item.bgColor,
                                    borderRadius: item.borderRadius + '%'
                                };

                                const iconStyles = {
                                    fontSize: item.size + 'px',
                                    color: item.color
                                };
                                return (
                                    <Fragment>
                                        <div className={advgbIconClass}>
                                            <div className={iconWrapClass} style={iconWrapStyles}>
                                                <i className={iconClass} style={iconStyles}></i>
                                            </div>
                                        </div>
                                    </Fragment>
                                );
                            })}
                        </div>
                    </div>
                </Fragment>
            );
        }
    }

    const blockAttrs = {
        blockIDX: {
            type: 'string',
        },
        items: {
            type: 'array',
            default: times(10, () => (
                {
                    icon: 'info',
                    iconType: 'material',
                    size: 50,
                    color: '#111111',
                    style: 'default',
                    bgColor: '',
                    borderColor: '#111',
                    borderSize: 2,
                    borderRadius: 0,
                    paddingTop: 20,
                    paddingBottom: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                    marginTop: 0,
                    marginBottom: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    paddingUnit: 'px',
                    marginUnit: 'px',
                    link: '',
                    linkTarget: '_self',
                    title: ''
                }
            ))
        },
        numberItem: {
            type: 'number',
            default: 1,
        },
        changed: {
            type: 'boolean',
            default: false,
        },
        tAlign: {
            type: 'string',
            default: 'center',
        },
        isPreview: {
            type: 'boolean',
            default: false,
        }
    };

    registerBlockType( 'advgb/icon', {
        title: __( 'Advanced Icon', 'advanced-gutenberg' ),
        description: __( 'Advanced icon block with more options and styles.', 'advanced-gutenberg' ),
        category: 'advgb-category',
        keywords: [ __( 'icon', 'advanced-gutenberg' ) ],
        attributes: blockAttrs,
        supports: {
            align: ["left", "center", "right"],
        },
        example: {
            attributes: {
                isPreview: true
            },
        },
        edit: AdvIconEdit,
        save: ( { attributes } ) => {
            const {
                blockIDX,
                items,
                numberItem
            } = attributes;

            const blockWrapClass = [
                'wp-block-advgb-icon',
                'icon-wrapper',
            ].filter( Boolean ).join( ' ' );

            const blockClass = [
                'advgb-icons',
            ].filter( Boolean ).join( ' ' );

            let i = 0;
            return (
                <Fragment>
                    <div className={blockWrapClass} id={blockIDX}>
                        <div className={ blockClass }>
                            {items.map( (item, idx) => {
                                i++;
                                if (i > numberItem) return false;
                                const advgbIconClass = [
                                    `advgb-icon-style-${item.style}`,
                                    'advgb-icon-wrap',
                                    `advgb-item-${idx}`,
                                ].filter( Boolean ).join( ' ' );

                                const iconWrapClass = [
                                    'advgb-icon',
                                    `advgb-icon-${item.icon}`
                                ].filter( Boolean ).join(' ');

                                const iconClass = [
                                    item.iconType === 'material' && 'mi mi-',
                                    item.icon,
                                ].filter( Boolean ).join('');

                                const iconStyles = {
                                    fontSize: item.size + 'px',
                                    color: item.color
                                };
                                return (
                                    <Fragment>
                                        <div className={advgbIconClass}>
                                            {item.link !== '' && <a href={item.link} title={item.title} target={item.linkTarget}>
                                            <div className={iconWrapClass}>
                                                <i className={iconClass}></i>
                                            </div>
                                            </a>
                                            }
                                            {item.link === '' &&
                                                <div className={iconWrapClass}>
                                                    <i className={iconClass}></i>
                                                </div>
                                            }
                                        </div>
                                    </Fragment>
                                );
                            })}
                        </div>
                    </div>
                </Fragment>
            )
        }
    });
}) ( wp.i18n, wp.blocks, wp.element, wp.blockEditor, wp.components );