const connection = require("../database/database_connection");
const jwt = require('jsonwebtoken');
require('dotenv').config()
const bcrypt = require('bcrypt');

function changePassword(req,res,oldPassword,newPassword,user)
{
    let encrypedPassword = bcrypt.hashSync(`"${newPassword}"`,3);
    console.log(encrypedPassword);
    let decoded = jwt.verify(user, process.env.TOKEN_KEY)
    console.log(decoded.user);
    let queryToChangePassword = `UPDATE user_info SET password = "${encrypedPassword}" WHERE email = "${decoded.user}" AND password = "${oldPassword}";`
    connection.query(queryToChangePassword,(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.status(200).json({ success: true, data: "changed" });
        }
    })
}


module.exports = {changePassword}