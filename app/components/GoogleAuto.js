import React, { useState } from "react";
import axios from "axios";
import styles from "./components.module.css";
import {
  fetchWeatherData,
  setCity,
  setLocation,
  setState,
} from "../store/slices/weatherSlice";
import { useDispatch } from "react-redux";

export default function CustomAutoComplete() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.length > 2) {
      try {
        const response = await axios.get(`/api/google`, {
          params: { input: value },
        });
        setSuggestions(response.data);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(`${suggestion.city}, ${suggestion.state}`);
    setSuggestions([]);
    setInputValue("");
    const { lat, lon, city, state } = suggestion;
    dispatch(setCity(city));
    dispatch(setState(state));
    dispatch(setLocation({city: city, state: state}))
    dispatch(fetchWeatherData({ lat, lon }));
  };

  return (
    <div className={styles.autocomplete}>
      <input
        type="text"
        placeholder="City.."
        value={inputValue}
        onChange={handleInputChange}
        className={styles.input}
      />
      {suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={styles.suggestionItem}
            >
              {suggestion.city}, {suggestion.state}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
