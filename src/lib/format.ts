import { Answer, Question } from './types';
import { getAllQuestions } from '../data/questions';

/** Human-readable rendering of a single answer value, shared by the EMR summary and the live sidebar. */
export function formatAnswer(question: Question, answer: Answer | undefined): string {
  const value = answer?.value;
  if (!value) return 'Not answered';

  if (question.inputType === 'yes_no') {
    if (value === 'yes') return 'Yes';
    if (value === 'no') return 'No';
    if (value === 'na') return 'N/A';
    return 'Not answered';
  }
  if (question.id === 'age') return `${value} years`;
  if (question.inputType === 'date') {
    const d = new Date(value);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' });
    }
    return value;
  }
  return value;
}

export interface AnsweredItem {
  question: Question;
  sectionTitle: string;
  sectionId: string;
  answer: Answer;
  display: string;
}

/** All currently-visible questions that have a recorded answer, in order — for the live sidebar. */
export function getAnsweredItems(answers: Map<string, Answer>): AnsweredItem[] {
  const items: AnsweredItem[] = [];
  for (const { question, sectionTitle, sectionId } of getAllQuestions(answers)) {
    const answer = answers.get(question.id);
    if (answer && answer.value) {
      items.push({
        question,
        sectionTitle,
        sectionId,
        answer,
        display: formatAnswer(question, answer),
      });
    }
  }
  return items;
}
