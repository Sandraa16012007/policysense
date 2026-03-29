import { model } from "./gemini";

/* ──────────────────────── TYPES ──────────────────────── */

export interface ActionRequired {
  title: string;
  description: string;
  deadline: string | null;
}

export interface FinancialImplications {
  penalty: string | null;
  benefit: string | null;
}

export interface StructuredPolicy {
  title: string;
  summary: string;
  category: string[];
  affected_entities: string[];
  location_scope: string[];
  effective_date: string | null;
  deadline: string | null;
  actions_required: ActionRequired[];
  financial_implications: FinancialImplications;
  key_points: string[];
  source_chunks: string[];
}

/* ──────────────────────── HELPERS ──────────────────────── */

/**
 * Validates the quality of extracted actions.
 */
export function validateActionsQuality(actions: ActionRequired[]): boolean {
  if (!actions || actions.length === 0) return false;

  const vaguePhrases = [
    "follow guidelines", 
    "ensure compliance", 
    "review policy", 
    "read document", 
    "adhere to rules"
  ];

  let meaningfulCount = 0;

  for (const action of actions) {
    const title = action.title.toLowerCase();
    const desc = action.description.toLowerCase();
    
    const isVague = vaguePhrases.some(phrase => title.includes(phrase) || desc.includes(phrase));
    
    // Consider it meaningful if it's not vague and has semantic weight
    if (!isVague && title.length > 10) {
      meaningfulCount++;
    }
  }

  return meaningfulCount > 0;
}

/**
 * Generates structured fallback actions using key points if the primary extraction fails or returns weak data.
 */
export function generateFallbackActions(keyPoints: string[]): ActionRequired[] {
  const points = keyPoints && keyPoints.length > 0 ? keyPoints : [
    "Review policy requirements",
    "Ensure compliance with regulations",
    "Consult relevant authority"
  ];

  return points.slice(0, 3).map((point, index) => ({
    title: `Review Requirement ${index + 1}`,
    description: `Assess operational alignment against: "${point}"`,
    deadline: null
  }));
}

/* ──────────────────────── MAIN FUNCTION ──────────────────────── */

/**
 * Converts raw policy or news text into a structured JSON format.
 */
export async function structurePolicy(rawText: string): Promise<StructuredPolicy> {
  const prompt = `
You are a strict information extraction engine.

Extract structured policy data from the input text.

---

## RULES (MANDATORY)

* Do NOT invent information
* Do NOT skip fields if data exists
* Do NOT output "Untitled Policy"
* If title is missing → generate a concise, specific title from content
* If data is missing → return null or []
* Output MUST be valid JSON only

---

## EXTRACTION DETAILS

### title
* Extract exact title if present
* Else generate a specific title from content

### summary
* 1–2 sentence factual summary
* No interpretation

### category
* Extract if present
* Else infer conservatively (max 3)

### affected_entities
* Extract all explicitly mentioned groups (e.g., students, schools)

### actions_required (CRITICAL)
* Extract ALL actionable steps from the text
* Each action must follow:
{ "title": string, "description": string, "deadline": string | null }
Rules:
* Must be actionable (verbs like implement, audit, obtain, limit, ensure)
* Must NOT be vague summaries
* Must NOT merge multiple actions into one
* Must NOT invent actions

### financial_implications
{ "penalty": string | null, "benefit": string | null }

### key_points
* Extract 3–6 clear factual points

### source_chunks
* Extract exact supporting sentences
* No paraphrasing

### dates
* Convert to YYYY-MM if possible
* Else keep raw string
* If missing → null

---

## OUTPUT FORMAT

Return ONLY:
{
"title": string,
"summary": string,
"category": string[],
"affected_entities": string[],
"location_scope": string[],
"effective_date": string | null,
"deadline": string | null,
"actions_required": [
{
"title": string,
"description": string,
"deadline": string | null
}
],
"financial_implications": {
"penalty": string | null,
"benefit": string | null
},
"key_points": string[],
"source_chunks": string[]
}

---

## FINAL QUALITY CHECK
Before returning:
* Ensure title is NOT "Untitled Policy"
* Ensure at least 3 meaningful actions if present in text
* Ensure no vague phrases like "follow guidelines"
* Ensure valid JSON

---
TEXT TO ANALYZE:
"${rawText.replace(/"/g, "'")}"
`;

  try {
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
      },
    });
    
    // Process response
    const responseText = result.response.text();
    const structuredData: StructuredPolicy = JSON.parse(responseText);

    // Filter Title
    const finalTitle = (structuredData.title && structuredData.title !== "Untitled Policy") 
      ? structuredData.title 
      : "Policy Analysis Report";

    // Validate Actions
    const rawActions = structuredData.actions_required || [];
    let finalActions = rawActions;

    if (!validateActionsQuality(rawActions)) {
      finalActions = generateFallbackActions(structuredData.key_points || []);
    }

    // Return robust structure
    return {
      title: finalTitle,
      summary: structuredData.summary || "Summary data unavailable.",
      category: structuredData.category || [],
      affected_entities: structuredData.affected_entities || [],
      location_scope: structuredData.location_scope || [],
      effective_date: structuredData.effective_date || null,
      deadline: structuredData.deadline || null,
      actions_required: finalActions,
      financial_implications: {
        penalty: structuredData.financial_implications?.penalty || null,
        benefit: structuredData.financial_implications?.benefit || null,
      },
      key_points: structuredData.key_points || [],
      source_chunks: structuredData.source_chunks || [],
    };
  } catch (error: any) {
    console.error("Policy Structuring Error:", error);
    throw new Error(`Failed to structure policy data: ${error.message}`);
  }
}

/* ──────────────────────── TEST FUNCTION ──────────────────────── */

/**
 * Test function to verify policy structuring with sample data.
 */
export async function testPolicyStructuring() {
  const samplePolicyText = `
The government is considering changes to GST rules for small businesses.
Some officials hinted that e-invoicing may become mandatory next year.
However, no official deadline has been announced yet.
  `;

  console.log("🚀 Starting Policy Structuring Test...");
  try {
    const data = await structurePolicy(samplePolicyText);

    console.log("✅ Structuring Success!");
    console.log(JSON.stringify(data, null, 2));

    return data; 
  } catch (err) {
    console.error("❌ Test Failed:", err);
    throw err; 
  }
}
