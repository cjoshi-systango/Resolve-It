const jwt = require("jsonwebtoken")
const connection = require("../database/database_connection");
const bcrypt = require('bcrypt');


function checkUserCredentials(Email, Password,req,res) {

    
    // console.log(encrypedPassword + "dvdv");
    let queryToCheckEmailPassword = `SELECT * FROM user_info WHERE email = "${Email}";`;
    connection.query(queryToCheckEmailPassword, (err, result) => {
        if(result.length > 0 && result!=null) {
            console.log(result);
            console.log("user found");
            result.forEach(element => {
                
               
                let user = element.email
                let userPassword = element.password
                let encrypedPassword = bcrypt.compareSync(`"${Password}"`,userPassword);
                console.log(encrypedPassword);
                console.log(`"${userPassword}"`);


                if(encrypedPassword)
                {
                    const token  =   jwt.sign({user}, process.env.TOKEN_KEY)
                    res.status(200).json({ success: true, data: {user,token}});
                }
                else
                {
                 res.status(400).json({ success: false, data: "noUserFound" });

                }
            })
            
            

        }
        else{

            console.log(err);
            res.status(400).json({ success: false, data: "noUserFound" });

        }
    })
}

module.exports = { checkUserCredentials }