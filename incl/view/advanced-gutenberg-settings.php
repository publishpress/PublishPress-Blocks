<?php
defined('ABSPATH') or die;

$saved_settings = get_option('advgb_settings');

$gallery_lightbox_checked = $saved_settings['gallery_lightbox'] ? 'checked' : '';
$gallery_lightbox_caption_checked = $saved_settings['gallery_lightbox_caption'] ? 'checked' : '';

$custom_styles_saved = get_option('advgb_custom_styles', $this::$default_custom_styles);
?>
<h1><?php _e('Advanced Gutenberg Settings', 'advanced-gutenberg') ?></h1>

<?php if (isset($_GET['save'])) : ?>
<div id="advgb-config-success">
    <?php _e('Settings saved successfully', 'advanced-gutenberg') ?>
    <i class="dashicons dashicons-dismiss" id="advgb-config-close"></i>
</div>
<?php endif; ?>

<div id="advgb-settings-container" style="margin-right: 20px">
    <ul class="tabs cyan z-depth-1">
        <li class="tab">
            <a href="#config-tab" class="link-tab white-text waves-effect waves-light">
                <?php _e('Configuration', 'advanced-gutenberg') ?>
            </a>
        </li>
        <li class="tab">
            <a href="#customstyles-tab" class="link-tab white-text waves-effect waves-light" id="custom-styles-tab">
                <?php _e('Custom styles', 'advanced-gutenberg') ?>
            </a>
        </li>
        <li class="tab">
            <a href="#translation-tab" class="link-tab white-text waves-effect waves-light">
                <?php _e('Translation tools', 'advanced-gutenberg') ?>
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
                               alt="<?php _e(
                                   'Open gallery images as a lightbox style popup',
                                   'advanced-gutenberg'
                               ) ?>"
                        >
                            <?php _e('Open galleries in lightbox', 'advanced-gutenberg') ?>
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
                               alt="<?php _e(
                                   'Show images caption in lightbox.',
                                   'advanced-gutenberg'
                               ) ?>"
                        >
                            <?php _e('Image caption', 'advanced-gutenberg') ?>
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
                    <?php _e('Save', 'advanced-gutenberg') ?>
                </button>
            </div>
        </form>
    </div>

    <div id="customstyles-tab" class="tab-content clearfix" style="display: none;">
        <div class="col-sm-2" id="advgb-customstyles-list">
            <h3 style="margin: 0; padding: 5px 0 10px 0;">
                <?php _e('Custom styles', 'advanced-gutenberg') ?>
            </h3>
            <div id="mybootstrap">
                <ul class="advgb-customstyles-list">
                    <?php
                    $content = '';
                    foreach ($custom_styles_saved as $customStyles) {
                        $content .= '<li class="advgb-customstyles-items" data-id-customstyle="'.$customStyles['id'].'">';
                        $content .= '<a><i class="advgbicon-quill"></i><span class="advgb-customstyles-items-title">'.esc_html($customStyles['title']).'</span></a>';
                        $content .= '<a class="copy"><i class="advgbicon-copy"></i></a>';
                        $content .= '<a class="trash"><i class="advgbicon-trash"></i></a>';
                        $content .= '<ul style="margin-left: 30px"><li class="advgb-customstyles-items-class">('.esc_html($customStyles['name']).')</li></ul>';
                        $content .= '</li>';
                    }
                    $content .= '<li><a class="advgb-customstyles-new"><i class="advgbicon-plus"></i>'.__("Add new class", 'advanced-gutenberg').'</a></li>';

                    echo $content;
                    ?>
                </ul>
                <span id="savedInfo" style="display:none;">
                    <?php _e('All modifications were saved!', 'advanced-gutenberg') ?>
                </span>
            </div>
        </div>

        <div class="col-sm-5" id="advgb-customstyles-info">
            <div class="advgb-customstyles-title">
                <label for="advgb-customstyles-title"><?php _e('Style title', 'advanced-gutenberg') ?></label>
                <input type="text" name="customstyles-title" id="advgb-customstyles-title" value="" />
            </div>
            <div class="advgb-customstyles-classname">
                <label for="advgb-customstyles-classname"><?php _e('Style class', 'advanced-gutenberg') ?></label>
                <input type="text" name="customstyles-classname" id="advgb-customstyles-classname" value="" />
            </div>
            <div class="advgb-customstyles-css">
                <label for="advgb-customstyles-css"><?php _e('Custom CSS', 'advanced-gutenberg') ?></label>
                <textarea name="customstyles-css" id="advgb-customstyles-css"></textarea>
            </div>
            <div id="css-tips" style="border-top: 1px solid #ccc">
                <small><?php _e('Hint: Use "Ctrl + Space" for auto completion', 'advanced-gutenberg') ?></small>
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
                        <?php _e('Save styles', 'advanced-gutenberg') ?>
                    </button>
                </form>
            </div>
        </div>
        <div class="col-sm-5" id="advgb-customstyles-preview">
            <p class="previous-block" style="margin-bottom: 20px"><?php _e('Previous Paragraph Previous Paragraph Previous Paragraph Previous Paragraph Previous Paragraph', 'advanced-gutenberg') ?></p>
            <div class="advgb-customstyles-target"><?php _e('Example of text', 'advanced-gutenberg') ?></div>
            <p class="follow-block"><?php _e('Following Paragraph Following Paragraph  Following Paragraph Following Paragraph Following Paragraph', 'advanced-gutenberg') ?></p>
        </div>
    </div>

    <div id="translation-tab" class="tab-content clearfix" style="display: none;">
        <?php echo \Joomunited\advgb\Jutranslation\Jutranslation::getInput(); ?>
    </div>
</div>
