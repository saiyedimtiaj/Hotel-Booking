import React from "react";
import useWishlist from "../../Hooks/useWishlist";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-hot-toast";

const Favourite = () => {
  const [wishlist, refetch] = useWishlist();
  const axios = useAxiosPublic();
  const handelDelete = (id) => {
    axios.delete(`/wishlist/${id}`).then((res) => {
      if (res.data?.deletedCount > 0) {
        toast.success("Place is now remove from your wishlist");
        refetch();
      }
    });
  };
  return (
    <>
      {wishlist.length === 0 ? (
        <div className="h-[calc(100vh-84px)] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-black">No Favorites found</h1>
          <p>Looks like you have no reserve favourite listing</p>
        </div>
      ) : (
        <div className="container mx-auto px-3 my-14">
          <h1 className="text-3xl font-bold mb-1 pl-3">Favorites</h1>
          <p className="pl-3 mb-4">List of places you have favourited</p>
          <div className="grid px-4 sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
            {wishlist?.map((wishlist) => (
              <div key={wishlist?._ide} className="cursor-pointer group">
                <div className="flex flex-col w-full">
                  <div className="w-full  relative overflow-hidden rounded-xl">
                    <img
                      className="object-cover h-[200px] w-full group-hover:scale-110 transition"
                      src={wishlist?.image}
                      alt="Room"
                    />
                    <div className="absolute top-3 right-3"></div>
                  </div>
                  <div className="font-semibold text-lg mt-1">
                    {wishlist?.location}
                  </div>
                  <p className="text-gray-600">{wishlist?.category}</p>
                  <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">$ {wishlist?.price}</div>
                  </div>
                  <button
                    onClick={() => handelDelete(wishlist?._id)}
                    className="bg-rose-600 text-white w-full py-2.5 mt-2 cursor-pointer rounded-md font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Favourite;
