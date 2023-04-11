jQuery(document).ready(function () {
  // Target your .container, .wrapper, .post, etc.
  // YouTube has another source that needs to be checked for

  var videoSelector = ".media--type-remote-video .field-media-oembed-video";
  var youtubeSrc = 'iframe[src*="youtu.be"]';

  fitvids(videoSelector, {
    players: [youtubeSrc],
  });

  // Vanilla FitVids version
  // fitVids(videoSelector, {
  //   customSelector: [youtubeSrc],
  // });
});
