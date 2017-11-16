<?php
defined('ABSPATH') or die;

register_activation_hook(GUTENBERG_ADVANCED_PLUGIN, 'gbadv_plugin_activated');
if (is_admin()) {
    add_action('init', 'register_gbadv_menu');
    add_action('admin_init', 'add_gbadv_cap');
    add_filter('post_updated_messages', 'gbadv_post_msg');
}

// Init plugin
function gbadv_plugin_activated()
{
    // Check if Gutenberg is activated
    if (!function_exists('register_block_type')) {
        wp_die('Gutenberg not activated!');
        exit;
    }

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

// Add meta cap
function add_gbadv_cap()
{
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
}

function gbadv_post_msg($msg)
{
    $msg['gbadv_profiles'] = array(
        1 => __('Gutenberg Advanced profile updated.', 'gutenberg-advandced'),
        6 => __('Gutenberg Advanced profile created.', 'gutenberg-advandced')
    );

    return $msg;
}
