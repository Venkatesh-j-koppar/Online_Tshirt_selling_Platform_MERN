import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { updateaCategory, getaCategory } from "./helper/adminapicall";

function UpdateCategory({ match }) {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAutheticated();

  const goBack = () => {
    return (
      <div className="mt-3">
        <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
          Admin Home
        </Link>
      </div>
    );
  };

  const preload = (categoryId) => {
    getaCategory(categoryId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    updateaCategory(match.params.categoryId, user._id, token, { name }).then(
      (data) => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      }
    );
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category Updated successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-danger">Failed to Update Category</h4>;
    }
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter The Category</p>
          <input
            type="text"
            className="form-control my-3"
            autoFocus
            onChange={handleChange}
            value={name}
            required
            placeholder="For Ex. Summer"
          ></input>
          <button className="btn btn-outline-info my-2" onClick={onSubmit}>
            Update Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <div>
      <Base
        title="Create a category here"
        description="Add a new category for new T-shirts"
        className="container bg-info p-4"
      >
        <div className="row bg-white rounded">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </Base>
    </div>
  );
}

export default UpdateCategory;
