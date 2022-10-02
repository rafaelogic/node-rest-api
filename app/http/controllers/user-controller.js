module.exports = {
  products: async (req, res) => {
    const { id } = req.params;
    const user = User.findById(id).populate("products");
    return res.json({ products: user.products });
  },
};
