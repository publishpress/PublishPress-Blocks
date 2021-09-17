window.addEventListener('load', function () {
    var $ = jQuery;

    // On change user role dropdown
    $('#user_role_reusable_blocks').on( 'change', function(){
        window.location = 'admin.php?page=advgb_main&user_role_reusable_blocks=' + $(this).val();
    });

    initEditReusableBlock();

    function initEditReusableBlock() {
        //var $ = jQuery;
        var { __, _x, _n, _nx } = wp.i18n;
        // Open the block config modal
        $('.advgb_qtip_no_after').unbind('click').click(function () {
            tb_show(
                __('Edit reusable block', 'advanced-gutenberg'),
                'post.php?post=271&action=edit&noheader=1&width=800&height=600&TB_iframe=1'
            );
        })
    }
});
