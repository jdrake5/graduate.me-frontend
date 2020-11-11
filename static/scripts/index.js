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
