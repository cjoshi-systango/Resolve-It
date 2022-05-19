var body = `
<link
href="../CSS/issueTicket.css"
rel="stylesheet"
id="bootstrap-css"/>
<div id="sortBy">
    <label style="font-weight: bold;">Sort By :</label><select name="filter" id="filter" >
    <option value="all">All</option>
    <option value="new">New</option>
    <option value="closed">Closed</option>
    <option value="pending">Pending</option>
    <option value="high">High</option>
    <option value="medium">Medium</option>
    <option value="low">Low</option>
    </select>
</div>


<div class="mx-5">
<div style="border: 5px solid #7b97ea; border-radius:5px;" >
    <table id="customers" >
    <thead>
    <tr>
        <th>Id</th>
        <th>Subject</th>
        <th>Department</th>
        <th>Status</th>
        <th>Priority</th>
        <th>Assign To</th>
        <th>Created By</th>
    </tr>
    </thead>
    <tbody id="tableBody">
                            
    </tbody>

    </table>
</div>

</div>

<div id="chatContainer">
    <a href="../HTML/chatBoat.html" style= "width:100%; heigth:100%"><img id="chatWithUs" src="../IMAGES/chaticon.png" alt="chat With us"></a>   
</div>
`;
// document.write(body)

let newIssue = document.querySelector("#issue");
newIssue.innerHTML = body;


//fetch url to run the port on
import {fetchUrl} from "../JS/config.js";
// let fetchUrl 


// import * as fetchurl from './config.js'
// setTimeout(() => {
//     console.log(Object.values(fetchurl) );
//     fetchUrl = Object.values(fetchurl);
//     //calling the function to show the all ticket

// }, 1000);
// console.log(fetchurl);

// let fetchUrl = "http://localhost:4000/";


//getting all the required elememnt from html
let tableBody = document.querySelector("#tableBody");
let navRegisration = document.querySelector("#nav-registration");
let navCreateDepartment = document.querySelector("#nav-createDepartment");
let aurthorizationToken = localStorage.getItem("Aurthorization");

showTicket();



//function to show the ticket
function showTicket() {
    console.log(fetchUrl);
    //this will get all the tickets from database 
    fetch(fetchUrl+"issueTicket/showTicket", {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Aurthorization": aurthorizationToken,
        }
    }).then(async (result) => {
        // if(aurthorizationToken) 
        let response = await result.json();
        let data = response.data;
        console.log(data);
        data[0].forEach(element => {
            let ticket = document.createElement("tr");
            ticket.setAttribute("id", "ticket");

            ticket.style.maxHeight = "15%"
            let subject = document.createElement("td");
            let priority = document.createElement("td");
            let assignee = document.createElement("td");
            let status = document.createElement("td");
            let createdBy = document.createElement("td");
            let department = document.createElement("td");

            
            let priorityButton = document.createElement("button");
            priorityButton.setAttribute("class","priorityButton");

            let createdByButton = document.createElement("button");
            createdByButton.setAttribute("class","createdByButton");

            let assignedToButton = document.createElement("button");
            assignedToButton.setAttribute("class","assignedToButton");

            let bgColor = "#" + ("00000" + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)).slice(-6);
            let bgColor1 = "#" + ("00000" + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)).slice(-6);
            createdByButton.style.backgroundColor = bgColor;
            assignedToButton.style.backgroundColor = bgColor1;
            ticket.style.height = "60";

            subject.setAttribute("class","subject");

            let id = document.createElement("td");

            id.innerHTML = element.id;
            subject.innerHTML = element.subject;
            department.innerHTML = element.department_name;
            status.innerHTML = element.status_title;
            priorityButton.innerHTML = element.priority_title;
            assignedToButton.innerHTML = element.assigned_to.substring(0,2);
            createdByButton.innerHTML = element.created_by.substring(0,2) ;

            if (priorityButton.innerHTML == "high") priorityButton.style.backgroundColor = "red";
            if (priorityButton.innerHTML == "medium") priorityButton.style.backgroundColor = "rgb(255,69,0)";
            if (priorityButton.innerHTML == "low") priorityButton.style.backgroundColor = "orange";
            ticket.addEventListener("click", ticketUpdate)
            function ticketUpdate() {
                console.log("tr");
                location.href = `../HTML/ticketUpdation.html?${id.innerHTML}`;
            }
            // id.href = 
            // id.value = id.innerHTML;
            createdBy.appendChild(createdByButton);
            priority.appendChild(priorityButton);
            assignee.appendChild(assignedToButton);
            ticket.appendChild(id);
            ticket.appendChild(subject);
            ticket.appendChild(department);
            ticket.appendChild(status);
            ticket.appendChild(priority);
            ticket.appendChild(assignee);
            ticket.appendChild(createdBy);

            
            let filter = document.querySelector("#filter");
        
        
            filter.addEventListener("change", addFilter)
            
            

            function addFilter()
            {
                filter = document.querySelector("#filter").value;
                if (filter == "new") {
                    tableBody.appendChild(ticket);
                    tableBody.removeChild(ticket);
                    if (status.innerHTML == "new") tableBody.appendChild(ticket);;
                }
                else if (filter == "closed") {
                    tableBody.appendChild(ticket);
                    tableBody.removeChild(ticket);
                    if (status.innerHTML == "closed") tableBody.appendChild(ticket);;
                }
                else if (filter == "pending") {
                    tableBody.appendChild(ticket);
                    tableBody.removeChild(ticket);
                    if (status.innerHTML == "pending") tableBody.appendChild(ticket);;
                }
                else if (filter == "high") {
                    tableBody.appendChild(ticket);
                    tableBody.removeChild(ticket);
                    if (priorityButton.innerHTML == "high") tableBody.appendChild(ticket);;
                }
                else if (filter == "medium") {
                    tableBody.appendChild(ticket);
                    tableBody.removeChild(ticket);
                    if (priorityButton.innerHTML == "medium") tableBody.appendChild(ticket);;
                }
                else if (filter == "low") {
                    tableBody.appendChild(ticket);
                    tableBody.removeChild(ticket);
                    if (priorityButton.innerHTML == "low") tableBody.appendChild(ticket);;
                }
                else if (filter == "all") {
                    tableBody.appendChild(ticket);
                    
                }
            }
            tableBody.appendChild(ticket);;



        });

        data[1].forEach(element => {
            if (element.user_type_id == 1) {
                navRegisration.classList.remove("hide");
                navCreateDepartment.classList.remove("hide");
            }

        })
    })
        .catch((e) => {
            console.error(e);
        })
}