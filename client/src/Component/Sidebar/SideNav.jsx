import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { FaChartLine, FaHome } from "react-icons/fa";
import { MdManageHistory, MdOutlineHomeWork,MdOutlineBedroomChild  } from "react-icons/md";
import { TbHomePlus } from "react-icons/tb";
import { CgLogOut } from "react-icons/cg";
import useUser from "../../Hooks/useUser";
import { SiSimpleanalytics } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import { LuLayoutList } from "react-icons/lu";

const SideNav = () => {
  const pathname = useLocation();
  const [userInfo] = useUser();
  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "calc(100vh - 65px)",
        bgcolor: "#1C2536",
        color: "#9DA4AE",
      }}
      component="nav"
    >
      <>
        {userInfo.role === "admin" ? (
          <div className="flex flex-col gap-1 text-[#9DA4AE]">
            <Link
              to="/dashboard/analytics"
              className="hover:bg-[#24324b] hover:text-white"
            >
              <ListItemButton
                sx={
                  pathname.pathname === "/dashboard/analytics"
                    ? { bgcolor: "#24324b", color: "white" }
                    : {}
                }
              >
                <ListItemIcon sx={{ fontSize: 23, color: "#9DA4AE" }}>
                  <SiSimpleanalytics />
                </ListItemIcon>
                <ListItemText primary="Analytics" />
              </ListItemButton>
            </Link>
            <Link
              to="/dashboard/alluser"
              className="hover:bg-[#24324b] hover:text-white"
            >
              <ListItemButton
                sx={
                  pathname.pathname === "/dashboard/alluser"
                    ? { bgcolor: "#24324b", color: "white" }
                    : {}
                }
              >
                <ListItemIcon sx={{ fontSize: 23, color: "#9DA4AE" }}>
                  <FaUser />
                </ListItemIcon>
                <ListItemText primary="All Users" />
              </ListItemButton>
            </Link>
            <Link
              to="/dashboard/rooms"
              className="hover:bg-[#24324b] hover:text-white"
            >
              <ListItemButton
                sx={
                  pathname.pathname === "/dashboard/rooms"
                    ? { bgcolor: "#24324b", color: "white" }
                    : {}
                }
              >
                <ListItemIcon>
                <ListItemIcon sx={{ fontSize: 23, color: "#9DA4AE" }}>
                  <MdOutlineBedroomChild/>
                </ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Listing" />
              </ListItemButton>
            </Link>
            <Link
              to="/dashboard/allbookings"
              className="hover:bg-[#24324b] hover:text-white"
            >
              <ListItemButton
                sx={
                  pathname.pathname === "/dashboard/allbookings"
                    ? { bgcolor: "#24324b", color: "white" }
                    : {}
                }
              >
                <ListItemIcon>
                <ListItemIcon sx={{ fontSize: 23, color: "#9DA4AE" }}>
                  <LuLayoutList  />
                </ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="All Booking" />
              </ListItemButton>
            </Link>
          </div>
        ) : (
          <div>
            <Link
              to="/dashboard/statistics"
              className="hover:bg-[#24324b] hover:text-white"
            >
              <ListItemButton
                sx={
                  pathname.pathname === "/dashboard/statistics"
                    ? { bgcolor: "#24324b", color: "white" }
                    : {}
                }
              >
                <ListItemIcon sx={{ fontSize: 23, color: "#9DA4AE" }}>
                  <FaChartLine />
                </ListItemIcon>
                <ListItemText primary="Statistics" />
              </ListItemButton>
            </Link>
            <Link
              to="/dashboard/mylisting"
              className="hover:bg-[#24324b] hover:text-white"
            >
              <ListItemButton
                sx={
                  pathname.pathname === "/dashboard/mylisting"
                    ? { bgcolor: "#24324b", color: "white" }
                    : {}
                }
              >
                <ListItemIcon sx={{ fontSize: 23, color: "#9DA4AE" }}>
                  <MdOutlineHomeWork />
                </ListItemIcon>
                <ListItemText primary="My Listing" />
              </ListItemButton>
            </Link>
            <Link
              to="/dashboard/managebookings"
              className="hover:bg-[#24324b] hover:text-white"
            >
              <ListItemButton
                sx={
                  pathname.pathname === "/dashboard/managebookings"
                    ? { bgcolor: "#24324b", color: "white" }
                    : {}
                }
              >
                <ListItemIcon sx={{ fontSize: 23, color: "#9DA4AE" }}>
                  <MdManageHistory />
                </ListItemIcon>
                <ListItemText primary="Manage Bookings" />
              </ListItemButton>
            </Link>
            <Link
              to="/dashboard/addrooms"
              className="hover:bg-[#24324b] hover:text-white"
            >
              <ListItemButton
                sx={
                  pathname.pathname === "/dashboard/addrooms"
                    ? { bgcolor: "#24324b", color: "white" }
                    : {}
                }
              >
                <ListItemIcon sx={{ fontSize: 23, color: "#9DA4AE" }}>
                  <TbHomePlus />
                </ListItemIcon>
                <ListItemText primary="Add Room" />
              </ListItemButton>
            </Link>
          </div>
        )}
      </>

      <div>
        <>
          <Link to="/">
            <ListItemButton  sx={{
              "&:hover": {
                bgcolor: "#24324b",
                color:'white'
              },
            }}>
              <ListItemIcon sx={{ fontSize: 23, color: "#9DA4AE" }}>
                <FaHome />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </Link>
          <ListItemButton
            sx={{
              "&:hover": {
                bgcolor: "#24324b",
                color:'white'
              },
            }}
          >
            <ListItemIcon sx={{ fontSize: 23, color: "#9DA4AE" }}>
              <CgLogOut />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItemButton>
        </>
      </div>
    </List>
  );
};

export default SideNav;
