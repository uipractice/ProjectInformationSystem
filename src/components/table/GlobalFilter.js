import React, { useEffect, useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import { exp3 } from '../constants/regex';

function GlobalFilter({ setFilter,removeSearchValue }) {
  useEffect(()=>{
    if(removeSearchValue ==='empty'){
      setSearchText('');
      onChange('');
    }
  },[removeSearchValue])
  const [searchText, setSearchText] = useState('');
  const onChange = useAsyncDebounce((value) => {
    setFilter(value);
  }, 1000);
  return (
    <form>
      <input
        onChange={(e) => {
          const value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
          if(value.match(exp3)){
          setSearchText(value);
          onChange(value);
          }else{
            setSearchText('');
          onChange(value);
          }
        }}
        type='search'
        placeholder='Search'
        className={searchText ? 'searchClose' : ''}
        value={searchText}
      />
      <button
        type='reset'
        className='close-icon'
        onClick={() => {
          setSearchText('');
          onChange('');
        }}
      ></button>
    </form>
  );
}

export default GlobalFilter;
