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

    }
}
