import video from "../../../assets/video/one.mp4";

const Banner = () => {
	return (
	<div className="h-screen relative">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        src={video}
        autoPlay
        loop
        muted
      ></video>

      {/* Content */}
      <div className="h-[85%] pt-10 text-white flex flex-col justify-center items-start flex-wrap mx-2 md:mx-10">
        <h1 className="text-lg md:text-4xl font-extrabold mb-4">
		Complaints Management Software
        </h1>
        <p className="mb-6">
		Make complaint handling consistent, effective, and easy.
        </p>
        <p className="mb-6">
		Our cloud-based complaints management system ensures that every complaint <br></br> is properly recorded, assigned, tracked, and resolved.
        </p>
        <p className="mb-6">
		The module can stand alone or integrate with our other quality management software.
        </p>
      </div>
    </div>
	);
};

export default Banner;