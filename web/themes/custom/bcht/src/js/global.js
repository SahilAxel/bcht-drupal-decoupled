(function (Drupal, $, once) {
  Drupal.behaviors.global = {
    attach: function (context) {
      // Back to top JS
      var $backToTop = $('.back-to-top');
      $backToTop.hide();
      $(window).on('scroll', function () {
        if ($(this).scrollTop() > 100) {
          $backToTop.fadeIn();
        } else {
          $backToTop.fadeOut();
        }
      });
      $(once('backToTop', $backToTop, context)).click(function () {
        $('html, body').animate({ scrollTop: 0 }, 500);
      });
    },
  };
})(Drupal, jQuery, once);
