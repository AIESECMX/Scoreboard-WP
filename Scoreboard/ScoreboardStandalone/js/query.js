/**
 * todo: hacer que  el ambio de seleccion de programa trabaje con los mismo datos en vez de hacer una nueva peticion 
 * ponerle un listener para que lo haga solo
 */

 var nu = 1;
 var data_cr = null;




/*
======================================================================
      Main function. To be loaded when on document 'ready' event      
======================================================================
*/

$(function(){
	//to get PLan vs ach MC
	$("#submitbtn").click(function (){
		pl_vs_ach();
	});
	//to get PLan convertion rates
	$("#submitbtn_cr").click(function (){
		show_cr_entity(0);
	});
	//to get PLan vs ach
	$("#submitbtn_p_v_a").click(function (){
		show_plan_vs_ach_lc(0,0);
	});
	//to get projections
	$("#submitbtn_proj").click(function (){
		show_plan_proj(0);
	});
	//to get growth 
	$("#submitbtn_growth").click(function (){
		show_growth_entity(2016,2);
	});
	//to get PLan vs ach detailed
	$("#submitbtn_ach_d").click(function (){
		show_plan_vs_ach_lc_d(0,0);

	});
	//TO-DO: Either respond to "GET" analytics requests, or attach event to "Enter" keystroke
});




/**
 * id for PHP = 1
*general funciotn to get plan vs ach MC id for PHP = 1
*/
function pl_vs_ach(mc_id = 1589){
	var data = {
		"op": 1,
		"mc": mc_id,
		"year": 2016
	};
	data = $(this).serialize() + "&" + $.param(data);
	$.ajax({
		type: "GET",
      url: "./php/query.php", //Relative or absolute path to response.php file
      dataType: "json",
      data: data,
      success: function(dat) {
      	$("#teslabel").innerHTML = "lala ";
      	document.getElementById("teslabel").innerHTML = JSON.stringify(dat);

      	var consulta = JSON.parse(dat);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown){
      	$("#teslabel").innerHTML="no lol";
      }
  });

}

/////////////////////////////////
////// CR screen  start//////
/////////////////////////////////
/**
* this funciotn show all the CR for entity with the 
*requested months /all the lcs/ also the ach in each 
*step of the CF
*it shoud show (mc,open,cr,appli,cr,app,cr,re,cr,comp)
 * caulculates the cr for a whole entity
 * @param  {int} mc_id MC's id in EXPA and database
 * @param  {date} date  the year and month
 * @return {null}       will display the info in the corresponding table
 */
 function show_cr_entity(date,mc_id = 1589){
// @todo: check if the coockie or sys var is set and iuse it, else make the post call
	//@todo: get the month and year
	var year = 2016;
	var month = 6;


	var data = {
		"op": 2,
		"mc_id": mc_id,
		"year": year,
		"month": month
	};
	data = $(this).serialize() + "&" + $.param(data);
	$.ajax({
		type: "GET",
      	url: "./php/query.php", //Relative or absolute path to response.php file
      	dataType: "json",
      	data: data,
      	success: function(dat) {

      		display_cr_entity(dat);
      	},
      	error: function(XMLHttpRequest, textStatus, errorThrown){
      		$("#cr").innerHTML="no lol";
      	}
      });
}

