(function ( wpI18n, wpBlocks, wpElement, wpEditor, wpComponents ) {
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType } = wpBlocks;
    const { InspectorControls, RichText, PanelColorSettings, MediaUpload } = wpEditor;
    const { RangeControl, PanelBody, Tooltip } = wpComponents;

    class AdvTestimonial extends Component {
        constructor() {
            super( ...arguments );
            this.state = {
                currentEdit: '',
            }
        }

        componentWillMount() {
            const { attributes, setAttributes } = this.props;
            const currentBlockConfig = advgbDefaultConfig['advgb-testimonial'];

            // No override attributes of blocks inserted before
            if (attributes.changed !== true) {
                if (currentBlockConfig !== undefined && typeof currentBlockConfig === 'object') {
                    Object.keys(currentBlockConfig).map((attribute)=>{
                        attributes[attribute] = currentBlockConfig[attribute];
                    });

                    // Finally set changed attribute to true, so we don't modify anything again
                    setAttributes( { changed: true } );
                }
            }
        }

        handleSetup( editor, area ) {
            editor.on( 'focus', () => this.setState( { currentEdit: area } ) );
        }

        render() {
            const { currentEdit } = this.state;
            const { attributes, setAttributes, isSelected } = this.props;
            const {
                avatarUrl,
                avatarID,
                avatarUrl2,
                avatarID2,
                avatarUrl3,
                avatarID3,
                avatarColor,
                avatarBorderRadius,
                avatarBorderWidth,
                avatarBorderColor,
                avatarSize,
                name,
                name2,
                name3,
                nameColor,
                position,
                position2,
                position3,
                positionColor,
                desc,
                desc2,
                desc3,
                descColor,
                columns,
            } = attributes;

            return (
                <Fragment>
                    <InspectorControls>
                        <PanelBody title={ __( 'Testimonial Settings' ) }>
                            <RangeControl
                                label={ __( 'Columns' ) }
                                min={ 1 }
                                max={ 3 }
                                value={ columns }
                                onChange={ (value) => setAttributes( { columns: value } ) }
                            />
                            <PanelBody title={ __( 'Avatar' ) } initialOpen={ false }>
                                <PanelColorSettings
                                    title={ __( 'Avatar Colors' ) }
                                    initialOpen={ false }
                                    colorSettings={ [
                                        {
                                            label: __( 'Background Color' ),
                                            value: avatarColor,
                                            onChange: ( value ) => setAttributes( { avatarColor: value } ),
                                        },
                                        {
                                            label: __( 'Border Color' ),
                                            value: avatarBorderColor,
                                            onChange: ( value ) => setAttributes( { avatarBorderColor: value } ),
                                        },
                                    ] }
                                />
                                <RangeControl
                                    label={ __( 'Border Radius (%)' ) }
                                    min={ 0 }
                                    max={ 50 }
                                    value={ avatarBorderRadius }
                                    onChange={ (value) => setAttributes( { avatarBorderRadius: value } ) }
                                />
                                <RangeControl
                                    label={ __( 'Border Width' ) }
                                    min={ 0 }
                                    max={ 5 }
                                    value={ avatarBorderWidth }
                                    onChange={ (value) => setAttributes( { avatarBorderWidth: value } ) }
                                />
                                <RangeControl
                                    label={ __( 'Avatar Size' ) }
                                    min={ 50 }
                                    max={ 130 }
                                    value={ avatarSize }
                                    onChange={ (value) => setAttributes( { avatarSize: value } ) }
                                />
                            </PanelBody>
                            <PanelColorSettings
                                title={ __( 'Text Colors' ) }
                                initialOpen={ false }
                                colorSettings={ [
                                    {
                                        label: __( 'Name Color' ),
                                        value: nameColor,
                                        onChange: ( value ) => setAttributes( { nameColor: value } ),
                                    },
                                    {
                                        label: __( 'Position Color' ),
                                        value: positionColor,
                                        onChange: ( value ) => setAttributes( { positionColor: value } ),
                                    },
                                    {
                                        label: __( 'Description Color' ),
                                        value: descColor,
                                        onChange: ( value ) => setAttributes( { descColor: value } ),
                                    },
                                ] }
                            />
                        </PanelBody>
                    </InspectorControls>
                    <div className={`advgb-testimonial advgb-column-${columns}`}>
                        <div className="advgb-testimonial-columns-one">
                            <MediaUpload
                                allowedTypes={ ["image"] }
                                onSelect={ (media) => setAttributes( { avatarUrl: media.sizes.thumbnail.url, avatarID: media.id } ) }
                                value={ avatarID }
                                render={ ( { open } ) => (
                                    <div className={ 'advgb-testimonial-avatar-group' }>
                                        <Tooltip text={ __( 'Click to change avatar' ) }>
                                            <div className={ 'advgb-testimonial-avatar' }
                                                 onClick={ open }
                                                 style={ {
                                                     backgroundImage: `url(${avatarUrl ? avatarUrl : advgbAvatar.holder})`,
                                                     backgroundColor: avatarColor,
                                                     borderRadius: avatarBorderRadius + '%',
                                                     borderWidth: avatarBorderWidth + 'px',
                                                     borderColor: avatarBorderColor,
                                                     width: avatarSize + 'px',
                                                     height: avatarSize + 'px',
                                                 } }
                                            />
                                        </Tooltip>
                                        <Tooltip text={ __( 'Remove avatar' ) }>
                                            <span className={ 'dashicons dashicons-no advgb-testimonial-avatar-clear' }
                                                  onClick={ () => setAttributes( { avatarUrl: undefined, avatarID: undefined } ) }
                                            />
                                        </Tooltip>
                                    </div>
                                ) }
                            />
                            <RichText
                                tagName={ 'h4' }
                                className={ 'advgb-testimonial-name' }
                                value={ name }
                                onChange={ (value) => setAttributes( { name: value } ) }
                                isSelected={ isSelected && currentEdit === 'name' }
                                unstableOnSetup={ ( editor ) => this.handleSetup( editor, 'name' ) }
                                style={ { color: nameColor } }
                                placeholder={ __( 'Text…' ) }
                            />
                            <RichText
                                tagName={ 'p' }
                                className={ 'advgb-testimonial-position' }
                                value={ position }
                                onChange={ (value) => setAttributes( { position: value } ) }
                                isSelected={ isSelected && currentEdit === 'position' }
                                unstableOnSetup={ ( editor ) => this.handleSetup( editor, 'position' ) }
                                style={ { color: positionColor } }
                                placeholder={ __( 'Text…' ) }
                            />
                            <RichText
                                tagName={ 'p' }
                                className={ 'advgb-testimonial-desc' }
                                value={ desc }
                                onChange={ (value) => setAttributes( { desc: value } ) }
                                isSelected={ isSelected && currentEdit === 'desc' }
                                unstableOnSetup={ ( editor ) => this.handleSetup( editor, 'desc' ) }
                                style={ { color: descColor } }
                                placeholder={ __( 'Text…' ) }
                            />
                        </div>
                        <div className="advgb-testimonial-columns-two">
                            <MediaUpload
                                allowedTypes={ ["image"] }
                                onSelect={ (media) => setAttributes( { avatarUrl2: media.sizes.thumbnail.url, avatarID2: media.id } ) }
                                value={ avatarID2 }
                                render={ ( { open } ) => (
                                    <div className={ 'advgb-testimonial-avatar-group' }>
                                        <Tooltip text={ __( 'Click to change avatar' ) }>
                                            <div className={ 'advgb-testimonial-avatar' }
                                                 onClick={ open }
                                                 style={ {
                                                     backgroundImage: `url(${avatarUrl2 ? avatarUrl2 : advgbAvatar.holder})`,
                                                     backgroundColor: avatarColor,
                                                     borderRadius: avatarBorderRadius + '%',
                                                     borderWidth: avatarBorderWidth + 'px',
                                                     borderColor: avatarBorderColor,
                                                     width: avatarSize + 'px',
                                                     height: avatarSize + 'px',
                                                 } }
                                            />
                                        </Tooltip>
                                        <Tooltip text={ __( 'Remove avatar' ) }>
                                            <span className={ 'dashicons dashicons-no advgb-testimonial-avatar-clear' }
                                                  onClick={ () => setAttributes( { avatarUrl2: undefined, avatarID2: undefined } ) }
                                            />
                                        </Tooltip>
                                    </div>
                                ) }
                            />
                            <RichText
                                tagName={ 'h4' }
                                className={ 'advgb-testimonial-name' }
                                value={ name2 }
                                onChange={ (value) => setAttributes( { name2: value } ) }
                                isSelected={ isSelected && currentEdit === 'name2' }
                                unstableOnSetup={ ( editor ) => this.handleSetup( editor, 'name2' ) }
                                style={ { color: nameColor } }
                                placeholder={ __( 'Text…' ) }
                            />
                            <RichText
                                tagName={ 'p' }
                                className={ 'advgb-testimonial-position' }
                                value={ position2 }
                                onChange={ (value) => setAttributes( { position2: value } ) }
                                isSelected={ isSelected && currentEdit === 'position2' }
                                unstableOnSetup={ ( editor ) => this.handleSetup( editor, 'position2' ) }
                                style={ { color: positionColor } }
                                placeholder={ __( 'Text…' ) }
                            />
                            <RichText
                                tagName={ 'p' }
                                className={ 'advgb-testimonial-desc' }
                                value={ desc2 }
                                onChange={ (value) => setAttributes( { desc2: value } ) }
                                isSelected={ isSelected && currentEdit === 'desc2' }
                                unstableOnSetup={ ( editor ) => this.handleSetup( editor, 'desc2' ) }
                                style={ { color: descColor } }
                                placeholder={ __( 'Text…' ) }
                            />
                        </div>
                        <div className="advgb-testimonial-columns-three">
                            <MediaUpload
                                allowedTypes={ ["image"] }
                                onSelect={ (media) => setAttributes( { avatarUrl3: media.sizes.thumbnail.url, avatarID3: media.id } ) }
                                value={ avatarID3 }
                                render={ ( { open } ) => (
                                    <div className={ 'advgb-testimonial-avatar-group' }>
                                        <Tooltip text={ __( 'Click to change avatar' ) }>
                                            <div className={ 'advgb-testimonial-avatar' }
                                                 onClick={ open }
                                                 style={ {
                                                     backgroundImage: `url(${avatarUrl3 ? avatarUrl3 : advgbAvatar.holder})`,
                                                     backgroundColor: avatarColor,
                                                     borderRadius: avatarBorderRadius + '%',
                                                     borderWidth: avatarBorderWidth + 'px',
                                                     borderColor: avatarBorderColor,
                                                     width: avatarSize + 'px',
                                                     height: avatarSize + 'px',
                                                 } }
                                            />
                                        </Tooltip>
                                        <Tooltip text={ __( 'Remove avatar' ) }>
                                            <span className={ 'dashicons dashicons-no advgb-testimonial-avatar-clear' }
                                                  onClick={ () => setAttributes( { avatarUrl3: undefined, avatarID3: undefined } ) }
                                            />
                                        </Tooltip>
                                    </div>
                                ) }
                            />
                            <RichText
                                tagName={ 'h4' }
                                className={ 'advgb-testimonial-name' }
                                value={ name3 }
                                onChange={ (value) => setAttributes( { name3: value } ) }
                                isSelected={ isSelected && currentEdit === 'name3' }
                                onSetup={ ( editor ) => this.handleSetup( editor, 'name3' ) }
                                style={ { color: nameColor } }
                                placeholder={ __( 'Text…' ) }
                            />
                            <RichText
                                tagName={ 'p' }
                                className={ 'advgb-testimonial-position' }
                                value={ position3 }
                                onChange={ (value) => setAttributes( { position3: value } ) }
                                isSelected={ isSelected && currentEdit === 'position3' }
                                onSetup={ ( editor ) => this.handleSetup( editor, 'position3' ) }
                                style={ { color: positionColor } }
                                placeholder={ __( 'Text…' ) }
                            />
                            <RichText
                                tagName={ 'p' }
                                className={ 'advgb-testimonial-desc' }
                                value={ desc3 }
                                onChange={ (value) => setAttributes( { desc3: value } ) }
                                isSelected={ isSelected && currentEdit === 'desc3' }
                                onSetup={ ( editor ) => this.handleSetup( editor, 'desc3' ) }
                                style={ { color: descColor } }
                                placeholder={ __( 'Text…' ) }
                            />
                        </div>
                    </div>
                </Fragment>
            )
        }
    }

    function AdvTestimonialSave( { attributes } ) {
        const {
            avatarUrl,
            avatarUrl2,
            avatarUrl3,
            avatarColor,
            avatarBorderRadius,
            avatarBorderWidth,
            avatarBorderColor,
            avatarSize,
            name,
            name2,
            name3,
            nameColor,
            position,
            position2,
            position3,
            positionColor,
            desc,
            desc2,
            desc3,
            descColor,
            columns,
        } = attributes;

        return (
            <div className={ 'advgb-testimonial' }>
                <div className={ 'advgb-testimonial-columns-one' }>
                    <div className={ 'advgb-testimonial-avatar-group' }>
                        <div className={ 'advgb-testimonial-avatar' }
                             style={ {
                                 backgroundImage: `url(${avatarUrl ? avatarUrl : advgbAvatar.holder})`,
                                 backgroundColor: avatarColor,
                                 borderRadius: avatarBorderRadius + '%',
                                 borderWidth: avatarBorderWidth + 'px',
                                 borderColor: avatarBorderColor,
                                 width: avatarSize + 'px',
                                 height: avatarSize + 'px',
                             } }
                        />
                    </div>
                    <h4 className={ 'advgb-testimonial-name' }
                        style={ { color: nameColor } }
                    >
                        { name }
                    </h4>
                    <p className={ 'advgb-testimonial-position' }
                       style={ { color: positionColor } }
                    >
                        { position }
                    </p>
                    <p className={ 'advgb-testimonial-desc' }
                       style={ { color: descColor } }
                    >
                        { desc }
                    </p>
                </div>
                {parseInt(columns) > 1 && (
                    <div className={ 'advgb-testimonial-columns-two' }>
                        <div className={ 'advgb-testimonial-avatar-group' }>
                            <div className={ 'advgb-testimonial-avatar' }
                                 style={ {
                                     backgroundImage: `url(${avatarUrl2 ? avatarUrl2 : advgbAvatar.holder})`,
                                     backgroundColor: avatarColor,
                                     borderRadius: avatarBorderRadius + '%',
                                     borderWidth: avatarBorderWidth + 'px',
                                     borderColor: avatarBorderColor,
                                     width: avatarSize + 'px',
                                     height: avatarSize + 'px',
                                 } }
                            />
                        </div>
                        <h4 className={ 'advgb-testimonial-name' }
                            style={ { color: nameColor } }
                        >
                            { name2 }
                        </h4>
                        <p className={ 'advgb-testimonial-position' }
                           style={ { color: positionColor } }
                        >
                            { position2 }
                        </p>
                        <p className={ 'advgb-testimonial-desc' }
                           style={ { color: descColor } }
                        >
                            { desc2 }
                        </p>
                    </div>
                ) }
                {parseInt(columns) > 2 && (
                    <div className={ 'advgb-testimonial-columns-two' }>
                        <div className={ 'advgb-testimonial-avatar-group' }>
                            <div className={ 'advgb-testimonial-avatar' }
                                 style={ {
                                     backgroundImage: `url(${avatarUrl3 ? avatarUrl3 : advgbAvatar.holder})`,
                                     backgroundColor: avatarColor,
                                     borderRadius: avatarBorderRadius + '%',
                                     borderWidth: avatarBorderWidth + 'px',
                                     borderColor: avatarBorderColor,
                                     width: avatarSize + 'px',
                                     height: avatarSize + 'px',
                                 } }
                            />
                        </div>
                        <h4 className={ 'advgb-testimonial-name' }
                            style={ { color: nameColor } }
                        >
                            { name3 }
                        </h4>
                        <p className={ 'advgb-testimonial-position' }
                           style={ { color: positionColor } }
                        >
                            { position3 }
                        </p>
                        <p className={ 'advgb-testimonial-desc' }
                           style={ { color: descColor } }
                        >
                            { desc3 }
                        </p>
                    </div>
                ) }
            </div>
        );
    }

    const testimonialBlockIcon = (
        <svg height="20" viewBox="2 2 22 22" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 3.3c1.49 0 2.7 1.21 2.7 2.7 0 1.49-1.21 2.7-2.7 2.7-1.49 0-2.7-1.21-2.7-2.7 0-1.49 1.21-2.7 2.7-2.7zM18 16H6v-.9c0-2 4-3.1 6-3.1s6 1.1 6 3.1v.9z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    );

    registerBlockType( 'advgb/testimonial', {
        title: __( 'Testimonial' ),
        description: __( 'Block for creating personal or team/group information.' ),
        icon: {
            src: testimonialBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined,
        },
        category: 'common',
        keywords: [ __( 'testimonial' ), __( 'personal' ), __( 'about' ) ],
        attributes: {
            avatarUrl: {
                type: 'string',
                default: advgbAvatar.holder,
            },
            avatarID: {
                type: 'number',
            },
            avatarUrl2: {
                type: 'string',
                default: advgbAvatar.holder,
            },
            avatarID2: {
                type: 'number',
            },
            avatarUrl3: {
                type: 'string',
                default: advgbAvatar.holder,
            },
            avatarID3: {
                type: 'number',
            },
            avatarColor: {
                type: 'string',
            },
            avatarBorderRadius: {
                type: 'number',
                default: 50,
            },
            avatarBorderWidth: {
                type: 'number',
            },
            avatarBorderColor: {
                type: 'string',
            },
            avatarSize: {
                type: 'number',
                default: 70,
            },
            name: {
                type: 'string',
                default: __( 'Person Name' ),
            },
            name2: {
                type: 'string',
                default: __( 'Person Name' ),
            },
            name3: {
                type: 'string',
                default: __( 'Person Name' ),
            },
            nameColor: {
                type: 'string',
            },
            position: {
                type: 'string',
                default: __( 'Job Position' ),
            },
            position2: {
                type: 'string',
                default: __( 'Job Position' ),
            },
            position3: {
                type: 'string',
                default: __( 'Job Position' ),
            },
            positionColor: {
                type: 'string'
            },
            desc: {
                type: 'string',
                default: __( 'A little description about this person will show up here.' ),
            },
            desc2: {
                type: 'string',
                default: __( 'A little description about this person will show up here.' ),
            },
            desc3: {
                type: 'string',
                default: __( 'A little description about this person will show up here.' ),
            },
            descColor: {
                type: 'string',
            },
            columns: {
                type: 'number',
                default: 1,
            },
            changed: {
                type: 'boolean',
                default: false,
            },
        },
        edit: AdvTestimonial,
        save: AdvTestimonialSave,
    } );
})( wp.i18n, wp.blocks, wp.element, wp.editor, wp.components );