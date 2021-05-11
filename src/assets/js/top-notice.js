(function ($) {
    window.onscroll = function () {
        $wpBarHeight  = $('#wpadminbar').outerHeight();
        $headerHeight = $('.pp-version-notice-bold-purple').outerHeight();
        $sidebarMenu  = $('.ju-main-wrapper').find('.ju-left-panel');
        if (window.pageYOffset > 0) {
            $sidebarMenu.css(
                'marginTop', '-' + window.pageYOffset + 'px'
            );
        } else {
            $sidebarMenu.css(
                'marginTop', '0'
            );
        }
    };
}(jQuery));
