(function ( $ ) {
    $.expr[":"].contains = $.expr.createPseudo(function(arg) {
        return function( elem ) {
            return $(elem).text().toLowerCase().indexOf(arg.toLowerCase()) >= 0;
        };
    });

    $(document).ready(function ( $ ) {
        // Function for searching menus
        $('.ju-menu-search-input').on('input', function () {
            $('.ju-right-panel li.ju-settings-option').removeClass('search_result');
            $('.ju-menu-tabs .tab').show();

            var searchKey = $(this).val().trim().toLowerCase();
            if (searchKey === '') {
                $('.ju-menu-tabs .tab').show();
                return false;
            }

            var searchResult = $('.ju-right-panel li.ju-settings-option label:contains("'+searchKey+'")').closest('li.ju-settings-option');
            var searchParent = searchResult.closest('.ju-content-wrapper');
            var tabID = [];

            searchResult.each(function () {
                $(this).addClass('search-result');
            });

            searchParent.each(function () {
                tabID.push($(this).attr('id'));
            });

            $('.ju-menu-tabs .tab a').each(function () {
                var href = $(this).attr('href').replace(/#/g, '');
                if (tabID.indexOf(href) < 0) {
                    $(this).closest('li.tab').hide();
                }
            });
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