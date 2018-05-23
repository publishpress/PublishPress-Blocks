const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { InspectorControls, BlockControls, RichText, MediaUpload, BlockAlignmentToolbar, ColorPalette } = wp.editor;
const { PanelBody, PanelColor, RangeControl, SelectControl, IconButton, Toolbar, DropdownMenu } = wp.components;

const tableBlockIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="2 2 22 22">
        <path d="M3 3v18h18V3H3zm8 16H5v-6h6v6zm0-8H5V5h6v6zm8 8h-6v-6h6v6zm0-8h-6V5h6v6z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
);

class AdvTable extends Component {
    constructor() {
        super( ...arguments );
        this.state = {
            editor: null,
            selectedCell: null,
            selectedCellBgColor: null,
            selectedCellTextColor: null,
            selectedCellBorderStyle: null,
            selectedCellBorderWidth: null,
            selectedCellPaddingTop: null,
            selectedCellPaddingRight: null,
            selectedCellPaddingBottom: null,
            selectedCellPaddingLeft: null,
        };

        this.handleSetup = this.handleSetup.bind( this );
    }

    static isTableSelected( editor ) {
        return editor.dom.getParent(
            editor.selection.getStart( true ),
            'table',
            editor.getBody().parentNode
        );
    }

    static selectFirstCell( editor ) {
        const cell = editor.getBody().querySelector( 'td,th' );
        if ( cell ) {
            cell.focus();
            editor.selection.select( cell, true );
            editor.selection.collapse( false );
        }
    }

    static execCommand( command ) {
        return ( editor ) => {
            if ( editor ) {
                if ( ! AdvTable.isTableSelected( editor ) ) {
                    AdvTable.selectFirstCell( editor );
                }
                editor.execCommand( command );
            }
        };
    }

    handleSetup( editor, isSelected ) {
        editor.on( 'init', () => {
            if (isSelected) {
                AdvTable.selectFirstCell( editor );
            }
        } );

        this.setState( { editor } );

        editor.on( 'nodeChange', () => {
            const selectedCell = editor.dom.getParent(editor.selection.getStart(), 'td');
            const selectedCellBgColor = editor.dom.getStyle( selectedCell, 'background-color' );
            const selectedCellTextColor = editor.dom.getStyle( selectedCell, 'color' );
            const selectedCellBorderStyle = editor.dom.getStyle( selectedCell, 'border-style' );
            let selectedCellBorderWidth = editor.dom.getStyle( selectedCell, 'border-width' ) || '1px' ;
            selectedCellBorderWidth = parseInt( selectedCellBorderWidth.replace( 'px', '' ) );
            let selectedCellPaddingTop = editor.dom.getStyle( selectedCell, 'padding-top' );
            let selectedCellPaddingRight = editor.dom.getStyle( selectedCell, 'padding-right' );
            let selectedCellPaddingBottom = editor.dom.getStyle( selectedCell, 'padding-bottom' );
            let selectedCellPaddingLeft = editor.dom.getStyle( selectedCell, 'padding-left' );
            if (selectedCellPaddingTop)
                selectedCellPaddingTop = selectedCellPaddingTop.replace( 'px', '' );
            if (selectedCellPaddingRight)
                selectedCellPaddingRight = selectedCellPaddingRight.replace( 'px', '' );
            if (selectedCellPaddingBottom)
                selectedCellPaddingBottom = selectedCellPaddingBottom.replace( 'px', '' );
            if (selectedCellPaddingLeft)
                selectedCellPaddingLeft = selectedCellPaddingLeft.replace( 'px', '' );

            return this.setState( {
                selectedCell,
                selectedCellBgColor,
                selectedCellTextColor,
                selectedCellBorderStyle,
                selectedCellBorderWidth,
                selectedCellPaddingTop,
                selectedCellPaddingRight,
                selectedCellPaddingBottom,
                selectedCellPaddingLeft,
            } )
        } );
    }

