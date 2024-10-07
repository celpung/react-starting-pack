import Palletes from "./presentation/demo/Palletes";
import Home from "./presentation/home/Home";

export const RoutesData = [
  {
    path: "/",
    element: <Home />,
    alias: "Login",
    sidebarItem: false,
    sidebarIcon: "",
  },
  {
    path: "/palletes",
    element: <Palletes />,
    alias: "Login",
    sidebarItem: false,
    sidebarIcon: "",
  },
];
