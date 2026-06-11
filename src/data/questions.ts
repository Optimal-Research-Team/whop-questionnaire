import { Section, Question, Answer } from '../lib/types';
import { SUPPORTIVE_CARE_DISCLAIMER } from '../lib/types';

export const sections: Section[] = [
  {
    id: 'demographic',
    title: 'Demographic',
    description: 'Basic patient information for risk assessment.',
    questions: [
      {
        // NP #1 — keep question, clinician notes removed
        id: 'age',
        text: 'Age',
        inputType: 'number',
        category: 'RELATIVE_CI',
        clinicianNotes: '',
        shortLabel: 'Age',
      },
      {
        // NP #2 — keep question, clinician notes removed
        id: 'last_menstrual_period',
        text: 'Date of last menstrual period',
        inputType: 'date',
        category: 'RELATIVE_CI',
        clinicianNotes: '',
        shortLabel: 'Last menstrual period',
      },
    ],
  },
  {
    id: 'cycling',
    title: 'Cycling',
    description: 'Menstrual cycle history and changes.',
    questions: [
      // NP #3 (Cycling regularly?) — removed per NP
      // NP #4 (Cycle length) — removed per NP
      {
        // NP #5 — keep as-is
        id: 'period_concerns',
        text: 'Any particular concerns re: periods through life, or largely normal/regular?',
        inputType: 'yes_no',
        category: null,
        clinicianNotes: 'Note any prior pathology.',
        shortLabel: 'Period concerns through life',
      },
      {
        // NP #6 — keep as-is
        id: 'cycle_changed',
        text: 'Has your cycle changed in the last 1–2 years?',
        inputType: 'yes_no',
        category: null,
        clinicianNotes: 'Cycle changes signal perimenopause.',
        shortLabel: 'Cycle changed (1–2 yrs)',
      },
      // NP #7 (>14 consecutive days of bleeding) — removed; contraindication removed per NP
      {
        // NP #8 — keep question + flag; estrogen-context note added
        id: 'postmenopausal_bleeding',
        text: 'Have you had vaginal bleeding after going >1 year without a period?',
        inputType: 'yes_no',
        category: 'OUTSIDE_SCOPE',
        triggerOn: 'yes',
        clinicianNotes:
          'Postmenopausal bleeding must be investigated for endometrial/other cancer before any enrollment. Do NOT book. If already investigated with records available (e.g. ultrasound confirming benign etiology), flag for NP review before booking. NP note: if the bleeding occurred while the patient is already on estrogen therapy, this may not be a contraindication — flag for NP.',
        shortLabel: 'Bleeding >1 yr post-period',
      },
    ],
  },
  {
    id: 'reproductive_history',
    title: 'Reproductive Medical History',
    description: 'Gynecological and reproductive health conditions.',
    questions: [
      {
        // NP #9 — keep question; contraindication removed
        id: 'endometriosis',
        text: 'Endometriosis',
        inputType: 'yes_no',
        category: null,
        clinicianNotes: 'Estrogen may stimulate disease — context for NP. No longer flagged as a contraindication.',
        shortLabel: 'Endometriosis',
      },
      {
        // NP #10 — keep question; clinician flag removed
        id: 'pcos',
        text: 'Polycystic Ovarian Syndrome (PCOS)',
        inputType: 'yes_no',
        category: null,
        clinicianNotes: 'Does not exclude HRT; affects hormone balance. Context for NP.',
        shortLabel: 'PCOS',
      },
      {
        // NP #11 — keep question; relative contraindication removed
        id: 'adenomyosis',
        text: 'Adenomyosis',
        inputType: 'yes_no',
        category: null,
        clinicianNotes: 'Progestogen-based therapy often preferred — context for NP. No longer flagged.',
        shortLabel: 'Adenomyosis',
      },
      {
        // NP #12 — keep question; CI removed
        id: 'uterine_fibroids',
        text: 'Uterine Fibroids',
        inputType: 'yes_no',
        category: null,
        clinicianNotes: 'Estrogen may promote growth — context for NP. No longer flagged.',
        shortLabel: 'Uterine fibroids',
      },
      {
        // NP #13 — keep question + flag
        id: 'abnormal_uterine_bleeding',
        text: 'Abnormal Uterine Bleeding (diagnosed)',
        inputType: 'yes_no',
        category: 'ABSOLUTE_CI',
        triggerOn: 'yes',
        clinicianNotes: 'Do not proceed until etiology confirmed. Use CI DISCLAIMER.',
        shortLabel: 'Abnormal uterine bleeding',
      },
      {
        // NP #14 — keep question + NOTE flag; clinician note removed
        id: 'pmdd',
        text: 'Premenstrual Dysphoric Disorder (PMDD)',
        inputType: 'yes_no',
        category: 'NOTE',
        triggerOn: 'yes',
        clinicianNotes: '',
        shortLabel: 'PMDD',
      },
      {
        // NP #15 — keep question + NOTE flag; clinician note removed
        id: 'postpartum_psych',
        text: 'Postpartum anxiety / depression / psychosis',
        inputType: 'yes_no',
        category: 'NOTE',
        triggerOn: 'yes',
        clinicianNotes: '',
        shortLabel: 'Postpartum mental health',
      },
      {
        // NP #16 — keep question; note removed
        id: 'infertility',
        text: 'Infertility (history of)',
        inputType: 'yes_no',
        category: null,
        clinicianNotes: '',
        shortLabel: 'Infertility history',
      },
      // NP #17 (PID) — removed; note removed per NP
      {
        // NP #18 — keep question; NOTE flag removed, clinical context retained
        id: 'hysterectomy',
        text: 'Hysterectomy',
        inputType: 'yes_no',
        category: null,
        clinicianNotes: 'If yes → progestogen may not be required. NP to confirm.',
        shortLabel: 'Hysterectomy',
      },
      // NP #19 (Still have your ovaries?) — removed; notes removed per NP
    ],
  },
  {
    id: 'past_medical_history',
    title: 'Past Medical History',
    description: 'General medical conditions and contraindication screening.',
    questions: [
      {
        // NP #20 — keep question + flag; reframed around unmanaged conditions, N/A enabled
        id: 'diabetes',
        text: 'Diabetes — is it currently well controlled?',
        inputType: 'yes_no',
        category: 'RELATIVE_CI',
        triggerOn: 'no',
        allowNA: true,
        clinicianNotes:
          'For this program we cannot take anyone with a currently unmanaged condition (e.g. T2DM, HTN, CAD). If well controlled, not a barrier; if uncontrolled, do not book. Select N/A if the patient does not have diabetes.',
        helpfulProbe: 'Do you have diabetes? Is this well controlled / well managed?',
        shortLabel: 'Diabetes controlled?',
      },
      {
        // NP #21 — keep question + flag; reframed around unmanaged conditions, N/A enabled
        id: 'hypertension',
        text: 'High Blood Pressure / Hypertension — is it currently well controlled?',
        inputType: 'yes_no',
        category: 'RELATIVE_CI',
        triggerOn: 'no',
        allowNA: true,
        clinicianNotes:
          'For this program we cannot take anyone with a currently unmanaged condition (e.g. T2DM, HTN, CAD). If well controlled, not a barrier; if uncontrolled, do not book. Select N/A if the patient does not have hypertension.',
        helpfulProbe: 'Do you have high blood pressure / hypertension? Is this well controlled / well managed?',
        shortLabel: 'Hypertension controlled?',
      },
      {
        // NP #22 — keep question + flag; severity/stage note kept
        id: 'liver_disease',
        text: 'Liver Disease',
        inputType: 'yes_no',
        category: 'ABSOLUTE_CI',
        triggerOn: 'yes',
        clinicianNotes: 'Active liver disease = absolute estrogen CI — depends on severity/stage. Flag for NP. Use CI DISCLAIMER.',
        shortLabel: 'Liver disease',
      },
      // NP #23 (Kidney Disease) — removed; note removed per NP
      // NP #24 (Allergy to Peanuts) — removed per NP
      {
        // NP #25 — keep question; contraindication changed to clinician reference note (no flag)
        id: 'dvt',
        text: 'Deep Vein Thrombosis (DVT)',
        inputType: 'yes_no',
        category: null,
        clinicianNotes: 'History of DVT — transdermal estrogen may be safer. Clinician reference for NP; no specific flag required.',
        shortLabel: 'DVT history',
      },
      {
        // NP #26 — keep question; contraindication changed to clinician reference note (no flag)
        id: 'pe',
        text: 'Pulmonary Embolism (PE)',
        inputType: 'yes_no',
        category: null,
        clinicianNotes: 'History of PE — clinician reference for NP; no specific flag required.',
        shortLabel: 'PE history',
      },
      {
        // NP #27 — keep question; warning removed
        id: 'stroke_tia',
        text: 'Stroke or TIA',
        inputType: 'yes_no',
        category: null,
        clinicianNotes: 'Previous stroke/TIA — clinician reference for NP. Warning removed per NP.',
        shortLabel: 'Stroke / TIA',
      },
      {
        // NP #28 — keep question; warning removed
        id: 'mi_chd',
        text: 'MI / Heart Attack (Coronary Heart Disease)',
        inputType: 'yes_no',
        category: null,
        clinicianNotes: 'Active/previous CHD — clinician reference for NP. Warning removed per NP.',
        shortLabel: 'MI / heart disease',
      },
      {
        // NP #29 — keep question; not a contraindication, ask for specific type
        id: 'bleeding_disorders',
        text: 'Bleeding or Blood Disorders',
        inputType: 'yes_no',
        category: null,
        clinicianNotes: 'Not a contraindication. Record the specific disorder for NP.',
        helpfulProbe: 'If yes, ask which specific bleeding or blood disorder.',
        shortLabel: 'Bleeding / blood disorder',
      },
      {
        // NP #30 — keep question; supportive-care pathway disclaimer
        id: 'breast_cancer_personal',
        text: 'Breast Cancer (personal history)',
        inputType: 'yes_no',
        category: 'OUTSIDE_SCOPE',
        triggerOn: 'yes',
        clinicianNotes:
          'Not a contraindication for all hormones, but our program is not currently positioned to treat with hormones. Offer supportive/symptomatic care and ask if the patient would like to be contacted if/when the NP reviews their chart and can provide care. Do NOT book for hormone therapy now.',
        customDisclaimer: SUPPORTIVE_CARE_DISCLAIMER,
        shortLabel: 'Breast cancer (personal)',
      },
      {
        // NP #31 — keep question; supportive-care pathway disclaimer
        id: 'ovarian_cancer_personal',
        text: 'Ovarian Cancer (personal history)',
        inputType: 'yes_no',
        category: 'OUTSIDE_SCOPE',
        triggerOn: 'yes',
        clinicianNotes:
          'Not a contraindication for all hormones, but our program is not currently positioned to treat with hormones. Offer supportive/symptomatic care and ask if the patient would like to be contacted if/when the NP reviews their chart and can provide care. Do NOT book for hormone therapy now.',
        customDisclaimer: SUPPORTIVE_CARE_DISCLAIMER,
        shortLabel: 'Ovarian cancer (personal)',
      },
      {
        // NP #32 — keep question; supportive-care pathway disclaimer
        id: 'endometrial_cancer_personal',
        text: 'Endometrial Cancer (personal history)',
        inputType: 'yes_no',
        category: 'OUTSIDE_SCOPE',
        triggerOn: 'yes',
        clinicianNotes:
          'Not a contraindication for all hormones, but our program is not currently positioned to treat with hormones. Offer supportive/symptomatic care and ask if the patient would like to be contacted if/when the NP reviews their chart and can provide care. Do NOT book for hormone therapy now.',
        customDisclaimer: SUPPORTIVE_CARE_DISCLAIMER,
        shortLabel: 'Endometrial cancer (personal)',
      },
      {
        // NP #33 — keep as-is
        id: 'colon_cancer_personal',
        text: 'Colon Cancer (personal history)',
        inputType: 'yes_no',
        category: 'NOTE',
        triggerOn: 'yes',
        clinicianNotes: 'Not a direct CI. HRT may actually be protective. Flag for NP.',
        shortLabel: 'Colon cancer (personal)',
      },
    ],
  },
  {
    id: 'family_history',
    title: 'Family History',
    description: '1st degree relatives only: mother, sister, daughter.',
    questions: [
      {
        // NP #34 — keep question; supportive-care pathway disclaimer
        id: 'breast_cancer_family',
        text: 'Breast Cancer (1st degree relative)',
        inputType: 'yes_no',
        category: 'OUTSIDE_SCOPE',
        triggerOn: 'yes',
        clinicianNotes:
          'Not a contraindication for all hormones, but our program is not currently positioned to treat with hormones. Offer supportive/symptomatic care and ask if the patient would like to be contacted if/when the NP reviews their chart and can provide care. Do NOT book for hormone therapy now.',
        customDisclaimer: SUPPORTIVE_CARE_DISCLAIMER,
        shortLabel: 'Breast cancer (family)',
      },
      {
        // NP #35 — keep question; supportive-care pathway disclaimer
        id: 'ovarian_cancer_family',
        text: 'Ovarian Cancer (1st degree relative)',
        inputType: 'yes_no',
        category: 'OUTSIDE_SCOPE',
        triggerOn: 'yes',
        clinicianNotes:
          'Not a contraindication for all hormones, but our program is not currently positioned to treat with hormones. Offer supportive/symptomatic care and ask if the patient would like to be contacted if/when the NP reviews their chart and can provide care. Do NOT book for hormone therapy now.',
        customDisclaimer: SUPPORTIVE_CARE_DISCLAIMER,
        shortLabel: 'Ovarian cancer (family)',
      },
      {
        // NP #36 — keep question; supportive-care pathway disclaimer
        id: 'endometrial_cancer_family',
        text: 'Endometrial Cancer (1st degree relative)',
        inputType: 'yes_no',
        category: 'OUTSIDE_SCOPE',
        triggerOn: 'yes',
        clinicianNotes:
          'Not a contraindication for all hormones, but our program is not currently positioned to treat with hormones. Offer supportive/symptomatic care and ask if the patient would like to be contacted if/when the NP reviews their chart and can provide care. Do NOT book for hormone therapy now.',
        customDisclaimer: SUPPORTIVE_CARE_DISCLAIMER,
        shortLabel: 'Endometrial cancer (family)',
      },
      {
        // NP #37 — keep as-is
        id: 'colon_cancer_family',
        text: 'Colon Cancer (1st degree relative)',
        inputType: 'yes_no',
        category: 'NOTE',
        triggerOn: 'yes',
        clinicianNotes: 'Not a CI. Relevant for overall cancer risk counselling. Flag for NP.',
        shortLabel: 'Colon cancer (family)',
      },
    ],
  },
  {
    id: 'previous_assessments',
    title: 'Previous Assessments',
    description: 'Recent medical evaluations.',
    questions: [
      {
        // NP #38 — keep question + flag; "not absolute" guidance added
        id: 'recent_bloodwork',
        text: 'Physical assessment and/or bloodwork in the last 2 years?',
        inputType: 'yes_no',
        category: 'OUTSIDE_SCOPE',
        triggerOn: 'no',
        clinicianNotes:
          'Not an absolute contraindication, but baseline health status must be known before enrollment. If NO, patient needs up-to-date bloodwork first. Be sure to notify the patient that if any other concerns are unmanaged we cannot accept them for the program.',
        shortLabel: 'Bloodwork in last 2 yrs',
      },
    ],
  },
  {
    id: 'symptoms',
    title: 'Symptoms',
    description: 'Patient will complete symptom scale separately — this captures the primary concern.',
    questions: [
      {
        // NP #39 — keep as-is
        id: 'most_bothersome_symptom',
        text: 'What is the most bothersome symptom for you right now?',
        inputType: 'text',
        category: null,
        clinicianNotes: 'Guides treatment priority. Record for NP. No CI logic attached.',
        shortLabel: 'Most bothersome symptom',
      },
    ],
  },
];

export function getAllQuestions(answersMap: Map<string, Answer>) {
  const result: { question: Question; sectionTitle: string; sectionId: string }[] = [];
  for (const section of sections) {
    for (const q of section.questions) {
      if (q.conditionalOn) {
        const parentAnswer = answersMap.get(q.conditionalOn.questionId);
        if (!parentAnswer || parentAnswer.value !== q.conditionalOn.answer) {
          continue;
        }
      }
      result.push({ question: q, sectionTitle: section.title, sectionId: section.id });
    }
  }
  return result;
}
