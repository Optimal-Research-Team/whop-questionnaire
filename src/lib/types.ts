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
