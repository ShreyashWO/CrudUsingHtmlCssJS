let loginForm = document.getElementById("loginForm");

var empListLocalStorage = JSON.parse(window.localStorage.getItem('empList'));
let globalObject = {};
var selectedRow = null;
var selectedRowAdv = null;
var rowindexadv = null;
var columnIndexadv = null;
function onFormSubmit() {
    
    console.log("before ",globalObject);
    if (selectedRow == null && selectedRowAdv == null) {
        globalObject = getGolbalObject();
        empListLocalStorage.push(globalObject);
        insertNewRecord(empListLocalStorage[empListLocalStorage.length - 1], empListLocalStorage.length - 1);
        syncEmp();
        setFormToDeafault();
    }
    else {
        updateBasicTable();
        updateAdvanceTable();
        globalObject = getGolbalObject();
        empListLocalStorage.push(globalObject);
        console.log(globalObject);
        empListLocalStorage.splice(selectedRow.rowIndex-1, 1);
        syncEmp();
        setFormToDeafault();
    }
}
function setFormToDeafault(){
    document.getElementById("name").value = "";
    document.getElementById("male").checked = true;
    document.getElementById("dob").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("cricket").checked = true;
    document.getElementById("chess").checked = false;
    document.getElementById("music").checked = false;
    selectedRow = null;
    selectedRowAdv = null;
    rowindexadv = null;
    columnIndexadv = null;
}

function getGolbalObject(){
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
        return globalObject;
}

function updateBasicTable(){
    selectedRow.cells[0].innerHTML = document.getElementById("name").value;

    if (document.getElementById("female").checked) {
        selectedRow.cells[1].innerHTML == "Female"
    }
    else {
        selectedRow.cells[1].innerHTML == "Male"
    }

    selectedRow.cells[2].innerHTML = document.getElementById("dob").value
    selectedRow.cells[3].innerHTML = document.getElementById("email").value;
    selectedRow.cells[4].innerHTML = document.getElementById("phone").value;
    document.getElementById("phone").value = selectedRow.cells[4].innerHTML;

    selectedRow.cells[5].innerHTML = " ";

    if (document.getElementById("cricket").checked) {
        selectedRow.cells[5].innerHTML += "cricket "
    }
    if (document.getElementById("chess").checked) {
        selectedRow.cells[5].innerHTML += "chess "
    }
    if (document.getElementById("music").checked) {
        selectedRow.cells[5].innerHTML += "Music "
    }
}

function updateAdvanceTable(){
        document.getElementById("nameRow").cells[selectedRow.rowIndex].innerHTML = document.getElementById("name").value;
        if (document.getElementById("female").checked) {
            document.getElementById("genderRow").cells[selectedRow.rowIndex].innerHTML = "Female";
        }
        else {
            document.getElementById("genderRow").cells[selectedRow.rowIndex].innerHTML = "Male";
        }
        document.getElementById("dobRow").cells[selectedRow.rowIndex].innerHTML = document.getElementById("dob").value;
        document.getElementById("emailRow").cells[selectedRow.rowIndex].innerHTML = document.getElementById("email").value;
        document.getElementById("phoneRow").cells[selectedRow.rowIndex].innerHTML = document.getElementById("phone").value;;
        document.getElementById("hobbieRow").cells[selectedRow.rowIndex].innerHTML = " ";
        if (document.getElementById("cricket").checked) {
            document.getElementById("hobbieRow").cells[selectedRow.rowIndex].innerHTML += "cricket "
        }
        if (document.getElementById("chess").checked) {
            document.getElementById("hobbieRow").cells[selectedRow.rowIndex].innerHTML += "chess "
        }
        if (document.getElementById("music").checked) {
            document.getElementById("hobbieRow").cells[selectedRow.rowIndex].innerHTML += "Music "
        }
}

function syncEmp() {
     window.localStorage.setItem('empList', JSON.stringify(empListLocalStorage));
      //empListLocalStorage = JSON.parse(window.localStorage.getItem('empList'));
 }

function appendEmployee() {
    var table = document.getElementById("empTable");
    table.innerHTML = '<tr> <th>Name</th> <th>Gender</th> <th>Dob</th>   <th>Email</th> <th>Phone</th>  <th>Hobbie</th> <th> Action</th ></tr > ';
    var tableadv = document.getElementById("empAdvanceTable");
    tableadv.innerHTML = '<tr id="nameRow"> <th>Name</th></tr><tr id = "genderRow"> <th>Gender</th></tr><tr id="dobRow"> <th>Dob</th></tr><tr id="emailRow">  <th>Email</th></tr><tr id="phoneRow">   <th>Phone</th></tr><tr id="hobbieRow">    <th>Hobbie</th></tr><tr id="ActionRow">    <th>action</th></tr>';
    for (let i = 0; i < empListLocalStorage.length; i++) {
        insertNewRecord(empListLocalStorage[i], empListLocalStorage.length - i);
    }
}

function insertNewRecord(data, i) {
    
    var table = document.getElementById("empTable");
    var newRow = table.insertRow();

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
    cell7.innerHTML = `<button onClick="onEdit(this,${i})" class="editbttn">Edit</a>         
    <button onClick="onDelete(this,${i})" class="deletebttn">Delete</a>`;
    insertNewRecordAdvTable(data,i);
 }

