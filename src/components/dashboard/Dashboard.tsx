import React, { useState, useEffect, ReactNode } from "react";
import { FaBars, FaSignOutAlt, FaArrowAltCircleLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RoutesData } from "../../routes";
import "./style/dasdhboard.props.css";
import userAvatar from "./images/user-avatar.svg";
import sidebarLogo from "../../assets/img/sidebar-logo.png";

interface DashboardProps {
  children: ReactNode;
  pageName: string | ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children, pageName }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const location = useLocation();
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (typeof pageName === "string") {
      document.title = `Membara - ${pageName}`;
    } else {
      document.title = "Membara";
    }
  }, [pageName]);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const isActive = (path: string) => (location.pathname === path ? "active" : "");

  // Group routes by `section`
  const groupedRoutes = RoutesData.reduce((acc, route) => {
    if (route.sidebarItem) {
      if (!acc[route.section]) acc[route.section] = [];
      acc[route.section].push(route);
    }
    return acc;
  }, {} as { [key: string]: typeof RoutesData });

  return (
    <div className="dashboard-container flex">
      <div className={`sidebar ${sidebarOpen ? "block" : "hidden"} md:block text-white`}>
        <div className="md:hidden mb-6 flex justify-end items-center gap-2">
          <FaArrowAltCircleLeft size={20} onClick={toggleSidebar} />
        </div>

        <div className="sidebar-content">
          <div className="w-full text-center flex justify-center items-center mb-4">
            <img src={sidebarLogo} width={120} alt="Sidebar Logo" />
          </div>

          {Object.entries(groupedRoutes).map(([section, routes]) => (
            <div key={section} className="sidebar-section mb-4 mt-8">
              <span className="text-xs text-black font-semibold">{section}</span>
              {routes.map((route, index) => (
                <div key={index} className={`menu ${isActive(route.path)} rounded-lg`}>
                  <Link to={route.path} className="flex items-center gap-4 w-full">
                    {route.sidebarIcon}
                    {route.alias}
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className={`content flex flex-col gap-4 flex-1`}>
        <div className="md:flex justify-between items-center">
          <div className="md:flex gap-2 items-center">
            <button className="md:hidden p-2 text-gray-600" onClick={toggleSidebar}>
              <FaBars />
            </button>
            <h4>{pageName}</h4>
          </div>

          <div className="md:flex dashbord-avatar-custom-margin items-center gap-4">
            <div className="flex relative gap-2 items-center dashbord-avatar-custom-margin" 
                 onMouseEnter={() => setIsAvatarHovered(true)} 
                 onMouseLeave={() => setIsAvatarHovered(false)}>
              <img src={userAvatar} alt="User Profile" className="w-8 h-8 rounded-full object-cover" />
              <h5 className="font-semibold text-sm">Admin</h5>
              {isAvatarHovered && (
                <div onClick={handleLogout} 
                     className="absolute top-6 mt-2 right-2 bg-white text-black p-2 rounded shadow-lg border flex gap-2 items-center cursor-pointer"
                     onMouseEnter={() => setIsAvatarHovered(true)} 
                     onMouseLeave={() => setIsAvatarHovered(false)}>
                  Logout <FaSignOutAlt />
                </div>
              )}
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Dashboard;
