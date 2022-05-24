const connection = require("../database/database_connection");
const jwt = require('jsonwebtoken');
const e = require("cors");
const { storeUpdateHistory } = require("./ticketUpdation");
require('dotenv').config()

function getStarted(req, res) {
    let queryToGetfirstQuestion = `SELECT question from chat_question WHERE id = ${1}; SELECT chat_option.option,chat_option.next_question_id,chat_option.id FROM chat_option WHERE chat_option.question_id = ${1};`


    connection.query(queryToGetfirstQuestion, (err, result) => {

        if (result.length > 0) {
            console.log(result[1].length);
            res.status(200).json({ success: true, data: result });

        }
        else {
            console.log(err);
            res.status(400).json({ success: false, data: err });

        }
    })


}

function nextQuestion(req, res, optionId, qId, user,dateTime) {
    let questionOptionArray = []

    console.log("oooooooooooooooooooooooooo");
    console.log(optionId);

    let queryToCheckDyanamicOption = `SELECT dyanamic_option FROM chat_question WHERE id = ${qId};`

    connection.query(queryToCheckDyanamicOption, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).json({ success: false, data: err });

        }
        else if (result.length > 0) {
            result.forEach(element => {
                if (element.dyanamic_option == 0) {
                    notDyanamicOption();
                    // storeHistory(optionId,qId,user,dateTime);
                }
                else {
                    console.log("dyanamic_option");
                    dyanamicOption();
                    // storeHistoryForDynamic(optionId,qId,user,dateTime);
                }
            })
        }
    })

    function dyanamicOption() {
        let queryToGetNextQuestion = `SELECT next_Question_id FROM dyanamic_question WHERE question_id = ${qId};`
        connection.query(queryToGetNextQuestion, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).json({ success: false, data: err });

            }
            else if (result.length > 0) {
                console.log(result);
                result.forEach(element=>{
                    let queryToSelectQuestion = `SELECT id,question AS nextQuestion FROM chat_question WHERE id = ${element.next_Question_id};`

                    connection.query(queryToSelectQuestion,(err,result)=>{
                        if(err)
                        {
                            console.log(err)
                            res.status(400).json({ success: false, data: err });


                        }
                        else if(result.length > 0)
                        {
                            console.log(result);
                            result.forEach(element=>{
                                getOption(result,element.id);
                            })
                        }
                    })

                })

            }
        })
    }


    function notDyanamicOption() {
        let queryToSelectNextQuestion = `SELECT chat_question.question AS nextQuestion , 
    chat_question.id, 
    cq.id AS questionId FROM chat_option JOIN chat_question ON chat_option.next_question_id = chat_question.id 
    JOIN chat_question AS cq ON chat_option.question_id = cq.id 
    WHERE chat_option.id = "${optionId}";`

        connection.query(queryToSelectNextQuestion, (err, result) => {
            console.log(result.length);
            if (result.length > 0) {

                result.forEach(element => {
                    if (element.id == 11) {

                        getAllIssueOfUser(result, user)
                    }
                    else {
                        let next_question_id = element.id;
                        console.log(questionOptionArray);
                        getOption(result,next_question_id);
                    }

                });
            }
            else {
                console.log(err);
                res.status(400).json({ success: false, data: err });

            }
            // console.log(questionOptionArray + "pppppppppppppppppppppppp");



        })
    }


    function getOption(Questionresult,next_question_id) {
        questionOptionArray.push(Questionresult);
        let queryToGetOption = `SELECT chat_option.option AS options,chat_option.id FROM chat_option WHERE chat_option.question_id = "${next_question_id}";`
        connection.query(queryToGetOption, (err, result) => {

            if (result.length > 0) {
                console.log(result + "lllllll");
                
                questionOptionArray.push(result);
                console.log(questionOptionArray.length);

                if (questionOptionArray.length == 2) {
                    res.status(200).json({ success: true, data: questionOptionArray });
                    console.log(questionOptionArray);
                }
            }
            else {
                console.log(err);
                console.log("llllllllll");

                if (questionOptionArray.length == 1) {
                    console.log("llllllllll");
                    res.status(200).json({ success: true, data: questionOptionArray });

                }
                // console.log(result);

            }
        })
    }


    function getAllIssueOfUser(Questionresult, user) {
        let optionArray = []
        let decoded = jwt.verify(user, process.env.TOKEN_KEY)
        let queryToGetUser = `SELECT id FROM user_info where email = "${decoded.user}";`
        connection.query(queryToGetUser, (err, result) => {
            if (err) {
                console.log(err);
                res.status(400).json({ success: false, data: err });

            }
            else if (result.length > 0) {
                result.forEach(element => {

                    let queryToCheckIssue = `SELECT issue.subject AS options,issue.id FROM issue WHERE issue.created_by = ${element.id};`

                    connection.query(queryToCheckIssue, (err, result) => {
                        if (err) {
                            console.log(err);
                            res.status(400).json({ success: false, data: err });

                        }
                        else if (result.length > 0) {
                            console.log(result);
                            optionArray.push(Questionresult);
                            optionArray.push(result);

                            res.status(200).json({ success: true, data: optionArray });

                        }
                    })

                })
            }
        })
    }




}

