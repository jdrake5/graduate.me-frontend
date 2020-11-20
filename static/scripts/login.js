var firstLoad = false;
window.addEventListener('load', (event) => {
  if (!firstLoad) {
    var form2 = document.getElementById("form2");
    form2.style.display = "none";
    firstLoad = !firstLoad;
  }

});

function validate_user() {
  //make get request to server, see if value exists
}

function add_newuser() {
  var form1 = document.getElementById("form1");
  var form2 = document.getElementById("form2");
  if (form1.style.display === "none") {
    form2.style.display = "none";
    form1.style.display = "block";
  } else {
    form1.style.display = "none";
    form2.style.display = "block";
  }
}

function submit_new_user() {
  let data = {
    username: document.getElementById("username_new").value,
    email: document.getElementById("email_new").value,
    password: document.getElementById("password_new").value
  };

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
  //hope and pray it actually loaded and the submission error is just cors
  //launch homepage
  var url = "home.html";
  window.location.href = url;
}
