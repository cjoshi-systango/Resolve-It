const express = require("express"); 
const chatBoatrouter = express.Router();
const chatBoatController = require("../controllers/chatBoat");
const auth = require("../middware/auth");


chatBoatrouter.get("/getStarted",auth,(req,res)=>{
   
    chatBoatController.getStarted(req,res);
});

chatBoatrouter.post("/nextQuestion",auth,(req,res)=>{
   
    console.log(req.body); 
    let {optionId,dateTime,user} = req.body;
    chatBoatController.nextQuestion(req,res,optionId,dateTime,user);
});












module.exports = chatBoatrouter;