<?php
/**
 * codes for opeation
 *  code: 1 Operation: plan vs ach mc
 *  code: 2 Operation: ach per stage with month and year
 *  code: 3 Operation: this hets the plan vs ach per stage 
 *  code: 4 Operation: showa the plannings including the open and apl projections 
 *  code: 5 Operation: gets the ach results for this year in app and re in a detailed way for this and last year month by month todo: is it optimal or should i get lc by lc instead of all the lcs at the time?
 *  code: 6 Operation: <description>
 *  code: # Operation: <description>
 *  code: # Operation: <description>
 *  code: # Operation: <description>
 *  code: # Operation: <description>
 *  code: # Operation: <description>
 *  code: # Operation: <description>
 *  code: # Operation: <description>
 *  code: # Operation: <description>
 */


$configs = include('/home/webmaster/wp-config-files/scoreboard_config.php');

$servername = $configs['servername'];
$username = $configs['username'];
$password = $configs['password'];
$dbname = $configs['dbname'];

$conn = null;



$op = $_GET['op'];

/*
checkin if the operatios ar proprely set
 */
if ( intval($op) == 1 ){
	if( isset( $_GET['year'] ) ){
		get_operation_mc_year( 1589 , intval($_GET['year'] ));
	}else{
		http_response_code(400);
	}

}elseif(intval($op) == 2) {
	if( isset( $_GET['year'] ) and isset( $_GET['month'] ) and  isset( $_GET['mc_id'] )){
		get_ach_month_overall(intval($_GET['mc_id']),intval($_GET['year']),intval($_GET['month']));
	}else{
		http_response_code(400);
	}	
}elseif(intval($op) == 3) {
	if( isset( $_GET['year_start'] ) and isset( $_GET['month_start'] ) and 	isset( $_GET['year_end'] ) and isset( $_GET['month_end'] ) and  isset( $_GET['mc_id'] )){
		get_operation_lc_dates_p_v_a(intval($_GET['year_start']),intval($_GET['month_start']),
			intval($_GET['year_end']),intval($_GET['month_end']),intval($_GET['mc_id']));
	}else{
		http_response_code(400);
	}
}elseif(intval($op) == 4) {
	if( isset( $_GET['year'] ) and isset( $_GET['month'] ) and  isset( $_GET['mc_id'] )){
		get_plan_projections(intval($_GET['pr']),intval($_GET['mc_id']),intval($_GET['year']),intval($_GET['month']));
	}else{
		http_response_code(400);
	}	
}elseif(intval($op) == 5) {
	if( isset( $_GET['year'] )  and  isset( $_GET['mc_id'] ) and  isset( $_GET['month'] ) ){
		get_operation_growth(intval($_GET['year']),intval($_GET['month']),intval($_GET['mc_id']));
	}else{
		echo "month ". $_GET['month'];
		echo " year ".$_GET['year'];
		echo " id ".$_GET['mc_id'];
		http_response_code(400);
	}	
}elseif(intval($op) == 6) {
	if( isset( $_GET['year_start'] ) and isset( $_GET['month_start'] ) and 	isset( $_GET['year_end'] ) and isset( $_GET['month_end'] ) and  isset( $_GET['mc_id'] )){
		
		get_operation_lc_dates_p_v_a_detailed(intval($_GET['year_start']),intval($_GET['month_start']),
			intval($_GET['year_end']),intval($_GET['month_end']),intval($_GET['mc_id']));
	}else{
		http_response_code(400);
	}	
}else {
		#code...
	http_response_code(400);

	echo "erro";
	die();
}


/**
 * get the operations in general for the CR calculation
 * @param  int $mc_id id of the MC
 * @param  int $year  year
 * @param  int $month month
 * @return [type]        [description]
 */
