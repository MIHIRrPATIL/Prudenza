import { PrismaClient } from "@prisma/client";

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = global;

export const db = globalForPrisma.prisma || new PrismaClient({
  log: ['query', 'error', 'warn'],  // Add logging for debugging
  
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}