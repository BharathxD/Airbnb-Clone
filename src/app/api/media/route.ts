import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import s3 from "../../../aws/s3/s3";

type Data = {
    s3UploadUrl: string;
    key: string;
}

