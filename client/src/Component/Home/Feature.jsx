import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Card } from "@mui/material";
import { Link } from "react-router-dom";

const Feature = () => {
  const axios = useAxiosPublic();
  const { data: listings = [], isPending } = useQuery({
    queryKey: ["feature-room"],
    queryFn: () => axios.get(`/dashboard/rooms`).then((res) => res.data),
  });

  return (
    <div className="px-3 container mx-auto">
      <div className="text-center mt-12">
        <h1 className="text-3xl font-bold">Discover Our Featured Rooms</h1>
        <p className="text-gray-600">
          {" "}
          Explore Our Handpicked Collection of Premier Rooms Designed to Exceed
          Every Expectation
        </p>
      </div>
      <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-10'>
                {
                    listings?.map(room=> <Card  key={room?._id}>
                       <img className='w-full h-52' src={room?.image} alt="" />
                        <div className="flex flex-col px-2 py-2">
                          <p className="font-bold text-xl">
                            {room?.location}
                          </p>
                          <p sx={{fontSize:17}}><span className='font-bold'>${room?.price}</span> / par Night</p>
                          <p className="text-gray-500 mt-1">{room?.description?.slice(0,100)}...</p>
                          <Link  className="bg-[#4A4A4A] text-white py-2 rounded-md mt-2 text-center" to={`/details/${room?._id}`}>
                          <button>View Details</button>
                          </Link>
                        </div>
                      </Card>).slice(0,4)
                }
            </div>
        </div>
    </div>
  );
};

export default Feature;
