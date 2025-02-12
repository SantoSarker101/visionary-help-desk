import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const SubmitTicket = () => {
	const axiosSecure = useAxiosSecure();
	const {user} = useContext(AuthContext);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit, reset,
		formState: { errors },
	  } = useForm()
	  const onSubmit = (data) => {
		const ticketInfo = {
			email: user.email,
			subject: data.subject,
			description: data.description,
			status: data.status
			  }
			  axiosSecure.post('/tickets', ticketInfo)
			  .then(res => {
				if(res.data.insertedId){
				  console.log('You have successfully Sent the Ticket', res.data);
				  reset();
			  Swal.fire({
				position: "top-end",
				icon: "success",
				title: "Welcome! You have successfully Sent the Ticket",
				showConfirmButton: false,
				timer: 1500
			  });
			  navigate('/dashboard/myTickets')
				}
			  })
	  }
	return (
		<div>

			<h1 className="text-center text-green-600 font-extrabold text-2xl">Submit Ticket</h1>

			<form onSubmit={handleSubmit(onSubmit)} className="card-body">
				<div className="form-control">
          			<label className="label">
            			<span className="label-text">Subject </span>
         	 		</label>

          			<input type="text" {...register("subject", { required: true })} name="subject" placeholder="Subject" className="input input-bordered" />
          {errors.subject  && <span className="text-red-500">Subject is required</span>}
        		</div>

				<div className="form-control">
         	 		<label className="label">
            		<span className="label-text">Description</span>
          			</label>
          		<input type="text" {...register("description", { required: true })} name="description" placeholder="Description" className="input input-bordered h-28" />
         	 {errors.description && <span className="text-red-500">Description is required</span>}
        	</div>

				<div className="form-control">
         	 		<label className="label">
            		<span className="label-text mx-auto font-bold">Status</span>
          			</label>
          		<input type="text" value='Pending' {...register("status", { required: true })} name="status" placeholder="status" className="input input-bordered w-1/2 mx-auto" />
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

export default SubmitTicket;