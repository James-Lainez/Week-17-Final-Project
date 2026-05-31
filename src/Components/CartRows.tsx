import type { cart } from "../types"

type cartRowsProps = { //props for this page
  song: cart
  deleteSong: (id: string) => void
}

const CartRows = ({ song, deleteSong }: cartRowsProps) => {
  return (
    <tr>
      <td>{song.song.song || "PRODUCT NOT FOUND"}</td> {/* short circuting for calling data and if it doesn't work*/}
      <td>{song.song.artist}</td>
      <td>${song.song.price.toFixed(2)}</td>
      <td><button
        className="btn btn-danger"
        onClick={() => deleteSong(song.objectID)}
      >
        Remove
      </button></td>
    </tr>
  )
}

export default CartRows