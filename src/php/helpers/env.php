<?php

$localhost_list = array(
    '127.0.0.1',
    '::1'
);
$IS_PRODUCTION = !in_array($_SERVER['REMOTE_ADDR'], $localhost_list);

$API_BASE_URL = $IS_PRODUCTION? "https://adopisowifi.herokuapp.com" : "http://localhost:8000";
$BASE_URL = $IS_PRODUCTION? "https://forum.adopisowifi.com" : "http://localhost";

?>
