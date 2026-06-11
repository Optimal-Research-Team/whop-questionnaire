# WHOP Questionnaire — NP Review Changes & N/A Analysis

This document records the changes applied from the Nurse Practitioner's edit notes
(_WHOP Questionnaire Edit Notes.docx_) and a follow-up analysis of where a
**"Not Applicable"** answer is clinically valid.

> ⚠️ Several edits change clinical severity (removing contraindication flags, deleting
> questions). They were applied **exactly as the NP specified**. Items marked ⚠️ below
> are clinically significant and worth a final confirmation by the NP.

---

## 1. Applied edits (NP notes #1–39)

The NP's notes are numbered 1–39, matching the original question order. After this pass
the questionnaire has **32 questions** (7 removed).

| # | Question | NP decision | What changed |
|---|----------|-------------|--------------|
| 1 | Age | keep | Clinician notes removed. Relative-CI flag (age > 60) kept. |
| 2 | Date of last menstrual period | keep | Clinician notes removed. Relative-CI flag (>10 yrs post-menopause) kept. |
| 3 | Cycling regularly? | remove | **Question removed.** |
| 4 | Cycle length | remove | **Question removed.** |
| 5 | Period concerns through life | keep | No change. |
| 6 | Cycle changed (1–2 yrs) | keep | No change. |
| 7 | >14 consecutive days bleeding | remove | **Question removed** (contraindication removed). |
| 8 | Bleeding >1 yr post-period | keep | Outside-Scope flag kept. Added note: may not be a CI if bleeding occurred while already on estrogen. |
| 9 | Endometriosis | keep | ⚠️ Contraindication removed (now asked for context only, no flag). |
| 10 | PCOS | keep | Clinician flag removed (no flag). |
| 11 | Adenomyosis | keep | ⚠️ Relative contraindication removed (no flag). |
| 12 | Uterine fibroids | keep | ⚠️ Contraindication removed (no flag). |
| 13 | Abnormal uterine bleeding | keep | Absolute-CI flag kept (unchanged). |
| 14 | PMDD | keep | Clinician note text removed. Note-for-NP flag kept. |
| 15 | Postpartum mental health | keep | Clinician note text removed. Note-for-NP flag kept. |
| 16 | Infertility | keep | Note removed (no flag). |
| 17 | Pelvic Inflammatory Disease | remove | **Question removed.** |
| 18 | Hysterectomy | keep | Note-for-NP flag removed; clinical context retained ("progestogen may not be required"). |
| 19 | Still have your ovaries? | remove | **Question removed** (was a follow-up to hysterectomy). |
| 20 | Diabetes — well controlled? | keep | Reframed around *unmanaged conditions*; **N/A option added**. Relative-CI on "No" kept. |
| 21 | Hypertension — well controlled? | keep | Reframed around *unmanaged conditions*; **N/A option added**. Relative-CI on "No" kept. |
| 22 | Liver disease | keep | Absolute-CI kept; note "depends on severity/stage" added. |
| 23 | Kidney disease | remove | **Question removed.** |
| 24 | Allergy to peanuts | remove | ⚠️ **Question removed** (was an absolute CI for peanut-oil progesterone — confirm this is intended). |
| 25 | DVT | keep | ⚠️ Contraindication downgraded to clinician reference note (no flag). |
| 26 | Pulmonary embolism | keep | ⚠️ Contraindication downgraded to clinician reference note (no flag). |
| 27 | Stroke / TIA | keep | ⚠️ Warning removed (no flag); context retained. |
| 28 | MI / heart disease | keep | ⚠️ Warning removed (no flag); context retained. |
| 29 | Bleeding / blood disorders | keep | No longer a contraindication; prompt added to record the specific disorder. |
| 30 | Breast cancer (personal) | keep | Now uses the **Supportive-Care pathway** script (see below); still "do not book for hormones now". |
| 31 | Ovarian cancer (personal) | keep | Supportive-Care pathway script. |
| 32 | Endometrial cancer (personal) | keep | Supportive-Care pathway script. |
| 33 | Colon cancer (personal) | keep | No change (Note for NP). |
| 34 | Breast cancer (family) | keep | Supportive-Care pathway script. |
| 35 | Ovarian cancer (family) | keep | Supportive-Care pathway script. |
| 36 | Endometrial cancer (family) | keep | Supportive-Care pathway script. |
| 37 | Colon cancer (family) | keep | No change (Note for NP). |
| 38 | Bloodwork in last 2 yrs | keep | Outside-Scope kept; note added that "not absolute" but baseline status must be known. |
| 39 | Most bothersome symptom | keep | No change. |

### Interpretation rules used

- A firm **"remove"** deleted the question. **"keep" / "Can keep" / "Can remove" / "Can remove/keep"**
  retained the question (non-destructive default) and applied the note-column edit.
- **"Remove contraindication / CI / warning / flag"** → the flag/banner was removed (the question is
  still asked, but no longer raises an alert or disclaimer).
- **"Remove clinician note(s)"** → the reference text in the *Clinician Notes* panel was cleared.
- **"Change contraindication to clinician note"** (DVT, PE) → flag removed, info kept as reference.

### New "Supportive-Care pathway" script (cancer history)

Per the NP's repeated note on the cancer questions, these now show a warmer script instead of the
blunt "outside scope" referral:

> "Thank you for sharing that with me. Based on what you've described, hormone therapy isn't something
> our program is able to offer you at this stage — but this isn't the end of the road. We can still
> provide supportive treatments and help manage your symptoms. I'd also like to keep your details on
> file so we can reach out if and when our Nurse Practitioner reviews your chart and feels we're able
> to support you with more options. Would that be okay with you?"

---

## 2. "Not Applicable" — where it's valid

A yes/no answer of **"No"** already means "the patient does not have this." A separate **N/A** option
is only useful where the question **presupposes a condition or event** and "No" would be ambiguous or
misleading.

### ✅ Implemented now

| Question | Why N/A is needed |
|----------|-------------------|
| Diabetes — is it currently well controlled? | "No" means *uncontrolled* (a flag). A patient **without diabetes** needs a distinct answer — otherwise "Yes/No" both misrepresent them. **N/A = no diabetes → no flag.** |
| Hypertension — is it currently well controlled? | Same logic — "No" means *uncontrolled*. **N/A = no hypertension.** |

### 🔎 Recommended for NP decision (not yet enabled)

| Question | Suggested N/A meaning | Rationale |
|----------|----------------------|-----------|
| Date of last menstrual period | "N/A — surgical menopause / hysterectomy / never menstruated" | A date field assumes a natural last period. Post-hysterectomy or on continuous contraception there may be none. |
| Has your cycle changed in the last 1–2 years? | "N/A — no longer cycling" | If the patient is fully post-menopausal there is no cycle to have changed; "No" is misleading. |
| Bleeding >1 yr after last period | "N/A — still cycling / not yet 1 yr without a period" | The question only applies once she's gone >1 yr without a period. For perimenopausal patients still cycling, the premise doesn't hold. (⚠️ this is a safety screen — change its options only with NP sign-off.) |
| Most bothersome symptom (free text) | allow "None right now" | Some callers may have no dominant symptom. |

### ❌ N/A **not** recommended

For straightforward **"history of condition"** yes/no questions (endometriosis, PCOS, the cancers,
DVT/PE/stroke/MI, liver/kidney disease, bleeding disorders, infertility, hysterectomy, etc.), **"No"
already encodes "not applicable."** Adding N/A there would be redundant and risks screener confusion.

---

_Generated as part of the questionnaire revision. The app remains a pre-screening tool only — all
clinical decisions are made by the supervising Nurse Practitioner._
