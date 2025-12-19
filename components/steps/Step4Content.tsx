"use client";

import React from "react";
import { Button } from "../ui/button";
import { Clipboard, LoaderCircle } from "lucide-react";
import { StepContentProps } from "@/types";
import { MarkdownPreview } from "../MdPreview";
import { useGenerateReadme } from "@/hooks/useMistral";

const Step4Content: React.FC<StepContentProps> = ({
  appState,
  setAppState,
}) => {
  const { isLoading, isError } = useGenerateReadme(appState, setAppState);
  return (
    <div className="h-full overflow-hidden flex flex-col mt-4  pt-8">
      <div className="flex h-full overflow-y-scroll flex-col pb-10 mb-4">
        {isLoading && (
          <div className="flex flex-col justify-center items-center h-full">
            <LoaderCircle className="animate-spin mx-auto" />
            <p>Generating README.md</p>
          </div>
        )}
        {isError && (
          <p className="text-red-500">
            An error occurred while generating the README.md. Please try again
            later.
          </p>
        )}
        <MarkdownPreview content={appState.finalMarkdown || ""} />
      </div>
      <Button
        disabled={!appState.finalMarkdown}
        className="mt-auto mx-auto w-1/2 hover:bg-primary/80"
        onClick={() => {
          navigator.clipboard.writeText(appState.finalMarkdown || "");
        }}
      >
        Copy to Clipboard
        <Clipboard className="ml-2" />
      </Button>
    </div>
  );
};

export { Step4Content };
