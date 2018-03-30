jQuery(document).ready(function ($) {
    // Click save settings button
    $('#save-advgb-profile').unbind('click').click(function (e) {
        e.preventDefault();
        $('#publish').click();
    });

    // Click update blocks list button
    $('#update-list-btn').unbind('click').click(function () {
        var willUpdate = confirm('Make sure everthing is saved before updating. Continue?');
        if (willUpdate) {
            $(this).find('i').addClass('rotating');
            $(this).find('span').text('Updating...');
            window.location.href += '&update_blocks_list=true';
        }
    });

    // Ajax for displaying users list
    $('#user-search-input').bind('searchUsers', function () {
        var searchKey = $(this).val();
        var roleKey = $('#advgb-roles-filter').val();
        $.ajax({
            url: ajaxurl,
            method: 'POST',
            data: {
                action: 'advgb_get_users',
                search: searchKey,
                role: roleKey
            },
            success: function (res) {
                $('#advgb-users-body').html(res.users_list);
                $('#pagination').html(res.pages_list);
                selectedUsers();
                switchPage();
            }
        })
    });

    // Search users input
    $('#user-search-input').on('keypress', function (e) {
        if (e.which === 13) {
            e.preventDefault();
            $(this).trigger('searchUsers');
        }
    });

    // Role filter
    $('#advgb-roles-filter').change(function () {
        var roleKey = $(this).val();
        var searchKey = $('#user-search-input').val();
        $.ajax({
            url: ajaxurl,
            method: 'POST',
            data: {
                action: 'advgb_get_users',
                search: searchKey,
                role: roleKey
            },
            success: function (res) {
                $('#advgb-users-body').html(res.users_list);
                $('#pagination').html(res.pages_list);
                selectedUsers();
                switchPage();
            }
        })
    });

    // Clear search users
    $('#advgb-clear-btn').click(function () {
        $('#user-search-input').val('');
        $('#advgb-roles-filter').val('');
        $.ajax({
            url: ajaxurl,
            method: 'POST',
            data: {
                action: 'advgb_get_users'
            },
            success: function (res) {
                $('#advgb-users-body').html(res.users_list);
                $('#pagination').html(res.pages_list);
                selectedUsers();
                switchPage();
            }
        })
    });

    // Check all buttons
    $('#advgb-users-checkall').click(function () {
        $('#advgb-users-body').find(':checkbox').attr('checked', this.checked);
    });

    // Switch page
    function switchPage() {
        $('.switch-page').unbind('click').click(function () {
            var paged = $(this).text();
            paged = parseInt(paged);
            getPagination(paged);
        });
        $('#pagination a#first-page').unbind('click').click(function () {
            var paged = 'first';
            getPagination(paged);
        });
        $('#pagination a#last-page').unbind('click').click(function () {
            var paged = 'last';
            getPagination(paged);
        });
    }
    switchPage();

    // Ajax for pagination
    function getPagination(page_num) {
        var searchKey = $('#user-search-input').val();
        var roleKey = $('#advgb-roles-filter').val();
        $.ajax({
            url: ajaxurl,
            method: 'POST',
            data: {
                action: 'advgb_get_users',
                search: searchKey,
                role: roleKey,
                paged: page_num
            },
            success: function (res) {
                $('#advgb-users-body').html(res.users_list);
                $('#pagination').html(res.pages_list);
                selectedUsers();
                switchPage();
            }
        })
    }

    // Function for selecting users
    function selectedUsers() {
        $('#advgb-users-body :checkbox').change(function () {
            if (this.checked) {
                // Action when checked
                var val = $(this).val();
                $('#advgb-users-access-list').val($('#advgb-users-access-list').val() + " " + val);
            } else {
                // Action  when unchecked
                var vals = $(this).val();
                var split_val = $('#advgb-users-access-list').val().split(' ');
                split_val.splice($.inArray(vals, split_val),1);
                var final_val = split_val.join(' ');
                $('#advgb-users-access-list').val(final_val);
            }
        });

        var split_vals = $('#advgb-users-access-list').val().split(' ');
        $('#advgb-users-body :checkbox').each(function (e) {
            var val = $(this).val();
            var checked = $.inArray(val, split_vals);
            //Check if users is checked
            if (checked !== -1) {
                $(this).attr('checked', 'checked');
            }
        })
    }
    selectedUsers();
});