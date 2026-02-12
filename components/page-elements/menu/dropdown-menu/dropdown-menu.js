(function(Drupal, once) {
  Drupal.behaviors.dropdownMenu = {
    attach: function (context, settings) {

      once('dropdownMenuHover', 'li.menu__item--has-children', context).forEach((element) => {
        // Set the onMouseEnter listener for the menu item with children
        var timer;

        element.addEventListener('mouseenter', function(e) {
          var toggleButton = element.querySelector('button.menu__dropdown-toggle');
          var target = toggleButton.getAttribute('aria-controls');
          var targetElement = document.getElementById(target);

          showMenuByElement(toggleButton);
          // // Set an expanded class on the parent menu item "li.menu__item--expanded"
          // // to allow for styling of the expanded menu item
          // element.classList.add('menu__item--expanded');
          //
          // // Set the state of the toggle button, and the state of the menu
          // toggleButton.setAttribute('aria-expanded', 'true');
          // targetElement.setAttribute('aria-hidden', 'false');
          clearTimeout(timer);
        });

        // Set the onMouseLeave listener for the menu item with children
        element.addEventListener('mouseleave', function(e) {

          timer = setTimeout(function(event){
            var toggleButton = element.querySelector('button.menu__dropdown-toggle');
            hideMenuByElement(toggleButton);
            // var target = toggleButton.getAttribute('aria-controls');
            // var targetElement = document.getElementById(target);
            //
            // // Remove the expanded class on the parent menu item "li.menu__item--expanded"
            // element.classList.remove('menu__item--expanded');
            //
            // // Set the state of the toggle button, and the state of the menu
            // toggleButton.setAttribute('aria-expanded', 'false');
            // targetElement.setAttribute('aria-hidden', 'true');
          }, 1000);

        });
      });

      once('dropdownMenuToggleButton', 'button.menu__dropdown-toggle', context).forEach((element) => {
        // Set the onClick listener for the menu toggle button
        element.addEventListener('click', function(e) {


          // Get the state of the toggle button
          var state = element.getAttribute('aria-expanded');

          if(state === 'false') {
            showMenuByElement(element);
          } else {
            hideMenuByElement(element);
          }

        });
      });

      function showMenuByElement(element) {
        var target = element.getAttribute('aria-controls');
        var targetElement = document.getElementById(target);

        // Set an expanded class on the parent menu item "li.menu__item--expanded"
        // to allow for styling of the expanded menu item
        var parentMenuItem = element.closest('.menu__item');
        parentMenuItem.classList.add('menu__item--expanded');

        // Get sibling expanded menu items and close them
        var siblingExpandedMenuItems = parentMenuItem.parentElement.querySelectorAll('.menu__item--expanded');
        siblingExpandedMenuItems.forEach(function(sibling) {
          if(sibling !== parentMenuItem) {
            var siblingToggleButton = sibling.querySelector('button.menu__dropdown-toggle');
            hideMenuByElement(siblingToggleButton);
          }
        });

        // Set the new state of the toggle button, and the state of the menu
        element.setAttribute('aria-expanded', 'true');
        targetElement.setAttribute('aria-hidden', 'false');

        // See if the menu is leaving the page bounds, and if so, add a class to adjust its position
        var bounding = targetElement.getBoundingClientRect();
        if(bounding.right > (window.innerWidth || document.documentElement.clientWidth)) {
          targetElement.classList.add('menu__dropdown--align-right');
        }
      }

      function hideMenuByElement(element) {
        var target = element.getAttribute('aria-controls');
        var targetElement = document.getElementById(target);

        // Set an expanded class on the parent menu item "li.menu__item--expanded"
        // to allow for styling of the expanded menu item
        var parentMenuItem = element.closest('.menu__item');
        parentMenuItem.classList.remove('menu__item--expanded');

        // Set the new state of the toggle button, and the state of the menu
        element.setAttribute('aria-expanded', 'false');
        targetElement.setAttribute('aria-hidden', 'true');
      }
    }
  };
})(Drupal, once);