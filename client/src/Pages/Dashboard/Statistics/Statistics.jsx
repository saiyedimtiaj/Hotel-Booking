import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import { TfiWallet } from "react-icons/tfi";
import { MdBedroomParent, MdMeetingRoom } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";


const Statistics = () => {
    const axios = useAxiosPublic()
    const {user} = useAuth()
    const { data: allInfo = [] } = useQuery({
        queryKey: ["manager-info",user],
        queryFn: () => axios.get(`/manager/dashboard?email=${user?.email}`).then((res) => res.data),
      });
      console.log(allInfo);
      const revenue = allInfo?.totalBookings?.reduce((price,item)=>price + item?.totalPrice,0)
      const activeRoom = allInfo?.rooms?.filter(room=>room.status == 'active')
      
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <div className='flex bg-[#b4e3e7] px-4 py-3 rounded-md justify-between gap-4'>
                    <TfiWallet className="text-4xl font-bold" />
                    <div className="text-right">
                        <p className="text-gray-500 font-medium text-lg">Total Revenue</p>
                        <h1 className="text-2xl font-bold">$ {revenue || 0}</h1>
                    </div>
                </div>npm
                <div className='flex bg-[#b4e3e7] px-4 py-3 rounded-md justify-between gap-4'>
                    <MdMeetingRoom className="text-4xl font-bold" />
                    <div className="text-right">
                        <p className="text-gray-500 font-medium text-lg">Total Rooms</p>
                        <h1 className="text-2xl font-bold">{allInfo?.rooms?.length || 0}</h1>
                    </div>
                </div>
                <div className='flex bg-[#b4e3e7] px-4 py-3 rounded-md justify-between gap-4'>
                    <FaCalendarAlt className="text-4xl font-bold" />
                    <div className="text-right">
                        <p className="text-gray-500 font-medium text-lg">Total Booking</p>
                        <h1 className="text-2xl font-bold">{allInfo?.totalBookings?.length || 0}</h1>
                    </div>
                </div>
                <div className='flex bg-[#b4e3e7] px-4 py-3 rounded-md justify-between gap-4'>
                    <MdBedroomParent className="text-4xl font-bold" />
                    <div className="text-right">
                        <p className="text-gray-500 font-medium text-lg">Active Rooms</p>
                        <h1 className="text-2xl font-bold">{activeRoom?.length || 0}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;