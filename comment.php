<?php
if(isset($_POST["submit"]))
{
 
 //Including dbconfig file.
include 'dbconfig.php';
 
$name = $_POST["name"];
$email = $_POST["email"];
$website = $_POST["website"];
$comment = $_POST["comment"];


mysql_query("INSERT INTO comment_table (name,email,website,comment) VALUES ('$name','$email','$website','$comment')"); 

echo '<center> Comment Successfully Submitted </center>';

}

 ?>

</body>
</html>