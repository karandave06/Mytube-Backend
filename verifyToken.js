const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token2 = req.body.token;
  
  const token = req.cookies.access_token;

  if (!token) return res.status(401).send("You are not authenticated!");

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.status(403).send("You token is not valid!");

    req.user = user;
    next();
  });
};
