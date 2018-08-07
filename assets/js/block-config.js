jQuery(window).on('load', function () {
    // Loading UI
    jQuery('#advgb-loading-screen').hide();
    jQuery('.block-config-modal-wrapper').show();
});

jQuery(document).ready(function ($) {
    // Setup minicolors input
    $('.minicolors-input').minicolors();

    // Add block name for top header
    $('.block-config-modal-title').text(parent.window.blockLabel + $('.block-config-modal-title').text());

});