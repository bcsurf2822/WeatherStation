import classNames from "classnames";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./components.module.css"

export default function SideNav() {
  const previousCities = useSelector((state) => state.weather.city);
  const [query, setQuery] = useState(0);
  console.log("SEARCH", previousCities);

  return (
    <div className="list-group">
      {previousCities &&
        previousCities.length > 0 &&
        previousCities.map((city, index) => (
          <button
            key={index}
            type="button"
            className={classNames("list-group-item", "list-group-item-action", {
              [styles.active]: index === query, 
              [styles.additionalClass]: index === query, 
            })}
            aria-current={index === city ? "true" : undefined}
            onClick={() => setQuery(index)}
          >
            {city}
          </button>
        ))}
    </div>
  );
}