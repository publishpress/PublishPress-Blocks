(function ( $ ) {
    $(document).ready(function ( $ ) {
        function sortProfiles(sortBy, asc) {
            if (typeof asc === 'undefined') asc = false;

            var tbody = $('#profiles-list').find('tbody');
            tbody.find('tr').sort(function(a, b) {
                if (asc) {
                    return $('td.profile-' + sortBy, a).text().localeCompare($('td.profile-' + sortBy, b).text());
                } else {
                    return $('td.profile-' + sortBy, b).text().localeCompare($('td.profile-' + sortBy, a).text());
                }
            }).appendTo(tbody);
        }

        $('#profiles-list thead .sorting-header').unbind('click').click(function () {
            var sortBy = $(this).data('sort');
            var asc = true;

            if ($(this).hasClass('asc')) {
                asc = false;
                $('#profiles-list').find('.sorting-header').removeClass('desc').removeClass('asc');
                $('#profiles-list').find('.profile-header-'+ sortBy).addClass('desc');
            } else {
                $('#profiles-list').find('.sorting-header').removeClass('desc').removeClass('asc');
                $('#profiles-list').find('.profile-header-'+ sortBy).addClass('asc');
            }

            sortProfiles(sortBy, asc);
            return false;
        });

        $('.profiles-search-input').on('input', function () {
            var searchKey = $(this).val().trim().toLowerCase();

            $('#profiles-list .advgb-profile').each(function () {
                var profileTitle = $(this).find('.profile-title').text().trim().toLowerCase(),
                    profileAuthor = $(this).find('.profile-author').text().trim().toLowerCase();

                if (profileTitle.indexOf(searchKey) > -1 || profileAuthor.indexOf(searchKey) > -1) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            })
        })
    })
})( jQuery );