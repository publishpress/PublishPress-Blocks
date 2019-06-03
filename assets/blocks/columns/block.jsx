(function ( wpI18n, wpBlocks, wpElement, wpEditor, wpComponents ) {
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InspectorControls, BlockControls, PanelColorSettings, InnerBlocks } = wpEditor;
    const { PanelBody, RangeControl, SelectControl, ToggleControl, Tooltip, Toolbar } = wpComponents;
    const { times } = lodash;

    const columnsBlockIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    );

    const COLUMNS_LAYOUTS = [
        { columns: 1, layout: '100', icon: '100', title: __( 'One' ) },
        { columns: 2, layout: '50-50', icon: '50-50', title: __( 'Two: 50-50' ) },
        { columns: 2, layout: '66-33', icon: '66-33', title: __( 'Two: 66-33' ) },
        { columns: 2, layout: '33-66', icon: '33-66', title: __( 'Two: 33-66' ) },
        { columns: 3, layout: '33-33-33', icon: '33-33-33', title: __( 'Three: 33-33-33' ) },
        { columns: 3, layout: '50-25-25', icon: '50-25-25', title: __( 'Three: 50-25-25' ) },
        { columns: 3, layout: '25-25-50', icon: '25-25-50', title: __( 'Three: 25-25-50' ) },
        { columns: 3, layout: '25-50-25', icon: '25-50-25', title: __( 'Three: 25-50-25' ) },
        { columns: 3, layout: '20-60-20', icon: '20-60-20', title: __( 'Three: 20-60-20' ) },
        { columns: 3, layout: '15-70-15', icon: '15-70-15', title: __( 'Three: 15-70-15' ) },
        { columns: 4, layout: '25-25-25-25', icon: '25-25-25-25', title: __( 'Four: 25-25-25-25' ) },
        { columns: 4, layout: '40-20-20-20', icon: '40-20-20-20', title: __( 'Four: 40-20-20-20' ) },
        { columns: 4, layout: '20-20-20-40', icon: '20-20-20-40', title: __( 'Four: 20-20-20-40' ) },
        { columns: 5, layout: 'five', icon: 'five', title: __( 'Five' ) },
        { columns: 6, layout: 'six', icon: 'six', title: __( 'Six' ) },
    ];
    const COLUMNS_LAYOUTS_RESPONSIVE = [
        { columns: 3, layout: '100-50-50', icon: '100-50-50', title: __( 'Three: 100-50-50' ) },
        { columns: 3, layout: '50-50-100', icon: '50-50-100', title: __( 'Three: 50-50-100' ) },
        { columns: 4, layout: '50-50-50-50', icon: '50-50-50-50', title: __( 'Four: 50-50-50-50' ) },
        { columns: 6, layout: '2x50', icon: '2x50', title: __( 'Six: Two Columns' ) },
        { columns: 6, layout: '3x33', icon: '3x33', title: __( 'Six: Three Columns' ) },
    ];
    const COLUMNS_LAYOUTS_STACKED = {
        columns: 1, layout: 'stacked', icon: 'Stacked', title: __( 'Stacked' )
    };
    const GUTTER_OPTIONS = [
        {label: __( 'No Gutter' ), value: 0},
        {label: '10px', value: 10},
        {label: '20px', value: 20},
        {label: '30px', value: 30},
        {label: '40px', value: 40},
        {label: '50px', value: 50},
        {label: '70px', value: 70},
        {label: '90px', value: 90},
    ];

    class AdvColumnsEdit extends Component {
        constructor() {
            super( ...arguments );
            this.state = {
                tabSelected: 'desktop',
            }
        }

        componentWillMount() {
            const { attributes, setAttributes } = this.props;
            const currentBlockConfig = advgbDefaultConfig['advgb-columns'];

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

            if ( !attributes.id ) {
                setAttributes( { colId: 'advgb-cols-' + clientId, } )
            }
        }

        render() {
            const { attributes, setAttributes, clientId } = this.props;
            const { tabSelected } = this.state;
            const {
                columns,
                columnsLayout, columnsLayoutT, columnsLayoutM,
                marginTop, marginRight, marginBottom, marginLeft,
                marginTopT, marginRightT, marginBottomT, marginLeftT,
                marginTopM, marginRightM, marginBottomM, marginLeftM,
                paddingTop, paddingRight, paddingBottom, paddingLeft,
                paddingTopT, paddingRightT, paddingBottomT, paddingLeftT,
                paddingTopM, paddingRightM, paddingBottomM, paddingLeftM,
                vAlign,
                gutter,
                collapsedGutter,
                collapsedRtl,
                columnsWrapped,
                contentMaxWidth,
                contentMaxWidthUnit,
                contentMinHeight,
                contentMinHeightUnit,
                wrapperTag,
            } = attributes;

            const blockClasses = [
                'advgb-columns',
                vAlign && `columns-valign-${vAlign}`,
                columns && `advgb-columns-${columns}`,
                columnsLayout && `layout-${columnsLayout}`,
                columnsLayoutT && `tbl-layout-${columnsLayoutT}`,
                columnsLayoutM && `mbl-layout-${columnsLayoutM}`,
                !!gutter && `gutter-${gutter}`,
                !!collapsedGutter && `vgutter-${collapsedGutter}`,
                collapsedRtl && 'order-rtl',
                columnsWrapped && 'columns-wrapped',
            ].filter( Boolean ).join( ' ' );

            if (!columns) {
                return (
                    <div className="advgb-columns-select-wrapper">
                        <div className="advgb-columns-select-title">
                            { __( 'CHOOSE LAYOUT' ) }
                        </div>
                        <div className="advgb-columns-select-layout">
                            {COLUMNS_LAYOUTS.map( (layout, index) => {
                                return (
                                    <Tooltip text={ layout.title }>
                                        <div key={ index }
                                             className="advgb-columns-layout"
                                             onClick={ () => setAttributes( {
                                                 columns: layout.columns,
                                                 columnsLayout: layout.layout
                                             } ) }
                                        >
                                            { layout.icon }
                                        </div>
                                    </Tooltip>
                                )
                            } ) }
                        </div>
                    </div>
                )
            }

            const COLUMNS_LAYOUTS_FILTERED = COLUMNS_LAYOUTS.filter( (item) => item.columns === columns );
            const COLUMNS_LAYOUTS_RESPONSIVE_FILTERED = COLUMNS_LAYOUTS_RESPONSIVE.filter( (item) => item.columns === columns );
            COLUMNS_LAYOUTS_RESPONSIVE_FILTERED.push( COLUMNS_LAYOUTS_STACKED );
            const VERT_ALIGNMENT_CONTROLS = [
                {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                    ),
                    title: __( 'Vertical Align Top' ),
                    isActive: vAlign === 'top',
                    onClick: () => setAttributes( { vAlign: 'top' } )
                },
                {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path d="M8 19h3v4h2v-4h3l-4-4-4 4zm8-14h-3V1h-2v4H8l4 4 4-4zM4 11v2h16v-2H4z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                    ),
                    title: __( 'Vertical Align Middle' ),
                    isActive: vAlign === 'middle',
                    onClick: () => setAttributes( { vAlign: 'middle' } )
                },
                {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path d="M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                    ),
                    title: __( 'Vertical Align Bottom' ),
                    isActive: vAlign === 'bottom',
                    onClick: () => setAttributes( { vAlign: 'bottom' } )
                },
            ];

            let deviceLetter = '';
            if (tabSelected === 'tablet') deviceLetter = 'T';
            if (tabSelected === 'mobile') deviceLetter = 'M';

            return (
                <Fragment>
                    <BlockControls>
                        <Toolbar controls={ VERT_ALIGNMENT_CONTROLS } />
                    </BlockControls>
                    <InspectorControls>
                        <PanelBody title={ __( 'Columns Settings' ) }>
                            <PanelBody title={ __( 'Responsive Settings' ) }>
                                <div className="advgb-columns-responsive-items">
                                    {['desktop', 'tablet', 'mobile'].map( (device, index) => {
                                        const itemClasses = [
                                            "advgb-columns-responsive-item",
                                            tabSelected === device && 'is-selected',
                                        ].filter( Boolean ).join( ' ' );

                                        return (
                                            <div className={ itemClasses }
                                                 key={ index }
                                                 onClick={ () => this.setState( { tabSelected: device } ) }
                                            >
                                                {device}
                                            </div>
                                        )
                                    } ) }
                                </div>
                                <div className="advgb-columns-select-layout on-inspector">
                                    {COLUMNS_LAYOUTS_FILTERED.map( (layout, index) => {
                                        const layoutClasses = [
                                            'advgb-columns-layout',
                                            tabSelected === 'desktop' && layout.layout === columnsLayout && 'is-selected',
                                            tabSelected === 'tablet' && layout.layout === columnsLayoutT && 'is-selected',
                                            tabSelected === 'mobile' && layout.layout === columnsLayoutM && 'is-selected',
                                        ].filter( Boolean ).join( ' ' );

                                        return (
                                            <Tooltip text={ layout.title } key={ index }>
                                                <div className={ layoutClasses }
                                                     onClick={ () => setAttributes( {
                                                         ['columnsLayout' + deviceLetter]: layout.layout
                                                     } ) }
                                                >
                                                    { layout.icon }
                                                </div>
                                            </Tooltip>
                                        )
                                    } ) }
                                    {tabSelected !== 'desktop' && COLUMNS_LAYOUTS_RESPONSIVE_FILTERED.map( (layout, index) => {
                                        const layoutClasses = [
                                            'advgb-columns-layout',
                                            tabSelected === 'tablet' && layout.layout === columnsLayoutT && 'is-selected',
                                            tabSelected === 'mobile' && layout.layout === columnsLayoutM && 'is-selected',
                                        ].filter( Boolean ).join( ' ' );

                                        return (
                                            <Tooltip text={ layout.title } key={ index }>
                                                <div className={ layoutClasses }
                                                     onClick={ () => setAttributes( {
                                                         ['columnsLayout' + deviceLetter]: layout.layout
                                                     } ) }
                                                >
                                                    { layout.icon }
                                                </div>
                                            </Tooltip>
                                        )
                                    } ) }
                                </div>
                                {tabSelected === 'desktop' && (
                                    <SelectControl
                                        label={ __( 'Columns Gutter' ) }
                                        value={ gutter }
                                        options={ GUTTER_OPTIONS }
                                        onChange={ (value) => setAttributes( { gutter: parseInt(value) } ) }
                                    />
                                ) }
                                {tabSelected === 'mobile' && columnsLayoutM === 'stacked' && (
                                    <Fragment>
                                        <SelectControl
                                            label={ __( 'Collapsed Vertical Gutter' ) }
                                            value={ collapsedGutter }
                                            options={ GUTTER_OPTIONS }
                                            onChange={ (value) => setAttributes( { collapsedGutter: parseInt(value) } ) }
                                        />
                                        <ToggleControl
                                            label={ __( 'Collapsed Order RTL' ) }
                                            checked={ collapsedRtl }
                                            onChange={ () => setAttributes( { collapsedRtl: !collapsedRtl } ) }
                                        />
                                    </Fragment>
                                ) }
                            </PanelBody>
                            <PanelBody title={ __( 'Row Settings' ) } initialOpen={ false }>
                                <ToggleControl
                                    label={ __( 'Columns Wrapped' ) }
                                    help={ __( 'If your columns is overflown, it will be separated to a new line (eg: Use this with Columns Gutter).' ) }
                                    checked={ columnsWrapped }
                                    onChange={ () => setAttributes( { columnsWrapped: !columnsWrapped } ) }
                                />
                                <SelectControl
                                    label={ __( 'Wrapper Tag' ) }
                                    value={ wrapperTag }
                                    options={ [
                                        { label: 'Div', value: 'div' },
                                        { label: 'Header', value: 'header' },
                                        { label: 'Section', value: 'section' },
                                        { label: 'Main', value: 'main' },
                                        { label: 'Article', value: 'article' },
                                        { label: 'Aside', value: 'aside' },
                                        { label: 'Footer', value: 'footer' },
                                    ] }
                                    onChange={ (value) => setAttributes( { wrapperTag: value } ) }
                                />
                                <RangeControl
                                    label={ [
                                        __( 'Content Max Width' ),
                                        <div className="advgb-unit-wrapper" key="unit">
                                            { ['px', 'vw', '%'].map( (unit) => (
                                                <span className={`advgb-unit ${contentMaxWidthUnit === unit ? 'selected' : ''}`}
                                                      onClick={ () => setAttributes( { contentMaxWidthUnit: unit } ) }
                                                >
                                                    {unit}
                                                </span>
                                            ) ) }
                                        </div>
                                    ] }
                                    value={ contentMaxWidth }
                                    min={ 0 }
                                    max={ contentMaxWidthUnit === 'px' ? 2000 : 100 }
                                    onChange={ (value) => setAttributes( { contentMaxWidth: value } ) }
                                />
                                <RangeControl
                                    label={ [
                                        __( 'Content Min Height' ),
                                        <div className="advgb-unit-wrapper" key="unit">
                                            { ['px', 'vw', 'vh'].map( (unit) => (
                                                <span className={`advgb-unit ${contentMinHeightUnit === unit ? 'selected' : ''}`}
                                                      onClick={ () => setAttributes( { contentMinHeightUnit: unit } ) }
                                                >
                                                    {unit}
                                                </span>
                                            ) ) }
                                        </div>
                                    ] }
                                    value={ contentMinHeight }
                                    min={ 0 }
                                    max={ contentMinHeightUnit === 'px' ? 2000 : 200 }
                                    onChange={ (value) => setAttributes( { contentMinHeight: value } ) }
                                />
                            </PanelBody>
                        </PanelBody>
                    </InspectorControls>
                    <div className="advgb-columns-wrapper">
                        <div className={ blockClasses }
                             style={ {
                                 maxWidth: !!contentMaxWidth ? `${contentMaxWidth}${contentMaxWidthUnit}` : undefined,
                                 minHeight: !!contentMinHeight ? `${contentMinHeight}${contentMinHeightUnit}` : undefined,
                             } }
                        >
                            <InnerBlocks
                                template={ times( parseInt(columns), () => [ 'advgb/column' ] ) }
                                templateLock="all"
                                allowdBlockType={ [ 'advgb/column' ] }
                            />
                        </div>
                    </div>
                </Fragment>
            )
        }
    }

    const blockAttrs = {
        columns: {
            type: 'number',
        },
        columnsLayout: {
            type: 'string',
        },
        columnsLayoutT: {
            type: 'string',
        },
        columnsLayoutM: {
            type: 'string',
            default: 'stacked',
        },
        marginTop: {
            type: 'number',
        },
        marginTopT: {
            type: 'number',
        },
        marginTopM: {
            type: 'number',
        },
        marginRight: {
            type: 'number',
        },
        marginRightT: {
            type: 'number',
        },
        marginRightM: {
            type: 'number',
        },
        marginBottom: {
            type: 'number',
        },
        marginBottomT: {
            type: 'number',
        },
        marginBottomM: {
            type: 'number',
        },
        marginLeft: {
            type: 'number',
        },
        marginLeftT: {
            type: 'number',
        },
        marginLeftM: {
            type: 'number',
        },
        paddingTop: {
            type: 'number',
        },
        paddingTopT: {
            type: 'number',
        },
        paddingTopM: {
            type: 'number',
        },
        paddingRight: {
            type: 'number',
        },
        paddingRightT: {
            type: 'number',
        },
        paddingRightM: {
            type: 'number',
        },
        paddingBottom: {
            type: 'number',
        },
        paddingBottomT: {
            type: 'number',
        },
        paddingBottomM: {
            type: 'number',
        },
        paddingLeft: {
            type: 'number',
        },
        paddingLeftT: {
            type: 'number',
        },
        paddingLeftM: {
            type: 'number',
        },
        gutter: {
            type: 'number',
            default: 10,
        },
        collapsedGutter: {
            type: 'number',
            default: 10,
        },
        collapsedRtl: {
            type: 'boolean',
            default: false,
        },
        vAlign: {
            type: 'string',
        },
        columnsWrapped: {
            type: 'boolean',
            default: false,
        },
        contentMaxWidth: {
            type: 'number',
        },
        contentMaxWidthUnit: {
            type: 'string',
            default: 'px',
        },
        contentMinHeight: {
            type: 'number',
        },
        contentMinHeightUnit: {
            type: 'string',
            default: 'px',
        },
        wrapperTag: {
            type: 'string',
            default: 'div',
        },
        colId: {
            type: 'string',
        },
        changed: {
            type: 'boolean',
            default: false,
        }
    };

    registerBlockType( 'advgb/columns', {
        title: __( 'Columns Manager' ),
        description: __( 'Row layout with columns you decided.' ),
        icon: {
            src: columnsBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined,
        },
        category: 'advgb-category',
        keywords: [ __( 'columns' ), __( 'row' ), __( 'layout' ) ],
        supports: {
            align: [ 'wide', 'full' ],
            html: false,
        },
        attributes: blockAttrs,
        edit: AdvColumnsEdit,
        save: function ( props ) {
            const { attributes, setAttributes, clientId } = props;
            const {
                columns,
                columnsLayout, columnsLayoutT, columnsLayoutM,
                marginTop, marginRight, marginBottom, marginLeft,
                marginTopT, marginRightT, marginBottomT, marginLeftT,
                marginTopM, marginRightM, marginBottomM, marginLeftM,
                paddingTop, paddingRight, paddingBottom, paddingLeft,
                paddingTopT, paddingRightT, paddingBottomT, paddingLeftT,
                paddingTopM, paddingRightM, paddingBottomM, paddingLeftM,
                vAlign,
                gutter,
                collapsedGutter,
                collapsedRtl,
                columnsWrapped,
                contentMaxWidth,
                contentMaxWidthUnit,
                contentMinHeight,
                contentMinHeightUnit,
                wrapperTag,
                colId,
            } = attributes;
            const Tag = wrapperTag;

            const blockClasses = [
                'advgb-columns',
                'columns',
                vAlign && `columns-valign-${vAlign}`,
                columns && `advgb-columns-${columns}`,
                columnsLayout && `layout-${columnsLayout}`,
                columnsLayoutT && `tbl-layout-${columnsLayoutT}`,
                columnsLayoutM && `mbl-layout-${columnsLayoutM}`,
                !!gutter && `gutter-${gutter}`,
                !!collapsedGutter && `vgutter-${collapsedGutter}`,
                collapsedRtl && 'order-rtl',
                columnsWrapped && 'columns-wrapped',
            ].filter( Boolean ).join( ' ' );

            return (
                <Tag className="advgb-columns-wrapper">
                    <div className={ blockClasses } id={ colId }
                         style={ {
                             maxWidth: !!contentMaxWidth ? `${contentMaxWidth}${contentMaxWidthUnit}` : undefined,
                             minHeight: !!contentMinHeight ? `${contentMinHeight}${contentMinHeightUnit}` : undefined,
                         } }
                    >
                        <InnerBlocks.Content />
                    </div>
                </Tag>
            );
        },
    } );
})( wp.i18n, wp.blocks, wp.element, wp.editor, wp.components );