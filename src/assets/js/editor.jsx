wp.domReady( function() {

    if(advgb_blocks_vars.blocks.active_blocks === 'undefined' || advgb_blocks_vars.blocks.active_blocks.length === 0) {
        // No Block Access defined for this role, so we stop the process here
        return;
    }

    if (advgb_blocks_vars.original_settings.allowedBlockTypes !== true) {
        // allowed_block_types filter has been used, in this case we do nothing as we don't know why blocks have been filtered
        return;
    }

    let list_blocks = [];
    let granted_blocks = [];
    let missing_block = false;
    // Retrieve all registered blocks
    // @TODO - Fix why not all the blocks are detected at this point in site editor and widgets screens
    let blocks = wp.blocks.getBlockTypes();

    console.log('blocks (1)',blocks);
    const savedBlocks = {
        active_blocks: Object.values(advgb_blocks_vars.blocks.active_blocks),
        inactive_blocks: Object.values(advgb_blocks_vars.blocks.inactive_blocks),
    };

    for (let block in blocks) {
        var blockItemIcon = '';
        var blockItem = {
            name: blocks[block].name,
            icon: blocks[block].icon.src,
            title: blocks[block].title,
            category: blocks[block].category,
            parent: blocks[block].parent
        };

        var savedIcon = !!blocks[block].icon.src ? blocks[block].icon.src : blocks[block].icon;

        if (blocks[block].icon.foreground !== undefined) blockItem.iconColor = blocks[block].icon.foreground;

        if (typeof savedIcon === 'function') {
            if(typeof savedIcon.prototype !== 'undefined') {
                blockItem.icon = wp.element.renderToString(wp.element.createElement(savedIcon));
                blockItem.icon = blockItem.icon.replace(/stopcolor/g, 'stop-color');
                blockItem.icon = blockItem.icon.replace(/stopopacity/g, 'stop-opacity');
            } else {
                blockItemIcon = wp.element.createElement(wp.components.Dashicon, {icon: 'block-default'});
                blockItem.icon = wp.element.renderToString(blockItemIcon);
            }
        } else if (typeof savedIcon === 'object') {
            blockItem.icon = wp.element.renderToString(savedIcon);
            blockItem.icon = blockItem.icon.replace(/stopcolor/g, 'stop-color');
            blockItem.icon = blockItem.icon.replace(/stopopacity/g, 'stop-opacity');
        } else if (typeof savedIcon === 'string') {
            blockItemIcon = wp.element.createElement(wp.components.Dashicon, {icon: savedIcon});
            blockItem.icon = wp.element.renderToString(blockItemIcon);
        }
        list_blocks.push(blockItem);


        // Compare current block with the list of blocks we have
        if (savedBlocks.active_blocks.indexOf(blocks[block].name) >= 0) {
            // Block is active
            granted_blocks.push(blocks[block].name);
        } else if (savedBlocks.inactive_blocks.indexOf(blocks[block].name) >= 0) {
            // Block is inactive
        } else {
            // This block is not in our database yet, but by default we allow the usage
            granted_blocks.push(blocks[block].name);
            console.log(blocks[block].name);
            missing_block = true;
        }
    }

    console.log('granted_blocks',granted_blocks);

    if (missing_block) {

        if (console !== undefined && console.error !== undefined) {
            // Let's output as log instead of error
            console.log('Reloading editor by PublishPress Blocks plugin');
        }

        let gutenberg_init_function = null;
        const list_categories = wp.blocks.getCategories();

        if ( typeof window._wpLoadBlockEditor !== 'undefined' ) {
            // Post edit

            console.log('Post edit');

            gutenberg_init_function = window._wpLoadBlockEditor;
            gutenberg_init_function.then( function () {

                /* It seems the best approach to update editor settings, however is overriden
                 * https://github.com/WordPress/gutenberg/issues/15993#issuecomment-1487007071
                 * We're adding 1 second delay to bypass the override */
                /*setTimeout( function() {
                    wp.data.dispatch('core/editor').updateEditorSettings({
                        allowedBlockTypes: granted_blocks
                    });
                    console.log('updated!');
                }, 1000 );*/

                // Update block list in database
                //updateBlocksListOption( list_blocks, list_categories );
            });
        } else if( wp.data.select('core/edit-site') ) {
            /* Site editor
             * @TODO - Include block types not stored in advgb_blocks_list option
             * and update block list in database
             * without excluding the ones not loading in Site editor screen either core blocks.
             * Likely due wp.blocks.getBlockTypes() not getting all the registered blocks
             * when is executed in first lines
             * due we require an equivalent of window._wpLoadBlockEditor for Site Editor screen */

            console.log('Site editor');

            // We're adding 1 second delay to bypass the override
            setTimeout( function() {
                wp.data.dispatch('core/edit-site').updateSettings({
                    allowedBlockTypes: granted_blocks,
                });
                console.log('updated!');
            }, 1000 );

            // Update block list in database
            updateBlocksListOption( list_blocks, list_categories );
        } else {
            /* Widgets - Customizer
             * @TODO - Include block types not stored in advgb_blocks_list option
             * and update block list in database
             * without excluding the ones not loading in Widgets screen.
             * Likely due wp.blocks.getBlockTypes() not getting all the registered blocks
             * when is executed in first lines
             * due we require an equivalent of window._wpLoadBlockEditor for Widgets screen */

             console.log('Widgets');
        }
    }

    /**
     * Update block list in database
     *
     * @since 3.1.5
     *
     * @param {array} list_blocks
     * @param {array} list_categories
     *
     * @return {void}
     */
    function updateBlocksListOption( list_blocks, list_categories ) {
        try {
            console.log('ajax starts...');
            jQuery.ajax({
                url: advgb_blocks_vars.ajaxurl,
                method: 'POST',
                data: {
                    action: 'advgb_update_blocks_list',
                    blocksList: JSON.stringify(list_blocks),
                    categoriesList: JSON.stringify(list_categories),
                    nonce: advgb_blocks_vars.nonce
                },
                success: function (data) {
                    console.log(data);
                    console.log('list_blocks',list_blocks);
                    console.log('list_categories',list_categories);
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

} );
