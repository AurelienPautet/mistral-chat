import { useQuery } from "@tanstack/react-query";
import { AppState, RepoFile } from "@/types";
import { useEffect } from "react";

interface FetchRepoResponse {
  files: RepoFile[];
  error?: string;
}

export function useFetchRepo(
  repoUrl: string,
  branchName: string,
  setAppState: React.Dispatch<React.SetStateAction<AppState>>
) {
  const query = useQuery<FetchRepoResponse>({
    queryKey: ["repo", repoUrl, branchName],
    queryFn: async () => {
      if (!repoUrl) return { files: [] };

      const response = await fetch("/api/github/fetch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ repoUrl, branchName }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch repository contents");
      }

      return response.json();
    },
    enabled: !!repoUrl,
  });

  useEffect(() => {
    if (!repoUrl || query.isError) {
      setAppState((prevState) => {
        if (prevState.repoFiles === null) return prevState;
        return { ...prevState, repoFiles: null };
      });
      return;
    }

    if (query.data && !query.data.error) {
      setAppState((prevState) => {
        if (prevState.repoFiles === query.data.files) return prevState;
        return {
          ...prevState,
          repoFiles: query.data.files || null,
        };
      });
    }
  }, [query.data, query.isError, repoUrl, setAppState]);

  return query;
}
