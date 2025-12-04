import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10.acacia',
})

export const createCheckoutSession = async (
  customerId: string | null,
  userId: string,
  email: string
): Promise<string> => {
  const priceId = process.env.STRIPE_PRO_PRICE_ID || 'price_your_pro_price_id'
  
  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: 'subscription',
    payment_method_types: ['card'],
    customer: customerId || undefined,
    customer_email: customerId ? undefined : email,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/app/settings?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/app/settings?canceled=true`,
    metadata: {
      userId,
    },
  }

  const session = await stripe.checkout.sessions.create(sessionParams)
  return session.url || ''
}

export const createBillingPortalSession = async (
  customerId: string
): Promise<string> => {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/app/settings`,
  })
  return session.url
}

