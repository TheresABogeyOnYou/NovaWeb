require('dotenv').config();
const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');

app.use(express.json());
app.use(express.static(__dirname));

app.post('/create-payment-intent', async (req, res) => {
    try {
        const { plan } = req.body;
        const prices = { starter: 10000, professional: 30000, elite: 80000 };
        const paymentIntent = await stripe.paymentIntents.create({
            amount: prices[plan] || 10000,
            currency: 'gbp',
            payment_method_types: ['card'],
        });
        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message });
    }
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));