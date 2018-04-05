jQuery(function($) {
    $('body').click(function(){
        $('#player_html5_api').on({
          pause: function() {
            $('#player_html5_api').trigger('play');
          },
          ended: function() {
            alert('当前视频已经播放完毕！')
          }
        })
    })
});
