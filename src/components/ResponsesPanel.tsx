"use client";

import { ClipboardList } from "lucide-react";
import { cn } from "../lib/utils";
import { Answer, TriggeredFlag, FlagCategory } from "../lib/types";
import { getAnsweredItems } from "../lib/format";

interface ResponsesPanelProps {
  answers: Map<string, Answer>;
  allFlags: TriggeredFlag[];
  currentQuestionId?: string;
}

const dotColor: Record<FlagCategory, string> = {
  OUTSIDE_SCOPE: "bg-red-500",
  ABSOLUTE_CI: "bg-orange-500",
  RELATIVE_CI: "bg-amber-500",
  NOTE: "bg-sage-500",
};

const tallyLabels: { cat: FlagCategory; label: string }[] = [
  { cat: "OUTSIDE_SCOPE", label: "Outside scope" },
  { cat: "ABSOLUTE_CI", label: "Absolute CI" },
  { cat: "RELATIVE_CI", label: "Relative CI" },
  { cat: "NOTE", label: "Notes" },
];

export function ResponsesPanel({ answers, allFlags, currentQuestionId }: ResponsesPanelProps) {
  const items = getAnsweredItems(answers);
  const flagByQ = new Map(allFlags.map((f) => [f.questionId, f]));

  // Group answered items by section, preserving order.
  const groups: { sectionTitle: string; sectionId: string; rows: typeof items }[] = [];
  for (const item of items) {
    let g = groups[groups.length - 1];
    if (!g || g.sectionId !== item.sectionId) {
      g = { sectionTitle: item.sectionTitle, sectionId: item.sectionId, rows: [] };
      groups.push(g);
    }
    g.rows.push(item);
  }

  const tally = tallyLabels
    .map((t) => ({ ...t, count: allFlags.filter((f) => f.category === t.cat).length }))
    .filter((t) => t.count > 0);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-warm-200/70">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-sage-600" />
            <h2 className="font-serif text-lg text-warm-900">Responses</h2>
          </div>
          <span className="text-[11px] font-semibold text-sage-700 bg-sage-100 rounded-full px-2.5 py-0.5 tabular-nums">
            {items.length}
          </span>
        </div>

        {tally.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tally.map((t) => (
              <span
                key={t.cat}
                className="inline-flex items-center gap-1.5 text-[11px] font-medium text-warm-600 bg-cream-100 border border-warm-200 rounded-full px-2 py-0.5"
              >
                <span className={cn("w-1.5 h-1.5 rounded-full", dotColor[t.cat])} />
                {t.count} {t.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        {items.length === 0 ? (
          <div className="h-full min-h-[120px] flex flex-col items-center justify-center text-center px-6 py-10">
            <div className="w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center mb-3">
              <ClipboardList className="w-4 h-4 text-warm-400" />
            </div>
            <p className="text-sm text-warm-400 leading-relaxed">
              Answers will appear here
              <br />
              as you move through the call.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {groups.map((group) => (
              <div key={group.sectionId}>
                <p className="px-2 mb-1.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-warm-400">
                  {group.sectionTitle}
                </p>
                <div className="space-y-0.5">
                  {group.rows.map((row) => {
                    const flag = flagByQ.get(row.question.id);
                    const isCurrent = row.question.id === currentQuestionId;
                    return (
                      <div
                        key={row.question.id}
                        className={cn(
                          "animate-row-in flex items-start gap-2.5 rounded-lg px-2.5 py-2 transition-colors",
                          isCurrent ? "bg-sage-50 ring-1 ring-sage-200" : "hover:bg-cream-100"
                        )}
                      >
                        <span
                          className={cn(
                            "mt-1.5 w-1.5 h-1.5 rounded-full shrink-0",
                            flag ? dotColor[flag.category] : "bg-warm-300"
                          )}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-[12.5px] leading-snug text-warm-600">
                            {row.question.shortLabel || row.question.text}
                          </p>
                          <p
                            className={cn(
                              "text-[13px] font-semibold leading-snug mt-0.5",
                              flag ? "text-warm-900" : "text-warm-700"
                            )}
                          >
                            {row.display}
                          </p>
                          {row.answer.notes && (
                            <p className="text-[11.5px] italic text-warm-400 mt-0.5 leading-snug">
                              “{row.answer.notes}”
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
