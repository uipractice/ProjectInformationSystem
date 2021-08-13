import React from 'react';
import { useAsyncDebounce } from 'react-table';

function GlobalFilter({ setFilter }) {
  const onChange = useAsyncDebounce((value) => {
    setFilter(value);
  }, 1000);
  return (
    <span>
      <input
        onChange={(e) => {
          onChange(e.target.value);
        }}
        type='search'
        placeholder='Search'
        className={value ? 'searchClose' : ''}
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
