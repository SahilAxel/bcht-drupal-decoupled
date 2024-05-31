<?php

namespace Drupal\bcht_helpers\Plugin\FormAlter;

use Drupal\Core\Form\FormStateInterface;
use Drupal\pluginformalter\Annotation\ParagraphsFormAlter;
use Drupal\pluginformalter\Plugin\FormAlterBase;

/**
 * Class MyModuleParagraphsFormAlter.
 *
 * @ParagraphsFormAlter(
 *   id = "paragraph_form_alter",
 *   label = @Translation("Altering title_text paragraphs form."),
 *   paragraph_type = {
 *    "card"
 *   },
 * )
 *
 * @package Drupal\my_module\Plugin\FormAlter
 */
class ParagraphFormAlter extends FormAlterBase
{

  /**
   * {@inheritdoc}
   */
  public function formAlter(array &$form, FormStateInterface $form_state, $form_id)
  {
    $form['subform']['field_taxonomy_type']['#states'] = [
      'visible' => [
        ':input[name="field_components[0][subform][field_card_type]"]' => ['value' => 'related_cards']
      ]
    ];
    $form['subform']['field_content_type']['#states'] = [
      'visible' => [
        ':input[name="field_components[0][subform][field_card_type]"]' => ['value' => 'related_cards']
      ]
    ];
    $form['subform']['field_node_reference']['#states'] = [
      'visible' => [
        ':input[name="field_components[0][subform][field_card_type]"]' => ['value' => 'node_reference']
      ]
    ];
    $form['subform']['field_card_items']['#states'] = [
      'visible' => [
        ':input[name="field_components[0][subform][field_card_type]"]' => ['value' => 'manual']
      ]
    ];

    $form['subform']['field_article_type']['#states'] = array(
      'visible' => array(
        ':input[name="field_components[0][subform][field_taxonomy_type][article_type]"]' => ['checked' => true],
        ':input[name="field_components[0][subform][field_card_type]"]' => ['value' => 'related_cards']
      )
    );
    $form['subform']['field_category']['#states'] = [
      'visible' => [
        ':input[name="field_components[0][subform][field_taxonomy_type][categories]"]' => ['checked' => true],
        ':input[name="field_components[0][subform][field_card_type]"]' => ['value' => 'related_cards']
      ]
    ];
    $form['subform']['field_topics']['#states'] = [
      'visible' => [
        ':input[name="field_components[0][subform][field_taxonomy_type][topic]"]' => ['checked' => true],
      ':input[name="field_components[0][subform][field_card_type]"]' => ['value' => 'related_cards']
      ]
    ];
  }
}
