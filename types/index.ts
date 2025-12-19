export interface RepoFile {
  file: string;
  content: string | null;
}

export interface Section {
  title: string;
  description: string;
}

export interface Question {
  question: string;
  answer: string | null;
}

export interface AppState {
  currentStep: 1 | 2 | 3 | 4;
  repoUrl: string;
  reporBranch: string;
  repoFiles: RepoFile[] | null;
  selectedSections: Section[];
  questions: Question[];
  finalMarkdown: string | null;
}

export interface StepContentProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}
