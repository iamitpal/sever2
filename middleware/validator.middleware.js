const validator = (req, res, next) => {
  if (req.method == "PATCH" || req.method == "DELETE") {
    if (req.query.admin && req.query.password) {
      if (req.query.admin == "admin") {
        if (req.query.password == "1234") {
          next();
        } else {
          res.send({ msg: "You are not authorized for this operation" });
        }
      } else {
        res.send({ msg: "You are not authorized for this operation" });
      }
    } else {
      res.send({ msg: "You are not authorized for this operation" });
    }
  } else {
    res.send({ msg: "You are not authorized for this operation" });
  }
};

module.exports = {
  validator,
};
