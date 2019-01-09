<?php
defined('ABSPATH') || die;

wp_enqueue_style('minicolors_css');
wp_enqueue_style('advgb_qtip_style');
wp_enqueue_style('codemirror_css');
wp_enqueue_style('codemirror_hint_style');
wp_enqueue_style('advgb_settings_style');

wp_enqueue_script('qtip_js');
wp_enqueue_script('less_js');
wp_enqueue_script('minicolors_js');
wp_enqueue_script('codemirror_js');
wp_enqueue_script('codemirror_hint');
wp_enqueue_script('codemirror_mode_css');
wp_enqueue_script('codemirror_hint_css');
wp_enqueue_script('thickbox');
wp_enqueue_script('advgb_settings_js');

$saved_settings    = get_option('advgb_settings');
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

$gallery_lightbox_checked         = $saved_settings['gallery_lightbox'] ? 'checked' : '';
$gallery_lightbox_caption_checked = $saved_settings['gallery_lightbox_caption'] ? 'checked' : '';
$google_api_key_saved             = isset($saved_settings['google_api_key']) ? $saved_settings['google_api_key'] : '';
$enable_blocks_spacing            = isset($saved_settings['enable_blocks_spacing']) && $saved_settings['enable_blocks_spacing'] ? 'checked' : '';
$blocks_spacing                   = isset($saved_settings['blocks_spacing']) ? $saved_settings['blocks_spacing'] : 0;
$blocks_icon_color                = isset($saved_settings['blocks_icon_color']) ? $saved_settings['blocks_icon_color'] : '#5952de';
$editor_width                     = isset($saved_settings['editor_width']) ? $saved_settings['editor_width'] : '75';
?>

