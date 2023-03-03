import React from 'react';

import ReactPropTypes from 'prop-types';

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

Filter.propTypes = {
  filter: ReactPropTypes.string,
  onFilterChange: ReactPropTypes.func.isRequired,
};
