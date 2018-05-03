jQuery(function($) {
	console.log('load');
	$('li').click(function(e){
		console.log('listening'); 
		$("div.speedTab15").click(); //变速
		$("div.volumeIcon").click(); //静音
		$('#vjs_mediaplayer_html5_api').on({
		pause: function() {
			console.log('continue'); $('#vjs_mediaplayer_html5_api').trigger('play');
		},
		ended: function() {
			alert('当前视频已经播放完毕！')
		} 
		})   
	})
});
