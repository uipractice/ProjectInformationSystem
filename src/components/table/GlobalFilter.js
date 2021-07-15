import React, { useState, useEffect, useRef } from 'react'
import { useAsyncDebounce } from 'react-table'
import searchIcon from "../../assets/images/search.svg";

function GlobalFilter({ filter, setFilter }){

  const inputRef = useRef(null)
  useEffect(()=>{
    inputRef.current.focus()
  }, [])

  const [value, setValue] = useState(filter)
  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined)
  }, 1000)
  return (
    <span>
      {value ? (
      <input
        ref={inputRef}
          value={value || ""}
          onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        type="search"  
        placeholder="Search"
      />
      ):(
    <input
        ref={inputRef}
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        type="search"  
        placeholder="Search"
      />
      )
    }
      
    </span>
  );
}

export default GlobalFilter