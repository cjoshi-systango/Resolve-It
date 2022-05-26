mysql = require("mysql");
require('dotenv').config()

const connection = mysql.createConnection({
    host: "sql4.freemysqlhosting.net",
    user: "sql4492968",
    password: process.env.DB_PASS ,
    database : "sql4492968",
    multipleStatements: true,
})
// console.log("bjusc");

connection.connect((err,result)=>{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("sql connected");
    }
})
module.exports = connection;