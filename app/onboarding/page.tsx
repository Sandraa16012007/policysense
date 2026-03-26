"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  User,
  Briefcase,
  MapPin,
  DollarSign,
  Settings2,
  ChevronDown,
  Search,
  PartyPopper,
} from "lucide-react";
import { cn } from "@/lib/utils";
import OnboardingNavbar from "@/components/OnboardingNavbar";
import Footer from "@/components/Footer";

/* ──────────────────────────── DATA ──────────────────────────── */

const ROLES = [
  { id: "founder", label: "Founder / Business Owner", icon: "🚀" },
  { id: "msme", label: "MSME Owner", icon: "🏭" },
  { id: "investor", label: "Investor", icon: "📈" },
  { id: "salaried", label: "Salaried Professional", icon: "💼" },
  { id: "government", label: "Government Employee", icon: "🏛️" },
  { id: "student", label: "Student", icon: "🎓" },
  { id: "freelancer", label: "Freelancer", icon: "✨" },
];

const EXPERIENCE_LEVELS = [
  { id: "beginner", label: "Beginner", description: "explain simply" },
  { id: "intermediate", label: "Intermediate", description: "" },
  { id: "advanced", label: "Advanced", description: "go deeper" },
];

const PRIMARY_GOALS = [
  "Avoid penalties & stay compliant",
  "Save tax / reduce costs",
  "Grow income / business",
  "Discover opportunities / schemes",
  "Stay informed",
];

const INDUSTRIES = [
  "Agriculture",
  "Automotive",
  "Banking & Finance",
  "Construction",
  "Consulting",
  "Consumer Goods",
  "E-commerce",
  "Education",
  "Energy & Utilities",
  "Entertainment",
  "Fashion & Apparel",
  "Food & Beverage",
  "Healthcare",
  "Hospitality",
  "Information Technology",
  "Insurance",
  "Legal",
  "Logistics",
  "Manufacturing",
  "Media",
  "Mining",
  "Pharma",
  "Real Estate",
  "Retail",
  "SaaS / Tech",
  "Telecom",
  "Textiles",
  "Transportation",
  "Other",
];

const BUSINESS_TYPES = [
  "Individual",
  "Sole Proprietorship",
  "Partnership",
  "Private Limited",
  "Not sure",
];

const EMPLOYMENT_TYPES = ["Private sector", "Government / PSU"];

const INVESTMENT_TYPES = [
  "Stocks",
  "Mutual Funds",
  "Startups",
  "Crypto",
  "Real Estate",
];

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
  "Chandigarh",
  "Puducherry",
  "Lakshadweep",
  "Andaman & Nicobar",
  "Dadra & Nagar Haveli and Daman & Diu",
];

const REGISTRATIONS = ["GST", "MSME (Udyam)", "Startup India", "None"];

const INTEREST_TOPICS = [
  "Tax",
  "Startup policy",
  "RBI / finance",
  "International trade",
];

const STEP_META = [
  { icon: User, label: "You" },
  { icon: Briefcase, label: "Work" },
  { icon: MapPin, label: "Location" },
  { icon: DollarSign, label: "Finance" },
  { icon: Settings2, label: "Prefs" },
];

/* ──────────────────────── TYPES ──────────────────────── */

interface FormData {
  role: string;
  experience: string;
  goals: string[];
  // Step 2
  industry: string;
  businessType: string;
  subSector: string;
  employmentType: string;
  department: string;
  investmentTypes: string[];
  fieldOfStudy: string;
  // Step 3
  country: string;
  state: string;
  city: string;
  // Step 4
  revenueRange: string;
  incomeRange: string;
  portfolioSize: string;
  registrations: string[];
  teamSize: string;
  // Step 5
  riskPreference: string;
  timeSensitivity: string;
  decisionStyle: string;
  knowledgeLevel: string;
  language: string;
  interests: string[];
}

/* ──────────────── REUSABLE UI PIECES ──────────────── */

