import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { MdMenu } from "react-icons/md";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useUser from "../../Hooks/useUser";



const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user,Logout } = useAuth();
  const [userInfo] = useUser()
  
  const pages = [
    {id:1, name: "Home", path: "" },
    {id:2, name: "Rooms", path: "/rooms" },
    userInfo?.role === 'creator' ? {name:"Dashboard",path:"/dashboard/statistics"} : userInfo?.role === 'admin' ? {name:"Dashboard",path:"/dashboard/analytics"} : {}
  ];
  
  const handleLogout = () =>{
    setAnchorElNav(null)
    Logout()
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <div className="shadow-md">
      <div className="container mx-auto px-3">
        <AppBar position="static" sx={{ border: "none", boxShadow: "none" }}>
          <Container className="bg-white text-black" maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  flexGrow: 1,
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontWeight: 700,
                  cursor:'pointer',
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <div className="flex items-end cursor-pointer">
                  <h1 className="text-3xl font-bold">BooK</h1>
                  <p className="w-3 h-3 rounded-full bg-red-600 mb-[6px]"></p>
                </div>
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  className="text-black"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: {
                      xs: "block",
                      md: "none",
                      fontSize: "1rem",
                      fontWeight: 700,
                    },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                      <Link className="px-12" to={page.path}>
                        <Typography
                          textAlign="center"
                          fontSize={"20px"}
                          fontWeight={"700"}
                        >
                          {page.name}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontWeight: 700,
                  cursor:'pointer',
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                 <div className="flex items-end cursor-pointer">
                  <h1 className="text-2xl font-bold">BooK</h1>
                  <p className="w-2 h-2 rounded-full bg-red-600 mb-[6px]"></p>
                </div>
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link to='/'>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        color: "black",
                        display: "block",
                        fontSize: "1rem",
                        fontWeight: 700,
                      }}
                    >
                      Home
                    </Button>
                  </Link>
              <Link to='/rooms'>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        color: "black",
                        display: "block",
                        fontSize: "1rem",
                        fontWeight: 700,
                      }}
                    >
                      Rooms
                    </Button>
                  </Link>
                  {
                    userInfo.role === 'creator' ? <Link to='/dashboard/statistics'>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        color: "black",
                        display: "block",
                        fontSize: "1rem",
                        fontWeight: 700,
                      }}
                    >
                      Dashboard
                    </Button>
                  </Link> : 
                    userInfo.role === 'admin' ? <Link to='/dashboard/analytics'>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        color: "black",
                        display: "block",
                        fontSize: "1rem",
                        fontWeight: 700,
                      }}
                    >
                      Dashboard
                    </Button>
                  </Link> : 
                  
                  ''
                  }
              </Box>

              <Box className="" sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <div
                    className="border-[1px] shadow-sm hover:shadow-md flex gap-2.5 cursor-pointer py-1 items-center px-2 rounded-full"
                    onClick={handleOpenUserMenu}
                  >
                    <MdMenu size={25} />
                    <img
                      className="w-8 rounded-full h-8 object-cover"
                      src={user ? user?.photoURL : "../../assets/profile.png"}
                      alt=""
                    />
                  </div>
                </Tooltip>
                <Menu
                  sx={{ mt: "50px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {user ? (
                    <div className="flex flex-col">
                      <Link onClick={handleCloseNavMenu} to="/mybookings" className="pl-4 pr-8 py-2 font-medium hover:bg-slate-300">
                        My Trips
                      </Link>
                      <Link onClick={handleCloseNavMenu} to="/myfavourite" className="pl-4 pr-8 py-2 font-medium hover:bg-slate-300">
                        My Wishlist
                      </Link>
                      <p onClick={handleLogout} className="pl-4 pr-8 py-2 font-medium cursor-pointer border-t border-black mt-3 hover:bg-slate-300">Log Out</p>
                    </div>
                  ) : (
                    <div>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Link to="/login">
                          <Typography className="pr-10" textAlign="center">
                            Login
                          </Typography>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Link to="/signup">
                          <Typography className="pr-10" textAlign="center">
                            Sign Up
                          </Typography>
                        </Link>
                      </MenuItem>
                    </div>
                  )}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </div>
  );
};

export default Navbar;
