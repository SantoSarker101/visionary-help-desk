import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const UpdateMyTickets = () => {
	const navigate = useNavigate();
	const {subject, description, status, _id} = useLoaderData();
	// console.log(subject);
	const axiosSecure = useAxiosSecure();
	// const {user} = useContext(AuthContext);
	const {
		register,
		handleSubmit, reset,
		formState: { errors },
	  } = useForm()
	  const onSubmit = async(data) => {

			const ticketInfo = {
			subject: data.subject,
			description: data.description,
			status: data.status

			}

			const Ticket = await axiosSecure.patch(`/tickets/${_id}`, ticketInfo);
			console.log(Ticket.data);
			if(Ticket.data.modifiedCount > 0){
				// reset();
				Swal.fire({
					title: "Ticket Info is Updated",
					showClass: {
					  popup: `
						animate__animated
						animate__fadeInUp
						animate__faster
					  `
					},
					hideClass: {
					  popup: `
						animate__animated
						animate__fadeOutDown
						animate__faster
					  `
					}
				  });

				  navigate('/dashboard/myTickets')

			}
		}
	return (
		<div>

			<h1 className="text-center text-green-600 font-bold text-2xl">Update Ticket</h1>

			<form onSubmit={handleSubmit(onSubmit)} className="card-body">
				<div className="form-control">
          			<label className="label">
            			<span className="label-text">Subject </span>
         	 		</label>

          			<input type="text" defaultValue={subject} {...register("subject", { required: true })} name="subject" placeholder="Subject" className="input input-bordered" />
          {errors.subject  && <span className="text-red-500">Subject is required</span>}
        		</div>

				<div className="form-control">
         	 		<label className="label">
            		<span className="label-text">Description</span>
          			</label>
          		<input type="text" defaultValue={description} {...register("description", { required: true })} name="description" placeholder="Description" className="input input-bordered h-28" />
         	 {errors.description && <span className="text-red-500">Description is required</span>}
        	</div>

				<div className="form-control">
         	 		<label className="label">
            		<span className="label-text mx-auto font-bold">Status</span>
          			</label>
          		<input type="text" defaultValue={status} {...register("status", { required: true })} name="status" placeholder="status" className="input input-bordered w-1/2 mx-auto" />
         	 {errors.status && <span className="text-red-500">Status is required</span>}
        	</div>

					<div className="form-control mt-6">
					  <div>
						<button
						  type='submit'
						  className='bg-rose-500 w-full rounded-md py-3 text-white font-bold'
						>
							Submit
						</button>
					  </div>

					</div>
				  </form>
		</div>

	);
};

export default UpdateMyTickets;