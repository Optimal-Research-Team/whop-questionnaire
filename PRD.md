# WHOP Phone Screening Questionnaire — PRD

## Problem

The Women's Hormone Health Program (WHOP) uses a 6-page PDF questionnaire for phone pre-screening of patients before booking NP appointments. Medical admins currently reference this PDF while on the phone with patients, which creates several issues:

The PDF is dense and difficult to navigate during a live phone call. Admins must simultaneously read questions, track contraindication categories (Outside Scope, Absolute CI, Relative CI, Note), remember when to deliver specific disclaimer scripts, and manually write up summaries afterward for EMR entry.

This leads to missed flags, inconsistent disclaimer delivery, and time-consuming post-call documentation. The screening process should take 10-15 minutes but often takes 20-30 due to the cognitive load of managing the PDF alongside the conversation.

The questionnaire covers 38 questions across 7 clinical sections: Demographics, Cycling History, Reproductive Medical History, Past Medical History, Family History (1st degree), Previous Assessments, and Symptoms. Each question has associated contraindication logic and clinician guidance notes that the admin needs to reference in real-time.

---

## Proposal

Build a web-based questionnaire app that walks the medical admin through each screening question one at a time, with inline clinician notes and automatic flag/disclaimer surfacing.

### How It Works

The app presents questions in a guided, step-by-step flow rather than as a full document. For each question, the admin sees the question text, Yes/No toggle buttons (or number/date/text input as appropriate), expandable clinician notes for reference, and an always-visible notes field for the admin to type short observations or context during the call.

When an answer triggers a contraindication flag, the app automatically displays a color-coded banner with the correct disclaimer script for the admin to read to the patient. Four flag levels are supported, matching the original PDF categories: Outside Scope (red, do not book), Absolute CI (orange), Relative CI (amber), and Note (blue, flag for NP only).

Conditional question logic is built in. For example, the "Still have your ovaries?" question only appears if the patient answers "Yes" to hysterectomy.

At the end of the questionnaire, the app generates a structured plain-text EMR note containing the patient name, date, screener name, a flags summary section listing all triggered contraindications grouped by severity, the full Q&A with answers and notes, and any disclaimers that were delivered. The admin copies this to clipboard with one click and pastes it into the EMR.

### Key Design Decisions

The app runs entirely client-side with no backend or database. No patient data is transmitted or stored. All questionnaire content is hardcoded from the original PDF.

The light theme uses warm cream tones with clear visual hierarchy. Flag banners use standard medical alert colors (red, orange, amber, blue) for instant recognition.

The tech stack is Next.js with TypeScript and Tailwind CSS, chosen for rapid development and easy deployment.

### Success Metrics

- Screening call duration reduced from 20-30 minutes to 10-15 minutes.
- Zero missed contraindication flags (the app makes it impossible to skip a flagged question without seeing the disclaimer).
- Post-call documentation time reduced from 5-10 minutes of manual writing to 10 seconds of copy-paste.

---

## Plan

### What We Built

A Next.js web application with three screens:

**Welcome Screen** — Patient name input, optional screener name, "Begin Screening" button. Clean, centered card layout.

**Question Screen** — One question at a time with progress bar, section tracking (e.g., "CYCLING — 3 of 6"), Yes/No pill toggles or appropriate input type, always-visible notes field for admin observations, collapsible clinician notes (expanded by default), and automatic flag/disclaimer banner when triggered. Fixed navigation footer with Back/Next buttons.

**Summary Screen** — Flag summary cards grouped by severity, scrollable monospace EMR note preview with character count, "Copy to Clipboard" button with success feedback, "New" button to reset.

### Technical Details

38 questions across 7 sections, all hardcoded in a typed TypeScript data file matching the original PDF exactly. Conditional question logic (ovaries question gated on hysterectomy). Special flag logic for age (>60 triggers Relative CI) and LMP date (>10 years post-menopause triggers Relative CI). Standard flag logic for yes/no questions based on configurable trigger values.

### How to Run

```bash
cd whop-questionnaire
npm install
npm run dev
```

Open `http://localhost:3000` in a browser.

### Deployment

The app exports as a static site (`next build` with `output: "export"`). Deployed to GitHub Pages via GitHub Actions workflow. No server required.

### Repository

GitHub: [`Optimal-Research-Team/whop-questionnaire`](https://github.com/Optimal-Research-Team/whop-questionnaire)

### Live Site

[https://optimal-research-team.github.io/whop-questionnaire/](https://optimal-research-team.github.io/whop-questionnaire/)
