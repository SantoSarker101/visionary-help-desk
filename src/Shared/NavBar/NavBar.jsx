import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false);
  const {user, logOut} = useContext(AuthContext)

  const handleLogOut = () => {
    logOut()
    .then(() => {})
    .catch(error => console.log(error))
  }

	const toggleMenu = () => setIsOpen(!isOpen);
	const navItem = (
		<>
		  <li>
			<Link to='/' className="text-red-600 font-bold hover:text-white border-2 mr-5 hover:bg-red-600 mt-3 lg:mt-0">Home</Link>
		  </li>
		  <li>
			<Link to='/dashboard/submitTicket' className="text-red-600 font-bold hover:text-white border-2 mr-5 hover:bg-red-600 mt-3 lg:mt-0">Submit a Ticket</Link>
		  </li>
		  <li>
			<Link to='/dashboard' className="text-red-600 font-extrabold hover:text-white border-2 mr-5 hover:bg-red-600 mt-3 lg:mt-0">Dashboard</Link>
		  </li>
      {
        user ? <><li onClick={handleLogOut} className="text-red-600 font-bold hover:text-white border-2 mr-5 hover:bg-red-600 mt-3 mb-3 lg:mt-0 px-4 py-2 cursor-pointer rounded-lg">
         Logout
        </li></> : <><li>
			<Link to='/login' className="text-red-600 font-bold hover:text-white border-2 mr-5 hover:bg-red-600 mt-3 lg:mt-0">Login</Link>
		  </li>
		  <li>
			<Link to='/register' className="text-red-600 font-bold hover:text-white border-2 mr-5 hover:bg-red-600 mt-3 lg:mt-0">Register</Link>
		  </li></>
      }

		</>
	  );

	return (
		<div className="navbar z-10 fixed bg-white border-b-2">
      <div className="navbar-start">

	  <div className="dropdown">
          <div
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            onClick={toggleMenu}
            className="btn btn-ghost lg:hidden text-red-500 font-extrabold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {isOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box z-[0] mt-3 w-52 p-2 shadow bg-white mr-20"
            >
				{navItem}
            </ul>
          )}
        </div>

        <Link to='/' className="btn btn-ghost text-lg md:text-2xl text-red-500 font-extrabold mx-2">Visionary Help Desk</Link>
      </div>
	  <div className="navbar-end">
        {/* <button className="btn  focus:outline focus:outline-offset-2">
          Login
        </button> */}
		<div className="hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItem}</ul>
      </div>


      </div>
    </div>
	);
};

export default NavBar;

