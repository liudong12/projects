$(document).ready(function(){
        function checkName() {alert("bb");
    }
        
});

(function($) { alert("aa");
    function checkName() {
    //	$(".help-block").remove();//清除所有于submit 有关的提示
    //   $('br.help').remove();
         
    	var formData = {//先从contact.php传到这里，然后再传到submit.php
                'name' : $('input[name="name"]').val(),
                'email' : $('input[name="email"]').val(),
                'tel' : $('input[name="tel"]').val(),
                'message' : $('textarea[name="message"]').val(),
                'code' : $('input[name="6_letters_code"]').val()
            };
            
            
            
        $("#check-name-status").removeClass('error-status');
        $("#check-name-status").removeClass('success-status');
        $("#check-name-status").addClass('checking');

        $("#help-block-name").remove();//移除所有已经生成的name提示
        $('br.help-name').remove();
        //备注：生成的 br 元素里面要有 2 个 css。 help:给 submit 批量删除，help-name: 给ajax指定删除
        
        
       

        
        //var url = "/product-detail";         
        $.ajax({
                type : 'POST',
                url  : rootUrl + '/check_availability',//传到submit.php
                data : formData,
                dataType : 'json',
                encode : true
            }).done(function (data) { alert("done");
                // handle errors
                

                if (!data.success) {//如果有错误
                	
                	
                	
                	if (data.errors.name) {
                    	
                 $("#check-name-status").removeClass('checking').addClass('error-status');
                 $('#contact_form_log').find('.div-name').append('<span class="help-block" id="help-block-name">' + data.errors.name + '</span>'+'<br class="help help-name">');

                    
                    }
                	else{
                		$("#check-name-status").removeClass('checking').addClass('success-status');
                        $("#help-block-name").remove();
                        $('br.help-name').remove();
                	}
                	
                	

                }
                else{ 
                	
    	$("#check-name-status").removeClass('checking').addClass('success-status');
    	 $("#help-block-name").remove();
         $('br.help-name').remove();

    }
    }).fail(function (data) {

                // for debug
                console.log(data);
            });
            
             var formData2 = {
                'name' : $('input[name="name"]').val(),
                'email' : $('input[name="email"]').val(),
               'tel' : $('input[name="tel"]').val(),
                'message' : $('textarea[name="message"]').val(),
                'code' : $('input[name="6_letters_code"]').val()
            };
            
            console.log(formData.email);
            console.log(formData2.email);
    //      if(!(formData.email==formData2.email)){
    //      checkEmail();
    //      }
    //      checkTel();
        
    }

    function checkEmail() {
    	var formData = {//先从contact.php传到这里，然后再传到submit.php
                'name' : $('input[name="name"]').val(),
                'email' : $('input[name="email"]').val(),
               'tel' : $('input[name="tel"]').val(),
                'message' : $('textarea[name="message"]').val(),
                'code' : $('input[name="6_letters_code"]').val()
            };
            
            
           
    	$("#check-email-status").removeClass('error-status');
        $("#check-email-status").removeClass('success-status');
        $("#check-email-status").addClass('checking');
        
        $("#help-block-email").remove();
        $('br.help-email').remove();
       

        
                     
        $.ajax({
                type : 'POST',
                url  : 'check_availability.php',//传到submit.php
                data : formData,
                dataType : 'json',
                encode : true
            }).done(function (data) {
                // handle errors
                

                if (!data.success) {//如果有错误
                	
                	
                	
                	if (data.errors.email) {
                    	
                 $("#check-email-status").removeClass('checking').addClass('error-status');
                 $('#contact_form_log').find('.div-email').append('<span class="help-block" id="help-block-email">' + data.errors.email + '</span>'+'<br class="help help-email">');

                    
                    }
                	else{
                		$("#check-email-status").removeClass('checking').addClass('success-status');
                		$("#help-block-email").remove();
                        $('br.help-email').remove();
                	}
                	
                	

                }
                else{
                	
    	$("#check-email-status").removeClass('checking').addClass('success-status');
    	$("#help-block-email").remove();
        $('br.help-email').remove();

    }
    }).fail(function (data) {

                // for debug
                console.log(data);
            });
            
        
    }

    function checkTel() {
    	var formData = {//先从contact.php传到这里，然后再传到submit.php
                'name' : $('input[name="name"]').val(),
                'email' : $('input[name="email"]').val(),
               'tel' : $('input[name="tel"]').val(),
                'message' : $('textarea[name="message"]').val(),
                'code' : $('input[name="6_letters_code"]').val()
            };
            
            
            
    	$("#check-tel-status").removeClass('error-status');
        $("#check-tel-status").removeClass('success-status');
        $("#check-tel-status").addClass('checking');
        
        $("#help-block-tel").remove();
        $('br.help-tel').remove();
       

        
                     
        $.ajax({
                type : 'POST',
                url  : 'check_availability.php',//传到submit.php
                data : formData,
                dataType : 'json',
                encode : true
            }).done(function (data) {
                // handle errors
                

                if (!data.success) {//如果有错误
                	
                	
                	
                	if (data.errors.tel) {
                    	
                 $("#check-tel-status").removeClass('checking').addClass('error-status');
                 $('#contact_form_log').find('.div-tel').append('<span class="help-block" id="help-block-tel">' + data.errors.tel + '</span>'+'<br class="help help-tel">');

                    
                    }
                	else{
                		$("#check-tel-status").removeClass('checking').addClass('success-status');
                		$("#help-block-tel").remove();
        $('br.help-tel').remove();
                	}
                	
                	

                }
                else{
                	
    	$("#check-tel-status").removeClass('checking').addClass('success-status');
    	$("#help-block-tel").remove();
        $('br.help-tel').remove();

    }
    }).fail(function (data) {

                // for debug
                console.log(data);
            });
            
        
    }

    function checkMessage() {
    	var formData = {//先从contact.php传到这里，然后再传到submit.php
                'name' : $('input[name="name"]').val(),
                'email' : $('input[name="email"]').val(),
               'tel' : $('input[name="tel"]').val(),
                'message' : $('textarea[name="message"]').val(),
                'code' : $('input[name="6_letters_code"]').val()
            };
            
            
            
    	$("#check-message-status").removeClass('error-status');
        $("#check-message-status").removeClass('success-status');
        $("#check-message-status").addClass('checking');
        
        $("#help-block-message").remove();
        $('br.help-message').remove();
       

        
                     
        $.ajax({
                type : 'POST',
                url  : 'check_availability.php',//传到submit.php
                data : formData,
                dataType : 'json',
                encode : true
            }).done(function (data) {
                // handle errors
                

                if (!data.success) {//如果有错误
                	
                	
                	
                	if (data.errors.message) {
                    	
                 $("#check-message-status").removeClass('checking').addClass('error-status');
                 $('#contact_form_log').find('.div-message').append('<span class="help-block" id="help-block-message">' + data.errors.message + '</span>'+'<br class="help help-message">');

                    
                    }
                	else{
                		$("#check-message-status").removeClass('checking').addClass('success-status');
                		$("#help-block-message").remove();
        $('br.help-message').remove();
                	}
                	
                	

                }
                else{
                	
    	$("#check-message-status").removeClass('checking').addClass('success-status');
    	$("#help-block-message").remove();
        $('br.help-message').remove();

    }
    }).fail(function (data) {

                // for debug
                console.log(data);
            });
            
        
    }




    function checkCaptcha() {
    	var formData = {//先从contact.php传到这里，然后再传到submit.php
                'name' : $('input[name="name"]').val(),
                'email' : $('input[name="email"]').val(),
               'tel' : $('input[name="tel"]').val(),
                'message' : $('textarea[name="message"]').val(),
                'code' : $('input[name="6_letters_code"]').val()
            };
            
            
    	$("#check-code-status").removeClass('error-status');
        $("#check-code-status").removeClass('success-status');
        $("#check-code-status").addClass('checking');
        
        $("#help-block-code").remove();
        $('br.help-code').remove();
        
        $.ajax({
                type : 'POST',
                url  : 'check_availability.php',//传到submit.php
                data : formData,
                dataType : 'json',
                encode : true
            }).done(function (data) {
            
            	
                // handle errors
                if (!data.success) {//如果有错误
                	
                	if (data.errors.code) {//如果data.errors.code里面有字符串，说明验证码有错误
                    	
                   $("#check-code-status").removeClass('checking').addClass('error-status');
                                $('#contact_form_log').find('.div-code').append('<span class="help-block" id="help-block-code">' + data.errors.code + '</span>'+'<br class="help help-code">');
                               

                    
                    }
                	else{
                		 $("#check-code-status").removeClass('checking').addClass('success-status');
                		 $("#help-block-code").remove();
        $('br.help-code').remove();
                	}
                	
                	
                }
                else{
                	
    	$("#check-code-status").removeClass('checking').addClass('success-status');
    	 $("#help-block-code").remove();
        $('br.help-code').remove();
    }
                
                
    }).fail(function (data) {

                // for debug
                console.log(data);
            });
            
            
       
    }
    function checkData() {
    	
    	
    	var formData = {//先从contact.php传到这里，然后再传到submit.php
                'name' : $('input[name="name"]').val(),
                'email' : $('input[name="email"]').val(),
               'tel' : $('input[name="tel"]').val(),
                'message' : $('textarea[name="message"]').val(),
                'code' : $('input[name="6_letters_code"]').val()
            };
            
    	


    $("#check-code-status").removeClass('error-status');
    $("#check-code-status").removeClass('success-status');
    $("#check-code-status").addClass('checking');



    	$.ajax({
                type : 'POST',
                url  : 'check_availability.php',//传到submit.php
                data : formData,
                dataType : 'json',
    //          async:false,
                encode : true
            }).done(function (data) {
           
            	

            	
                // handle errors
                if (!data.success) {//如果有错误
                	
                	if (data.errors.code) {//如果data.errors.code里面有字符串，说明验证码有错误
                    	
                   $("#check-code-status").removeClass('checking').addClass('error-status');
                    
                    }
                	
                	if (data.errors.name) {
                    	
                 $("#check-name-status").removeClass('checking').addClass('error-status');
                    
                    }
                	
                
                }
                else{
                	
    	$("#check-code-status").removeClass('checking').addClass('success-status');
    }
                
    }).fail(function (data) {

                // for debug
                console.log(data);
            });
            
            }
}(jQuery));



