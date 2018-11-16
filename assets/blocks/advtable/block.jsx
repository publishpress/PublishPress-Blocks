(function ( wpI18n, wpBlocks, wpElement, wpEditor, wpComponents ) {
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InspectorControls, BlockControls, RichText, MediaUpload, PanelColorSettings } = wpEditor;
    const { PanelBody, BaseControl, RangeControl, SelectControl, IconButton, Toolbar, DropdownMenu, Tooltip } = wpComponents;
    const { times, isEmpty } = lodash;

    const tableBlockIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="2 2 22 22">
            <path d="M3 3v18h18V3H3zm8 16H5v-6h6v6zm0-8H5V5h6v6zm8 8h-6v-6h6v6zm0-8h-6V5h6v6z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    );

    class AdvTable extends Component {
        constructor() {
            super( ...arguments );
            this.state = {
                selectedCell: null,
                rangeSelected: null,
                updated: false,
            };

            this.calculateRealColIndex = this.calculateRealColIndex.bind( this );
        }

        componentWillMount() {
            const { attributes, setAttributes } = this.props;

            if (!attributes.body.length) {
                setAttributes( {
                    body: times( 2, () => ( {
                        cells: times( 2, () => ( {
                            content: '',
                        } ) )
                    } ) )
                } );
            }
        }

        componentDidMount() {
            this.calculateRealColIndex();
        }

        componentDidUpdate() {
            const { isSelected } = this.props;
            const { selectedCell, updated } = this.state;

            if ( ! isSelected && selectedCell ) {
                this.setState( {
                    selectedCell: null,
                    rangeSelected: null,
                } );
            }

            if (updated) {
                this.calculateRealColIndex();
                this.setState( { updated: false } );
            }
        }

        calculateRealColIndex() {
            const { attributes, setAttributes } = this.props;
            const { body } = attributes;

            const newBody = body.map( (row, cRow) => {
                return {
                    cells: row.cells.map( (cell, cCol) => {
                        cell.cI = cCol;
                        for (let i=0;i < cRow; i++) {
                            for (let j=0; j < body[i].cells.length; j++) {
                                if (body[i].cells[j] && body[i].cells[j].colSpan) {
                                    if (body[i].cells[j].rowSpan && i + parseInt(body[i].cells[j].rowSpan) > cRow) {
                                        if (cCol === 0) {
                                            if (body[i].cells[j].cI <= cell.cI) {
                                                cell.cI += parseInt( body[i].cells[j].colSpan );
                                            }
                                        } else {
                                            const lastColSpan = !isNaN(parseInt(row.cells[cCol-1].colSpan)) ? parseInt(row.cells[cCol-1].colSpan) : 0;
                                            if (body[i].cells[j].cI === row.cells[cCol - 1].cI + 1
                                                || body[i].cells[j].cI <= row.cells[cCol - 1].cI + lastColSpan
                                            ) {
                                                cell.cI += parseInt( body[i].cells[j].colSpan );
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        for (let j=0; j < cCol; j++) {
                            if (row.cells[j]) {
                                if (row.cells[j].colSpan) {
                                    cell.cI += parseInt( row.cells[j].colSpan ) - 1;
                                }
                            }
                        }

                        return cell;
                    } )
                }
            } );

            setAttributes( { body: newBody } );
        }

        insertRow( offset ) {
            const { selectedCell } = this.state;

            if (!selectedCell) {
                return null;
            }

            const { attributes, setAttributes } = this.props;
            const { body } = attributes;
            const { rowIndex } = selectedCell;
            const newRow = jQuery.extend( true, {}, body[rowIndex] );
            newRow.cells.map( ( cell ) => {
                cell.content = '';

                return cell;
            } );
            newRow.cells = newRow.cells.filter( ( cCell ) => !cCell.rowSpan );

            const newBody = [
                ...body.slice( 0, rowIndex + offset ),
                newRow,
                ...body.slice( rowIndex + offset ),
            ].map( ( row, rowIdx ) => ( {
                cells: row.cells.map( ( cell ) => {
                    if (cell.rowSpan) {
                        if (rowIdx <= rowIndex && ( (rowIdx + parseInt(cell.rowSpan) - 1) >= rowIndex) ) {
                            cell.rowSpan = parseInt(cell.rowSpan) + 1;
                        }
                    }
                    return cell;
                } )
            } ) );

            this.setState( { selectedCell: null, updated: true } );
            setAttributes( { body: newBody } );
        }

        deleteRow() {
            const { selectedCell } = this.state;

            if (!selectedCell) {
                return null;
            }

            const { attributes, setAttributes } = this.props;
            const { body } = attributes;
            const { rowIndex } = selectedCell;

            const newBody = body.map( (row, cRowIdx) => ( {
                cells: row.cells.map( (cell) => {
                    if (cell.rowSpan) {
                        if (cRowIdx <= rowIndex && parseInt(cell.rowSpan) + cRowIdx > rowIndex) {
                            cell.rowSpan = parseInt(cell.rowSpan) - 1;
                            if (cRowIdx === rowIndex) {
                                const findColIdx = body[cRowIdx + 1].cells.findIndex( (elm) => elm.cI === cell.cI || elm.cI > cell.cI );
                                body[cRowIdx + 1].cells.splice( findColIdx, 0, cell );
                            }
                        }
                    }

                    return cell;
                } )
            } ) );

            this.setState( { selectedCell: null, updated: true } );
            setAttributes( { body: newBody.filter( (row, index) => index !== rowIndex ) } );
        }

        insertColumn( offset ) {
            const { selectedCell } = this.state;

            if (!selectedCell) {
                return null;
            }

            const { attributes, setAttributes } = this.props;
            const { body } = attributes;
            const { colIndex } = selectedCell;

            this.setState( { selectedCell: null, updated: true } );
            setAttributes( {
                body: body.map( ( row ) => ( {
                    cells: [
                        ...row.cells.slice( 0, colIndex + offset ),
                        {
                            content: '',
                        },
                        ...row.cells.slice( colIndex + offset ),
                    ],
                } ) ),
            } );
        }

        deleteColumn() {
            const { selectedCell } = this.state;

            if (!selectedCell) {
                return null;
            }

            const { attributes, setAttributes } = this.props;
            const { body } = attributes;
            const { colIndex } = selectedCell;

            this.setState( { selectedCell: null, updated: true } );
            setAttributes( {
                body: body.map( ( row ) => ( {
                    cells: row.cells.filter( ( cell, index ) => index !== colIndex ),
                } ) ),
            } );
        }

        mergeCells() {
            const { rangeSelected } = this.state;

            if (!rangeSelected) {
                return null;
            }

            const { attributes, setAttributes } = this.props;
            const { fromCell, toCell } = rangeSelected;
            const { body } = attributes;

            const newBody = body.map( ( row, curRowIndex ) => {
                if (curRowIndex < Math.min(fromCell.rowIdx, toCell.rowIdx)
                    || curRowIndex > Math.max(fromCell.rowIdx, toCell.rowIdx)
                ) {
                    return row;
                }

                return {
                    cells: row.cells.map( ( cell, curColIndex ) => {
                        if (curColIndex === Math.min(fromCell.colIdx, toCell.colIdx)
                            && curRowIndex === Math.min(fromCell.rowIdx, toCell.rowIdx)
                        ) {
                            const rowSpan = Math.abs(fromCell.rowIdx - toCell.rowIdx) + 1;
                            const colSpan = Math.abs(fromCell.colIdx - toCell.colIdx) + 1;

                            return {
                                ...cell,
                                rowSpan: rowSpan > 1 ? rowSpan : undefined,
                                colSpan: colSpan > 1 ? colSpan : undefined,
                            }
                        }

                        return cell;
                    } ).filter( (cell, cCol) =>
                        cCol < Math.min(fromCell.colIdx, toCell.colIdx)
                        || ( cCol === Math.min(fromCell.colIdx, toCell.colIdx) && curRowIndex === Math.min(fromCell.rowIdx, toCell.rowIdx) )
                        || cCol > Math.max(fromCell.colIdx, toCell.colIdx)
                    )
                }
            } );

            setAttributes( { body: newBody } );
            this.setState( { selectedCell: null, rangeSelected: null, updated: true } );
        }

        splitMergedCells() {
            const { selectedCell } = this.state;

            if (!selectedCell) {
                return null;
            }

            const { attributes, setAttributes } = this.props;
            const { body } = attributes;
            const { colIndex, rowIndex } = selectedCell;

            const cellColSpan = parseInt(body[rowIndex].cells[colIndex].colSpan);
            const cellRowSpan = parseInt(body[rowIndex].cells[colIndex].rowSpan);
            body[rowIndex].cells[colIndex].colSpan = undefined;
            body[rowIndex].cells[colIndex].rowSpan = undefined;

            const newBody = body.map( (row, curRowIndex) => {
                if (curRowIndex === rowIndex) {
                    return {
                        cells: [
                            ...row.cells.slice( 0, colIndex + 1 ),
                            ...times( cellColSpan - 1, () => ( { content: '' } ) ),
                            ...row.cells.slice( colIndex + 1 ),
                        ],
                    }
                } else if (curRowIndex > rowIndex && curRowIndex < (rowIndex + cellRowSpan) ) {
                    return {
                        cells: [
                            ...row.cells.slice( 0, colIndex ),
                            ...times( cellColSpan, () => ( { content: '' } ) ),
                            ...row.cells.slice( colIndex ),
                        ],
                    }
                }

                return row;
            } );

            setAttributes( { body: newBody } );
            this.setState( { selectedCell: null, updated: true } );
        }

        // Parse styles from HTML form to React styles object
        static parseStyles( styles ) {
            if (typeof styles !== 'string') {
                return styles;
            }

            return styles
                .split(';')
                .filter(style => style.split(':')[0] && style.split(':')[1])
                .map(style => [
                    style.split(':')[0].trim().replace(/-./g, c => c.substr(1).toUpperCase()),
                    style.split(':')[1].trim()
                ])
                .reduce((styleObj, style) => ({
                    ...styleObj,
                    [style[0]]: style[1],
                }), {});
        }

        getCellStyles( style ) {
            const { selectedCell } = this.state;
            const { body } = this.props.attributes;

            if (!selectedCell) return null;

            const { rowIndex, colIndex } = selectedCell;

            if (style === 'borderColor') {
                return body[rowIndex].cells[colIndex].borderColorSaved;
            }
            const styles = AdvTable.parseStyles(body[rowIndex].cells[colIndex].styles);

            if (typeof styles === 'object') {
                let convertedStyles = styles[style];

                if (convertedStyles && typeof convertedStyles !== 'number' && convertedStyles.indexOf( 'px' )) {
                    convertedStyles = styles[style].replace( /px/g, '' );
                }

                return typeof convertedStyles === 'undefined' && style === 'borderStyle' ? 'solid' : convertedStyles;
            } else {
                return typeof convertedStyles === 'undefined' && style === 'borderStyle' ? 'solid' : null;
            }
        }

        updateCellsStyles( style, cells = this.state.selectedCell ) {
            if (!cells) {
                return null;
            }

            const { attributes, setAttributes } = this.props;
            const { rowIndex, colIndex } = cells;
            const { body } = attributes;

            const newBody = body.map( ( row, curRowIndex ) => {
                if (curRowIndex !== rowIndex) {
                    return row;
                }

                return {
                    cells: row.cells.map( ( cell, curColIndex ) => {
                        if (curColIndex === colIndex) {
                            cell.styles = AdvTable.parseStyles( cell.styles );

                            if (style.borderColor) {
                                if (cell.styles.borderTopColor) {
                                    cell.styles = { ...cell.styles, borderTopColor: style.borderColor };
                                }
                                if (cell.styles.borderRightColor) {
                                    cell.styles = { ...cell.styles, borderRightColor: style.borderColor };
                                }
                                if (cell.styles.borderBottomColor) {
                                    cell.styles = { ...cell.styles, borderBottomColor: style.borderColor };
                                }
                                if (cell.styles.borderLeftColor) {
                                    cell.styles = { ...cell.styles, borderLeftColor: style.borderColor };
                                }

                                cell.borderColorSaved = style.borderColor;
                            } else {
                                cell.styles = { ...cell.styles, ...style };
                            }
                        }

                        return cell;
                    } )
                }
            } );

            setAttributes( { body: newBody } );
        }

        updateCellContent( content, selectedCell = this.state.selectedCell ) {
            if (!selectedCell) {
                return null;
            }

            const { attributes, setAttributes } = this.props;
            const { rowIndex, colIndex } = selectedCell;
            const { body } = attributes;

            const newBody = body.map( ( row, curRowIndex ) => {
                if (curRowIndex !== rowIndex) {
                    return row;
                }

                return {
                    cells: row.cells.map( ( cell, curColIndex ) => {
                        if (curColIndex !== colIndex) {
                            return cell;
                        }

                        return {
                            ...cell,
                            content,
                        }
                    } )
                }
            } );

            setAttributes( { body: newBody } );
        }

        render() {
            const { attributes, setAttributes, className } = this.props;
            const { body, maxWidth } = attributes;
            const { selectedCell, rangeSelected } = this.state;

            const TABLE_CONTROLS = [
                {
                    icon: 'table-row-before',
                    title: __( 'Add Row Before' ),
                    isDisabled: ! selectedCell || rangeSelected,
                    onClick: () => this.insertRow( 0 ),
                },
                {
                    icon: 'table-row-after',
                    title: __( 'Add Row After' ),
                    isDisabled: ! selectedCell || rangeSelected,
                    onClick: () => this.insertRow( 1 ),
                },
                {
                    icon: 'table-row-delete',
                    title: __( 'Delete Row' ),
                    isDisabled: ! selectedCell || rangeSelected,
                    onClick: () => this.deleteRow(),
                },
                {
                    icon: 'table-col-before',
                    title: __( 'Add Column Before' ),
                    isDisabled: ! selectedCell || rangeSelected,
                    onClick: () => this.insertColumn( 0 ),
                },
                {
                    icon: 'table-col-after',
                    title: __( 'Add Column After' ),
                    isDisabled: ! selectedCell || rangeSelected,
                    onClick: () => this.insertColumn( 1 ),
                },
                {
                    icon: 'table-col-delete',
                    title: __( 'Delete Column' ),
                    isDisabled: ! selectedCell || rangeSelected,
                    onClick: () => this.deleteColumn(),
                },
                {
                    icon: (
                        <svg width="20" height="20" viewBox="4 2 18 18" className="dashicon">
                            <path fill="none" d="M0,0h24v24H0V0z"/>
                            <path d="M4,5v13h17V5H4z M14,7v9h-3V7H14z M6,7h3v9H6V7z M19,16h-3V7h3V16z"/>
                        </svg>
                    ),
                    title: __( 'Split Merged Cells' ),
                    isDisabled: ! selectedCell || rangeSelected,
                    onClick: () => this.splitMergedCells(),
                },
                {
                    icon: (
                        <svg width="20" height="20" className="dashicon" viewBox="2 2 22 22">
                            <path fill="none" d="M0,0h24v24H0V0z"/>
                            <polygon points="21,18 2,18 2,20 21,20 21,18"/>
                            <path d="M19,10v4H4v-4H19 M20,8H3C2.45,8,2,8.45,2,9v6c0,0.55,0.45,1,1,1h17c0.55,0,1-0.45,1-1V9C21,8.45,20.55,8,20,8L20,8z"/>
                            <polygon points="21,4 2,4 2,6 21,6 21,4"/>
                        </svg>
                    ),
                    title: __( 'Merge Cells' ),
                    isDisabled: ! rangeSelected,
                    onClick: () => this.mergeCells(),
                },
            ];

            const BORDER_SELECT = [
                {
                    title: __( 'Border Top' ),
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M7 21h2v-2H7v2zm0-8h2v-2H7v2zm4 0h2v-2h-2v2zm0 8h2v-2h-2v2zm-8-4h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2v-2H3v2zm0-4h2V7H3v2zm8 8h2v-2h-2v2zm8-8h2V7h-2v2zm0 4h2v-2h-2v2zM3 3v2h18V3H3zm16 14h2v-2h-2v2zm-4 4h2v-2h-2v2zM11 9h2V7h-2v2zm8 12h2v-2h-2v2zm-4-8h2v-2h-2v2z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                    ),
                    onClick: () => this.updateCellsStyles( { borderTopColor: this.getCellStyles( 'borderColor' ) } ),
                },
                {
                    title: __( 'Border Right' ),
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M7 21h2v-2H7v2zM3 5h2V3H3v2zm4 0h2V3H7v2zm0 8h2v-2H7v2zm-4 8h2v-2H3v2zm8 0h2v-2h-2v2zm-8-8h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm8 8h2v-2h-2v2zm4-4h2v-2h-2v2zm4-10v18h2V3h-2zm-4 18h2v-2h-2v2zm0-16h2V3h-2v2zm-4 8h2v-2h-2v2zm0-8h2V3h-2v2zm0 4h2V7h-2v2z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                    ),
                    onClick: () => this.updateCellsStyles( { borderRightColor: this.getCellStyles( 'borderColor' ) } ),
                },
                {
                    title: __( 'Border Bottom' ),
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M9 11H7v2h2v-2zm4 4h-2v2h2v-2zM9 3H7v2h2V3zm4 8h-2v2h2v-2zM5 3H3v2h2V3zm8 4h-2v2h2V7zm4 4h-2v2h2v-2zm-4-8h-2v2h2V3zm4 0h-2v2h2V3zm2 10h2v-2h-2v2zm0 4h2v-2h-2v2zM5 7H3v2h2V7zm14-4v2h2V3h-2zm0 6h2V7h-2v2zM5 11H3v2h2v-2zM3 21h18v-2H3v2zm2-6H3v2h2v-2z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                    ),
                    onClick: () => this.updateCellsStyles( { borderBottomColor: this.getCellStyles( 'borderColor' ) } ),
                },
                {
                    title: __( 'Border Left' ),
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M11 21h2v-2h-2v2zm0-4h2v-2h-2v2zm0-12h2V3h-2v2zm0 4h2V7h-2v2zm0 4h2v-2h-2v2zm-4 8h2v-2H7v2zM7 5h2V3H7v2zm0 8h2v-2H7v2zm-4 8h2V3H3v18zM19 9h2V7h-2v2zm-4 12h2v-2h-2v2zm4-4h2v-2h-2v2zm0-14v2h2V3h-2zm0 10h2v-2h-2v2zm0 8h2v-2h-2v2zm-4-8h2v-2h-2v2zm0-8h2V3h-2v2z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                    ),
                    onClick: () => this.updateCellsStyles( { borderLeftColor: this.getCellStyles( 'borderColor' ) } ),
                },
                {
                    title: __( 'Border All' ),
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M13 7h-2v2h2V7zm0 4h-2v2h2v-2zm4 0h-2v2h2v-2zM3 3v18h18V3H3zm16 16H5V5h14v14zm-6-4h-2v2h2v-2zm-4-4H7v2h2v-2z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                    ),
                    onClick: () => this.updateCellsStyles( {
                        borderTopColor: this.getCellStyles( 'borderColor' ),
                        borderRightColor: this.getCellStyles( 'borderColor' ),
                        borderBottomColor: this.getCellStyles( 'borderColor' ),
                        borderLeftColor: this.getCellStyles( 'borderColor' ),
                    }, selectedCell ),
                },
                {
                    title: __( 'Border None' ),
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M7 5h2V3H7v2zm0 8h2v-2H7v2zm0 8h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm-8 0h2v-2H3v2zm0-4h2v-2H3v2zm0-4h2v-2H3v2zm0-4h2V7H3v2zm0-4h2V3H3v2zm8 8h2v-2h-2v2zm8 4h2v-2h-2v2zm0-4h2v-2h-2v2zm0 8h2v-2h-2v2zm0-12h2V7h-2v2zm-8 0h2V7h-2v2zm8-6v2h2V3h-2zm-8 2h2V3h-2v2zm4 16h2v-2h-2v2zm0-8h2v-2h-2v2zm0-8h2V3h-2v2z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                    ),
                    onClick: () => this.updateCellsStyles( {
                        borderTopColor: undefined,
                        borderRightColor: undefined,
                        borderBottomColor: undefined,
                        borderLeftColor: undefined,
                    }, selectedCell ),
                },
            ];

            const HORZ_ALIGNMENT_CONTROLS = [
                {
                    icon: 'editor-alignleft',
                    title: __( 'Align left' ),
                    align: 'left',
                },
                {
                    icon: 'editor-aligncenter',
                    title: __( 'Align center' ),
                    align: 'center',
                },
                {
                    icon: 'editor-alignright',
                    title: __( 'Align right' ),
                    align: 'right',
                },
                {
                    icon: 'editor-justify',
                    title: __( 'Align justify' ),
                    align: 'justify',
                },
            ];

            const VERT_ALIGNMENT_CONTROLS = [
                {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                    ),
                    title: __( 'Align top' ),
                    align: 'top',
                },
                {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path d="M8 19h3v4h2v-4h3l-4-4-4 4zm8-14h-3V1h-2v4H8l4 4 4-4zM4 11v2h16v-2H4z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                    ),
                    title: __( 'Align middle' ),
                    align: 'middle',
                },
                {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path d="M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                    ),
                    title: __( 'Align bottom' ),
                    align: 'bottom',
                },
            ];

            return (
                <Fragment>
                    <BlockControls>
                        <Toolbar>
                            <DropdownMenu
                                icon="editor-table"
                                label={ __( 'Edit Table' ) }
                                controls={ TABLE_CONTROLS }
                            />
                        </Toolbar>
                    </BlockControls>
                    <InspectorControls>
                        <PanelBody title={ __( 'Cell Settings' ) }>
                            <PanelColorSettings
                                title={ __( 'Color Settings' ) }
                                colorSettings={ [
                                    {
                                        label: __( 'Background Color' ),
                                        value: this.getCellStyles( 'backgroundColor' ),
                                        onChange: ( value ) => this.updateCellsStyles( { backgroundColor: value } ),
                                    },
                                    {
                                        label: __( 'Text Color' ),
                                        value: this.getCellStyles( 'color' ),
                                        onChange: ( value ) => this.updateCellsStyles( { color: value } ),
                                    },
                                    {
                                        label: __( 'Border Color' ),
                                        value: this.getCellStyles( 'borderColor' ),
                                        onChange: ( value ) => this.updateCellsStyles( { borderColor: value } ),
                                    },
                                ] }
                            />
                            <PanelBody title={ __( 'Border' ) } initialOpen={ false }>
                                <SelectControl
                                    label={ __( 'Border Style' ) }
                                    value={ this.getCellStyles( 'borderStyle' ) }
                                    options={ [
                                        { label: __( 'Solid' ), value: 'solid' },
                                        { label: __( 'Dashed' ), value: 'dashed' },
                                        { label: __( 'Dotted' ), value: 'dotted' },
                                        { label: __( 'None' ), value: 'none' },
                                    ] }
                                    onChange={ ( value ) => this.updateCellsStyles( { borderStyle: value } ) }
                                />
                                <RangeControl
                                    label={ __( 'Border width' ) }
                                    value={ this.getCellStyles( 'borderWidth' ) }
                                    min={ 1 }
                                    max={ 10 }
                                    onChange={ ( value ) => this.updateCellsStyles( { borderWidth: value } ) }
                                />
                                <div className={ 'advgb-border-item-wrapper' }>
                                    {BORDER_SELECT.map( ( item, index ) => (
                                        <div className={ 'advgb-border-item' } key={ index }>
                                            <Tooltip text={ item.title }>
                                                <span onClick={ item.onClick }>{ item.icon }</span>
                                            </Tooltip>
                                        </div>
                                    ) ) }
                                </div>
                            </PanelBody>
                            <PanelBody title={ __( 'Text Alignment' ) } initialOpen={ false }>
                                <BaseControl label={ __( 'Horizontal Align' ) }>
                                    <Toolbar
                                        controls={ HORZ_ALIGNMENT_CONTROLS.map( ( control ) => {
                                            const isActive = ( this.getCellStyles( 'textAlign' ) === control.align );

                                            return {
                                                ...control,
                                                isActive,
                                                onClick: () => this.updateCellsStyles( { textAlign: isActive ? undefined : control.align } ),
                                            };
                                        } ) }
                                    />
                                </BaseControl>
                                <BaseControl label={ __( 'Vertical Align' ) }>
                                    <Toolbar
                                        controls={ VERT_ALIGNMENT_CONTROLS.map( ( control ) => {
                                            const isActive = ( this.getCellStyles( 'verticalAlign' ) === control.align );

                                            return {
                                                ...control,
                                                isActive,
                                                onClick: () => this.updateCellsStyles( { verticalAlign: isActive ? undefined : control.align } ),
                                            };
                                        } ) }
                                    />
                                </BaseControl>
                            </PanelBody>
                        </PanelBody>
                    </InspectorControls>
                    <table className={ className }>
                        <tbody>
                            {body.map( ( { cells }, rowIndex ) => (
                                <tr key={ rowIndex }>
                                    {cells.map( ( { content, styles, colSpan, rowSpan }, colIndex ) => {
                                        const cell = { rowIndex, colIndex };
                                        let isSelected = selectedCell
                                            && selectedCell.rowIndex === rowIndex
                                            && selectedCell.colIndex === colIndex;
                                        if (rangeSelected) {
                                            isSelected = rowIndex >= Math.min(rangeSelected.fromCell.rowIdx, rangeSelected.toCell.rowIdx)
                                                && rowIndex <= Math.max(rangeSelected.fromCell.rowIdx, rangeSelected.toCell.rowIdx)
                                                && colIndex >= Math.min(rangeSelected.fromCell.colIdx, rangeSelected.toCell.colIdx)
                                                && colIndex <= Math.max(rangeSelected.fromCell.colIdx, rangeSelected.toCell.colIdx)
                                        }

                                        const cellClassName = [
                                            isSelected && 'cell-selected',
                                        ].filter( Boolean ).join( ' ' );

                                        styles = AdvTable.parseStyles( styles );

                                        return (
                                            <td key={ colIndex }
                                                className={ cellClassName }
                                                style={ styles }
                                                colSpan={ colSpan }
                                                rowSpan={ rowSpan }
                                                onClick={ (e) => {
                                                    if (e.shiftKey && selectedCell) {
                                                        const fromCell = {
                                                            rowIdx: selectedCell.rowIndex,
                                                            colIdx: selectedCell.colIndex,
                                                        };

                                                        const toCell = {
                                                            rowIdx: rowIndex,
                                                            colIdx: colIndex,
                                                        };

                                                        this.setState( { rangeSelected: { fromCell, toCell } } );
                                                    } else {
                                                        this.setState( { rangeSelected: null } );
                                                    }
                                                } }
                                            >
                                                <RichText
                                                    className="wp-block-table__cell-content"
                                                    value={ content }
                                                    onChange={ ( value ) => this.updateCellContent( value ) }
                                                    unstableOnFocus={ () => this.setState( { selectedCell: cell } ) }
                                                />
                                            </td>
                                        )
                                    } ) }
                                </tr>
                            ) ) }
                        </tbody>
                    </table>
                </Fragment>
            )
        }
    }

    registerBlockType( 'advgb/table', {
        title: __( 'Advanced Table' ),
        description: __( 'Advanced table block with more styles and functions.' ),
        icon: {
            src: tableBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined,
        },
        category: 'formatting',
        keywords: [ __( 'table' ), __( 'cell' ), __( 'data' ) ],
        attributes: {
            body: {
                type: 'array',
                default: [],
                source: 'query',
                selector: 'tbody tr',
                query: {
                    cells: {
                        type: 'array',
                        default: [],
                        source: 'query',
                        selector: 'td',
                        query: {
                            content: {
                                source: 'html',
                            },
                            styles: {
                                type: 'string',
                                source: 'attribute',
                                attribute: 'style',
                            },
                            colSpan: {
                                type: 'string',
                                source: 'attribute',
                                attribute: 'colspan',
                            },
                            rowSpan: {
                                type: 'string',
                                source: 'attribute',
                                attribute: 'rowspan',
                            },
                            borderColorSaved: {
                                type: 'string',
                                source: 'attribute',
                                attribute: 'data-border-color',
                            }
                        },
                    },
                },
            },
            maxWidth: {
                type: 'number',
                default: 0
            },
            changed: {
                type: 'boolean',
                default: false,
            },
        },
        supports: {
            align: true,
        },
        edit: AdvTable,
        save: function ( { attributes } ) {
            const { body } = attributes;

            return (
                <table>
                    <tbody>
                    { body.map( ( { cells }, rowIndex ) => (
                        <tr key={ rowIndex }>
                            { cells.map( ( { content, styles, colSpan, rowSpan, borderColorSaved }, colIndex ) => (
                                <RichText.Content
                                    tagName="td"
                                    value={ content }
                                    key={ colIndex }
                                    style={ styles }
                                    colSpan={ colSpan }
                                    rowSpan={ rowSpan }
                                    data-border-color={ borderColorSaved }
                                />
                            ) ) }
                        </tr>
                    ) ) }
                    </tbody>
                </table>
            );
        }
    } );
})( wp.i18n, wp.blocks, wp.element, wp.editor, wp.components );