function CardRadio({
  options,
  value,
  onChange,
  columns = 2,
}: {
  options: { id: string; label: string; icon?: string }[];
  value: string;
  onChange: (v: string) => void;
  columns?: number;
}) {
  return (
    <div
      className={cn(
        "grid gap-3",
        columns === 2
          ? "grid-cols-1 sm:grid-cols-2"
          : columns === 3
          ? "grid-cols-1 sm:grid-cols-3"
          : "grid-cols-1"
      )}
    >
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          className={cn(
            "relative flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-left transition-all duration-200 group",
            value === opt.id
              ? "bg-primary/10 border-primary/50 shadow-lg shadow-primary/10"
              : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20"
          )}
        >
          {opt.icon && <span className="text-xl">{opt.icon}</span>}
          <span
            className={cn(
              "text-sm font-medium transition-colors",
              value === opt.id ? "text-white" : "text-foreground/70"
            )}
          >
            {opt.label}
          </span>
          {value === opt.id && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
            >
              <Check size={12} className="text-white" />
            </motion.div>
          )}
        </button>
      ))}
    </div>
  );
}

function SegmentedControl({
  options,
  value,
  onChange,
}: {
  options: { id: string; label: string; description?: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex bg-white/[0.03] border border-white/10 rounded-2xl p-1">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          className={cn(
            "relative flex-1 py-3 px-3 rounded-xl text-sm font-medium transition-all z-10",
            value === opt.id
              ? "text-white"
              : "text-foreground/50 hover:text-foreground/70"
          )}
        >
          {value === opt.id && (
            <motion.div
              layoutId="segmented-bg"
              className="absolute inset-0 bg-primary/20 border border-primary/30 rounded-xl"
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
            />
          )}
          <span className="relative z-10">
            {opt.label}
            {opt.description && (
              <span className="hidden sm:inline text-xs text-foreground/40 ml-1">
                ({opt.description})
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
}

function ChipSelect({
  options,
  selected,
  onChange,
  max,
}: {
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
  max?: number;
}) {
  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt));
    } else if (!max || selected.length < max) {
      onChange([...selected, opt]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={cn(
              "px-4 py-2.5 rounded-full text-sm font-medium border transition-all duration-200",
              active
                ? "bg-primary/15 border-primary/50 text-white shadow-lg shadow-primary/10"
                : "bg-white/[0.03] border-white/10 text-foreground/60 hover:bg-white/[0.06] hover:border-white/20 hover:text-foreground/80"
            )}
          >
            {active && (
              <motion.span
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                className="inline-flex mr-1.5"
              >
                <Check size={14} />
              </motion.span>
            )}
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function SelectDropdown({
  options,
  value,
  onChange,
  placeholder,
  searchable,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  searchable?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = searchable
    ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase()))
    : options;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm transition-all",
          value ? "text-white" : "text-foreground/30",
          open && "border-primary/50 ring-1 ring-primary/25"
        )}
      >
        <span>{value || placeholder}</span>
        <ChevronDown
          size={16}
          className={cn(
            "text-foreground/40 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-[#131b2e] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden max-h-60"
          >
            {searchable && (
              <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/10">
                <Search size={14} className="text-foreground/40" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full bg-transparent text-sm text-white placeholder:text-foreground/30 focus:outline-none"
                  autoFocus
                />
              </div>
            )}
            <div className="overflow-y-auto max-h-48 scrollbar-hide">
              {filtered.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-sm transition-colors",
                    opt === value
                      ? "bg-primary/15 text-white"
                      : "text-foreground/60 hover:bg-white/[0.06] hover:text-white"
                  )}
                >
                  {opt}
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="px-4 py-3 text-sm text-foreground/30">
                  No results
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click-away overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setOpen(false);
            setQuery("");
          }}
        />
      )}
    </div>
  );
}

