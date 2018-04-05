jQuery(function($) {
    $('body').click(function(){
        $('.vjs-big-play-button.animated.fadeIn').click(function(){
            $(".vjs-playback-rate ul[class='vjs-menu-content'] li")[0].click(); //变速
            $("div.vjs-volume-menu-button").click(); //静音
            $('#player_html5_api').on({
              pause: function() {
                $('#player_html5_api').trigger('play');
              },
              ended: function() {
                alert('当前视频已经播放完毕！')
              }
            })   
        })
    })
});
