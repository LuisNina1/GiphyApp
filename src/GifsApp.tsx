import { useState } from "react"
import { GifList } from "./gifs/components/GifList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { CustomHeader } from "./shared/componets/CustomHeader"
import { SearchBar } from "./shared/componets/SearchBar"
import { getGifsByQuery } from "./gifs/actions/get-gifs.actions"
import type { Gif } from "./gifs/interface/gif.interface"

export const GifsApp = () => {
  const [gifs, setGifs] = useState<Gif[]>([])
  const [previousTerms, setPreviousTerms] = useState(["goku"])
  const handleTermClicked = (term: string) => {
    console.log({term})
  }
  const handleSearch = async (query: string) => {
    query = query.trim().toLocaleLowerCase();

    if(query.length === 0) return;

    if(previousTerms.includes(query)) return;
    setPreviousTerms([query, ...previousTerms].splice(0,8))
    const gifs =  await getGifsByQuery(query);
    setGifs(gifs)
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

    <GifList gifs={gifs}></GifList>

   
    </>
  )
}

