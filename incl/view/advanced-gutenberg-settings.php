<?php
defined('ABSPATH') or die;

$saved_settings = get_option('advgb_settings');

$gallery_lightbox_checked = $saved_settings['gallery_lightbox'] ? 'checked' : '';
$gallery_lightbox_caption_checked = $saved_settings['gallery_lightbox_caption'] ? 'checked' : '';
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
            <a href="#translation-tab" class="link-tab white-text waves-effect waves-light">
                <?php _e('Translation tools', 'advanced-gutenberg') ?>
            </a>
        </li>
    </ul>

    <div id="config-tab" class="tab-content">
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
                <li class="settings-option" id="gallery_lightbox_caption_wrapper">
                    <div class="settings-option-wrapper">
                        <label for="gallery_lightbox_caption"
                               class="switch-label advgb_qtip"
                               alt="<?php _e(
                                   'Load images (alt) attribute as caption for lightbox images.',
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

    <div id="translation-tab" class="tab-content">
        <?php echo \Joomunited\advgb\Jutranslation\Jutranslation::getInput(); ?>
    </div>
</div>
