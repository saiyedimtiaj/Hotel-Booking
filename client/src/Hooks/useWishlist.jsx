import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useWishlist = () => {
  const axios = useAxiosPublic();
  const { user } = useAuth();
  const { data: wishlist = [], refetch } = useQuery({
    queryKey: ["favourite",user],
    queryFn: () => axios.get(`/wishlist?email=${user?.email}`).then((res) => res.data),
  });
  return [wishlist,refetch];
};

export default useWishlist;
