(function( wpI18n, wpBlocks, wpEditor ) {
    const { __ } = wpI18n;
    const { registerBlockType } = wpBlocks;
    const { InnerBlocks } = wpEditor;

    const tabsBlockIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="none" d="M0,0h24v24H0V0z"/>
            <path fill="none" d="M0,0h24v24H0V0z"/>
            <path d="M21,3H3C1.9,3,1,3.9,1,5v14c0,1.1,0.9,2,2,2h18c1.1,0,2-0.9,2-2V5C23,3.9,22.1,3,21,3z M21,19H3V5h10v4h8V19z"/>
        </svg>
    );

    registerBlockType( 'advgb/tab', {
        title: __( 'Tab' ),
        parent: [ 'advgb/tabs' ],
        icon: tabsBlockIcon,
        description: __( 'Tab content block for Adv Tabs block.' ),
        category: 'formatting',
        attributes: {
            blockID: {
                type: 'string',
            },
        },
        supports: {
            inserter: false,
        },
        edit: function (props) {
            const selector = wp.data.select('core/editor');
            const rootBlockID = selector.getBlockRootClientId(props.clientId);
            const rootBlock = selector.getBlock(rootBlockID);
            const rootBlockSavedID = rootBlock.attributes.blockID;
            const blockIndex = selector.getBlockIndex(props.clientId, rootBlockID);

            if (!props.attributes.blockID) {
                props.setAttributes( { blockID: rootBlockSavedID + '-' + blockIndex } )
            }

            return <InnerBlocks templateLock={ false } />;
        },
        save: function (props) {
            const { blockID } = props.attributes;

            return (
                <div id={ `advgb-tab-${blockID}` }>
                    <InnerBlocks.Content />
                </div>
            );
        },
    } );
})( wp.i18n, wp.blocks, wp.editor );