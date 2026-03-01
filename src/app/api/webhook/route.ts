// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";
// import UserModel from "../models/User";
// import { connectMongoDB } from "../connection/connection";
// import TotalIncomeModel from "../models/TotalIncome";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-10-28.acacia",
// });
// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// export async function POST(req: NextRequest) {
//   const sig = req.headers.get("Stripe-Signature")!;
//   const body = await req.text();
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
//   } catch (err) {
//     console.error("Webhook signature verification failed:", err);
//     return NextResponse.json(
//       { error: "Webhook signature verification failed" },
//       { status: 400 }
//     );
//   }
//   // Handle different event types
//   try {
//     await connectMongoDB();


//     switch (event.type) {
//       case "checkout.session.completed":
//         const session: any = event.data.object;

//         // seperate the month in number & save in dataBase

//         const durationMonthsString = session.metadata.durationMonths || "";
//         const durationMonths = parseInt(
//           durationMonthsString.replace(/\D/g, ""),
//           10
//         );
//         // Ensure that we have a valid number of months
//         if (isNaN(durationMonths) || durationMonths <= 0) {
//           throw new Error("Invalid durationMonths value");
//         }
//         const subscriptionDateEnd = new Date();
//         subscriptionDateEnd.setMonth(
//           subscriptionDateEnd.getMonth() + durationMonths
//         );

//         // saving paid amount into the db
//         const paymentAmount = session.amount_total / 100;
//         const payment = new TotalIncomeModel({
//           income: paymentAmount,
//         });
//         await payment.save();

//         // updating the user status
//         const userId = session.metadata.userId;
//         const user: any = await UserModel.findById(userId);

//         // Calculate the new sessionsPerMonth value
//         const newSessionsPerMonth =
//           Number(user.sessionsPerMonth) +
//           Number(session?.metadata?.sessionsPerMonth || 0);

//         const savedUser = await UserModel.findByIdAndUpdate(
//           userId,
//           {
//             stripeSubscriptionId: session.subscription,

//             planType: { type: session.metadata.planType },
//             tutorLevel: session?.metadata?.tutorLevel,
//             durationMonths: session?.metadata?.durationMonths,
//             sessionsPerMonth: newSessionsPerMonth,
//             subscriptionDateStart: new Date(),
//             subscriptionDateEnd: subscriptionDateEnd,

//             stripeMonthlyPrice: session?.amount_total / 100,
//             subscriptionIsActive: true,
//           },
//           { new: true }
//         );
//         if (!savedUser) {
//           throw new Error("User not found");
//         }

//         break;

//       case "customer.subscription.deleted":
//       // const deletedSession = event.data.object;

//       // // Update subscription status in DB
//       // const deleteduserId = deletedSession.metadata.userId;
//       // await UserModel.findByIdAndUpdate(
//       //   deleteduserId,
//       //   { stripeSubscriptionId: deletedSession.subscription},
//       //   { subscriptionIsActive: false }
//       // );
//       // break;

//       // Handle other events if necessary
//       default:
//         null;
//     }

