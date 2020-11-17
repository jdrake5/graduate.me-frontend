var input = document.getElementById('input');

input.onchange = e => {

   // getting a hold of the file reference
   var file = e.target.files[0];

   // setting up the reader
   var reader = new FileReader();
   reader.readAsText(file,'UTF-8');

   // here we tell the reader what to do when it's done reading...
   reader.onload = readerEvent => {
      var content = readerEvent.target.result; // this is the content!
      //console.log( content );
      //console.log(csvJSON(content));
   }

}

input.click();

function csvJSON(csv){

  var lines=csv.split("\n");

  var result = [];

  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

	  var obj = {};
	  var currentline=lines[i].split(",");

	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }
    console.log(obj);
	  result.push(obj);
    let data = {
      year: obj.Year,
      term: obj.Term,
      subject: obj.Subject,
      number: obj.Number,
      name: obj.Name,
      description: obj.Description,
      credit_hours: obj.Credit_Hours,
      section_info: obj.Section_Info,
      degree_attributes: obj.Degree_Attributes,
      schedule_information: obj.Schedule_Information,
      crn: obj.CRN,
      section: obj.Section,
      part_of_term: obj.Part_Of_Term,
      start_time: obj.Start_Time,
      end_time: obj.End_Time,
      days_of_week: obj.Days_Of_Week,
      room: obj.Room,
      building: obj.Building,
      instructors: obj.Instructors
    }

    $.ajax({
    	url:"http://localhost:3000/courses",
    	type:"POST",
      data: data,
    	sucess: function(result){
    		console.log(result);
    	},
    	error: function(error){
    		console.log('Error ${error}');
    	}
    })
    break;
  }
}
