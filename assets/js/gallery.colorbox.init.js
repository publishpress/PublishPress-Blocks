jQuery(document).ready(function ($) {
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
            rel: 'gallery',
            href: function () {
                return $(this).find('img').attr('src');
            },
            onComplete: function () {
                $('.cboxPhoto')
                    .attr('alt', $(this).find('img').attr('alt'))
                    .attr('title', $(this).find('img').attr('title'));
            },
            onOpen: function() {
                var ycoord = $(window).scrollTop();
                $('#colorbox').data('ycoord',ycoord);
                ycoord = ycoord * -1;
                $('body').css('position','fixed').css('left','0px').css('right','0px').css('top',ycoord + 'px');
            },
            onClosed: function () {
                $('body').css('position','').css('left','auto').css('right','auto').css('top','auto');
                $(window).scrollTop($('#colorbox').data('ycoord'));
            }
        })
    });
});