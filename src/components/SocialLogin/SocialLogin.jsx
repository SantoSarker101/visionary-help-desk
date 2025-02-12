import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {
	const { googleSignIn } = useContext(AuthContext);
	const axiosPublic = useAxiosPublic();
	const navigate = useNavigate();
	const location = useLocation();
  	const from = location.state?.from?.pathname || '/';

	const handleGoogleSignIn = () => {
		googleSignIn()
		.then(result => {
			console.log(result.user);
			const userInfo = {
				email: result.user?.email,
				name: result.user?.displayName,
				image: result.user?.photoURL
			}

			axiosPublic.post('/users', userInfo)
			.then(res => {
				console.log(res.data);
				navigate(from, { replace: true })
			})
		})
	}

	return (
		<div className="px-8">
			<div className="divider divider-secondary">Or, Sign in with Social</div>

			<div onClick={handleGoogleSignIn} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
				<FcGoogle size={32} />

				<p>Continue with Google</p>
			</div>
		</div>
	);
};

export default SocialLogin;