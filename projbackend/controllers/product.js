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
  form.keepExtnsions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
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
