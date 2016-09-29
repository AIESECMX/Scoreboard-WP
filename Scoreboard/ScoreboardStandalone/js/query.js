/**
 * todo: hacer que  el ambio de seleccion de programa trabaje con los mismo datos en vez de hacer una nueva peticion 
 * ponerle un listener para que lo haga solo
 */

 var nu = 1;
 
 var mc_overall = null
 var mc_pva = null;

 var year_global = null;
 var month_global = null;
 var data_cr = null;
 


/*
======================================================================
      Main function. To be loaded when on document 'ready' event      
======================================================================
*/

$(function(){



	// the screen thats is making the call for us to make the initial query
	var el = document.getElementById('screen').value;
	console.log(el);
	switch(parseInt(el)){
		case 0:

		break;
		case 1:
		//growth
		var d = new Date();
		show_growth_entity(d.getFullYear(),d.getMonth());
		//generate_test()
		$("#go_gr").click(function (){
			var month_i = document.getElementById("month_in");
			var m_i = month_i.options[month_i.selectedIndex].value;
			var year_i = document.getElementById("year_in");
			var y_i = year_i.options[year_i.selectedIndex].value;
			show_growth_entity(y_i,m_i);
		});

		break;
		case 2:
		//Convertion rates
		var d = new Date();
		show_cr_entity(d.getFullYear(),d.getMonth(),0);
		$("#go_cr").click(function (){
			var pr = document.getElementById("programa");
			var pro = pr.options[pr.selectedIndex].value;
			var m = document.getElementById("mes");
			var month = m.options[m.selectedIndex].value;
			var year = document.getElementById("year");
			var y = year.options[year.selectedIndex].value;
			show_cr_entity(y,month,pro);
		});
		break;
		case 3:
		//proyections 
		show_plan_proj(0,-1);
		$("#go_proj").click(function (){
			var pr = document.getElementById("programa");
			var pro = pr.options[pr.selectedIndex].value;
			var m = document.getElementById("mes");
			var month = m.options[m.selectedIndex].value;

			show_plan_proj(pro,month);
		});
		break;
		case 4:
		//achievement
		var d = new Date();
		show_plan_vs_ach_lc(d.getFullYear(),d.getMonth(),d.getFullYear(),d.getMonth());
		$("#go_ach").click(function (){


			var month_i = document.getElementById("month_in");
			var m_i = month_i.options[month_i.selectedIndex].value;
			var year_i = document.getElementById("year_in");
			var y_i = year_i.options[year_i.selectedIndex].value;
			var month_f = document.getElementById("month_out");
			var m_f = month_f.options[month_f.selectedIndex].value;
			var year_f = document.getElementById("year_out");
			var y_f = year_f.options[year_f.selectedIndex].value;
			show_plan_vs_ach_lc(y_i,m_i,y_f,m_f);
		});
		break;
		case 5:
		//achievement detailed
		var d = new Date();
		show_plan_vs_ach_lc_d(d.getFullYear(),d.getMonth(),d.getFullYear(),d.getMonth());
		//generate_test()
		$("#go_ach_d").click(function (){
			var month_i = document.getElementById("month_in");
			var m_i = month_i.options[month_i.selectedIndex].value;
			var year_i = document.getElementById("year_in");
			var y_i = year_i.options[year_i.selectedIndex].value;
			var month_f = document.getElementById("month_out");
			var m_f = month_f.options[month_f.selectedIndex].value;
			var year_f = document.getElementById("year_out");
			var y_f = year_f.options[year_f.selectedIndex].value;
			show_plan_vs_ach_lc_d(y_i,m_i,y_f,m_f);
		});
		break;
		default:

		break;
	}





//DEV
/*
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
		show_plan_proj(new Date());
	});
	//to get growth 
	$("#submitbtn_growth").click(function (){
		show_growth_entity(2016,2);
	});
	//to get PLan vs ach detailed
	$("#submitbtn_ach_d").click(function (){
		show_plan_vs_ach_lc_d(0,0);

	});
*/
	//DEV
	//TO-DO: Either respond to "GET" analytics requests, or attach event to "Enter" keystroke
});


