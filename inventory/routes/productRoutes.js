const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  searchProducts,
  getByIds,
} = require("../controller/productControllers");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/search/:searchString", searchProducts);
router.post("/getByIds", getByIds);

module.exports = router;
