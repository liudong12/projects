;(function($){ //create closure so we can safely use $ as alias for jQuery
	$(document).ready(function(){
		var formData = {//先从contact.php传到这里，然后再传到submit.php
		    'name' : $('input[name="name"]').val(),
		    'email' : $('input[name="email"]').val(),
		    'tel' : $('input[name="your_number"]').val(),
		    'country' : $('select[name="country"]').val()
		};
		var options = {  
		    type : 'POST',
		    dataType: 'JSON',
		    data : formData,
		    beforeSubmit : function () { 
		       $("#mainForm").css("display", "none");
		       
		       $(".main-form-submitting").css("display", "block");
		    },
		    success : function (data) {
		    		        //alert("aaa");
		    		        if (!data.success) {
		    		            if (data.errors.name) {
		    		                $('.info').addClass('error');
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
		    		            if (data.errors.message) {
		    		                $('#contact_form_log').find('.div-message').append('<span class="help-block" id="help-block-message">' + data.errors.message + '</span>'+'<br class="help help-message">');
		    		            }                
		    		            if (data.errors.code) {                       
		    		                $('#contact_form_log').find('.div-code').append('<span class="help-block" id="help-block-code">' + data.errors.code + '</span>'+'<br class="help help-code">');
		    		            }                    
		    		        } 
		    		        else {  
		    		        	setTimeout(function () {
		    		        		$(".main-form-submitting").css("display", "none");
		    		        		$(".main-form-submitted").css("display", "block");
		    		        	}, 1000);
		    		            setTimeout(function () {

		    		                $("#mainForm").css("display", "block");
		    		                //$("#contact_form_log").removeClass('checking');
		    		                //$("#mainForm").addClass('showUp');	  
		    		                $(".main-form-submitted").css("display", "none");              
		    		            }, 5000);
		    		            
		    		        
		    		            //resetForm
		    		            $('#mainForm').resetForm();
		    		            // $("#check-name-status").removeClass('success-status');
		    		            // $("#check-email-status").removeClass('success-status');
		    		            // $("#check-tel-status").removeClass('success-status');
		    		            // $("#check-message-status").removeClass('success-status');
		    		            // $("#check-code-status").removeClass('success-status');
		    		            // $("#check-code-status").removeClass('success-status');                                   
		    		        }
		    		    },
		    		    error: function(data) {           
		    		        console.log("error------------");
		    		    }
		};  

		$("#mainForm").validate({ //备注：如果要用validate来验证的话，form里面就不能写action
		    debug: true,
		    submitHandler: function(form) {  
		    //alert('aaa');   
		    console.log("ajax"); 
		        $("#mainForm").ajaxSubmit(options);  
		        return false;   // required to block normal submit since you used ajax
		    }  
		});  
		
	});
})(jQuery);