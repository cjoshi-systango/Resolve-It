const express = require("express"); 
const ticketUpdationrouter = express.Router();
const ticketUpdationController = require("../controllers/ticketUpdation");
const auth = require("../middware/auth");

ticketUpdationrouter.post("/getUserType",auth,(req,res)=>{
    
   
    let {user} = req.body
    ticketUpdationController.getUserType(req,res,user);
    
   
});
ticketUpdationrouter.post("/getIssueDataForUser",auth,(req,res)=>{
    
    // console.log(req.body);
    let {id} = req.body
    ticketUpdationController.getIssueDataForUser(req,res,id);
    
   
});

ticketUpdationrouter.post("/getIssueDataForAdmin",auth,(req,res)=>{
    
    console.log(req.body);
    let {id} = req.body
    ticketUpdationController.getIssueDataForAdmin(req,res,id);
    
   
});

ticketUpdationrouter.post("/updateIssueStatus",auth,(req,res)=>{
    
    console.log("inside update");
    console.log(req.body);
    let {id,status} = req.body
    ticketUpdationController.updateIssueStatus(req,res,id,status);
    
   
});

ticketUpdationrouter.post("/deleteIssue",auth,(req,res)=>{
    
    console.log("inside delete");
    console.log(req.body);
    let {id} = req.body
    ticketUpdationController.deleteIssue(req,res,id);
    
});

ticketUpdationrouter.post("/storeComment",auth,(req,res)=>{
    
    console.log("inside comment");
    console.log(req.body);
    let {issueId , commentDate , comment, userId} = req.body
    ticketUpdationController.storeComment(req,res,issueId ,commentDate ,comment , userId);
    
   
});

ticketUpdationrouter.post("/fetchComment",auth,(req,res)=>{
    
    console.log("inside comment");
    console.log(req.body);
    let {issueId} = req.body
    ticketUpdationController.getComment(req,res,issueId);
    
   
});

ticketUpdationrouter.post("/storeUpdateHistory",auth,(req,res)=>{
    
    console.log("inside comment");
    console.log(req.body);
    let {issueId,user,dateTimeOfUpdation,updateFrom,updateTo} = req.body
    ticketUpdationController.storeUpdateHistory(req,res,issueId,user,dateTimeOfUpdation,updateFrom,updateTo);
    
   
});

ticketUpdationrouter.post("/fetchUpdateHistory",auth,(req,res)=>{
    
    console.log("inside comment");
    console.log(req.body);
    let {issueId} = req.body
    ticketUpdationController.getUpdateHistory(req,res,issueId);
    
   
});

module.exports = ticketUpdationrouter