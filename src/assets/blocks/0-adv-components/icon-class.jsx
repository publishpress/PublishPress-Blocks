const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { SelectControl, TextControl } = wp.components;
const { applyFilters } = wp.hooks;

const DEFAULT_ICON_OPTIONS = [
    { label: __('Filled', 'advanced-gutenberg'), value: '' },
    { label: __('Outlined', 'advanced-gutenberg'), value: 'outlined' },
    { label: __('Rounded', 'advanced-gutenberg'), value: 'round' },
    { label: __('Two-Tone', 'advanced-gutenberg'), value: 'two-tone' },
    { label: __('Sharp', 'advanced-gutenberg'), value: 'sharp' },
];

class IconListPopup extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            searchedText: '',
            selectedIcon: '',
            selectedIconTheme: 'outlined',
            iconType: 'material',
            iconsObject: null,
            iconSetOptions: DEFAULT_ICON_OPTIONS,
            loading: true
        }
    }

    componentWillMount() {
        const {searchedText, selectedIconTheme} = this.state;
        if(this.props.selectedIcon !== searchedText) {
            this.setState({
                selectedIcon: this.props.selectedIcon,
            });
        }

        if(this.props.selectedIconTheme !== selectedIconTheme) {
            this.setState({
                selectedIconTheme: this.props.selectedIconTheme
            });
        }

        document.addEventListener('click', this.handleClick)
    }

    componentWillUnmount() {
        // important
        document.removeEventListener('click', this.handleClick);
    }

    componentDidMount() {
        const { iconSetOptions, selectedIconTheme, iconType, iconsObject } = this.state;

        /* Change defaults if selectedIconTheme and/or iconType are different.
         * and o add more icon sets to <select>
         */
        const newIconSetOptions = applyFilters(
            'advgb.iconFontSetOptions',
            iconSetOptions
        );

        const newIconsObject = applyFilters(
            'advgb.iconFontObject',
            Object.keys( advgbBlocks.iconList['material'] ),
            iconType,
            selectedIconTheme
        );

        this.setState( {
            iconSetOptions: newIconSetOptions,
            iconsObject: newIconsObject,
            loading: false
        } );
    }

    componentDidUpdate( prevProps, prevState ) {
        const { iconType, selectedIconTheme, iconsObject } = this.state;

        /* Update iconType and iconsObject when selected icon style changes.
         * selectedIconTheme examples: 'two-tone', 'fa-solid'
         * iconType examples: 'fontawesome', 'material'
         * iconObjects examples: advgbBlocks.iconList['material'] or ...
         */
        if( prevState.selectedIconTheme !== selectedIconTheme ) {

            const newIconType = applyFilters(
                'advgb.iconFontType',
                iconType,
                selectedIconTheme
            );

            const newIconsObject = applyFilters(
                'advgb.iconFontObject',
                iconsObject,
                newIconType,
                selectedIconTheme
            );

            this.setState( {
                iconType: newIconType,
                iconsObject: newIconsObject
            } );
        }
    }

    handleClick(e) {
        // ignore clicks inside the popup and the click that launched the popup
        if ( this.node.contains(e.target )
            || e.target.className.includes( 'advgb-browse-image-btn' )
            || e.target.className.includes( 'advgb-browse-icon-btn' )
        ) {
            return;
        }
        this.props.closePopup();
    }


    render() {
        const { searchedText, selectedIcon, selectedIconTheme, iconType, iconsObject, loading } = this.state;
        const popUpTitle = __('Icon List', 'advanced-gutenberg');

        const applyIconButtonClass = [
            'apply-btn',
            'components-button',
            'button button-large',
            'advgb-icon-apply-btn',
            'is-primary'
        ].filter( Boolean ).join( ' ' );

        const closeButtonClass = [
            'close-btn',
        ].filter( Boolean ).join( ' ' );

        return (
            <Fragment>
                <div className='advgb-icon-popup'>
                    <div
                        className='popup-inner'
                        ref={node => {this.node = node}}
                    >
                        <div className="popup-content">
                            <div className="popup-header">
                                <h3>{popUpTitle}</h3>
                                <button
                                    className={closeButtonClass}
                                    onClick={this.props.closePopup}>
                                    <i className="material-icons">close</i>
                                </button>
                            </div>
                            <div className="popup-body">
                                <TextControl
                                    placeholder={ __( 'Search icons', 'advanced-gutenberg' ) }
                                    value={ searchedText }
                                    onChange={ (value) => this.setState( { searchedText: value } ) }
                                />
                                <SelectControl
                                    label={ __('Style', 'advanced-gutenberg') }
                                    value={ selectedIconTheme }
                                    className="advgb-icon-style-select"
                                    options={ this.state.iconSetOptions }
                                    onChange={ ( value ) => {
                                        this.setState({
                                            selectedIconTheme: value,
                                        });
                                    } }
                                />
                                <div className="advgb-icon-items-wrapper button-icons-list" style={ {maxHeight: 300, overflowY: 'auto', overflowX: 'hidden'} }>

                                    { loading &&
                                        <div>
                                            { __( 'Loading...', 'advanced-gutenberg' ) }
                                        </div>
                                    }
                                    { ! loading &&
                                        iconsObject
                                        .filter((icon) => icon.indexOf(searchedText.trim().split(' ').join('_')) > -1)
                                        .map( (icon, index) => {

                                            const iconClass = [
                                                iconType === 'material' && 'material-icons',
                                                iconType === 'material' && selectedIconTheme !== '' && `-${selectedIconTheme}`
                                            ].filter( Boolean ).join('');

                                            return (
                                                <div className="advgb-icon-item" key={ index }>
                                                        <span
                                                            onClick={ () => {
                                                                this.setState({
                                                                    selectedIcon: icon
                                                                })
                                                            } }
                                                            className={ icon === selectedIcon && 'active' }
                                                            title={ icon }
                                                        >
                                                            { applyFilters(
                                                                'advgb.iconFontRenderPreview',
                                                                <i className={ iconClass }>{ icon }</i>,
                                                                icon,
                                                                iconClass,
                                                                iconType,
                                                                selectedIconTheme
                                                            ) }
                                                        </span>
                                                </div>
                                            )
                                        } )
                                    }
                                </div>
                            </div>
                            <div className="popup-footer">
                                <button
                                    disabled={selectedIcon === ''}
                                    className={applyIconButtonClass}
                                    onClick={() => {
                                        this.props.onSelectIcon(selectedIcon);
                                        this.props.onSelectIconTheme(selectedIconTheme);
                                        this.props.closePopup();
                                    }}>
                                    { __('Apply', 'advanced-gutenberg') }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
export default IconListPopup;

export function IconListPopupHook(props) {
    const { closePopup, onSelectIcon, onSelectIconTheme, selectedIcon, selectedIconTheme } = props;
    return (
        <IconListPopup
            closePopup={ closePopup }
            onSelectIcon={ onSelectIcon }
            onSelectIconTheme={ onSelectIconTheme }
            selectedIcon={ selectedIcon }
            selectedIconTheme={ selectedIconTheme }
        />
    );
}

export function AdvIcon( props ) {
    const {
        icon,
        iconClass,
        iconTheme,
        iconDisplay = props.iconDisplay || false,
        filter = props.filter || true
    } = props;

    // Don't apply filters on save function
    if( ! filter ) {
        return( <span className={ iconClass }>{ icon }</span> );
    }

    return (
        applyFilters(
            'advgb.iconFontRenderInsert',
            <span className={ iconClass }>{ icon }</span>,
            icon,
            iconClass,
            iconTheme,
            iconDisplay
        )
    )
}
