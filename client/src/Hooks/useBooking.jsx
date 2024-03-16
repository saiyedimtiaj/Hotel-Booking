import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useBooking = () => {
    const axios = useAxiosPublic();
  const { data: bookings = [], isPending } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => axios.get("/bookings").then((res) => res.data),
  });
    return [bookings]
};

export default useBooking;