function get_ach_month_overall($mc_id,$year,$month){

	$conn = mysql_connect($GLOBALS['servername'], $GLOBALS['username'],$GLOBALS['password'] );
	if(! $conn )
	{
		die('Could not connect: ' . mysql_error());
	}
	mysql_select_db('scoreboard');

//conertion rate for LCs
	$sql = "SELECT app_ach, re_ach, op_ach, apl_ach, LC_name  , operation.year, operation.month, program.name
	from operation Inner join  LC on operation.LC_idLC = LC.idLC  inner join program on program.idprogram = operation.program_idprogram
	where operation.year = ".$year." and operation.month = ".$month." and LC.MC_idMC = ".$mc_id;
	$res = mysql_query( $sql, $conn );
	if(! $res )
	{
		die('Could not get data: ' . mysql_error());
	}
	$results = array();
	while($row = mysql_fetch_array($res, MYSQL_ASSOC))
	{
		if (array_key_exists("{$row['LC_name']}", $results)){

			$results["{$row['LC_name']}"] ["{$row['name']}"] = array( 
				"app_ach" => $row['app_ach'],
				"re_ach" => $row['re_ach'],
				"op_ach" => $row['op_ach'],
				"apl_ach" => $row['apl_ach']
				);
		}else{
			$results["{$row['LC_name']}"] = array(
				"{$row['name']}" => array( 
					"app_ach" => $row['app_ach'],
					"re_ach" => $row['re_ach'],
					"op_ach" => $row['op_ach'],
					"apl_ach" => $row['apl_ach']
					)
				);

		}

	} 


	//conertion rate for MC
	$sql1 = "SELECT sum(app_ach) as app_ach, sum(re_ach) as re_ach, sum(op_ach) as op_ach, sum(apl_ach) as apl_ach, program.name
	from operation Inner join  LC on operation.LC_idLC = LC.idLC  inner join program on program.idprogram = operation.program_idprogram
	where operation.year = ".$year." and operation.month = ".$month." and LC.MC_idMC = ".$mc_id."
	group by program.name";
	$res1 = mysql_query( $sql1, $conn );
	if(! $res1 ){
		die('Could not get data: ' . mysql_error());
	}
	$res_overall = array("MC" => array());
	while($row = mysql_fetch_array($res1, MYSQL_ASSOC)){
		$res_overall["MC"]["{$row['name']}"] = array( 
			"app_ach" => $row['app_ach'],
			"re_ach" => $row['re_ach'],
			"op_ach" => $row['op_ach'],
			"apl_ach" => $row['apl_ach']
			);
	} 
	$results["MC"] = $res_overall["MC"];

	echo json_encode($results);

	mysql_close($conn);


}


/*
 * get all the planning that was prevoiusly calculated by the Database automatization 
 * (what does the automatization in the db does (this runs exlusively in the server): 
 * it caculculates the CR form last monnth and set a goal for open and aplicants)
 * @param  int $mc_id id of the MC
 * @param  int $year  year
 * @param  int $month month
 * @return [type]        [description]
 */
