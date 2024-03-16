import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import TripsModal from "../../Component/Dashboard/TripsModal";
import { useState } from "react";

const MyTrips = () => {
  const [open, setOpen] = useState(false);
  const [tripData, setTripData] = useState([]);
  const { user } = useAuth();
  const axios = useAxiosPublic();
  const { data: trips = [], refetch } = useQuery({
    queryKey: ["my-trips", user],
    queryFn: () =>
      axios.get(`/bookings?email=${user?.email}`).then((res) => res.data),
  });

  const handleClickOpen = (data) => {
    setOpen(true);
    setTripData(data);
  };

  return (
    <>
      {trips.length === 0 ? (
        <div className="h-[calc(100vh-84px)] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-black">No trips found</h1>
          <p>Looks like you havent reserve any trips</p>
        </div>
      ) : (
        <div className="container mx-auto px-3 my-14">
          <h1 className="text-3xl font-bold mb-1 pl-3">Trips</h1>
          <p className="pl-3 mb-4">Where you've been and where you're going</p>
          <div className="grid px-4 sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trips?.map((trip) => (
              <div key={trip?._ide} className="cursor-pointer group">
                <div className="flex flex-col w-full">
                  <div className="w-full  relative overflow-hidden rounded-xl">
                    <img
                      className="object-cover h-[200px] w-full group-hover:scale-110 transition"
                      src={trip?.roomImage}
                      alt="Room"
                    />
                    <div className="absolute top-3 right-3"></div>
                  </div>
                  <div className="font-semibold text-lg mt-1">
                    {trip?.location}
                  </div>
                  <div className="font-light text-neutral-500">
                    {trip?.startDate.slice(0, 10)} to{" "}
                    {trip?.endDate.slice(0, 10)}
                  </div>
                  <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">$ {trip?.totalPrice}</div>
                  </div>
                  <button
                    onClick={() => handleClickOpen(trip)}
                    className="bg-rose-600 text-white w-full py-2.5 mt-2 cursor-pointer rounded-md font-medium"
                  >
                    Cancel Reservation
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <TripsModal
        refetch={refetch}
        tripData={tripData}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default MyTrips;
