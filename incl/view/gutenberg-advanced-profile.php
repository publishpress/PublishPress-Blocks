<?php
defined('ABSPATH') or die;

$all_blocks_list     = get_option('gbadv_blocks_list');
$all_categories_list = get_option('gbadv_categories_list');

$postid              = get_the_ID();
$active_blocks_saved = get_post_meta($postid, 'active_blocks', true);
$active_blocks_saved = $active_blocks_saved ? $active_blocks_saved : self::$default_active_blocks;

wp_nonce_field('gbadv_nonce', 'gbadv_nonce_field')
?>

<div id="profiles-container">
    <!--Tabs-->
    <ul class="tabs cyan z-depth-1">
        <li class="tab">
            <a href="#blocks-list-tab" class="link-tab white-text waves-effect waves-light">
                <?php _e('Blocks List', 'gutenberg-advanced') ?>
            </a>
        </li>
        <li class="tab">
            <a href="#users-tab" class="link-tab white-text waves-effect waves-light">
                <?php _e('Profile Attribution', 'gutenberg-advanced') ?>
            </a>
        </li>
    </ul>

    <!--Blocks list tab-->
    <div id="blocks-list-tab" class="tab-content">
        <div class="update-block-list">
            <button type="button" id="update-list-btn"
                    class="cyan white-text material-btn"
                    <?php if ($updating) echo 'disabled' ?>
                    title="<?php _e('Update the blocks list', 'gutenberg-advanced') ?>">
                <i class="dashicons dashicons-update <?php if ($updating) echo 'rotating' ?>"></i>
                <span>
                    <?php if ($updating) {
                        _e('Still updating... Please wait a bit...', 'gutenberg-advanced');
                    } else {
                        _e('Update list', 'gutenberg-advanced');
                    } ?>
                </span>
            </button>
        </div>
        <div class="blocks-section">
            <?php foreach ($all_categories_list as $category) : ?>
                <div class="category-block clearfix" data-category="<?php echo $category['slug'] ?>">
                    <h3 class="category-name"><?php echo $category['title'] ?></h3>
                    <ul class="blocks-list">
                        <?php foreach ($all_blocks_list as $block) : ?>
                            <?php if ($block['category'] != $category['slug'])  continue; ?>
                            <?php $block_id = strtolower(str_replace(' ', '', $block['title'])) ?>
                            <li class="block-item" data-type="<?php echo $block['name'] ?>">
                                <label for="block-<?php echo $block_id ?>" class="switch-label">
                                    <i class="dashicons dashicons-<?php echo $block['icon'] ?>"></i>
                                    <span class="block-title"><?php echo $block['title'] ?></span>
                                </label>
                                <div class="switch-btn">
                                    <label class="switch">
                                        <input type="checkbox" name="active_blocks[]"
                                               id="block-<?php echo $block_id ?>"
                                               value="<?php echo $block['name']; ?>"
                                               <?php if ($active_blocks_saved == 'all' || in_array($block['name'], $active_blocks_saved)) echo 'checked' ?>/>
                                        <div class="slider round"></div>
                                    </label>
                                </div>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endforeach; ?>
        </div>
    </div>

    <!--Users access tab-->
    <div id="users-tab" class="tab-content">

    </div>

    <!--Save button-->
    <div class="save-settings-block waves-effect waves-light">
        <input
                type="button"
                class="cyan white-text material-btn"
                id="save-gbadv-profile"
                value="<?php _e('Save', 'gutenberg-advanced') ?>"/>
    </div>
</div>