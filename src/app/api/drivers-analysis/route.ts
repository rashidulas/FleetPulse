import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-west-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// Helper function to convert a Readable stream to a string
async function streamToString(stream: Readable): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
  });
}

export async function GET(req: NextRequest) {
  try {
    const params = {
      Bucket: "databricks-workspace-stack-20dd6-bucket", // S3 bucket name
      Key: "drivers_analysis/driver_skill_scores.json", // S3 object path
    };

    const command = new GetObjectCommand(params);
    const data = await s3Client.send(command);

    // Convert the Body stream to a string, then parse as JSON
    const jsonData = await streamToString(data.Body as Readable);
    const parsedData = JSON.parse(jsonData);

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error("Error fetching data from S3:", error);
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 }
    );
  }
}
