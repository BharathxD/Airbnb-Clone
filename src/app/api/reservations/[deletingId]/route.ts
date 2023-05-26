import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

export async function DEL(req: NextRequest) {
    try {
        const body = await req.json();
        console.log(`Body: ${body}`);
        return NextResponse.json({ message: "Hello" }, {
            status: StatusCodes.OK
        })
    } catch (error: any) {
        return NextResponse.json(
            { message: "Something's wrong with the server" },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
}