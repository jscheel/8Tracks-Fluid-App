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


eighttracksfluidapp = {};

eighttracksfluidapp.setFavIcon = function (favorited) {
  if (favorited) {
    $('#track_fav_button').css({
      backgroundPositionY: '-20px'
    }).html('Favorited');
  } else {
    $('#track_fav_button').css({
      backgroundPositionY: '0'
    }).html('Not favorited');
  }
};
// taken from http://stackoverflow.com/questions/5258829/wrapping-a-function-in-javascript-jquery/5259530#5259530
eighttracksfluidapp.wrap = function (functionToWrap, before, after, thisObject) {
  return function () {
    var args = Array.prototype.slice.call(arguments),
      result;
    if (before) before.apply(thisObject || this, args);
    result = functionToWrap.apply(thisObject || this, args);
    if (after) after.apply(thisObject || this, args);
    return result;
  };
};

E8tracksMobileUI.handleTrackData = eighttracksfluidapp.wrap(E8tracksMobileUI.handleTrackData, null, function (data) {
  window.eighttracksfluidapp.setFavIcon(data.set.track.faved_by_current_user);
});
$('<a id="track_fav_button"></a>').appendTo('#mixPage .trackDetails').wrap('<div></div>').css({
  cursor: 'pointer',
  color: '#fff',
  display: 'inline-block',
  height: '20px',
  paddingLeft: '25px',
  backgroundRepeat: 'no-repeat',
  backgroundImage: 'url("data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAA8CAYAAABmdppWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABJRJREFUeNq8WG1IVFkYPjN3nFFrtaYmJl36DqWIgn4FLkKwMOKP3WLJxditfkQUkVFRhlBQieHuRuxHsiwLsW6x1RIsrMxACGOKUtkHhoUl9iUVioqW2Yfj9LzTO3LnztxzzqyxBx6P5573Puc973nOee8ZRzAYFIpiAG+AuUC/tTMQCCS0nUJdvgHqgU7ApzJ2RKNRqUEoFGpEVQ2sA7rg0c8ye6eCLB9VAdAEnAXKVR6qplwGnINXEaAN//sxyMKpEJazZ/Gi9NKBVc5FvR34KkX/dHhWaAoBTf8f4KXFLgLUwfa0i8mIdFsKwkGLRLpA+jVLySqtP9DXZvbQD+zHS29FGgUk9N4ZkhZ56MSfYTROcH+YV1aXrAjVTVIBkSXpEAZVqCqAjTC4pCCrRHUM+Ba2Z22FDUMS8AVgOcXMhqyC9XkcNo9VsiERUxi6JQ5eB1ZYyewIabeHSMwSQhL5MnjqtXa4UhiXAg0W7Z1hr/ZioJc0GJ43sG29rYcwMni7hbi9h1exnsPQgWfFbH6Obe1PG5ZBDa0yCRW4Q5KCR93cX8aavc4nUC8wC/1jdjE0eBt1cBx3xMl4p5BXJQARNAO0KPOk5yFP6RYLXqbDZTS4VVoOjRRAnhkgiNj0WWLYrthe/UHDISbGo8I5J+ArScopYnU0/ZySl9ko3M7hPpD7pnpiTxL6PU0ilUzSyyn9wfxM58Bab8ZtkecJi4+SU8gzxFDMyLgrsoznazDI1HJKXmZ4sqHjpTSnTDN6V3/m3TrZHo18KpoHf+uS5RQirFyUfb7G72lJGi3D8YKmmfBsZHxRUkqBpETHyD4asJBOm7qeVxtEJOquKZj+O7rGpTHIcfUktN9MzATZASLbQrsmJmwE2o2+WgS+YlVOtcDKauWUoXfLxa2RKiI9DLIjSTsFxFUQ8LGVn9SKWe4bUjKa1f3RTTTdjeackrDK2FrVbydy17cPH40tgF15NPaluDe6pQ5k881ktjnF5RgV2cZTSRzvi1hO8ZXo5ZTZ7vaYmO0KiRwKKEKIvDqEpXM81xK01zr0o+h8sQtKyPogXgzm81yN5x97Qj6qyslDKg/H1oPsF2hv6e4nr0u+axk6JQbfrYj1zfVcTnlYWA/YopkZnc0rc2pjQsXLdfyZ0m36Xty+IOti8eJpf4nwwJ+k32xpTqHptAzGPDmI9g5Lwo/lFHhefWXoe+i1T2jnFE6bspIyp7hAkOpTRCen3PlPJzaR0ZZF7dPZjmndU7RIKYYKNAJrgZ+AnSp7FVk+0AsYwBqgVUWodU/hE7mNv8P/53sK3JTeU4BCU1t6TwFOE2El31P+trmnPLA8W2V3TwG+oEDmEilwEnBrrLoVflbCZvMqu5mwlVdWl6wIeAYcspNNFdAHfK5BRrMaB8pVOlzHhgUSsgrgFDBPR9heYIDFLJtqs66wA3wLUN5TAL2cYr6nsPYoJ/zKuozrriFVTrG6bHD8vNzeA7zimNUCPUAx95UC/6piGI8NBTvMgV9i6i/j5z/woDRYliyGCfcUu5yS1j0FJa2cQr/lpPVDULrlvQADAOvB+K4oQxtWAAAAAElFTkSuQmCC")'
}).click(function () {
  $.get('http://m.8tracks.com/tracks/' + E8tracksMobileUI.data.currentTrack.id + '/toggle_fav.json?api_key=bdb881f0c674a5d74ab7f31800e3b430b27f6e68', function (data) {
    eighttracksfluidapp.setFavIcon(data.track.faved_by_current_user);
  });
});
$(document).bind('E8tracksPlayer-play', function () {
  window.fluid.showGrowlNotification({
    title: E8tracksMobileUI.data.currentTrack.title,
    description: E8tracksMobileUI.data.currentTrack.artist,
    icon: E8tracksMobileUI.data.currentMix.cover.replace('original.jpg', 'sq56.jpg'),
    priority: 2,
    sticky: false
  });
});
