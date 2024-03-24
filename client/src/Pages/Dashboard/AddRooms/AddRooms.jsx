import { useState } from "react";
import { categories } from "../../Rooms/categoryes";
import Select from "react-select";
import countries from "world-countries";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import axios from "axios";
import { toast } from "react-hot-toast";

const formatCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
  name: country.name,
}));

const AddRooms = () => {
  const [location, setLocation] = useState("");
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [image, setImage] = useState();
  const [fileName, setFileName] = useState("No Selected File");

  const handleLocation = (value) => {
    setLocation(value?.region + ", " + value?.label);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const from = event.target;
    const title = from.title.value;
    const category = from.category.value;
    const price = parseInt(from.price.value);
    const guests = parseInt(from.total_guest.value);
    const bedrooms = parseInt(from.bedrooms.value);
    const bathrooms = parseInt(from.bathrooms.value);
    const description = from.description.value;
    const files = from.files.files[0];

    const payload = new FormData();
    payload.append("image", files);

    axios
      .post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Imgbb_Api_Key}`,
        payload
      )
      .then((res) => {
        const body = {
          title,
          location: location,
          category,
          price,
          image: res.data.data.image.url,
          guests,
          bedrooms,
          bathrooms,
          description,
          host: {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
          },
        };

        axiosPublic.post("/rooms", body).then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            toast.success('Room create sucessfully')
            from.reset();
            setFileName("No Selected File");
            setImage(null);
            setLocation("");
          }
        });
      });
  };

  return (
    <div className="text-gray-800 rounded-xl ">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="location" className="block text-gray-600">
                Location
              </label>
              <Select
                placeholder="Anywhere"
                isClearable
                required
                onChange={handleLocation}
                options={formatCountries}
                formatOptionLabel={(options) => (
                  <div className="flex items-end gap-1">
                    <div>{options.label}</div>,
                    <span className="text-neutral-500 mb-[2px] text-xs">
                      {options.region}
                    </span>
                  </div>
                )}
                classNames={{
                  control: () => "border-2",
                  input: () => "text-lg",
                  option: () => "text-lg",
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 6,
                  colors: {
                    ...theme.colors,
                    primary: "",
                    primary25: "#ffe4e6",
                  },
                })}
              />
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600">
                Category
              </label>
              <select
                required
                className="w-full px-4 py-3 border border-gray-500 focus:outline-rose-800 rounded-md"
                name="category"
              >
                {categories.map((category) => (
                  <option value={category.label} key={category.label}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div
              onClick={() => document.querySelector(".input-Field").click()}
              className="flex flex-col items-center justify-center h-[200px] w-full cursor-pointer border-dashed border-[3px] border-gray-500 rounded-lg"
            >
              <input
                type="file"
                required
                hidden
                name="files"
                className="input-Field"
                onChange={({ target: { files } }) => {
                  files[0] && setFileName(files[0].name);
                  if (files) {
                    setImage(URL.createObjectURL(files[0]));
                  }
                }}
              />
              {image ? (
                <img
                  className="w-full object-cover h-[195px] rounded-md"
                  src={image}
                  alt={fileName}
                />
              ) : (
                <>
                  <MdCloudUpload size={70} className="text-gray-500" />
                  <p>Browse File to upload</p>
                </>
              )}
            </div>
            <div className="flex justify-between items-center px-2 py-3 bg-slate-300">
              <AiFillFileImage className="text-gray-600" />
              <div className="flex items-center gap-1">
                <span>{fileName}</span>
                <span>
                  <MdDelete
                    size={22}
                    className="cursor-pointer text-gray-800"
                    onClick={() => {
                      setFileName("No Selected File");
                      setImage(null);
                    }}
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="title" className="block text-gray-600">
                Title
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-gray-500 focus:outline-rose-800 rounded-md "
                name="title"
                id="title"
                type="text"
                placeholder="Title"
                required
              />
            </div>

            <div className="flex justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-gray-600">
                  Price
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-gray-500 focus:outline-rose-800 rounded-md "
                  name="price"
                  id="price"
                  type="number"
                  placeholder="Price"
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="guest" className="block text-gray-600">
                  Total guest
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-gray-500 focus:outline-rose-800 rounded-md "
                  name="total_guest"
                  id="guest"
                  type="number"
                  placeholder="Total guest"
                  required
                />
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="bedrooms" className="block text-gray-600">
                  Bedrooms
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-gray-500 focus:outline-rose-800 rounded-md "
                  name="bedrooms"
                  id="bedrooms"
                  type="number"
                  placeholder="Bedrooms"
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="bathrooms" className="block text-gray-600">
                  Bathrooms
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-gray-500 focus:outline-rose-800 rounded-md "
                  name="bathrooms"
                  id="bathrooms"
                  type="number"
                  placeholder="Bathrooms"
                  required
                />
              </div>
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>

              <textarea
                id="description"
                className="block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-gray-500 focus:outline-rose-800 "
                name="description"
              ></textarea>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-[#1B1B29]"
        >
          Add Rooms
        </button>
      </form>
    </div>
  );
};

export default AddRooms;
