import React from "react";

import "./styles.css";

interface FilterProps {
  options: string[];
  onSelect: (event: React.FormEvent<HTMLSelectElement>) => void;
}

const Filter: React.FC<FilterProps> = ({ options, onSelect }) => {
  return (
    <div className="filter">
      <select onChange={onSelect}>
        <option key={"Filter by Region"} value={""}>
          Filter by Region
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
