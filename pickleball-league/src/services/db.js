
import { Octokit } from "@octokit/rest";

// Configuration constants
const REPO_OWNER = "your-github-username";
const REPO_NAME = "pickleball-league";
const DATA_PATH = "data/season_2025.json";

// Helper to get the authenticated client
const getClient = () => {
  const token = localStorage.getItem("gh_token");
  if (!token) throw new Error("Authentication required");
  return new Octokit({ auth: token });
};

/**
 * Fetches the current season data from the repository.
 * Returns both the JSON content and the SHA hash (required for updates).
 */
export const getLeagueData = async () => {
  const client = getClient();
  try {
    const response = await client.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: DATA_PATH,
    });
    
    // GitHub API returns content in Base64
    const content = atob(response.data.content);
    return {
      data: JSON.parse(content),
      sha: response.data.sha 
    };
  } catch (error) {
    console.error("Failed to fetch data", error);
    throw error;
  }
};

/**
 * Overwrites the season data file with new content.
 * Requires the 'sha' of the file being replaced to ensure concurrency safety.
 */
export const saveLeagueData = async (newData, currentSha) => {
  const client = getClient();
  const content = btoa(JSON.stringify(newData, null, 2)); // Encode back to Base64
  
  await client.repos.createOrUpdateFileContents({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    path: DATA_PATH,
    message: `Update scores: ${new Date().toISOString()}`,
    content: content,
    sha: currentSha,
  });
};
