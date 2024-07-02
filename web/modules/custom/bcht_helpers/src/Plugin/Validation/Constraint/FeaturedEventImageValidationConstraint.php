<?php

namespace Drupal\bcht_helpers\Plugin\Validation\Constraint;

use Symfony\Component\Validator\Constraint;

/**
 * Custom constraint for image required in featured events listing component for manual events.
 *
 * @Constraint(
 *   id = "FeaturedEventImageValidation",
 *   label = @Translation("Validation for image required in featured events listing component for manual events.", context = "Validation")
 * )
 */
class FeaturedEventImageValidationConstraint extends Constraint {

  /**
   * Validation message.
   *
   * @var string
   */
  public $message = 'Image is required in manual featured events.';

}
