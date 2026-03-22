"use client";

import { useQuestionnaire } from "../hooks/useQuestionnaire";
import { WelcomeScreen } from "../components/WelcomeScreen";
import { QuestionScreen } from "../components/QuestionScreen";
import { SummaryScreen } from "../components/SummaryScreen";

export default function Home() {
  const q = useQuestionnaire();

  return (
    <main className="min-h-screen bg-cream-50">
      {q.screen === "welcome" && <WelcomeScreen {...q} />}
      {q.screen === "questionnaire" && <QuestionScreen {...q} />}
      {q.screen === "summary" && <SummaryScreen {...q} />}
    </main>
  );
}
