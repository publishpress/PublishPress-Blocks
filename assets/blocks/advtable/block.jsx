(function ( wpI18n, wpBlocks, wpElement, wpEditor, wpComponents ) {
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType, createBlock } = wpBlocks;
    const { InspectorControls, BlockControls, RichText, MediaUpload, BlockAlignmentToolbar, ColorPalette } = wpEditor;
    const { PanelBody, PanelColor, BaseControl, RangeControl, SelectControl, IconButton, Toolbar, DropdownMenu, Tooltip } = wpComponents;

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
                editor: null,
                selectedCell: null,
                selectedCellBgColor: null,
                selectedCellTextColor: null,
                selectedCellBorderColor: null,
                selectedCellBorderStyle: '',
                selectedCellBorderWidth: '',
                selectedCellPaddingTop: '',
                selectedCellPaddingRight: '',
                selectedCellPaddingBottom: '',
                selectedCellPaddingLeft: '',
                selectedCellTextAlign: null,
                selectedCellVerticalAlign: null,
            };

            this.handleSetup = this.handleSetup.bind( this );
        }

        componentWillMount() {
            const { attributes, setAttributes } = this.props;
            const currentBlockConfig = advgbDefaultConfig['advgb-table'];

            // No override attributes of blocks inserted before
            if (attributes.changed !== true) {
                if (currentBlockConfig !== undefined && typeof currentBlockConfig === 'object') {
                    Object.keys(currentBlockConfig).map((attribute)=>{
                        attributes[attribute] = currentBlockConfig[attribute];
                    });

                    // Finally set changed attribute to true, so we don't modify anything again
                    setAttributes( { changed: true } );
                }
            }
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
                const selectedCellBorderColor = editor.dom.getAttrib( selectedCell, 'data-border-color' );
                const selectedCellBorderStyle = editor.dom.getStyle( selectedCell, 'border-style' ) || 'solid';
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
                const selectedCellTextAlign = editor.dom.getStyle( selectedCell, 'text-align' );
                const selectedCellVerticalAlign = editor.dom.getStyle( selectedCell, 'vertical-align' );

                return this.setState( {
                    selectedCell,
                    selectedCellBgColor,
                    selectedCellTextColor,
                    selectedCellBorderColor,
                    selectedCellBorderStyle,
                    selectedCellBorderWidth,
                    selectedCellPaddingTop,
                    selectedCellPaddingRight,
                    selectedCellPaddingBottom,
                    selectedCellPaddingLeft,
                    selectedCellTextAlign,
                    selectedCellVerticalAlign,
                } )
            } );
        }

        render() {
            const { isSelected, attributes, setAttributes, className } = this.props;
            const { content, align, maxWidth } = attributes;
            const {
                editor,
                selectedCell,
                selectedCellBgColor,
                selectedCellTextColor,
                selectedCellBorderColor,
                selectedCellBorderStyle,
                selectedCellBorderWidth,
                selectedCellPaddingTop,
                selectedCellPaddingRight,
                selectedCellPaddingBottom,
                selectedCellPaddingLeft,
                selectedCellTextAlign,
                selectedCellVerticalAlign,
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
                            'border-top-color': selectedCellBorderColor,
                        } );
                        editor.undoManager.add();
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
                            'border-right-color': selectedCellBorderColor,
                        } );
                        editor.undoManager.add();
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
                            'border-bottom-color': selectedCellBorderColor,
                        } );
                        editor.undoManager.add();
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
                            'border-left-color': selectedCellBorderColor,
                        } );
                        editor.undoManager.add();
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
                            'border-top-color': selectedCellBorderColor,
                            'border-right-color': selectedCellBorderColor,
                            'border-bottom-color': selectedCellBorderColor,
                            'border-left-color': selectedCellBorderColor,
                        } );
                        editor.undoManager.add();
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
                            'border-top-color': '',
                            'border-right-color': '',
                            'border-bottom-color': '',
                            'border-left-color': '',
                        } );
                        editor.undoManager.add();
                    },
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
                        <PanelBody title={ __( 'Single Cell Settings' ) }>
                            <PanelColor title={ __( 'Background Color' ) } colorValue={ selectedCellBgColor } initialOpen={ false }>
                                <ColorPalette
                                    value={ selectedCellBgColor }
                                    onChange={ ( value ) => {
                                        editor.dom.setStyle( selectedCell, 'background-color', value || '' );
                                        editor.undoManager.add();
                                        this.setState( { selectedCellBgColor: value } );
                                    } }
                                />
                            </PanelColor>
                            <PanelColor title={ __( 'Text Color' ) } colorValue={ selectedCellTextColor } initialOpen={ false }>
                                <ColorPalette
                                    value={ selectedCellTextColor }
                                    onChange={ ( value ) => {
                                        editor.dom.setStyle( selectedCell, 'color', value || '' );
                                        editor.undoManager.add();
                                        this.setState( { selectedCellTextColor: value } );
                                    } }
                                />
                            </PanelColor>
                            <PanelBody title={ __( 'Border' ) } initialOpen={ false }>
                                <SelectControl
                                    label={ __( 'Border Style' ) }
                                    value={ selectedCellBorderStyle }
                                    options={ [
                                        { label: __( 'Solid' ), value: 'solid' },
                                        { label: __( 'Dashed' ), value: 'dashed' },
                                        { label: __( 'Dotted' ), value: 'dotted' },
                                        { label: __( 'None' ), value: 'none' },
                                    ] }
                                    onChange={ ( value ) => {
                                        editor.dom.setStyle( selectedCell, 'border-style', value );
                                        editor.undoManager.add();
                                        this.setState( { selectedCellBorderStyle: value } );
                                    } }
                                />
                                <PanelColor title={ __( 'Border Color' ) } colorValue={ selectedCellBorderColor } initialOpen={ false }>
                                    <ColorPalette
                                        value={ selectedCellBorderColor }
                                        onChange={ (value) => {
                                            editor.dom.setAttrib( selectedCell, 'data-border-color', value || '' );
                                            [ 'top', 'right', 'bottom', 'left' ].map( function ( pos ) {
                                                if (editor.dom.getStyle( selectedCell, `border-${pos}-color` ))
                                                    editor.dom.setStyle( selectedCell, `border-${pos}-color`, value || '' );
                                            } );
                                            editor.undoManager.add();
                                            this.setState( { selectedCellBorderColor: value } );
                                        } }
                                    />
                                </PanelColor>
                                <RangeControl
                                    label={ __( 'Border width' ) }
                                    value={ selectedCellBorderWidth }
                                    min={ 1 }
                                    max={ 10 }
                                    onChange={ ( value ) => {
                                        editor.dom.setStyle( selectedCell, 'border-width', value );
                                        editor.undoManager.add();
                                        this.setState( { selectedCellBorderWidth: value } );
                                    } }
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
                            <PanelBody title={ __( 'Padding' ) } initialOpen={ false }>
                                <RangeControl
                                    label={ __( 'Padding Top' ) }
                                    min={ 0 }
                                    max={ 50 }
                                    value={ selectedCellPaddingTop }
                                    onChange={ ( value ) => {
                                        editor.dom.setStyle( selectedCell, 'padding-top', value || '' );
                                        editor.undoManager.add();
                                        this.setState( { selectedCellPaddingTop: value || '' } );
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
                                        editor.undoManager.add();
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
                                        editor.undoManager.add();
                                        this.setState( { selectedCellPaddingLeft: value || '' } );
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
                                        editor.undoManager.add();
                                        this.setState( { selectedCellPaddingRight: value || '' } );
                                    } }
                                    allowReset
                                />
                            </PanelBody>
                            <PanelBody title={ __( 'Text Alignment' ) } initialOpen={ false }>
                                <BaseControl label={ __( 'Horizontal Align' ) }>
                                    <Toolbar
                                        controls={ HORZ_ALIGNMENT_CONTROLS.map( ( control ) => {
                                            const isActive = ( selectedCellTextAlign === control.align );

                                            return {
                                                ...control,
                                                isActive,
                                                onClick: () => {
                                                    editor.dom.setStyle( selectedCell, 'text-align', isActive ? '' : control.align );
                                                    editor.undoManager.add();
                                                },
                                            };
                                        } ) }
                                    />
                                </BaseControl>
                                <BaseControl label={ __( 'Vertical Align' ) }>
                                    <Toolbar
                                        controls={ VERT_ALIGNMENT_CONTROLS.map( ( control ) => {
                                            const isActive = ( selectedCellVerticalAlign === control.align );

                                            return {
                                                ...control,
                                                isActive,
                                                onClick: () => {
                                                    editor.dom.setStyle( selectedCell, 'vertical-align', isActive ? '' : control.align );
                                                    editor.undoManager.add();
                                                },
                                            };
                                        } ) }
                                    />
                                </BaseControl>
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
                        style={ { maxWidth: !!maxWidth && maxWidth + 'px' } }
                    />
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
            maxWidth: {
                type: 'number',
                default: 0
            },
            changed: {
                type: 'boolean',
                default: false,
            },
        },
        edit: AdvTable,
        save: function ( { attributes } ) {
            const { content, align, maxWidth } = attributes;
            return (
                <RichText.Content
                    tagName="table"
                    className={ 'advgb-table-frontend ' + (align ? `align${ align }` : '') }
                    style={ { maxWidth: !!maxWidth ? maxWidth + 'px' : undefined } }
                    value={ content }
                />
            );
        },
        getEditWrapperProps( attributes ) {
            const { align } = attributes;
            if ( 'left' === align || 'right' === align || 'wide' === align || 'full' === align ) {
                return { 'data-align': align };
            }
        },
        transforms: {
            from: [
                {
                    type: 'block',
                    blocks: [ 'core/table' ],
                    transform: ( blockAttributes ) => {
                        return createBlock( 'advgb/table', { ...blockAttributes } );
                    },
                },
            ],
        }
    } );
})( wp.i18n, wp.blocks, wp.element, wp.editor, wp.components );