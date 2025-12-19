"use client";

import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { StepContentProps } from "@/types";
import { useGenerateQuestions } from "@/hooks/useMistral";
import { Card } from "../ui/card";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

const QuestionCard: React.FC<{
  question: string;
  answer: string | null;
  onChange: (newAnswer: string) => void;
}> = ({ question, answer, onChange }) => {
  return (
    <Card className="border p-4 rounded-md shadow-md mb-4 h-auto flex-shrink-0">
      <Field>
        <FieldLabel htmlFor={"question-" + question}>{question}</FieldLabel>
        <Input
          id={"question-" + question}
          placeholder="Your answer here"
          required
          value={answer || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      </Field>
    </Card>
  );
};

const Step3Content: React.FC<StepContentProps> = ({
  appState,
  setAppState,
}) => {
  const { isLoading, isError } = useGenerateQuestions(appState, setAppState);
  const handleAnswerChange = (index: number, newAnswer: string) => {
    const updatedQuestions = [...appState.questions];
    updatedQuestions[index].answer = newAnswer;
    setAppState((prev) => ({ ...prev, questions: updatedQuestions }));
  };
  console.log(appState.questions);
  return (
    <div className="h-full overflow-hidden flex flex-col mt-4  pt-8">
      <div className="flex h-full overflow-y-scroll flex-col pb-10 mb-4">
        {isLoading && (
          <div className="flex flex-col justify-center items-center ">
            <LoaderCircle className="animate-spin mx-auto" />
            <p>Generating questions</p>
          </div>
        )}
        {isError && (
          <p className="text-red-500">
            An error occurred while generating the README.md. Please try again
            later.
          </p>
        )}
        {appState.questions.map((q, index) => (
          <QuestionCard
            key={index}
            question={q.question}
            answer={q.answer}
            onChange={(newAnswer) => handleAnswerChange(index, newAnswer)}
          />
        ))}
      </div>
      <Button
        disabled={!appState.questions.some((q) => q.answer)}
        className="mt-auto mx-auto w-1/2"
        onClick={() => setAppState((prev) => ({ ...prev, currentStep: 4 }))}
      >
        Next
        <ArrowRight className="ml-2" />
      </Button>
    </div>
  );
};

export { Step3Content };
