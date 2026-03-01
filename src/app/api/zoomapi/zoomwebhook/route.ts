

import { NextResponse } from "next/server";
import crypto from "crypto";
import BookingModel from "../../models/Booking";
import UserModel from "../../models/User";
import TeacherModel from "../../models/Teacher";
import TeacherEtokies from "../../models/TeacherEtokies";

export async function POST(req: Request) {
  const headers = req.headers;
  const body = await req.json();


  // Construct the message string
  const message = `v0:${headers.get("x-zm-request-timestamp")}:${JSON.stringify(body)}`;

  const hashForVerify = crypto
    // @ts-ignore
    .createHmac("sha256", process.env.ZOOM_WEBHOOK_SECRET)
    .update(message)
    .digest("hex");

  // Hash the message string with your Webhook Secret Token and prepend the version semantic
  const signature = `v0=${hashForVerify}`;

  // Validate the request came from Zoom
  if (headers.get("x-zm-signature") === signature) {
    if (body.event === "endpoint.url_validation") {
      const hashForValidate = crypto
        // @ts-ignore
        .createHmac("sha256", process.env.ZOOM_WEBHOOK_SECRET)
        .update(body.payload.plainToken)
        .digest("hex");

      const response = {
        message: {
          plainToken: body.payload.plainToken,
          encryptedToken: hashForValidate,
        },
      };


      return NextResponse.json(response.message, { status: 200 });
    }
    // Handle meeting ended event
    else if (body.event === "meeting.ended") {
      try {
        // Find the booking with matching Zoom meeting ID and update meetingCompleted
        const meetingId = body.payload.object.id;
        const updatedBooking: any = await BookingModel.findOneAndUpdate({ "zoomMeetingData.meeting.id": meetingId }, { meetingCompleted: true }, { new: true });
        const TrialSession: any = await BookingModel.findOne({ "zoomMeetingData.meeting.id": meetingId });
        const meetingUserID = updatedBooking.student;
        if (TrialSession && TrialSession.IsTrialSession) {
          const studentId = TrialSession.student;
          const user = await UserModel.findById(studentId);

          if (user) {
            user.TrialSessionLeft -= 1; // Decrement TrialSessionLeft
            await user.save(); // Save the updated user document
          }
        } else {

          if (!updatedBooking) {

            return NextResponse.json({
              message: "Meeting ended but no corresponding booking found",
              status: 200,
            });
          }

          //..................  give etokis  to refrer person  one time if the student or parent compleated a session

          const updatedUser = await UserModel.findByIdAndUpdate(
            meetingUserID,  // The user ID
            { $inc: { sessionsPerMonth: -1 } },  // Decrement sessionsPerMonth by 1
            { new: true }  // Return the updated document
          );
        }




        const meetingUser = await UserModel.findById(meetingUserID);

        if (meetingUser && meetingUser.referredBy && !meetingUser.hasCompletedFirstSession) {
          const referredPersonID = meetingUser.referredBy;
          // Increment the eTokis of the referred person by 50
          await UserModel.findByIdAndUpdate(
            referredPersonID,
            { $inc: { etokis: 50 } },
            { new: true } // Optional: returns the updated document
          );
        }
        // Mark that the student has completed their first session
        await UserModel.findByIdAndUpdate(
          meetingUserID,
          { hasCompletedFirstSession: true },
          { new: true }
        );


        //give etokis  to actual person on compleated the session every time on compleated the session 

        await UserModel.findByIdAndUpdate(
          meetingUser,
          { $inc: { etokis: 10 } },
          { new: true }
        )




        // for now teacher  add etokis on compleate the session 
        const meetingTeacherID = updatedBooking.teacher
        const teacherData = await TeacherModel.findOne(meetingTeacherID);
        const teacherUserId = teacherData.user
        if (teacherUserId) {
          await UserModel.findByIdAndUpdate(
            teacherUserId,
            { $inc: { etokis: 40 } },
            { new: true } // Optional: returns the updated document

          )
        }

        const newEtokiesTransaction = new TeacherEtokies({
          user: teacherUserId,  // User who received the etokies
          teacher: meetingTeacherID, // Teacher who earned the etokies
          amount: 40, // The amount of etokies earned
        });

        await newEtokiesTransaction.save();


        // update the teacher level
        const etokiesSum = await TeacherEtokies.aggregate([
          { $match: { teacher: meetingTeacherID } }, // Match the teacher
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
          { user: teacherUserId },
          { $set: { level: newLevel } },
          { new: true } // Return the updated document
        );




        // add etokis to the person who refer teacher  only one time 
        const teacherUserData = await UserModel.findOne(teacherUserId);
        const teacherRefrerPerson = teacherUserData?.referredBy
        if (teacherUserId && teacherRefrerPerson && !teacherUserData) {

          await UserModel.findByIdAndUpdate(
            teacherRefrerPerson,
            { $inc: { etokis: 50 } },
            { new: true } // Optional: returns the updated document
          )

        }

        return NextResponse.json({
          message: "Meeting ended and booking updated successfully",
          status: 200,
        });
      } catch (error) {
        console.error("Error updating booking:", error);
        return NextResponse.json({
          message: "Error updating booking status",
          status: 500,
        });
      }
    }
    // Handle other authorized events
    else {
      const response = {
        message: "Authorized request to Zoom Webhook sample.",
        status: 200,
      };


      return NextResponse.json(response, { status: 200 });
    }
  } else {
    const response = {
      message: "Unauthorized request to Zoom Webhook sample.",
      status: 401,
    };


    return NextResponse.json(response, { status: 401 });
  }
}
