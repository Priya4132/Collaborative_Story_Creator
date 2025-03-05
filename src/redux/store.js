import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux"
import { authReducer } from "./reducers/authReducer"
import { thunk } from "redux-thunk"

import Story from "@/component/Story";
import { storyReducer } from "./reducers/storyReducer";


const rootReducer=combineReducers({
    auth:authReducer,
stories:storyReducer    
})
export const store=createStore(rootReducer, applyMiddleware(thunk));