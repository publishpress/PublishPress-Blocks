jQuery(document).ready(function ($) {
    $('.wp-block-gallery').each(function () {
        // Add lightbox for images
        $(this).find('.blocks-gallery-item img').colorbox({
            title: function () {
                if (parseInt(advgb.imageCaption)) {
                    var imgCap = $(this).closest('.blocks-gallery-item').find('figcaption').text() || $(this).attr('alt');
                    return imgCap;
                }

                return null;
            },
            maxWidth: '90%',
            maxHeight: '85%',
            fixed: true,
            className: 'advgb_lightbox',
            rel: 'gallery',
            href: function () {
                return $(this).attr('src');
            },
            onComplete: function () {
                $('.cboxPhoto')
                    .attr('alt', $(this).attr('alt'))
                    .attr('title', $(this).attr('title'));
            }
        })
    })
});