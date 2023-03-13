(function ($, Drupal, once) {
  function getOffsets(offset) {
    var root = document.querySelector(":root");
    var offset = Drupal.displace();
    console.log("offset: ", offset);
    console.log(offset.top);
    root.style.setProperty("--drupal-displace-offset-top", offset.top + "px");
  }

  window.addEventListener("DOMContentLoaded", (event) => {
    getOffsets();
  });

  window.addEventListener(
    "resize",
    (event) => {
      getOffsets();
    },
    true
  );
})(jQuery, Drupal, once);
