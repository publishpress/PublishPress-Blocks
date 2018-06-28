<?php
defined('ABSPATH') || die;

if (isset($_GET['view']) && $_GET['view'] === 'profile') { // phpcs:ignore WordPress.CSRF.NonceVerification.NoNonceVerification -- view only
    $this->loadView('profile');
    return false;
}

wp_enqueue_style(
    'profiles_styles',
    plugins_url('assets/css/profiles.css', ADVANCED_GUTENBERG_PLUGIN)
);
wp_enqueue_script(
    'profiles_js',
    plugins_url('assets/js/profiles.js', ADVANCED_GUTENBERG_PLUGIN)
);

$args     = array(
    'post_type' => 'advgb_profiles',
    'publish'   => true,
    'orderby'   => 'date',
    'order'     => 'desc'
);
$profiles = get_posts($args);

?>

<div class="advgb-header">
    <h1 class="header-title"><?php esc_html_e('Advanced Gutenberg Profiles', 'advanced-gutenberg') ?></h1>
    <div class="inline-button-wrapper">
        <button class="advgb-menu-button">
            <a href="">
                <i class="mi mi-add"></i>
                <span><?php esc_html_e('New Profile', 'advanced-gutenberg') ?></span>
            </a>
        </button>
    </div>
</div>
<div class="profiles-list-wrapper">
    <div class="advgb-search-wrapper">
        <input type="text" class="profiles-search-input advgb-search-input"
               placeholder="<?php esc_html_e('Search profiles by title or author', 'advanced-gutenberg') ?>"
        >
        <i class="mi mi-search"></i>
    </div>
    <table id="profiles-list">
        <thead>
            <tr>
                <th class="profile-header-title sorting-header" data-sort="title">
                    <span>
                        <span><?php esc_html_e('Title', 'advanced-gutenberg') ?></span>
                        <i class="dashicons"></i>
                    </span>
                </th>
                <th class="profile-header-author sorting-header" data-sort="author">
                    <span>
                        <span><?php esc_html_e('Author', 'advanced-gutenberg') ?></span>
                        <i class="dashicons"></i>
                    </span>
                </th>
                <th class="profile-header-date sorting-header" data-sort="date">
                    <span>
                        <span><?php esc_html_e('Date', 'advanced-gutenberg') ?></span>
                        <i class="dashicons"></i>
                    </span>
                </th>
            </tr>
        </thead>
        <tbody>
        <?php if (count($profiles) > 0) : ?>
            <?php foreach ($profiles as $profile) : ?>
                <tr class="advgb-profile">
                    <td class="profile-title">
                        <a href="<?php echo esc_html(admin_url('admin.php?page=advgb_main&view=profile&id='.$profile->ID)) ?>">
                            <?php echo esc_html($profile->post_title) ?>
                        </a>
                        <i class="mi mi-delete-forever profile-delete"
                           title="<?php esc_attr_e('Delete', 'advanced-gutenberg') ?>"
                           data-profile-id="<?php echo esc_html($profile->ID) ?>">
                        </i>
                    </td>
                    <td class="profile-author"><?php the_author_meta('display_name', $profile->post_author) ?></td>
                    <td class="profile-date"><?php echo get_the_date('Y-m-d H:i', $profile->ID) ?></td>
                </tr>
            <?php endforeach; ?>
        <?php else : ?>
            <tr>
                <td colspan="3" class="advgb-no-profiles">
                    <?php esc_html_e('No profiles found.', 'advanced-gutenberg') ?>
                </td>
            </tr>
        <?php endif; ?>
        </tbody>
        <tfoot>
            <tr>
                <th class="profile-header-title sorting-header" data-sort="title">
                    <span>
                        <span><?php esc_html_e('Title', 'advanced-gutenberg') ?></span>
                        <i class="dashicons"></i>
                    </span>
                </th>
                <th class="profile-header-author sorting-header" data-sort="author">
                    <span>
                        <span><?php esc_html_e('Author', 'advanced-gutenberg') ?></span>
                        <i class="dashicons"></i>
                    </span>
                </th>
                <th class="profile-header-date sorting-header" data-sort="date">
                    <span>
                        <span><?php esc_html_e('Date', 'advanced-gutenberg') ?></span>
                        <i class="dashicons"></i>
                    </span>
                </th>
            </tr>
        </tfoot>
    </table>
</div>