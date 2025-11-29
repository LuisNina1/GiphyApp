import { useState } from "react"
import { GifList } from "./gifs/components/GifList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { mockGifs } from "./mock-data/gifs.mock"
import { CustomHeader } from "./shared/componets/CustomHeader"
import { SearchBar } from "./shared/componets/SearchBar"

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState(["goku"])
  const handleTermClicked = (term: string) => {
    console.log({term})
  }
  const handleSearch = (query: string) => {
    query = query.trim().toLocaleLowerCase();

    if(query.length === 0) return;

    if(previousTerms.includes(query)) return;
    setPreviousTerms([query, ...previousTerms].splice(0,8))

  }

  return (
    <>

    <CustomHeader title="Buscador de gifs" description="Los mejores gifs"></CustomHeader>

    <SearchBar
     placeHolder="Buscar gif"
     onQuery={handleSearch}
    ></SearchBar>

    <PreviousSearches 
    searches={previousTerms} 
    onLabelClicked={handleTermClicked}
    ></PreviousSearches>

    <GifList gifs={mockGifs}></GifList>

   
    </>
  )
}

