/*Using an online API of your choice, create a React project.
You will be working on this for the next three weeks.
Project must meet the following criteria:
  » Use React Router and have at least 3 pages using React Bootstrap
    or an alternative styling library
  
  » Contain at least 10 custom components
  
  » Allow for all CRUD operations via one or more APIs*/

import { NavLink, Outlet } from "react-router-dom";

export default function Root() {
// this is setting up the page with router to have NavLink between pages 
  return (
    <div className="container mt-3">
      <ul className="nav bg-light mb-3 border-bottom">
        <li className="nav-item">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"}
          >Music</NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"}
          >Cart</NavLink>
        </li>
      </ul>
      <Outlet />
    </div >
  )
}
