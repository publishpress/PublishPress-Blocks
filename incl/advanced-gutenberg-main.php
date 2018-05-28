<?php
defined('ABSPATH') || die;

/**
 * Main class of Gutenberg Advanced
 */
class AdvancedGutenbergMain
{
    /**
     * Default role access
     *
     * @var array   Array of default role access
     */
    public static $default_roles_access = array('administrator', 'editor', 'author');

    /**
     * Default active all blocks for new profile
     *
     * @var string  All blocks
     */
    public static $default_active_blocks = 'all';

    /**
     * Default custom styles
     *
     * @var array   Default custom styles for first install
     */
    public static $default_custom_styles = array(
        0 => array(
            'id' => 1,
            'title' => 'Blue message',
            'name' => 'blue-message',
            'identifyColor' => '#3399ff',
            'css' => 'background: none repeat scroll 0 0 #3399ff;
color: #ffffff;
text-shadow: none;
font-size: 14px;
line-height: 24px;
padding: 10px;'
        ),
        1 => array(
            'id' => 2,
            'title' => 'Green message',
            'name' => 'green-message',
            'identifyColor' => '#8cc14c',
            'css' => 'background: none repeat scroll 0 0 #8cc14c;
color: #ffffff;
text-shadow: none;
font-size: 14px;
line-height: 24px;
padding: 10px;'
        ),
        2 => array(
            'id' => 3,
            'title' => 'Orange message',
            'name' => 'orange-message',
            'identifyColor' => '#faa732',
            'css' => 'background: none repeat scroll 0 0 #faa732;
color: #ffffff;
text-shadow: none;
font-size: 14px;
line-height: 24px;
padding: 10px;'
        ),
        3 => array(
            'id' => 4,
            'title' => 'Red message',
            'name' => 'red-message',
            'identifyColor' => '#da4d31',
            'css' => 'background: none repeat scroll 0 0 #da4d31;
color: #ffffff;
text-shadow: none;
font-size: 14px;
line-height: 24px;
padding: 10px;'
        ),
        4 => array(
            'id' => 5,
            'title' => 'Grey message',
            'name' => 'grey-message',
            'identifyColor' => '#53555c',
            'css' => 'background: none repeat scroll 0 0 #53555c;
color: #ffffff;
text-shadow: none;
font-size: 14px;
line-height: 24px;
padding: 10px;'
        ),
        5 => array(
            'id' => 6,
            'title' => 'Left block',
            'name' => 'left-block',
            'identifyColor' => '#ff00ff',
            'css' => 'background: none repeat scroll 0 0px, radial-gradient(ellipse at center center, #ffffff 0%, #f2f2f2 100%) repeat scroll 0 0 rgba(0, 0, 0, 0);
color: #8b8e97;
padding: 10px;
margin: 10px;
float: left;'
        ),
        6 => array(
            'id' => 7,
            'title' => 'Right block',
            'name' => 'right-block',
            'identifyColor' => '#00ddff',
            'css' => 'background: none repeat scroll 0 0px, radial-gradient(ellipse at center center, #ffffff 0%, #f2f2f2 100%) repeat scroll 0 0 rgba(0, 0, 0, 0);
color: #8b8e97;
padding: 10px;
margin: 10px;
float: right;'
        ),
        7 => array(
            'id' => 8,
            'title' => 'Blockquotes',
            'name' => 'blockquotes',
            'identifyColor' => '#cccccc',
            'css' => 'background: none;
border-left: 5px solid #f1f1f1;
color: #8B8E97;
font-size: 14px;
font-style: italic;
line-height: 22px;
padding-left: 15px;
padding: 10px;
width: 60%;
float: left;'
        )
    );

    /**
     * Activated profile to get activated blocks array
     *
     * @var null    ID profiles
     */
    protected $active_profile = null;

