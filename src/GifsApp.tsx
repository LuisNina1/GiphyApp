import { GifList } from "./gifs/components/GifList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { CustomHeader } from "./shared/componets/CustomHeader"
import { SearchBar } from "./shared/componets/SearchBar"
import { useGifs } from "./gifs/hooks/useGifs"

export const GifsApp = () => {
  const {handleSearch, previousTerms, handleTermClicked, gifs} = useGifs()

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

