import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import argon2 from "argon2";
import { omit } from "lodash";
import { StatusCodes } from "http-status-codes";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    const user = await prisma?.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isValid = await argon2.verify(user.hashedPassword!, password);
    if (!isValid) {
      throw new Error("Invalid Credentials");
    }
    const modifiedUser = omit(user, "hashedPassword");
    return NextResponse.json(modifiedUser, { status: StatusCodes.OK });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Invalid Credentials" },
      { status: StatusCodes.UNAUTHORIZED }
    );
  }
}
