jQuery(document).ready(function ($) {
    $('#gallery_lightbox').on('change', function () {
        if (this.checked) {
            $('#gallery_lightbox_title_wrapper').removeClass('hidden-item');
        } else {
            $('#gallery_lightbox_title_wrapper').addClass('hidden-item');
        }
    });

    if ($('#gallery_lightbox').is(':checked')) {
        $('#gallery_lightbox_title_wrapper').removeClass('hidden-item');
    }

    $('.gbadv_qtip').qtip({
        content: {
            attr: 'alt'
        },
        position: {
            my: 'top left',
            at: 'bottom bottom'
        },
        style: {
            tip: {
                corner: true
            },
            classes: 'wpsetips_qtip'
        },
        show: 'hover',
        hide: {
            fixed: true,
            delay: 10
        }
    });
});