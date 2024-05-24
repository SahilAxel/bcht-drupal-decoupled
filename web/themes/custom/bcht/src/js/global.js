(function(Drupal, $, once) {
  Drupal.behaviors.global = {
    attach: (context, settings) => {
      console.log('Hello CI/CD');
    },
  };
})(Drupal, jQuery, once);
