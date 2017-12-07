(function($) { 
    var data=req.body;  //console.log("data---" + JSON.stringify(data));
    
    var smtpTransport = nodemailer.createTransport({
       service: "Gmail", 
       auth: {
       user: "liudong12b@gmail.com",
       pass: "llg11111"
       }
    });
     
    smtpTransport.sendMail({  //email options
       from: "momo liu <liudong12b@gmail.com>",
       to: "Dong Liu <liudong12b@gmail.com>", // receiver
       subject: "Emailing with nodemailer", // subject
       html: "here your data goes" // body (var data which we've declared)
    }, function(error, res){  //callback
        
        if(error){
           console.log("Message sending error:" + JSON.stringify(error));
        }else{
           console.log("Message sent: " + JSON.stringify(res));
        }

        smtpTransport.close(); 
    });

    var response = {};
    response.success = true;
    response.message = 'Congratulations. Your message has been sent successfully';
    res.json(response); 
}(jQuery));