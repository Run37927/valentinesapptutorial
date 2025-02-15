'use server';
import prisma from "@/lib/db"
import { PRODUCT_PRICE } from "@/lib/products";
import { stripe } from "@/lib/stripe";

export const createCheckoutSession = async ({ userEmail, userId }) => {
    // step 1: retrieve user information
    const user = await prisma.user.findUnique({
        where: {
            email: userEmail
        }
    })

    if (!user) {
        throw new Error('user not found')
    }

    // step 2: check for existing order
    let order = await prisma.order.findFirst({
        where: {
            userId: userId
        }
    })

    if (!order) {
        // step 3: create an order if it doesn't exist
        order = await prisma.order.create({
            data: {
                userId,
                amount: PRODUCT_PRICE
            }
        })
    }

    // step 4: create a stripe checkout session
    const sessionParams = {
        payment_method_types: ['card'],
        line_items: [
            {
                price: process.env.STRIPE_PRICE_ID,
                quantity: 1,
            }
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/editor?session_id={CHECKOUT_SESSION_ID}&success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
        metadata: {
            userId: userId,
            orderId: order.id,
        },
        customer_email: userEmail,
        payment_intent_data: {
            receipt_email: userEmail,
        }
    };

    const session = await stripe.checkout.sessions.create(sessionParams)

    // step 5: update the order with the stripe session ID
    await prisma.order.update({
        where: {
            id: order.id
        },
        data: {
            stripeSessionId: session.id
        }
    })

    // return the sessino URL for redirection
    return { url: session.url }
}