import Product from '../models/Product.js';

const PRODUCTS_PER_PAGE = 2;

export const fetchProducts = async (req, res) => {
  const { mode, page } = req.query;
  var pageNum;
  if (page == null) {
    pageNum = 1;
  } else {
    pageNum = parseInt(page, 10);
  }
  var products;
  var numOfProducts;
  try {
    if (mode === 'all') {
      products = await Product.find()
        .skip((pageNum - 1) * PRODUCTS_PER_PAGE)
        .limit(PRODUCTS_PER_PAGE);
      numOfProducts = await Product.find().countDocuments();
    }
    if (mode === 'new') {
      products = await Product.find({ new: true })
        .skip((pageNum - 1) * PRODUCTS_PER_PAGE)
        .limit(PRODUCTS_PER_PAGE);
      numOfProducts = await Product.find({ new: true }).countDocuments();
    }
    if (mode === 'top') {
      products = await Product.find({ rating: { $gte: 4.5 } })
        .skip((pageNum - 1) * PRODUCTS_PER_PAGE)
        .limit(PRODUCTS_PER_PAGE);
      numOfProducts = await Product.find({
        rating: { $gte: 4.5 },
      }).countDocuments();
    }
    res.status(200).json({ products, numOfProducts });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

export const carouselProducts = async (req, res) => {
  try {
    const products = await Product.find({ new: true });
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

export const fetchProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};
