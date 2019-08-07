jQuery(document).ready(function ($) {
    $('.advgb-form-login').attr('action', advgbLoresForm.login_url);
    $('.advgb-form-register').attr('action', advgbLoresForm.register_url);
    $('.advgb-lost-password .advgb-lost-password-link').attr('href', advgbLoresForm.lostpwd_url);

    $('.advgb-lores-field .advgb-lores-field-input .advgb-lores-input').focus(function () {
        $(this).closest('.advgb-lores-field-input').addClass('focused');
    }).blur(function () {
        $(this).closest('.advgb-lores-field-input').removeClass('focused');
    });

    $('.advgb-lores-form .advgb-register-link').click(function (e) {
        e.preventDefault();
        var wrapperForm = $(this).closest('.advgb-lores-form-wrapper');
        var loginForm = wrapperForm.find('.advgb-login-form-wrapper');
        var registerForm = wrapperForm.find('.advgb-register-form-wrapper');

        loginForm.hide(0);
        registerForm.show("slide", { direction: "right" }, 300);
    });

    $('.advgb-lores-form .advgb-back-to-login-link').click(function (e) {
        e.preventDefault();
        var wrapperForm = $(this).closest('.advgb-lores-form-wrapper');
        var loginForm = wrapperForm.find('.advgb-login-form-wrapper');
        var registerForm = wrapperForm.find('.advgb-register-form-wrapper');

        registerForm.hide(0);
        loginForm.show("slide", { direction: "left" }, 300);
    });

    var registerEnabled = parseInt(advgbLoresForm.register_enabled);

    if (!registerEnabled) {
        $('.advgb-header-navigation').remove();
        $('.advgb-register-form').hide();
        $('.advgb-form-register').prepend('<p style="color: red">'+advgbLoresForm.unregistrable_notice+'</p>')
    }

    // Check captcha is enable before submitting
    $('.advgb-lores-form form').submit(function (e) {
        if (typeof grecaptcha !== "undefined") {
            var $thisForm = $(this).closest('.advgb-lores-form');
            var g_id = parseInt($thisForm.find('.advgb-grecaptcha').data('gid'));
            var captcha = grecaptcha.getResponse(g_id) || undefined;
            var validated = false;

            if (!captcha) {
                alert(advgbLoresForm.captcha_empty_warning);
                return false;
            }

            $.ajax( {
                url: advgbLoresForm.ajax_url,
                type: "POST",
                async: false,
                data: {
                    action: 'advgb_lores_validate',
                    captcha: captcha
                },
                beforeSend: function () {
                    $thisForm.addClass('sending');
                    $thisForm.append('<div class="advgb-form-sending" />');
                },
                success: function () {
                    validated = true;
                },
                error: function ( jqxhr, textStatus, error ) {
                    alert(textStatus + " : " + error + ' - ' + jqxhr.responseJSON);
                    $thisForm.removeClass('sending');
                    $thisForm.find('.advgb-form-sending').remove();
                }
            } );

            return validated;
        }
    });
});