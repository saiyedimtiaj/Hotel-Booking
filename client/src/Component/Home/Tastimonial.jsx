import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Rating } from '@mui/material';
import { FaQuoteLeft } from "react-icons/fa";

const Tastimonial = () => {
    const axios = useAxiosPublic()
  const { data: review = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => axios.get(`/review`).then((res) => res.data),
  });

  return (
    <div className="container mx-auto px-2 my-16">
      <h1 className="text-4xl font-bold text-center">What Our Customar Say</h1>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper mt-10">
        {
            review?.map((review)=> <SwiperSlide key={review?._id}>
                <div className='flex px-10 md:px-0 flex-col items-center gap-y-3'>
                    <img className='w-48 border-[6px] border-black h-48 rounded-full' src={review?.userProfile} alt="" />
                    <h4 className="text-2xl font-bold">{review?.userName}</h4>
                    <Rating name="read-only" value={review?.retting} readOnly />
                    <div className='max-w-3xl mx-auto relative'>
                        <span className='text-5xl opacity-25 z-20 absolute top-1 left-3'><FaQuoteLeft/></span>
                        <p className='mt-5'>{review?.review}</p>
                    </div>
                </div>
            </SwiperSlide>)
        } 
      </Swiper>
    </div>
  );
};

export default Tastimonial;
