export const BASE_URL = "https://www.reddit.com";
export const getPosts = async (subreddit) => {
  const response = await fetch(`${BASE_URL}${subreddit}.json`);
  const json = await response.json();
  return json.data.children;
};
