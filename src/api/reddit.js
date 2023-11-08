export const BASE_URL = "https://www.reddit.com";

export const getSubreddit = async (subreddit) => {
  try {
    const response = await fetch(`${BASE_URL}${subreddit}.json`);
    const json = await response.json();
    return json.data.children;
  } catch (err) {
    console.warn(err);
  }
};

export const getSearchContent = async (searchTerm, type = "link") => {
  try {
    const response = await fetch(
      `${BASE_URL}/search.json?q=${searchTerm}&type=${type}`
    );
    const json = await response.json();
    return json.data.children;
  } catch (err) {
    console.warn(err);
  }
};

export const getPostComments = async (permalink) => {
  try {
    const response = await fetch(`${BASE_URL}${permalink}.json`);
    const json = await response.json();
    return json[1].data.children.map((subreddit) => subreddit.data);
  } catch (err) {
    console.warn(err);
  }
};
