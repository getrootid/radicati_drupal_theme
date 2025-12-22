(function (Drupal, once) {
  Drupal.behaviors.popupContentButton = {
    attach: function (context, settings) {

      once('popup-button', 'button.popup-content-button__button', context).forEach(function (element) {
        element.addEventListener('click', (e) => {
          //const content = e.target.closest('.accordion-item');
          const content = document.getElementById('test-content'); //accordion.querySelector('.accordion-item__content');
          //const button = accordion.querySelector('.accordion-item__button');

          // Toggle the aria-expanded attribute
          // const expanded = button.getAttribute('aria-expanded') == 'true' ? 'false' : 'true';
          // button.setAttribute('aria-expanded', expanded);
          //
          // // Toggle the aria-hidden attribute
          // content.setAttribute('aria-hidden', expanded == 'true' ? 'false' : 'true');

          // Toggle the class on the wrapper
          content.classList.toggle('show');
        });
      });
    }
  };
})(Drupal, once);