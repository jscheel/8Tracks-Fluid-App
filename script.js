$.ajaxSetup({
  converters: {
    "text json": function(textValue) {
      data = jQuery.parseJSON(textValue);
      if (data.hasOwnProperty('mix')) {
        if (data.mix.nsfw) {
          for (var key in data.mix.cover_urls) {
            data.mix.cover_urls[key] = 'http://8tracks.com/images/extras/icon.jpg';
          }
        }
      }
      if (data.hasOwnProperty('mixes')) {
        for (var idx in data.mixes) {
          if (data.mixes[idx].nsfw) {
            for (var key in data.mixes[idx].cover_urls) {
              data.mixes[idx].cover_urls[key] = 'http://8tracks.com/images/extras/icon.jpg';
            }
          }
        }
      }
      return data;
    }
  }
});

$(document).bind('E8tracksPlayer-play', function () {
  if (E8tracksMobileUI.data.currentTrack !== null) {
    window.fluid.showGrowlNotification({
      title: E8tracksMobileUI.data.currentTrack.title,
      description: E8tracksMobileUI.data.currentTrack.artist,
      icon: E8tracksMobileUI.data.currentMix.covers.sq56,
      priority: 2,
      sticky: false
    });
    E8tracksMobileUI.player.getSoundManager().setVolume(parseInt($('#volume-slider')[0].value, 10));
  }
});

$(document).ready(function() {
  $('head').append('<style type="text/css">#volume-slider {position: absolute; width: 100px; height: 1px; padding: 0; margin: 0; top: 85px; left: 10px; -webkit-appearance: none !important; border: none; background: rgba(100, 100, 100, 0.746094);} #volume-slider::-webkit-slider-thumb {-webkit-appearance: none !important; background: #ddd; height: 10px; width: 10px; cursor: pointer !important; border-radius: 10px;}</style>');
  $('<input id="volume-slider" type="range" min="0" max="100" />').appendTo('#mixPage .player .player_controls').change(function(){
    E8tracksMobileUI.player.getSoundManager().setVolume(parseInt(this.value, 10));
  });
});
