let row = 1;
let counter = 5;

window.addEventListener("load", (event) => {
  document.getElementById("search").style.display = "none";
});
// to show main table
function save() {
  let res = document.getElementById("result");

  let arrno = document.getElementsByClassName("idno");
  let arrname = document.getElementsByClassName("fname");
  let arrsub = document.getElementsByClassName("subname");
  let arrmrks = document.getElementsByClassName("mrks");
  let table = document.createElement("table");
  let row = document.createElement("tr");

  for (let i = 0; i < arrno.length; i++) {
    if (
      arrname[i].value.trim() == "" ||
      arrsub[i].value.trim() == "" ||
      arrmrks[i].value == ""
    ) {
      Swal.fire("Input can not be empty!");
      return;
    }
  }

  res.innerHTML = `<thead>
  <th>Id</th>  
  <th onclick="sort(1)" data-toggle="tooltip" title="Click to sort!">Name</th> 
  <th onclick="sort(2)" data-toggle="tooltip"  title="Click to sort!">Subject</th>
  <th>Marks</th>
  </thead>`;
  for (let i = 0; i < arrname.length; i++) {
    if (arrname[i].parentNode.parentNode.classList.contains("activeparent")) {
      let newRow = res.insertRow(-1);
      let c1 = newRow.insertCell(0);
      c1.innerHTML = i + 1;
      c1.setAttribute("class", "id");
      c1 = newRow.insertCell(1);
      c1.setAttribute("class", "resname");
      c1.innerHTML = arrname[i].value;
      c1 = newRow.insertCell(2);
      c1.setAttribute("class", "ressub");
      c1.innerHTML = arrsub[i].value;
      c1 = newRow.insertCell(3);
      c1.setAttribute("class", "resmarks");
      c1.innerHTML = arrmrks[i].value;
      if (parseInt(arrmrks[i].value) < 33) {
        c1.setAttribute("class", "fail");
      }
    }

    row++;
    document.getElementById("search").style.display = "";
  }

  perc();
}

// to change the color onclik of pass btn
function onclickpass(btn) {
  btn.classList.add("activepass");
  btn.nextElementSibling.classList.remove("activefail");
  btn.parentNode.parentNode.classList.add("activeparent");
}
// to change the color onclik of fail btn
function onclickfail(btn) {
  btn.classList.add("activefail");
  btn.previousElementSibling.classList.remove("activepass");
  btn.parentNode.parentNode.classList.remove("activeparent");
}

// to add a new row
function add() {
  let x = document.getElementById("myTable").insertRow(-1);

  let no = x.insertCell(0);
  let rowno = x.rowIndex;
  rowno--;
  no.setAttribute("class", "idno");
  no.setAttribute("data-title", "Id");
  no.innerHTML = `<td class="idno" id="idno"> </td>`;
  no = x.insertCell(1);
  no.setAttribute("data-title", "Name");
  no.innerHTML = ` <td ><input type="text" name="fname" class="fname" autocomplete="off"
  onchange="letteronly(this)" /></td>`;
  no = x.insertCell(2);
  no.setAttribute("data-title", "Subject");
  no.innerHTML = `<td><input type="text" name="subname" class="subname"
  autocomplete="off" onchange="letteronly(this)" /></td>`;
  no = x.insertCell(3);
  no.setAttribute("data-title", "Marks");
  no.innerHTML = ` <td><input type="number" name="marks" class="mrks" max="100"
  autocomplete="off" onchange="numberonly(this)"
  onkeydown="return event.keyCode !== 69" id="mrks" /></td>`;
  no = x.insertCell(4);
  no.setAttribute("class", "d-flex flex-wrap justify-content-center");
  no.setAttribute("data-title", "Action");
  no.innerHTML = `<td>
  <button class="btnpass bn1" type="button" onclick="onclickpass(this)"> pass </button>
  <button class="btnfail bn1" type="button" onclick="onclickfail(this)">fail</button>
 
</td>`;
  no = x.insertCell(5);
  no.innerHTML = ` <button class="remove" type="button" onclick="remove(this)">remove</button>`;
  counter++;
}
// to remove a row on button click
function remove(rmv) {
  Swal.fire({
    title: "Are you sure to remove?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, remove it!",
  }).then((result) => {
    if (result.isConfirmed) {
      counter--;
      let row = rmv.parentNode.parentNode;
      row.parentNode.removeChild(row);
    }
  });
}

