const Products = require("../models/Products");

const getProducts = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber);
    const size = parseInt(req.query.size);
    const query = {};

    if (pageNumber < 0 || pageNumber === 0) {
      response = {
        error: true,
        message: "invalid page number, should start with 1",
      };
      return res.status(400).json(response);
    }

    query.skip = size * (pageNumber - 1);
    query.limit = size;
    const totalProducts = await Products.countDocuments({});

    const products = await Products.find({}, {}, query);
    res.json({ products, totalProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const searchProducts = async (req, res) => {
  try {
    const searchString = req.params.searchString || "";

    if (!searchString) {
      const totalProducts = await Products.countDocuments({});
      const products = await Products.find({}, {}, { skip: 0, limit: 10 });
      return res.json({ products, totalProducts });
    }

    const items = await Products.find(
      { name: { $regex: searchString, $options: "i" } },
      {},
      { limit: 10 }
    );

    return res.json({ products: items, totalProducts: items.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getByIds = async (req, res) => {
  try {
    console.log(req.body.ids);
    const records = await Products.find({ _id: { $in: req.body.ids } });

    return res.json({ products: records });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  searchProducts,
  getByIds,
};
