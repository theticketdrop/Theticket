const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const { email } = JSON.parse(event.body || "{}");
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100,
    currency: "eur",
    automatic_payment_methods: { enabled: true },
    metadata: { email: email || "anonymous" }
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
  };
};
