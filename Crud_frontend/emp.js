let loginForm = document.getElementById("loginForm");

var EmpList;
startList();
let globalObject = {};
loginForm.addEventListener("submit", (e) => {
    //e.preventDefault();

    let empName = document.getElementById("name").value;
    let empGender = document.getElementsByName("gender");
    let empDob = document.getElementById("dob").value;
    let empEmail = document.getElementById("email").value;
    let empPhone = document.getElementById("phone").value;
    let empHobbies = document.getElementsByName("hobbie");
    let empGenderValue = "";

    for (i = 0; i < empGender.length; i++) {
        if (empGender[i].checked)
            empGenderValue = empGender[i].value;
    }

    let empHobbiesValue = [];

    for (i = 0; i < empHobbies.length; i++) {
        if (empHobbies[i].checked)
            empHobbiesValue.push(empHobbies[i].value);
    }

    globalObject = {
        name: empName,
        gender: empGenderValue,
        dob: empDob,
        email: empEmail,
        phone: empPhone,
        hobbies: empHobbiesValue,
    }

    EmpList.push(globalObject);
    syncEmp();
    appendEmployee();
});

function appendEmployee() {
    var table = document.getElementById("empTable");
    table.innerHTML = '<tr> <th>Name</th> <th>Gender</th> <th>Dob</th>   <th>Email</th> <th>Phone</th>  <th>Hobbie</th> <th> Action</th ></tr > ';
    var tableadv = document.getElementById("empAdvanceTable");
    tableadv.innerHTML = '<tr id="nameRow"> <th>Name</th></tr><tr id = "genderRow"> <th>Gender</th></tr><tr id="dobRow"> <th>Dob</th></tr><tr id="emailRow">  <th>Email</th></tr><tr id="phoneRow">   <th>Phone</th></tr><tr id="hobbieRow">    <th>Hobbie</th></tr><tr id="ActionRow">    <th>action</th></tr>';
    for (let i = 0; i < EmpList.length; i++) {
        console.log(EmpList[i]);
        insertNewRecord(EmpList[i]);
        insertNewRecordToAdv(EmpList[i]);

    }
}
appendEmployee();



function syncEmp() {

    window.localStorage.setItem('empList', JSON.stringify(EmpList));
    EmpList = JSON.parse(window.localStorage.getItem('empList'));
}

function startList() {

    if (null != (window.localStorage.getItem('empList'))) {
        EmpList = JSON.parse(window.localStorage.getItem('empList'));
    } else {
        EmpList = [];
    }
}


function insertNewRecord(data) {
    console.log(data);
    var table = document.getElementById("empTable");

    console.log(empTable);
    var newRow = table.insertRow(1);

    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;

    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.gender;

    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.dob;

    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.email;

    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.phone;

    cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.hobbies;

    cell7 = newRow.insertCell(6);
    cell7.innerHTML = `<button onClick="onEdit(this)" class="editbttn">Edit</a>         
    <button onClick="onDelete(this)" class="deletebttn">Delete</a>`;

}

function insertNewRecordToAdv(data) {
    console.log(data);
    console.log(empTable);
    var nameRow = document.getElementById("nameRow");
    var genderRow = document.getElementById("genderRow");
    var dobRow = document.getElementById("dobRow");
    var emailRow = document.getElementById("emailRow");
    var phoneRow = document.getElementById("phoneRow");
    var hobbieRow = document.getElementById("hobbieRow");
    var actionRow = document.getElementById("ActionRow");

    cell1 = nameRow.insertCell(1);
    cell1.innerHTML = data.name;

    cell2 = genderRow.insertCell(1);
    cell2.innerHTML = data.gender;

    cell3 = dobRow.insertCell(1);
    cell3.innerHTML = data.dob;

    cell4 = emailRow.insertCell(1);
    cell4.innerHTML = data.email;

    cell5 = phoneRow.insertCell(1);
    cell5.innerHTML = data.phone;

    cell6 = hobbieRow.insertCell(1);
    cell6.innerHTML = data.hobbies;

    cell7 = actionRow.insertCell(1);
    cell7.innerHTML = `<button onClick="onEdit(this)" class="editbttn">Edit</a>         
    <button onClick="onDeleteAdv(this)" class="deletebttn">Delete</a>`;

}

function onDelete(td) {
    row = td.parentElement.parentElement;

    document.getElementById("empTable").deleteRow(row.rowIndex);
    EmpList.splice(row, 1);
    console.log(EmpList);
    syncEmp();
    appendEmployee();

}
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    //document.getElementsByName("gender") =selectedRow.cells[1].innerHTML;
    //console.log(selectedRow.cells[1].innerHTML);
    if (selectedRow.cells[1].innerHTML == "Female") {
        document.getElementById("female").checked = true;
    }
    else {
        document.getElementById("male").checked = true;
    }
    document.getElementById("dob").value = selectedRow.cells[2].innerHTML;
    document.getElementById("email").value = selectedRow.cells[3].innerHTML;
    document.getElementById("phone").value = selectedRow.cells[4].innerHTML;
    //document.getElementsByName("hobbie") =selectedRow.cells[5].innerHTML;
    let hobbiesEdit = selectedRow.cells[5].innerHTML;
    if (hobbiesEdit.includes("cricket")) {
        document.getElementById("cricket").checked = true;
        if (hobbiesEdit.includes("chess")) {
            document.getElementById("chess").checked = true;
        }
        else {
            document.getElementById("chess").checked = false;
        }
        if (hobbiesEdit.includes("Music")) {
            document.getElementById("music").checked = true;
        }
        else {
            document.getElementById("music").checked = false;
        }

    }
    if (hobbiesEdit.includes("chess")) {
        document.getElementById("chess").checked = true;
        if (hobbiesEdit.includes("cricket")) {
            document.getElementById("cricket").checked = true;
        }
        else {
            document.getElementById("cricket").checked = false;
        }
        if (hobbiesEdit.includes("Music")) {
            document.getElementById("music").checked = true;
        }
        else {
            document.getElementById("music").checked = false;
        }
    }
    if (hobbiesEdit.includes("Music")) {
        document.getElementById("music").checked = true;
        if (hobbiesEdit.includes("cricket")) {
            document.getElementById("cricket").checked = true;
        }
        else {
            document.getElementById("cricket").checked = false;
        }
        if (hobbiesEdit.includes("chess")) {
            document.getElementById("chess").checked = true;
        }
        else {
            document.getElementById("chess").checked = false;
        }
    }
       console.log(selectedRow.rowIndex);
       EmpList.splice(selectedRow.rowIndex-1, 1);

    syncEmp();
}
function onDeleteAdv(td) {
    selectedRow = td.parentElement.parentElement;
    var firstCells = document.querySelectorAll('td:nth-child(2)');
    var cellValues = [];
    firstCells.forEach(function (singleCell) {
        cellValues.push(singleCell.innerText);
    });
    console.log(cellValues);
    // row = td.parentElement.parentElement;
}
