const connection = require("../database/database_connection");
const jwt = require('jsonwebtoken');
require('dotenv').config()

let auth = async (req, res, next) =>{
    const token=req.header('Aurthorization');
    let decoded = null

    if(!token) return res.sendStatus(400).json({success:false, data:" NO Token is provided in header"})
    
    try
    {
        decoded = jwt.verify(token, process.env.TOKEN_KEY)

        let queryTofetchUser = `SELECT * FROM user_info WHERE email = "${decoded}";`;

        connection.query(queryTofetchUser,(err,result)=>{
            if(err)
            {
                res.sendStatus(400).json({success:false, data: err})
            }
            else
            {
                req.user = result;
            }
        })
        next()
    }
    catch{
        return res.sendStatus(400).json({success:false, data:"Invalid Token"})
    }
}

module.exports = auth 