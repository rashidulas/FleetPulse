// src/app/api/upload-csv/route.ts
import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const runtime = "edge";

// Configure S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const uploadToS3 = async (buffer: Buffer, filename: string) => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `uploads/${filename}`,
    Body: buffer,
    ContentType: "text/csv",
  });

  try {
    await s3Client.send(command);
    return true;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    return false;
  }
};

export async function POST(req: NextRequest) {
  try {
    // Create a FormData instance from the request body
    const formData = await req.formData();
    const files = formData.getAll("file");

    // Handle multiple files
    const uploadPromises = files.map(async (file) => {
      if (!(file instanceof Blob)) return false;

      const buffer = Buffer.from(await file.arrayBuffer());
      const timestamp = new Date().getTime();
      const originalName = file.name || "untitled.csv";
      const filename = `${timestamp}-${originalName}`;

      return await uploadToS3(buffer, filename);
    });

    const results = await Promise.all(uploadPromises);

    // Check if all uploads were successful
    const allSuccessful = results.every((result) => result === true);

    if (allSuccessful) {
      return NextResponse.json({ message: "Files uploaded successfully" });
    } else {
      return NextResponse.json(
        { message: "Some files failed to upload" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing upload:", error);
    return NextResponse.json(
      { message: "Error processing upload" },
      { status: 500 }
    );
  }
}
