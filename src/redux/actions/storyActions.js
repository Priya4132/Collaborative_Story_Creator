import axios from "axios";

export const FETCH_STORIES_SUCCESS = "FETCH_STORIES_SUCCESS";
export const CREATE_STORY_SUCCESS = "CREATE_STORY_SUCCESS";
export const ADD_CONTRIBUTION_SUCCESS = "ADD_CONTRIBUTION_SUCCESS";

const FIREBASE_URL = "https://collaborative-story-crea-56728-default-rtdb.firebaseio.com/stories";

// Fetch stories from Firebase Realtime Database
export const fetchStories = () => async (dispatch) => {
  try {
    const response = await axios.get(`${FIREBASE_URL}.json`);
    const data = response.data;
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
      completed: false,
    };

    const response = await axios.post(`${FIREBASE_URL}.json`, newStory);
    dispatch({ type: CREATE_STORY_SUCCESS, payload: { id: response.data.name, ...newStory } });
  } catch (error) {
    console.error("Error creating story:", error);
  }
};

// Add a contribution to an existing story
export const addContribution = (storyId, sentence, userId, userName) => async (dispatch, getState) => {
  try {
    const state = getState();
    const story = state.stories.stories.find((s) => s.id === storyId);

    if (!story) {
      alert("Story not found.");
      return;
    }

    if (story.contributions.length >= 10) {
      alert("This story has reached its contribution limit.");
      return;
    }

    if (sentence.trim().split(" ").length > 20) {
      alert("Each contribution must be 20 words or less.");
      return;
    }

    const newContribution = { author: userId, authorName: userName, text: sentence };
    const updatedContributions = [...story.contributions, newContribution];

    // Update story in Firebase
    await axios.patch(`${FIREBASE_URL}/${storyId}.json`, { contributions: updatedContributions });

    dispatch({
      type: ADD_CONTRIBUTION_SUCCESS,
      payload: { storyId, contribution: newContribution },
    });

    // If the story reaches 10 contributions, mark it as completed
    if (updatedContributions.length >= 10) {
      await axios.patch(`${FIREBASE_URL}/${storyId}.json`, { completed: true });
    }
  } catch (error) {
    console.error("Error adding contribution:", error);
  }
};
