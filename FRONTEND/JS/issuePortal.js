var body = `
<link
href="../CSS/issuePortal.css"
rel="stylesheet"
id="bootstrap-css"
/>


<label style="color:black; font-weight: bold; margin-left: 2%">Department :</label>
<select id="departmentSelect"  >
<option>Select--</option>
</select>

<div id="registration_formmm" class="hide" style="position: relative;"> 
    <div class="log-form" id="issuePortalForm" style="position: absolute; top: 50%; right: 50%; transform: translate(-50%,0%);border: 5px solid #7b97ea; border-radius:5px;">
        <h2 style="font-weight:bold;  text-align:center; background-color: #7b97ea; color:white; ">New Issue</h2>

            
                <div class="row">
                        
                    <div class="col">
                        <label  style="color:black; font-weight: bold; margin-left:3%;margin-top:1%">Subject</label>
                        <input type="text" id="subjectInp" placeholder="Subject" style="border:1px solid grey; border-radius:10px;margin-left:2%;width:94%">
                    </div>
                </div>
            

                <div class="row>
                    <div class="col">
                        
                        <label  style="color:black; font-weight: bold; margin-left:3%;" for="inputAddress">Description</label>
                        <textarea class="form-control" id="descriptionInp" rows="4"  style="border:1px solid grey;  border-radius:10px;margin-left:2%;width:94%""></textarea>
                        
                    </div>
                
            
            
                <div class="row">
                    <div class="col">
                        <label style="color:black; font-weight: bold; margin-left:5%;">Priority</label>
                        <select id="PriorityInp"  style="border:1px solid grey; border-radius:10px;margin-left:3%;width:90%">
                        <option>Select--</option>
                        </select>
            
                    </div> 
                        <div class="col">
                            <label style="color:black; font-weight: bold; margin-left:3%;">Status</label>
                            <select id="statusInp"  style="border:1px solid grey; border-radius:10px;margin-left:3%;width:90%">
                                <option>Select--</option>
                            </select>
                        </div>
                </div>
                <div class="row">
    
                    <label  style="color:black; font-weight: bold; margin-left:3%; margin-top:2%">Select File</label>
                    <input type="file" class="form-control" id="selectfileInp" style="border:1px solid grey;  border-radius:10px; width:60%; height:2%; margin-left:3%;">
                    <button id="UploadImage" style="display:inline; width:fit-content; background-color:#7b97ea; color:white;  width:15%; height:2%; margin-top:1.5%; margin-right:5%">Upload</button>
                </div> 
                
            
                <div class="row">
                        
                
                        <div class="col">
                            <label  style="color:black; font-weight: bold; margin-left:3%;">Assign-To</label>
                            <select id="AssigneeInp"  style="border:1px solid grey; border-radius:10px;margin-left:2%;width:94%">
                            <option>Select--</option>
                            </select>
                        </div>

                </div>
                <small id="issuePortalWarning" style="color:red; font-weight:600; display:none"> warning text here <!--Dynamic content here--> </small>


                <button id="createIssueBtn" class="btn" style="background-color: #7b97ea; color:white; text-align:center; margin-left:40%;margin-top:2%">Submit</button>
        
            
        
    </div> 
</div>
`;
// document.write(body);

console.log("new issue");

let newIssue = document.querySelector("#newissue");
newIssue.innerHTML = body;

//fetch url to run the port on
import {fetchUrl} from "../JS/config.js";

//getting the essential element from html
let departmentinputState = document.querySelector("#departmentSelect");
console.log(departmentinputState);

//importing the required methods to store image in firebase
import { getStorage, sref, uploadBytesResumable, getDownloadURL } from "../JS/firebase.js";


