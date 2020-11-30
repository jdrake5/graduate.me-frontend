window.addEventListener('load', (event) => {
  var username = sessionStorage.getItem("username");
  console.log(username);
  document.getElementById("welcome").innerHTML = "Welcome " + username
});

function executeSearch() {
  let query = document.getElementById("searchbar").value;
  if (query.length > 0) {
    var sanitized_query = query.replace(/\W/g, '');
    if (sanitized_query.length > 0) {
      sessionStorage.setItem("query", sanitized_query);
      var url = "search.html";
      window.location.href = url;
    }
  }

}
