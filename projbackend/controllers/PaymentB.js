const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "4pbx8z6wm58yrnt8",
  publicKey: "9f62pxg9bgwnkc74",
  privateKey: "c3f595e630364da4debf92ff8746a674",
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    // pass clientToken to your front-end
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
    // const clientToken = response.clientToken;
  });
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;

  let amountFromTheClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,

      options: {
        submitForSettlement: true,
      },
    },
    function (err, result) {
      if (err) {
        res.status(500).json(error);
      } else {
        res.json(result);
      }
    }
  );
};
