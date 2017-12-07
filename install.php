<?php
defined('ABSPATH') or die;

// Run when activate plugin
register_activation_hook(GUTENBERG_ADVANCED_PLUGIN, function () {
    // Check if Gutenberg is activated
    if (!function_exists('register_block_type')) {
        wp_die('Gutenberg not activated!');
        exit;
    }

    // Get all GB-ADV active profiles
    $args     = array(
        'post_type' => 'gbadv_profiles',
        'publish'   => true
    );
    $profiles = new WP_Query($args);

    // Add default profiles if no profiles exist
    if (!$profiles->have_posts()) {
        $post_data = array(
            'post_title'  => 'Default',
            'post_type'   => 'gbadv_profiles',
            'post_status' => 'publish',
            'meta_input'  => array(
                'active_blocks' => GutenbergAdvancedMain::$default_active_blocks,
                'roles_access'  => GutenbergAdvancedMain::$default_roles_access,
                'users_access'  => array(),
            )
        );
        wp_insert_post($post_data, true);
    }

    // Add default settings for first time install
    $saved_settings = get_option('gbadv_settings');

    if ($saved_settings === false) {
        update_option('gbadv_settings', array(
            'gallery_lightbox' => 1,
            'gallery_lightbox_caption' => 1
        ));
    }

    // Add cap to users
    global $wp_roles;

    $wp_roles->add_cap('administrator', 'edit_gbadv_profiles');
    $wp_roles->add_cap('administrator', 'edit_others_gbadv_profiles');
    $wp_roles->add_cap('administrator', 'create_gbadv_profiles');
    $wp_roles->add_cap('administrator', 'publish_gbadv_profiles');
    $wp_roles->add_cap('administrator', 'delete_gbadv_profiles');
    $wp_roles->add_cap('administrator', 'delete_others_gbadv_profiles');
    $wp_roles->add_cap('administrator', 'read_gbadv_profile');
    $wp_roles->add_cap('administrator', 'read_private_gbadv_profiles');

    $wp_roles->add_cap('editor', 'read_gbadv_profile');
    $wp_roles->add_cap('editor', 'read_private_gbadv_profiles');
    $wp_roles->add_cap('editor', 'edit_gbadv_profiles');

    $wp_roles->add_cap('author', 'edit_gbadv_profiles');
    $wp_roles->add_cap('author', 'read_gbadv_profile');
    $wp_roles->add_cap('author', 'read_private_gbadv_profiles');

    $wp_roles->add_cap('contributor', 'read_gbadv_profile');
    $wp_roles->add_cap('contributor', 'read_private_gbadv_profiles');
});
