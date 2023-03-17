import Stripe from 'stripe';
import {buffer} from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
    api: {
        bodyParser: false,
    }
}

export default async function handler(req, res) {
    if(req.method === 'POST') {
        let event;
        try {
            // 1. Retrieve the event by verifying the signature using the raw body and secret
            const rawBody = await buffer(req);
            const signature = req.headers['stripe-signature'];

            event = stripe.webhooks.constructEvent(
                rawBody.toString(),
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            )
        } catch(err) {
            console.log(`❌ Error message: ${err.message}`);
            res.status(400).send(`Webhook Error: ${err.message}`);
        }

        // Successfully constructed event
        console.log('✅ Success: ', event.id);

        // 2. Handle event type (add business logic here)
        if(event.type === 'checkout.session.completed') {
            console.log('💰 Payment received');
            // TODO
            // 1. Get metadata from checkout event
            // 2. Generate AWS pre-signed URL for image download
            // 3. Construct email to send to customer
            // 4. Send email via nodemailer
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed.');
    }
}