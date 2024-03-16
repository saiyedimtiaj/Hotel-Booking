import React from "react";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const {user} = useAuth();
  const navigate = useNavigate()

  const handelStart = () => {
    if(user){
      navigate('/rooms')
    }
    else{
      navigate('/login')
    }
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-10 container px-2 mx-auto py-8 items-center">
      <div className="lg:w-1/2 w-full">
        <h1 className="text-[55px] leading-[55px] font-bold">Explore Our Exquisite Hotel</h1>
        <p className="text-[#4A4A4A] text-lg mt-4">
          {" "}
          Explore our exquisite selection of hotels worldwide and unlock
          unforgettable experiences. Start planning your next getaway with ease
          and book your ideal accommodation now!
        </p>
        <button onClick={handelStart} className="group relative flex w-[175px] items-center rounded-lg border-2 border-[#4a4a4a] py-3 px-4 text-[#4a4a4a] text-xl font-medium mt-3"><span>Get Started</span><span className="absolute right-3 box-content flex w-1/6 justify-center rounded-md bg-[#4a4a4a] duration-300 group-hover:w-5/6"><svg viewBox="0 0 24 24" fill="none" className="w-10" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g><path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></g></svg></span></button>
      </div>
      <div className="lg:w-1/2 w-full">
  <div className="w-full overflow-hidden rounded-3xl">
    <div
      className="w-full h-56 overflow-hidden cursor-pointer hover:scale-110 transition-all duration-300 bg-center bg-cover"
      style={{ backgroundImage: 'url("../../assets/hero-1.webp")' }}
    ></div>
  </div>
  <div className="flex gap-5 mt-5">
    <div className="w-full overflow-hidden rounded-3xl">
      <div
        className="w-full h-44 rounded-3xl cursor-pointer hover:scale-[1.25] transition-all duration-300 bg-center bg-cover"
        style={{ backgroundImage: 'url("../../assets/hero-2.webp")' }}
      ></div>
    </div>
    <div className="w-full overflow-hidden rounded-3xl">
      <div
        className="w-full h-44 rounded-3xl cursor-pointer hover:scale-[1.25] transition-all duration-300 bg-center bg-cover"
        style={{ backgroundImage: 'url("../../assets/hero-3.webp")' }}
      ></div>
    </div>
  </div>
</div>
    </div>
  );
};

export default Banner;
