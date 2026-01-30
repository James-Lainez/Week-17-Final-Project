import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { Music } from "../types"

export default function SongInfo() {
    const { songId } = useParams() //routes parameter to main.tsx
    const [songInfo, setSongInfo] = useState<null | Music>(null) //sets song info into state

    useEffect(() => { // fetches data following the path from the parameter
        const fetchSong = async () => {
            const response = await fetch("https://69783c095b9c0aed1e885c68.mockapi.io/api/v1/Music/" + songId)
            const data = await response.json()
            setSongInfo(data)
        }
        fetchSong()
    }, [songId])

    if(!songInfo) { //handels is song info isn't loading
        return(<div>Loading...</div>)
    }
    
return (// display on client end data from useState
    <div>
        <p className="songInfo-title">Song Title: {songInfo.song}</p>
        <p className="songInfo">Artist: {songInfo.artist}</p>
        <p className="songInfo">Genre: {songInfo.genre}</p>
    </div>
  )
}
