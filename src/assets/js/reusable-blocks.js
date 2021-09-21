window.addEventListener('load', function () {
    var $ = jQuery;

    // Search blocks function
    $('.reusable-blocks-search-input').on('input', function () {
        var searchKey = $(this).val().trim().toLowerCase();

        $('.reusable-block-access-item .block-title').each(function () {
            var blockTitle = $(this).text().toLowerCase().trim(),
                blockItem = $(this).closest('.reusable-block-access-item');

            if (blockTitle.indexOf(searchKey) > -1) {
                blockItem.show();
            } else {
                blockItem.hide();
            }
        });
    });

    // On change user role dropdown
    $('#user_role_reusable_blocks').on( 'change', function(){
        window.location = 'admin.php?page=advgb_main&user_role_reusable_blocks=' + $(this).val();
    });
});
