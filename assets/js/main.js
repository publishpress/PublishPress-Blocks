(function ( $ ) {
    $(document).ready(function ( $ ) {
        // Function for searching menus
        $('.advgb-menu-search-input').on('input', function () {
            var searchKey = $(this).val().trim().toLowerCase();

            $('.menu-tabs .tab').each(function () {
                var tabTitle = $(this).data('tab-title').toLowerCase();
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

        $('#advgb-save-close').click(function () {
            $('#advgb-save-success').slideUp();
        });

        $('a[href=#settings]').one('click', function () {
            setTimeout(function () {
                $('#settings ul.tabs').itabs();
            }, 100);
        });
    })
})(jQuery);