//     return NextResponse.json({ received: true });
//   } catch (error) {
//     console.error("Error handling webhook event:", error);
//     return NextResponse.json(
//       { error: "Webhook handling failed" },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import UserModel from "../models/User";
import { connectMongoDB } from "../connection/connection";
import TotalIncomeModel from "../models/TotalIncome";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-10-28.acacia",
});
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const sig = req.headers.get("Stripe-Signature")!;
  const body = await req.text();
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }
  // Handle different event types
  try {
    await connectMongoDB();

    switch (event.type) {
      case "checkout.session.completed":
        const session: any = event.data.object;
        const planType = session.metadata.planType;
        const durationMonthsString = session.metadata.durationMonths || "";
        const bundles_session = session.metadata.bundles_session;
        
        // Calculate sessions to add based on plan type and duration
        let sessionsToAdd = 0;
        
        if (planType === "standard") {
          if (durationMonthsString === "Monthly" || durationMonthsString === "monthly") {
            sessionsToAdd = 4;
          } else if (durationMonthsString === "4_Months" || durationMonthsString === "4 months") {
            sessionsToAdd = 16;
          } else if (durationMonthsString === "9_Months" || durationMonthsString === "9 months") {
            sessionsToAdd = 36;
          }
        } else if (planType === "premium") {
          if (durationMonthsString === "Monthly" || durationMonthsString === "monthly") {
            sessionsToAdd = 8;
          } else if (durationMonthsString === "4_Months" || durationMonthsString === "4 months") {
            sessionsToAdd = 32;
          } else if (durationMonthsString === "9_Months" || durationMonthsString === "9 months") {
            sessionsToAdd = 72;
          }
        } else if (planType === "bundles") {
          if (bundles_session === "five_session_bundle") {
            sessionsToAdd = 5;
          } else if (bundles_session === "ten_session_bundle") {
            sessionsToAdd = 10;
          } else if (bundles_session === "twenty_session_bundle") {
            sessionsToAdd = 20;
          }
        }
        
        // Parse duration months for subscription end date calculation
        let durationMonths;
        if (durationMonthsString === "9_Months" || durationMonthsString === "9 months") {
          durationMonths = 9;
        } else if (durationMonthsString === "4_Months" || durationMonthsString === "4 months") {
          durationMonths = 4;
        } else if (durationMonthsString === "Monthly" || durationMonthsString === "monthly") {
          durationMonths = 1;
        } else {
          // Fallback to parsing numbers from string
          const parsedMonths = parseInt(
            durationMonthsString.replace(/\D/g, ""),
            10
          );
          durationMonths = !isNaN(parsedMonths) && parsedMonths > 0 ? parsedMonths : 1;
        }
        
        const subscriptionDateEnd = new Date();
        subscriptionDateEnd.setMonth(
          subscriptionDateEnd.getMonth() + durationMonths
        );

        // saving paid amount into the db
        const paymentAmount = session.amount_total / 100;
        const payment = new TotalIncomeModel({
          income: paymentAmount,
        });
        await payment.save();

        // updating the user status
        const userId = session.metadata.userId;
        const user = await UserModel.findById(userId);
        
        if (!user) {
          throw new Error("User not found");
        }

        // Calculate the new sessionsPerMonth value
        const currentSessions = Number(user.sessionsPerMonth || 0);
        const newSessionsPerMonth = currentSessions + sessionsToAdd;

        // Create update data object
        const updateData: any = {
          sessionsPerMonth: newSessionsPerMonth,
          stripeMonthlyPrice: session.amount_total / 100,
          tutorLevel:session.metadata.tutorLevel,
          subscriptionIsActive: true
        };
        
        // Only update plan type if it's not a bundle
        if (planType !== "bundles") {
          // Need to update planType as a subdocument with correct shape
          updateData["planType.type"] = planType;
          updateData.tutorLevel = session.metadata.tutorLevel;
          updateData.durationMonths = session.metadata.durationMonths;
          updateData.subscriptionDateStart = new Date();
          updateData.subscriptionDateEnd = subscriptionDateEnd;
          
          // Add subscription ID for subscription plans
          if (session.subscription) {
            
            updateData.stripeSubscriptionId = session.subscription;
          }
        }

        const savedUser = await UserModel.findByIdAndUpdate(
          userId,
          updateData,
          { new: true }
        );
        
        if (!savedUser) {
          throw new Error("Failed to update user");
        }

        break;

      case "customer.subscription.deleted":
        const subscription = event.data.object;
        
        // Find user with this subscription ID
        const userWithSubscription = await UserModel.findOne({
          stripeSubscriptionId: subscription.id
        });
        
        if (userWithSubscription) {
          await UserModel.findByIdAndUpdate(
            userWithSubscription._id,
            { subscriptionIsActive: false },
            { new: true }
          );
        }
        break;

      // Handle other events if necessary
      default:
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error handling webhook event:", error);
    return NextResponse.json(
      { error: "Webhook handling failed" },
      { status: 500 }
    );
  }
}