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
mysqli_select_db($con, "ajax_demo");
# agafam ses carreres que han passat a n'aquell any
# q se passa per parametre i ho convertim amb dues dates, que marquen es principi i es final de s'any
$date_min = '2000-01-01'
$date_max = date('Y-m-d', strtotime($year + 1 . '-01-01')); 
$sql = "SELECT location,COUNT(*) as count
FROM races 
WHERE race_date > $date_min AND race_date < $date_max
GROUP BY location 
ORDER BY count DESC;";
$result = mysqli_query($con,$sql);
// Close the connection
mysqli_close($con);
?>
