<?php

namespace Drupal\bcht_helpers\Routing;

use Drupal\Core\Routing\RouteSubscriberBase;
use Symfony\Component\Routing\RouteCollection;

/**
 * Listens to the dynamic route events.
 */
class RouteSubscriber extends RouteSubscriberBase {

  /**
   * {@inheritdoc}
   */
  protected function alterRoutes(RouteCollection $collection) {
    // Removes access for CSS injector admin page for all users including admins.
    $route = $collection->get('entity.asset_injector_css.collection');
    if ($route) {
      $route->setRequirement('_access', 'FALSE');
    }
  }

}
