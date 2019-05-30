(function ( wpI18n, wpBlocks, wpElement, wpEditor, wpComponents ) {
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InspectorControls, PanelColorSettings, InnerBlocks } = wpEditor;
    const { PanelBody, RangeControl, SelectControl, ToggleControl, Tooltip } = wpComponents;
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


    class AdvColumnsEdit extends Component {
        constructor() {
            super( ...arguments );
            this.state = {
                tabSelected: 'desktop',
            }
        }

        render() {
            const { attributes, setAttributes } = this.props;
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
                contentMaxWidth,
                contentMinHeight,
                wrapperTag,
            } = attributes;

            const blockClasses = [
                'advgb-columns',
                columns && `advgb-columns-${columns}`,
                columnsLayout && `layout-${columnsLayout}`,
                columnsLayoutT && `tbl-layout-${columnsLayoutT}`,
                columnsLayoutM && `mbl-layout-${columnsLayoutM}`,
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

            let deviceLetter = '';
            if (tabSelected === 'tablet') deviceLetter = 'T';
            if (tabSelected === 'mobile') deviceLetter = 'M';

            return (
                <Fragment>
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
                                    <RangeControl
                                        label={ __( 'Columns Gutter' ) }
                                        value={ gutter }
                                        min={ 0 }
                                        max={ 100 }
                                        onChange={ ( value ) => setAttributes( { gutter: value } ) }
                                    />
                                ) }
                                {tabSelected === 'mobile' && columnsLayoutM === 'stacked' && (
                                    <Fragment>
                                        <RangeControl
                                            label={ __( 'Columns Vertical Gutter' ) }
                                            value={ collapsedGutter }
                                            min={ 0 }
                                            max={ 100 }
                                            onChange={ ( value ) => setAttributes( { collapsedGutter: value } ) }
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
                            </PanelBody>
                        </PanelBody>
                    </InspectorControls>
                    <div className="advgb-columns-wrapper">
                        <div className={ blockClasses }>
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
        vAlign: {
            type: 'string',
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
        contentMaxWidth: {
            type: 'number',
        },
        contentMinHeight: {
            type: 'number',
        },
        wrapperTag: {
            type: 'string',
            default: 'div',
        },
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
            return null;
        },
    } );
})( wp.i18n, wp.blocks, wp.element, wp.editor, wp.components );