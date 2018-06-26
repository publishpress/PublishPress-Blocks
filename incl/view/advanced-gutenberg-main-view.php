<?php
defined('ABSPATH') || die;

$tabs_data = array(
    array(
        'id' => 'profiles',
        'title' => __('Profiles', 'advanced-gutenberg'),
        'icon' => 'account-circle',
    ),
    array(
        'id' => 'settings',
        'title' => __('Configuration', 'advanced-gutenberg'),
        'icon' => 'settings',
    ),
    array(
        'id' => 'translation',
        'title' => __('Translation', 'advanced-gutenberg'),
        'icon' => 'text-format',
    ),
);
?>

<div id="advgb-main-wrapper">
    <div id="advgb-left-panel">
        <div class="advgb-logo">
            <a href="https://www.joomunited.com/" target="_blank">
                <img src="<?php echo esc_url(plugins_url('assets/images/logo-joomUnited-white.png', dirname(dirname(__FILE__)))) ?>"
                     alt="<?php esc_html_e('JoomUnited logo', 'advanced-gutenberg') ?>">
            </a>
        </div>
        <div class="advgb-menu-search">
            <i class="mi mi-search"></i>
            <input type="text" class="advgb-menu-search-input"
                   placeholder="<?php esc_html_e('Search settings', 'advanced-gutenberg') ?>"
            >
        </div>
        <ul class="tabs menu-tabs">
            <?php foreach ($tabs_data as $tab) : ?>
                <li class="tab" data-tab-title="<?php echo esc_attr($tab['title']) ?>">
                    <a href="#<?php echo esc_attr($tab['id']) ?>"
                       class="link-tab white-text waves-effect waves-light"
                    >
                        <i class="mi mi-<?php echo esc_attr($tab['icon']) ?> menu-tab-icon"></i>
                        <span class="tab-title"><?php echo esc_html($tab['title']) ?></span>
                    </a>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
    <div id="advgb-right-panel">
        <?php foreach ($tabs_data as $tab) : ?>
        <?php if ($tab['id'] === 'translation') continue; // phpcs:ignore Generic.ControlStructures.InlineControlStructure.NotAllowed -- inline is ok ?>
            <div class="advgb-content-wrapper" id="<?php echo esc_attr($tab['id']) ?>" style="display: none">
                <?php $this->loadView($tab['id']) ?>
            </div>
        <?php endforeach; ?>

        <div id="translation" class="advgb-content-wrapper" style="display: none">
            <?php echo \Joomunited\advgb\Jutranslation\Jutranslation::getInput(); // phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped -- already escaped ?>
        </div>
    </div>
</div>