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
        if (version_compare(GUTENBERG_VERSION, GUTENBERG_VERSION_REQUIRED, 'lt')) {
            wp_die(
                esc_html__('We require at least Gutenberg version ', 'advanced-gutenberg')
                . esc_html(GUTENBERG_VERSION_REQUIRED) . '. '.
                esc_html__('Please update Gutenberg then comeback later!', 'advanced-gutenberg')
            );
            exit;
        }
    }

    // Add default settings for first time install
    $saved_settings = get_option('advgb_settings');

    if ($saved_settings === false) {
        update_option('advgb_settings', array(
            'gallery_lightbox' => 1,
            'gallery_lightbox_caption' => '1',
            'blocks_icon_color' => '#5952de',
            'disable_wpautop' => 0,
            'enable_columns_visual_guide' => 1
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
});

// Run the updates from here
$advgb_current_version = get_option('advgb_version', '0.0.0');
global $wpdb;

// Migrate to Block Access by User Roles
if( version_compare($advgb_current_version, '2.10.0', 'lt') && !get_option( 'advgb_blocks_user_roles') ) {

    // Migrate Block Access Profiles to Block Access by Roles
    global $wpdb;
    $profiles = $wpdb->get_results(
        'SELECT * FROM '. $wpdb->prefix. 'posts
        WHERE post_type="advgb_profiles" AND post_status="publish" ORDER BY post_date_gmt DESC'
    );

    if( !empty( $profiles ) ) {

        // Let's extract the user roles associated to Block Access profiles (we can't get all the user roles with regular WP way)
        $user_role_accesses = array();
        foreach ($profiles as $profile) {
            $postID                 = $profile->ID;
            $user_role_accesses[]   = get_post_meta( $postID, 'roles_access', true );
        }

        $user_role_accesses = call_user_func_array( 'array_merge', $user_role_accesses );
        $user_role_accesses = array_unique( $user_role_accesses );

        // Find the most recent profile of each user role
        $blocks_by_role_access = array();
        foreach( $user_role_accesses as $user_role_access ) {

            $profiles = $wpdb->get_results(
                'SELECT * FROM '. $wpdb->prefix. 'posts
                WHERE post_type="advgb_profiles" AND post_status="publish" ORDER BY post_date_gmt DESC'
            );

            if( !empty( $profiles ) ) {
                $centinel[$user_role_access] = false; // A boolean to get the first profile (newest) and skip the rest
                foreach ($profiles as $profile) {
                    if( $centinel[$user_role_access] === false ) {
                        $postID         = $profile->ID;
                        $roles_access   = get_post_meta( $postID, 'roles_access', true );
                        $blocks         = get_post_meta( $postID, 'blocks', true );

                        if( in_array( $user_role_access, $roles_access ) ) {
                            $blocks_by_role_access[$user_role_access] = $blocks;
                            $centinel[$user_role_access] = true;
                        }
                    }
                }
            }
        }

        // Migrate Block Access by Profile to Block Access by Role
        if( $blocks_by_role_access ) {
            update_option( 'advgb_blocks_user_roles', $blocks_by_role_access, false );
        }

        // Don't delete post type advgb_profile to keep a backup!
    }

    /*/ Deactivate Container block
    $advgb_blocks_user_roles            = get_option( 'advgb_blocks_user_roles');
    $advgb_blocks_user_roles_updated    = array();

    if( is_array( $advgb_blocks_user_roles ) ) {

        foreach( $advgb_blocks_user_roles as $role => $blocks ) {

            $key = array_search( 'advgb/container', $blocks['active_blocks'] );
            if ($key !== false) {
                unset( $blocks['active_blocks'][$key] );
            }

            $keyIA = array_search( 'advgb/container', $blocks['inactive_blocks'] );
            if ( $keyIA === false ) {
                array_push( $blocks['inactive_blocks'], 'advgb/container' );
            }

            $advgb_blocks_user_roles_updated[$role]['active_blocks'] = $blocks['active_blocks'];
            $advgb_blocks_user_roles_updated[$role]['inactive_blocks'] = $blocks['inactive_blocks'];
        }

        update_option( 'advgb_blocks_user_roles', $advgb_blocks_user_roles_updated, false );
    }
    // Even when this method updates the database option, requires a refresh in js side */
}

// Set version if needed
if ($advgb_current_version !== ADVANCED_GUTENBERG_VERSION) {
    update_option('advgb_version', ADVANCED_GUTENBERG_VERSION);
}

// Delete custom_styles.css if exists (created in 2.4.4 and older)
require_once ABSPATH . 'wp-admin/includes/file.php';

WP_Filesystem();
global $wp_filesystem;
$custom_styles_dir  = wp_upload_dir();
$custom_styles_file = $custom_styles_dir['basedir'] . '/advgb/custom_styles.css';

if ($wp_filesystem->exists($custom_styles_file)) {
    $wp_filesystem->delete($custom_styles_file);
}
