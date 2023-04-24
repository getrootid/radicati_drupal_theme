(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.radicatiMenu = {
    attach: function (context, settings) {
      /*
          Handles the expand menu button from menu templates.
       */

      $('.menu-item__open-dropdown').once().on('click', function() {
        $(this).parent('li').toggleClass("menu-item--dropdown-open");
      });
    }
  };
})(jQuery, Drupal);
