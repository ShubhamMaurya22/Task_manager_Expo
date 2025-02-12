import { combineReducers } from "@reduxjs/toolkit";
import taskReducer from './reducers/taskSlice'
export const rootReducers = combineReducers({
    tasks : taskReducer
})