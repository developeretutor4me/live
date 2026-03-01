import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";
import { v4 as uuidv4 } from "uuid";
import { authOptions } from "@/app/auth/auth";
import TutorDocument from "../models/TutorDocument";
import { connectMongoDB } from "../connection/connection";

interface UploadedFile {
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
}

interface FormDataEntries {
  userid?: string;
  teacher: string;
  subject: string;
  purpose: string;
}

class S3Service {
  private static instance: S3Service;
  private client: S3Client;

  private constructor() {
    this.validateEnvironmentVariables();
    this.client = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_KEY!,
      },
    });
  }

  static getInstance(): S3Service {
    if (!S3Service.instance) {
      S3Service.instance = new S3Service();
    }
    return S3Service.instance;
  }

  private validateEnvironmentVariables(): void {
    const requiredEnvVars = [
      "AWS_ACCESS_KEY",
      "AWS_SECRET_KEY",
      "AWS_REGION",
      "AWS_BUCKET_NAME",
    ];

    const missingVars = requiredEnvVars.filter(
      (envVar) => !process.env[envVar]
    );

    if (missingVars.length > 0) {
      throw new Error(
        `Missing required AWS environment variables: ${missingVars.join(", ")}`
      );
    }
  }

  async uploadFile(file: File): Promise<UploadedFile> {
    const fileExtension = file.name.split(".").pop();
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueFileName = `${uuidv4()}-${sanitizedFileName}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: uniqueFileName,
      Body: buffer,
      ContentType: file.type || "application/octet-stream",
      Metadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
      },
    };

    const command = new PutObjectCommand(uploadParams);
    await this.client.send(command);

    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;

    return {
      fileName: file.name,
      fileUrl,
      fileType: file.type,
      fileSize: file.size,
    };
  }
}

class FileValidator {
  private static readonly MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
  private static readonly ALLOWED_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
    "image/jpeg",
    "image/png",
    "image/gif",
  ];

  static validateFiles(files: FormDataEntryValue[]): File[] {
    if (!files?.length) {
      throw new Error("No files provided");
    }

    const validFiles = files.filter(
      (file): file is File => file instanceof File
    );

    if (validFiles.length !== files.length) {
      throw new Error("Invalid file format detected");
    }

    validFiles.forEach((file) => {
      if (file.size > this.MAX_FILE_SIZE) {
        throw new Error(`File ${file.name} exceeds maximum size limit of 50MB`);
      }

      if (!this.ALLOWED_TYPES.includes(file.type)) {
        throw new Error(
          `File type ${file.type} is not allowed for file ${file.name}`
        );
      }
    });

    return validFiles;
  }
}

class DocumentService {
  static async createDocument(
    formData: FormDataEntries,
    uploadedFiles: UploadedFile[],
    userId: string
  ) {
    await connectMongoDB();

    return await TutorDocument.create({
      user: formData.userid || userId,
      teacher: formData.teacher,
      subject: formData.subject,
      purpose: formData.purpose,
      files: uploadedFiles,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const files = formData.getAll("files");

    const validatedFiles = FileValidator.validateFiles(files);

    const formEntries: FormDataEntries = {
      userid: formData.get("userid") as string,
      teacher: formData.get("teacher") as string,
      subject: formData.get("subject") as string,
      purpose: formData.get("purpose") as string,
    };

    if (!formEntries.teacher || !formEntries.subject || !formEntries.purpose) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: teacher, subject, or purpose",
        },
        { status: 400 }
      );
    }

    const s3Service = S3Service.getInstance();
    const uploadPromises = validatedFiles.map((file) =>
      s3Service.uploadFile(file)
    );
    const uploadedFiles = await Promise.all(uploadPromises);

    const document = await DocumentService.createDocument(
      formEntries,
      uploadedFiles,
      session.user.id
    );

    return NextResponse.json({
      success: true,
      document: {
        id: document._id,
        user: document.user,
        teacher: document.teacher,
        subject: document.subject,
        purpose: document.purpose,
        fileCount: uploadedFiles.length,
        createdAt: document.createdAt,
      },
      uploadedFiles: uploadedFiles.map(
        ({ fileName, fileUrl, fileType, fileSize }) => ({
          fileName,
          fileUrl,
          fileType,
          fileSize,
        })
      ),
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    console.error("File upload error:", {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });

    if (
      errorMessage.includes("exceeds maximum size") ||
      errorMessage.includes("not allowed") ||
      errorMessage.includes("No files provided") ||
      errorMessage.includes("Missing required fields")
    ) {
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
