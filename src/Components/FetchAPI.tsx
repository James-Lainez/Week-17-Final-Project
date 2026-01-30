import { useEffect, useState } from "react";
import type { Music } from "../types";

export default function FetchAPI() {
    const [music, setMusic] = useState<null | Music>(null)


    useEffect(() => {
        const fetchMusic = async () => {
            const response = await fetch("https://69783c095b9c0aed1e885c68.mockapi.io/api/v1/Music")
            const data = await response.json()
            setMusic(data)
        }
        fetchMusic()
    })

    if(!music) {
        return( <div>Loading...</div> )
    }
}