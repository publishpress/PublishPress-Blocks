<?php
defined('ABSPATH') or die;

?>
<h1><?php _e('Gutenberg Advanced Settings', 'gutenberg-advanced') ?></h1>

<div id="gbadv-settings-container">
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
            <?php wp_nonce_field('gbadv_settings_nonce', 'gbadv_settings_nonce') ?>
            <ul class="settings-list">
                <li class="settings-option">
                    <div class="settings-option-wrapper">
                        <label for="gallery_lightbox" class="switch-label">
                            <?php _e('Open galleries in lightbox', 'gutenberg-advanced') ?>
                        </label>
                        <div class="switch-btn">
                            <label class="switch">
                                <input type="checkbox" name="gallery_lightbox"
                                       id="gallery_lightbox"
                                       value="1" />
                                <span class="slider round"></span>
                            </label>
                        </div>
                    </div>
                    <ul class="settings-list item-hidden" id="gallery_lightbox_title_wrapper">
                        <li class="settings-option">
                            <div class="settings-option-wrapper">
                                <label for="gallery_lightbox_title" class="switch-label">
                                    <?php _e('Image title', 'gutenberg-advanced') ?>
                                </label>
                                <div class="switch-btn">
                                    <label class="switch">
                                        <input type="checkbox" name="gallery_lightbox_title"
                                               id="gallery_lightbox_title"
                                               value="1" />
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>

            <div class="save-settings-block">
                <button type="submit" class="cyan white-text waves-effect waves-light material-btn" id="save-settings">
                    <?php _e('Save', 'gutenberg-advanced') ?>
                </button>
            </div>
        </form>
    </div>

    <div id="translation-tab" class="tab-content">
        <?php echo \Joomunited\GBADV\Jutranslation\Jutranslation::getInput(); ?>
    </div>
</div>
