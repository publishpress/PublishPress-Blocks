<?php
defined('ABSPATH') or die;

$all_blocks_list     = get_option('advgb_blocks_list');
$all_categories_list = get_option('advgb_categories_list');

$postid              = get_the_ID();
$active_blocks_saved = get_post_meta($postid, 'active_blocks', true);
$active_blocks_saved = $active_blocks_saved ? $active_blocks_saved : self::$default_active_blocks;

$roles_access_saved = get_post_meta($postid, 'roles_access', true);
if ($roles_access_saved == '') {
    $roles_access_saved = self::$default_roles_access;
}

$users_access_saved = get_post_meta($postid, 'users_access', true);
$users_access_saved = $users_access_saved ? $users_access_saved : array();

$disabled = $rotating = '';
$button_text = __('Update list', 'advanced-gutenberg');
$updating = (isset($_GET['update_blocks_list']) && $_GET['update_blocks_list'] == true);
if ($updating) {
    $disabled = 'disabled';
    $rotating = 'rotating';
    $button_text = __('Still updating... Please wait a bit...', 'advanced-gutenberg');

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
                <?php _e('Blocks List', 'advanced-gutenberg') ?>
            </a>
        </li>
        <li class="tab">
            <a href="#users-tab" class="link-tab white-text waves-effect waves-light">
                <?php _e('Profile Attribution', 'advanced-gutenberg') ?>
            </a>
        </li>
    </ul>

    <!--Blocks list tab-->
    <div id="blocks-list-tab" class="tab-content">
        <div class="update-block-list">
            <button type="button" id="update-list-btn"
                    class="cyan white-text material-btn"
                    <?php echo $disabled ?>
                    title="<?php _e('Update the blocks list', 'advanced-gutenberg') ?>">
                <i class="dashicons dashicons-update <?php echo $rotating ?>"></i>
                <span>
                    <?php echo $button_text ?>
                </span>
            </button>
            <span id="block-update-notice">
                <?php _e('Blocks list updated.', 'advanced-gutenberg') ?>
            </span>
        </div>
        <div class="blocks-section">
            <?php foreach ($all_categories_list as $category) : ?>
                <div class="category-block clearfix" data-category="<?php echo $category['slug'] ?>">
                    <h3 class="category-name"><?php echo esc_html($category['title']) ?></h3>
                    <ul class="blocks-list">
                        <?php foreach ($all_blocks_list as $block) : ?>
                            <?php if ($block['category'] != $category['slug']) :
                                continue;
                            endif;
                            $block_id = strtolower(str_replace(' ', '', $block['title'])) ?>
                            <li class="block-item" data-type="<?php echo esc_attr($block['name']) ?>">
                                <input type="checkbox" name="active_blocks[]"
                                       id="block-<?php echo esc_attr($block_id) ?>"
                                       value="<?php echo esc_attr($block['name']) ?>"
                                    <?php if ($active_blocks_saved == 'all'
                                              || in_array($block['name'], $active_blocks_saved)) :
                                        echo 'checked';
                                    endif; ?>
                                />
                                <label for="block-<?php echo $block_id ?>" class="switch-label">
                                    <i class="dashicons dashicons-<?php echo esc_attr($block['icon']) ?>"></i>
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
        <h3><?php _e('Active this profile for this user(s)', 'advanced-gutenberg') ?>:</h3>
        <div class="users-block">
            <div class="advgb-users-search-box">
                <input type="text"
                       id="user-search-input"
                       name="s"
                       placeholder="<?php _e('Search users', 'advanced-gutenberg') ?>"
                       value=""/>
                <select name="advgb-roles-filter" id="advgb-roles-filter">
                    <option value=""><?php _e('Use role filter', 'advanced-gutenberg') ?></option>
                    <?php
                    $wp_roles   = wp_roles();
                    $roles_list = $wp_roles->get_names();
                    foreach ($roles_list as $role => $role_name) {
                        echo '<option value="' . $role . '">' . $role_name . '</option>';
                    }
                    ?>
                </select>
                <input type="button"
                       name="advgb-clear-btn"
                       id="advgb-clear-btn"
                       class="button"
                       value="<?php _e('Clear', 'advanced-gutenberg') ?>"/>
            </div>
            <table class="widefat fixed" id="advgb-users-list">
                <thead>
                <tr>
                    <th scope="col" id="advgb-users-select-box" class="manage-col">
                        <input type="hidden" id="advgb-users-checkall" name="select-user" value="">
                    </th>
                    <th scope="col" id="advgb-users-name" class="manage-col">
                        <span><?php _e('Name', 'advanced-gutenberg') ?></span>
                    </th>
                    <th scope="col" id="advgb-users-username" class="manage-col">
                        <span><?php _e('Username', 'advanced-gutenberg') ?></span>
                    </th>
                    <th scope="col" id="advgb-users-email" class="manage-col">
                        <span><?php _e('Email', 'advanced-gutenberg') ?></span>
                    </th>
                    <th scope="col" id="advgb-users-role" class="manage-col">
                        <span><?php _e('Role', 'advanced-gutenberg') ?></span>
                    </th>
                </tr>
                </thead>

                <tbody id="advgb-users-body">
                <?php
                $users_per_page = 20;
                $pagenum        = isset($_REQUEST['paged']) ? absint($_REQUEST['paged']) : 1;
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
                            $role_list['none'] = _x('None', 'no user roles');
                        }
                        $roles_list = implode(', ', $role_list);

                        echo '<td class="role column-role">' . $roles_list . '</td>';
                        echo '</tr>';
                    }
                } else {
                    echo '<tr><td colspan="5"> ';
                    echo __('No users found.', 'advanced-gutenberg');
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
                <?php $doneLeft = $doneRight = $skipLeft = $skipRight = false;
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
                        if ($i == 1) {
                            if ($pagenum == 1) {
                                echo '<i class="dashicons dashicons-controls-skipback" id="first-page"></i>';
                            } else {
                                echo '<a class="dashicons dashicons-controls-skipback" id="first-page"></a>';
                            }
                        }
                        if (!$skipLeft && !$skipRight) {
                            if ($i == $pagenum) {
                                echo '<strong>' . $i . '</strong>';
                            } else {
                                echo '<a class="switch-page">' . $i . '</a>';
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
                        if ($i == $total_pages) {
                            if ($pagenum == $total_pages) {
                                echo '<i class="dashicons dashicons-controls-skipforward" id="last-page"></i>';
                            } else {
                                echo '<a class="dashicons dashicons-controls-skipforward" id="last-page" '
                                    .'title="' . __('Last page', 'advanced-gutenberg') . '"></a>';
                            }
                        }
                    }
                } ?>
            </p>
        </div> <!--end Users blocks-->

        <h3><?php _e('Active this profile for this group(s)', 'advanced-gutenberg') ?>:</h3>
        <div class="advgb-groups-block">
            <ul class="advgb-groups-list">
                <?php
                $roles_list = $wp_roles->get_names();
                foreach ($roles_list as $role => $role_name) :?>
                    <li>
                        <label for="<?php echo $role ?>" class="switch-label"
                               style="vertical-align: middle;"><?php echo $role_name ?></label>
                        <div class="switch-btn">
                            <label class="switch">
                                <input type="checkbox" class="extra-btn"
                                       name="advgb-roles[]"
                                       id="<?php echo $role ?>"
                                       value="<?php echo $role ?>"
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
               value="<?php _e('Save', 'advanced-gutenberg') ?>"/>
    </div>
</div>