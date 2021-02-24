<?php
defined('ABSPATH') || die;

wp_enqueue_style('minicolors_css');
wp_enqueue_style('advgb_qtip_style');
wp_enqueue_style('codemirror_css');
wp_enqueue_style('codemirror_hint_style');
wp_enqueue_style('advgb_settings_style');

wp_enqueue_media();
wp_enqueue_script('qtip_js');
wp_enqueue_script('less_js');
wp_enqueue_script('minicolors_js');
wp_enqueue_script('advgb_codemirror_js');
wp_enqueue_script('codemirror_hint');
wp_enqueue_script('codemirror_mode_css');
wp_enqueue_script('codemirror_hint_css');
wp_enqueue_script('advgb_settings_js');

// ThickBox JS and CSS
add_thickbox();

$blocks_list_saved = get_option('advgb_blocks_list');
$advgb_blocks      = array();

if (gettype($blocks_list_saved) === 'array') {
    foreach ($blocks_list_saved as $block) {
        if (strpos($block['name'], 'advgb/') === false) {
            continue;
        } else {
            $block['icon'] = htmlentities($block['icon']);
            array_push($advgb_blocks, $block);
        }
    }
}

/**
 * Sort array
 *
 * @param string $key Array key to sort
 *
 * @return Closure
 */
function sortBy($key)
{
    return function ($a, $b) use ($key) {
        return strnatcmp($a[$key], $b[$key]);
    };
}

usort($advgb_blocks, sortBy('title'));
$excluded_blocks_config = array(
    'advgb/container',
    'advgb/accordion-item',
    'advgb/accordion',
    'advgb/tabs',
    'advgb/tab',
);
?>

<div id="advgb-settings-container">

    <h1 class="advgb-settings-header"><?php esc_html_e('Default Block Settings', 'advanced-gutenberg') ?></h1>

    <div id="block-config-tab" class="tab-content clearfix">
        <div class="advgb-search-wrapper">
            <input type="text"
                   class="advgb-search-input blocks-config-search"
                   placeholder="<?php esc_html_e('Search blocks', 'advanced-gutenberg') ?>"
            >
            <i class="mi mi-search"></i>
        </div>
        <ul class="blocks-config-list clearfix">
            <?php foreach ($advgb_blocks as $block) : ?>
                <?php $iconColor = '';
                if (in_array($block['name'], $excluded_blocks_config)) {
                    continue;
                }
                if (isset($block['iconColor'])) :
                    $iconColor = 'style=color:' . $block['iconColor'];
                endif; ?>
            <li class="block-config-item ju-settings-option" title="<?php echo esc_attr($block['title']); ?>">
                <span class="block-icon" <?php echo esc_attr($iconColor) ?>>
                    <?php echo html_entity_decode(html_entity_decode(stripslashes($block['icon']))); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- already escaped ?>
                </span>
                <span class="block-title"><?php echo esc_html($block['title']); ?></span>
                <i class="mi mi-settings block-config-button"
                   title="<?php esc_html_e('Edit', 'advanced-gutenberg') ?>"
                   data-block="<?php echo esc_attr($block['name']); ?>"
                ></i>
            </li>
            <?php endforeach; ?>
        </ul>

        <?php if (count($advgb_blocks) === 0) : ?>
            <div class="blocks-not-loaded" style="text-align: center">
                <p><?php esc_html_e('We are updating blocks list...', 'advanced-gutenberg'); ?></p>
            </div>
        <?php endif; ?>
    </div>
</div>
