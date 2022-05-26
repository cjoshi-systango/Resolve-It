const connection = require("../database/database_connection");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config()


function storeUserData(Name,Email,Usertype,Password,Department,req,res)
{

    let encrypedPassword = bcrypt.hashSync(`"${Password}"`,3);
    let queryToSearchEmail = `SELECT * FROM user_info WHERE email = "${Email}";`;
    let queryToInsertUserData = `INSERT INTO user_info (name, email, user_type, password) VALUES  ( "${Name}", "${Email}", "${Usertype}" , "${encrypedPassword}");`;
    let queryToSelectUserId = `SELECT id FROM user_info WHERE email = "${Email}";`
    
    connection.query(queryToSearchEmail,(err,result)=>
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            let check = result.length;
            if(check<1)
            {
                connection.query(queryToInsertUserData,(err,result)=>{
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        connection.query(queryToSelectUserId,(err,result)=>{
                            if(result.length > 0)
                            {
                                result.forEach(element=>{
                                    let id = element.id;
                                    let queryToInsertDepartmentAndType = `INSERT INTO user_department_role(user_id,department_id,user_type_id) VALUES ("${id}", "${Department}", "${Usertype}")`

                                    connection.query(queryToInsertDepartmentAndType,(err,result)=>{
                                        if(err)
                                        {
                                            console.log(err);
                                        }
                                        else
                                        {
                                            console.log("data stored");

                                            let transporter = nodemailer.createTransport({
                                                service: 'gmail',
                                                auth: {
                                                  user: process.env.EMAIL_ID,
                                                  pass: process.env.EMAIL_PASS,
                                                }
                                              });
                                              
                                                let mailOptions = {
                                                from: process.env.EMAIL_ID,
                                                to: Email,
                                                subject: "User Credentials",
                                                text: "Here are your credentials of resolveIt" + Password,
                                                };
                                              
                                                transporter.sendMail(mailOptions, function(error, info){
                                                if (error) {
                                                    console.log(error);
                                                } else {
                                                    console.log('Email sent: ' + info.response);
                                                }
                                            });
                                            res.status(200).json({success:true , data : "register" });
                                        }
                                    })
                                })
                            }
                            else
                            {
                                console.log(err);
                            }
                        })
                        
                    }
                })
            }
            else
            {
                res.status(400).json({success:false , data : "alreadyExist" });
            }
        }
    })
    
}


async function fetchUserType(req,res)
{
    let userTypeObject = [];
    console.log("inside function ---------------------");
    let queryToGetAllUserType = `SELECT id,title FROM user_type`

     connection.query(queryToGetAllUserType, (err,result)=>{
        if(err)
        {
            console.log(err);
            res.status(400).json({success:false , error : err });
        }
        else
        {
            
            // console.log(result.length + "bxshb");
            result.forEach(element => {
                let key,value;
               
                key = element.title
                // console.log(key + "hjgkui");
                value = element.id
                userTypeObject.push({
                    [key] :  value,
                })
                
            })
            
        }
        console.log(userTypeObject);
       res.status(200).json({success:true , data : userTypeObject });
    })
   
}

function fetchDepartments(req,res)
{
    let departmentObject = [];
    console.log("inside function ---------------------");
    let queryToGetAllUserType = `SELECT id,name FROM department`

     connection.query(queryToGetAllUserType, (err,result)=>{
        if(err)
        {
            console.log(err);
            res.status(400).json({success:false , error : err });
        }
        else
        {
            
            // console.log(result.length + "bxshb");
            result.forEach(element => {
                let key,value;
               
                key = element.name
                // console.log(key + "hjgkui");
                value = element.id
                departmentObject.push({
                    [key] :  value,
                })
                
            })
            
        }
        console.log(departmentObject);
       res.status(200).json({success:true , data : departmentObject });
    })
}

module.exports = {storeUserData,fetchUserType,fetchDepartments}