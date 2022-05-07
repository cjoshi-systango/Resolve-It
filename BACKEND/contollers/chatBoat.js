const connection = require("../database/database_connection");
const jwt = require('jsonwebtoken');
const e = require("cors");
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
        }
    })


}

function nextQuestion(req, res, optionId,dateTime,user) {
    let questionOptionArray = []
    let queryToSelectNextQuestion = `SELECT chat_question.question AS nextQuestion , 
    chat_question.id, 
    cq.id AS questionId FROM chat_option JOIN chat_question ON chat_option.next_question_id = chat_question.id 
    JOIN chat_question AS cq ON chat_option.question_id = cq.id 
    WHERE chat_option.id = "${optionId}";`

    connection.query(queryToSelectNextQuestion, (err, result) => {
        console.log(result.length);
        if (result.length > 0) {

            result.forEach(element => {
                let next_question_id = element.id;
                questionOptionArray.push(result);
                console.log(questionOptionArray);
                let queryToGetOption = `SELECT chat_option.option,chat_option.id FROM chat_option WHERE chat_option.question_id = "${next_question_id}";`
                connection.query(queryToGetOption, (err, result) => {
                    
                    if (result.length > 0) {
                        console.log(result + "lllllll");
                        questionOptionArray.push(result);
                        console.log( questionOptionArray.length);

                        if (questionOptionArray.length == 2) {
                            res.status(200).json({ success: true, data: questionOptionArray });
                            console.log(questionOptionArray);
                        }
                    }
                    else {
                        console.log(err);
                        console.log("llllllllll");

                        if(questionOptionArray.length == 1)
                        {
                            console.log("llllllllll");
                            res.status(200).json({ success: true, data: questionOptionArray });

                        }
                        // console.log(result);

                    }
                })
            });
        }
        else {
            console.log(err);
        }
        // console.log(questionOptionArray + "pppppppppppppppppppppppp");
        


    })
}

module.exports = { getStarted, nextQuestion }