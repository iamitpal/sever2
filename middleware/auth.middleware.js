const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, "masai");
    if (decoded) {
      req.body.user = decoded.userID;
      next();
    } else {
      res.send({ msg: "Please Login first" });
    }
  } else {
    res.send({ msg: "Please Login first" });
  }
};

module.exports = {
  auth,
};
