const express = require('express');
const router = express.Router();
const braintree = require('braintree');

router.get('/', async (req, res) =>  {

    var gateway = new braintree.BraintreeGateway({
        environment: braintree.Environment.Sandbox,
        // Use your own credentials from the sandbox Control Panel here
        merchantId: process.env.MERCHANT_ID,
        publicKey: process.env.PUBLIC_KEY,
        privateKey: process.env.PRIVATE_KEY
    });
    let token = (await gateway.clientToken.generate({})).clientToken;
    res.send({data: token});

});

router.post('/', async (req, res, next) => {
    const data = req.body;
  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: process.env.MERCHANT_ID,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY
  });

  let transactionResponse = await gateway.transaction.sale({
    amount: data.amount,
    paymentMethodNonce: data.nonce,
    options: {
        submitForSettlement: true
      }
});

console.log("Transaction Response",transactionResponse);
res.send({data: transactionResponse});
});

module.exports = router;