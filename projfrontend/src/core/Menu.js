import React from "react";
import { Link, withRouter } from "react-router-dom";

const Menu = () => (
  <div>
    <ul className="nav nav-tabs bg-dark">
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>
    </ul>
  </div>
);

export default withRouter(Menu);
