const connection = require("../database/database_connection");
const jwt = require('jsonwebtoken');
const e = require("cors");
require('dotenv').config()

async function fetchdepartmentDetails(req, res) {
    let departmentObject = [];
    console.log("inside function ---------------------");
    let queryToGetAllDepartment = `SELECT id,name FROM department`

    connection.query(queryToGetAllDepartment, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).json({ success: false, error: err });
        }
        else {

            console.log(result.length + "bxshb");
            result.forEach(element => {
                let key, value;

                key = element.name;
                // console.log(key + "hjgkui");
                value = element.id
                departmentObject.push({
                    [key]: value,
                })

            })

        }
        console.log(departmentObject);
        res.status(200).json({ success: true, data: departmentObject });
    })

}

function fetchStatus(req, res) {
    let statusObject = [];
    console.log("inside function ---------------------");
    let queryToGetAllStatus = `SELECT id,title FROM status`

    connection.query(queryToGetAllStatus, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).json({ success: false, error: err });
        }
        else {

            // console.log(result.length + "bxshb");
            result.forEach(element => {
                let key, value;

                key = element.title;
                // console.log(key + "hjgkui");
                value = element.id
                statusObject.push({
                    [key]: value,
                })

            })

        }
        console.log(statusObject);
        res.status(200).json({ success: true, data: statusObject });
    })

}

function fetchPriority(req, res) {
    let priorityObject = [];
    console.log("inside function");
    let queryToGetAllpriority = `SELECT id,title FROM priority`

    connection.query(queryToGetAllpriority, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).json({ success: false, error: err });
        }
        else {

            // console.log(result.length + "bxshb");
            result.forEach(element => {
                let key, value;

                key = element.title;
                // console.log(key + "hjgkui");
                value = element.id
                priorityObject.push({
                    [key]: value,
                })

            })

        }
        console.log(priorityObject);
        res.status(200).json({ success: true, data: priorityObject });
    })

}

async function fetchAssignee(Department, req, res) {
    let assigneeObject = [];
    console.log("inside function");
    let queryToGetUserId = `SELECT user_id FROM user_department_role WHERE department_id = "${Department}" AND user_type_id = "${1}"`

    connection.query(queryToGetUserId, async (err, result) => {
        if (result.length > 0) {
            console.log(result);
            // console.log(err);
            // console.log(result.length + "bxshb");
            let length = result.length;
            let el = 0;
            await result.forEach((element) => {
                let key, value;
                console.log("every");
                key = element.user_id;
                console.log(element);
                let queryToGetUsernameFromId = `SELECT name,id FROM user_info WHERE id = "${key}"`
                connection.query(queryToGetUsernameFromId, (err, result) => {

                    if (result.length > 0) {
                        el += 1
                        console.log(result.length);
                        assigneeObject.push(result)
                        console.log(assigneeObject + "jjj");
                        // res.status(200).json({ success: true, data: assigneeObject });

                        // let value = Object.values(assigneeObject);
                        // console.log( Object.values(assigneeObject));
                        // value.forEach(element=>{
                        //     console.log(element.name);
                        // })

                        // if(element >10) return false;


                    }

                    else {
                        console.log("oooooooooooo");
                        console.log(err);
                        res.status(400).json({ success: false, error: err });

                        // break;
                        // result.forEach(element => {
                        //     let key,value;

                        //     key = element.name;
                        //     // console.log(key + "hjgkui");
                        //     value = element.id
                        //     assigneeObject.push({
                        //         [key] :  value,
                        //     })
                        //     console.log(assigneeObject);
                        //     
                        // })

                    }
                    console.log(length + "lrn");
                    console.log(el)

                    if (el == length) {
                        console.log('line 173');
                        console.log(assigneeObject);
                        res.status(200).json({ success: true, data: assigneeObject });
                        return false;
                    }

                    console.log(assigneeObject.length);

                })
                // status=true;

            })

        }
        else {
            console.log(err);
            res.status(400).json({ success: false, error: err });

        }
        //     console.log(priorityObject);
        //    res.status(200).json({success:true , data : priorityObject });
    })




}

function storeIssueData(Subject, Decription, Department, Status, Priority, CreatedDate, AssignTo, CreatedBy,ImageUrl, req, res) {
    console.log(CreatedBy);
    let decoded = jwt.verify(CreatedBy, process.env.TOKEN_KEY)
    console.log(decoded.user);
    let queryToGetIdOfUser = `SELECT id FROM user_info WHERE email = "${decoded.user}";`;

    connection.query(queryToGetIdOfUser, (err, result) => {
        if (result.length > 0) {
            // let creater
            console.log(result);
            result.forEach(element => {
                let creater = element.id
                let queryToInsertIssueData = `INSERT INTO issue (subject, description, department_id, status , priority, created_date,assign_to,created_by,image_url) VALUES  ( "${Subject}", "${Decription}", "${Department}" , "${Status}","${Priority}","${CreatedDate}","${AssignTo}","${creater}","${ImageUrl}");`;

                connection.query(queryToInsertIssueData, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("data stored");
                        res.status(200).json({ success: true, data: "issueCreated" });
                    }
                })
            });

        }
        else {

            res.status(400).json({ success: false, data: err });

        }
    })
}

module.exports = { fetchdepartmentDetails, fetchStatus, fetchPriority, fetchAssignee, storeIssueData }