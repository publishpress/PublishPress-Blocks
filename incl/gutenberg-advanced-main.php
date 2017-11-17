<?php
defined('ABSPATH') or die;

class GutenbergAdvancedMain
{
    public static $default_roles_access = array('administrator', 'editor', 'author');
    public static $default_active_blocks = 'all';

    public function __construct()
    {
        add_action('admin_init', array($this, 'init_blocks_list'));
        add_action('admin_enqueue_scripts', array($this, 'register_styles_scripts'));

        if (is_admin()) {
            add_action('admin_menu', array($this, 'register_meta_box'));
            // Ajax
            add_action('wp_ajax_gbadv_get_users', array($this, 'gbadv_get_users'));
        }
    }

    // Ajax to get users list
    public function gbadv_get_users()
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

    // Register styles and script for later use
    public function register_styles_scripts()
    {
        // Register CSS
        wp_register_style(
            'profile_style',
            plugins_url('assets/css/style.css', dirname(__FILE__))
        );
        wp_register_style(
            'tabs_style',
            plugins_url('assets/css/tabs.css', dirname(__FILE__))
        );

        // Register JS
        wp_register_script(
            'update_list',
            plugins_url('assets/js/update-block-list.js', dirname(__FILE__)),
            array('wp-blocks', 'wp-element')
        );
        wp_register_script(
            'init_list',
            plugins_url('assets/js/init-blocks-list.js', dirname(__FILE__)),
            array('wp-blocks', 'wp-element')
        );
        wp_register_script(
            'profile_js',
            plugins_url('assets/js/profile.js', dirname(__FILE__))
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

        function gbadv_set_screen_layout()
        {
            return 1;
        }

        add_filter('get_user_option_screen_layout_gbadv_profiles', 'gbadv_set_screen_layout');

        add_meta_box(
            'gbadv_meta_box',
            __('Gutenberg Advanced Profile', 'gutenberg-advanced'),
            array($this, 'gdabv_profiles'),
            'gbadv_profiles',
            'normal',
            'core'
        );
    }

    public function gdabv_profiles()
    {
        wp_enqueue_style('tabs_style');
        wp_enqueue_style('profile_style');

        wp_enqueue_script('waves_js');
        wp_enqueue_script('velocity_js');
        wp_enqueue_script('tabs_js');
        wp_enqueue_script('profile_js');

        $this->load_view('profile');
    }

    public function load_view($view)
    {
        include_once(plugin_dir_path(__FILE__) . 'view/gutenberg-advanced-' . $view . '.php');
    }

    }
}
