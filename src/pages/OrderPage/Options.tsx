import React, { useEffect, useState } from "react";
import { Option } from "../../mocks/data/type";

function Options() {
  const [options, setOptions] = useState<Option[]>();

  useEffect(() => {
    fetch("http://localhost:5000/options")
      .then((data) => data.json())
      .then((options) => setOptions(options));
  });
  return (
    <div>
      <h2>Options</h2>

      {options &&
        options.map((opt) => (
          <li key={opt.name}>
            <label htmlFor={opt.name}>{opt.name}</label>
            <input id={opt.name} type='checkbox' />
          </li>
        ))}
    </div>
  );
}

export default Options;