function generate_detailes_table(committee_id){

	//finding list
	var ul = document.getElementById("list");
	//(creating row in the list)
	var li = document.createElement("li");
	//creating heder for the collapasable list element
	var div_head = document.createElement("div");
	div_head.setAttribute("class","collapsible-header");
	//creating chart for the header
	var chart_global = document.createElement("div");
	chart_global.setAttribute("id","chart_"+committee_id);
	chart_global.setAttribute("style","background-color:#F3F4F7");
	div_head.setAttribute("style","background-color:#F3F4F7");
	div_head.appendChild(chart_global);
	li.appendChild(div_head);

	//creating body of the collapasble view
	var div_f = document.createElement("div");
	div_f.setAttribute("class","collapsible-body");
	//creating the chart for the four programs
	var chart_programs = document.createElement("div");
	chart_programs.setAttribute("id","chart_programs"+committee_id);
	div_f.appendChild(chart_programs);

	//creating and adding table
	var table = document.createElement("table");
	table.setAttribute("class","striped sortable-theme-minimal");
	table.setAttribute("data-sortable","true");
	table.setAttribute("id","table_"+committee_id);
	//set el primer header
	var t_header = table.createTHead();
	var th1 = document.createElement("th");
	th1.setAttribute("colspan","3");
	var th2 = document.createElement("th");
	th2.setAttribute("colspan","3");
	th2.setAttribute("class","center-align grey darken-1 white-text");
	th2.appendChild(document.createTextNode("Approved"));
	var th3 = document.createElement("th");
	th3.setAttribute("colspan","3");
	th3.setAttribute("class","center-align grey darken-1 white-text");
	th3.appendChild(document.createTextNode("Realized"));
	var th4 = document.createElement("th");
	th4.setAttribute("colspan","3");
	th4.setAttribute("class","center-align grey darken-1 white-text");
	th4.appendChild(document.createTextNode("Completed"));
	t_header.appendChild(th1);
	t_header.appendChild(th2);
	t_header.appendChild(th3);
	t_header.appendChild(th4);


	//creando el segundo header dela tabla
	////set el primer header
	var t_header_a = document.createElement("thead");
	var th_a = document.createElement("th");
	th_a.setAttribute("class","center-align");
	th_a.appendChild(document.createTextNode("Programa"));
	var th_b = document.createElement("th");
	th_b.setAttribute("class","center-align");
	th_b.setAttribute("data-sortable-type","numeric");
	th_b.appendChild(document.createTextNode("Open"));
	var th_c = document.createElement("th");
	th_c.setAttribute("class","center-align");
	th_c.setAttribute("data-sortable-type","numeric");
	th_c.appendChild(document.createTextNode("Accept"));
	var th_d = document.createElement("th");
	th_d.setAttribute("class","center-align");
	th_d.setAttribute("data-sortable-type","numeric");
	th_d.appendChild(document.createTextNode("Plan"));
	var th_e = document.createElement("th");
	th_e.setAttribute("class","center-align");
	th_e.setAttribute("data-sortable-type","numeric");
	th_e.appendChild(document.createTextNode("Achieved"));
	var th_f = document.createElement("th");
	th_f.setAttribute("class","center-align");
	th_f.setAttribute("data-sortable-type","numeric");
	th_f.appendChild(document.createTextNode("%"));
	var th_g = document.createElement("th");
	th_g.setAttribute("class","center-align");
	th_g.setAttribute("data-sortable-type","numeric");
	th_g.appendChild(document.createTextNode("Plan"));
	var th_h = document.createElement("th");
	th_h.setAttribute("class","center-align");
	th_h.setAttribute("data-sortable-type","numeric");
	th_h.appendChild(document.createTextNode("Achieved"));
	var th_i = document.createElement("th");
	th_i.setAttribute("class","center-align");
	th_i.setAttribute("data-sortable-type","numeric");
	th_i.appendChild(document.createTextNode("%"));
	var th_j = document.createElement("th");
	th_j.setAttribute("class","center-align");
	th_j.setAttribute("data-sortable-type","numeric");
	th_j.appendChild(document.createTextNode("Plan"));
	var th_k = document.createElement("th");
	th_k.setAttribute("class","center-align");
	th_k.setAttribute("data-sortable-type","numeric");
	th_k.appendChild(document.createTextNode("Achieved"));
	var th_l = document.createElement("th");
	th_l.setAttribute("class","center-align");
	th_l.setAttribute("data-sortable-type","numeric");
	th_l.appendChild(document.createTextNode("%"));

	t_header_a.appendChild(th_a);
	t_header_a.appendChild(th_b);
	t_header_a.appendChild(th_c);
	t_header_a.appendChild(th_d);
	t_header_a.appendChild(th_e);
	t_header_a.appendChild(th_f);
	t_header_a.appendChild(th_g);
	t_header_a.appendChild(th_h);
	t_header_a.appendChild(th_i);
	t_header_a.appendChild(th_j);
	t_header_a.appendChild(th_k);
	t_header_a.appendChild(th_l);
	table.appendChild(t_header_a);
	//creando el body de la tabla
	var tbody = document.createElement("tbody");
	tbody.setAttribute("id","tbody_"+committee_id);
	table.appendChild(tbody);
	div_f.appendChild(table);
	li.appendChild(div_f);
	ul.appendChild(li);

}

