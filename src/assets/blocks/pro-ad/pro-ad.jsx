(function ( wpI18n, wpHooks, wpBlockEditor ) {
    wpBlockEditor = wp.blockEditor || wp.editor;
    const { addFilter } = wpHooks;
    const { sprintf, __ } = wpI18n;
    const { InspectorControls } = wpBlockEditor;

    const SUPPORTED_BLOCKS = [
        'advgb/accordion-item',
        'advgb/accordions',
        'advgb/adv-tabs',
        'advgb/adv-tab',
        'advgb/recent-posts',
        'advgb/images-slider',
        'advgb/button',
        'advgb/list',
        'advgb/count-up'
    ];

    function advgbGetBlockTitle(name){
        switch(name){
            case 'advgb/accordion-item':
            case 'advgb/accordions':
                return __( 'Accordion', 'advanced-gutenberg' );
                break;

            case 'advgb/adv-tabs':
            case 'advgb/tab':
                return __( 'Tabs', 'advanced-gutenberg' );
                break;

            case 'advgb/recent-posts':
                return __( 'Content Display', 'advanced-gutenberg' );
                break;

            case 'advgb/images-slider':
                return __( 'Images Slider', 'advanced-gutenberg' );
                break;

            case 'advgb/button':
                return __( 'Button', 'advanced-gutenberg' );
                break;

            case 'advgb/list':
                return __( 'List', 'advanced-gutenberg' );
                break;

            case 'advgb/count-up':
                return __( 'Count Up', 'advanced-gutenberg' );
                break;

            default:
                return __( 'PublishPress', 'advanced-gutenberg' );
                break
        }
    }

    // Add Upgrade to Pro Ad in sidebar
    addFilter( 'editor.BlockEdit', 'advgb/proAd', function ( BlockEdit ) {
        return ( props ) => {
            return ( [
                <BlockEdit key="block-edit-custom-class-name" {...props} />,
                props.isSelected && SUPPORTED_BLOCKS.includes( props.name ) &&
                <InspectorControls key="advgb-custom-controls">
                    <div className="components-panel__body advgb-pro-ad-wrapper">
                        { sprintf(
                            __( 'Want more features in your %s blocks?', 'advanced-gutenberg' ),
                            advgbGetBlockTitle(props.name)
                        ) }
                        <br/>
                        <a href="https://publishpress.com/links/blocks" class="advgb-pro-ad-btn" target="_blank">
                            { __( 'Upgrade to Pro', 'advanced-gutenberg' ) }
                        </a>
                    </div>
                </InspectorControls>,
            ] )
        }
    } );

})( wp.i18n, wp.hooks, wp.blockEditor );