function display_cr_entity(data){
	var ogt_op = 0;
	var ogv_op = 0;
	var igv_op = 0;
	var igt_op = 0;
	var ogt_apl = 0;
	var ogv_apl = 0;
	var igv_apl = 0;
	var igt_apl = 0;
	var ogt_ap = 0;
	var ogv_ap = 0;
	var igv_ap = 0;
	var igt_ap = 0;
	var ogt_re = 0;
	var ogv_re = 0;
	var igv_re = 0;
	var igt_re = 0;


	for (var lc in data){

		ogt_op += parseInt(data[lc].oGT.op_ach);
		ogt_apl += parseInt(data[lc].oGT.apl_ach);
		ogt_ap += parseInt(data[lc].oGT.app_ach);
		ogt_re += parseInt(data[lc].oGT.re_ach);
		data[lc].oGT.cr_op_apl = ogt_apl/ogt_op;
		data[lc].oGT.cr_apl_ap = ogt_ap/ogt_apl;
		data[lc].oGT.cr_ap_re = ogt_ap/ogt_re;
		

		igv_op += parseInt(data[lc].iGC.op_ach);
		igv_apl += parseInt(data[lc].iGC.apl_ach);
		igv_ap += parseInt(data[lc].iGC.app_ach);
		igv_re += parseInt(data[lc].iGC.re_ach);
		data[lc].iGC.cr_op_apl = igv_apl/igv_op;
		data[lc].iGC.cr_apl_ap = igv_ap/igv_apl;
		data[lc].iGC.cr_ap_re = igv_ap/igv_re;
		
		igt_op += parseInt(data[lc].iGT.op_ach);
		igt_apl += parseInt(data[lc].iGT.apl_ach);
		igt_ap += parseInt(data[lc].iGT.app_ach);
		igt_re += parseInt(data[lc].iGT.re_ach);
		data[lc].iGT.cr_op_apl = igt_apl/igt_op;
		data[lc].iGT.cr_apl_ap = igt_ap/igt_apl;
		data[lc].iGT.cr_ap_re = igt_ap/igt_re;


		ogv_op += parseInt(data[lc].oGC.op_ach);
		ogv_apl += parseInt(data[lc].oGC.apl_ach);
		ogv_ap += parseInt(data[lc].oGC.app_ach);
		ogv_re += parseInt(data[lc].oGC.re_ach);
		data[lc].oGC.cr_op_apl = ogv_apl/ogv_op;
		data[lc].oGC.cr_apl_ap = ogv_ap/ogv_apl;
		data[lc].oGC.cr_ap_re = ogv_ap/ogv_re;
		
	}

	data_cr = data;
	document.getElementById("cr").innerHTML = JSON.stringify(data);

}

/**
* this funciotn show all the CR for entity with the 
*requested months by programa /all the LCS/  also the ach in each 
*step of the CF
*it shoud show (mc,open,cr,appli,cr,app,cr,re,cr,comp) for the selcted program
*
 * @param  {int} 
 * 	mc id 
 * @param  {int}
 * 	program id (general = 0, igt = 1, ogt = 2,igc = 3,ogc = 4)
 * @param  {date} 
 * 	start date
 * @param  {date}
 * 	end date
 * @return {null}
 */
 function show_cr_entity_pr(mc_id,pr,start_date,end_date){

//get the json containig the info without cr 

// itrate and calculate cr

//iterate in the whole info to display it


}

/**
*la funcion para calcular  los convertions rates
* y los datos de achieved de opne, appl, app, re, y co co sus respectivos CR
*por comite por mes
*it shoud show (mc,open,cr,appli,cr,app,cr,re,cr,comp)
*/
function operation_CR_committee_lc(lc_id,start_date,end_date){

//


}


/**
*la funcion para calcularlos convertions rates
* y los datos de achieved de opne, appl, app, re, y co co sus respectivos CR
*por comite por mes y por porgrama
*it shoud show (mc,open,cr,appli,cr,app,cr,re,cr,comp) for selected progrma 
*/
function operation_CR_committee_lc_pr(lc_id,pr,start_date,end_date){}



///AUXILIARES
function get_lc_ids(){}

/////////////////////////////////
//////      C R  end//////
/////////////////////////////////




/////////////////////////////////
//////mAchievment screen  start//////
/////////////////////////////////


