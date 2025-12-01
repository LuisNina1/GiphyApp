import { useRef, useState } from "react"
import { getGifsByQuery } from "../actions/get-gifs.actions"
import type { Gif } from "../interface/gif.interface"

//const gifsCache: Record<string, Gif[]> = {}

export const useGifs = () => {

    const [gifs, setGifs] = useState<Gif[]>([])
    const gifsCache = useRef<Record<string, Gif[]>>({})

    const [previousTerms, setPreviousTerms] = useState(["goku"])
    const handleTermClicked = async (term: string) => {
        if (gifsCache.current[term]) {
            setGifs(gifsCache.current[term])
            return;
        }
        const gifs = await getGifsByQuery(term);
        gifsCache.current[term] = gifs
        setGifs(gifs)
    }
    const handleSearch = async (query: string) => {
        query = query.trim().toLocaleLowerCase();

        if (query.length === 0) return;

        if (previousTerms.includes(query)) {
            setGifs(gifsCache.current[query])
            return;
        }


        setPreviousTerms([query, ...previousTerms].slice(0, 8))
        const gifs = await getGifsByQuery(query);
        setGifs(gifs)
        gifsCache.current[query] = gifs;
        console.log(gifsCache)
    }

    return { gifs, handleSearch, handleTermClicked, previousTerms }
}