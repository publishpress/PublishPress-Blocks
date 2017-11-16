<?php
defined('ABSPATH') or die;

register_activation_hook(GUTENBERG_ADVANCED_PLUGIN, 'gbadv_plugin_activated');

// Init plugin
function gbadv_plugin_activated()
{
    // Check if Gutenberg is activated
    if (!function_exists('register_block_type')) {
        wp_die('Gutenberg not activated!');
        exit;
    }

}
