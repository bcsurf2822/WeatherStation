import { useState, useEffect } from "react";
import { IconSunHigh, IconTemperaturePlus } from "@tabler/icons-react";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import styles from "./components.module.css";
import { useDispatch } from "react-redux";
import { fetchWeatherData } from "../store/slices/weatherSlice";

export default function SearchBar() {
  const dispatch = useDispatch();
  const googleMapAPI = process.env.NEXT_PUBLIC_GOOGLE_MAP;
  const [search, setSearch] = useState("");

  const handleAutoselect = (place) => {
    const city = place?.address_components?.[0]?.short_name?.replace(
      /\s+/g,
      "-"
    );
    const state = place?.address_components?.[2]?.short_name;
    const data = city.toLowerCase() + "," + state.toLowerCase();
    dispatch(fetchWeatherData(data));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <IconSunHigh stroke={2} />
        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li>
            <h2 className=" px-2 ">Weather Station</h2>
            <IconTemperaturePlus />
          </li>
        </ul>
        <ReactGoogleAutocomplete
          className={styles.search}
          apiKey={googleMapAPI}
          onPlaceSelected={handleAutoselect}
        />

        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <input
            type="search"
            className="form-control form-control-dark text-bg-dark"
            placeholder="Search..."
            aria-label="Search"
          />
        </form>
        <div className="text-end">
          <button type="submit" className="btn btn-primary">
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
}
