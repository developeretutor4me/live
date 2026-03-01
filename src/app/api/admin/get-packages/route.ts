import { NextResponse } from 'next/server';
import MembershipPlan from '@/app/api/models/PriceManagement';
import { connectMongoDB } from '@/app/api/connection/connection';

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
