const fs = require("fs");

const record = (req, res, next) => {
  if (req.method == "GET") {
    next();
    const id = req.params.id;
    fs.appendFileSync(
      "./record.txt",
      `METHOD: ${
        req.method
      } Request made for product with id ${id} | ${Date()}\n`
    );
  } else if (req.method == "DELETE") {
    next();
    const id = req.params.id;
    fs.appendFileSync(
      "./record.txt",
      `METHOD: ${
        req.method
      } Request made for product with id ${id} | ${Date()}\n`
    );
  }
};

module.exports = {
  record,
};
