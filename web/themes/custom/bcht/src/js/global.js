(function (Drupal, $, once) {
  Drupal.behaviors.global = {
    attach: (context, settings) => {
      console.log("Hello test")
    },
  };
}(Drupal, jQuery, once));
