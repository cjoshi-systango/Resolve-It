var body = `
<link
href="../CSS/issueTicket.css"
rel="stylesheet"
id="bootstrap-css"/>
<h4 style="font-weight:bold">Issue</h4>

<label>Sort By :</label><select name="filter" id="filter" >
<option value="all">All</option>
<option value="new">New</option>
<option value="closed">Closed</option>
<option value="pending">Pending</option>
<option value="high">High</option>
<option value="medium">Medium</option>
<option value="low">Low</option>
</select>

<div class="mx-5">

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

<div id="chatContainer">
    <a href="../HTML/chatBoat.html" style= "width:100%; heigth:100%"><img id="chatWithUs" src="../IMAGES/chaticon.png" alt="chat With us"></a>   
</div>
`;
// document.write(body)

let newIssue = document.querySelector("#issue");
newIssue.innerHTML = body;


//fetch url to run the port on
// import {fetchUrl} from "../JS/config.js";
let fetchUrl 


import * as fetchurl from './config.js'
setTimeout(() => {
    console.log(Object.values(fetchurl) );
    fetchUrl = Object.values(fetchurl);
    //calling the function to show the all ticket

    showTicket();
}, 1000);
console.log(fetchurl);

// let fetchUrl = "http://localhost:4000/";


//getting all the required elememnt from html
let tableBody = document.querySelector("#tableBody");
let navRegisration = document.querySelector("#nav-registration");
let navCreateDepartment = document.querySelector("#nav-createDepartment");
let aurthorizationToken = localStorage.getItem("Aurthorization");




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
            let subject = document.createElement("td");
            let priority = document.createElement("td");
            let assignee = document.createElement("td");
            let status = document.createElement("td");
            let createdBy = document.createElement("td");
            let department = document.createElement("td");


            let id = document.createElement("a");





            id.innerHTML = element.id;
            subject.innerHTML = element.subject;
            department.innerHTML = element.department_name;
            status.innerHTML = element.status_title;
            priority.innerHTML = element.priority_title;
            assignee.innerHTML = element.assigned_to;
            createdBy.innerHTML = element.created_by;

            if (priority.innerHTML == "high") priority.style.color = "red";
            if (priority.innerHTML == "medium") priority.style.color = "rgb(255,69,0)";
            if (priority.innerHTML == "low") priority.style.color = "orange";
            ticket.addEventListener("click", ticketUpdate)
            function ticketUpdate() {
                console.log("tr");
                location.href = `../HTML/ticketUpdation.html?${id.innerHTML}`;
            }
            // id.href = 
            // id.value = id.innerHTML;

            ticket.appendChild(id);
            ticket.appendChild(subject);
            ticket.appendChild(department);
            ticket.appendChild(status);
            ticket.appendChild(priority);
            ticket.appendChild(assignee);
            ticket.appendChild(createdBy);

            
            let filter = document.querySelector("#filter");
        
        
            filter.addEventListener("change", addFilter)
            
            
            //function to show ticket according to the filter
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
                    if (priority.innerHTML == "high") tableBody.appendChild(ticket);;
                }
                else if (filter == "medium") {
                    tableBody.appendChild(ticket);
                    tableBody.removeChild(ticket);
                    if (priority.innerHTML == "medium") tableBody.appendChild(ticket);;
                }
                else if (filter == "low") {
                    tableBody.appendChild(ticket);
                    tableBody.removeChild(ticket);
                    if (priority.innerHTML == "low") tableBody.appendChild(ticket);;
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