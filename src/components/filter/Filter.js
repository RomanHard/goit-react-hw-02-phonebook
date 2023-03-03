import React from 'react';

function Filter({ filter = '', onFilterChange }) {
  return (
    <input
      className="input_filter"
      type="text"
      name="filter"
      value={filter}
      onChange={(e) => onFilterChange(e.target.value)}
    />
  );
}

export default Filter;
