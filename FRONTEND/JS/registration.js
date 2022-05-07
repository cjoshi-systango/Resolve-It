var register = `
<link
href="../CSS/registration.css"
rel="stylesheet"
id="bootstrap-css"
/>
<br><br><br><br><br><br><br><br>
<div class="log-form" style="top: 20%; ">
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
  
    <button onClick = "save()" class="btn" style="background-color: #7b97ea; color:white;  text-align:center; margin-left:43%">Register</button>

</div>
   
   
  </form>
</div><!--end log form -->
`;

document.write(register);




setTimeout(() => {
    createUsertype();
}, 1000);





// let createUserBtn = document.querySelector("#createUser");
// createUserBtn.addEventListener("click", save)
// 
// /

// // window.addEventListener("load",createUsertype)


// 

function createUsertype() {

    let userType = document.querySelector("#userType");
    let Department = document.querySelector("#department");
    fetch("http://localhost:4000/registration/usertype", {
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


    fetch("http://localhost:4000/registration/department", {
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
function save() {

    // varialbe to store data of user after user is created 
    let email, password, Name, usertype, department;

    email = document.querySelector("#userEmailInp").value;
    Name = document.querySelector("#userFnameInp").value;
    password = Math.floor(100000 + Math.random() * 900000)
    usertype = document.querySelector("#userType").value;
    department = document.querySelector("#department").value;
    
    console.log(department);
    

    let data = {
        Email: email,
        Name: Name,
        Password: password,
        Usertype: usertype,
        Department : department,
    }

    fetch("http://localhost:4000/registration/register/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(async (result) => {
        let response = await result.json();
        let data = response.data;
        if (data == "register") {
            alert("registerd");
            Email.send({
                Host: "smtp.gmail.com",
                Username: "resolveItt@gmail.com",
                Password: "resolveIt@13",
                To: email,
                From: "resolveItt@gmail.com",
                Subject: "User Credentials",
                Body: "Here are your credentials of resolveIt" + password,
            }).then(
                message => alert("mail sent successfully")
        
            )
                .catch(error => alert(error));
            
        }
        else if (data == "alreadyExist") {
            alert("User email already exist");
        }
        // console.log(result.json());
    })
        .catch((e) => {
            console.error(e);
        })


}