window.onload = function () {
    if (typeof wp.blocks !== 'undefined') {
        var allBlocks = wp.blocks.getBlockTypes();
        var allCategories = wp.blocks.getCategories();
        var listBlocks = [];
        allBlocks.forEach(function (block) {
            blockItem = {
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
                action: 'gbadv_init_blocks_list',
                blocksList: listBlocks,
                categoriesList: allCategories
            },
            success: function (res) {

            },
            error: function () {
                alert('Error while updating list!');

            }
        })
    }
};