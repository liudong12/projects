

function checkCaptcha() {
	
	
	var formData = {//先从contact.php传到这里，然后再传到submit.php
            
           
            'code' : $('input[name="6_letters_code"]').val()
        };
        
	
//	$("#loaderIcon").show();
    $("#user-availability-status").removeClass('error-status');
    $("#user-availability-status").removeClass('success-status');
    $("#user-availability-status").addClass('checking');
//	jQuery.ajax({
//	url: "check_availability.php",
////	data:'6_letters_code='+$("#6_letters_code").val(),
//	type: "POST",
//	
//	data : formData,
//  dataType : 'json',
//  encode : true
//  
//	success:function(data){
//		
////		$("#user-availability-status").html(data);
////		$("#loaderIcon").hide();
//if (!data.success) {
//$("#user-availability-status").removeClass('checking').addClass('error-status');
//}
//else{
//	$("#user-availability-status").removeClass('checking').addClass('success-status');
//}
//	},
//	error:function (){}
//	});
//	alert('e');
	$.ajax({
            type : 'POST',
            url  : 'check_availability.php',//传到submit.php
            data : formData,
            dataType : 'json',
            encode : true
        }).done(function (data) {
            // handle errors
            
//         alert('d');
            if (!data.success) {
            	
            	$("#user-availability-status").removeClass('checking').addClass('error-status');
//          	alert('a');
            }
            else{
            	
	$("#user-availability-status").removeClass('checking').addClass('success-status');
//	alert('b');
}
}).fail(function (data) {
//alert('c');
            // for debug
            console.log(data);
        });
        
        }