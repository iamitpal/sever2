const express = require("express");
const { productModel } = require("../models/product.model");
const { record } = require("../middleware/record.middleware");
const { validator } = require("../middleware/validator.middleware");
const productRouter = express.Router();

productRouter.post("/add", async (req, res) => {
  try {
    const payload = req.body;
    const product = new productModel(payload);
    await product.save();
    res.send({ Msg: "Product Added Successfully" });
  } catch (error) {
    res.send({ Msg: "Error while adding Product", error: error.message });
  }
});

// productRouter.use(record); //Middleware

productRouter.get("/get", async (req, res) => {
  const { min, max, price, category, rating } = req.query;
  if (min && max) {
    try {
      let data = await productModel.find({
        $and: [{ rating: { $gt: min } }, { rating: { $lt: max } }],
      });
      res.send(data);
    } catch (error) {
      console.log(error);
      res.send({ err: "Something went wrong in GET" });
    }
  } else if (price) {
    try {
      let data = await productModel.find({ price: { $lte: price } });
      res.send(data);
    } catch (error) {
      console.log(error);
      res.send({ err: "Something went wrong in GET" });
    }
  } else if (category) {
    try {
      let data = await productModel.find({ category: category });
      res.send(data);
    } catch (error) {
      console.log(error);
      res.send({ err: "Something went wrong in GET" });
    }
  } else {
    try {
      let data = await productModel.find();
      res.send(data);
    } catch (error) {
      console.log(error);
      res.send({ err: "Something went wrong in GET" });
    }
  }
});

productRouter.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await productModel.find({ _id: id });
    res.send(data);
  } catch (error) {
    res.send({ Msg: "Error while adding Product", error: error.message });
  }
});

productRouter.use(validator); //Middleware

productRouter.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await productModel.findByIdAndDelete({ _id: id });
    res.send({ Msg: `Product w/ id ${id} has been Deleted Successfully` });
  } catch (error) {
    res.send({ Msg: "Error while updating Product", error: error.message });
    console.log(error);
  }
});

productRouter.patch("/update/:id", async (req, res) => {
  let id = req.params.id;
  let payload = req.body;
  try {
    await productModel.findByIdAndUpdate({ _id: id }, payload);
    res.send({ Msg: `Product w/ id ${id} has been Updated Successfully` });
  } catch (error) {
    res.send({ Msg: "Error while updating Product", error: error.message });
    console.log(error);
  }
});

module.exports = {
  productRouter,
};
