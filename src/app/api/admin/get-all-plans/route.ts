export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import MembershipPlan from "@/app/api/models/PriceManagement";
import { connectMongoDB } from "@/app/api/connection/connection";
import { authOptions } from "@/app/auth/auth";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    // Connect to the database
    await connectMongoDB();

    // Fetch all plans, sorted by createdAt to get the latest one
    const plans = await MembershipPlan.find();

    if (!plans.length) {
      return NextResponse.json({ error: "No plans found." }, { status: 404 });
    }

    // Create a map to store the latest plan for each combination of planType and tutorLevel
    const latestPlans: Record<string, any> = {};

    // Iterate over all plans and map them by planType and tutorLevel
    plans.forEach((plan) => {
      const key = `${plan.planType}_${plan.tutorLevel}`;
      if (!latestPlans[key]) {
        latestPlans[key] = plan;
      }
    });

    // Convert the map to an array and return it
    const result = Object.values(latestPlans);

    return NextResponse.json({ plans: result });
  } catch (error) {
    console.error("Error fetching membership plans:", error);
    return NextResponse.json({ error: "Failed to fetch membership plans." }, { status: 500 });
  }
}