/**
*this function displays all the stats for plan vs
*ach in each stage of the costuer flow using dates
*whould return (lc, openPlan,openach,opengrowth,aplPlan,aplAch,aplgrowth,appPlan,AppAch,appgrowth,RePlan,reAch,regrowth,
*coPla,coAch,cogrowth)
*/
function show_plan_vs_ach_lc(start_date,end_date, mc_id = 1589){
	
	var year_start = 2016;
	var month_start = 6;
	var year_end = 2016;
	var month_end = 6;


	var data = {
		"op": 3,
		"mc_id": mc_id,
		"year_start": year_start,
		"month_start": month_start,
		"year_end": year_end,
		"month_end": month_end
	};
	data = $(this).serialize() + "&" + $.param(data);
	$.ajax({
		type: "GET",
      	url: "./php/query.php", //Relative or absolute path to response.php file
      	dataType: "json",
      	data: data,
      	success: function(dat) {


      		display_p_v_a_entity(dat);
      	},
      	error: function(XMLHttpRequest, textStatus, errorThrown){
      		$("#p_v_a_lc").innerHTML="no lol";
      	}
      });

}


function display_p_v_a_entity(data){

	document.getElementById("p_v_a_lc").innerHTML = JSON.stringify(data);
}


/**
*this function displays all the stats for plan vs
*ach in each stage of the costuer flow using dates
*whould return (mc, openPlan,openach,opengrowth,aplPlan,aplAch,aplgrowth,appPlan,AppAch,appgrowth,RePlan,reAch,regrowth,
*coPla,coAch,cogrowth)
*/
function show_plan_vs_ach_and_growth_mc_detailed(mc_id,start_date,end_date){}




/////////////////////////////////
//////Achievment screen end//////
/////////////////////////////////


/////////////////////////////////
//////proyections screen start//////
/////////////////////////////////

/**
*this function displays all the stats for plan vs
*ach in each stage of the costuer flow using dates
*whould return (lc, openPlan,openach,opengrowth,aplPlan,aplAch,aplgrowth,appPlan,AppAch,appgrowth,RePlan,reAch,regrowth,
*coPla,coAch,cogrowth)
*/
function show_plan_proj(date, mc_id = 1589){
	
	var year = 2016;
	var month = 6;


	var data = {
		"op": 4,
		"mc_id": mc_id,
		"year": year,
		"month": month
	};
	data = $(this).serialize() + "&" + $.param(data);
	$.ajax({
		type: "GET",
      	url: "./php/query.php", //Relative or absolute path to response.php file
      	dataType: "json",
      	data: data,
      	success: function(dat) {

      		
      		display_plan_proj(dat);
      	},
      	error: function(XMLHttpRequest, textStatus, errorThrown){
      		$("#proj").innerHTML="no lol";
      	}
      });

}


function display_plan_proj(data){

	document.getElementById("proj").innerHTML = JSON.stringify(data);
}


/**
* this function will show committees plan and show the calculations for them to achieve ther app,re, co plan
*it will return/show (mc, ap,re,co,op,apl)
*/
function projection_mc(mc_id,start_date,end_date){}


/**
* this function will show committees plan and show the calculations for them to achieve ther app,re, co plan
*it will return/show (lc, ap,re,co,op,apl)
*/
function projection_lc(lc_id,start_date,end_date){}


/**
* this function will show committees plan and show the calculations for them to achieve ther app,re, co plan
*it will return/show (mc, ap,re,co,op,apl)
*/
function projection_mc_pr(mc_id,pr,start_date,end_date){}


/**
* this function will show committees plan and show the calculations for them to achieve ther app,re, co plan
*it will return/show (lc, ap,re,co,op,apl)
*/
function projection_lc_pr(lc_id,pr,start_date,end_date){}

/////////////////////////////////
//////Achievment screen end//////
/////////////////////////////////



/////////////////////////////////
//////Gowht screen start//////
/////////////////////////////////


function show_growth_entity(year,month,mc_id = 1589){

	var year = 2016;
	var mont = 6;


	var data = {
		"op": 5,
		"mc_id": mc_id,
		"year": year,
		"month": mont
	};
	data = $(this).serialize() + "&" + $.param(data);
	$.ajax({
		type: "GET",
      	url: "./php/query.php", //Relative or absolute path to response.php file
      	dataType: "json",
      	data: data,
      	success: function(dat) {
      		display_growth(dat);
      	},
      	error: function(XMLHttpRequest, textStatus, errorThrown){
      		$("#growth").innerHTML="no lol";
      	}
      });
}

