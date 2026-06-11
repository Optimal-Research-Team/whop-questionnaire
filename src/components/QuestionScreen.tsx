"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  XOctagon,
  Info,
  MessageSquare,
  PanelRightOpen,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";
import {
  FlagCategory,
  TriggeredFlag,
  Answer,
  Question,
  disclaimerFor,
} from "../lib/types";
import { getAnsweredItems } from "../lib/format";
import { ResponsesPanel } from "./ResponsesPanel";

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
  answers: Map<string, Answer>;
  allFlags: TriggeredFlag[];
  setAnswer: (questionId: string, value: string, notes?: string) => void;
  setNotes: (questionId: string, notes: string) => void;
  goNext: () => void;
  goBack: () => void;
}

const flagStyles: Record<
  FlagCategory,
  { bg: string; border: string; text: string; icon: string }
> = {
  OUTSIDE_SCOPE: { bg: "bg-red-50", border: "border-red-200", text: "text-red-800", icon: "text-red-600" },
  ABSOLUTE_CI: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-800", icon: "text-orange-600" },
  RELATIVE_CI: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-800", icon: "text-amber-600" },
  NOTE: { bg: "bg-sage-50", border: "border-sage-200", text: "text-sage-800", icon: "text-sage-600" },
};

const flagLabels: Record<FlagCategory, string> = {
  OUTSIDE_SCOPE: "Outside Scope — Do NOT Book",
  ABSOLUTE_CI: "Absolute Contraindication",
  RELATIVE_CI: "Relative Contraindication",
  NOTE: "Note for NP",
};

