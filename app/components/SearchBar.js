import { IconSunHigh, IconTemperaturePlus } from "@tabler/icons-react";
import AutoComplete from "./Autocomplete";

export default function SearchBar() {
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
        <AutoComplete />
      </div>
    </div>
  );
}
