"use client";

import { motion } from "framer-motion";
import { ClipboardList, ArrowRight } from "lucide-react";

interface WelcomeScreenProps {
  patientName: string;
  setPatientName: (name: string) => void;
  screenerName: string;
  setScreenerName: (name: string) => void;
  startScreening: () => void;
}

export function WelcomeScreen({
  patientName,
  setPatientName,
  screenerName,
  setScreenerName,
  startScreening,
}: WelcomeScreenProps) {
  const canStart = patientName.trim().length > 0;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-lg"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-warm-800 mb-5">
            <ClipboardList className="w-7 h-7 text-cream-100" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-warm-900 mb-2">
            WHOP Phone Screening
          </h1>
          <p className="text-warm-500 text-sm leading-relaxed max-w-sm mx-auto">
            Women&apos;s Hormone Health Program — guided phone pre-screening
            questionnaire for medical admin staff.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-warm-200 p-8 shadow-sm">
          <form onSubmit={(e) => { e.preventDefault(); if (canStart) startScreening(); }} className="space-y-5">
            <div>
              <label
                htmlFor="patientName"
                className="block text-xs font-medium text-warm-500 uppercase tracking-wider mb-2"
              >
                Patient Name <span className="text-flag-outside">*</span>
              </label>
              <input
                id="patientName"
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter patient's full name"
                className="w-full px-4 py-3 bg-warm-50 border border-warm-200 rounded-xl text-warm-900 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-warm-300 focus:border-transparent transition-all text-[15px]"
                autoFocus
              />
            </div>

            <div>
              <label
                htmlFor="screenerName"
                className="block text-xs font-medium text-warm-500 uppercase tracking-wider mb-2"
              >
                Your Name (Screener)
              </label>
              <input
                id="screenerName"
                type="text"
                value={screenerName}
                onChange={(e) => setScreenerName(e.target.value)}
                placeholder="Optional"
                className="w-full px-4 py-3 bg-warm-50 border border-warm-200 rounded-xl text-warm-900 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-warm-300 focus:border-transparent transition-all text-[15px]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={!canStart}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-warm-800 hover:bg-warm-900 disabled:bg-warm-300 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all text-[15px] cursor-pointer"
              >
                Begin Screening
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-warm-400 mt-6 leading-relaxed">
          This is a pre-screening tool only. All clinical decisions
          <br />
          are made by the supervising NP.
        </p>
      </motion.div>
    </div>
  );
}
