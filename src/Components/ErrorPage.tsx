import { useRouteError } from "react-router-dom"

const ErrorPage = () => { // page ment to handle errors that is in the parent root to pass to children
    const error = useRouteError() as Error
  return (
    <div className="error text-danger">
     <p>{error.message}</p>  
    </div>
  )
}

export default ErrorPage