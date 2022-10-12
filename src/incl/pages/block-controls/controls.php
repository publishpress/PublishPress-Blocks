<?php
defined( 'ABSPATH' ) || die;

$schedule_control   = $this->getOptionSetting( 'advgb_block_controls', 'schedule_control', 'checkbox', 1 );
$user_role_control  = $this->getOptionSetting( 'advgb_block_controls', 'user_role_control', 'checkbox', 1 );
?>
<form method="post">
    <?php wp_nonce_field( 'advgb_controls_settings_nonce', 'advgb_controls_settings_nonce_field' ); ?>
    <table class="form-table">
        <tr>
            <th scope="row">
                <?php _e( 'Schedule control', 'advanced-gutenberg' ) ?>
            </th>
            <td>
                <label>
                    <input type="checkbox" name="schedule_control"
                           id="schedule_control"
                           value="1"
                           <?php echo esc_attr( $schedule_control ) ?>
                    />
                    <?php
                    _e(
                        'Every block can have a “Start showing” and/or “Stop showing” option.',
                        'advanced-gutenberg'
                    )
                    ?>
                </label>
            </td>
        </tr>
        <tr>
            <th scope="row">
                <?php _e( 'User role control', 'advanced-gutenberg' ) ?>
            </th>
            <td>
                <label>
                    <input type="checkbox" name="user_role_control"
                           id="user_role_control"
                           value="1"
                           <?php echo esc_attr( $user_role_control ) ?>
                    />
                    <?php
                    _e(
                        'Every block can have a “User roles” option.',
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
