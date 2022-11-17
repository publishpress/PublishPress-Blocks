<?php
defined( 'ABSPATH' ) || die;

$controls           = new \PublishPress\Blocks\Controls;

$schedule_control   = $controls->getControlValue( 'schedule', 1 );
$user_role_control  = $controls->getControlValue( 'user_role', 1 );
$browser_control    = $controls->getControlValue( 'browser', 1 );
$platform_control   = $controls->getControlValue( 'platform', 1 );
$taxonomy_control   = $controls->getControlValue( 'taxonomy', 1 );
$page_control       = $controls->getControlValue( 'page', 1 );
?>
<form method="post">
    <?php wp_nonce_field( 'advgb_controls_settings_nonce', 'advgb_controls_settings_nonce_field' ); ?>
    <table class="form-table">
        <tr>
            <th scope="row">
                <?php _e( 'Schedule', 'advanced-gutenberg' ) ?>
            </th>
            <td>
                <label>
                    <input type="checkbox" name="schedule_control"
                           value="1"
                           <?php echo $schedule_control ? ' checked' : '' ?>
                    />
                    <?php
                    _e(
                        'Choose when to start showing and/or stop showing your blocks.',
                        'advanced-gutenberg'
                    )
                    ?>
                </label>
            </td>
        </tr>
        <tr>
            <th scope="row">
                <?php _e( 'User roles', 'advanced-gutenberg' ) ?>
            </th>
            <td>
                <label>
                    <input type="checkbox" name="user_role_control"
                           value="1"
                           <?php echo $user_role_control ? ' checked' : '' ?>
                    />
                    <?php
                    _e(
                        'Choose which users can see your blocks.',
                        'advanced-gutenberg'
                    )
                    ?>
                </label>
            </td>
        </tr>
        <tr>
            <th scope="row">
                <?php _e( 'Browsers', 'advanced-gutenberg' ) ?>
            </th>
            <td>
                <label>
                    <input type="checkbox" name="browser_control"
                           value="1"
                           <?php echo $browser_control ? ' checked' : '' ?>
                    />
                    <?php
                    _e(
                        'Choose in which browsers your blocks can be displayed.',
                        'advanced-gutenberg'
                    )
                    ?>
                </label>
            </td>
        </tr>
        <tr>
            <th scope="row">
                <?php _e( 'Platforms', 'advanced-gutenberg' ) ?>
            </th>
            <td>
                <label>
                    <input type="checkbox" name="platform_control"
                           value="1"
                           <?php echo $platform_control ? ' checked' : '' ?>
                    />
                    <?php
                    _e(
                        'Choose in which platforms your blocks can be displayed.',
                        'advanced-gutenberg'
                    )
                    ?>
                </label>
            </td>
        </tr>
        <tr>
            <th scope="row">
                <?php _e( 'Taxonomies & terms', 'advanced-gutenberg' ) ?>
            </th>
            <td>
                <label>
                    <input type="checkbox" name="taxonomy_control"
                           value="1"
                           <?php echo $taxonomy_control ? ' checked' : '' ?>
                    />
                    <?php
                    _e(
                        'Choose in which taxonomies and terms pages your blocks can be displayed.',
                        'advanced-gutenberg'
                    )
                    ?>
                </label>
            </td>
        </tr>
        <tr>
            <th scope="row">
                <?php _e( 'Pages', 'advanced-gutenberg' ) ?>
            </th>
            <td>
                <label>
                    <input type="checkbox" name="page_control"
                           value="1"
                           <?php echo $page_control ? ' checked' : '' ?>
                    />
                    <?php
                    _e(
                        'Choose in which pages your blocks can be displayed.',
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
                name="save_controls"
        >
            <?php esc_html_e( 'Save Controls', 'advanced-gutenberg' ) ?>
        </button>
    </div>
</form>
