let logoutbtn = document.querySelector("#logoutbtn");

logoutbtn.addEventListener("click",()=>{
    localStorage.clear();
    location.href = "../HTML/login.html";
})

