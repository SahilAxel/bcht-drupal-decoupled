(function (Drupal, $) {
  Drupal.behaviors.global = {
    attach: function (context, settings) {
      console.log('Hello World');
    },
  };
})(Drupal, jQuery);