/**
 * this method egenerates the tables for the growth page
 * @param  {[type]} committee_id [description]
 * @return {[type]}              [description]
 */
 function generate_detailed_table_gr(committee_id,year){

	//finding list
	var ul = document.getElementById("list");
	//(creating row in the list)
	var li = document.createElement("li");
	//creating heder for the collapasable list element
	var div_head = document.createElement("div");
	div_head.setAttribute("class","collapsible-header");
	//creating chart for the header
	var chart_global = document.createElement("div");
	chart_global.setAttribute("id","chart_"+committee_id);
	chart_global.setAttribute("style","background-color:#F3F4F7");
	div_head.setAttribute("style","background-color:#F3F4F7");
	div_head.appendChild(chart_global);
	li.appendChild(div_head);

	//creating body of the collapasble view
	var div_f = document.createElement("div");
	div_f.setAttribute("class","collapsible-body");
	//creating the chart for the four programs
	var chart_programs = document.createElement("div");
	chart_programs.setAttribute("id","chart_programs"+committee_id);
	div_f.appendChild(chart_programs);



	////////SUBLISTA
///////////SUBLISTA
///////////SUBLISTA
///////////SUBLISTA
	//sub lista de approved
	var sub_list = document.createElement("ul");
	sub_list.setAttribute("class","nested collapsible popout");
	sub_list.setAttribute("data-collapsible","accordion");
	sub_list.setAttribute("id","sub_list_app"+committee_id);
	var li_s_a = document.createElement("li");
	//creating heder for the collapasable list element
	var div_head_s_a = document.createElement("div");
	div_head_s_a.setAttribute("class","collapsible-header");
	div_head_s_a.appendChild(document.createTextNode("Approved"));
	var div_body_s_a = document.createElement("div");
	div_body_s_a.setAttribute("class","collapsible-body");
	var sub_table_app = document.createElement("table");
	sub_table_app.setAttribute("id","sub_table_app"+committee_id);
	sub_table_app.setAttribute("class","striped sortable-theme-minimal");
	var sub_table_app_head = sub_table_app.createTHead();

	//header
	var th_a = document.createElement("th");
	th_a.setAttribute("class","center-align");
	th_a.setAttribute("data-sortable-type","numeric");
	th_a.appendChild(document.createTextNode("Mes"));
	var th_b = document.createElement("th");
	th_b.setAttribute("class","center-align");
	th_b.setAttribute("data-sortable-type","numeric");
	th_b.appendChild(document.createTextNode("iGT "+(year-1)));
	var th_c = document.createElement("th");
	th_c.setAttribute("class","center-align");
	th_c.setAttribute("data-sortable-type","numeric");
	th_c.appendChild(document.createTextNode("iGT "+year));
	var th_d = document.createElement("th");
	th_d.setAttribute("class","center-align");
	th_d.setAttribute("data-sortable-type","numeric");
	th_d.appendChild(document.createTextNode("oGT"+(year-1)));
	var th_e = document.createElement("th");
	th_e.setAttribute("class","center-align");
	th_e.setAttribute("data-sortable-type","numeric");
	th_e.appendChild(document.createTextNode("oGT "+year));
	var th_f = document.createElement("th");
	th_f.setAttribute("class","center-align");
	th_f.setAttribute("data-sortable-type","numeric");
	th_f.appendChild(document.createTextNode("iGV "+(year-1)));
	var th_g = document.createElement("th");
	th_g.setAttribute("class","center-align");
	th_g.setAttribute("data-sortable-type","numeric");
	th_g.appendChild(document.createTextNode("iGV "+year));
	var th_h = document.createElement("th");
	th_h.setAttribute("class","center-align");
	th_h.setAttribute("data-sortable-type","numeric");
	th_h.appendChild(document.createTextNode("oGV "+(year-1)));
	var th_i = document.createElement("th");
	th_i.setAttribute("class","center-align");
	th_i.setAttribute("data-sortable-type","numeric");
	th_i.appendChild(document.createTextNode("oGV "+year));
	var th_j = document.createElement("th");
	th_j.setAttribute("class","center-align");
	th_j.setAttribute("data-sortable-type","numeric");
	th_j.appendChild(document.createTextNode("Abs Growth"));
	var th_k = document.createElement("th");
	th_k.setAttribute("class","center-align");
	th_k.setAttribute("data-sortable-type","numeric");
	th_k.appendChild(document.createTextNode("% Growth"));
	//header
	sub_table_app_head.appendChild(th_a);
	sub_table_app_head.appendChild(th_b);
	sub_table_app_head.appendChild(th_c);
	sub_table_app_head.appendChild(th_d);
	sub_table_app_head.appendChild(th_e);
	sub_table_app_head.appendChild(th_f);
	sub_table_app_head.appendChild(th_g);
	sub_table_app_head.appendChild(th_h);
	sub_table_app_head.appendChild(th_i);
	sub_table_app_head.appendChild(th_j);
	sub_table_app_head.appendChild(th_k);
	
	var sub_table_app_body = document.createElement("tbody");
	sub_table_app_body.setAttribute("id","sub_app_body"+committee_id);
	sub_table_app.appendChild(sub_table_app_body);
	div_body_s_a.appendChild(sub_table_app);
	//div_body_s_a.appendChild(document.createTextNode("APPPP"));
	li_s_a.appendChild(div_head_s_a);
	li_s_a.appendChild(div_body_s_a);
	

	//sub lista de re
	var li_s_r = document.createElement("li");
	//creating heder for the collapasable list element
	var div_head_s_r = document.createElement("div");
	div_head_s_r.setAttribute("class","collapsible-header");
	div_head_s_r.appendChild(document.createTextNode("Realized"));
	var div_body_s_r = document.createElement("div");
	div_body_s_r.setAttribute("class","collapsible-body");
	var sub_table_re = document.createElement("table");
	sub_table_re.setAttribute("class","striped sortable-theme-minimal");
	sub_table_re.setAttribute("id","sub_table_re"+committee_id);
	var sub_table_re_head = sub_table_re.createTHead();
	//header
	var th_l = document.createElement("th");
	th_l.setAttribute("class","center-align");
	th_l.setAttribute("data-sortable-type","numeric");
	th_l.appendChild(document.createTextNode("Mes"));
	var th_m = document.createElement("th");
	th_m.setAttribute("class","center-align");
	th_m.setAttribute("data-sortable-type","numeric");
	th_m.appendChild(document.createTextNode("iGT "+(year-1)));
	var th_n = document.createElement("th");
	th_n.setAttribute("class","center-align");
	th_n.setAttribute("data-sortable-type","numeric");
	th_n.appendChild(document.createTextNode("iGT "+year));
	var th_o = document.createElement("th");
	th_o.setAttribute("class","center-align");
	th_o.setAttribute("data-sortable-type","numeric");
	th_o.appendChild(document.createTextNode("oGT"+(year-1)));
	var th_p = document.createElement("th");
	th_p.setAttribute("class","center-align");
	th_p.setAttribute("data-sortable-type","numeric");
	th_p.appendChild(document.createTextNode("oGT "+year));
	var th_q = document.createElement("th");
	th_q.setAttribute("class","center-align");
	th_q.setAttribute("data-sortable-type","numeric");
	th_q.appendChild(document.createTextNode("iGV "+(year-1)));
	var th_r = document.createElement("th");
	th_r.setAttribute("class","center-align");
	th_r.setAttribute("data-sortable-type","numeric");
	th_r.appendChild(document.createTextNode("iGV "+year));
	var th_s = document.createElement("th");
	th_s.setAttribute("class","center-align");
	th_s.setAttribute("data-sortable-type","numeric");
	th_s.appendChild(document.createTextNode("oGV "+(year-1)));
	var th_t = document.createElement("th");
	th_t.setAttribute("class","center-align");
	th_t.setAttribute("data-sortable-type","numeric");
	th_t.appendChild(document.createTextNode("oGV "+year));
	var th_u = document.createElement("th");
	th_u.setAttribute("class","center-align");
	th_u.setAttribute("data-sortable-type","numeric");
	th_u.appendChild(document.createTextNode("Abs Growth"));
	var th_v = document.createElement("th");
	th_v.setAttribute("class","center-align");
	th_v.setAttribute("data-sortable-type","numeric");
	th_v.appendChild(document.createTextNode("% Growth"));
	//header

	sub_table_re_head.appendChild(th_l);
	sub_table_re_head.appendChild(th_m);
	sub_table_re_head.appendChild(th_n);
	sub_table_re_head.appendChild(th_o);
	sub_table_re_head.appendChild(th_p);
	sub_table_re_head.appendChild(th_q);
	sub_table_re_head.appendChild(th_r);
	sub_table_re_head.appendChild(th_s);
	sub_table_re_head.appendChild(th_t);
	sub_table_re_head.appendChild(th_u);
	sub_table_re_head.appendChild(th_v);
	

	var sub_table_re_body = document.createElement("tbody");
	sub_table_re_body.setAttribute("id","sub_app_body"+committee_id);
	sub_table_re.appendChild(sub_table_re_body);
	div_body_s_r.appendChild(sub_table_re);
	//div_body_s_r.appendChild(document.createTextNode("Realized"));
	li_s_r.appendChild(div_head_s_r);
	li_s_r.appendChild(div_body_s_r);
	


	sub_list.appendChild(li_s_a);
	sub_list.appendChild(li_s_r);

	var container = document.createElement("div");
	container.setAttribute("class","row");
	var row = document.createElement("div");
	row.setAttribute("class","col s12 m12");
	row.appendChild(sub_list);
	container.appendChild(row);
	div_f.appendChild(container);
	
	li.appendChild(div_f);
	ul.appendChild(li);

	$('.nested').collapsible({accordion: true});


}
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
     		 	console.log(JSON.stringify(dat));
     		 	console.log("se va a llamar el metodo en el else osea que si er null");
     		 	
     		 	drawMultSeries(dat);

     		 },
     		 error: function(XMLHttpRequest, textStatus, errorThrown){
     		 	$("#teslabel").innerHTML="no lol";
     		 }
     		});
	

}

