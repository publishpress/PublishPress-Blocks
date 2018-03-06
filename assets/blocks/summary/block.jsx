const { __ } = wp.i18n;
const { registerBlockType, BlockControls, Toolbar } = wp.blocks;
const { Component } = wp.element;
const { IconButton, Placeholder, Button } = wp.components;
const { select } = wp.data;

const blockIcon = 'list-view';
const blockTitle = __('Summary');

class SummaryBlock extends Component {
    constructor() {
        super(...arguments);
        this.updateSummary = this.updateSummary.bind(this);
    }

    componentWillMount() {
        if (this.props.attributes.headings.length < 1) {
            this.updateSummary();
        }
    };

    updateSummary() {
        let headingDatas = [];
        const allBlocks = select('core/editor').getBlocks();
        const headingBlocks = allBlocks.filter((block) => (block.name === 'core/heading'));
        headingBlocks.map((heading) => {
            let thisHead = {};
            thisHead['level'] = parseInt(heading.attributes.nodeName.replace(/h/gi, ''));
            thisHead['content'] = heading.attributes.content.length ? heading.attributes.content[0] : '';
            thisHead['uid'] = heading.uid;
            if (heading.attributes.anchor) {
                thisHead['anchor'] = heading.attributes.anchor;
            } else {
                // Generate a random anchor for headings without it
                thisHead['anchor'] = 'advgb-toc-' + heading.uid;
                heading.attributes.anchor = thisHead['anchor'];
            }

            // We only get heading from h2
            if (thisHead['level'] > 1) {
                thisHead['level'] -= 1;
                headingDatas.push(thisHead);
            }

            return heading;
        });

        this.props.setAttributes({
            headings: headingDatas
        });
    }

    render() {
        const { attributes, isSelected } = this.props;
        const { headings } = attributes;

        let summaryContent = (
            <Placeholder
                icon={blockIcon}
                label={blockTitle}
                instructions={__('Your current post/page has no headings. Try add some headings and update this block later')}
            >
                <Button onClick={this.updateSummary}
                        className={'button'}
                >
                    {__('Update')}
                </Button>
            </Placeholder>
        );

        // No heading blocks
        if (headings.length > 0) {
            summaryContent = (
                <ul className={'advgb-toc'}>
                    {headings.map((heading) => {
                        return (
                            <li className={'toc-level-' + heading.level}
                                style={{marginLeft: heading.level * 20}}
                            >
                                <a href={'#' + heading.anchor}>{heading.content}</a>
                            </li>
                        )
                    })}
                </ul>
            )
        }

        return [
            isSelected && !!headings.length && (
                <BlockControls>
                    <Toolbar>
                        <IconButton className={'components-icon-button components-toolbar__control'}
                                    icon={'update'}
                                    label={__('Update Summary')}
                                    onClick={this.updateSummary}
                        />
                    </Toolbar>
                </BlockControls>
            ),
            summaryContent
        ]
    }
}

registerBlockType('advgb/summary', {
    title: blockTitle,
    description: __('Show the table of content of current post/page.'),
    icon: blockIcon,
    category: 'formatting',
    keywords: [ __('summary', 'table of content', 'content', 'list') ],
    attributes: {
        headings: {
            type: 'array',
            default: []
        }
    },
    edit: SummaryBlock,
    save: ( { attributes } ) => {
        const { headings } = attributes;
        // No heading blocks
        if (headings.length < 1) {
            return null;
        }

        return (
            <ul className={'advgb-toc'}>
                {headings.map((heading) => {
                    return (
                        <li className={'toc-level-' + heading.level}
                            style={{marginLeft: heading.level * 20}}
                        >
                            <a href={'#' + heading.anchor}>{heading.content}</a>
                        </li>
                    )
                })}
            </ul>
        )
    },
});