"use client";

import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Section } from "@/types";
import { StepContentProps } from "@/types";

const Sections: Section[] = [
  { title: "Introduction", description: "Overview of the project" },
  { title: "Installation", description: "How to install the project" },
  { title: "Usage", description: "Instructions on how to use the project" },
  { title: "Contributing", description: "Guidelines for contributing" },
  { title: "License", description: "License information" },
];

const SectionToggle: React.FC<{
  title: string;
  description: string;
  selected: boolean;
  onToggle: () => void;
}> = ({ title, description, selected, onToggle }) => {
  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer ${
        selected ? "border-primary bg-primary/10" : "border-gray-300"
      }`}
      onClick={onToggle}
    >
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

const Step2Content: React.FC<StepContentProps> = ({
  appState,
  setAppState,
}) => {
  const isSelected = (section: Section) => {
    return appState.selectedSections.some((s) => s.title === section.title);
  };
  const toggleSection = (section: Section) => {
    if (isSelected(section)) {
      setAppState((prev) => ({
        ...prev,
        selectedSections: prev.selectedSections.filter(
          (s) => s.title !== section.title
        ),
      }));
    } else {
      setAppState((prev) => ({
        ...prev,
        selectedSections: [...prev.selectedSections, section],
      }));
    }
  };
  return (
    <div className="h-full flex flex-col mt-4">
      <div className="grid  grid-cols-3 gap-4">
        {Sections.map((section) => {
          return (
            <SectionToggle
              key={section.title}
              title={section.title}
              description={section.description}
              selected={isSelected(section)}
              onToggle={() => toggleSection(section)}
            />
          );
        })}
      </div>
      <Button
        disabled={appState.selectedSections.length === 0}
        className="mt-auto mx-auto w-1/2"
        onClick={() => setAppState((prev) => ({ ...prev, currentStep: 3 }))}
      >
        Next
        <ArrowRight className="ml-2" />
      </Button>
    </div>
  );
};

export { Step2Content };
