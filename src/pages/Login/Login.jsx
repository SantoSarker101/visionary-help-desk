import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ImSpinner3 } from "react-icons/im";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Login = () => {
  // const [axiosSecure] = useAxiosSecure()
  const { loading,setLoading,signIn,signInWithGoogle } = useContext(AuthContext)
  const [show, setShow] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)

    signIn(data.email, data.password)
		.then(result => {
			console.log(result.user);
      Swal.fire({
        title: "User Login Successfully",
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
			navigate(from, { replace: true })
		})
		.catch(err => {
			// setLoading(false)
			console.log(err.message);
		})

  }

	return (
		<div className="hero min-h-screen bg-gradient-to-r from-red-200 to-purple-700 pt-20">

  <title>Visionary Help Desk | Login</title>

  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-extrabold text-white">Login now</h1>
      <p className="py-6 font-extrabold text-white"><span className="text-red-900">Visionary Tech Solutions</span> goes above and beyond
      to ensure you’re delighted!</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" {...register("email", { required: true })}  placeholder="email" className="input input-bordered w-full" />
          {errors.email && <span className="text-red-500">Email is required</span>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>

          <div className="relative">
          <input type={show ? 'text' : 'password'} {...register("password", { required: true })} placeholder="Password" className="input input-bordered w-full" />

          <p className="absolute right-2 cursor-pointer top-3" onClick={() => setShow(!show)}>
						<small>
							{
								show ? <span><FaEye className='w-5 h-5' /></span> : <span><FaEyeSlash className='w-5 h-5' /></span>
							}
						</small>
					</p>

          </div>

          {errors.password && <span className="text-red-500">Password is required</span>}

        </div>

        <div className="form-control mt-6">
          {/* <button className="btn btn-primary">Login</button> */}

          <div>
            <button
              type='submit'
              className='bg-rose-500 w-full rounded-md py-3 text-white font-bold'
            >
				{loading ? <ImSpinner3 size={24} className='m-auto animate-spin' /> : 'Login'}
            </button>
          </div>

        </div>
      </form>


      <SocialLogin></SocialLogin>

        <p className='px-6 text-sm text-center text-gray-400 mb-5 font-bold'>
          Already have an account?{' '}
          <Link
            to='/register'
            className='hover:underline hover:text-green-500 text-rose-500'
          >
            Sign Up
          </Link>

        </p>

    </div>
  </div>
</div>
	);
};

export default Login;
