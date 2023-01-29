import React from "react";
import "../styles.css";
import { API } from "../user/backend";
import Base from "./Base";
import Card from "./Card";

export default function Home() {
  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <div className="row text-center">
        <div className="col-4">
          <Card></Card>
        </div>
        <div className="col-4">
          <Card></Card>
        </div>
        <div className="col-4">
          <Card></Card>
        </div>
      </div>
    </Base>
  );
}
