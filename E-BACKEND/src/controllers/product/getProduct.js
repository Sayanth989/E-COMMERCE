import Product from "../../models/product.js";

// get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.log("getting products server crashed");
    res.status(500).json({ msg: err.message });
  }
};

// get one product by id
const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.log("getting product by id crashed");
    res.status(500).json({ msg: err.message });
  }
};

export { getAllProducts, getOneProduct };