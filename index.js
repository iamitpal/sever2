const express = require("express");
const { userRouter } = require("./routes/user.routes");
const { connection } = require("./config/db");
const cors = require("cors");
const { productRouter } = require("./routes/product.routes");
const { auth } = require("./middleware/auth.middleware");

require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.use("/user", userRouter);
app.use(auth);
app.use("/product", productRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`Connected to DB`);
  } catch (error) {
    console.log("Error in connection w/ server");
  }

  console.log(`server is running at ${process.env.PORT}`);
});
