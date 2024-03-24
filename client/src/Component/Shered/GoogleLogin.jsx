import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const GoogleLogin = () => {
  const {user,googleLogin} = useAuth()
  const axios = useAxiosPublic()
  const navigate = useNavigate()

  const handelGoogle = () => {
    googleLogin()
    .then((res)=>{
      navigate('/')
      toast.success('Sign In your account sucessfully')
      const userInfo = {
        name: res?.user?.displayName,
        image:res?.user?.photoURL,
        email:res?.user?.email,
        role: 'user',
        createdAt : new Date()
      }
      axios.post('/users',userInfo)
      .then(()=>{
      })
    })
  }

  return (
    <div onClick={handelGoogle} className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-600 border-rounded cursor-pointer">
      <FcGoogle size={32} />
      <p>Continue with Google</p>
    </div>
  );
};

export default GoogleLogin;
