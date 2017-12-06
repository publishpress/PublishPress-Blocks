<?php
defined('ABSPATH') or die;

if (is_admin()) {
    add_action('init', 'register_gbadv_menu');
    add_filter('post_updated_messages', 'gbadv_post_msg');
    add_action('save_post_gbadv_profiles', 'save_gbadv_profile');
}

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

// Register menu
function register_gbadv_menu()
{
    $labels = array(
        'name'               => __('Gutenberg Advanced Profiles', 'gutenberg-advanced'),    // Profile title
        'singular_name'      => __('Gutenberg Advanced Profiles', 'gutenberg-advanced'),
        'add_new'            => __('New Profile', 'gutenberg-advanced'),                    // New profile menu title
        'add_new_item'       => __('Add New Profile', 'gutenberg-advanced'),                // New profile title
        'edit_item'          => __('Edit Profile', 'gutenberg-advanced'),                   // Edit profile title
        'all_items'          => __('Gutenberg Advanced', 'gutenberg-advanced'),             // All profiles menu title
        'view_item'          => __('View Profile', 'gutenberg-advanced'),
        'search_items'       => __('Search Profiles', 'gutenberg-advanced'),                // Search button title
        'not_found'          => __('No profiles found', 'gutenberg-advanced'),
        'not_found_in_trash' => __('No profiles found in trash', 'gutenberg-advanced'),
        'parent_item_colon'  => '',
        'menu_name'          => __('Gutenberg Advanced', 'gutenberg-advanced')
    );
    register_post_type('gbadv_profiles', array(
        'labels'       => $labels,
        'public'       => false,
        'show_ui'      => true,
        'show_in_menu' => 'options-general.php',
        'supports'     => array('title', 'author'),
        'capabilities' => array(
            'edit_posts'          => 'edit_gbadv_profiles',
            'edit_others_posts'   => 'edit_others_gbadv_profiles',
            'publish_posts'       => 'publish_gbadv_profiles',
            'read'                => 'read_gbadv_profile',
            'read_private_posts'  => 'read_private_gbadv_profiles',
            'delete_posts'        => 'delete_gbadv_profiles',
            'delete_others_posts' => 'delete_others_gbadv_profiles',
            'create_posts'        => 'create_gbadv_profiles',
        ),
        'map_meta_cap' => true
    ));
}

// Change post's update messages
function gbadv_post_msg($msg)
{
    $msg['gbadv_profiles'] = array(
        1 => __('Gutenberg Advanced profile updated.', 'gutenberg-advandced'),
        6 => __('Gutenberg Advanced profile created.', 'gutenberg-advandced')
    );

    return $msg;
}

// Save profiles settings
function save_gbadv_profile($postID)
{
    // Check nonce field
    if (!isset($_POST['gbadv_nonce_field'])) {
        return $postID;
    }
    // Verify nonce
    if (!wp_verify_nonce($_POST['gbadv_nonce_field'], 'gbadv_nonce')) {
        return $postID;
    }

    // Save settings
    if ($_POST['post_type'] == 'gbadv_profiles'
        && current_user_can('edit_post', $postID)
    ) {
        // Save list of active blocks
        $active_blocks = array();
        if (isset($_POST['active_blocks'])) {
            $active_blocks = $_POST['active_blocks'];
        }
        update_post_meta($postID, 'active_blocks', $active_blocks);

        // Save users permission
        $users_access = array();
        $roles_access = array();
        if (isset($_POST['gbadv-users-access-list'])) {
            $users_access = trim($_POST['gbadv-users-access-list']);
            $users_access = explode(' ', $users_access);
        }
        if (isset($_POST['gbadv-roles'])) {
            $roles_access = $_POST['gbadv-roles'];
        }
        update_post_meta($postID, 'users_access', $users_access);
        update_post_meta($postID, 'roles_access', $roles_access);
    }

    return $postID;
}
