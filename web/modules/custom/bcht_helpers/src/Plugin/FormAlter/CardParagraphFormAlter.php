<?php

namespace Drupal\bcht_helpers\Plugin\FormAlter;

use Drupal\Core\Form\FormStateInterface;
use Drupal\node\Entity\Node;
use Drupal\pluginformalter\Annotation\ParagraphsFormAlter;
use Drupal\pluginformalter\Plugin\FormAlterBase;

/**
 * Class CardParagraphsFormAlter.
 *
 * @ParagraphsFormAlter(
 *   id = "card_paragraph_form_alter",
 *   label = @Translation("Altering card paragraphs form."),
 *   paragraph_type = {
 *    "card"
 *   },
 * )
 *
 * @package Drupal\my_module\Plugin\FormAlter
 */
class CardParagraphFormAlter extends FormAlterBase
{

  /**
   * {@inheritdoc}
   */
  public function formAlter(array &$form, FormStateInterface $form_state, $form_id)
  {
    $form['subform']['field_taxonomy_type']['#states'] = [
      'visible' => [
        ':input[name="field_components[' . $form['#delta'] .'][subform][field_card_type]"]' => ['value' => 'related_cards']
      ]
    ];
    $form['subform']['field_content_type']['#states'] = [
      'visible' => [
        ':input[name="field_components[' . $form['#delta'] .'][subform][field_card_type]"]' => ['value' => 'related_cards']
      ]
    ];
    $form['subform']['field_node_reference']['#states'] = [
      'visible' => [
        ':input[name="field_components[' . $form['#delta'] .'][subform][field_card_type]"]' => ['value' => 'node_reference']
      ]
    ];
    $form['subform']['field_card_items']['#states'] = [
      'visible' => [
        ':input[name="field_components[' . $form['#delta'] .'][subform][field_card_type]"]' => ['value' => 'manual']
      ]
    ];

    $form['subform']['field_article_type']['#states'] = array(
      'visible' => array(
        ':input[name="field_components[' . $form['#delta'] .'][subform][field_taxonomy_type][article_type]"]' => ['checked' => true],
        ':input[name="field_components[' . $form['#delta'] .'][subform][field_card_type]"]' => ['value' => 'related_cards']
      )
    );
    $form['subform']['field_category']['#states'] = [
      'visible' => [
        ':input[name="field_components[' . $form['#delta'] .'][subform][field_taxonomy_type][categories]"]' => ['checked' => true],
        ':input[name="field_components[' . $form['#delta'] .'][subform][field_card_type]"]' => ['value' => 'related_cards']
      ]
    ];
    $form['subform']['field_topics']['#states'] = [
      'visible' => [
        ':input[name="field_components[' . $form['#delta'] .'][subform][field_taxonomy_type][topic]"]' => ['checked' => true],
        ':input[name="field_components[' . $form['#delta'] .'][subform][field_card_type]"]' => ['value' => 'related_cards']
      ]
    ];

    $parent = $form_state->getFormObject()->getEntity();
    if ($parent instanceof Node) {
      if ($parent->getType() == "article") {
        $form['subform']['field_heading']['#access'] = false;
        $form['subform']['field_intro_text']['#access'] = false;
        $form['subform']['field_card_type']['#access'] = false;
        $form['subform']['field_content_type']['#access'] = false;
        $form['subform']['field_node_reference']['#access'] = false;
        $form['subform']['field_card_items']['#access'] = false;
        $form['subform']['field_category']['#access'] = false;

        if (isset($form['subform']['field_taxonomy_type']['widget']['#options']['categories'])) {
          unset($form['subform']['field_taxonomy_type']['widget']['#options']['categories']);
        }

        $form['subform']['field_article_type']['#states'] = array(
          'visible' => array(
            ':input[name="field_related_content[0][subform][field_taxonomy_type][article_type]"]' => ['checked' => true],
          )
        );

        $form['subform']['field_topics']['#states'] = [
          'visible' => [
            ':input[name="field_related_content[0][subform][field_taxonomy_type][topic]"]' => ['checked' => true],
          ]
        ];

      }
    }
  }
}
