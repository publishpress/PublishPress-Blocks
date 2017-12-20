<?php
defined('ABSPATH') or die;

/**
 * Main class of Gutenberg Advanced
 */
class AdvancedGutenbergMain
{
    public static $default_roles_access = array('administrator', 'editor', 'author');
    public static $default_active_blocks = 'all';
    protected $active_profile = null;

    public function __construct()
    {
        add_action('admin_enqueue_scripts', array($this, 'registerStylesScripts'));

        if (is_admin()) {
            add_action('init', array($this, 'registerAdvgbMenu'));
            add_action('save_post_advgb_profiles', array($this, 'saveAdvgbProfile'));
            add_filter('post_updated_messages', array($this, 'updatePostMsg'));
            add_action('admin_init', array($this, 'initBlocksList'));
            add_action('admin_menu', array($this, 'registerMetaBox'));
            add_action('admin_menu', array($this, 'registerSettingsMenu'), 5);
            add_action('load-settings_page_advgb_settings', array($this, 'saveSettings'));
            add_filter('allowed_block_types', array($this, 'initActiveBlocksForGutenberg'));

            // Ajax
            add_action('wp_ajax_advgb_update_blocks_list', array($this, 'updateBlocksList'));
            add_action('wp_ajax_advgb_get_users', array($this, 'getUsers'));
        } else {
            // Front-end
            add_filter('the_content', array($this, 'addGalleryLightbox'));
        }
    }

    /**
     * Ajax to update blocks list
     */
    public function updateBlocksList()
    {
        $blocksList     = $_POST['blocksList'];
        $categoriesList = $_POST['categoriesList'];

        update_option('advgb_blocks_list', $blocksList);
        update_option('advgb_categories_list', $categoriesList);

        wp_send_json(array(
            'blocks_list' => $blocksList,
            'categories_list' => $categoriesList
        ), 200);
    }

