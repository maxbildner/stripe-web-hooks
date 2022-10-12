// SIGNATURE VERIFCATION- BUT NO SUCCESS PAYMENT PROCESSING
// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

const stripe = require("stripe");
const express = require("express");
const app = express();

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_f930fb1a6960274b68151a3461ff9ceffa25f725d9dae30c0cbb0b72b247b694";

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
      return;
    }

    // Handle the event
    console.log(`Unhandled event type ${event.type}`);

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

app.listen(4242, () => console.log("Running on port 4242"));
