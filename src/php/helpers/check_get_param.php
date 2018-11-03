<?php
  function checkGetParam($field) {
    return isset($_GET[$field]) && !(empty($_GET[$field])); 
  }
?>
