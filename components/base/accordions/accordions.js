(function (Drupal, once) {
  Drupal.behaviors.accordions = {
    attach: function (context, settings) {

      once('accordions', 'div.accordions', context).forEach(function (element) {
        // For each set of accordions, check if data-only-one is set to true.
        // if it's false, just return, there's nothing the accordions behavior needs to do.
        const onlyOne = element.getAttribute('data-only-one');
        if (onlyOne != 1) {
          return;
        }

        // If it's set to true, then we need to add event listeners to each accordion item button
        const accordionItems = element.querySelectorAll('.accordion-item');
        accordionItems.forEach(function (item) {
          const button = item.querySelector('button.accordion-item__button');
          button.addEventListener('click', (e) => {
            // When an accordion item button is clicked, we need to close all other accordion items
            accordionItems.forEach(function (otherItem) {
              if (otherItem !== item) {
                const otherButton = otherItem.querySelector('.accordion-item__button');
                const otherContent = otherItem.querySelector('.accordion-item__content');
                otherButton.setAttribute('aria-expanded', 'false');
                otherContent.setAttribute('aria-hidden', 'true');
                otherItem.classList.remove('accordion-item--expanded');
              }
            });
          });
        });
      });
    }
  };
})(Drupal, once);