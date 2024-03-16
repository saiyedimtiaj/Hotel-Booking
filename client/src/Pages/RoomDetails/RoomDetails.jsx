import React, { useEffect, useState } from "react";
import Calender from "../../Component/RoomDetails/Calender";
import Map from "../../Component/RoomDetails/Map";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import countries from "world-countries";
import useAuth from "../../Hooks/useAuth";
import Review from "../../Component/RoomDetails/Review";

const formatCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common.toLowerCase(),
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
  name: country.name,
}));

const RoomDetails = () => {
  const axios = useAxiosPublic();
  const { user } = useAuth();
  const { id } = useParams();


  const { data: room = [], isPending } = useQuery({
    queryKey: ["room-details", user],
    queryFn: () => axios.get(`/rooms/${id}`).then((res) => res.data),
  });

  if (isPending) {
    return <p>loading...</p>;
  }

    // const locationString = room?.location.split(",");
    // const spliteCountryName = locationString[1].toLowerCase();
    const matchCountry = formatCountries.find(
      (country) => country.label.toLowerCase() === room.location.split(",")[1].trim().toLowerCase()
    );
    

  return (
    <div className="container mx-auto px-3 my-6">
      <h1 className="text-3xl font-bold">{room?.title}</h1>
      <p className="mt-1 text-lg text-gray-500">{room?.location}</p>
      <img
        className="w-full h-[500px] object-cover mt-4 rounded-2xl"
        src={room?.image}
        alt=""
      />
      <div className="flex gap-8 flex-col pt-6 lg:flex-row">
        <div className="w-full lg:w-3/5">
          <div className="flex items-center gap-[4px]">
            <p className="text-2xl font-bold">Hosted By {room?.host?.name}</p>
            <img
              className="w-10 h-10 object-cover rounded-full border-2 border-black"
              src={room?.host?.image}
              alt=""
            />
          </div>
          <div className="flex flex-wrap text-lg text-gray-600 items-center gap-3 pb-5 border-b border-gray-300">
            <p> {room?.guests} Guests</p>
            <p>{room?.bedrooms} bedrooms</p>
            <p>{room?.bathrooms} bathrooms</p>
          </div>
          <p className="pt-4 text-gray-500 text-justify pb-5 border-b border-gray-300">{room?.description}</p>
        <div>
          <Review id={room?._id} />
        </div>
        </div>
        <div className="">
          <Calender id={room?._id} host={room?.host?.email} title={room?.title} image={room?.image} location={room.location} price={room?.price} />
        </div>
      </div>
      <div className="border-t border-gray-400 mt-20">
        <h1 className="text-3xl font-semibold mt-10">Where you’ll be</h1>
        <Map latlng={matchCountry.latlng} />
      </div>
      
    </div>
  );
};

export default RoomDetails;
