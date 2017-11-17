<?php
defined('ABSPATH') or die;

class GutenbergAdvancedMain
{
    public static $default_active_blocks = 'all';

    public function __construct()
    {
        add_action('admin_init', array($this, 'init_blocks_list'));
        add_action('admin_enqueue_scripts', array($this, 'register_styles_scripts'));

        if (is_admin()) {
            add_action('admin_menu', array($this, 'register_meta_box'));
        }
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
