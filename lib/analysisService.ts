import { StructuredPolicy } from "./policyService";
import { UserData } from "./userService";

export interface AnalysisResult {
  policy: StructuredPolicy;
  relevance: {
    relevance_score: number;
    priority: "low" | "medium" | "high";
    applies: boolean;
    reason: string[];
  };
  actions: {
    title: string;
    description: string;
    deadline: string | null;
  }[];
  impact: {
    ifAct: string;
    ifIgnore: string;
  };
  explanation: {
    basic: string;
    detailed: string;
  };
}

/**
 * Pure function to evaluate policy relevance based on user profile.
 */
export function evaluateRelevance(userProfile: UserData, policy: StructuredPolicy) {
  let score = 0;
  const reasons: string[] = [];

  // 1. Location match (+0.2)
  const userState = userProfile.location?.state?.toLowerCase() || "";
  const policyScope = (policy.location_scope || []).map(s => s.toLowerCase());
  
  // If policy is national/blank it applies everywhere.
  if (policyScope.some(s => s.includes(userState) || userState.includes(s) || s === "india" || s === "national" || s.includes("all")) || policyScope.length === 0) {
    score += 0.2;
    if (policyScope.length > 0) reasons.push(`Matches your location (${userProfile.location?.state})`);
  }

  // 2. Affected entities match (+0.5)
  const userType = userProfile.basic?.role?.toLowerCase() || ""; 
  const affected = (policy.affected_entities || []).map(e => e.toLowerCase());
  
  const typeMap: Record<string, string[]> = {
    founder: ["startup", "business", "entrepreneur", "founder", "company"],
    freelancer: ["freelancer", "gig worker", "individual", "self-employed"],
    msme: ["msme", "small business", "business", "enterprise", "sme"],
    investor: ["investor", "shareholder", "financial institution", "vc"],
    student: ["student", "school", "university", "college", "education", "educational institutions", "pupils", "learners"],
    employee: ["employee", "salaried", "worker", "staff", "personnel", "individual"],
  };

  const matchingTerms = typeMap[userType] || [userType];
  if (affected.some(e => matchingTerms.some(term => e.includes(term) || term.includes(e)))) {
    score += 0.5;
    reasons.push(`Directly affects your profile type (${userProfile.basic?.role})`);
  }

  // 3. Category/Industry match (+0.3)
  const userIndustry = userProfile.workContext?.industry?.toLowerCase() || "";
  const categories = (policy.category || []).map(c => c.toLowerCase());
  
  // If user is a student, their functional industry is "Education"
  const industryToCheck = userType === "student" ? "education" : userIndustry;

  if (industryToCheck && categories.some(c => c.includes(industryToCheck) || industryToCheck.includes(c))) {
    score += 0.3;
    reasons.push(userType === "student" ? `Highly relevant to the Education sector` : `Relevant to your industry (${userProfile.workContext?.industry})`);
  }

  // Clamp to 1.0
  const relevance_score = Math.min(score, 1);
  
  // Priority
  let priority: "low" | "medium" | "high" = "low";
  if (relevance_score >= 0.7) priority = "high";
  else if (relevance_score >= 0.4) priority = "medium";

  return {
    relevance_score,
    priority,
    applies: relevance_score >= 0.5,
    reason: reasons.length > 0 ? reasons : ["General policy parameter applicable"]
  };
}

/**
 * Generates fallback actions if the AI extraction is empty.
 */
export function generateActions(policy: StructuredPolicy) {
  if (policy.actions_required && policy.actions_required.length > 0) {
    return policy.actions_required;
  }

  // Fallback using key points
  const keyPoints = policy.key_points || [];
  const fallbacks: { title: string; description: string; deadline: string | null }[] = keyPoints.slice(0, 2).map((point) => ({
    title: `Review: ${point.substring(0, 40)}...`,
    description: `Assess how this key point affects your specific operations: "${point}"`,
    deadline: policy.deadline || "ASAP"
  }));

  if (fallbacks.length === 0) {
    fallbacks.push({
      title: "Review policy requirements",
      description: "Read the full summary to understand potential compliance shifts.",
      deadline: null
    });
    fallbacks.push({
      title: "Consult compliance expert",
      description: "Speak with a legal or tax advisor regarding the " + (policy.title || "policy"),
      deadline: null
    });
  }

  return fallbacks;
}

/**
 * Computes the impact of acting vs ignoring.
 */
export function computeImpact(policy: StructuredPolicy) {
  const penalty = policy.financial_implications?.penalty;
  const benefit = policy.financial_implications?.benefit;

  return { 
    ifAct: benefit || "Ensures regulatory compliance and safeguards operational continuity.", 
    ifIgnore: penalty || "Potential exposure to regulatory penalties, audits, or missed opportunities."
  };
}

/**
 * Generates simple and detailed explanations.
 */
export function generateExplanations(policy: StructuredPolicy) {
  return {
    basic: policy.summary || "Summary unavailable.",
    detailed: policy.key_points && policy.key_points.length > 0 
      ? policy.key_points.join(" ") 
      : policy.summary || "Detailed explanation unavailable."
  };
}

/**
 * Main pipeline orchestrator (Pure function)
 */
export function runAnalysisPipeline(userProfile: UserData, policy: StructuredPolicy): AnalysisResult {
  const relevance = evaluateRelevance(userProfile, policy);
  const actions = generateActions(policy);
  const impact = computeImpact(policy);
  const explanation = generateExplanations(policy);

  return {
    policy,
    relevance,
    actions,
    impact,
    explanation
  };
}
