<?php
defined( 'ABSPATH' ) || die;

$saved_settings             = get_option( 'advgb_settings' );
$gallery_lightbox_caption   = isset( $saved_settings['gallery_lightbox_caption'] ) ? $saved_settings['gallery_lightbox_caption'] : '1';
$disable_wpautop_checked    = ! empty( $saved_settings['disable_wpautop'] ) ? 'checked' : '';
$google_api_key_saved       = isset( $saved_settings['google_api_key'] ) ? $saved_settings['google_api_key'] : '';
$enable_blocks_spacing      = isset( $saved_settings['enable_blocks_spacing'] ) && $saved_settings['enable_blocks_spacing'] ? 'checked' : '';
$blocks_spacing             = isset( $saved_settings['blocks_spacing'] ) ? $saved_settings['blocks_spacing'] : 0;
$blocks_icon_color          = isset( $saved_settings['blocks_icon_color'] ) ? $saved_settings['blocks_icon_color'] : '#5952de';
$editor_width               = isset( $saved_settings['editor_width'] ) ? $saved_settings['editor_width'] : '0';
$default_thumb              = plugins_url( 'assets/blocks/recent-posts/recent-post-default.png', ADVANCED_GUTENBERG_PLUGIN);
$rp_default_thumb           = isset( $saved_settings['rp_default_thumb']) ? $saved_settings['rp_default_thumb'] : array( 'url' => $default_thumb, 'id' => 0 );
$block_extend               = isset( $saved_settings['block_extend'] ) && $saved_settings['block_extend'] ? 'checked' : '';

$gallery_lightbox_checked = isset( $saved_settings['gallery_lightbox'] ) && $saved_settings['gallery_lightbox'] ? 'checked' : '';
if ( ! isset( $saved_settings['gallery_lightbox'] ) ) {
    $gallery_lightbox_checked = 'checked';
}

$enable_columns_visual_guide = isset($saved_settings['enable_columns_visual_guide']) && $saved_settings['enable_columns_visual_guide'] ? 'checked' : '';
if ( ! isset( $saved_settings['enable_columns_visual_guide'] ) ) {
    $enable_columns_visual_guide = 'checked';
}

$enable_block_access = isset( $saved_settings['enable_block_access'] ) && $saved_settings['enable_block_access'] ? 'checked' : '';
if ( ! isset($saved_settings['enable_block_access'] ) ) {
    $enable_block_access  = 'checked';
}

$enable_custom_styles = isset( $saved_settings['enable_custom_styles'] ) && $saved_settings['enable_custom_styles'] ? 'checked' : '';
if ( ! isset($saved_settings['enable_custom_styles'] ) ) {
    $enable_custom_styles  = 'checked';
}

$enable_advgb_blocks = isset( $saved_settings['enable_advgb_blocks'] ) && $saved_settings['enable_advgb_blocks'] ? 'checked' : '';
if ( ! isset( $saved_settings['enable_advgb_blocks'] ) ) {
    $enable_advgb_blocks  = 'checked';
}

$block_controls = isset( $saved_settings['block_controls'] ) && $saved_settings['block_controls'] ? 'checked' : '';
if ( ! isset($saved_settings['block_controls'] ) ) {
    $block_controls = 'checked';
}
?>

