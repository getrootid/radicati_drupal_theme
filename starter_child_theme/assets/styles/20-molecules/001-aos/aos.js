Drupal.behaviors.animateOnScroll = {
  attach: function (context, settings) {
    // Initialize AOS
    AOS.init({
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
};