/**
 * this funciotn fills the overal planing (MC) graph
 * @return {[type]} [description]
 */
 function drawMultSeries(data = null) {


 	if (data.app_plan == null){
 		console.log("valor es "+data.app_plan)
 		pl_vs_ach();

 	}
 	console.log("vaor es "+data.app_plan);

 	var app_plan = parseInt(data.app_plan)||100;
 	var app_ach = parseInt(data.app_ach);
 	var re_plan = parseInt(data.re_plan);
 	var re_ach = parseInt(data.re_ach);
	//@todo: set dinamyc goals or put it  in preferences or configs
	var data = google.visualization.arrayToDataTable([
		['Stage', 'Achieved',{role: 'tooltip' },{ role: 'style' }, 'Planned', {role: 'tooltip' } , { role: 'style' } ],		
		['Approved', app_ach,'achieved'+app_ach,'color: #0A8EA0',  6700-app_ach,   'GOAL 6700', 'color: #e5e4e2'],
		['Realized', re_ach, 'achieved'+re_ach,'color: #0A8EA0',5050-re_ach,  'GOAL 5050', 'color: #e5e4e2']
		]);
	var options_fullStacked = {
		isStacked: true,
		title: 'Term Goal',
		height: 120,
		legend: {position: 'top', maxLines: 3},
		hAxis: {
			minValue: 0,
			ticks: [500,1000,2000,3000,4000,5000,6000,7000]
		}
	};

	var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
	chart.draw(data, options_fullStacked);

}


