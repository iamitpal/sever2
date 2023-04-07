const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    image: { type: String, require: true },
    price: { type: Number, require: true },
    category: { type: String, require: true },
    rating: { type: Number, require: true },
  },
  {
    versionKey: false,
  }
);

const productModel = mongoose.model("product", ProductSchema);

module.exports = { productModel };
