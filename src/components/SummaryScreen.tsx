"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Copy, Check, RotateCcw, AlertTriangle, XOctagon, Info } from "lucide-react";
import { cn } from "../lib/utils";
import { generateSummary } from "../lib/summary";
import { Answer, TriggeredFlag, FlagCategory } from "../lib/types";

interface SummaryScreenProps {
  patientName: string;
  screenerName: string;
  answers: Map<string, Answer>;
  allFlags: TriggeredFlag[];
  resetAll: () => void;
}

const flagBadgeColors: Record<FlagCategory, string> = {
  OUTSIDE_SCOPE: "bg-red-100 text-red-800 border-red-200",
  ABSOLUTE_CI: "bg-orange-100 text-orange-800 border-orange-200",
  RELATIVE_CI: "bg-amber-100 text-amber-800 border-amber-200",
  NOTE: "bg-blue-100 text-blue-800 border-blue-200",
};

const flagBadgeLabels: Record<FlagCategory, string> = {
  OUTSIDE_SCOPE: "Outside Scope",
  ABSOLUTE_CI: "Absolute CI",
  RELATIVE_CI: "Relative CI",
  NOTE: "Note",
};

function FlagBadgeIcon({ category }: { category: FlagCategory }) {
  if (category === "OUTSIDE_SCOPE") return <XOctagon className="w-3.5 h-3.5" />;
  if (category === "ABSOLUTE_CI" || category === "RELATIVE_CI")
    return <AlertTriangle className="w-3.5 h-3.5" />;
  return <Info className="w-3.5 h-3.5" />;
}

export function SummaryScreen({
  patientName,
  screenerName,
  answers,
  allFlags,
  resetAll,
}: SummaryScreenProps) {
  const [copied, setCopied] = useState(false);

  const summaryText = useMemo(
    () => generateSummary(patientName, screenerName, answers, allFlags),
    [patientName, screenerName, answers, allFlags]
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
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

  const outsideScope = allFlags.filter((f) => f.category === "OUTSIDE_SCOPE");
  const absoluteCI = allFlags.filter((f) => f.category === "ABSOLUTE_CI");
  const relativeCI = allFlags.filter((f) => f.category === "RELATIVE_CI");
  const notes = allFlags.filter((f) => f.category === "NOTE");

  return (
    <div className="min-h-screen px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-warm-900 mb-1">
            Screening Complete
          </h1>
          <p className="text-warm-500 text-sm">
            {patientName} &mdash;{" "}
            {new Date().toLocaleDateString("en-CA", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Flags Summary Cards */}
        {allFlags.length > 0 && (
          <div className="mb-6 space-y-2">
            {[
              { label: "Outside Scope", flags: outsideScope, cat: "OUTSIDE_SCOPE" as FlagCategory },
              { label: "Absolute CI", flags: absoluteCI, cat: "ABSOLUTE_CI" as FlagCategory },
              { label: "Relative CI", flags: relativeCI, cat: "RELATIVE_CI" as FlagCategory },
              { label: "Notes for NP", flags: notes, cat: "NOTE" as FlagCategory },
            ]
              .filter((g) => g.flags.length > 0)
              .map((group) => (
                <div
                  key={group.cat}
                  className={cn(
                    "rounded-xl border px-4 py-3",
                    flagBadgeColors[group.cat]
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <FlagBadgeIcon category={group.cat} />
                    <span className="text-sm font-semibold">
                      {flagBadgeLabels[group.cat]}
                    </span>
                  </div>
                  <ul className="ml-6 text-sm space-y-0.5">
                    {group.flags.map((f) => (
                      <li key={f.questionId}>{f.questionText}</li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        )}

        {allFlags.length === 0 && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
            <p className="text-sm font-medium text-green-800">
              No contraindications or flags identified.
            </p>
          </div>
        )}

        {/* Summary Text Preview */}
        <div className="bg-white rounded-2xl border border-warm-200 shadow-sm overflow-hidden mb-6">
          <div className="px-4 py-3 border-b border-warm-100 flex items-center justify-between">
            <span className="text-xs font-medium text-warm-500 uppercase tracking-wider">
              EMR Note Preview
            </span>
            <span className="text-xs text-warm-400 font-mono">
              {summaryText.length} chars
            </span>
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
              "flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-[15px] transition-all cursor-pointer",
              copied
                ? "bg-green-600 text-white"
                : "bg-warm-800 hover:bg-warm-900 text-white"
            )}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy to Clipboard
              </>
            )}
          </button>

          <button
            onClick={resetAll}
            className="flex items-center justify-center gap-2 px-5 py-3.5 bg-white border border-warm-200 hover:bg-warm-50 text-warm-600 rounded-xl font-medium text-[15px] transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            New
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-warm-400 mt-8 leading-relaxed">
          This is a pre-screening tool only. All clinical decisions
          <br />
          are made by the supervising NP.
        </p>
      </motion.div>
    </div>
  );
}
