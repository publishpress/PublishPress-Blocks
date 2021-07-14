jQuery(document).ready(function ($) {
    document.addEventListener("DOMSubtreeModified", function(){
        try {
            $(".advgb-images-slider-block .advgb-images-slider:not(.slick-initialized)").slick({
                dots: true,
                adaptiveHeight: true,
            });
        } catch(e) {
            // console.error(e);
        }
    });
});
