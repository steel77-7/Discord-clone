require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticator = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401);
    //something to be sent to the front end
    //more efficient than validation is true/false
    if (token === null) return req.user = null
     jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        console.log(error)
        return res.send({error:"invalid token", valid:false})
      }
      req.user = user;
      next();
    });
    
    
  } catch (error) {
    console.error(
      " error occured during the authenication of the token in authenticator.js : ",
      error
    );
  }
  
};

module.exports = authenticator;



