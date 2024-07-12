/**
 * @file
 * Article-listing behaviour.
 *
 */
(function (Drupal, $) {
  Drupal.behaviors.articlelisting = {
    attach: function (context) {
      if ($('#edit-type').find('.selected').length == 0) {
        $('#edit-type').prepend(
          '<span class="selected selected-type" tabindex="0" role="button" aria-label="Select the type for the Article">All</span>',
        );
      }
      if ($('#edit-topic').find('.selected').length == 0) {
        $('#edit-topic').prepend(
          '<span class="selected selected-topic" tabindex="0" role="button" aria-label="Select the topic for the Article">All</span>',
        );
      }

      // radio js
      $('#edit-type .form-radios .form-radio').each(function () {
        if ($(this).prop('checked')) {
          $(this).parent().addClass('active');
        }
      });
      $('#edit-type .selected-type').html(
        $(
          '.article-listing-filter-wrapper #edit-type .form-radios .form-type-radio.active',
        )
          .find('label')
          .html(),
      );
      $('#edit-topic .form-radios .form-radio').each(function () {
        if ($(this).prop('checked')) {
          $(this).parent().addClass('active');
        }
      });
      $('.form-radios .form-type-radio').each(function () {
        $(this).attr('tabindex', '0').attr('role', 'radio');
      });
      $('#edit-topic .selected-topic').html(
        $(
          '.article-listing-filter-wrapper #edit-topic .form-radios .form-type-radio.active',
        )
          .find('label')
          .html(),
      );

      // Dropdown js
      $('.article-listing-filter-wrapper .fieldset-wrapper').each(function () {
        $(once('dropdown', $(this), context)).click(function () {
          if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).find('.form-radios').slideUp();
          } else {
            $(this).addClass('active');
            $(this).find('.form-radios').slideDown();
          }
        });
        $(once('dropdownkeypress', $(this), context)).keypress(function (e) {
          if (e.which == 13) {
            if ($(this).hasClass('active')) {
              $(this).removeClass('active');
              $(this).find('.form-radios').slideUp();
            } else {
              $(this).addClass('active');
              $(this).find('.form-radios').slideDown();
            }
          }
        });
      });
      $(
        once(
          'keypressradio',
          $('.article-listing-filter-wrapper .form-radios .form-type-radio'),
          context,
        ),
      ).keypress(function (e) {
        if (e.which == 13) {
          $(this).find('.form-radio').trigger('click');
        }
      });

      //On document click or outside element click JS
      $(document).on('click', function (event) {
        // Close dropdown
        if (
          !$(event.target).closest('.article-listing-filter-wrapper').length
        ) {
          $('.article-listing-filter-wrapper .fieldset-wrapper').removeClass(
            'active',
          );
          $('.article-listing-filter-wrapper .form-radios').slideUp();
        }
      });

      //******************** */
      // js for page scroll if query parameters avilable in the URL
      const currURL = $(location).attr('href');
      if (currURL.indexOf('?type=') != -1 || currURL.indexOf('topic=') != -1) {
        var scrollTosection =
          $('.article-listing-filter-wrapper').offset().top - 80;
        $(once('animate', $('html, body'), context)).animate(
          { scrollTop: scrollTosection },
          200,
        );
        return false;
      }
    },
  };
})(Drupal, jQuery);
