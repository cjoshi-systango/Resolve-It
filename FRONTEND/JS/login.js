//fetch url to run the port on
import {fetchUrl} from "../JS/config.js";

//getting and declaring the required variable
let login = document.querySelector("#login");
let email,password;
let loginNameWarning = document.querySelector("#loginNameWarning");
let loginForm = document.querySelector("#loginForm");





//adding the event listener on log in btn
login.addEventListener("click",logIn);
loginForm.addEventListener("click" ,removeWarning)

function removeWarning()
{
    setTimeout(() => {
    loginNameWarning.style.display = "none";
    }, 2000);
}

//function to check the user login credentials and if find ok log in the user
function logIn(e)
{
    console.log(fetchUrl);
    e.preventDefault()
    email = document.querySelector("#InputEmail1").value;
    password = document.querySelector("#InputPassword1").value;
    if(email == "")
    {
       loginNameWarning.innerHTML = "please enter valid email";
       loginNameWarning.style.display = "block";

    }
    else if(password == "")
    {
        loginNameWarning.innerHTML = "please enter password";
        loginNameWarning.style.display = "block";
    }
    else{
        let data = {
            Email : email,
            Password : password,
        }
        //this will check the user credentials and log in 
        fetch(fetchUrl+"login/loginroutes/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(async (result) => {
            let response = await result.json();
            let data = response.data;
            console.log(data.user);
            if (data.user == email) {
                console.log(data.token);
                localStorage.setItem("Aurthorization",data.token);
                loginNameWarning.innerHTML = "Welcome!!";
                loginNameWarning.style.display = "block";

                location.href = "HTML/index.html"
            }
            else if(data == "noUserFound")
            {
                loginNameWarning.innerHTML = "User email or password is wrong";
                loginNameWarning.style.display = "block";
            }
            console.log(result.json());
        })
            .catch((e) => {
                console.error(e);
            })
    }
    
    
}