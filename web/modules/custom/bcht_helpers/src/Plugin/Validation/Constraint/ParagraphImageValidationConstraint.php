<?php

namespace Drupal\bcht_helpers\Plugin\Validation\Constraint;

use Symfony\Component\Validator\Constraint;

/**
 * Custom constraint for image required in featured events listing component for manual events.
 *
 * @Constraint(
 *   id = "ParagraphImageValidation",
 *   label = @Translation("Validation for image required in different paragraph types", context = "Validation")
 * )
 */
class ParagraphImageValidationConstraint extends Constraint {

  /**
   * Validation message for image field in featured events paragraph type.
   *
   * @var string
   */
  public $featured_event_image_message = 'Image is required in manual featured events.';

  /**
   * Validation message for image field in image beside text paragraph type.
   *
   * @var string
   */
  public $image_beside_text_image_message = 'Image is required in manual image beside text.';

  /**
   * Paragraph type.
   *
   * @var string
   */
  public $paragraph_type;

}
