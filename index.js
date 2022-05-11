require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const bodyParser = require("body-parser");
const cors = require('cors');

const PORT = process.env.PORT || 4000

app.get("",(req,res)=>{
    console.log("gettt");
    res.render("./index.html")
})

server.listen(PORT,()=>{
    console.log("Server listen "+PORT);

})
app.use(bodyParser.json());
 
const registerRouter = require("./BACKEND/routes/register")
const loginRouter = require("./BACKEND/routes/loginRoutes")
const issuePortalRouter = require("./BACKEND/routes/issueCreate")
const issueTicketRouter = require("./BACKEND/routes/issueTicket")
const ticketUpdationRouter = require("./BACKEND/routes/ticketUpdation")
const changePasswordRouter = require("./BACKEND/routes/changePassword"); 
const chatBoatRouter = require("./BACKEND/routes/chatBoat")
const createDepartment = require("./BACKEND/routes/createDepartment");

app.use(cors());
app.use("/login",loginRouter);
app.use("/registration",registerRouter);
app.use("/issuePortal",issuePortalRouter);
app.use("/issueTicket",issueTicketRouter);
app.use("/ticketUpdate",ticketUpdationRouter);
app.use("/changePassword",changePasswordRouter);
app.use("/chatBoat",chatBoatRouter);
app.use("/createDepartment",createDepartment);
// app.use(express.static())
