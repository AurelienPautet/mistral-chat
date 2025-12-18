async function fetchGitHubRepoContents(repo: string, branch: string) {
  const slug = repo.replace("https://github.com/", "").replace(/\/$/, "");
  const baseUrl = `https://raw.githubusercontent.com/${slug}/${branch}`;

  const filesToCheck = ["package.json", "README.md", "requirements.txt"];

  const responses = await Promise.all(
    filesToCheck.map((file) => fetch(`${baseUrl}/${file}`))
  );

  const responsesData = await Promise.all(
    responses.map(async (response, index) => {
      if (response.ok) {
        const content = await response.text();
        return { file: filesToCheck[index], content };
      }
      return false;
    })
  );

  return {
    files: responsesData.filter((data) => data !== false),
  };
}

export { fetchGitHubRepoContents };
