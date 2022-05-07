let login = document.querySelector("#login");
let email,password;


login.addEventListener("click",logIn);

// localStorage.setItem("Aurthorization","");

function logIn()
{
    email = document.querySelector("#InputEmail1").value;
    password = document.querySelector("#InputPassword1").value;
    if(email == "")
    {
        console.log("please enter valid email");
    }
    else if(password == "")
    {
        console.log("please enter password");
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