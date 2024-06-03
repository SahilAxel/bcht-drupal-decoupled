(function (Drupal, $) {
  Drupal.behaviors.ignore = {
    attach: function (context, settings) {
      console.log('gitignore');
    },
  };
})(Drupal, jQuery);
