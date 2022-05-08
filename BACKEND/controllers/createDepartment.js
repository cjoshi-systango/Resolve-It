const connection = require("../database/database_connection");


function storeDepartmentDetails(req,res,Name)
{
    let queryToStoreDepartment = `INSERT INTO department(name) VALUES ("${Name}");`
    console.log(Name);
    connection.query(queryToStoreDepartment,(err,result)=>{
        if(err)
        {
            console.log(err);

        }
        else
        {
            console.log(result);
            res.status(200).json({ success: true, data: "inserted" });

        }
    })
}

module.exports = {storeDepartmentDetails};