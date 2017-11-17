(function ($) {
    var unregisterBlockType = wp.blocks.unregisterBlockType;
    var activeBlockType = gbadvBlocks.activeBlocks;
    var allBlocks = wp.blocks.getBlockTypes();

    if (activeBlockType !== 'all') {
        allBlocks.forEach(function (block) {
            if ($.inArray(block.name, activeBlockType) === -1) {
                unregisterBlockType(block.name);
            }
        });
    }
})(jQuery);