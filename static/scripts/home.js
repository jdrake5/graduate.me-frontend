window.addEventListener('load', (event) => {
  var username = sessionStorage.getItem("username");
  console.log(username);
  document.getElementById("welcome").innerHTML = "Welcome " + username
});
