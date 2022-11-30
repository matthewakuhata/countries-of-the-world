import React from "react";

import "./styles.css";

interface SearchBarProps {
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onChange }) => {
  return (
    <div className="search-bar">
      <span className="icon">
        <i className="fas fa-magnifying-glass" />
      </span>
      <input onChange={onChange} placeholder="Search for country..." />
    </div>
  );
};

export default SearchBar;
