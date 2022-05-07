const express = require("express"); 
const loginrouter = express.Router();
const loginController = require("../controllers/login");

loginrouter.post("/loginroutes",(req,res)=>{
    console.log(req.body);
    let {Email,Password} = req.body;
    loginController.checkUserCredentials(Email,Password,req,res);
})

module.exports = loginrouter;