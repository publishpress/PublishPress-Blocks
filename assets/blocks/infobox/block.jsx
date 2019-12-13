import {AdvColorControl} from "../0-adv-components/components.jsx";
import IconListPopup from "../0-adv-components/components.jsx";

(function ( wpI18n, wpBlocks, wpElement, wpBlockEditor, wpComponents ) {
    wpBlockEditor = wp.blockEditor || wp.editor;
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InspectorControls, BlockControls, AlignmentToolbar, RichText } = wpBlockEditor;
    const { BaseControl, PanelBody, RangeControl, SelectControl, Button } = wpComponents;

    const previewImageData = 'data:image/png;base64,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';

    const blockIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19 1H5c-1.1 0-1.99.9-1.99 2L3 15.93c0 .69.35 1.3.88 1.66L12 23l8.11-5.41c.53-.36.88-.97.88-1.66L21 3c0-1.1-.9-2-2-2zm-7 19.6l-7-4.66V3h14v12.93l-7 4.67zm-2.01-7.42l-2.58-2.59L6 12l4 4 8-8-1.42-1.42z"/></svg>
    );

    class InfoBoxEdit extends Component {

        constructor() {
            super( ...arguments );
            this.state = {
                showPopup: false,
                iconSelected: '',
                selectedIcon: false,
                iconThemeSelected: '',
                selectedIconTheme: false,
            };
            this.togglePopup = this.togglePopup.bind(this);
            this.handleIcon = this.handleIcon.bind(this);
            this.handleIconTheme = this.handleIconTheme.bind(this);
        }

        componentWillMount() {
            const { attributes, setAttributes } = this.props;
            const currentBlockConfig = advgbDefaultConfig['advgb-infobox'];

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
                setAttributes( { blockIDX: `advgb-infobox-${clientId}` } );
            }
        }

        componentDidUpdate() {
            const {iconSelected, selectedIcon, iconThemeSelected, selectedIconTheme} = this.state;
            const {attributes, setAttributes} = this.props;
            if(selectedIcon) {

                this.setState({
                    selectedIcon: false
                });
                setAttributes({
                    icon: iconSelected,
                    iconTheme: iconThemeSelected
                });
            }

            if(selectedIconTheme) {
                this.setState({
                    selectedIconTheme: false
                });
                setAttributes({
                    iconTheme: iconThemeSelected
                });
            }
        }

        togglePopup() {
            const {showPopup} = this.state;

            this.setState( {
                showPopup: !showPopup
            } );
        }

        handleIcon(iconValue) {
            this.setState({
                iconSelected: iconValue,
                selectedIcon: true,
            });
        }

        handleIconTheme(iconThemeValue) {
            this.setState({
                iconThemeSelected: iconThemeValue,
                selectedIconTheme: true,
            });
        }

        render() {
            const {attributes, setAttributes} = this.props;
            const {
                blockIDX,
                isPreview,
                align,
                containerBorderWidth,
                containerBorderRadius,
                containerPaddingTop,
                containerPaddingBottom,
                containerPaddingLeft,
                containerPaddingRight,
                containerBackground,
                containerBorderBackground,
                containerPaddingUnit,
                iconBorderWidth,
                iconBorderRadius,
                iconPaddingTop,
                iconPaddingBottom,
                iconPaddingLeft,
                iconPaddingRight,
                iconMarginTop,
                iconMarginBottom,
                iconMarginLeft,
                iconMarginRight,
                iconBackground,
                iconBorderBackground,
                iconPaddingUnit,
                iconMarginUnit,
                icon,
                iconSize,
                iconColor,
                iconTheme,
                title,
                titleColor,
                titleSize,
                titleSizeUnit,
                titleLineHeight,
                titleLineHeightUnit,
                titleHtmlTag,
                titlePaddingTop,
                titlePaddingBottom,
                titlePaddingLeft,
                titlePaddingRight,
                titleMarginTop,
                titleMarginBottom,
                titleMarginLeft,
                titleMarginRight,
                titlePaddingUnit,
                titleMarginUnit,
                text,
                textColor,
                textSize,
                textSizeUnit,
                textLineHeight,
                textLineHeightUnit,
                textPaddingTop,
                textPaddingBottom,
                textPaddingLeft,
                textPaddingRight,
                textMarginTop,
                textMarginBottom,
                textMarginLeft,
                textMarginRight,
                textPaddingUnit,
                textMarginUnit,
            } = attributes;

            const {showPopup} = this.state;

            const blockWrapClass = [
                'advgb-infobox-wrapper',
                `has-text-align-${align}`
            ].filter( Boolean ).join( ' ' );

            const blockClass = [
                'advgb-infobox-wrap',
            ].filter( Boolean ).join( ' ' );

            const iconClass = [
                'material-icons',
                iconTheme !== '' && `-${iconTheme}`
            ].filter( Boolean ).join('');

            const containerPadding = containerPaddingTop + containerPaddingUnit + ' ' + containerPaddingRight + containerPaddingUnit + ' ' + containerPaddingBottom + containerPaddingUnit + ' ' + containerPaddingLeft + containerPaddingUnit;
            const iconPadding = iconPaddingTop + iconPaddingUnit + ' ' + iconPaddingRight + iconPaddingUnit + ' ' + iconPaddingBottom + iconPaddingUnit + ' ' + iconPaddingLeft + iconPaddingUnit;
            const iconMargin = iconMarginTop + iconMarginUnit + ' ' + iconMarginRight + iconMarginUnit + ' ' + iconMarginBottom + iconMarginUnit + ' ' + iconMarginLeft + iconMarginUnit;
            const titlePadding = titlePaddingTop + titlePaddingUnit + ' ' + titlePaddingRight + titlePaddingUnit + ' ' + titlePaddingBottom + titlePaddingUnit + ' ' + titlePaddingLeft + titlePaddingUnit;
            const titleMargin = titleMarginTop + titleMarginUnit + ' ' + titleMarginRight + titleMarginUnit + ' ' + titleMarginBottom + titleMarginUnit + ' ' + titleMarginLeft + titleMarginUnit;
            const textPadding = textPaddingTop + textPaddingUnit + ' ' + textPaddingRight + textPaddingUnit + ' ' + textPaddingBottom + textPaddingUnit + ' ' + textPaddingLeft + textPaddingUnit;
            const textMargin = textMarginTop + textMarginUnit + ' ' + textMarginRight + textMarginUnit + ' ' + textMarginBottom + textMarginUnit + ' ' + textMarginLeft + textMarginUnit;

            return (
                isPreview ?
                    <img alt={__('Advanced Icon', 'advanced-gutenberg')} width='100%' src={previewImageData}/>
                    :
                    <Fragment>
                        <BlockControls>
                            <AlignmentToolbar
                                value={ align }
                                onChange={ ( newAlign ) => setAttributes( { align: newAlign } ) }
                            />
                        </BlockControls>
                        <InspectorControls>
                            <PanelBody
                                title={ __( 'Container Settings', 'advanced-gutenberg' ) }
                            >
                                <AdvColorControl
                                    label={ __('Background', 'advanced-gutenberg') }
                                    value={ containerBackground }
                                    onChange={ (value) => setAttributes( {containerBackground: value} ) }
                                />
                                <AdvColorControl
                                    label={ __('Border Background', 'advanced-gutenberg') }
                                    value={ containerBorderBackground }
                                    onChange={ (value) => setAttributes( {containerBorderBackground: value} ) }
                                />
                                <RangeControl
                                    label={ __( 'Border Width (px)', 'advanced-gutenberg' ) }
                                    min={ 0 }
                                    max={ 40 }
                                    value={ containerBorderWidth }
                                    onChange={ (value) => setAttributes( { containerBorderWidth: value } ) }
                                />
                                <RangeControl
                                    label={ __( 'Border Radius (px)', 'advanced-gutenberg' ) }
                                    min={ 0 }
                                    max={ 200 }
                                    value={ containerBorderRadius }
                                    onChange={ (value) => setAttributes( { containerBorderRadius: value } ) }
                                />
                                <PanelBody
                                    title={__( ' Padding', 'advanced-gutenberg' )}
                                    initialOpen={false}
                                >
                                    <div className="advgb-controls-title">
                                        <span>{__( 'Unit', 'advanced-gutenberg' )}</span>
                                        <div className="advgb-unit-wrapper" key="unit">
                                            {[ 'px', 'em', 'vh', '%' ].map( ( unit, uIdx ) => (
                                                <span
                                                    className={`advgb-unit ${containerPaddingUnit === unit ? 'selected' : ''}`}
                                                    key={uIdx}
                                                    onClick={() => setAttributes( { containerPaddingUnit: unit } )}
                                                >
                                                    {unit}
                                                </span>
                                            ) )}
                                        </div>
                                    </div>
                                    <RangeControl
                                        beforeIcon="arrow-up-alt2"
                                        value={containerPaddingTop}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { containerPaddingTop: value } )}
                                    />
                                    <RangeControl
                                        beforeIcon="arrow-down-alt2"
                                        value={containerPaddingBottom}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { containerPaddingBottom: value } )}
                                    />
                                    <RangeControl
                                        beforeIcon="arrow-left-alt2"
                                        value={containerPaddingLeft}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { containerPaddingLeft: value } )}
                                    />
                                    <RangeControl
                                        beforeIcon="arrow-right-alt2"
                                        value={containerPaddingRight}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { containerPaddingRight: value } )}
                                    />
                                </PanelBody>
                            </PanelBody>
                            <PanelBody
                                title={ __( 'Icon Settings', 'advanced-gutenberg' ) }
                                initialOpen={false}
                            >
                                <BaseControl
                                    label={ __( 'Icon Library (Material Icon)', 'advanced-gutenberg' )}
                                >
                                    <Button
                                        className="button button-large advgb-browse-icon-btn"
                                        onClick={ () => {
                                            if(!showPopup) {
                                                this.togglePopup();
                                            }
                                        } }
                                    >
                                        { __( 'Icon Selection', 'advanced-gutenberg' ) }
                                    </Button>
                                </BaseControl>
                                <AdvColorControl
                                    label={ __( 'Icon Color', 'advanced-gutenberg' ) }
                                    value={ iconColor }
                                    onChange={ (value) => setAttributes( {iconColor: value} ) }
                                />
                                <RangeControl
                                    label={ __( 'Icon Size (px)', 'advanced-gutenberg' ) }
                                    value={iconSize}
                                    min={1}
                                    max={200}
                                    onChange={( value ) => setAttributes( { iconSize: value } )}
                                />
                                <AdvColorControl
                                    label={ __('Background', 'advanced-gutenberg') }
                                    value={ iconBackground }
                                    onChange={ (value) => setAttributes( {iconBackground: value} ) }
                                />
                                <AdvColorControl
                                    label={ __('Border Background', 'advanced-gutenberg') }
                                    value={ iconBorderBackground }
                                    onChange={ (value) => setAttributes( {iconBorderBackground: value} ) }
                                />
                                <RangeControl
                                    label={ __( 'Border Width (px)', 'advanced-gutenberg' ) }
                                    min={ 0 }
                                    max={ 40 }
                                    value={ iconBorderWidth }
                                    onChange={ (value) => setAttributes( { iconBorderWidth: value } ) }
                                />
                                <RangeControl
                                    label={ __( 'Border Radius (px)', 'advanced-gutenberg' ) }
                                    min={ 0 }
                                    max={ 200 }
                                    value={ iconBorderRadius }
                                    onChange={ (value) => setAttributes( { iconBorderRadius: value } ) }
                                />
                                <PanelBody
                                    title={__( ' Padding', 'advanced-gutenberg' )}
                                    initialOpen={false}
                                >
                                    <div className="advgb-controls-title">
                                        <span>{__( 'Unit', 'advanced-gutenberg' )}</span>
                                        <div className="advgb-unit-wrapper" key="unit">
                                            {[ 'px', 'em', 'vh', '%' ].map( ( unit, uIdx ) => (
                                                <span
                                                    className={`advgb-unit ${iconPaddingUnit === unit ? 'selected' : ''}`}
                                                    key={uIdx}
                                                    onClick={() => setAttributes( { iconPaddingUnit: unit } )}
                                                >
                                                    {unit}
                                                </span>
                                            ) )}
                                        </div>
                                    </div>
                                    <RangeControl
                                        beforeIcon="arrow-up-alt2"
                                        value={iconPaddingTop}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { iconPaddingTop: value } )}
                                    />
                                    <RangeControl
                                        beforeIcon="arrow-down-alt2"
                                        value={iconPaddingBottom}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { iconPaddingBottom: value } )}
                                    />
                                    <RangeControl
                                        beforeIcon="arrow-left-alt2"
                                        value={iconPaddingLeft}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { iconPaddingLeft: value } )}
                                    />
                                    <RangeControl
                                        beforeIcon="arrow-right-alt2"
                                        value={iconPaddingRight}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { iconPaddingRight: value } )}
                                    />
                                </PanelBody>
                                <PanelBody
                                    title={__( ' Margin', 'advanced-gutenberg' )}
                                    initialOpen={false}
                                >
                                    <div className="advgb-controls-title">
                                        <span>{__( 'Unit', 'advanced-gutenberg' )}</span>
                                        <div className="advgb-unit-wrapper" key="unit">
                                            {[ 'px', 'em', 'vh', '%' ].map( ( unit, uIdx ) => (
                                                <span
                                                    className={`advgb-unit ${iconMarginUnit === unit ? 'selected' : ''}`}
                                                    key={uIdx}
                                                    onClick={() => setAttributes( { iconMarginUnit: unit } )}
                                                >
                                                    {unit}
                                                </span>
                                            ) )}
                                        </div>
                                    </div>
                                    <RangeControl
                                        beforeIcon="arrow-up-alt2"
                                        value={iconMarginTop}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { iconMarginTop: value } )}
                                    />
                                    <RangeControl
                                        beforeIcon="arrow-down-alt2"
                                        value={iconMarginBottom}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { iconMarginBottom: value } )}
                                    />
                                    <RangeControl
                                        beforeIcon="arrow-left-alt2"
                                        value={iconMarginLeft}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { iconMarginLeft: value } )}
                                    />
                                    <RangeControl
                                        beforeIcon="arrow-right-alt2"
                                        value={iconMarginRight}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { iconMarginRight: value } )}
                                    />
                                </PanelBody>
                            </PanelBody>
                            <PanelBody
                                title={ __( 'Title Settings', 'advanced-gutenberg' ) }
                                initialOpen={false}
                            >
                                <AdvColorControl
                                    label={ __( 'Color', 'advanced-gutenberg' ) }
                                    value={ titleColor }
                                    onChange={ (value) => setAttributes( {titleColor: value} ) }
                                />
                                <div className="advgb-controls-title">
                                    <div className="advgb-unit-wrapper advgb-unit-2" key="unit">
                                        {[ 'px', 'em' ].map( ( unit, uIdx ) => (
                                            <span
                                                className={`advgb-unit ${titleSizeUnit === unit ? 'selected' : ''}`}
                                                key={uIdx}
                                                onClick={() => setAttributes( { titleSizeUnit: unit } )}
                                            >
                                                    {unit}
                                                </span>
                                        ) )}
                                    </div>
                                </div>
                                <RangeControl
                                    label={ __( 'Font Size', 'advanced-gutenberg' ) }
                                    value={titleSize}
                                    min={ titleSizeUnit === 'px' ? 1 : 0.2 }
                                    max={ titleSizeUnit === 'px' ? 200 : 12.0 }
                                    step={ titleSizeUnit === 'px' ? 1 : 0.1 }
                                    onChange={( value ) => setAttributes( { titleSize: value } )}
                                />
                                <div className="advgb-controls-title">
                                    <div className="advgb-unit-wrapper advgb-unit-2" key="unit">
                                        {[ 'px', 'em' ].map( ( unit, uIdx ) => (
                                            <span
                                                className={`advgb-unit ${titleLineHeightUnit === unit ? 'selected' : ''}`}
                                                key={uIdx}
                                                onClick={() => setAttributes( { titleLineHeightUnit: unit } )}
                                            >
                                                    {unit}
                                                </span>
                                        ) )}
                                    </div>
                                </div>
                                <RangeControl
                                    label={ __( 'Line Height', 'advanced-gutenberg' ) }
                                    value={titleLineHeight}
                                    min={ titleLineHeightUnit === 'px' ? 1 : 0.2 }
                                    max={ titleLineHeightUnit === 'px' ? 200 : 12.0 }
                                    step={ titleLineHeightUnit === 'px' ? 1 : 0.1 }
                                    onChange={( value ) => setAttributes( { titleLineHeight: value } )}
                                />
                                <SelectControl
                                    label={ __('HTML Tag', 'advanced-gutenberg') }
                                    value={ titleHtmlTag }
                                    options={ [
                                        { label: __('H1', 'advanced-gutenberg'), value: 'h1' },
                                        { label: __('H2', 'advanced-gutenberg'), value: 'h2' },
                                        { label: __('H3', 'advanced-gutenberg'), value: 'h3' },
                                        { label: __('H4', 'advanced-gutenberg'), value: 'h4' },
                                        { label: __('H5', 'advanced-gutenberg'), value: 'h5' },
                                        { label: __('H6', 'advanced-gutenberg'), value: 'h6' },
                                    ] }
                                    onChange={ ( value ) => setAttributes( { titleHtmlTag: value } ) }
                                />
                                <PanelBody
                                    title={__( ' Padding', 'advanced-gutenberg' )}
                                    initialOpen={false}
                                >
                                    <div className="advgb-controls-title">
                                        <span>{__( 'Unit', 'advanced-gutenberg' )}</span>
                                        <div className="advgb-unit-wrapper" key="unit">
                                            {[ 'px', 'em', 'vh', '%' ].map( ( unit, uIdx ) => (
                                                <span
                                                    className={`advgb-unit ${titlePaddingUnit === unit ? 'selected' : ''}`}
                                                    key={uIdx}
                                                    onClick={() => setAttributes( { titlePaddingUnit: unit } )}
                                                >
                                                    {unit}
                                                </span>
                                            ) )}
                                        </div>
                                    </div>
                                    <RangeControl
                                        beforeIcon="arrow-up-alt2"
                                        value={titlePaddingTop}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { titlePaddingTop: value } )}
                                    />
                                    <RangeControl
                                        beforeIcon="arrow-down-alt2"
                                        value={titlePaddingBottom}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { titlePaddingBottom: value } )}
                                    />
                                    <RangeControl
                                        beforeIcon="arrow-left-alt2"
                                        value={titlePaddingLeft}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { titlePaddingLeft: value } )}
                                    />
                                    <RangeControl
                                        beforeIcon="arrow-right-alt2"
                                        value={titlePaddingRight}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { titlePaddingRight: value } )}
                                    />
                                </PanelBody>
                                <PanelBody
                                    title={__( ' Margin', 'advanced-gutenberg' )}
                                    initialOpen={false}
                                >
                                    <div className="advgb-controls-title">
                                        <span>{__( 'Unit', 'advanced-gutenberg' )}</span>
                                        <div className="advgb-unit-wrapper" key="unit">
                                            {[ 'px', 'em', 'vh', '%' ].map( ( unit, uIdx ) => (
                                                <span
                                                    className={`advgb-unit ${titleMarginUnit === unit ? 'selected' : ''}`}
                                                    key={uIdx}
                                                    onClick={() => setAttributes( { titleMarginUnit: unit } )}
                                                >
                                                    {unit}
                                                </span>
                                            ) )}
                                        </div>
                                    </div>
                                    <RangeControl
                                        beforeIcon="arrow-up-alt2"
                                        value={titleMarginTop}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { titleMarginTop: value } )}
                                    />
                                    <RangeControl
                                        beforeIcon="arrow-down-alt2"
                                        value={titleMarginBottom}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { titleMarginBottom: value } )}
                                    />
                                    <RangeControl
                                        beforeIcon="arrow-left-alt2"
                                        value={titleMarginLeft}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { titleMarginLeft: value } )}
                                    />
                                    <RangeControl
                                        beforeIcon="arrow-right-alt2"
                                        value={titleMarginRight}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { titleMarginRight: value } )}
                                    />
                                </PanelBody>
                            </PanelBody>
                            <PanelBody
                                title={ __( 'Text Settings', 'advanced-gutenberg' ) }
                                initialOpen={false}
                            >
                                <AdvColorControl
                                    label={ __( 'Color', 'advanced-gutenberg' ) }
                                    value={ textColor }
                                    onChange={ (value) => setAttributes( {textColor: value} ) }
                                />
                                <div className="advgb-controls-title">
                                    <div className="advgb-unit-wrapper advgb-unit-2" key="unit">
                                        {[ 'px', 'em' ].map( ( unit, uIdx ) => (
                                            <span
                                                className={`advgb-unit ${textSizeUnit === unit ? 'selected' : ''}`}
                                                key={uIdx}
                                                onClick={() => setAttributes( { textSizeUnit: unit } )}
                                            >
                                                    {unit}
                                                </span>
                                        ) )}
                                    </div>
                                </div>
                                <RangeControl
                                    label={ __( 'Font Size', 'advanced-gutenberg' ) }
                                    value={textSize}
                                    min={ textSizeUnit === 'px' ? 1 : 0.2 }
                                    max={ textSizeUnit === 'px' ? 200 : 12.0 }
                                    step={ textSizeUnit === 'px' ? 1 : 0.1 }
                                    onChange={( value ) => setAttributes( { textSize: value } )}
                                />
                                <div className="advgb-controls-title">
                                    <div className="advgb-unit-wrapper advgb-unit-2" key="unit">
                                        {[ 'px', 'em' ].map( ( unit, uIdx ) => (
                                            <span
                                                className={`advgb-unit ${textLineHeightUnit === unit ? 'selected' : ''}`}
                                                key={uIdx}
                                                onClick={() => setAttributes( { textLineHeightUnit: unit } )}
                                            >
                                                    {unit}
                                                </span>
                                        ) )}
                                    </div>
                                </div>
                                <RangeControl
                                    label={ __( 'Line Height', 'advanced-gutenberg' ) }
                                    value={textLineHeight}
                                    min={ textLineHeightUnit === 'px' ? 1 : 0.2 }
                                    max={ textLineHeightUnit === 'px' ? 200 : 12.0 }
                                    step={ textLineHeightUnit === 'px' ? 1 : 0.1 }
                                    onChange={( value ) => setAttributes( { textLineHeight: value } )}
                                />
                                <PanelBody
                                    title={__( ' Padding', 'advanced-gutenberg' )}
                                    initialOpen={false}
                                >
                                    <div className="advgb-controls-title">
                                        <span>{__( 'Unit', 'advanced-gutenberg' )}</span>
                                        <div className="advgb-unit-wrapper" key="unit">
                                            {[ 'px', 'em', 'vh', '%' ].map( ( unit, uIdx ) => (
                                                <span
                                                    className={`advgb-unit ${textPaddingUnit === unit ? 'selected' : ''}`}
                                                    key={uIdx}
                                                    onClick={() => setAttributes( { textPaddingUnit: unit } )}
                                                >
                                                    {unit}
                                                </span>
                                            ) )}
                                        </div>
                                    </div>
                                    <RangeControl
                                        beforeIcon="arrow-up-alt2"
                                        value={textPaddingTop}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { textPaddingTop: value } )}
                                    />
                                    <RangeControl
                                        beforeIcon="arrow-down-alt2"
                                        value={textPaddingBottom}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { textPaddingBottom: value } )}
                                    />
                                    <RangeControl
                                        beforeIcon="arrow-left-alt2"
                                        value={textPaddingLeft}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { textPaddingLeft: value } )}
                                    />
                                    <RangeControl
                                        beforeIcon="arrow-right-alt2"
                                        value={textPaddingRight}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { textPaddingRight: value } )}
                                    />
                                </PanelBody>
                                <PanelBody
                                    title={__( ' Margin', 'advanced-gutenberg' )}
                                    initialOpen={false}
                                >
                                    <div className="advgb-controls-title">
                                        <span>{__( 'Unit', 'advanced-gutenberg' )}</span>
                                        <div className="advgb-unit-wrapper" key="unit">
                                            {[ 'px', 'em', 'vh', '%' ].map( ( unit, uIdx ) => (
                                                <span
                                                    className={`advgb-unit ${textMarginUnit === unit ? 'selected' : ''}`}
                                                    key={uIdx}
                                                    onClick={() => setAttributes( { textMarginUnit: unit } )}
                                                >
                                                    {unit}
                                                </span>
                                            ) )}
                                        </div>
                                    </div>
                                    <RangeControl
                                        beforeIcon="arrow-up-alt2"
                                        value={textMarginTop}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { textMarginTop: value } )}
                                    />
                                    <RangeControl
                                        beforeIcon="arrow-down-alt2"
                                        value={textMarginBottom}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { textMarginBottom: value } )}
                                    />
                                    <RangeControl
                                        beforeIcon="arrow-left-alt2"
                                        value={textMarginLeft}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { textMarginLeft: value } )}
                                    />
                                    <RangeControl
                                        beforeIcon="arrow-right-alt2"
                                        value={textMarginRight}
                                        min={0}
                                        max={100}
                                        onChange={( value ) => setAttributes( { textMarginRight: value } )}
                                    />
                                </PanelBody>
                            </PanelBody>
                        </InspectorControls>
                        <div className={blockWrapClass}
                             style={ {
                                 backgroundColor: containerBackground,
                                 padding: containerPadding,
                                 border: `${containerBorderWidth}px solid ${containerBorderBackground}`,
                                 borderRadius: `${containerBorderRadius}px`,
                             } }
                             id={blockIDX}
                        >
                            <div className={ blockClass }>
                                <div
                                    className="advgb-infobox-icon-container"
                                    style={ {
                                        backgroundColor: iconBackground,
                                        padding: iconPadding,
                                        margin: iconMargin,
                                        border: `${iconBorderWidth}px solid ${iconBorderBackground}`,
                                        borderRadius: `${iconBorderRadius}px`,
                                    } }
                                >
                                    <div className="advgb-infobox-icon-inner-container">
                                        <i className={iconClass} style={ {color: iconColor, fontSize: iconSize, display: 'block'} }>{icon}</i>
                                    </div>
                                </div>
                                <div className="advgb-infobox-textcontent">
                                    <RichText
                                        tagName={titleHtmlTag}
                                        className="advgb-infobox-title"
                                        onChange={ (value) => setAttributes({ title: value}) }
                                        value={ title }
                                        style={ {
                                            color: titleColor,
                                            fontSize: titleSize+titleSizeUnit,
                                            lineHeight: titleLineHeight+titleLineHeightUnit,
                                            padding: titlePadding,
                                            margin: titleMargin,
                                            whiteSpace: 'pre-wrap'
                                        } }
                                    />
                                    <RichText
                                        tagName="p"
                                        className="advgb-infobox-text"
                                        onChange={ (value) => setAttributes({ text: value}) }
                                        value={ text }
                                        style={ {
                                            color: textColor,
                                            fontSize: textSize+textSizeUnit,
                                            lineHeight: textLineHeight+textLineHeightUnit,
                                            padding: textPadding,
                                            margin: textMargin,
                                            whiteSpace: 'pre-wrap'
                                        } }
                                    />
                                </div>
                            </div>
                            {showPopup ?
                                <IconListPopup
                                    closePopup={ () => {
                                        if(showPopup) {
                                            this.togglePopup();
                                        }
                                    }
                                    }
                                    onSelectIcon={ this.handleIcon }
                                    onSelectIconTheme={ this.handleIconTheme }
                                    selectedIcon={icon}
                                    selectedIconTheme={iconTheme}
                                />
                                : null
                            }
                        </div>
                    </Fragment>
            );
        }
    }

    const blockAttrs = {
        blockIDX: {
            type: 'string',
        },
        align: {
            type: 'string',
            default: 'center'
        },
        containerBorderWidth: {
            type: 'number',
            default: 0
        },
        containerBorderRadius: {
            type: 'number',
            default: 0
        },
        containerPaddingTop: {
            type: 'number',
            default: 20
        },
        containerPaddingBottom: {
            type: 'number',
            default: 20
        },
        containerPaddingLeft: {
            type: 'number',
            default: 20
        },
        containerPaddingRight: {
            type: 'number',
            default: 20
        },
        containerPaddingUnit: {
            type: 'string',
            default: 'px',
        },
        containerBackground: {
            type: 'string',
            default: '#f5f5f5'
        },
        containerBorderBackground: {
            type: 'string',
            default: '#e8e8e8'
        },
        iconBorderWidth: {
            type: 'number',
            default: 0
        },
        iconBorderRadius: {
            type: 'number',
            default: 0
        },
        iconPaddingTop: {
            type: 'number',
            default: 0
        },
        iconPaddingBottom: {
            type: 'number',
            default: 0
        },
        iconPaddingLeft: {
            type: 'number',
            default: 0
        },
        iconPaddingRight: {
            type: 'number',
            default: 0
        },
        iconMarginTop: {
            type: 'number',
            default: 0
        },
        iconMarginBottom: {
            type: 'number',
            default: 0
        },
        iconMarginLeft: {
            type: 'number',
            default: 0
        },
        iconMarginRight: {
            type: 'number',
            default: 0
        },
        iconPaddingUnit: {
            type: 'string',
            default: 'px',
        },
        iconMarginUnit: {
            type: 'string',
            default: 'px',
        },
        iconBackground: {
            type: 'string',
            default: '#f5f5f5'
        },
        iconBorderBackground: {
            type: 'string',
            default: '#e8e8e8'
        },
        icon: {
            type: 'string',
            default: 'beenhere'
        },
        iconSize: {
            type: 'number',
            default: 70
        },
        iconColor: {
            type: 'string',
            default: '#333'
        },
        iconTheme: {
            type: 'string',
            default: 'outlined'
        },
        title: {
            type: 'string',
            default: 'Title',
        },
        titleColor: {
            type: 'string',
            default: '#333'
        },
        titleSize: {
            type: 'number'
        },
        titleSizeUnit: {
            type: 'string',
            default: 'px'
        },
        titleLineHeight: {
            type: 'number'
        },
        titleLineHeightUnit: {
            type: 'string',
            default: 'px'
        },
        titleHtmlTag: {
            type: 'string',
            default: 'h3'
        },
        titlePaddingTop: {
            type: 'number',
            default: 0
        },
        titlePaddingBottom: {
            type: 'number',
            default: 0
        },
        titlePaddingLeft: {
            type: 'number',
            default: 0
        },
        titlePaddingRight: {
            type: 'number',
            default: 0
        },
        titleMarginTop: {
            type: 'number',
            default: 5
        },
        titleMarginBottom: {
            type: 'number',
            default: 10
        },
        titleMarginLeft: {
            type: 'number',
            default: 0
        },
        titleMarginRight: {
            type: 'number',
            default: 0
        },
        titlePaddingUnit: {
            type: 'string',
            default: 'px',
        },
        titleMarginUnit: {
            type: 'string',
            default: 'px',
        },
        text: {
            type: 'string',
            default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean diam dolor, accumsan sed rutrum vel, dapibus et leo.',
        },
        textColor: {
            type: 'string',
            default: '#333'
        },
        textSize: {
            type: 'number'
        },
        textSizeUnit: {
            type: 'string',
            default: 'px'
        },
        textLineHeight: {
            type: 'number'
        },
        textLineHeightUnit: {
            type: 'string',
            default: 'px'
        },
        textPaddingTop: {
            type: 'number',
            default: 0
        },
        textPaddingBottom: {
            type: 'number',
            default: 0
        },
        textPaddingLeft: {
            type: 'number',
            default: 0
        },
        textPaddingRight: {
            type: 'number',
            default: 0
        },
        textMarginTop: {
            type: 'number',
            default: 0
        },
        textMarginBottom: {
            type: 'number',
            default: 0
        },
        textMarginLeft: {
            type: 'number',
            default: 0
        },
        textMarginRight: {
            type: 'number',
            default: 0
        },
        textPaddingUnit: {
            type: 'string',
            default: 'px',
        },
        textMarginUnit: {
            type: 'string',
            default: 'px',
        },
        changed: {
            type: 'boolean',
            default: false,
        },
        isPreview: {
            type: 'boolean',
            default: false,
        }
    };

    registerBlockType( 'advgb/infobox', {
        title: __( 'Info Box', 'advanced-gutenberg' ),
        description: __( 'Advanced icon block with more options and styles.', 'advanced-gutenberg' ),
        icon: {
            src: blockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined,
        },
        category: 'advgb-category',
        keywords: [ __( 'info', 'advanced-gutenberg' ), __( 'icon', 'advanced-gutenberg') , __( 'box', 'advanced-gutenberg' ) ],
        attributes: blockAttrs,
        example: {
            attributes: {
                isPreview: true
            },
        },
        edit: InfoBoxEdit,
        save: ( { attributes } ) => {
            const {
                blockIDX,
                title,
                titleHtmlTag,
                text,
                icon,
                iconTheme,
                align,
            } = attributes;

            const blockWrapClass = [
                'wp-block-advgb-infobox',
                'advgb-infobox-wrapper',
                `has-text-align-${align}`,
            ].filter( Boolean ).join( ' ' );

            const blockClass = [
                'advgb-infobox-wrap',
            ].filter( Boolean ).join( ' ' );

            const iconClass = [
                'material-icons',
                iconTheme !== '' && `-${iconTheme}`
            ].filter( Boolean ).join('');

            return (
                <Fragment>
                    <div className={blockWrapClass} id={blockIDX}>
                        <div className={ blockClass }>
                            <div className="advgb-infobox-icon-container">
                                <div className="advgb-infobox-icon-inner-container">
                                    <i className={iconClass}>{icon}</i>
                                </div>
                            </div>
                            <div className="advgb-infobox-textcontent">
                                <RichText.Content
                                    tagName={titleHtmlTag}
                                    className="advgb-infobox-title"
                                    value={ title }
                                />
                                <RichText.Content
                                    tagName="p"
                                    className="advgb-infobox-text"
                                    value={ text }
                                />
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        }
    });
}) ( wp.i18n, wp.blocks, wp.element, wp.blockEditor, wp.components );