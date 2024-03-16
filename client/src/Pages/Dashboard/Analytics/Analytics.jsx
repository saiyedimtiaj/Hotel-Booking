import { TfiWallet } from "react-icons/tfi";
import { FaUserCog,FaUser  } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Chart from "../../../Component/Dashboard/Chart";
import Affilients from "../../../Component/Dashboard/Affilients";

const Analytics = () => {
    const axios = useAxiosPublic()
    const { data: allInfo = [], isPending } = useQuery({
        queryKey: ["admin-info"],
        queryFn: () => axios.get(`/admin/dashboard`).then((res) => res.data),
      });

      const { data: analytics = [] } = useQuery({
        queryKey: ["analytics"],
        queryFn: () => axios.get(`/dashboard/analytics`).then((res) => res.data),
      });

    //   console.log(analytics);

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <div className='flex bg-[#b4e3e7] px-4 py-3 rounded-md justify-between gap-4'>
                    <TfiWallet className="text-4xl font-bold" />
                    <div className="text-right">
                        <p className="text-gray-500 font-medium text-lg">Total Revenue</p>
                        <h1 className="text-2xl font-bold">$ {allInfo?.totalRevenue}</h1>
                    </div>
                </div>
                <div className='flex bg-[#b4e3e7] px-4 py-3 rounded-md justify-between gap-4'>
                    <FaUserCog className="text-4xl font-bold" />
                    <div className="text-right">
                        <p className="text-gray-500 font-medium text-lg">Total Manager</p>
                        <h1 className="text-2xl font-bold">{allInfo.manager}</h1>
                    </div>
                </div>
                <div className='flex bg-[#b4e3e7] px-4 py-3 rounded-md justify-between gap-4'>
                    <FaUser  className="text-4xl font-bold" />
                    <div className="text-right">
                        <p className="text-gray-500 font-medium text-lg">Total User</p>
                        <h1 className="text-2xl font-bold">{allInfo.user}+</h1>
                    </div>
                </div>
                <div className='flex bg-[#b4e3e7] px-4 py-3 rounded-md justify-between gap-4'>
                    <MdMeetingRoom className="text-4xl font-bold" />
                    <div className="text-right">
                        <p className="text-gray-500 font-medium text-lg">Total Rooms</p>
                        <h1 className="text-2xl font-bold">{allInfo.rooms}</h1>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-7 mt-10">
                {/* chart */}
                <div className="lg:w-2/3 w-full">
                    <Chart analytics={analytics} />
                </div>

                {/* affilients */}
                <div className="lg:w-1/3 w-full">
                    <Affilients analytics={analytics}/>
                </div>
            </div>
        </div>
    );
};

export default Analytics;