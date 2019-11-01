const Product = require("../model/product");
const { productValidation } = require("../validate/joi");

module.exports = {
  index: async (req, res, next) => {
    try {
      const product = await Product.find({});
      res.status(200).json({ payload: { product: product } });
    } catch (error) {
      next(error);
    }
  },

  register: async (req, res, next) => {
    //Validating the data before passing to db
    const { error } = productValidation(req.body);
    if (error) return next(error);

    //Registering the product
    try {
      const product = new Product(req.body);
      await product.save();
      res
        .status(201)
        .json({ payload: { message: "Product created successfully" } });
    } catch (error) {
      next(error);
    }
  }
};
