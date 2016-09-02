

/*
======================================================================
      Main function. To be loaded when on document 'ready' event      
======================================================================
*/

$(function(){


	//Attach an event handler when Submit button gets a new request
	$("#submitbtn").click(function (){
		saveGoal();
	});

	//TO-DO: Either respond to "GET" analytics requests, or attach event to "Enter" keystroke
});

/*
======================================================================
                         Auxiliary functions                          
======================================================================
*/



/**
*takes the values i the form and saves it in the scorboard database with the post request
*/
function saveGoal(){


	var data = {
		"ap_ogt": $("#ap_ogt").val()
	};
	data = $(this).serialize() + "&" + $.param(data);
	$.ajax({
		type: "POST",
		dataType: "json",
      url: "upload_plan.php", //Relative or absolute path to response.php file
      data: data,
      success: function(data) {
      		$("#h").innerHTML="lol";
      },
      error: function(XMLHttpRequest, textStatus, errorThrown){
      		$("#h").innerHTML="no lol";
      }
  });

}


