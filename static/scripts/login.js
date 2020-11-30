var firstLoad = false;
window.addEventListener('load', (event) => {
  if (!firstLoad) {
    var form2 = document.getElementById("form2");
    form2.style.display = "none";
    firstLoad = !firstLoad;
  }

});

function validate_user() {
  var xmlHttp = new XMLHttpRequest();
  var query = document.getElementById("username").value.replace(/\W/g, '');
  xmlHttp.open( "GET", "http://localhost:3000/users/" + query); // false for synchronous request
  xmlHttp.send();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == XMLHttpRequest.DONE) {
      if (xmlHttp.responseText.length == 0) {
        alert("Username or Password is Incorrect");
      }
      else {
        var result = JSON.parse(xmlHttp.responseText);
        if (result.Password != document.getElementById("password").value) {
          alert("Username or Password is Incorrect");
        }
        else {
          console.log(result);
          sessionStorage.setItem("username", result.Username);
          var url = "home.html";
          window.location.href = url;
        }
      }
    }
  }
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
    username: (document.getElementById("username_new").value).replace(/\W/g, ''),
    email: (document.getElementById("email_new").value).replace(/\W/g, ''),
    password: (document.getElementById("password_new").value).replace(/\W/g, '')
  };

  var xhr = new XMLHttpRequest();
  xhr.open("POST", 'http://localhost:3000/users', true);

  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.onreadystatechange = function() { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        sessionStorage.setItem("username", document.getElementById("username_new").value);
        var url = "home.html";
        window.location.href = url;
      }
      else if (this.readyState === XMLHttpRequest.DONE) {
        //console.log(xhr.responseText);
        alert(JSON.parse(xhr.responseText).message);
      }
  }
  xhr.send(JSON.stringify(data));
}
