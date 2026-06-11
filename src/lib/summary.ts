import {
  Answer,
  TriggeredFlag,
  FLAG_LABELS,
  CI_DISCLAIMER,
  OUTSIDE_SCOPE_DISCLAIMER,
  SUPPORTIVE_CARE_DISCLAIMER,
  disclaimerFor,
} from './types';
import { getAllQuestions } from '../data/questions';
import { formatAnswer, formatAdministeredAt } from './format';

const DISCLAIMER_LABELS: { text: string; label: string }[] = [
  { text: OUTSIDE_SCOPE_DISCLAIMER, label: 'OUTSIDE SCOPE DISCLAIMER DELIVERED:' },
  { text: SUPPORTIVE_CARE_DISCLAIMER, label: 'SUPPORTIVE CARE PATHWAY OFFERED:' },
  { text: CI_DISCLAIMER, label: 'CI DISCLAIMER DELIVERED:' },
];

export function generateSummary(
  administeredAt: string,
  screenerName: string,
  answers: Map<string, Answer>,
  flags: TriggeredFlag[]
): string {
  const lines: string[] = [];

  lines.push('WHOP PHONE PRE-SCREENING QUESTIONNAIRE');
  lines.push('='.repeat(50));
  lines.push('');
  lines.push(`Administered: ${formatAdministeredAt(administeredAt)}`);
  lines.push(`Screened by: ${screenerName || 'Not provided'}`);
  lines.push('No PHI recorded — attach this note to the patient chart in the EMR.');
  lines.push('');

  const outsideScope = flags.filter((f) => f.category === 'OUTSIDE_SCOPE');
  const absoluteCI = flags.filter((f) => f.category === 'ABSOLUTE_CI');
  const relativeCI = flags.filter((f) => f.category === 'RELATIVE_CI');
  const notes = flags.filter((f) => f.category === 'NOTE');

  const pushFlagGroup = (heading: string, group: TriggeredFlag[]) => {
    if (group.length === 0) return;
    lines.push('');
    lines.push(heading);
    for (const f of group) {
      lines.push(`  - ${f.questionText}`);
      if (f.clinicianNotes) lines.push(`    Note: ${f.clinicianNotes}`);
    }
  };

  if (flags.length > 0) {
    lines.push('-'.repeat(50));
    lines.push('FLAGS SUMMARY');
    lines.push('-'.repeat(50));

    pushFlagGroup('OUTSIDE SCOPE (Do NOT book for hormone therapy):', outsideScope);
    pushFlagGroup('ABSOLUTE CONTRAINDICATIONS:', absoluteCI);
    pushFlagGroup('RELATIVE CONTRAINDICATIONS:', relativeCI);
    pushFlagGroup('NOTES FOR NP:', notes);

    lines.push('');

    // List each distinct patient-facing disclaimer that was delivered.
    const delivered = new Set(flags.map(disclaimerFor).filter(Boolean));
    for (const { text, label } of DISCLAIMER_LABELS) {
      if (delivered.has(text)) {
        lines.push(label);
        lines.push(`"${text}"`);
        lines.push('');
      }
    }
  } else {
    lines.push('No contraindications or flags identified.');
    lines.push('');
  }

  const visibleQuestions = getAllQuestions(answers);

  let lastSectionId = '';
  for (const item of visibleQuestions) {
    if (item.sectionId !== lastSectionId) {
      lastSectionId = item.sectionId;
      lines.push('-'.repeat(50));
      lines.push(item.sectionTitle.toUpperCase());
      lines.push('-'.repeat(50));
    }

    const answer = answers.get(item.question.id);
    const flag = flags.find((f) => f.questionId === item.question.id);
    const answerDisplay = formatAnswer(item.question, answer);

    const flagLabel = flag ? ` [${FLAG_LABELS[flag.category]}]` : '';
    lines.push(`Q: ${item.question.text}`);
    lines.push(`A: ${answerDisplay}${flagLabel}`);

    if (answer?.notes) {
      lines.push(`Notes: ${answer.notes}`);
    }
    lines.push('');
  }

  lines.push('-'.repeat(50));
  lines.push('This is a pre-screening tool only. All clinical');
  lines.push('decisions are made by the supervising NP.');
  lines.push('-'.repeat(50));

  return lines.join('\n');
}
