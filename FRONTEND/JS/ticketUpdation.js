//fetch url to run the port on
import { fetchUrl } from "../JS/config.js";

//getting all the required element 
let issueData = document.querySelector("#issueData");
let description = document.querySelector("#description");
let subject = document.querySelector("#subject");
let priority = document.querySelector("#priority");
let assignedTo = document.querySelector("#assignedTo");
let createdDate = document.querySelector("#createdDate");
let createdBy = document.querySelector("#createdBy");
let updateBtn = document.querySelector(".update");
let deleteBtn = document.querySelector(".delete");
let viewComment = document.querySelector("#viewComments");
let viewImage = document.querySelector("#viewImage");
let comments = document.querySelector("#comments");
let fotter = document.querySelector("#outerdiv");
let outerdivsource = document.querySelector("#outerdivsource");
let textArea;
let history = document.querySelector("#history");
let ticketUpdationWarning = document.querySelector("#ticketUpdationWarning");
let ticketUpdate = document.querySelector("#ticketUpdate");

//this will get the current date and time 
let latestdate = new Date();
let dateTime = latestdate.getFullYear() + "-0" + (latestdate.getMonth() + 1) + "-" + latestdate.getDate() + " " + latestdate.getHours() + ":" + latestdate.getMinutes() + ":" + latestdate.getSeconds() + "." + latestdate.getMilliseconds();
//this wiil get the issue id from the url 
let url = window.location.search;
let label = document.querySelector("#label");
let issueId = url ? url.split('?')[1] : window.location.search.slice(1);

console.log(issueId);
// label.appendChild(issueId);

//this will get the authorization token from local storage
let aurthorizationToken = localStorage.getItem("Aurthorization");

//adding event listener 
comments.addEventListener("click", addcomment)
viewComment.addEventListener("click", seeComment);
history.addEventListener("click", seeHistory);
ticketUpdate.addEventListener("click", removeWarning)

function removeWarning() {
    setTimeout(() => {
        ticketUpdationWarning.style.display = "none";

    }, 2000);
}

getUserType();

function getUserType() {
    let data = {
        user: aurthorizationToken
    }
    //this will get the user type of loged In user and will show the page according to its permissions
    fetch(fetchUrl + "ticketUpdate/getUserType", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Aurthorization": aurthorizationToken,
        }
    }).then(async (result) => {
        let response = await result.json();
        let data = response.data.result;
        let userDepartmentId = response.data.department_id;
        console.log(userDepartmentId);
        data.forEach(element => {
            console.log(element);
            if (element.read && !element.update) {
                console.log(element.read);
                //calling the function for the user 
                getIssueDataForUser();
            }
            else if (element.read && element.update && element.delete) {
                //calling the function for admin
                getIssueDataForAdmin(userDepartmentId);
            }

        });


    })
        .catch((e) => {
            console.error(e);
        })
}



//function to add comment on issue
function addcomment() {
    outerdivsource.innerHTML = "";
    textArea = document.createElement("textarea");
    let addBtn = document.createElement("button");
    addBtn.innerHTML = "Add";
    addBtn.addEventListener("click", storeComment)
    outerdivsource.appendChild(textArea);
    outerdivsource.appendChild(addBtn);
}
let today = new Date();
let currentdate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
//this function will store the comments in database
function storeComment() {
    console.log(currentdate);
    let comment = textArea.value;
    let commentData = {
        issueId: issueId,
        commentDate: currentdate,
        comment: comment,
        userId: aurthorizationToken,
    }
    fetch(fetchUrl + "ticketUpdate/storeComment", {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Aurthorization": aurthorizationToken,
        }
    }).then(async (result) => {
        let response = await result.json();
        let data = response.data;

        if (data == "inserted") {
            ticketUpdationWarning.innerHTML = "Comment Added";
            ticketUpdationWarning.style.display = "block";
        }
    })
        .catch((e) => {
            console.error(e);
        })

}
let userComment = document.createElement("p");
let userWhoCommented = document.createElement("h6");
let commentDate = document.createElement("h6");

