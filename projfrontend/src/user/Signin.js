import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const Signin = () => {
  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group my-2">
              <label className="text-light">Email</label>
              <input className="form-control" type="email"></input>
            </div>
            <div className="form-group my-2">
              <label className="text-light">Password</label>
              <input className="form-control" type="password"></input>
            </div>
            <button className="btn btn-success btn-block my-2">Submit</button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign in page" description="A page for user to sign in!">
      {signInForm()}
    </Base>
  );
};

export default Signin;
