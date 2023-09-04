const jwt = require('jsonwebtoken');
const User = require("../model/userSchema");

const Authenticate = async (req, res, next) => {

    try {
        console.log(req.cookies);
          const token = req.cookies.jwttoken;
          console.log("below"); 
  
          const verifiyToken = jwt.verify(token, process.env.SECRET_KEY);
  
          const rootUser = await User.findOne({ _id: verifiyToken._id, "tokens.token": token });
  
          if(!rootUser) { 
              throw new Error('User not found');
          } else{
              res.status(500).send('user found');
          }
             
          req.token = token;
          req.rootUser = rootUser;
          req.userID = rootUser._id;
  
          next();

    } catch (err) {
        res.status(401).send("Unautorized: No token Provided...")
        console.log(err)
    }
}

module.exports = Authenticate;