function storeHistory(optionId,qId,user,dateTime)
{
    let decoded = jwt.verify(user, process.env.TOKEN_KEY)
    let queryToGetUser = `SELECT id FROM user_info where email = "${decoded.user}"`
    connection.query(queryToGetUser,(err,result)=>{
        if(err)
        {
            console.log(err);
            res.status(400).json({ success: false, data: err });

        }
        else if(result.length > 0)
        {
            result.forEach(element=>{
                let queryToStoreHistory = `INSERT INTO chat_history(question_id,option_id,user_id,date_time) VALUES (${qId},${optionId},${element.id},"${dateTime}");`

                connection.query(queryToStoreHistory,(err,result)=>{
                    if (err) {
                        console.log(err);
                        res.status(400).json({ success: false, data: err });

                    }
                    else{
                        console.log("inserted history of not dynamic");

                    }
                })
            })
        }
    })
}


function storeHistoryForDynamic(optionId,qId,user,dateTime)
{
    let decoded = jwt.verify(user, process.env.TOKEN_KEY)
    let queryToGetUser = `SELECT id FROM user_info where email = "${decoded.user}"`
    connection.query(queryToGetUser,(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else if(result.length > 0)
        {
            result.forEach(element=>{
                let queryToStoreHistory = `INSERT INTO chat_history(question_id,issue_id,user_id,date_time) VALUES (${qId},${optionId},${element.id},"${dateTime}");`

                connection.query(queryToStoreHistory,(err,result)=>{
                    if (err) {
                        console.log(err);
                        res.status(400).json({ success: false, data: err });

                    }
                    else{
                        console.log("inserted history of dynamic");

                    }
                })
            })
        }
    })
}

function checkUserIssue(req, res, id) {

    console.log(id);
    let decoded = jwt.verify(id, process.env.TOKEN_KEY)
    let queryToGetUser = `SELECT id FROM user_info where email = "${decoded.user}"`
    connection.query(queryToGetUser, (err, result) => {
        if (err) {
            console.log(err);
        }
        else if (result.length > 0) {
            console.log(result);
            result.forEach(element => {

                let queryToCheckIssue = `SELECT * FROM issue WHERE created_by = ${element.id};`

                connection.query(queryToCheckIssue, (err, result) => {
                    console.log(result);
                    if (err) {
                        console.log(err);
                        res.status(400).json({ success: false, data: err });

                    }
                    else if (result.length > 0) {
                        console.log(result);
                        res.status(200).json({ success: true, data: result });

                    }
                    else
                    {
                        console.log("lll");
                        res.status(200).json({ success: true, data: null });
                        
                    }
                })

            })
        }
    })
}

function getStartedForIssue(req, res) {
    let queryToGetfirstQuestion = `SELECT question from chat_question WHERE id = ${10}; SELECT chat_option.option,chat_option.next_question_id,chat_option.id FROM chat_option WHERE chat_option.question_id = ${10};`


    connection.query(queryToGetfirstQuestion, (err, result) => {

        if (result.length > 0) {
            console.log(result[1].length);
            res.status(200).json({ success: true, data: result });

        }
        else {
            console.log(err);
            res.status(400).json({ success: false, data: err });

        }
    })
}

module.exports = { getStarted, nextQuestion, checkUserIssue, getStartedForIssue }