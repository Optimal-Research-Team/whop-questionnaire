"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  XOctagon,
  Info,
  MessageSquare,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import {
  FlagCategory,
  CI_DISCLAIMER,
  OUTSIDE_SCOPE_DISCLAIMER,
  TriggeredFlag,
  Answer,
  Question,
} from "../lib/types";

interface QuestionScreenProps {
  currentIndex: number;
  totalQuestions: number;
  currentItem:
    | { question: Question; sectionTitle: string; sectionId: string }
    | undefined;
  currentAnswer: Answer | undefined;
  currentFlag: TriggeredFlag | null;
  currentSection: { title: string; id: string } | null;
  sectionProgress: { current: number; total: number };
  canGoNext: boolean;
  setAnswer: (questionId: string, value: string, notes?: string) => void;
  setNotes: (questionId: string, notes: string) => void;
  goNext: () => void;
  goBack: () => void;
}

const flagStyles: Record<
  FlagCategory,
  { bg: string; border: string; text: string; icon: string }
> = {
  OUTSIDE_SCOPE: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    icon: "text-red-600",
  },
  ABSOLUTE_CI: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-800",
    icon: "text-orange-600",
  },
  RELATIVE_CI: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-800",
    icon: "text-amber-600",
  },
  NOTE: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
    icon: "text-blue-600",
  },
};

const flagLabels: Record<FlagCategory, string> = {
  OUTSIDE_SCOPE: "Outside Scope — Do NOT Book",
  ABSOLUTE_CI: "Absolute Contraindication",
  RELATIVE_CI: "Relative Contraindication",
  NOTE: "Note for NP",
};

function FlagIcon({ category }: { category: FlagCategory }) {
  const s = flagStyles[category];
  if (category === "OUTSIDE_SCOPE")
    return <XOctagon className={cn("w-5 h-5 shrink-0", s.icon)} />;
  if (category === "ABSOLUTE_CI" || category === "RELATIVE_CI")
    return <AlertTriangle className={cn("w-5 h-5 shrink-0", s.icon)} />;
  return <Info className={cn("w-5 h-5 shrink-0", s.icon)} />;
}

