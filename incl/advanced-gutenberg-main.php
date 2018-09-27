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
            add_action('init', array($this, 'registerAdvgbProfile'));
            add_action('admin_footer', array($this, 'initBlocksList'));
            add_action('admin_menu', array($this, 'registerMainMenu'));
            add_action('admin_menu', array($this, 'registerBlockConfigPage'));
            add_action('load-toplevel_page_advgb_main', array($this, 'saveAdvgbData'));
            add_filter('allowed_block_types', array($this, 'initActiveBlocksForGutenberg'));
            add_action('enqueue_block_editor_assets', array($this, 'addEditorAssets'), 9999);
            add_filter('mce_external_plugins', array($this, 'addTinyMceExternal'));
            add_filter('mce_buttons_2', array($this, 'addTinyMceButtons'));
            add_filter('active_new_blocks_by_default', array($this, 'activeNewInstalledBlocks'));

            // Ajax
            add_action('wp_ajax_advgb_update_blocks_list', array($this, 'updateBlocksList'));
            add_action('wp_ajax_advgb_get_users', array($this, 'getUsers'));
            add_action('wp_ajax_advgb_custom_styles_ajax', array($this, 'customStylesAjax'));
            add_action('wp_ajax_advgb_delete_profiles', array($this, 'deleteProfiles'));
            add_action('wp_ajax_advgb_block_config_save', array($this, 'saveBlockConfig'));
        } else {
            // Front-end
            add_filter('the_content', array($this, 'addFrontendContentAssets'));
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
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-data', 'wp-editor' )
        );
        wp_enqueue_script(
            'advList_blocks',
            plugins_url('assets/blocks/advlist/block.js', dirname(__FILE__)),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-data', 'wp-editor' )
        );
        wp_enqueue_script(
            'advButton_blocks',
            plugins_url('assets/blocks/advbutton/block.js', dirname(__FILE__)),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-data', 'wp-editor' )
        );
        wp_enqueue_script(
            'countUp_blocks',
            plugins_url('assets/blocks/count-up/block.js', dirname(__FILE__)),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-data', 'wp-editor' )
        );
        wp_enqueue_script(
            'advImage_blocks',
            plugins_url('assets/blocks/advimage/block.js', dirname(__FILE__)),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-data', 'wp-editor' )
        );
        wp_enqueue_script(
            'advVideo_blocks',
            plugins_url('assets/blocks/advvideo/block.js', dirname(__FILE__)),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-data', 'wp-editor' )
        );
        wp_enqueue_script(
            'map_blocks',
            plugins_url('assets/blocks/map/block.js', dirname(__FILE__)),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-data', 'wp-editor' )
        );
        wp_enqueue_script(
            'advTable_blocks',
            plugins_url('assets/blocks/advtable/block.js', dirname(__FILE__)),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-data', 'wp-editor' )
        );
        wp_enqueue_script(
            'advTable_plugin',
            plugins_url('assets/blocks/advtable/table-plugin.min.js', dirname(__FILE__)),
            array( 'wp-blocks' )
        );
        wp_enqueue_script(
            'accordion_blocks',
            plugins_url('assets/blocks/accordion/block.js', dirname(__FILE__)),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-data', 'wp-editor' )
        );
        wp_enqueue_script('jquery-ui-accordion');
        wp_enqueue_script(
            'tabs_blocks',
            plugins_url('assets/blocks/tabs/block.js', dirname(__FILE__)),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-data', 'wp-editor' )
        );
        wp_enqueue_script('jquery-ui-tabs');

        wp_enqueue_script(
            'social_blocks',
            plugins_url('assets/blocks/social-links/block.js', dirname(__FILE__)),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-data', 'wp-editor' )
        );

        wp_enqueue_script(
            'testimonial_blocks',
            plugins_url('assets/blocks/testimonial/block.js', dirname(__FILE__)),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-data', 'wp-editor' )
        );
        $avatarHolder = plugins_url('assets/blocks/testimonial/avatar-placeholder.png', dirname(__FILE__));
        wp_localize_script('testimonial_blocks', 'advgbAvatar', array('holder' => $avatarHolder));

        wp_enqueue_script(
            'custom_styles',
            plugins_url('assets/blocks/customstyles/custom-styles.js', dirname(__FILE__)),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-date', 'wp-editor' )
        );
        $custom_styles_data = get_option('advgb_custom_styles');
        wp_localize_script('custom_styles', 'advGb_CS', $custom_styles_data);

        wp_enqueue_script(
            'custom_separator',
            plugins_url('assets/blocks/custom-separator/separator.js', dirname(__FILE__)),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-date', 'wp-editor' )
        );
        wp_enqueue_script(
            'custom_columns',
            plugins_url('assets/blocks/custom-columns/columns.js', dirname(__FILE__)),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-date', 'wp-editor' )
        );

        // Set blocks icon color
        $saved_settings = get_option('advgb_settings');
        $blocks_icon_color = isset($saved_settings['blocks_icon_color']) ? $saved_settings['blocks_icon_color'] : '';
        wp_localize_script('wp-blocks', 'advgbBlocks', array('color' => $blocks_icon_color));

        // Setup default config data for blocks
        $blocks_config_saved = get_option('advgb_blocks_default_config');
        $blocks_config_saved = $blocks_config_saved !== false ? $blocks_config_saved : array();
        wp_localize_script('wp-blocks', 'advgbDefaultConfig', $blocks_config_saved);
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

        if (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG === true) {
            wp_enqueue_style(
                'blocks_styles',
                plugins_url('assets/css/blocks_styles/blocks.css', dirname(__FILE__))
            );
        } else {
            wp_enqueue_style(
                'blocks_styles_min',
                plugins_url('assets/css/blocks_styles/blocks.min.css', dirname(__FILE__))
            );
        }

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
     * Update the blocks list for first time install
     *
     * @return void
     */
    public function initBlocksList()
    {
        if (get_option('advgb_blocks_list') === false
            || (defined('GUTENBERG_VERSION') && version_compare(get_option('advgb_gutenberg_version'), GUTENBERG_VERSION, '<'))) {
            $advgb_nonce = wp_create_nonce('advgb_update_blocks_list');
            wp_enqueue_script('wp-blocks');
            wp_enqueue_script('wp-element');
            wp_enqueue_script('wp-data');
            wp_enqueue_script('wp-components');
            wp_enqueue_script('wp-block-library');
            wp_enqueue_script('wp-editor');
            do_action('enqueue_block_editor_assets');
            wp_enqueue_script(
                'update_list',
                plugins_url('assets/js/update-block-list.js', dirname(__FILE__)),
                array()
            );

            wp_add_inline_script(
                'wp-blocks',
                sprintf('wp.blocks.setCategories( %s );', wp_json_encode(get_block_categories(get_post()))),
                'after'
            );

            wp_localize_script('update_list', 'updateListNonce', array('nonce' => $advgb_nonce));
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
            wp_send_json(__('No permission!', 'advanced-gutenberg'), 403);
            return false;
        }

        // phpcs:disable WordPress.Security.NonceVerification.NoNonceVerification -- View request, no action
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
        $total_pages = (int)ceil($total_users / $users_per_page);
        if (isset($_REQUEST['paged'])) {
            if ($_REQUEST['paged'] === 'first') {
                $pagenum = 1;
            } elseif ($_REQUEST['paged'] === 'last') {
                $pagenum = (int)$total_pages;
            } else {
                $pagenum = (int)$_REQUEST['paged'];
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
                $users_list .= '<input class="ju-checkbox" type="checkbox" name="advgb-users[]" value="' . $userid . '" />';
                $users_list .= '</td>';
                $users_list .= '<td class="name column-name">';
                $users_list .= '<span>' . $user_object->display_name . '</span>';
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
            wp_send_json(__('No permission!', 'advanced-gutenberg'), 403);
            return false;
        }
        $regex = '/^[a-zA-Z0-9_\-]+$/';
        $regexWithSpaces = '/^[\p{L}\p{N}_\- ]+$/u';

        if (!wp_verify_nonce($_POST['nonce'], 'advgb_settings_nonce')) {
            wp_send_json(__('Invalid nonce token!', 'advanced-gutenberg'), 400);
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
            $new_classname = sanitize_text_field($_POST['name']);
            $new_identify_color = sanitize_text_field($_POST['mycolor']);
            $new_css = $_POST['mycss'];
            // Validate new name
            if (!preg_match($regex, $new_classname)) {
                wp_send_json('Invalid characters, please enter another!', 403);
                return false;
            }
            $data_saved = get_option('advgb_custom_styles');
            $new_data_array = array();
            foreach ($data_saved as $data) {
                if ($data['id'] === $style_id) {
                    $data['name'] = $new_classname;
                    $data['css'] = $new_css;
                    $data['identifyColor'] = $new_identify_color;
                }
                array_push($new_data_array, $data);
            }
            update_option('advgb_custom_styles', $new_data_array);
        } elseif ($task === 'edit') {
            $new_title = sanitize_text_field($_POST['title']);
            $style_id = (int)$_POST['id'];
            if (!preg_match($regexWithSpaces, $new_title)) {
                wp_send_json('Invalid characters, please enter another!', 403);
                return false;
            }
            $data_saved = get_option('advgb_custom_styles');
            $new_data_array = array();
            foreach ($data_saved as $data) {
                if ($data['id'] === $style_id) {
                    $data['title'] = $new_title;
                }
                array_push($new_data_array, $data);
            }
            update_option('advgb_custom_styles', $new_data_array);
            wp_send_json(array('title' => $new_title), 200);
        } else {
            wp_send_json(null, 404);
        }
    }

    /**
     * Ajax for delete profiles
     *
     * @return boolean,void     Return false if failure, echo json on success
     */
    public function deleteProfiles()
    {
        // Check users permissions
        if (!current_user_can('delete_pages')) {
            wp_send_json(__('No permission!', 'advanced-gutenberg'), 403);
            return false;
        }

        if (!wp_verify_nonce($_POST['pNonce'], 'advgb_profiles_nonce')) {
            wp_send_json(__('Fail to verify nonce!', 'advanced-gutenberg'), 400);
            return false;
        };

        $profiles_to_delete = $_POST['ids'];
        if (count($profiles_to_delete)) {
            $deleted = array();
            foreach ($profiles_to_delete as $profile) {
                if (wp_delete_post($profile)) {
                    array_push($deleted, $profile);
                }
            }

            wp_send_json(array('deleted' => $deleted), 200);
        }
    }

    /**
     * Ajax for saving block default config
     *
     * @return boolean,void     Return false if failure, echo json on success
     */
    public function saveBlockConfig()
    {
        // Check users permissions
        if (!current_user_can('activate_plugins')) {
            wp_send_json(__('No permission!', 'advanced-gutenberg'), 403);
            return false;
        }

        if (!wp_verify_nonce($_POST['nonce'], 'advgb_block_config_nonce')) {
            wp_send_json(__('Invalid nonce token!', 'advanced-gutenberg'), 400);
        }

        $blocks_config_saved = get_option('advgb_blocks_default_config');
        if ($blocks_config_saved === false) {
            $blocks_config_saved = array();
        }

        $blockType = sanitize_text_field($_POST['blockType']);
        $settings = $_POST['settings'];

        foreach ($settings as $key => $setting) {
            foreach ($setting as $k => $option) {
                $option = sanitize_text_field($option);
                if (is_numeric($option)) {
                    $option = floatval($option);
                }

                $settings[$key][$k] = $option;
            }
        }

        // Modify settings for social links blocks config
        if ($blockType === 'advgb-social-links') {
            $items = array();
            $settings[$blockType]['items'] = array();

            foreach ($settings[$blockType] as $k => $option) {
                if (strpos($k, '.')) {
                    $item = explode('.', $k);
                    $items[$item[0]][$item[1]] = $option;
                }
            }

            foreach ($items as $item) {
                array_push($settings[$blockType]['items'], $item);
            }
        }

        $blocks_config_saved[$blockType] = $settings[$blockType];

        update_option('advgb_blocks_default_config', $blocks_config_saved);
        wp_send_json(true, 200);
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
            'ju_framework_styles',
            plugins_url('assets/css/style.css', dirname(__FILE__))
        );
        wp_register_style(
            'ju_framework_styles_min',
            plugins_url('assets/css/style.min.css', dirname(__FILE__))
        );
        wp_register_style(
            'main_style',
            plugins_url('assets/css/main.css', dirname(__FILE__))
        );
        wp_register_style(
            'profile_style',
            plugins_url('assets/css/profile.css', dirname(__FILE__))
        );
        wp_register_style(
            'settings_style',
            plugins_url('assets/css/settings.css', dirname(__FILE__))
        );
        wp_register_style(
            'qtip_style',
            plugins_url('assets/css/jquery.qtip.css', dirname(__FILE__))
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
        wp_register_style(
            'waves_styles',
            plugins_url('assets/css/waves.min.css', dirname(__FILE__))
        );
        wp_register_style(
            'material_icon_font',
            plugins_url('assets/css/fonts/material-icons.min.css', dirname(__FILE__))
        );

        // Register JS
        wp_register_script(
            'main_js',
            plugins_url('assets/js/main.js', dirname(__FILE__))
        );
        wp_register_script(
            'update_list',
            plugins_url('assets/js/update-block-list.js', dirname(__FILE__))
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
            plugins_url('assets/js/waves.min.js', dirname(__FILE__))
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
            plugins_url('assets/js/jquery.colorbox.min.js', dirname(__FILE__)),
            array('jquery')
        );

        $saved_settings = get_option('advgb_settings');
        if (isset($saved_settings['enable_blocks_spacing']) && $saved_settings['enable_blocks_spacing']) {
            $blocks_spacing = isset($saved_settings['blocks_spacing']) ? $saved_settings['blocks_spacing'] : 0;

            wp_add_inline_style(
                'dashicons',
                '.entry-content > * {margin-bottom: ' . $blocks_spacing . 'px}'
            );
        }
    }

    /**
     * Register main menu
     *
     * @return void
     */
    public function registerMainMenu()
    {
        add_menu_page(
            __('Advanced Gutenberg', 'advanced-gutenberg'),
            __('Adv. Gutenberg', 'advanced-gutenberg'),
            'manage_options',
            'advgb_main',
            array($this, 'advgbMainView'),
            'dashicons-edit'
        );
    }

    /**
     * Load main view
     *
     * @return void
     */
    public function advgbMainView()
    {
        wp_enqueue_style('roboto_font', 'https://fonts.googleapis.com/css?family=Roboto');
        wp_enqueue_style('material_icon_font');
        wp_enqueue_style('advgb_quirk');
        wp_enqueue_style('waves_styles');
        if (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG === true) {
            wp_enqueue_style('ju_framework_styles');
        } else {
            wp_enqueue_style('ju_framework_styles_min');
        }
        wp_enqueue_style('main_style');

        wp_enqueue_script('waves_js');
        wp_enqueue_script('velocity_js');
        wp_enqueue_script('tabs_js');
        wp_enqueue_script('main_js');

        $this->loadView('main-view');
    }

    /**
     * Register profiles custom post type
     *
     * @return void
     */
    public function registerAdvgbProfile()
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
     * Save data function
     *
     * @return boolean True on success, False on failure
     */
    public function saveAdvgbData()
    {
        if (isset($_GET['view']) && $_GET['view'] === 'profile' && !isset($_GET['id'])) { // phpcs:ignore WordPress.Security.NonceVerification.NoNonceVerification -- redirect only
            wp_safe_redirect(admin_url('admin.php?page=advgb_main&view=profiles'));
        }

        if (isset($_POST['advgb_profile_save'])) { // phpcs:ignore WordPress.Security.NonceVerification.NoNonceVerification -- we check nonce below
            $this->saveAdvgbProfile();
        } elseif (isset($_POST['save_settings']) || isset($_POST['save_custom_styles'])) { // phpcs:ignore WordPress.Security.NonceVerification.NoNonceVerification -- we check nonce below
            $this->saveSettings();
        }

        return false;
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

            if (isset($_POST['enable_blocks_spacing'])) {
                $save_config['enable_blocks_spacing'] = 1;
            } else {
                $save_config['enable_blocks_spacing'] = 0;
            }

            $save_config['google_api_key'] = $_POST['google_api_key'];
            $save_config['blocks_spacing'] = $_POST['blocks_spacing'];
            $save_config['blocks_icon_color'] = $_POST['blocks_icon_color'];

            update_option('advgb_settings', $save_config);

            if (isset($_REQUEST['_wp_http_referer'])) {
                wp_safe_redirect(admin_url('admin.php?page=advgb_main&save_settings=success'));
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

            if (isset($_REQUEST['_wp_http_referer'])) {
                wp_safe_redirect(admin_url('admin.php?page=advgb_main&save_styles=success'));
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
     * Save profiles settings
     *
     * @return mixed
     */
    public function saveAdvgbProfile()
    {
        // Check nonce field exist
        if (!isset($_POST['advgb_nonce_field'])) {
            return false;
        }
        // Verify nonce
        if (!wp_verify_nonce($_POST['advgb_nonce_field'], 'advgb_nonce')) {
            return false;
        }

        $postID = $_POST['advgb_profile_id'];

        // Save profile settings
        if (current_user_can('publish_posts')) {
            // Get list of active blocks
            $active_blocks = array();
            if (isset($_POST['active_blocks'])) {
                $active_blocks = $_POST['active_blocks'];
            }

            // Get users permission
            $users_access = array();
            $roles_access = array();
            if (isset($_POST['advgb-users-access-list'])) {
                $users_access = trim($_POST['advgb-users-access-list']);
                $users_access = explode(' ', $users_access);
            }
            if (isset($_POST['advgb-roles'])) {
                $roles_access = $_POST['advgb-roles'];
            }

            // Get new profile title
            $post_title = trim($_POST['advgb_profile_title']);

            // Save data
            if ($postID !== 'new') { // Update profile if have post ID
                if (!current_user_can('edit_post', $postID)) {
                    return false;
                }

                update_post_meta($postID, 'active_blocks', $active_blocks);
                update_post_meta($postID, 'users_access', $users_access);
                update_post_meta($postID, 'roles_access', $roles_access);
                wp_update_post(array(
                    'ID' => $postID,
                    'post_title' => $post_title,
                ));
            } else { // Create new profile
                $postID = wp_insert_post(array(
                    'post_title'  => $post_title,
                    'post_type'   => 'advgb_profiles',
                    'post_status' => 'publish',
                    'meta_input'  => array(
                        'active_blocks' => $active_blocks,
                        'roles_access'  => $roles_access,
                        'users_access'  => $users_access,
                    )
                ));
            }

            wp_safe_redirect(admin_url('admin.php?page=advgb_main&view=profile&id=' . $postID . '&save_profile=success'));
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
     * Register block config page
     *
     * @return void
     */
    public function registerBlockConfigPage()
    {
        $advgb_block = array(
            'accordion', 'button', 'image', 'list',
            'table', 'video', 'count-up', 'map',
            'social-links', 'summary', 'tabs', 'testimonial',
        );

        foreach ($advgb_block as $block) {
            add_submenu_page(
                'admin.php?',
                __('Block Config', 'advanced-gutenberg'),
                __('Block Config', 'advanced-gutenberg'),
                'manage_options',
                'advgb-' . $block,
                array($this, 'loadBlockConfigView')
            );
        }
    }

    /**
     * Function to get and load the block config view
     *
     * @param string $block View to load
     *
     * @return void
     */
    public function loadBlockConfigView($block = '')
    {
        if (!$block) {
            $block = $_GET['page']; // phpcs:ignore WordPress.Security.NonceVerification.NoNonceVerification -- view only
        }

        wp_enqueue_style('roboto_font', 'https://fonts.googleapis.com/css?family=Roboto');
        wp_enqueue_style(
            'minicolors_css',
            plugins_url('assets/css/jquery.minicolors.css', ADVANCED_GUTENBERG_PLUGIN)
        );
        wp_enqueue_style(
            'ju_framework_styles_min',
            plugins_url('assets/css/style.min.css', ADVANCED_GUTENBERG_PLUGIN)
        );
        wp_enqueue_style(
            'block_config_css',
            plugins_url('assets/css/block-config.css', ADVANCED_GUTENBERG_PLUGIN)
        );
        $loadingImage = plugins_url('assets/images/loading.gif', ADVANCED_GUTENBERG_PLUGIN);
        wp_add_inline_style('block_config_css', '#advgb-loading-screen-image {background-image: url('. $loadingImage .')}');

        wp_enqueue_script(
            'minicolors_js',
            plugins_url('assets/js/jquery.minicolors.min.js', ADVANCED_GUTENBERG_PLUGIN)
        );
        wp_enqueue_script(
            'block_config_js',
            plugins_url('assets/js/block-config.js', ADVANCED_GUTENBERG_PLUGIN),
            array('jquery')
        );

        $blocks_settings_list = array(
            'advgb-accordion' => array(
                array(
                    'label'    => __('Header Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Background Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'headerBgColor',
                        ),
                        array(
                            'title' => __('Text Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'headerTextColor'
                        ),
                        array(
                            'title'   => __('Header Icon', 'advanced-gutenberg'),
                            'type'    => 'select',
                            'name'    => 'headerIcon',
                            'options' => array(
                                array(
                                    'label' => __('Plus', 'advanced-gutenberg'),
                                    'value' => 'plus',
                                ),
                                array(
                                    'label' => __('Plus Circle', 'advanced-gutenberg'),
                                    'value' => 'plusCircle',
                                ),
                                array(
                                    'label' => __('Plus Circle Outline', 'advanced-gutenberg'),
                                    'value' => 'plusCircleOutline',
                                ),
                                array(
                                    'label' => __('Plus Square Outline', 'advanced-gutenberg'),
                                    'value' => 'plusBox',
                                ),
                                array(
                                    'label' => __('Unfold Arrow', 'advanced-gutenberg'),
                                    'value' => 'unfold',
                                ),
                                array(
                                    'label' => __('Horizontal Dots', 'advanced-gutenberg'),
                                    'value' => 'threeDots',
                                ),
                                array(
                                    'label' => __('Arrow Down', 'advanced-gutenberg'),
                                    'value' => 'arrowDown',
                                ),
                            )
                        ),
                        array(
                            'title' => __('Header Icon Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'headerIconColor',
                        ),
                    ),
                ),
                array(
                    'label'    => __('Body Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Background Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'bodyBgColor',
                        ),
                        array(
                            'title' => __('Text Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'bodyTextColor',
                        ),
                    ),
                ),
                array(
                    'label'    => __('Border Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title'   => __('Border Style', 'advanced-gutenberg'),
                            'type'    => 'select',
                            'name'    => 'borderStyle',
                            'options' => array(
                                array(
                                    'label' => __('Solid', 'advanced-gutenberg'),
                                    'value' => 'solid',
                                ),
                                array(
                                    'label' => __('Dashed', 'advanced-gutenberg'),
                                    'value' => 'dashed',
                                ),
                                array(
                                    'label' => __('Dotted', 'advanced-gutenberg'),
                                    'value' => 'dotted',
                                ),
                            )
                        ),
                        array(
                            'title' => __('Border Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'borderColor',
                        ),
                        array(
                            'title' => __('Border Width', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'borderWidth',
                            'min'   => 1,
                            'max'   => 10,
                        ),
                        array(
                            'title' => __('Border Radius', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'borderRadius',
                            'min'   => 0,
                            'max'   => 100,
                        ),
                    ),
                ),
            ),
            'advgb-button' => array(
                array(
                    'label'    => __('Text and Color', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Text Size', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'textSize',
                            'min'   => 10,
                            'max'   => 100,
                        ),
                        array(
                            'title' => __('Text Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'textColor'
                        ),
                        array(
                            'title' => __('Background Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'bgColor',
                        ),
                    ),
                ),
                array(
                    'label'    => __('Border Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title'   => __('Border Style', 'advanced-gutenberg'),
                            'type'    => 'select',
                            'name'    => 'borderStyle',
                            'options' => array(
                                array(
                                    'label' => __('Solid', 'advanced-gutenberg'),
                                    'value' => 'solid',
                                ),
                                array(
                                    'label' => __('Dashed', 'advanced-gutenberg'),
                                    'value' => 'dashed',
                                ),
                                array(
                                    'label' => __('Dotted', 'advanced-gutenberg'),
                                    'value' => 'dotted',
                                ),
                            )
                        ),
                        array(
                            'title' => __('Border Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'borderColor',
                        ),
                        array(
                            'title' => __('Border Width', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'borderWidth',
                            'min'   => 1,
                            'max'   => 10,
                        ),
                        array(
                            'title' => __('Border Radius', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'borderRadius',
                            'min'   => 0,
                            'max'   => 100,
                        ),
                    ),
                ),
                array(
                    'label'    => __('Padding Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Padding Top', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'paddingTop',
                            'min'   => 0,
                            'max'   => 100,
                        ),
                        array(
                            'title' => __('Padding Right', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'paddingRight',
                            'min'   => 0,
                            'max'   => 100,
                        ),
                        array(
                            'title' => __('Padding Bottom', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'paddingBottom',
                            'min'   => 0,
                            'max'   => 100,
                        ),
                        array(
                            'title' => __('Padding Left', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'paddingLeft',
                            'min'   => 0,
                            'max'   => 100,
                        ),
                    ),
                ),
                array(
                    'label'    => __('Hover Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Text Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'hoverTextColor'
                        ),
                        array(
                            'title' => __('Background Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'hoverBgColor',
                        ),
                        array(
                            'title' => __('Shadow Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'hoverShadowColor',
                        ),
                        array(
                            'title' => __('Shadow H Offset', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'hoverShadowH',
                            'min'   => -50,
                            'max'   => 50,
                        ),
                        array(
                            'title' => __('Shadow V Offset', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'hoverShadowV',
                            'min'   => -50,
                            'max'   => 50,
                        ),
                        array(
                            'title' => __('Shadow Blur', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'hoverShadowBlur',
                            'min'   => 0,
                            'max'   => 50,
                        ),
                        array(
                            'title' => __('Shadow Spread', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'hoverShadowSpread',
                            'min'   => 0,
                            'max'   => 50,
                        ),
                        array(
                            'title' => __('Transition Speed', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'transitionSpeed',
                            'min'   => 0,
                            'max'   => 3,
                        ),
                    ),
                ),
            ),
            'advgb-image' => array(
                array(
                    'label'    => __('Image Size', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Full width', 'advanced-gutenberg'),
                            'type'  => 'checkbox',
                            'name'  => 'fullWidth',
                        ),
                        array(
                            'title' => __('Height', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'height',
                            'min'   => 100,
                            'max'   => 1000,
                        ),
                        array(
                            'title' => __('Width', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'width',
                            'min'   => 200,
                            'max'   => 1300,
                        ),
                    ),
                ),
                array(
                    'label'    => __('Color', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Title Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'titleColor',
                        ),
                        array(
                            'title' => __('Subtitle Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'subtitleColor',
                        ),
                        array(
                            'title' => __('Overlay Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'overlayColor',
                        ),
                    ),
                ),
                array(
                    'label'    => __('Text Alignment', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Vertical Alignment', 'advanced-gutenberg'),
                            'type'  => 'select',
                            'name'  => 'vAlign',
                            'options' => array(
                                array(
                                    'label' => __('Top', 'advanced-gutenberg'),
                                    'value' => 'flex-start',
                                ),
                                array(
                                    'label' => __('Center', 'advanced-gutenberg'),
                                    'value' => 'center',
                                ),
                                array(
                                    'label' => __('Bottom', 'advanced-gutenberg'),
                                    'value' => 'flex-end',
                                ),
                            ),
                        ),
                        array(
                            'title' => __('Vertical Alignment', 'advanced-gutenberg'),
                            'type'  => 'select',
                            'name'  => 'hAlign',
                            'options' => array(
                                array(
                                    'label' => __('Left', 'advanced-gutenberg'),
                                    'value' => 'flex-start',
                                ),
                                array(
                                    'label' => __('Center', 'advanced-gutenberg'),
                                    'value' => 'center',
                                ),
                                array(
                                    'label' => __('Right', 'advanced-gutenberg'),
                                    'value' => 'flex-end',
                                ),
                            ),
                        ),
                    ),
                ),
            ),
            'advgb-list' => array(
                array(
                    'label'    => __('Text Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Text Size', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'textSize',
                            'min'   => 10,
                            'max'   => 100,
                        ),
                    ),
                ),
                array(
                    'label'    => __('Icon Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Icon style', 'advanced-gutenberg'),
                            'type'  => 'select',
                            'name'  => 'icon',
                            'options' => array(
                                array(
                                    'label' => __('None', 'advanced-gutenberg'),
                                    'value' => '',
                                ),
                                array(
                                    'label' => __('Pushpin', 'advanced-gutenberg'),
                                    'value' => 'admin-post',
                                ),
                                array(
                                    'label' => __('Configuration', 'advanced-gutenberg'),
                                    'value' => 'admin-generic',
                                ),
                                array(
                                    'label' => __('Flag', 'advanced-gutenberg'),
                                    'value' => 'flag',
                                ),
                                array(
                                    'label' => __('Star', 'advanced-gutenberg'),
                                    'value' => 'star-filled',
                                ),
                                array(
                                    'label' => __('Checkmark', 'advanced-gutenberg'),
                                    'value' => 'yes',
                                ),
                                array(
                                    'label' => __('Minus', 'advanced-gutenberg'),
                                    'value' => 'minus',
                                ),
                                array(
                                    'label' => __('Plus', 'advanced-gutenberg'),
                                    'value' => 'plus',
                                ),
                                array(
                                    'label' => __('Play', 'advanced-gutenberg'),
                                    'value' => 'controls-play',
                                ),
                                array(
                                    'label' => __('Arrow Right', 'advanced-gutenberg'),
                                    'value' => 'arrow-right-alt',
                                ),
                                array(
                                    'label' => __('X Cross', 'advanced-gutenberg'),
                                    'value' => 'dismiss',
                                ),
                                array(
                                    'label' => __('Warning', 'advanced-gutenberg'),
                                    'value' => 'warning',
                                ),
                                array(
                                    'label' => __('Help', 'advanced-gutenberg'),
                                    'value' => 'editor-help',
                                ),
                                array(
                                    'label' => __('Info', 'advanced-gutenberg'),
                                    'value' => 'info',
                                ),
                                array(
                                    'label' => __('Circle', 'advanced-gutenberg'),
                                    'value' => 'marker',
                                ),
                            ),
                        ),
                        array(
                            'title' => __('Icon color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'iconColor',
                        ),
                        array(
                            'title' => __('Icon Size', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'iconSize',
                            'min'   => 10,
                            'max'   => 100,
                        ),
                        array(
                            'title' => __('Line Height', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'lineHeight',
                            'min'   => 0,
                            'max'   => 100,
                        ),
                        array(
                            'title' => __('Margin', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'margin',
                            'min'   => 0,
                            'max'   => 100,
                        ),
                        array(
                            'title' => __('Padding', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'padding',
                            'min'   => 0,
                            'max'   => 100,
                        ),
                    ),
                ),
            ),
            'advgb-table' => array(
                array(
                    'label'    => __('Table Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Max width', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'maxWidth',
                            'min'   => 0,
                            'max'   => 1999,
                        ),
                    ),
                ),
            ),
            'advgb-video' => array(
                array(
                    'label'    => __('Video Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Open video in lightbox', 'advanced-gutenberg'),
                            'type'  => 'checkbox',
                            'name'  => 'openInLightbox',
                        ),
                        array(
                            'title' => __('Full width', 'advanced-gutenberg'),
                            'type'  => 'checkbox',
                            'name'  => 'videoFullWidth'
                        ),
                        array(
                            'title' => __('Video Width', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'videoWidth',
                            'min'   => 100,
                            'max'   => 1000,
                        ),
                        array(
                            'title' => __('Video Height', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'videoHeight',
                            'min'   => 300,
                            'max'   => 7000,
                        ),
                        array(
                            'title' => __('Overlay color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'overlayColor',
                        ),
                    ),
                ),
                array(
                    'label'    => __('Play Button Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title'   => __('Button Icon', 'advanced-gutenberg'),
                            'type'    => 'select',
                            'name'    => 'playButtonIcon',
                            'options' => array(
                                array(
                                    'label' => __('Normal', 'advanced-gutenberg'),
                                    'value' => 'normal',
                                ),
                                array(
                                    'label' => __('Filled Circle', 'advanced-gutenberg'),
                                    'value' => 'circleFill',
                                ),
                                array(
                                    'label' => __('Outline Circle', 'advanced-gutenberg'),
                                    'value' => 'circleOutline',
                                ),
                                array(
                                    'label' => __('Video Camera', 'advanced-gutenberg'),
                                    'value' => 'videoCam',
                                ),
                                array(
                                    'label' => __('Filled Square', 'advanced-gutenberg'),
                                    'value' => 'squareCurved',
                                ),
                                array(
                                    'label' => __('Star Sticker', 'advanced-gutenberg'),
                                    'value' => 'starSticker',
                                ),
                            )
                        ),
                        array(
                            'title' => __('Button Size', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'playButtonSize',
                            'min'   => 40,
                            'max'   => 200,
                        ),
                        array(
                            'title' => __('Button Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'playButtonColor',
                        ),
                    ),
                ),
            ),
            'advgb-count-up' => array(
                array(
                    'label'    => __('General Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Number of columns', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'columns',
                            'min'   => 1,
                            'max'   => 3,
                        ),
                    ),
                ),
                array(
                    'label'    => __('Color Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Header Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'headerTextColor',
                        ),
                        array(
                            'title' => __('Count Up Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'countUpNumberColor',
                        ),
                        array(
                            'title' => __('Description Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'descTextColor',
                        ),
                    ),
                ),
                array(
                    'label'    => __('Count Up Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Count Up Number Size', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'countUpNumberSize',
                            'min'   => 10,
                            'max'   => 100,
                        ),
                    ),
                ),
            ),
            'advgb-map' => array(
                array(
                    'label'    => __('Location Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'type'  => 'hidden',
                            'name'  => 'useLatLng',
                            'value' => 1,
                        ),
                        array(
                            'title' => __('Latitude', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'lat',
                            'min'   => 0,
                            'max'   => 999,
                        ),
                        array(
                            'title' => __('Longitude', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'lng',
                            'min'   => 0,
                            'max'   => 999,
                        ),
                    ),
                ),
                array(
                    'label'    => __('Map Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Zoom Level', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'zoom',
                            'min'   => 0,
                            'max'   => 25,
                        ),
                        array(
                            'title' => __('Height', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'height',
                            'min'   => 300,
                            'max'   => 1000,
                        ),
                    ),
                ),
                array(
                    'label'    => __('Marker Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Marker Title', 'advanced-gutenberg'),
                            'type'  => 'text',
                            'name'  => 'markerTitle',
                        ),
                        array(
                            'title' => __('Marker Description', 'advanced-gutenberg'),
                            'type'  => 'text',
                            'name'  => 'markerDesc',
                        ),
                    ),
                ),
            ),
            'advgb-social-links' => array(
                array(
                    'label'    => __('Icon 1 Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Icon', 'advanced-gutenberg'),
                            'type'  => 'select',
                            'name'  => 'icon1.icon',
                            'options' => array(
                                array('label' => __('Default', 'advanced-gutenberg'), 'value' => ''),
                                array('label' => __('Blogger', 'advanced-gutenberg'), 'value' => 'blogger'),
                                array('label' => __('Facebook', 'advanced-gutenberg'), 'value' => 'facebook'),
                                array('label' => __('Flickr', 'advanced-gutenberg'), 'value' => 'flickr'),
                                array('label' => __('Google Plus', 'advanced-gutenberg'), 'value' => 'google'),
                                array('label' => __('Instagram', 'advanced-gutenberg'), 'value' => 'instagram'),
                                array('label' => __('LinkedIn', 'advanced-gutenberg'), 'value' => 'linkedin'),
                                array('label' => __('Email', 'advanced-gutenberg'), 'value' => 'mail'),
                                array('label' => __('Picasa', 'advanced-gutenberg'), 'value' => 'picasa'),
                                array('label' => __('Pinterest', 'advanced-gutenberg'), 'value' => 'pinterest'),
                                array('label' => __('Reddit', 'advanced-gutenberg'), 'value' => 'reddit'),
                                array('label' => __('Skype', 'advanced-gutenberg'), 'value' => 'skype'),
                                array('label' => __('Sound Cloud', 'advanced-gutenberg'), 'value' => 'soundcloud'),
                                array('label' => __('Tumblr', 'advanced-gutenberg'), 'value' => 'tumblr'),
                                array('label' => __('Twitter', 'advanced-gutenberg'), 'value' => 'twitter'),
                                array('label' => __('Vimeo', 'advanced-gutenberg'), 'value' => 'vimeo'),
                                array('label' => __('Youtube', 'advanced-gutenberg'), 'value' => 'youtube'),
                            )
                        ),
                        array(
                            'title' => __('Icon Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'icon1.iconColor',
                        ),
                        array(
                            'title' => __('Icon Link', 'advanced-gutenberg'),
                            'type'  => 'text',
                            'name'  => 'icon1.link',
                        ),
                    ),
                ),
                array(
                    'label'    => __('Icon 2 Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Icon', 'advanced-gutenberg'),
                            'type'  => 'select',
                            'name'  => 'icon2.icon',
                            'options' => array(
                                array('label' => __('Default', 'advanced-gutenberg'), 'value' => ''),
                                array('label' => __('Blogger', 'advanced-gutenberg'), 'value' => 'blogger'),
                                array('label' => __('Facebook', 'advanced-gutenberg'), 'value' => 'facebook'),
                                array('label' => __('Flickr', 'advanced-gutenberg'), 'value' => 'flickr'),
                                array('label' => __('Google Plus', 'advanced-gutenberg'), 'value' => 'google'),
                                array('label' => __('Instagram', 'advanced-gutenberg'), 'value' => 'instagram'),
                                array('label' => __('LinkedIn', 'advanced-gutenberg'), 'value' => 'linkedin'),
                                array('label' => __('Email', 'advanced-gutenberg'), 'value' => 'mail'),
                                array('label' => __('Picasa', 'advanced-gutenberg'), 'value' => 'picasa'),
                                array('label' => __('Pinterest', 'advanced-gutenberg'), 'value' => 'pinterest'),
                                array('label' => __('Reddit', 'advanced-gutenberg'), 'value' => 'reddit'),
                                array('label' => __('Skype', 'advanced-gutenberg'), 'value' => 'skype'),
                                array('label' => __('Sound Cloud', 'advanced-gutenberg'), 'value' => 'soundcloud'),
                                array('label' => __('Tumblr', 'advanced-gutenberg'), 'value' => 'tumblr'),
                                array('label' => __('Twitter', 'advanced-gutenberg'), 'value' => 'twitter'),
                                array('label' => __('Vimeo', 'advanced-gutenberg'), 'value' => 'vimeo'),
                                array('label' => __('Youtube', 'advanced-gutenberg'), 'value' => 'youtube'),
                            )
                        ),
                        array(
                            'title' => __('Icon Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'icon2.iconColor',
                        ),
                        array(
                            'title' => __('Icon Link', 'advanced-gutenberg'),
                            'type'  => 'text',
                            'name'  => 'icon2.link',
                        ),
                    ),
                ),
                array(
                    'label'    => __('Icon 3 Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Icon', 'advanced-gutenberg'),
                            'type'  => 'select',
                            'name'  => 'icon3.icon',
                            'options' => array(
                                array('label' => __('Default', 'advanced-gutenberg'), 'value' => ''),
                                array('label' => __('Blogger', 'advanced-gutenberg'), 'value' => 'blogger'),
                                array('label' => __('Facebook', 'advanced-gutenberg'), 'value' => 'facebook'),
                                array('label' => __('Flickr', 'advanced-gutenberg'), 'value' => 'flickr'),
                                array('label' => __('Google Plus', 'advanced-gutenberg'), 'value' => 'google'),
                                array('label' => __('Instagram', 'advanced-gutenberg'), 'value' => 'instagram'),
                                array('label' => __('LinkedIn', 'advanced-gutenberg'), 'value' => 'linkedin'),
                                array('label' => __('Email', 'advanced-gutenberg'), 'value' => 'mail'),
                                array('label' => __('Picasa', 'advanced-gutenberg'), 'value' => 'picasa'),
                                array('label' => __('Pinterest', 'advanced-gutenberg'), 'value' => 'pinterest'),
                                array('label' => __('Reddit', 'advanced-gutenberg'), 'value' => 'reddit'),
                                array('label' => __('Skype', 'advanced-gutenberg'), 'value' => 'skype'),
                                array('label' => __('Sound Cloud', 'advanced-gutenberg'), 'value' => 'soundcloud'),
                                array('label' => __('Tumblr', 'advanced-gutenberg'), 'value' => 'tumblr'),
                                array('label' => __('Twitter', 'advanced-gutenberg'), 'value' => 'twitter'),
                                array('label' => __('Vimeo', 'advanced-gutenberg'), 'value' => 'vimeo'),
                                array('label' => __('Youtube', 'advanced-gutenberg'), 'value' => 'youtube'),
                            )
                        ),
                        array(
                            'title' => __('Icon Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'icon3.iconColor',
                        ),
                        array(
                            'title' => __('Icon Link', 'advanced-gutenberg'),
                            'type'  => 'text',
                            'name'  => 'icon3.link',
                        ),
                    ),
                ),
                array(
                    'label'    => __('General Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Icon Alignment', 'advanced-gutenberg'),
                            'type'  => 'select',
                            'name'  => 'align',
                            'options' => array(
                                array('label' => __('Left', 'advanced-gutenberg'), 'value' => 'left'),
                                array('label' => __('Center', 'advanced-gutenberg'), 'value' => 'center'),
                                array('label' => __('Right', 'advanced-gutenberg'), 'value' => 'right'),
                            )
                        ),
                        array(
                            'title' => __('Icon Size', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'iconSize',
                            'min'   => 20,
                            'max'   => 60,
                        ),
                        array(
                            'title' => __('Icon Space', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'iconSpace',
                            'min'   => 0,
                            'max'   => 30,
                        ),
                    ),
                ),
            ),
            'advgb-summary' => array(
                array(
                    'label'    => __('General Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Load minimized', 'advanced-gutenberg'),
                            'type'  => 'checkbox',
                            'name'  => 'loadMinimized',
                        ),
                        array(
                            'title' => __('Summary header title', 'advanced-gutenberg'),
                            'type'  => 'text',
                            'name'  => 'headerTitle',
                        ),
                        array(
                            'title' => __('Anchor color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'anchorColor',
                        ),
                        array(
                            'title' => __('Summary Alignment', 'advanced-gutenberg'),
                            'type'  => 'select',
                            'name'  => 'align',
                            'options' => array(
                                array('label' => __('Left', 'advanced-gutenberg'), 'value' => 'left'),
                                array('label' => __('Center', 'advanced-gutenberg'), 'value' => 'center'),
                                array('label' => __('Right', 'advanced-gutenberg'), 'value' => 'right'),
                            )
                        ),
                    ),
                ),
            ),
            'advgb-tabs' => array(
                array(
                    'label'    => __('Tab Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Background Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'headerBgColor',
                        ),
                        array(
                            'title' => __('Text Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'headerTextColor',
                        ),
                    ),
                ),
                array(
                    'label'    => __('Active Tab Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Background Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'activeTabBgColor',
                        ),
                        array(
                            'title' => __('Text Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'activeTabTextColor',
                        ),
                    ),
                ),
                array(
                    'label'    => __('Body Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Background Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'bodyBgColor',
                        ),
                        array(
                            'title' => __('Text Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'bodyTextColor',
                        ),
                    ),
                ),
                array(
                    'label'    => __('Border Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Border Style', 'advanced-gutenberg'),
                            'type'  => 'select',
                            'name'  => 'borderStyle',
                            'options' => array(
                                array('label' => __('Solid', 'advanced-gutenberg'), 'value' => 'solid'),
                                array('label' => __('Dashed', 'advanced-gutenberg'), 'value' => 'dashed'),
                                array('label' => __('Dotted', 'advanced-gutenberg'), 'value' => 'dotted'),
                            )
                        ),
                        array(
                            'title' => __('Border Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'borderColor',
                        ),
                        array(
                            'title' => __('Border Width', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'borderWidth',
                            'min'   => 1,
                            'max'   => 10,
                        ),
                        array(
                            'title' => __('Border Radius', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'borderRadius',
                            'min'   => 0,
                            'max'   => 100,
                        ),
                    ),
                ),
            ),
            'advgb-testimonial' => array(
                array(
                    'label'    => __('General Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Columns', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'columns',
                            'min'   => 1,
                            'max'   => 3,
                        ),
                    ),
                ),
                array(
                    'label'    => __('Avatar Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Background Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'avatarColor',
                        ),
                        array(
                            'title' => __('Border Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'avatarBorderColor',
                        ),
                        array(
                            'title' => __('Border Radius (%)', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'avatarBorderRadius',
                            'min'   => 0,
                            'max'   => 50,
                        ),
                        array(
                            'title' => __('Border Width', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'avatarBorderWidth',
                            'min'   => 0,
                            'max'   => 5,
                        ),
                        array(
                            'title' => __('Avatar Size', 'advanced-gutenberg'),
                            'type'  => 'number',
                            'name'  => 'avatarSize',
                            'min'   => 50,
                            'max'   => 130,
                        ),
                    ),
                ),
                array(
                    'label'    => __('Text Settings', 'advanced-gutenberg'),
                    'settings' => array(
                        array(
                            'title' => __('Name Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'nameColor',
                        ),
                        array(
                            'title' => __('Position Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'positionColor',
                        ),
                        array(
                            'title' => __('Description Color', 'advanced-gutenberg'),
                            'type'  => 'color',
                            'name'  => 'descColor',
                        ),
                    ),
                ),
            ),
        );

        $advgb_blocks_default_config = get_option('advgb_blocks_default_config');
        $current_block = $block;

        if (!isset($blocks_settings_list[$current_block])) {
            wp_die(esc_html(__('Config for this block is currently unsupported.', 'advanced-gutenberg')));
            return;
        }

        $current_block_settings = $blocks_settings_list[$current_block];
        $current_block_settings_value = array();

        if ($advgb_blocks_default_config !== false) {
            if (isset($advgb_blocks_default_config[$current_block])) {
                $current_block_settings_value = $advgb_blocks_default_config[$current_block];
            }
        }

        require_once(plugin_dir_path(__FILE__) . 'view/advanced-gutenberg-block-config.php');
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
     * Function to load assets for post/page on front-end
     *
     * @param string $content Post content
     *
     * @return string
     */
    public function addFrontendContentAssets($content)
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
                plugins_url('assets/blocks/summary/summaryMinimized.js', dirname(__FILE__)),
                array('jquery')
            );
        }

        if (strpos($content, 'wp-block-advgb-count-up') !== false) {
            wp_enqueue_script(
                'waypoint_js',
                'https://cdnjs.cloudflare.com/ajax/libs/waypoints/2.0.5/waypoints.min.js',
                array('jquery')
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

        if (strpos($content, 'advgb-accordion-block') !== false) {
            wp_enqueue_script('jquery-ui-accordion');
            wp_add_inline_script('jquery-ui-accordion', 'jQuery(document).ready(function($){
                $(".advgb-accordion-block").accordion({
                    header: ".advgb-accordion-header",
                    heightStyle: "content"
                });
            });');
        }

        if (strpos($content, 'advgb-tabs-block') !== false) {
            wp_enqueue_script('jquery-ui-tabs');
            wp_add_inline_script('jquery-ui-tabs', 'jQuery(document).ready(function($){
                $(".advgb-tab a:not(.ui-tabs-anchor)").unbind("click");
                $(".advgb-tabs-block").tabs();
            });');
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
            'advgb/accordion',
            'advgb/tabs',
            'advgb/social-links',
        );

        // Avoid default value (string 'all')
        if (is_array($current_activated_blocks)) {
            $all_blocks_saved = get_option('advgb_blocks_list');
            $all_blocks_saved_name = array();
            foreach ($all_blocks_saved as $saved_block) {
                array_push($all_blocks_saved_name, $saved_block['name']);
            }

            foreach ($new_blocks as $block) {
                if (!in_array($block, $all_blocks_saved_name)) {
                    if (!in_array($block, $current_activated_blocks)) {
                        array_push($current_activated_blocks, $block);
                    }
                }
            }
        }

        return $current_activated_blocks;
    }

    /**
     * Render html for block config settings fields
     *
     * @param array $fieldset Array of field to render
     * @param array $data     Data will load as value to field
     *
     * @return boolean        Echo html content
     */
    public function renderBlockConfigFields($fieldset, $data)
    {
        $html = '';
        foreach ($fieldset as $category) {
            $html .= '<div class="block-config-category">';
            $html .= '<h3 class="block-config-category-title">' . $category['label'] . '</h3>';
            $html .= '<ul class="block-config-settings clearfix">';

            foreach ($category['settings'] as $setting) {
                $settingValue = $this->setConfigValue($data, $setting['name']);

                if ($setting['type'] === 'hidden') {
                    $html .= '<input type="hidden" class="block-config-input" name="'. $setting['name'] .'" value="'. $setting['value'] .'" />';
                    continue;
                }

                $html .= '<li class="ju-settings-option full-width block-config-option">';
                $html .= '<label for="setting-'. $setting['name'] .'" class="ju-setting-label">' . $setting['title'] . '</label>';
                $html .= '<div class="block-config-input-wrapper">';

                switch ($setting['type']) {
                    case 'text':
                    case 'number':
                        $html .= '<input type="' . $setting['type'] . '" class="ju-input block-config-input" id="setting-'. $setting['name'] .'" name="' . $setting['name'] . '" ';
                        if ($setting['type'] === 'number' && (isset($setting['min']) || isset($setting['max']))) {
                            $html .= ' min="' . $setting['min'] . '" max="' . $setting['max'] . '" ';
                        }
                        $html .= ' value="'. $settingValue .'" />';
                        break;
                    case 'color':
                        $html .= '<input type="text" class="minicolors minicolors-input ju-input block-config-input" id="setting-'. $setting['name'] .'" name="' . $setting['name'] . '" value="'. $settingValue .'" />';
                        break;
                    case 'select':
                        $html .= '<select class="block-config-input" id="setting-'. $setting['name'] .'" name="' . $setting['name'] . '">';

                        foreach ($setting['options'] as $option) {
                            $selected = $option['value'] === $settingValue ? 'selected' : '';
                            $html .= '<option value="' . $option['value'] . '" ' . $selected . '>' . $option['label'] . '</option>';
                        }

                        $html .= '</select>';
                        break;
                    case 'checkbox':
                        $checked = (int)$settingValue === 1 ? 'checked' : '';
                        $html .= '<div class="ju-switch-button">';
                        $html .= '<label class="switch">';
                        $html .=    '<input type="checkbox" value="1" class="block-config-input" id="setting-'. $setting['name'] .'" name="' . $setting['name'] . '" ' . $checked . '/>';
                        $html .=    '<span class="slider"></span>';
                        $html .= '</label>';
                        $html .= '</div>';
                        break;
                    default:
                        $html .= '<div>' . __('Type field not defined', 'advanced-gutenberg') . '</div>';
                        break;
                }

                $html .= '</div>';
                $html .= '</li>';
            }

            $html .= '</ul>';
            $html .= '</div>';
        }

        echo $html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- already escaped
        return true;
    }

    /**
     * Set value to config field
     *
     * @param array  $valueList  Array of values to set
     * @param string $valueToGet Value field to set
     * @param mixed  $default    Default value if value field from list not set
     *
     * @return string           Value after check
     */
    private function setConfigValue($valueList, $valueToGet, $default = '')
    {
        $valueReturn = $default;
        if (gettype($valueList) === 'array') {
            if (isset($valueList[$valueToGet])) {
                $valueReturn = $valueList[$valueToGet];
            }
        }

        return $valueReturn;
    }
}