    /**
     * Ajax to get list of users
     *
     * @return bool,json Return false if failure, json on success
     */
    public function getUsers()
    {
        // Check users permissions
        if (! current_user_can('create_advgb_profiles')) {
            wp_send_json('No permission!', 403);
            return false;
        }

        $usersearch     = isset($_REQUEST['search']) ? wp_unslash(trim($_REQUEST['search'])) : '';
        $role           = isset($_REQUEST['role']) ? $_REQUEST['role'] : '';
        $users_per_page = 20;
        $pagenum        = 1;
        if ($role == 'none') {
            $args_all = array(
                'include' => wp_get_users_with_no_role(),
                'search'  => $usersearch,
                'fields'  => 'all_with_meta'
            );
        } else {
            $args_all = array(
                'role'   => $role,
                'search' => $usersearch,
                'fields' => 'all_with_meta'
            );
        }
        if ($args_all['search'] !== '') {
            $args_all['search'] = '*' . $args_all['search'] . '*';
        }

        $total_users = count(get_users($args_all));
        $total_pages = ceil($total_users / $users_per_page);
        if (isset($_REQUEST['paged'])) {
            if ($_REQUEST['paged'] == 'first') {
                $pagenum = 1;
            } elseif ($_REQUEST['paged'] == 'last') {
                $pagenum = $total_pages;
            } else {
                $pagenum = $_REQUEST['paged'];
            }
        }
        $paged = max(1, $pagenum);

        if ($role === 'none') {
            $args = array(
                'number'  => $users_per_page,
                'offset'  => ($paged - 1) * $users_per_page,
                'include' => wp_get_users_with_no_role(),
                'search'  => $usersearch,
                'fields'  => 'all_with_meta'
            );
        } else {
            $args = array(
                'number' => $users_per_page,
                'offset' => ($paged - 1) * $users_per_page,
                'role'   => $role,
                'search' => $usersearch,
                'fields' => 'all_with_meta'
            );
        }

        if ($args['search'] !== '') {
            $args['search'] = '*' . $args['search'] . '*';
        }

        // Query the user IDs for this page
        $wp_user_search = get_users($args);

        $users_list = '';
        $pages_list = '';

        if (count($wp_user_search)) {
            foreach ($wp_user_search as $userid => $user_object) {
                $users_list .= '<tr>';
                $users_list .= '<td class="select-box">';
                $users_list .= '<input type="checkbox" name="advgb-users[]" value="' . $userid . '" />';
                $users_list .= '</td>';
                $users_list .= '<td class="name column-name">';
                $users_list .= '<span style="color: #0073aa">' . $user_object->display_name . '</span>';
                $users_list .= '</td>';
                $users_list .= '<td class="username column-username">';
                $users_list .= '<strong>' . $user_object->user_login . '</strong>';
                $users_list .= '</td>';
                $users_list .= '<td class="email column-email">' . $user_object->user_email . '</td>';

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

                $users_list .= '<td class="role column-role">' . $roles_list . '</td>';
                $users_list .= '</tr>';
            }
        } else {
            $users_list .= '<tr><td colspan="5"> ';
            $users_list .= __('No users found.', 'advanced-gutenberg');
            $users_list .= '</td></tr>';
        }

        $doneLeft = $doneRight = $skipLeft = $skipRight = false;
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
                        $pages_list .= '<i class="dashicons dashicons-controls-skipback" id="first-page"></i>';
                    } else {
                        $pages_list .= '<a class="dashicons dashicons-controls-skipback" id="first-page" ';
                        $pages_list .= 'title="' . __('First page', 'advanced-gutenberg') . '"></a>';
                    }
                }
                if (! $skipLeft && ! $skipRight) {
                    if ($i == $pagenum) {
                        $pages_list .= '<strong>' . $i . '</strong>';
                    } else {
                        $pages_list .= '<a class="switch-page">' . $i . '</a>';
                    }
                } elseif ($skipLeft) {
                    if (! $doneLeft) {
                        $pages_list .= '<span>...</span>';
                        $doneLeft   = true;
                    }
                } elseif ($skipRight) {
                    if (! $doneRight) {
                        $pages_list .= '<span>...</span>';
                        $doneRight  = true;
                    }
                }

                if ($i == $total_pages) {
                    if ($pagenum == $total_pages) {
                        $pages_list .= '<i class="dashicons dashicons-controls-skipforward" id="last-page"></i>';
                    } else {
                        $pages_list .= '<a class="dashicons dashicons-controls-skipforward" id="last-page" ';
                        $pages_list .= 'title="' . __('Last page', 'advanced-gutenberg') . '"></a>';
                    }
                }
            }
        }
        $response = array('users_list' => $users_list, 'pages_list' => $pages_list);
        wp_send_json($response);
    }

    /**
     * Get the blocks list
     */
    public function initBlocksList()
    {
        if (get_option('advgb_blocks_list') === false) {
            do_action('enqueue_block_editor_assets');
            wp_enqueue_script(
                'update_list',
                plugins_url('assets/js/update-block-list.js', dirname(__FILE__)),
                array('wp-blocks', 'wp-element')
            );
        }
    }

    /**
     * Register back-end styles and script for later use
     */
    public function registerStylesScripts()
    {
        // Register CSS
        wp_register_style(
            'profile_style',
            plugins_url('assets/css/style.css', dirname(__FILE__))
        );

        wp_register_style(
            'settings_style',
            plugins_url('assets/css/settings.css', dirname(__FILE__))
        );
        wp_register_style(
            'tabs_style',
            plugins_url('assets/css/tabs.css', dirname(__FILE__))
        );
        wp_register_style(
            'button_switch_style',
            plugins_url('assets/css/switch-button.css', dirname(__FILE__))
        );
        wp_register_style(
            'qtip_style',
            plugins_url('assets/css/jquery.qtip.css', dirname(__FILE__))
        );

        // Register JS
        wp_register_script(
            'update_list',
            plugins_url('assets/js/update-block-list.js', dirname(__FILE__)),
            array('wp-blocks', 'wp-element')
        );
        wp_register_script(
            'profile_js',
            plugins_url('assets/js/profile.js', dirname(__FILE__))
        );
        wp_register_script(
            'settings_js',
            plugins_url('assets/js/settings.js', dirname(__FILE__))
        );
        wp_register_script(
            'velocity_js',
            plugins_url('assets/js/velocity.min.js', dirname(__FILE__))
        );
        wp_register_script(
            'waves_js',
            plugins_url('assets/js/waves.js', dirname(__FILE__))
        );
        wp_register_script(
            'tabs_js',
            plugins_url('assets/js/tabs.js', dirname(__FILE__))
        );
        wp_register_script(
            'qtip_js',
            plugins_url('assets/js/jquery.qtip.min.js', dirname(__FILE__))
        );
    }

    /**
     * Register profiles menu
     */
    public function registerAdvgbMenu()
    {
        $labels = array(
            'name'               => __('Advanced Gutenberg Profiles', 'advanced-gutenberg'),  // Profile title
            'singular_name'      => __('Advanced Gutenberg Profiles', 'advanced-gutenberg'),
            'add_new'            => __('New Profile', 'advanced-gutenberg'),                  // New profile menu title
            'add_new_item'       => __('Add New Profile', 'advanced-gutenberg'),              // New profile title
            'edit_item'          => __('Edit Profile', 'advanced-gutenberg'),                 // Edit profile title
            'all_items'          => __('Profiles', 'advanced-gutenberg'),                     // All profiles menu title
            'view_item'          => __('View Profile', 'advanced-gutenberg'),
            'search_items'       => __('Search Profiles', 'advanced-gutenberg'),              // Search button title
            'not_found'          => __('No profiles found', 'advanced-gutenberg'),
            'not_found_in_trash' => __('No profiles found in trash', 'advanced-gutenberg'),
            'parent_item_colon'  => '',
            'menu_name'          => __('Profiles', 'advanced-gutenberg')
        );
        register_post_type('advgb_profiles', array(
            'labels'       => $labels,
            'public'       => false,
            'show_ui'      => true,
            'show_in_menu' => 'gutenberg',
            'supports'     => array('title', 'author'),
            'capabilities' => array(
                'edit_posts'          => 'edit_advgb_profiles',
                'edit_others_posts'   => 'edit_others_advgb_profiles',
                'publish_posts'       => 'publish_advgb_profiles',
                'read'                => 'read_advgb_profile',
                'read_private_posts'  => 'read_private_advgb_profiles',
                'delete_posts'        => 'delete_advgb_profiles',
                'delete_others_posts' => 'delete_others_advgb_profiles',
                'create_posts'        => 'create_advgb_profiles',
            ),
            'map_meta_cap' => true
        ));
    }

    /**
     * Remove and add metabox for create profile screen
     */
    public function registerMetaBox()
    {
        remove_meta_box('authordiv', 'advgb_profiles', 'core');
        remove_meta_box('slugdiv', 'advgb_profiles', 'core');

        /**
         * Make profile only have one column layout
         * @param $columns  Number of columns to set
         *
         * @return mixed    Columns
         */
        function advgbSetScreenLayoutColumns($columns)
        {
            $columns['advgb_profiles'] = 1;

            return $columns;
        }
        add_filter('screen_layout_columns', 'advgbSetScreenLayoutColumns');

        /**
         * Make profile only have one column layout
         *
         * @return int
         */
        function advgbSetScreenLayout()
        {
            return 1;
        }
        add_filter('get_user_option_screen_layout_advgb_profiles', 'advgbSetScreenLayout');

        add_meta_box(
            'advgb_meta_box',
            __('Advanced Gutenberg Profile', 'advanced-gutenberg'),
            array($this, 'advgbProfilesView'),
            'advgb_profiles',
            'normal',
            'core'
        );
    }

    /**
     * Load profile view
     */
    public function advgbProfilesView()
    {
        wp_enqueue_style('tabs_style');
        wp_enqueue_style('button_switch_style');
        wp_enqueue_style('profile_style');

        wp_enqueue_script('waves_js');
        wp_enqueue_script('velocity_js');
        wp_enqueue_script('tabs_js');
        wp_enqueue_script('profile_js');

        $this->loadView('profile');
    }

    /**
     * Register settings menu
     */
    public function registerSettingsMenu()
    {
        add_submenu_page(
            'options-general.php',
            __('Advanced Gutenberg Settings', 'advanced-gutenberg'),
            __('Advanced Gutenberg', 'advanced-gutenberg'),
            'manage_options',
            'advgb_settings',
            array($this, 'advgbSettingsView')
        );
    }

    /**
     * Load settings view
     */
    public function advgbSettingsView()
    {
        wp_enqueue_style('tabs_style');
        wp_enqueue_style('button_switch_style');
        wp_enqueue_style('qtip_style');
        wp_enqueue_style('settings_style');

        wp_enqueue_script('waves_js');
        wp_enqueue_script('velocity_js');
        wp_enqueue_script('tabs_js');
        wp_enqueue_script('qtip_js');
        wp_enqueue_script('settings_js');

        $this->loadView('settings');
    }

    /**
     * Save config settings
     *
     * @return bool True on success, False on failure
     */
    public function saveSettings()
    {
        if (isset($_POST['save_settings'])) {
            if (!wp_verify_nonce($_POST['advgb_settings_nonce_field'], 'advgb_settings_nonce')) {
                return false;
            }

            if (isset($_POST['gallery_lightbox'])) {
                $save_config['gallery_lightbox'] = 1;
            } else {
                $save_config['gallery_lightbox'] = 0;
            }

            if (isset($_POST['gallery_lightbox_caption'])) {
                $save_config['gallery_lightbox_caption'] = 1;
            } else {
                $save_config['gallery_lightbox_caption'] = 0;
            }

            update_option('advgb_settings', $save_config);

            if (isset($_REQUEST['_wp_http_referer'])) {
                wp_redirect($_REQUEST['_wp_http_referer'] . '&save=success');
                exit;
            }
        }

        return true;
    }

    /**
     * Change post's update messages
     * @param $msg
     *
     * @return mixed
     */
    public function updatePostMsg($msg)
    {
        $msg['advgb_profiles'] = array(
            1 => __('Advanced Gutenberg profile updated.', 'advanced-gutenberg'),
            6 => __('Advanced Gutenberg profile created.', 'advanced-gutenberg')
        );

        return $msg;
    }

    /**
     * Save profiles settings
     * @param $postID
     *
     * @return mixed
     */
    public function saveAdvgbProfile($postID)
    {
        // Check nonce field
        if (!isset($_POST['advgb_nonce_field'])) {
            return $postID;
        }
        // Verify nonce
        if (!wp_verify_nonce($_POST['advgb_nonce_field'], 'advgb_nonce')) {
            return $postID;
        }

        // Save settings
        if ($_POST['post_type'] == 'advgb_profiles'
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
            if (isset($_POST['advgb-users-access-list'])) {
                $users_access = trim($_POST['advgb-users-access-list']);
                $users_access = explode(' ', $users_access);
            }
            if (isset($_POST['advgb-roles'])) {
                $roles_access = $_POST['advgb-roles'];
            }
            update_post_meta($postID, 'users_access', $users_access);
            update_post_meta($postID, 'roles_access', $roles_access);
        }

        return $postID;
    }

    /**
     * Set the active blocks for users regard to Advanced Gutenberg profiles
     *
     * @return bool|mixed
     */
    public function initActiveBlocksForGutenberg()
    {
        // Get user info
        $current_user      = wp_get_current_user();
        $current_user_id   = $current_user->ID;
        $current_user_role = $current_user->roles[0];

        // Get all GB-ADV active profiles
        $args     = array(
            'post_type' => 'advgb_profiles',
            'publish'   => true
        );
        $profiles = new WP_Query($args);

        while ($profiles->have_posts()) :
            $profiles->the_post();
            $postID           = get_the_ID();
            $user_id_access   = get_post_meta($postID, 'users_access', true);
            $user_role_access = get_post_meta($postID, 'roles_access', true);

            // Check which profiles that current user has permission to use and take that ID
            // the ID of the profiles published most recently will be taken
            if (is_array($user_role_access) && is_array($user_id_access)) {
                if (in_array($current_user_id, $user_id_access) || in_array($current_user_role, $user_role_access)) {
                    // Populate the ID
                    $this->active_profile = $postID;
                    $active_blocks_saved  = get_post_meta($this->active_profile, 'active_blocks', true);

                    // Return allowed blocks
                    return $active_blocks_saved;
                }
            }
        endwhile;

        // If users have no permission, remove all blocks
        return false;
    }

    /**
     * Function to get and load the view
     *
     * @param $view  string    View to load
     */
    public function loadView($view)
    {
        include_once(plugin_dir_path(__FILE__) . 'view/advanced-gutenberg-' . $view . '.php');
    }

    /**
     * Function to load the lightbox for galleries in front-end
     * @param $content
     *
     * @return mixed
     */
    public function addGalleryLightbox($content)
    {
        if (strpos($content, 'wp-block-gallery') !== false) {
            $saved_settings = get_option('advgb_settings');

            if ($saved_settings['gallery_lightbox']) {
                wp_enqueue_style(
                    'colorbox_style',
                    plugins_url('assets/css/colorbox.css', dirname(__FILE__))
                );

                wp_enqueue_script(
                    'colorbox_js',
                    plugins_url('assets/js/jquery.colorbox.min.js', dirname(__FILE__))
                );
                wp_enqueue_script(
                    'gallery_lightbox_js',
                    plugins_url('assets/js/gallery.colorbox.init.js', dirname(__FILE__))
                );

                wp_localize_script('gallery_lightbox_js', 'advgb', array(
                    'imageCaption' => $saved_settings['gallery_lightbox_caption']
                ));
            }
        }

        return $content;
    }
}
