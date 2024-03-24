import axios from "axios";

const useAxiosPublic = () => {
    const instance = axios.create({
        baseURL: 'https://hotel-booking-opal-eight.vercel.app',
      });
    return instance
};

export default useAxiosPublic;