export interface RepoFile {
  file: string;
  content: string | null;
}

export interface Section {
  title: string;
  description: string;
}

export interface AppState {
  currentStep: 1 | 2 | 3;
  repoUrl: string;
  reporBranch: string;
  repoFiles: RepoFile[] | null;
  selectedSections: Section[];
  finalMarkdown: string | null;
}

export interface StepContentProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}
