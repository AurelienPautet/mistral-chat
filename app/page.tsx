"use client";

import React from "react";
import { StepCard } from "@/components/StepCard";
import { Step1Content } from "@/components/steps/Step1Content";
import { AppState } from "@/types";

const Steps = [
  { name: "Import Content", component: Step1Content },
  { name: "Select Sections", component: null },
  { name: "Generate README", component: null },
];

export default function Page() {
  const [appState, setAppState] = React.useState<AppState>({
    currentStep: 1,
    repoUrl: "",
    reporBranch: "main",
    repoFiles: null,
    selectedSections: [],
    finalMarkdown: null,
  });

  return (
    <StepCard
      name={Steps[appState.currentStep - 1].name}
      step={appState.currentStep}
      totalSteps={Steps.length}
    >
      <Step1Content appState={appState} setAppState={setAppState} />
    </StepCard>
  );
}
