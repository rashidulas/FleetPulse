import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";

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

const triggerDatabricksJob = async () => {
  const databricksToken = process.env.DATABRICKS_API_TOKEN;
  const databricksWorkspaceUrl = process.env.DATABRICKS_WORKSPACE_URL;
  const databricksJobId = process.env.DATABRICKS_JOB_ID;

  try {
    const response = await fetch(
      `${databricksWorkspaceUrl}/api/2.1/jobs/run-now`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${databricksToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ job_id: databricksJobId }),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Error triggering Databricks job:", errorDetails);
      return false;
    }

    console.log("Databricks job triggered successfully");
    return true;
  } catch (error) {
    console.error("Error triggering Databricks job:", error);
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
      const originalName = file.name || "untitled.csv";

      // Upload if the file does not exist
      return await uploadToS3(buffer, originalName);
    });

    const results = await Promise.all(uploadPromises);

    // Check if all uploads were successful
    const allSuccessful = results.every((result) => result !== false);

    if (allSuccessful) {
      // Trigger Databricks job after successful upload
      const jobTriggered = await triggerDatabricksJob();

      if (jobTriggered) {
        return NextResponse.json({
          message: "Files uploaded successfully and Databricks job triggered",
        });
      } else {
        return NextResponse.json(
          { message: "Files uploaded, but failed to trigger Databricks job" },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Some files were skipped as they already exist" },
        { status: 200 }
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
