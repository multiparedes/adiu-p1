<?php
session_start();

$con = mysqli_connect("localhost", "root", "");
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}

$db = mysqli_select_db($con, "adiu_p1") or die("Fatal error: Database error!");

$sql = "SELECT race_name,COUNT(*) as count 
FROM races 
GROUP BY race_name 
ORDER BY count DESC;";
$result = $con->query($sql);

if (!$result) {
    die('Error in query: ' . $con->error);
}

$rows = array();
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

echo json_encode($rows);

$con->close();
session_destroy();
?>