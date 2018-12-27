jQuery(document).ready(function ($) {
    $('.advgb-contact-form input.advgb-form-input').on('keydown', function (e) {
        if(e.which === 13) {
            e.preventDefault();
            return false;
        }
    });

    $('.advgb-contact-form form').submit(function (e) {
        e.preventDefault();
        $thisForm = $(this).closest('.advgb-contact-form');
        contactName = $(this).find('.advgb-form-input-name').val();
        contactEmail = $(this).find('.advgb-form-input-email').val();
        contactMsg = $(this).find('.advgb-form-input-msg').val();

        if (contactName === '' || contactEmail === '' || contactMsg === '') {
            alert('You need to fill all fields!');
            return false;
        }

        $.ajax( {
            url: advgbContactForm.ajax_url,
            type: "POST",
            data: {
                action: 'advgb_contact_form_save',
                contact_name: contactName,
                contact_email: contactEmail,
                contact_msg: contactMsg
            },
            beforeSend: function () {
                $thisForm.append('<div class="advgb-contact-form-overlay" />');
                $thisForm.find('.advgb-contact-form-submit-success').remove();
            },
            success: function () {
                $thisForm.find('.advgb-contact-form-overlay').remove();
                $thisForm.append('<div class="advgb-contact-form-submit-success">Successfully submitted!</div>');
            },
            error: function ( jqxhr, textStatus, error ) {
                alert(textStatus + " : " + error + ' - ' + jqxhr.responseJSON);
                $thisForm.find('.advgb-contact-form-overlay').remove();
            }
        } )
    });
});