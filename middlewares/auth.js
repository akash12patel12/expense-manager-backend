
const jwt = require('jsonwebtoken');

exports.authenticate=(req,res,next)=>{
   const token = req.headers.authorization;
    const user = jwt.verify(token, process.env.BCRYPT_SECRET);
    req.user = user;
    next();
}

