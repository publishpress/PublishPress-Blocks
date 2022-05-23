const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { TreeSelect, SelectControl, FormTokenField, RangeControl } = wp.components;
const { pickBy, isUndefined } = lodash;
const { groupBy } = lodash;

/**
 * Returns terms in a tree form.
 *
 * @param {Array} flatTerms  Array of terms in flat format.
 *
 * @return {Array} Array of terms in tree format.
 */
function buildTermsTree( flatTerms  ) {
    const flatTermsWithParentAndChildren = flatTerms.map(( term ) => {
        return {
            children: [],
            parent: null,
            ...term,
        };
    });

    const termsByParent = groupBy( flatTermsWithParentAndChildren, 'parent' );
    if ( termsByParent.null && termsByParent.null.length ) {
        return flatTermsWithParentAndChildren;
    }
    const fillWithChildren = ( terms ) => {
        return terms.map( ( term ) => {
            const children = termsByParent[ term.id ];
            return {
                ...term,
                children:
                    children && children.length
                        ? fillWithChildren( children )
                        : [],
            };
        });
    };

    return fillWithChildren( termsByParent[ '0' ] || []);
}


function AuthorSelect({
                          label,
                          noOptionLabel,
                          authorList,
                          selectedAuthorId,
                          onChange,
                      }) {
    const termsTree = buildTermsTree(authorList);
    return (
        <TreeSelect
            {...{label, noOptionLabel, onChange}}
            tree={termsTree}
            selectedId={selectedAuthorId}
        />
    );
}



function CategorySelect({
                            label,
                            noOptionLabel,
                            categoriesList,
                            selectedCategoryId,
                            onChange,
                            ...props
                        }) {
    const termsTree = buildTermsTree(categoriesList);
    return (
        <TreeSelect
            {...{label, noOptionLabel, onChange}}
            tree={termsTree}
            selectedId={selectedCategoryId}
            {...props}
        />
    );
}


const DEFAULT_MIN_ITEMS = 1;
const DEFAULT_MAX_ITEMS = 100;
const PP_SERIES_POST_TYPES = typeof advgbBlocks.pp_series_post_types !== 'undefined' ? advgbBlocks.pp_series_post_types : [ 'post' ];

function AdvQueryControls({
                              categoriesList,
                              selectedCategoryId,
                              numberOfItems,
                              order,
                              orderBy,
                              postType,
                              maxItems = DEFAULT_MAX_ITEMS,
                              minItems = DEFAULT_MIN_ITEMS,
                              onCategoryChange,
                              onNumberOfItemsChange,
                              onOrderChange,
                              onOrderByChange,
                          }) {
    let orderParams = [
                    {
                        label: __('Created: Newest to oldest', 'advanced-gutenberg'),
                        value: 'date/desc',
                    },
                    {
                        label: __('Created: Oldest to newest', 'advanced-gutenberg'),
                        value: 'date/asc',
                    },
                    {
                        /* translators: label for ordering posts by title in ascending order */
                        label: __('A → Z', 'advanced-gutenberg'),
                        value: 'title/asc',
                    },
                    {
                        /* translators: label for ordering posts by title in descending order */
                        label: __('Z → A', 'advanced-gutenberg'),
                        value: 'title/desc',
                    },
                    {
                        label: __('Author', 'advanced-gutenberg') + ' ' + __('A → Z', 'advanced-gutenberg'),
                        value: 'author/asc',
                    },
                    {
                        label: __('Author', 'advanced-gutenberg') + ' ' + __('Z → A', 'advanced-gutenberg'),
                        value: 'author/desc',
                    },
                    {
                        label: __('Modified: Newest to oldest', 'advanced-gutenberg'),
                        value: 'modified/desc',
                    },
                    {
                        label: __('Modified: Oldest to newest', 'advanced-gutenberg'),
                        value: 'modified/asc',
                    },
                    {
                        label: __('Post ID Descending', 'advanced-gutenberg'),
                        value: 'id/desc',
                    },
                    {
                        label: __('Post ID Ascending', 'advanced-gutenberg'),
                        value: 'id/asc',
                    },
    ];

    // post and page supports more orderBy parameters
    if ( postType === 'post' || postType === 'page' ) {
        orderParams = _.union(orderParams, [
                    {
                        label: __('Randomize', 'advanced-gutenberg'),
                        value: 'rand/asc',
                    },
        ]);
    }

    // post support more orderBy parameters
    if ( postType === 'post' ) {
        orderParams = _.union(orderParams, [
                    {
                        label: __('Comments, decreasing order', 'advanced-gutenberg'),
                        value: 'comment_count/desc',
                    },
                    {
                        label: __('Comments, increasing order', 'advanced-gutenberg'),
                        value: 'comment_count/asc',
                    },
        ]);
    }

    if(
        typeof advgbBlocks.pp_series_active !== 'undefined' && parseInt(advgbBlocks.pp_series_active)
        && (postType === 'post' || postType === 'page')
        && PP_SERIES_POST_TYPES.includes( postType )
    ) {
        orderParams = _.union(orderParams, [
                    {
                        label: __('Series order', 'advanced-gutenberg'),
                        value: 'series_order/asc',
                    },
        ]);
    }

    return [
        onOrderChange && onOrderByChange && (
            <SelectControl
                key="query-controls-order-select"
                label={__('Order by', 'advanced-gutenberg')}
                value={`${orderBy}/${order}`}
                options={ orderParams }
                onChange={(value) => {
                    const [newOrderBy, newOrder] = value.split('/');
                    if (newOrder !== order) {
                        onOrderChange(newOrder);
                    }
                    if (newOrderBy !== orderBy) {
                        onOrderByChange(newOrderBy);
                    }
                }}
            />
        ),
        categoriesList && onCategoryChange && (
            <CategorySelect
                key="query-controls-category-select"
                categoriesList={categoriesList}
                label={__('Category', 'advanced-gutenberg')}
                noOptionLabel={__('All', 'advanced-gutenberg')}
                selectedCategoryId={selectedCategoryId}
                onChange={onCategoryChange}
            />
        ),
        onNumberOfItemsChange && (
            <RangeControl
                key="query-controls-range-control"
                label={__('Number of items', 'advanced-gutenberg')}
                value={numberOfItems}
                onChange={onNumberOfItemsChange}
                min={minItems}
                max={maxItems}
                required
            />
        ),
    ];
}

export default AdvQueryControls;
export { AuthorSelect };
