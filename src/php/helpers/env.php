<?php

$filename = __DIR__."/../../config.json";
if (!file_exists($filename)) {
  echo "config.json is missing!";
  return;
}

$handle = fopen($filename, "r");
$contents = fread($handle, filesize($filename));
fclose($handle);

$config = json_decode($contents);

$localhost_list = array(
    '127.0.0.1',
    '::1'
);

$IS_PRODUCTION = !in_array($_SERVER['REMOTE_ADDR'], $localhost_list);
$env = $IS_PRODUCTION? $config->production : $config->development;

$API_BASE_URL = $env->api_base_url;
$BASE_URL = $env->domain_url;

?>
