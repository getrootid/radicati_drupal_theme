Drupal.behaviors.stickyHeader = {
  attach: function (context, settings) {
    // Use context to filter the DOM to only the elements of interest,
    // and use once() to guarantee that our callback function processes
    // any given element one time at most, regardless of how many times
    // the behaviour itself is called (it is not sufficient in general
    // to assume an element will only ever appear in a single context).
    once('stickyAdded', 'body.radicati-header-sticky #site-header', context).forEach(
      function (element) {
        // Get the padding on the body element.
        var bodyTop = window.getComputedStyle(document.body).getPropertyValue('padding-top');
        var stickyOptions = {};

        if(bodyTop !== null && bodyTop !== '0px') {
          stickyOptions.stickyBitStickyOffset = parseInt(bodyTop);
        }

        stickybits('#site-header', stickyOptions);
      }
    );
  }
};