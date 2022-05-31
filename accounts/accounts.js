require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./router/auth");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const PORT = 4000 | process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to accounts database");
  })
  .catch((err) => console.log("Error", err));

app.use(express.json());
app.use("/", authRouter);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
