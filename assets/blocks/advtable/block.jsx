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
                rangeSelected: {},
            };
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

        componentDidUpdate() {
            const { isSelected } = this.props;
            const { selectedCell } = this.state;

            if ( ! isSelected && selectedCell ) {
                this.setState( { selectedCell: null } );
            }
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

            const newBody = [
                ...body.slice( 0, rowIndex + offset ),
                newRow,
                ...body.slice( rowIndex + offset ),
            ];

            this.setState( { selectedCell: null } );
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

            this.setState( { selectedCell: null } );
            setAttributes( { body: body.filter( (row, index) => index !== rowIndex ) } );
        }

        insertColumn( offset ) {
            const { selectedCell } = this.state;

            if (!selectedCell) {
                return null;
            }

            const { attributes, setAttributes } = this.props;
            const { body } = attributes;
            const { colIndex } = selectedCell;

            this.setState( { selectedCell: null } );
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

            this.setState( { selectedCell: null } );
            setAttributes( {
                body: body.map( ( row ) => ( {
                    cells: row.cells.filter( ( cell, index ) => index !== colIndex ),
                } ) ),
            } )
        }

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

        updateCellsStyles( styles, cells = this.state.selectedCell ) {
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
                            cell.styles = { ...cell.styles, ...styles };
                        }

                        return cell;
                    } )
                }
            } );

            setAttributes( { body: newBody } );
        }

        updateCellsSpan( spanType, value, selectedCell = this.state.selectedCell ) {
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
                            [ spanType ] : value,
                        }
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
            const { selectedCell } = this.state;

            const TABLE_CONTROLS = [
                {
                    icon: 'table-row-before',
                    title: __( 'Add Row Before' ),
                    isDisabled: ! selectedCell,
                    onClick: () => this.insertRow( 0 ),
                },
                {
                    icon: 'table-row-after',
                    title: __( 'Add Row After' ),
                    isDisabled: ! selectedCell,
                    onClick: () => this.insertRow( 1 ),
                },
                {
                    icon: 'table-row-delete',
                    title: __( 'Delete Row' ),
                    isDisabled: ! selectedCell,
                    onClick: () => this.deleteRow(),
                },
                {
                    icon: 'table-col-before',
                    title: __( 'Add Column Before' ),
                    isDisabled: ! selectedCell,
                    onClick: () => this.insertColumn( 0 ),
                },
                {
                    icon: 'table-col-after',
                    title: __( 'Add Column After' ),
                    isDisabled: ! selectedCell,
                    onClick: () => this.insertColumn( 1 ),
                },
                {
                    icon: 'table-col-delete',
                    title: __( 'Delete Column' ),
                    isDisabled: ! selectedCell,
                    onClick: () => this.deleteColumn(),
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
                                        value: () => {
                                            if (!selectedCell) return null;

                                            const styles = AdvTable.parseStyles(body[selectedCell.rowIndex].cells[selectedCell.colIndex].styles);
                                            console.log(styles);
                                            if (styles) {
                                                return styles.backgroundColor;
                                            } else {
                                                return null;
                                            }
                                        },
                                        onChange: ( value ) => this.updateCellsStyles( { backgroundColor: value }, selectedCell ),
                                    },
                                ] }
                            />
                        </PanelBody>
                    </InspectorControls>
                    <table className={ className }>
                        <tbody>
                            {body.map( ( { cells }, rowIndex ) => (
                                <tr key={ rowIndex }>
                                    {cells.map( ( { content, styles, colSpan, rowSpan }, colIndex ) => {
                                        const isSelected = selectedCell
                                            && selectedCell.rowIndex === rowIndex
                                            && selectedCell.colIndex === colIndex;
                                        const cell = { rowIndex, colIndex };

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
                            { cells.map( ( { content, styles, colSpan }, colIndex ) => (
                                <RichText.Content
                                    tagName="td"
                                    value={ content }
                                    key={ colIndex }
                                    style={ styles }
                                    colSpan={ colSpan }
                                    data-styles={console.log(styles)}
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