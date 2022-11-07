import React, { useEffect, useState } from "react";
import { OptionState } from "../../contexts/ProductsProvider";

interface OptionsProps {
  options: OptionState[];
  onUpdate: (id: number, checked: boolean) => void;
}

function Options({ options, onUpdate }: OptionsProps) {
  const calcOptionPrice = (options: OptionState[]) =>
    options.reduce((a: number, c: OptionState) => {
      a += c.price * (c.checked ? 1 : 0);
      return a;
    }, 0);

  return (
    <div>
      <h2>Options</h2>

      <h3>{`Options Price: ${calcOptionPrice(options) ?? 0}`}</h3>

      {options &&
        options.map((opt) => (
          <li key={opt.name}>
            <label htmlFor={opt.name}>{opt.name}</label>
            <input
              id={opt.name}
              type='checkbox'
              onChange={(e) => onUpdate(opt.id, e.target.checked)}
            />
          </li>
        ))}
    </div>
  );
}

export default Options;
