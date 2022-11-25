import React from "react";
import "../styles.css";
import { API } from "../user/backend";
import Base from "./Base";

export default function Home() {
  console.log("Hello");
  console.log("API IS", { API });
  return (
    <Base>
      <h1 className="text-white">Hello front End {API}</h1>
    </Base>
  );
}
