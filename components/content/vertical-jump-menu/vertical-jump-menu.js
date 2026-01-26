"use strict";
(function (Drupal, VanillaScrollspy) {

  Drupal.behaviors.jumpMenu = {
    attach: function (context, settings) {

      const jumpMenu = document.querySelector('.vertical-jump-menu__nav-list');

      if (!jumpMenu) {
        return;
      }

      const scrollspy = VanillaScrollspy({
        menu: jumpMenu
      });
      scrollspy.init();
    }
  };
})(Drupal, VanillaScrollspy);
