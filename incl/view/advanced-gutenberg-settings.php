<?php
defined('ABSPATH') || die;

wp_enqueue_style('minicolors_css');
wp_enqueue_style('qtip_style');
wp_enqueue_style('codemirror_css');
wp_enqueue_style('codemirror_hint_style');
wp_enqueue_style('settings_style');

wp_enqueue_script('qtip_js');
wp_enqueue_script('less_js');
wp_enqueue_script('minicolors_js');
wp_enqueue_script('codemirror_js');
wp_enqueue_script('codemirror_hint');
wp_enqueue_script('codemirror_mode_css');
wp_enqueue_script('codemirror_hint_css');
wp_enqueue_script('settings_js');

$saved_settings = get_option('advgb_settings');

$gallery_lightbox_checked = $saved_settings['gallery_lightbox'] ? 'checked' : '';
$gallery_lightbox_caption_checked = $saved_settings['gallery_lightbox_caption'] ? 'checked' : '';
$google_api_key_saved = isset($saved_settings['google_api_key']) ? $saved_settings['google_api_key'] : '';
$blocks_spacing = isset($saved_settings['blocks_spacing']) ? $saved_settings['blocks_spacing'] : 0;
$blocks_icon_color = isset($saved_settings['blocks_icon_color']) ? $saved_settings['blocks_icon_color'] : '#000000';

$custom_styles_saved = get_option('advgb_custom_styles', $this::$default_custom_styles);
?>

