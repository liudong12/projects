(function($) { 
	var cubuk_seviye = $(document).scrollTop();
		var header_yuksekligi = $('.a').outerHeight();

		$(window).scroll(function() {
			var kaydirma_cubugu = $(document).scrollTop();

			if (kaydirma_cubugu > header_yuksekligi) {
				$('.headerRoom').addClass('hideHeader');
				//$('.header_space').addClass('afterscroll');
				
				$('.headerRoom').addClass('deepColor'); //加深颜色
			} else {
				$('.headerRoom').removeClass('hideHeader');
				//$('.header_space').removeClass('afterscroll');

				$('.headerRoom').removeClass('deepColor'); //减淡颜色
			}

			if (kaydirma_cubugu > cubuk_seviye) {
				$('.headerRoom').removeClass('showHeader');
				//$('.header_space').removeClass('beforescroll');
			} else {
				$('.headerRoom').addClass('showHeader');
				//$('.header_space').addClass('beforescroll');
			}

			cubuk_seviye = $(document).scrollTop();
		});
}(jQuery));