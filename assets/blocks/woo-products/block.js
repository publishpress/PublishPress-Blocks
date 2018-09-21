'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function (wpI18n, wpBlocks, wpElement, wpEditor, wpComponents) {
    var __ = wpI18n.__;
    var Component = wpElement.Component,
        Fragment = wpElement.Fragment;
    var registerBlockType = wpBlocks.registerBlockType;
    var InspectorControls = wpEditor.InspectorControls;
    var RangeControl = wpComponents.RangeControl,
        PanelBody = wpComponents.PanelBody,
        CheckboxControl = wpComponents.CheckboxControl,
        SelectControl = wpComponents.SelectControl,
        Spinner = wpComponents.Spinner;


    var fetchingQueue = null;

    var AdvProductsEdit = function (_Component) {
        _inherits(AdvProductsEdit, _Component);

        function AdvProductsEdit() {
            _classCallCheck(this, AdvProductsEdit);

            var _this = _possibleConstructorReturn(this, (AdvProductsEdit.__proto__ || Object.getPrototypeOf(AdvProductsEdit)).apply(this, arguments));

            _this.state = {
                categoriesList: [],
                productsList: [],
                loading: true
            };

            _this.fetchProducts = _this.fetchProducts.bind(_this);
            return _this;
        }

        _createClass(AdvProductsEdit, [{
            key: 'componentWillMount',
            value: function componentWillMount() {
                this.fetchProducts();
            }
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate(prevProps) {
                var _this2 = this;

                var categoriesList = this.state.categoriesList;
                var attributes = this.props.attributes;
                var category = attributes.category;


                if (category === 'selected' && categoriesList.length === 0) {
                    wp.apiFetch({ path: '/wc/v2/products/categories' }).then(function (obj) {
                        _this2.setState({ categoriesList: obj });
                    });
                }

                if (this.checkAttrChanged(prevProps.attributes, attributes)) {
                    this.fetchProducts();
                }
            }
        }, {
            key: 'checkAttrChanged',
            value: function checkAttrChanged(prevAttrs, curAttrs) {
                var prevCat = prevAttrs.category,
                    prevCats = prevAttrs.categories,
                    prevStatus = prevAttrs.status,
                    prevOrder = prevAttrs.order,
                    prevOrderBy = prevAttrs.orderBy,
                    prevLength = prevAttrs.numberOfProducts;
                var category = curAttrs.category,
                    categories = curAttrs.categories,
                    status = curAttrs.status,
                    order = curAttrs.order,
                    orderBy = curAttrs.orderBy,
                    numberOfProducts = curAttrs.numberOfProducts;


                return category !== prevCat || categories !== prevCats || status !== prevStatus || order !== prevOrder || orderBy !== prevOrderBy || numberOfProducts !== prevLength;
            }
        }, {
            key: 'fetchProducts',
            value: function fetchProducts() {
                var self = this;
                var _props$attributes = this.props.attributes,
                    category = _props$attributes.category,
                    categories = _props$attributes.categories,
                    status = _props$attributes.status,
                    order = _props$attributes.order,
                    orderBy = _props$attributes.orderBy,
                    numberOfProducts = _props$attributes.numberOfProducts;
                var addQueryArgs = wp.url.addQueryArgs;

                var query = addQueryArgs('/wgbp/v3/products', {
                    order: order || undefined,
                    orderby: orderBy || undefined,
                    per_page: numberOfProducts,
                    category: category === 'selected' ? categories.join(',') : undefined,
                    featured: status === 'featured' ? 1 : undefined,
                    on_sale: status === 'on_sale' ? 1 : undefined
                });

                if (fetchingQueue) {
                    clearTimeout(fetchingQueue);
                }

                fetchingQueue = setTimeout(function () {
                    self.setState({ loading: true });
                    wp.apiFetch({ path: query }).then(function (obj) {
                        self.setState({
                            productsList: obj,
                            loading: false
                        });
                    });
                }, 500);
            }
        }, {
            key: 'setCategories',
            value: function setCategories(catID, willAdd) {
                var _props = this.props,
                    attributes = _props.attributes,
                    setAttributes = _props.setAttributes;
                var categories = attributes.categories;


                if (willAdd) {
                    categories.push(catID);
                } else {
                    if (categories.indexOf(catID) > -1) {
                        categories.splice(categories.indexOf(catID), 1);
                    }
                }

                setAttributes({ categories: categories });
                this.setState({ categoriesList: this.state.categoriesList });
                this.fetchProducts();
            }
        }, {
            key: 'render',
            value: function render() {
                var _this3 = this;

                var _state = this.state,
                    categoriesList = _state.categoriesList,
                    productsList = _state.productsList,
                    loading = _state.loading;
                var _props2 = this.props,
                    attributes = _props2.attributes,
                    setAttributes = _props2.setAttributes;
                var category = attributes.category,
                    categories = attributes.categories,
                    status = attributes.status,
                    order = attributes.order,
                    orderBy = attributes.orderBy,
                    numberOfProducts = attributes.numberOfProducts,
                    columns = attributes.columns;


                return React.createElement(
                    Fragment,
                    null,
                    React.createElement(
                        InspectorControls,
                        null,
                        React.createElement(
                            PanelBody,
                            { title: __('Products Settings') },
                            React.createElement(SelectControl, {
                                label: __('Product Status'),
                                value: status,
                                options: [{ label: __('All'), value: '' }, { label: __('Featured'), value: 'featured' }, { label: __('On Sale'), value: 'on_sale' }],
                                onChange: function onChange(value) {
                                    return setAttributes({ status: value });
                                }
                            }),
                            React.createElement(SelectControl, {
                                label: __('Category'),
                                value: category,
                                options: [{ label: __('All'), value: '' }, { label: __('Selected'), value: 'selected' }],
                                onChange: function onChange(value) {
                                    return setAttributes({ category: value });
                                }
                            }),
                            category === 'selected' && React.createElement(
                                'div',
                                { className: 'advgb-categories-list' },
                                categoriesList.map(function (cat, index) {
                                    return React.createElement(CheckboxControl, {
                                        key: index,
                                        label: [cat.name, React.createElement(
                                            'span',
                                            { key: 'cat-count', style: { fontSize: 'small', color: '#999', marginLeft: 5 } },
                                            '(',
                                            cat.count,
                                            ')'
                                        )],
                                        checked: jQuery.inArray(cat.id, categories) > -1,
                                        onChange: function onChange(checked) {
                                            return _this3.setCategories(cat.id, checked);
                                        }
                                    });
                                })
                            )
                        ),
                        React.createElement(
                            PanelBody,
                            { title: __('Layout Settings') },
                            React.createElement(RangeControl, {
                                label: __('Columns'),
                                value: columns,
                                min: 1,
                                max: 4,
                                onChange: function onChange(value) {
                                    return setAttributes({ columns: value });
                                }
                            }),
                            React.createElement(RangeControl, {
                                label: __('Number of Products'),
                                value: numberOfProducts,
                                min: 1,
                                max: 48,
                                onChange: function onChange(value) {
                                    return setAttributes({ numberOfProducts: value });
                                }
                            }),
                            React.createElement(SelectControl, {
                                label: __('Order'),
                                value: orderBy + '-' + order,
                                options: [{ label: __('Newest to oldest'), value: 'date-desc' }, { label: __('Price: high to low'), value: 'price-desc' }, { label: __('Price: low to high'), value: 'price-asc' }, { label: __('Highest Rating first'), value: 'rating-desc' }, { label: __('Most sale first'), value: 'popularity-desc' }, { label: __('Title: Alphabetical'), value: 'title-asc' }, { label: __('Title: Alphabetical reversed'), value: 'title-desc' }],
                                onChange: function onChange(value) {
                                    var splitedVal = value.split('-');
                                    return setAttributes({
                                        orderBy: splitedVal[0],
                                        order: splitedVal[1]
                                    });
                                }
                            })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'advgb-products-block' },
                        !loading ? productsList.length > 0 ? React.createElement(
                            'div',
                            { className: 'advgb-products-wrapper columns-' + columns },
                            productsList.map(function (product, idx) {
                                return React.createElement(
                                    'div',
                                    { key: idx, className: 'advgb-product' },
                                    React.createElement(
                                        'div',
                                        { className: 'advgb-product-img' },
                                        React.createElement('img', { src: product.images[0].src, alt: product.name })
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'advgb-product-title' },
                                        product.name
                                    ),
                                    React.createElement('div', { className: 'advgb-product-price', dangerouslySetInnerHTML: { __html: product.price_html } }),
                                    React.createElement(
                                        'div',
                                        { className: 'advgb-product-add-to-cart' },
                                        React.createElement(
                                            'span',
                                            null,
                                            __('Add to cart')
                                        )
                                    )
                                );
                            })
                        ) : // When no products found
                        React.createElement(
                            'div',
                            null,
                            __('No products found.')
                        ) : // When products is fetching
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'span',
                                null,
                                __('Loading')
                            ),
                            React.createElement(Spinner, null)
                        )
                    )
                );
            }
        }]);

        return AdvProductsEdit;
    }(Component);

    var advProductsBlockIcon = React.createElement(
        'svg',
        { width: '20', height: '20', viewBox: '0 0 24 24' },
        React.createElement('path', { fill: 'none', d: 'M0,0h24v24H0V0z' }),
        React.createElement('path', { d: 'M15.55,13c0.75,0,1.41-0.41,1.75-1.03l3.58-6.49C21.25,4.82,20.77,4,20.01,4H5.21L4.27,2H1v2h2l3.6,7.59l-1.35,2.44 C4.52,15.37,5.48,17,7,17h12v-2H7l1.1-2H15.55z M6.16,6h12.15l-2.76,5H8.53L6.16,6z' }),
        React.createElement('path', { d: 'M7,18c-1.1,0-1.99,0.9-1.99,2c0,1.1,0.89,2,1.99,2c1.1,0,2-0.9,2-2C9,18.9,8.1,18,7,18z' }),
        React.createElement('path', { d: 'M17,18c-1.1,0-1.99,0.9-1.99,2c0,1.1,0.89,2,1.99,2c1.1,0,2-0.9,2-2C19,18.9,18.1,18,17,18z' })
    );

    registerBlockType('advgb/woo-products', {
        title: __('Woo Products'),
        description: __('Listing your products in a easy way.'),
        icon: {
            src: advProductsBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined
        },
        category: 'widgets',
        keywords: [__('woo commerce'), __('products list'), __('price list')],
        attributes: {
            category: {
                type: 'string'
            },
            categories: {
                type: 'array',
                default: []
            },
            status: {
                type: 'string'
            },
            order: {
                type: 'string',
                default: 'desc'
            },
            orderBy: {
                type: 'string',
                default: 'date'
            },
            numberOfProducts: {
                type: 'number',
                default: 6
            },
            columns: {
                type: 'number',
                default: 3
            },
            changed: {
                type: 'boolean',
                default: false
            }
        },
        edit: AdvProductsEdit,
        save: function save(_ref) {
            var attributes = _ref.attributes;

            return null;
        }
    });
})(wp.i18n, wp.blocks, wp.element, wp.editor, wp.components);