<div id="advgb-settings-container" style="margin-right: 20px">
    <ul class="tabs ju-top-tabs">
        <li class="tab">
            <a href="#config-tab" class="link-tab waves-effect waves-light">
                <?php esc_html_e('Configuration', 'advanced-gutenberg') ?>
            </a>
        </li>
        <li class="tab">
            <a href="#customstyles-tab" class="link-tab waves-effect waves-light" id="custom-styles-tab">
                <?php esc_html_e('Custom styles', 'advanced-gutenberg') ?>
            </a>
        </li>
    </ul>

    <h1 class="advgb-settings-header"><?php esc_html_e('Configuration', 'advanced-gutenberg') ?></h1>

    <?php if (isset($_GET['save_settings'])) : // phpcs:ignore WordPress.CSRF.NonceVerification.NoNonceVerification -- display message, no action ?>
        <div class="ju-notice-msg ju-notice-success">
            <?php esc_html_e('Settings saved successfully', 'advanced-gutenberg') ?>
            <i class="dashicons dashicons-dismiss ju-notice-close"></i>
        </div>
    <?php endif; ?>

    <div id="config-tab" class="tab-content clearfix" style="display: none;">
        <form method="post">
            <?php wp_nonce_field('advgb_settings_nonce', 'advgb_settings_nonce_field') ?>
            <ul class="settings-list clearfix">
                <li class="ju-settings-option clearfix">
                    <div class="settings-option-wrapper clearfix">
                        <label for="gallery_lightbox"
                               class="ju-setting-label advgb_qtip"
                               alt="<?php esc_attr_e(
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
                               alt="<?php esc_attr_e(
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
                               alt="<?php esc_attr_e(
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
                                   style="margin-left: 10px; width: 370px"
                                   value="<?php echo esc_html($google_api_key_saved) ?>"
                            >
                            <a target="_blank" href="https://support.google.com/googleapi/answer/6158862" style="margin-left: 10px;color:#ff8726">
                                <?php esc_html_e('How to create a Google API Key', 'advanced-gutenberg') ?>
                            </a>
                        </span>
                    </div>
                </li>

                <li class="ju-settings-option settings-separator">
                    <p class="settings-separator-title">
                        <?php esc_html_e('Blocks Settings', 'advanced-gutenberg') ?>
                    </p>
                </li>
                <li class="ju-settings-option clearfix">
                    <div class="settings-option-wrapper clearfix">
                        <label for="blocks_spacing"
                               class="ju-setting-label advgb_qtip"
                               style="line-height: 50px"
                               alt="<?php esc_attr_e(
                                   'Apply a minimal vertical block spacing automatically. Default is None. Values in pixels',
                                   'advanced-gutenberg'
                               ) ?>"
                        >
                            <?php esc_html_e('Blocks spacing', 'advanced-gutenberg') ?>
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
                            <span>px</span>
                        </span>
                    </div>
                </li>
                <li class="ju-settings-option clearfix">
                    <div class="settings-option-wrapper clearfix">
                        <label for="blocks_icon_color"
                               class="ju-setting-label advgb_qtip"
                               style="line-height: 50px"
                               alt="<?php esc_attr_e(
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
                                   class="minicolors minicolors-input ju-input"
                                   value="<?php echo esc_html($blocks_icon_color) ?>" />
                        </span>
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

    <div id="customstyles-tab" class="tab-content clearfix" style="display: none;">
        <div class="col-sm-3" id="advgb-customstyles-list">
            <div id="mybootstrap">
                <ul class="advgb-customstyles-list">
                    <?php
                    $content = '';
                    foreach ($custom_styles_saved as $customStyles) {
                        $content .= '<li class="advgb-customstyles-items" data-id-customstyle="'.(int)$customStyles['id'].'">';
                        $content .= '<a><i class="title-icon" style="background-color: '. $customStyles['identifyColor'] .'"></i><span class="advgb-customstyles-items-title">'.esc_html($customStyles['title']).'</span></a>';
                        $content .= '<a class="copy" title="'. __('Copy', 'advanced-gutenberg') .'"><i class="mi mi-content-copy"></i></a>';
                        $content .= '<a class="trash" title="'. __('Delete', 'advanced-gutenberg') .'"><i class="mi mi-delete"></i></a>';
                        $content .= '<ul style="margin-left: 30px"><li class="advgb-customstyles-items-class">('.esc_html($customStyles['name']).')</li></ul>';
                        $content .= '</li>';
                    }
                    $content .= '<li><a class="advgb-customstyles-new"><i class="mi mi-add"></i>'.esc_html__('Add new class', 'advanced-gutenberg').'</a></li>';

                    echo $content; // phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped -- already escaped
                    ?>
                </ul>
                <span id="savedInfo" style="display:none;">
                    <?php esc_html_e('All modifications were saved!', 'advanced-gutenberg') ?>
                </span>
            </div>
        </div>

        <div class="col-sm-5" id="advgb-customstyles-info">
            <div class="control-group">
                <label for="advgb-customstyles-title">
                    <?php esc_html_e('Style title', 'advanced-gutenberg') ?>
                </label>
                <input type="text" class="ju-input" name="customstyles-title" id="advgb-customstyles-title" value="" />
            </div>
            <div class="control-group">
                <label for="advgb-customstyles-classname">
                    <?php esc_html_e('Style class', 'advanced-gutenberg') ?>
                </label>
                <input type="text" class="ju-input" name="customstyles-classname" id="advgb-customstyles-classname" value="" />
            </div>
            <div id="identify-colors" class="control-group clearfix">
                <div class="control-label">
                    <label for="advgb-customstyles-identify-color"
                           class="advgb_qtip"
                           alt="<?php esc_attr_e(
                               'This option help you identify specific custom styles in the list
                                (usually set this same as the custom style\'s background color)',
                               'advanced-gutenberg'
                           ) ?>"
                    >
                        <?php esc_html_e('Identification color', 'advanced-gutenberg') ?>
                    </label>
                </div>
                <div class="controls">
                    <input type="text"
                           name="customstyles-identify-color"
                           id="advgb-customstyles-identify-color"
                           class="minicolors minicolors-input ju-input"
                           value="#000000" />
                </div>
            </div>
            <div class="control-group advgb-customstyles-css">
                <label for="advgb-customstyles-css">
                    <?php esc_html_e('Custom CSS', 'advanced-gutenberg') ?>
                </label>
                <textarea name="customstyles-css" id="advgb-customstyles-css"></textarea>
            </div>
            <div id="css-tips" style="border-top: 1px solid #ccc; margin-top: -25px;">
                <small><?php esc_html_e('Hint: Use "Ctrl + Space" for auto completion', 'advanced-gutenberg') ?></small>
            </div>
            <div class="col-sm-12" style="text-align: center; margin-top: 30px">
                <form method="POST">
                    <?php wp_nonce_field('advgb_cstyles_nonce', 'advgb_cstyles_nonce_field'); ?>
                    <button class="ju-button orange-button waves-effect waves-light"
                            style="margin: 10px auto"
                            type="submit"
                            id="save_custom_styles"
                            name="save_custom_styles"
                            value="1"
                    >
                        <span><?php esc_html_e('Save styles', 'advanced-gutenberg') ?></span>
                    </button>
                </form>
            </div>
        </div>
        <div class="col-sm-4" id="advgb-customstyles-preview">
            <p class="preview-title"><?php esc_html_e('Preview', 'advanced-gutenberg'); ?></p>
            <p class="previous-block" style="margin-bottom: 20px; margin-top: 10px;">
                <?php esc_html_e('Previous Paragraph Previous Paragraph Previous Paragraph Previous Paragraph Previous Paragraph', 'advanced-gutenberg') ?>
            </p>
            <div class="advgb-customstyles-target"><?php esc_html_e('Example of text', 'advanced-gutenberg') ?></div>
            <p class="follow-block">
                <?php esc_html_e('Following Paragraph Following Paragraph  Following Paragraph Following Paragraph Following Paragraph', 'advanced-gutenberg') ?>
            </p>
        </div>
    </div>
</div>
