var url = "mongodb://localhost:27017/";

function executeSearch() {
  var inputs = document.getElementById("userForm").elements;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", "http://localhost:3000/search/" + inputs["searchbar"].value ); // false for synchronous request
  xmlHttp.send();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == XMLHttpRequest.DONE) {
      var table = document.getElementById("results");
      for(var table_row in JSON.parse(xmlHttp.responseText)) {
          let res = JSON.parse(xmlHttp.responseText)
          var row = table.insertRow();
          row.style = "text-align:center";
          // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
          var cell1 = row.insertCell();
          var cell2 = row.insertCell();
          var cell3 = row.insertCell();

          // Add some text to the new cells:
          cell1.innerHTML = res[table_row].Subject;
          cell2.innerHTML = res[table_row].Number;
          cell3.innerHTML = res[table_row].Name;
      }
    }
  }
}
