
// src/app/api/upload-profile-picture/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { connectMongoDB } from '../connection/connection'; // Adjust the path as needed
import User from '../models/User'; // Adjust the path as needed

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

export async function POST(req: NextRequest, res:NextResponse) {
  try {
    const { userId, imageBase64 } = await req.json(); // Get the data from the request body

    if (!userId || !imageBase64) {
      return NextResponse.json({ message: 'User ID and image data are required' }, { status: 400 });
    }

    const imageBuffer = Buffer.from(imageBase64, 'base64');

    // Generate a unique key for the image in the S3 bucket
    const timestamp = Date.now();
    const imageKey = `profile-pictures/user_${userId}/${timestamp}_profile_picture.jpg`;

    // Upload to S3
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: imageKey,
      Body: imageBuffer,
      ContentType: 'image/jpeg',
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    // Generate the image URL
    const profilePictureUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageKey}`;



   
    // Update the user's profile picture in the database
    await connectMongoDB();
     await User.findByIdAndUpdate(
        userId,
        { profilePicture: profilePictureUrl },
        { new: true } // Return the updated document
      );
  
    

    return NextResponse.json({ profilePictureUrl });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    return NextResponse.json({ message: 'Failed to upload profile picture' }, { status: 500 });
  }
}
