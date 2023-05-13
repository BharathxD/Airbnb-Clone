"use server";

import argon2 from "argon2";
import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { omit } from "lodash";

export async function POST(request: NextRequest) {
  try {
    const { email, name, password } = await request.json();
    const hashedPassword = await argon2.hash(password);
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name,
        hashedPassword,
      },
    });
    const modifiedUser = omit(user, "hashedPassword");
    return NextResponse.json(modifiedUser);
  } catch (error: any) {
    // console.error("An error occurred:", error);
    if (error.code == "P2002") {
      return NextResponse.json("User already exists", {
        status: 403,
      });
    }
  }
}