function get_plan_projections($pr,$mc_id,$year,$month){

	$conn = mysql_connect($GLOBALS['servername'], $GLOBALS['username'],$GLOBALS['password'] );
	if(! $conn )
	{
		die('Could not connect: ' . mysql_error());
	}
	mysql_select_db('scoreboard');

//conertion rate for LCs
	$results = array();
	if ($pr == 0 ){
		$sql = "SELECT app_plan, re_plan, op_plan, apl_plan, LC_name  from operation Inner join  LC on 
		operation.LC_idLC = LC.idLC  inner join program on program.idprogram = operation.program_idprogram 
		where operation.year = ".$year." and operation.month = ".$month." and LC.MC_idMC = ".$mc_id;
	}else{
		 //* 	program id (general = 0, igt = 1, ogt = 2,igc = 3,ogc = 4)

		$sql = "SELECT app_plan, re_plan, op_plan, apl_plan, LC_name  from operation Inner join  LC on 
		operation.LC_idLC = LC.idLC  inner join program on program.idprogram = operation.program_idprogram 
		where operation.year = ".$year." and operation.month = ".$month." and LC.MC_idMC = ".$mc_id." 
		and operation.program_idprogram = ".$pr;
	}
	$res = mysql_query( $sql, $conn );

	if(! $res )
	{
		die('Could not get data: ' . mysql_error());
	}
	while($row = mysql_fetch_array($res, MYSQL_ASSOC))
	{
		if (array_key_exists("{$row['LC_name']}", $results)){

			$results["{$row['LC_name']}"]  = array( 
				"app_plan" => $row['app_plan'],
				"re_plan" => $row['re_plan'],
				"op_plan" => $row['op_plan'],
				"apl_plan" => $row['apl_plan']
				);
		}else{
			$results["{$row['LC_name']}"] = array( 
				"app_plan" => $row['app_plan'],
				"re_plan" => $row['re_plan'],
				"op_plan" => $row['op_plan'],
				"apl_plan" => $row['apl_plan']

				);

		}

	} 


	//conertion rate for MC
	$sql1 = "SELECT sum(app_plan) as app_plan, sum(re_plan) as re_plan, sum(op_plan) as op_plan, sum(apl_plan) as apl_plan
	from operation Inner join  LC on operation.LC_idLC = LC.idLC  inner join program on program.idprogram = operation.program_idprogram
	where operation.year = ".$year." and operation.month = ".$month." and LC.MC_idMC = ".$mc_id;
	$res1 = mysql_query( $sql1, $conn );
	if(! $res1 ){
		die('Could not get data: ' . mysql_error());
	}
	$res_overall = array("MC" => array());
	while($row = mysql_fetch_array($res1, MYSQL_ASSOC)){
		$res_overall["MC"] = array( 
			"app_plan" => $row['app_plan'],
			"re_plan" => $row['re_plan'],
			"op_plan" => $row['op_plan'],
			"apl_plan" => $row['apl_plan']
			);
	} 
	$results["MC"] = $res_overall["MC"];

	echo json_encode($results);

	mysql_close($conn);

}

/**
 * gets the plan vs achieved of time per lc in the specified MC with a break down per program
 * @param  int $year_start  
 * @param  int $month_start 
 * @param  int $year_end    int
 * @param  int $month_end   
 * @param  int $mc_id       
 * @return null              
 */
