const { __ } = wp.i18n;
const { Component } = wp.element;
const { registerBlockType, getBlockContent, createBlock, BlockControls, InspectorControls, ColorPalette, BlockAlignmentToolbar } = wp.blocks;
const { IconButton, Placeholder, Button, Toolbar, ToggleControl, PanelBody, PanelColor } = wp.components;
const { select, dispatch } = wp.data;
const { addFilter } = wp.hooks;

const blockIcon = 'list-view';
const blockTitle = __( 'Summary' );

// Add button to insert summary inside table of contents component
( function () {
    jQuery( document ).ready( function ( $ ) {
        if (typeof dispatch( 'core/editor' ) === 'undefined') {
            return false;
        }

        const { insertBlock } = dispatch( 'core/editor' );
        const summaryBlock = createBlock( 'advgb/summary' );

        $( '.gutenberg #editor' ).find( '.table-of-contents' ).click( function () {
            const allBlocks = select( 'core/editor' ).getBlocks();
            const summaryBlockExist = !!allBlocks.filter( ( block ) => ( block.name === 'advgb/summary' ) ).length;
            setTimeout( function () {
                const summaryButton = $(
                    '<button class="button" style="position: absolute; bottom: 10px; right: 15px">'
                        + __( 'Insert Summary' ) +
                    '</button>'
                );

                $( '.gutenberg #editor' ).find( '.table-of-contents__popover' ).find( '.document-outline' )
                    .append( summaryButton );
                summaryButton.unbind( 'click' ).click( function () {
                    insertBlock( summaryBlock, 0 );
                    $('.table-of-contents__popover').hide();
                } );

                if (summaryBlockExist) {
                    summaryButton.prop( 'disabled', true );
                }
            }, 100 )
        } )
    } );
} )();

// Add notice for user to refresh summary if manually change heading anchor
addFilter( 'blocks.BlockEdit', 'advgb/addHeadingNotice', function ( BlockEdit ) {
    return ( props ) => {
        const { isSelected, name: blockType, attributes } = props;

        return ( [
            <BlockEdit key="block-edit-summary" {...props} />,
            isSelected && blockType === 'core/heading' && attributes.nodeName !== 'H1' &&
            <InspectorControls key="advgb-summary-controls-hint">
                <p style={{ color: 'red', fontStyle: 'italic' }}>
                    {__( 'After manually changing the anchor, remember to refresh summary block to make the links work!' )}
                </p>
            </InspectorControls>,
        ] )
    }
} );

class SummaryBlock extends Component {
    constructor() {
        super( ...arguments );
        this.updateSummary = this.updateSummary.bind( this );
    }

    componentWillMount() {
        this.updateSummary();
    };

    updateSummary() {
        let headingDatas = [];
        const allBlocks = select( 'core/editor' ).getBlocks();
        const headingBlocks = allBlocks.filter( ( block ) => ( block.name === 'core/heading' ) );
        headingBlocks.map( ( heading ) => {
            let thisHead = {};
            thisHead[ 'level' ] = parseInt( heading.attributes.nodeName.replace( /h/gi, '' ) );

            // We only get heading from h2
            if (thisHead[ 'level' ] > 1) {
                thisHead[ 'level' ] -= 1;
                thisHead[ 'content' ] = heading.attributes.content.length
                    ? getBlockContent( heading ).replace( /<(?:.|\n)*?>/gm, '' )
                    : '';
                thisHead[ 'uid' ] = heading.uid;
                if (heading.attributes.anchor) {
                    thisHead[ 'anchor' ] = heading.attributes.anchor;
                } else {
                    // Generate a random anchor for headings without it
                    thisHead[ 'anchor' ] = 'advgb-toc-' + heading.uid;
                    heading.attributes.anchor = thisHead[ 'anchor' ];
                }

                headingDatas.push( thisHead );
            }

            return heading;
        } );

        this.props.setAttributes( {
            headings: headingDatas
        } );
    }

