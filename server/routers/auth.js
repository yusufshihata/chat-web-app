const jwt = require('jsonwebtoken');

const authVerified = (req, res, next) => {
  const token = req.header('auth-header');
  
  if(!token) {
    return res.status(401).send("Acess Denied");
  };

  try {
    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = verified;
  }
  catch(err) {
    res.status(400).send("Invalid Token");
  };
  next();
};


module.exports = authVerified;
