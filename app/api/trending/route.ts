import { NextResponse } from "next/server";
import { model } from "@/lib/gemini";

export async function GET() {
  const prompt = `
You are a top-tier Indian policy intelligence system.
Provide exactly 3 trending and highly critical policy alerts or updates happening RIGHT NOW in India regarding Economics, Finance, or Tech Regulations (e.g., RBI guidelines, GST rules, DPIIT startups, SEBI, etc.).

Output STRICTLY as a JSON array of objects with this schema:
[
  {
    "title": "Short punchy title (max 6 words)",
    "desc": "1-sentence summary of the impact."
  }
]

Do not include markdown, explanations, or any other text. Only the JSON array.
`;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" },
    });
    
    const responseText = result.response.text();
    const trendingData = JSON.parse(responseText);

    return NextResponse.json({ success: true, data: trendingData });
  } catch (error: any) {
    console.error("Trending Fetch Error:", error);
    // Silent fallback
    return NextResponse.json(
      { success: false, data: [
        { title: "RBI Updates Digital Lending", desc: "New guidelines expected for fintechs regarding metadata." },
        { title: "GST Council Revisions", desc: "Possible rate rationalization for MSMEs in the upcoming quarter." }
      ]},
      { status: 200 } // keep 200 so UI doesn't crash on this widget
    );
  }
}
