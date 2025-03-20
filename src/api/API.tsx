const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 10000) + 1; // Reduced range to avoid rate limits
    console.log('Fetching users with start:', start);
    const response = await fetch(
      `https://api.github.com/users?since=${start}&per_page=10` // Reduced results per page
    );
    
    if (!response.ok) {
      console.error('GitHub API Error:', response.status, response.statusText);
      throw new Error(`GitHub API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Users data received:', data);
    return data;
  } catch (err) {
    console.error('Error in searchGithub:', err);
    throw err;
  }
};

const searchGithubUser = async (username: string) => {
  try {
    console.log('Fetching details for user:', username);
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      console.error('GitHub API Error:', response.status, response.statusText);
      throw new Error(`GitHub API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('User details received:', data);
    return data;
  } catch (err) {
    console.error('Error in searchGithubUser:', err);
    throw err;
  }
};

export { searchGithub, searchGithubUser };
