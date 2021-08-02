<?php
defined('ABSPATH') || die;

wp_enqueue_style('advgb_profile_style');
wp_enqueue_script('advgb_block_access_js');
wp_enqueue_script('wp-blocks');
wp_enqueue_script('wp-element');
wp_enqueue_script('wp-data');
wp_enqueue_script('wp-components');
wp_enqueue_script('wp-block-library');
wp_enqueue_script('wp-editor');
wp_enqueue_script('wp-edit-post');
wp_enqueue_script('wp-plugins');
do_action('enqueue_block_editor_assets');

// Block Categories
$blockCategories = array();
if (function_exists('get_block_categories')) {
    $blockCategories = get_block_categories(get_post());
} elseif (function_exists('gutenberg_get_block_categories')) {
    $blockCategories = gutenberg_get_block_categories(get_post());
}
//var_dump($blockCategories);

wp_add_inline_script(
    'wp-blocks',
    sprintf('wp.blocks.setCategories( %s );', wp_json_encode($blockCategories)),
    'after'
);

// Current role
if( isset( $_REQUEST['user_role'] ) ) {
    $current_user_role = $_REQUEST['user_role'];
} else {
    $current_user_role = 'administrator';
}

/*/ No user roles detected since 3.0.0. Let's create the option
if( !get_option( 'advgb_blocks_user_roles' ) ) {
    add_option( 'advgb_blocks_user_roles' );
}*/

// Get disabled blocks by user roles option
$advgb_blocks_user_roles = !empty( get_option('advgb_blocks_user_roles') ) ? get_option( 'advgb_blocks_user_roles' ) : [];
$advgb_blocks_user_roles = array_key_exists( $current_user_role, $advgb_blocks_user_roles ) ? (array)$advgb_blocks_user_roles[$current_user_role] : [];
var_dump( $advgb_blocks_user_roles );

// Saved blocks (the ones detected by PP Blocks)
$advgb_blocks_list = get_option( 'advgb_blocks_list' );

// Check users permissions
if ( !current_user_can('administrator') ) {
    wp_die( __('You do not have permission to manage Block Access', 'advanced-gutenberg') );
}
?>

<form method="post">
    <?php wp_nonce_field('advgb_nonce', 'advgb_nonce_field'); ?>
    <div>

        <?php if ( isset($_GET['save_profile']) ) : // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- display message, no action ?>
            <div class="ju-notice-msg ju-notice-success">
                <?php esc_html_e('Block Access saved successfully!', 'advanced-gutenberg') ?>
                <i class="dashicons dashicons-dismiss ju-notice-close"></i>
            </div>
        <?php endif; ?>

        <div class="advgb-header profile-header">
            <h1 class="header-title"><?php esc_html_e('Block Access', 'advanced-gutenberg') ?></h1>
            <div class="inline-button-wrapper">
                <span id="block-update-notice">
                    <?php esc_html_e('Blocks list updated.', 'advanced-gutenberg') ?>
                </span>

                <button class="button button-primary pp-primary-button save-profile-button"
                        type="submit"
                        name="advgb_block_access_save"
                >
                    <span><?php esc_html_e('Save', 'advanced-gutenberg') ?></span>
                </button>
            </div>
        </div>

        <div class="profile-title">
            <div class="advgb-roles-wrapper">
                <select name="user_role" id="user_role" class="ju-select" onchange="this.form.submit()">
                    <?php
                    global $wp_roles;
                    $roles_list = $wp_roles->get_names();
                    foreach ($roles_list as $roles => $role_name) :
                        $name = translate_user_role($name);
                        ?>
                        <option value="<?php echo esc_attr($roles); ?>" <?php selected( $current_user_role, $roles ); ?>>
                            <?php echo $role_name; ?>
                        </option>
                    <?php
                    endforeach;
                    ?>
                </select>
                <?php
                if( $_REQUEST['user_role'] ) {
                    echo $_REQUEST['user_role'];
                }
                ?>
                <span id="advgb-loading" style="display:none;">
                    <?php _e('Loading...', 'advanced-gutenberg') ?>
                </span>
            </div>
        </div>

        <!--Blocks list -->
        <div id="blocks-list-tab" class="tab-content">
            <div class="advgb-search-wrapper">
                <input type="text" class="blocks-search-input advgb-search-input"
                       placeholder="<?php esc_html_e('Search blocks', 'advanced-gutenberg') ?>"
                >
                <i class="mi mi-search"></i>
            </div>

            <div>
                <!--div id="advgb-blocks-list"></div>
                <div class="blocks-section"></div-->
                <?php
                $savedBlocksListName = array();

                foreach( $blockCategories as $blockCategory ) {
                    ?>
                    <div class="category-block clearfix">
                        <h3 class="category-name">
                            <span>
                                <?php echo $blockCategory['title']; ?>
                            </span><i class="mi"></i>
                        </h3>
                        <ul class="blocks-list">
                            <?php
                            foreach ($advgb_blocks_list as $block) {
                                if( $blockCategory['slug'] === $block['category'] ) {
                                    // Convert object to array
                                    $block = (array)$block;
                                    //$savedBlocksListName[] = $block['name'];
                                    ?>
                                    <li class="block-item ju-settings-option">
                                        <label class="ju-setting-label">
                                            <span class="block-icon"<?php echo $block['iconColor'] ? ' style="color:' . $block['iconColor'] . ';"' : ''; ?>">
                                                <?php echo wp_specialchars_decode( $block['icon'], ENT_QUOTES ); ?>
                                            </span>
                                            <span class="block-title">
                                                <?php echo $block['title']; ?>
                                            </span>
                                        </label>
                                        <div class="ju-switch-button">
                                            <label class="switch">
                                                <input type="checkbox" name="blocks[]" value="<?php echo esc_attr( $block['name'] ); ?>"<?php echo ( empty($advgb_blocks_user_roles['blocks']) || in_array($block['name'], $advgb_blocks_user_roles['blocks']) ) ? ' checked="checked"' : '' ?>>
                                                <span class="slider"></span>
                                            </label>
                                        </div>
                                    </li>
                                <?php
                                }
                            }
                        ?>
                    </div>
                    <?php
                }
                ?>
            </div>
        </div>

        <!--Save button-->
        <button class="button button-primary pp-primary-button save-profile-button"
                type="submit"
                name="advgb_block_access_save"
        >
            <span><?php esc_html_e('Save', 'advanced-gutenberg') ?></span>
        </button>
    </div>
</form>
