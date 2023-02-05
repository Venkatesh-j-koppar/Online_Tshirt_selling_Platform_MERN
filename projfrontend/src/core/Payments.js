import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadCart, cartEmpty } from "../admin/helper/cartHelper";
import { getmeToken, processPayment } from "./helper/PaymentBHelper";
import { createOrder } from "./helper/orderHelper";
import { isAutheticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

function Payments({ products, setReload }) {
  const [info, setInfo] = useState({
    loading: "false",
    success: "false",
    clientToken: null,
    error: "",
    instance: "",
  });

  const userId = isAutheticated() && isAutheticated().user._id;
  const token = isAutheticated() && isAutheticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((response) => {
      if (response.error) {
        setInfo({ ...response, error: response.error });
      } else {
        const clientToken = response.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showbtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button
              className="btn btn-block btn-success"
              onClick={() => {
                onPurchase();
              }}
            >
              Buy
            </button>
          </div>
        ) : (
          <h3>Please Login or add Something to cart</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success, loading: false });
          console.log("PAYMENT SUCCESSFULL");
        })
        .catch((error) => {
          setInfo({ loading: false, success: false });
          console.log("PAYMENT DENIED");
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((product) => (amount = amount + product.price));
    return amount;
  };

  return (
    <div>
      <h3>Total Amount {getAmount()}</h3>
      {showbtdropIn()}
    </div>
  );
}

export default Payments;
