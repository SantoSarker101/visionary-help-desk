import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const SignUp = () => {
	const [show, setShow] = useState(false)
const axiosPublic = useAxiosPublic();
const { register, handleSubmit, reset, formState: { errors } } = useForm();
const {createUser, updateUserProfile} = useContext(AuthContext);
const navigate = useNavigate();

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const onSubmit = (data) => {
  console.log(data);
  const imageFile = { image: data.profileImage[0] }

  axiosPublic.post(image_hosting_api, imageFile, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(res => {
    // console.log(res.data.data.display_url);
    // console.log(res.data);
    const profileImage = res.data.data.display_url;

    if(res.data.success){
      createUser(data.email, data.password)
  .then(result => {
    const loggedUser = result.user;
    // console.log(loggedUser);
    updateUserProfile(data.name, profileImage)
    .then(() => {
      // console.log('User Profile is Updated');

      // Create user entry in the database
      const userInfo = {
        name: data.name,
        email: data.email,
        image: profileImage
      }
      axiosPublic.post('/users', userInfo)
      .then(res => {
        if(res.data.insertedId){
          console.log('User Added to the database');
          reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Welcome! You have successfully done the Sign Up",
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/');
        }
      })


    })
    .catch(error => console.log(error));
  })
    }
  })


}

	return (
		<>

        	<title>Visionary Help Desk | Register</title>

<div className="hero min-h-screen bg-gradient-to-r from-yellow-300 to-pink-500 pt-20">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-extrabold text-white">Sign Up now</h1>
      <p className="py-6 font-extrabold text-white"><span className="text-red-900">Visionary Tech Solutions</span> goes above and beyond
      to ensure you’re delighted!</p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">

        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
          {errors.name && <span className="text-red-500">Name is required</span>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Profile Image</span>
          </label>
          <div className="form-control w-full">
		      <input {...register('profileImage', { required: true})} type="file" className="file-input w-full max-w-xs" />
		      </div>
          {errors.profileImage && <span className="text-red-500">Profile Image is required</span>}
          {/* <input type="text" {...register("profileImage", { required: true })} name="profileImage" placeholder="Name" className="input input-bordered" /> */}

        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" required />
          {errors.email && <span className="text-red-500">Email is required</span>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <div className="relative">
		  <input type={show ? 'text' : 'password'} {...register("password", { required: true, minLength:6, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ })} name="password" placeholder="password" className="input input-bordered w-full" />

		  <p className="absolute right-2 cursor-pointer top-3" onClick={() => setShow(!show)}>
								<small>
									{
										show ? <span><FaEye className='w-5 h-5' /></span> : <span><FaEyeSlash className='w-5 h-5' /></span>
									}
								</small>
							</p>
		  </div>
          {errors.password?.type === 'required' && <p className="text-red-500">Password is required</p>}
          {errors.password?.type === 'minLength' && <p className="text-red-500">Password Must be 6 Characters</p>}
          {errors.password?.type === 'maxLength' && <p className="text-red-500">Password Must be less than 20 Characters</p>}
          {errors.password?.type === 'pattern' && <p className="text-red-500">Password Must have one upper case one lower case latter, one number and one special character 6 Characters</p>}
          {/* <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label> */}
        </div>

        <div className="form-control mt-6">
          <input className="btn btn-primary font-extrabold" type="submit" value='Register' />
        </div>
      </form>

      <SocialLogin></SocialLogin>

      <p className="px-8 pb-6"><small>Already have an Account? <Link to='/login' className="text-red-500 font-extrabold hover:text-blue-600">Login</Link> </small></p>

    </div>
  </div>
    </div>

    </>
	);
};

export default SignUp;