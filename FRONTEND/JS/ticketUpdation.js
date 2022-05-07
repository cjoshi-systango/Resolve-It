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
let textArea;
let history = document.querySelector("#history");

// let dateTime = new Date().toLocaleString();
let latestdate = new Date();
let dateTime = latestdate.getFullYear() + "-0" + (latestdate.getMonth() + 1) + "-" + latestdate.getDate() + " " + latestdate.getHours() + ":" + latestdate.getMinutes() + ":" + latestdate.getSeconds() + "." + latestdate.getMilliseconds();

url = window.location.search;
let label = document.querySelector("#label");
let issueId = url ? url.split('?')[1] : window.location.search.slice(1);
console.log(issueId);
// label.appendChild(issueId);
let aurthorizationToken = localStorage.getItem("Aurthorization");


comments.addEventListener("click", addcomment)
viewComment.addEventListener("click", seeComment);
history.addEventListener("click", seeHistory);


let data = {
    user: aurthorizationToken
}
fetch("http://localhost:4000/ticketUpdate/getUserType", {
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

            getIssueDataForUser();
        }
        else if (element.read && element.update && element.delete) {
            getIssueDataForAdmin(userDepartmentId);
        }

    });


})
    .catch((e) => {
        console.error(e);
    })


function addcomment() {
    textArea = document.createElement("textarea");
    let addBtn = document.createElement("button");
    addBtn.innerHTML = "Add";
    addBtn.addEventListener("click", storeComment)
    fotter.appendChild(textArea);
    fotter.appendChild(addBtn);
}
let today = new Date();
let currentdate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
function storeComment() {
    console.log(currentdate);
    let comment = textArea.value;
    let commentData = {
        issueId: issueId,
        commentDate: currentdate,
        comment: comment,
        userId: aurthorizationToken,
    }

    fetch("http://localhost:4000/ticketUpdate/storeComment", {
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
            alert("insert succesfull");
        }
    })
        .catch((e) => {
            console.error(e);
        })

}
let userComment = document.createElement("p");
let userWhoCommented = document.createElement("h6");
let commentDate = document.createElement("h6");
function seeComment() {



    let Usercomments = ""
    let commentOfuser = ""

    let getCommentOfIssue = {
        issueId: issueId
    }
    fetch("http://localhost:4000/ticketUpdate/fetchComment", {
        method: "POST",
        body: JSON.stringify(getCommentOfIssue),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Aurthorization": aurthorizationToken,
        }
    }).then(async (result) => {
        let response = await result.json();
        let data = response.data;

        if (data == "null") {
            Usercomments = "No comments";
            fotter.appendChild(userComment);
        }
        else {
            data.forEach(element => {
                Usercomments = element.comment_data;
                commentOfuser = element.user_name;
                commentDate.innerHTML = element.date_time;

                fotter.appendChild(userComment);
                fotter.appendChild(userWhoCommented);
                fotter.appendChild(commentDate);
            })
        }
        userComment.innerHTML = Usercomments;
        userWhoCommented.innerHTML = commentOfuser;

        // if (data == "inserted") {
        //     alert("insert succesfull");
        // }
    })
        .catch((e) => {
            console.error(e);
        })
}

function seeHistory() {
    let getUpdateHistory = {
        issueId: issueId
    }
    fetch("http://localhost:4000/ticketUpdate/fetchUpdateHistory", {
        method: "POST",
        body: JSON.stringify(getUpdateHistory),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Aurthorization": aurthorizationToken,
        }
    }).then(async (result) => {
        let response = await result.json();
        let data = response.data;
        if (data == null) {
            let historyData = document.createElement("p");
            historyData.innerHTML = "No Update History";
            fotter.appendChild(historyData);
        }
        else {
            console.log("done");



            data.forEach(element => {
                let updatedBy = document.createElement("h6");
                let updation_time = document.createElement("h6");

                updatedBy.innerHTML = element.update_by;
                updation_time.innerHTML = element.update_time;

                fotter.appendChild(updatedBy);
                fotter.appendChild(updation_time);
            })
        }



        // if (data == "inserted") {
        //     alert("insert succesfull");
        // }
    })
        .catch((e) => {
            console.error(e);
        })
}


function getIssueDataForAdmin(userDepartmentId) {
    let label = document.createElement("label");
    let status = document.createElement("select");
    let oldStatus;

    // console.log(element.update);
    let data = {
        id: issueId
    }
    fetch("http://localhost:4000/ticketUpdate/getIssueDataForAdmin", {
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


                });
                label.innerHTML = "Status :";
                data[1].forEach(element => {
                    console.log(element.title);
                    let statusOption = document.createElement("option");
                    statusOption.innerHTML = element.title;
                    statusOption.setAttribute("value", element.id);
                    status.appendChild(statusOption);
                    label.appendChild(status);
                    issueData.appendChild(label);

                })
                viewImage.addEventListener("click", viewImagee)
                updateBtn.addEventListener("click", updateIssueStatus)
                deleteBtn.addEventListener("click", deleteIssue)

                function viewImagee() {
                    console.log("llllllllll");
                    let image = document.createElement("img");
                    data[0].forEach(element => {
                        if (element.imageUrl == null) image.alt = "no image found";
                        else image.src = element.imageUrl;
                    })
                    fotter.appendChild(image);
                }

                function updateIssueStatus() {
                    console.log("gjhjk");
                    let updateData = {
                        id: issueId,
                        status: status.value,
                    }
                    fetch("http://localhost:4000/ticketUpdate/updateIssueStatus", {
                        method: "POST",
                        body: JSON.stringify(updateData),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                            "Aurthorization": aurthorizationToken,
                        }
                    }).then(async (result) => {
                        let response = await result.json();
                        let data = response.data;
                        if (data == "update") alert("update");
                        console.log(oldStatus);
                        let updateHistory = {
                            issueId: issueId,
                            user: aurthorizationToken,
                            dateTimeOfUpdation: dateTime,
                            updateFrom: oldStatus,
                            updateTo: status.value
                        }

                        fetch("http://localhost:4000/ticketUpdate/storeUpdateHistory", {
                            method: "POST",
                            body: JSON.stringify(updateHistory),
                            headers: {
                                "Content-type": "application/json; charset=UTF-8",
                                "Aurthorization": aurthorizationToken,
                            }
                        }).then(async (result) => {
                            let response = await result.json();
                            let data = response.data;

                            if (data == "stored") alert("history stored");
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
                    let deleteIssue = {
                        id: issueId
                    }
                    fetch("http://localhost:4000/ticketUpdate/deleteIssue", {
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
                            alert("delete succesfull");
                        }
                    })
                        .catch((e) => {
                            console.error(e);
                        })
                }

            }
        })


    })
        .catch((e) => {
            console.error(e);
        })
}


function getIssueDataForUser() {
    let label = document.createElement("label");
    let status = document.createElement("span");

    let data = {
        id: issueId
    }
    fetch("http://localhost:4000/ticketUpdate/getIssueDataForUser", {
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
            status.setAttribute("class","demo");
            label.appendChild(status);
            issueData.appendChild(label);

        });


    })
        .catch((e) => {
            console.error(e);
        })
}