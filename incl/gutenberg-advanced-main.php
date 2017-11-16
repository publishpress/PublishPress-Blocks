<?php
defined('ABSPATH') or die;

class GutenbergAdvancedMain
{
    public function __construct()
    {
        add_action('admin_init', array($this, 'init_blocks_list'));

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
}
