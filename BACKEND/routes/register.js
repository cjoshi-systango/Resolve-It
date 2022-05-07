const express = require("express"); 
const router = express.Router();
const registrationController = require("../controllers/registration");

router.post("/register",(req,res)=>{
    console.log(req.body);
    let {  Name , Email , Usertype , Password ,Department} = req.body;
    registrationController.storeUserData( Name, Email, Usertype, Password,Department, req ,res);
});
router.post("/usertype",(req,res)=>{
    console.log("bshjcd");
    registrationController.fetchUserType(req,res);
});

router.get("/department",(req,res)=>{
    console.log("bshjcd");
    registrationController.fetchDepartments(req,res);
});

module.exports = router;