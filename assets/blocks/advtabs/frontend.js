jQuery(document).ready(function ($) {
    $('.advgb-tabs-wrapper').each(function () {
        $(this).find(".advgb-tab a:not(.ui-tabs-anchor)").unbind("click");

        var activeTab = $(this).data('tab-active');
        $(this).tabs({active: parseInt(activeTab)});
    })
});