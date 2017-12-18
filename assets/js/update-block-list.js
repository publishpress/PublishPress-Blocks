window.onload = function () {
    if (typeof wp.blocks !== 'undefined') {
        var allBlocks = wp.blocks.getBlockTypes();
        var allCategories = wp.blocks.getCategories();
        var listBlocks = [];

        // Do not get the reusable blocks
        allBlocks = allBlocks.filter(function (block) {
            return block.category !== 'reusable-blocks';
        });

        allCategories = allCategories.filter(function (category) {
            return category.slug !== 'reusable-blocks';
        });

        allBlocks.forEach(function (block) {
            var blockItem = {
                name: block.name,
                icon: block.icon,
                title: block.title,
                category: block.category
            };
            listBlocks.push(blockItem);
            return block;
        });

        jQuery.ajax({
            url: ajaxurl,
            method: 'POST',
            data: {
                action: 'advgb_update_blocks_list',
                blocksList: listBlocks,
                categoriesList: allCategories
            },
            success: function (res) {
                if (advgbUpdate.onProfile) {
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
                        } else {
                            var blockHTML = '';
                            blockHTML += '<li class="block-item new-block" data-type="'+ block.name +'">';
                            blockHTML +=    '<label for="block-code" class="switch-label">';
                            blockHTML +=        '<i class="dashicons dashicons-'+ block.icon +'"></i>';
                            blockHTML +=        '<span class="block-title">'+ block.title +'</span>';
                            blockHTML +=    '</label>';
                            blockHTML +=    '<div class="switch-btn">';
                            blockHTML +=        '<label class="switch">';
                            blockHTML +=            '<input type="checkbox" name="active_blocks[]" value="'+ block.name +'">';
                            blockHTML +=            '<div class="slider round"></div>';
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
                        .find('span').text('Update')
                        .parent().find('i').removeClass('rotating');

                    $('#block-update-notice').fadeIn(500).delay(2000).fadeOut(500);
                }
            },
            error: function () {
                alert('Error while updating list!');
                if (advgbUpdate.onProfile)
                    window.location.href = window.location.href.replace('&update_blocks_list=true', '');
            }
        });
    }
};