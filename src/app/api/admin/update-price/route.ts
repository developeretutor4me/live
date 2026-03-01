import { NextResponse } from 'next/server';
import MembershipPlan from '@/app/api/models/PriceManagement';
import { connectMongoDB } from '@/app/api/connection/connection';
import Stripe from 'stripe';
import { authOptions } from '@/app/auth/auth';
import { getServerSession } from 'next-auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Product IDs mapped by plan type
const PRODUCT_IDS: any = {
  standard: 'prod_S0yPCS0XqtLrTj',
  premium: 'prod_ROnO7MBoToOgFr',
  bundles: 'prod_S0yUjQJbVQcvhb',
  payasyougo: 'prod_S0yVkDLEKKilpd',
};

// ✅ POST: Create or Update Membership Plan with Price
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    await connectMongoDB();

    const {
      planType,
      tutorLevel,
      newPriceAmount,
      discountType,
      discountValue,
      description,
      interval,
      month,
      bundles_session,
    } = await req.json();

    // Validate required fields
    if (!planType || !tutorLevel || !newPriceAmount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 🔥 Select Product ID based on Plan Type
    const productId = PRODUCT_IDS[planType] || PRODUCT_IDS.standard;

    // Determine the lookup query based on plan type
    let lookupQuery: any = {
      planType,
      tutorLevel,
    };

    // Process specific plan type details
    let recurringConfig: any;
    let metadata: any = {
      planType,
      tutorLevel,
    };

    // Handle different plan types
    if (planType === 'standard' || planType === 'premium') {
      // Add month to lookup query for subscription plans
      if (month) {
        lookupQuery.month = month;
      }

      // Set up recurring configuration based on interval
      if (interval === 'full') {
        // One-time full payment
        recurringConfig = undefined;
      } else if (interval === 'three_months') {
        // Quarterly payment (every 3 months)
        recurringConfig = {
          interval: 'month',
          interval_count: 3,
        };
      } else if (interval === 'four_months') {
        // Four-month recurring payment
        recurringConfig = {
          interval: 'month',
          interval_count: 4,
        };
      } else if (interval === 'nine_months') {
        // Four-month recurring payment
        recurringConfig = {
          interval: 'month',
          interval_count: 9,
        };
      } else if (interval === 'monthly') {
        // Monthly payment
        recurringConfig = {
          interval: 'month',
          interval_count: 1,
        };
      }

      // Add subscription details to metadata
      metadata.month = month;
      metadata.interval = interval;
    } else if (planType === 'bundles') {
      // For bundle plans, use bundles_session in the lookup
      if (bundles_session) {
        lookupQuery.bundles_session = bundles_session;
        metadata.bundles_session = bundles_session;
      }
      recurringConfig = undefined; // Bundles are one-time payments
    } else if (planType === 'payasyougo') {
      // Pay-as-you-go doesn't need additional query params
      recurringConfig = undefined; // Pay-as-you-go is per session
    }

    // 🔍 Find the existing plan variation
    let existingPlan = await MembershipPlan.findOne(lookupQuery);

    // 🆕 Create a new price in Stripe under the correct product
    const newPrice = await stripe.prices.create({
      unit_amount: newPriceAmount,
      currency: 'usd',
      recurring: recurringConfig,
      product: productId,
      nickname: description || `${planType} ${tutorLevel}`,
      metadata,
    });

    let coupon = null;

    // 🎟️ If discount exists, create a new Stripe coupon
    if (discountType && discountValue > 0) {
      coupon = await stripe.coupons.create(
        discountType === 'percentage'
          ? { percent_off: discountValue, duration: 'forever' }
          : { amount_off: discountValue, currency: 'usd', duration: 'forever' }
      );
    }

    // Prepare the plan data
    const planData: any = {
      planType,
      tutorLevel,
      priceId: newPrice.id,
      priceAmount: newPriceAmount,
      description: description || `${planType} ${tutorLevel}`,
      currency: 'usd',
    };

    // Add discount if provided
    if (coupon) {
      planData.discount = {
        type: discountType,
        value: discountValue,
        couponId: coupon.id,
      };
    }

    // Add plan-specific fields
    if (month) {
      planData.month = month;
    }

    if (bundles_session) {
      planData.bundles_session = bundles_session;
    }

    // 🆕 Update or Insert: Store only the latest price ID
    if (existingPlan) {
      // Update existing plan
      Object.keys(planData).forEach(key => {
        existingPlan[key] = planData[key];
      });
      await existingPlan.save();
    } else {
      // Create new plan
      await MembershipPlan.create(planData);
    }

    // Fetch the updated plan
    const updatedPlan = await MembershipPlan.findOne(lookupQuery);

    return NextResponse.json({ success: true, updatedPlan }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating membership price:', error);
    return NextResponse.json(
      { error: 'Failed to update price', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const plans = await MembershipPlan.find({});

    const categorizedPlans: any = {
      standard: [],
      premium: [],
      bundles: [],
      payasyougo: [],
    };

    plans.forEach(plan => {
      if (categorizedPlans[plan.planType]) {
        categorizedPlans[plan.planType].push(plan);
      }
    });

    return NextResponse.json({ success: true, data: categorizedPlans });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch membership plans', error },
      { status: 500 }
    );
  }
}