<div class="publishpress-admin wrap">

    <?php if ( isset( $_GET['save'] ) ) : // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- display message, no action ?>
        <div id="message" class="updated fade">
            <p>
                <?php esc_html_e('Settings saved successfully', 'advanced-gutenberg'); ?>
            </p>
        </div>
    <?php endif; ?>

    <header>
        <h1 class="wp-heading-inline">
            <?php esc_html_e( 'Settings', 'advanced-gutenberg' ) ?>
        </h1>
    </header>

    <div class="wrap">
        <form method="post">
            <?php wp_nonce_field( 'advgb_settings_nonce', 'advgb_settings_nonce_field' ) ?>
            <table class="form-table">
                <tr>
                    <th scope="row">
                        <?php _e( 'Enable block access', 'advanced-gutenberg' ) ?>
                    </th>
                    <td>
                        <label>
                            <input type="checkbox" name="enable_block_access"
                                   id="enable_block_access"
                                   value="1"
                                <?php esc_attr_e($enable_block_access) ?>
                            />
                            <?php
                            _e(
                                'Manage block permissions by user role',
                                'advanced-gutenberg'
                            )
                            ?>
                        </label>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <?php _e( 'Enable custom styles', 'advanced-gutenberg' ) ?>
                    </th>
                    <td>
                        <label>
                            <input type="checkbox" name="enable_custom_styles"
                                   id="enable_custom_styles"
                                   value="1"
                                <?php esc_attr_e( $enable_custom_styles ) ?>
                            />
                            <?php
                            _e(
                                'Manage and apply custom CSS classes to some blocks ',
                                'advanced-gutenberg'
                            )
                            ?>
                        </label>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <?php _e( 'Enable PublishPress Blocks', 'advanced-gutenberg' ) ?>
                    </th>
                    <td>
                        <label>
                            <input type="checkbox" name="enable_advgb_blocks"
                                   id="enable_advgb_blocks"
                                   value="1"
                                <?php esc_attr_e( $enable_advgb_blocks ) ?>
                            />
                            <?php
                            _e(
                                'If disabled, blocks from PublishPress Blocks plugin won\'t be available',
                                'advanced-gutenberg'
                            )
                            ?>
                        </label>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <?php _e( 'Enable block controls', 'advanced-gutenberg' ) ?>
                    </th>
                    <td>
                        <label>
                            <input type="checkbox" name="block_controls"
                                   id="block_controls"
                                   value="1"
                                <?php echo esc_attr( $block_controls ) ?>
                            />
                            <?php
                            _e(
                                'Block controls panel to schedule blocks',
                                'advanced-gutenberg'
                            )
                            ?>
                        </label>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <?php _e( 'Extend supported blocks (beta)', 'advanced-gutenberg' ) ?>
                    </th>
                    <td>
                        <label>
                            <input type="checkbox" name="block_extend"
                                   id="block_extend"
                                   value="1"
                                <?php echo esc_attr( $block_extend ) ?>
                            />
                            <?php
                            _e(
                                'If some blocks are not listed in Block access, try enabling this beta feature',
                                'advanced-gutenberg'
                            )
                            ?>
                        </label>
                    </td>
                </tr>

                <?php
                // Pro settings
                if( defined( 'ADVANCED_GUTENBERG_PRO' ) ) {
                    if ( method_exists( 'PPB_AdvancedGutenbergPro\Utils\Definitions', 'advgb_pro_setting' ) ) {
                        echo PPB_AdvancedGutenbergPro\Utils\Definitions::advgb_pro_setting(
                            'enable_core_blocks_features',
                            __( 'Enable core blocks features', 'advanced-gutenberg' ),
                            __( 'Add Pro features to core blocks such as Google Font support', 'advanced-gutenberg' )
                        );
                        echo PPB_AdvancedGutenbergPro\Utils\Definitions::advgb_pro_setting(
                            'enable_pp_branding',
                            __( 'Display PublishPress branding', 'advanced-gutenberg' ),
                            __( 'PublishPress logo and links in the footer of the admin pages', 'advanced-gutenberg' )
                        );
                    }
                }
                ?>

                <tr>
                    <th scope="row">
                        <?php _e( 'Open galleries in lightbox', 'advanced-gutenberg' ) ?>
                    </th>
                    <td>
                        <label>
                            <input type="checkbox" name="gallery_lightbox"
                                   id="gallery_lightbox"
                                   value="1"
                                <?php esc_attr_e( $gallery_lightbox_checked ) ?>
                            />
                            <?php
                            _e(
                                'Open gallery images as a lightbox style popup',
                                'advanced-gutenberg'
                            )
                            ?>
                        </label>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <?php _e( 'Image caption', 'advanced-gutenberg' ) ?>
                    </th>
                    <td>
                        <label>
                            <select name="gallery_lightbox_caption" id="gallery_lightbox_caption">
                                <option value="0"<?php echo ( $gallery_lightbox_caption === '0' or $gallery_lightbox_caption === 0 ) ? ' selected' : '' ?>>
                                    <?php esc_html_e( 'Disabled', 'advanced-gutenberg' ); ?>
                                </option>
                                <option value="1"<?php echo ( $gallery_lightbox_caption === '1' or $gallery_lightbox_caption === 1 ) ? ' selected' : '' ?>>
                                    <?php esc_html_e('Bottom', 'advanced-gutenberg'); ?>
                                </option>
                                <option value="2"<?php echo $gallery_lightbox_caption === '2' ? ' selected' : '' ?>>
                                    <?php esc_html_e( 'Overlay', 'advanced-gutenberg' ); ?>
                                </option>
                            </select>
                            <p class="description">
                                <?php
                                _e(
                                    'Display caption text on images loaded as lightbox in galleries.',
                                    'advanced-gutenberg'
                                )
                                ?>
                            </p>
                        </label>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <?php _e( 'Remove autop', 'advanced-gutenberg' ) ?>
                    </th>
                    <td>
                        <label>
                            <input type="checkbox" name="disable_wpautop"
                                   id="ag_disable_wpautop"
                                   value="1"
                                <?php echo esc_attr( $disable_wpautop_checked ) ?>
                            />
                            <?php
                            _e(
                                'Autop WordPress function is used to prevent unwanted paragraphs to be added',
                                'advanced-gutenberg'
                            )
                            ?>
                        </label>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <?php _e( 'Google API key', 'advanced-gutenberg' ) ?>
                    </th>
                    <td>
                        <label>
                            <input type="text"
                                   name="google_api_key"
                                   id="google_api_key"
                                   style="width: 400px;"
                                   value="<?php echo esc_attr( $google_api_key_saved ) ?>"
                            />
                            <p class="description">
                                <a target="_blank"
                                   href="https://developers.google.com/maps/documentation/javascript/get-api-key">
                                    <?php
                                    esc_html_e(
                                        'How to create a Google API Key',
                                        'advanced-gutenberg'
                                    )
                                    ?>
                                </a><br/>
                                <?php
                                _e(
                                    'A Google API key is required to use the Map block without any warning.',
                                    'advanced-gutenberg'
                                );
                                ?>
                            </p>
                        </label>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <?php _e( 'Enable blocks spacing', 'advanced-gutenberg' ) ?>
                    </th>
                    <td>
                        <label>
                            <input type="checkbox" name="enable_blocks_spacing"
                                   id="enable_blocks_spacing"
                                   value="1"
                                <?php echo esc_attr( $enable_blocks_spacing ) ?>
                            />
                            <?php
                            _e(
                                'Vertical spacing between blocks',
                                'advanced-gutenberg'
                            )
                            ?>
                        </label>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <?php _e( 'Blocks spacing', 'advanced-gutenberg' ) ?>
                        <span> (px)</span>
                    </th>
                    <td>
                        <label>
                            <input type="number"
                                   min="0"
                                   name="blocks_spacing"
                                   id="blocks_spacing"
                                   value="<?php echo esc_attr( $blocks_spacing ) ?>"
                            />
                        </label>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <?php _e( 'Blocks icon color', 'advanced-gutenberg' ) ?>
                    </th>
                    <td>
                        <label>
                            <input type="text"
                                   name="blocks_icon_color"
                                   id="blocks_icon_color"
                                   class="minicolors minicolors-input"
                                   value="<?php echo esc_attr( $blocks_icon_color ) ?>"
                            />
                            <p class="description">
                                <?php
                                _e(
                                    'Set color for blocks icons on admin. Only apply to PublishPress Blocks',
                                    'advanced-gutenberg'
                                )
                                ?>
                            </p>
                        </label>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <?php _e( 'Gutenberg editor width', 'advanced-gutenberg' ) ?>
                    </th>
                    <td>
                        <label>
                            <select name="editor_width" id="editor_width">
                                <option value="" <?php echo $editor_width === '' ? 'selected' : '' ?>>
                                    <?php esc_html_e( 'Original', 'advanced-gutenberg' ); ?>
                                </option>
                                <option value="75" <?php echo $editor_width === '75' ? 'selected' : '' ?>>
                                    <?php esc_html_e( 'Large', 'advanced-gutenberg' ); ?>
                                </option>
                                <option value="95" <?php echo $editor_width === '95' ? 'selected' : '' ?>>
                                    <?php esc_html_e( 'Full width', 'advanced-gutenberg' ); ?>
                                </option>
                            </select>
                        </label>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <?php _e( 'Default thumbnail', 'advanced-gutenberg' ) ?>
                    </th>
                    <td>
                        <label>
                            <div class="setting-actions-wrapper">
                                <input type="hidden" id="post_default_thumb" name="post_default_thumb" value="<?php echo esc_attr($rp_default_thumb['url']); ?>" />
                                <input type="hidden" id="post_default_thumb_id" name="post_default_thumb_id" value="<?php echo esc_attr($rp_default_thumb['id']); ?>" />
                                <div class="setting-actions" id="post_default_thumb_actions">
                                    <img class="thumb-selected"
                                         src="<?php echo esc_url( $rp_default_thumb['url'] ); ?>"
                                         alt="thumb"
                                         data-default="<?php echo esc_url( $default_thumb ); ?>"
                                    />
                                    <i class="dashicons dashicons-edit ju-button" id="thumb_edit" title="<?php esc_attr_e( 'Edit', 'advanced-gutenberg' ); ?>"></i>
                                    <i class="dashicons dashicons-no ju-button orange-button" id="thumb_remove" title="<?php esc_attr_e( 'Reset to default', 'advanced-gutenberg' ); ?>"></i>
                                </div>
                            </div>
                            <p class="description">
                                <?php
                                _e(
                                    'Set the default post thumbnail to use in Content Display blocks for posts without featured image.',
                                    'advanced-gutenberg'
                                )
                                ?>
                            </p>
                        </label>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <?php _e( 'Enable columns visual guide', 'advanced-gutenberg' ) ?>
                    </th>
                    <td>
                        <label>
                            <input type="checkbox" name="enable_columns_visual_guide"
                                   id="enable_columns_visual_guide"
                                   value="1"
                                <?php echo esc_attr( $enable_columns_visual_guide ) ?>
                            />
                            <?php
                            _e(
                                'Visual guide for PublishPress Blocks Columns block',
                                'advanced-gutenberg'
                            )
                            ?>
                        </label>
                    </td>
                </tr>
            </table>

            <div class="advgb-form-buttons-bottom">
                <button type="submit"
                        class="button button-primary pp-primary-button"
                        id="save-settings"
                        name="save_settings"
                >
                    <?php esc_html_e( 'Save Settings', 'advanced-gutenberg' ) ?>
                </button>
            </div>
        </form>
    </div>
</div>
