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
  }
});