/*
function display_mc_pva(mc_pva){
		$('select').material_select();
		$('.datepicker-in').pickadate({
			formatSubmit: 'yyyy-mm-dd',
				selectMonths: true, // Creates a dropdown to control month
				selectYears: 15, // Creates a dropdown of 15 years to control year
				max: true
			});
		$('.datepicker-out').pickadate({
			formatSubmit: 'yyyy/mm/dd',
				selectMonths: true, // Creates a dropdown to control month
				selectYears: 15, // Creates a dropdown of 15 years to control year
				max: true
			});

		google.charts.load('current', {packages: ['corechart', 'bar']});
		google.charts.setOnLoadCallback(drawMultSeries);

		function drawMultSeries() {



			var data = google.visualization.arrayToDataTable([
				['Stage', 'Achieved',{role: 'tooltip' }, 'Planned', {role: 'tooltip' } ,{role: 'anotation' } ],
				['Approved', 500,'achieved 500', 6700-500,   'GOAL '+6700, ''],
				['Realized', 700, 'achieved 700',5050-700,  'GOAL '+5050, '']
				]);

			var options_fullStacked = {
				isStacked: true,
				height: 120,
				legend: {position: 'top', maxLines: 3},
				hAxis: {
					minValue: 0,
					ticks: [500,1000,2000,3000,4000,5000,6000,7000]
				}
			};

			var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
			chart.draw(data, options_fullStacked);
		}

	        $('#status').fadeOut(); // will first fade out the loading animation
			$('#preloader').delay(300).fadeOut('slow'); // will fade out the white DIV that covers the website.
			$('body').delay(300).css({'overflow':'visible'});
		});


}
*/

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
 function show_cr_entity(y,m,pr,mc_id = 1589){
	// @todo: check if the coockie or sys var is set and iuse it, else make the post call

	var year = y;
	var month = m;

	if (data_cr != null && year_global == year && month_global == month){
		display_cr_entity(data_cr,pr);

	}else{
		year_global = year;
		month_global = month;
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
      		data_cr = dat;
      		display_cr_entity(dat,pr);
      	},
      	error: function(XMLHttpRequest, textStatus, errorThrown){
      	}
      });
	}
}

function display_cr_entity(data,pr){
	console.log(JSON.stringify(data));
	//UNCOMMENT FOR DEV
	$("#tbodyid").empty();
	
	for(var i in data){
		var app = 0;
		var re = 0;
		var op = 0;
		var apl = 0;


		var tres = document.getElementById("rates").tBodies.item(0);
		var newrow = tres.insertRow(-1);
		var col;
		console.log(data[i]["oGC"]);
		if (pr == 0){
			for (var j in data[i]){
				app += parseInt(data[i][j].app_ach)||0;
				re += parseInt(data[i][j].re_ach)||0;
				op += parseInt(data[i][j].op_ach)||0;
				apl += parseInt(data[i][j].apl_ach)||0;
			}
		}else{
			var pro = "";
			switch(parseInt(pr)){
				case 1:
				app = parseInt(data[i].oGC.app_ach)||0;
				re = parseInt(data[i].oGC.re_ach)||0;
				op = parseInt(data[i].oGC.op_ach)||0;
				apl = parseInt(data[i].oGC.apl_ach)||0;
				break;
				case 2:
				app = parseInt(data[i].oGT.app_ach)||0;
				re = parseInt(data[i].oGT.re_ach)||0;
				op = parseInt(data[i].oGT.op_ach)||0;
				apl = parseInt(data[i].oGT.apl_ach)||0;
				break;
				case 3:
				app = parseInt(data[i].iGC.app_ach)||0;
				re = parseInt(data[i].iGC.re_ach)||0;
				op = parseInt(data[i].iGC.op_ach)||0;
				apl = parseInt(data[i].iGC.apl_ach)||0;
				break;
				case 4:
				app = parseInt(data[i].iGT.app_ach)||0;
				re = parseInt(data[i].iGT.re_ach)||0;
				op = parseInt(data[i].iGT.op_ach)||0;
				apl = parseInt(data[i].iGT.apl_ach)||0;
				break;
			}

		}

		col = newrow.insertCell(-1);
		col.innerHTML=i;
		col = newrow.insertCell(-1);
		col.innerHTML=op||0;
		col = newrow.insertCell(-1);
		col.innerHTML=(op == 0)? "-":(((apl/op)*100).toFixed(2)||0)+"% <small class=\"orange-text\"> "+(((apl/op)*100).toFixed(2)||0)+"%</small>";
		col = newrow.insertCell(-1);
		col.innerHTML=apl||0;
		col = newrow.insertCell(-1);
		col.innerHTML=(apl == 0)? "-":(((app/apl)*100).toFixed(2)||0)+"% <small class=\"orange-text\"> "+((op == 0)? "-":(((apl/op)*100).toFixed(2)||0))+"%</small>";
		col = newrow.insertCell(-1);
		col.innerHTML=app||0;
		col = newrow.insertCell(-1);
		col.innerHTML=(app == 0)? "-":(((re/app)*100).toFixed(2)||0)+"% <small class=\"orange-text\"> "+((op == 0)? "-":(((app/op)*100).toFixed(2)||0))+"%</small>";
		col = newrow.insertCell(-1);
		col.innerHTML=re||0;
		col = newrow.insertCell(-1);
		col.innerHTML="?";
		col = newrow.insertCell(-1);
		col.innerHTML="?";

	}
	



	

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
function show_plan_vs_ach_lc(y_i,m_i,y_f,m_f, mc_id = 1589){

	var data = {
		"op": 3,
		"mc_id": mc_id,
		"year_start": y_i,
		"month_start": m_i,
		"year_end": y_f,
		"month_end": m_f
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
      		//$("#p_v_a_lc").innerHTML="no lol";
      	}
      });
}


