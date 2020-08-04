<?php
defined('ABSPATH') || die;
?>

<div class="advgb-header" style="padding-top: 40px">
    <h1 class="header-title"><?php esc_html_e('Translation', 'advanced-gutenberg') ?></h1>
</div>

<div class="notice notice-info">
    <p><?php _e('The JU Translation system has been removed, however we continue translating Advanced Gutenberg into your language by using native .mo and .po files located at Advanced Gutenberg plugin\'s languages/ folder.', 'advanced-gutenberg'); ?></p>
    <p><?php _e('Please note if you created translation overrides while using version 2.3.11 and older, these are still working.', 'advanced-gutenberg'); ?></p>
    <p><?php echo sprintf(
            __('If you have any question, please send us a message through %1$sour contact page%2$s.', 'advanced-gutenberg'),
            '<a href="' . esc_url('https://advancedgutenberg.com/contact/') . '" target="_blank">',
            '</a>'
        ); ?></p>
</div>