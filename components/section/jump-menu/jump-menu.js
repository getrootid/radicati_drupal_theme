"use strict";
(function (Drupal, VanillaScrollspy) {

  Drupal.behaviors.jumpMenu = {
    attach: function (context, settings) {

      const jumpMenu = document.querySelector('.jump-menu__items');
      const scrollspy = VanillaScrollspy({ menu: jumpMenu });

      scrollspy.init();
    }
  };
})(Drupal, VanillaScrollspy);
