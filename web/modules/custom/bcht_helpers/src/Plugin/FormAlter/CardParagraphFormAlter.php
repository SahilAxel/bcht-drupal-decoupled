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
class CardParagraphFormAlter extends FormAlterBase {

  /**
   * {@inheritdoc}
   */
  public function formAlter(array &$form, FormStateInterface $form_state, $form_id) {
    // Visibility condtions declaration for card component fields as per requirements.
    $form['subform']['field_taxonomy_type']['#states'] = [
      'visible' => [
        ':input[name="field_components[' . $form['#delta'] . '][subform][field_card_type]"]' => ['value' => 'related_cards'],
      ],
    ];
    $form['subform']['field_content_type']['#states'] = [
      'visible' => [
        ':input[name="field_components[' . $form['#delta'] . '][subform][field_card_type]"]' => ['value' => 'related_cards'],
      ],
    ];
    $form['subform']['field_node_reference']['#states'] = [
      'visible' => [
        ':input[name="field_components[' . $form['#delta'] . '][subform][field_card_type]"]' => ['value' => 'node_reference'],
      ],
    ];
    $form['subform']['field_card_items']['#states'] = [
      'visible' => [
        ':input[name="field_components[' . $form['#delta'] . '][subform][field_card_type]"]' => ['value' => 'manual'],
      ],
    ];

    $form['subform']['field_article_type']['#states'] = [
      'visible' => [
        ':input[name="field_components[' . $form['#delta'] . '][subform][field_taxonomy_type][article_type]"]' => ['checked' => TRUE],
        ':input[name="field_components[' . $form['#delta'] . '][subform][field_card_type]"]' => ['value' => 'related_cards'],
      ],
    ];
    $form['subform']['field_category']['#states'] = [
      'visible' => [
        ':input[name="field_components[' . $form['#delta'] . '][subform][field_taxonomy_type][categories]"]' => ['checked' => TRUE],
        ':input[name="field_components[' . $form['#delta'] . '][subform][field_card_type]"]' => ['value' => 'related_cards'],
      ],
    ];
    $form['subform']['field_topics']['#states'] = [
      'visible' => [
        ':input[name="field_components[' . $form['#delta'] . '][subform][field_taxonomy_type][topic]"]' => ['checked' => TRUE],
        ':input[name="field_components[' . $form['#delta'] . '][subform][field_card_type]"]' => ['value' => 'related_cards'],
      ],
    ];

    // Modifications for the card paragraph form in the article content type releated content fields.
    $parent = $form_state->getFormObject()->getEntity();
    if ($parent instanceof Node) {
      if ($parent->getType() == "article") {
        // Disabling the form fields not needed in the article content type related content field.
        $form['subform']['field_intro_text']['#access'] = FALSE;
        $form['subform']['field_card_type']['#access'] = FALSE;
        $form['subform']['field_content_type']['#access'] = FALSE;
        $form['subform']['field_node_reference']['#access'] = FALSE;
        $form['subform']['field_card_items']['#access'] = FALSE;
        $form['subform']['field_category']['#access'] = FALSE;

        // Removed categories taxonomy types from the options because article content type do not have categories taxonomy field.
        if (isset($form['subform']['field_taxonomy_type']['widget']['#options']['categories'])) {
          unset($form['subform']['field_taxonomy_type']['widget']['#options']['categories']);
        }

        // Condition for artice_type taxonomy reference field to be visbile only when "article type" is checked in the taxnomy type field.
        $form['subform']['field_article_type']['#states'] = [
          'visible' => [
            ':input[name="field_related_content[0][subform][field_taxonomy_type][article_type]"]' => ['checked' => TRUE],
          ],
        ];

        // Condition for topics taxonomy reference field to be visbile only when "topics" is checked in the taxnomy type field.
        $form['subform']['field_topics']['#states'] = [
          'visible' => [
            ':input[name="field_related_content[0][subform][field_taxonomy_type][topic]"]' => ['checked' => TRUE],
          ],
        ];

      }
    }
  }

}
