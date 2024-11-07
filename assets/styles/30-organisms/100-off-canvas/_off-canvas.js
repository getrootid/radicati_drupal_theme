(function($) {
  Drupal.behaviors.offcanvas = {
    attach: function (context, settings) {
      // Toggles the state of the off-canvas when the .header__offcanvas-toggle button is clicked.
      // Toggle aria-hidden on the #off-canvas element and toggle aria-expanded on the button.
      // Also toggle the aria-expanded on the local button that controls the off-canvas.
      // ALSO set the keyboard focus to be on the first focusable element in the off-canvas.
      const elements = once('toggleOffCanvasButtons', '[aria-controls="off-canvas"]', context);
      elements.forEach((element) => {

        element.addEventListener('click', function(e) {
          var $offcanvas = $('#off-canvas');
          var $overlay = $('.off-canvas__overlay');
          var $toggle = $('[aria-controls="off-canvas"]');

          toggleOffCanvas($toggle, $offcanvas, $overlay);
        });
      });


      // $('[aria-controls="off-canvas"]', context).once().on('click', function(e) {
      //   var $offcanvas = $('#off-canvas');
      //   var $overlay = $('.off-canvas__overlay');
      //   var $toggle = $('[aria-controls="off-canvas"]');
      //
      //   toggleOffCanvas($toggle, $offcanvas, $overlay);
      // });

      // When .off-canvas__overlay is clicked, close the off-canvas and toggle the button that has
      // aria-controls="off-canvas" to aria-expanded="false"

      const overlay = once('ocOverlayClick', '.off-canvas__overlay', context);
      overlay.forEach((element) => {

        element.addEventListener('click', function(e) {
          var $offcanvas = $('#off-canvas');
          var $overlay = $('.off-canvas__overlay');
          var $toggle = $('[aria-controls="off-canvas"]');

          toggleOffCanvas($toggle, $offcanvas, $overlay);
        });
      });

      // When aria-hidden=false on #off-canvas, trap the tab key to elements within #off-canvas
      // Also, if the user presses escape, close the off-canvas and toggle the button that has
      // aria-controls="off-canvas" to aria-expanded="false"
      once('ocWindowKeydown', 'body').forEach((element) => {
        $(window).on('keydown', function(e) {
          // If the off-canvas is not visible, do nothing.
          if ($('#off-canvas').attr('aria-hidden') === 'true') {
            return;
          }

          var $offcanvas = $('#off-canvas');
          var $overlay = $('.off-canvas__overlay');
          var $toggle = $('[aria-controls="off-canvas"]');

          var $focusable = $offcanvas.find('a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])');
          var keyCode = e.keyCode || e.which;

          // Remove hidden elements from the $focusable list
          $focusable = $focusable.filter(':visible');
          var $first = $focusable.first();
          var $last = $focusable.last();

          if (keyCode === 9) {
            if (e.shiftKey) {
              if (document.activeElement === $first[0]) {
                e.preventDefault();
                $last.focus();
              }
            } else {
              if (document.activeElement === $last[0]) {
                e.preventDefault();
                $first.focus();
              }
            }
          } else if (keyCode === 27) {
            toggleOffCanvas($toggle, $offcanvas, $overlay);
          }
        });
      });

      function toggleOffCanvas($toggles, $offcanvas, $overlay) {
        if($offcanvas.attr('aria-hidden') === 'true') {
          $offcanvas.attr('aria-hidden', 'false');
          $toggles.attr('aria-expanded', 'true');

          // Add class to show that the oc is activating
          $offcanvas.removeClass('off-canvas--hidden');
          $offcanvas.addClass('off-canvas--activating');
          setTimeout(() => {
            $first.focus();
            $offcanvas.removeClass('off-canvas--activating');
            $offcanvas.addClass('off-canvas--active');
          }, 200);


          // Now that it's visible, set the keyboard focus to be on the first focusable element in the off-canvas.
          var $focusable = $offcanvas.find('a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])');
          var $first = $focusable.first();



          $overlay.addClass('off-canvas__overlay--active');
        } else {
          $offcanvas.attr('aria-hidden', 'true');
          $toggles.attr('aria-expanded', 'false');
          $overlay.removeClass('off-canvas__overlay--active');

          // similar to above, but for deactivating
          $offcanvas.removeClass('off-canvas--active');
          $offcanvas.addClass('off-canvas--deactivating');
          setTimeout(() => {
            $offcanvas.removeClass('off-canvas--deactivating');
            $offcanvas.addClass('off-canvas--hidden');
          }, 200);
        }
      }
    }
  };
})(jQuery);