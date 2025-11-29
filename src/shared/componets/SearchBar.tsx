import React, { useEffect, useState } from "react"

interface Props{
    placeHolder?: string
    onQuery: (query: string) => void
}
export const SearchBar = ({placeHolder = 'buscar', onQuery}: Props) => {

  const [query, setQuery] = useState('')

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      onQuery(query);
    }, 700);
    return () => {
      clearTimeout(timeoutID)
    }
  }, [query, onQuery])
  
  const handleSearch = () => {
    onQuery(query)
    setQuery('')
  }  

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter'){
      handleSearch();
    }
  }

  return (
    <>
    <div className="search-container">
        <input 
        type="text"
         placeholder={placeHolder}
         value={query}
         onChange={(event) => setQuery(event.target.value)}
         onKeyDown={handleKeyDown}
        />
        <button
        onClick={handleSearch}
        >Buscar</button>
    </div>
    </>
  )
}
