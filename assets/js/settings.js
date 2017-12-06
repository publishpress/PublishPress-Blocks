jQuery(document).ready(function ($) {
    $('#gallery_lightbox').on('change', function () {
        if (this.checked) {
            $('#gallery_lightbox_title_wrapper').removeClass('item-hidden');
        } else {
            $('#gallery_lightbox_title_wrapper').addClass('item-hidden');
        }
    })
});