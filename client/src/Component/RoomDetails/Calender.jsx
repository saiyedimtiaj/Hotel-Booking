import { useEffect, useMemo, useState } from "react";
import { DateRange } from "react-date-range";
import { differenceInDays, eachDayOfInterval, formatDistance } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import BookingModal from "./BookingModal";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Calender = ({ price,title,location,id,image,host }) => {
  const [totalPrice,setTotalPrice] = useState()
  const [open, setOpen] = useState(false);
  const {user} = useAuth()
  const navigate = useNavigate()
  const axios = useAxiosPublic()
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  
  const startDate = state[0]?.startDate.toString()
  const endDate = state[0]?.endDate.toString()

  useEffect(() => {
    if (state[0].startDate && state[0].endDate) {
      const dayCount = differenceInDays(
        state[0].endDate, 
        state[0].startDate
      );
      
      if (dayCount && price) {
        setTotalPrice(dayCount * price);
      } else {
        setTotalPrice(price);
      }
    }
  }, [state,price]);

  
    const { data: reservations = [],refetch } = useQuery({
      queryKey: ["see-reservation",user?.email],
      queryFn: () => axios.get(`/bookings/${id}`).then((res) => res.data),
    });

  const disabledDates = useMemo(() => {
    let dates = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const handleReserve = () => {
    if(!user){
      return navigate('/login')  
    }
    else{
      setOpen(true)
    }
  }

  return (
    <div className="rounded-xl border">
      <div className="flex items-center gap-2 py-2.5 px-3 border-b ">
        <h1 className="text-2xl font-bold">$ {price}</h1>
        <p className="text-gray-500">night</p>
      </div>
      <div>
        <DateRange
          onChange={(item) => setState([item.selection])}
          ranges={state}
          date={new Date()}
          minDate={new Date()}
          rangeColors={["#262626"]}
          showDateDisplay={false}
          direction="vertical"
          disabledDates={disabledDates}
        />
      </div>
      <div className="flex justify-between px-3 items-center py-3 border-t">
        <h1 className="text-xl font-semibold">Total :</h1>
        <h1 className="text-xl font-semibold">$ {totalPrice}</h1>
      </div>
      <div className="px-3 py-3 border-t">
        <button onClick={handleReserve} className="w-full font-medium rounded-md bg-[#E51E52] text-white py-3">
          Reserve
        </button>
      </div>
      <BookingModal refetch={refetch} host={host} totalPrice={totalPrice} image={image} id={id} endDate={endDate} startDate={startDate} title={title} location={location} open={open} setOpen={setOpen} />
    </div>
  );
};

export default Calender;
