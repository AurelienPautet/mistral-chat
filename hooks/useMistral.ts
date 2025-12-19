import { useQuery } from "@tanstack/react-query";
import { AppState } from "@/types";
import { useEffect } from "react";

export function useGenerateQuestions(
  appState: AppState,
  setAppState: React.Dispatch<React.SetStateAction<AppState>>
) {
  const query = useQuery({
    queryKey: ["questions", appState.repoFiles, appState.selectedSections],
    queryFn: async () => {
      const response = await fetch("/api/mistral/generate/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repoFiles: appState.repoFiles,
          selectedSections: appState.selectedSections,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate questions");
      }

      return response.json();
    },
  });

  useEffect(() => {
    if (query.data) {
      console.log("Generated Questions:", query.data);
      setAppState((prevState) => {
        return {
          ...prevState,
          questions: query.data || [],
        };
      });
    }
  }, [query.data, query.isError, appState.repoFiles, setAppState]);
  return query;
}

export function useGenerateReadme(
  appState: AppState,
  setAppState: React.Dispatch<React.SetStateAction<AppState>>
) {
  const query = useQuery({
    queryKey: [
      "readme",
      appState.repoFiles,
      appState.selectedSections,
      appState.questions,
    ],
    queryFn: async () => {
      const response = await fetch("/api/mistral/generate/readme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repoFiles: appState.repoFiles,
          selectedSections: appState.selectedSections,
          questions: appState.questions,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate readme");
      }

      return response.json();
    },
  });

  useEffect(() => {
    if (query.data) {
      console.log("Generated Markdown:", query.data);
      setAppState((prevState) => {
        if (prevState.finalMarkdown === query.data) return prevState;
        return {
          ...prevState,
          finalMarkdown: query.data || null,
        };
      });
    }
  }, [query.data, query.isError, appState.repoFiles, setAppState]);
  return query;
}
