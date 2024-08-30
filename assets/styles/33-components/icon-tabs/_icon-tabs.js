(function ($, Drupal, once, TabsAutomatic) {
  "use strict";

  Drupal.behaviors.iconTabs = {
    attach: function (context, settings) {
      once('icon-tabs', '.icon-tabs', context)
          .forEach(function () {

            var tabs = document.querySelectorAll(".icon-tabs");

            for (var i = 0; i < tabs.length; i++) {
              // console.log(tabs[i]);
              new TabsAutomatic(tabs[i]);
            }
          });
    },
  };
})(jQuery, Drupal, once, TabsAutomatic);
