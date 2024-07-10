<?php

namespace Drupal\bcht_helpers\Plugin\FormAlter;

use Drupal\Core\Form\FormStateInterface;
use Drupal\pluginformalter\Annotation\ParagraphsFormAlter;
use Drupal\pluginformalter\Plugin\FormAlterBase;

/**
 * Class CardParagraphsFormAlter.
 *
 * @ParagraphsFormAlter(
 *   id = "image_beside_text_paragraph_form_alter",
 *   label = @Translation("Altering image beside text paragraphs form."),
 *   paragraph_type = {
 *    "image_beside_text"
 *   },
 * )
 *
 * @package Drupal\my_module\Plugin\FormAlter
 */
class ImageBesideTextParagraphFormAlter extends FormAlterBase {

  /**
   * {@inheritdoc}
   */
  public function formAlter(array &$form, FormStateInterface $form_state, $form_id) {
    // Visibility condition for image field.
    $form['subform']['field_image']['#states'] = [
      'visible' => [
        ':input[name="field_components[' . $form['#delta'] . '][subform][field_type]"]' => ['value' => 'manual'],
      ],
    ];

    // Required condition for image field.
    $form['subform']['field_image']['widget']['#states'] = [
      'required' => [
        ':input[name="field_components[' . $form['#delta'] . '][subform][field_type]"]' => ['value' => 'manual'],
      ],
    ];

    // Visibility condition for eyebrow field.
    $form['subform']['field_eyebrow']['#states'] = [
      'visible' => [
        ':input[name="field_components[' . $form['#delta'] . '][subform][field_type]"]' => ['value' => 'manual'],
      ],
    ];

    // Visibility condition for heading field.
    $form['subform']['field_heading']['#states'] = [
      'visible' => [
        ':input[name="field_components[' . $form['#delta'] . '][subform][field_type]"]' => ['value' => 'manual'],
      ],
    ];

    // Required condition for heading field.
    $form['subform']['field_heading']['widget']['0']['value']['#states'] = [
      'required' => [
        ':input[name="field_components[' . $form['#delta'] . '][subform][field_type]"]' => ['value' => 'manual'],
      ],
    ];

    // Visibility condition for cta link field.
    $form['subform']['field_cta_link']['#states'] = [
      'visible' => [
        ':input[name="field_components[' . $form['#delta'] . '][subform][field_type]"]' => ['value' => 'manual'],
      ],
    ];

    // Visibility condition for description field.
    $form['subform']['field_description']['#states'] = [
      'visible' => [
        ':input[name="field_components[' . $form['#delta'] . '][subform][field_type]"]' => ['value' => 'manual'],
      ],
    ];

    // Visibility condition for article reference field.
    $form['subform']['field_article_reference']['#states'] = [
      'visible' => [
        ':input[name="field_components[' . $form['#delta'] . '][subform][field_type]"]' => ['value' => 'article_reference'],
      ],
    ];

    // Required condition for article reference field.
    $form['subform']['field_article_reference']['widget']['0']['target_id']['#states'] = [
      'required' => [
        ':input[name="field_components[' . $form['#delta'] . '][subform][field_type]"]' => ['value' => 'article_reference'],
      ],
    ];

    // Visibility condition for link text field.
    $form['subform']['field_link_text']['#states'] = [
      'visible' => [
        ':input[name="field_components[' . $form['#delta'] . '][subform][field_type]"]' => ['value' => 'article_reference'],
      ],
    ];
  }

}
