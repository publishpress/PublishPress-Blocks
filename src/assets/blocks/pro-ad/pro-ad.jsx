(function ( wpI18n, wpHooks, wpBlockEditor ) {
    wpBlockEditor = wp.blockEditor || wp.editor;
    const { addFilter } = wpHooks;
    const { __ } = wpI18n;
    const { InspectorControls } = wpBlockEditor;

    const SUPPORTED_BLOCKS = [
        'advgb/accordion-item',
        'advgb/accordions'
    ];

    // Add Upgrade to Pro Ad in sidebar
    addFilter( 'editor.BlockEdit', 'advgb/proAd', function ( BlockEdit ) {
        return ( props ) => {
            return ( [
                <BlockEdit key="block-edit-custom-class-name" {...props} />,
                props.isSelected && SUPPORTED_BLOCKS.includes( props.name ) &&
                <InspectorControls key="advgb-custom-controls">
                    <div className="advgb-pro-ad-wrapper">
                        { __( 'Want more features?', 'advanced-gutenberg' ) }
                        <br/>
                        <a href="https://publishpress.com/links/blocks" class="advgb-pro-ad-btn" target="_blank">{ __( 'Upgrade to Pro', 'advanced-gutenberg' ) }</a>
                    </div>
                </InspectorControls>
            ] )
        }
    } );

})( wp.i18n, wp.hooks, wp.blockEditor );
