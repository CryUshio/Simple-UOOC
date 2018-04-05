jQuery(function($) {
    $('#player_html5_api').on({
          pause: function() {
            $('#player_html5_api').trigger('play');
          }
    })
});
