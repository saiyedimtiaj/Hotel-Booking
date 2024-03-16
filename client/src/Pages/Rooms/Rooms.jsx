import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import { categories } from "./categoryes";
import SearchBar from "../../Component/Rooms/SearchBar";
import Card from "../../Component/Rooms/Card";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingCard from "../../Component/Shered/LoadingCard";
import { useState } from "react";
import PlaceModal from "../../Component/Rooms/PlaceModal";
import CalenderModel from "../../Component/Rooms/CalenderModel";
import SelectionModel from "../../Component/Rooms/SelectionModel";

const Rooms = () => {
  const [isPlaceOpen, setIsPlaceOpen] = useState(false);
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const [isSelectionOpen, setIsSelectionOpen] = useState(false);
  const [gusets, setGusets] = useState(0);
  const [rooms, setRooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [catg, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const axios = useAxiosPublic();
  const {
    data: allRooms = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["repoData", catg],
    queryFn: () =>
      axios
        .get(
          `/rooms?category=${catg}&location=${location}&guest=${gusets}&bathrooms=${bathrooms}&bedrooms=${rooms}`
        )
        .then((res) => res.data),
  });

  const handelCategory = (category) => {
    setCategory(category);
  };

  const handelClear = () => {
    setCategory('')
    setLocation('')
    setGusets(0)
    setBathrooms(0)
    setRooms(0)
    refetch()
  }

  return (
    <div className="container px-2 mx-auto">
      <div className="my-4 text-center">
        <SearchBar setIsPlaceOpen={setIsPlaceOpen} />
      </div>
      <div className="mt-6 flex justify-center">
        <Box sx={{ maxWidth: "100%" }}>
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {categories.map((category) => (
              <div
                className={
                  category.label === catg
                    ? "border-b-2 border-black flex items-center flex-col px-1.5 cursor-pointer mx-2"
                    : `flex items-center flex-col px-1.5 cursor-pointer mx-2`
                }
                key={category.description}
                onClick={() => handelCategory(category?.label)}
              >
                <h1 className="text-3xl text-center">
                  <category.icon />
                </h1>
                <p className="text-lg font-semibold">{category.label}</p>
              </div>
            ))}
          </Tabs>
        </Box>
      </div>

      {isPending ? (
        <LoadingCard />
      ) : allRooms.length === 0 ? (
        <div className="flex py-28 flex-col gap-1 text-center items-center justify-center">
          <h1 className="text-3xl font-bold">No exact matches</h1>
          <p>Try changing or removing some of your filters</p>
          <button onClick={handelClear} className="border-2 border-black px-3 py-2 mt-1 font-medium rounded-lg">Remove all filters</button>
        </div>
      ) : (
        <div className="mt-10 mb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {allRooms.map((room) => (
            <Card key={room?.title} room={room} />
          ))}
        </div>
      )}
      {isPlaceOpen && (
        <PlaceModal
          setIsCalenderOpen={setIsCalenderOpen}
          setIsPlaceOpen={setIsPlaceOpen}
          setLocation={setLocation}
          setIsSelectionOpen={setIsSelectionOpen}
        />
      )}
      {/* {isCalenderOpen && (
        <CalenderModel
          setState={setState}
          state={state}
          setIsCalenderOpen={setIsCalenderOpen}
          setIsPlaceOpen={setIsPlaceOpen}
          setIsSelectionOpen={setIsSelectionOpen}
        />
      )} */}
      {isSelectionOpen && (
        <SelectionModel
          refetch={refetch}
          rooms={rooms}
          setIsPlaceOpen={setIsPlaceOpen}
          setGusets={setGusets}
          gusets={gusets}
          setRooms={setRooms}
          setBathrooms={setBathrooms}
          bathrooms={bathrooms}
          setIsCalenderOpen={setIsCalenderOpen}
          setIsSelectionOpen={setIsSelectionOpen}
        />
      )}
    </div>
  );
};

export default Rooms;
