(function ( wpI18n, wpBlocks, wpElement, wpEditor, wpComponents ) {
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType, createBlock } = wpBlocks;
    const { InspectorControls, BlockControls, RichText, PanelColorSettings } = wpEditor;
    const { PanelBody, BaseControl, RangeControl, SelectControl, TextControl, IconButton, Button, Toolbar, DropdownMenu, Tooltip } = wpComponents;
    const { times } = lodash;

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
                initRow: 3,
                initCol: 3,
                selectedCell: null,
                rangeSelected: null,
                multiSelected: null,
                updated: false,
            };

            this.calculateRealColIndex = this.calculateRealColIndex.bind( this );
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
                    multiSelected: null,
                } );
            }

            if (updated) {
                this.calculateRealColIndex();
                this.setState( { updated: false } );
            }
        }

        createTable() {
            const { setAttributes } = this.props;
            const { initRow, initCol } = this.state;

            this.setState( { updated: true } );
            return setAttributes( {
                body: times( parseInt(initRow), () => ( {
                    cells: times( parseInt(initCol), () => ( {
                        content: '',
                    } ) )
                } ) )
            } );
        }

        calculateRealColIndex() {
            const { attributes, setAttributes } = this.props;
            const { body } = attributes;

            if (!body.length) return null;

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
            const { cI } = selectedCell;
            let countRowSpan = 0;

            this.setState( { selectedCell: null, updated: true } );
            setAttributes( {
                body: body.map( ( row ) => {
                    if (countRowSpan > 0) { // Skip if previous cell has row span
                        countRowSpan--;
                        return row;
                    }

                    let findColIdx = row.cells.findIndex( (cell, idx) => cell.cI === cI || (row.cells[idx + 1] && row.cells[idx + 1].cI > cI) );
                    if (findColIdx === -1) {
                        findColIdx = row.cells.length - 1;
                    }

                    if (row.cells[findColIdx].colSpan
                        && row.cells[findColIdx].cI < cI + offset
                        && row.cells[findColIdx].cI + parseInt(row.cells[findColIdx].colSpan) > cI + offset
                    ) {
                        row.cells[findColIdx].colSpan++;

                        if (row.cells[findColIdx].rowSpan) {
                            countRowSpan = parseInt(row.cells[findColIdx].rowSpan) - 1;
                        }

                        return row;
                    } else {
                        let realOffset = offset;
                        if (row.cells[findColIdx].cI > cI && offset === 1) {
                            realOffset = 0;
                        } else if (row.cells[findColIdx].cI < cI && offset === 0) {
                            realOffset = 1;
                        }

                        return {
                            cells: [
                                ...row.cells.slice( 0, findColIdx + realOffset ),
                                { content: '' },
                                ...row.cells.slice( findColIdx + realOffset ),
                            ],
                        }
                    }
                } ),
            } );
        }

        deleteColumn() {
            const { selectedCell } = this.state;

            if (!selectedCell) {
                return null;
            }

            const { attributes, setAttributes } = this.props;
            const { body } = attributes;
            const { cI } = selectedCell;
            let countRowSpan = 0;

            this.setState( { selectedCell: null, updated: true } );
            setAttributes( {
                body: body.map( ( row ) => {
                    if (countRowSpan > 0) {
                        countRowSpan--;
                        return row;
                    }

                    const findColIdx = row.cells.findIndex( (cell, idx) => cell.cI === cI || (row.cells[idx + 1] && row.cells[idx + 1].cI > cI) );

                    if (row.cells[findColIdx].rowSpan) {
                        countRowSpan = parseInt(row.cells[findColIdx].rowSpan) - 1;
                    }

                    if (row.cells[findColIdx].colSpan) {
                        row.cells[findColIdx].colSpan--;
                        if (row.cells[findColIdx].colSpan <= 1) {
                            delete row.cells[findColIdx].colSpan;
                        }

                        return row;
                    }

                    return {
                        cells: row.cells.filter( ( cell, index ) => index !== findColIdx ),
                    }
                } ),
            } );
        }

        mergeCells() {
            const { rangeSelected } = this.state;

            if (!rangeSelected.toCell) {
                return null;
            }

            const { attributes, setAttributes } = this.props;
            const { fromCell, toCell } = rangeSelected;
            const { body } = attributes;
            const fCell = body[fromCell.rowIdx].cells[fromCell.colIdx];
            const tCell = body[toCell.rowIdx].cells[toCell.colIdx];
            const fcSpan = typeof fCell.colSpan === 'undefined' ? 0 : parseInt(fCell.colSpan) - 1;
            const frSpan = typeof fCell.rowSpan === 'undefined' ? 0 : parseInt(fCell.rowSpan) - 1;
            const tcSpan = typeof tCell.colSpan === 'undefined' ? 0 : parseInt(tCell.colSpan) - 1;
            const trSpan = typeof tCell.rowSpan === 'undefined' ? 0 : parseInt(tCell.rowSpan) - 1;
            const minRowIdx = Math.min(fromCell.rowIdx, toCell.rowIdx);
            const maxRowIdx = Math.max(fromCell.rowIdx + frSpan, toCell.rowIdx + trSpan);
            const minColIdx = Math.min(fromCell.RCI, toCell.RCI);
            const maxColIdx = Math.max(fromCell.RCI + fcSpan, toCell.RCI + tcSpan);

            const newBody = body.map( ( row, curRowIndex ) => {
                if (curRowIndex < minRowIdx || curRowIndex > maxRowIdx) {
                    return row;
                }

                return {
                    cells: row.cells.map( ( cell, curColIndex ) => {
                        if (curColIndex === Math.min(fromCell.colIdx, toCell.colIdx)
                            && curRowIndex === Math.min(fromCell.rowIdx, toCell.rowIdx)
                        ) {
                            const rowSpan = Math.abs(maxRowIdx - minRowIdx) + 1;
                            const colSpan = Math.abs(maxColIdx - minColIdx) + 1;

                            return {
                                ...cell,
                                rowSpan: rowSpan > 1 ? rowSpan : undefined,
                                colSpan: colSpan > 1 ? colSpan : undefined,
                            }
                        }

                        return cell;
                    } ).filter( (cell, cCol) =>
                        cell.cI < minColIdx
                        || ( cCol === Math.min(fromCell.colIdx, toCell.colIdx) && curRowIndex === Math.min(fromCell.rowIdx, toCell.rowIdx) )
                        || cell.cI > maxColIdx
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
            const { colIndex, rowIndex, cI } = selectedCell;

            const cellColSpan = body[rowIndex].cells[colIndex].colSpan ? parseInt(body[rowIndex].cells[colIndex].colSpan) : 1;
            const cellRowSpan = body[rowIndex].cells[colIndex].rowSpan ? parseInt(body[rowIndex].cells[colIndex].rowSpan) : 1;
            body[rowIndex].cells[colIndex].colSpan = undefined;
            body[rowIndex].cells[colIndex].rowSpan = undefined;

            const newBody = body.map( (row, curRowIndex) => {
                if (curRowIndex >= rowIndex && curRowIndex < (rowIndex + cellRowSpan) ) {
                    const findColIdx = row.cells.findIndex( (cell) => cell.cI >= cI );
                    let startRowFix = 0;
                    if (curRowIndex === rowIndex) {
                        startRowFix = 1;
                    }

                    return {
                        cells: [
                            ...row.cells.slice( 0, findColIdx + startRowFix ),
                            ...times( cellColSpan - startRowFix, () => ( { content: '' } ) ),
                            ...row.cells.slice( findColIdx + startRowFix ),
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

            if (!selectedCell) return undefined;

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
                if (typeof styles !== 'undefined') {
                    let convertedStyles = styles[style];
                }

                return typeof convertedStyles === 'undefined' && style === 'borderStyle' ? 'solid' : undefined;
            }
        }

        updateCellsStyles( style ) {
            const { selectedCell, rangeSelected, multiSelected } = this.state;
            if (!selectedCell && !rangeSelected.toCell && !multiSelected ) {
                return null;
            }

            const { attributes, setAttributes } = this.props;
            const { rowIndex, colIndex } = selectedCell;
            const { body } = attributes;
            let minRowIdx, maxRowIdx, minColIdx, maxColIdx;

            if (rangeSelected && rangeSelected.toCell) {
                const { fromCell, toCell } = rangeSelected;
                const fCell = body[fromCell.rowIdx].cells[fromCell.colIdx];
                const tCell = body[toCell.rowIdx].cells[toCell.colIdx];
                const fcSpan = typeof fCell.colSpan === 'undefined' ? 0 : parseInt(fCell.colSpan) - 1;
                const frSpan = typeof fCell.rowSpan === 'undefined' ? 0 : parseInt(fCell.rowSpan) - 1;
                const tcSpan = typeof tCell.colSpan === 'undefined' ? 0 : parseInt(tCell.colSpan) - 1;
                const trSpan = typeof tCell.rowSpan === 'undefined' ? 0 : parseInt(tCell.rowSpan) - 1;
                minRowIdx = Math.min(fromCell.rowIdx, toCell.rowIdx);
                maxRowIdx = Math.max(fromCell.rowIdx + frSpan, toCell.rowIdx + trSpan);
                minColIdx = Math.min(fromCell.RCI, toCell.RCI);
                maxColIdx = Math.max(fromCell.RCI + fcSpan, toCell.RCI + tcSpan);
            }

            const newBody = body.map( ( row, curRowIndex ) => {
                if ((!rangeSelected || (rangeSelected && !rangeSelected.toCell)) && multiSelected.length < 2 && curRowIndex !== rowIndex
                    || (rangeSelected && rangeSelected.toCell && (curRowIndex < minRowIdx || curRowIndex > maxRowIdx) )
                    || (multiSelected && multiSelected.length > 1 && multiSelected.findIndex( (c) => c.rowIndex === curRowIndex ) === -1)
                ) {
                    return row;
                }

                return {
                    cells: row.cells.map( ( cell, curColIndex ) => {
                        if ((!rangeSelected || (rangeSelected && !rangeSelected.toCell)) && multiSelected.length < 2 && curColIndex === colIndex
                            || (rangeSelected && rangeSelected.toCell && (cell.cI >= minColIdx && cell.cI <= maxColIdx) )
                            || (multiSelected && multiSelected.length > 1 && multiSelected.findIndex( (c) => c.colIndex === curColIndex && c.rowIndex === curRowIndex ) > -1)
                        ) {
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

        updateCellContent( content ) {
            const { selectedCell } = this.state;
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
            const { initRow, initCol, selectedCell, rangeSelected, multiSelected } = this.state;
            const maxWidthVal = !!maxWidth ? maxWidth : undefined;
            const currentCell = selectedCell ? body[selectedCell.rowIndex].cells[selectedCell.colIndex] : null;

            // First time insert block, let user determine the table
            if (!body.length) {
                return (
                    <Fragment>
                        <div className="advgb-init-table">
                            <TextControl
                                type="number"
                                label={ __( 'Column Count' ) }
                                value={ initCol }
                                onChange={ ( value ) => this.setState( { initCol: value } ) }
                                min="1"
                            />
                            <TextControl
                                type="number"
                                label={ __( 'Row Count' ) }
                                value={ initRow }
                                onChange={ ( value ) => this.setState( { initRow: value } ) }
                                min="1"
                            />
                            <Button isPrimary onClick={ () => this.createTable() }>{ __( 'Create' ) }</Button>
                            <div style={ { marginTop: 10 } }>
                                <small>{ __( 'Hint: Hold CTRL key for multi cells selection. Hold SHIFT key for range cells selection.' ) }</small>
                            </div>
                        </div>
                    </Fragment>
                )
            }

            const TABLE_CONTROLS = [
                {
                    icon: 'table-row-before',
                    title: __( 'Add Row Before' ),
                    isDisabled: ! selectedCell || (rangeSelected && rangeSelected.toCell) || (multiSelected && multiSelected.length > 1),
                    onClick: () => this.insertRow( 0 ),
                },
                {
                    icon: 'table-row-after',
                    title: __( 'Add Row After' ),
                    isDisabled: ! selectedCell || (rangeSelected && rangeSelected.toCell) || (multiSelected && multiSelected.length > 1),
                    onClick: () => this.insertRow( 1 ),
                },
                {
                    icon: 'table-row-delete',
                    title: __( 'Delete Row' ),
                    isDisabled: ! selectedCell || (rangeSelected && rangeSelected.toCell) || (multiSelected && multiSelected.length > 1),
                    onClick: () => this.deleteRow(),
                },
                {
                    icon: 'table-col-before',
                    title: __( 'Add Column Before' ),
                    isDisabled: ! selectedCell || (rangeSelected && rangeSelected.toCell) || (multiSelected && multiSelected.length > 1),
                    onClick: () => this.insertColumn( 0 ),
                },
                {
                    icon: 'table-col-after',
                    title: __( 'Add Column After' ),
                    isDisabled: ! selectedCell || (rangeSelected && rangeSelected.toCell) || (multiSelected && multiSelected.length > 1),
                    onClick: () => this.insertColumn( 1 ),
                },
                {
                    icon: 'table-col-delete',
                    title: __( 'Delete Column' ),
                    isDisabled: ! selectedCell || (rangeSelected && rangeSelected.toCell) || (multiSelected && multiSelected.length > 1),
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
                    isDisabled: ! selectedCell
                        || (currentCell && !currentCell.rowSpan && !currentCell.colSpan)
                        || (rangeSelected && rangeSelected.toCell)
                        || (multiSelected && multiSelected.length > 1),
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
                    isDisabled: !rangeSelected || (rangeSelected && ! rangeSelected.toCell),
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
                    } ),
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
                    } ),
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
                            <IconButton
                                icon="update"
                                label={ __( 'Refresh table (Use this after using undo or redo)' ) }
                                onClick={ () => this.calculateRealColIndex() }
                            />
                        </Toolbar>
                    </BlockControls>
                    <InspectorControls>
                        <PanelBody title={ __( 'Table Settings' ) }>
                            <RangeControl
                                label={ __( 'Max width (px)' ) }
                                help={ __( 'Set this to 0 to make max-width is 100%' ) }
                                min={ 0 }
                                max={ 1999 }
                                value={ maxWidth }
                                onChange={ ( value ) => setAttributes( { maxWidth: value } ) }
                            />
                        </PanelBody>
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
                    <table className={ className } style={ { maxWidth: maxWidthVal } }>
                        <tbody>
                            {body.map( ( { cells }, rowIndex ) => (
                                <tr key={ rowIndex }>
                                    {cells.map( ( { content, styles, colSpan, rowSpan, cI }, colIndex ) => {
                                        const cell = { rowIndex, colIndex, cI };

                                        let isSelected = selectedCell
                                            && selectedCell.rowIndex === rowIndex
                                            && selectedCell.colIndex === colIndex;

                                        if (rangeSelected && rangeSelected.toCell) {
                                            const { fromCell, toCell } = rangeSelected;
                                            const fCell = body[fromCell.rowIdx].cells[fromCell.colIdx];
                                            const tCell = body[toCell.rowIdx].cells[toCell.colIdx];
                                            const fcSpan = typeof fCell.colSpan === 'undefined' ? 0 : parseInt(fCell.colSpan) - 1;
                                            const frSpan = typeof fCell.rowSpan === 'undefined' ? 0 : parseInt(fCell.rowSpan) - 1;
                                            const tcSpan = typeof tCell.colSpan === 'undefined' ? 0 : parseInt(tCell.colSpan) - 1;
                                            const trSpan = typeof tCell.rowSpan === 'undefined' ? 0 : parseInt(tCell.rowSpan) - 1;

                                            isSelected = rowIndex >= Math.min(fromCell.rowIdx, toCell.rowIdx)
                                                && rowIndex <= Math.max(fromCell.rowIdx + frSpan, toCell.rowIdx + trSpan)
                                                && cI >= Math.min(fromCell.RCI, toCell.RCI)
                                                && cI <= Math.max(fromCell.RCI + fcSpan, toCell.RCI + tcSpan)
                                        }

                                        if (multiSelected && multiSelected.length > 1) {
                                            isSelected = multiSelected.findIndex( (c) => c.rowIndex === rowIndex && c.colIndex === colIndex ) > -1;
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
                                                    if (e.shiftKey) {
                                                        if (!rangeSelected) return;
                                                        if (!rangeSelected.fromCell) return;

                                                        const { fromCell } = rangeSelected;
                                                        const toCell = {
                                                            rowIdx: rowIndex,
                                                            colIdx: colIndex,
                                                            RCI: cI,
                                                        };

                                                        this.setState( {
                                                            rangeSelected: { fromCell, toCell },
                                                            multiSelected: null,
                                                        } );
                                                    } else if (e.ctrlKey || e.metaKey) {
                                                        const multiCells = multiSelected ? multiSelected : [];
                                                        const existCell = multiCells.findIndex( (cel) => cel.rowIndex === rowIndex && cel.colIndex === colIndex );

                                                        if (existCell === -1) {
                                                            multiCells.push(cell);
                                                        } else {
                                                            multiCells.splice(existCell, 1);
                                                        }

                                                        this.setState( {
                                                            multiSelected: multiCells,
                                                            rangeSelected: null,
                                                        } );
                                                    } else {
                                                        this.setState( {
                                                            rangeSelected: {
                                                                fromCell: {
                                                                    rowIdx: rowIndex,
                                                                    colIdx: colIndex,
                                                                    RCI: cI,
                                                                },
                                                            },
                                                            multiSelected: [ cell ],
                                                        } );
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
            const { body, maxWidth } = attributes;
            const maxWidthVal = !!maxWidth ? maxWidth : undefined;

            return (
                <table className="advgb-table-frontend" style={ { maxWidth: maxWidthVal } }>
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
        },
        transforms: {
            from: [
                {
                    type: 'block',
                    blocks: [ 'core/table' ],
                    transform: ( attributes ) => {
                        return createBlock( 'advgb/table', {
                            body: attributes.body,
                        } )
                    }
                },
            ],
        },
    } );
})( wp.i18n, wp.blocks, wp.element, wp.editor, wp.components );