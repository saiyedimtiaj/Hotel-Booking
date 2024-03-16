import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart,FaHeart } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-hot-toast";
import useWishlist from "../../Hooks/useWishlist";

const Card = ({ room }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axios = useAxiosPublic();
  const [wishlist, refetch] = useWishlist();
  const alreadyAdded = wishlist.some(
    (item) => item.email === user?.email && item.roomId === room._id
  );
  const handleFavourite = (room) => {
    if (!user) {
      return navigate("/login");
    }

    if (alreadyAdded) {
      return toast.error("Room already added to your Wishlist");
    } else {
      const body = {
        roomId: room._id,
        image: room.image,
        location: room.location,
        email: user.email,
        name: user.displayName,
        category:room?.category,
        price: room.price,
        createdAt: new Date(),
      };

      axios.post("/wishlist", body).then((res) => {
        if (res.data?.insertedId) {
          toast.success("Room is added to your Wishlist");
          refetch();
        }
      });
    }
  };

  return (
    <div className="col-span-1 cursor-pointer group relative">
      <button
        onClick={() => handleFavourite(room)}
        className="absolute right-2 top-2 z-50"
      >
        { !alreadyAdded ? <FaRegHeart className="text-white bg-transparent" size={22} /> :
        <FaHeart className="text-red-500" size={22} /> }
      </button>
      <Link to={`/details/${room?._id}`}>
        <div className="flex flex-col gap-[3px] w-full">
          <div
            className="
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
          >
            <img
              className="
              object-cover 
              h-[220px]
              w-full 
              group-hover:scale-110 
              transition
            "
              src={room?.image}
              alt="Room"
            />
            <div
              className="
            absolute
            top-3
            right-3
          "
            >
              {/* <HeartButton /> */}
            </div>
          </div>
          <div className="font-semibold text-lg">{room?.location}</div>
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">$ 200</div>
            <div className="font-light">/night</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
