<?php
require("./helpers/env.php");

$page = (!empty($_GET["page"])) ? $_GET["page"] : 1;
$post_api_url = $API_BASE_URL."/api/forum/posts/".$_GET["post_id"]."?page=".$page;

$post_data = file_get_contents($post_api_url);
if ($post_data === false) return header("HTTP/1.0 404 Not Found");
$json_data = json_decode($post_data);

?>
<!DOCTYPE html>
<html>
  <head>
    <title><?php echo $json_data->title; ?></title>

<?php
echo "<script type='text/javascript'>";
  echo "window.post_data = ".$post_data.";";
  echo "window.comments_page = ".$page.";";
echo "</script>";
?>

    <!-- inject:css -->
    <!-- endinject -->

  </head>

  <body>
    <div ui-view>
      <?php
        echo "<div>";
        echo "<h1>";
        echo $json_data->title;
        echo "</h1>";
        echo "<div>";
        echo $json_data->body;
        echo "</div>";
        echo "</div>";
      ?>
    </div>

  <!-- inject:js -->
  <!-- endinject -->

  </body>

</html>
