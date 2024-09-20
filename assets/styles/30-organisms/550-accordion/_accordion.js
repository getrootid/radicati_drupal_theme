(function (Drupal, once) {
  Drupal.behaviors.accordions = {
    attach: function (context, settings) {

      once('accordion', 'button.accordion-item__button', context).forEach(function (element) {
        element.addEventListener('click', (e) => {
          const accordion = e.target.closest('.accordion-item');
          const content = accordion.querySelector('.accordion-item__content');
          const button = accordion.querySelector('.accordion-item__button');

          // Toggle the aria-expanded attribute
          const expanded = button.getAttribute('aria-expanded') == 'true' ? 'false' : 'true';
          button.setAttribute('aria-expanded', expanded);

          // Toggle the aria-hidden attribute
          content.setAttribute('aria-hidden', expanded == 'true' ? 'false' : 'true');

          // Toggle the class on the wrapper
          accordion.classList.toggle('accordion-item--expanded');
        });
      });
    }
  };
})(Drupal, once);