(function ( wpI18n, wpBlocks, wpElement, wpEditor, wpComponents ) {
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType, createBlock } = wpBlocks;
    const { InspectorControls, RichText, ColorPalette, BlockControls } = wpEditor;
    const { BaseControl, RangeControl, PanelBody, IconButton, Dashicon, Toolbar } = wpComponents;

    class AdvList extends Component {
        constructor() {
            super( ...arguments );

            this.getEditorSettings = this.getEditorSettings.bind( this );
            this.setupEditor = this.setupEditor.bind( this );
            this.setNextValues = this.setNextValues.bind( this );
        }

        componentWillMount() {
            const { attributes, setAttributes } = this.props;
            const currentBlockConfig = advgbDefaultConfig['advgb-list'];

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

        componentDidMount() {
            const { attributes, setAttributes, clientId } = this.props;

            if ( !attributes.id ) {
                setAttributes( {
                    id: 'advgblist-' + clientId
                } )
            }
        }

        getEditorSettings( editorSettings ) {
            return {
                ...editorSettings,
                plugins: ( editorSettings.plugins || [] ).concat( 'lists' ),
                lists_indent_on_tab: false,
            };
        }

        setupEditor( editor ) {
            // this checks for languages that do not typically have square brackets on their keyboards
            const lang = window.navigator.browserLanguage || window.navigator.language;
            const keyboardHasSqBracket = !/^(?:fr|nl|sv|ru|de|es|it)/.test( lang );

            if (keyboardHasSqBracket) {
                // keycode 219 = '[' and keycode 221 = ']'
                editor.shortcuts.add( 'meta+219', 'Decrease indent', 'Outdent' );
                editor.shortcuts.add( 'meta+221', 'Increase indent', 'Indent' );
            } else {
                editor.shortcuts.add( 'meta+shift+m', 'Decrease indent', 'Outdent' );
                editor.shortcuts.add( 'meta+m', 'Increase indent', 'Indent' );
            }

            this.editor = editor;
        }

        setNextValues( nextValues ) {
            this.props.setAttributes( { values: nextValues } );
        }

        render() {
            const listIcons = [
                { label: __( 'None' ), value: '' },
                { label: __( 'Pushpin' ), value: 'admin-post' },
                { label: __( 'Configuration' ), value: 'admin-generic' },
                { label: __( 'Flag' ), value: 'flag' },
                { label: __( 'Star' ), value: 'star-filled' },
                { label: __( 'Checkmark' ), value: 'yes' },
                { label: __( 'Minus' ), value: 'minus' },
                { label: __( 'Plus' ), value: 'plus' },
                { label: __( 'Play' ), value: 'controls-play' },
                { label: __( 'Arrow right' ), value: 'arrow-right-alt' },
                { label: __( 'X Cross' ), value: 'dismiss' },
                { label: __( 'Warning' ), value: 'warning' },
                { label: __( 'Help' ), value: 'editor-help' },
                { label: __( 'Info' ), value: 'info' },
                { label: __( 'Circle' ), value: 'marker' },
            ];
            const {
                attributes,
                isSelected,
                insertBlocksAfter,
                mergeBlocks,
                setAttributes,
                onReplace,
                className,
                clientId: blockID,
            } = this.props;
            const {
                id,
                values,
                icon,
                iconSize,
                iconColor,
                margin,
                padding,
                lineHeight,
                fontSize,
            } = attributes;
            const listClassName = [
                className,
                id,
                icon && 'advgb-list',
                icon && `advgb-list-${icon}`
            ].filter( Boolean ).join( ' ' );
            const size = typeof iconSize != 'undefined' ? parseInt(iconSize) : 16;
            const marg = typeof margin != 'undefined' ? parseInt(margin) : 2;
            const padd = typeof padding != 'undefined' ? parseInt(padding)*2 : 4;

            return (
                <Fragment>
                    <BlockControls>
                        <Toolbar>
                            <IconButton
                                label={ __( 'Refresh this list when it conflict with other lists styles' ) }
                                icon="update"
                                className="components-toolbar__control"
                                onClick={ () => setAttributes( { id: 'advgblist-' + blockID } ) }
                            />
                        </Toolbar>
                    </BlockControls>
                    <InspectorControls>
                        <PanelBody title={ __( 'Text Settings' ) } initialOpen={false}>
                            <RangeControl
                                label={ __( 'Text size' ) }
                                value={ fontSize || '' }
                                onChange={ ( size ) => setAttributes( { fontSize: size } ) }
                                min={ 10 }
                                max={ 100 }
                                beforeIcon="editor-textcolor"
                                allowReset
                            />
                        </PanelBody>
                        <PanelBody title={ __( 'Icon Settings' ) }>
                            <BaseControl label={ __( 'List icon' ) }>
                                <div className="advgb-icon-items-wrapper">
                                    { listIcons.map( (item, index) => (
                                        <div className="advgb-icon-item h20" key={ index }>
                                            <span onClick={ () => setAttributes( { icon: item.value } ) }
                                                  className={ [
                                                      item.value === icon && 'active',
                                                      item.value === '' && 'remove-icon',
                                                  ].filter( Boolean ).join( ' ' ) }
                                            >
                                                <Dashicon icon={item.value}/>
                                            </span>
                                        </div>
                                    ) ) }
                                </div>
                            </BaseControl>
                            {icon && (
                                <Fragment>
                                    <PanelBody
                                        title={ [
                                            __( 'Icon color' ),
                                            <span key="advgb-list-icon-color" className={ `dashicons dashicons-${icon}` } style={ { color: iconColor, marginLeft: '10px' } } />
                                        ] }
                                        initialOpen={ false }
                                    >
                                        <ColorPalette
                                            value={ iconColor }
                                            onChange={ ( value ) => setAttributes( { iconColor: value === undefined ? '#000' : value } ) }
                                        />
                                    </PanelBody>
                                    <RangeControl
                                        label={ __( 'Icon size' ) }
                                        value={ iconSize || '' }
                                        onChange={ ( size ) => setAttributes( { iconSize: size } ) }
                                        min={ 10 }
                                        max={ 100 }
                                        allowReset
                                    />
                                    <RangeControl
                                        label={ __( 'Line height' ) }
                                        value={ lineHeight || '' }
                                        onChange={ ( size ) => setAttributes( { lineHeight: size } ) }
                                        min={ 0 }
                                        max={ 100 }
                                        allowReset
                                    />
                                    <RangeControl
                                        label={ __( 'Margin' ) }
                                        value={ margin || '' }
                                        onChange={ ( size ) => setAttributes( { margin: size } ) }
                                        min={ 0 }
                                        max={ 100 }
                                        allowReset
                                    />
                                    <RangeControl
                                        label={ __( 'Padding' ) }
                                        value={ padding || '' }
                                        onChange={ ( size ) => setAttributes( { padding: size } ) }
                                        min={ 0 }
                                        max={ 100 }
                                        allowReset
                                    />
                                </Fragment>
                            ) }
                        </PanelBody>
                    </InspectorControls>
                    <RichText
                        multiline="li"
                        tagName="ul"
                        unstableGetSettings={ this.getEditorSettings }
                        unstableOnSetup={ this.setupEditor }
                        onChange={ this.setNextValues }
                        value={ values }
                        wrapperClassName="advgb-list-item"
                        className={ listClassName }
                        placeholder={__('Write advanced list…')}
                        onMerge={ mergeBlocks }
                        unstableOnSplit={
                            insertBlocksAfter ?
                                ( before, after, ...blocks ) => {
                                    if ( ! blocks.length ) {
                                        blocks.push( createBlock( 'core/paragraph' ) );
                                    }

                                    if ( after.length ) {
                                        blocks.push( createBlock( 'advgb/list', {
                                            ...attributes,
                                            values: after,
                                            id: undefined,
                                        } ) );
                                    }

                                    setAttributes( { values: before } );
                                    insertBlocksAfter( blocks );
                                } :
                                undefined
                        }
                        onRemove={ () => onReplace( [] ) }
                        isSelected={ isSelected }
                    />
                    <div>
                        <style>
                            {`.${id} li { font-size: ${fontSize}px; margin-left: ${size + padd}px }`}
                        </style>
                        {icon &&
                        <style>
                            {`.${id} li:before {
                                font-size: ${iconSize}px;
                                color: ${iconColor};
                                line-height: ${lineHeight}px;
                                margin: ${margin}px;
                                padding: ${padding}px;
                                margin-left: -${size + padd + marg}px
                            }`}
                        </style>
                        }
                    </div>
                </Fragment>
            )
        }
    }

    const listBlockIcon = (
        <svg height="20" viewBox="2 2 22 22" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    );

    const listBlockAttrs = {
        id: {
            type: 'string'
        },
        icon: {
            type: 'string'
        },
        iconSize: {
            type: 'number',
            default: 16,
        },
        iconColor: {
            type: 'string',
            default: '#000',
        },
        fontSize: {
            type: 'number',
            default: 16,
        },
        lineHeight: {
            type: 'number',
            default: 18,
        },
        margin: {
            type: 'number',
            default: 2,
        },
        padding: {
            type: 'number',
            default: 2,
        },
        values: {
            type: 'array',
            source: 'children',
            selector: 'ul',
            default: [],
        },
        changed: {
            type: 'boolean',
            default: false,
        },
    };

    registerBlockType( 'advgb/list', {
        title: __( 'Advanced List' ),
        description: __( 'List block with custom icons and styles.' ),
        icon: {
            src: listBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined,
        },
        category: 'common',
        keywords: [ __( 'list' ), __( 'icon' ) ],
        attributes: listBlockAttrs,
        transforms: {
            from: [
                {
                    type: 'block',
                    blocks: [ 'core/list' ],
                    transform: ( { values } ) => {
                        return createBlock( 'advgb/list', {
                            values: values,
                            icon: 'controls-play',
                            iconColor: '#ff0000',
                        } )
                    }
                }
            ],
            to: [
                {
                    type: 'block',
                    blocks: [ 'core/list' ],
                    transform: ( { values } ) => {
                        return createBlock( 'core/list', {
                            nodeName: 'UL',
                            values: values,
                        } )
                    }
                }
            ]
        },
        merge( attributes, attributesToMerge ) {
            const valuesToMerge = attributesToMerge.values || [];

            // Standard text-like block attribute.
            if ( attributesToMerge.content ) {
                valuesToMerge.push( attributesToMerge.content );
            }

            return {
                ...attributes,
                values: [
                    ...attributes.values,
                    ...valuesToMerge,
                ],
            };
        },
        edit: AdvList,
        save: function ( { attributes } ) {
            const {
                id,
                values,
                icon,
                iconSize,
                iconColor,
                margin,
                padding,
                lineHeight,
                fontSize,
            } = attributes;
            const listClassName = [
                id,
                icon && 'advgb-list',
                icon && `advgb-list-${icon}`
            ].filter( Boolean ).join( ' ' );

            const size = typeof iconSize != 'undefined' ? parseInt(iconSize) : 16;
            const marg = typeof margin != 'undefined' ? parseInt(margin) : 2;
            const padd = typeof padding != 'undefined' ? parseInt(padding)*2 : 4;

            return <div>
                <ul className={listClassName}>
                    {values}
                </ul>
                <style>
                    {`.${id} li { font-size: ${fontSize}px; margin-left: ${size + padd}px }`}
                </style>
                {icon &&
                <style>
                    {`.${id} li:before {
                            font-size: ${iconSize}px;
                            color: ${iconColor};
                            line-height: ${lineHeight}px;
                            margin: ${margin}px;
                            padding: ${padding}px;
                            margin-left: -${size + padd + marg}px;
                        }`}
                </style>
                }
            </div>
        },
        deprecated: [
            {
                attributes: listBlockAttrs,
                save: function ( { attributes } ) {
                    const {
                        id,
                        values,
                        icon,
                        iconSize,
                        iconColor,
                        margin,
                        padding,
                        lineHeight,
                        fontSize,
                    } = attributes;
                    const listClassName = [
                        id,
                        icon && 'advgb-list',
                        icon && `advgb-list-${icon}`
                    ].filter( Boolean ).join( ' ' );

                    return <div>
                        <ul className={listClassName}>
                            {values}
                        </ul>
                        <style>
                            {`.${id} li { font-size: ${fontSize}px }`}
                        </style>
                        {icon &&
                        <style>
                            {`.${id} li:before {
                            font-size: ${iconSize}px;
                            color: ${iconColor};
                            line-height: ${lineHeight}px;
                            margin: ${margin}px;
                            padding: ${padding}px;
                        }`}
                        </style>
                        }
                    </div>
                }
            }
        ]
    } );
})( wp.i18n, wp.blocks, wp.element, wp.editor, wp.components );