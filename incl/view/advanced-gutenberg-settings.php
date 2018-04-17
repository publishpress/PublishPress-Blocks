<?php
defined('ABSPATH') || die;

$saved_settings = get_option('advgb_settings');

$gallery_lightbox_checked = $saved_settings['gallery_lightbox'] ? 'checked' : '';
$gallery_lightbox_caption_checked = $saved_settings['gallery_lightbox_caption'] ? 'checked' : '';

$custom_styles_saved = get_option('advgb_custom_styles', $this::$default_custom_styles);
?>
<h1><?php esc_html_e('Advanced Gutenberg Settings', 'advanced-gutenberg') ?></h1>

<?php if (isset($_GET['save'])) : // phpcs:ignore -- display message, no action ?>
<div id="advgb-config-success">
    <?php esc_html_e('Settings saved successfully', 'advanced-gutenberg') ?>
    <i class="dashicons dashicons-dismiss" id="advgb-config-close"></i>
</div>
<?php endif; ?>

<div id="advgb-settings-container" style="margin-right: 20px">
    <ul class="tabs cyan z-depth-1">
        <li class="tab">
            <a href="#config-tab" class="link-tab white-text waves-effect waves-light">
                <?php esc_html_e('Configuration', 'advanced-gutenberg') ?>
            </a>
        </li>
        <li class="tab">
            <a href="#customstyles-tab" class="link-tab white-text waves-effect waves-light" id="custom-styles-tab">
                <?php esc_html_e('Custom styles', 'advanced-gutenberg') ?>
            </a>
        </li>
        <li class="tab">
            <a href="#translation-tab" class="link-tab white-text waves-effect waves-light">
                <?php esc_html_e('Translation tools', 'advanced-gutenberg') ?>
            </a>
        </li>
    </ul>

    <div id="config-tab" class="tab-content clearfix" style="display: none;">
        <form method="post">
            <?php wp_nonce_field('advgb_settings_nonce', 'advgb_settings_nonce_field') ?>
            <ul class="settings-list">
                <li class="settings-option">
                    <div class="settings-option-wrapper">
                        <label for="gallery_lightbox"
                               class="switch-label advgb_qtip"
                               alt="<?php esc_attr_e(
                                   'Open gallery images as a lightbox style popup',
                                   'advanced-gutenberg'
                               ) ?>"
                        >
                            <?php esc_html_e('Open galleries in lightbox', 'advanced-gutenberg') ?>
                        </label>
                        <div class="switch-btn">
                            <label class="switch">
                                <input type="checkbox" name="gallery_lightbox"
                                       id="gallery_lightbox"
                                       value="1"
                                    <?php echo esc_attr($gallery_lightbox_checked) ?>
                                />
                                <span class="slider round"></span>
                            </label>
                        </div>
                    </div>
                </li>
                <li class="settings-option hidden-item" id="gallery_lightbox_caption_wrapper">
                    <div class="settings-option-wrapper">
                        <label for="gallery_lightbox_caption"
                               class="switch-label advgb_qtip"
                               alt="<?php esc_attr_e(
                                   'Show images caption in lightbox.',
                                   'advanced-gutenberg'
                               ) ?>"
                        >
                            <?php esc_html_e('Image caption', 'advanced-gutenberg') ?>
                        </label>
                        <div class="switch-btn">
                            <label class="switch">
                                <input type="checkbox" name="gallery_lightbox_caption"
                                       id="gallery_lightbox_caption"
                                       value="1"
                                    <?php echo esc_attr($gallery_lightbox_caption_checked) ?>
                                />
                                <span class="slider round"></span>
                            </label>
                        </div>
                    </div>
                </li>
            </ul>

            <div class="save-settings-block">
                <button type="submit"
                        class="cyan white-text waves-effect waves-light material-btn"
                        id="save-settings"
                        name="save_settings"
                >
                    <?php esc_html_e('Save', 'advanced-gutenberg') ?>
                </button>
            </div>
        </form>
    </div>

    <div id="customstyles-tab" class="tab-content clearfix" style="display: none;">
        <div class="col-sm-2" id="advgb-customstyles-list">
            <h3 style="margin: 0; padding: 5px 0 10px 0;">
                <?php esc_html_e('Custom styles', 'advanced-gutenberg') ?>
            </h3>
            <div id="mybootstrap">
                <ul class="advgb-customstyles-list">
                    <?php
                    $content = '';
                    foreach ($custom_styles_saved as $customStyles) {
                        $content .= '<li class="advgb-customstyles-items" data-id-customstyle="'.(int)$customStyles['id'].'">';
                        $content .= '<a><i class="advgbicon-quill"></i><span class="advgb-customstyles-items-title">'.esc_html($customStyles['title']).'</span></a>';
                        $content .= '<a class="copy"><i class="advgbicon-copy"></i></a>';
                        $content .= '<a class="trash"><i class="advgbicon-trash"></i></a>';
                        $content .= '<ul style="margin-left: 30px"><li class="advgb-customstyles-items-class">('.esc_html($customStyles['name']).')</li></ul>';
                        $content .= '</li>';
                    }
                    $content .= '<li><a class="advgb-customstyles-new"><i class="advgbicon-plus"></i>'.esc_html__('Add new class', 'advanced-gutenberg').'</a></li>';

                    echo $content; // phpcs:ignore -- already escaped
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
                <input type="text" name="customstyles-title" id="advgb-customstyles-title" value="" />
            </div>
            <div class="control-group">
                <label for="advgb-customstyles-classname">
                    <?php esc_html_e('Style class', 'advanced-gutenberg') ?>
                </label>
                <input type="text" name="customstyles-classname" id="advgb-customstyles-classname" value="" />
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
                           class="minicolors minicolors-input"
                           value="#000000" />
                </div>
            </div>
            <div class="control-group advgb-customstyles-css">
                <label for="advgb-customstyles-css">
                    <?php esc_html_e('Custom CSS', 'advanced-gutenberg') ?>
                </label>
                <textarea name="customstyles-css" id="advgb-customstyles-css"></textarea>
            </div>
            <div id="css-tips" style="border-top: 1px solid #ccc">
                <small><?php esc_html_e('Hint: Use "Ctrl + Space" for auto completion', 'advanced-gutenberg') ?></small>
            </div>
            <div class="col-sm-12" style="text-align: center">
                <form method="POST">
                    <?php wp_nonce_field('advgb_cstyles_nonce', 'advgb_cstyles_nonce_field'); ?>
                    <button class="cyan white-text waves-effect waves-light material-btn"
                            style="margin: 10px auto"
                            type="submit"
                            id="save_custom_styles"
                            name="save_custom_styles"
                            value="1"
                    >
                        <?php esc_html_e('Save styles', 'advanced-gutenberg') ?>
                    </button>
                </form>
            </div>
        </div>
        <div class="col-sm-5" id="advgb-customstyles-preview">
            <p class="previous-block" style="margin-bottom: 20px; margin-top: 10px;">
                <?php esc_html_e('Previous Paragraph Previous Paragraph Previous Paragraph Previous Paragraph Previous Paragraph', 'advanced-gutenberg') ?>
            </p>
            <div class="advgb-customstyles-target"><?php esc_html_e('Example of text', 'advanced-gutenberg') ?></div>
            <p class="follow-block">
                <?php esc_html_e('Following Paragraph Following Paragraph  Following Paragraph Following Paragraph Following Paragraph', 'advanced-gutenberg') ?>
            </p>
        </div>
    </div>

    <div id="translation-tab" class="tab-content clearfix" style="display: none;">
        <?php echo \Joomunited\advgb\Jutranslation\Jutranslation::getInput(); // phpcs:ignore -- already escaped ?>
    </div>
</div>
