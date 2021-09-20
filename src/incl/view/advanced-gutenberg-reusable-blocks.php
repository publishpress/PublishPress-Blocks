<?php
defined('ABSPATH') || die;

wp_enqueue_style('advgb_profile_style');
wp_enqueue_script('advgb_reusable_blocks_js');

// Current role
if( isset( $_REQUEST['user_role_reusable_blocks'] ) && !empty( $_REQUEST['user_role_reusable_blocks'] ) ) {
    $current_user_role_reusable_blocks = $_REQUEST['user_role_reusable_blocks'];
} else {
    $current_user_role_reusable_blocks = 'administrator';
}

// Get disabled blocks by user roles option
$advgb_reusable_blocks_user_roles = !empty( get_option('advgb_reusable_blocks_user_roles') ) ? get_option( 'advgb_reusable_blocks_user_roles' ) : [];
$advgb_reusable_blocks_user_roles = array_key_exists( $current_user_role_reusable_blocks, $advgb_reusable_blocks_user_roles ) ? (array)$advgb_reusable_blocks_user_roles[$current_user_role_reusable_blocks] : [];

// Saved wp_block post type
global $wpdb;
$reusable_blocks = $wpdb->get_results(
    'SELECT * FROM '. $wpdb->prefix. 'posts
    WHERE post_type="wp_block" AND post_status="publish" ORDER BY post_date_gmt DESC'
);

// Check users permissions
if ( !current_user_can('administrator') ) {
    wp_die( __('You do not have permission to manage Reusable Blocks Access', 'advanced-gutenberg') );
}

// Get disabled blocks by user roles option to check if core/block is active for this user role
$advgb_blocks_user_roles_ = !empty( get_option('advgb_blocks_user_roles') ) ? get_option( 'advgb_blocks_user_roles' ) : [];
$advgb_blocks_user_roles_ = array_key_exists( $current_user_role_reusable_blocks, $advgb_blocks_user_roles_ ) ? (array)$advgb_blocks_user_roles_[$current_user_role_reusable_blocks] : [];

if( isset( $advgb_blocks_user_roles_['inactive_blocks'] ) && in_array( 'core/block', $advgb_blocks_user_roles_['inactive_blocks'] ) ) {
    $reusable_block_enabled = false;
} else {
    $reusable_block_enabled = true;
}
/*echo '<pre>';
var_dump( $advgb_blocks_user_roles_['inactive_blocks'] );
echo '</pre>';*/
?>