function insertNewRecordAdvTable(data,i){
    var nameRow = document.getElementById("nameRow");
    var genderRow = document.getElementById("genderRow");
    var dobRow = document.getElementById("dobRow");
    var emailRow = document.getElementById("emailRow");
    var phoneRow = document.getElementById("phoneRow");
    var hobbieRow = document.getElementById("hobbieRow");
    var actionRow = document.getElementById("ActionRow");

    cell1 = nameRow.insertCell();
    cell1.innerHTML = data.name;

    cell2 = genderRow.insertCell();
    cell2.innerHTML = data.gender;

    cell3 = dobRow.insertCell();
    cell3.innerHTML = data.dob;

    cell4 = emailRow.insertCell();
    cell4.innerHTML = data.email;

    cell5 = phoneRow.insertCell();
    cell5.innerHTML = data.phone;

    cell6 = hobbieRow.insertCell();
    cell6.innerHTML = data.hobbies;

    cell7 = actionRow.insertCell();
    cell7.innerHTML = `<button onClick="onEditAdv(this,${i})" class="editbttn">Edit</a>         
    <button onClick="onDeleteAdv(this,${i})" class="deletebttn">Delete</a>`;
}

function onDelete(td, i) {
    row = td.parentElement.parentElement;
    var rowindex = row.rowIndex;
    var columnIndex = td.parentElement.cellIndex + 1;

    document.getElementById("empTable").deleteRow(row.rowIndex);

    var nameRow = document.getElementById("nameRow");
    var genderRow = document.getElementById("genderRow");
    var dobRow = document.getElementById("dobRow");
    var emailRow = document.getElementById("emailRow");
    var phoneRow = document.getElementById("phoneRow");
    var hobbieRow = document.getElementById("hobbieRow");
    var actionRow = document.getElementById("ActionRow");
    nameRow.deleteCell(rowindex);
    genderRow.deleteCell(rowindex);
    dobRow.deleteCell(rowindex);
    emailRow.deleteCell(rowindex);
    phoneRow.deleteCell(rowindex);
    hobbieRow.deleteCell(rowindex);
    actionRow.deleteCell(rowindex);

    empListLocalStorage.splice(empListLocalStorage.length - i, 1);
    syncEmp();
}

function onDeleteAdv(td, i) {
    row = td.parentElement.parentElement;
    var rowindex = row.rowIndex;
    var columnIndex = td.parentElement.cellIndex + 1;

    var nameRow = document.getElementById("nameRow");
    var genderRow = document.getElementById("genderRow");
    var dobRow = document.getElementById("dobRow");
    var emailRow = document.getElementById("emailRow");
    var phoneRow = document.getElementById("phoneRow");
    var hobbieRow = document.getElementById("hobbieRow");
    var actionRow = document.getElementById("ActionRow");
    nameRow.deleteCell(columnIndex - 1);
    genderRow.deleteCell(columnIndex - 1);
    dobRow.deleteCell(columnIndex - 1);
    emailRow.deleteCell(columnIndex - 1);
    phoneRow.deleteCell(columnIndex - 1);
    hobbieRow.deleteCell(columnIndex - 1);
    actionRow.deleteCell(columnIndex - 1);

    document.getElementById("empTable").deleteRow(columnIndex - 1);
    empListLocalStorage.splice(empListLocalStorage.length - i, 1);
    syncEmp();

}

function onEdit(td, i) {

    selectedRow = td.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    if (selectedRow.cells[1].innerHTML == "Female") {
        document.getElementById("female").checked = true;
    }
    else {
        document.getElementById("male").checked = true;
    }
    document.getElementById("dob").value = selectedRow.cells[2].innerHTML;
    document.getElementById("email").value = selectedRow.cells[3].innerHTML;
    document.getElementById("phone").value = selectedRow.cells[4].innerHTML;
    
    let hobbiesEdit = selectedRow.cells[5].innerHTML;
    
    checkUncheckHobbies(hobbiesEdit);

    syncEmp();
}

function onEditAdv(td, i) {

    selectedRowAdv = td.parentElement.parentElement;
  
    columnIndexadv = td.parentElement.cellIndex + 1;
    selectedRow = document.getElementById("empTable").rows[columnIndexadv - 1];

    var nameRow = document.getElementById("nameRow");
    var genderRow = document.getElementById("genderRow");
    var dobRow = document.getElementById("dobRow");
    var emailRow = document.getElementById("emailRow");
    var phoneRow = document.getElementById("phoneRow");
    var hobbieRow = document.getElementById("hobbieRow");
    var actionRow = document.getElementById("ActionRow");

    document.getElementById("name").value = nameRow.cells[columnIndexadv - 1].innerHTML;
    //document.getElementsByName("gender") =selectedRow.cells[1].innerHTML;
    //console.log(selectedRow.cells[1].innerHTML);
    if (genderRow.cells[i].innerHTML == "Female") {
        document.getElementById("female").checked = true;
    }
    else {
        document.getElementById("male").checked = true;
    }
    document.getElementById("dob").value = dobRow.cells[columnIndexadv - 1].innerHTML;
    document.getElementById("email").value = emailRow.cells[columnIndexadv - 1].innerHTML;
    document.getElementById("phone").value = phoneRow.cells[columnIndexadv - 1].innerHTML;
    //document.getElementsByName("hobbie") =selectedRow.cells[5].innerHTML;
    let hobbiesEdit = hobbieRow.cells[columnIndexadv - 1].innerHTML;
    checkUncheckHobbies(hobbiesEdit);
    syncEmp();
}

function checkUncheckHobbies(hobbiesEdit){
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

}


