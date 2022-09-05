<?php
defined( 'ABSPATH' ) || die;

$saved_settings             = get_option( 'advgb_settings' );
$gallery_lightbox_caption   = isset( $saved_settings['gallery_lightbox_caption'] ) ? $saved_settings['gallery_lightbox_caption'] : '1';
$disable_wpautop_checked    = ! empty( $saved_settings['disable_wpautop'] ) ? 'checked' : '';
$google_api_key_saved       = isset( $saved_settings['google_api_key'] ) ? $saved_settings['google_api_key'] : '';
$enable_blocks_spacing      = isset( $saved_settings['enable_blocks_spacing'] ) && $saved_settings['enable_blocks_spacing'] ? 'checked' : '';
$blocks_spacing             = isset( $saved_settings['blocks_spacing'] ) ? $saved_settings['blocks_spacing'] : 0;
$blocks_icon_color          = isset( $saved_settings['blocks_icon_color'] ) ? $saved_settings['blocks_icon_color'] : '#5952de';
$editor_width               = isset( $saved_settings['editor_width'] ) ? $saved_settings['editor_width'] : '0';
$default_thumb              = plugins_url( 'assets/blocks/recent-posts/recent-post-default.png', ADVANCED_GUTENBERG_PLUGIN);
$rp_default_thumb           = isset( $saved_settings['rp_default_thumb']) ? $saved_settings['rp_default_thumb'] : array( 'url' => $default_thumb, 'id' => 0 );
$block_extend               = isset( $saved_settings['block_extend'] ) && $saved_settings['block_extend'] ? 'checked' : '';

$gallery_lightbox_checked = isset( $saved_settings['gallery_lightbox'] ) && $saved_settings['gallery_lightbox'] ? 'checked' : '';
if ( ! isset( $saved_settings['gallery_lightbox'] ) ) {
    $gallery_lightbox_checked = 'checked';
}

$enable_columns_visual_guide = isset($saved_settings['enable_columns_visual_guide']) && $saved_settings['enable_columns_visual_guide'] ? 'checked' : '';
if ( ! isset( $saved_settings['enable_columns_visual_guide'] ) ) {
    $enable_columns_visual_guide = 'checked';
}

$enable_block_access = isset( $saved_settings['enable_block_access'] ) && $saved_settings['enable_block_access'] ? 'checked' : '';
if ( ! isset($saved_settings['enable_block_access'] ) ) {
    $enable_block_access  = 'checked';
}

$enable_custom_styles = isset( $saved_settings['enable_custom_styles'] ) && $saved_settings['enable_custom_styles'] ? 'checked' : '';
if ( ! isset($saved_settings['enable_custom_styles'] ) ) {
    $enable_custom_styles  = 'checked';
}

$enable_advgb_blocks = isset( $saved_settings['enable_advgb_blocks'] ) && $saved_settings['enable_advgb_blocks'] ? 'checked' : '';
if ( ! isset( $saved_settings['enable_advgb_blocks'] ) ) {
    $enable_advgb_blocks  = 'checked';
}

$block_controls = isset( $saved_settings['block_controls'] ) && $saved_settings['block_controls'] ? 'checked' : '';
if ( ! isset($saved_settings['block_controls'] ) ) {
    $block_controls = 'checked';
}

// Check current tab parameter from URL. e.g. 'admin.php?page=lorem&tab=something'
$current_tab = isset( $_GET['tab'] ) && ! empty( $_GET['tab'] )
                ? sanitize_text_field( $_GET['tab'] )
                : 'general';
?>

<div class="publishpress-admin wrap">

    <?php if ( isset( $_GET['save'] ) ) : // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- display message, no action ?>
        <div id="message" class="updated fade">
            <p>
                <?php esc_html_e( 'Settings saved successfully!', 'advanced-gutenberg' ); ?>
            </p>
        </div>
    <?php endif; ?>

    <header>
        <h1 class="wp-heading-inline">
            <?php esc_html_e( 'Blocks Settings', 'advanced-gutenberg' ) ?>
        </h1>
    </header>

    <?php
    $tabs = [
        [
            'title' => esc_html__( 'General', 'advanced-gutenberg' ),
            'slug' => 'general'
        ]
    ];

    if( $this->settingIsEnabled( 'enable_advgb_blocks' ) ) {
        array_push(
            $tabs,
            [
                'title' => esc_html__( 'Email & Forms', 'advanced-gutenberg' ),
                'slug' => 'forms'
            ],
            [
                'title' => esc_html__( 'reCAPTCHA', 'advanced-gutenberg' ),
                'slug' => 'recaptcha'
            ],
            [
                'title' => esc_html__( 'Data export', 'advanced-gutenberg' ),
                'slug' => 'data'
            ]
        );
    }

    // Output tabs menu
    echo $this->buildTabs(
        'advgb_settings',
        $current_tab,
        $tabs
    );
    ?>

    <div class="wrap">
        <?php
        // Load active settings tab
        $this->loadPageTab( 'settings', $current_tab );
        ?>
    </div>
</div>
