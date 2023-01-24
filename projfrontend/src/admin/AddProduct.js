import React, { useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";

function AddProduct() {
  const [value, setvalue] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const { name, description, price, stock } = value;

  const onSubmit = () => {};
  const handleChange = (name) => (event) => {};
  const AddProduct = () => {};

  const createProductForm = () => (
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
          <option>Select</option>
          <option value="a">a</option>
          <option value="b">b</option>
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("quantity")}
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
        Create Product
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
        <div className="col-md-8 offset-md-2">{createProductForm()}</div>
      </div>
    </Base>
  );
}

export default AddProduct;
