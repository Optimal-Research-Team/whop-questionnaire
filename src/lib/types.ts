export type FlagCategory = 'OUTSIDE_SCOPE' | 'ABSOLUTE_CI' | 'RELATIVE_CI' | 'NOTE';
export type InputType = 'yes_no' | 'text' | 'number' | 'date';

export interface Question {
  id: string;
  text: string;
  inputType: InputType;
  category: FlagCategory | null;
  triggerOn?: 'yes' | 'no';
  clinicianNotes: string;
  conditionalOn?: { questionId: string; answer: string };
  helpfulProbe?: string;
  /** When true, a yes/no question also offers a "N/A" option (e.g. condition-control
   *  questions where the patient may not have the condition at all). N/A never triggers a flag. */
  allowNA?: boolean;
  /** Short label used in the live responses sidebar; falls back to `text` if absent. */
  shortLabel?: string;
  /** Overrides the generic category disclaimer with a question-specific script for the screener to read. */
  customDisclaimer?: string;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface Answer {
  value: string;
  notes: string;
}

export interface TriggeredFlag {
  questionId: string;
  questionText: string;
  category: FlagCategory;
  clinicianNotes: string;
  customDisclaimer?: string;
}

export const FLAG_LABELS: Record<FlagCategory, string> = {
  OUTSIDE_SCOPE: 'Outside Scope',
  ABSOLUTE_CI: 'Absolute CI',
  RELATIVE_CI: 'Relative CI',
  NOTE: 'Note',
};

export const CI_DISCLAIMER =
  "Based on what you've shared, I do want to flag that some forms of hormone therapy may not be suitable for you — but there are still a number of options our NP can explore, including non-hormonal treatments. We want to be upfront about that so there are no surprises.";

export const OUTSIDE_SCOPE_DISCLAIMER =
  "Thank you for sharing that with me. Based on what you've described, our hormone health program may not be the right fit at this time — your situation would benefit from a more specialized level of care than we currently offer here. I'd encourage you to speak with your family doctor or a specialist who can best support you. We appreciate you reaching out.";

/** Warmer script for cases the NP can't treat with hormones today but can still support
 *  symptomatically — and would like to keep on file for future review. */
export const SUPPORTIVE_CARE_DISCLAIMER =
  "Thank you for sharing that with me. Based on what you've described, hormone therapy isn't something our program is able to offer you at this stage — but this isn't the end of the road. We can still provide supportive treatments and help manage your symptoms. I'd also like to keep your details on file so we can reach out if and when our Nurse Practitioner reviews your chart and feels we're able to support you with more options. Would that be okay with you?";

/** Resolves the patient-facing script for a triggered flag. */
export function disclaimerFor(flag: TriggeredFlag): string {
  if (flag.customDisclaimer) return flag.customDisclaimer;
  if (flag.category === 'OUTSIDE_SCOPE') return OUTSIDE_SCOPE_DISCLAIMER;
  if (flag.category === 'ABSOLUTE_CI' || flag.category === 'RELATIVE_CI') return CI_DISCLAIMER;
  return '';
}
