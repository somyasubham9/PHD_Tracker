import React from 'react';

function SearchBar() {
  return (
    <input
      placeholder="Search the database..."
      type="text"
      name="text"
      className="w-3/5 h-11 p-3 rounded-lg border border-lightgrey outline-none transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] shadow-md hover:border-2 hover:border-lightgrey hover:shadow-lg active:scale-95 focus:border-2 focus:border-grey"
    />
  );
}

export default SearchBar;
