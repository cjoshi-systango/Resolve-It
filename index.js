require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path")
const http = require("http");
const server = http.createServer(app);
const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require('fs')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerJson = require('./swagger.json');

// const swaggerOpsion = {
//     definition:

// }


app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerJson));

// let obj = {
//     table : []
// };


const PORT = process.env.PORT || 4001

// obj.table.push({port:PORT})
// let jsoon = JSON.stringify(obj);
// fs.writeFile('./FRONTEND/PortJson',jsoon,'utf-8',(err,result)=>{
//     if(err) console.log(err);
//     else console.log("saved");
// })


app.use(express.static(path.join(__dirname, '/FRONTEND'))); 
// console.log(path.join(__dirname, 'FRONTEND'));
app.set('views', __dirname + '/FRONTEND/HTML');
// app.engine('html', require('ejs').renderFile);
// app.engine('css', require('ejs').renderFile);


app.get("/",(req,res)=>{
    console.log("gettt");
    res.sendFile(path.join(__dirname, "./FRONTEND/HTML/login.html"))
    // res.sendFile(path.join(__dirname, "./FRONTEND/JS/login.js"))
        
})

// app.get("/index",(req,res)=>{
//     console.log("gettt");
//     res.render("index.html")
// })

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
// const swaggerJSDoc = require("swagger-jsdoc");

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

