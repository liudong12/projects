/*
--------------------------------
Ajax Contact Form
--------------------------------
+ https://github.com/pinceladasdaweb/Ajax-Contact-Form
+ A Simple Ajax Contact Form developed in PHP with HTML5 Form validation.
+ Has a fallback in jQuery for browsers that do not support HTML5 form validation.
+ version 1.0.1
+ Copyright 2014 Pedro Rogerio
+ Licensed under the MIT license
+ https://github.com/pinceladasdaweb/Ajax-Contact-Form
*/

(function ($, window, document, undefined) {
    'use strict';

    var $form = $('#contact-form');

    $form.submit(function (e) {
        // remove the error class
//      $('.form-group').removeClass('has-error');
//      $('#contact_form_log').addClass('reset');
//      $('#contact-form input').removeClass('error');//暂时不要
        $('span.help-block').remove();//移除所有已经生成的提示
        $('br.help').remove();//移除所有已经生成的换行

        // get the form data
        var formData = {//先从contact.php传到这里，然后再传到submit.php
            'name' : $('input[name="name"]').val(),
            'email' : $('input[name="email"]').val(),
           'tel' : $('input[name="tel"]').val(),
            'message' : $('textarea[name="message"]').val(),
            'code' : $('input[name="6_letters_code"]').val()
        };
$( "#submit-btn" ).prop( "disabled", true );
        // process the form
        $.ajax({
            type : 'POST',
            url  : 'submit.php',//传到submit.php
            data : formData,
            dataType : 'json',
            encode : true
        }).done(function (data) {
//      	$('#verify_register').dialog('widget').find('button').eq(1).button('disable');
//      	$('#submit-btn').button('disable');
        	
            // handle errors
            
            if (!data.success) {
                if (data.errors.name) {
                	
//                 $("#contact_form_log").html(data.errors.name);
                    $('.info').addClass('error');
//                  $('#contact_form_errorloc').find('.col-lg-10').append('<span class="help-block">' + data.errors.name + '</span>'+'<br class="help">');
                    $('#contact_form_log').find('.div-name').append('<span class="help-block" id="help-block-name">' + data.errors.name + '</span>'+'<br class="help help-name">');
  
                
                }

                if (data.errors.email) {
                	
                    $('#contact_form_log').find('.div-email').append('<span class="help-block" id="help-block-email">' + data.errors.email + '</span>'+'<br class="help help-email">');
                    $('#name').addClass('error');
                }
                
                 if (data.errors.tel) {
                	
                    $('#contact_form_log').find('.div-tel').append('<span class="help-block" id="help-block-tel">' + data.errors.tel + '</span>'+'<br class="help help-tel">');
                    $('#tel').addClass('error');
                }
//
                
//
                if (data.errors.message) {
//                  $('#message-field').addClass('has-error');
                    $('#contact_form_log').find('.div-message').append('<span class="help-block" id="help-block-message">' + data.errors.message + '</span>'+'<br class="help help-message">');
                }
                
                if (data.errors.code) {
                    
                    $('#contact_form_log').find('.div-code').append('<span class="help-block" id="help-block-code">' + data.errors.code + '</span>'+'<br class="help help-code">');
                }
                
                
            } else {
                // display success message
                    $('#contact_form_log').find('.div-success').append('<span class="help-block" id="help-block-success">' + data.message + '</span>'+'<br class="help help-success">');
            
            $('#contact-form').resetForm();
								
            }
        }).fail(function (data) {
            // for debug
            console.log(data)
        });

        e.preventDefault();
        $( "#submit-btn" ).prop( "disabled", false );
    });
}(jQuery, window, document));