<div id="advgb-settings-container">
    <div class="ju-top-tabs-wrapper">
        <ul class="tabs ju-top-tabs">
            <li class="tab">
                <a href="#config-tab" class="link-tab">
                    <?php esc_html_e('Configuration', 'advanced-gutenberg') ?>
                </a>
            </li>
            <li class="tab">
                <a href="#block-config-tab" class="link-tab">
                    <?php esc_html_e('Default blocks config', 'advanced-gutenberg') ?>
                </a>
            </li>
        </ul>
    </div>

    <?php if (isset($_GET['save_settings'])) : // phpcs:ignore WordPress.Security.NonceVerification.NoNonceVerification -- display message, no action ?>
        <div class="ju-notice-msg ju-notice-success">
            <?php esc_html_e('Settings saved successfully', 'advanced-gutenberg'); ?>
            <i class="dashicons dashicons-dismiss ju-notice-close"></i>
        </div>
    <?php endif; ?>

    <h1 class="advgb-settings-header"><?php esc_html_e('Configuration', 'advanced-gutenberg') ?></h1>

    <div id="config-tab" class="tab-content clearfix" style="display: none;">
        <form method="post">
            <?php wp_nonce_field('advgb_settings_nonce', 'advgb_settings_nonce_field') ?>
            <ul class="settings-list clearfix">
                <li class="ju-settings-option clearfix">
                    <div class="settings-option-wrapper clearfix">
                        <label for="gallery_lightbox"
                               class="ju-setting-label advgb_qtip"
                               data-qtip="<?php esc_attr_e(
                                   'Open gallery images as a lightbox style popup',
                                   'advanced-gutenberg'
                               ) ?>"
                        >
                            <?php esc_html_e('Open galleries in lightbox', 'advanced-gutenberg') ?>
                        </label>
                        <div class="ju-switch-button">
                            <label class="switch">
                                <input type="checkbox" name="gallery_lightbox"
                                       id="gallery_lightbox"
                                       value="1"
                                    <?php echo esc_attr($gallery_lightbox_checked) ?>
                                />
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                </li>
                <li class="ju-settings-option hidden-item clearfix" id="gallery_lightbox_caption_wrapper">
                    <div class="settings-option-wrapper clearfix">
                        <label for="gallery_lightbox_caption"
                               class="ju-setting-label advgb_qtip"
                               data-qtip="<?php esc_attr_e(
                                   'Show images caption in lightbox.',
                                   'advanced-gutenberg'
                               ) ?>"
                        >
                            <?php esc_html_e('Image caption', 'advanced-gutenberg') ?>
                        </label>
                        <div class="ju-switch-button">
                            <label class="switch">
                                <input type="checkbox" name="gallery_lightbox_caption"
                                       id="gallery_lightbox_caption"
                                       value="1"
                                    <?php echo esc_attr($gallery_lightbox_caption_checked) ?>
                                />
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                </li>
                <li class="ju-settings-option full-width clearfix">
                    <div class="settings-option-wrapper clearfix">
                        <label for="google_api_key"
                               class="ju-setting-label advgb_qtip"
                               style="float: none; margin-bottom: 10px"
                               data-qtip="<?php esc_attr_e(
                                   'This API key is required to using Map Block.',
                                   'advanced-gutenberg'
                               ) ?>"
                        >
                            <?php esc_html_e('Google API Key', 'advanced-gutenberg') ?>
                        </label>
                        <span style="display: block; float: none;">
                            <input type="text"
                                   name="google_api_key"
                                   id="google_api_key"
                                   class="ju-input"
                                   style="margin-left: 10px; width: 370px; display: block;"
                                   value="<?php echo esc_html($google_api_key_saved) ?>"
                            >
                            <a target="_blank"
                               href="https://developers.google.com/maps/documentation/javascript/get-api-key"
                               style="display: inline-block; margin: 15px; margin-left: 10px; color: #ff8726;">
                                <?php esc_html_e('How to create a Google API Key', 'advanced-gutenberg') ?>
                            </a>
                        </span>
                    </div>
                </li>

                <li class="ju-settings-option settings-separator">
                    <h2 class="settings-separator-title">
                        <?php esc_html_e('Blocks Settings', 'advanced-gutenberg') ?>
                    </h2>
                </li>

                <li class="ju-settings-option clearfix">
                    <div class="settings-option-wrapper clearfix">
                        <label for="enable_blocks_spacing"
                               class="advgb_qtip ju-setting-label"
                               data-qtip="<?php esc_attr_e(
                                   'Enable block spacing settings',
                                   'advanced-gutenberg'
                               ) ?>"
                        >
                            <?php esc_html_e('Enable blocks spacing', 'advanced-gutenberg') ?>
                        </label>
                        <div class="ju-switch-button">
                            <label class="switch">
                                <input type="checkbox" name="enable_blocks_spacing"
                                       id="enable_blocks_spacing"
                                       value="1"
                                    <?php echo esc_attr($enable_blocks_spacing) ?>
                                />
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                </li>
                <li class="ju-settings-option clearfix hidden-item" id="blocks_spacing_wrapper">
                    <div class="settings-option-wrapper clearfix">
                        <label for="blocks_spacing"
                               class="ju-setting-label advgb_qtip"
                               style="line-height: 50px"
                               data-qtip="<?php esc_attr_e(
                                   'Apply a minimal vertical block spacing automatically. Default is None. Values in pixels',
                                   'advanced-gutenberg'
                               ) ?>"
                        >
                            <?php esc_html_e('Blocks spacing', 'advanced-gutenberg') ?>
                            <span> (px)</span>
                        </label>
                        <span>
                            <input type="number"
                                   min="0"
                                   name="blocks_spacing"
                                   id="blocks_spacing"
                                   class="ju-input"
                                   style="margin-left: 10px; width: 80px"
                                   value="<?php echo esc_html($blocks_spacing) ?>"
                            >
                        </span>
                    </div>
                </li>
                <li class="ju-settings-option clearfix">
                    <div class="settings-option-wrapper clearfix">
                        <label for="blocks_icon_color"
                               class="ju-setting-label advgb_qtip"
                               style="line-height: 50px"
                               data-qtip="<?php esc_attr_e(
                                   'Set color for blocks that added by Advanced Gutenberg',
                                   'advanced-gutenberg'
                               ) ?>"
                        >
                            <?php esc_html_e('Blocks icon color', 'advanced-gutenberg') ?>
                        </label>
                        <span>
                            <input type="text"
                                   name="blocks_icon_color"
                                   id="blocks_icon_color"
                                   class="ju-input"
                                   value="<?php echo esc_html($blocks_icon_color) ?>"/>
                        </span>
                    </div>
                </li>
                <li class="ju-settings-option clearfix">
                    <div class="settings-option-wrapper clearfix">
                        <label for="editor_width"
                               class="ju-setting-label advgb_qtip"
                               style="line-height: 50px"
                               data-qtip="<?php esc_attr_e(
                                   'Define the admin Gutenberg editor width size',
                                   'advanced-gutenberg'
                               ) ?>"
                        >
                            <?php esc_html_e('Editor width', 'advanced-gutenberg') ?>
                        </label>
                        <div>
                            <select class="ju-select-options" name="editor_width" id="editor_width">
                                <option value="" <?php echo $editor_width === '' ? 'selected' : '' ?>>Original</option>
                                <option value="75" <?php echo $editor_width === '75' ? 'selected' : '' ?>>Large</option>
                                <option value="95" <?php echo $editor_width === '95' ? 'selected' : '' ?>>Full width</option>
                            </select>
                        </div>
                    </div>
                </li>
            </ul>

            <div class="save-settings-block">
                <button type="submit"
                        class="ju-button orange-button waves-effect waves-light"
                        id="save-settings"
                        name="save_settings"
                >
                    <span><?php esc_html_e('Save', 'advanced-gutenberg') ?></span>
                </button>
            </div>
        </form>
    </div>

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
                if (isset($block['iconColor'])) :
                    $iconColor = 'style=color:' . $block['iconColor'];
                endif; ?>
            <li class="block-config-item ju-settings-option">
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
