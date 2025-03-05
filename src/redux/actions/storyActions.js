
  


export const FETCH_STORIES_SUCCESS = "FETCH_STORIES_SUCCESS";
export const CREATE_STORY_SUCCESS = "CREATE_STORY_SUCCESS";
export const ADD_CONTRIBUTION_SUCCESS = "ADD_CONTRIBUTION_SUCCESS";

const FIREBASE_URL = "https://collaborative-story-crea-56728-default-rtdb.firebaseio.com/stories.json"; // Replace with your actual Firebase URL

// Fetch stories from Firebase Realtime Database
export const fetchStories = () => async (dispatch) => {
  try {
    const response = await fetch(FIREBASE_URL);
    if (!response.ok) throw new Error("Failed to fetch stories");

    const data = await response.json();
    const stories = data
      ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
      : [];

    dispatch({ type: FETCH_STORIES_SUCCESS, payload: stories });
  } catch (error) {
    console.error("Error fetching stories:", error);
  }
};

// Create a new story
export const createStory = (title, initialSentence, userId, userName) => async (dispatch) => {
  try {
    const newStory = {
      title,
      contributions: [{ author: userId, authorName: userName, text: initialSentence }],
      completed:false,
    };

    const response = await fetch(FIREBASE_URL.replace(".json", "") + ".json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStory),
    });

    if (!response.ok) throw new Error("Failed to create story");

    const result = await response.json();
    dispatch({ type: CREATE_STORY_SUCCESS, payload: { id: result.name, ...newStory } });
  } catch (error) {
    console.error("Error creating story:", error);
  }
};

// Add a contribution to an existing story
export const addContribution = (storyId, sentence, userId, userName) => async (dispatch, getState) => {
  try {
    const state = getState();
    const story = state.stories.list.find((s) => s.id === storyId);

    if (!story || story.contributions.length >= 10) {
      alert("This story has reached its contribution limit.");
      return;
    }
    if (sentence.trim().split(" ").length > 20) {
      alert("Each contribution must be 20 words or less.");
      return;
    }

    const storyRef = `${FIREBASE_URL.replace(".json", "")}/${storyId}/contributions.json`;

    const newContribution = { author: userId, authorName: userName, text: sentence };

    const response = await fetch(storyRef, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContribution),
    });

    if (!response.ok) throw new Error("Failed to add contribution");

    dispatch({
      type: ADD_CONTRIBUTION_SUCCESS,
      payload: { storyId, contribution: newContribution },
    });

    // If the story reaches 10 contributions, mark it as completed
    if (story.contributions.length + 1 >= 10) {
      await fetch(`${FIREBASE_URL.replace(".json", "")}/${storyId}.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
      });
    }
  } catch (error) {
    console.error("Error adding contribution:", error);
  }
};