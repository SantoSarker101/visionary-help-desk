import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const UseAdmin = () => {
	const {user} = useContext(AuthContext);
	const axiosSecure = useAxiosSecure();
	const { data: isAdmin, isPending: isAdminLoading } = useQuery({
		queryKey: [user?.email, 'isAdmin'],
		queryFn: async() => {
			const res = await axiosSecure.get(`/users/admin/${user.email}`)
			console.log(res.data);
			return res.data?.Admin;
		}
	})
	return [isAdmin, isAdminLoading]
};

export default UseAdmin;