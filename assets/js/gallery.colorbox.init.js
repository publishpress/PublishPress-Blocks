jQuery(document).ready(function ($) {
    $('.wp-block-gallery').each(function () {
        var imageBlock = $(this).find('.blocks-gallery-image img');

        if ($(this).find('.blocks-gallery-image a').length > 0) {
            imageBlock = $(this).find('.blocks-gallery-image a');
        }

        imageBlock.colorbox({
            title: function () {
                if (parseInt(gbadv.imageCaption)) {
                    return $(this).closest('.blocks-gallery-image').find('img').attr('alt');
                }

                return null;
            },
            maxWidth: '90%',
            maxHeight: '85%',
            fixed: true,
            className: 'gbadv_lightbox',
            rel: 'gallery',
            href: function () {
                return $(this).closest('.blocks-gallery-image').find('img').attr('src');
            },
            onComplete: function () {
                var currentImg = $(this).closest('.blocks-gallery-image').find('img');
                $('.cboxPhoto')
                    .attr('alt', currentImg.attr('alt'))
                    .attr('title', currentImg.attr('title'));
            }
        })
    })
});