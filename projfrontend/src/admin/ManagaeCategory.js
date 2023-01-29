import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";
import { getProduct, getCategories } from "./helper/adminapicall";
import { deleteaCategory } from "./helper/adminapicall";

function ManagaeCategory() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("defaultValue");

  const { user, token } = isAutheticated();

  const preload = () => {
    getProduct().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const deleteCategory = (category_id) => {
    let output = products.find((item) => {
      return item.category._id == category_id;
    });
    setCategory(output == undefined);
    if (output == undefined) {
      deleteaCategory(category_id, user._id, token).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          preload();
        }
      });
    }
  };

  const deletionMessage = () => {
    setTimeout(() => {
      setCategory("defaultValue");
    }, 7000);
    if (category == true) {
      return (
        <div
          className="alert alert-success mt-3"
          style={{ display: category == true ? "" : "none" }}
        >
          <h4>Deleted Category successfully</h4>
        </div>
      );
    } else {
      return (
        <div
          className="alert alert-danger mt-3"
          style={{ display: category == false ? "" : "none" }}
        >
          <h4>Deleted Category unsuccessfully</h4>
        </div>
      );
    }
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All Categories:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          {deletionMessage()}
          {categories.map((cate, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{cate.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/category/update/${cate._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteCategory(cate._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}

export default ManagaeCategory;
