import { useState, useEffect } from "react";
import { IconSunHigh, IconTemperaturePlus } from "@tabler/icons-react";


import ReactGoogleAutocomplete from "react-google-autocomplete";
const googleMapAPI = process.env.NEXT_PUBLIC_GOOGLE_MAP;

export default function SearchBar() {


  const handlePlaceSelected = (place) => {
    console.log(place);
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
          apiKey={googleMapAPI}
          onPlaceSelected={handlePlaceSelected}
        />
        ;
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
