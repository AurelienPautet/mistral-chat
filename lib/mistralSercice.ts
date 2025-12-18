import { Mistral } from "@mistralai/mistralai";
import { RepoFile, Section } from "@/types";
const apiKey = process.env.MISTRAL_API_KEY || "your_api_key";

const client = new Mistral({ apiKey: apiKey });

async function generateReadme(
  repoFiles: RepoFile[],
  selectedSections: Section[]
): Promise<string> {
  const systemPrompt = `You are an expert software documentation generator. Your task is to create a comprehensive and well-structured README.md file for a software project based on the provided files and selected sections.`;
  const filesList = repoFiles
    .map((file) => `File: ${file.file}\nContent:\n${file.content}\n`)
    .join("\n");

  const sectionsList = selectedSections
    .map((section) => `# ${section.title}\n\n${section.description}\n`)
    .join("\n");

  const userPrompt =
    `Here are the project files:\n\n` +
    filesList +
    `\n\nPlease generate a README.md that includes the following sections:\n\n` +
    sectionsList +
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

export { generateReadme };
