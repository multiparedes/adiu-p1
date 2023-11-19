<?php

$q = intval($_GET['q']);

$host = "localhost";
$username = "your_username";
$password = "your_password";
$database = "adiu_p1";

// Create a connection
$con = new mysqli($host, $username, $password, $database);

// Check the connection
if (!$con) {
    die("Connection failed: " . mysqli_error($con));
}

// Your SQL query for SELECT
mysqli_select_db($con, "ajax_demo")
# agafam ses carreres que han passat despres de s'any q
# q se passa per parametre i ho convertim amb una data
$date = date('Y-m-d', strtotime($year . '-01-01')); 

$sql = "SELECT race_name,COUNT(*) as count 
FROM races 
WHERE race_date > $date
GROUP BY race_name 
ORDER BY count DESC;";
$result = mysqli_query($con,$sql);
// Execute the query




// Close the connection
mysqli_close($con);
?>
