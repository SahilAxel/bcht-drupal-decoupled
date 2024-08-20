<?php

namespace Drupal\bcht_helpers\Routing;

use Drupal\Core\Routing\RouteSubscriberBase;
use Symfony\Component\Routing\RouteCollection;

/**
 * Listens to the dynamic route events.
 */
class RouteSubscriber extends RouteSubscriberBase
{

  /**
   * {@inheritdoc}
   */
  protected function alterRoutes(RouteCollection $collection)
  {
    if ($route = $collection->get('entity.asset_injector_css.collection')) {
      $route->setRequirement('_access', 'FALSE');
    }
  }
}
