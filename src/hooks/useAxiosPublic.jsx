import axios from "axios";

const axiosPublic = axios.create({
	baseURL: "https://visionary-help-desk-server.vercel.app",
});

const useAxiosPublic = () => {
	return axiosPublic;
};

export default useAxiosPublic;
