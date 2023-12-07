(function($) {
  Drupal.behaviors.offcanvasMenu = {
    attach: function (context, settings) {
      // Use context to filter the DOM to only the elements of interest,
      // and use once() to guarantee that our callback function processes
      // any given element one time at most, regardless of how many times
      // the behaviour itself is called (it is not sufficient in general
      // to assume an element will only ever appear in a single context).

      $('button.menu__toggle').once('offcanvasMenu').click(function() {
        var target = $(this).attr('aria-controls');
        var $target = $('#' + target);

        // Get the state of the toggle button
        var state = $(this).attr('aria-expanded');

        // Set the new state of the toggle button, and the state of the menu
        $(this).attr('aria-expanded', !(state === 'true'));
        $target.attr('aria-hidden', (state === 'true'));

      });
    }
  };
})(jQuery);