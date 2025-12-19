import { Mistral } from "@mistralai/mistralai";
import { RepoFile, Section, Question } from "@/types";
const apiKey = process.env.MISTRAL_API_KEY;
if (!apiKey) {
  throw new Error(
    "MISTRAL_API_KEY is not defined in environment variables, the app cannot run without it."
  );
}
const client = new Mistral({ apiKey: apiKey });

async function generateQuestions(
  repoFiles: RepoFile[],
  selectedSections: Section[]
): Promise<Question[]> {
  const nbQuestions = 5;
  const systemPrompt = `You are an expert software documentation generator. You are tasked to generate short and concise questions that would help you improve (or write) the README.md file. Please generate ${nbQuestions}, return an array of questions only. questions objects looks like { question: string, answer: null } . Respond only with the array of questions in JSON format. Do not provide any additional text or explanations.`;
  const filesList = repoFiles
    .map((file) => `File: ${file.file}\nContent:\n${file.content}\n`)
    .join("\n");
  const sectionsList = selectedSections
    .map((section) => `# ${section.title}\n\n${section.description}\n`)
    .join("\n");

  const userPrompt =
    `Here are the project files:\n\n` +
    filesList +
    `\n\nPlease generate a list of ${nbQuestions} insightful questions that would help in creating a comprehensive README.md. Focus on questions that address key aspects of the project, its functionality, usage, and any unique features.\n\n` +
    sectionsList +
    `\n\nRespond only with the questions, numbered from 1 to ${nbQuestions}. Do not provide any additional text or explanations.`;

  const response = await client.chat.complete({
    model: "mistral-medium-latest",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    responseFormat: { type: "json_object" },
  });
  const content = response.choices[0].message.content;
  if (typeof content === "string") {
    try {
      const questionsArray = JSON.parse(content);
      if (Array.isArray(questionsArray)) {
        return questionsArray;
      } else {
        throw new Error("Parsed content is not an array");
      }
    } catch (error) {
      console.error("Error parsing questions JSON:", error);
      return [];
    }
  }
  return [];
}

async function generateReadme(
  repoFiles: RepoFile[],
  selectedSections: Section[],
  questions: Question[]
): Promise<string> {
  const systemPrompt = `You are an expert software documentation generator. Your task is to create a comprehensive and well-structured README.md file for a software project based on the provided files and selected sections.`;
  const filesList = repoFiles
    .map((file) => `File: ${file.file}\nContent:\n${file.content}\n`)
    .join("\n");

  const sectionsList = selectedSections
    .map((section) => `# ${section.title}\n\n${section.description}\n`)
    .join("\n");

  const questionsList = questions
    .map(
      (q) =>
        `Q: ${q.question}\nA: ${q.answer ? q.answer : "No answer provided."}\n`
    )
    .join("\n");

  const userPrompt =
    `Here are the project files:\n\n` +
    filesList +
    `\n\nPlease generate a README.md that includes the following sections:\n\n` +
    sectionsList +
    `\n\nAdditionally, please use the following answers to the questions:\n\n` +
    questionsList +
    `\n\nEnsure the README is clear, concise, and formatted in valid Markdown.` +
    "\n Do not include any sections that were not requested, and do not invent any information not present in the files." +
    "\nRespond only with the complete Markdown content of the README.md file. Do not add ``` at the beginning or end.";
  const response = await client.chat.complete({
    model: "mistral-medium-latest",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  const content = response.choices[0].message.content;
  return typeof content === "string" ? content : "";
}

export { generateReadme, generateQuestions };
