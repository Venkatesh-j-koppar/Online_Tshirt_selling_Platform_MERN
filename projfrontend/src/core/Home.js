import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../user/backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(error);
      } else {
        setProduct(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <div className="row text-center">
        <h1 className="text-white">All of tshirts</h1>
        {product.map((prod, index) => {
          return (
            <div key={index} className="col-4 mb-4">
              <Card product={prod}></Card>
            </div>
          );
        })}
      </div>
    </Base>
  );
}
