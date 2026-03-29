import { NextResponse } from "next/server";
import { structurePolicy } from "@/lib/policyService";
import { runAnalysisPipeline } from "@/lib/analysisService";

/**
 * POST /api/analyze-policy
 * Securely processes a policy text based on the user's profile.
 */
export async function POST(req: Request) {
  try {
    const { rawText, uid, userData } = await req.json();

    // 1. Validate request
    if (!rawText || !rawText.trim()) {
      return NextResponse.json({ success: false, error: "Raw text is required." }, { status: 400 });
    }

    if (!uid || !userData) {
      return NextResponse.json({ success: false, error: "Unauthorized or missing user profile." }, { status: 401 });
    }

    // 2. Call structured policy extraction API (server-side Gemini)
    const structuredPolicy = await structurePolicy(rawText, userData);

    if (!structuredPolicy) {
      throw new Error("Failed to extract structured data from policy.");
    }

    // 3. Run full pipeline (Relevance, Actions, Impact, Explanations)
    const finalResult = runAnalysisPipeline(userData, structuredPolicy);

    // 4. Return final result object
    return NextResponse.json({
      success: true,
      data: finalResult
    });

  } catch (error: any) {
    console.error("Pipeline Error:", error);
    
    // Pass the actual error message so the client can read it
    return NextResponse.json(
      {
        success: false,
        error: error.message || "An internal error occurred while processing the policy.",
      },
      { status: 500 }
    );
  }
}
