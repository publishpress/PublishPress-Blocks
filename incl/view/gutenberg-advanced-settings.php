<?php
defined('ABSPATH') or die;

$saved_settings = get_option('gbadv_settings');

$gallery_lightbox_checked = $saved_settings['gallery_lightbox'] ? 'checked' : '';
$gallery_lightbox_title_checked = $saved_settings['gallery_lightbox_title'] ? 'checked' : '';
?>
<h1><?php _e('Gutenberg Advanced Settings', 'gutenberg-advanced') ?></h1>

<?php if (isset($_GET['save'])) : ?>
<div id="gbadv-config-success">
    <?php _e('Settings saved successfully', 'gutenberg-advanced') ?>
    <i class="dashicons dashicons-dismiss" id="gbadv-config-close"></i>
</div>
<?php endif; ?>

<div id="gbadv-settings-container" style="margin-right: 20px">
    <ul class="tabs cyan z-depth-1">
        <li class="tab">
            <a href="#config-tab" class="link-tab white-text waves-effect waves-light">
                <?php _e('Configuration', 'gutenberg-advanced') ?>
            </a>
        </li>
        <li class="tab">
            <a href="#translation-tab" class="link-tab white-text waves-effect waves-light">
                <?php _e('Translation tools', 'gutenberg-advanced') ?>
            </a>
        </li>
    </ul>

    <div id="config-tab" class="tab-content">
        <form method="post">
            <?php wp_nonce_field('gbadv_settings_nonce', 'gbadv_settings_nonce_field') ?>
            <ul class="settings-list">
                <li class="settings-option">
                    <div class="settings-option-wrapper">
                        <label for="gallery_lightbox"
                               class="switch-label gbadv_qtip"
                               alt="<?php _e(
                                   'Open galleries images in a popup lightbox.',
                                   'gutenberg-advanced'
                               ) ?>"
                        >
                            <?php _e('Open galleries in lightbox', 'gutenberg-advanced') ?>
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
                    <ul class="settings-list hidden-item" id="gallery_lightbox_title_wrapper">
                        <li class="settings-option">
                            <div class="settings-option-wrapper">
                                <label for="gallery_lightbox_title"
                                       class="switch-label gbadv_qtip"
                                       alt="<?php _e(
                                           'Load images title as caption for lightbox images.',
                                           'gutenberg-advanced'
                                       ) ?>"
                                >
                                    <?php _e('Image title', 'gutenberg-advanced') ?>
                                </label>
                                <div class="switch-btn">
                                    <label class="switch">
                                        <input type="checkbox" name="gallery_lightbox_title"
                                               id="gallery_lightbox_title"
                                               value="1"
                                            <?php echo esc_attr($gallery_lightbox_title_checked) ?>
                                        />
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>

            <div class="save-settings-block">
                <button type="submit"
                        class="cyan white-text waves-effect waves-light material-btn"
                        id="save-settings"
                        name="save_settings"
                >
                    <?php _e('Save', 'gutenberg-advanced') ?>
                </button>
            </div>
        </form>
    </div>

    <div id="translation-tab" class="tab-content">
        <?php echo \Joomunited\GBADV\Jutranslation\Jutranslation::getInput(); ?>
    </div>
</div>
