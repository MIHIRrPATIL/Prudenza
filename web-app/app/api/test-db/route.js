import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Test database connection with simple queries
    const userCount = await db.user.count();
    const accountCount = await db.account.count();
    
    // Check Prisma models are correctly mapped to tables
    const tableCheck = await db.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema='public' 
      ORDER BY table_name;
    `;
    
    return NextResponse.json({
      success: true,
      connection: "Database connected successfully",
      userCount,
      accountCount,
      tables: tableCheck
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}