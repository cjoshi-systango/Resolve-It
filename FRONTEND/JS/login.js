let login = document.querySelector("#login");
let email,password;

let loginNameWarning = document.querySelector("#loginNameWarning");

login.addEventListener("click",logIn);

// localStorage.setItem("Aurthorization","");

function logIn(e)
{
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
        fetch("http://localhost:4000/login/loginroutes/", {
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
                alert("userExist");
                location.href = "../HTML/index1.html"
            }
            else if(data == "noUserFound")
            {
                alert("User email or passwor is wrong");
            }
            console.log(result.json());
        })
            .catch((e) => {
                console.error(e);
            })
    }
    
    
}