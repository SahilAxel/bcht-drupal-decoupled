<?php

namespace Drupal\bcht_helpers\Plugin\FormAlter;

use Drupal\Core\Form\FormStateInterface;
use Drupal\pluginformalter\Annotation\ParagraphsFormAlter;
use Drupal\pluginformalter\Plugin\FormAlterBase;

/**
 * Class FeaturedEventsListingParagraphFormAlter.
 *
 * Implemented visibility and required condtions for featured events listing component field.
 *
 * @ParagraphsFormAlter(
 *   id = "featured_events_listing_paragraph_form_alter",
 *   label = @Translation("Altering featured events listing paragraphs form."),
 *   paragraph_type = {
 *    "featured_events_listing"
 *   },
 * )
 *
 * @package Drupal\my_module\Plugin\FormAlter
 */
class FeaturedEventsListingParagraphFormAlter extends FormAlterBase {

  /**
   * {@inheritdoc}
   */
  public function formAlter(array &$form, FormStateInterface $form_state, $form_id) {
    $parentDelta = $form['#delta'];
    foreach ($form['subform']['field_featured_events']['widget'] as $delta => $featuredEventsParagraph) {
      if (isset($featuredEventsParagraph['subform']['field_featured_event_type'])) {

        // Visibility condition for event reference field.
        $form['subform']['field_featured_events']['widget'][$delta]['subform']['field_event_reference']['#states'] = [
          'visible' => [
            ':input[name="field_components[' . $parentDelta . '][subform][field_featured_events][' . $delta . '][subform][field_featured_event_type]"]' => ['value' => 'event_reference'],
          ],
        ];

        // Required condition for event reference field.
        $form['subform']['field_featured_events']['widget'][$delta]['subform']['field_event_reference']['widget']['0']['target_id']['#states'] = [
          'required' => [
            ':input[name="field_components[' . $parentDelta . '][subform][field_featured_events][' . $delta . '][subform][field_featured_event_type]"]' => ['value' => 'event_reference'],
          ],
        ];

        // Visibility and required condition for image field.
        $form['subform']['field_featured_events']['widget'][$delta]['subform']['field_image']['#states'] = [
          'required' => [
            '[name="field_components[' . $parentDelta . '][subform][field_featured_events][' . $delta . '][subform][field_featured_event_type]"]' => ['value' => 'manual'],
          ],
          'visible' => [
            '[name="field_components[' . $parentDelta . '][subform][field_featured_events][' . $delta . '][subform][field_featured_event_type]"]' => ['value' => 'manual'],
          ],
        ];

        // Visibility condition for heading field.
        $form['subform']['field_featured_events']['widget'][$delta]['subform']['field_heading']['#states'] = [
          'visible' => [
            ':input[name="field_components[' . $parentDelta . '][subform][field_featured_events][' . $delta . '][subform][field_featured_event_type]"]' => ['value' => 'manual'],
          ],
        ];

        // Required condition for heading field.
        $form['subform']['field_featured_events']['widget'][$delta]['subform']['field_heading']['widget']['0']['value']['#states'] = [
          'required' => [
            ':input[name="field_components[' . $parentDelta . '][subform][field_featured_events][' . $delta . '][subform][field_featured_event_type]"]' => ['value' => 'manual'],
          ],
        ];

        // Visibility condition for event description field.
        $form['subform']['field_featured_events']['widget'][$delta]['subform']['field_event_description']['#states'] = [
          'visible' => [
            ':input[name="field_components[' . $parentDelta . '][subform][field_featured_events][' . $delta . '][subform][field_featured_event_type]"]' => ['value' => 'manual'],
          ],
        ];

        // Visibility condition for component button CTA field.
        $form['subform']['field_featured_events']['widget'][$delta]['subform']['field_card_link']['#states'] = [
          'visible' => [
            ':input[name="field_components[' . $parentDelta . '][subform][field_featured_events][' . $delta . '][subform][field_featured_event_type]"]' => ['value' => 'manual'],
          ],
        ];
      }
    }
  }

}