//decraling the required element
let department = document.getElementById("departmentSelect");
let files = [];
let reader = new FileReader();
let issuePortal, issueStatus, issuePriority, issueAssignTo, subject, issueDescription, Name, fname, extension, ext, imageUrl ,issuePortal1;
let createIssueBtn = document.querySelector("#createIssueBtn");
department.addEventListener("change", createIssuePortal);
createIssueBtn.addEventListener("click", storeTicketData)
let uploadImage = document.querySelector("#UploadImage");
let selectImageInp = document.querySelector("#selectfileInp");
let imageName =""
let imageExtension =""
let issuePortalWarning = document.querySelector("#issuePortalWarning");
let issuePortalForm = document.querySelector("#issuePortalForm");


//getting the token from the local storage for authorization
let aurthorizationToken = localStorage.getItem("Aurthorization");


//getting the image file after selecting
selectImageInp.onchange = e => {
    files = e.target.files;
    // files = selectImageInp.value;

    extension = getExtemsionOfFile(files[0]);
    Name = getNameOfFile(files[0]);

    imageName += Name;
    imageExtension += extension;

    reader.readAsDataURL(files[0]);

}
//function to get the extension of the image to store
function getExtemsionOfFile(file) {
    let temp = file.name.split(".");
    ext = temp.slice((temp.length - 1), (temp.length));
    return "." + ext[0];
}
//function to get the name of the image to store
function getNameOfFile(file) {
    let temp = file.name.split(".");
    fname = temp.slice(0, -1).join(".");
    return fname;
}
let url;
//function to upload the image in firebase
async function imageUpload() {
    console.log(files[0]);
    let imgToUpload = files[0];

    let nameOfImage = imageName.value + imageExtension.innerHTML;

    const metaData = {
        contentType: imgToUpload.type
    }

    const STORAGE = getStorage();

    const STORAGE_REF = sref(STORAGE, "Images/" + nameOfImage);

    const UPLOADING = uploadBytesResumable(STORAGE_REF, imgToUpload, metaData);

    UPLOADING.on("state-changed", (snapshot) => {
        console.log(",sx");

        //this will get the download url of the image 
        const PROMISE = getDownloadURL(UPLOADING.snapshot.ref).then((downloadURL) => {
            console.log("inside download")
            console.log(downloadURL);
            imageUrl = downloadURL;
        });

        PROMISE.then(() => {
            // console.log(imageUrl);

            // imageUrl (imageUrl)
            function imageUrll()
            {
                return imageUrl
            }
            url = imageUrll();
        })

    });


}

issuePortalForm.addEventListener("click",removeWarning)

function removeWarning()
{
    setTimeout(() => {
        issuePortalWarning.style.display = "none";
    }, 2000);
}

getDepartment();

// adding the event listener on the upload button 
uploadImage.addEventListener("click", imageUpload);

//this will get the all department from database
function getDepartment()
{
    let userData = {
        id : aurthorizationToken,
    }

    fetch(fetchUrl+"issuePortal/departmentDetails", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Aurthorization": aurthorizationToken
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
            department.appendChild(option);
        });
    })
        .catch((e) => {
            console.error(e);
        })
}


//creating the first option for different select 
let firstOption = document.createElement("option");
firstOption.innerHTML = "Select--"
let statusfirstOption = document.createElement("option");
statusfirstOption.innerHTML = "Select--"
let priorityfirstOption = document.createElement("option");
priorityfirstOption.innerHTML = "Select--"

