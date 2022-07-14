<?php
defined('ABSPATH') || die;

// Check users permissions
if ( !current_user_can('administrator') ) {
    wp_die( esc_html__('You do not have permission to manage Block Access', 'advanced-gutenberg') );
}

wp_enqueue_style('advgb_profile_style');
wp_enqueue_script('advgb_block_access_js');
do_action('enqueue_block_editor_assets');


// Block categories
$blockCategories = array();
if (function_exists('get_block_categories')) {
    $blockCategories = get_block_categories(get_post());
} elseif (function_exists('gutenberg_get_block_categories')) {
    $blockCategories = gutenberg_get_block_categories(get_post());
}
wp_add_inline_script(
    'wp-blocks',
    sprintf('wp.blocks.setCategories( %s );', wp_json_encode($blockCategories)),
    'after'
);

// Block types
$block_type_registry = \WP_Block_Type_Registry::get_instance();
foreach ( $block_type_registry->get_all_registered() as $block_name => $block_type ) {
    if ( ! empty( $block_type->editor_script ) ) {
        wp_enqueue_script( $block_type->editor_script );
	}
}

// Current role
if( isset( $_REQUEST['user_role'] ) && !empty( $_REQUEST['user_role'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- advgb_nonce in place
    $current_user_role = sanitize_text_field($_REQUEST['user_role']); // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- advgb_nonce in place
} else {
    $current_user_role = 'administrator';
}

// Active and inactive blocks for current user role
$block_access_by_role = get_option( 'advgb_blocks_user_roles');
if(
    ! empty( $block_access_by_role[$current_user_role] )
    && is_array( $block_access_by_role[$current_user_role] )
) {
    wp_localize_script(
        'wp-blocks',
        'advgbCUserRole',
        [
            'user_role' => $current_user_role,
            'access' => [
                'active_blocks' => $block_access_by_role[$current_user_role]['active_blocks'],
                'inactive_blocks' => $block_access_by_role[$current_user_role]['inactive_blocks']
            ]
        ]
    );
} else {
    // Nothing saved in database for current user role. Set empty (access to all blocks)
    wp_localize_script(
        'wp-blocks',
        'advgbCUserRole',
        [
            'user_role' => $current_user_role,
            'access' => [
                'active_blocks' => [],
                'inactive_blocks' => []
            ]
        ]
    );
}

// Get disabled blocks by user roles option
$advgb_blocks_user_roles = !empty( get_option('advgb_blocks_user_roles') ) ? get_option( 'advgb_blocks_user_roles' ) : [];
$advgb_blocks_user_roles = array_key_exists( $current_user_role, $advgb_blocks_user_roles ) ? (array)$advgb_blocks_user_roles[$current_user_role] : [];

// Saved blocks (the ones detected by PP Blocks)
// @TODO if advgb_blocks_list is empty, maybe refresh to display the blocks automatically (?)
$advgb_blocks_list = !empty( get_option( 'advgb_blocks_list' ) ) ? get_option( 'advgb_blocks_list' ) : [];

// Deactivate these blocks
$advgb_blocks_deactivate_force = array(
    'advgb/container'
);
// Activate these blocks
$advgb_blocks_activate_force = array(
    'core/legacy-widget' // Randomly visible in Block Access screen!
);
$advgb_block_status_    = null;
$advgb_block_readonly_  = null;
?>

<form method="post">
    <?php wp_nonce_field('advgb_nonce', 'advgb_nonce_field'); ?>
    <div>

        <?php
        if ( isset($_GET['save_access']) && $_GET['save_access'] === 'success' ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- display message, no action ?>
            <div class="ju-notice-msg ju-notice-success">
                <?php esc_html_e('Block Access saved successfully!', 'advanced-gutenberg') ?>
                <i class="dashicons dashicons-dismiss ju-notice-close"></i>
            </div>
        <?php
    } elseif ( isset($_GET['save_access']) && $_GET['save_access'] === 'error' ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- advgb_nonce in place
            ?>
            <div class="ju-notice-msg ju-notice-error">
                <?php esc_html_e('Block Access can\'t be saved. Please try again.', 'advanced-gutenberg') ?>
                <i class="dashicons dashicons-dismiss ju-notice-close"></i>
            </div>
            <?php
        } else {
            // Nothing to do here
        }
        ?>

        <div class="advgb-header profile-header">
            <h1 class="header-title"><?php esc_html_e('Block Access', 'advanced-gutenberg') ?></h1>
        </div>

        <div class="profile-title" style="padding-bottom: 20px;">
            <div class="advgb-roles-wrapper">
                <select name="user_role" id="user_role">
                    <?php
                    global $wp_roles;
                    $roles_list = $wp_roles->get_names();
                    foreach ($roles_list as $roles => $role_name) :
                        $role_name = translate_user_role($role_name);
                        ?>
                        <option value="<?php echo esc_attr($roles); ?>" <?php selected( $current_user_role, $roles ); ?>>
                            <?php echo esc_html($role_name); ?>
                        </option>
                    <?php
                    endforeach;
                    ?>
                </select>
                <div class="advgb-search-wrapper">
                    <input type="text" class="blocks-search-input advgb-search-input"
                           placeholder="<?php esc_attr_e('Search blocks', 'advanced-gutenberg') ?>"
                    >
                    <i class="mi mi-search"></i>
                </div>
                <div class="advgb-toggle-wrapper">
                    <?php _e('Enable or disable all blocks', 'advanced-gutenberg') ?>
                    <div class="ju-switch-button">
                        <label class="switch">
                            <input type="checkbox" name="toggle_all_blocks" id="toggle_all_blocks">
                            <span class="slider"></span>
                        </label>
                    </div>
                </div>
                <div class="inline-button-wrapper">
                    <span class="advgb_qtip advgb_qtip_no_after advgb-enable-one-block-msg"
                        data-qtip="<?php esc_attr_e(
                            'To save this configuration, enable at least one block',
                            'advanced-gutenberg'
                        ) ?>"
                        style="display: none;">
                        <span class="dashicons dashicons-warning"></span>
                    </span>
                    <button class="button button-primary pp-primary-button save-profile-button"
                            type="submit"
                            name="advgb_block_access_save"
                    >
                        <span><?php esc_html_e('Save Block Access', 'advanced-gutenberg') ?></span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Blocks list -->
        <div id="blocks-list-tab" class="tab-content">
            <div class="blocks-section">
                <input type="hidden" name="blocks_list" id="blocks_list" />
            </div>
        </div>

        <!-- Save button-->
        <div style="margin-top: 20px;">
            <button class="button button-primary pp-primary-button save-profile-button"
                    type="submit"
                    name="advgb_block_access_save"
            >
                <span><?php esc_html_e('Save Block Access', 'advanced-gutenberg') ?></span>
            </button>
            <span class="advgb_qtip advgb_qtip_no_after advgb-enable-one-block-msg"
                data-qtip="<?php esc_attr_e(
                    'To save this configuration, enable at least one block',
                    'advanced-gutenberg'
                ) ?>"
                style="display: none;">
                <span class="dashicons dashicons-warning"></span>
            </span>
        </div>
    </div>
</form>
