mysql = require("mysql");
require('dotenv').config()

const connection = mysql.createConnection({
    host: "sql11.freesqldatabase.com",
    user: "sql11491580",
    password: 'RX24ezevq9' ,
    database : "sql11491580",
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