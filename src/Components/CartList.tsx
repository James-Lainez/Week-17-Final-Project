
import { useLoaderData } from "react-router-dom"
import type { cart } from "../types"
import CartRows from "./CartRows"
import { useState } from "react"

//loader for this component page to fetch data
export const cartListLoader = async () => {
    const response = await fetch("https://69783c095b9c0aed1e885c68.mockapi.io/api/v1/cart")
    if (!response.ok) {
        const message = response.statusText || "Sorry something happened" //short circuting to handle blank error from api
        throw new Error(message)    //shows the error
    }
    const data = await response.json()
    return data
}

export default function CartList() {
    const cartItem = useLoaderData() as cart[] // loader for this page to cart array
    const [songInCart, setSongInCart] = useState<cart[]>(cartItem) // useState for cart array


    const deleteSong = async (idToDelete: string) => {
        console.log("Deleting ID:", idToDelete)
    try {
        const response = await fetch(
            `https://69783c095b9c0aed1e885c68.mockapi.io/api/v1/cart/${idToDelete}`,
            { method: "DELETE" }
        )
        if (!response.ok) {
            throw new Error(response.statusText || "Failed to delete")
        }
        setSongInCart(prev => prev.filter(s => s.objectID !== idToDelete))
    } catch (error: any) {
        console.error("Delete failed:", error.message)
    }
}

    return ( // display for the client end
        <>
            <h2 className="cart-title display-5 mb-4">Cart</h2>
            {
                <table className="table table-striped">
                    <tbody className="cart-table">
                        {songInCart.map(song => ( //adds to new array in songInCart
                            <CartRows           //import from this component these items
                                key={song.objectID}
                                song={song}
                                deleteSong={deleteSong}
                            />
                        ))}
                    </tbody>
                </table >
            }
        </>

    )
}