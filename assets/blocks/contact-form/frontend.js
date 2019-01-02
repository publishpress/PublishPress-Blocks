jQuery(document).ready(function ($) {
    $('.advgb-contact-form input.advgb-form-input').on('keydown', function (e) {
        if(e.which === 13) {
            e.preventDefault();
            return false;
        }
    });

    $('.advgb-contact-form form').submit(function (e) {
        e.preventDefault();
        var $thisForm = $(this).closest('.advgb-contact-form');
        var contactName = $(this).find('.advgb-form-input-name').val();
        var contactEmail = $(this).find('.advgb-form-input-email').val();
        var contactMsg = $(this).find('.advgb-form-input-msg').val();
        var date = new Date();
        var submitDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() + ' - ' + date.getHours() + ':' + date.getMinutes();

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
                contact_msg: contactMsg,
                submit_date: submitDate
            },
            beforeSend: function () {
                $thisForm.append('<div class="advgb-form-overlay" />');
                $thisForm.find('.advgb-contact-form-submit-success').remove();
            },
            success: function () {
                $thisForm.find('.advgb-contact-form-overlay').remove();
                $thisForm.append('<div class="advgb-form-submit-success">Successfully submitted!</div>');
            },
            error: function ( jqxhr, textStatus, error ) {
                alert(textStatus + " : " + error + ' - ' + jqxhr.responseJSON);
                $thisForm.find('.advgb-contact-form-overlay').remove();
            }
        } )
    });
});