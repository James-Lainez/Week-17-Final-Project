import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Root from './Root.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './Components/ErrorPage.tsx'
import CartList, { cartListLoader } from './Components/CartList.tsx'
import Music, { musicListLoader } from './Components/Music.tsx'
import SongInfo from './Components/SongInfo.tsx'


// router is used to set up all the paths for the pages in components
const router = createBrowserRouter([
  {
    path: "/",                    //how the path is in browser
    element: <Root />,            //component page being linked to path
    errorElement: <ErrorPage />,  //link to ErrorPage component sent down to all children
    children: [                   //set up for all paths to flow from the main parent path
      {
        path: "/",
        element: <Music />,
        loader: musicListLoader,  // loader is to send fetched data to this component
      },
      {
        path: "/cart",
        element: <CartList />,
        loader: cartListLoader,   // loader is to send fetched data to this component
      },
      {
        path:"/song/:songId",     // param set to link in Music.tsx to another component page
        element: <SongInfo />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />  {/*have to set up this way so router can work*/}
  </StrictMode>,
)
