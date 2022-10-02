const Product = require('../../models/product');
const User = require('../../models/user');

module.exports = {
  create: async (req, res) => {
    var user = req.user.parsedUser;

    const { name, price } = req.body;
    const product = await Product.create({
      name: name,
      price: price,
      user: user._id,
    });
    const savedProduct = await product.save();

    await User.findByIdAndUpdate(user._id, savedProduct);

    return res.json({
      message: "Successfully created a product",
      product: savedProduct,
    });
  },
  all: async (req, res) => {
    const products = await Product.find();
    return res.json({ products });
  },
};