//function to get the comments from database and to show
function seeComment() {



    let Usercomments = ""
    let commentOfuser = ""

    let getCommentOfIssue = {
        issueId: issueId
    }
    fetch(fetchUrl + "ticketUpdate/fetchComment", {
        method: "POST",
        body: JSON.stringify(getCommentOfIssue),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Aurthorization": aurthorizationToken,
        }
    }).then(async (result) => {
        let response = await result.json();
        let data = response.data;
        outerdivsource.innerHTML = "";
        if (data == "null") {
            Usercomments = "No comments";
            outerdivsource.appendChild(userComment);
        }
        else {
            data.forEach(element => {
                Usercomments = element.comment_data;
                commentOfuser = element.user_name;
                commentDate.innerHTML = element.date_time;

                outerdivsource.appendChild(userComment);
                outerdivsource.appendChild(userWhoCommented);
                outerdivsource.appendChild(commentDate);
            })
        }
        userComment.innerHTML = Usercomments;
        userWhoCommented.innerHTML = commentOfuser;
    })
        .catch((e) => {
            console.error(e);
        })
}
//function to show the history of update
function seeHistory() {
    let getUpdateHistory = {
        issueId: issueId
    }
    fetch(fetchUrl + "ticketUpdate/fetchUpdateHistory", {
        method: "POST",
        body: JSON.stringify(getUpdateHistory),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Aurthorization": aurthorizationToken,
        }
    }).then(async (result) => {
        let response = await result.json();
        let data = response.data;
        outerdivsource.innerHTML = "";
        if (data == null) {
            let historyData = document.createElement("p");
            historyData.innerHTML = "No Update History";
            outerdivsource.appendChild(historyData);
        }
        else {
            console.log("done");


            console.log(data);

            let updation_msg;
            data.forEach(element => {

                updation_msg = document.createElement("h6");

                updation_msg.innerHTML = `Updated by ${element.update_by} from ${element.update_from} to ${element.update_to} ${element.update_time}`;


                outerdivsource.appendChild(updation_msg);



            })

        }
    })
        .catch((e) => {
            console.error(e);
        })
}

