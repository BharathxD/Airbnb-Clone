"use server";

import type { NextApiRequest, NextApiResponse } from "next";
import { randomUUID } from "crypto";
import s3 from "../../../aws/s3/s3";
import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

type Data = {
    s3UploadUrl: string;
    key: string;
}

export async function GET(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const extension = ((req.query.fileType as string).split("/", 1));
        const key = `picture_${randomUUID()}.ext`;
        const s3Params = {
            Bucket: process.env.BUCKET_NAME,
            key,
            Expires: 10,
            ContentType: `image/${extension}`,
        }
        const s3UploadUrl = await s3.getSignedUrlPromise("putObject", s3Params);
        return res.status(StatusCodes.OK).json({ s3UploadUrl, key: key })
    } catch (error: any) {
        console.log(`Failed to generate presigned url: ${error.message}`);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Failed to Generate Signed URL");
    }
}
