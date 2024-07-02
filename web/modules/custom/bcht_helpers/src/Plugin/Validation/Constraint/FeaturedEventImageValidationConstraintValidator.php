<?php

namespace Drupal\bcht_helpers\Plugin\Validation\Constraint;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

/**
 * Validates the FeaturedEventImageValidation constraint.
 */
class FeaturedEventImageValidationConstraintValidator extends ConstraintValidator {

  /**
   * {@inheritdoc}
   */
  public function validate($item, Constraint $constraint) {
    // Get the paragraph to fetch values.
    $paragraph = $item->getEntity();

    // Fetch featured event type and image field values.
    $eventType = $paragraph->get('field_featured_event_type')->value;
    $image = $paragraph->get('field_image');

    // Raise a violation if event type is manual and image is empty
    if ($eventType == 'manual' && $image->isEmpty()) {
      $this->context->addViolation($constraint->message);
    }
  }

}