function display_p_v_a_entity(data){

	console.log(JSON.stringify(data));
	$("#tbodyid").empty();

	for(var i in data){
		var tres = document.getElementById("projections").tBodies.item(0);
		var newrow = tres.insertRow(-1);
		var col;
		col = newrow.insertCell(-1);
		col.innerHTML=i;
		col = newrow.insertCell(-1);
		col.innerHTML=data[i].op_ach||0;
		col = newrow.insertCell(-1);
		col.innerHTML=data[i].apl_ach||0;
		col = newrow.insertCell(-1);
		col.innerHTML=data[i].app_plan||0;
		col = newrow.insertCell(-1);
		col.innerHTML=data[i].app_ach||0;
		col = newrow.insertCell(-1);
		col.innerHTML=(data[i].app_plan==0)? "-":(data[i].app_ach/data[i].app_plan)||0;
		col = newrow.insertCell(-1);
		col.innerHTML=data[i].re_plan||0;
		col = newrow.insertCell(-1);
		col.innerHTML=data[i].re_ach||0;
		col = newrow.insertCell(-1);
		col.innerHTML=(data[i].re_plan)?"-":(data[i].re_ach/data[i].re_plan)||0;
		col = newrow.insertCell(-1);
		col.innerHTML="?";
		col = newrow.insertCell(-1);
		col.innerHTML="?";
		col = newrow.insertCell(-1);
		col.innerHTML="?";
		
	}

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
function show_plan_proj(pr,month, mc_id = 1589){

	var year = new Date().getFullYear();
	var m = month;
	if (m == -1) m = new Date().getMonth();


	var data = {
		"op": 4,
		"mc_id": mc_id,
		"pr":pr,
		"year": year,
		"month": m
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
      		//$("#proj").innerHTML="no lol";
      	}
      });

}


function display_plan_proj(data){


	//UNCOMENT FOR TEST
		//document.getElementById("proj").innerHTML = JSON.stringify(data);

	//	console.log(JSON.stringify(data));
	//UNCOMMENT FOR DEV
	$("#tbodyid").empty();

	for(var i in data){
		var tres = document.getElementById("projections").tBodies.item(0);
		var newrow = tres.insertRow(-1);
		var col;
		col = newrow.insertCell(-1);
		col.innerHTML=i;
		col = newrow.insertCell(-1);
		col.innerHTML=data[i].app_plan||0;
		col = newrow.insertCell(-1);
		col.innerHTML=data[i].re_plan||0;
		col = newrow.insertCell(-1);
		col.innerHTML="?";
		col = newrow.insertCell(-1);
		col.innerHTML="";
		col = newrow.insertCell(-1);
		col.innerHTML=data[i].op_plan||0;
		col = newrow.insertCell(-1);
		col.innerHTML=data[i].apl_plan||0;
	}
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
      		display_growth(dat,year);
      	},
      	error: function(XMLHttpRequest, textStatus, errorThrown){
      		$("#growth").innerHTML="no lol";
      	}
      });
}

function display_growth(data,year){
	//document.getElementById("growth").innerHTML = JSON.stringify(data);
	console.log(JSON.stringify(data));
	var l = document.getElementById("list");
	while (l.firstChild) {
		l.removeChild(l.firstChild);
	}
	for (var i in data){
		generate_detailed_table_gr(i,year);
	}
	google.charts.load('current', {packages: ['corechart', 'bar']});
	google.charts.setOnLoadCallback(function() { populate_tables_gr(data,year); });

}

