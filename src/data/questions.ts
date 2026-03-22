import { Section, Question, Answer } from '../lib/types';

export const sections: Section[] = [
  {
    id: 'demographic',
    title: 'Demographic',
    description: 'Basic patient information for risk assessment.',
    questions: [
      {
        id: 'age',
        text: 'Age',
        inputType: 'number',
        category: 'RELATIVE_CI',
        triggerOn: 'yes',
        clinicianNotes:
          'Age >60 = higher risk group for systemic estrogen — not an absolute CI. Vaginal estrogens, DHEA, testosterone, and pregnenolone remain safe options. Flag for NP to assess individually. Note: PO/topical estradiol may still be an option, but patient must be informed of the higher risk profile and an informed decision discussion must take place with the NP.',
      },
      {
        id: 'last_menstrual_period',
        text: 'Date of last menstrual period',
        inputType: 'date',
        category: 'RELATIVE_CI',
        triggerOn: 'yes',
        clinicianNotes:
          '>10 yrs post-menopause = higher risk for systemic estrogen — not an absolute CI. Vaginal estrogens, DHEA, testosterone, and pregnenolone remain safe options. Flag for NP to assess individually. Note: PO/topical estradiol may still be an option, but patient must be informed of the higher risk profile and an informed decision discussion must take place with the NP.',
      },
    ],
  },
  {
    id: 'cycling',
    title: 'Cycling',
    description: 'Menstrual cycle history and changes.',
    questions: [
      {
        id: 'cycling_regularly',
        text: 'Cycling regularly?',
        inputType: 'yes_no',
        category: null,
        clinicianNotes: 'Context for perimenopause staging.',
      },
      {
        id: 'cycle_length',
        text: 'Cycle length (Day 1 of true bleeding to day before next Day 1)',
        inputType: 'number',
        category: null,
        clinicianNotes:
          'Documents cycle regularity. Remind patient that only true bleeding counts — spotting does not qualify as Day 1.',
        helpfulProbe: 'Note: spotting does not count as Day 1.',
      },
      {
        id: 'period_concerns',
        text: 'Any particular concerns re: periods through life, or largely normal/regular?',
        inputType: 'yes_no',
        category: null,
        clinicianNotes: 'Note any prior pathology.',
      },
      {
        id: 'cycle_changed',
        text: 'Has your cycle changed in the last 1–2 years?',
        inputType: 'yes_no',
        category: null,
        clinicianNotes: 'Cycle changes signal perimenopause.',
      },
      {
        id: 'prolonged_bleeding',
        text: 'Have you had more than 14 consecutive days of bleeding in the last year?',
        inputType: 'yes_no',
        category: 'ABSOLUTE_CI',
        triggerOn: 'yes',
        clinicianNotes:
          'This does NOT automatically indicate abnormal bleeding — prolonged bleeding is common pre/perimenopause. This is ONLY a contraindication if bleeding occurs >1 year after the final menses. Example: last period Jan 15, 2023 → no bleeding → then new vaginal bleeding Feb 3–6, 2024 = concern. Use CI DISCLAIMER only in that context. Note: If this has already been investigated and records are available (e.g. ultrasound report or other workup), we can proceed with booking — flag for NP review. Also note: this is an absolute CI to estradiol specifically, but if the prolonged bleeding is long-standing/chronic in nature, it may be addressable with progesterone — NP to assess.',
      },
      {
        id: 'postmenopausal_bleeding',
        text: 'Have you had vaginal bleeding after going >1 year without a period?',
        inputType: 'yes_no',
        category: 'OUTSIDE_SCOPE',
        triggerOn: 'yes',
        clinicianNotes:
          'Postmenopausal bleeding must be investigated for endometrial/other cancer before any enrollment. Do NOT book. Use OUTSIDE SCOPE DISCLAIMER. Note: If this has already been investigated and records are available (e.g. ultrasound report or other workup confirming benign etiology), we may be able to proceed — flag for NP review before booking.',
      },
    ],
  },
  {
    id: 'reproductive_history',
    title: 'Reproductive Medical History',
    description: 'Gynecological and reproductive health conditions.',
    questions: [
      {
        id: 'endometriosis',
        text: 'Endometriosis',
        inputType: 'yes_no',
        category: 'RELATIVE_CI',
        triggerOn: 'yes',
        clinicianNotes: 'Estrogen may stimulate disease. NP to assess. Use CI DISCLAIMER.',
      },
      {
        id: 'pcos',
        text: 'Polycystic Ovarian Syndrome (PCOS)',
        inputType: 'yes_no',
        category: 'NOTE',
        triggerOn: 'yes',
        clinicianNotes: 'Does not exclude HRT but affects hormone balance. Flag for NP.',
      },
      {
        id: 'adenomyosis',
        text: 'Adenomyosis',
        inputType: 'yes_no',
        category: 'RELATIVE_CI',
        triggerOn: 'yes',
        clinicianNotes: 'Progestogen-based therapy preferred. Use CI DISCLAIMER.',
      },
      {
        id: 'uterine_fibroids',
        text: 'Uterine Fibroids',
        inputType: 'yes_no',
        category: 'RELATIVE_CI',
        triggerOn: 'yes',
        clinicianNotes: 'Estrogen may promote growth. NP assessment required. Use CI DISCLAIMER.',
      },
      {
        id: 'abnormal_uterine_bleeding',
        text: 'Abnormal Uterine Bleeding (diagnosed)',
        inputType: 'yes_no',
        category: 'ABSOLUTE_CI',
        triggerOn: 'yes',
        clinicianNotes: 'Do not proceed until etiology confirmed. Use CI DISCLAIMER.',
      },
      {
        id: 'pmdd',
        text: 'Premenstrual Dysphoric Disorder (PMDD)',
        inputType: 'yes_no',
        category: 'NOTE',
        triggerOn: 'yes',
        clinicianNotes: 'Not a contraindication; hormones may help or worsen. Flag for NP.',
      },
      {
        id: 'postpartum_psych',
        text: 'Postpartum anxiety / depression / psychosis',
        inputType: 'yes_no',
        category: 'NOTE',
        triggerOn: 'yes',
        clinicianNotes: 'Relevant mental health history. Flag for NP.',
      },
      {
        id: 'infertility',
        text: 'Infertility (history of)',
        inputType: 'yes_no',
        category: 'NOTE',
        triggerOn: 'yes',
        clinicianNotes: 'Not a contraindication. Clinical context for NP.',
      },
      {
        id: 'pid',
        text: 'Pelvic Inflammatory Disease (PID)',
        inputType: 'yes_no',
        category: 'NOTE',
        triggerOn: 'yes',
        clinicianNotes: 'Not a contraindication. Note for NP.',
      },
      {
        id: 'hysterectomy',
        text: 'Hysterectomy',
        inputType: 'yes_no',
        category: 'NOTE',
        triggerOn: 'yes',
        clinicianNotes: 'If yes → progestogen may not be required. NP to confirm.',
      },
      {
        id: 'ovaries_intact',
        text: 'Still have your ovaries?',
        inputType: 'yes_no',
        category: 'NOTE',
        triggerOn: 'no',
        conditionalOn: { questionId: 'hysterectomy', answer: 'yes' },
        clinicianNotes: 'Affects hormone production; important for treatment planning.',
      },
    ],
  },
  {
    id: 'past_medical_history',
    title: 'Past Medical History',
    description: 'General medical conditions and contraindication screening.',
    questions: [
      {
        id: 'diabetes',
        text: 'Diabetes — is it currently well controlled?',
        inputType: 'yes_no',
        category: 'RELATIVE_CI',
        triggerOn: 'no',
        clinicianNotes:
          'Uncontrolled DM = exclusion criterion. If not controlled, do not book. Use CI DISCLAIMER.',
        helpfulProbe: 'When was the last time you were assessed by a doctor regarding your diabetes?',
      },
      {
        id: 'hypertension',
        text: 'High Blood Pressure / Hypertension — is it currently well controlled?',
        inputType: 'yes_no',
        category: 'RELATIVE_CI',
        triggerOn: 'no',
        clinicianNotes:
          'Uncontrolled HTN = exclusion criterion. If not controlled, do not book. Use CI DISCLAIMER.',
        helpfulProbe: 'When was the last time you were assessed by a doctor regarding your blood pressure?',
      },
      {
        id: 'liver_disease',
        text: 'Liver Disease',
        inputType: 'yes_no',
        category: 'ABSOLUTE_CI',
        triggerOn: 'yes',
        clinicianNotes: 'Active liver disease = absolute estrogen CI. Use CI DISCLAIMER.',
      },
      {
        id: 'kidney_disease',
        text: 'Kidney Disease',
        inputType: 'yes_no',
        category: 'NOTE',
        triggerOn: 'yes',
        clinicianNotes: 'Not an absolute CI but affects drug metabolism. Flag for NP.',
      },
      {
        id: 'peanut_allergy',
        text: 'Allergy to Peanuts',
        inputType: 'yes_no',
        category: 'ABSOLUTE_CI',
        triggerOn: 'yes',
        clinicianNotes:
          'Utrogestan/micronized progesterone contains peanut oil — absolute CI for that formulation. Use CI DISCLAIMER.',
      },
      {
        id: 'dvt',
        text: 'Deep Vein Thrombosis (DVT)',
        inputType: 'yes_no',
        category: 'ABSOLUTE_CI',
        triggerOn: 'yes',
        clinicianNotes:
          'History of DVT = absolute estrogen CI. Transdermal may be safer — NP decision. Use CI DISCLAIMER.',
      },
      {
        id: 'pe',
        text: 'Pulmonary Embolism (PE)',
        inputType: 'yes_no',
        category: 'ABSOLUTE_CI',
        triggerOn: 'yes',
        clinicianNotes: 'History of PE = absolute estrogen CI. Use CI DISCLAIMER.',
      },
      {
        id: 'stroke_tia',
        text: 'Stroke or TIA',
        inputType: 'yes_no',
        category: 'ABSOLUTE_CI',
        triggerOn: 'yes',
        clinicianNotes: 'Previous stroke/TIA = absolute estrogen CI. Use CI DISCLAIMER.',
      },
      {
        id: 'mi_chd',
        text: 'MI / Heart Attack (Coronary Heart Disease)',
        inputType: 'yes_no',
        category: 'ABSOLUTE_CI',
        triggerOn: 'yes',
        clinicianNotes: 'Active/previous CHD = absolute estrogen CI. Use CI DISCLAIMER.',
      },
      {
        id: 'bleeding_disorders',
        text: 'Bleeding or Blood Disorders',
        inputType: 'yes_no',
        category: 'RELATIVE_CI',
        triggerOn: 'yes',
        clinicianNotes: 'Assess bleeding risk. NP must evaluate. Use CI DISCLAIMER.',
      },
      {
        id: 'breast_cancer_personal',
        text: 'Breast Cancer (personal history)',
        inputType: 'yes_no',
        category: 'OUTSIDE_SCOPE',
        triggerOn: 'yes',
        clinicianNotes:
          'Personal history of breast cancer — not appropriate for this program. Use OUTSIDE SCOPE DISCLAIMER. Do NOT book.',
      },
      {
        id: 'ovarian_cancer_personal',
        text: 'Ovarian Cancer (personal history)',
        inputType: 'yes_no',
        category: 'OUTSIDE_SCOPE',
        triggerOn: 'yes',
        clinicianNotes:
          'Personal history of ovarian cancer — not appropriate for this program. Use OUTSIDE SCOPE DISCLAIMER. Do NOT book.',
      },
      {
        id: 'endometrial_cancer_personal',
        text: 'Endometrial Cancer (personal history)',
        inputType: 'yes_no',
        category: 'OUTSIDE_SCOPE',
        triggerOn: 'yes',
        clinicianNotes:
          'Personal history of endometrial cancer — not appropriate for this program. Use OUTSIDE SCOPE DISCLAIMER. Do NOT book.',
      },
      {
        id: 'colon_cancer_personal',
        text: 'Colon Cancer (personal history)',
        inputType: 'yes_no',
        category: 'NOTE',
        triggerOn: 'yes',
        clinicianNotes: 'Not a direct CI. HRT may actually be protective. Flag for NP.',
      },
    ],
  },
  {
    id: 'family_history',
    title: 'Family History',
    description: '1st degree relatives only: mother, sister, daughter.',
    questions: [
      {
        id: 'breast_cancer_family',
        text: 'Breast Cancer (1st degree relative)',
        inputType: 'yes_no',
        category: 'OUTSIDE_SCOPE',
        triggerOn: 'yes',
        clinicianNotes:
          '1st degree family history of breast cancer — outside current NP comfort scope. Use OUTSIDE SCOPE DISCLAIMER. Do NOT book.',
      },
      {
        id: 'ovarian_cancer_family',
        text: 'Ovarian Cancer (1st degree relative)',
        inputType: 'yes_no',
        category: 'OUTSIDE_SCOPE',
        triggerOn: 'yes',
        clinicianNotes:
          '1st degree family history of ovarian cancer — outside program scope. Use OUTSIDE SCOPE DISCLAIMER. Do NOT book.',
      },
      {
        id: 'endometrial_cancer_family',
        text: 'Endometrial Cancer (1st degree relative)',
        inputType: 'yes_no',
        category: 'OUTSIDE_SCOPE',
        triggerOn: 'yes',
        clinicianNotes:
          '1st degree family history of endometrial cancer — outside program scope. Use OUTSIDE SCOPE DISCLAIMER. Do NOT book.',
      },
      {
        id: 'colon_cancer_family',
        text: 'Colon Cancer (1st degree relative)',
        inputType: 'yes_no',
        category: 'NOTE',
        triggerOn: 'yes',
        clinicianNotes: 'Not a CI. Relevant for overall cancer risk counselling. Flag for NP.',
      },
    ],
  },
  {
    id: 'previous_assessments',
    title: 'Previous Assessments',
    description: 'Recent medical evaluations.',
    questions: [
      {
        id: 'recent_bloodwork',
        text: 'Physical assessment and/or bloodwork in the last 2 years?',
        inputType: 'yes_no',
        category: 'OUTSIDE_SCOPE',
        triggerOn: 'no',
        clinicianNotes:
          'If NO → baseline health status unknown; uncontrolled conditions may be undetected. Patient must have up-to-date bloodwork before enrollment. Use OUTSIDE SCOPE DISCLAIMER. Do NOT book.',
      },
    ],
  },
  {
    id: 'symptoms',
    title: 'Symptoms',
    description: 'Patient will complete symptom scale separately — this captures the primary concern.',
    questions: [
      {
        id: 'most_bothersome_symptom',
        text: 'What is the most bothersome symptom for you right now?',
        inputType: 'text',
        category: null,
        clinicianNotes: 'Guides treatment priority. Record for NP. No CI logic attached.',
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