    render() {
        const { isSelected, attributes, setAttributes, className } = this.props;
        const { content, align } = attributes;
        const {
            editor,
            selectedCell,
            selectedCellBgColor,
            selectedCellTextColor,
            selectedCellBorderStyle,
            selectedCellBorderWidth,
            selectedCellPaddingTop,
            selectedCellPaddingRight,
            selectedCellPaddingBottom,
            selectedCellPaddingLeft,
        } = this.state;

        const TABLE_CONTROLS = [
            {
                icon: 'table-row-before',
                title: __( 'Add Row Before' ),
                onClick: AdvTable.execCommand( 'mceTableInsertRowBefore' ),
            },
            {
                icon: 'table-row-after',
                title: __( 'Add Row After' ),
                onClick: AdvTable.execCommand( 'mceTableInsertRowAfter' ),
            },
            {
                icon: 'table-row-delete',
                title: __( 'Delete Row' ),
                onClick: AdvTable.execCommand( 'mceTableDeleteRow' ),
            },
            {
                icon: 'table-col-before',
                title: __( 'Add Column Before' ),
                onClick: AdvTable.execCommand( 'mceTableInsertColBefore' ),
            },
            {
                icon: 'table-col-after',
                title: __( 'Add Column After' ),
                onClick: AdvTable.execCommand( 'mceTableInsertColAfter' ),
            },
            {
                icon: 'table-col-delete',
                title: __( 'Delete Column' ),
                onClick: AdvTable.execCommand( 'mceTableDeleteCol' ),
            },
            {
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="dashicon" width="20" height="20" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M15 21h2v-2h-2v2zm4-12h2V7h-2v2zM3 5v14c0 1.1.9 2 2 2h4v-2H5V5h4V3H5c-1.1 0-2 .9-2 2zm16-2v2h2c0-1.1-.9-2-2-2zm-8 20h2V1h-2v22zm8-6h2v-2h-2v2zM15 5h2V3h-2v2zm4 8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2z"/>
                    </svg>
                ),
                title: __( 'Merge Cells' ),
                onClick: AdvTable.execCommand( 'mceTableMergeCells' ),
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
                onClick: () => {
                    editor.dom.setStyles( selectedCell, {
                        'border-top-color': '#000',
                    } );
                },
            },
            {
                title: __( 'Border Right' ),
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M7 21h2v-2H7v2zM3 5h2V3H3v2zm4 0h2V3H7v2zm0 8h2v-2H7v2zm-4 8h2v-2H3v2zm8 0h2v-2h-2v2zm-8-8h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm8 8h2v-2h-2v2zm4-4h2v-2h-2v2zm4-10v18h2V3h-2zm-4 18h2v-2h-2v2zm0-16h2V3h-2v2zm-4 8h2v-2h-2v2zm0-8h2V3h-2v2zm0 4h2V7h-2v2z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                ),
                onClick: () => {
                    editor.dom.setStyles( selectedCell, {
                        'border-right-color': '#000',
                    } );
                },
            },
            {
                title: __( 'Border Bottom' ),
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M9 11H7v2h2v-2zm4 4h-2v2h2v-2zM9 3H7v2h2V3zm4 8h-2v2h2v-2zM5 3H3v2h2V3zm8 4h-2v2h2V7zm4 4h-2v2h2v-2zm-4-8h-2v2h2V3zm4 0h-2v2h2V3zm2 10h2v-2h-2v2zm0 4h2v-2h-2v2zM5 7H3v2h2V7zm14-4v2h2V3h-2zm0 6h2V7h-2v2zM5 11H3v2h2v-2zM3 21h18v-2H3v2zm2-6H3v2h2v-2z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                ),
                onClick: () => {
                    editor.dom.setStyles( selectedCell, {
                        'border-bottom-color': '#000',
                    } );
                },
            },
            {
                title: __( 'Border Left' ),
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M11 21h2v-2h-2v2zm0-4h2v-2h-2v2zm0-12h2V3h-2v2zm0 4h2V7h-2v2zm0 4h2v-2h-2v2zm-4 8h2v-2H7v2zM7 5h2V3H7v2zm0 8h2v-2H7v2zm-4 8h2V3H3v18zM19 9h2V7h-2v2zm-4 12h2v-2h-2v2zm4-4h2v-2h-2v2zm0-14v2h2V3h-2zm0 10h2v-2h-2v2zm0 8h2v-2h-2v2zm-4-8h2v-2h-2v2zm0-8h2V3h-2v2z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                ),
                onClick: () => {
                    editor.dom.setStyles( selectedCell, {
                        'border-left-color': '#000',
                    } );
                },
            },
            {
                title: __( 'Border All' ),
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M13 7h-2v2h2V7zm0 4h-2v2h2v-2zm4 0h-2v2h2v-2zM3 3v18h18V3H3zm16 16H5V5h14v14zm-6-4h-2v2h2v-2zm-4-4H7v2h2v-2z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                ),
                onClick: () => {
                    editor.dom.setStyles( selectedCell, {
                        'border-top-color': '#000',
                        'border-right-color': '#000',
                        'border-bottom-color': '#000',
                        'border-left-color': '#000',
                    } );
                },
            },
            {
                title: __( 'Border None' ),
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M7 5h2V3H7v2zm0 8h2v-2H7v2zm0 8h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm-8 0h2v-2H3v2zm0-4h2v-2H3v2zm0-4h2v-2H3v2zm0-4h2V7H3v2zm0-4h2V3H3v2zm8 8h2v-2h-2v2zm8 4h2v-2h-2v2zm0-4h2v-2h-2v2zm0 8h2v-2h-2v2zm0-12h2V7h-2v2zm-8 0h2V7h-2v2zm8-6v2h2V3h-2zm-8 2h2V3h-2v2zm4 16h2v-2h-2v2zm0-8h2v-2h-2v2zm0-8h2V3h-2v2z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                ),
                onClick: () => {
                    editor.dom.setStyles( selectedCell, {
                        'border-top-color': 'inherit',
                        'border-right-color': 'inherit',
                        'border-bottom-color': 'inherit',
                        'border-left-color': 'inherit',
                    } );
                },
            },
        ];

        return (
            <Fragment>
                <BlockControls>
                    <BlockAlignmentToolbar
                        value={ align }
                        onChange={ (value) => setAttributes( { align: value } ) }
                    />
                    <Toolbar>
                        <DropdownMenu
                            icon="editor-table"
                            label={ __( 'Edit table' ) }
                            controls={ TABLE_CONTROLS.map( ( control ) => ( {
                                ...control,
                                onClick: () => control.onClick( this.state.editor ),
                            } ) ) }
                        />
                        <MediaUpload
                            type="image"
                            onSelect={ ( media ) => editor.execCommand(
                                'mceInsertContent',
                                false,
                                `<img src="${media.url}" alt="${media.alt || media.filename}" />`
                            ) }
                            render={ ( { open } ) => {
                                return (
                                    <IconButton
                                        className="components-icon-button components-toolbar__control"
                                        icon="format-image"
                                        label={ __( 'Insert image' ) }
                                        onClick={ open }
                                    />
                                )
                            } }
                        />
                    </Toolbar>
                </BlockControls>
                <InspectorControls>
                    <PanelBody title={ __( 'Single Cell Settings' ) }>
                        <PanelColor title={ __( 'Background Color' ) } colorValue={ selectedCellBgColor } initialOpen={ false }>
                            <ColorPalette
                                value={ selectedCellBgColor }
                                onChange={ ( value ) => {
                                    editor.dom.setStyle( selectedCell, 'background-color', value || '' );
                                    this.setState( { selectedCellBgColor: value } );
                                } }
                            />
                        </PanelColor>
                        <PanelColor title={ __( 'Text Color' ) } colorValue={ selectedCellTextColor } initialOpen={ false }>
                            <ColorPalette
                                value={ selectedCellTextColor }
                                onChange={ ( value ) => {
                                    editor.dom.setStyle( selectedCell, 'color', value || '' );
                                    this.setState( { selectedCellTextColor: value } );
                                } }
                            />
                        </PanelColor>
                        <SelectControl
                            label={ __( 'Border Style' ) }
                            value={ selectedCellBorderStyle }
                            options={ [
                                { label: __( 'Solid' ), value: 'solid' },
                                { label: __( 'Dashed' ), value: 'dashed' },
                                { label: __( 'Dotted' ), value: 'dotted' },
                            ] }
                            onChange={ ( value ) => {
                                editor.dom.setStyle( selectedCell, 'border-style', value );
                                this.setState( { selectedCellBorderStyle: value } );
                            } }
                        />
                        <RangeControl
                            label={ __( 'Border width' ) }
                            value={ selectedCellBorderWidth }
                            min={ 1 }
                            max={ 10 }
                            onChange={ ( value ) => {
                                editor.dom.setStyle( selectedCell, 'border-width', value );
                                this.setState( { selectedCellBorderWidth: value } );
                            } }
                        />
                        <div className={ 'advgb-border-item-wrapper' }>
                            {BORDER_SELECT.map( ( item, index ) => (
                                <div className={ 'advgb-border-item' } key={ index }>
                                    <span title={ item.title }
                                          onClick={ item.onClick }
                                          className={ item.selected ? 'selected' : '' }
                                    >
                                        { item.icon }
                                    </span>
                                </div>
                            ) ) }
                        </div>
                        <PanelBody title={ __( 'Padding' ) } initialOpen={ false }>
                            <RangeControl
                                label={ __( 'Padding Top' ) }
                                min={ 0 }
                                max={ 50 }
                                value={ selectedCellPaddingTop }
                                onChange={ ( value ) => {
                                    editor.dom.setStyle( selectedCell, 'padding-top', value || '' );
                                    this.setState( { selectedCellPaddingTop: value || '' } );
                                } }
                                allowReset
                            />
                            <RangeControl
                                label={ __( 'Padding Right' ) }
                                min={ 0 }
                                max={ 50 }
                                value={ selectedCellPaddingRight }
                                onChange={ ( value ) => {
                                    editor.dom.setStyle( selectedCell, 'padding-right', value || '' );
                                    this.setState( { selectedCellPaddingRight: value || '' } );
                                } }
                                allowReset
                            />
                            <RangeControl
                                label={ __( 'Padding Bottom' ) }
                                min={ 0 }
                                max={ 50 }
                                value={ selectedCellPaddingBottom }
                                onChange={ ( value ) => {
                                    editor.dom.setStyle( selectedCell, 'padding-bottom', value || '' );
                                    this.setState( { selectedCellPaddingBottom: value || '' } );
                                } }
                                allowReset
                            />
                            <RangeControl
                                label={ __( 'Padding Left' ) }
                                min={ 0 }
                                max={ 50 }
                                value={ selectedCellPaddingLeft }
                                onChange={ ( value ) => {
                                    editor.dom.setStyle( selectedCell, 'padding-left', value || '' );
                                    this.setState( { selectedCellPaddingLeft: value || '' } );
                                } }
                                allowReset
                            />
                        </PanelBody>
                    </PanelBody>
                </InspectorControls>
                <RichText
                    tagName="table"
                    wrapperClassName={ className }
                    getSettings={ (settings) => ( {
                        ...settings,
                        plugins: (settings.plugins || [] ).concat( 'table' ),
                        table_tab_navigation: false,
                    } ) }
                    value={ content }
                    onSetup={ ( editor ) => this.handleSetup( editor, isSelected ) }
                    onChange={ ( value ) => setAttributes( { content: value } ) }
                />
            </Fragment>
        )
    }
}

registerBlockType( 'advgb/table', {
    title: __( 'Advanced Table' ),
    description: __( 'Advanced table block with more styles and functions.' ),
    icon: tableBlockIcon,
    category: 'formatting',
    keywords: [ __( 'table' ), __( 'cell' ), __( 'data' ) ],
    attributes: {
        content: {
            type: 'array',
            source: 'children',
            selector: 'table',
            default: [
                <tbody key="a">
                <tr><td><br /></td><td><br /></td></tr>
                <tr><td><br /></td><td><br /></td></tr>
                </tbody>,
            ],
        },
        align: {
            type: 'string',
        },
    },
    edit: AdvTable,
    save: function ( { attributes } ) {
        const { content, align } = attributes;
        return (
            <RichText.Content tagName="table" className={ 'advgb-table-frontend ' + (align ? `align${ align }` : '') } value={ content } />
        );
    },
    getEditWrapperProps( attributes ) {
        const { align } = attributes;
        if ( 'left' === align || 'right' === align || 'wide' === align || 'full' === align ) {
            return { 'data-align': align };
        }
    },
} );