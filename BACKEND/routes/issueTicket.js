const express = require("express"); 
const issueTicketrouter = express.Router();
const issueTicketController = require("../controllers/issueTicket");
const auth = require("../middware/auth");


issueTicketrouter.get("/showTicket",auth,(req,res)=>{
    
    console.log("ticket");
    issueTicketController.showTicket(req,res);
     
});

module.exports = issueTicketrouter