<?php

namespace Drupal\bcht_helpers\Routing;

use Drupal\Core\Routing\RouteSubscriberBase;
use Drupal\Core\Session\AccountProxyInterface;
use Symfony\Component\Routing\RouteCollection;

/**
 * Listens to the dynamic route events.
 */
class RouteSubscriber extends RouteSubscriberBase {
  /**
   * The current user service.
   *
   * @var \Drupal\Core\Session\AccountProxyInterface
   */
  protected AccountProxyInterface $currentUser;

  /**
   * Constructs a new RouteSubscriber.
   *
   * @param \Drupal\Core\Session\AccountProxyInterface $current_user
   *   The current user service.
   */
  public function __construct(AccountProxyInterface $current_user) {
    $this->currentUser = $current_user;
  }

  /**
   * {@inheritdoc}
   */
  protected function alterRoutes(RouteCollection $collection) {
    // Removes access for CSS injector admin page for every user including admins.
    $cssInjectorRoute = $collection->get('entity.asset_injector_css.collection');
    if ($cssInjectorRoute) {
      $cssInjectorRoute->setRequirement('_access', 'FALSE');
    }

    // Removes access for site settings configuration admin page for content editor user roles.
    $siteSettingsConfigRoute = $collection->get('site_settings.site_settings_config_form');
    if ($siteSettingsConfigRoute && $this->currentUser->hasRole('content_editor')) {
      $siteSettingsConfigRoute->setRequirement('_access', 'FALSE');
    }
  }

}
