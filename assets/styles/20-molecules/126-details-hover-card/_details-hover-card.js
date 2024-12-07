Drupal.behaviors.detailsHoverCard = {
  attach: function (context, settings) {

    once('detailshover', '.details-hover-card', context).forEach(function (element) {

      // If the current element has the details-hover-card--use-focus class,
      // then use focus/hover instead of click.

      if(element.classList.contains('details-hover-card--use-focus')) {
        element.addEventListener('focus', (e) => {
          const card = e.target.closest('.details-hover-card');
          FlipCardFlipped(card);
        });

        element.addEventListener('mouseover', (e) => {
          const card = e.target.closest('.details-hover-card');
          FlipCardFlipped(card);
        });



        // Add a blur event listener user leaves the card, but not
        // if it is going to a child element.
        element.addEventListener('focusout', (e) => {
          const card = e.target.closest('.details-hover-card');

          // use setTimeout to allow the next element to be focused
          setTimeout(() => {
            if(!card.contains(document.activeElement)) {
              FlipCardNormal(card);
            }
          }, 10);
        });

        element.addEventListener('mouseleave', (e) => {
          const card = e.target.closest('.details-hover-card');
          if(!card.contains(document.activeElement)) {
            FlipCardNormal(card);
          }
        });

        element.addEventListener('mouseout', (e) => {
          const card = e.target.closest('.details-hover-card');
          if(!card.contains(document.activeElement)) {
            FlipCardNormal(card);
          }
        });
      } else {
        element.addEventListener('click', (e) => {
          const card = e.target.closest('.details-hover-card');
          FlipCard(card);
        });
      }



      element.addEventListener('keydown', (e) => {
        if( (e.code === 'Space' || e.code === 'Escape') && !e.repeat) {
          const card = e.target.closest('.details-hover-card');
          e.preventDefault();

          FlipCardNormal(card);
        }
      });


      function FlipCardNormal(card) {
        const cardHoverContent = card.querySelector('.details-hover-card__hover-content');
        const state = card.getAttribute('aria-pressed') === 'true';

        card.setAttribute('aria-pressed', 'false');
        cardHoverContent.setAttribute('aria-hidden', 'true');
      }

      function FlipCardFlipped(card) {
        const cardHoverContent = card.querySelector('.details-hover-card__hover-content');
        const state = card.getAttribute('aria-pressed') === 'true';

        card.setAttribute('aria-pressed', 'true');
        cardHoverContent.setAttribute('aria-hidden', 'false');
      }

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