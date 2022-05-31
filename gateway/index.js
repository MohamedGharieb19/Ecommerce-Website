const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/inventory", proxy("http://inventory:5000"));
app.use("/accounts", proxy("http://accounts:4000"));

app.listen(8000, () => {
  console.log("Gateway is listening to port 8000");
});
