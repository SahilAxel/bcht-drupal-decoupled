<?php

namespace Drupal\bcht_helpers\Plugin\FormAlter;

use Drupal\Core\Form\FormStateInterface;
use Drupal\node\Entity\Node;
use Drupal\pluginformalter\Annotation\ParagraphsFormAlter;
use Drupal\pluginformalter\Plugin\FormAlterBase;

/**
 * Class HeroInteriorPageParagraphsFormAlter.
 *
 * @ParagraphsFormAlter(
 *   id = "hero_interior_page_paragraph_form_alter",
 *   label = @Translation("Altering hero interior pages paragraphs form."),
 *   paragraph_type = {
 *    "hero_interior_pages"
 *   },
 * )
 *
 * @package Drupal\my_module\Plugin\FormAlter
 */
class HeroInteriorPageParagraphFormAlter extends FormAlterBase {

  /**
   * {@inheritdoc}
   */
  public function formAlter(array &$form, FormStateInterface $form_state, $form_id) {
    // Modifications for the hero interior pages paragraph form in the article content type.
    $parent = $form_state->getFormObject()->getEntity();
    if ($parent instanceof Node) {
      if ($parent->getType() == "article") {
        // Disabling the CTA buttons field not needed in the article content type hero banner.
        $form['subform']['field_hero_cta_buttons']['#access'] = FALSE;
      }
    }
  }

}
