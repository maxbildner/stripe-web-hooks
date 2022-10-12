// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require("stripe")(
  "sk_test_51LrqIbKQhuytNNrKWRYhR0q8tMCgjI8DPdS1XHjN5DRWJHy11x0t3jeTgGlYjLCqSKWLFEOfyiySZm3x30B4Ph3600V1ezRkKs"
);

// If you are testing your webhook locally with the Stripe CLI you
// can find the endpoint's secret by running `stripe listen`
// Otherwise, find your endpoint's secret in your webhook settings in the Developer Dashboard
const endpointSecret = "whsec_...";

// This example uses Express to receive webhooks
const express = require("express");

const app = express();

// Match the raw body to content type application/json
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log("PaymentIntent was successful!");
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        console.log("PaymentMethod was attached to a Customer!");
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
  }
);

app.listen(4242, () => console.log("Running on port 4242"));