function populate_tables_gr(data,year){
	var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

	for(var v in data){
		$("#sub_app_body"+v).empty();
		$("#sub_re_body"+v).empty();
		//this is to fill the chart in the headersin the general comparision with this and the past year
		var re_act_ogv = 0;
		var re_act_igv = 0;
		var re_act_ogt = 0;
		var re_act_igt = 0;
		var re_past_ogv = 0;
		var re_past_igv = 0;
		var re_past_ogt = 0;
		var re_past_igt = 0;
		var ap_act_ogv = 0;
		var ap_act_igv = 0;
		var ap_act_ogt = 0;
		var ap_act_igt = 0;
		var ap_past_ogv = 0;
		var ap_past_igv = 0;
		var ap_past_ogt = 0;
		var ap_past_igt = 0;
		for (var i in data[v][year.toString()]){

			console.log(months[i]);
			re_act_igv+=parseInt(data[v][year.toString()][i]["iGC"]["re"]);
			re_act_igt+=parseInt(data[v][year.toString()][i]["iGT"]["re"]);
			re_act_ogv+=parseInt(data[v][year.toString()][i]["oGC"]["re"]);
			re_act_ogt+=parseInt(data[v][year.toString()][i]["oGT"]["re"]);
			re_past_igv+=parseInt(data[v][(year-1).toString()][i]["iGC"]["re"]);
			re_past_igt+=parseInt(data[v][(year-1).toString()][i]["iGT"]["re"]);
			re_past_ogv+=parseInt(data[v][(year-1).toString()][i]["oGC"]["re"]);
			re_past_ogt+=parseInt(data[v][(year-1).toString()][i]["oGT"]["re"]);

			ap_act_igv+=parseInt(data[v][year.toString()][i]["iGC"]["app"]);
			ap_act_igt+=parseInt(data[v][year.toString()][i]["iGT"]["app"]);
			ap_act_ogv+=parseInt(data[v][year.toString()][i]["oGC"]["app"]);
			ap_act_ogt+=parseInt(data[v][year.toString()][i]["oGT"]["app"]);
			ap_past_igv+=parseInt(data[v][(year-1).toString()][i]["iGC"]["app"]);
			ap_past_igt+=parseInt(data[v][(year-1).toString()][i]["iGT"]["app"]);
			ap_past_ogv+=parseInt(data[v][(year-1).toString()][i]["oGC"]["app"]);
			ap_past_ogt+=parseInt(data[v][(year-1).toString()][i]["oGT"]["app"]);


			//filling tables


			var tres = document.getElementById("sub_table_app"+v).tBodies.item(0);
			var newrow = tres.insertRow(-1);
			var col;
			col = newrow.insertCell(-1);
			col.innerHTML=months[i];
			col = newrow.insertCell(-1);
			col.innerHTML=ap_past_igt;
			col = newrow.insertCell(-1);
			col.innerHTML=ap_act_igt;
			col = newrow.insertCell(-1);
			col.innerHTML=ap_past_ogt;
			col = newrow.insertCell(-1);
			col.innerHTML=ap_act_ogt;
			col = newrow.insertCell(-1);
			col.innerHTML=ap_past_igv;
			col = newrow.insertCell(-1);
			col.innerHTML=ap_act_igv;
			col = newrow.insertCell(-1);
			col.innerHTML=ap_past_ogv;
			col = newrow.insertCell(-1);
			col.innerHTML=ap_act_ogv;
			col = newrow.insertCell(-1);
			//var re_past = re_past_ogt+re_past_ogv+re_past_igt+re_past_igv;
			//var re_act = re_act_ogt+re_act_ogv+re_act_igt+re_act_igv;
			var aux1 =(ap_past_ogt+ap_past_ogv+ap_past_igt+ap_past_igv)-(ap_act_ogt+ap_act_ogv+ap_act_igt+ap_act_igv);
			col.innerHTML=aux1;
			col = newrow.insertCell(-1);
			col.innerHTML=((aux1/(ap_past_ogt+ap_past_ogv+ap_past_igt+ap_past_igv))*100).toFixed(2);


			var tres = document.getElementById("sub_table_re"+v).tBodies.item(0);
			var newrow = tres.insertRow(-1);
			var col;
			col = newrow.insertCell(-1);
			col.innerHTML=months[i];
			col = newrow.insertCell(-1);
			col.innerHTML=re_past_igt;
			col = newrow.insertCell(-1);
			col.innerHTML=re_act_igt;
			col = newrow.insertCell(-1);
			col.innerHTML=re_past_ogt;
			col = newrow.insertCell(-1);
			col.innerHTML=re_act_ogt;
			col = newrow.insertCell(-1);
			col.innerHTML=re_past_igv;
			col = newrow.insertCell(-1);
			col.innerHTML=re_act_igv;
			col = newrow.insertCell(-1);
			col.innerHTML=re_past_ogv;
			col = newrow.insertCell(-1);
			col.innerHTML=re_act_ogv;
			col = newrow.insertCell(-1);
			//var re_past = re_past_ogt+re_past_ogv+re_past_igt+re_past_igv;
			//var re_act = re_act_ogt+re_act_ogv+re_act_igt+re_act_igv;
			var aux2 = (re_past_ogt+re_past_ogv+re_past_igt+re_past_igv)-(re_act_ogt+re_act_ogv+re_act_igt+re_act_igv);
			col.innerHTML=aux2;
			col = newrow.insertCell(-1);
			col.innerHTML=((aux2/(re_past_ogt+re_past_ogv+re_past_igt+re_past_igv))*100).toFixed(2);


		}


		//draw chart
		//		//chart pe program 
		
		var datax = new google.visualization.DataTable();
		datax.addColumn('string', 'programas');
		datax.addColumn('number', 're '+year);
		datax.addColumn({type: 'string', role: 'style' });
		datax.addColumn({type: 'string', role: 'annotation'});
		datax.addColumn('number', 're '+(year-1));
		datax.addColumn({type: 'string', role: 'style' });
		datax.addColumn({type: 'string', role: 'annotation'});

		datax.addRows([
			[ 'oGET', re_act_ogt ,'color: #30C39E',re_act_ogt.toString(),  re_past_ogt,'color: #CACCD1', re_past_ogt.toString()],
			[ 'iGET',   re_act_igt, 'color: #F48924',re_act_igt.toString(),   re_past_igt,'color: #CACCD1', re_past_igt.toString()],
			['oGV',  re_act_ogv, 'color: #F85A40',re_act_ogv.toString(),    re_past_ogv,'color: #CACCD1', re_past_ogv.toString()],
			['iGV', re_act_igv, 'color: #FFC845',re_act_igv.toString(), re_past_igv,'color: #CACCD1', re_past_igv.toString()],

			]);

		var optionsx = {
			title: 'Exchanges',
			width: '600',
			annotations: {
				alwaysOutside: true,
				textStyle: {
					fontSize: 14,
					color: '#000',
					auraColor: 'none'
				}
			},
			hAxis: {
				title: 'programas',

			},
			vAxis: {
				title: 'Vidas cambiadas'
			}
		};

		var chart = new google.visualization.ColumnChart(document.getElementById('chart_programs'+v));
		chart.draw(datax, optionsx);

		
		////draw chart
		


		var re_past = re_past_ogt+re_past_ogv+re_past_igt+re_past_igv;
		var re_act = re_act_ogt+re_act_ogv+re_act_igt+re_act_igv;
		//here we check if they have surpassed the goal
		var data1 = (re_past>re_act) ?
		new google.visualization.arrayToDataTable([
			['Stage', 'Achieved',{role: 'tooltip' }, { role: 'style' }, { role: 'annotation' }, 'Planned', {role: 'tooltip' }  , { role: 'style' }, { role: 'annotation' }],
			[v, re_act, year+' ','#F85A40',year+' re: '+re_act,re_past-re_act,  (year-1)+'', 'color: #e5e4e2',(year-1)+' re: '+re_past]
			])
		:
		new google.visualization.arrayToDataTable([
			['Stage', 'Achieved',{role: 'tooltip' }, { role: 'style' }, { role: 'annotation' }, 'Planned', {role: 'tooltip' }  , { role: 'style' }, { role: 'annotation' }],
			[v, re_past, (year-1)+' ','#e5e4e2',(year-1)+' re: '+re_past,re_act-re_past,  year+'', 'color: #30C39E',year+' re: '+re_act]
			])
		;			
		var options_fullStacked = {
			title: v,
			isStacked: true,
			height: 50,
			legend: {position: 'top', maxLines: 3},
			hAxis: {
				minValue: 0,
				ticks: [50, 100,150,200]
			}
		};

		var chart = new google.visualization.BarChart(document.getElementById('chart_'+v));
		chart.draw(data1, options_fullStacked);

	}
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
function show_plan_vs_ach_lc_d(year_start,month_start,year_end,month_end, mc_id = 1589){


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
	console.log(JSON.stringify(data));
	var l = document.getElementById("list");
	while (l.firstChild) {
		l.removeChild(l.firstChild);
	}
	for (var i in data){
		generate_detailes_table(i);
	}
	google.charts.load('current', {packages: ['corechart', 'bar']});
	google.charts.setOnLoadCallback(function() { populate_tables(data); });
}

function populate_tables(data){

	for(var v in data){
		//filling charts
		var re_ogt= parseInt(data[v]["oGT"]["re_ach"])||0;
		var re_ogv = parseInt(data[v]["oGC"]["re_ach"])||0;
		var re_igv= parseInt(data[v]["iGC"]["re_ach"])||0;
		var re_igt= parseInt(data[v]["iGT"]["re_ach"])||0;
		var re = re_ogv +re_ogt +re_igv +re_igt;
		var data1 = new google.visualization.arrayToDataTable([
			['Stage', 'Achieved',{role: 'tooltip' }, { role: 'style' }, { role: 'annotation' }, 'Planned', {role: 'tooltip' }  , { role: 'style' }, { role: 'annotation' }],
			[v, re, 'plan','#037Ef3',re,200-re,  'achieved', 'color: #e5e4e2',200]
			]);		
		var options_fullStacked = {
			title: v,

			isStacked: true,
			height: 50,
			legend: {position: 'top', maxLines: 3},
			hAxis: {
				minValue: 0,
				ticks: [50, 100,150,200]
			}
		};

		var chart = new google.visualization.BarChart(document.getElementById('chart_'+v));
		chart.draw(data1, options_fullStacked);


		//chart pe program 
		
		var datax = new google.visualization.DataTable();
		datax.addColumn('string', 'programas');
		datax.addColumn('number', 'Achieved');
		datax.addColumn({type: 'string', role: 'style' });
		datax.addColumn({type: 'string', role: 'annotation'});
		datax.addColumn('number', 'Goal');
		datax.addColumn({type: 'string', role: 'style' });
		datax.addColumn({type: 'string', role: 'annotation'});

		datax.addRows([
			[ 'oGET', re_ogt ,'color: #30C39E',re_ogt.toString(),  parseInt(data[v]["oGT"]["re_plan"]||0),'color: #CACCD1', data[v]["oGT"]["re_plan"]||"0"],
			[ 'iGET',   re_igt, 'color: #F48924',re_igt.toString(),   parseInt(data[v]["iGT"]["re_plan"]||0),'color: #CACCD1', data[v]["iGT"]["re_plan"]||"0"],
			['oGV',  re_ogv, 'color: #F85A40',re_ogv.toString(),    parseInt(data[v]["oGC"]["re_plan"]||0),'color: #CACCD1', data[v]["oGC"]["re_plan"]||"0"],
			['iGV', re_igv, 'color: #FFC845',re_igv.toString(), parseInt(data[v]["iGC"]["re_plan"]||0),'color: #CACCD1', data[v]["iGC"]["re_plan"]||"0"],

			]);

		var optionsx = {
			title: 'Exchanges',
			width: '600',
			annotations: {
				alwaysOutside: true,
				textStyle: {
					fontSize: 14,
					color: '#000',
					auraColor: 'none'
				}
			},
			hAxis: {
				title: 'programas',

			},
			vAxis: {
				title: 'Vidas cambiadas'
			}
		};

		var chart = new google.visualization.ColumnChart(document.getElementById('chart_programs'+v));
		chart.draw(datax, optionsx);




		//filling tables
		$("#tbody_"+v).empty();
		for (var pr in data[v]){



			var tres = document.getElementById("table_"+v).tBodies.item(0);
			var newrow = tres.insertRow(-1);
			var col;
			col = newrow.insertCell(-1);
			col.innerHTML=pr;
			col = newrow.insertCell(-1);
			col.innerHTML=data[v][pr].op_ach||0;
			col = newrow.insertCell(-1);
			col.innerHTML=data[v][pr].apl_ach||0;
			col = newrow.insertCell(-1);
			col.innerHTML=data[v][pr].app_plan||0;
			col = newrow.insertCell(-1);
			col.innerHTML=data[v][pr].app_ach||0;
			col = newrow.insertCell(-1);
			col.innerHTML=(data[v][pr].app_plan == 0)? "-":(((data[v][pr].app_ach/data[v][pr].app_plan)*100).toFixed(2)||0);
			col = newrow.insertCell(-1);
			col.innerHTML=data[v][pr].re_plan||0;
			col = newrow.insertCell(-1);
			col.innerHTML=data[v][pr].re_ach||0;
			col = newrow.insertCell(-1);
			col.innerHTML=(data[v][pr].re_plan == 0)? "-":(((data[v][pr].re_ach/data[v][pr].re_plan)*100).toFixed(2)||0);
			col = newrow.insertCell(-1);
			col.innerHTML="?";
			col = newrow.insertCell(-1);
			col.innerHTML="?";
			col = newrow.insertCell(-1);
			col.innerHTML="?";

		}
	}



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
