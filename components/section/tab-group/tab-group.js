(function (Drupal, TabsAutomatic) {
  "use strict";

  /**
   * The tabs render as a tab div and a tab panel div. Without JS the tabs will just
   * be listed onee after the other with their content. With JS we move the tab labels into a
   * tablist nav element and add the necessary ARIA roles and attributes to make it an accessible
   * tab widget.
   *
   * Tab button required attributes:
   * - role="tab"
   * - aria-controls="IDREF of the associated tabpanel"
   * - id="unique ID for the tab button"
   *
   * Tab panel required attributes:
   * - role="tabpanel"
   * - aria-labelledby="IDREF of the associated tab button"
   * - id="unique ID for the tab panel"
   */

  Drupal.behaviors.tabPanel = {
    attach: function (context, settings) {
      var tabs = context.querySelectorAll(".tab-group");


      for (var i = 0; i < tabs.length; i++) {
        // For each tab panel element, iterate through the tabs and move the
        // .tab__label div into a new button element that is placed in the .tab-panel__nav__list list.

        if(tabs[i].getAttribute('data-tabs-initialized') === 'true') {
          continue;
        } else {
          tabs[i].setAttribute('data-tabs-initialized', 'true');
        }

        var tabLabel = tabs[i].querySelectorAll('.tab__label');
        var navList = tabs[i].querySelector('.tab-group__nav__list');

        tabLabel.forEach(function( label) {
          var tabPanel = label.getAttribute('data-tab');
          var button = document.createElement("button");

          button.className = "tab-group__nav__button";
          button.innerHTML = label.outerHTML;
          button.role = "tab";
          button.setAttribute('aria-controls', tabPanel);
          navList.appendChild(button);
          button.setAttribute('id', tabPanel + "--tab");
          label.remove();
        } );


        new TabsAutomatic(tabs[i]);

      }
    }
  };
})(Drupal, TabsAutomatic);