function display_growth(data){
	document.getElementById("growth").innerHTML = JSON.stringify(data);

}

/**
 * this funciton will get the gowht for every lc in the mc seleted and will show the comparisiont vs last year
 * @param  {int} 
 * @return {null} it should display and retunr the following info (lc_id,lc_name,ach_last_year,ach_this_year) for each lc
 */
 function growth_lcs(mc_id){} 


/**
 * this funciton will get the gowht for every lc in the mc seleted and will show the comparision vs the last year
 * @param  {int} 
 * @return {null} it should display and retunr the following info (mc_name,ach_last_year,ach_this_year) for the mc
 */
 function growth_mc(mc_id){} 


/**
 * this funciton will show the growth for every program for the selected LC
 * @param  {int} the lc id
 * @return {null}	should return/show the following data (lc_name,[(program_name,lastyear,this_year,relative,absolute)],[(year,month,abs,relative,pr)])
 */
 function growth_lc_pr(lc_id){}

/**
 * this funciton will show the growth for every program for the selected MC
 * @param  {int} the mc id
 * @return {null}	should return/show the following data (MC_name,[(program_name,lastyear,this_year,relative,absolute)],[(year,month,abs,relative,pr)])
 */
 function growth_lc_pr(mc_id){}



/////////////////////////////////
//////growth screen end//////
/////////////////////////////////


/////////////////////////////////
//////detailes screen start//////
/////////////////////////////////

/**
*this function displays all the stats for plan vs
*ach in each stage of the costuer flow using dates
*whould return (lc, openPlan,openach,opengrowth,aplPlan,aplAch,aplgrowth,appPlan,AppAch,appgrowth,RePlan,reAch,regrowth,
*coPla,coAch,cogrowth)
*/
function show_plan_vs_ach_lc_d(start_date,end_date, mc_id = 1589){
	
	var year_start = 2016;
	var month_start = 6;
	var year_end = 2016;
	var month_end = 6;


	var data = {
		"op": 6,
		"mc_id": mc_id,
		"year_start": year_start,
		"month_start": month_start,
		"year_end": year_end,
		"month_end": month_end
	};
	data = $(this).serialize() + "&" + $.param(data);
	$.ajax({
		type: "GET",
      	url: "./php/query.php", //Relative or absolute path to response.php file
      	dataType: "json",
      	data: data,
      	success: function(dat) {

      		
      		display_p_v_a_entity_d(dat);
      	},
      	error: function(XMLHttpRequest, textStatus, errorThrown){
      		$("#p_v_a_lc").innerHTML="no lol";
      	}
      });

}


function display_p_v_a_entity_d(data){

	document.getElementById("ach_d").innerHTML = JSON.stringify(data);
}

/**
 * this funciton will get the plan v achieved for every lc in the mc seleted and will show the comparisiont plan vs ach
 * @param  {int} 
 * @return {null} it should display and retunr the following info (lc_id,lc_name,ach_last_year,ach_this_year) for each lc
 */
 function ach_lcs(mc_id){} 



/**
 * this funciton will get the plan v ach for  the mc seleted and will show the comparision vs the las
 * @param  {int} 
 * @return {null} it should display and retunr the following info (lc_id,lc_name,ach_last_year,ach_this_year) for the mc
 */
 function ach_mc(mc_id){} 


/**
 * this funciton will show the plan vs for every program for the selected LC
 * @param  {int} the lc id
 * @return {null}	should return/show the following data (lc_name,[(program_name,lastyear,this_year,relative,absolute)],[(year,month,abs,relative,pr)])
 */
 function ach_lc_pr(lc_id){}

/**
 * this funciton will show the plan vs ach for every program for the selected MC
 * @param  {int} the mc id
 * @return {null}	should return/show the following data (MC_name,[(program_name,lastyear,this_year,relative,absolute)],[(year,month,abs,relative,pr)])
 */
 function ach_lc_pr(mc_id){}

/////////////////////////////////
//////detailed screen end//////
/////////////////////////////////