export function QuestionScreen({
  currentIndex,
  totalQuestions,
  currentItem,
  currentAnswer,
  currentFlag,
  currentSection,
  sectionProgress,
  canGoNext,
  setAnswer,
  setNotes,
  goNext,
  goBack,
}: QuestionScreenProps) {
  const [notesExpanded, setNotesExpanded] = useState(false);
  const [clinicianNotesOpen, setClinicianNotesOpen] = useState(true);

  // Reset notes expanded when changing questions
  useEffect(() => {
    setNotesExpanded(false);
  }, [currentIndex]);

  if (!currentItem) return null;

  const q = currentItem.question;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress Header */}
      <div className="sticky top-0 z-10 bg-cream-50/90 backdrop-blur-md border-b border-warm-200">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-medium text-warm-500 uppercase tracking-wider">
              {currentSection?.title}
            </span>
            <span className="text-xs text-warm-400 tabular-nums">
              {currentIndex + 1} of {totalQuestions}
            </span>
          </div>
          <div className="h-1.5 bg-warm-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-warm-700 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          <div className="mt-1.5">
            <span className="text-[11px] text-warm-400">
              Section: {sectionProgress.current}/{sectionProgress.total}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pt-8 pb-28">
        <div className="max-w-2xl mx-auto">
          <div key={q.id} className="space-y-5">
              {/* Question Text */}
              <h2 className="text-xl font-semibold text-warm-900 leading-snug">
                {q.text}
              </h2>

              {/* Helpful Probe */}
              {q.helpfulProbe && (
                <div className="flex items-start gap-2.5 px-4 py-3 bg-warm-50 rounded-xl border border-warm-100">
                  <MessageSquare className="w-4 h-4 text-warm-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-warm-600 italic leading-relaxed">
                    {q.helpfulProbe}
                  </p>
                </div>
              )}

              {/* Input */}
              <div>
                {q.inputType === "yes_no" && (
                  <div className="flex gap-3">
                    {(["yes", "no"] as const).map((val) => (
                      <button
                        key={val}
                        onClick={() => setAnswer(q.id, val)}
                        className={cn(
                          "flex-1 py-3.5 rounded-xl font-medium text-[15px] border-2 transition-all cursor-pointer",
                          currentAnswer?.value === val
                            ? "bg-warm-800 border-warm-800 text-white shadow-sm"
                            : "bg-white border-warm-200 text-warm-600 hover:border-warm-300 hover:bg-warm-50"
                        )}
                      >
                        {val === "yes" ? "Yes" : "No"}
                      </button>
                    ))}
                  </div>
                )}

                {q.inputType === "number" && (
                  <input
                    type="number"
                    value={currentAnswer?.value || ""}
                    onChange={(e) => setAnswer(q.id, e.target.value)}
                    placeholder={
                      q.id === "age"
                        ? "Enter age"
                        : q.id === "cycle_length"
                        ? "Enter days"
                        : "Enter number"
                    }
                    className="w-full max-w-xs px-4 py-3 bg-white border-2 border-warm-200 rounded-xl text-warm-900 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-warm-300 focus:border-transparent transition-all text-[15px]"
                    autoFocus
                  />
                )}

                {q.inputType === "date" && (
                  <input
                    type="date"
                    value={currentAnswer?.value || ""}
                    onChange={(e) => setAnswer(q.id, e.target.value)}
                    className="w-full max-w-xs px-4 py-3 bg-white border-2 border-warm-200 rounded-xl text-warm-900 focus:outline-none focus:ring-2 focus:ring-warm-300 focus:border-transparent transition-all text-[15px]"
                  />
                )}

                {q.inputType === "text" && (
                  <textarea
                    value={currentAnswer?.value || ""}
                    onChange={(e) => setAnswer(q.id, e.target.value)}
                    placeholder="Type patient's response..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white border-2 border-warm-200 rounded-xl text-warm-900 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-warm-300 focus:border-transparent transition-all text-[15px]"
                    autoFocus
                  />
                )}
              </div>

              {/* Flag Banner */}
              {currentFlag && (
                <div
                  className={cn(
                    "rounded-xl border-2 p-4",
                    flagStyles[currentFlag.category].bg,
                    flagStyles[currentFlag.category].border
                  )}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <FlagIcon category={currentFlag.category} />
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        flagStyles[currentFlag.category].text
                      )}
                    >
                      {flagLabels[currentFlag.category]}
                    </span>
                  </div>

                  <div className="p-3 bg-white/60 rounded-lg">
                    <p className="text-[11px] font-medium text-warm-500 uppercase tracking-wider mb-1.5">
                      Say to patient:
                    </p>
                    <p className="text-sm text-warm-700 leading-relaxed italic">
                      &ldquo;
                      {currentFlag.category === "OUTSIDE_SCOPE"
                        ? OUTSIDE_SCOPE_DISCLAIMER
                        : CI_DISCLAIMER}
                      &rdquo;
                    </p>
                  </div>
                </div>
              )}

              {/* Additional Notes */}
              <div>
                <button
                  onClick={() => setNotesExpanded(!notesExpanded)}
                  className="flex items-center gap-1.5 text-sm text-warm-500 hover:text-warm-700 transition-colors cursor-pointer"
                >
                  {notesExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                  Additional notes
                </button>
                {notesExpanded && (
                  <textarea
                    value={currentAnswer?.notes || ""}
                    onChange={(e) => setNotes(q.id, e.target.value)}
                    placeholder="Add context or details..."
                    rows={2}
                    className="w-full mt-2 px-4 py-3 bg-white border border-warm-200 rounded-xl text-warm-900 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-warm-300 focus:border-transparent transition-all text-sm"
                  />
                )}
              </div>

              {/* Clinician Notes */}
              <div className="bg-warm-50 rounded-xl border border-warm-100 overflow-hidden">
                <button
                  onClick={() => setClinicianNotesOpen(!clinicianNotesOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 cursor-pointer"
                >
                  <span className="text-xs font-medium text-warm-500 uppercase tracking-wider">
                    Clinician Notes
                  </span>
                  {clinicianNotesOpen ? (
                    <ChevronUp className="w-4 h-4 text-warm-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-warm-400" />
                  )}
                </button>
                {clinicianNotesOpen && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-warm-600 leading-relaxed">
                      {q.clinicianNotes}
                    </p>
                  </div>
                )}
              </div>
            </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-cream-50/90 backdrop-blur-md border-t border-warm-200 z-10">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={goBack}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-warm-600 hover:text-warm-800 disabled:text-warm-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={goNext}
            disabled={!canGoNext}
            className="flex items-center gap-1.5 px-6 py-2.5 bg-warm-800 hover:bg-warm-900 disabled:bg-warm-300 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium transition-all cursor-pointer"
          >
            {currentIndex === totalQuestions - 1 ? "Finish" : "Next"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
