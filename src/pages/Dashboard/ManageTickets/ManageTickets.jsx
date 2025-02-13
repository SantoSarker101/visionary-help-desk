// import { MdSystemUpdateAlt } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import { useContext } from "react";
// import { AuthContext } from "../../../providers/AuthProvider";

const ManageClasses = () => {
	// const {user} = useContext(AuthContext);
		// const {
		// 	register,
		// 	handleSubmit, reset,
		// 	formState: { errors },
		//   } = useForm()
	const axiosSecure = useAxiosSecure()

	const {data: ticket = [], refetch} = useQuery({
		queryKey: ['ticket'],
		queryFn: async () => {
			const res = await axiosSecure.get('/ticket')
			return res.data;
		}
	})


	// This Function is for make status Resolved
	const handleResolved = tkt => {
		axiosSecure.patch(`/ticket/resolved/${tkt._id}`)
		.then(res => {
			console.log('Updated Status Resolved', res.data);

			if(res.data.modifiedCount){
				refetch()
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: "This Ticket is Resolved",
					showConfirmButton: false,
					timer: 1500
				});
			}
		})
	}


	// This Function is for make status Denied
	const handleDeny = tkt => {
		axiosSecure.patch(`/ticket/resolved/${tkt._id}`)
		.then(res => {
			console.log('Updated Status Denied',res.data);

			if(res.data.modifiedCount){
				refetch()
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: "This Ticket is Denied",
					showConfirmButton: false,
					timer: 1500
				});
			}
		})
	}

	// const onSubmit = (data, tkt) => {
	// 	const messageInfo = {
	// 		message: data.message,
	// 		email: tkt.email,
	// 		adminEmail: user.email
	// 	}

	// 	axiosSecure.post(`/message/${tkt._id}`, messageInfo)
	// 				  .then(res => {
	// 					if(res.data.insertedId){
	// 					  console.log('You have successfully Sent the message', res.data);
	// 					  reset();
	// 				  Swal.fire({
	// 					position: "top-end",
	// 					icon: "success",
	// 					title: "Welcome! You have successfully Sent the message",
	// 					showConfirmButton: false,
	// 					timer: 1500
	// 				  });
	// 				//   navigate('/dashboard/ManageTickets')
	// 					}
	// 				  })
	// }

	// const handleMessage = tkt => {

	// }

	return (
		<div>
			<h1 className="text-3xl text-center font-extrabold my-6">Manage Tickets</h1>



<div className="overflow-x-auto">
<table className="table">


    {/* head */}
    <thead className="text-violet-500 font-extrabold">
      <tr>
		<th>#</th>
	  <th>Subject</th>
        <th>Description</th>
        <th>Email</th>
        <th>Status</th>
        <th>Reply</th>
      </tr>
    </thead>



    <tbody className="text-orange-500 font-extrabold">

	{
		ticket.map((tkt, index) => <tr key={tkt._id}>

		<td>{index + 1}</td>

		<td>{tkt.subject}</td>
			<td>{tkt.description}</td>
			<td>{tkt.email}</td>
			{/* <td>{tkt.status}</td> */}

		<td className="flex gap-2">

		<button onClick={() => handleResolved(tkt)} disabled={tkt?.status === 'Resolved' || tkt?.status === 'Denied'} className="btn bg-green-900 hover:bg-green-700 text-white font-bold">
				Resolved
			</button>
			{
				tkt?.status === 'Resolved' ? <button className="px-2 py-2 rounded-lg text-white bg-green-900 font-extrabold cursor-not-allowed opacity-50">Resolved</button> : <></>
			}

			{
				tkt?.status === 'Denied' ? <button className="px-4 py-2 rounded-lg bg-red-900 text-white font-extrabold cursor-not-allowed opacity-50">Denied</button> : <></>
			}

			<button onClick={() => handleDeny(tkt)} disabled={tkt?.status === 'Resolved' || tkt?.status === 'Denied'} className="btn bg-red-900 hover:bg-red-700 text-white font-bold">
				Deny
			</button>

		</td>

		<td className="space-y-1">
			{/* <form onSubmit={handleSubmit(onSubmit(tkt))}> */}
			<input  type="text"
			// {...register("message", { required: true })}
			 name="message" placeholder="Send Message" className="p-2 rounded-lg text-green-800 border-pink-500 border-2"/>

			<button className="btn bg-orange-700 hover:bg-orange-800 text-white">Send</button>
			{/* </form> */}
		</td>

		{/* <td>
			<button className="btn bg-violet-700 hover:bg-violet-800 text-white font-bold">Feedback</button>
		</td> */}

		</tr>)
	}

    </tbody>

  </table>
</div>

		</div>
	);
};

export default ManageClasses;