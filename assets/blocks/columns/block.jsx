(function ( wpI18n, wpBlocks, wpElement, wpEditor, wpComponents ) {
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InspectorControls, BlockControls, PanelColorSettings, InnerBlocks } = wpEditor;
    const { PanelBody, RangeControl, SelectControl, ToggleControl, Tooltip, Toolbar } = wpComponents;
    const { times } = lodash;
    const { dispatch, select } = wp.data;

    const columnsBlockIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    );

    const COLUMNS_LAYOUTS = [
        { columns: 1, layout: '100', icon: '100', title: __( 'One' ) },
        { columns: 2, layout: '12-12', icon: '12-12', title: __( 'Two: 1/2 - 1/2' ) },
        { columns: 2, layout: '23-13', icon: '23-13', title: __( 'Two: 2/3 - 1/3' ) },
        { columns: 2, layout: '13-23', icon: '13-23', title: __( 'Two: 1/3 - 2/3' ) },
        { columns: 2, layout: '14-34', icon: '14-34', title: __( 'Two: 1/4 - 3/4' ) },
        { columns: 2, layout: '34-14', icon: '34-14', title: __( 'Two: 3/4 - 1/4' ) },
        { columns: 2, layout: '15-45', icon: '15-45', title: __( 'Two: 1/5 - 4/5' ) },
        { columns: 2, layout: '45-15', icon: '45-15', title: __( 'Two: 4/5 - 1/5' ) },
        { columns: 3, layout: '13-13-13', icon: '13-13-13', title: __( 'Three: 1/3 - 1/3 - 1/3' ) },
        { columns: 3, layout: '12-14-14', icon: '12-14-14', title: __( 'Three: 1/2 - 1/4 - 1/4' ) },
        { columns: 3, layout: '14-14-12', icon: '14-14-12', title: __( 'Three: 1/4 - 1/4 - 1/2' ) },
        { columns: 3, layout: '14-12-14', icon: '14-12-14', title: __( 'Three: 1/4 - 1/2 - 1/4' ) },
        { columns: 3, layout: '15-35-15', icon: '15-35-15', title: __( 'Three: 1/5 - 3/5 - 1/5' ) },
        { columns: 3, layout: '35-15-15', icon: '35-15-15', title: __( 'Three: 3/5 - 1/5 - 1/5' ) },
        { columns: 3, layout: '15-15-35', icon: '15-15-35', title: __( 'Three: 1/5 - 1/5 - 3/5' ) },
        { columns: 3, layout: '16-46-16', icon: '16-46-16', title: __( 'Three: 1/6 - 4/6 - 1/6' ) },
        { columns: 4, layout: '14-14-14-14', icon: '14-14-14-14', title: __( 'Four: 1/4 - 1/4 - 1/4 - 1/4' ) },
        { columns: 4, layout: '36-16-16-16', icon: '36-16-16-16', title: __( 'Four: 3/6 - 1/6 - 1/6 - 1/6' ) },
        { columns: 4, layout: '16-16-16-36', icon: '16-16-16-36', title: __( 'Four: 1/6 - 1/6 - 1/6 - 3/6' ) },
        { columns: 4, layout: '15-15-15-25', icon: '15-15-15-25', title: __( 'Four: 1/5 - 1/5 - 1/5 - 2/5' ) },
        { columns: 4, layout: '25-15-15-15', icon: '25-15-15-15', title: __( 'Four: 2/5 - 1/5 - 1/5 - 1/5' ) },
        { columns: 5, layout: 'five', icon: '15-15-15-15-15', title: __( 'Five' ) },
        { columns: 6, layout: 'six', icon: '16-16-16-16-16-16', title: __( 'Six' ) },
    ];
    const COLUMNS_LAYOUTS_RESPONSIVE = [
        { columns: 3, layout: '1-12-12', icon: '100-12-12', title: __( 'Three: 100 - 1/2 - 1/2' ) },
        { columns: 3, layout: '12-12-1', icon: '12-12-100', title: __( 'Three: 1/2 - 1/2 - 100' ) },
        { columns: 4, layout: '12x4', icon: '12-12-12-12', title: __( 'Four: Two Columns' ) },
        { columns: 6, layout: '12x6', icon: '12-12-12-12', title: __( 'Six: Two Columns' ) },
        { columns: 6, layout: '13x6', icon: '13-13-13-13-13-13', title: __( 'Six: Three Columns' ) },
    ];
    const COLUMNS_LAYOUTS_STACKED = {
        columns: 1, layout: 'stacked', icon: 'stacked', title: __( 'Stacked' )
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

        componentDidUpdate( prevProps ) {
            const {
                columnsLayout: prevLayout,
                columnsLayoutT: prevLayoutT,
                columnsLayoutM: prevLayoutM,
            } = prevProps.attributes;
            const { attributes, clientId } = this.props;
            const { columns, columnsLayout, columnsLayoutT, columnsLayoutM } = attributes;
            const { getBlockOrder } = select( 'core/block-editor' );
            const { updateBlockAttributes } = dispatch( 'core/block-editor' );
            const childBlocks = getBlockOrder(clientId);
            let shouldUpdate = false;
            let classes = times( 6, () => [] );

            const extraClassD = !!columnsLayoutT ? '-desktop' : '-tablet';
            const extraClassT = '-tablet';
            const extraClassM = '-mobile';

            if (prevLayout !== columnsLayout
                || prevLayoutT !== columnsLayoutT
                || prevLayoutM !== columnsLayoutM
            ) {
                shouldUpdate = true;
                switch (columnsLayout) {
                    case '12-12':
                    case '13-13-13':
                    case '14-14-14-14':
                    case 'five':
                    case 'six':
                        for ( let i = 0; i < columns; i++) {
                            classes[i].push('is-default-desktop');
                        }
                        break;
                    case '23-13':
                        classes[0].push('is-two-thirds' + extraClassD);
                        classes[1].push('is-default-desktop');
                        break;
                    case '13-23':
                        classes[0].push('is-default-desktop');
                        classes[1].push('is-two-thirds' + extraClassD);
                        break;
                    case '34-14':
                        classes[0].push('is-three-quarters' + extraClassD);
                        classes[1].push('is-default-desktop');
                        break;
                    case '14-34':
                        classes[0].push('is-default-desktop');
                        classes[1].push('is-three-quarters' + extraClassD);
                        break;
                    case '45-15':
                        classes[0].push('is-four-fifths' + extraClassD);
                        classes[1].push('is-default-desktop');
                        break;
                    case '15-45':
                        classes[0].push('is-default-desktop');
                        classes[1].push('is-four-fifths' + extraClassD);
                        break;
                    case '12-14-14':
                        classes[0].push('is-half' + extraClassD);
                        classes[1].push('is-default-desktop');
                        classes[2].push('is-default-desktop');
                        break;
                    case '14-14-12':
                        classes[0].push('is-default-desktop');
                        classes[1].push('is-default-desktop');
                        classes[2].push('is-half' + extraClassD);
                        break;
                    case '14-12-14':
                        classes[0].push('is-default-desktop');
                        classes[1].push('is-half' + extraClassD);
                        classes[2].push('is-default-desktop');
                        break;
                    case '15-35-15':
                        classes[0].push('is-default-desktop');
                        classes[1].push('is-three-fifths' + extraClassD);
                        classes[2].push('is-default-desktop');
                        break;
                    case '35-15-15':
                        classes[0].push('is-three-fifths' + extraClassD);
                        classes[1].push('is-default-desktop');
                        classes[2].push('is-default-desktop');
                        break;
                    case '15-15-35':
                        classes[0].push('is-default-desktop');
                        classes[1].push('is-default-desktop');
                        classes[2].push('is-three-fifths' + extraClassD);
                        break;
                    case '16-46-16':
                        classes[0].push('is-default-desktop');
                        classes[1].push('is-8' + extraClassD);
                        classes[2].push('is-default-desktop');
                        break;
                    case '36-16-16-16':
                        classes[0].push('is-half' + extraClassD);
                        classes[1].push('is-default-desktop');
                        classes[2].push('is-default-desktop');
                        classes[3].push('is-default-desktop');
                        break;
                    case '16-16-16-36':
                        classes[0].push('is-default-desktop');
                        classes[1].push('is-default-desktop');
                        classes[2].push('is-default-desktop');
                        classes[3].push('is-half' + extraClassD);
                        break;
                    case '25-15-15-15':
                        classes[0].push('is-two-fifths' + extraClassD);
                        classes[1].push('is-default-desktop');
                        classes[2].push('is-default-desktop');
                        classes[3].push('is-default-desktop');
                        break;
                    case '15-15-15-25':
                        classes[0].push('is-default-desktop');
                        classes[1].push('is-default-desktop');
                        classes[2].push('is-default-desktop');
                        classes[3].push('is-two-fifths' + extraClassD);
                        break;
                    default:
                        break;
                }

                switch (columnsLayoutT) {
                    case '12-12':
                    case '13-13-13':
                    case '14-14-14-14':
                    case 'five':
                    case 'six':
                        for ( let i = 0; i < columns; i++) {
                            classes[i].push('is-default-tablet');
                        }
                        break;
                    case '23-13':
                        classes[0].push('is-two-thirds' + extraClassT);
                        classes[1].push('is-default-tablet');
                        break;
                    case '13-23':
                        classes[0].push('is-default-tablet');
                        classes[1].push('is-two-thirds' + extraClassT);
                        break;
                    case '34-14':
                        classes[0].push('is-three-quarters' + extraClassT);
                        classes[1].push('is-default-tablet');
                        break;
                    case '14-34':
                        classes[0].push('is-default-tablet');
                        classes[1].push('is-three-quarters' + extraClassT);
                        break;
                    case '45-15':
                        classes[0].push('is-four-fifths' + extraClassT);
                        classes[1].push('is-default-tablet');
                        break;
                    case '15-45':
                        classes[0].push('is-default-tablet');
                        classes[1].push('is-four-fifths' + extraClassT);
                        break;
                    case '12-14-14':
                        classes[0].push('is-half' + extraClassT);
                        classes[1].push('is-default-tablet');
                        classes[2].push('is-default-tablet');
                        break;
                    case '14-14-12':
                        classes[0].push('is-default-tablet');
                        classes[1].push('is-default-tablet');
                        classes[2].push('is-half' + extraClassT);
                        break;
                    case '14-12-14':
                        classes[0].push('is-default-tablet');
                        classes[1].push('is-half' + extraClassT);
                        classes[2].push('is-default-tablet');
                        break;
                    case '15-35-15':
                        classes[0].push('is-default-tablet');
                        classes[1].push('is-three-fifths' + extraClassT);
                        classes[2].push('is-default-tablet');
                        break;
                    case '35-15-15':
                        classes[0].push('is-three-fifths' + extraClassT);
                        classes[1].push('is-default-tablet');
                        classes[2].push('is-default-tablet');
                        break;
                    case '15-15-35':
                        classes[0].push('is-default-tablet');
                        classes[1].push('is-default-tablet');
                        classes[2].push('is-three-fifths' + extraClassT);
                        break;
                    case '16-46-16':
                        classes[0].push('is-default-desktop');
                        classes[1].push('is-8' + extraClassT);
                        classes[2].push('is-default-desktop');
                        break;
                    case '1-12-12':
                        classes[0].push('is-full' + extraClassT);
                        classes[1].push('is-half' + extraClassT);
                        classes[2].push('is-half' + extraClassT);
                        break;
                    case '12-12-1':
                        classes[0].push('is-half' + extraClassT);
                        classes[1].push('is-half' + extraClassT);
                        classes[2].push('is-full' + extraClassT);
                        break;
                    case '36-16-16-16':
                        classes[0].push('is-half' + extraClassT);
                        classes[1].push('is-default-tablet');
                        classes[2].push('is-default-tablet');
                        classes[3].push('is-default-tablet');
                        break;
                    case '16-16-16-36':
                        classes[0].push('is-default-tablet');
                        classes[1].push('is-default-tablet');
                        classes[2].push('is-default-tablet');
                        classes[3].push('is-half' + extraClassT);
                        break;
                    case '25-15-15-15':
                        classes[0].push('is-two-fifths' + extraClassT);
                        classes[1].push('is-default-tablet');
                        classes[2].push('is-default-tablet');
                        classes[3].push('is-default-tablet');
                        break;
                    case '15-15-15-25':
                        classes[0].push('is-default-tablet');
                        classes[1].push('is-default-tablet');
                        classes[2].push('is-default-tablet');
                        classes[3].push('is-two-fifths' + extraClassT);
                        break;
                    case '12x4':
                        for ( let i = 0; i < columns; i++) {
                            classes[i].push('is-half' + extraClassT);
                        }
                        break;
                    case '12x6':
                        for ( let i = 0; i < columns; i++) {
                            classes[i].push('is-half' + extraClassT);
                        }
                        break;
                    case '13x6':
                        for ( let i = 0; i < columns; i++) {
                            classes[i].push('is-one-third' + extraClassT);
                        }
                        break;
                    case 'stacked':
                        for ( let i = 0; i < columns; i++) {
                            classes[i].push('is-full' + extraClassT);
                        }
                        break;
                    default:
                        break;
                }

                switch (columnsLayoutM) {
                    case '12-12':
                    case '13-13-13':
                    case '14-14-14-14':
                    case 'five':
                    case 'six':
                        for ( let i = 0; i < columns; i++) {
                            classes[i].push('is-default-mobile');
                        }
                        break;
                    case '23-13':
                        classes[0].push('is-two-thirds' + extraClassM);
                        classes[1].push('is-default-mobile');
                        break;
                    case '13-23':
                        classes[0].push('is-default-mobile');
                        classes[1].push('is-two-thirds' + extraClassM);
                        break;
                    case '34-14':
                        classes[0].push('is-three-quarters' + extraClassM);
                        classes[1].push('is-default-mobile');
                        break;
                    case '14-34':
                        classes[0].push('is-default-mobile');
                        classes[1].push('is-three-quarters' + extraClassM);
                        break;
                    case '45-15':
                        classes[0].push('is-four-fifths' + extraClassM);
                        classes[1].push('is-default-mobile');
                        break;
                    case '15-45':
                        classes[0].push('is-default-mobile');
                        classes[1].push('is-four-fifths' + extraClassM);
                        break;
                    case '12-14-14':
                        classes[0].push('is-half' + extraClassM);
                        classes[1].push('is-default-mobile');
                        classes[2].push('is-default-mobile');
                        break;
                    case '14-14-12':
                        classes[0].push('is-default-mobile');
                        classes[1].push('is-default-mobile');
                        classes[2].push('is-half' + extraClassM);
                        break;
                    case '14-12-14':
                        classes[0].push('is-default-mobile');
                        classes[1].push('is-half' + extraClassM);
                        classes[2].push('is-default-mobile');
                        break;
                    case '15-35-15':
                        classes[0].push('is-default-mobile');
                        classes[1].push('is-three-fifths' + extraClassM);
                        classes[2].push('is-default-mobile');
                        break;
                    case '35-15-15':
                        classes[0].push('is-three-fifths' + extraClassM);
                        classes[1].push('is-default-mobile');
                        classes[2].push('is-default-mobile');
                        break;
                    case '15-15-35':
                        classes[0].push('is-default-mobile');
                        classes[1].push('is-default-mobile');
                        classes[2].push('is-three-fifths' + extraClassM);
                        break;
                    case '16-46-16':
                        classes[0].push('is-default-desktop');
                        classes[1].push('is-8' + extraClassM);
                        classes[2].push('is-default-desktop');
                        break;
                    case '1-12-12':
                        classes[0].push('is-full' + extraClassM);
                        classes[1].push('is-half' + extraClassM);
                        classes[2].push('is-half' + extraClassM);
                        break;
                    case '12-12-1':
                        classes[0].push('is-half' + extraClassM);
                        classes[1].push('is-half' + extraClassM);
                        classes[2].push('is-full' + extraClassM);
                        break;
                    case '36-16-16-16':
                        classes[0].push('is-half' + extraClassM);
                        classes[1].push('is-default-mobile');
                        classes[2].push('is-default-mobile');
                        classes[3].push('is-default-mobile');
                        break;
                    case '16-16-16-36':
                        classes[0].push('is-default-mobile');
                        classes[1].push('is-default-mobile');
                        classes[2].push('is-default-mobile');
                        classes[3].push('is-half' + extraClassM);
                        break;
                    case '25-15-15-15':
                        classes[0].push('is-two-fifths' + extraClassM);
                        classes[1].push('is-default-mobile');
                        classes[2].push('is-default-mobile');
                        classes[3].push('is-default-mobile');
                        break;
                    case '15-15-15-25':
                        classes[0].push('is-default-mobile');
                        classes[1].push('is-default-mobile');
                        classes[2].push('is-default-mobile');
                        classes[3].push('is-two-fifths' + extraClassM);
                        break;
                    case '12x4':
                        for ( let i = 0; i < columns; i++) {
                            classes[i].push('is-half' + extraClassM);
                        }
                        break;
                    case '12x6':
                        for ( let i = 0; i < columns; i++) {
                            classes[i].push('is-half' + extraClassM);
                        }
                        break;
                    case '13x6':
                        for ( let i = 0; i < columns; i++) {
                            classes[i].push('is-one-third' + extraClassM);
                        }
                        break;
                    case 'stacked':
                        for ( let i = 0; i < columns; i++) {
                            classes[i].push('is-full' + extraClassM);
                        }
                        break;
                    default:
                        break;
                }
            }

            if (shouldUpdate) {
                classes = classes.map((cls) => cls.filter( Boolean ).join( ' ' ));
                classes.map(
                    ( cls, idx ) =>
                        (!!childBlocks[idx]) && updateBlockAttributes( childBlocks[idx], { columnClasses: cls } )
                );
            }
        }

        static jsUcfirst(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        render() {
            const { attributes, setAttributes, clientId } = this.props;
            const { tabSelected } = this.state;
            const {
                columns,
                columnsLayout, columnsLayoutT, columnsLayoutM,
                marginUnit,
                marginTop, marginRight, marginBottom, marginLeft,
                marginTopM, marginRightM, marginBottomM, marginLeftM,
                paddingTop, paddingRight, paddingBottom, paddingLeft,
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
                                    <Tooltip text={ layout.title } key={ index }>
                                        <div className="advgb-columns-layout"
                                             onClick={ () => setAttributes( {
                                                 columns: layout.columns,
                                                 columnsLayout: layout.layout
                                             } ) }
                                        >
                                            <img src={advgbBlocks.pluginUrl + '/assets/blocks/columns/icons/' + layout.icon + '.png'}
                                                 alt={ layout.layout }
                                            />
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
                {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 12 32">
                            <polygon points="8,20 8,26 12,26 6,32 0,26 4,26 4,20"/>
                            <polygon points="4,12 4,6 0,6 6,0 12,6 8,6 8,12"/>
                        </svg>
                    ),
                    title: __( 'Inner Columns Full Height' ),
                    isActive: vAlign === 'full',
                    onClick: () => setAttributes( { vAlign: 'full' } )
                },
            ];
            const MARGIN_PADDING_CONTROLS = [
                {label:'Top', icon: 'arrow-up-alt2'},
                {label:'Right', icon: 'arrow-right-alt2'},
                {label:'Bottom', icon: 'arrow-down-alt2'},
                {label:'Left', icon: 'arrow-left-alt2'},
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
                                                     onClick={ () => {
                                                         setAttributes( {
                                                             ['columnsLayout' + deviceLetter]: layout.layout
                                                         } );
                                                         this.setState( { random: Math.random() } );
                                                     } }
                                                >
                                                    <img src={advgbBlocks.pluginUrl + '/assets/blocks/columns/icons/' + layout.icon + '.png'}
                                                         alt={ layout.layout }
                                                    />
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
                                                     onClick={ () => {
                                                         setAttributes( {
                                                             ['columnsLayout' + deviceLetter]: layout.layout
                                                         } );
                                                         this.setState( { random: Math.random() } );
                                                     } }
                                                >
                                                    <img src={advgbBlocks.pluginUrl + '/assets/blocks/columns/icons/' + layout.icon + '.png'}
                                                         alt={ layout.layout }
                                                    />
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
                                <PanelBody title={ tabSelected !== 'desktop' ? AdvColumnsEdit.jsUcfirst(tabSelected) + __(' Padding') : __('Padding') }
                                           initialOpen={false}
                                >
                                    <div className="advgb-controls-title">{ __( 'Unit (px)' ) }</div>
                                    {MARGIN_PADDING_CONTROLS.map((pos, idx) => (
                                        <RangeControl
                                            key={ idx }
                                            beforeIcon={ pos.icon }
                                            value={ attributes['padding' + pos.label + deviceLetter] || 0 }
                                            min={ 0 }
                                            max={ 50 }
                                            onChange={ (value) => setAttributes( { ['padding' + pos.label + deviceLetter]: value } ) }
                                        />
                                    ) ) }
                                </PanelBody>
                                <PanelBody title={ tabSelected !== 'desktop' ? AdvColumnsEdit.jsUcfirst(tabSelected) + __(' Margin') : __('Margin') }
                                           initialOpen={false}
                                >
                                    <div className="advgb-controls-title">
                                        <span>{ __( 'Unit' ) }</span>
                                        <div className="advgb-unit-wrapper" key="unit">
                                            { ['px', 'em', 'vh', '%'].map( (unit, idx) => (
                                                <span className={`advgb-unit ${marginUnit === unit ? 'selected' : ''}`} key={idx}
                                                      onClick={ () => setAttributes( { marginUnit: unit } ) }
                                                >
                                                    {unit}
                                                </span>
                                            ) ) }
                                        </div>
                                    </div>
                                    {MARGIN_PADDING_CONTROLS.map((pos, idx) => (
                                        <RangeControl
                                            key={ idx }
                                            beforeIcon={ pos.icon }
                                            value={ attributes['margin' + pos.label + deviceLetter] || 0 }
                                            min={ 0 }
                                            max={ 50 }
                                            onChange={ (value) => setAttributes( { ['margin' + pos.label + deviceLetter]: value } ) }
                                        />
                                    ) ) }
                                </PanelBody>
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
                                            { ['px', 'vw', '%'].map( (unit, idx) => (
                                                <span className={`advgb-unit ${contentMaxWidthUnit === unit ? 'selected' : ''}`} key={idx}
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
                                            { ['px', 'vw', 'vh'].map( (unit, idx) => (
                                                <span className={`advgb-unit ${contentMinHeightUnit === unit ? 'selected' : ''}`} key={idx}
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
                                random={ this.state.random }
                            />
                        </div>
                    </div>
                    <style>
                        {`#block-${clientId} .advgb-columns-wrapper .advgb-columns {
                            margin-top: ${marginTop}px;
                            margin-right: ${marginRight}px;
                            margin-bottom: ${marginBottom}px;
                            margin-left: ${marginLeft}px;
                            padding-top: ${paddingTop}px;
                            padding-right: ${paddingRight}px;
                            padding-bottom: ${paddingBottom}px;
                            padding-left: ${paddingLeft}px;
                        }
                        @media screen and (max-width: 767px) {
                            #block-${clientId} .advgb-columns-wrapper .advgb-columns {
                                margin-top: ${marginTopM}px;
                                margin-right: ${marginRightM}px;
                                margin-bottom: ${marginBottomM}px;
                                margin-left: ${marginLeftM}px;
                                padding-top: ${paddingTopM}px;
                                padding-right: ${paddingRightM}px;
                                padding-bottom: ${paddingBottomM}px;
                                padding-left: ${paddingLeftM}px;
                            }
                        }`}
                    </style>
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
        marginUnit: {
            type: 'string',
            default: 'px',
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
            default: 0,
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
        save: function ( { attributes } ) {
            const {
                columns,
                columnsLayout, columnsLayoutT, columnsLayoutM,
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
                'columns is-mobile',
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