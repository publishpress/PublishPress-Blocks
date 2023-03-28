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

                    /*/ Replace original allowed block settings by our modified list
                    let new_settings = advgb_blocks_vars.original_settings;
                    //let new_settings = wp.data.select('core/editor').getEditorSettings();

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
                        'core/list-item',
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
                        'core/gallery',
                        'core/shortcode',
                        'core/file',
                        'core/pattern',
                        'core/navigation',
                        'core/navigation-link',
                        'core/navigation-submenu',
                        'core/template-part',
                        'core/post-author',
                        'core/post-navigation-link',
                        'core/post-comments',
                        'core/term-description',
                        'core/avatar',
                        'core/query-no-results',
                        'core/read-more',
                        'core/comment-author-name',
                        'core/comment-content',
                        'core/comment-date',
                        'core/comment-edit-link',
                        'core/comment-reply-link',
                        'core/comment-template',
                        'core/comments',
                        'core/comments-title',
                        'core/comments-query-loop',
                        'core/comments-pagination',
                        'core/comments-pagination-next',
                        'core/comments-pagination-numbers',
                        'core/comments-pagination-previous',
                        'core/post-comments-form',
                        'core/home-link',
                        'core/post-author-biography',
                        'core/page-list-item',
                        'core/post-author-name',
                        'core/legacy-widget',
                        'core/widget-group'
                    ];

                    core_blocks.forEach( function( element ) {
                        if ( wp.data.select( 'core/blocks' ).getBlockType( element ) ) {
                            wp.blocks.unregisterBlockType( element );
                        }
                    });

                    new_settings.allowedBlockTypes = granted_blocks;
                    const target = document.getElementById('editor'); // Do we need this?

                    // Initialize again the editor - Doesn't work - Cause inserter blink since WP 6.2
                    wp.editPost.initializeEditor('editor', advgb_blocks_vars.post_type, parseInt(advgb_blocks_vars.post_id), new_settings, []);

                    // It seems the best approach to update editor settings, however is overriden
                    // https://github.com/WordPress/gutenberg/issues/15993#issuecomment-1487007071
                    wp.data.dispatch('core/editor').updateEditorSettings({ allowedBlockTypes: granted_blocks })
                    .then((a) => console.log('end',a,wp.data.select('core/editor').getEditorSettings()));;*/

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
