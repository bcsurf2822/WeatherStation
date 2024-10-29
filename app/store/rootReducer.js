import { combineReducers } from "@reduxjs/toolkit";
import weatherReducer from "./slices/weather"

const rootReducer = combineReducers({
  weather: weatherReducer,
});

export default rootReducer