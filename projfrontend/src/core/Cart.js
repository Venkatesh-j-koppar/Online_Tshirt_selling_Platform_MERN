import React, { useState, useEffect } from "react";
import { loadCart } from "../admin/helper/cartHelper";
import "../styles.css";
import { API } from "../user/backend";
import Base from "./Base";
import Card from "./Card";
import Payments from "./Payments";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart);
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h1> This section is to load products</h1>
        {products.map((prod, index) => {
          return (
            <Card
              key={index}
              product={prod}
              addToCart={false}
              removeFromCart={true}
              setReload={setReload}
              reload={reload}
            ></Card>
          );
        })}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h1> This section is to load products</h1>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to Buy">
      <div className="row text-center">
        <h1 className="text-white">All of tshirts</h1>
        <div className="col-6">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3>No Products In Cart</h3>
          )}
        </div>
        <div className="col-6">
          <Payments products={products} setReload={setReload}></Payments>
        </div>
      </div>
    </Base>
  );
}
