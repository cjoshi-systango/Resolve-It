const express = require("express"); 
const issuePortalrouter = express.Router();
const issuePortalController = require("../controllers/issuePortal");
const auth = require("../middware/auth");

console.log("juhhol");
issuePortalrouter.post("/departmentDetails",auth,(req,res)=>{
    
    let {id} = req.body
    issuePortalController.fetchdepartmentDetails(req,res,id);
});


issuePortalrouter.post("/status",auth,(req,res)=>{
    console.log("jbhjkj");
    issuePortalController.fetchStatus(req,res);
   
});


issuePortalrouter.post("/priority",auth,(req,res)=>{
    issuePortalController.fetchPriority(req,res);
});

issuePortalrouter.post("/assignTo",auth,(req,res)=>{

    console.log("bnjb");
    let {Department} = req.body;
    issuePortalController.fetchAssignee(Department,req,res);
})

issuePortalrouter.post("/createIssue",auth,(req,res)=>{

    console.log(req.body);
    let {Subject,Decription,Department,Status,Priority,CreatedDate,AssignTo,CreatedBy,ImageUrl} = req.body;
    issuePortalController.storeIssueData(Subject,Decription,Department,Status,Priority,CreatedDate,AssignTo,CreatedBy,ImageUrl,req,res);
})


module.exports = issuePortalrouter 