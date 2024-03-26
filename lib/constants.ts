import { HiBell, HiHome, HiOutlineBell, HiOutlineHome } from "react-icons/hi2";
import { IoSearch, IoSearchOutline } from "react-icons/io5";

import { Page } from "./definitions";

export const PAGES: { [key: string]: Page } = {
  home: {
    title: "Home",
    href: "/",
    icon: HiHome,
    iconOutline: HiOutlineHome,
  },
  explore: {
    title: "Explore",
    href: "/explore",
    icon: IoSearch,
    iconOutline: IoSearchOutline,
  },
  notifications: {
    title: "Notifications",
    href: "/notifications",
    icon: HiBell,
    iconOutline: HiOutlineBell,
  },
};
