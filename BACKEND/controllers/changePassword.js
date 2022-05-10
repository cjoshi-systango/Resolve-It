const connection = require("../database/database_connection");
const jwt = require('jsonwebtoken');
require('dotenv').config()
const bcrypt = require('bcrypt');
const e = require("cors");

function changePassword(req,res,oldPassword,newPassword,user)
{
    let encrypedPassword = bcrypt.hashSync(`"${newPassword}"`,3);
    console.log(encrypedPassword);
    let decoded = jwt.verify(user, process.env.TOKEN_KEY)
    console.log(decoded.user);
    function updatePassword()
    {
        let queryToChangePassword = `UPDATE user_info SET password = "${encrypedPassword}" WHERE email = "${decoded.user}";`
        connection.query(queryToChangePassword,(err,result)=>{
            if(err)
            {
                console.log(err);
            }
            else
            {
            

                console.log("password updated");
                res.status(200).json({ success: true, data: "changed" });
            }
        })
    }
    

    let queryToGetUserData  = `SELECT * FROM user_info WHERE email = "${decoded.user}";`
     connection.query(queryToGetUserData,(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else if(result.length > 0)
        {
            result.forEach(element => {
                
                let useOldPasswordCheck = bcrypt.compareSync(`"${oldPassword}"`,element.password);

                if(useOldPasswordCheck)
                {
                    updatePassword();
                }
                
            });


        }
     })
}


module.exports = {changePassword}