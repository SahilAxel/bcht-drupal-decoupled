<?php

/**
 * Load services definition file.
 */

$settings['container_yamls'][] = __DIR__ . '/services.yml';

/**
 * Include the Pantheon-specific settings file.
 *
 * n.b. The settings.pantheon.php file makes some changes
 *      that affect all environments that this site
 *      exists in.  Always include this file, even in
 *      a local development environment, to ensure that
 *      the site settings remain consistent.
 */
include __DIR__ . "/settings.pantheon.php";

$settings['config_sync_directory'] = '../config/sync';

if (!empty($_ENV['PANTHEON_ENVIRONMENT'])) {
  $secretsFile = $_SERVER['HOME'] . '/files/private/secrets.json';
  $lytics_api_key = '';
  if (file_exists($secretsFile)) {
    $secrets = json_decode(file_get_contents($secretsFile), 1);
    if (!empty($secrets['lytics_api_key'])) {
      $lytics_api_key = $secrets['lytics_api_key'];
    }
  }
  switch ($_ENV['PANTHEON_ENVIRONMENT']) {
    case 'live':
      $config['config_split.config_split.live']['status'] = TRUE;
      break;
    case 'test':
      $config['config_split.config_split.test']['status'] = TRUE;
      break;
    default:
      if ($lytics_api_key) {
        $config['lytics.settings']['apitoken'] = $lytics_api_key;
      }
      $config['config_split.config_split.dev']['status'] = TRUE;
      break;
  }
} elseif (getenv('IS_DDEV_PROJECT') == TRUE) {
  $config['config_split.config_split.local']['status'] = TRUE;
}
/**
 * Skipping permissions hardening will make scaffolding
 * work better, but will also raise a warning when you
 * install Drupal.
 *
 * https://www.drupal.org/project/drupal/issues/3091285
 */
// $settings['skip_permissions_hardening'] = TRUE;

/**
 * If there is a local settings file, then include it
 */
$local_settings = __DIR__ . "/settings.local.php";
if (file_exists($local_settings)) {
  include $local_settings;
}

// Automatically generated include for settings managed by ddev.
$ddev_settings = dirname(__FILE__) . '/settings.ddev.php';
if (getenv('IS_DDEV_PROJECT') == 'true' && is_readable($ddev_settings)) {
  require $ddev_settings;
}
