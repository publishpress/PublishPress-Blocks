if (typeof wp !== 'undefined' && typeof wp.domReady !== 'undefined'){
    wp.domReady(()=>{

        if(advgb_blocks_vars.blocks.active_blocks === 'undefined' || advgb_blocks_vars.blocks.active_blocks.length === 0) {
            // No Block Access defined for this role, so we stop the process here
            return;
        }

        let gutenberg_init_function = null;
        if (typeof window._wpLoadBlockEditor !== 'undefined') {
            gutenberg_init_function = window._wpLoadBlockEditor;
        }

        if (gutenberg_init_function !== null) {
            // Wait for Gutenberg editor to be ready
            gutenberg_init_function.then(() => {
                if (advgb_blocks_vars.original_settings.allowedBlockTypes !== true) {
                    // allowed_block_types filter has been used, in this case we do nothing as we don't know why blocks have been filtered
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

                // Add Widgets Legacy and Area blocks manually
                if( advgbBlocks.blocks_widget_support ) {
                    blocks.push({
                      "name": "core/legacy-widget",
                      "icon": {
                        "src": "block-default",
                      },
                      "title": "Legacy Widget",
                      "category": "widgets",
                    },
                    {
                      "name": "core/widget-area",
                      "icon": {
                        "src": "block-default",
                      },
                      "category": "widgets",
                      "title": "Widget Area",
                    });
                }

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
                        if (typeof savedIcon.prototype !== 'undefined') {
                            if (!!savedIcon.prototype.render) {
                                blockItem.icon = wp.element.renderToString(wp.element.createElement(savedIcon));
                            } else {
                                blockItem.icon = wp.element.renderToString(savedIcon);
                            }
                        } else {
                            blockItemIcon = wp.element.createElement(wp.components.Dashicon, {icon: 'block-default'});
                            blockItem.icon = wp.element.renderToString(blockItemIcon);
                        }
                        blockItem.icon = blockItem.icon.replace(/stopcolor/g, 'stop-color');
                        blockItem.icon = blockItem.icon.replace(/stopopacity/g, 'stop-opacity');
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

                //console.log('missing_block: ' + missing_block);

                if (missing_block) {
                    if (console !== undefined && console.error !== undefined) {
                        // Let's output as log instead of error
                        console.log('Reloading editor by PublishPress Blocks plugin');
                    }
                    // Replace original allowed block settings by our modified list
                    let new_settings = advgb_blocks_vars.original_settings;

                    // Unregister core blocks to avoid registering twice later through wp.editPost.initializeEditor
                    const core_blocks = [
                        'core/paragraph',
                        'core/image',
                        'core/heading',
                        'core/list',
                        'core/quote',
                        'core/archives',
                        'core/audio',
                        'core/button',
                        'core/buttons',
                        'core/calendar',
                        'core/categories',
                        'core/code',
                        'core/columns',
                        'core/column',
                        'core/cover',
                        'core/embed',
                        'core/group',
                        'core/freeform',
                        'core/html',
                        'core/media-text',
                        'core/latest-comments',
                        'core/latest-posts',
                        'core/missing',
                        'core/more',
                        'core/nextpage',
                        'core/page-list',
                        'core/preformatted',
                        'core/pullquote',
                        'core/rss',
                        'core/search',
                        'core/separator',
                        'core/block',
                        'core/social-links',
                        'core/social-link',
                        'core/spacer',
                        'core/table',
                        'core/tag-cloud',
                        'core/text-columns',
                        'core/verse',
                        'core/video',
                        'core/site-logo',
                        'core/site-tagline',
                        'core/site-title',
                        'core/query',
                        'core/post-template',
                        'core/query-title',
                        'core/query-pagination',
                        'core/query-pagination-next',
                        'core/query-pagination-numbers',
                        'core/query-pagination-previous',
                        'core/post-title',
                        'core/post-content',
                        'core/post-date',
                        'core/post-excerpt',
                        'core/post-featured-image',
                        'core/post-terms',
                        'core/loginout',
                        'core/legacy-widget',
                        'core/widget-area',
                        'core/gallery',
                        'core/shortcode',
                        'core/file'
                    ];

                    core_blocks.forEach( function( element ) {
                        if ( wp.data.select( 'core/blocks' ).getBlockType( element ) ) {
                            wp.blocks.unregisterBlockType( element );
                        }
                    });

                    new_settings.allowedBlockTypes = granted_blocks;
                    const target = document.getElementById('editor');

                    // Initialize again the editor
                    wp.editPost.initializeEditor('editor', advgb_blocks_vars.post_type, advgb_blocks_vars.post_id, new_settings, window._wpGutenbergDefaultPost);

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
