(function (Drupal, $, once) {
  Drupal.behaviors.global = {
    attach: function (context) {
      // Main menu dark bg js
      var lastScrollTop = 60;
      $(window).scroll(function () {
        if ($(this).scrollTop() > 60) {
          var st = $(this).scrollTop();
          if (st > lastScrollTop) {
            // downscroll code
            $('.header_wrapper').addClass('hideupperHeader');
          } else {
            // upscroll code
            $('.header_wrapper').removeClass('hideupperHeader');
          }
          lastScrollTop = st;
        }
      });
      $headerHeight = $('.header_wrapper').height();
      $('.main-content-wrapper').css('padding-top', $headerHeight);
      $(window).on('resize', function () {
        $headerHeight = $('.header_wrapper').height();
        $('.main-content-wrapper').css('padding-top', $headerHeight);
      });

      // Main menu
      $('header .main-menu ul.primary-nav__menu--level-2').each(function () {
        $(this).attr('aria-hidden', 'false');
      });
      // Check if more than 5 link on the first level
      const menulinks = $(
        'header .header_bottom_wrapper .main-menu li.primary-nav__menu-item--level-1',
      ).length;
      if (menulinks > 5) {
        $('header .header_bottom_wrapper').addClass('morelinks');
      }

      $(
        'header .main-menu ul li a.primary-nav__menu-link--level-1.primary-nav__menu-link--has-children',
      ).each(function () {
        var $firstLevelLink = $(this);
        $(once('firstLevelLink', $firstLevelLink, context)).click(function (e) {
          e.preventDefault();
          if ($firstLevelLink.hasClass('active')) {
            $firstLevelLink.removeClass('active');
            $firstLevelLink.attr('aria-expanded', 'false');
            $('header .header_top_wrapper .search__icon').removeClass('active');
            $('header .header_top_wrapper .search__wrapper').removeClass(
              'active',
            );
            $('header .header_top_wrapper').removeClass('active-search');
            $('header .header_top_wrapper .search__wrapper').css(
              'display',
              'none',
            );
            $('header .main-menu ul.primary-nav__menu--level-2').attr(
              'aria-hidden',
              'false',
            );
            $('header .main-menu ul.primary-nav__menu--level-2').css(
              'display',
              'none',
            );
          } else {
            $('header .header_top_wrapper .search__icon').removeClass('active');
            $('header .header_top_wrapper .search__wrapper').removeClass(
              'active',
            );
            $('header .header_top_wrapper').removeClass('active-search');
            $('header .header_top_wrapper .search__wrapper').css(
              'display',
              'none',
            );
            $(
              'header .main-menu ul li a.primary-nav__menu-link--level-1.primary-nav__menu-link--has-children',
            ).removeClass('active');
            $(
              'header .main-menu ul li a.primary-nav__menu-link--level-1.primary-nav__menu-link--has-children',
            ).attr('aria-expanded', 'false');
            $('header .main-menu ul.primary-nav__menu--level-2').attr(
              'aria-hidden',
              'false',
            );
            $('header .main-menu ul.primary-nav__menu--level-2').css(
              'display',
              'none',
            );

            $firstLevelLink.addClass('active');
            $('header .header_top_wrapper').addClass('active-search');
            $firstLevelLink.attr('aria-expanded', 'true');
            $firstLevelLink
              .next('.primary-nav__menu--level-2')
              .attr('aria-hidden', 'true');
            $firstLevelLink
              .next('.primary-nav__menu--level-2')
              .css('display', 'block');
          }
        });
      });
      $('.search-form-wrapper form').each(function () {
        if ($(this).find('.reset').length == 0) {
          $(
            '<span class="reset" tabindex="0" role="button" aria-label="Reset and Close Search">Reset</span>',
          ).insertBefore($(this).find('.form-actions'));
        }
        if (
          $(this).find('input.form-text').attr('aria-label') !== 'undefined' &&
          $(this).find('input.form-text').attr('aria-label') !== false
        ) {
          $(this)
            .find('input.form-text')
            .attr('aria-label', $(this).find('input.form-text').attr('id'));
        }
      });
      $(
        '.mobile_bottom_wrapper .search-form-wrapper form .js-form-type-textfield label',
      ).attr('for', 'mobile-search');
      $('.mobile_bottom_wrapper .search-form-wrapper form input.form-text')
        .attr('aria-label', 'mobile-search')
        .attr('id', 'mobile-search');
      $(
        once('searchclear', $('header .search__wrapper form .reset'), context),
      ).click(function () {
        $('header .header_top_wrapper .search__icon').removeClass('active');
        $('header .header_top_wrapper .search__wrapper').removeClass('active');
        $('header .header_top_wrapper').removeClass('active-search');
        $('header .header_top_wrapper .search__wrapper').css('display', 'none');
        $('.search__wrapper input:text').val('');
      });
      $(
        once('searchclearr', $('header .search__wrapper form .reset'), context),
      ).keypress(function (e) {
        if (e.which == 13) {
          $('header .header_top_wrapper .search__icon').removeClass('active');
          $('header .header_top_wrapper .search__wrapper').removeClass(
            'active',
          );
          $('header .header_top_wrapper').removeClass('active-search');
          $('header .header_top_wrapper .search__wrapper').css(
            'display',
            'none',
          );
          $('.search__wrapper input:text').val('');
        }
      });

      //Search JS
      $(once('search__wrapper', $('.search__icon'), context)).click(
        function () {
          if ($(this).hasClass('active')) {
            $('.search__icon').removeClass('active');
            $('.search__wrapper').removeClass('active');
            $('header .header_top_wrapper').removeClass('active-search');
            $('.search__icon').next('.search__wrapper').css('display', 'none');
          } else {
            $(this).addClass('active');
            $(this).next('.search__wrapper').addClass('active');
            $('header .header_top_wrapper').addClass('active-search');
            $(this).next('.search__wrapper').css('display', 'block');
            $('.header_top__container .search__wrapper input:text').focus();
          }
        },
      );
      $(once('search__wrapperr', $('.search__icon'), context)).keypress(
        function (e) {
          if (e.which == 13) {
            if ($(this).hasClass('active')) {
              $('.search__icon').removeClass('active');
              $('header .header_top_wrapper').removeClass('active-search');
              $('.search__wrapper').removeClass('active');
              $('.search__icon')
                .next('.search__wrapper')
                .css('display', 'none');
            } else {
              $(this).addClass('active');
              $(this).next('.search__wrapper').addClass('active');
              $('header .header_top_wrapper').addClass('active-search');
              $(this).next('.search__wrapper').css('display', 'block');
              $('.header_top__container .search__wrapper input:text').focus();
            }
          }
        },
      );

      //On document click or outside element click JS
      $(document).on('click', function (event) {
        // Close main menu drop down
        if (
          !$(event.target).closest('header .header_bottom_wrapper .main-menu')
            .length
        ) {
          $(
            'header .header_bottom_wrapper .main-menu ul li a.primary-nav__menu-link--level-1.primary-nav__menu-link--has-children',
          ).removeClass('active');
          $(
            'header .header_bottom_wrapper .main-menu ul li a.primary-nav__menu-link--level-1.primary-nav__menu-link--has-children',
          ).attr('aria-expanded', 'false');
          $(
            'header .header_bottom_wrapper .main-menu ul.primary-nav__menu--level-2',
          ).attr('aria-hidden', 'false');
          $(
            'header .header_bottom_wrapper .main-menu ul.primary-nav__menu--level-2',
          ).css('display', 'none');
        }
      });
      $(document).on('click', function (event) {
        // Close search box
        if (
          !$(event.target).closest('.search__wrapper').length &&
          !$(event.target).closest('.search__icon').length
        ) {
          $('.search__icon').removeClass('active');
          $('.search__wrapper').removeClass('active');
          $('header .header_top_wrapper').removeClass('active-search');
          $('.search__icon').next('.search__wrapper').css('display', 'none');
        }
      });

      //Mobile menu JS
      $(once('menuToggle', '#menuToggle', context)).click(function () {
        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
          $('body').removeClass('mobile-menu-open');
          $('.mobile-menu-wrapper').slideUp();
          $(
            '.mobile-menu-wrapper .main-menu ul li a.primary-nav__menu-link--level-1.primary-nav__menu-link--has-children',
          ).removeClass('active');
          $(
            '.mobile-menu-wrapper .main-menu ul li a.primary-nav__menu-link--level-1.primary-nav__menu-link--has-children',
          ).attr('aria-expanded', 'false');
          $(
            '.mobile-menu-wrapper .main-menu ul.primary-nav__menu--level-2',
          ).attr('aria-hidden', 'false');
          $(
            '.mobile-menu-wrapper .main-menu ul.primary-nav__menu--level-2',
          ).css('display', 'none');
        } else {
          $(this).addClass('active');
          $('body').addClass('mobile-menu-open');
          $('.mobile-menu-wrapper').slideDown();
        }
      });
      $(once('menuTogglekeypress', '#menuToggle', context)).keypress(function (
        e,
      ) {
        if (e.which == 13) {
          if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('body').removeClass('mobile-menu-open');
            $('.mobile-menu-wrapper').slideUp();
            $(
              '.mobile-menu-wrapper .main-menu ul li a.primary-nav__menu-link--level-1.primary-nav__menu-link--has-children',
            ).removeClass('active');
            $(
              '.mobile-menu-wrapper .main-menu ul li a.primary-nav__menu-link--level-1.primary-nav__menu-link--has-children',
            ).attr('aria-expanded', 'false');
            $(
              '.mobile-menu-wrapper .main-menu ul.primary-nav__menu--level-2',
            ).attr('aria-hidden', 'false');
            $(
              '.mobile-menu-wrapper .main-menu ul.primary-nav__menu--level-2',
            ).css('display', 'none');
          } else {
            $(this).addClass('active');
            $('body').addClass('mobile-menu-open');
            $('.mobile-menu-wrapper').slideDown();
          }
        }
      });

      //******************** */
      // Check if similar component in the next div
      if (
        $('.field--name-field-components .check_component_type_below').length >
        0
      ) {
        $(
          once(
            'check_component_type_below',
            '.check_component_type_below',
            context,
          ),
        ).each(function () {
          // console.log($(this).parent());
          if (
            $(this)
              .parent()
              .next()
              .find('.paragraph')
              .hasClass('check_component_type_below')
          ) {
            $(this).addClass('similar_component_type_below');
          }
        });
      }
      if ($('.field--name-field-components .check_next_component').length > 0) {
        $(once('check_next_component', '.check_next_component', context)).each(
          function () {
            if (
              $(this)
                .parent()
                .next()
                .find('.paragraph')
                .hasClass('check_next_component')
            ) {
              $(this).addClass('similar_component_type_below_reduce_space');
            }
          },
        );
      }
      if (
        $('.field--name-field-components .field__item:first-of-type')
          .find('.paragraph')
          .hasClass('check_next_component')
      ) {
        $('.content-body').addClass(
          'similar_component_type_below_reduce_space',
        );
      }

      //******************** */
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
      $(once('backToTopkeypress', $backToTop, context)).keypress(function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
          $('html, body').animate({ scrollTop: 0 }, 500);
        }
      });

      //******************** */
      // pagination js
      if ($('.pager').length > 0) {
        if ($('.pager').find('.pager__item--ellipsis').length > 0) {
          $('.pager').addClass('more-pager-link');
        }
        if (
          $(
            '.pager.more-pager-link ul.pager__items li.pager__item.is-active',
          ).attr('attr-kay') == 2 ||
          $(
            '.pager.more-pager-link ul.pager__items li.pager__item.is-active',
          ).attr('attr-kay') == 3 ||
          $(
            '.pager.more-pager-link ul.pager__items li.pager__item.is-active',
          ).attr('attr-kay') == 4
        ) {
          $(
            '.pager.more-pager-link ul.pager__items li.pager__item--first',
          ).addClass('hidden');
        }
        if ($('.pager.more-pager-link').length > 0) {
          const lastpagger =
            $('.pager.more-pager-link .pager__item--last').attr(
              'attr-lastpager',
            ) - 1;
          if (
            $(
              '.pager.more-pager-link ul.pager__items li.pager__item.is-active',
            ).attr('attr-kay') == lastpagger
          ) {
            $('.pager.more-pager-link ul.pager__items li.pager__item.is-active')
              .next('.pager__item')
              .addClass('hidden');
          }
          $(
            once(
              'paggercheck',
              '.pager.more-pager-link ul li:nth-child(3)',
              context,
            ),
          ).each(function () {
            console.log($(this));
            if ($(this).hasClass('pager__item--ellipsis')) {
              $('.pager.more-pager-link').addClass('preve-morelink');
            }
          });
        }
      }

      // Search result page JS
      if ($('.no_result_found_wraper').length > 0) {
        const searchval = $(
          '.search-form-wrapper form .form-item-search input.form-text',
        ).val();
        if (searchval) {
          $('.no_result_found_wraper .headline .search-text').html(searchval);
        } else {
          $('.no_result_found_wraper .headline .search-text').html(' ');
        }
      }
      $(
        once(
          'searchclear-resultpage',
          $('.search-form-wrapper form .reset'),
          context,
        ),
      ).click(function () {
        $('.search-form-wrapper input:text').val('');
        $('.search-form-wrapper input:text').focus();
      });
    },
  };
})(Drupal, jQuery, once);
