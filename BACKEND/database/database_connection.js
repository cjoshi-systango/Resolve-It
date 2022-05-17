mysql = require("mysql");
require('dotenv').config()

const connection = mysql.createConnection({
    host: "sql4.freemysqlhosting.net",
    user: "sql4492968",
    password: 'm9Yc5Iwf9j' ,
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