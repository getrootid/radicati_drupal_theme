// Normally the hamburgers style themselves to match the state of the offcanvas. This script is only so that the hamburger styling can be toggled on the PatternLab demo pages. It shouldn't work when the hamburger is actually being used on a page.

// (function() {
//   var hamburgerToggles = document.querySelectorAll('.hamburger');
//
//   for(var i = 0; i < hamburgerToggles.length; i++) {
//     hamburgerToggles[i].addEventListener('click', handleHamburgerClicked);
//   }
//
//   function getCorrectTarget(e) {
//     var targetElement = e.target;
//
//     if(!targetElement.classList.contains('hamburger')) {
//       targetElement = targetElement.parentNode;
//     }
//
//     return targetElement;
//   }
//
//   function handleHamburgerClicked(e) {
//     var hamburgerElement = getCorrectTarget(e);
//
//     if(hamburgerElement.parentNode.classList.contains('sg-pattern-example')) {
//       hamburgerElement.classList.toggle('open');
//     }
//   }
//
// })();

(function ($, Drupal) {
  'use strict';

  //removeIf(patternLab)
  Drupal.behaviors.hamburger = {
    attach: function (context, settings) {
  //endRemoveIf(patternLab)


      // this is set to match the hamburger visibility breakpoint in _hamburger.scss
      var breakpointInPx = 992;
      var breakpointInEms = breakpointInPx / 16;

      $(document).ready(hamburgerTabindex(breakpointInEms));

      $(window).resize(function() {
        hamburgerTabindex(breakpointInEms);
      });

      $('.hamburger').once().on('click', function() {
        $(this).toggleClass('open');
        slideInOCanvas('#off-canvas');

        if($(this).attr('aria-expanded') === "true") {
          $(this).attr("aria-expanded", "false");
        } else {
          $(this).attr('aria-expanded', "true");
        }
      });


  //removeIf(patternLab)
    }
  };
  //endRemoveIf(patternLab)


  function slideInOCanvas(id) {
    $("body").toggleClass("off-canvas-open");
    $(id).toggleClass("off-canvas--open");
    if ($("#off-canvas").attr("aria-expanded") === "true") {
      $("#off-canvas").attr("aria-expanded", "false");
      $("body .focusable.skip-link").focus();
    } else {
      $("#off-canvas").attr("aria-expanded", "true");
      $("#off-canvas").focus();
    }
  }

  function windowWidthInEms() {
    var width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    // Because we're setting our base font size on the body element, we use body here.
    var emWidth = width / parseFloat(getComputedStyle(document.querySelector("body"))["font-size"]);

    return emWidth;
  }

  function hamburgerTabindex(breakpoint) {
    if (windowWidthInEms() < breakpoint) {
      $(".hamburger").attr("tabindex", "0");
    } else {
      $(".hamburger").attr("tabindex", "-1");
    }
  }


})(jQuery, Drupal);
