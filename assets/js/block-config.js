jQuery(document).ready(function ($) {
    $('.minicolors-input').minicolors();
    $('.block-config-modal-title').text(parent.window.blockLabel + $('.block-config-modal-title').text());
});