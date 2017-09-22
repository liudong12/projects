$(function() {
	var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
	
	$("#mainNav ul li a").each(function() {	
		if ($(this).attr("href") == pgurl || $(this).attr("href") == '')

			$(this).addClass("current");
	})
	if(pgurl== '') $("#mainNav ul li a.index").addClass("current");
});
