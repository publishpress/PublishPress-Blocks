"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function (wpI18n, wpBlocks, wpElement, wpEditor, wpComponents, wpData, lodash, wpHtmlEntities, wpDate) {
    var __ = wpI18n.__;
    var Component = wpElement.Component,
        Fragment = wpElement.Fragment;
    var registerBlockType = wpBlocks.registerBlockType;
    var InspectorControls = wpEditor.InspectorControls,
        BlockControls = wpEditor.BlockControls;
    var PanelBody = wpComponents.PanelBody,
        RangeControl = wpComponents.RangeControl,
        ToggleControl = wpComponents.ToggleControl,
        QueryControls = wpComponents.QueryControls,
        Spinner = wpComponents.Spinner,
        Toolbar = wpComponents.Toolbar,
        Placeholder = wpComponents.Placeholder;
    var withSelect = wpData.withSelect;
    var pickBy = lodash.pickBy,
        isUndefined = lodash.isUndefined;
    var decodeEntities = wpHtmlEntities.decodeEntities;
    var moment = wpDate.moment;


    var advRecentPostsBlockIcon = React.createElement(
        "svg",
        { width: "20", height: "20", viewBox: "2 2 22 22" },
        React.createElement("path", { fill: "none", d: "M0,0h24v24H0V0z" }),
        React.createElement("rect", { x: "13", y: "7.5", width: "5", height: "2" }),
        React.createElement("rect", { x: "13", y: "14.5", width: "5", height: "2" }),
        React.createElement("path", { d: "M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V5h14V19z" }),
        React.createElement("path", { d: "M11,6H6v5h5V6z M10,10H7V7h3V10z" }),
        React.createElement("path", { d: "M11,13H6v5h5V13z M10,17H7v-3h3V17z" })
    );

    var initSlider = null;

    var RecentPostsEdit = function (_Component) {
        _inherits(RecentPostsEdit, _Component);

        function RecentPostsEdit() {
            _classCallCheck(this, RecentPostsEdit);

            return _possibleConstructorReturn(this, (RecentPostsEdit.__proto__ || Object.getPrototypeOf(RecentPostsEdit)).apply(this, arguments));
        }

        _createClass(RecentPostsEdit, [{
            key: "componentWillUpdate",
            value: function componentWillUpdate(nextProps) {
                var nextPosts = nextProps.recentPosts;
                var nextView = nextProps.attributes.postView;
                var _props = this.props,
                    attributes = _props.attributes,
                    clientId = _props.clientId,
                    recentPosts = _props.recentPosts;

                var $ = jQuery;

                if (nextView !== 'slider' || nextPosts && recentPosts && nextPosts.length !== recentPosts.length) {
                    $("#block-" + clientId + " .advgb-recent-posts.slick-initialized").slick('unslick');
                    $("#block-" + clientId + " .advgb-recent-post").removeAttr('tabindex').removeAttr('role').removeAttr('aria-describedby');

                    if (initSlider) {
                        clearTimeout(initSlider);
                    }
                }
            }
        }, {
            key: "componentDidUpdate",
            value: function componentDidUpdate(prevProps) {
                var _props2 = this.props,
                    attributes = _props2.attributes,
                    clientId = _props2.clientId;
                var postView = attributes.postView;

                var $ = jQuery;

                if (postView === 'slider') {
                    initSlider = setTimeout(function () {
                        $("#block-" + clientId + " .advgb-recent-posts-block.slider-view .advgb-recent-posts:not(.slick-initialized)").slick({
                            dots: true,
                            adaptiveHeight: true
                        });
                    }, 100);
                } else {
                    $("#block-" + clientId + " .advgb-recent-posts.slick-initialized").slick('unslick');
                }
            }
        }, {
            key: "render",
            value: function render() {
                var _props3 = this.props,
                    attributes = _props3.attributes,
                    setAttributes = _props3.setAttributes,
                    recentPosts = _props3.recentPosts,
                    categoriesList = _props3.categoriesList;
                var postView = attributes.postView,
                    order = attributes.order,
                    orderBy = attributes.orderBy,
                    category = attributes.category,
                    numberOfPosts = attributes.numberOfPosts,
                    columns = attributes.columns,
                    displayFeaturedImage = attributes.displayFeaturedImage,
                    displayAuthor = attributes.displayAuthor,
                    displayDate = attributes.displayDate,
                    displayExcerpt = attributes.displayExcerpt,
                    displayReadMore = attributes.displayReadMore;


                var inspectorControls = React.createElement(
                    InspectorControls,
                    null,
                    React.createElement(
                        PanelBody,
                        { title: __('Block Settings') },
                        React.createElement(QueryControls, _extends({ order: order, orderBy: orderBy }, {
                            categoriesList: categoriesList,
                            selectedCategoryId: category,
                            numberOfItems: numberOfPosts,
                            onOrderChange: function onOrderChange(value) {
                                return setAttributes({ order: value });
                            },
                            onOrderByChange: function onOrderByChange(value) {
                                return setAttributes({ orderBy: value });
                            },
                            onCategoryChange: function onCategoryChange(value) {
                                return setAttributes({ category: value !== '' ? value : undefined });
                            },
                            onNumberOfItemsChange: function onNumberOfItemsChange(value) {
                                return setAttributes({ numberOfPosts: value });
                            }
                        })),
                        postView === 'grid' && React.createElement(RangeControl, {
                            label: __('Columns'),
                            value: columns,
                            min: 1,
                            max: 4,
                            onChange: function onChange(value) {
                                return setAttributes({ columns: value });
                            }
                        }),
                        React.createElement(ToggleControl, {
                            label: __('Display Featured Image'),
                            checked: displayFeaturedImage,
                            onChange: function onChange() {
                                return setAttributes({ displayFeaturedImage: !displayFeaturedImage });
                            }
                        }),
                        React.createElement(ToggleControl, {
                            label: __('Display Post Author'),
                            checked: displayAuthor,
                            onChange: function onChange() {
                                return setAttributes({ displayAuthor: !displayAuthor });
                            }
                        }),
                        React.createElement(ToggleControl, {
                            label: __('Display Post Date'),
                            checked: displayDate,
                            onChange: function onChange() {
                                return setAttributes({ displayDate: !displayDate });
                            }
                        }),
                        React.createElement(ToggleControl, {
                            label: __('Display Post Excerpt'),
                            checked: displayExcerpt,
                            onChange: function onChange() {
                                return setAttributes({ displayExcerpt: !displayExcerpt });
                            }
                        }),
                        React.createElement(ToggleControl, {
                            label: __('Display Read More Link'),
                            checked: displayReadMore,
                            onChange: function onChange() {
                                return setAttributes({ displayReadMore: !displayReadMore });
                            }
                        })
                    )
                );

                var hasPosts = Array.isArray(recentPosts) && recentPosts.length;

                // If no posts found we show this notice
                if (!hasPosts) {
                    return React.createElement(
                        Fragment,
                        null,
                        inspectorControls,
                        React.createElement(
                            Placeholder,
                            {
                                icon: advRecentPostsBlockIcon,
                                label: __('ADVGB Recent Posts Block')
                            },
                            !Array.isArray(recentPosts) ? React.createElement(Spinner, null) : __('No posts found! Try to change category or publish posts.')
                        )
                    );
                }

                var postViewControls = [{
                    icon: 'grid-view',
                    title: __('Grid View'),
                    onClick: function onClick() {
                        return setAttributes({ postView: 'grid' });
                    },
                    isActive: postView === 'grid'
                }, {
                    icon: 'list-view',
                    title: __('List View'),
                    onClick: function onClick() {
                        return setAttributes({ postView: 'list' });
                    },
                    isActive: postView === 'list'
                }, {
                    icon: 'slides',
                    title: __('Slider View'),
                    onClick: function onClick() {
                        return setAttributes({ postView: 'slider' });
                    },
                    isActive: postView === 'slider'
                }];

                var blockClassName = ['advgb-recent-posts-block', postView === 'grid' && 'columns-' + columns, postView === 'grid' && 'grid-view', postView === 'list' && 'list-view', postView === 'slider' && 'slider-view'].filter(Boolean).join(' ');

                return React.createElement(
                    Fragment,
                    null,
                    inspectorControls,
                    React.createElement(
                        BlockControls,
                        null,
                        React.createElement(Toolbar, { controls: postViewControls })
                    ),
                    React.createElement(
                        "div",
                        { className: blockClassName },
                        React.createElement(
                            "div",
                            { className: "advgb-recent-posts" },
                            recentPosts.map(function (post, index) {
                                return React.createElement(
                                    "article",
                                    { key: index, className: "advgb-recent-post" },
                                    displayFeaturedImage && post.featured_image_src && React.createElement(
                                        "div",
                                        { className: "advgb-post-thumbnail" },
                                        React.createElement(
                                            "a",
                                            { href: post.link, target: "_blank" },
                                            React.createElement("img", { src: post.featured_image_src, alt: __('Post Image') })
                                        )
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: 'advgb-post-wrapper' },
                                        React.createElement(
                                            "h2",
                                            { className: "advgb-post-title" },
                                            React.createElement(
                                                "a",
                                                { href: post.link, target: "_blank" },
                                                decodeEntities(post.title.rendered)
                                            )
                                        ),
                                        React.createElement(
                                            "div",
                                            { className: "advgb-post-info" },
                                            displayAuthor && React.createElement(
                                                "a",
                                                { href: post.author_info.author_link,
                                                    target: "_blank",
                                                    className: "advgb-post-author"
                                                },
                                                post.author_info.display_name
                                            ),
                                            displayDate && React.createElement(
                                                "span",
                                                { className: "advgb-post-date" },
                                                moment(post.date_gmt).local().format('DD MMMM, Y')
                                            )
                                        ),
                                        React.createElement(
                                            "div",
                                            { className: "advgb-post-content" },
                                            displayExcerpt && React.createElement("div", { className: "advgb-post-excerpt", dangerouslySetInnerHTML: { __html: post.excerpt.rendered } }),
                                            displayReadMore && React.createElement(
                                                "div",
                                                { className: "advgb-post-readmore" },
                                                React.createElement(
                                                    "a",
                                                    { href: post.link, target: "_blank" },
                                                    __('Read More')
                                                )
                                            )
                                        )
                                    )
                                );
                            })
                        )
                    )
                );
            }
        }]);

        return RecentPostsEdit;
    }(Component);

    registerBlockType('advgb/recent-posts', {
        title: __('Recent Posts'),
        description: __('Display your recent posts in slider or grid view with beautiful styles.'),
        icon: {
            src: advRecentPostsBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined
        },
        category: 'widgets',
        keywords: [__('latest posts'), __('posts slide'), __('posts grid')],
        edit: withSelect(function (select, props) {
            var _select = select('core'),
                getEntityRecords = _select.getEntityRecords;

            var _props$attributes = props.attributes,
                category = _props$attributes.category,
                order = _props$attributes.order,
                orderBy = _props$attributes.orderBy,
                numberOfPosts = _props$attributes.numberOfPosts;


            var recentPostsQuery = pickBy({
                categories: category,
                order: order,
                orderby: orderBy,
                per_page: numberOfPosts
            }, function (value) {
                return !isUndefined(value);
            });

            var categoriesListQuery = {
                per_page: 99
            };

            return {
                recentPosts: getEntityRecords('postType', 'post', recentPostsQuery),
                categoriesList: getEntityRecords('taxonomy', 'category', categoriesListQuery)
            };
        })(RecentPostsEdit),
        save: function save() {
            // Render in PHP
            return null;
        }
    });
})(wp.i18n, wp.blocks, wp.element, wp.editor, wp.components, wp.data, lodash, wp.htmlEntities, wp.date);
