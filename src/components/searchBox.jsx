import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      onChange={e => onChange(e.currentTarget.value)}
      className="form-control my-3"
      placeholder="Search..."
      name="query"
      type="text"
      value={value}
    />
  );
};

export default SearchBox;
