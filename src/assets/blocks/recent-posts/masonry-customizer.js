jQuery(document).ready(function ($) {
    document.addEventListener("DOMSubtreeModified", function(){
        try {
            $(".masonry-view .advgb-recent-posts").isotope({
                itemSelector: ".advgb-recent-post",
                percentPosition: true
            });
            $(window).on("load resize", function(){
                $(".masonry-view .advgb-recent-posts").isotope();
            });
        } catch(e) {
            // console.error(e);
        }
    });
});
