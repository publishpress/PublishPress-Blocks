<?php
defined('ABSPATH') or die;

class GutenbergAdvancedMain
{
    public static $default_roles_access = array('administrator', 'editor', 'author');
    public static $default_active_blocks = 'all';
    protected $active_profile = null;

    public function __construct()
    {
        add_action('admin_enqueue_scripts', array($this, 'register_styles_scripts'));

        if (is_admin()) {
            add_action('init', array($this, 'register_gbadv_menu'));
            add_action('save_post_gbadv_profiles', array($this, 'save_gbadv_profile'));
            add_filter('post_updated_messages', array($this, 'update_post_msg'));
            add_action('admin_init', array($this, 'init_blocks_list'));
            add_action('admin_menu', array($this, 'register_meta_box'));
            add_action('admin_menu', array($this, 'register_settings_menu'), 5);
            add_action('load-settings_page_gbadv_settings', array($this, 'save_settings'));
            add_filter('allowed_block_types', array($this, 'init_active_blocks_for_gutenberg'));

            // Ajax
            add_action('wp_ajax_gbadv_update_blocks_list', array($this, 'update_blocks_list'));
            add_action('wp_ajax_gbadv_get_users', array($this, 'get_users'));
        } else {
            // Front-end
            add_filter('the_content', array($this, 'add_gallery_lightbox'));
        }
    }

    // Ajax to update blocks list
    public function update_blocks_list()
    {
        $blocksList     = $_POST['blocksList'];
        $categoriesList = $_POST['categoriesList'];

        update_option('gbadv_blocks_list', $blocksList);
        update_option('gbadv_categories_list', $categoriesList);

        wp_send_json(array(
            'blocks_list' => $blocksList,
            'categories_list' => $categoriesList
        ), 200);
    }