<div id="advgb-reusable-blocks-container">
    <div class="ju-top-tabs-wrapper">
        <ul class="tabs ju-top-tabs">
            <li class="tab">
                <a href="#reusable-blocks-access-tab" class="link-tab">
                    <?php esc_html_e('Access', 'advanced-gutenberg') ?>
                </a>
            </li>
            <li class="tab">
                <a href="#reusable-blocks-edit-tab" class="link-tab">
                    <?php esc_html_e('Edit', 'advanced-gutenberg') ?>
                </a>
            </li>
        </ul>
    </div>

    <div id="reusable-blocks-access-tab" class="tab-content clearfix">
        <form method="post" <?php echo $reusable_block_enabled === false ? 'class="advgb-reusable-block-disabled"' : ''; ?>>
            <?php wp_nonce_field('advgb_nonce', 'advgb_nonce_field'); ?>
            <div>

                <?php
                if ( isset($_GET['save_access']) && $_GET['save_access'] === 'success' ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- display message, no action ?>
                    <div class="ju-notice-msg ju-notice-success">
                        <?php esc_html_e('Reusable Blocks Access saved successfully!', 'advanced-gutenberg') ?>
                        <i class="dashicons dashicons-dismiss ju-notice-close"></i>
                    </div>
                <?php
                } elseif ( isset($_GET['save_access']) && $_GET['save_access'] === 'error' ) {
                    ?>
                    <div class="ju-notice-msg ju-notice-error">
                        <?php esc_html_e('Error: Reusable Blocks Access can\'t be saved.', 'advanced-gutenberg') ?>
                        <i class="dashicons dashicons-dismiss ju-notice-close"></i>
                    </div>
                    <?php
                } else {
                    // Nothing to do here
                }
                ?>

                <div class="advgb-header profile-header">
                    <h1 class="header-title"><?php esc_html_e('Reusable Blocks Access', 'advanced-gutenberg') ?></h1>
                </div>

                <div class="profile-title" style="padding-bottom: 20px;">
                    <div class="advgb-roles-wrapper">
                        <select name="user_role_reusable_blocks" id="user_role_reusable_blocks">
                            <?php
                            global $wp_roles;
                            $roles_list = $wp_roles->get_names();
                            foreach ($roles_list as $roles => $role_name) :
                                $role_name = translate_user_role($role_name);
                                ?>
                                <option value="<?php echo esc_attr($roles); ?>" <?php selected( $current_user_role_reusable_blocks, $roles ); ?>>
                                    <?php echo $role_name; ?>
                                </option>
                            <?php
                            endforeach;
                            ?>
                        </select>
                        <div class="advgb-search-wrapper">
                            <input type="text" class="blocks-search-input advgb-search-input"
                                   placeholder="<?php esc_html_e('Search blocks', 'advanced-gutenberg') ?>"
                            >
                            <i class="mi mi-search"></i>
                        </div>
                        <div class="inline-button-wrapper">
                            <span id="block-update-notice">
                                <?php esc_html_e('Blocks list updated.', 'advanced-gutenberg') ?>
                            </span>

                            <button class="button button-primary pp-primary-button save-profile-button"
                                    type="submit"
                                    name="advgb_reusable_blocks_access_save"
                            >
                                <span><?php esc_html_e('Save Reusable Blocks Access', 'advanced-gutenberg') ?></span>
                            </button>
                        </div>
                    </div>
                </div>

                <?php
                if( $reusable_block_enabled === false ) {
                    ?>
                    <div class="advgb-reusable-block-disabled-notice">
                        <?php
                        // Current role name
                        $current_user_role_name = $current_user_role_reusable_blocks ? wp_roles()->get_names()[$current_user_role_reusable_blocks] : '';

                        echo sprintf(
                            __( 'Reusable Block type is disabled for the %s role through Block Access. This means all the reusable blocks are deactivated for this role.%sEnable %sReusable Block%s for %s and come back%s', 'advanced-gutenberg' ),
                            translate_user_role( $current_user_role_name ),
                            '<br><a class="button button-primary pp-primary-button" href="' . admin_url( 'admin.php?page=advgb_main&view=block-access&user_role=' . esc_html__( $current_user_role_reusable_blocks ) ) . '#block-access">',
                            '<strong>',
                            '</strong>',
                            translate_user_role( $current_user_role_name ),
                            '</a>'
                        );
                        ?>
                    </div>
                    <?php
                }
                ?>

                <!--Blocks list -->
                <div id="blocks-list-tab" class="tab-content">

                    <?php if( !empty( $reusable_blocks ) ) { ?>

                        <div>
                            <div class="category-block clearfix">
                                <ul class="blocks-list">
                                    <?php foreach ($reusable_blocks as $reusable_block) { ?>
                                        <li class="block-item ju-settings-option">
                                            <label class="ju-setting-label">
                                                <span class="block-icon"></span>
                                                <span class="block-title">
                                                    <?php echo $reusable_block->post_title; ?>
                                                </span>
                                            </label>
                                            <div class="ju-switch-button">
                                                <label class="switch">
                                                    <input type="checkbox" name="reusable_blocks[]" value="<?php echo esc_html( $reusable_block->ID ) ?>"<?php echo ( empty( $advgb_reusable_blocks_user_roles['inactive_blocks'] ) || !in_array($reusable_block->ID, $advgb_reusable_blocks_user_roles['inactive_blocks']) ) ? ' checked="checked"' : '' ?>>
                                                    <span class="slider"></span>
                                                </label>
                                            </div>
                                        </li>
                                    <?php } ?>
                                </ul>
                            </div>
                        </div>
                        <?php
                        // Generate hidden fields with all the saved blocks (except the ones not listed in this page to avoid saving them as inactive)
                        foreach ($reusable_blocks as $reusable_block) {
                            ?>
                            <input type="hidden" name="reusable_blocks_list[]" value="<?php echo esc_html( $reusable_block->ID ) ?>">
                            <?php
                        }

                    } else {
                        _e( 'No reusable blocks.', 'advanced-gutenberg' );
                    }
                    ?>
                </div>

                <!--Save button-->
                <button class="button button-primary pp-primary-button save-profile-button"
                        type="submit"
                        name="advgb_reusable_blocks_access_save"
                        style="margin-top: 20px;"
                >
                    <span><?php esc_html_e('Save Reusable Blocks Access', 'advanced-gutenberg') ?></span>
                </button>
            </div>
        </form>
    </div>

    <!-- Reusable Blocks edit lis -->
    <div id="reusable-blocks-edit-tab" class="tab-content clearfix">
        <div>
            <div class="advgb-header profile-header">
                <h1 class="header-title"><?php esc_html_e('Reusable Blocks Edit', 'advanced-gutenberg') ?></h1>
            </div>

            <!-- Blocks list -->
            <div id="blocks-list-tab" class="tab-content">

                <?php if( !empty( $reusable_blocks ) ) { ?>

                    <table class="wp-list-table widefat fixed striped table-view-list posts">
                    	<thead>
                        	<tr>
                        		<td class="manage-column column-cb check-column">
                                    <label class="screen-reader-text" for="cb-select-all-1">
                                        <?php _e( 'Select All', 'advanced-gutenberg' ) ?>
                                    </label>
                                    <input id="cb-select-all-1" type="checkbox">
                                </td>
                                <th scope="col" id="title" class="manage-column column-title column-primary sortable desc">
                                    <a href="">
                                        <span><?php _e( 'Title', 'advanced-gutenberg' ) ?></span>
                                        <span class="sorting-indicator"></span>
                                    </a>
                                </th>
                                <th scope="col" id="date" class="manage-column column-date sortable asc">
                                    <a href="">
                                        <span><?php _e( 'Date', 'advanced-gutenberg' ) ?></span>
                                        <span class="sorting-indicator"></span>
                                    </a>
                                </th>
                            </tr>
                    	</thead>

                    	<tbody>
                            <?php foreach ($reusable_blocks as $reusable_block) { ?>
                                <tr class="iedit level-0 type-wp_block status-<?php echo esc_html( $reusable_block->post_status ) ?> hentry entry">
                                    <th scope="row" class="check-column">
                                        <input id="cb-select-<?php echo esc_html( $reusable_block->ID ) ?>"
                                        type="checkbox" name="post[]" value="<?php echo esc_html( $reusable_block->ID ) ?>">
                        			</th>
                                    <td class="title column-title has-row-actions column-primary page-title" data-colname="Title">
                                        <a href="<?php echo admin_url( 'post.php?post=' . esc_html( $reusable_block->ID ) .'&action=edit' ) ?>"
                                            data-reusable-block="<?php echo esc_html( $reusable_block->ID ) ?>"
                                            class="advgb_qtip advgb_qtip_no_after" data-qtip="<?php _e( 'Edit' ) ?>">
                                            <?php echo $reusable_block->post_title; ?>
                                        </a>
                                    </td>
                                    <td class="date column-date" data-colname="Date">
                                        <?php echo esc_html( $reusable_block->post_status ) ?><br>
                                        <?php echo esc_html( $reusable_block->post_date ) ?>
                                    </td>
                                </tr>
                            <?php } ?>
                        </tbody>
                        <tfoot>
                        	<tr>
                        		<td class="manage-column column-cb check-column">
                                    <label class="screen-reader-text" for="cb-select-all-1">
                                        <?php _e( 'Select All', 'advanced-gutenberg' ) ?>
                                    </label>
                                    <input id="cb-select-all-1" type="checkbox">
                                </td>
                                <th scope="col" id="title" class="manage-column column-title column-primary sortable desc">
                                    <a href="">
                                        <span><?php _e( 'Title', 'advanced-gutenberg' ) ?></span>
                                        <span class="sorting-indicator"></span>
                                    </a>
                                </th>
                                <th scope="col" id="date" class="manage-column column-date sortable asc">
                                    <a href="">
                                        <span><?php _e( 'Date', 'advanced-gutenberg' ) ?></span>
                                        <span class="sorting-indicator"></span>
                                    </a>
                                </th>
                            </tr>
                    	</tfoot>
                    </table>
                    <?php
                } else {
                    _e( 'No reusable blocks.', 'advanced-gutenberg' );
                }
                ?>
            </div>
        </div>
    </div>
</div>
