<?php
defined('ABSPATH') || die;

$all_blocks_list     = get_option('advgb_blocks_list');
$all_categories_list = get_option('advgb_categories_list');

$postid              = get_the_ID();
$active_blocks_saved = get_post_meta($postid, 'active_blocks', true);
$active_blocks_saved = $active_blocks_saved ? $active_blocks_saved : self::$default_active_blocks;

$roles_access_saved = get_post_meta($postid, 'roles_access', true);
if ($roles_access_saved === '') {
    $roles_access_saved = self::$default_roles_access;
}

$users_access_saved = get_post_meta($postid, 'users_access', true);
$users_access_saved = $users_access_saved ? $users_access_saved : array();

$disabled = '';
$rotating = '';
$button_text = __('Update list', 'advanced-gutenberg');
$updating = (isset($_GET['update_blocks_list']) && $_GET['update_blocks_list'] === 'true'); // phpcs:ignore WordPress.CSRF.NonceVerification.NoNonceVerification -- begin to enqueue update blocks list, we have nonce later
if ($updating) {
    $disabled = 'disabled';
    $rotating = 'rotating';
    $button_text = __('Still updating... Please wait a bit...', 'advanced-gutenberg');

    wp_enqueue_script('wp-blocks');
    wp_enqueue_script('wp-element');
    wp_enqueue_script('wp-data');
    wp_enqueue_script('wp-components');
    wp_enqueue_script('wp-core-blocks');
    wp_enqueue_script('wp-editor');
    do_action('enqueue_block_editor_assets');
    wp_enqueue_script('update_list');
    wp_localize_script('update_list', 'advgbUpdate', array('onProfile' => true));
}

wp_nonce_field('advgb_nonce', 'advgb_nonce_field');
?>

