Drupal.behaviors.detailsHoverCard = {
  attach: function (context, settings) {

    console.log('here');

    once('detailshover', '.details-hover-card', context).forEach(function (element) {
      element.addEventListener('click', (e) => {
        const card = e.target.closest('.details-hover-card');

        FlipCard(card);

      });

      element.addEventListener('keydown', (e) => {
        if( (e.code === 'Enter' || e.code === 'Space' || e.code === 'Escape') && !e.repeat) {
          const card = e.target.closest('.details-hover-card');
          e.preventDefault();

          FlipCard(card);
        }
      });



      function FlipCard(card) {
        const cardHoverContent = card.querySelector('.details-hover-card__hover-content');

        const state = card.getAttribute('aria-pressed') === 'true';

        if(state) {
          card.setAttribute('aria-pressed', 'false');
          cardHoverContent.setAttribute('aria-hidden', 'true');
        } else {
          card.setAttribute('aria-pressed', 'true');
          cardHoverContent.setAttribute('aria-hidden', 'false');
        }
      }
    });
  }
};