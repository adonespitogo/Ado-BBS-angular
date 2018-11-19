<?php

require("../php/helpers/env.php");
require("../php/helpers/check_get_param.php");

if (!checkGetParam("post_id"))
  return header("HTTP/1.0 404 Not Found");
  //return header("Location: /");
if (!checkGetParam("page"))
  return header("Location: /post/?post_id=".$_GET["post_id"]."&page=1");

$page= $_GET["page"];
$post_api_url = $API_BASE_URL."/api/forum/posts/".$_GET["post_id"]."?page=".$page;
$post_data = file_get_contents($post_api_url);
if ($post_data === false) {
  return header("HTTP/1.0 404 Not Found");
}
$json_data = json_decode($post_data);
$page_title = $json_data->title;

require("../php/partials/header.php");

echo "<script type='text/javascript'>";
  echo "window.post_data_".$json_data->id." = ".$post_data.";";
  echo "window.comments_page = ".$page.";";
echo "</script>";
?>

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
        echo "<ul>";

        foreach($json_data->comments as $comment) {
          echo "<li>";
          echo "<a href='/user/?user_id=".$comment->user->id."'>";
            echo $comment->user->fname." ".$comment->user->lname;
          echo "</a>";
          echo "<div>";
          echo $comment->body;
          echo "</div>";
          echo "</li>";
        }
        echo "</ul>";
        echo "</div>";
      ?>
    </div>

  <!-- inject:js -->
  <!-- endinject -->

  </body>

</html>
