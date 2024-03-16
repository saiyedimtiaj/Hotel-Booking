import React from 'react';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useUser = () => {
    const {user} = useAuth()
    const axios = useAxiosPublic()
    const { data: userInfo = [] } = useQuery({
      queryKey: ["user-info",user?.email],
      queryFn: () => axios.get(`/users/${user?.email}`).then((res) => res.data),
    });
    return [userInfo]
};

export default useUser;