<?php
defined('ABSPATH') || die;

wp_enqueue_style('profile_style');
wp_enqueue_script('profile_js');

$all_blocks_list     = get_option('advgb_blocks_list');
$all_categories_list = get_option('advgb_categories_list');

$postid              = $_GET['id']; // phpcs:ignore WordPress.CSRF.NonceVerification.NoNonceVerification -- view only
$post_title          = get_the_title($postid);
$active_blocks_saved = get_post_meta($postid, 'active_blocks', true);
$active_blocks_saved = $active_blocks_saved ? $active_blocks_saved : self::$default_active_blocks;

$roles_access_saved = get_post_meta($postid, 'roles_access', true);
if ($roles_access_saved === '') {
    $roles_access_saved = self::$default_roles_access;
}

$users_access_saved = get_post_meta($postid, 'users_access', true);
$users_access_saved = $users_access_saved ? $users_access_saved : array();

if ($postid === 'new') {
    $active_blocks_saved = self::$default_active_blocks;
    $roles_access_saved = self::$default_roles_access;
    $users_access_saved = array();
}

$disabled = '';
$rotating = '';
$button_text = __('Refresh', 'advanced-gutenberg');
$updating = (isset($_GET['update_blocks_list']) && $_GET['update_blocks_list'] === 'true'); // phpcs:ignore WordPress.CSRF.NonceVerification.NoNonceVerification -- begin to enqueue update blocks list, we have nonce later
if ($updating) {
    $disabled = 'disabled';
    $rotating = 'rotating';
    $button_text = __('Refreshing...', 'advanced-gutenberg');

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
?>

<form method="post">
    <?php wp_nonce_field('advgb_nonce', 'advgb_nonce_field'); ?>
    <input type="hidden" name="advgb_profile_id" value="<?php echo esc_html($postid) ?>" />
    <div id="profiles-container">
        <!--Tabs-->
        <ul class="tabs ju-top-tabs">
            <li class="tab">
                <a href="#blocks-list-tab" class="link-tab">
                    <?php esc_html_e('Blocks List', 'advanced-gutenberg') ?>
                </a>
            </li>
            <li class="tab">
                <a href="#users-tab" class="link-tab">
                    <?php esc_html_e('Profile Attribution', 'advanced-gutenberg') ?>
                </a>
            </li>
        </ul>

        <?php if (isset($_GET['save_profile'])) : // phpcs:ignore WordPress.CSRF.NonceVerification.NoNonceVerification -- display message, no action ?>
            <div class="ju-notice-msg ju-notice-success">
                <?php esc_html_e('Profile saved successfully!', 'advanced-gutenberg') ?>
                <a href="<?php echo esc_attr(admin_url('admin.php?page=advgb_main&view=profiles')) ?>" target="_self">
                    <?php esc_html_e('Return to profiles list', 'advanced-gutenberg') ?>
                </a>
                <i class="dashicons dashicons-dismiss ju-notice-close"></i>
            </div>
        <?php endif; ?>

        <div class="advgb-header profile-header">
            <h1 class="header-title"><?php esc_html_e('Edit Profile', 'advanced-gutenberg') ?></h1>
            <div class="inline-button-wrapper">
                    <span id="block-update-notice">
                        <?php esc_html_e('Blocks list updated.', 'advanced-gutenberg') ?>
                    </span>
                <button type="button" id="update-list-btn"
                        class="ju-button orange-outline-button waves-effect waves-dark"
                    <?php echo esc_attr($disabled) ?>
                        title="<?php esc_attr_e('Update the blocks list', 'advanced-gutenberg') ?>"
                >
                    <span>
                        <i class="dashicons dashicons-update <?php echo esc_attr($rotating) ?>" style="vertical-align: bottom"></i>
                        <span><?php echo esc_html($button_text) ?></span>
                    </span>
                </button>

                <a class="ju-button waves-effect waves-dark"
                   href="<?php echo esc_attr(admin_url('admin.php?page=advgb_main&view=profile&id=new')) ?>"
                >
                    <i class="mi mi-add"></i>
                    <span><?php esc_html_e('New Profile', 'advanced-gutenberg') ?></span>
                </a>

                <button class="ju-button orange-button waves-effect waves-light save-profile-button"
                        type="submit"
                        name="advgb_profile_save"
                >
                    <span><?php esc_html_e('Save', 'advanced-gutenberg') ?></span>
                </button>
            </div>
        </div>

        <div class="profile-title">
            <h4><?php esc_html_e('Profile title', 'advanced-gutenberg') ?></h4>
            <div class="advgb-search-wrapper">
                <input type="text" class="profile-title-input advgb-search-input"
                       name="advgb_profile_title"
                       placeholder="<?php esc_html_e('Enter title here', 'advanced-gutenberg') ?>"
                       value="<?php echo esc_html($post_title) ?>"
                >
            </div>
        </div>

        <!--Blocks list tab-->
        <div id="blocks-list-tab" class="tab-content">
            <div class="advgb-search-wrapper">
                <input type="text" class="blocks-search-input advgb-search-input"
                       placeholder="<?php esc_html_e('Search blocks', 'advanced-gutenberg') ?>"
                >
                <i class="mi mi-search"></i>
            </div>

            <div class="blocks-section">
                <?php foreach ($all_categories_list as $category) : ?>
                    <div class="category-block clearfix" data-category="<?php echo esc_attr($category['slug']) ?>">
                        <h3 class="category-name">
                            <span><?php echo esc_html($category['title']) ?></span>
                            <i class="mi"></i>
                        </h3>
                        <ul class="blocks-list">
                            <?php foreach ($all_blocks_list as $block) : ?>
                                <?php if ($block['category'] !== $category['slug']) :
                                    continue;
                                endif; ?>
                                <li class="block-item" data-type="<?php echo esc_attr($block['name']) ?>">
                                    <label for="block-<?php echo esc_attr($block['name']) ?>" class="ju-setting-label">
                                        <?php if (strpos($block['icon'], '<svg') !== false) :
                                            echo $block['icon']; // phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped -- already escaped
                                        else : ?>
                                            <i class="dashicons dashicons-<?php echo esc_attr($block['icon']) ?>"></i>
                                        <?php endif; ?>
                                        <span class="block-title" title="<?php echo esc_html($block['title']) ?>">
                                            <?php echo esc_html($block['title']) ?>
                                        </span>
                                    </label>
                                    <span class="block-config">
                                        <svg width="24px" height="24px" viewBox="0 0 24 24">
                                            <path fill="none" d="M0,0h24v24H0V0z"></path>
                                            <path d="M19.43,12.98c0.04-0.32,0.07-0.64,0.07-0.98c0-0.34-0.03-0.66-0.07-0.98l2.11-1.65c0.19-0.15,0.24-0.42,0.12-0.64l-2-3.46
                                                c-0.09-0.16-0.26-0.25-0.44-0.25c-0.06,0-0.12,0.01-0.17,0.03l-2.49,1c-0.52-0.4-1.08-0.73-1.69-0.98l-0.38-2.65
                                                C14.46,2.18,14.25,2,14,2h-4C9.75,2,9.54,2.18,9.51,2.42L9.13,5.07C8.52,5.32,7.96,5.66,7.44,6.05l-2.49-1
                                                C4.89,5.03,4.83,5.02,4.77,5.02c-0.17,0-0.34,0.09-0.43,0.25l-2,3.46C2.21,8.95,2.27,9.22,2.46,9.37l2.11,1.65
                                                C4.53,11.34,4.5,11.67,4.5,12c0,0.33,0.03,0.66,0.07,0.98l-2.11,1.65c-0.19,0.15-0.24,0.42-0.12,0.64l2,3.46
                                                c0.09,0.16,0.26,0.25,0.44,0.25c0.06,0,0.12-0.01,0.17-0.03l2.49-1c0.52,0.4,1.08,0.73,1.69,0.98l0.38,2.65
                                                C9.54,21.82,9.75,22,10,22h4c0.25,0,0.46-0.18,0.49-0.42l0.38-2.65c0.61-0.25,1.17-0.59,1.69-0.98l2.49,1
                                                c0.06,0.02,0.12,0.03,0.18,0.03c0.17,0,0.34-0.09,0.43-0.25l2-3.46c0.12-0.22,0.07-0.49-0.12-0.64L19.43,12.98z M17.45,11.27
                                                c0.04,0.31,0.05,0.52,0.05,0.73c0,0.21-0.02,0.43-0.05,0.73l-0.14,1.13l0.89,0.7l1.08,0.84l-0.7,1.21l-1.27-0.51l-1.04-0.42
                                                l-0.9,0.68c-0.43,0.32-0.84,0.56-1.25,0.73l-1.06,0.43l-0.16,1.13L12.7,20H11.3l-0.19-1.35l-0.16-1.13l-1.06-0.43
                                                c-0.43-0.18-0.83-0.41-1.23-0.71l-0.91-0.7l-1.06,0.43l-1.27,0.51l-0.7-1.21l1.08-0.84l0.89-0.7l-0.14-1.13
                                                C6.52,12.43,6.5,12.2,6.5,12s0.02-0.43,0.05-0.73l0.14-1.13L5.8,9.44L4.72,8.6l0.7-1.21l1.27,0.51l1.04,0.42l0.9-0.68
                                                c0.43-0.32,0.84-0.56,1.25-0.73l1.06-0.43l0.16-1.13L11.3,4h1.39l0.19,1.35l0.16,1.13l1.06,0.43c0.43,0.18,0.83,0.41,1.23,0.71
                                                l0.91,0.7l1.06-0.43l1.27-0.51l0.7,1.21L18.2,9.44l-0.89,0.7L17.45,11.27z"></path>
                                            <path d="M12,8c-2.21,0-4,1.79-4,4s1.79,4,4,4s4-1.79,4-4S14.21,8,12,8z M12,14c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2
                                                S13.1,14,12,14z"></path>
                                        </svg>
                                    </span>
                                    <div class="ju-switch-button">
                                        <label class="switch">
                                            <input type="checkbox" name="active_blocks[]"
                                                   id="block-<?php echo esc_attr($block['name']) ?>"
                                                   value="<?php echo esc_attr($block['name']) ?>"
                                                <?php if ($active_blocks_saved === 'all' || in_array($block['name'], $active_blocks_saved)) :
                                                    echo 'checked';
                                                endif; ?>
                                            />
                                            <span class="slider"></span>
                                        </label>
                                    </div>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>

        <!--Users access tab-->
        <div id="users-tab" class="tab-content">
            <div class="users-block-title clearfix">
                <h3><?php esc_html_e('Active this profile for this user(s)', 'advanced-gutenberg') ?>:</h3>
                <div class="advgb-users-search-box">
                    <input type="button"
                           name="advgb-clear-btn"
                           id="advgb-clear-btn"
                           class="ju-rect-button"
                           value="<?php esc_attr_e('Clear', 'advanced-gutenberg') ?>"/>
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
                    <div class="users-search" style="display: inline-block;">
                        <input type="text"
                               id="user-search-input"
                               name="s"
                               placeholder="<?php esc_attr_e('Search users', 'advanced-gutenberg') ?>"
                               value=""/>
                        <i class="mi mi-search users-search-toggle" title="<?php esc_attr_e('Search', 'advanced-gutenberg') ?>"></i>
                    </div>
                </div>
            </div>
            <div class="users-block">
                <table class="widefat fixed" id="advgb-users-list">
                    <thead>
                    <tr>
                        <th scope="col" id="advgb-users-select-box" class="manage-col" width="5%">
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
                            echo '<input class="ju-checkbox" type="checkbox" name="advgb-users[]" value="' . esc_html($userid) . '" />';
                            echo '</td>';
                            echo '<td class="name column-name">';
                            echo '<span>' . esc_html($user_object->display_name) . '</span>';
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

            <h3 style="margin: 45px 0 25px"><?php esc_html_e('Active this profile for this group(s)', 'advanced-gutenberg') ?>:</h3>
            <div class="advgb-groups-block">
                <ul class="advgb-groups-list clearfix">
                    <?php
                    $roles_list = $wp_roles->get_names();
                    foreach ($roles_list as $role => $role_name) :?>
                        <li class="clearfix">
                            <label for="<?php echo esc_attr($role) ?>" class="ju-setting-label"
                                   style="vertical-align: middle;"><?php echo esc_html($role_name) ?></label>
                            <div class="ju-switch-button">
                                <label class="switch">
                                    <input type="checkbox" class="extra-btn"
                                           name="advgb-roles[]"
                                           id="<?php echo esc_attr($role) ?>"
                                           value="<?php echo esc_attr($role) ?>"
                                            <?php if (in_array($role, $roles_access_saved)) :
                                                    echo 'checked';
                                            endif; ?>
                                    />
                                    <span class="slider"></span>
                                </label>
                            </div>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </div>
        </div>

        <!--Save button-->
        <button class="ju-button orange-button waves-effect waves-light save-profile-button"
                type="submit"
                name="advgb_profile_save"
        >
            <span><?php esc_html_e('Save', 'advanced-gutenberg') ?></span>
        </button>
    </div>
</form>