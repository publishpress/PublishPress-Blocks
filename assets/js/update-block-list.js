window.onload = function () {
    if (typeof wp.blocks !== 'undefined') {
        if (typeof wp.blocks.registerCoreBlocks === 'function') {
            wp.blocks.registerCoreBlocks();
        } else if (typeof wp.coreBlocks.registerCoreBlocks === 'function') {
            wp.coreBlocks.registerCoreBlocks();
        }

        var allBlocks = wp.blocks.getBlockTypes();
        var allCategories = wp.blocks.getCategories();
        var listBlocks = [];
        var nonce = '';

        allBlocks.forEach(function (block) {
            var blockItemIcon = '';
            var blockItem = {
                name: block.name,
                icon: block.icon,
                title: block.title,
                category: block.category
            };

            if (typeof block.icon === 'function') {
                blockItem.icon = wp.element.renderToString(block.icon());
                blockItem.icon = blockItem.icon.replace(/stopcolor/g, 'stop-color');
                blockItem.icon = blockItem.icon.replace(/stopopacity/g, 'stop-opacity');
            } else if (typeof block.icon === 'object') {
                blockItem.icon = wp.element.renderToString(block.icon);
                blockItem.icon = blockItem.icon.replace(/stopcolor/g, 'stop-color');
                blockItem.icon = blockItem.icon.replace(/stopopacity/g, 'stop-opacity');
            } else if (typeof block.icon === 'string') {
                blockItemIcon = wp.element.createElement(wp.components.Dashicon, {icon: block.icon});
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
                            categoryHTML +=     '<h3 class="category-name">'+ category.title +'</h3>';
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
                            theBlock.find('i').remove();
                            theBlock.find('svg').remove();
                            if (block.icon.indexOf('<svg') > -1) {
                                theBlock.find('.switch-label').prepend(block.icon);
                            } else {
                                theBlock.find('.switch-label').prepend('<i class="dashicons dashicons-'+ block.icon +'"></i>');
                            }
                        } else {
                            var blockHTML = '';
                            blockHTML += '<li class="block-item new-block" data-type="'+ block.name +'">';
                            blockHTML +=    '<input id="'+ block.name +'" type="checkbox" name="active_blocks[]" value="'+ block.name +'">';
                            blockHTML +=    '<label for="'+ block.name +'" class="switch-label">';
                            if (block.icon.indexOf('<svg') > -1) {
                                blockHTML +=    block.icon;
                            } else {
                                blockHTML +=    '<i class="dashicons dashicons-'+ block.icon +'"></i>';
                            }
                            blockHTML +=        '<span class="block-title">'+ block.title +'</span>';
                            blockHTML +=    '</label>';
                            blockHTML += '</li>';

                            var categoryBlock = $('.category-block[data-category="'+ block.category +'"]');
                            categoryBlock.find('.blocks-list').append(blockHTML);
                        }
                    });

                    $('.new-block').on('mouseenter', function () {
                        $(this).removeClass('new-block');
                    });

                    $('#update-list-btn').removeAttr('disabled')
                        .find('span').text('Update')
                        .parent().find('i').removeClass('rotating');

                    $('#block-update-notice').fadeIn(500).delay(2000).fadeOut(500);
                }
            },
            error: function () {
                alert('Error while updating list!');
                if (typeof advgbUpdate !== 'undefined' && advgbUpdate.onProfile)
                    window.location.href = window.location.href.replace('&update_blocks_list=true', '');
            }
        });
    }
};