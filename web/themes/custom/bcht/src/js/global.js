(function (Drupal, $, once) {
  Drupal.behaviors.global = {
    attach: function (context, settings) {
      $(once('lytics_initial', $('body'), context)).each(
        // Reload page on browser back if lytics is enabled.
        function () {
          if (settings.lytics.enabled) {
            window.onpageshow = function (event) {
              if (event.persisted) {
                window.location.reload();
              }
            };
          }
        },
      );
      // Show both cta links together once lytics CTA loads.
      const fieldCtaLinkLoaded =
        $(context).find('div.field--name-field-cta-link').length == 1
          ? true
          : false;
      if (fieldCtaLinkLoaded) {
        $('.cta_group').removeClass('lytics_cta_hidden');
      }
      //******************** */
      // Send potential donor data to Lytics for report generation.
      function sendDataToAnalyticsAfter(data) {
        return new Promise((resolve, reject) => {
          try {
            jstag.send('default', data, (r) => {
              resolve(true);
            });
          } catch (error) {
            reject(error.message);
          }
        });
      }
      if (!context.onceFlagg) {
        context.onceFlagg = true;
        $(once('returning_user_click', $('.send-to-lytics'), context)).each(
          function () {
            const potentialDonationLinkElement =
              $(this).find('.lytics_cta_link a');
            const statusValue = Drupal.checkPlain(
              $(this).attr('data-lytics-status'),
            );
            const lyticsData = {
              status: statusValue,
            };
            if (potentialDonationLinkElement.length > 0 && jstag.isLoaded) {
              potentialDonationLinkElement.click(function (e) {
                e.preventDefault();
                const redirectURL = $(this).attr('href');

                sendDataToAnalyticsAfter(lyticsData)
                  .catch((error) => {
                    console.error('Failed:', error); // This runs if the promise is rejected
                  })
                  .finally(() => {
                    window.location.href = redirectURL;
                  });
              });
            }
          },
        );
      }
      //******************** */
      // Requires jQuery!
      // Jira issue collector JS
      jQuery.ajax({
        url: 'https://bluestate.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/-3ddrgv/b/8/b0105d975e9e59f24a3230a22972a71a/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs.js?locale=en-US&collectorId=8048751c',
        type: 'get',
        cache: true,
        dataType: 'script',
      });
      //******************** */
      // Main menu scroll JS
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
      //******************** */
      // Main menu 2nd level js to remove the accesibility issue
      $('header .main-menu ul.primary-nav__menu--level-2').each(function () {
        $(this).attr('aria-hidden', 'false');
      });
      //******************** */
      // Check if more than 5 link on the first level
      const menulinks = $(
        'header .header_bottom_wrapper .main-menu li.primary-nav__menu-item--level-1',
      ).length;
      if (menulinks > 5) {
        $('header .header_bottom_wrapper').addClass('morelinks');
      }
      //******************** */
      // Main menu 1st level click js
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
      //******************** */
      // search reset button JS for global
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

      function headerSearchreset() {
        $('header .header_top_wrapper .search__icon').removeClass('active');
        $('header .header_top_wrapper .search__wrapper').removeClass('active');
        $('header .header_top_wrapper').removeClass('active-search');
        $('.search__wrapper input:text').val('');
      }
      $(
        once('searchclear', $('header .search__wrapper form .reset'), context),
      ).click(function () {
        headerSearchreset();
      });
      $(
        once('searchclearr', $('header .search__wrapper form .reset'), context),
      ).keypress(function (e) {
        if (e.which == 13) {
          headerSearchreset();
        }
      });
      //******************** */
      // Search JS for Header section
      function HeaderSearchIconClick(element) {
        if (element.hasClass('active')) {
          $('.search__icon').removeClass('active');
          $('.search__wrapper').removeClass('active');
          $('header .header_top_wrapper').removeClass('active-search');
        } else {
          element.addClass('active');
          element.next('.search__wrapper').addClass('active');
          $('header .header_top_wrapper').addClass('active-search');
          setTimeout(function () {
            $(
              '.header_top__container .search_box_wrapper .search__wrapper input:text',
            ).focus();
          }, 500);
        }
      }
      $(once('search__wrapper', $('.search__icon'), context)).click(
        function () {
          HeaderSearchIconClick($(this));
        },
      );
      $(once('search__wrapperr', $('.search__icon'), context)).keypress(
        function (e) {
          if (e.which == 13) {
            HeaderSearchIconClick($(this));
          }
        },
      );
      //******************** */
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
        }
      });
      //******************** */
      //Mobile menu JS global
      function MobileMenuClick(element) {
        if (element.hasClass('active')) {
          element.removeClass('active');
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
          element.addClass('active');
          $('body').addClass('mobile-menu-open');
          $('.mobile-menu-wrapper').slideDown();
        }
      }
      $(once('menuToggle', '#menuToggle', context)).click(function () {
        MobileMenuClick($(this));
      });
      $(once('menuTogglekeypress', $('#menuToggle'), context)).keypress(
        function (e) {
          if (e.which == 13) {
            MobileMenuClick($(this));
          }
        },
      );

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
          const lastth3pagger =
            $('.pager.more-pager-link .pager__item--last').attr(
              'attr-lastpager',
            ) - 3;
          if (
            $(
              '.pager.more-pager-link ul.pager__items li.pager__item.is-active',
            ).attr('attr-kay') == lastpagger
          ) {
            $('.pager.more-pager-link ul.pager__items li.pager__item.is-active')
              .next('.pager__item')
              .addClass('hidden');
          }
          if (
            $(
              '.pager.more-pager-link ul.pager__items li.pager__item.is-active',
            ).attr('attr-kay') == lastth3pagger
          ) {
            $('.pager.more-pager-link').addClass('last3active');
          }
          $(
            once(
              'paggercheck',
              '.pager.more-pager-link ul li:nth-child(3)',
              context,
            ),
          ).each(function () {
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
        $(this).addClass('hidden');
      });
      $(
        once(
          'searchclear-resultpage-keypress',
          $('.search-form-wrapper form .reset'),
          context,
        ),
      ).keypress(function (e) {
        if (e.which == 13) {
          $('.search-form-wrapper input:text').val('');
          $('.search-form-wrapper input:text').focus();
          $(this).addClass('hidden');
        }
      });
      $('.search-form-wrapper input:text').on(
        'change paste keyup',
        function () {
          if ($(this).val().length > 0) {
            $('.search-form-wrapper form .reset').removeClass('hidden');
          } else {
            $('.search-form-wrapper form .reset').addClass('hidden');
          }
        },
      );

      //******************** */
      // js for image beside text node reff
      if ($('.text_image_wrapper_node_reff').length > 0) {
        $('.text_image_wrapper_node_reff').each(function () {
          if ($(this).attr('attr-linktext')) {
            $(this)
              .find('.image_beside_link')
              .html($(this).attr('attr-linktext'));
          }
        });
      }

      //******************** */
      // js for page scroll if query parameters avilable in the URL
      const currURL = $(location).attr('href');
      if (currURL.indexOf('?search=') != -1) {
        $('body').addClass('search-result-page');
        var searchwrappertop =
          $(
            '.main-content-wrapper .paragraph--type--blocks .search-form-wrapper',
          ).offset().top - 140;
        $(once('searchanimate', $('html, body'), context)).animate(
          { scrollTop: searchwrappertop },
          200,
        );
        return false;
      }
      if (
        currURL.indexOf('?search=') != -1 ||
        currURL.indexOf('/search') != -1
      ) {
        $('body').addClass('search-result-page');
      }

      /* Adjustments for Safari on Mac */
      if (
        navigator.userAgent.indexOf('Safari') != -1 &&
        navigator.userAgent.indexOf('Mac') != -1 &&
        navigator.userAgent.indexOf('Chrome') == -1
      ) {
        $('body').addClass('safari-mac'); // provide a class for the safari-mac specific css to filter with
      }
    },
  };
})(Drupal, jQuery, once);
