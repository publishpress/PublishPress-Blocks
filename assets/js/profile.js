jQuery(document).ready(function ($) {
    $('#save-gbadv-profile').unbind('click').click(function (e) {
        e.preventDefault();
        $('#publish').click();
    });

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
        var roleKey = $('#gbadv-roles-filter').val();
        $.ajax({
            url: ajaxurl,
            method: 'POST',
            data: {
                action: 'gbadv_get_users',
                search: searchKey,
                role: roleKey
            },
            success: function (res) {
                $('#gbadv-users-body').html(res.users_list);
                $('#pagination').html(res.pages_list);
                selectedUsers();
                switchPage();
            }
        })
    });

    $('#user-search-input').on('keypress', function (e) {
        if (e.which === 13) {
            e.preventDefault();
            $(this).trigger('searchUsers');
        }
    });

    $('#gbadv-roles-filter').change(function () {
        var roleKey = $(this).val();
        var searchKey = $('#user-search-input').val();
        $.ajax({
            url: ajaxurl,
            method: 'POST',
            data: {
                action: 'gbadv_get_users',
                search: searchKey,
                role: roleKey
            },
            success: function (res) {
                $('#gbadv-users-body').html(res.users_list);
                $('#pagination').html(res.pages_list);
                selectedUsers();
                switchPage();
            }
        })
    });

    $('#gbadv-clear-btn').click(function () {
        $('#user-search-input').val('');
        $('#gbadv-roles-filter').val('');
        $.ajax({
            url: ajaxurl,
            method: 'POST',
            data: {
                action: 'gbadv_get_users'
            },
            success: function (res) {
                $('#gbadv-users-body').html(res.users_list);
                $('#pagination').html(res.pages_list);
                selectedUsers();
                switchPage();
            }
        })
    });

    // Check all buttons
    $('#gbadv-users-checkall').click(function () {
        $('#gbadv-users-body').find(':checkbox').attr('checked', this.checked);
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
        var roleKey = $('#gbadv-roles-filter').val();
        $.ajax({
            url: ajaxurl,
            method: 'POST',
            data: {
                action: 'gbadv_get_users',
                search: searchKey,
                role: roleKey,
                paged: page_num
            },
            success: function (res) {
                $('#gbadv-users-body').html(res.users_list);
                $('#pagination').html(res.pages_list);
                selectedUsers();
                switchPage();
            }
        })
    }

    // Function for selecting users
    function selectedUsers() {
        $('#gbadv-users-body :checkbox').change(function () {
            if (this.checked) {
                // Action when checked
                var val = $(this).val();
                $('#gbadv-users-access-list').val($('#gbadv-users-access-list').val() + " " + val);
            } else {
                // Action  when unchecked
                var vals = $(this).val();
                var split_val = $('#gbadv-users-access-list').val().split(' ');
                split_val.splice($.inArray(vals, split_val),1);
                var final_val = split_val.join(' ');
                $('#gbadv-users-access-list').val(final_val);
            }
        });

        var split_vals = $('#gbadv-users-access-list').val().split(' ');
        $('#gbadv-users-body :checkbox').each(function (e) {
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