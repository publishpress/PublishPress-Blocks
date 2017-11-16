<?php
/**
 * Plugin Name: Gutenberg Advanced
 * Plugin URI: https://www.joomunited.com/wordpress-products/guttenberg-advanced
 * Description: Enhanced tools for Gutenberg editor
 * Version: {{version}}
 * Tested up to: {{wp_version}}
 * Author: JoomUnited
 * Author URI: https://www.joomunited.com
 * License: GPL2
 * Text Domain: gutenberg-advanced
 * Domain Path: /languages
 */

/**
 * @copyright 2014  Joomunited  ( email : contact _at_ joomunited.com )
 *
 *  Original development of this plugin was kindly funded by Joomunited
 *
 *  This program is free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program; if not, write to the Free Software
 *  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */

defined('ABSPATH') or die;

//Check plugin requirements
if (version_compare(PHP_VERSION, '5.3', '<')) {
    if (! function_exists('gbadv_disable_plugin')) {
        function gbadv_disable_plugin()
        {
            if (current_user_can('activate_plugins') && is_plugin_active(plugin_basename(__FILE__))) {
                deactivate_plugins(__FILE__);
                unset($_GET['activate']);
            }
        }
    }

    if (! function_exists('gbadv_show_error')) {
        function gbadv_show_error()
        {
            echo '<div class="error"><p><strong>Gutenberg Advanced</strong> need at least PHP 5.3 version, please update php before installing the plugin.</p></div>';
        }
    }

    //Add actions
    add_action('admin_init', 'gbadv_disable_plugin');
    add_action('admin_notices', 'gbadv_show_error');

    //Do not load anything more
    return;
}

if (! defined('GUTENBERG_ADVANCED_PLUGIN')) {
    define('GUTENBERG_ADVANCED_PLUGIN', __FILE__);
}

require_once(plugin_dir_path(__FILE__) . '/install.php');
require_once(plugin_dir_path(__FILE__) . '/incl/gutenberg-advanced-main.php');
new GutenbergAdvancedMain();
