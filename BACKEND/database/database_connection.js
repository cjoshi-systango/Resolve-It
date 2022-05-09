mysql = require("mysql");
require('dotenv').config()

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASS ,
    database : "resolveIt",
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