    /**
     * AdvancedGutenbergMain constructor.
     */
    public function __construct()
    {
        add_action('admin_enqueue_scripts', array($this, 'registerStylesScripts'));
        add_action('wp_enqueue_scripts', array($this, 'registerStylesScriptsFrontend'));
        add_action('enqueue_block_assets', array($this, 'addEditorAndFrontendStyles'), 9999);

        if (is_admin()) {
            add_action('init', array($this, 'registerAdvgbMenu'));
            add_action('save_post_advgb_profiles', array($this, 'saveAdvgbProfile'));
            add_filter('post_updated_messages', array($this, 'updatePostMsg'));
            add_action('admin_init', array($this, 'initBlocksList'));
            add_action('admin_menu', array($this, 'registerMetaBox'));
            add_action('admin_menu', array($this, 'registerSettingsMenu'), 5);
            add_action('load-settings_page_advgb_settings', array($this, 'saveSettings'));
            add_filter('allowed_block_types', array($this, 'initActiveBlocksForGutenberg'));
            add_action('enqueue_block_editor_assets', array($this, 'addEditorAssets'), 9999);
            add_filter('mce_external_plugins', array($this, 'addTinyMceExternal'));
            add_filter('mce_buttons_2', array($this, 'addTinyMceButtons'));
            add_filter('active_new_blocks_by_default', array($this, 'activeNewInstalledBlocks'));

            // Ajax
            add_action('wp_ajax_advgb_update_blocks_list', array($this, 'updateBlocksList'));
            add_action('wp_ajax_advgb_get_users', array($this, 'getUsers'));
            add_action('wp_ajax_advgb_custom_styles_ajax', array($this, 'customStylesAjax'));
        } else {
            // Front-end
            add_filter('the_content', array($this, 'addGalleryLightbox'));
        }
    }

    /**
     * Enqueue styles and scripts for gutenberg
     *
     * @return void
     */
    public function addEditorAssets()
    {
        wp_enqueue_script(
            'summary_blocks',
            plugins_url('assets/blocks/summary/block.js', dirname(__FILE__)),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-data' )
        );
        wp_enqueue_script(
            'advList_blocks',
            plugins_url('assets/blocks/advlist/block.js', dirname(__FILE__)),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-data' )
        );
        wp_enqueue_script(
            'advButton_blocks',
            plugins_url('assets/blocks/advbutton/block.js', dirname(__FILE__)),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-data' )
        );
        wp_enqueue_script(
            'countUp_blocks',
            plugins_url('assets/blocks/count-up/block.js', dirname(__FILE__)),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-data' )
        );
        wp_enqueue_script(
            'advImage_blocks',
            plugins_url('assets/blocks/advimage/block.js', dirname(__FILE__)),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-data' )
        );
        wp_enqueue_script(
            'advVideo_blocks',
            plugins_url('assets/blocks/advvideo/block.js', dirname(__FILE__)),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-data' )
        );
        wp_enqueue_script(
            'map_blocks',
            plugins_url('assets/blocks/map/block.js', dirname(__FILE__)),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-data' )
        );
        wp_enqueue_script(
            'advTable_blocks',
            plugins_url('assets/blocks/advtable/block.js', dirname(__FILE__)),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-data' )
        );
        wp_enqueue_style(
            'advTable_blocks',
            plugins_url('assets/blocks/advtable/style.css', dirname(__FILE__))
        );

        wp_enqueue_script(
            'testimonial_blocks',
            plugins_url('assets/blocks/testimonial/block.js', dirname(__FILE__)),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-data' )
        );
        $avatarHolder = plugins_url('assets/blocks/testimonial/avatar-placeholder.png', dirname(__FILE__));
        wp_localize_script('testimonial_blocks', 'advgbAvatar', array('holder' => $avatarHolder));

        wp_enqueue_script(
            'custom_styles',
            plugins_url('assets/blocks/customstyles/custom-styles.js', dirname(__FILE__)),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-date' )
        );
        $custom_styles_data = get_option('advgb_custom_styles');
        wp_localize_script('custom_styles', 'advGb_CS', $custom_styles_data);

        wp_enqueue_script(
            'custom_separator',
            plugins_url('assets/blocks/custom-separator/separator.js', dirname(__FILE__)),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-date' )
        );
        wp_enqueue_script(
            'custom_columns',
            plugins_url('assets/blocks/custom-columns/columns.js', dirname(__FILE__)),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-date' )
        );
    }

