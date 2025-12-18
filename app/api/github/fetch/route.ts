import { NextResponse } from "next/server";
import { fetchGitHubRepoContents } from "@/lib/githubService";

export async function POST(request: Request) {
  try {
    const { repoUrl, branchName } = await request.json();

    if (!repoUrl || typeof repoUrl !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing 'repoUrl' parameter." },
        { status: 400 }
      );
    }

    const repoContents = await fetchGitHubRepoContents(
      repoUrl,
      branchName || "main"
    );
    return NextResponse.json(repoContents);
  } catch (error: unknown) {
    console.error("Error fetching GitHub repository contents:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
