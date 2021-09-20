window.addEventListener('load', function () {
    var $ = jQuery;

    // On change user role dropdown
    $('#user_role_reusable_blocks').on( 'change', function(){
        window.location = 'admin.php?page=advgb_main&user_role_reusable_blocks=' + $(this).val();
    });
});
