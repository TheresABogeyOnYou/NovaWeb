// server.js
const express = require('express');
const stripe = require('stripe')('YOUR_SECRET_KEY'); // Replace with your Stripe secret key
const app = express();
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
    const { plan } = req.body;
    let amount = 0;

    if (plan === 'starter') amount = 10000; // amount in pence
    else if (plan === 'professional') amount = 25000;
    else if (plan === 'elite') amount = 80000;

    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'gbp',
        automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
});

app.listen(3000, () => console.log("Server running on port 3000"));