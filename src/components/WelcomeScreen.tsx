"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface WelcomeScreenProps {
  patientName: string;
  setPatientName: (name: string) => void;
  screenerName: string;
  setScreenerName: (name: string) => void;
  startScreening: () => void;
}

function LeafMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path
        d="M16 3C9 6 5 11 5 18c0 6 4 11 11 11 1.5-7 1.5-13 0-19 3 3 5 7 5 12 4-3 6-7 6-12 0-4-3-6-11-7Z"
        fill="currentColor"
        opacity="0.92"
      />
      <path d="M16 29C12 22 12 13 16 5" stroke="#fffcf7" strokeWidth="1.1" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
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
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-lg"
      >
        {/* Brand header */}
        <div className="text-center mb-9">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[20px] bg-sage-700 text-sage-100 shadow-[0_10px_30px_-12px_rgba(44,78,37,0.6)] mb-6">
            <LeafMark className="w-8 h-8" />
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sage-600 mb-3">
            Optimal Health Clinic
          </p>
          <h1 className="font-serif text-[2.6rem] leading-[1.05] font-medium text-warm-900 mb-3">
            Women&apos;s Hormone
            <br />
            Health Screening
          </h1>
          <p className="text-warm-500 text-[15px] leading-relaxed max-w-sm mx-auto">
            A guided phone pre-screening for the WHOP program. Walk through each
            question with the patient — flags and scripts surface automatically.
          </p>
        </div>

        {/* Form card */}
        <div className="relative bg-cream-50/90 backdrop-blur-sm rounded-[26px] border border-warm-200/80 p-8 shadow-[0_24px_60px_-30px_rgba(44,78,37,0.35)]">
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-beige-300 to-transparent" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (canStart) startScreening();
            }}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="patientName"
                className="block text-xs font-semibold text-warm-500 uppercase tracking-[0.14em] mb-2"
              >
                Patient Name <span className="text-flag-outside">*</span>
              </label>
              <input
                id="patientName"
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter patient's full name"
                className="w-full px-4 py-3 bg-cream-100 border border-warm-200 rounded-xl text-warm-900 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-400 transition-all text-[15px]"
                autoFocus
              />
            </div>

            <div>
              <label
                htmlFor="screenerName"
                className="block text-xs font-semibold text-warm-500 uppercase tracking-[0.14em] mb-2"
              >
                Your Name (Screener)
              </label>
              <input
                id="screenerName"
                type="text"
                value={screenerName}
                onChange={(e) => setScreenerName(e.target.value)}
                placeholder="Optional"
                className="w-full px-4 py-3 bg-cream-100 border border-warm-200 rounded-xl text-warm-900 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-400 transition-all text-[15px]"
              />
            </div>

            <div className="pt-1">
              <button
                type="submit"
                disabled={!canStart}
                className="group w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-sage-700 hover:bg-sage-800 disabled:bg-warm-300 disabled:cursor-not-allowed text-cream-50 rounded-xl font-medium transition-all text-[15px] cursor-pointer shadow-[0_12px_28px_-14px_rgba(44,78,37,0.7)]"
              >
                Begin Screening
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-warm-400 mt-7 leading-relaxed">
          This is a pre-screening tool only. All clinical decisions
          <br />
          are made by the supervising Nurse Practitioner.
        </p>
      </motion.div>
    </div>
  );
}
