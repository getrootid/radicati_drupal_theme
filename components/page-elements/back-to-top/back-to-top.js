(function (Drupal, once) {
  Drupal.behaviors.radBacktoTop = {
    attach: function attach(context) {
      var jumper = document.querySelector(".back-to-top__wrapper");

      function positionCheck() {
        if (window.pageYOffset > 100) {
          jumper.classList.add("show");
        } else if (jumper.classList.contains("show")) {
          jumper.classList.remove("show");
        }
      }

      document.addEventListener("scroll", positionCheck, { passive: true });
    }
  };
})(Drupal, once);