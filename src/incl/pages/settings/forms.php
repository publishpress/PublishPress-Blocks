<?php
defined( 'ABSPATH' ) || die;

$email_settings                 = get_option( 'advgb_email_sender' );
$website_title                  = get_option( 'blogname' );
$admin_email                    = get_option( 'admin_email' );
$contact_form_sender_name       = isset( $email_settings['contact_form_sender_name'] ) && $email_settings['contact_form_sender_name'] ? $email_settings['contact_form_sender_name'] : $website_title;
$contact_form_sender_email      = isset( $email_settings['contact_form_sender_email'] ) && $email_settings['contact_form_sender_email'] ? $email_settings['contact_form_sender_email'] : $admin_email;
$contact_form_email_title       = isset( $email_settings['contact_form_email_title'] ) && $email_settings['contact_form_email_title'] ? $email_settings['contact_form_email_title'] : __( 'Website Contact', 'advanced-gutenberg' );
$contact_form_email_receiver    = isset( $email_settings['contact_form_email_receiver'] ) && $email_settings['contact_form_email_receiver'] ? $email_settings['contact_form_email_receiver'] : $admin_email;
$recaptcha_enabled              = isset( $recaptcha_config['recaptcha_enable'] ) && $recaptcha_config['recaptcha_enable'] ? 'checked' : '';
$recaptcha_site_key             = isset( $recaptcha_config['recaptcha_site_key'] ) ? $recaptcha_config['recaptcha_site_key'] : '';
$recaptcha_secret_key           = isset( $recaptcha_config['recaptcha_secret_key'] ) ? $recaptcha_config['recaptcha_secret_key'] : '';
$recaptcha_language             = isset( $recaptcha_config['recaptcha_language'] ) ? $recaptcha_config['recaptcha_language'] : '';
$recaptcha_theme                = isset( $recaptcha_config['recaptcha_theme'] ) ? $recaptcha_config['recaptcha_theme'] : '';
?>
<form method="post">
    <?php wp_nonce_field( 'advgb_email_config_nonce', 'advgb_email_config_nonce_field' ) ?>
    <table class="form-table">
        <tr>
            <th scope="row">
                <?php _e( 'Sender name', 'advanced-gutenberg' ) ?>
            </th>
            <td>
                <label>
                    <input type="text"
                           name="contact_form_sender_name"
                           id="contact_form_sender_name"
                           class="regular-text"
                           value="<?php esc_attr_e( $contact_form_sender_name ) ?>"
                    />
                </label>
            </td>
        </tr>
        <tr>
            <th scope="row">
                <?php _e( 'Sender email', 'advanced-gutenberg' ) ?>
            </th>
            <td>
                <label>
                    <input type="email"
                           name="contact_form_sender_email"
                           id="contact_form_sender_email"
                           class="regular-text"
                           value="<?php echo esc_attr( $contact_form_sender_email ) ?>"
                    />
                </label>
            </td>
        </tr>
        <tr>
            <th scope="row">
                <?php _e( 'Email title', 'advanced-gutenberg' ) ?>
            </th>
            <td>
                <label>
                    <input type="text"
                           name="contact_form_email_title"
                           id="contact_form_email_title"
                           class="regular-text"
                           value="<?php esc_attr_e( $contact_form_email_title ) ?>"
                    />
                </label>
            </td>
        </tr>
        <tr>
            <th scope="row">
                <?php _e( 'Email receiver', 'advanced-gutenberg' ) ?>
            </th>
            <td>
                <label>
                    <input type="text"
                           name="contact_form_email_receiver"
                           id="contact_form_email_receiver"
                           class="regular-text"
                           value="<?php esc_attr_e( $contact_form_email_receiver ) ?>"
                    />
                </label>
            </td>
        </tr>
    </table>

    <div class="advgb-form-buttons-bottom">
        <button type="submit"
                class="button button-primary pp-primary-button"
                id="save_email_config"
                name="save_email_config"
        >
            <?php esc_html_e( 'Save Form Settings', 'advanced-gutenberg' ) ?>
        </button>
    </div>
</form>
