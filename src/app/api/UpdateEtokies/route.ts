
import { NextResponse } from 'next/server'; // Next.js server response helper
import { connectMongoDB } from '../connection/connection';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth/auth';
import UserModel from '../models/User';
import Teachermodel from '../models/Teacher';
import TeacherEtokies from '../models/TeacherEtokies';
import TeacherModel from '../models/Teacher';


export async function POST(request: Request) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Get the request body (assuming it's in JSON format)
    const { etokies } = await request.json();

    const session = await getServerSession(authOptions);


    const userId = session?.user.id

    // Find the user in the database by ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }




    user.etokis = Number(user.etokis)  + Number(etokies) ;
    await user.save();

    if (user.role === "teacher") {
      // Find the teacher associated with this user
      const teacher = await Teachermodel.findOne({ user: user._id }); // Use `findOne` to find the teacher by user ID

      // Ensure the teacher exists
      if (teacher) {
        const newEtokiesTransaction = new TeacherEtokies({
          user: user._id,  // User who received the etokies
          teacher: teacher._id, // Teacher who earned the etokies
          amount: etokies, // The amount of etokies earned (ensure this variable is defined)
        });

        // Save the transaction to the database
        await newEtokiesTransaction.save();


        // update the teacher level
        const etokiesSum = await TeacherEtokies.aggregate([
          { $match: { teacher: teacher._id } }, // Match the teacher
          { $group: { _id: null, totalAmount: { $sum: '$amount' } } }, // Sum the amount
        ]);

        const totalAmount = etokiesSum[0]?.totalAmount || 0; // Ensure we have a totalAmount

        // Check if the teacher's total amount meets the thresholds
        let newLevel = 1;

        if (totalAmount >= 150) newLevel = 2;
        if (totalAmount >= 300) newLevel = 3;
        if (totalAmount >= 800) newLevel = 4;
        if (totalAmount >= 1200) newLevel = 5;
        if (totalAmount >= 1700) newLevel = 6;
        if (totalAmount >= 2400) newLevel = 7;
        if (totalAmount >= 3500) newLevel = 8;
        if (totalAmount >= 4500) newLevel = 9;
        if (totalAmount >= 5500) newLevel = 10;

        // Find and update the teacher's level if necessary
        await TeacherModel.findOneAndUpdate(
          { user: user._id },
          { $set: { level: newLevel } },
          { new: true } // Return the updated document
        );

      } else {
        console.log("");
      }
    }
    return NextResponse.json({ success: true });



  } catch (error) {
    console.error('Error processing redemption:', error);
    return NextResponse.json({
      success: false,
      message: 'An error occurred while processing the redemption.',
    }, { status: 500 });
  }
}
