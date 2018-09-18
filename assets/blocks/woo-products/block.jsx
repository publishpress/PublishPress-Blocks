( function ( wpI18n, wpBlocks, wpElement, wpEditor, wpComponents ) {
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InspectorControls, BlockControls } = wpEditor;
    const { RangeControl, PanelBody, CheckboxControl, SelectControl, Button, IconButton, Dashicon, Spinner, Toolbar } = wpComponents;

    class AdvProductsEdit extends Component {
        constructor() {
            super( ...arguments );
            this.state = {
                categoriesList: [],
            }
        }

        componentDidUpdate( prevProps ) {
            const { categoriesList } = this.state;
            const { attributes } = this.props;
            const { category } = attributes;

            if (category === 'selected' && categoriesList.length === 0) {
                wp.apiFetch( { path: '/wc/v2/products/categories' } ).then(
                    (obj) => {
                        this.setState( { categoriesList: obj } )
                    }
                );
            }
        }

        setCategories( catID, willAdd ) {
            const { attributes, setAttributes } = this.props;
            const { categories } = attributes;

            if (willAdd) {
                categories.push( catID );
            } else {
                if (categories.indexOf(catID) > -1) {
                    categories.splice( categories.indexOf(catID), 1 );
                }
            }

            setAttributes( { categories } );
            this.setState( { categoriesList: this.state.categoriesList } );
        }

        render() {
            const { categoriesList } = this.state;
            const { attributes, setAttributes } = this.props;
            const {
                category,
                categories,
                status,
                order,
                orderBy,
                numberOfProducts,
                columns,
            } = attributes;

            return (
                <Fragment>
                    <InspectorControls>
                        <PanelBody title={ __( 'Products Settings' ) }>
                            <SelectControl
                                label={ __( 'Product Status' ) }
                                value={ status }
                                options={ [
                                    { label: __( 'All' ), value: '' },
                                    { label: __( 'Featured' ), value: 'featured' },
                                    { label: __( 'On Sale' ), value: 'on_sale' },
                                ] }
                                onChange={ ( value ) => setAttributes( { status: value } ) }
                            />
                            <SelectControl
                                label={ __( 'Category' ) }
                                value={ category }
                                options={ [
                                    { label: __( 'All' ), value: '' },
                                    { label: __( 'Selected' ), value: 'selected' },
                                ] }
                                onChange={ ( value ) => setAttributes( { category: value } ) }
                            />
                            {category === 'selected' &&
                                <div className="advgb-categories-list">
                                    {categoriesList.map( (cat, index) => (
                                        <CheckboxControl
                                            key={ index }
                                            label={ [
                                                cat.name,
                                                <span key="cat-count" style={ { fontSize: 'small', color: '#999', marginLeft: 5 } }>
                                                ({cat.count})
                                            </span>
                                            ] }
                                            checked={ jQuery.inArray(cat.id, categories) > -1 }
                                            onChange={ (checked) => this.setCategories( cat.id, checked ) }
                                        />
                                    ) ) }
                                </div>
                            }
                        </PanelBody>
                        <PanelBody title={ __( 'Layout Settings' ) }>
                            <RangeControl
                                label={ __( 'Columns' ) }
                                value={ columns }
                                min={ 1 }
                                max={ 4 }
                                onChange={ ( value ) => setAttributes( { columns: value } ) }
                            />
                            <RangeControl
                                label={ __( 'Number of Products' ) }
                                value={ numberOfProducts }
                                min={ 1 }
                                max={ 48 }
                                onChange={ (value) => setAttributes( { numberOfPosts: value } ) }
                            />
                            <SelectControl
                                label={ __( 'Order' ) }
                                value={ `${orderBy}-${order}` }
                                options={ [
                                    { label: __( 'Newest to oldest' ), value: 'date-desc' },
                                    { label: __( 'Price: high to low' ), value: 'price-desc' },
                                    { label: __( 'Price: low to high' ), value: 'price-asc' },
                                    { label: __( 'Highest Rating first' ), value: 'rating-desc' },
                                    { label: __( 'Most sale first' ), value: 'popularity-desc' },
                                    { label: __( 'Title: Alphabetical' ), value: 'title-asc' },
                                    { label: __( 'Title: Alphabetical reversed' ), value: 'title-desc' },
                                ] }
                                onChange={ (value) => {
                                    const splitedVal = value.split('-');
                                    return setAttributes( {
                                        orderBy: splitedVal[0],
                                        order: splitedVal[1],
                                    } )
                                } }
                            />
                        </PanelBody>
                    </InspectorControls>
                    <div>123</div>
                </Fragment>
            )
        }
    }

    const advProductsBlockIcon = (
        <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="none" d="M0,0h24v24H0V0z"/>
            <path d="M15.55,13c0.75,0,1.41-0.41,1.75-1.03l3.58-6.49C21.25,4.82,20.77,4,20.01,4H5.21L4.27,2H1v2h2l3.6,7.59l-1.35,2.44 C4.52,15.37,5.48,17,7,17h12v-2H7l1.1-2H15.55z M6.16,6h12.15l-2.76,5H8.53L6.16,6z"/>
            <path d="M7,18c-1.1,0-1.99,0.9-1.99,2c0,1.1,0.89,2,1.99,2c1.1,0,2-0.9,2-2C9,18.9,8.1,18,7,18z"/>
            <path d="M17,18c-1.1,0-1.99,0.9-1.99,2c0,1.1,0.89,2,1.99,2c1.1,0,2-0.9,2-2C19,18.9,18.1,18,17,18z"/>
        </svg>
    );

    registerBlockType( 'advgb/woo-products', {
        title: __( 'Woo Products' ),
        description: __( 'Listing your products in a easy way.' ),
        icon: {
            src: advProductsBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined,
        },
        category: 'widgets',
        keywords: [ __( 'woo commerce' ), __( 'products list' ), __( 'price list' ) ],
        attributes: {
            category: {
                type: 'string',
            },
            categories: {
                type: 'array',
                default: [],
            },
            status: {
                type: 'string',
            },
            order: {
                type: 'string',
                default: 'desc',
            },
            orderBy: {
                type: 'string',
                default: 'date',
            },
            numberOfProducts: {
                type: 'number',
                default: 6,
            },
            columns: {
                type: 'number',
                default: 3,
            },
            changed: {
                type: 'boolean',
                default: false,
            }
        },
        edit: AdvProductsEdit,
        save: function ( { attributes } ) {
            return null;
        }
    } )
} )( wp.i18n, wp.blocks, wp.element, wp.editor, wp.components );