const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const { email } = JSON.parse(event.body || "{}");

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "apple_pay"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: { name: "The Ticket" },
          unit_amount: 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://theticket.netlify.app/confirmation",
    cancel_url: "https://theticket.netlify.app/checkout",
    customer_email: email,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ url: session.url }),
  };
};