//function to get data for admins 
function getIssueDataForAdmin(userDepartmentId) {
    let label = document.createElement("label");
    let status = document.createElement("select");
    status.style.marginLeft = "2%";
    let oldStatus, oldStatus_title;

    // console.log(element.update);
    let data = {
        id: issueId
    }
    fetch(fetchUrl + "ticketUpdate/getIssueDataForAdmin", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Aurthorization": aurthorizationToken,
        }
    }).then(async (result) => {
        let response = await result.json();
        let data = response.data;
        // console.log(data[1]);
        data[0].forEach(element => {
            if (userDepartmentId != element.departmentId) {
                subject.innerHTML = element.subject;
                priority.innerHTML = element.priority_title;
                assignedTo.innerHTML = element.assigned_to;
                createdDate.innerHTML = element.created_date;
                description.innerHTML = element.description;
                createdBy.innerHTML = element.created_by;
                oldStatus = element.status;
                let statusP = document.createElement("span");
                statusP.setAttribute("class", "demo");
                statusP.innerHTML = element.status_title;
                label.innerHTML = "Status :";
                label.appendChild(statusP);
                issueData.appendChild(label);
            }
            else {
                updateBtn.classList.remove("hide");
                deleteBtn.classList.remove("hide");
                viewImage.classList.remove("hide");
                data[0].forEach(element => {
                    console.log(element);
                    subject.innerHTML = element.subject;
                    priority.innerHTML = element.priority_title;
                    assignedTo.innerHTML = element.assigned_to;
                    createdDate.innerHTML = element.created_date;
                    description.innerHTML = element.description;
                    createdBy.innerHTML = element.created_by;
                    oldStatus = element.status
                    oldStatus_title = element.status_title;

                });
                label.innerHTML = "Status :";
                data[1].forEach(element => {
                    console.log(element.title);
                    let statusOption = document.createElement("option");
                    statusOption.innerHTML = element.title;
                    statusOption.setAttribute("value", element.id);
                    if (element.title == oldStatus_title) {
                        status.value = element.title;
                        status.prepend(statusOption);
                    }
                    else status.appendChild(statusOption);
                    label.appendChild(status);
                    issueData.appendChild(label);

                })
                viewImage.addEventListener("click", viewImagee)
                updateBtn.addEventListener("click", updateIssueStatus)
                deleteBtn.addEventListener("click", deleteIssue)
                let imageNotFound = document.createElement("p");
                let image = document.createElement("img");
                function viewImagee() {
                    outerdivsource.innerHTML = "";
                    image.style.maxWidth = "30%";
                    image.style.maxHeight = "50%";
                    data[0].forEach(element => {
                        if (element.imageUrl == null) {
                            imageNotFound.innerHTML = "no image found";
                            outerdivsource.appendChild(imageNotFound);
                        }
                        else image.src = element.imageUrl;
                    })
                    outerdivsource.appendChild(image);
                }

                function updateIssueStatus() {
                    console.log("gjhjk");
                    let updateData = {
                        id: issueId,
                        status: status.value,
                    }
                    fetch(fetchUrl + "ticketUpdate/updateIssueStatus", {
                        method: "POST",
                        body: JSON.stringify(updateData),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                            "Aurthorization": aurthorizationToken,
                        }
                    }).then(async (result) => {
                        let response = await result.json();
                        let data = response.data;
                        if (data == "update") {
                            ticketUpdationWarning.innerHTML = "Updated Succesfully";
                            ticketUpdationWarning.style.display = "block";
                        }
                        console.log(oldStatus);
                        let updateHistory = {
                            issueId: issueId,
                            user: aurthorizationToken,
                            dateTimeOfUpdation: dateTime,
                            updateFrom: oldStatus,
                            updateTo: status.value
                        }

                        fetch(fetchUrl + "ticketUpdate/storeUpdateHistory", {
                            method: "POST",
                            body: JSON.stringify(updateHistory),
                            headers: {
                                "Content-type": "application/json; charset=UTF-8",
                                "Aurthorization": aurthorizationToken,
                            }
                        }).then(async (result) => {
                            let response = await result.json();
                            let data = response.data;

                            if (data == "stored") console.log("history stored");
                        })
                            .catch((e) => {
                                console.error(e);
                            })

                    })
                        .catch((e) => {
                            console.error(e);
                        })
                }
                function deleteIssue() {

                    swal({
                        title: "Are you sure?",
                        text: "Once deleted, you will not be able to recover this issue ticket!",
                        icon: "warning",
                        buttons: {
                            cancel: "cancel",
                            ok: {
                                text: "confirm",
                            }
                        },
                        dangerMode: true,
                    })
                        .then((willDelete) => {
                            if (willDelete) {
                                let deleteIssue = {
                                    id: issueId
                                }
                                fetch(fetchUrl + "ticketUpdate/deleteIssue", {
                                    method: "POST",
                                    body: JSON.stringify(deleteIssue),
                                    headers: {
                                        "Content-type": "application/json; charset=UTF-8",
                                        "Aurthorization": aurthorizationToken,
                                    }
                                }).then(async (result) => {
                                    let response = await result.json();
                                    let data = response.data;

                                    if (data == "deleted") {
                                        swal("Poof! Your issue ticket has been deleted!", {
                                            icon: "success",
                                        }).then(()=>{
                                            window.location.href = "./index.html";
                                        })
                                    }
                                })
                                    .catch((e) => {
                                        console.error(e);
                                    })

                            } else {
                                swal("Your issue ticket is safe!");
                            }
                        });

                }

            }
        })


    })
        .catch((e) => {
            console.error(e);
        })
}

//function to get the data for user
function getIssueDataForUser() {
    let label = document.createElement("label");
    let status = document.createElement("span");

    let data = {
        id: issueId
    }
    fetch(fetchUrl + "ticketUpdate/getIssueDataForUser", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Aurthorization": aurthorizationToken,
        }
    }).then(async (result) => {
        let response = await result.json();
        let data = response.data;
        data.forEach(element => {
            console.log(element);
            subject.innerHTML = element.subject;
            priority.innerHTML = element.priority_title;
            assignedTo.innerHTML = element.assigned_to;
            createdDate.innerHTML = element.created_date;
            description.innerHTML = element.description;
            createdBy.innerHTML = element.created_by;
            label.innerHTML = "Status :";
            status.innerHTML = element.status_title
            status.setAttribute("class", "demo");
            label.appendChild(status);
            issueData.appendChild(label);

        });


    })
        .catch((e) => {
            console.error(e);
        })
}