var register = `
<link
href="../CSS/registration.css"
rel="stylesheet"
id="bootstrap-css"
/>
<br><br><br><br><br><br><br><br>
<div class="log-form" id="registrationForm" style="top: 20%; ">
  <h2 style="font-weight:bold;  text-align:center; background-color: #7b97ea; color:white; ">Registration</h2>
  <form>
  <input type="text" id="userFnameInp" title="name" placeholder="Enter Name"  style="height:7%; border:1px solid grey;  border-radius:10px;"  required/>
  <input type="email" title="email" id="userEmailInp" placeholder="Email" style="padding-left:1%; height:7%; border:1px solid grey;  border-radius:10px;" required />
 <label style="font-weight:bold;">Type</label>
     <select  value="Type" id="userType" style=" height:7%; border:1px solid grey;  border-radius:10px;" required >
    </select>
 <label style="font-weight:bold;">Department</label>
 <select  value="Department" id="department" style=" height:7%; border:1px solid grey;  border-radius:10px;" required >
 
</select>
<small id="registrationWarning" style="color:red; font-weight:600; display:none"> warning text here <!--Dynamic content here--> </small>
  
    <button id = "registrationBtn" class="btn" style="background-color: #7b97ea; color:white;  text-align:center; margin-left:43%">Register</button>

</div>
   
   
  </form>
</div><!--end log form -->
`;

// document.write(register);

let registrationPage = document.querySelector("#register");
registrationPage.innerHTML = register;

//fetch url to run the port on
import {fetchUrl} from "../JS/config.js";


let registrationWarning = document.querySelector("#registrationWarning");
let registrationForm = document.querySelector("#registrationForm");

createUsertype();

console.log(fetchUrl);

let registrationBtn =document.querySelector("#registrationBtn");
registrationBtn.addEventListener("click",save);
registrationForm.addEventListener("click",removeWarning);

function removeWarning()
{
    setTimeout(() => {
        registrationWarning.style.display = "none";
        
    }, 2000);

}


// function to get all the user type from database
function createUsertype() {

    let userType = document.querySelector("#userType");
    let Department = document.querySelector("#department");

    //this will get all the user type
    fetch(fetchUrl+"registration/usertype", {
        method: "POST",
        // body: "",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(async (result) => {
        let response = await result.json();
        let data = response.data;
        console.log(data.length);
        data.forEach(element => {
            console.log(element);
            let keys = Object.keys(element)
            let value = Object.values(element)
            let option = document.createElement("option");
            option.setAttribute("value", value);
            option.appendChild(document.createTextNode(keys));
            userType.appendChild(option);
        });
    })
        .catch((e) => {
            console.error(e);
        })

    //this will get all the department from the data base
    fetch( fetchUrl+"registration/department", {
        method: "GET",
        // body: "",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(async (result) => {
        let response = await result.json();
        let data = response.data;
        console.log(data.length);
        data.forEach(element => {
            console.log(element);
            let keys = Object.keys(element)
            let value = Object.values(element)
            let option = document.createElement("option");
            option.setAttribute("value", value);
            option.appendChild(document.createTextNode(keys));
            Department.appendChild(option);
        });
    })
        .catch((e) => {
            console.error(e);
        })
}



// //function to save the user data in firebase 
function save(e) {

    e.preventDefault()
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // varialbe to store data of user after user is created 
    let email, password, Name, usertype, department;


    email = document.querySelector("#userEmailInp").value;
    Name = document.querySelector("#userFnameInp").value;
    password = Math.floor(100000 + Math.random() * 900000)
    usertype = document.querySelector("#userType").value;
    department = document.querySelector("#department").value;
    
    if(email == "")
    {
        registrationWarning.innerHTML = "Email can not be null"
        registrationWarning.style.display = "block"
    }
    else if(Name == "")
    {
        registrationWarning.innerHTML = "Name can not be null"
        registrationWarning.style.display = "block"
    }
    else if(!(email.match(validRegex)))
    {
        registrationWarning.innerHTML = "please enter valid email"
        registrationWarning.style.display = "block"

    }
    else{
        let data = {
            Email: email,
            Name: Name,
            Password: password,
            Usertype: usertype,
            Department : department,
        }
        //this will register user in database
        fetch(fetchUrl+"registration/register/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(async (result) => {
            let response = await result.json();
            let data = response.data;
            if (data == "register") {
                registrationWarning.innerHTML = "registerd"
                registrationWarning.style.display = "block"
            }
            else if (data == "alreadyExist") {
                registrationWarning.innerHTML = "User email already exist";
                registrationWarning.style.display = "block";
            }
            // console.log(result.json());
        })
            .catch((e) => {
                console.error(e);
            })
    
    }
   

}