const express = require("express"); 
const chatBoatrouter = express.Router();
const chatBoatController = require("../controllers/chatBoat");
const auth = require("../middware/auth");


chatBoatrouter.get("/getStarted",auth,(req,res)=>{
   
    chatBoatController.getStarted(req,res);
});

chatBoatrouter.post("/nextQuestion",auth,(req,res)=>{
   
    console.log(req.body); 
    let {optionId,qId,user,dateTime} = req.body;
    chatBoatController.nextQuestion(req,res,optionId,qId,user,dateTime);
});

chatBoatrouter.post("/userIssue",auth,(req,res)=>{
   
    let{id,user} = req.body
    chatBoatController.checkUserIssue(req,res,id,user);
});

chatBoatrouter.get("/getStartedForIssue",auth,(req,res)=>{
   
    chatBoatController.getStartedForIssue(req,res);
});










module.exports = chatBoatrouter;