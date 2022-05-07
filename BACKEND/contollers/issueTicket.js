const connection = require("../database/database_connection");
const jwt = require('jsonwebtoken');
// const { query } = require("express");
require('dotenv').config()


async function showTicket(req, res) {

    let resultArray = []
    const token=req.header('Aurthorization');
    let decoded = jwt.verify(token, process.env.TOKEN_KEY)
    console.log(decoded);


    let queryToShowTicket = `SELECT department.name AS department_name
    , status.title AS status_title
    , priority.title AS priority_title
    , user_info.name AS assigned_to 
    , ui.name AS created_by
    , issue.subject AS subject
    , issue.created_date AS created_date
    , issue.id AS id
    FROM issue JOIN department ON issue.department_id = department.id 
    JOIN status ON issue.status = status.id 
    JOIN priority ON issue.priority = priority.id 
    JOIN user_info ON issue.assign_to = user_info.id
    JOIN user_info AS ui ON issue.created_by = ui.id;`


    await connection.query(queryToShowTicket, (err, result) => {

        if (result.length > 0) {
            resultArray.push(result);
            let queryToGetUserId = `SELECT id FROM user_info WHERE email = "${decoded.user}"`
            connection.query(queryToGetUserId,(err,result)=>{
                if(result.length > 0)
                {
                    result.forEach(element => {
                        let id = element.id;
                        let queryToGetUserType = `SELECT user_type_id FROM user_department_role WHERE user_id = "${id}";`
                        connection.query(queryToGetUserType,(err,result)=>{
                            if(result.length>0)
                            {
                                resultArray.push(result);
                                console.log("---------------------");
                                console.log(resultArray);
                                res.status(200).json({ success: true, data: resultArray });
                            }
                            else
                            {
                                console.log("errrrr");
                            }
                        })
                    });
                }
                else
                {
                    console.log(err);
                }
            })
            
            // result.forEach(element => {
            //     console.log(element.created_by);

            // });
        }
        else {
            console.log("err");
        }
    })
}

module.exports = { showTicket }