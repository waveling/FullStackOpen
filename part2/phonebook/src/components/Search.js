import React from 'react';

const Search = ({ handleSearch, searchParam }) => {
  return (
    <div>
      <h4>Search contact:<input onChange={handleSearch} value={searchParam}/></h4>
    </div>
  )
}

export default Search;