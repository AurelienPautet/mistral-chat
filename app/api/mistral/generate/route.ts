import { NextResponse } from "next/server";
import { generateReadme } from "@/lib/mistralSercice";
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

    const markdown = await generateReadme(repoFiles, selectedSections);
    return NextResponse.json(markdown);
  } catch (error: unknown) {
    console.error("Error generating README markdown:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
