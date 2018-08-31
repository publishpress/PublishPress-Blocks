<?php
defined('ABSPATH') || die;

/**
 * Render content for Recent Posts block
 *
 * @param array $attributes Attributes of the block
 *
 * @return null
 */
function advgbRenderBlockRecentPosts($attributes)
{
    $html = '';

    return null;
}

/**
 * Register block Recent Posts
 *
 * @return void
 */
function advgbRegisterBlockRecentPosts()
{
    if (!function_exists('register_block_type')) {
        return;
    }

    register_block_type('advgb/recent-posts', array(
        'attributes' => array(
            'postView' => array(
                'type' => 'string',
                'default' => 'grid',
            ),
            'order' => array(
                'type' => 'string',
                'default' => 'desc',
            ),
            'orderBy'  => array(
                'type' => 'string',
                'default' => 'date',
            ),
            'category' => array(
                'type' => 'number',
            ),
            'numberOfPosts' => array(
                'type' => 'number',
                'default' => 8,
            ),
            'columns' => array(
                'type' => 'number',
                'default' => 2,
            ),
            'displayFeaturedImage' => array(
                'type' => 'boolean',
                'default' => true,
            ),
            'displayAuthor' => array(
                'type' => 'boolean',
                'default' => true,
            ),
            'displayDate' => array(
                'type' => 'boolean',
                'default' => true,
            ),
            'displayExcerpt' => array(
                'type' => 'boolean',
                'default' => true,
            ),
            'displayReadMore' => array(
                'type' => 'boolean',
                'default' => true,
            ),
        ),
        'render_callback' => 'advgbRenderBlockRecentPosts',
    ));
}

add_action('init', 'advgbRegisterBlockRecentPosts');
