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
        })
    })
})(jQuery);