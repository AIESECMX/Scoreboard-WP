<?php





$committee = $_POST["committee"]; 
$ap_ogt= $_POST["ap_ogt"]; 
$ap_igt= $_POST["ap_igt"]; 
$ap_ogc= $_POST["ap_ogc"]; 
$ap_igc= $_POST["ap_igc"]; 
$re_ogt= $_POST["re_ogt"]; 
$re_igt= $_POST["re_igt"]; 
$re_ogc= $_POST["re_ogc"]; 
$re_igc= $_POST["re_igc"]; 
$startDate= strtotime($_POST["startDate"]); 

$year = date('Y', $startDate); 
$month = date('m', $startDate)-1; 



//igt
$sql_igt="INSERT INTO `operation` (`month`,`year`,`LC_idLC`,`program_idprogram`,`re_plan`,`app_plan`) VALUES (
				{$month},{$year},{$committee},1,{$re_igt},{$ap_igt})
				ON DUPLICATE KEY UPDATE re_plan = {$re_igt}, app_plan = {$ap_igt}";	
//ogt
$sql_ogt="INSERT INTO `operation` (`month`,`year`,`LC_idLC`,`program_idprogram`,`re_plan`,`app_plan`) VALUES (
				{$month},{$year},{$committee},2,{$re_ogt},{$ap_ogt})
				ON DUPLICATE KEY UPDATE re_plan = {$re_ogt}, app_plan = {$ap_ogt}";	
//igc
$sql_igc="INSERT INTO `operation` (`month`,`year`,`LC_idLC`,`program_idprogram`,`re_plan`,`app_plan`) VALUES (
				{$month},{$year},{$committee},3,{$re_igc},{$ap_igc})
				ON DUPLICATE KEY UPDATE re_plan = {$re_igc}, app_plan = {$ap_igc}";	
//ogc
$sql_ogc="INSERT INTO `operation` (`month`,`year`,`LC_idLC`,`program_idprogram`,`re_plan`,`app_plan`) VALUES (
				{$month},{$year},{$committee},4,{$re_ogc},{$ap_ogc})
				ON DUPLICATE KEY UPDATE re_plan = {$re_ogc}, app_plan = {$ap_ogc}";	



$servername = "67.192.246.142:3306";
$username = "root";
$password = "A1ESECMX-hub2438_dbs";
$dbname = "scoreboard";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}





if (mysqli_query($conn, $sql_igc) and mysqli_query($conn, $sql_igt) and 
mysqli_query($conn, $sql_ogc) and mysqli_query($conn, $sql_ogt) ) {
echo "<script type='text/javascript'>alert('Se regostro tu meta');</script>";
} else {
echo "<script type='text/javascript'>alert('No se registro tu meta, intenta de nuevo');</script>";
}

mysqli_close($conn);

echo '<a href="https://opportunities.aiesec.org/" target="_blank"> Ingresa otra respuesta </a>';




?>