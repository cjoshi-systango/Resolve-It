//fetch url to run on port 
import {fetchUrl} from "../JS/config.js";

// let fetchUrl 

// import * as fetchurl from './config.js'
// setTimeout(() => {
//     console.log(Object.values(fetchurl) );
//     fetchUrl = Object.values(fetchurl)
// }, 1000);
// console.log(fetchurl);


// let fetchUrl = "http://localhost:4000/";

//declration of valriables 
let oldPassword,newPassword 
let changePasswordBtn = document.querySelector("#changePassword");
let changePasswordWarning = document.querySelector("#changePasswordWarning");

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
        if(data == "changed")
        {
            changePasswordWarning.innerHTML = "Changed Sucessfully";
            changePasswordWarning.style.display = "block"; 
        }
        else if(data == "passwordWrong")
        {
            changePasswordWarning.innerHTML = "Password is wrong"
            changePasswordWarning.style.display = "block";   
        }
        else if(data == "error")
        {
            changePasswordWarning.innerHTML = "Some Error Occured";
            changePasswordWarning.style.display = "block"; 
        }
    })
        .catch((e) => {
            console.error(e);
        })
}

