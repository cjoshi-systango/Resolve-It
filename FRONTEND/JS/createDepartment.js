let department = `
<center>
    <div style="border: 5px solid #7b97ea; border-radius:5px; display: inline-block; position: absolute; top:50%; left:50%; transform: translate(-50%,-50%);">
        <center style="background: #7b97ea; padding: 10px;">
            <h3 class="mb-0" style="color: white;">Create Department</h3>
        </center>
        <form style="padding: 20px;">
            <div style="margin: 10px;">
                <input id="departmentName" placeholder="Enter Department Name" style="border:1px solid grey; border-radius:5px; padding: 5px;"><br>
                <small id="departmentNameWarning" style="color:red; font-weight:600; display:none"> warning text here <!--Dynamic content here--> </small>
            </div>    
            <button id="createDepartmentBtn" style="background: #7b97ea; color: white; border: 0px solid transparent; border-radius: 5px; padding-left: 20px; padding-right: 20px;margin-top:5%">Create</button>    
        </form>
    </div>
</center>
`;

let create = document.querySelector("#createDepartment");
create.innerHTML = department;

// fetch url to run on port
import {fetchUrl} from "../JS/config.js";
// let fetchUrl 

// import * as fetchurl from './config.js'
// setTimeout(() => {
//     console.log(Object.values(fetchurl) );
//     fetchUrl = Object.values(fetchurl)
// }, 1000);
// console.log(fetchurl);


//getting the essential element from html
let departmentName = document.querySelector("#departmentName");
let createDepartmentBtn = document.querySelector("#createDepartmentBtn");
let departmentNameWarning = document.querySelector("#departmentNameWarning");

//getting the token from the local storage for autorization
let aurthorizationToken = localStorage.getItem("Aurthorization");

//adding event listners on button and the warning of error 
createDepartmentBtn.addEventListener("click", storeDepartment);
departmentName.addEventListener("click", removeWarning);

//function to remove the warning after clicking on the input box
function removeWarning(){
    departmentNameWarning.style.display = "none";
}

//function to store department in the database
function storeDepartment() {
    departmentNameValue = departmentName.value;
    if(departmentNameValue == "")
    {
        // alert("Name can not be null");
        
        departmentNameWarning.innerText = "Name can not be null";
        departmentNameWarning.style.display = "block";
    }
    else
    {
        let departmentData = {
            Name: departmentNameValue
        }
        //this will store the department in database
        fetch(fetchUrl+"createDepartment/departmentCreate/", {
            method: "POST",
            body: JSON.stringify(departmentData),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Aurthorization": aurthorizationToken
            }
        }).then(async (result) => {
            let response = await result.json();
            let data = response.data;
            // console.log(data.user);
            if (data == "inserted") {
                // alert("Inserted sucsessFully");
                departmentNameWarning.innerText = "Inserted sucsessFully";
                departmentNameWarning.style.display = "block";
            }
            else {
                // alert("some error occured");
                departmentNameWarning.innerText = "some error occured";
                departmentNameWarning.style.display = "block";
            }
        })
            .catch((e) => {
                console.error(e);
            })
    }
    
}