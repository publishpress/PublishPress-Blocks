(function ( wpI18n, wpBlocks, wpBlockEditor ) {
    const { __ } = wpI18n;
    const { registerBlockType } = wpBlocks;
    const { InnerBlocks } = wpBlockEditor;

    const containerBlockIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="2 2 22 22">
            <path fill="none" d="M0 0h24v24H0V0z"/>
            <path d="M3 5v14h19V5H3zm2 2h15v4H5V7zm0 10v-4h4v4H5zm6 0v-4h9v4h-9z"/>
        </svg>
    );

    registerBlockType( 'advgb/container', {
        title: __( 'Container' ),
        description: __( 'Block for containing other blocks.' ),
        icon: {
            src: containerBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined,
        },
        category: 'advgb-category',
        keywords: [ __( 'container' ), __( 'row' ), __( 'box' ) ],
        attributes: {},
        supports: {
            align: true,
        },
        edit: function () {
            return (
                <div className="advgb-blocks-container">
                    <InnerBlocks />
                </div>
            )
        },
        save: function () {
            return (
                <div className="advgb-blocks-container">
                    <InnerBlocks.Content />
                </div>
            );
        },
    } );
})( wp.i18n, wp.blocks, wp.blockEditor );