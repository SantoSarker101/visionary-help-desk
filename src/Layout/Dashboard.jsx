import { FaBook, FaHome, FaList, FaUsers} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import UseAdmin from "../hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Dashboard = () => {
	const { user, logOut } = useContext(AuthContext);
	const handleLogOut = () => {
		logOut()
		.then(() => {})
		.catch(error => console.log(error))
	  }

	const [isAdmin] = UseAdmin();
	// const isAdmin = true;
	return (
			<div className="flex">
				{/* Dashboard side bar */}
				<div className="w-64 min-h-screen bg-orange-800 text-fuchsia-100 font-bold pt-4 pb-4">
					<ul className="menu p-4">
						<li className="text-center my-4 font-extrabold md:text-2xl">Hello, {user.displayName}</li>
					{
						isAdmin ? <>
							{/* <li>
							<NavLink to='/dashboard/adminHome'>
							<FaHome></FaHome>
							Admin Home</NavLink>
						</li> */}
						{/* <li>
							<NavLink to='/dashboard/manageItems'>
							<FaList></FaList>
							Manage Users</NavLink>
						</li> */}
						<li>
							<NavLink to='/dashboard/ManageTickets'>
							<FaBook></FaBook>
							Manage Tickets</NavLink>
						</li>
						<li>
							<NavLink to='/dashboard/allusers'>
							<FaUsers></FaUsers>
							All Users</NavLink>
						</li>
						</> : <>
						{/* <li>
							<NavLink to='/dashboard/userHome'>
							<FaHome></FaHome>
							User Home</NavLink>
						</li> */}
						<li>
							<NavLink to='/dashboard/submitTicket'>
							<FaBook></FaBook>
							Submit a Ticket</NavLink>
						</li>
						<li>
							<NavLink to='/dashboard/myTickets'>
							<FaList></FaList>
							My Tickets</NavLink>
						</li>
						</>
					}

						{/* Shared Nav Links */}
						<div className="divider"></div>

						<li>
							<NavLink to='/'>
							<FaHome></FaHome>
							Home</NavLink>
						</li>
						<li onClick={handleLogOut} className="text-red-200 font-extrabold">
							<span>
							Logout</span>
						</li>

					</ul>
				</div>

				{/* Dashboard Content */}
				<div className="flex-1 p-8">
					<Outlet></Outlet>
				</div>
			</div>
	);
};

export default Dashboard;