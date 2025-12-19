import { NextResponse } from "next/server";
import { generateQuestions } from "@/lib/mistralSercice";
export async function POST(request: Request) {
  try {
    const { repoFiles, selectedSections } = await request.json();

    if (!repoFiles || !Array.isArray(repoFiles)) {
      return NextResponse.json(
        { error: "Invalid or missing 'repoFiles' parameter." },
        { status: 400 }
      );
    }

    if (
      !selectedSections ||
      !Array.isArray(selectedSections) ||
      selectedSections.length === 0
    ) {
      return NextResponse.json(
        { error: "Invalid or missing 'selectedSections' parameter." },
        { status: 400 }
      );
    }

    const questions = await generateQuestions(repoFiles, selectedSections);
    return NextResponse.json(questions);
  } catch (error: unknown) {
    console.error("Error generating questions:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
