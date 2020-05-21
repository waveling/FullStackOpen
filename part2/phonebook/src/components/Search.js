import React from 'react';

const Search = (props) => {

  const searchInput = (event) => {
    props.setSearchParam(event.target.value)
  }

  return (
    <div>
      <h4>Search contact:<input onChange={searchInput} value={props.searchParam}/></h4>
    </div>
  )
}

export default Search;