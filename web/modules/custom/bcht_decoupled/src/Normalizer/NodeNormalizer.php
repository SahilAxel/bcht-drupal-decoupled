<?php

namespace Drupal\bcht_decoupled\Normalizer;

use Drupal\jsonapi\JsonApiResource\ResourceObject;
use Drupal\serialization\Normalizer\TypedDataNormalizer;

/**
 * {@inheritdoc}
 */
class NodeNormalizer extends TypedDataNormalizer
{
  /**
   * {@inheritdoc}
   */
  public function normalize($object, $format = NULL, array $context = []): array|string|int|float|bool|\ArrayObject|NULL
  {
    $data = parent::normalize($object, $format, $context);
    $parentName = $object->getParent()->getParent()->getName();
    $entity_type_id = $context['resource_object']->getResourceType()->getEntityTypeId();

    if ($parentName === 'nid') {
      /* devel_dump($object);
      devel_dump($parentName);
      devel_dump($context); */
      if (is_array($data)) {
        $data['custom_value'] = 'Custom value';
      } else {
        // If $data is not an array, you'll need to decide how to handle this case.
        // One option is to wrap $data in an array:
        $data = ['value' => $data, 'custom_value' => 'Custom value'];
      }
    }
    /* devel_dump($context['resource_object']->getResourceType()); */


    return $data;
  }
}
