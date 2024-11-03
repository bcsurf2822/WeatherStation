import classNames from "classnames";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./components.module.css";

export default function SideNav() {
  const location = useSelector((state) => state.weather.location);
  const [query, setQuery] = useState(0);

  return (
    <div className="list-group">
      {location &&
        location.length > 0 &&
        location.map((obj, index) => (
          <button
            key={index}
            type="button"
            className={classNames("list-group-item", "list-group-item-action", {
              [styles.active]: index === query,
              [styles.additionalClass]: index === query,
            })}
            aria-current={index === location ? "true" : undefined}
            onClick={() => setQuery(index)}
          >
            {obj.city}, {obj.state}
          </button>
        ))}
    </div>
  );
}