function get_operation_lc_dates_p_v_a_detailed($year_start,$month_start,$year_end,$month_end,$mc_id){


	$conn = mysql_connect($GLOBALS['servername'], $GLOBALS['username'],$GLOBALS['password'] );
	if(! $conn )
	{
		die('Could not connect: ' . mysql_error());
	}
	mysql_select_db('scoreboard');

//conertion rate for LCs
	$sql = "SELECT app_ach, re_ach, op_ach, apl_ach,app_plan,re_plan, op_plan, apl_plan, LC_name  , program.name
	from operation Inner join  LC on operation.LC_idLC = LC.idLC  inner join program on program.idprogram = operation.program_idprogram
	where operation.year Between ".$year_start." and ".$year_end." and operation.month Between ".$month_start." and  ".$month_end." 
	and LC.MC_idMC = ".$mc_id;
	$res = mysql_query( $sql, $conn );
	if(! $res )
	{
		die('Could not get data: ' . mysql_error());
	}
	$results = array();
	while($row = mysql_fetch_array($res, MYSQL_ASSOC))
	{
		if (array_key_exists("{$row['LC_name']}", $results)){

			$results["{$row['LC_name']}"] ["{$row['name']}"] = array( 
				"app_ach" => $row['app_ach'],
				"re_ach" => $row['re_ach'],
				"op_ach" => $row['op_ach'],
				"apl_ach" => $row['apl_ach'],
				"app_plan" => $row['app_plan'],
				"re_plan" => $row['re_plan'],
				"op_plan" => $row['op_plan'],
				"apl_plan" => $row['apl_plan']
				);
		}else{
			$results["{$row['LC_name']}"] = array(
				"{$row['name']}" => array( 
					"app_ach" => $row['app_ach'],
					"re_ach" => $row['re_ach'],
					"op_ach" => $row['op_ach'],
					"apl_ach" => $row['apl_ach'],
					"app_plan" => $row['app_plan'],
					"re_plan" => $row['re_plan'],
					"op_plan" => $row['op_plan'],
					"apl_plan" => $row['apl_plan']
					)
				);

		}

	} 


	//conertion rate for MC
	$sql1 = "SELECT sum(app_ach) as app_ach, sum(re_ach) as re_ach, sum(op_ach) as op_ach, sum(apl_ach) as apl_ach,
	sum(app_plan) as app_plan, sum(re_plan) as re_plan, sum(op_plan) as op_plan, sum(apl_plan) as apl_plan, program.name
	from operation Inner join  LC on operation.LC_idLC = LC.idLC  inner join program on program.idprogram = operation.program_idprogram
	where operation.year Between ".$year_start." and ".$year_end." and operation.month Between ".$month_start." and  ".$month_end."
	and LC.MC_idMC = ".$mc_id."
	group by program.name";
	$res1 = mysql_query( $sql1, $conn );
	if(! $res1 ){
		die('Could not get data: ' . mysql_error());
	}
	$res_overall = array("MC" => array());
	while($row = mysql_fetch_array($res1, MYSQL_ASSOC)){
		$res_overall["MC"]["{$row['name']}"] = array( 
			"app_ach" => $row['app_ach'],
			"re_ach" => $row['re_ach'],
			"op_ach" => $row['op_ach'],
			"apl_ach" => $row['apl_ach'],
			"app_plan" => $row['app_plan'],
			"re_plan" => $row['re_plan'],
			"op_plan" => $row['op_plan'],
			"apl_plan" => $row['apl_plan']
			);
	} 
	$results["MC"] = $res_overall["MC"];

	echo json_encode($results);

	mysql_close($conn);

}



/**
 * gets the plan vs achieved of time per lc in the specified MC
 * @param  int $year_start  
 * @param  int $month_start 
 * @param  int $year_end    int
 * @param  int $month_end   
 * @param  int $mc_id       
 * @return null              
 */
