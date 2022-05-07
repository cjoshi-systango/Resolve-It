const express = require("express"); 
const createDepartmentrouter = express.Router();
const createDepartmentController = require("../controllers/createDepartment");
const auth = require("../middware/auth");

createDepartmentrouter.post("/departmentCreate",auth,(req,res)=>{
   
    console.log(req.body);
    let {Name} = req.body;
    createDepartmentController.storeDepartmentDetails(req,res,Name);
   
});







module.exports = createDepartmentrouter;