// search function
function search() {
  let filter = document.getElementById("myInput").value.toUpperCase();
  let table = document.getElementById("result");
  let tr = result.getElementsByTagName("tr");
  for (let i = 1; i < tr.length; i++) {
    let tdname = tr[i].getElementsByTagName("td")[0];
    let tdsub = tr[i].getElementsByTagName("td")[1];
    if (tdname || tdsub) {
      let valuename = tdname.textContent || tdname.innerHTML;
      let valuesub = tdsub.textContent || tdsub.innerHTML;
      if (
        valuename.toUpperCase().indexOf(filter) > -1 ||
        valuesub.toUpperCase().indexOf(filter) > -1
      ) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

// allow only 0 to 100
document.querySelector(".mrks").addEventListener("keypress", function (evt) {
  if ((evt.which != 8 && evt.which != 0 && evt.which < 48) || evt.which > 57) {
    evt.preventDefault();
  }
});
function numberonly(n) {
  let val = parseInt(n.value);
  if (val < 0 || val > 100) {
    swal("Oops", "Enter Value Between 0 To 100 Only", "error");
    n.value = "";
  }
}
// allow only letters
function letteronly(x) {
  let letters = /^[A-Za-z ]+$/;
  let nval = x.value;
  if (!nval.match(letters)) {
    swal("Oops", "Please Enter Letters Only", "error");
    x.value = "";
  }
}

// sorting by name and subject
function sort(n) {
  let table,
    rows,
    swch,
    i,
    x,
    y,
    exchange,
    direction,
    count = 0;
  table = document.getElementById("result");
  swch = true;
  direction = "asc";
  while (swch) {
    swch = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      exchange = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (direction == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          exchange = true;
          break;
        }
      } else if (direction == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          exchange = true;
          break;
        }
      }
    }
    if (exchange) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      swch = true;
      count++;
    } else {
      if (count == 0 && direction == "asc") {
        direction = "desc";
        swch = true;
      }
    }
  }
}

// to count percentage

function perc() {
  let uniqname = [],
    uniqperc = [];
  var totalsub = 0;
  let table = document.getElementById("myTable");
  let arrname = document.getElementsByClassName("fname");
  let marks = document.getElementsByClassName("mrks");

  for (let i = 0; i < arrname.length; i++) {
    var flag = 0,
      mark = 0;
    for (let j = 0; j < uniqname.length; j++) {
      if (arrname[i].value == uniqname[j]) {
        flag = 1;
        break;
      }
    }
    if (flag) {
      continue;
    }
    totalsub++;
    totalsub = 1;
    uniqname.push(arrname[i].value);
    mark = parseFloat(marks[i].value);
    for (let j = i + 1; j < arrname.length; j++) {
      if (arrname[i].value == arrname[j].value) {
        mark += parseInt(marks[j].value);
        totalsub++;
      }
    }
    uniqperc.push((mark / (totalsub * 100)) * 100).toFixed(2);
    
  }
  // to print percentage table
  let pertable = document.getElementById("perc");
  pertable.innerHTML = `<thead><th>Id</th>
  <th>Name</th>
  <th>Percentage</th>
  </thead>`;

  for (let x = 0; x < uniqname.length; x++) {
    let newRow = pertable.insertRow(-1);

    if (arrname[x].parentNode.parentNode.classList.contains("activeparent")) {
      let c1 = newRow.insertCell(0);
      c1.innerHTML = x + 1;
      c1 = newRow.insertCell(1);
      c1.innerHTML = uniqname[x];
      c1 = newRow.insertCell(2);
      c1.innerHTML = uniqperc[x] + `%`;

      if (uniqperc[x] < 33) {
        c1.setAttribute("class", "fail");
      }
      row++;
    }
  }
}
