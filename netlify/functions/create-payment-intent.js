const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async function(event, context) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100, // 1 €
      currency: "eur",
      automatic_payment_methods: { enabled: true } // Active Apple Pay, CB, Google Pay
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
