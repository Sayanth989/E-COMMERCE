import Product from "../../models/product.js";

const addProduct = async (req, res) => {
  try {
    // getting data from request body
    const { name, description, price, stock, category} = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ msg: "Name, price and category are required" });
    }

    const productImage = req.file? req.file.filename:'no-image.jpg';
    
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      image
    });

    res.status(201).json({
      msg: "product created successfully",
      product
    });

  } catch (err) {
    console.log("error in addProduct");
    res.status(500).json({ msg: err.message });
  }
};

export default addProduct;