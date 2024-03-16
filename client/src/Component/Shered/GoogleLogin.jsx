import React from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {
  return (
    <div className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-600 border-rounded cursor-pointer">
      <FcGoogle size={32} />

      <p>Continue with Google</p>
    </div>
  );
};

export default GoogleLogin;
