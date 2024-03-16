import { FaFacebookF,FaInstagram,FaTwitter  } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-[#F4F4F4] mt-5">
      <div className="grid grid-cols-1 container mx-auto md:grid-cols-2 lg:grid-cols-4 gap-5 lg:justify-center py-10 px-3">
        <div>
          <div className="flex items-end cursor-pointer">
            <h1 className="text-3xl font-bold">BooK</h1>
            <p className="w-3 h-3 rounded-full bg-red-600 mb-[6px]"></p>
          </div>
          <div className="flex gap-2 mt-3">
                <span className="bg-[#EF6C00] p-2 text-white text-lg rounded-full"><FaFacebookF/></span>
                <span className="bg-[#EF6C00] p-2 text-white text-lg rounded-full"><FaInstagram/></span>
                <span className="bg-[#EF6C00] p-2 text-white text-lg rounded-full"><FaTwitter/></span>
          </div>
        </div>
        <div>
            <h4 className="text-xl font-bold">Information</h4>
            <ul className="mt-4 text-gray-500 space-y-2 font-medium">
                <li className="cursor-pointer">Home</li>
                <li className="cursor-pointer">Explore</li>
                <li className="cursor-pointer">Travel</li>
                <li className="cursor-pointer">Blog</li>
            </ul>
        </div>
        <div>
            <h4 className="text-xl font-bold">Helpful Links</h4>
            <ul className="mt-4 text-gray-500 space-y-2 font-medium">
                <li className="cursor-pointer">Destination</li>
                <li className="cursor-pointer">Support</li>
                <li className="cursor-pointer">Travel & Condition</li>
                <li className="cursor-pointer">Privacy</li>
            </ul>
        </div>
        <div>
            <h4 className="text-xl font-bold">Contact</h4>
            <ul className="mt-4 text-gray-500 space-y-1 font-medium">
                <li className="cursor-pointer">+880 1615-718970</li>
                <li className="cursor-pointer">saiyedimtiaj@gmail.com</li>
            </ul>
        </div>
      </div>
      <div className="bg-[#e5dddd] py-4 text-center">
            <p>© {new Date().getFullYear()} BooK Inc. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
