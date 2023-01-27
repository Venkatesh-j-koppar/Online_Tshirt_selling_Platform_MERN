import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Base from "../core/Base";
import {
  getCategories,
  getaProduct,
  updateaProduct,
} from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper";

function UpdateProduct({ match }) {
  const { user, token } = isAutheticated();

  const [values, setvalues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: new FormData(),
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
  } = values;

  const preload = (productId) => {
    getaProduct(productId).then((data) => {
      if (data.error) {
        setvalues({ ...values, error: data.error });
      } else {
        setvalues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category.name,
          stock: data.stock,
          formData: new FormData(),
        });
        preloadCategories();
      }
    });
  };

  const preloadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setvalues({ ...values, error: data.error });
      } else {
        setvalues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.productId);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    setvalues({ ...values, error: "", loading: true });

    updateaProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setvalues({ ...values, error: data.error });
        } else {
          setvalues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            loading: false,
            createdProduct: data.name,
          });
          setTimeout(() => setvalues({ getaRedirect: true }), 2000);
        }
      }
    );
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h4>{createdProduct} Updated Product successfully</h4>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger mt-3"
        style={{ display: error ? "" : "none" }}
      >
        <h4>Something Went Wrong</h4>
      </div>
    );
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    formData.set(name, value);
    setvalues({ ...values, [name]: value });
  };

  const createProductForm = () =>
    getaRedirect ? (
      <Redirect to="/admin/dashboard"></Redirect>
    ) : (
      <form>
        <span>Post photo</span>
        <div className="form-group">
          <label className="btn btn-block btn-success w-100">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image"
              placeholder="choose a file"
            />
          </label>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("name")}
            name="photo"
            className="form-control my-3"
            placeholder="Name"
            value={name}
          />
        </div>
        <div className="form-group">
          <textarea
            onChange={handleChange("description")}
            name="photo"
            className="form-control my-3"
            placeholder="Description"
            value={description}
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("price")}
            type="number"
            className="form-control my-3"
            placeholder="Price"
            value={price}
          />
        </div>
        <div className="form-group">
          <select
            onChange={handleChange("category")}
            className="form-control my-3"
            placeholder="Category"
          >
            <option>{category != "" ? category : "Select"}</option>
            {categories &&
              categories.map((cate, index) => {
                return (
                  <option key={index} value={cate._id}>
                    {cate.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("stock")}
            type="number"
            className="form-control my-3"
            placeholder="Quantity"
            value={stock}
          />
        </div>

        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-outline-success my-3"
        >
          Update Product
        </button>
      </form>
    );
  return (
    <Base
      title="Add a product here"
      description="Welcome to product create section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
}

export default UpdateProduct;