function RadioGroup({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl border text-sm text-left transition-all duration-200",
            value === opt
              ? "bg-primary/10 border-primary/40 text-white"
              : "bg-white/[0.03] border-white/10 text-foreground/60 hover:bg-white/[0.06] hover:border-white/20"
          )}
        >
          <div
            className={cn(
              "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0",
              value === opt ? "border-primary bg-primary" : "border-white/30"
            )}
          >
            {value === opt && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-1.5 h-1.5 rounded-full bg-white"
              />
            )}
          </div>
          {opt}
        </button>
      ))}
    </div>
  );
}

function ChecklistSelect({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (opt: string) => {
    if (opt === "None") {
      onChange(selected.includes("None") ? [] : ["None"]);
      return;
    }
    const without = selected.filter((s) => s !== "None");
    if (without.includes(opt)) {
      onChange(without.filter((s) => s !== opt));
    } else {
      onChange([...without, opt]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl border text-sm text-left transition-all duration-200",
              active
                ? "bg-primary/10 border-primary/40 text-white"
                : "bg-white/[0.03] border-white/10 text-foreground/60 hover:bg-white/[0.06] hover:border-white/20"
            )}
          >
            <div
              className={cn(
                "w-4 h-4 rounded border-2 flex items-center justify-center transition-all flex-shrink-0",
                active ? "border-primary bg-primary" : "border-white/30"
              )}
            >
              {active && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Check size={10} className="text-white" />
                </motion.div>
              )}
            </div>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function StepSection({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="text-sm font-semibold text-foreground/80">
          {label}
        </label>
        {hint && (
          <p className="text-xs text-foreground/40 mt-0.5">{hint}</p>
        )}
      </div>
      {children}
    </div>
  );
}

/* ──────────────────────── MAIN PAGE ──────────────────────── */

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [formData, setFormData] = useState<FormData>({
    role: "",
    experience: "intermediate",
    goals: [],
    industry: "",
    businessType: "",
    subSector: "",
    employmentType: "",
    department: "",
    investmentTypes: [],
    fieldOfStudy: "",
    country: "India",
    state: "",
    city: "",
    revenueRange: "",
    incomeRange: "",
    portfolioSize: "",
    registrations: [],
    teamSize: "",
    riskPreference: "",
    timeSensitivity: "",
    decisionStyle: "",
    knowledgeLevel: "",
    language: "English",
    interests: [],
  });

  const update = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const isBusinessUser = ["founder", "msme", "freelancer"].includes(
    formData.role
  );
  const isSalariedGovt = ["salaried", "government"].includes(formData.role);
  const isInvestor = formData.role === "investor";
  const isStudent = formData.role === "student";

  const TOTAL_STEPS = 5;

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.role !== "" && formData.goals.length > 0;
      case 2:
        if (isBusinessUser) return formData.industry !== "";
        if (isSalariedGovt) return formData.employmentType !== "";
        if (isInvestor) return formData.investmentTypes.length > 0;
        if (isStudent) return formData.fieldOfStudy !== "";
        return true;
      case 3:
        return formData.state !== "";
      case 4:
        return true; // financial context always allows proceeding
      case 5:
        return true; // preferences are optional
      default:
        return true;
    }
  };

  const goNext = () => {
    if (step <= TOTAL_STEPS) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  };

  const goBack = () => {
    if (step > 1) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  /* ──────────── STEP RENDERERS ──────────── */

  const renderStep1 = () => (
    <div className="flex flex-col gap-8">
      <StepSection label="What best describes you?">
        <CardRadio
          options={ROLES}
          value={formData.role}
          onChange={(v) => update("role", v)}
        />
      </StepSection>

      <StepSection label="Your experience with finance/policies">
        <SegmentedControl
          options={EXPERIENCE_LEVELS}
          value={formData.experience}
          onChange={(v) => update("experience", v)}
        />
      </StepSection>

      <StepSection
        label="What do you want from PolicySense?"
        hint="Select up to 3"
      >
        <ChipSelect
          options={PRIMARY_GOALS}
          selected={formData.goals}
          onChange={(v) => update("goals", v)}
          max={3}
        />
      </StepSection>
    </div>
  );

  const renderStep2 = () => (
    <div className="flex flex-col gap-6">
      {isBusinessUser && (
        <>
          <StepSection label="Your Industry">
            <SelectDropdown
              options={INDUSTRIES}
              value={formData.industry}
              onChange={(v) => update("industry", v)}
              placeholder="Select your industry"
              searchable
            />
          </StepSection>

          <StepSection label="Business Type">
            <RadioGroup
              options={BUSINESS_TYPES}
              value={formData.businessType}
              onChange={(v) => update("businessType", v)}
            />
          </StepSection>

          <StepSection label="Sub-sector (optional)">
            <input
              type="text"
              value={formData.subSector}
              onChange={(e) => update("subSector", e.target.value)}
              placeholder="e.g., D2C skincare, SaaS, logistics"
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
            />
          </StepSection>
        </>
      )}

      {isSalariedGovt && (
        <>
          <StepSection label="Employment Type">
            <RadioGroup
              options={EMPLOYMENT_TYPES}
              value={formData.employmentType}
              onChange={(v) => update("employmentType", v)}
            />
          </StepSection>

          <StepSection label="Industry / Department">
            <input
              type="text"
              value={formData.department}
              onChange={(e) => update("department", e.target.value)}
              placeholder="e.g., IT, Banking, Railways, Education"
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
            />
          </StepSection>
        </>
      )}

      {isInvestor && (
        <StepSection label="Type of Investments">
          <ChipSelect
            options={INVESTMENT_TYPES}
            selected={formData.investmentTypes}
            onChange={(v) => update("investmentTypes", v)}
          />
        </StepSection>
      )}

      {isStudent && (
        <StepSection label="Field of Study">
          <input
            type="text"
            value={formData.fieldOfStudy}
            onChange={(e) => update("fieldOfStudy", e.target.value)}
            placeholder="e.g., Engineering, Commerce, Law"
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
          />
        </StepSection>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="flex flex-col gap-6">
      <StepSection label="Country">
        <SelectDropdown
          options={["India"]}
          value={formData.country}
          onChange={(v) => update("country", v)}
          placeholder="Select country"
        />
      </StepSection>

      <StepSection label="State">
        <SelectDropdown
          options={INDIAN_STATES}
          value={formData.state}
          onChange={(v) => update("state", v)}
          placeholder="Select your state"
          searchable
        />
      </StepSection>

      <StepSection label="City (optional)">
        <input
          type="text"
          value={formData.city}
          onChange={(e) => update("city", e.target.value)}
          placeholder="e.g., Delhi, Bangalore"
          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
        />
      </StepSection>
    </div>
  );

  const renderStep4 = () => (
    <div className="flex flex-col gap-6">
      {isBusinessUser && (
        <>
          <StepSection label="Annual Revenue Range">
            <SelectDropdown
              options={[
                "Below ₹10L",
                "₹10L – ₹1Cr",
                "₹1Cr – ₹10Cr",
                "₹10Cr+",
                "Not sure",
              ]}
              value={formData.revenueRange}
              onChange={(v) => update("revenueRange", v)}
              placeholder="Select range"
            />
          </StepSection>

          <StepSection label="Are you registered for any of these?">
            <ChecklistSelect
              options={REGISTRATIONS}
              selected={formData.registrations}
              onChange={(v) => update("registrations", v)}
            />
          </StepSection>

          <StepSection label="Team Size">
            <SelectDropdown
              options={["Just me", "2–10", "10–50", "50+"]}
              value={formData.teamSize}
              onChange={(v) => update("teamSize", v)}
              placeholder="Select team size"
            />
          </StepSection>
        </>
      )}

      {isSalariedGovt && (
        <StepSection label="Annual Income Range">
          <SelectDropdown
            options={["Below ₹5L", "₹5L – ₹15L", "₹15L – ₹30L", "₹30L+"]}
            value={formData.incomeRange}
            onChange={(v) => update("incomeRange", v)}
            placeholder="Select range"
          />
        </StepSection>
      )}

      {isInvestor && (
        <StepSection label="Portfolio Size (optional)">
          <SelectDropdown
            options={["< ₹5L", "₹5L – ₹50L", "₹50L+"]}
            value={formData.portfolioSize}
            onChange={(v) => update("portfolioSize", v)}
            placeholder="Select range"
          />
        </StepSection>
      )}

      {isStudent && (
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-4">
            <Sparkles size={14} />
            No financial info needed
          </div>
          <p className="text-foreground/50 text-sm">
            We&apos;ll focus on policies relevant to your academic field and
            career interests.
          </p>
        </div>
      )}
    </div>
  );

  const renderStep5 = () => (
    <div className="flex flex-col gap-6">
      <StepSection label="How do you approach compliance?">
        <RadioGroup
          options={[
            "Play it safe (avoid any risk)",
            "Balanced",
            "Optimize for gains",
          ]}
          value={formData.riskPreference}
          onChange={(v) => update("riskPreference", v)}
        />
      </StepSection>

      <StepSection label="How quickly do you act on updates?">
        <RadioGroup
          options={["Immediately", "Within a week", "Only if critical"]}
          value={formData.timeSensitivity}
          onChange={(v) => update("timeSensitivity", v)}
        />
      </StepSection>

      <StepSection label="How do you make decisions?">
        <RadioGroup
          options={["Data-driven", "Expert-advised", "Quick & practical"]}
          value={formData.decisionStyle}
          onChange={(v) => update("decisionStyle", v)}
        />
      </StepSection>

      <StepSection label="Policy/legal familiarity">
        <RadioGroup
          options={["Not familiar", "Somewhat familiar", "Comfortable"]}
          value={formData.knowledgeLevel}
          onChange={(v) => update("knowledgeLevel", v)}
        />
      </StepSection>

      <StepSection label="Preferred language">
        <SelectDropdown
          options={["English", "Hindi"]}
          value={formData.language}
          onChange={(v) => update("language", v)}
          placeholder="Select language"
        />
      </StepSection>

      <StepSection label="Topics you care about (optional)">
        <ChipSelect
          options={INTEREST_TOPICS}
          selected={formData.interests}
          onChange={(v) => update("interests", v)}
        />
      </StepSection>
    </div>
  );

  const renderFinalScreen = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center py-12 gap-6"
    >
      {/* Celebration orb */}
      <div className="relative">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_60px_rgba(79,141,242,0.4)]"
        >
          <PartyPopper size={36} className="text-white" />
        </motion.div>
        {/* Orbiting rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="absolute -inset-4 rounded-full border border-dashed border-primary/30"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          className="absolute -inset-8 rounded-full border border-accent/20"
        />
      </div>

      <div>
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
          You&apos;re all set{" "}
        </h2>
        <p className="text-foreground/50 text-base max-w-md mx-auto leading-relaxed">
          You&apos;ll now get clear, personalized actions from every policy or
          news article.
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:bg-primary/90 transition-all group mt-4"
        onClick={() => {
          // Navigate to dashboard
          window.location.href = "/dashboard";
        }}
      >
        Go to Dashboard
        <ArrowRight
          size={18}
          className="group-hover:translate-x-1 transition-transform"
        />
      </motion.button>

      <p className="text-xs text-foreground/30 mt-2">
        You can update your preferences anytime in Settings
      </p>
    </motion.div>
  );

  const stepContent = [
    renderStep1,
    renderStep2,
    renderStep3,
    renderStep4,
    renderStep5,
  ];

  const stepHeadings = [
    {
      title: "Let's make this personal",
      subtitle: "We'll tailor every policy insight based on you.",
    },
    {
      title: "Tell us about your work",
      subtitle: "We only show what's relevant to you.",
    },
    {
      title: "Where are you based?",
      subtitle: "Policies change based on location.",
    },
    {
      title: "Help us estimate impact",
      subtitle: "This helps us calculate risks, savings, and eligibility.",
    },
    {
      title: "Fine-tune your insights",
      subtitle: "Optional, but improves accuracy.",
    },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground overflow-x-hidden">
      {/* Background Gradients */}
      <div className="fixed top-0 left-1/3 w-[50rem] h-[50rem] bg-primary/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[35rem] h-[35rem] bg-accent/8 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <OnboardingNavbar />

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center pt-28 md:pt-32 pb-16 px-4 sm:px-6">
        <div className="w-full max-w-2xl">
          {step <= TOTAL_STEPS && (
            <>
              {/* ── Progress Bar ── */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                {/* Step pills */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {STEP_META.map((s, i) => {
                      const Icon = s.icon;
                      const isActive = i + 1 === step;
                      const isDone = i + 1 < step;
                      return (
                        <div
                          key={i}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300",
                            isActive
                              ? "bg-primary/15 border border-primary/30 text-primary"
                              : isDone
                              ? "bg-white/5 text-foreground/50"
                              : "text-foreground/25"
                          )}
                        >
                          {isDone ? (
                            <Check size={12} className="text-green-400" />
                          ) : (
                            <Icon size={12} />
                          )}
                          <span className="hidden sm:inline">{s.label}</span>
                        </div>
                      );
                    })}
                  </div>
                  <span className="text-xs text-foreground/30">
                    ~30 seconds
                  </span>
                </div>

                {/* Bar */}
                <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(step / TOTAL_STEPS) * 100}%`,
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            </>
          )}

          {/* ── Step Card ── */}
          <div className="relative bg-background/50 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
            {/* Card decorations */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/8 rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/8 rounded-full blur-[60px] pointer-events-none" />

            <div className="relative z-10 p-6 sm:p-8 md:p-10">
              <AnimatePresence mode="wait" custom={direction}>
                {step <= TOTAL_STEPS ? (
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {/* Step heading */}
                    <div className="mb-8">
                      <div className="flex items-center gap-2 text-xs text-primary font-semibold uppercase tracking-widest mb-2">
                        <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center text-[10px]">
                          {step}
                        </div>
                        Step {step} of {TOTAL_STEPS}
                      </div>
                      <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
                        {stepHeadings[step - 1].title}
                      </h1>
                      <p className="text-foreground/50 text-sm">
                        {stepHeadings[step - 1].subtitle}
                      </p>
                    </div>

                    {/* Step content */}
                    {stepContent[step - 1]()}

                    {/* Privacy note */}
                    <div className="mt-8 flex items-center gap-2 text-xs text-foreground/30">
                      <div className="w-1 h-1 rounded-full bg-green-400" />
                      We only use this to personalize your insights
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="final"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderFinalScreen()}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Navigation Buttons ── */}
              {step <= TOTAL_STEPS && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.06]">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={step === 1}
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-xl transition-all",
                      step === 1
                        ? "text-foreground/20 cursor-not-allowed"
                        : "text-foreground/60 hover:text-white hover:bg-white/[0.06]"
                    )}
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>

                  <div className="flex items-center gap-3">
                    {step === TOTAL_STEPS && (
                      <button
                        type="button"
                        onClick={goNext}
                        className="text-sm font-medium text-foreground/40 hover:text-foreground/60 transition-colors px-4 py-3"
                      >
                        Skip
                      </button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={goNext}
                      disabled={!canProceed()}
                      className={cn(
                        "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all group",
                        canProceed()
                          ? "bg-primary text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:bg-primary/90"
                          : "bg-white/[0.06] text-foreground/30 cursor-not-allowed"
                      )}
                    >
                      {step === TOTAL_STEPS ? "Finish" : "Continue"}
                      <ArrowRight
                        size={16}
                        className={cn(
                          "transition-transform",
                          canProceed() && "group-hover:translate-x-1"
                        )}
                      />
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