    /**
     * Enqueue styles for gutenberg editor and front-end
     *
     * @return mixed
     */
    public function addEditorAndFrontendStyles()
    {
        $custom_styles_url = wp_upload_dir();
        $custom_styles_url = $custom_styles_url['baseurl'] . '/advgb/';
        wp_enqueue_style(
            'custom_styles',
            $custom_styles_url . 'custom_styles.css'
        );

        wp_enqueue_style(
            'summary_blocks',
            plugins_url('assets/blocks/summary/style.css', dirname(__FILE__))
        );
        wp_enqueue_style(
            'advanced_list',
            plugins_url('assets/blocks/advlist/style.css', dirname(__FILE__))
        );
        wp_enqueue_style(
            'advbutton_blocks',
            plugins_url('assets/blocks/advbutton/style.css', dirname(__FILE__))
        );
        wp_enqueue_style(
            'advCountUp_blocks',
            plugins_url('assets/blocks/count-up/style.css', dirname(__FILE__))
        );
        wp_enqueue_style(
            'advTestimonial_blocks',
            plugins_url('assets/blocks/testimonial/style.css', dirname(__FILE__))
        );
        wp_enqueue_style(
            'advImage_blocks',
            plugins_url('assets/blocks/advimage/style.css', dirname(__FILE__))
        );
        wp_enqueue_style(
            'custom_separator',
            plugins_url('assets/blocks/custom-separator/frontend.css', dirname(__FILE__))
        );
        wp_enqueue_style(
            'advVideo_blocks',
            plugins_url('assets/blocks/advvideo/style.css', dirname(__FILE__))
        );
        wp_enqueue_style(
            'advTable_frontend',
            plugins_url('assets/blocks/advtable/frontend.css', dirname(__FILE__))
        );

        $saved_settings = get_option('advgb_settings');
        if (isset($saved_settings['google_api_key']) && !empty($saved_settings['google_api_key'])) {
            wp_enqueue_script(
                'map_api',
                'https://maps.googleapis.com/maps/api/js?key='. $saved_settings['google_api_key']
            );
            add_filter('script_loader_tag', 'addScriptAttributes', 10, 2);

            /**
             * Add attributes to script tag
             *
             * @param string $tag    Script tag
             * @param string $handle Handle name
             *
             * @return mixed
             */
            function addScriptAttributes($tag, $handle)
            {
                if ('map_api' !== $handle) {
                    return $tag;
                }
                return str_replace(' src', ' defer src', $tag);
            }
        }
    }

