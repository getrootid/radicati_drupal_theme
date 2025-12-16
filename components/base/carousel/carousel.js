(function (Drupal, Splide) {
  "use strict";

  Drupal.behaviors.splideCarousel = {
    attach: function (context, settings) {

      const carousels = context.querySelectorAll('.carousel');
      carousels.forEach((carousel) => {

        carousel.classList.add('splide');

        // Get the set of slides for this carousel
        const slidesContainer = carousel.querySelector('.carousel__slides');
        slidesContainer.classList.add('splide__track');

        // Create a list to move the slides into
        const splideList = document.createElement('ul');
        splideList.classList.add('splide__list');

        // Get the slides and move them into splide structure
        const slides = Array.from(slidesContainer.children);

        slides.forEach((slide) => {
          const splideSlide = document.createElement('li');
          splideSlide.classList.add('splide__slide');
          splideSlide.appendChild(slide);
          splideList.appendChild(splideSlide);
        } );

        // Clear original slides and append splide structure
        slidesContainer.innerHTML = '';
        slidesContainer.appendChild(splideList);

        // Initialize Splide
        const splide = new Splide(carousel).mount();
      } );
    }
  };
})(Drupal, Splide);
