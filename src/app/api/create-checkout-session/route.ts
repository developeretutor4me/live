import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import MembershipPlan from '@/app/api/models/PriceManagement';

// Ensure your secret key is present
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is missing from the environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // @ts-ignore
  apiVersion: '2024-10-28.acacia', // Confirm the version is valid
});

let discountID: any;
const getPriceId = async (
  planType: string,
  tutorLevel: string,
  durationMonths: any,
  bundles_session: any
) => {
  try {
    if (durationMonths === '9 months') {
      durationMonths = '9_Months';
    } else if (durationMonths === 'monthly') {
      durationMonths = 'Monthly';
    } else if (durationMonths === '4 months') {
      durationMonths = '4_Months';
    } else {
      durationMonths = 'Monthly';
    }

    if (planType !== 'bundles') {
      const plan = await MembershipPlan.findOne({
        planType: planType,
        tutorLevel: tutorLevel,
        month: durationMonths,
      }).exec();
      discountID = plan ? plan.discount.couponId : '';
      return plan ? plan.priceId : null;
    } else if (planType === 'bundles') {
      const plan = await MembershipPlan.findOne({
        planType: planType,
        tutorLevel: tutorLevel,
        month: durationMonths,
        bundles_session: bundles_session,
      }).exec();
      discountID = plan ? plan.discount.couponId : '';
      return plan ? plan.priceId : null;
    }
  } catch (error) {
    console.error('Error fetching plan:', error);
    return null;
  }
};

export async function POST(req: Request) {
  try {
    const { planType, tutorLevel, durationMonths, userId, email, bundles_session } =
      await req.json();

    let sessionsPerMonth;

    if (planType === 'standard') {
      sessionsPerMonth = 4;
    } else if (planType === 'premium') {
      sessionsPerMonth = 8;
    } else {
      sessionsPerMonth = 0;
    }

    if (!['Junior', 'Senior', 'Expert'].includes(tutorLevel)) {
      return NextResponse.json({ error: 'Invalid tutorLevel provided' }, { status: 402 });
    }

    // Get the appropriate price ID based on the plan, tutor level, and duration
    const priceId = await getPriceId(planType, tutorLevel, durationMonths, bundles_session);

    if (!priceId) {
      return NextResponse.json({ error: 'Invalid plan or tutor level' }, { status: 400 });
    }

    // Check if discount is provided and extract coupon ID
    const discounts = discountID ? [{ coupon: discountID }] : [];

    // Create the Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      mode: planType === 'bundles' ? 'payment' : 'subscription',
      discounts, // Apply discount if available
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        planType,
        tutorLevel,
        durationMonths,
        userId,
        sessionsPerMonth,
        bundles_session,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 });
  }
}
