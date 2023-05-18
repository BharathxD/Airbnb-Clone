import { randomUUID } from "crypto";
import s3 from "../../../aws/s3/s3";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

type Data = {
  s3UploadUrl: string;
  key: string;
};

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const extension = req.url?.split("%2F")[1];
    const key = `picture_${randomUUID()}.ext`;
    const s3Params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      Expires: 10,
      ContentType: `image/${extension}`,
    };
    const s3UploadUrl = await s3.getSignedUrlPromise("putObject", s3Params);
    const data: Data = { s3UploadUrl, key };
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
