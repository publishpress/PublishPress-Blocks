(function ( $ ) {
    $(document).ready(function ( $ ) {
        // Function for searching menus
        $('.ju-menu-search-input').on('input', function () {
            var searchKey = $(this).val().trim().toLowerCase();

            $('.ju-menu-tabs .tab').each(function () {
                var tabTitle = $(this).text().toLowerCase();
                if (tabTitle.indexOf(searchKey) > -1) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            })
        });

        $('.advgb-search-input').on('focus', function () {
            $(this).parent('.advgb-search-wrapper').addClass('focused');
        }).on('blur', function () {
            $(this).parent('.advgb-search-wrapper').removeClass('focused');
        });

        $('.ju-notice-close').click(function () {
            $(this).closest('.ju-notice-msg').slideUp();
        });

        $('a[href=#settings]').one('click', function () {
            setTimeout(function () {
                $('#settings ul.tabs').itabs();
            }, 100);
        });
    })
})(jQuery);