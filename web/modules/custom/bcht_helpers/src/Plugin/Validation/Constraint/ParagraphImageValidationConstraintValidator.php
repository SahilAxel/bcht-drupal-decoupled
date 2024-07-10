<?php

namespace Drupal\bcht_helpers\Plugin\Validation\Constraint;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

/**
 * Validates the ParagraphImageValidation constraint.
 */
class ParagraphImageValidationConstraintValidator extends ConstraintValidator {

  /**
   * {@inheritdoc}
   */
  public function validate($item, Constraint $constraint) {
    // Get the paragraph to fetch values.
    $paragraph = $item->getEntity();

    // Image validation for featured events paragraph type.
    if ($constraint->paragraph_type == "featured_events") {
      // Fetch featured event type and image field values.
      $eventType = $paragraph->get('field_featured_event_type')->value;
      $image = $paragraph->get('field_image');

      // Raise a violation if event type is manual and image is empty
      if ($eventType == 'manual' && $image->isEmpty()) {
        $this->context->addViolation($constraint->featured_event_image_message);
      }
    }

    // Image validation for featured events paragraph type.
    if ($constraint->paragraph_type == "image_beside_text") {
      // Fetch featured event type and image field values.
      $type = $paragraph->get('field_type')->value;
      $image = $paragraph->get('field_image');

      // Raise a violation if event type is manual and image is empty
      if ($type == 'manual' && $image->isEmpty()) {
        $this->context->addViolation($constraint->image_beside_text_image_message);
      }
    }
  }

}
