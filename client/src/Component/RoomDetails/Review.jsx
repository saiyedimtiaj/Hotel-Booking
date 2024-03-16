import React, { useState } from "react";
import ReviewModal from "./ReviewModel";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import { Rating } from "@mui/material";

const Review = ({ id }) => {
  const [modal, setModal] = useState(false);
  const axios = useAxiosPublic()
  const { user } = useAuth();
  const { data: review = [], isPending,refetch:refetchReview } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => axios.get(`/review/${id}`).then((res) => res.data),
  });

  const { data: trips = [], refetch } = useQuery({
    queryKey: ["my-trips", user],
    queryFn: () =>
      axios.get(`/bookings?email=${user?.email}`).then((res) => res.data),
  });

  const matchTrip = trips.find((trip)=>trip?.roomId === id)
  const matchEmail = review.find((rev)=>rev?.email === user?.email)
  // console.log(matchEmail);

  return (
    <div>
    <div className={matchEmail ? 'hidden' : matchTrip ? 'flex justify-end' : 'hidden'}>
        <button
          onClick={() => setModal(true)}
          className="bg-red-700 font-medium text-white px-5 py-2 mt-3 rounded-md"
        >
          Add Review
        </button>
      </div>
      <div>
        <div className="my-10">
          {
            review?.map((review)=><div key={review?._id} className="mb-8">
              <div className="flex justify-between gap-3 ">
                <div className="flex gap-1 items-center">
                    <img src={review?.userProfile} className="w-12 h-12 object-cover rounded-full" alt="" />
                    <div className="text-gray-500">
                      <p className="font-medium">{review?.userName}</p>
                      <p>{review?.email}</p>
                    </div>
                </div>
                <Rating name="read-only" value={review?.retting} readOnly />
              </div>
              <p className="mt-3 leading-snug text-justify text-gray-600">{review?.review?.slice(0,250)}...</p>
            </div>).slice(0,3)
          }
        </div>
      </div>
      <ReviewModal refetchReview={refetchReview} review={review} id={id} modal={modal} setModal={setModal} />
    </div>
  );
};

export default Review;
