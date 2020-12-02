var url = "mongodb://localhost:27017/";
var currentResponse = null;
window.addEventListener('load', (event) => {
  var query = sessionStorage.getItem("query");
  if (query != undefined && query.length > 0) {
    var inputs = document.getElementById("userForm").elements;
    inputs["searchbar"].value = query
    executeHomeSearch(query);
  }
});

function executeSearch() {
  var inputs = document.getElementById("userForm").elements;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", "http://localhost:3000/search/" + inputs["searchbar"].value ); // false for synchronous request
  xmlHttp.send();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == XMLHttpRequest.DONE) {
      currentResponse = JSON.parse(xmlHttp.responseText);
      addRows(currentResponse);
    }
  }
}

function executeHomeSearch(query) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", "http://localhost:3000/search/" + query ); // false for synchronous request
  xmlHttp.send();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == XMLHttpRequest.DONE) {
      currentResponse = JSON.parse(xmlHttp.responseText);
      //add another search for user favorites to determine how search works
      addRows(currentResponse);
    }
  }
}

function addFavorite() {
  if (this.checked) {
    console.log("Checkbox is checked.." + this.id);
    let data = {
      Username: sessionStorage.getItem("username")/*currentResponse[this.id[-2:]].Username*/,
      Subject: "CS" /*currentResponse[this.id[-2:]].Subject*/,
      Number: "411" /*currentResponse[this.id[-2:]].Number*/,
      Sub_Num: "CS_411" /*currentResponse[this.id[-2:]].Sub_Num*/
    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:3000/add_favorite', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function() { // Call a function when the state changes.
      console.log("Added favorite");
    }
    xhr.send(JSON.stringify(data));
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
      var cell4 = row.insertCell();

      // Add some text to the new cells:
      cell1.innerHTML = res[table_row].Subject;
      cell2.innerHTML = res[table_row].Number;
      cell3.innerHTML = res[table_row].Name;
      var fav_box = document.createElement('input');

      fav_box.setAttribute('type', 'checkbox');
      fav_box.setAttribute('id', 'fav_box' + table_row);
      fav_box.addEventListener("click", addFavorite, false);

      cell4.appendChild(fav_box);
      existing.push(res[table_row].Subject + res[table_row].Number)
    }
  }
}
