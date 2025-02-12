import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const MyTickets = () => {
	const axiosSecure = useAxiosSecure();
	const {user} = useContext(AuthContext);

	const {data: tickets = [], refetch} = useQuery({
		queryKey: ['tickets', user?.email],
		queryFn: async () => {
			const res = await axiosSecure.get(`/tickets?email=${user.email}`)
			return res.data;
		}
	})

	const handleDeleteTicket = ticket => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!"
		  }).then((result) => {
			if (result.isConfirmed) {

			axiosSecure.delete(`/tickets/${ticket._id}`)
			.then(res => {
				if(res.data.deletedCount){
					refetch();
					  Swal.fire({
						title: "Deleted!",
						text: "Your file has been deleted.",
						icon: "success"
					  });
				}
			})
			}
		  });
	}
	return (
		<div>
			<div className="flex justify-evenly my-4">
				<h2 className="text-3xl">All Tickets</h2>
				<h2 className="text-3xl">Total Tickets {tickets.length}</h2>
			</div>


			<div className="overflow-x-auto">
  <table className="table table-zebra w-full">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Subject</th>
        <th>Description</th>
        <th>Email</th>
        <th>Status</th>
        <th>Update</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>

    {
		tickets.map((ticket, i) => <tr key={ticket._id}>
			<th>{i + 1}</th>
			<td>{ticket.subject}</td>
			<td>{ticket.description}</td>
			<td>{ticket.email}</td>
			<td>{ticket.status}</td>
			<td>
			<Link to={`/dashboard/updateMyTickets/${ticket._id}`}>
			<button className="btn btn-ghost btn-lg">
				<FaEdit className='text-red-600'></FaEdit>
			</button>
			</Link>
			</td>

			<td>
			<button onClick={() => handleDeleteTicket(ticket)} className="btn btn-ghost btn-lg">
				<FaTrashAlt className='text-red-600'></FaTrashAlt>
			</button>
			</td>
		  </tr>)
	}

    </tbody>
  </table>
</div>

		</div>
	);
};

export default MyTickets;