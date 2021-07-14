jQuery(document).ready(function ($) {
    document.addEventListener("DOMSubtreeModified", function(){
        try {
            $(".advgb-recent-posts-block.slider-view").find(".advgb-recent-posts:not(.slick-initialized)").each(function() {
                $(this).slick({
                    dots: true,
                    adaptiveHeight: true,
                });
                $(this).slick("slickSetOption", "autoplay", $(this).parent().hasClass("slider-autoplay"), true);
            });
        } catch(e) {
            // console.error(e);
        }
    });
});
