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
const MAX_CATEGORIES_SUGGESTIONS = 20;

function AdvQueryControls({
                              authorList,
                              selectedAuthorId,
                              categoriesList,
                              selectedCategoryId,
                              categorySuggestions,
                              selectedCategories,
                              numberOfItems,
                              order,
                              orderBy,
                              postType,
                              maxItems = DEFAULT_MAX_ITEMS,
                              minItems = DEFAULT_MIN_ITEMS,
                              onCategoryChange,
                              onAuthorChange,
                              onNumberOfItemsChange,
                              onOrderChange,
                              onOrderByChange,
                          }) {
    let orderParams = [
                    {
                        label: __('Created: Newest to oldest'),
                        value: 'date/desc',
                    },
                    {
                        label: __('Created: Oldest to newest'),
                        value: 'date/asc',
                    },
                    {
                        /* translators: label for ordering posts by title in ascending order */
                        label: __('A → Z'),
                        value: 'title/asc',
                    },
                    {
                        /* translators: label for ordering posts by title in descending order */
                        label: __('Z → A'),
                        value: 'title/desc',
                    },
                    {
                        label: __('Author') + ' ' + __('A → Z'),
                        value: 'author/asc',
                    },
                    {
                        label: __('Author') + ' ' + __('Z → A'),
                        value: 'author/desc',
                    },
                    {
                        label: __('Modified: Newest to oldest'),
                        value: 'modified/desc',
                    },
                    {
                        label: __('Modified: Oldest to newest'),
                        value: 'modified/asc',
                    },
                    {
                        label: __('Post ID Descending'),
                        value: 'id/desc',
                    },
                    {
                        label: __('Post ID Ascending'),
                        value: 'id/asc',
                    },
                    {
                        label: __('Randomize'),
                        value: 'rand/asc',
                    },
                    {
                        label: __('Menu Order'),
                        value: 'menu_order/asc',
                    },
    ];

    // post supports more orderBy parameters
    if ( postType === 'post' ) {
        orderParams = _.union(orderParams, [
                    {
                        label: __('Comments, decreasing order'),
                        value: 'comment_count/desc',
                    },
                    {
                        label: __('Comments, increasing order'),
                        value: 'comment_count/asc',
                    },
        ]);
    }

    return [
        onOrderChange && onOrderByChange && (
            <SelectControl
                key="query-controls-order-select"
                label={__('Order by')}
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
                label={__('Category')}
                noOptionLabel={__('All')}
                selectedCategoryId={selectedCategoryId}
                onChange={onCategoryChange}
            />
        ),
        onAuthorChange && (
            <AuthorSelect
                key="query-controls-author-select"
                authorList={authorList}
                label={__('Author')}
                noOptionLabel={__('All')}
                selectedAuthorId={selectedAuthorId}
                onChange={onAuthorChange}
            />
        ),
        onNumberOfItemsChange && (
            <RangeControl
                key="query-controls-range-control"
                label={__('Number of items')}
                value={numberOfItems}
                onChange={onNumberOfItemsChange}
                min={minItems}
                max={maxItems}
                required
            />
        ),
        categorySuggestions && onCategoryChange && (
            <FormTokenField
                key="query-controls-categories-select"
                label={__('Show content with these Categories')}
                value={
                    selectedCategories &&
                    selectedCategories.map((item) => ({
                        id: item.id,
                        value: item.name || item.value,
                    }))
                }
                suggestions={Object.keys(categorySuggestions)}
                onChange={onCategoryChange}
                maxSuggestions={MAX_CATEGORIES_SUGGESTIONS}
            />
        ),
    ];
}

export default AdvQueryControls;