function get_operation_lc_dates_p_v_a($year_start,$month_start,$year_end,$month_end,$mc_id){


	$conn = mysql_connect($GLOBALS['servername'], $GLOBALS['username'],$GLOBALS['password'] );
	if(! $conn )
	{
		die('Could not connect: ' . mysql_error());
	}
	mysql_select_db('scoreboard');

//conertion rate for LCs
	$sql = "SELECT sum(app_ach) as app_ach, sum(re_ach) as re_ach, sum(op_ach) as op_ach, sum(apl_ach) as apl_ach,
	sum(app_plan) as app_plan,sum(re_plan) as re_plan, sum(op_plan) as op_plan, sum(apl_plan) apl_plan, LC_name  
	from operation Inner join  LC on operation.LC_idLC = LC.idLC 
	where operation.year Between ".$year_start." and ".$year_end." and operation.month Between ".$month_start." and  ".$month_end." 
	and LC.MC_idMC = ".$mc_id." group by LC_name";
	$res = mysql_query( $sql, $conn );
	if(! $res )
	{
		die('Could not get data: ' . mysql_error());
	}
	$results = array();
	while($row = mysql_fetch_array($res, MYSQL_ASSOC))
	{
		if (array_key_exists("{$row['LC_name']}", $results)){

			$results["{$row['LC_name']}"] = array( 
				"app_ach" => $row['app_ach'],
				"re_ach" => $row['re_ach'],
				"op_ach" => $row['op_ach'],
				"apl_ach" => $row['apl_ach'],
				"app_plan" => $row['app_plan'],
				"re_plan" => $row['re_plan'],
				"op_plan" => $row['op_plan'],
				"apl_plan" => $row['apl_plan']
				);
		}else{
			$results["{$row['LC_name']}"] =  array( 
				"app_ach" => $row['app_ach'],
				"re_ach" => $row['re_ach'],
				"op_ach" => $row['op_ach'],
				"apl_ach" => $row['apl_ach'],
				"app_plan" => $row['app_plan'],
				"re_plan" => $row['re_plan'],
				"op_plan" => $row['op_plan'],
				"apl_plan" => $row['apl_plan']

				);

		}

	} 


	//conertion rate for MC
	$sql1 = "SELECT sum(app_ach) as app_ach, sum(re_ach) as re_ach, sum(op_ach) as op_ach, sum(apl_ach) as apl_ach,
	sum(app_plan) as app_plan, sum(re_plan) as re_plan, sum(op_plan) as op_plan, sum(apl_plan) as apl_plan, program.name
	from operation Inner join  LC on operation.LC_idLC = LC.idLC  inner join program on program.idprogram = operation.program_idprogram
	where operation.year Between ".$year_start." and ".$year_end." and operation.month Between ".$month_start." and  ".$month_end."
	and LC.MC_idMC = ".$mc_id."
	group by program.name";
	$res1 = mysql_query( $sql1, $conn );
	if(! $res1 ){
		die('Could not get data: ' . mysql_error());
	}
	$res_overall = array("MC" => array());
	while($row = mysql_fetch_array($res1, MYSQL_ASSOC)){
		$res_overall["MC"]["{$row['name']}"] = array( 
			"app_ach" => $row['app_ach'],
			"re_ach" => $row['re_ach'],
			"op_ach" => $row['op_ach'],
			"apl_ach" => $row['apl_ach'],
			"app_plan" => $row['app_plan'],
			"re_plan" => $row['re_plan'],
			"op_plan" => $row['op_plan'],
			"apl_plan" => $row['apl_plan']
			);
	} 
	$results["MC"] = $res_overall["MC"];

	echo json_encode($results);

	mysql_close($conn);

}


/**
 * gets paln and ach for app and re for the MC 
 * @param  int MC id 
 * @return json should return a json (mc name, mc id, year, app planoveral, app ach averall, re overal, re ach)
 */
function get_operation_mc_year($mc_id,$year){

	$conn = mysql_connect($GLOBALS['servername'], $GLOBALS['username'],$GLOBALS['password'] );
	if(! $conn )
	{
		die('Could not connect: ' . mysql_error());
	}
	mysql_select_db('scoreboard');

	$sql = "SELECT sum(app_plan) as app_plan, sum(app_ach) as app_ach,sum(re_plan) as re_plan,sum(re_ach) as re_ach, MC_name, idMC  
	from operation Inner join  LC on operation.LC_idLC = LC.idLC Inner join MC on LC.MC_idMC = MC.idMC
	where operation.year = ".$year." and operation.month >= 6 and MC.idMC = ".$mc_id."
	group by MC_name";

	$res = mysql_query( $sql, $conn );

	if(! $res )
	{
		die('Could not get data: ' . mysql_error());
	}
	$row = mysql_fetch_assoc($res);



	$answer = array('MC_name' => $row['MC_name'], 'MC_id' => $row['idMC'],'app_plan' => $row['app_plan'],
		'app_ach' => $row['app_ach'],'re_plan' => $row['re_plan'],'re_ach' => $row['re_ach']);

	echo json_encode($answer);

	
	mysql_close($conn);



}


/**
 * gets the growth compared to last year per lc in the specified MC with a break down per program
 * @param  int $year
 * @param  int $mc_id       
 * @return null   a json with forma [lc_year_mont_program_results]     
 */
