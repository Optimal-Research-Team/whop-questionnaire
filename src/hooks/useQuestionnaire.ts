import { useState, useCallback, useMemo } from 'react';
import { Answer, TriggeredFlag } from '../lib/types';
import { getAllQuestions, sections } from '../data/questions';

export type Screen = 'welcome' | 'questionnaire' | 'summary';

export function useQuestionnaire() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [patientName, setPatientName] = useState('');
  const [screenerName, setScreenerName] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, Answer>>(new Map());

  const visibleQuestions = useMemo(
    () => getAllQuestions(answers),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [answers, currentIndex]
  );

  const totalQuestions = visibleQuestions.length;
  const currentItem = visibleQuestions[currentIndex];

  const currentAnswer = currentItem
    ? answers.get(currentItem.question.id)
    : undefined;

  const setAnswer = useCallback(
    (questionId: string, value: string, notes?: string) => {
      setAnswers((prev) => {
        const next = new Map(prev);
        const existing = next.get(questionId);
        next.set(questionId, {
          value,
          notes: notes ?? existing?.notes ?? '',
        });
        // Clear answers for any conditional child questions that depend on this one
        for (const section of sections) {
          for (const q of section.questions) {
            if (q.conditionalOn?.questionId === questionId) {
              next.delete(q.id);
            }
          }
        }
        return next;
      });
    },
    []
  );

  const setNotes = useCallback(
    (questionId: string, notes: string) => {
      setAnswers((prev) => {
        const next = new Map(prev);
        const existing = next.get(questionId);
        next.set(questionId, {
          value: existing?.value ?? '',
          notes,
        });
        return next;
      });
    },
    []
  );

  const currentFlag = useMemo((): TriggeredFlag | null => {
    if (!currentItem) return null;
    const q = currentItem.question;
    const answer = answers.get(q.id);
    if (!answer || !q.category) return null;

    // Custom logic for age (numeric threshold, no triggerOn)
    if (q.id === 'age') {
      const age = parseInt(answer.value, 10);
      if (!isNaN(age) && age > 60) {
        return { questionId: q.id, questionText: q.text, category: q.category, clinicianNotes: q.clinicianNotes };
      }
      return null;
    }

    // Custom logic for LMP (date threshold, no triggerOn)
    if (q.id === 'last_menstrual_period') {
      if (answer.value) {
        const lmpDate = new Date(answer.value);
        if (!isNaN(lmpDate.getTime())) {
          const now = new Date();
          const yearsDiff = (now.getTime() - lmpDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
          if (yearsDiff > 10) {
            return { questionId: q.id, questionText: q.text, category: q.category, clinicianNotes: q.clinicianNotes };
          }
        }
      }
      return null;
    }

    // Generic triggerOn logic for all other questions
    if (!q.triggerOn) return null;
    if (answer.value === q.triggerOn) {
      return { questionId: q.id, questionText: q.text, category: q.category, clinicianNotes: q.clinicianNotes };
    }

    return null;
  }, [currentItem, answers]);

  const allFlags = useMemo((): TriggeredFlag[] => {
    const flags: TriggeredFlag[] = [];
    for (const item of visibleQuestions) {
      const q = item.question;
      const answer = answers.get(q.id);
      if (!answer || !q.category) continue;

      if (q.id === 'age') {
        const age = parseInt(answer.value, 10);
        if (!isNaN(age) && age > 60) {
          flags.push({ questionId: q.id, questionText: q.text, category: q.category, clinicianNotes: q.clinicianNotes });
        }
        continue;
      }

      if (q.id === 'last_menstrual_period') {
        if (answer.value) {
          const lmpDate = new Date(answer.value);
          if (!isNaN(lmpDate.getTime())) {
            const now = new Date();
            const yearsDiff = (now.getTime() - lmpDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
            if (yearsDiff > 10) {
              flags.push({ questionId: q.id, questionText: q.text, category: q.category, clinicianNotes: q.clinicianNotes });
            }
          }
        }
        continue;
      }

      if (!q.triggerOn) continue;
      if (answer.value === q.triggerOn) {
        flags.push({ questionId: q.id, questionText: q.text, category: q.category, clinicianNotes: q.clinicianNotes });
      }
    }
    return flags;
  }, [visibleQuestions, answers]);

  const canGoNext = useMemo(() => {
    if (!currentItem) return false;
    const answer = answers.get(currentItem.question.id);
    if (!answer || !answer.value) return false;
    return true;
  }, [currentItem, answers]);

  const goNext = useCallback(() => {
    const updated = getAllQuestions(answers);
    if (currentIndex < updated.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setScreen('summary');
    }
  }, [currentIndex, answers]);

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  const startScreening = useCallback(() => {
    setScreen('questionnaire');
    setCurrentIndex(0);
  }, []);

  const resetAll = useCallback(() => {
    setScreen('welcome');
    setPatientName('');
    setScreenerName('');
    setCurrentIndex(0);
    setAnswers(new Map());
  }, []);

  const currentSection = currentItem
    ? { title: currentItem.sectionTitle, id: currentItem.sectionId }
    : null;

  const sectionProgress = useMemo(() => {
    if (!currentSection) return { current: 0, total: 0 };
    const sectionQuestions = visibleQuestions.filter(
      (q) => q.sectionId === currentSection.id
    );
    const indexInSection =
      sectionQuestions.findIndex(
        (q) => q.question.id === currentItem?.question.id
      ) + 1;
    return { current: indexInSection, total: sectionQuestions.length };
  }, [currentSection, visibleQuestions, currentItem]);

  return {
    screen, patientName, setPatientName, screenerName, setScreenerName,
    currentIndex, totalQuestions, currentItem, currentAnswer, currentFlag,
    currentSection, sectionProgress, allFlags, answers, canGoNext,
    setAnswer, setNotes, goNext, goBack, startScreening, resetAll, setScreen,
  };
}
