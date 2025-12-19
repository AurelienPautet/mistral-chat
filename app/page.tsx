"use client";

import React from "react";
import { StepCard } from "@/components/StepCard";
import { Step1Content } from "@/components/steps/Step1Content";
import { AppState } from "@/types";
import { Step2Content } from "@/components/steps/Step2Content";
import { Step3Content } from "@/components/steps/Step3Content";
import { Step4Content } from "@/components/steps/Step4Content";

const Steps = [
  { name: "Import Content", component: Step1Content },
  { name: "Select Sections", component: Step2Content },
  { name: "Answer Questions", component: Step3Content },
  { name: "Generate README", component: Step4Content },
];

export default function Page() {
  const [appState, setAppState] = React.useState<AppState>({
    currentStep: 1,
    repoUrl: "",
    reporBranch: "main",
    repoFiles: null,
    selectedSections: [],
    questions: [],
    finalMarkdown: null,
  });

  const CurrentComponent = Steps[appState.currentStep - 1].component;

  return (
    <StepCard
      name={Steps[appState.currentStep - 1].name}
      step={appState.currentStep}
      totalSteps={Steps.length}
    >
      {CurrentComponent && (
        <CurrentComponent appState={appState} setAppState={setAppState} />
      )}
    </StepCard>
  );
}
