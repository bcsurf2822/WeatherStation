import { combineReducers } from "@reduxjs/toolkit";
import weatherReducer  from "./slices/weatherSlice";

const rootReducer = combineReducers({
  weather: weatherReducer,
});

export default rootReducer