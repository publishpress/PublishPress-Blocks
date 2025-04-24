if (typeof wp !== 'undefined' && typeof wp.domReady !== 'undefined'){
    wp.domReady(()=>{
        let block_acess_restricted = false;
        let user_block_features = false;

        if(advgb_blocks_vars.blocks.active_blocks === 'undefined' || advgb_blocks_vars.blocks.active_blocks.length === 0) {
            // No Block Access defined for this role
            block_acess_restricted = true;
        }

        if(advgb_blocks_vars.user_block_features !== 'undefined' && advgb_blocks_vars.user_block_features) {
            // No Block Access defined for this role
            user_block_features = advgb_blocks_vars.user_block_features;
        }

        let gutenberg_init_function = null;
        if (typeof window._wpLoadBlockEditor !== 'undefined') {
            gutenberg_init_function = window._wpLoadBlockEditor;
        }

        if (gutenberg_init_function !== null) {
            // Wait for Gutenberg editor to be ready
            gutenberg_init_function.then(() => {

                if (user_block_features) {
                    let custom_style = document.createElement('style');
                    let custom_css = '';
                    // Handle block adding restriction
                    if (typeof user_block_features.disable_block_adding !== 'undefined' && user_block_features.disable_block_adding) {
                        setTimeout( function() {
                            // Remove the block inserter completely
                            wp.data.dispatch('core/editor').setIsInserterOpened(false);
                            wp.data.dispatch('core/editor').removeEditorPanel('inserter');
                            // Remove the ability to insert blocks
                            wp.data.dispatch('core/editor').updateEditorSettings({
                                hasInserter: false,
                                allowedBlockTypes: false,
                            });
                        }, 3000 );
                        // no need to process custom block permission since we removed all before
                        block_acess_restricted = false;


                        // Add CSS to hide all block insertion UI elements incase any still remain
                        custom_css += `
                            .editor-document-tools__left button.components-toolbar-button editor-document-tools__inserter-toggle,
                            .editor-document-tools__left button[aria-label="Block Inserter"],
                            .edit-post-header-toolbar__inserter-toggle,
                            .block-editor-inserter,
                            .block-editor-block-list__insertion-point-inserter,
                            .block-editor-default-block-appender {
                                display: none !important;
                            }
                        `;
                    }

                    // Handle pattern directory restriction
                    if (typeof user_block_features.disable_pattern_directory !== 'undefined' && user_block_features.disable_pattern_directory) {
                        custom_css += `
                            .editor-inserter-sidebar button[id*="-patterns-view"],
                            .editor-inserter-sidebar button[aria-controls*="-patterns-view"],
                            .block-editor-inserter__block-patterns-tabs-container,
                            .block-editor-tabbed-sidebar__tabpanel[id*="-patterns-view"],
                            .block-editor-tabbed-sidebar__tab[id*="-patterns-view"],
                            .block-editor-block-patterns-list,
                            .block-editor-tabbed-sidebar__tabpanel[aria-labelledby*="-patterns"],
                            .block-editor-tabbed-sidebar__tab[aria-labelledby*="-patterns"] {
                                display: none !important;
                            }
                        `;
                    }

                    // Handle Openverse restriction
                    if (typeof user_block_features.disable_openverse !== 'undefined' && user_block_features.disable_openverse) {
                        custom_css += `
                            .block-editor-inserter__media-tabs-container button[id*="-openverse"],
                            .block-editor-inserter__media-tabs-container button[aria-controls*="-openverse-view"] {
                                display: none !important;
                            }
                        `;
                    }

                    if ( custom_css ) {
                        custom_style.innerHTML = custom_css;
                        document.head.appendChild( custom_style );
                    }

                }

                if (advgb_blocks_vars.original_settings.allowedBlockTypes !== true) {
                    // allowed_block_types filter has been used, in this case we do nothing as we don't know why blocks have been filtered
                    block_acess_restricted = false;
                }

                if (!block_acess_restricted) {
                    // TODO: Write description
                    return;
                }
                let list_blocks = [];
                let granted_blocks = [];
                let missing_block = false;
                // Retrieve all registered blocks
                let blocks = wp.blocks.getBlockTypes();
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
                        missing_block = true;
                    }
                }

                if (missing_block) {
                    if (console !== undefined && console.error !== undefined) {
                        // Let's output as log instead of error
                        console.log('Reloading editor by PublishPress Blocks plugin');
                    }

                    /* It seems the best approach to update editor settings, however is overriden
                     * https://github.com/WordPress/gutenberg/issues/15993#issuecomment-1487007071
                     * We're adding 3 seconds delay to bypass the override */
                    setTimeout( function() {
                        wp.data.dispatch('core/editor').updateEditorSettings({
                            allowedBlockTypes: granted_blocks
                        });
                    }, 3000 );

                    var list_categories = wp.blocks.getCategories();

                    try {
                        // Use this ajax query to update the block list in db
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
                                //console.log(data);
                            }
                        });
                    } catch (e) {
                        //console.log(e);
                    }
                }
            });
        }
    });

}