    /**
     * Ajax to update blocks list
     *
     * @return mixed
     */
    public function updateBlocksList()
    {
        if (!current_user_can('activate_plugins')) {
            wp_send_json('', 400);
        }

        if (!wp_verify_nonce($_POST['nonce'], 'advgb_update_blocks_list')
            && !wp_verify_nonce($_POST['nonce'], 'advgb_nonce')
        ) {
            wp_send_json('', 400);
        }

        /**
         * Remove slashes on svg icon
         *
         * @param array $block Block to remove slashes
         *
         * @return mixed
         */
        function removeSlashes(array $block)
        {
            $block['icon'] = stripslashes($block['icon']);
            return $block;
        }

        $blocksList     = array_map('removeSlashes', $_POST['blocksList']);
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
     * @return boolean,void     Return false if failure, echo json on success
     */
    public function getUsers()
    {
        // Check users permissions
        if (! current_user_can('create_advgb_profiles')) {
            wp_send_json('No permission!', 403);
            return false;
        }

        // phpcs:disable WordPress.CSRF.NonceVerification.NoNonceVerification -- View request, no action
        $usersearch     = isset($_REQUEST['search']) ? wp_unslash(trim($_REQUEST['search'])) : '';
        $role           = isset($_REQUEST['role']) ? $_REQUEST['role'] : '';
        $users_per_page = 20;
        $pagenum        = 1;
        if ($role === 'none') {
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
            if ($_REQUEST['paged'] === 'first') {
                $pagenum = 1;
            } elseif ($_REQUEST['paged'] === 'last') {
                $pagenum = $total_pages;
            } else {
                $pagenum = $_REQUEST['paged'];
            }
        }
        // phpcs:enable
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
                    $role_list['none'] = _x('None', 'no user roles', 'advanced-gutenberg');
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

        $doneLeft = false;
        $doneRight = false;
        $skipLeft = false;
        $skipRight = false;
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
                        $pages_list .= '<i class="dashicons dashicons-controls-skipback" id="first-page"></i>';
                    } else {
                        $pages_list .= '<a class="dashicons dashicons-controls-skipback" id="first-page" ';
                        $pages_list .= 'title="' . __('First page', 'advanced-gutenberg') . '"></a>';
                    }
                }
                if (! $skipLeft && ! $skipRight) {
                    if ($i === $pagenum) {
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

                if ($i === $total_pages) {
                    if ($pagenum === $total_pages) {
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
     * Ajax for custom styles
     *
     * @return boolean,void     Return false if failure, echo json on success
     */
    public function customStylesAjax()
    {
        // Check users permissions
        if (!current_user_can('activate_plugins')) {
            wp_send_json('No permission!', 403);
            return false;
        }
        $regex = '/^[a-zA-Z0-9_\-]+$/';
        $regexWithSpaces = '/^[\p{L}\p{N}_\- ]+$/u';

        if (!wp_verify_nonce($_POST['nonce'], 'advgb_settings_nonce')) {
            wp_send_json('Invalid nonce token!', 400);
        }

        $check_exist = get_option('advgb_custom_styles');
        if ($check_exist === false) {
            update_option('advgb_custom_styles', $this::$default_custom_styles);
        }

        $custom_style_data = get_option('advgb_custom_styles');
        $task = isset($_POST['task']) ? $_POST['task'] : '';
        if ($task === '') {
            return false;
        } elseif ($task === 'new') {
            $new_style_id = end($custom_style_data);
            $new_style_id = $new_style_id['id'] + 1;
            $new_style_array = array(
                'id' => $new_style_id,
                'title' => __('New class', 'advanced-gutenberg'),
                'name' => __('new-class', 'advanced-gutenberg'),
                'css' => '',
                'identifyColor' => '#000000'
            );
            array_push($custom_style_data, $new_style_array);
            update_option('advgb_custom_styles', $custom_style_data);
            wp_send_json($new_style_array);
        } elseif ($task === 'delete') {
            $custom_style_data_delete = get_option('advgb_custom_styles');
            $style_id = (int)$_POST['id'];
            $new_style_deleted_array = array();
            $done = false;
            foreach ($custom_style_data_delete as $data) {
                if ($data['id'] === $style_id) {
                    $done = true;
                    continue;
                }
                array_push($new_style_deleted_array, $data);
            }
            update_option('advgb_custom_styles', $new_style_deleted_array);
            if ($done) {
                wp_send_json(array('id' => $style_id), 200);
            }
        } elseif ($task === 'copy') {
            $data_saved = get_option('advgb_custom_styles');
            $style_id = (int)$_POST['id'];
            $new_style_copied_array = get_option('advgb_custom_styles');
            $copied_styles = array();
            $new_id = end($new_style_copied_array);
            foreach ($data_saved as $data) {
                if ($data['id'] === $style_id) {
                    $copied_styles = array(
                        'id' => $new_id['id'] + 1,
                        'title' => sanitize_text_field($data['title']),
                        'name' => sanitize_text_field($data['name']),
                        'css' => $data['css'],
                        'identifyColor' => $data['identifyColor'],
                    );

                    array_push($new_style_copied_array, $copied_styles);
                }
            }
            update_option('advgb_custom_styles', $new_style_copied_array);
            wp_send_json($copied_styles);
        } elseif ($task === 'preview') {
            $style_id = (int)$_POST['id'];
            $data_saved = get_option('advgb_custom_styles');
            $get_style_array = array();
            foreach ($data_saved as $data) {
                if ($data['id'] === $style_id) {
                    foreach ($data as $key => $value) {
                        $data[$key] = esc_html($value);
                    }
                    $get_style_array = $data;
                }
            }
            if (!empty($get_style_array)) {
                wp_send_json($get_style_array);
            } else {
                wp_send_json(false, 404);
            }
        } elseif ($task === 'style_save') {
            $style_id = (int)$_POST['id'];
            $new_title = sanitize_text_field($_POST['title']);
            $new_classname = sanitize_text_field($_POST['name']);
            $new_identify_color = sanitize_text_field($_POST['mycolor']);
            $new_css = $_POST['mycss'];
            // Validate new name
            if (!preg_match($regexWithSpaces, $new_title) || !preg_match($regex, $new_classname)) {
                wp_send_json('Invalid characters, please enter another!', 403);
                return false;
            }
            $data_saved = get_option('advgb_custom_styles');
            $new_data_array = array();
            foreach ($data_saved as $data) {
                if ($data['id'] === $style_id) {
                    $data['title'] = $new_title;
                    $data['name'] = $new_classname;
                    $data['css'] = $new_css;
                    $data['identifyColor'] = $new_identify_color;
                }
                array_push($new_data_array, $data);
            }
            update_option('advgb_custom_styles', $new_data_array);
        } else {
            wp_send_json(null, 404);
        }
    }

    /**
     * Update the blocks list for first time install
     *
     * @return void
     */
    public function initBlocksList()
    {
        if (get_option('advgb_blocks_list') === false) {
            $advgb_nonce = wp_create_nonce('advgb_update_blocks_list');
            do_action('enqueue_block_editor_assets');
            wp_enqueue_script(
                'update_list',
                plugins_url('assets/js/update-block-list.js', dirname(__FILE__)),
                array('wp-blocks', 'wp-element', 'wp-data', 'wp-core-blocks')
            );
            wp_localize_script('update_list', 'updateListNonce', array('nonce' => $advgb_nonce));
        }
    }

    /**
     * Register back-end styles and script for later use
     *
     * @return void
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
        wp_register_style(
            'font_icons',
            plugins_url('assets/css/fonts.css', dirname(__FILE__))
        );
        wp_register_style(
            'advgb_quirk',
            plugins_url('assets/css/quirk.css', dirname(__FILE__))
        );
        wp_register_style(
            'codemirror_css',
            plugins_url('assets/js/codemirror/lib/codemirror.css', dirname(__FILE__))
        );
        wp_register_style(
            'codemirror_hint_style',
            plugins_url('assets/js/codemirror/addon/hint/show-hint.css', dirname(__FILE__))
        );
        wp_register_style(
            'minicolors_css',
            plugins_url('assets/css/jquery.minicolors.css', dirname(__FILE__))
        );

        // Register JS
        wp_register_script(
            'update_list',
            plugins_url('assets/js/update-block-list.js', dirname(__FILE__)),
            array('wp-blocks', 'wp-element', 'wp-data', 'wp-core-blocks')
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
        wp_register_script(
            'codemirror_js',
            plugins_url('assets/js/codemirror/lib/codemirror.js', dirname(__FILE__))
        );
        wp_register_script(
            'codemirror_hint',
            plugins_url('assets/js/codemirror/addon/hint/show-hint.js', dirname(__FILE__))
        );
        wp_register_script(
            'codemirror_mode_css',
            plugins_url('assets/js/codemirror/mode/css/css.js', dirname(__FILE__))
        );
        wp_register_script(
            'codemirror_hint_css',
            plugins_url('assets/js/codemirror/addon/hint/css-hint.js', dirname(__FILE__))
        );
        wp_register_script(
            'less_js',
            plugins_url('assets/js/less.js', dirname(__FILE__))
        );
        wp_register_script(
            'minicolors_js',
            plugins_url('assets/js/jquery.minicolors.min.js', dirname(__FILE__))
        );
    }

    /**
     * Register front-end styles and script for later use
     *
     * @return void
     */
    public function registerStylesScriptsFrontend()
    {
        wp_register_style(
            'colorbox_style',
            plugins_url('assets/css/colorbox.css', dirname(__FILE__))
        );

        wp_register_script(
            'colorbox_js',
            plugins_url('assets/js/jquery.colorbox.min.js', dirname(__FILE__))
        );
    }

    /**
     * Register profiles menu
     *
     * @return void
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
     *
     * @return mixed      Mixed value
     */
    public function registerMetaBox()
    {
        remove_meta_box('authordiv', 'advgb_profiles', 'core');
        remove_meta_box('slugdiv', 'advgb_profiles', 'core');

        /**
         * Make profile only have one column layout
         *
         * @param integer $columns Number of columns to set
         *
         * @return integer   Number of columns
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
         * @return integer
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
     *
     * @return void
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
     *
     * @return void
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
     *
     * @return void
     */
    public function advgbSettingsView()
    {
        wp_enqueue_style('font_icons');
        wp_enqueue_style('advgb_quirk');
        wp_enqueue_style('tabs_style');
        wp_enqueue_style('button_switch_style');
        wp_enqueue_style('minicolors_css');
        wp_enqueue_style('qtip_style');
        wp_enqueue_style('codemirror_css');
        wp_enqueue_style('codemirror_hint_style');
        wp_enqueue_style('settings_style');

        wp_enqueue_script('waves_js');
        wp_enqueue_script('velocity_js');
        wp_enqueue_script('tabs_js');
        wp_enqueue_script('qtip_js');
        wp_enqueue_script('less_js');
        wp_enqueue_script('minicolors_js');
        wp_enqueue_script('codemirror_js');
        wp_enqueue_script('codemirror_hint');
        wp_enqueue_script('codemirror_mode_css');
        wp_enqueue_script('codemirror_hint_css');
        wp_enqueue_script('settings_js');

        $this->loadView('settings');
    }

    /**
     * Save config settings
     *
     * @return boolean True on success, False on failure
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

            $save_config['google_api_key'] = $_POST['google_api_key'];

            update_option('advgb_settings', $save_config);

            if (isset($_REQUEST['_wp_http_referer'])) {
                wp_redirect($_REQUEST['_wp_http_referer'] . '&save=success#config-tab');
                exit;
            }
        }

        if (isset($_POST['save_custom_styles'])) {
            if (!wp_verify_nonce($_POST['advgb_cstyles_nonce_field'], 'advgb_cstyles_nonce')) {
                return false;
            }
            // Save Custom Styles to a css file
            $get_custom_styles = get_option('advgb_custom_styles');
            if ($get_custom_styles !== false) {
                $this->writeCustomStyles($get_custom_styles);
            }

            if (!empty($_REQUEST['_wp_http_referer'])) {
                wp_redirect($_REQUEST['_wp_http_referer'] . '&save=success#customstyles-tab');
                exit;
            }
        }

        return true;
    }

    /**
     * Write custom styles to a CSS file
     *
     * @param array $styles_array Array of styles
     *
     * @return boolean True on success, False on failure
     */
    public function writeCustomStyles(array $styles_array)
    {
        WP_Filesystem();
        global $wp_filesystem;

        $custom_styles_dir = wp_upload_dir();
        $custom_styles_dir = $custom_styles_dir['basedir'] . '/advgb/';
        $css_file = $custom_styles_dir . 'custom_styles.css';

        if (!$wp_filesystem->exists($custom_styles_dir)) {
            $wp_filesystem->mkdir($custom_styles_dir);
        }

        $content = '';
        foreach ($styles_array as $styles) {
            $content .= '.gutenberg #editor .' .$styles['name'] . ', .' . $styles['name'] . " {\n";
            $content .= $styles['css'] . "\n} \n";
        }

        if (!$wp_filesystem->put_contents($css_file, $content)) {
            return false;
        }
        return true;
    }

    /**
     * Change post's update messages
     *
     * @param string $msg Messages
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
     *
     * @param integer $postID Profiles ID
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
        if ($_POST['post_type'] === 'advgb_profiles'
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
     * @return boolean|mixed
     */
    public function initActiveBlocksForGutenberg()
    {
        // Get user info
        $current_user      = wp_get_current_user();
        $current_user_id   = $current_user->ID;
        $current_user_role = $current_user->roles[0];

        // Get all GB-ADV active profiles
        global $wpdb;
        $profiles = $wpdb->get_results('SELECT * FROM '. $wpdb->prefix. 'posts
         WHERE post_type="advgb_profiles" AND post_status="publish" ORDER BY post_date_gmt DESC');

        if (!empty($profiles)) {
            foreach ($profiles as $profile) {
                $postID           = $profile->ID;
                $user_id_access   = get_post_meta($postID, 'users_access', true);
                $user_role_access = get_post_meta($postID, 'roles_access', true);

                // Check which profiles that current user has permission to use and take that ID
                // the ID of the profiles published most recently will be taken
                if (is_array($user_role_access) && is_array($user_id_access)) {
                    if (in_array($current_user_id, $user_id_access)
                        || in_array($current_user_role, $user_role_access)) {
                        // Populate the ID
                        $this->active_profile = $postID;
                        $active_blocks_saved  = get_post_meta($this->active_profile, 'active_blocks', true);

                        $active_blocks_filtered = apply_filters('active_new_blocks_by_default', $active_blocks_saved);

                        // Return allowed blocks
                        return $active_blocks_filtered;
                    }
                }
            }
        }

        // If users have no permission, remove all blocks
        return false;
    }

    /**
     * Function to get and load the view
     *
     * @param string $view View to load
     *
     * @return void
     */
    public function loadView($view)
    {
        include_once(plugin_dir_path(__FILE__) . 'view/advanced-gutenberg-' . $view . '.php');
    }

    /**
     * Function to load the lightbox for galleries in front-end
     *
     * @param string $content Post content
     *
     * @return string
     */
    public function addGalleryLightbox($content)
    {
        if (strpos($content, 'wp-block-gallery') !== false) {
            $saved_settings = get_option('advgb_settings');

            if ($saved_settings['gallery_lightbox']) {
                wp_enqueue_style('colorbox_style');
                wp_enqueue_script('colorbox_js');

                wp_enqueue_script(
                    'gallery_lightbox_js',
                    plugins_url('assets/js/gallery.colorbox.init.js', dirname(__FILE__))
                );

                wp_localize_script('gallery_lightbox_js', 'advgb', array(
                    'imageCaption' => $saved_settings['gallery_lightbox_caption']
                ));
            }
        }

        if (strpos($content, 'advgb-toc-header') !== false) {
            wp_enqueue_script(
                'summary_minimized',
                plugins_url('assets/blocks/summary/summaryMinimized.js', dirname(__FILE__))
            );
        }

        if (strpos($content, 'wp-block-advgb-count-up') !== false) {
            wp_enqueue_script(
                'waypoint_js',
                'https://cdnjs.cloudflare.com/ajax/libs/waypoints/2.0.5/waypoints.min.js'
            );
            wp_enqueue_script(
                'countup_lib_js',
                plugins_url('assets/blocks/count-up/jquery.counterup.min.js', dirname(__FILE__))
            );
            wp_enqueue_script(
                'countup_js',
                plugins_url('assets/blocks/count-up/countUp.js', dirname(__FILE__))
            );
        }

        if (strpos($content, 'advgb-image-block') !== false) {
            wp_enqueue_style('colorbox_style');
            wp_enqueue_script('colorbox_js');

            wp_enqueue_script(
                'advgbImageLightbox_js',
                plugins_url('assets/blocks/advimage/lightbox.js', dirname(__FILE__))
            );
        }

        if (strpos($content, 'advgb-video-lightbox') !== false) {
            wp_enqueue_style('colorbox_style');
            wp_enqueue_script('colorbox_js');

            wp_enqueue_script(
                'advgbVideoLightbox_js',
                plugins_url('assets/blocks/advvideo/lightbox.js', dirname(__FILE__))
            );
        }

        if (strpos($content, 'advgb-map-block') !== false) {
            $content = preg_replace_callback(
                '@<div[^>]*?advgb\-map\-block.*?(</script)@s',
                array($this, 'decodeHtmlEntity'),
                $content
            );
        }

        return $content;
    }

    /**
     * Convert html entity to real character
     *
     * @param string $match Matched string
     *
     * @return mixed
     */
    public function decodeHtmlEntity($match)
    {
        return str_replace('&lt;', '<', $match[0]);
    }

    /**
     * Function to load external plugins for tinyMCE
     *
     * @param array $plgs External plugins
     *
     * @return array
     */
    public function addTinyMceExternal(array $plgs)
    {
        $plgs['customstyles'] = plugin_dir_url(dirname(__FILE__)) . 'assets/blocks/customstyles/plugin.js';

        return $plgs;
    }

    /**
     * Function to add buttons for tinyMCE toolbars
     *
     * @param array $buttons TinyMCE buttons
     *
     * @return array
     */
    public function addTinyMceButtons(array $buttons)
    {
        array_push($buttons, 'customstyles');

        return $buttons;
    }

    /**
     * Active newly installed blocks by default
     *
     * @param array|string $current_activated_blocks Current activated block list
     *
     * @return mixed    Array of activated blocks
     */
    public function activeNewInstalledBlocks($current_activated_blocks)
    {
        $new_blocks = array(
            'advgb/summary',
            'advgb/button',
            'advgb/list',
            'advgb/count-up',
            'advgb/testimonial',
            'advgb/image',
            'advgb/video',
            'advgb/map',
            'advgb/table',
        );

        // Avoid default value (string 'all')
        if (is_array($current_activated_blocks)) {
            $all_blocks_saved = get_option('advgb_blocks_list');
            foreach ($new_blocks as $block) {
                if (!in_array($block, $all_blocks_saved)) {
                    if (!in_array($block, $current_activated_blocks)) {
                        array_push($current_activated_blocks, $block);
                    }
                }
            }
        }

        return $current_activated_blocks;
    }
}
