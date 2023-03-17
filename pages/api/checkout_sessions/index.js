import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if(req.method === 'POST') {
        try {
            const session = await stripe.checkout.sessions.create({
                line_items: req?.body?.items ?? [],
                metadata: {
                    'image_bucket': req?.body?.imageBucket ?? '',
                    'image_filename': req?.body?.imageFilename ?? ''
                },
                payment_intent_data: {
                    'metadata': {
                        'image_bucket': req?.body?.imageBucket ?? '',
                        'image_filename': req?.body?.imageFilename ?? ''
                    }
                },
                mode: 'payment',
                payment_method_types: ['card'],
                
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/collections`,
            });

            res.status(200).json(session);
        } catch(err) {
            console.log("oops: ", err);
            res.status(500).json({statusCode: 500, message: err.message});
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}