//fetch url to run on port 
import {fetchUrl} from "../JS/config.js";

// let fetchUrl = "http://localhost:4000/";

//declration of valriables 
let oldPassword,newPassword 
let changePasswordBtn = document.querySelector("#changePassword");

//getting authorization token from local storage for auth/middware
let aurthorizationToken = localStorage.getItem("Aurthorization")

//addding eventlistener on change password button
changePasswordBtn.addEventListener("click",changePassword)


//function to change password in database
function changePassword(e)
{
    e.preventDefault()
    //getting the value from html for old password and new password
    oldPassword = document.querySelector("#inputPasswordOld").value;
    newPassword = document.querySelector("#inputPasswordNew").value;


    //creating the request json
    let changeUserPassword = {
        oldPassword : oldPassword,
        newPassword : newPassword,
        user : aurthorizationToken,
    }

    //getting the response for request
    fetch(fetchUrl+"changePassword/passwordChange", {
        method: "POST",
        body: JSON.stringify(changeUserPassword),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Aurthorization": aurthorizationToken,
        }
    }).then(async (result) => {
        let response = await result.json();
        let data = response.data;
        if(data == "changed") alert("changed");
    })
        .catch((e) => {
            console.error(e);
        })
}

