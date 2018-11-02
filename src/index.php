<?php
require("./php/helpers/env.php");

$posts_data = file_get_contents($API_BASE_URL."/api/forum/posts.json");
$json_data = json_decode($posts_data);

?>
<!DOCTYPE html>
<html>
  <head>
    <title>Ado Community Forum</title>
<?php
echo "<script>window.posts_data = ".$posts_data."; console.log(window.posts_data);</script>";
?>

    <!-- inject:css -->
    <!-- endinject -->
  </head>

  <body>
    <div ui-view>
      <?php

        echo "<h1>Welcome to Ado Community Forum</h1>";
        echo "<hr>";

        echo "<ul>";
        foreach($json_data as $post) {
          $created_at = strtotime($post->created_at);
          $formatted_created_at = date("F d, Y - g:i A", $created_at);
          echo "<li>";
            echo "<p>";
            echo "<a href=\"/php/view_post.php?post_id=".$post->id."&topic=".$post->slug."\">";
            echo $post->title;
            echo "<br>";
            echo "</a>";
            echo "<small>Posted by: ".$post->author->fname." ".$post->author->lname." on ".$formatted_created_at."</small>";
            echo "</p>";
          echo "</li>"; 
        }
        echo "</ul>";
      ?>
    </div>

  <!-- inject:js -->
  <!-- endinject -->

  </body>

</html>
