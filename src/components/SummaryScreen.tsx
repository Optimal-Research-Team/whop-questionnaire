"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Copy, Check, RotateCcw, AlertTriangle, XOctagon, Info, CheckCircle2 } from "lucide-react";
import { cn } from "../lib/utils";
import { generateSummary } from "../lib/summary";
import { formatAdministeredAt } from "../lib/format";
import { Answer, TriggeredFlag, FlagCategory } from "../lib/types";

interface SummaryScreenProps {
  administeredAt: string;
  screenerName: string;
  answers: Map<string, Answer>;
  allFlags: TriggeredFlag[];
  resetAll: () => void;
}

const flagBadgeColors: Record<FlagCategory, string> = {
  OUTSIDE_SCOPE: "bg-red-50 text-red-800 border-red-200",
  ABSOLUTE_CI: "bg-orange-50 text-orange-800 border-orange-200",
  RELATIVE_CI: "bg-amber-50 text-amber-800 border-amber-200",
  NOTE: "bg-sage-50 text-sage-800 border-sage-200",
};

const flagBadgeLabels: Record<FlagCategory, string> = {
  OUTSIDE_SCOPE: "Outside Scope",
  ABSOLUTE_CI: "Absolute CI",
  RELATIVE_CI: "Relative CI",
  NOTE: "Note",
};

function FlagBadgeIcon({ category }: { category: FlagCategory }) {
  if (category === "OUTSIDE_SCOPE") return <XOctagon className="w-3.5 h-3.5" />;
  if (category === "ABSOLUTE_CI" || category === "RELATIVE_CI") return <AlertTriangle className="w-3.5 h-3.5" />;
  return <Info className="w-3.5 h-3.5" />;
}

export function SummaryScreen({
  administeredAt,
  screenerName,
  answers,
  allFlags,
  resetAll,
}: SummaryScreenProps) {
  const [copied, setCopied] = useState(false);

  const summaryText = useMemo(
    () => generateSummary(administeredAt, screenerName, answers, allFlags),
    [administeredAt, screenerName, answers, allFlags]
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = summaryText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const groups = (
    [
      { label: "Outside Scope", cat: "OUTSIDE_SCOPE" as FlagCategory },
      { label: "Absolute CI", cat: "ABSOLUTE_CI" as FlagCategory },
      { label: "Relative CI", cat: "RELATIVE_CI" as FlagCategory },
      { label: "Notes for NP", cat: "NOTE" as FlagCategory },
    ]
  )
    .map((g) => ({ ...g, flags: allFlags.filter((f) => f.category === g.cat) }))
    .filter((g) => g.flags.length > 0);

  return (
    <div className="min-h-screen px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-9">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-sage-700 text-cream-50 mb-4">
            <Check className="w-6 h-6" />
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sage-600 mb-2">
            Screening Complete
          </p>
          <h1 className="font-serif text-[2.1rem] leading-tight font-medium text-warm-900 mb-1">
            {formatAdministeredAt(administeredAt)}
          </h1>
          <p className="text-warm-500 text-sm">
            {screenerName ? `Screened by ${screenerName}` : "Pre-screening summary"}
          </p>
        </div>

        {/* Flags summary */}
        {groups.length > 0 ? (
          <div className="mb-6 space-y-2">
            {groups.map((group) => (
              <div key={group.cat} className={cn("rounded-xl border px-4 py-3", flagBadgeColors[group.cat])}>
                <div className="flex items-center gap-2 mb-1">
                  <FlagBadgeIcon category={group.cat} />
                  <span className="text-sm font-semibold">{flagBadgeLabels[group.cat]}</span>
                  <span className="text-xs opacity-70 tabular-nums">· {group.flags.length}</span>
                </div>
                <ul className="ml-6 text-sm space-y-0.5 list-disc marker:opacity-40">
                  {group.flags.map((f) => (
                    <li key={f.questionId}>{f.questionText}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-6 rounded-xl border border-sage-200 bg-sage-50 px-4 py-3 flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-sage-600 shrink-0" />
            <p className="text-sm font-medium text-sage-800">No contraindications or flags identified.</p>
          </div>
        )}

        {/* EMR note preview */}
        <div className="bg-cream-50 rounded-2xl border border-warm-200 shadow-[0_18px_50px_-32px_rgba(44,78,37,0.4)] overflow-hidden mb-6">
          <div className="px-4 py-3 border-b border-warm-200/70 flex items-center justify-between">
            <span className="text-xs font-semibold text-warm-500 uppercase tracking-[0.12em]">
              EMR Note Preview
            </span>
            <span className="text-xs text-warm-400 font-mono">{summaryText.length} chars</span>
          </div>
          <pre className="p-4 text-xs text-warm-700 leading-relaxed font-mono whitespace-pre-wrap max-h-96 overflow-y-auto">
            {summaryText}
          </pre>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-[15px] transition-all cursor-pointer shadow-[0_12px_28px_-16px_rgba(44,78,37,0.7)]",
              copied ? "bg-sage-600 text-cream-50" : "bg-sage-700 hover:bg-sage-800 text-cream-50"
            )}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied to clipboard
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy EMR Note
              </>
            )}
          </button>

          <button
            onClick={resetAll}
            className="flex items-center justify-center gap-2 px-5 py-3.5 bg-cream-50 border border-warm-200 hover:bg-cream-100 text-warm-600 rounded-xl font-medium text-[15px] transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            New
          </button>
        </div>

        <p className="text-center text-xs text-warm-400 mt-8 leading-relaxed">
          This is a pre-screening tool only. All clinical decisions
          <br />
          are made by the supervising Nurse Practitioner.
        </p>
      </motion.div>
    </div>
  );
}
