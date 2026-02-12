Drupal.behaviors.offCanvasToggle = {
  attach: function (context, settings) {

    const elements = once('toggleOffCanvasButtons', '[aria-controls="off-canvas"]', context);
    var offcanvas = document.getElementById('off-canvas');
    var overlay = document.getElementById('off-canvas-overlay');
    var toggles = document.querySelectorAll('[aria-controls="off-canvas"]');

    elements.forEach((element) => {

      element.addEventListener('click', function(e) {
        toggleOffCanvas(toggles, offcanvas, overlay);
      });
    });


    once('ocWindowKeydown', 'body').forEach((element) => {
      document.addEventListener('keydown', (e) => {
        // If the off-canvas is not visible, do nothing.
        if ( offcanvas.getAttribute('aria-hidden') === 'true') {
          return;
        }

        var focusable = offcanvas.querySelectorAll('a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])');
        // Remove hidden elements from the $focusable list

        focusable = [...focusable].filter((el) => isFocusable);
        var first = focusable[0];
        var last  = focusable.at(-1);

        switch (e.key) {
          case "Escape":
            // Focus the toggle button that controls the off-canvas, and close the off-canvas
            toggles.item(0).focus();
            toggleOffCanvas(toggles, offcanvas, overlay);
            break;

          case "Tab":
            if(e.shiftKey) {
              if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
              }
            } else {
              if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
              }
            }
            break;
        }
      });
    });

    const isFocusable = element => {
      if (!(element instanceof HTMLElement)) {
        return false;
      }
      // https://stackoverflow.com/a/30753870/76472
      const knownFocusableElements =
        'a[href],area[href],button:not([disabled]),details,iframe,object,input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[contentEditable="true"],[tabindex]:not([tabindex^="-"])';
      if (element.matches(knownFocusableElements)) {
        return true;
      }

      const isDisabledCustomElement =
        element.localName.includes('-') && element.matches('[disabled], [aria-disabled="true"]');
      if (isDisabledCustomElement) {
        return false;
      }

      return element.shadowRoot?.delegatesFocus ?? false;
    };

    function toggleOffCanvas(toggles, offcanvas, overlay) {

      if(offcanvas.getAttribute('aria-hidden') === "true") {

        offcanvas.setAttribute('aria-hidden', 'false');
        toggles.forEach( (el) => el.setAttribute('aria-expanded', 'true') );

        // Add class to show that the oc is activating
        offcanvas.classList.remove('off-canvas--hidden');
        offcanvas.classList.add('off-canvas--activating');

        setTimeout(() => {
          first.focus();
          offcanvas.classList.remove('off-canvas--activating');
          offcanvas.classList.add('off-canvas--active');
        }, 200);


        // Now that it's visible, set the keyboard focus to be on the first focusable element in the off-canvas.

        var focusable = offcanvas.querySelectorAll('a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])');
        var first = focusable.item(0);

        overlay.classList.add('off-canvas__overlay--active');

      } else {
        offcanvas.setAttribute('aria-hidden', 'true');
        toggles.forEach((el) => el.setAttribute('aria-expanded', 'false') );
        overlay.classList.remove('off-canvas__overlay--active');

        // similar to above, but for deactivating
        offcanvas.classList.remove('off-canvas--active');
        offcanvas.classList.add('off-canvas--deactivating');

        setTimeout(() => {
          offcanvas.classList.remove('off-canvas--deactivating');
          offcanvas.classList.add('off-canvas--hidden');
        }, 200);
      }
    }

  }
};