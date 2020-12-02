window.addEventListener('load', (event) => {
  var username = sessionStorage.getItem("username");
  if (username != undefined && username.length > 0) {
    document.getElementById("welcome").innerHTML = "Welcome " + username
    renderFavorites(username);
  }
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

function renderFavorites(username) {
  //Check if this user has any favorited classes
  var xhr = new XMLHttpRequest();
  xhr.open( "GET", "http://localhost:3000/favorites/" + username); // false for synchronous request
  xhr.send();

  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      if (xhr.responseText.length == 0) {
        console.log("No favorite classes found for user.");
      }
      else {
        var result = JSON.parse(xhr.responseText);
        addRows(result);
      }
    }
  }
}

function removeFavorite() {
  var xhr = new XMLHttpRequest();
  xhr.open( "GET", "http://localhost:3000/remove_favorite/" + sessionStorage.getItem("username") + "/CS_411"); // false for synchronous request
  xhr.send();

  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      if (xhr.responseText.length == 0) {
        console.log("No favorite classes found for user.");
      }
      else {
        var table = document.getElementById("results");
        table.deleteRow(1);
      }
    }
  }
}

function addRows(response) {
  var table = document.getElementById("results");
  //table.innerHTML = "";
  var existing = [];
  for(var table_row in response) {
    let res = response
    if (existing.indexOf(res[table_row].Subject + res[table_row].Number) == -1) {
      var row = table.insertRow();
      row.style = "text-align:center";
      // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
      var cell1 = row.insertCell();
      var cell2 = row.insertCell();
      var cell3 = row.insertCell();

      // Add some text to the new cells:
      cell1.innerHTML = res[table_row].Subject;
      cell2.innerHTML = res[table_row].Number;
      var fav_box = document.createElement('input');

      fav_box.setAttribute('type', 'checkbox');
      fav_box.setAttribute('id', 'fav_box' + table_row);
      fav_box.addEventListener("click", removeFavorite, false);
      fav_box.checked = true;

      cell3.appendChild(fav_box);
      existing.push(res[table_row].Subject + res[table_row].Number)
    }
  }
}
