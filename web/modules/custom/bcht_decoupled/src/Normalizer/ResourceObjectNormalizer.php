<?php

namespace Drupal\bcht_decoupled\Normalizer;

/* use Drupal\bcht_decoupled\Normalizer\JsonApiNormalizerDecoratorBase; */
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\jsonapi\JsonApiResource\ResourceObject;
use Drupal\jsonapi\Normalizer\Value\CacheableNormalization;
use Drupal\jsonapi_extras\Normalizer\JsonApiNormalizerDecoratorBase;
use Drupal\search_api\Plugin\search_api\processor\Resources\Pc;

/**
 * Decorates the JSON:API ResourceObjectNormalizer.
 *
 * @internal
 */
class ResourceObjectNormalizer extends JsonApiNormalizerDecoratorBase
{

  /**
   * {@inheritdoc}
   */
  public function normalize($object, $format = NULL, array $context = [])
  {
    assert($object instanceof ResourceObject);

    $cacheable_normalization = parent::normalize($object, $format, $context);
    assert($cacheable_normalization instanceof CacheableNormalization);
    if ($object->getResourceType()->getEntityTypeId() == "node") {
      $nodeId = $object->getField('drupal_internal__nid')->value;
      $node = \Drupal::entityTypeManager()->getStorage('node')->load($nodeId);
      $nodeType = $node->getType();

      $eyebrowText = "";
      if ($nodeType == 'article') {
        $eyebrowText = $this->getTermName($node, 'field_article_type');
      } elseif ($nodeType == 'page' || $nodeType == "landing_page") {

        $eyebrowText = $this->getTermName($node, 'field_categories');
      } elseif ($nodeType == 'event') {
        $eyebrowText = "Event";
      } elseif ($nodeType == 'listing_page') {
        $eyebrowText == "Listing Page";
      }

      $normalization = $cacheable_normalization->getNormalization();
      $normalization['attributes']['eyebrow_node'] = $eyebrowText;
      return new CacheableNormalization($cacheable_normalization, $normalization);
    }
    return $cacheable_normalization;
  }

  protected function getTermName($node, $fieldName)
  {
    $termStorage = \Drupal::entityTypeManager()->getStorage('taxonomy_term');
    $termId = $node->get($fieldName)->target_id;

    if ($termId != NULL) {
      $term = $termStorage->load($termId);
      if (!empty($term)) {
        return $term->getName();
      }
    }
    return (NULL);
  }
}
