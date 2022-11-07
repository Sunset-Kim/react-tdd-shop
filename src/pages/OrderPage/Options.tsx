import { OptionState } from "../../contexts/ProductsProvider";
import { calcOptionPrice } from "../../util/calculate_price";

interface OptionsProps {
  options: OptionState[];
  onUpdate: (id: number, checked: boolean) => void;
}

function Options({ options, onUpdate }: OptionsProps) {
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
              checked={opt.checked}
              onChange={(e) => onUpdate(opt.id, e.target.checked)}
            />
          </li>
        ))}
    </div>
  );
}

export default Options;
