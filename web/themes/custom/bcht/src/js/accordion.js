/**
 * @file
 * Accordion behaviour.
 *
 */
(function (Drupal, $) {
  Drupal.behaviors.accordion = {
    attach: function () {
      $('.paragraph--type--accordion-item .accordion-trigger').on(
        'click',
        function () {
          $(this)
            .closest('.paragraph--type--accordion-item')
            .toggleClass('open');
          $(this).toggleClass('is-expanded');
          $(this).attr('aria-expanded', 'true');

          if ($(this).hasClass('is-expanded')) {
            $(this).attr('aria-expanded', 'true');
            $(this)
              .closest('.paragraph--type--accordion-item')
              .find('.accordion-description')
              .attr('aria-hidden', 'false');
          } else {
            $(this).attr('aria-expanded', 'false');
            $(this)
              .closest('.paragraph--type--accordion-item')
              .find('.accordion-description')
              .attr('aria-hidden', 'true');
          }
        },
      );
    },
  };
})(Drupal, jQuery);
