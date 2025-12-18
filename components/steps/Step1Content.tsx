"use client";

import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, CheckIcon, X, LoaderCircle } from "lucide-react";
import { Input } from "../ui/input";
import { Field, FieldLabel, FieldDescription } from "../ui/field";
import { useFetchRepo } from "@/hooks/useGithub";
import { useDebounce } from "@/hooks/useDebounce";
import { StepContentProps } from "@/types";

const Step1Content: React.FC<StepContentProps> = ({
  appState,
  setAppState,
}) => {
  const debouncedRepoUrl = useDebounce(appState.repoUrl, 300);
  const debouncedBranchName = useDebounce(appState.reporBranch, 300);

  const { isLoading, isError } = useFetchRepo(
    debouncedRepoUrl,
    debouncedBranchName,
    setAppState
  );

  const files = appState.repoFiles || [];

  return (
    <div className="h-full flex flex-col mt-4">
      <div className="flex flex-col gap-4">
        <Field>
          <FieldLabel htmlFor="repo-url">Repository URL</FieldLabel>
          <Input
            id="repo-url"
            placeholder="username/repository"
            required
            value={appState.repoUrl}
            onChange={(e) =>
              setAppState((prev) => ({ ...prev, repoUrl: e.target.value }))
            }
          />
          <FieldDescription>
            Enter the GitHub repository URL you want to create a README for.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="branch-name">Branch Name</FieldLabel>
          <Input
            id="branch-name"
            required
            value={appState.reporBranch}
            onChange={(e) =>
              setAppState((prev) => ({ ...prev, reporBranch: e.target.value }))
            }
          />
          <FieldDescription>
            Specify the branch name of the repository.
          </FieldDescription>
        </Field>
        {isLoading ? (
          <LoaderCircle className="animate-spin mx-auto" />
        ) : files.length > 0 ? (
          <div>
            {files.map(({ file }) => (
              <div key={file}>
                <h3 className="text-green-500">
                  <CheckIcon className="inline-block mr-2" />
                  Found : {file}
                </h3>
              </div>
            ))}
          </div>
        ) : isError || (debouncedRepoUrl && files.length === 0) ? (
          <h3 className="text-red-500">
            <X className="inline-block mr-2" />
            Repository or branch does not exist.
          </h3>
        ) : null}
      </div>
      <Button
        disabled={isLoading || files.length === 0}
        className="mt-auto mx-auto w-1/2"
        onClick={() => setAppState((prev) => ({ ...prev, currentStep: 2 }))}
      >
        Next
        <ArrowRight className="ml-2" />
      </Button>
    </div>
  );
};

export { Step1Content };
