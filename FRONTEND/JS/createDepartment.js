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
            <button id="createDepartmentBtn" style="background: #7b97ea; color: white; border: 0px solid transparent; border-radius: 5px; padding-left: 20px; padding-right: 20px;">Create</button>    
        </form>
    </div>
</center>
`;

let create = document.querySelector("#createDepartment");
create.innerHTML = department;

let departmentName = document.querySelector("#departmentName");
let createDepartmentBtn = document.querySelector("#createDepartmentBtn");
let departmentNameWarning = document.querySelector("#departmentNameWarning");

aurthorizationToken = localStorage.getItem("Aurthorization");

createDepartmentBtn.addEventListener("click", storeDepartment);
departmentName.addEventListener("click", removeWarning);


function removeWarning(){
    departmentNameWarning.style.display = "none";
}


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
    
        fetch("http://localhost:4000/createDepartment/departmentCreate/", {
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
                alert("Inserted sucsessFully");
            }
            else {
                alert("some error occured");
            }
        })
            .catch((e) => {
                console.error(e);
            })
    }
    
}