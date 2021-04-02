import AdvQueryControls from './query-controls.jsx';

(function ( wpI18n, wpBlocks, wpElement, wpBlockEditor, wpComponents, wpData, lodash, wpHtmlEntities, wpDate ) {
    wpBlockEditor = wp.blockEditor || wp.editor;
    const { __ } = wpI18n;
    const { Component, Fragment, RawHTML } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InspectorControls, BlockControls } = wpBlockEditor;
    const { PanelBody, RangeControl, ToggleControl, TextControl, TextareaControl, FormTokenField, Spinner, ToolbarGroup, ToolbarButton, Placeholder, Tooltip, SelectControl } = wpComponents;
    const { withSelect } = wpData;
    const { pickBy, isUndefined } = lodash;
    const { decodeEntities } = wpHtmlEntities;
    const { dateI18n, __experimentalGetSettings } = wpDate;

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

    const previewImageData = 'data:image/png;base64,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';

    const FRONTPAGE_LAYOUTS = [
        { layout: '1-2', icon: '1-2', title: __( 'One leading post, the rest in 2 columns', 'advanced-gutenberg' ) },
        { layout: '1-3', icon: '1-3', title: __( 'One leading post, the rest in 3 columns', 'advanced-gutenberg' ) },
        { layout: '1-4', icon: '1-4', title: __( 'One leading post, the rest in 4 columns', 'advanced-gutenberg' ) },
        { layout: '1-5', icon: '1-5', title: __( 'One leading post, the rest in 5 columns', 'advanced-gutenberg' ) },
        { layout: 'stacked', icon: 'stacked', title: __( 'Stacked', 'advanced-gutenberg' ) },
        { layout: '2-2', icon: '2-2', title: __( 'All posts in 2 columns grid', 'advanced-gutenberg' ) },
        { layout: '3-3', icon: '3-3', title: __( 'All posts in 3 columns grid', 'advanced-gutenberg' ) },
        { layout: '4-4', icon: '4-4', title: __( 'All posts in 4 columns grid', 'advanced-gutenberg' ) },
        { layout: '5-5', icon: '5-5', title: __( 'All posts in 5 columns grid', 'advanced-gutenberg' ) },
    ];

    // @TODO fix duplicated code from FRONTPAGE_LAYOUTS
    const FRONTPAGE_LAYOUTS_TABLET = [
        { layout: '1-2', icon: '1-2', title: __( 'One leading post, the rest in 2 columns', 'advanced-gutenberg' ) },
        { layout: '1-3', icon: '1-3', title: __( 'One leading post, the rest in 3 columns', 'advanced-gutenberg' ) },
        { layout: '1-4', icon: '1-4', title: __( 'One leading post, the rest in 4 columns', 'advanced-gutenberg' ) },
        { layout: '1-5', icon: '1-5', title: __( 'One leading post, the rest in 5 columns', 'advanced-gutenberg' ) },
        { layout: 'stacked', icon: 'stacked', title: __( 'Stacked', 'advanced-gutenberg' ) },
        { layout: '2-2', icon: '2-2', title: __( 'All posts in 2 columns grid', 'advanced-gutenberg' ) },
        { layout: '3-3', icon: '3-3', title: __( 'All posts in 3 columns grid', 'advanced-gutenberg' ) },
        { layout: '4-4', icon: '4-4', title: __( 'All posts in 4 columns grid', 'advanced-gutenberg' ) },
        { layout: '5-5', icon: '5-5', title: __( 'All posts in 5 columns grid', 'advanced-gutenberg' ) },
    ];

    const FRONTPAGE_LAYOUTS_MOBILE = [
        { layout: '1-2', icon: '1-2', title: __( 'One leading post, the rest in 2 columns', 'advanced-gutenberg' ) },
        { layout: 'stacked', icon: 'stacked', title: __( 'Stacked', 'advanced-gutenberg' ) },
        { layout: '2-2', icon: '2-2', title: __( 'All posts in 2 columns grid', 'advanced-gutenberg' ) },
    ];

    const GAP_OPTIONS = [
        { label: __( 'None', 'advanced-gutenberg' ), value: 0},
        { label: '5px', value: 5 },
        { label: '10px', value: 10 },
        { label: '20px', value: 20 },
        { label: '30px', value: 30 },
        { label: '40px', value: 40 },
        { label: '50px', value: 50 },
    ];

    let initSlider = null;

    class RecentPostsEdit extends Component {
        constructor() {
            super( ...arguments );

            this.state = {
                categoriesList: [],
                tagsList: [],
                catIdVsName: [],
                tagNameVsId: [],
                postTypeList: [
                { label: __( 'Post' ), value: 'post' },
                { label: __( 'Page' ), value: 'page' },
                ],
                updating: false,
                tabSelected: 'desktop',
            }

            this.selectCategories = this.selectCategories.bind(this);
            this.selectTags = this.selectTags.bind(this);
            this.getTagIdsForTags = this.getTagIdsForTags.bind(this);
            this.getCategoryForBkwrdCompat = this.getCategoryForBkwrdCompat.bind(this);
        }

        componentWillMount() {
            const { attributes, setAttributes } = this.props;
            const currentBlockConfig = advgbDefaultConfig['advgb-recent-posts'];

            const tagsAndcategoriesListQuery = {
                per_page: -1,
                hide_empty: true,
            };

            // No override attributes of blocks inserted before
            if (attributes.changed !== true) {
                if (typeof currentBlockConfig === 'object' && currentBlockConfig !== null) {
                    Object.keys(currentBlockConfig).map((attribute) => {
                        if (typeof attributes[attribute] === 'boolean') {
                            attributes[attribute] = !!currentBlockConfig[attribute];
                        } else {
                            attributes[attribute] = currentBlockConfig[attribute];
                        }
                    });
                }

                // Finally set changed attribute to true, so we don't modify anything again
                setAttributes( { changed: true } );
            }

            wp.apiFetch( {
                path: wp.url.addQueryArgs( 'wp/v2/categories', tagsAndcategoriesListQuery ),
            } ).then( ( list ) => {
                let suggestions = [];
                let catIdVsName = [];
                list.forEach(cat => {
                    suggestions[ cat.name ] = cat;
                    catIdVsName[ cat.id ] = cat.name;
                });
                this.setState( { categoriesList: suggestions, catIdVsName: catIdVsName } );

                // for backward compatibility, extract the (single select) category and set it as the (mutli select) categories
                // and make the (single select) category empty
                const categories = attributes.category && attributes.category !== undefined && attributes.category.length > 0 ? [ this.getCategoryForBkwrdCompat( attributes.category ) ] : attributes.categories;
                setAttributes({
                      categories: categories,
                      category: ''
                });
            } );

            wp.apiFetch( {
                path: wp.url.addQueryArgs( 'wp/v2/tags', tagsAndcategoriesListQuery ),
            } ).then( ( list ) => {
                let suggestions = [];
                let tagNameVsId = [];
                list.forEach(tag => {
                    suggestions.push(tag.name);
                    tagNameVsId[ tag.name ] = tag.id;
                });

                this.setState( { tagsList: suggestions, tagNameVsId: tagNameVsId } );

                const tagIds = attributes.tags && attributes.tags.length > 0 ? this.getTagIdsForTags( attributes.tags ) : [];
                setAttributes({
                      tagIds: tagIds,
                });

            } );

            // migrate from displayDate to postDate
            let postDateDisplay = attributes.displayDate ? 'created' : attributes.postDate;
            setAttributes({
                  postDate: postDateDisplay,
                  displayDate: false,
            });

        }

        componentWillUpdate( nextProps ) {
            const { recentPosts: nextPosts } = nextProps;
            const { postView: nextView } = nextProps.attributes;
            const { attributes, clientId, recentPosts } = this.props;
            const $ = jQuery;

            if (nextView !== 'slider' || (nextPosts && recentPosts && nextPosts.length !== recentPosts.length) ) {
                $(`#block-${clientId} .advgb-recent-posts.slick-initialized`).slick('unslick');
                $(`#block-${clientId} .advgb-recent-post`)
                    .removeAttr('tabindex')
                    .removeAttr('role')
                    .removeAttr('aria-describedby');

                if (nextView === 'slider' && (nextPosts && recentPosts && nextPosts.length !== recentPosts.length)) {
                    if (!this.state.updating) {
                        this.setState( { updating: true } );
                    }
                }

                if (initSlider) {
                    clearTimeout(initSlider);
                }
            }
        }

        componentDidUpdate( prevProps ) {
            const that = this;
            const { attributes, clientId } = this.props;
            const { postView } = attributes;
            const $ = jQuery;

            if (postView === 'slider') {
                initSlider = setTimeout(function () {
                    $(`#block-${clientId} .advgb-recent-posts-block.slider-view .advgb-recent-posts:not(.slick-initialized)`).slick( {
                        dots: true,
                        adaptiveHeight: true,
                    } );

                    if (that.state.updating) {
                        that.setState( { updating: false } );
                    }
                }, 100 );
            } else {
                $(`#block-${clientId} .advgb-recent-posts.slick-initialized`).slick('unslick');
            }
        }

        render() {
            const { categoriesList, tagsList, postTypeList, tabSelected } = this.state;
            const { attributes, setAttributes, recentPosts } = this.props;
            const {
                postView,
                order,
                orderBy,
                numberOfPosts,
                columns,
                displayFeaturedImage,
                displayFeaturedImageFor,
                displayAuthor,
                displayDate,
                postDate,
                postDateFormat,
                displayTime,
                displayExcerpt,
                postTextAsExcerpt,
                postTextExcerptLength,
                displayReadMore,
                readMoreLbl,
                isPreview,
                categories,
                tags,
                frontpageLayout, frontpageLayoutT, frontpageLayoutM,
                gap,
                frontpageStyle,
                sliderStyle,
                excludeCurrentPost,
                showCategories,
                showTags,
                displayCommentCount,
                textAfterTitle,
                textBeforeReadmore,
            } = attributes;

            const isInPost = wp.data.select('core/editor').getCurrentPostType() === 'post';

            let postType = attributes.postType;
            if(postType === undefined){
                postType = 'post';
            }

            let deviceLetter = '';
            if (tabSelected === 'tablet') deviceLetter = 'T';
            if (tabSelected === 'mobile') deviceLetter = 'M';

            const inspectorControls = (
                <InspectorControls>
                    {postView === 'slider' &&
                    <PanelBody title={ __( 'Slider View Settings', 'advanced-gutenberg' ) }>
                        <SelectControl
                            label={ __( 'Style', 'advanced-gutenberg' ) }
                            value={ sliderStyle }
                            options={ [
                                { label: __( 'Default', 'advanced-gutenberg' ), value: 'default' },
                                { label: __( 'Headline', 'advanced-gutenberg' ), value: 'headline' },
                            ] }
                            onChange={ ( value ) => setAttributes( { sliderStyle: value } ) }
                        />
                    </PanelBody>
                    }
                    {postView === 'frontpage' &&
                    <PanelBody title={ __( 'Frontpage View Settings', 'advanced-gutenberg' ) }>
                        <div className="advgb-recent-posts-responsive-items">
                            {['desktop', 'tablet', 'mobile'].map( (device, index) => {
                                const itemClasses = [
                                    "advgb-recent-posts-responsive-item",
                                    tabSelected === device && 'is-selected',
                                ].filter( Boolean ).join( ' ' );

                                return (
                                    <div className={ itemClasses }
                                         key={ index }
                                         onClick={ () => this.setState( { tabSelected: device } ) }
                                    >
                                        {device}
                                    </div>
                                )
                            } ) }
                        </div>
                        <div className="advgb-recent-posts-select-layout on-inspector">
                            {tabSelected === 'desktop' && FRONTPAGE_LAYOUTS.map( (layout, index) => {
                                const layoutClasses = [
                                    'advgb-recent-posts-layout',
                                    tabSelected === 'desktop' && layout.layout === frontpageLayout && 'is-selected',
                                ].filter( Boolean ).join( ' ' );

                                return (
                                    <Tooltip text={ layout.title } key={ index }>
                                        <div
                                            className={ layoutClasses }
                                            onClick={ () => {
                                                setAttributes( {
                                                    ['frontpageLayout' + deviceLetter]: layout.layout
                                                } );
                                                this.setState( { random: Math.random() } );
                                            } }
                                        >
                                            <img src={advgbBlocks.pluginUrl + '/assets/blocks/recent-posts/icons/' + layout.icon + '.png'}
                                                 alt={ layout.layout }
                                            />
                                        </div>
                                    </Tooltip>
                                )
                            } ) }
                            {tabSelected === 'tablet' && FRONTPAGE_LAYOUTS_TABLET.map( (layout, index) => {
                                const layoutClasses = [
                                    'advgb-recent-posts-layout',
                                    tabSelected === 'tablet' && layout.layout === frontpageLayoutT && 'is-selected',
                                ].filter( Boolean ).join( ' ' );

                                return (
                                    <Tooltip text={ layout.title } key={ index }>
                                        <div className={ layoutClasses }
                                             onClick={ () => {
                                                 setAttributes( {
                                                     ['frontpageLayout' + deviceLetter]: layout.layout
                                                 } );
                                                 this.setState( { random: Math.random() } );
                                             } }
                                        >
                                            <img src={advgbBlocks.pluginUrl + '/assets/blocks/recent-posts/icons/' + layout.icon + '.png'}
                                                 alt={ layout.layout }
                                            />
                                        </div>
                                    </Tooltip>
                                )
                            } ) }
                            {tabSelected === 'mobile' && FRONTPAGE_LAYOUTS_MOBILE.map( (layout, index) => {
                                const layoutClasses = [
                                    'advgb-recent-posts-layout',
                                    tabSelected === 'mobile' && layout.layout === frontpageLayoutM && 'is-selected',
                                ].filter( Boolean ).join( ' ' );

                                return (
                                    <Tooltip text={ layout.title } key={ index }>
                                        <div className={ layoutClasses }
                                             onClick={ () => {
                                                 setAttributes( {
                                                     ['frontpageLayout' + deviceLetter]: layout.layout
                                                 } );
                                                 this.setState( { random: Math.random() } );
                                             } }
                                        >
                                            <img src={advgbBlocks.pluginUrl + '/assets/blocks/recent-posts/icons/' + layout.icon + '.png'}
                                                 alt={ layout.layout }
                                            />
                                        </div>
                                    </Tooltip>
                                )
                            } ) }
                        </div>
                        <SelectControl
                            label={ __( 'Style', 'advanced-gutenberg' ) }
                            value={ frontpageStyle }
                            options={ [
                                { label: __( 'Default', 'advanced-gutenberg' ), value: 'default' },
                                { label: __( 'Headline', 'advanced-gutenberg' ), value: 'headline' },
                                { label: __( 'Boxed', 'advanced-gutenberg' ), value: 'boxed' },
                                { label: __( 'Newspaper', 'advanced-gutenberg' ), value: 'newspaper' },
                            ] }
                            onChange={ ( value ) => setAttributes( { frontpageStyle: value } ) }
                        />
                        <SelectControl
                            label={ __( 'Space between columns and rows', 'advanced-gutenberg' ) }
                            value={ gap }
                            options={ GAP_OPTIONS }
                            onChange={ (value) => setAttributes( { gap: parseInt(value) } ) }
                        />
                    </PanelBody>
                    }
                    <PanelBody title={ __( 'Post Settings', 'advanced-gutenberg' ) }>
                        <SelectControl
                            label={ __( 'Post Type', 'advanced-gutenberg' ) }
                            value={ postType }
                            options={ postTypeList }
                            onChange={ (value) => setAttributes( { postType: value } ) }
                        />
                        <AdvQueryControls
                            { ...{ order, orderBy } }
                            categorySuggestions={ postType === 'post' ? categoriesList : null }
                            selectedCategories={ categories }
                            numberOfItems={ numberOfPosts }
                            onOrderChange={ ( value ) => setAttributes( { order: value } ) }
                            onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
                            onCategoryChange={ ( value ) => {
                                                this.selectCategories(value);
                                            }
                            }
                            onNumberOfItemsChange={ (value) => setAttributes( { numberOfPosts: value } ) }
                        />
                        { postType === 'post' &&
                            <FormTokenField
                                multiple
                                suggestions={ tagsList }
                                value={ tags }
                                label={ __( 'Show content with these Tags', 'advanced-gutenberg' ) }
                                placeholder={ __( 'Type a tag', 'advanced-gutenberg' ) }
                                onChange={ ( value ) => {
                                                    this.selectTags(value);
                                                }
                                }
                            />
                        }
                    </PanelBody>
                    <PanelBody title={ __( 'Display Settings', 'advanced-gutenberg' ) }>
                        {postView === 'grid' &&
                        <RangeControl
                            label={ __( 'Columns', 'advanced-gutenberg' ) }
                            value={ columns }
                            min={ 1 }
                            max={ 4 }
                            onChange={ (value) => setAttributes( { columns: value } ) }
                        />
                        }
                        <ToggleControl
                            label={ __( 'Display Featured Image', 'advanced-gutenberg' ) }
                            checked={ displayFeaturedImage }
                            onChange={ () => setAttributes( { displayFeaturedImage: !displayFeaturedImage } ) }
                        />
                        {displayFeaturedImage &&
                        <SelectControl
                            value={ displayFeaturedImageFor }
                            options={ [
                                { label: __( 'For all posts', 'advanced-gutenberg' ), value: 'all' },
                                { label: __( 'For the first post', 'advanced-gutenberg' ), value: 1 },
                                { label: __( 'For the first 2 posts', 'advanced-gutenberg' ), value: 2 },
                                { label: __( 'For the first 3 posts', 'advanced-gutenberg' ), value: 3 },
                                { label: __( 'For the first 4 posts', 'advanced-gutenberg' ), value: 4 },
                                { label: __( 'For the first 5 posts', 'advanced-gutenberg' ), value: 5 },
                            ] }
                            onChange={ ( value ) => { setAttributes( { displayFeaturedImageFor: value } ) } }
                            className="advgb-child-select"
                        />
                        }
                        <ToggleControl
                            label={ __( 'Display Post Author', 'advanced-gutenberg' ) }
                            checked={ displayAuthor }
                            onChange={ () => setAttributes( { displayAuthor: !displayAuthor } ) }
                        />
                        <SelectControl
                            label={ __( 'Display Post Date', 'advanced-gutenberg' ) }
                            value={ postDate }
                            options={ [
                                { label: __( 'Hide', 'advanced-gutenberg' ), value: 'hide' },
                                { label: __( 'Created Date', 'advanced-gutenberg' ), value: 'created' },
                                { label: __( 'Updated Date', 'advanced-gutenberg' ), value: 'updated' },
                            ] }
                            onChange={ ( value ) => { setAttributes( { postDate: value } ) } }
                        />
                        { postDate !== 'hide' &&
                            <Fragment>
                                <SelectControl
                                    label={ __( 'Post Date Format', 'advanced-gutenberg' ) }
                                    value={ postDateFormat }
                                    options={ [
                                        { label: __( 'Absolute', 'advanced-gutenberg' ), value: 'absolute' },
                                        { label: __( 'Relative', 'advanced-gutenberg' ), value: 'relative' },
                                    ] }
                                    onChange={ ( value ) => { setAttributes( { postDateFormat: value } ) } }
                                />
                            {postDateFormat === 'absolute' &&
                                <ToggleControl
                                    label={ __( 'Display Post Time', 'advanced-gutenberg' ) }
                                    checked={ displayTime }
                                    onChange={ () => setAttributes( { displayTime: !displayTime } ) }
                                />
                            }
                            </Fragment>
                        }
                        {postType === 'post' &&
                        <ToggleControl
                            label={ __( 'Display Comment Counts', 'advanced-gutenberg' ) }
                            checked={ displayCommentCount }
                            onChange={ () => setAttributes( { displayCommentCount: !displayCommentCount } ) }
                        />
                        }
                        { postType === 'post' &&
                            <Fragment>
                                <SelectControl
                                    label={ __( 'Display Category', 'advanced-gutenberg' ) }
                                    value={ showCategories }
                                    options={ [
                                        { label: __( 'Hide', 'advanced-gutenberg' ), value: 'hide' },
                                        { label: __( 'Show', 'advanced-gutenberg' ), value: 'show' },
                                        { label: __( 'Show & Link', 'advanced-gutenberg' ), value: 'link' },
                                    ] }
                                    onChange={ ( value ) => { setAttributes( { showCategories: value } ) } }
                                />
                                <SelectControl
                                    label={ __( 'Display Tags', 'advanced-gutenberg' ) }
                                    value={ showTags }
                                    options={ [
                                        { label: __( 'Hide', 'advanced-gutenberg' ), value: 'hide' },
                                        { label: __( 'Show', 'advanced-gutenberg' ), value: 'show' },
                                        { label: __( 'Show & Link', 'advanced-gutenberg' ), value: 'link' },
                                    ] }
                                    onChange={ ( value ) => { setAttributes( { showTags: value } ) } }
                                />
                            </Fragment>
                        }
                        <ToggleControl
                            label={ __( 'Display Read More Link', 'advanced-gutenberg' ) }
                            checked={ displayReadMore }
                            onChange={ () => setAttributes( { displayReadMore: !displayReadMore } ) }
                        />
                        {displayReadMore &&
                        <TextControl
                            label={ __('Read more text', 'advanced-gutenberg') }
                            value={ readMoreLbl }
                            onChange={ (value) => setAttributes( { readMoreLbl: value } ) }
                        />
                        }
                        <ToggleControl
                            label={ __( 'Display Post Excerpt', 'advanced-gutenberg' ) }
                            checked={ displayExcerpt }
                            onChange={ () => setAttributes( { displayExcerpt: !displayExcerpt } ) }
                        />
                        {displayExcerpt &&
                        <ToggleControl
                            label={ __( 'First Post text as Excerpt', 'advanced-gutenberg' ) }
                            help={ __( 'Display some part of first text found in post as excerpt.', 'advanced-gutenberg' ) }
                            checked={ postTextAsExcerpt }
                            onChange={ () => setAttributes( { postTextAsExcerpt: !postTextAsExcerpt } ) }
                        />
                        }
                        {displayExcerpt && postTextAsExcerpt &&
                        <RangeControl
                            label={ __( 'Post Text Excerpt length', 'advanced-gutenberg' ) }
                            min={ 50 }
                            max={ 300 }
                            value={ postTextExcerptLength }
                            onChange={ ( value ) => setAttributes( { postTextExcerptLength: value } ) }
                        />
                        }
                        {isInPost && postType === 'post' &&
                        <ToggleControl
                            label={ __( 'Exclude current post', 'advanced-gutenberg' ) }
                            help={ __( 'If this post is listed in the block, you can exclude it.', 'advanced-gutenberg' ) }
                            checked={ excludeCurrentPost }
                            onChange={ () => setAttributes( { excludeCurrentPost: !excludeCurrentPost } ) }
                        />
                        }
                        <TextareaControl
                            label={ __( 'Text after title', 'advanced-gutenberg' ) }
                            help={ __( 'Include text/HTML after title', 'advanced-gutenberg' ) }
                            value={ textAfterTitle }
                            onChange={ ( value ) => setAttributes( { textAfterTitle: value } ) }
                        />
                        <TextareaControl
                            label={ __( 'Text before read more', 'advanced-gutenberg' ) }
                            help={ __( 'Include text/HTML before read more', 'advanced-gutenberg' ) }
                            value={ textBeforeReadmore }
                            onChange={ ( value ) => setAttributes( { textBeforeReadmore: value } ) }
                        />
                    </PanelBody>
                </InspectorControls>
            );

            const hasPosts = Array.isArray( recentPosts ) && recentPosts.length;

            // If no posts found we show this notice
            if (!hasPosts) {
                return (
                    isPreview ?
                        <img alt={__('Recent Posts', 'advanced-gutenberg')} width='100%' src={previewImageData}/>
                        :
                    <Fragment>
                        { inspectorControls }
                        <Placeholder
                            icon={ advRecentPostsBlockIcon }
                            label={ __( 'ADVGB Recent Posts Block', 'advanced-gutenberg' ) }
                        >
                            { ! Array.isArray( recentPosts ) ?
                                <Spinner /> :
                                __( 'No posts found! Try to change category or publish posts.', 'advanced-gutenberg' )
                            }
                        </Placeholder>
                    </Fragment>
                )
            }

            const postViewControls = [
                {
                    icon: 'grid-view',
                    title: __( 'Grid View', 'advanced-gutenberg' ),
                    onClick: () => setAttributes( { postView: 'grid' } ),
                    isActive: postView === 'grid',
                },
                {
                    icon: 'list-view',
                    title: __( 'List View', 'advanced-gutenberg' ),
                    onClick: () => setAttributes( { postView: 'list' } ),
                    isActive: postView === 'list',
                },
                {
                    icon: 'slides',
                    title: __( 'Slider View', 'advanced-gutenberg' ),
                    onClick: () => setAttributes( { postView: 'slider' } ),
                    isActive: postView === 'slider',
                },
                {
                    icon: 'table-row-before',
                    title: __( 'Frontpage View', 'advanced-gutenberg' ),
                    onClick: () => setAttributes( { postView: 'frontpage' } ),
                    isActive: postView === 'frontpage',
                },
            ];

            const blockClassName = [
                'advgb-recent-posts-block',
                this.state.updating && 'loading',
                postView === 'grid' && 'columns-' + columns,
                postView === 'grid' && 'grid-view',
                postView === 'list' && 'list-view',
                postView === 'slider' && 'slider-view',
                postView === 'slider' && sliderStyle && 'style-' + sliderStyle,
                postView === 'frontpage' && 'frontpage-view',
                postView === 'frontpage' && frontpageLayout && 'layout-' + frontpageLayout,
                postView === 'frontpage' && frontpageLayoutT && 'tbl-layout-' + frontpageLayoutT,
                postView === 'frontpage' && frontpageLayoutM && 'mbl-layout-' + frontpageLayoutM,
                postView === 'frontpage' && gap && 'gap-' + gap,
                postView === 'frontpage' && frontpageStyle && 'style-' + frontpageStyle,
            ].filter( Boolean ).join( ' ' );

            const formats = __experimentalGetSettings().formats;
            let format = postDate !== 'hide' ? (displayTime ? formats.datetime : formats.date) : '';

            return (
                isPreview ?
                    <img alt={__('Recent Posts', 'advanced-gutenberg')} width='100%' src={previewImageData}/>
                    :
                <Fragment>
                    { inspectorControls }
                    <BlockControls>
                        <ToolbarGroup controls={ postViewControls } />
                        <ToolbarGroup>
                            <ToolbarButton
                                icon="update"
                                label={ __( 'Refresh', 'advanced-gutenberg' ) }
                                onClick={ () => setAttributes( { myToken: Math.floor(Math.random() * Math.floor(999)) } ) }
                            />
                        </ToolbarGroup>
                    </BlockControls>
                    <div className={ blockClassName }>
                        {this.state.updating && <div className="advgb-recent-posts-loading" />}
                        <div className="advgb-recent-posts">
                            {recentPosts.map( ( post, index ) => (
                                <article key={ index } className="advgb-recent-post" >

                                    {(() => {
                                        if( displayFeaturedImage && ( displayFeaturedImageFor === 'all' || index < displayFeaturedImageFor ) ) {
                                            return(
                                                <div className="advgb-post-thumbnail">
                                                    <a href={ post.link } target="_blank">
                                                        <img src={ post.featured_img ? post.featured_img : advgbBlocks.post_thumb } alt={ __( 'Post Image', 'advanced-gutenberg' ) } />
                                                    </a>
                                                </div>
                                            )
                                        } else if( ( postView === 'frontpage' && frontpageStyle === 'headline' ) || ( postView === 'slider' && sliderStyle === 'headline' ) ) {
                                            return (
                                                <div className="advgb-post-thumbnail advgb-post-thumbnail-no-image">
                                                    <a href={ post.link } target="_blank"></a>
                                                </div>
                                            )
                                        } else {
                                            { /* Nothing to do here */ }
                                        }
                                    })()}

                                    <div className="advgb-post-wrapper">
                                        <h2 className="advgb-post-title">
                                            <a href={ post.link } target="_blank">{ decodeEntities( post.title.rendered ) }</a>
                                        </h2>
                                        <RawHTML className="advgb-text-after-title">{ textAfterTitle }</RawHTML>
                                        <div className="advgb-post-info">
                                            {displayAuthor && post.coauthors && post.coauthors.length > 0 && post.coauthors.map( ( coauthor, coauthor_indx ) => (
                                                <Fragment>
                                                    <a href={ coauthor.link }
                                                       target="_blank"
                                                       className="advgb-post-author"
                                                    >
                                                        { coauthor.display_name }
                                                    </a>
                                                    {coauthor_indx < post.coauthors.length - 1 && (
                                                        <span>, </span>
                                                    ) }
                                                </Fragment>
                                            ) )
                                            }
                                            {displayAuthor && (!post.coauthors || post.coauthors.length === 0) && (
                                                <a href={ post.author_meta.author_link }
                                                   target="_blank"
                                                   className="advgb-post-author"
                                                >
                                                    { post.author_meta.display_name }
                                                </a>
                                            )
                                            }
                                            {postDate !== 'hide' && (
                                                <span className="advgb-post-datetime" >
                                                { postDateFormat === 'absolute'
                                                    ? ( dateI18n( format, postDate === 'created' ? post.date_gmt : post.modified_gmt ) )
                                                    : ( postDate === 'created' ? post.relative_dates.created : post.relative_dates.modified )
                                                }
                                                </span>
                                            ) }
                                            {postType === 'post' && displayCommentCount && (
                                                <span className="advgb-post-comments" >
                                                    <span class="dashicons dashicons-admin-comments"></span>
                                                    ({ post.comment_count })
                                                </span>
                                            ) }
                                        </div>
                                        <div className="advgb-post-tax-info">
                                            {showCategories !== 'hide' && post.tax_additional && post.tax_additional.categories && (
                                                <div className="advgb-post-tax advgb-post-category">
                                                {showCategories === 'show' && post.tax_additional.categories.unlinked.map( ( cat, index ) => (
                                                    <RawHTML>{ cat }</RawHTML>
                                                ) )}
                                                {showCategories === 'link' && post.tax_additional.categories.linked.map( ( cat, index ) => (
                                                    <RawHTML>{ cat }</RawHTML>
                                                ) )}
                                                </div>
                                            ) }
                                            {showTags !== 'hide' && post.tax_additional && post.tax_additional.tags && (
                                                <div className="advgb-post-tax advgb-post-tag">
                                                {showTags === 'show' && post.tax_additional.tags.unlinked.map( ( tag, index ) => (
                                                    <RawHTML>{ tag }</RawHTML>
                                                ) )}
                                                {showTags === 'link' && post.tax_additional.tags.linked.map( ( tag, index ) => (
                                                    <RawHTML>{ tag }</RawHTML>
                                                ) )}
                                                </div>
                                            ) }
                                        </div>
                                        <div className="advgb-post-content">
                                            {displayExcerpt && (
                                                <div className="advgb-post-excerpt"
                                                     dangerouslySetInnerHTML={ {
                                                         __html: postTextAsExcerpt ? RecentPostsEdit.extractContent(post.content.rendered, postTextExcerptLength) : post.excerpt.raw
                                                     } } />
                                            ) }
                                            <div className="advgb-text-before-readmore"><RawHTML>{ textBeforeReadmore }</RawHTML></div>
                                            {displayReadMore && (
                                                <div className="advgb-post-readmore">
                                                    <a href={ post.link } target="_blank">{ readMoreLbl ? readMoreLbl : __( 'Read More', 'advanced-gutenberg' ) }</a>
                                                </div>
                                            ) }
                                        </div>
                                    </div>
                                </article>
                            ) ) }
                        </div>
                    </div>
                </Fragment>
            )
        }

        static extractContent(html, length) {
            const span= document.createElement('span');
            span.innerHTML= html;

            // Remove script tag
            const scripts = span.getElementsByTagName('script');
            let j = scripts.length;
            while (j--) {
                scripts[j].parentNode.removeChild(scripts[j]);
            }

            // Remove style tag
            const styles = span.getElementsByTagName('style');
            let k = styles.length;
            while (k--) {
                styles[k].parentNode.removeChild(styles[k]);
            }

            const children= span.querySelectorAll('*');
            for(let i = 0 ; i < children.length ; i++) {
                if(children[i].textContent)
                    children[i].textContent += ' ';
                else
                    children[i].innerText += ' ';
            }

            let text = [span.textContent || span.innerText].toString().replace(/\s\s+/g,' ');
            text = text.slice(0, length).trim();

            if (text.length) text += '…' ;

            return text;
        };

        selectCategories(tokens) {
            const { categoriesList } = this.state;

            var hasNoSuggestion = tokens.some(function (token) {
                return typeof token === 'string' && !categoriesList[token];
            });

            if (hasNoSuggestion) {
                return;
            }

            var categories = tokens.map(function (token) {
                return typeof token === 'string' ? categoriesList[token] : token;
            })

            this.props.setAttributes({
                categories: categories,
            });
        }

        selectTags(tokens) {
            const { tagsList, tagNameVsId } = this.state;

            var hasNoSuggestion = tokens.some(function (token) {
                return typeof token === 'string' && !tagNameVsId[token];
            });

            if (hasNoSuggestion) {
                return;
            }

            var tags = tokens.map(function (token) {
                return typeof token === 'string' && tagNameVsId[token] ? token : token;
            })

            var tagIds = tokens.map(function (token) {
                return typeof token === 'string' ? tagNameVsId[token] : token.id;
            })

            this.props.setAttributes({
                tags: tags,
                tagIds: tagIds,
            });
        }

        getTagIdsForTags(tags) {
            const { tagNameVsId } = this.state;
            return tags.map( (tag) => {
                return tagNameVsId[tag];
            });
        }

        getCategoryForBkwrdCompat(id) {
            const { catIdVsName } = this.state;
            return {
                id: id,
                name: catIdVsName[id]
            };
        }

    }

    registerBlockType( 'advgb/recent-posts', {
        title: __( 'Recent Posts', 'advanced-gutenberg' ),
        description: __( 'Display your recent posts in slider or grid view with beautiful styles.', 'advanced-gutenberg' ),
        icon: {
            src: advRecentPostsBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined,
        },
        category: 'advgb-category',
        keywords: [
            __( 'latest posts', 'advanced-gutenberg' ),
            __( 'posts slide', 'advanced-gutenberg' ),
            __( 'posts grid', 'advanced-gutenberg' ),
            __( 'posts', 'advanced-gutenberg' ),
            __( 'pages', 'advanced-gutenberg' )
        ],
        supports: {
            html: false,
        },
        example: {
            attributes: {
                isPreview: true
            },
        },
        edit: withSelect( ( select, props ) => {
            const { getEntityRecords } = select( 'core' );
            const { categories, tagIds, tags, category, order, orderBy, numberOfPosts, myToken, postType, excludeCurrentPost } = props.attributes;

            const catIds = categories && categories.length > 0 ? categories.map( ( cat ) => cat.id ) : [];

            const postId = wp.data.select('core/editor').getCurrentPostId();
            const recentPostsQuery = pickBy( {
                categories: catIds,
                tags: tagIds,
                order,
                orderby: orderBy,
                per_page: numberOfPosts,
                token: myToken,
                exclude: excludeCurrentPost ? postId : 0
            }, ( value ) => !isUndefined( value ) );

            return {
                recentPosts: getEntityRecords( 'postType', postType ? postType : 'post', recentPostsQuery ),
            }
        } )( RecentPostsEdit ),
        save: function () { // Render in PHP
            return null;
        },
    } )
})( wp.i18n, wp.blocks, wp.element, wp.blockEditor, wp.components, wp.data, lodash, wp.htmlEntities, wp.date );
