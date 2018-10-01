window.onload = function () {
    if (typeof wp.blocks !== 'undefined') {
        if (wp.blockLibrary && typeof wp.blockLibrary.registerCoreBlocks === 'function') {
            wp.blockLibrary.registerCoreBlocks();
        }

        var allBlocks = wp.blocks.getBlockTypes();
        var allCategories = wp.blocks.getCategories();
        var listBlocks = [];
        var nonce = '';

        allBlocks.forEach(function (block) {
            var blockItemIcon = '';
            var blockItem = {
                name: block.name,
                icon: block.icon.src,
                title: block.title,
                category: block.category
            };

            var savedIcon = !!block.icon.src ? block.icon.src : block.icon;

            if (block.icon.foreground !== undefined) blockItem.iconColor = block.icon.foreground;

            if (typeof savedIcon === 'function') {
                blockItem.icon = wp.element.renderToString(savedIcon());
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

            listBlocks.push(blockItem);
            return block;
        });

        if (typeof updateListNonce !== 'undefined') {
            nonce = updateListNonce.nonce;
        } else {
            nonce = jQuery('#advgb_nonce_field').val();
        }

        jQuery.ajax({
            url: ajaxurl,
            method: 'POST',
            data: {
                action: 'advgb_update_blocks_list',
                blocksList: listBlocks,
                categoriesList: allCategories,
                nonce: nonce
            },
            success: function (res) {
                if (typeof advgbUpdate !== 'undefined' && advgbUpdate.onProfile) {
                    var $ = jQuery;

                    // Remove non-exist categories
                    $('.category-block').each(function () {
                        var catName = $(this).data('category');
                        var existCat = false;
                        res.categories_list.forEach(function (category) {
                            if (catName === category.slug) existCat = true;
                        });

                        if (!existCat) $(this).remove();
                    });

                    // Remove non-exist blocks
                    $('.block-item').each(function () {
                        var blockName = $(this).data('type');
                        var existBlock = false;
                        res.blocks_list.forEach(function (block) {
                            if (blockName === block.name)
                                existBlock = true;
                        });

                        if (!existBlock) $(this).remove();
                    });

                    // Update categories
                    res.categories_list.forEach(function (category) {
                        var categoryBlock = $('.category-block[data-category="'+ category.slug +'"]');
                        if (categoryBlock.length > 0) {
                            categoryBlock.find('h3.category-name').text(category.title);
                        } else {
                            var categoryHTML = '';
                            categoryHTML += '<div class="category-block clearfix" data-category='+ category.slug +'>';
                            categoryHTML +=     '<h3 class="category-name">';
                            categoryHTML +=         '<span>'+ category.title +'</span>';
                            categoryHTML +=         '<i class="mi"></i>';
                            categoryHTML +=     '</h3>';
                            categoryHTML +=     '<ul class="blocks-list"></ul>';
                            categoryHTML += '</div>';

                            $('.blocks-section').append(categoryHTML);
                        }
                    });

                    // Update blocks
                    res.blocks_list.forEach(function (block) {
                        var theBlock = $('li.block-item[data-type="'+ block.name +'"]');
                        if (theBlock.length > 0) {
                            theBlock.find('.block-title').text(block.title);
                            theBlock.find('label').find('i').remove();
                            theBlock.find('label').find('svg').remove();
                            if (block.icon.indexOf('<svg') > -1) {
                                theBlock.find('.ju-setting-label').find('.block-icon').prepend(block.icon);
                            } else {
                                theBlock.find('.ju-setting-label').find('.block-icon').prepend('<i class="dashicons dashicons-'+ block.icon +'"></i>');
                            }

                            if (block.iconColor) {
                                theBlock.find('.ju-setting-label').find('.block-icon').css('color', block.iconColor);
                            }
                        } else {
                            var blockHTML = '';
                            blockHTML += '<li class="block-item ju-settings-option new-block" data-type="'+ block.name +'">';
                            blockHTML +=    '<label for="'+ block.name +'" class="ju-setting-label">';
                            blockHTML +=        '<span class="block-icon"';
                            if (block.iconColor) {
                                blockHTML += ' style="color:'+ block.iconColor +'"';
                            }
                            blockHTML += '>';
                            if (block.icon.indexOf('<svg') > -1) {
                                blockHTML +=    block.icon;
                            } else {
                                blockHTML +=    '<i class="dashicons dashicons-'+ block.icon +'"></i>';
                            }
                            blockHTML +=        '</span>';
                            blockHTML +=        '<span class="block-title">'+ block.title +'</span>';
                            blockHTML +=    '</label>';
                            blockHTML +=    '<div class="ju-switch-button">';
                            blockHTML +=        '<label class="switch">';
                            blockHTML +=            '<input id="'+ block.name +'" type="checkbox" name="active_blocks[]" value="'+ block.name +'"/>';
                            blockHTML +=            '<span class="slider"></span>';
                            blockHTML +=        '</label>';
                            blockHTML +=    '</div>';
                            blockHTML += '</li>';

                            var categoryBlock = $('.category-block[data-category="'+ block.category +'"]');
                            categoryBlock.find('.blocks-list').append(blockHTML);
                        }
                    });

                    $('.new-block').on('mouseenter', function () {
                        $(this).removeClass('new-block');
                    });

                    $('#update-list-btn').removeAttr('disabled')
                        .find('span').text('Refresh')
                        .parent().find('i').removeClass('rotating');

                    $('#block-update-notice').fadeIn(500).delay(2000).fadeOut(500);
                } else if (typeof updateListNonce !== 'undefined') {
                    var $ = jQuery;
                    var loadingBlocksSection = $('.blocks-not-loaded');
                    var listBlockWrapper = $('.blocks-config-list');

                    if (listBlockWrapper.length > 0) {
                        loadingBlocksSection.remove();
                        listBlockWrapper.html('');

                        var advgbBlocks = res.blocks_list.filter( function ( block ) {
                            return block.name.indexOf( 'advgb/' ) > -1;
                        } );

                        advgbBlocks.forEach( function ( block ) {
                            var blockHTML = '';

                            blockHTML += '<li class="block-config-item ju-settings-option">';
                            blockHTML +=   '<span class="block-icon" style="color: '+ block.iconColor +'">';
                            blockHTML +=      block.icon;
                            blockHTML +=   '</span>';
                            blockHTML +=   '<span class="block-title">';
                            blockHTML +=      block.title;
                            blockHTML +=   '</span>';
                            blockHTML +=   '<i class="mi mi-settings block-config-button" title="Edit" data-block="'+ block.name +'">';
                            blockHTML +=   '</i>';
                            blockHTML += '</li>';

                            listBlockWrapper.append( blockHTML );
                        } );

                        initBlockConfigButton();
                    }
                }
            },
            error: function () {
                if (typeof advgbUpdate !== 'undefined' && advgbUpdate.onProfile)
                    window.location.href = window.location.href.replace('&update_blocks_list=true', '');
            }
        });
    }
};