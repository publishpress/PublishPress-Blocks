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
            iconsObject: Object.keys( advgbBlocks.iconList['material'] ),
            iconSetOptions: DEFAULT_ICON_OPTIONS,
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

        /*console.log('will mount');
        console.log(this.state)
        console.log(this.props);*/
    }

    componentWillUnmount() {
        // important
        document.removeEventListener('click', this.handleClick);

        /*this.setState( {
            iconSetOptions: DEFAULT_ICON_OPTIONS
        } );*/

        /*console.log('unmounting...');
        console.log(this.state)
        console.log(this.props);
        console.log('-----------------------');*/

        /*this.setState({
            selectedIconTheme: 'outlined',
            iconType: 'material',
            iconsObject: null
        });*/
    }

    componentDidMount() {

        // Get current icons set (from selected icon or default)
        this.setState({
            iconsObject: applyFilters(
                'advgb.iconFontObject',
                this.state.iconsObject,
                this.state.iconType,
                this.state.selectedIconTheme
            )
        });

        // Optionally add more icon sets to <select>
        const mergedOptions = applyFilters(
            'advgb.iconFontSetOptions',
            this.state.iconSetOptions
        );

        this.setState( {
            iconSetOptions: mergedOptions
        } );

        /*console.log('did mount');
        console.log(this.state)
        console.log(this.props);*/
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

            /*console.log(
                //prevState.selectedIconTheme,
                selectedIconTheme,
                iconType,
                iconsObject
            );*/
            /*console.log('did update');
            console.log(this.state)
            console.log(this.props);*/
        }
    }

    handleClick(e) {
        // ignore clicks inside the popup and the click that launched the popup
        if (this.node.contains(e.target) || e.target.className.includes('advgb-browse-image-btn') || e.target.className.includes('advgb-browse-icon-btn')) {
            return;
        }
        this.props.closePopup();
    }


    render() {
        const { searchedText, selectedIcon, selectedIconTheme, iconType, iconsObject } = this.state;
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
                                        console.log(value,this.state.selectedIconTheme);
                                    } }
                                />
                                <div className="advgb-icon-items-wrapper button-icons-list" style={ {maxHeight: 300, overflowY: 'auto', overflowX: 'hidden'} }>

                                    { iconsObject
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
                                                                'advgb.iconFontRender',
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
                                        this.props.onSelectIcon( selectedIcon );
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
