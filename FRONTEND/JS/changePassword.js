let oldPassword,newPassword 
let changePasswordBtn = document.querySelector("#changePassword");

let aurthorizationToken = localStorage.getItem("Aurthorization")

changePasswordBtn.addEventListener("click",changePassword)

function changePassword()
{
    oldPassword = document.querySelector("#inputPasswordOld").value;
    newPassword = document.querySelector("#inputPasswordNew").value;

    let changeUserPassword = {
        oldPassword : oldPassword,
        newPassword : newPassword,
        user : aurthorizationToken,
    }
    fetch("http://localhost:4000/changePassword/passwordChange", {
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

