jQuery(document).ready(function ($) {
    var galGroup = 1;
    $('.wp-block-gallery').each(function () {
        // Add lightbox for images
        $(this).find('.blocks-gallery-item').colorbox({
            title: function () {
                if (parseInt(advgb.imageCaption)) {
                    var imgCap = $(this).find('figcaption').text() || $(this).find('img').attr('alt');
                    return imgCap;
                }

                return null;
            },
            maxWidth: '90%',
            maxHeight: '85%',
            fixed: true,
            className: 'advgb_lightbox',
            rel: 'gallery' + galGroup,
            photo: true,
            href: function () {
                if($(this).find('figure a').length) {
                    console.log('a tag exists');
                    console.log($(this).find('figure a').length);
                    return $(this).find('figure > a').attr('href'); 
                } else {
                    console.log('a tag does NOT exists');
                    console.log($(this).find('figure a').length);
                    return $(this).find('img').attr('src');
                }
            },
            onComplete: function () {
                $('.cboxPhoto')
                    .attr('alt', $(this).find('img').attr('alt'))
                    .attr('title', $(this).find('img').attr('title'));
            }
        });
        galGroup++;
    });
});