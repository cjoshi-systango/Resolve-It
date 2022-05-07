// require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const bodyParser = require("body-parser");
const cors = require('cors');


server.listen(4000,()=>{
    console.log("Server listen 4001");

})
app.use(bodyParser.json());
 
const registerRouter = require("./routes/register")
const loginRouter = require("./routes/loginRoutes")
const issuePortalRouter = require("./routes/issueCreate")
const issueTicketRouter = require("./routes/issueTicket")
const ticketUpdationRouter = require("./routes/ticketUpdation")
const changePasswordRouter = require("./routes/changePassword"); 
const chatBoatRouter = require("./routes/chatBoat")
const createDepartment = require("./routes/createDepartment");

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
