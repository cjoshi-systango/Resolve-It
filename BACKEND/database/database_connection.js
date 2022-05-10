mysql = require("mysql");
require('dotenv').config()

const connection = mysql.createConnection({
    host: "sql205.epizy.com",
    user: "epiz_31694482",
    password: 'chetan1565' ,
    database : "epiz_31694482_resolveIt",
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