console.log("Validate JS");
function submitUserData() {
  var inputs = document.getElementById("userForm").elements;
  let data = {
    username: inputs["username"].value,
    email: inputs["email"].value,
    password: inputs["password"].value
  }

  console.log(inputs["password"].value);
  $.ajax({
  	url:"http://localhost:3000/users",
  	type:"POST",
    data: data,
  	sucess: function(result){
  		console.log(result);
  	},
  	error: function(error){
  		console.log('Error ${error}');
  	}
  })
}

function createDummyClass() {
  let data = {
    year: '2020',
    term: 'sp',
    subject: 'AAS',
    number: '100',
    name: 'Intro Asian American Studies',
    description: '',
    credit_hours: '3 hours',
    section_info: '',
    degree_attributes: '',
    schedule_information: '',
    crn: '00001',
    section: 'AB1',
    part_of_term: '1',
    start_time: 'ARRANGED',
    end_time: '',
    days_of_week: '',
    room: '',
    building: '',
    instructors: ''
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
}

function createDummyGPA() {
  let data = {
    crn: "000001",
    subject: "yeet",
    number: "110",
    title: "title",
    section: "BN1",
    average: 1.5,
  }

  $.ajax({
  	url:"http://localhost:3000/gpa",
  	type:"POST",
    data: data,
  	sucess: function(result){
  		console.log(result);
  	},
  	error: function(error){
  		console.log('Error ${error}');
  	}
  })
}
