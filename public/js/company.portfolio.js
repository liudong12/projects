$(function () {
	
//	$('#detail').dialog({
//		width: 1000,
//      height: 1000,
//		//closeOnEscape : false,//禁止按esc键以后可以关闭对话框
//		modal : true,
//		resizable : false,
//		draggable : false,
//		//closeText : '关闭',
//		autoOpen : true,
//	});//隐藏对话框的头部
});

(function($) { 
	var closeFn;

	function closeShowingModal(liked) {
		if (liked !== undefined) {
			_gaq.push(['_trackEvent', 'ctajs', liked ? 'liked' : 'unliked']);
		}
		var showingModal = document.querySelector('.modal.show');
		if (!showingModal) return;
		showingModal.classList.remove('show');
		document.body.classList.remove('disable-mouse');
		if (closeFn) {
			closeFn();
			closeFn = null;
		}
	}

	document.addEventListener('click', function(e) {
				var target = e.target;
				if (target.dataset.ctaTarget) {
					_gaq.push(['_trackEvent', 'ctajs', 'modal']);
					closeFn = cta(target, document.querySelector(target.dataset.ctaTarget), {
						relativeToWindow: true
					}, function showModal(modal) {   
						$(".sample").addClass('hide-sample');  //好用，先隐藏掉sample区块，要不然太长了。
						modal.classList.add('show');
						document.body.classList.add('disable-mouse');
					});
				} 
				else if (target.classList.contains('modal-close-btn-click')) {
					//$(".sample").removeClass('hide-sample');  //好用，
					$(".sample").addClass('show-sample');  //好用，
					closeShowingModal();
				}
	});

	document.addEventListener('keyup', function (e) {
		if (e.which === 27) {
		closeShowingModal();
		}
	})

	var _gaq = _gaq || [];
}(jQuery));