jQuery(document).ready(function ($) {
    // Setup minicolors input
    $('.minicolors-input').minicolors();

    // Add block name for top header
    $('.block-config-modal-title').text(parent.window.blockLabel + $('.block-config-modal-title').text());

    // Loading UI
    $('#advgb-loading-screen').remove();
    $('.block-config-modal-wrapper').show();
});