import { useState } from "react";
import type { Music } from "../types";
import { Link, useLoaderData } from "react-router-dom";

// this is to call in the API from the browser
export const musicListLoader = async () => {
    const response = await fetch("https://69783c095b9c0aed1e885c68.mockapi.io/api/v1/Music")
    if (!response.ok) {   //this if statement is to handle an error with the API
        //this component handles what will show in an error if the API doesn't send statusText
        const message = response.statusText || "Sorry something happened"
        throw new Error(message)    //shows the error
    }
    const data = await response.json() //sets json to data
    return data                        //calls on the json data
}

export default function Music() {
    const music = useLoaderData() as Music[] //this is the loader in main.tsx to load datafrom the api in the Mussic array in types.ts
    const [addingToCart, setAddingToCart] = useState(false) //useState to put cart info into state
    const [error, setError] = useState<null | string>(null) //useState to handle errors

    const addToCart = async (song: Music) => {
        const newCartItem = {
            song: song,
            amount: 1
        }
        // make the change on the backend
        setAddingToCart(true) // track data status
        try { // added to handle error
            const response = await fetch("https://69783c095b9c0aed1e885c68.mockapi.io/api/v1/cart", {
                method: "POST",
                body: JSON.stringify(newCartItem),
                headers: {
                    "Content-Type": "application/json"
                }, // everything from const is to update state fetch data
            })
            if (!response.ok) {               // added to handle error
                setError(response.statusText)
            }
        } catch (error: any) { // added to handle error
            setError(error.message)
        }
        setAddingToCart(false) // track data status
    }



    return ( //song card to show data on client end that calls from musicListLoader
        <>
            <h2 className="music-title display-5 mb-4">What would you like to hear?</h2>
            <div className="d-flex flex-wrap gap-3">
                {error && <p className="text-danger"> {error}</p>} {/*short circuting for errors */}
                {music?.map(song => (
                    <div className="card flex-grow-1" key={song.id}>
                        <div className="card-body">
                            <h3 className="card-title">{song.song}</h3>
                            <p className="card-text">{song.artist}</p>
                            <button
                                className="btn btn-success"
                                disabled={addingToCart}
                                onClick={() => addToCart(song)}
                            >
                                Add To Cart
                            </button>
                            <p><Link to={"/song/" + song.id}>Info</Link></p> {/*link on Music page to connect to SongInfo */}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )

}
