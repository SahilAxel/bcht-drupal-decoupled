/**
 * @file
 * Featured event-listing behaviour.
 *
 */
(function (Drupal, $) {
  Drupal.behaviors.featuredeventlisting = {
    attach: function (context) {
      if ($('.event_reference').length > 0) {
        $(once('featuredevents_item', '.event_reference', context)).each(
          function () {
            const eyebrow = $(this).attr('attr-eyebrow');
            if (eyebrow) {
              $(this).find('.card_eyebrow').html(eyebrow);
            } else {
              $(this).find('.card_eyebrow').addClass('hidden');
            }
          },
        );
      }
    },
  };
})(Drupal, jQuery);
