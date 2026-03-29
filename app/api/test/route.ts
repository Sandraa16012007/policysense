import { NextResponse } from "next/server";
import { testPolicyStructuring } from "@/lib/policyService";

export async function GET() {
  try {
    const result = await testPolicyStructuring();

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}