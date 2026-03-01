import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { authOptions } from '@/app/auth/auth';
import { getServerSession } from 'next-auth';


// Initialize the S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    
    // Parse the incoming form data
    const timestamp = Date.now();
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ success: false, error: 'No file provided or invalid file type' }, { status: 400 });
    }

    // const buffer = Buffer.from(await file.arrayBuffer());
    
    const buffer = Buffer.from(await file.arrayBuffer());


    const fileName = `${timestamp}-${file.name}`;

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    };

    // Create the command to upload the file
    const command = new PutObjectCommand(uploadParams);

    // Upload to S3
    await s3.send(command);

    // Return the uploaded file URL
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    return NextResponse.json({ success: true, fileUrl: fileUrl });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ success: false, error: 'Failed to upload file' }, { status: 500 });
  }
}
