const express = require("express"); 
const changePasswordrouter = express.Router();
const changePasswordController = require("../controllers/changePassword");
const auth = require("../middware/auth");

changePasswordrouter.post("/passwordChange",auth,(req,res)=>{
   
    let {oldPassword,newPassword,user} = req.body;
    changePasswordController.changePassword(req,res,oldPassword,newPassword,user);
});




module.exports = changePasswordrouter