    render() {
        const { attributes, isSelected, setAttributes } = this.props;
        const { headings, loadMinimized, anchorColor, align } = attributes;

        // No heading blocks
        let summaryContent = (
            <Placeholder
                key="summary-placeholder"
                icon={blockIcon}
                label={blockTitle}
                instructions={__( 'Your current post/page has no headings. Try add some headings and update this block later' )}
            >
                <Button onClick={this.updateSummary}
                        className={'button'}
                >
                    {__( 'Update' )}
                </Button>
            </Placeholder>
        );

        // Having heading blocks
        if (headings.length > 0) {
            const { selectBlock } = dispatch( 'core/editor' );
            summaryContent = (
                <ul className={'advgb-toc'} key="summary-toc">
                    {headings.map( ( heading ) => {
                        return (
                            <li className={'toc-level-' + heading.level}
                                style={{ marginLeft: heading.level * 20 }}
                                key={heading.anchor}
                            >
                                <a href={'#' + heading.anchor}
                                   onClick={() => selectBlock( heading.uid )}
                                >
                                    {heading.content}
                                </a>
                            </li>
                        )
                    } )}
                </ul>
            )
        }

        return [
            isSelected && !!headings.length && (
                <BlockControls key={'summary-controls'}>
                    <BlockAlignmentToolbar value={ align } onChange={ ( align ) => setAttributes( { align: align } ) } />
                    <Toolbar>
                        <IconButton className={'components-icon-button components-toolbar__control'}
                                    icon={'update'}
                                    label={__( 'Update Summary' )}
                                    onClick={this.updateSummary}
                        />
                    </Toolbar>
                </BlockControls>
            ),
            isSelected && (
                <InspectorControls key="summary-inspector">
                    <PanelBody title={ __( 'Summary settings' ) } >
                        <ToggleControl
                            label={ __( 'Load minimized' ) }
                            checked={ !!loadMinimized }
                            onChange={ () => setAttributes( { loadMinimized: !loadMinimized, postTitle: select('core/editor').getDocumentTitle() } ) }
                        />
                        <PanelColor title={ __('Anchor color') } colorValue={anchorColor} initialOpen={false} >
                            <ColorPalette
                                value={anchorColor}
                                onChange={ (value) => setAttributes( { anchorColor: value } ) }
                            />
                        </PanelColor>
                    </PanelBody>
                </InspectorControls>
            ),
            summaryContent,
            anchorColor && <style key="summary-style">
                {`.advgb-toc li a {
                    color: ${anchorColor};
                }`}
            </style>
        ]
    }
}

registerBlockType( 'advgb/summary', {
    title: blockTitle,
    description: __( 'Show the table of content of current post/page.' ),
    icon: blockIcon,
    category: 'formatting',
    keywords: [ __( 'summary' ), __( 'table of content' ), __( 'list' ) ],
    attributes: {
        headings: {
            type: 'array',
            default: [],
        },
        loadMinimized: {
            type: 'boolean',
            default: false,
        },
        anchorColor: {
            type: 'string',
        },
        align: {
            type: 'string',
            default: 'none',
        },
        postTitle: {
            type: 'string',
        }
    },
    useOnce: true,
    edit: SummaryBlock,
    save: ( { attributes } ) => {
        const { headings, loadMinimized, anchorColor, align, postTitle } = attributes;
        // No heading blocks
        if (headings.length < 1) {
            return null;
        }

        const summary = (
            <ul className={`advgb-toc align${align}`} style={ loadMinimized && { display: 'none' } }>
                {headings.map( ( heading, index ) => {
                    return (
                        <li className={'toc-level-' + heading.level}
                            key={`summary-save-${index}`}
                            style={{ marginLeft: heading.level * 20 }}
                        >
                            <a href={'#' + heading.anchor}>{heading.content}</a>
                        </li>
                    )
                } )}
                { anchorColor &&
                    <style>
                        {`.advgb-toc li a {
                            color: ${anchorColor};
                        }`}
                    </style>
                }
            </ul>
        );

        if ( loadMinimized ) {
            return (
                <div className={`align${align}`}>
                    <div className={'advgb-toc-header collapsed'}>{ postTitle }</div>
                    {summary}
                </div>
            );
        }

        return summary;
    },
    getEditWrapperProps( attributes ) {
        const { align } = attributes;
        const props = { 'data-resized': true };

        if ( 'left' === align || 'right' === align || 'center' === align ) {
            props[ 'data-align' ] = align;
        }

        return props;
    },
} );