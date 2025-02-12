import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import SubmitTicket from "../pages/Dashboard/SubmitTicket/SubmitTicket";
import MyTickets from "../pages/Dashboard/MyTickets/MyTickets";
import UpdateMyTickets from "../pages/Dashboard/UpdateMyTickets/UpdateMyTickets";
import ManageTickets from "../pages/Dashboard/ManageTickets/ManageTickets";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Main></Main>,
		children: [
			{
				path: "/",
				element: <Home></Home>,
			},
			{
				path: "/login",
				element: <Login></Login>,
			},
			{
				path: "/register",
				element: <Register></Register>,
			},
		],
	},
	{
		path: "dashboard",
		element: (
			<PrivateRoute>
				<Dashboard></Dashboard>
			</PrivateRoute>
		),
		children: [
			{
				path: "allusers",
				element: (
					<AdminRoute>
						<AllUsers></AllUsers>
					</AdminRoute>
				),
			},
			{
				path: "submitTicket",
				element: (
					<PrivateRoute>
						<SubmitTicket></SubmitTicket>
					</PrivateRoute>
				),
			},
			{
				path: "myTickets",
				element: (
					<PrivateRoute>
						<MyTickets></MyTickets>
					</PrivateRoute>
				),
			},
			{
				path: "updateMyTickets/:id",
				element: (
					<PrivateRoute>
						<UpdateMyTickets></UpdateMyTickets>
					</PrivateRoute>
				),
				loader: ({ params }) =>
					fetch(
						`https://visionary-help-desk-server.vercel.app/tickets/${params.id}`
					),
			},
			{
				path: "ManageTickets",
				element: (
					<AdminRoute>
						<ManageTickets></ManageTickets>
					</AdminRoute>
				),
			},
		],
	},
]);