    // Ajax to get users list
    public function get_users()
    {
        // Check users permissions
        if (! current_user_can('create_gbadv_profiles')) {
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
                $users_list .= '<input type="checkbox" name="gbadv-users[]" value="' . $userid . '" />';
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
            $users_list .= __('No users found.', 'gutenberg-advandced');
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
                        $pages_list .= '<a class="dashicons dashicons-controls-skipback" id="first-page" title="' . __('First page', 'gutenberg-advandced') . '"></a>';
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
                        $pages_list .= '<a class="dashicons dashicons-controls-skipforward" id="last-page" title="' . __('Last page', 'gutenberg-advandced') . '"></a>';
                    }
                }
            }
        }
        $response = array('users_list' => $users_list, 'pages_list' => $pages_list);
        wp_send_json($response);
    }

    // Get the blocks list
    public function init_blocks_list()
    {
        if (get_option('gbadv_blocks_list') === false) {
            do_action('enqueue_block_editor_assets');
            wp_enqueue_script(
                'update_list',
                plugins_url('assets/js/update-block-list.js', dirname(__FILE__)),
                array('wp-blocks', 'wp-element')
            );
        }
    }

    // Register back-end styles and script for later use
    public function register_styles_scripts()
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

    // Register profiles menu
    function register_gbadv_menu()
    {
        $labels = array(
            'name'               => __('Gutenberg Advanced Profiles', 'gutenberg-advanced'),  // Profile title
            'singular_name'      => __('Gutenberg Advanced Profiles', 'gutenberg-advanced'),
            'add_new'            => __('New Profile', 'gutenberg-advanced'),                  // New profile menu title
            'add_new_item'       => __('Add New Profile', 'gutenberg-advanced'),              // New profile title
            'edit_item'          => __('Edit Profile', 'gutenberg-advanced'),                 // Edit profile title
            'all_items'          => __('Profiles', 'gutenberg-advanced'),                     // All profiles menu title
            'view_item'          => __('View Profile', 'gutenberg-advanced'),
            'search_items'       => __('Search Profiles', 'gutenberg-advanced'),              // Search button title
            'not_found'          => __('No profiles found', 'gutenberg-advanced'),
            'not_found_in_trash' => __('No profiles found in trash', 'gutenberg-advanced'),
            'parent_item_colon'  => '',
            'menu_name'          => __('Profiles', 'gutenberg-advanced')
        );
        register_post_type('gbadv_profiles', array(
            'labels'       => $labels,
            'public'       => false,
            'show_ui'      => true,
            'show_in_menu' => 'gutenberg',
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

    // Remove and add metabox for create profile screen
    public function register_meta_box()
    {
        remove_meta_box('authordiv', 'gbadv_profiles', 'core');
        remove_meta_box('slugdiv', 'gbadv_profiles', 'core');

        // Make profile only have one column layout
        function gbadv_set_screen_layout_columns($columns)
        {
            $columns['gbadv_profiles'] = 1;

            return $columns;
        }
        add_filter('screen_layout_columns', 'gbadv_set_screen_layout_columns');

        // Make profile only have one column layout
        function gbadv_set_screen_layout()
        {
            return 1;
        }
        add_filter('get_user_option_screen_layout_gbadv_profiles', 'gbadv_set_screen_layout');

        add_meta_box(
            'gbadv_meta_box',
            __('Gutenberg Advanced Profile', 'gutenberg-advanced'),
            array($this, 'gbadv_profiles_view'),
            'gbadv_profiles',
            'normal',
            'core'
        );
    }

    // Load profile view
    public function gbadv_profiles_view()
    {
        wp_enqueue_style('tabs_style');
        wp_enqueue_style('button_switch_style');
        wp_enqueue_style('profile_style');

        wp_enqueue_script('waves_js');
        wp_enqueue_script('velocity_js');
        wp_enqueue_script('tabs_js');
        wp_enqueue_script('profile_js');

        $this->load_view('profile');
    }

    // Register settings menu
    public function register_settings_menu()
    {
        add_submenu_page(
            'options-general.php',
            __('Gutenberg Advanced Settings', 'gutenberg-advanced'),
            __('Gutenberg Advanced', 'gutenberg-advanced'),
            'manage_options',
            'gbadv_settings',
            array($this, 'gbadv_settings_view')
        );
    }

    // Load settings view
    public function gbadv_settings_view()
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

        $this->load_view('settings');
    }

    // Save config settings
    public function save_settings()
    {
        if (isset($_POST['save_settings'])) {
            if (!wp_verify_nonce($_POST['gbadv_settings_nonce_field'], 'gbadv_settings_nonce')) {
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

            update_option('gbadv_settings', $save_config);

            if (isset($_REQUEST['_wp_http_referer'])) {
                wp_redirect($_REQUEST['_wp_http_referer'] . '&save=success');
                exit;
            }
        }

        return true;
    }

    // Change post's update messages
    public function update_post_msg($msg)
    {
        $msg['gbadv_profiles'] = array(
            1 => __('Gutenberg Advanced profile updated.', 'gutenberg-advandced'),
            6 => __('Gutenberg Advanced profile created.', 'gutenberg-advandced')
        );

        return $msg;
    }

    // Save profiles settings
    public function save_gbadv_profile($postID)
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


    // Set the active blocks for users regard to Gutenberg Advanced profiles
    public function init_active_blocks_for_gutenberg()
    {
        // Get user info
        $current_user      = wp_get_current_user();
        $current_user_id   = $current_user->ID;
        $current_user_role = $current_user->roles[0];

        // Get all GB-ADV active profiles
        $args     = array(
            'post_type' => 'gbadv_profiles',
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

    // Function to get and load the view
    public function load_view($view)
    {
        include_once(plugin_dir_path(__FILE__) . 'view/gutenberg-advanced-' . $view . '.php');
    }

    // Function to load the lightbox for galleries in front-end
    public function add_gallery_lightbox($content)
    {
        if (strpos($content, 'wp-block-gallery') !== false) {
            $saved_settings = get_option('gbadv_settings');

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

                wp_localize_script('gallery_lightbox_js', 'gbadv', array(
                    'imageCaption' => $saved_settings['gallery_lightbox_caption']
                ));
            }
        }

        return $content;
    }
}
