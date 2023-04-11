(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.sticky_footer = {
    attach: function (context, settings) {

      // Get all notices on the page
      $('.site-notice').once().each(function (i, item) {

        var nid = $(item).attr('data-notice-id');
        var cookieid = "notice--" + nid;

        // Show notices if the cookie isn't set
        if( !jQuery.cookie(cookieid) ) {
          $(item).show();
        }
      });

      // One click, set the cookie so that this isn't shown again.
      jQuery('.site-notice__close').on('click', function() {
        var $parent = $(this).closest('.site-notice');
        var notice_id = $parent.attr('data-notice-id');
        jQuery.cookie('notice--' + notice_id, true, {expires: 14});
        $(this).closest('.site-notice').hide();
      });
    }
  };

})(jQuery, Drupal);
