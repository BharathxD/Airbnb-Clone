import { PrismaClient } from "@prisma/client";

// Declare a global definition
declare global {
    var prisma: PrismaClient | undefined
}

// Searches for globalThis.prisma or creates a new prisma client
const client = globalThis.prisma || new PrismaClient();

/**
 * NextJS Fast-Refresh will create lot of `PrismaClient` instances
 * If the environment is not in production, it will reset the globalThis.prisma to the client
 * `globalThis` is a constant reference to the global object, and hot reloading only affects the code modules that are being updated, not the global object itself. 
 */
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client