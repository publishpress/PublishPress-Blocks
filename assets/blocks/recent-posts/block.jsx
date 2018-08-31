(function ( wpI18n, wpBlocks, wpElement, wpEditor, wpComponents, wpData, lodash ) {
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InspectorControls, BlockControls } = wpEditor;
    const { PanelBody, RangeControl, ToggleControl, QueryControls, Spinner, Toolbar, Placeholder } = wpComponents;
    const { withSelect } = wpData;
    const { pickBy, isUndefined } = lodash;

    const advRecentPostsBlockIcon = (
        <svg width="20" height="20" viewBox="2 2 22 22">
            <path fill="none" d="M0,0h24v24H0V0z"/>
            <rect x="13" y="7.5" width="5" height="2"/>
            <rect x="13" y="14.5" width="5" height="2"/>
            <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V5h14V19z"/>
            <path d="M11,6H6v5h5V6z M10,10H7V7h3V10z"/>
            <path d="M11,13H6v5h5V13z M10,17H7v-3h3V17z"/>
        </svg>
    );

    class RecentPostsEdit extends Component {
        constructor() {
            super( ...arguments );
        }

        render() {
            const { attributes, setAttributes, recentPosts, categoriesList } = this.props;
            const {
                postView,
                order,
                orderBy,
                category,
                numberOfPosts,
                columns,
                displayFeaturedImage,
                displayAuthor,
                displayDate,
                displayExcerpt,
                displayReadMore,
            } = attributes;

            const inspectorControls = (
                <InspectorControls>
                    <PanelBody title={ __( 'Block Settings' ) }>
                        <QueryControls
                            { ...{ order, orderBy } }
                            categoriesList={ categoriesList }
                            selectedCategoryId={ category }
                            numberOfItems={ numberOfPosts }
                            onOrderChange={ ( value ) => setAttributes( { order: value } ) }
                            onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
                            onCategoryChange={ ( value ) => setAttributes( { category: value !== '' ? value : undefined } ) }
                            onNumberOfItemsChange={ (value) => setAttributes( { numberOfPosts: value } ) }
                        />
                        {postView === 'grid' &&
                            <RangeControl
                                label={ __( 'Columns' ) }
                                value={ columns }
                                min={ 1 }
                                max={ 4 }
                                onChange={ (value) => setAttributes( { columns: value } ) }
                            />
                        }
                        <ToggleControl
                            label={ __( 'Display Featured Image' ) }
                            checked={ displayFeaturedImage }
                            onChange={ () => setAttributes( { displayFeaturedImage: !displayFeaturedImage } ) }
                        />
                        <ToggleControl
                            label={ __( 'Display Post Author' ) }
                            checked={ displayAuthor }
                            onChange={ () => setAttributes( { displayAuthor: !displayAuthor } ) }
                        />
                        <ToggleControl
                            label={ __( 'Display Post Date' ) }
                            checked={ displayDate }
                            onChange={ () => setAttributes( { displayDate: !displayDate } ) }
                        />
                        <ToggleControl
                            label={ __( 'Display Post Excerpt' ) }
                            checked={ displayExcerpt }
                            onChange={ () => setAttributes( { displayExcerpt: !displayExcerpt } ) }
                        />
                        <ToggleControl
                            label={ __( 'Display Read More Link' ) }
                            checked={ displayReadMore }
                            onChange={ () => setAttributes( { displayReadMore: !displayReadMore } ) }
                        />
                    </PanelBody>
                </InspectorControls>
            );

            const hasPosts = Array.isArray( recentPosts ) && recentPosts.length;

            // If no posts found we show this notice
            if (!hasPosts) {
                return (
                    <Fragment>
                        { inspectorControls }
                        <Placeholder
                            icon={ advRecentPostsBlockIcon }
                            label={ __( 'ADVGB Recent Posts Block' ) }
                        >
                            { ! Array.isArray( recentPosts ) ?
                                <Spinner /> :
                                __( 'No posts found! Try to change category or publish posts.' )
                            }
                        </Placeholder>
                    </Fragment>
                )
            }

            const postViewControls = [
                {
                    icon: 'grid-view',
                    title: __( 'Grid View' ),
                    onClick: () => setAttributes( { postView: 'grid' } ),
                    isActive: postView === 'grid',
                },
                {
                    icon: 'list-view',
                    title: __( 'List View' ),
                    onClick: () => setAttributes( { postView: 'list' } ),
                    isActive: postView === 'list',
                },
                {
                    icon: 'slides',
                    title: __( 'Slider View' ),
                    onClick: () => setAttributes( { postView: 'slider' } ),
                    isActive: postView === 'slider',
                },
            ];

            return (
                <Fragment>
                    { inspectorControls }
                    <BlockControls>
                        <Toolbar controls={ postViewControls } />
                    </BlockControls>
                    <div className={ 'advgb-recent-posts' }>
                        123
                    </div>
                </Fragment>
            )
        }
    }

    registerBlockType( 'advgb/recent-posts', {
        title: __( 'Recent Posts' ),
        description: __( 'Display your recent posts in slider or grid view with beautiful styles.' ),
        icon: {
            src: advRecentPostsBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined,
        },
        category: 'widgets',
        keywords: [ __( 'latest posts' ), __( 'posts slide' ), __( 'posts grid' ) ],
        edit: withSelect( ( select, props ) => {
            const { getEntityRecords } = select( 'core' );
            const { category, order, orderBy, numberOfPosts } = props.attributes;

            const recentPostsQuery = pickBy( {
                categories: category,
                order,
                orderby: orderBy,
                per_page: numberOfPosts,
            }, ( value ) => !isUndefined( value ) );

            const categoriesListQuery = {
                per_page: 100,
            };

            return {
                recentPosts: getEntityRecords( 'postType', 'post', recentPostsQuery ),
                categoriesList: getEntityRecords( 'taxonomy', 'category', categoriesListQuery ),
            }
        } )( RecentPostsEdit ),
        save: function () { // Render in PHP
            return null;
        },
    } )
})( wp.i18n, wp.blocks, wp.element, wp.editor, wp.components, wp.data, lodash );