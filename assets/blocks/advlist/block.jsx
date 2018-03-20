const { __ } = wp.i18n;
const { Component } = wp.element;
const { registerBlockType, createBlock, InspectorControls, RichText, ColorPalette } = wp.blocks;
const { SelectControl, RangeControl, PanelBody, PanelColor } = wp.components;

class AdvList extends Component {
    constructor() {
        super( ...arguments );

        this.getEditorSettings = this.getEditorSettings.bind( this );
        this.setupEditor = this.setupEditor.bind( this );
        this.setNextValues = this.setNextValues.bind( this );
    }

    componentWillMount() {
        const { attributes, setAttributes, id } = this.props;

        if ( !attributes.id ) {
            setAttributes( {
                id: 'advgblist-' + id
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
            className
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

        return [
            isSelected &&(
                <InspectorControls key="advgb-list-controls">
                    <PanelBody title={ __( 'Text Settings' ) } initialOpen={false}>
                        <RangeControl
                            label={ __( 'Text size' ) }
                            value={ fontSize || '' }
                            onChange={ (size) => setAttributes( { fontSize: size } ) }
                            min={ 10 }
                            max={ 100 }
                            beforeIcon="editor-textcolor"
                            allowReset
                        />
                    </PanelBody>
                    <PanelBody title={ __( 'Icon Settings' ) }>
                        <SelectControl
                            label={ __( 'List icon' ) }
                            help={ __( 'Select an icon for styling' ) }
                            value={ icon }
                            options={ listIcons }
                            onChange={ ( icon ) => setAttributes( { icon: icon } ) }
                        />
                        {icon && ( [
                            <PanelColor
                                title={ __( 'Icon color' ) }
                                colorValue={ iconColor }
                                initialOpen={ false }
                            >
                                <ColorPalette
                                    value={ iconColor }
                                    onChange={ ( color ) => setAttributes( { iconColor: color } ) }
                                />
                            </PanelColor>,
                            <RangeControl
                                label={ __( 'Icon size' ) }
                                value={ iconSize || '' }
                                onChange={ (size) => setAttributes( { iconSize: size } ) }
                                min={ 10 }
                                max={ 100 }
                                beforeIcon={ icon }
                                allowReset
                            />,
                            <RangeControl
                                label={ __( 'Line height' ) }
                                value={ lineHeight || '' }
                                onChange={ (size) => setAttributes( { lineHeight: size } ) }
                                min={ 0 }
                                max={ 100 }
                                allowReset
                            />,
                            <RangeControl
                                label={ __( 'Margin' ) }
                                value={ margin || '' }
                                onChange={ (size) => setAttributes( { margin: size } ) }
                                min={ 0 }
                                max={ 100 }
                                allowReset
                            />,
                            <RangeControl
                                label={ __( 'Padding' ) }
                                value={ padding || '' }
                                onChange={ (size) => setAttributes( { padding: size } ) }
                                min={ 0 }
                                max={ 100 }
                                allowReset
                            />,
                        ] ) }
                    </PanelBody>
                </InspectorControls>
            ),
            <RichText
                multiline="li"
                key="advgb-list"
                tagName="ul"
                getSettings={ this.getEditorSettings }
                onSetup={ this.setupEditor }
                onChange={ this.setNextValues }
                value={ values }
                wrapperClassName="advgb-list-item"
                className={ listClassName }
                placeholder={__('Write advanced list…')}
                onMerge={ mergeBlocks }
                onSplit={
                    insertBlocksAfter ?
                        ( before, after, ...blocks ) => {
                            if ( ! blocks.length ) {
                                blocks.push( createBlock( 'core/paragraph' ) );
                            }

                            if ( after.length ) {
                                blocks.push( createBlock( 'advgb/list', {
                                    ...attributes,
                                    values: after,
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
        ]
    }
}

registerBlockType( 'advgb/list', {
    title: __( 'Advanced List' ),
    description: __( 'List block with custom icons and styles.' ),
    icon: 'feedback',
    category: 'common',
    keywords: [ __( 'list' ), __( 'icon' ) ],
    attributes: {
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
            default: 0,
        },
        padding: {
            type: 'number',
            default: 0,
        },
        values: {
            type: 'array',
            source: 'children',
            selector: 'ul',
            default: [],
        }
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

        return <div>
            <ul className={listClassName}>
                {values}
            </ul>
        </div>
    }
} );