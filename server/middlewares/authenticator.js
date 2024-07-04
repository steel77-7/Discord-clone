require("dotenv").config();
const jwt = require("jsonwebtoken");

const authtenticator = (req, res, next) => {
  
  try {
    const token = req.headers.authorization.split(" ")[1];
    if(!token ) return res.status(401);
    //something to be sent to the front end 
    //more efficient than validation is true/false
    if(token===null ) return res.send({});
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) return res.status(403);
      req.user = user
    });
  } catch (error) {
    console.error(' error occured during the authenication of the token in authenticator.js : ',error)
  }
  
  next();
};

module.exports = authtenticator;
