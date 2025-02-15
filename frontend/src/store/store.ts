import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

export const store = configureStore({
  reducer: combineReducers({
    
  }),

});

export const wrapper = createWrapper(() => store);
