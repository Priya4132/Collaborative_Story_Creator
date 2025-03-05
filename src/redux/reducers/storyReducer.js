
 


const initialState = { stories: [], loading: false, error: null };

export const storyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_STORIES_SUCCESS":
      return { ...state, stories: action.payload };
    case "CREATE_STORY_SUCCESS":
      return { ...state, stories: [...state.stories, action.payload] };
    case "ADD_CONTRIBUTION_SUCCESS":
      return {
        ...state,
        stories: state.stories.map((story) =>
          story.id === action.payload.id
            ? { ...story, contributions: action.payload.contributions }
            : story
        ),
      };
    default:
      return state;
  }
};














