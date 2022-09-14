<?php
defined( 'ABSPATH' ) || die;

$settings               = get_option( 'advgb_settings' );

$block_extend           = $this->getOptionSetting( $settings['block_extend'], 'checkbox', 0 );
$enable_block_access    = $this->getOptionSetting( $settings['enable_block_access'], 'checkbox', 1 );
$enable_custom_styles   = $this->getOptionSetting( $settings['enable_custom_styles'], 'checkbox', 1 );
$enable_advgb_blocks    = $this->getOptionSetting( $settings['enable_advgb_blocks'], 'checkbox', 1 );
$block_controls         = $this->getOptionSetting( $settings['block_controls'], 'checkbox', 1 );
?>
<form method="post">
    <?php wp_nonce_field( 'advgb_settings_features_nonce', 'advgb_settings_features_nonce_field' ) ?>
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
                        'If some blocks are not listed in Block access, try enabling this feature and be sure all the blocks are saved', // @TODO - Link to a doc where we suggest to open a post edit page to save to advgb_blocks_list
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

        <?php
        // Pro settings
        if( defined( 'ADVANCED_GUTENBERG_PRO' ) ) {
            if ( method_exists( 'PPB_AdvancedGutenbergPro\Utils\Definitions', 'advgb_pro_setting' ) ) {
                echo PPB_AdvancedGutenbergPro\Utils\Definitions::advgb_pro_setting(
                    'enable_core_blocks_features',
                    __( 'Enable core blocks features', 'advanced-gutenberg' ),
                    __( 'Add Pro features to core blocks such as Google Font support', 'advanced-gutenberg' )
                );
            }
        }
        ?>

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
    </table>

    <div class="advgb-form-buttons-bottom">
        <button type="submit"
                class="button button-primary"
                name="save_settings_features"
        >
            <?php esc_html_e( 'Save Features Settings', 'advanced-gutenberg' ) ?>
        </button>
    </div>
</form>
