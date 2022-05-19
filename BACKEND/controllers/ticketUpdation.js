const connection = require("../database/database_connection");
const jwt = require('jsonwebtoken');
const { query } = require("express");
require('dotenv').config()

const moment = require('moment');

function getUserType(req, res, user) {
    let decoded = jwt.verify(user, process.env.TOKEN_KEY)
    let queryToGetUser = `SELECT id FROM user_info where email = "${decoded.user}"`
    connection.query(queryToGetUser, (err, result) => {
        if (result.length > 0) {
            console.log(result);
            result.forEach(element => {
                console.log(element.id)
                let queryToGetUserType = `SELECT user_type_id,department_id FROM user_department_role WHERE user_id = "${element.id}";`
                connection.query(queryToGetUserType, (err, result) => {
                    if (result.length > 0) {
                        result.forEach(element => {
                            let department_id = element.department_id;
                            console.log(element.user_type_id);
                            let queryToGetUserPermissions = `SELECT user_type.read,user_type.update,user_type.delete FROM user_type WHERE user_type.id = ${element.user_type_id};`
                            connection.query(queryToGetUserPermissions, (err, result) => {
                                console.log(result);
                                if (result.length > 0) {
                                    console.log(result)
                                    res.status(200).json({ success: true, data: { result, department_id } });
                                }
                                else {
                                    console.log(err);
                                    res.status(400).json({ success: false, data: err });

                                }
                            })
                            
                        })

                    }
                    else {
                        console.log("err");
                        res.status(400).json({ success: false, data: err });

                    }
                })
            });

        }
        else {
            console.log("err");
            res.status(400).json({ success: false, data: err });

        }
    })
}

async function getIssueDataForUser(req, res, id) {
    console.log("-----------------------");
    console.log(id);
    let queryToGetIssueData = `SELECT department.name AS department_name
    , status.title AS status_title
    , priority.title AS priority_title
    , user_info.name AS assigned_to 
    , ui.name AS created_by
    , issue.subject AS subject
    , issue.created_date AS created_date
    , issue.description AS description
    FROM issue JOIN department ON issue.department_id = department.id 
    JOIN status ON issue.status = status.id 
    JOIN priority ON issue.priority = priority.id 
    JOIN user_info ON issue.assign_to = user_info.id
    JOIN user_info AS ui ON issue.created_by = ui.id
    WHERE issue.id = "${id}";`


    await connection.query(queryToGetIssueData, (err, result) => {

        if (result.length > 0) {
            console.log(result);
            res.status(200).json({ success: true, data: result });
            // result.forEach(element => {
            //     console.log(element.created_by);

            // });
        }
        else {
            console.log(err);
            res.status(400).json({ success: false, data: err });

        }
    })
}

function getIssueDataForAdmin(req, res, id) {
    console.log("-----------------------");
    console.log(id);
    let queryToGetIssueData = `SELECT department.name AS department_name
    , issue.status AS status
    , priority.title AS priority_title
    , user_info.name AS assigned_to 
    , ui.name AS created_by
    , issue.subject AS subject
    , issue.created_date AS created_date
    , issue.description AS description
    , issue.image_url AS imageUrl
    , issue.department_id AS departmentId
    , status.title AS status_title
    FROM issue JOIN department ON issue.department_id = department.id 
    JOIN status ON issue.status = status.id 
    JOIN priority ON issue.priority = priority.id 
    JOIN user_info ON issue.assign_to = user_info.id
    JOIN user_info AS ui ON issue.created_by = ui.id
    WHERE issue.id = "${id}";
    SELECT title,id FROM status;`


    connection.query(queryToGetIssueData, (err, result) => {
        console.log(result);
        console.log(err);
        if (result.length > 0) {
            console.log(result[1] + "kkkkkkk");
            res.status(200).json({ success: true, data: result });
            // result.forEach(element => {
            //     console.log(element.created_by);

            // });
        }
        else {
            console.log(err);
            res.status(400).json({ success: false, data: err });

        }
    })
}

async function updateIssueStatus(req, res, id, status) {
    let queryToUpdateStatus = `UPDATE issue SET status = "${status}" WHERE id = "${id}";`

    connection.query(queryToUpdateStatus, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).json({ success: false, data: err });

        }
        else {

            res.status(200).json({ success: true, data: "update" });

        }
    })
}