//this function will create the issue poratl after user select the department he wants to raise issue in
function createIssuePortal() {
   
    issuePortal = document.querySelector("#registration_formmm");
    // issuePortal1 = document.querySelector("#registration_formmm1");
    
    issueStatus = document.querySelector("#statusInp");
    issuePriority = document.querySelector("#PriorityInp");
    issueAssignTo = document.querySelector("#AssigneeInp");
    console.log(department.value);
    issueAssignTo.innerHTML = ""
    issueStatus.innerHTML = ""
    issuePriority.innerHTML = ""

    
    issuePortal.classList.remove("hide");

    issueStatus.appendChild(statusfirstOption);
    issuePriority.appendChild(priorityfirstOption);
    issueAssignTo.appendChild(firstOption);

    //this will get all the status stored in database
    fetch(fetchUrl+"issuePortal/status", {
        method: "POST",
        // body: "",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Aurthorization": aurthorizationToken
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
            issueStatus.appendChild(option);
        });
    })
        .catch((e) => {
            console.error(e);
        })

    //this will get all the priority stored in database
    fetch(fetchUrl+"issuePortal/priority", {
        method: "POST",
        // body: "",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Aurthorization": aurthorizationToken

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
            issuePriority.appendChild(option);
        });
    })
        .catch((e) => {
            console.error(e);
        })

    let departmentValue = {
        Department: department.value,
    }

    //this will get all the admin of the selected department
    fetch(fetchUrl+"issuePortal/assignTo", {
        method: "POST",
        body: JSON.stringify(departmentValue),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Aurthorization": aurthorizationToken

        }
    }).then(async (result) => {
        let response = await result.json();
        let data = response.data;
        console.log(data.length);
        for (let item = 0; item < data.length; item++) {
            data[item].forEach(element => {
                console.log(element.name);
                let keys = element.name;
                let value = element.id;
                let option = document.createElement("option");
                option.setAttribute("value", value);
                option.appendChild(document.createTextNode(keys));
                issueAssignTo.appendChild(option);
            });
        }

    })
        .catch((e) => {
            console.error(e);
        })

}

//this will get the date on which the issue is cerated 
let today = new Date();
let currentdate = today.getFullYear() + '-' + Multiplication(today.getMonth() + 1) + '-' + today.getDate();


//function to store the ticket data in the database
function storeTicketData() {

    // if(selectImageInp.value != "")
    // {
    //     imageUpload()
    // }

    console.log(url);
    subject = document.querySelector("#subjectInp").value;
    issueDescription = document.querySelector("#descriptionInp").value;
    issueStatus = document.querySelector("#statusInp").value;
    issuePriority = document.querySelector("#PriorityInp").value;
    issueAssignTo = document.querySelector("#AssigneeInp").value;

    if (subject == "") {
        issuePortalWarning.innerHTML = "Subject can not null"; 
        issuePortalWarning.style.display = "block";
    }
    else if (issueStatus == ""){
        issuePortalWarning.innerHTML = "Must Select Status"; 
        issuePortalWarning.style.display = "block";
    } 
    else if (issuePriority == "") {
        issuePortalWarning.innerHTML = "Must Select Priority"; 
        issuePortalWarning.style.display = "block";
    }
    else if (issueAssignTo == ""){
        issuePortalWarning.innerHTML = "Must Assign Issue To Someone"; 
        issuePortalWarning.style.display = "block";
    }
    else if (issueDescription == "") issueDescription = "-";
    else if (url == undefined) url = "";
    else {
        console.log(currentdate);
        let data = {
            Subject: subject,
            Decription: issueDescription,
            Department: department.value,
            Status: issueStatus,
            Priority: issuePriority,
            CreatedDate: currentdate,
            AssignTo: issueAssignTo,
            CreatedBy: aurthorizationToken,
            ImageUrl : url,

        }
        //this will store the data in database
        fetch(fetchUrl+"issuePortal/createIssue", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Aurthorization": aurthorizationToken,

            }
        }).then(async (result) => {
            let response = await result.json();
            let data = response.data;
            if (data == "issueCreated") {
                swal({
                    title: "Good job!",
                    text: "Issue Created Sucessfully!",
                    icon: "success",
                    button: "Aww yiss!",
                  }).then(()=>{
                    window.location.reload();
                  })
            }
            else if (data == "error") {
                issuePortalWarning.innerHTML = "Someting Went Wrong Please Try Again"; 
                issuePortalWarning.style.display = "block";
            }
            // console.log(result.json());
        })
            .catch((e) => {
                console.error(e);
            })
    }



}
