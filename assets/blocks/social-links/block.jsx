(function ( wpI18n, wpBlocks, wpElement, wpEditor, wpComponents ) {
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InspectorControls, BlockControls, MediaUpload, AlignmentToolbar } = wpEditor;
    const { RangeControl, PanelBody, TextControl, IconButton, Toolbar } = wpComponents;

    const socialBlockIconContent = (
        <Fragment>
            <path fill="none" d="M0,0h24v24H0V0z"/>
            <path d="M18,16.08c-0.76,0-1.44,0.3-1.96,0.77L8.91,12.7C8.96,12.47,9,12.24,9,12s-0.04-0.47-0.09-0.7l7.05-4.11
                C16.5,7.69,17.21,8,18,8c1.66,0,3-1.34,3-3c0-1.66-1.34-3-3-3s-3,1.34-3,3c0,0.24,0.04,0.47,0.09,0.7L8.04,9.81
                C7.5,9.31,6.79,9,6,9c-1.66,0-3,1.34-3,3c0,1.66,1.34,3,3,3c0.79,0,1.5-0.31,2.04-0.81l7.12,4.16c-0.05,0.21-0.08,0.43-0.08,0.65
                c0,1.61,1.31,2.92,2.92,2.92s2.92-1.31,2.92-2.92C20.92,17.39,19.61,16.08,18,16.08z M18,4c0.55,0,1,0.45,1,1s-0.45,1-1,1
                s-1-0.45-1-1S17.45,4,18,4z M6,13c-0.55,0-1-0.45-1-1s0.45-1,1-1s1,0.45,1,1S6.55,13,6,13z M18,20.02c-0.55,0-1-0.45-1-1
                s0.45-1,1-1s1,0.45,1,1S18.55,20.02,18,20.02z"/>
        </Fragment>
    );

    const socialBlockIcon = <svg width="24" height="24" viewBox="0 0 24 24">{socialBlockIconContent}</svg>;

    class AdvSocialBlock extends Component {
        constructor() {
            super( ...arguments );
            this.state = {
                currentSelected: 0,
            }
        }

        render() {
            const { attributes, setAttributes, isSelected } = this.props;
            const { items, align, iconSize, iconSpace } = attributes;
            const { currentSelected } = this.state;

            return (
                <Fragment>
                    <BlockControls>
                        <Toolbar>
                            <IconButton
                                className="components-toolbar__control"
                                icon="plus"
                                label={ __( 'Add item' ) }
                                onClick={ () => setAttributes( { items: [ ...items, { icon: '', iconID: '', link: '#' } ] } ) }
                            />
                            <IconButton
                                className="components-toolbar__control"
                                icon="no"
                                label={ __( 'Remove selected item' ) }
                                onClick={ () => {
                                    this.setState( { currentSelected: Math.max(currentSelected - 1, 0) } );
                                    if (items.length > 1) {
                                        setAttributes( {
                                            items: items.filter( (item, index) => index !== currentSelected ),
                                        } )
                                    } else {
                                        setAttributes( {
                                            items: [ { icon: '', iconID: '', link: '#' } ]
                                        } )
                                    }
                                } }
                            />
                        </Toolbar>
                        <MediaUpload
                            type="image"
                            value={ items[currentSelected].iconID }
                            onSelect={ (media) => {
                                let newItems = items.map( (item, index) => {
                                    if (index === currentSelected) {
                                        item = {
                                            ...item,
                                            icon: media.sizes.thumbnail.url,
                                            iconID: media.id,
                                        };
                                    }
                                    return item;
                                } );

                                setAttributes( { items: newItems } )
                            } }
                            render={ ( { open } ) => (
                                <Toolbar>
                                    <IconButton
                                        className="components-toolbar__control"
                                        icon="format-image"
                                        label={ __( 'Choose icon' ) }
                                        onClick={ open }
                                    />
                                </Toolbar>
                            ) }
                        />
                        <AlignmentToolbar value={ align } onChange={ ( value ) => setAttributes( { align: value } ) } />
                    </BlockControls>
                    <InspectorControls>
                        <PanelBody title={ __( 'Icons settings' ) }>
                            <RangeControl
                                label={ __( 'Icon size' ) }
                                value={ iconSize }
                                min={ 20 }
                                max={ 60 }
                                onChange={ (value) => setAttributes( { iconSize: value } ) }
                            />
                            <RangeControl
                                label={ __( 'Icon space' ) }
                                value={ iconSpace }
                                min={ 0 }
                                max={ 30 }
                                onChange={ (value) => setAttributes( { iconSpace: value } ) }
                            />
                        </PanelBody>
                    </InspectorControls>
                    <div className="advgb-social-links-block" style={ { textAlign: align } }>
                        <div className="advgb-social-icons">
                            {items.map( ( item, index ) => (
                                <span key={ index }
                                      className={ `advgb-social-icon ${ currentSelected === index ? 'selected' : '' }` }
                                      onClick={ () => this.setState( { currentSelected: index } ) }
                                      style={ {
                                          width: iconSize + 'px',
                                          height: iconSize + 'px',
                                          marginLeft: iconSpace + 'px',
                                          marginRight: iconSpace + 'px',
                                      } }
                                >
                                    {!!item.icon
                                        ? <img src={ item.icon } alt={ __( 'Social link icon' ) } />
                                        : <svg width={iconSize-6} height={iconSize-6} viewBox="0 0 24 24">
                                            {socialBlockIconContent}
                                        </svg>
                                    }
                                </span>
                            ) ) }
                        </div>
                        {isSelected && (
                            <div className="advgb-social-link">
                                <strong>{ __( 'Social link:' ) }</strong>
                                <TextControl
                                    placeholder={ __( 'Enter social link…' ) }
                                    value={ items[currentSelected].link }
                                    onChange={ ( value ) => {
                                        let newItems = items.map( (vl, idx) => {
                                            if (idx === parseInt(currentSelected)) vl = { ...vl, link: value };
                                            return vl;
                                        } );
                                        return setAttributes( { items: newItems } );
                                    } }
                                />
                            </div>
                        ) }
                    </div>
                </Fragment>
            )
        }
    }

    registerBlockType( 'advgb/social-links', {
        title: __( 'Social Links' ),
        description: __( 'Insert your social link with icon.' ),
        icon: socialBlockIcon,
        category: 'common',
        keywords: [ __( 'social icons' ), __( 'shares' ), __( 'icon link' ) ],
        attributes: {
            items: {
                type: 'array',
                default: [
                    { icon: '', iconID: '', link: '#' },
                    { icon: '', iconID: '', link: '#' },
                    { icon: '', iconID: '', link: '#' },
                ],
            },
            align: {
                type: 'string',
            },
            iconSize: {
                type: 'number',
                default: 24,
            },
            iconSpace: {
                type: 'number',
                default: 5,
            }
        },
        edit: AdvSocialBlock,
        save: function ( { attributes } ) {
            const { items, align, iconSize, iconSpace } = attributes;

            return (
                <div className="advgb-social-links-block" style={ { textAlign: align } }>
                    <div className="advgb-social-icons">
                        {items.map( ( item, index ) => (
                            <a key={ index }
                               className={ `advgb-social-icon` }
                               href={ item.link || '#' }
                               target="_blank"
                               style={ {
                                   width: iconSize + 'px',
                                   height: iconSize + 'px',
                                   marginLeft: iconSpace + 'px',
                                   marginRight: iconSpace + 'px',
                               } }
                            >
                                {!!item.icon
                                    ? <img src={ item.icon } alt={ __( 'Social link icon' ) } />
                                    : <svg width={iconSize-6} height={iconSize-6} viewBox="0 0 24 24">
                                        {socialBlockIconContent}
                                    </svg>
                                }
                            </a>
                        ) ) }
                    </div>
                </div>
            );
        }
    } )
})( wp.i18n, wp.blocks, wp.element, wp.editor, wp.components );