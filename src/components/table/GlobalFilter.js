import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

function GlobalFilter({ setFilter }) {
  const [searchText, setSearchText] = useState();
  const onChange = useAsyncDebounce((value) => {
    setFilter(value);
  }, 1000);
  return (
    <span>
      <input
        onChange={(e) => {
          setSearchText(e.target.value);
          onChange(e.target.value);
        }}
        type='search'
        placeholder='Search'
        className={searchText ? 'searchClose' : ''}
      />
      <button
        type='reset'
        className='close-icon'
        onClick={() => onChange('')}
      ></button>
    </span>
  );
}

export default GlobalFilter;
