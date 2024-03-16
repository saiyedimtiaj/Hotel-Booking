import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Rooms from "../Pages/Rooms/Rooms";
import RoomDetails from "../Pages/RoomDetails/RoomDetails";
import Dashboard from "../Layout/Dashboard";
import Statistics from "../Pages/Dashboard/Statistics/Statistics";
import Analytics from "../Pages/Dashboard/Analytics/Analytics";
import AddRooms from "../Pages/Dashboard/AddRooms/AddRooms";
import MyListing from "../Pages/Dashboard/MyListing/MyListing";
import MyTrips from "../Pages/MyTrips/MyTrips";
import ManageBookings from "../Pages/Dashboard/ManageBooking/ManageBooking";
import AllUser from "../Pages/Dashboard/AllUser/AllUser";
import AllBookings from "../Pages/Dashboard/AllBookings/AllBookings";
import AllRooms from "../Pages/Dashboard/AllRooms/AllRooms";
import Favourite from "../Pages/Favourite/Favourite";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children: [
        {
            path:'',
            element:<Home/>
        },
        {
          path:'/rooms',
          element:<Rooms/>
        },
        {
          path:'/details/:id',
          element:<RoomDetails/>
        },
        {
          path: '/myfavourite',
          element: <Favourite/>
        },
        {
          path: '/mybookings',
          element: <MyTrips/>
        }
    ]
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/dashboard',
    element:<Dashboard/>,
    children:[
      {
        path:'/dashboard/statistics',
        element:<Statistics/>
      },
      {
        path:'/dashboard/addrooms',
        element:<AddRooms/>
      },
      {
        path:'/dashboard/mylisting',
        element:<MyListing/>
      },
      {
        path:'/dashboard/managebookings',
        element:<ManageBookings/>
      },




      {
        path:'/dashboard/analytics',
        element:<Analytics/>
      },
      {
        path:'/dashboard/alluser',
        element:<AllUser/>
      },
      {
        path:'/dashboard/allbookings',
        element:<AllBookings/>
      },
      {
        path:'/dashboard/rooms',
        element:<AllRooms/>
      },
    ]
  }
]);

export default Router;