<div id="profiles-container">
    <!--Tabs-->
    <ul class="tabs cyan z-depth-1">
        <li class="tab">
            <a href="#blocks-list-tab" class="link-tab white-text waves-effect waves-light">
                <?php esc_html_e('Blocks List', 'advanced-gutenberg') ?>
            </a>
        </li>
        <li class="tab">
            <a href="#users-tab" class="link-tab white-text waves-effect waves-light">
                <?php esc_html_e('Profile Attribution', 'advanced-gutenberg') ?>
            </a>
        </li>
    </ul>

    <!--Blocks list tab-->
    <div id="blocks-list-tab" class="tab-content">
        <div class="update-block-list">
            <button type="button" id="update-list-btn"
                    class="cyan white-text material-btn"
                    <?php echo esc_attr($disabled) ?>
                    title="<?php esc_attr_e('Update the blocks list', 'advanced-gutenberg') ?>">
                <i class="dashicons dashicons-update <?php echo esc_attr($rotating) ?>"></i>
                <span>
                    <?php echo esc_html($button_text) ?>
                </span>
            </button>
            <span id="block-update-notice">
                <?php esc_html_e('Blocks list updated.', 'advanced-gutenberg') ?>
            </span>
        </div>
        <div class="blocks-section">
            <?php foreach ($all_categories_list as $category) : ?>
                <div class="category-block clearfix" data-category="<?php echo esc_attr($category['slug']) ?>">
                    <h3 class="category-name"><?php echo esc_html($category['title']) ?></h3>
                    <ul class="blocks-list">
                        <?php foreach ($all_blocks_list as $block) : ?>
                            <?php if ($block['category'] !== $category['slug']) :
                                continue;
                            endif; ?>
                            <li class="block-item" data-type="<?php echo esc_attr($block['name']) ?>">
                                <input type="checkbox" name="active_blocks[]"
                                       id="block-<?php echo esc_attr($block['name']) ?>"
                                       value="<?php echo esc_attr($block['name']) ?>"
                                    <?php if ($active_blocks_saved === 'all'
                                              || in_array($block['name'], $active_blocks_saved)) :
                                        echo 'checked';
                                    endif; ?>
                                />
                                <label for="block-<?php echo esc_attr($block['name']) ?>" class="switch-label">
                                    <?php if (strpos($block['icon'], '<svg') !== false) :
                                        echo $block['icon']; // phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped -- already escaped
                                    else : ?>
                                        <i class="dashicons dashicons-<?php echo esc_attr($block['icon']) ?>"></i>
                                    <?php endif; ?>
                                    <span class="block-title" title="<?php echo esc_html($block['title']) ?>">
                                        <?php echo esc_html($block['title']) ?>
                                    </span>
                                </label>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endforeach; ?>
        </div>
    </div>

    <!--Users access tab-->
    <div id="users-tab" class="tab-content">
        <h3><?php esc_html_e('Active this profile for this user(s)', 'advanced-gutenberg') ?>:</h3>
        <div class="users-block">
            <div class="advgb-users-search-box">
                <input type="text"
                       id="user-search-input"
                       name="s"
                       placeholder="<?php esc_attr_e('Search users', 'advanced-gutenberg') ?>"
                       value=""/>
                <select name="advgb-roles-filter" id="advgb-roles-filter">
                    <option value=""><?php esc_html_e('Use role filter', 'advanced-gutenberg') ?></option>
                    <?php
                    $wp_roles   = wp_roles();
                    $roles_list = $wp_roles->get_names();
                    foreach ($roles_list as $role => $role_name) {
                        echo '<option value="' . esc_attr($role) . '">' . esc_html($role_name) . '</option>';
                    }
                    ?>
                </select>
                <input type="button"
                       name="advgb-clear-btn"
                       id="advgb-clear-btn"
                       class="button"
                       value="<?php esc_attr_e('Clear', 'advanced-gutenberg') ?>"/>
            </div>
            <table class="widefat fixed" id="advgb-users-list">
                <thead>
                <tr>
                    <th scope="col" id="advgb-users-select-box" class="manage-col">
                        <input type="hidden" id="advgb-users-checkall" name="select-user" value="">
                    </th>
                    <th scope="col" id="advgb-users-name" class="manage-col">
                        <span><?php esc_html_e('Name', 'advanced-gutenberg') ?></span>
                    </th>
                    <th scope="col" id="advgb-users-username" class="manage-col">
                        <span><?php esc_html_e('Username', 'advanced-gutenberg') ?></span>
                    </th>
                    <th scope="col" id="advgb-users-email" class="manage-col">
                        <span><?php esc_html_e('Email', 'advanced-gutenberg') ?></span>
                    </th>
                    <th scope="col" id="advgb-users-role" class="manage-col">
                        <span><?php esc_html_e('Role', 'advanced-gutenberg') ?></span>
                    </th>
                </tr>
                </thead>

                <tbody id="advgb-users-body">
                <?php
                $users_per_page = 20;
                $pagenum        = isset($_REQUEST['paged']) ? absint($_REQUEST['paged']) : 1; // phpcs:ignore WordPress.CSRF.NonceVerification.NoNonceVerification -- View request, no action
                $paged          = max(1, $pagenum);
                $args           = array(
                    'number'  => $users_per_page,
                    'offset'  => ($paged - 1) * $users_per_page,
                    'include' => wp_get_users_with_no_role(),
                    'fields'  => 'all_with_meta'
                );

                // Query the user IDs for this page
                $wp_user_search = get_users($args);
                $total_users    = count(get_users());
                $total_pages    = ceil($total_users / $users_per_page);

                if (count($wp_user_search)) {
                    foreach ($wp_user_search as $userid => $user_object) {
                        echo '<tr>';
                        echo '<td class="select-box">';
                        echo '<input type="checkbox" name="advgb-users[]" value="' . esc_html($userid) . '" >';
                        echo '</td>';
                        echo '<td class="name column-name">';
                        echo '<span style="color: #0073aa">' . esc_html($user_object->display_name) . '</span>';
                        echo '</td>';
                        echo '<td class="username column-username">';
                        echo '<strong>' . esc_html($user_object->user_login) . '</strong>';
                        echo '</td>';
                        echo '<td class="email column-email">' . esc_html($user_object->user_email) . '</td>';

                        $role_list = array();
                        global $wp_roles;
                        foreach ($user_object->roles as $role) {
                            if (isset($wp_roles->role_names[ $role ])) {
                                $role_list[ $role ] = translate_user_role($wp_roles->role_names[ $role ]);
                            }
                        }

                        if (empty($role_list)) {
                            $role_list['none'] = _x('None', 'no user roles', 'advanced-gutenberg');
                        }
                        $roles_list = implode(', ', $role_list);

                        echo '<td class="role column-role">' . esc_html($roles_list) . '</td>';
                        echo '</tr>';
                    }
                } else {
                    echo '<tr><td colspan="5"> ';
                    echo esc_html__('No users found.', 'advanced-gutenberg');
                    echo '</td></tr>';
                }
                ?>
                </tbody>
                <?php $list_users_access = implode(' ', $users_access_saved); ?>
                <input type="hidden"
                       name="advgb-users-access-list"
                       id="advgb-users-access-list"
                       value="<?php echo esc_html($list_users_access) ?>"/>
            </table>
            <p id="pagination">
                <?php
                $doneLeft   = false;
                $doneRight  = false;
                $skipLeft   = false;
                $skipRight  = false;
                if ($total_pages > 1) {
                    for ($i = 1; $i <= $total_pages; $i ++) {
                        if ($i < $pagenum - 2) {
                            $skipLeft = true;
                        } elseif ($i > $pagenum + 2) {
                            $skipRight = true;
                        } else {
                            $skipLeft  = false;
                            $skipRight = false;
                        }
                        if ($i === 1) {
                            if ($pagenum === 1) {
                                echo '<i class="dashicons dashicons-controls-skipback" id="first-page"></i>';
                            } else {
                                echo '<a class="dashicons dashicons-controls-skipback" id="first-page"></a>';
                            }
                        }
                        if (!$skipLeft && !$skipRight) {
                            if ($i === $pagenum) {
                                echo '<strong>' . esc_html($i) . '</strong>';
                            } else {
                                echo '<a class="switch-page">' . esc_html($i) . '</a>';
                            }
                        } elseif ($skipLeft) {
                            if (!$doneLeft) {
                                echo '<span>...</span>';
                                $doneLeft = true;
                            }
                        } elseif ($skipRight) {
                            if (!$doneRight) {
                                echo '<span>...</span>';
                                $doneRight = true;
                            }
                        }
                        if ($i === $total_pages) {
                            if ($pagenum === $total_pages) {
                                echo '<i class="dashicons dashicons-controls-skipforward" id="last-page"></i>';
                            } else {
                                echo '<a class="dashicons dashicons-controls-skipforward" id="last-page" '
                                    .'title="' . esc_attr__('Last page', 'advanced-gutenberg') . '"></a>';
                            }
                        }
                    }
                } ?>
            </p>
        </div> <!--end Users blocks-->

        <h3><?php esc_html_e('Active this profile for this group(s)', 'advanced-gutenberg') ?>:</h3>
        <div class="advgb-groups-block">
            <ul class="advgb-groups-list">
                <?php
                $roles_list = $wp_roles->get_names();
                foreach ($roles_list as $role => $role_name) :?>
                    <li>
                        <label for="<?php echo esc_attr($role) ?>" class="switch-label"
                               style="vertical-align: middle;"><?php echo esc_html($role_name) ?></label>
                        <div class="switch-btn">
                            <label class="switch">
                                <input type="checkbox" class="extra-btn"
                                       name="advgb-roles[]"
                                       id="<?php echo esc_attr($role) ?>"
                                       value="<?php echo esc_attr($role) ?>"
                                        <?php if (in_array($role, $roles_access_saved)) :
                                                echo 'checked';
                                        endif; ?>
                                />
                                <span class="slider round"></span>
                            </label>
                        </div>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
    </div>

    <!--Save button-->
    <div class="save-settings-block waves-effect waves-light">
        <input type="button"
               class="cyan white-text material-btn"
               id="save-advgb-profile"
               value="<?php esc_attr_e('Save', 'advanced-gutenberg') ?>"/>
    </div>
</div>