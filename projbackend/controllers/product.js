const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
// when user selects browse from his system we need to keep track of it so we use fs and this fs is a part of node only we need not install it through extra package
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((error, product) => {
      if (error) {
        return res.status(400).json({
          error: "Product Not Found",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    //destructure the fields
    const { name, description, price, category, stock } = fields;
    console.log(fields);

    if (!name || !description || !price || !category || !stock) {
      res.status(400).send({
        error: "Please Include Fields",
      });
    }

    //TODO restrictions on field
    let product = new Product(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 2 * 1024 * 1024) {
        return res.status(400).json({
          error: "File Size is too big!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;

      //save to DB
      product.save((err, product) => {
        if (err) {
          res.status(400).json({
            error: "Saving tshirt in DB failed",
          });
        }
        res.json(product);
      });
    }
  });
};

exports.getProduct = (req, res) => {
  re.product.photo = undefined;
  return res.json(req.product);
};

//middleware
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedproduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product",
      });
    }
    res.json({
      message: "Deletion was successful",
      deletedproduct,
    });
  });
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    //destructure the fields
    const { name, description, price, category, stock } = fields;
    console.log(fields);

    //TODO restrictions on field
    let product = req.product;
    product = _.extend(product, fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 2 * 1024 * 1024) {
        return res.status(400).json({
          error: "File Size is too big!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;

      //save to DB
      product.save((err, product) => {
        if (err) {
          res.status(400).json({
            error: "Updation of product failed",
          });
        }
        res.json(product);
      });
    }
  });
};

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, product) => {
      if (err) {
        res.status(400).json({
          error: "No product found",
        });
      }
      res.json(products);
    });
};
