<?php
defined( 'ABSPATH' ) || die;

// Check current tab parameter from URL. e.g. 'admin.php?page=lorem&tab=something'
$current_tab = isset( $_GET['tab'] ) && ! empty( $_GET['tab'] )
                ? sanitize_text_field( $_GET['tab'] )
                : 'general';
?>

<div class="publishpress-admin wrap">
    <header>
        <h1 class="wp-heading-inline">
            <?php esc_html_e( 'PublishPress Blocks', 'advanced-gutenberg' ) ?>
        </h1>
    </header>

    <div class="wrap">
        [ Main page ... ]
    </div>
</div>
