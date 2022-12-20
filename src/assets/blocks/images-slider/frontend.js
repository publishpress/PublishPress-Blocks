jQuery(document).ready(function ( $ ) {
    $(".advgb-images-slider-block .advgb-images-slider:not(.slick-initialized)").slick({
        dots: true,
        adaptiveHeight: true,
    })

    if( $('.advgb-images-slider-block > .slick-initialized').length ) {
        $('a.advgb-image-slider-overlay').attr('tabindex',-1).wrap('<div aria-hidden="true"></div>');
    }
});
