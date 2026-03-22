import { Answer, TriggeredFlag, FLAG_LABELS, CI_DISCLAIMER, OUTSIDE_SCOPE_DISCLAIMER } from './types';
import { getAllQuestions } from '../data/questions';

export function generateSummary(
  patientName: string,
  screenerName: string,
  answers: Map<string, Answer>,
  flags: TriggeredFlag[]
): string {
  const date = new Date().toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const lines: string[] = [];

  lines.push('WHOP PHONE PRE-SCREENING QUESTIONNAIRE');
  lines.push('='.repeat(50));
  lines.push('');
  lines.push(`Patient: ${patientName || 'Not provided'}`);
  lines.push(`Date: ${date}`);
  lines.push(`Screened by: ${screenerName || 'Not provided'}`);
  lines.push('');

  const outsideScope = flags.filter((f) => f.category === 'OUTSIDE_SCOPE');
  const absoluteCI = flags.filter((f) => f.category === 'ABSOLUTE_CI');
  const relativeCI = flags.filter((f) => f.category === 'RELATIVE_CI');
  const notes = flags.filter((f) => f.category === 'NOTE');

  if (flags.length > 0) {
    lines.push('-'.repeat(50));
    lines.push('FLAGS SUMMARY');
    lines.push('-'.repeat(50));

    if (outsideScope.length > 0) {
      lines.push('');
      lines.push('OUTSIDE SCOPE (Do NOT book):');
      for (const f of outsideScope) {
        lines.push(`  - ${f.questionText}`);
      }
    }

    if (absoluteCI.length > 0) {
      lines.push('');
      lines.push('ABSOLUTE CONTRAINDICATIONS:');
      for (const f of absoluteCI) {
        lines.push(`  - ${f.questionText}`);
      }
    }

    if (relativeCI.length > 0) {
      lines.push('');
      lines.push('RELATIVE CONTRAINDICATIONS:');
      for (const f of relativeCI) {
        lines.push(`  - ${f.questionText}`);
      }
    }

    if (notes.length > 0) {
      lines.push('');
      lines.push('NOTES FOR NP:');
      for (const f of notes) {
        lines.push(`  - ${f.questionText}`);
      }
    }

    lines.push('');

    if (outsideScope.length > 0) {
      lines.push('OUTSIDE SCOPE DISCLAIMER DELIVERED:');
      lines.push(`"${OUTSIDE_SCOPE_DISCLAIMER}"`);
      lines.push('');
    }
    if (absoluteCI.length > 0 || relativeCI.length > 0) {
      lines.push('CI DISCLAIMER DELIVERED:');
      lines.push(`"${CI_DISCLAIMER}"`);
      lines.push('');
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

    let answerDisplay = answer?.value || 'Not answered';
    if (item.question.inputType === 'yes_no') {
      answerDisplay = answer?.value === 'yes' ? 'Yes' : answer?.value === 'no' ? 'No' : 'Not answered';
    } else if (item.question.id === 'age') {
      answerDisplay = answer?.value ? `${answer.value} years` : 'Not provided';
    } else if (item.question.id === 'cycle_length') {
      answerDisplay = answer?.value ? `${answer.value} days` : 'Not provided';
    }

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
