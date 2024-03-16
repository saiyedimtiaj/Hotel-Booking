import { BiSearch } from "react-icons/bi";

const SearchBar = ({setIsPlaceOpen}) => {
  return (
    <div onClick={()=>setIsPlaceOpen(true)} className="max-w-sm w-full flex py-2 rounded-full  border-[1px] shadow-sm  hover:shadow-md transition cursor-pointer mx-auto">
      <div className=" flex  flex-row items-center justify-between">
        <div className=" text-sm font-semibold px-6">Anywhere</div>
        <div className="block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center ">
          Any Week
        </div>
        <div className="text-sm pl-6 pr-2  text-gray-600 flex flex-row items-center  gap-3">
          <div className="block"> Add Guest</div>
          <div className="p-2  bg-rose-500 rounded-full  text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