async function deleteIssue(req, res, id) {
    let queryToDelete = `DELETE FROM issue WHERE id = "${id}";`

    connection.query(queryToDelete, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).json({ success: false, data: err });

        }
        else {
            console.log("deleted");
            res.status(200).json({ success: true, data: "deleted" });
        }
    })
}

function storeComment(req, res, issueId, commentDate, comment, userId) {

    let decoded = jwt.verify(userId, process.env.TOKEN_KEY)
    let queryToGetUserId = `SELECT id FROM user_info where email = "${decoded.user}"`

    connection.query(queryToGetUserId, (err, result) => {
        if (result.length > 0) {
            result.forEach(element => {
                let id = element.id;
                let queryToInsertComment = `INSERT INTO comments(issue_id,user_id,data,date_time) VALUES ("${issueId}", "${id}" , "${comment}" , "${commentDate}");`

                connection.query(queryToInsertComment, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.status(200).json({ success: true, data: "inserted" });
                    }
                })
            })
        }
        else {
            console.log(err);
            res.status(400).json({ success: false, data: err });

        }
    })

}

function getComment(req, res, issueId) {
    let queryToGetComment = `SELECT comments.data AS comment_data ,user_info.name AS user_name , comments.date_time AS date_time FROM comments JOIN user_info ON comments.user_id = user_info.id WHERE comments.issue_id = "${issueId}";`

    connection.query(queryToGetComment, (err, result) => {
        if (result != undefined && result.length > 0) {
            console.log("inside view -------------------------------------");
            console.log(result);
            res.status(200).json({ success: true, data: result });
        }
        else {
            console.log(err);
            res.status(400).json({ success: false, data: "null" });

        }
    })
}

function storeUpdateHistory(req, res, issueId, user, dateTimeOfUpdation, updateFrom, updateTo) {
    let decoded = jwt.verify(user, process.env.TOKEN_KEY)
    let queryToGetUserId = `SELECT id FROM user_info where email = "${decoded.user}";`

    connection.query(queryToGetUserId, (err, result) => {
        if (result.length > 0) {
            result.forEach(element => {
                let user_id = element.id;

                let queryToStoreUpdateHistory = `INSERT INTO update_history(issue_id,user_id,updation_time,update_from,update_to) VALUES ("${issueId}","${user_id}","${dateTimeOfUpdation}","${updateFrom}","${updateTo}");`

                connection.query(queryToStoreUpdateHistory, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(400).json({ success: false, data: err });
                    }
                    else {
                        console.log(result);
                        res.status(200).json({ success: true, data: "stored" });
                    }
                })
            })
        }
        else {
            console.log(err);
            res.status(400).json({ success: false, data: err });

        }
    })

}

function getUpdateHistory(req, res, issue_id) {
    let timeArray = []
    let queryToGetUpdateHistory = `SELECT user_info.name AS update_by
        ,status.title AS update_from
        , sts.title AS update_to 
        , update_history.updation_time AS update_time
        FROM update_history JOIN user_info ON update_history.user_id = user_info.id
        JOIN status ON update_history.update_from = status.id
        JOIN status AS sts ON update_history.update_to = sts.id WHERE update_history.issue_id = ${issue_id};`

    connection.query(queryToGetUpdateHistory, (err, result) => {
        if (result.length > 0) {
            console.log(result);

            console.log(result.length);
            // console.log("lll");
            result.forEach(element=>{
                // console.log("dcv");
                // console.log("dcvbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
                let time = element.update_time
                let timee = time.toISOString();
                let timeAgo = moment(timee).fromNow();
                console.log(timeAgo + "nnknl");
                timeArray.push(timeAgo);
                element.update_time = timeAgo
                if(timeArray.length == result.length)
                {
                    console.log(timeArray);
                   


                }
            })
            res.status(200).json({ success: true, data: result });
            
        }
        else {
            console.log(err);
            res.status(200).json({ success: true, data: null });
        }
    })
}



module.exports = { getUserType, getIssueDataForUser, getIssueDataForAdmin, updateIssueStatus, deleteIssue, storeComment, getComment, storeUpdateHistory, getUpdateHistory }