function get_operation_growth($year,$month,$mc_id){


	$conn = mysql_connect($GLOBALS['servername'], $GLOBALS['username'],$GLOBALS['password'] );
	if(! $conn )
	{
		die('Could not connect: ' . mysql_error());
	}
	mysql_select_db('scoreboard');
	$results = array();

//conertion rate for LCs
	$sql = "SELECT sum(re_ach) as re_ach, sum(app_ach) as app_ach ,month, year,LC_name, name
	from operation inner join LC on operation.LC_idLC = LC.idLC inner join program on operation.program_idprogram = idprogram 
	where LC.MC_idMC = ".$mc_id." and year = ". $year." and operation.month between 0 and ".$month." 
	group by LC.LC_name , year, month, name";
	$res = mysql_query( $sql, $conn );
	if(! $res )
	{
		die('Could not get data: ' . mysql_error());
	}
	while($row = mysql_fetch_array($res, MYSQL_ASSOC))
	{

		$results["{$row['LC_name']}"]["{$row['year']}"]["{$row['month']}"]["{$row['name']}"] = array(
			'app' => $row['app_ach'],
			're' => $row['re_ach']
			);
		

	} 
	$sql2 = "SELECT sum(re_ach) as re_ach, sum(app_ach) as app_ach , month, year,LC_name, name
	from operation inner join LC on operation.LC_idLC = LC.idLC inner join program on operation.program_idprogram = idprogram 
	where LC.MC_idMC = ".$mc_id." and year = ". ($year-1)." and operation.month between 0 and ".$month." 
	group by LC.LC_name , year, month, name";
	$res2 = mysql_query( $sql2 , $conn );
	if(! $res2 )
	{
		die('Could not get data: ' . mysql_error());
	}
	while($row = mysql_fetch_array($res2, MYSQL_ASSOC))
	{

		$results["{$row['LC_name']}"]["{$row['year']}"]["'{$row['month']}'"]["{$row['name']}"] = array(
			'app' => $row['app_ach'],
			're' => $row['re_ach']
			);
		

	} 

/*
	//conertion rate for MC
	$sql1 = "SELECT sum(app_ach) as app_ach, sum(re_ach) as re_ach, sum(op_ach) as op_ach, sum(apl_ach) as apl_ach,
	sum(app_plan) as app_plan, sum(re_plan) as re_plan, sum(op_plan) as op_plan, sum(apl_plan) as apl_plan, program.name
	from operation Inner join  LC on operation.LC_idLC = LC.idLC  inner join program on program.idprogram = operation.program_idprogram
	where operation.year Between ".$year_start." and ".$year_end." and operation.month Between ".$month_start." and  ".$month_end."
	and LC.MC_idMC = ".$mc_id."
	group by program.name";
	$res1 = mysql_query( $sql1, $conn );
	if(! $res1 ){
		die('Could not get data: ' . mysql_error());
	}
	$res_overall = array("MC" => array());
	while($row = mysql_fetch_array($res1, MYSQL_ASSOC)){
		$res_overall["MC"]["{$row['name']}"] = array( 
			"app_ach" => $row['app_ach'],
			"re_ach" => $row['re_ach'],
			"op_ach" => $row['op_ach'],
			"apl_ach" => $row['apl_ach'],
			"app_plan" => $row['app_plan'],
			"re_plan" => $row['re_plan'],
			"op_plan" => $row['op_plan'],
			"apl_plan" => $row['apl_plan']
			);
	} 
	$results["MC"] = $res_overall["MC"];*/

	echo json_encode($results);

	mysql_close($conn);

}






function start_db_conn(){
	//starting db conection 
	if(! $conn )
		$conn = mysql_connect($GLOBALS['servername'], $GLOBALS['username'],$GLOBALS['password'] );
	if(! $conn )
	{
		die('Could not connect: ' . mysql_error());
	}
	mysql_select_db('scoreboard');
}


function close_conn(){
	mysql_close($conn);

}

?>