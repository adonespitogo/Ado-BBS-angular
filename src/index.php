<?php

require('./php/helpers/env.php');
require("./php/partials/header.php");

$posts_data = file_get_contents($env->api_base_url."/".$env->api_forum_uri."/posts.json");
$json_data = json_decode($posts_data);

echo "<script>window.posts_data = ".$posts_data.";</script>";
?>

  </head>

  <body>
    <div ui-view>
      <a href="/dashboard">Dash</a>
      <?php

        echo "<h1>Welcome to Ado Community Forum</h1>";
        echo "<hr>";

        echo "<ul>";
        foreach($json_data as $post) {
          $created_at = strtotime($post->created_at);
          $formatted_created_at = date("F d, Y - g:i A", $created_at);
          echo "<li>";
            echo "<p>";
            echo "<a href=\"/post/?post_id=".$post->id."&topic=".$post->slug."&page=1\">";
            echo $post->title;
            echo "<br>";
            echo "</a>";
            echo "<small>Posted by: ".$post->user->fname." ".$post->user->lname." on ".$formatted_created_at."</small>";
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
