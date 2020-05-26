import React from 'react';

const Search = ({ searchInput, searchParam }) => {
  return (
    <div>
      <h4>Search contact:<input onChange={searchInput} value={searchParam}/></h4>
    </div>
  )
}

export default Search;