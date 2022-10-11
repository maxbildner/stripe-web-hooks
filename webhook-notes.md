## WEBHOOK NOTES

10/11/22

- https://www.youtube.com/watch?v=mrkQ5iLb4DM
- What Are <ins>**Webhooks? (Reverse APIs)**</ins>
  - A type of API that is driven by events rather than requests
    - https://www.mparticle.com/blog/apis-vs-webhooks/
  - A service that allows one program to send data to another as soon as an event takes place
    - <ins>**Web hook event**</ins> = event that triggers the call back function (ex. User pays for item on credit card stripe form and clicks submit button on stripe’s website)
  - <ins>**“Reverse APIs”**</ins> because the communication is initiated by the application sending the data, rather the than the one receiving it
  - Webhooks are a subset of PubSub (Publish Subscribe) models
    - https://stackoverflow.com/questions/45253530/webhook-vs-publisher-and-subscriber
  - Ex. Stripe Payments
    - Tell stripe, can you send a request to my Server (ex. EC2 instance) when an event occurs. In this case the web hook event is clicking the submit button on the stripe credit card checkout form.
    - Stripe will then send request to our server telling our server someone has paid
    - **How does our backend know the request is coming from stripe and not someone else?**
      - 1. Stripe gives you a <ins>**secret key**</ins> beforehand
      - 2. The message being sent from stripe to EC2 server includes a hash
        - The hash is produced by running the message through a hashing function and using the secret key as an input to the hashing function
        - hash looks like { “x-signature”: “giberishoutputhere” }
          - This is called **Signing the Message**
      - 3. Then our server runs the incoming stripe request message through a hashing function (also using the same secret key)
        - Our server compares our resulting hash with the incoming message’s hash to see if they are the same. If they are the same we know that the sender of the message is who they say they are (ex. and not a hacker)

## STRIPE API WEBHOOK NOTES

- https://stripe.com/docs/checkout/quickstart
- https://stripe.com/docs/payments/accept-a-payment
- <ins>**Stripe Webhook**</ins>
  - An HTTP endpoint that receives events from stripe
  - Allow you to be notified about payment events (ex successful payments)
- <ins>**success_url**</ins> = page on your website to redirect your customer after they have successfully completed a payment
- <ins>**cancel_url**</ins> = page on your website to redirect your customer if they click on your logo or cancel during stripe checkout
- <ins>**Checkout Session**</ins>
  - An object that represents what the customer sees during the checkout/payment form
  - Need to specify **success_url** and **cancel_url**
  - Can configure with line items to charge and currencies to use
  - Expires after 24 hours
- <ins>**Payment Link**</ins>
  - Instead of building a backend that creates a Checkout Session, you can create a Payment Link to share with people to pay
  - https://stripe.com/docs/payments/payment-links
  - Setting the success_url is done in the “confirmation page” tab of creating a payment link
- Can <ins>Pre-fill the email form</ins> by adding param in Payment Link
  - Example:
    - https://buy.stripe.com/test_eVa3do41l4Ye6KkcMN?prefilled_email=jenny%40example.com
- <ins>**Testing**</ins>
  - We can simulate integration testing by inputing a fake credit number in the stripe form, which will trigger the stripe webhook
    - https://stripe.com/docs/testing
    - **4242 4242 4242 4242**
    - Use a valid future date. Ex. 12/34
    - Use any three digit CVC
    - Use any value in other form fields
