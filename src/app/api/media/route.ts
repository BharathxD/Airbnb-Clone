import { randomUUID } from "crypto";
import s3 from "../../../aws/s3/s3";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import { DeleteObjectRequest } from "aws-sdk/clients/s3";

type Data = {
  s3UploadUrl: string;
  fullUrl: string;
};

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const extension = req.url?.split("%2F")[1];
    const key = `picture_${randomUUID()}.${extension}`;
    const s3Params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      Expires: 10,
      ContentType: `image/${extension}`,
    };
    const s3UploadUrl = await s3.getSignedUrlPromise("putObject", s3Params);
    const fullUrl = `${process.env.AWS_S3_ENDPOINT}/${key}`;
    const data: Data = { s3UploadUrl, fullUrl };
    const responseBody = JSON.stringify(data);

    return new NextResponse(responseBody, {
      status: StatusCodes.OK,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: unknown) {
    console.error(
      `Failed to generate presigned URL: ${(error as Error).message}`
    );
    return new NextResponse("Failed to generate signed URL", {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const key = req.url?.split("com%2F")[1];
    // Delete the object
    const BucketParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME || "",
      Key: key,
    } satisfies DeleteObjectRequest;
    s3.deleteObject(BucketParams, function (err, data) {
      if (err) console.log(err);
    });
    return new NextResponse("Ok", {
      status: StatusCodes.OK,
    });
  } catch (error: any) {
    console.log(`API Error: ${error.message}`);
  }
}
