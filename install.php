<?php
defined('ABSPATH') || die;

// Run when activate plugin
register_activation_hook(ADVANCED_GUTENBERG_PLUGIN, function () {
    // Check if Gutenberg is activated
    if (!function_exists('register_block_type')) {
        $gutenbergInstallUrl = wp_nonce_url(
            add_query_arg(
                array(
                    'action' => 'install-plugin',
                    'plugin' => 'gutenberg'
                ),
                admin_url('update.php')
            ),
            'install-plugin_gutenberg'
        );

        wp_die(
            esc_html__('Gutenberg is not detected! Activate it or', 'advanced-gutenberg')
            . ': <a href="'. esc_attr($gutenbergInstallUrl) .'">'. esc_html__('Install Gutenberg Now!', 'advanced-gutenberg') .'</a>'
        );
        exit;
    }

    if (defined('GUTENBERG_VERSION')) {
        $versionRequired = '3.5.0';
        if (version_compare(GUTENBERG_VERSION, $versionRequired, 'lt')) {
            wp_die(
                esc_html__('We require at least Gutenberg version ', 'advanced-gutenberg')
                . esc_html($versionRequired) . '. '.
                esc_html__('Please update Gutenberg then comeback later!', 'advanced-gutenberg')
            );
            exit;
        }
    }

    // Get all GB-ADV active profiles
    $args     = array(
        'post_type' => 'advgb_profiles',
        'publish'   => true
    );
    $profiles = new WP_Query($args);

    // Add default profiles if no profiles exist
    if (!$profiles->have_posts()) {
        $post_data = array(
            'post_title'  => 'Default',
            'post_type'   => 'advgb_profiles',
            'post_status' => 'publish',
            'meta_input'  => array(
                'active_blocks' => AdvancedGutenbergMain::$default_active_blocks,
                'roles_access'  => AdvancedGutenbergMain::$default_roles_access,
                'users_access'  => array(),
            )
        );
        wp_insert_post($post_data, true);
    }

    // Add default settings for first time install
    $saved_settings = get_option('advgb_settings');

    if ($saved_settings === false) {
        update_option('advgb_settings', array(
            'gallery_lightbox' => 1,
            'gallery_lightbox_caption' => 1
        ));
    }

    // Add cap to users
    global $wp_roles;

    $wp_roles->add_cap('administrator', 'edit_advgb_profiles');
    $wp_roles->add_cap('administrator', 'edit_others_advgb_profiles');
    $wp_roles->add_cap('administrator', 'create_advgb_profiles');
    $wp_roles->add_cap('administrator', 'publish_advgb_profiles');
    $wp_roles->add_cap('administrator', 'delete_advgb_profiles');
    $wp_roles->add_cap('administrator', 'delete_others_advgb_profiles');
    $wp_roles->add_cap('administrator', 'read_advgb_profile');
    $wp_roles->add_cap('administrator', 'read_private_advgb_profiles');

    $wp_roles->add_cap('editor', 'read_advgb_profile');
    $wp_roles->add_cap('editor', 'read_private_advgb_profiles');
    $wp_roles->add_cap('editor', 'edit_advgb_profiles');

    $wp_roles->add_cap('author', 'edit_advgb_profiles');
    $wp_roles->add_cap('author', 'read_advgb_profile');
    $wp_roles->add_cap('author', 'read_private_advgb_profiles');

    $wp_roles->add_cap('contributor', 'read_advgb_profile');
    $wp_roles->add_cap('contributor', 'read_private_advgb_profiles');

    // Copy default custom styles if no custom styles file exist
    WP_Filesystem();
    global $wp_filesystem;
    $custom_styles_dir = wp_upload_dir();
    $custom_styles_dir = $custom_styles_dir['basedir'] . '/advgb/';
    $css_default_file = plugin_dir_path(__FILE__). 'assets/css/customstyles/custom_styles.css';
    $css_file = $custom_styles_dir . 'custom_styles.css';

    if (!$wp_filesystem->exists($custom_styles_dir)) {
        $wp_filesystem->mkdir($custom_styles_dir);
    }

    if (!$wp_filesystem->exists($css_file)) {
        $wp_filesystem->copy($css_default_file, $css_file);
    }
});