function FlagIcon({ category }: { category: FlagCategory }) {
  const s = flagStyles[category];
  if (category === "OUTSIDE_SCOPE") return <XOctagon className={cn("w-5 h-5 shrink-0", s.icon)} />;
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
  answers,
  allFlags,
  setAnswer,
  setNotes,
  goNext,
  goBack,
}: QuestionScreenProps) {
  const [clinicianNotesOpen, setClinicianNotesOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (!currentItem) return null;

  const q = currentItem.question;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const answeredCount = getAnsweredItems(answers).length;

  const yesNoOptions: { val: string; label: string }[] = [
    { val: "yes", label: "Yes" },
    { val: "no", label: "No" },
    ...(q.allowNA ? [{ val: "na", label: "N/A" }] : []),
  ];

  return (
    <div className="flex min-h-screen">
      {/* ───────────── Main column ───────────── */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Progress header */}
        <div className="sticky top-0 z-20 bg-cream-50/85 backdrop-blur-md border-b border-warm-200/70">
          <div className="max-w-2xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-semibold text-sage-600 uppercase tracking-[0.16em]">
                {currentSection?.title}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-warm-400 tabular-nums">
                  {currentIndex + 1} of {totalQuestions}
                </span>
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="lg:hidden inline-flex items-center gap-1.5 text-xs font-medium text-sage-700 bg-sage-100 rounded-full pl-2.5 pr-2 py-1 cursor-pointer"
                >
                  {answeredCount}
                  <PanelRightOpen className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="h-1.5 bg-warm-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-sage-700 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
            <div className="mt-1.5">
              <span className="text-[11px] text-warm-400">
                Section progress {sectionProgress.current}/{sectionProgress.total}
              </span>
            </div>
          </div>
        </div>

        {/* Content — keyed motion.div remounts (and replays the enter animation) on each question */}
        <div className="flex-1 px-6 pt-8 pb-10">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mx-auto space-y-5"
          >
              {/* Question text */}
              <h2 className="font-serif text-[1.95rem] leading-[1.15] font-medium text-warm-900">
                {q.text}
              </h2>

              {/* Helpful probe */}
              {q.helpfulProbe && (
                <div className="flex items-start gap-2.5 px-4 py-3 bg-beige-100/60 rounded-xl border border-beige-300/50">
                  <MessageSquare className="w-4 h-4 text-sage-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-warm-600 italic leading-relaxed">{q.helpfulProbe}</p>
                </div>
              )}

              {/* Input */}
              <div>
                {q.inputType === "yes_no" && (
                  <>
                    <div className="flex flex-wrap gap-3">
                      {yesNoOptions.map(({ val, label }) => (
                        <button
                          key={val}
                          onClick={() => setAnswer(q.id, val)}
                          className={cn(
                            "flex-1 min-w-[90px] py-3.5 rounded-xl font-medium text-[15px] border-2 transition-all cursor-pointer",
                            currentAnswer?.value === val
                              ? "bg-sage-700 border-sage-700 text-cream-50 shadow-[0_10px_24px_-14px_rgba(44,78,37,0.8)]"
                              : "bg-cream-50 border-warm-200 text-warm-600 hover:border-sage-300 hover:bg-sage-50"
                          )}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    {q.allowNA && (
                      <p className="mt-2 text-xs text-warm-400">
                        Select <span className="font-medium text-warm-500">N/A</span> if the patient does not have this condition.
                      </p>
                    )}
                  </>
                )}

                {q.inputType === "number" && (
                  <input
                    type="number"
                    value={currentAnswer?.value || ""}
                    onChange={(e) => setAnswer(q.id, e.target.value)}
                    placeholder={q.id === "age" ? "Enter age" : "Enter number"}
                    min={1}
                    max={q.id === "age" ? 120 : undefined}
                    step={1}
                    className="w-full max-w-xs px-4 py-3 bg-cream-50 border-2 border-warm-200 rounded-xl text-warm-900 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-400 transition-all text-[15px]"
                    autoFocus
                  />
                )}

                {q.inputType === "date" && (
                  <input
                    type="date"
                    value={currentAnswer?.value || ""}
                    onChange={(e) => setAnswer(q.id, e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                    className="w-full max-w-xs px-4 py-3 bg-cream-50 border-2 border-warm-200 rounded-xl text-warm-900 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-400 transition-all text-[15px]"
                  />
                )}

                {q.inputType === "text" && (
                  <textarea
                    value={currentAnswer?.value || ""}
                    onChange={(e) => setAnswer(q.id, e.target.value)}
                    placeholder="Type patient's response..."
                    rows={3}
                    className="w-full px-4 py-3 bg-cream-50 border-2 border-warm-200 rounded-xl text-warm-900 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-400 transition-all text-[15px]"
                    autoFocus
                  />
                )}
              </div>

              {/* Flag banner */}
              {currentFlag && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className={cn(
                    "rounded-xl border-2 p-4",
                    flagStyles[currentFlag.category].bg,
                    flagStyles[currentFlag.category].border
                  )}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <FlagIcon category={currentFlag.category} />
                    <span className={cn("text-sm font-semibold", flagStyles[currentFlag.category].text)}>
                      {flagLabels[currentFlag.category]}
                    </span>
                  </div>
                  {disclaimerFor(currentFlag) && (
                    <div className="p-3 bg-white/70 rounded-lg">
                      <p className="text-[11px] font-semibold text-warm-500 uppercase tracking-[0.12em] mb-1.5">
                        Say to patient:
                      </p>
                      <p className="text-sm text-warm-700 leading-relaxed italic">
                        &ldquo;{disclaimerFor(currentFlag)}&rdquo;
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-warm-500 uppercase tracking-[0.12em] mb-2">
                  Notes
                </label>
                <textarea
                  value={currentAnswer?.notes || ""}
                  onChange={(e) => setNotes(q.id, e.target.value)}
                  placeholder="Add context or details..."
                  rows={2}
                  className="w-full px-4 py-3 bg-cream-50 border border-warm-200 rounded-xl text-warm-900 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-400 transition-all text-sm"
                />
              </div>

              {/* Clinician notes — only when present */}
              {q.clinicianNotes && (
                <div className="bg-cream-100/70 rounded-xl border border-warm-200/70 overflow-hidden">
                  <button
                    onClick={() => setClinicianNotesOpen(!clinicianNotesOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 cursor-pointer"
                  >
                    <span className="text-xs font-semibold text-warm-500 uppercase tracking-[0.12em]">
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
                      <p className="text-sm text-warm-600 leading-relaxed">{q.clinicianNotes}</p>
                    </div>
                  )}
                </div>
              )}
          </motion.div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-20 bg-cream-50/85 backdrop-blur-md border-t border-warm-200/70">
          <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={goBack}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-warm-600 hover:text-sage-700 disabled:text-warm-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={goNext}
              disabled={!canGoNext}
              className="group flex items-center gap-1.5 px-6 py-2.5 bg-sage-700 hover:bg-sage-800 disabled:bg-warm-300 disabled:cursor-not-allowed text-cream-50 rounded-xl text-sm font-medium transition-all cursor-pointer shadow-[0_10px_24px_-14px_rgba(44,78,37,0.8)]"
            >
              {currentIndex === totalQuestions - 1 ? "Finish" : "Next"}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ───────────── Desktop sidebar ───────────── */}
      <aside className="hidden lg:block w-[346px] shrink-0 border-l border-warm-200/70 bg-cream-100/40 sticky top-0 h-screen">
        <ResponsesPanel answers={answers} allFlags={allFlags} currentQuestionId={q.id} />
      </aside>

      {/* ───────────── Mobile drawer ───────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-warm-900/30 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="lg:hidden fixed right-0 top-0 bottom-0 z-50 w-[86%] max-w-[360px] bg-cream-50 border-l border-warm-200 shadow-2xl flex flex-col"
            >
              <button
                onClick={() => setDrawerOpen(false)}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-cream-200 text-warm-500 cursor-pointer"
                aria-label="Close responses"
              >
                <X className="w-4 h-4" />
              </button>
              <ResponsesPanel answers={answers} allFlags={allFlags} currentQuestionId={q.id} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
